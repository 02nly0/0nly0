const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, 'data.json');
const ADMIN_PIN = '123456';

function readData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch (e) { return {}; }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function parseBody(req) {
  return new Promise(function (resolve, reject) {
    var body = '';
    var len = 0;
    var maxSize = 1048576;
    req.on('data', function (chunk) {
      len += chunk.length;
      if (len > maxSize) {
        req.destroy();
        reject(new Error('Payload too large'));
        return;
      }
      body += chunk;
    });
    req.on('end', function () {
      try { resolve(JSON.parse(body)); }
      catch (e) { reject(e); }
    });
  });
}

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
};

const staticExts = new Set(['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.woff2', '.woff', '.ttf', '.otf', '.mp4']);

/* Pages that should serve index.html (SPA) */
const spaPages = ['/', '/home', '/about', '/projects', '/contact', '/admin'];

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
};

function serveErrorPage(res, code, filePath) {
  fs.readFile(path.join(ROOT, filePath), (e, d) => {
    if (!res.headersSent) {
      res.writeHead(code, { 'Content-Type': 'text/html; charset=utf-8', ...securityHeaders });
    }
    res.end(d || (code + ' Error'));
  });
}

http.createServer(async (req, res) => {
  let url = req.url.split('?')[0];

  /* ============ DATA API ============ */
  if (url === '/api/data') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    if (req.method === 'GET') {
      const data = readData();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', ...securityHeaders });
      res.end(JSON.stringify(data));
      return;
    }
    if (req.method === 'POST') {
      try {
        const payload = await parseBody(req);
        if (payload.pin !== ADMIN_PIN) {
          res.writeHead(401, { 'Content-Type': 'application/json', ...securityHeaders });
          res.end(JSON.stringify({ error: 'Unauthorized' }));
          return;
        }
        const existing = readData();
        if (payload.data && typeof payload.data === 'object') {
          Object.keys(payload.data).forEach(function (k) { existing[k] = payload.data[k]; });
        }
        writeData(existing);
        res.writeHead(200, { 'Content-Type': 'application/json', ...securityHeaders });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json', ...securityHeaders });
        res.end(JSON.stringify({ error: 'Invalid request' }));
      }
      return;
    }
  }

  /* SPA: serve index.html for page routes */
  if (spaPages.includes(url)) {
    const fp = path.join(ROOT, 'index.html');
    fs.readFile(fp, (err, data) => {
      if (err) {
        serveErrorPage(res, 500, '500.html');
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        ...securityHeaders,
      });
      res.end(data);
    });
    return;
  }

  /* Static files */
  const fp = path.join(ROOT, url);
  const resolved = path.resolve(fp);
  const rootResolved = path.resolve(ROOT);
  if (!resolved.startsWith(rootResolved)) {
    serveErrorPage(res, 403, '403.html');
    return;
  }
  fs.readFile(fp, (err, data) => {
    if (err) {
      serveErrorPage(res, 404, '404.html');
      return;
    }
    const ext = path.extname(fp).toLowerCase();
    const ct = mime[ext] || 'application/octet-stream';
    const needsCharset = ct.startsWith('text/') || ct === 'application/javascript' || ct === 'application/json' || ct === 'image/svg+xml';
    const headers = {
      'Content-Type': ct + (needsCharset ? '; charset=utf-8' : ''),
      ...securityHeaders,
    };
    if (staticExts.has(ext)) {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    }
    res.writeHead(200, headers);
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
