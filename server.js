const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

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

http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  /* SPA: serve index.html for page routes */
  if (spaPages.includes(url)) {
    const fp = path.join(ROOT, 'index.html');
    fs.readFile(fp, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
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
    res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.readFile(path.join(ROOT, '403.html'), (e3, d3) => {
      res.end(d3 || '403 Forbidden');
    });
    return;
  }
  fs.readFile(fp, (err, data) => {
    if (err) {
      fs.readFile(path.join(ROOT, '404.html'), (e2, d2) => {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(d2);
      });
      return;
    }
    const ext = path.extname(fp).toLowerCase();
    const ct = mime[ext] || 'application/octet-stream';
    const needsCharset = ct.startsWith('text/') || ct === 'application/javascript' || ct === 'application/json' || ct === 'image/svg+xml';
    const headers = {
      'Content-Type': ct + (needsCharset ? '; charset=utf-8' : ''),
      'X-Content-Type-Options': 'nosniff',
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
