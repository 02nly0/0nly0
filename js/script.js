(async () => {
  "use strict";

  /* ============ SYNC FROM SERVER ============ */
  function syncFromServer() {
    return fetch("/api/data")
      .then(function(r) { return r.json(); })
      .then(function(serverData) {
        if (serverData && typeof serverData === "object") {
          Object.keys(serverData).forEach(function(key) {
            localStorage.setItem(key, JSON.stringify(serverData[key]));
          });
        }
      })
      .catch(function() {});
  }
  await syncFromServer();

  /* ============ ANTI-INSPECTION ============ */
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("keydown", e => {
    const blocked = e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I","i","J","j","C","c"].includes(e.key)) || (e.ctrlKey && e.key === "u");
    if (blocked) { e.preventDefault(); e.stopPropagation(); return false; }
  });
  document.addEventListener("selectstart", e => { if (!e.target.closest("input, textarea")) e.preventDefault(); });
  document.addEventListener("dragstart", e => e.preventDefault());

  /* ============ MAINTENANCE MODE ============ */
  const hashCheck = window.location.hash.replace("#", "");
  let adminSettings = null;
  try { adminSettings = JSON.parse(localStorage.getItem("only-admin-settings")); } catch(e){}
  if (adminSettings && adminSettings.maintenance && hashCheck !== "admin") {
    const maintLang = localStorage.getItem("only-lang") || "ar";
    const isAr = maintLang === "ar";
    document.documentElement.innerHTML = `
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isAr ? "الموقع في صيانة" : "Under Maintenance"}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{--bg:#0c0a1a;--accent:#8b6bff;--text:#f0edf9;--muted:#9088b8}
        body{background:var(--bg);color:var(--text);font-family:'Outfit','Cairo',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;overflow:hidden}
        .m{max-width:440px;width:90%;text-align:center;padding:48px 36px;border-radius:24px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;gap:20px}
        .m svg{width:56px;height:56px;color:var(--accent);opacity:.85}
        .m h1{font-family:'Outfit',sans-serif;font-weight:800;font-size:1.5rem}
        .m p{color:var(--muted);font-size:.92rem;line-height:1.6;font-family:'Cairo','Outfit',sans-serif}
        .m .gear{animation:spin 4s linear infinite}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      </style>
    </head>
    <body>
      <div class="m">
        <svg class="gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        <h1>${isAr ? "الموقع في صيانة" : "Under Maintenance"}</h1>
        <p>${isAr ? "نعمل على تحسين الموقع. سنعود قريبًا!" : "We're working on improving the site. We'll be back soon!"}</p>
      </div>
    </body>`;
    throw new Error("Maintenance mode active");
  }

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) document.body.classList.add("no-anim");

  /* ============ APPLY SAVED SETTINGS (bg, animations) ============ */
  function applyBgImage() {
    const siteBg = document.getElementById("siteBg");
    if (!siteBg) return;
    let bgData;
    try { bgData = JSON.parse(localStorage.getItem("only-admin-settings")); } catch(e){}
    if (bgData) {
      const mode = root.dataset.theme || "dark";
      const img = bgData["bgImage" + (mode === "light" ? "Light" : "Dark")] || bgData.bgImage;
      if (img) {
        siteBg.style.backgroundImage = "url(" + img + ")";
        siteBg.style.opacity = (bgData.bgOpacity !== undefined ? bgData.bgOpacity / 100 : 0.3);
        siteBg.classList.remove("hidden");
        return;
      }
    }
    siteBg.classList.add("hidden");
  }
  function applyAnimations() {
    let s;
    try { s = JSON.parse(localStorage.getItem("only-admin-settings")); } catch(e){}
    if (s && s.animations === false) {
      document.body.classList.add("no-animations");
    } else {
      document.body.classList.remove("no-animations");
    }
  }
  applyBgImage();
  applyAnimations();

  /* ============================================================
     LANGUAGE — ?lng= query param + localStorage
     ============================================================ */
  const defaultTranslations = {
    ar: {
      title: "Only — مطوّر واجهات أمامية",
      meta_desc: "الموقع الشخصي لـ Only، مطوّر واجهات أمامية أُحوّل الأفكار إلى تجارب رقمية هادئة ودقيقة.",
      home_page_title: "الرئيسية — Only",
      about_page_title: "نبذة عني — Only",
      projects_page_title: "المشاريع — Only",
      contact_page_title: "التواصل — Only",
      nav_home: "الرئيسية", nav_about: "نبذة عني", nav_projects: "المشاريع", nav_contact: "التواصل",
      lang_label: "EN",
      hero_available: "Made by Only",
      hero_subtitle: "اهلا اسمي",
      hero_cta_projects: "استعرض أعمالي", hero_cta_contact: "تواصل معي",
      stat_years: "سنوات خبرة", stat_projects: "مشروع منجز", stat_clients: "عميل سعيد",
      about_eyebrow: "نبذة عني", about_title: "من أنا؟",
      about_text: "أُدعى <strong>Only</strong>، مطوّر واجهات أمامية شغوف بتحويل الأفكار المجرّدة إلى واجهات حيّة يشعر فيها المستخدم بالراحة والانسيابية. أعمل على تحويل التصاميم إلى كود نظيف، منظم، وسريع، مع اهتمام دائم بأدق التفاصيل: من توقيت الحركة إلى تباعد الحروف. أؤمن أن التجربة الرقمية الجيدة لا تُلاحظ — بل تُشعَر.",
      projects_eyebrow: "المشاريع", projects_title: "أعمال مختارة",
      contact_eyebrow: "التواصل",       contact_title: "لنبدأ شيئًا رائعًا معًا",
      contact_desc: "لديك فكرة أو مشروع؟ راسلني على أي من القنوات التالية، وسأعود إليك في أقرب وقت.",
      contact_cta: "راسلني",
      footer_copy: "جميع الحقوق محفوظة.",
      project_visit: "زيارة المشروع",
      copy_ok: "تم نسخ {label} ✓", copy_fail: "تعذّر النسخ، حاول يدويًا",
      admin_title: "Admin Panel", admin_pin_desc: "أدخل كود المكون من 6 أرقام",
      admin_pin_error: "كود خاطئ، حاول مرة ثانية", admin_login: "دخول",
      admin_preview: "معاينة الموقع", admin_save: "حفظ الكل",
      admin_tab_home: "الرئيسية", admin_tab_about: "نبذة عني",
      admin_tab_projects: "المشاريع", admin_tab_contact: "التواصل",
      admin_tab_footer: "الفوتر", admin_tab_settings: "الإعدادات",
      admin_sec_home: "صفحة الرئيسية", admin_sec_about: "نبذة عني",
      admin_sec_projects: "المشاريع", admin_sec_contact: "التواصل",
      admin_sec_footer: "الفوتر", admin_sec_settings: "الإعدادات",
      admin_add_project: "+ إضافة مشروع",
      admin_maintenance: "وضع الصيانة", admin_maintenance_desc: "عند التفعيل، يظهر للمستخدمين صفحة \"الموقع في صيانة\" بدلاً من المحتوى.",
      admin_site_name: "اسم الموقع", admin_site_name_desc: "يظهر في شريط العنوان والفووتر.",
      admin_appearance: "المظهر", admin_appearance_desc: "تخصيص ألوان كل ثيم.",
      admin_bg_image: "خلفية الموقع", admin_bg_image_desc: "إضافة صورة خلفية للموقع.",
      admin_bg_placeholder: "لا توجد صورة", admin_bg_pick: "اختيار صورة", admin_bg_remove: "إزالة",
      admin_animations: "الحركات", admin_animations_desc: "تشغيل أو إيقاف حركات الموقع.",
    },
    en: {
      title: "Only — Front-end Developer",
      meta_desc: "Only's personal website, a front-end developer.",
      home_page_title: "Home — Only",
      about_page_title: "About — Only",
      projects_page_title: "Projects — Only",
      contact_page_title: "Contact — Only",
      nav_home: "Home", nav_about: "About", nav_projects: "Projects", nav_contact: "Contact",
      lang_label: "ع",
      hero_available: "Made by Only",
      hero_subtitle: "Hi, my name is",
      hero_cta_projects: "View My Work", hero_cta_contact: "Get in Touch",
      stat_years: "Years Experience", stat_projects: "Projects Done", stat_clients: "Happy Clients",
      about_eyebrow: "About Me", about_title: "Who Am I?",
      about_text: "I'm <strong>Only</strong>, a passionate front-end developer who transforms abstract ideas into alive interfaces. I convert designs into clean, organized, and fast code, with constant attention to the finest details. I believe good digital experiences aren't noticed — they're felt.",
      projects_eyebrow: "Projects", projects_title: "Selected Works",
      contact_eyebrow: "Contact", contact_title: "Let's Start Something Amazing Together",
      contact_desc: "Have an idea or a project? Reach out and I'll get back to you ASAP.",
      contact_cta: "Message Me",
      footer_copy: "All rights reserved.",
      project_visit: "Visit Project",
      copy_ok: "{label} copied ✓", copy_fail: "Failed to copy, try manually",
      admin_title: "Admin Panel", admin_pin_desc: "Enter the 6-digit code",
      admin_pin_error: "Wrong code, try again", admin_login: "Login",
      admin_preview: "Preview Site", admin_save: "Save All",
      admin_tab_home: "Home", admin_tab_about: "About",
      admin_tab_projects: "Projects", admin_tab_contact: "Contact",
      admin_tab_footer: "Footer", admin_tab_settings: "Settings",
      admin_sec_home: "Home Page", admin_sec_about: "About Me",
      admin_sec_projects: "Projects", admin_sec_contact: "Contact",
      admin_sec_footer: "Footer", admin_sec_settings: "Settings",
      admin_add_project: "+ Add Project",
      admin_maintenance: "Maintenance Mode", admin_maintenance_desc: "When enabled, visitors see a \"Under Maintenance\" page instead of content.",
      admin_site_name: "Site Name", admin_site_name_desc: "Shown in the title bar and footer.",
      admin_appearance: "Appearance", admin_appearance_desc: "Customize colors for each theme.",
      admin_bg_image: "Site Background", admin_bg_image_desc: "Add a background image to the site.",
      admin_bg_placeholder: "No image", admin_bg_pick: "Choose Image", admin_bg_remove: "Remove",
      admin_animations: "Animations", admin_animations_desc: "Enable or disable site animations.",
    }
  };

  const translations = JSON.parse(JSON.stringify(defaultTranslations));
  let adminTrans = null;
  try { adminTrans = JSON.parse(localStorage.getItem("only-admin-translations")); } catch(e){}
  if (adminTrans) {
    ["ar", "en"].forEach((lang) => {
      if (adminTrans[lang]) Object.assign(translations[lang], adminTrans[lang]);
    });
  }

  function getLngFromURL() {
    const params = new URLSearchParams(window.location.search);
    const lng = params.get("lng");
    if (lng === "en" || lng === "ar") return lng;
    return null;
  }

  function setLang(lang) {
    root.dataset.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    root.lang = lang;
    localStorage.setItem("only-lang", lang);

    const params = new URLSearchParams(window.location.search);
    params.set("lng", lang);
    const newURL = window.location.pathname + "?" + params.toString() + window.location.hash;
    window.history.replaceState({}, "", newURL);

    const t = translations[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) {
        if (el.tagName === "TITLE" || key === "about_text") {
          el.innerHTML = t[key];
        } else if (el.tagName === "META") {
          el.setAttribute("content", t[key]);
        } else {
          el.textContent = t[key];
        }
      }
    });
    document.getElementById("langToggle").querySelector("span").textContent = t.lang_label;
    if (root.dataset.lang === "ar") {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }

  const lngParam = getLngFromURL();
  const savedLang = lngParam || localStorage.getItem("only-lang") || "ar";
  setLang(savedLang);

  /* ============================================================
     HASH ROUTING
     ============================================================ */
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-links a");
  const nav = document.querySelector(".nav");
  const footer = document.querySelector(".footer");
  const projectModal = document.getElementById("projectModal");

  function showPage(id) {
    const isAdmin = id === "admin";

    pages.forEach((p) => {
      const isActive = p.id === id;
      p.classList.toggle("page--active", isActive);
      if (!isActive) {
        p.querySelectorAll(".anim-in, .about-stats, .project-card, .contact-link").forEach((el) => {
          el.classList.remove("visible", "in-view");
        });
      }
    });

    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });

    /* Update browser <title> per page */
    const lang = root.dataset.lang || "ar";
    const t = translations[lang];
    const titleMap = { home: "home_page_title", about: "about_page_title", projects: "projects_page_title", contact: "contact_page_title" };
    if (!isAdmin && t[titleMap[id]]) {
      document.title = t[titleMap[id]];
    } else if (isAdmin) {
      document.title = "Admin Panel — Only";
    }

    if (nav) nav.style.display = isAdmin ? "none" : "";
    if (footer) footer.style.display = isAdmin ? "none" : "";
    if (projectModal) projectModal.style.display = isAdmin ? "none" : "";
    document.body.classList.toggle("body-admin", isAdmin);

    if (!isAdmin) {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      requestAnimationFrame(() => observeCards());
    }
  }

  function getHash() {
    const h = window.location.hash.replace("#", "");
    return ["home", "about", "projects", "contact", "admin"].includes(h) ? h : "home";
  }

  showPage(getHash());

  window.addEventListener("hashchange", () => showPage(getHash()));

  /* Nav clicks */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.getAttribute("href").replace("#", "");
      if (id === "home") {
        history.pushState("", "", window.location.pathname + window.location.search);
        showPage("home");
      } else {
        window.location.hash = "#" + id;
      }
      const nl = document.getElementById("navLinks");
      const nb = document.getElementById("navBurger");
      if (nl) nl.classList.remove("open");
      if (nb) nb.classList.remove("open");
    });
  });

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  let cardObserver;
  function observeCards() {
    if (cardObserver) cardObserver.disconnect();
    const cards = document.querySelectorAll(".page--active .project-card, .page--active .contact-link, .page--active .anim-in, .page--active .about-stats");
    cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view", "visible");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((c) => cardObserver.observe(c));
  }

  /* ============================================================
     DARK / LIGHT MODE
     ============================================================ */
  const themeToggle = document.getElementById("themeToggle");

  function applyAdminTheme() {
    const adminTheme = localStorage.getItem("only-admin-theme");
    ["--bg","--surface","--accent-1","--accent-2","--accent-3","--text","--text-muted"].forEach(v => root.style.removeProperty(v));
    if (!adminTheme) return;
    let th;
    try { th = JSON.parse(adminTheme); } catch(e){ return; }
    const mode = root.dataset.theme || "dark";
    if (th[mode]) {
      Object.entries(th[mode]).forEach(([v, val]) => root.style.setProperty(v, val));
    }
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("only-theme", theme);
    applyAdminTheme();
    applyBgImage();
  }

  const savedTheme = localStorage.getItem("only-theme") || "dark";
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const body = document.body;
      body.classList.add("theme-switching");
      setTimeout(() => {
        setTheme(root.dataset.theme === "dark" ? "light" : "dark");
        setTimeout(() => body.classList.remove("theme-switching"), 200);
      }, 120);
    });
  }

  /* ============================================================
     LANGUAGE TOGGLE
     ============================================================ */
  const langToggle = document.getElementById("langToggle");

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const span = langToggle.querySelector("span");
      langToggle.classList.add("switching");
      span.style.transform = "translateY(-18px)";
      span.style.opacity = "0";
      setTimeout(() => {
        setLang(root.dataset.lang === "ar" ? "en" : "ar");
        span.style.transform = "translateY(18px)";
        setTimeout(() => {
          span.style.transform = "translateY(0)";
          span.style.opacity = "1";
          langToggle.classList.remove("switching");
          renderProjects();
        }, 50);
      }, 220);
    });
  }

  /* ============================================================
     ADMIN OVERRIDES
     ============================================================ */
  const adminLinksRaw = localStorage.getItem("only-admin-links");
  if (adminLinksRaw) {
    let lk;
    try { lk = JSON.parse(adminLinksRaw); } catch(e){}
    if (lk) {
      document.querySelectorAll("[data-admin-link]").forEach((el) => {
        const key = el.dataset.adminLink;
        if (lk[key]) {
          if (el.tagName === "A") {
            const val = lk[key];
            el.href = (key === "email" && !/^https?:\/\//i.test(val)) ? "mailto:" + val : val;
          } else {
            el.textContent = lk[key];
          }
        }
      });
    }
  }

  /* ============================================================
     CUSTOM CONTACT METHODS
     ============================================================ */
  const contactIcons = {
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    snapchat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.922-.214.093-.033.195-.047.297-.047.345 0 .595.224.685.39.12.239.14.57.05.9-.256.91-.989 1.414-1.694 1.779-.165.085-.333.161-.48.224-.47.205-.81.379-1.155.554-.39.195-.748.419-1.08.664-.019.519.045.993.195 1.394.038.098.075.195.113.291.256.635.57 1.214.958 1.726.685.898 1.636 1.574 2.893 1.991.12.041.233.099.345.161.45.245.764.554.943.929.036.063.06.135.09.209-.375.105-.764.18-1.155.225-.044.005-.089.015-.135.025-.405.075-.81.15-1.17.405-.555.39-.825 1.08-.87 1.8-.021.33-.015.66.015.99.06.63.18 1.215.345 1.725.038.12.083.24.128.345.12.3.24.525.36.675.06.075.12.135.165.18.585.585 1.38.675 1.905.675.135 0 .27-.015.405-.03.45-.06.87-.12 1.23.03.39.165.615.51.69.87.03.15.045.3.045.465 0 .18-.03.36-.06.51-.135.75-.51 1.155-.93 1.41-.27.165-.555.255-.81.315-.54.12-.99.18-1.38.225-.045.005-.09.01-.135.015-.33.045-.645.09-.9.24-.36.21-.54.555-.57.885-.015.165-.015.33.015.48.105.51.39.87.75 1.11.21.135.435.225.645.305.675.255 1.23.525 1.68.84.075.045.135.105.21.15.525.33.9.735 1.065 1.215.06.18.09.36.09.555 0 .21-.045.42-.12.6-.27.66-.81 1.02-1.38 1.2-.36.105-.735.15-1.11.165-.105.005-.21.005-.315.005-.465 0-.915-.015-1.35-.045-.555-.03-1.08-.075-1.605-.15-.225-.03-.45-.06-.675-.09-.45-.06-.885-.135-1.335-.21-.15-.03-.3-.06-.45-.09-.615-.135-1.2-.3-1.74-.555a4.495 4.495 0 01-.72-.42c-.36-.255-.69-.54-.975-.87-.03-.03-.06-.075-.09-.12-.165-.225-.3-.465-.42-.705a4.164 4.164 0 01-.3-1.065c-.03-.345-.045-.69-.045-1.035 0-.375.03-.75.09-1.125.075-.51.21-.99.405-1.425.3-.675.72-1.26 1.215-1.725.33-.3.69-.555 1.08-.765.3-.165.615-.285.945-.375.27-.075.54-.135.81-.18.15-.03.3-.045.45-.06.36-.045.72-.075 1.065-.135.18-.03.36-.06.54-.105.555-.135 1.065-.375 1.5-.72.12-.09.225-.195.345-.3.18-.165.36-.345.57-.54.135-.135.27-.27.42-.42.105-.105.21-.225.33-.345.06-.06.12-.12.18-.18.36-.345.66-.72.885-1.125.165-.3.285-.615.36-.945.045-.165.075-.33.09-.5.015-.135.015-.27.015-.405 0-.585-.105-1.14-.3-1.65-.06-.165-.135-.315-.21-.465-.165-.33-.36-.63-.585-.9-.09-.105-.18-.21-.285-.315-.375-.36-.81-.63-1.275-.825-.285-.12-.585-.21-.885-.27-.18-.03-.36-.06-.54-.075-.105-.015-.21-.015-.315-.015-.165 0-.33.015-.495.03-.51.06-.99.21-1.41.45-.3.165-.57.375-.81.615-.165.165-.3.345-.42.54-.06.09-.12.18-.165.285-.135.3-.21.615-.24.945-.015.15-.015.3.015.45.075.42.255.765.51 1.035.18.195.39.345.615.465.105.06.21.105.315.15.255.105.48.225.69.375.165.12.315.255.45.405.06.075.12.15.165.225.165.33.255.69.285 1.065.015.18.015.36.015.54 0 .36-.045.705-.135 1.035-.03.105-.06.21-.105.315-.135.345-.345.645-.615.885-.195.18-.42.315-.645.435-.255.135-.51.24-.78.315-.195.06-.39.09-.585.105-.075.015-.15.015-.225.015-.21 0-.42-.03-.615-.06-.375-.075-.72-.21-1.02-.405-.165-.105-.315-.24-.45-.39-.075-.075-.135-.165-.21-.255-.165-.21-.345-.39-.555-.54-.135-.09-.285-.165-.435-.225-.255-.105-.525-.18-.81-.21-.12-.015-.24-.015-.36-.015-.225 0-.45.03-.66.075-.42.09-.81.255-1.14.495-.195.135-.375.3-.525.495-.09.12-.165.24-.24.375-.105.195-.18.405-.225.63-.03.135-.045.27-.045.405 0 .18.015.36.045.525.075.39.24.735.465 1.035.165.21.36.39.57.54.12.09.24.165.375.225.27.12.555.21.84.27.18.03.36.06.54.075.09.015.18.015.27.015.165 0 .33-.015.48-.03.465-.06.9-.21 1.29-.45.24-.135.465-.315.66-.51.105-.105.195-.225.285-.345.135-.18.24-.375.33-.585.06-.135.105-.27.135-.42.015-.075.03-.15.03-.225z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.6 5.2c-1.5-.7-3.1-1.2-4.8-1.5l-.2.4c1.6.4 3 .9 4.3 1.7-1.9-.9-4.4-.9-6.3 0 1.3-.8 2.7-1.3 4.3-1.7l-.2-.4c-1.7.3-3.3.8-4.8 1.5C4.5 8.5 3.8 11.7 4 14.8c1.7 1.3 3.3 2 4.9 2.5l.6-1c-.9-.3-1.7-.7-2.5-1.2.2-.1.4-.2.5-.3 3.3 1.5 6.8 1.5 10.1 0l.5.4c-.8.5-1.6.9-2.5 1.2l.6 1c1.6-.5 3.2-1.2 4.9-2.5.3-3.6-.5-6.8-2.3-9.6zM10 13.3c-.9 0-1.6-.8-1.6-1.8 0-1 .7-1.8 1.6-1.8s1.6.8 1.6 1.8c0 1-.7 1.8-1.6 1.8zm5.4 0c-.9 0-1.6-.8-1.6-1.8 0-1 .7-1.8 1.6-1.8s1.6.8 1.6 1.8c-.1 1-.7 1.8-1.6 1.8z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.6-.1-.3-.5-1.3.1-2.6 0 0 .8-.3 2.7 1a9 9 0 014.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.6 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>',
  };

  function renderCustomContactMethods() {
    const container = document.querySelector(".contact-links");
    if (!container) return;
    let methods = [];
    try { methods = JSON.parse(localStorage.getItem("only-admin-contact-methods")); } catch(e){}
    if (!methods || !methods.length) return;
    methods.forEach(function(m) {
      const isEmail = m.icon === "email" || (m.url && /^mailto:/i.test(m.url));
      const rawHref = isEmail && m.url && !/^mailto:/i.test(m.url) ? "mailto:" + m.url : (m.url || "#");
      const href = escUrl(rawHref);
      const icon = contactIcons[m.icon] || contactIcons.link;
      const label = escHtml(m.label || "Link");
      const display = escHtml(m.display || m.url || "");
      const el = document.createElement("a");
      el.className = "contact-link";
      el.href = href;
      el.target = "_blank";
      el.rel = "noopener";
      el.innerHTML = icon + '<div><span class="contact-link__label">' + label + '</span>' + display + '</div>';
      container.appendChild(el);
    });
  }
  renderCustomContactMethods();

  /* ============================================================
     PROJECTS
     ============================================================ */
  const defaultProjects = [
    { id:"p1", titleAr:"لوحة تحكم Nova", titleEn:"Nova Dashboard", descAr:"لوحة تحكم متكاملة لإدارة البيانات والمستخدمين بتصميم عصري.", descEn:"Full dashboard for data and user management with modern design.", tags:["HTML5","CSS3","JS"], gradient:"#6d4fe0,#2c2350", image:"", link:"" },
    { id:"p2", titleAr:"متجر Lumen", titleEn:"Lumen Store", descAr:"متجر إلكتروني بواجهة سلسة وتجربة مستخدم مميزة.", descEn:"E-commerce store with smooth UI and great user experience.", tags:["React","API"], gradient:"#d1548f,#3a1730", image:"", link:"" },
    { id:"p3", titleAr:"تطبيق Pulse", titleEn:"Pulse App", descAr:"تصميم واجهة مستخدم كامل من الصفر باستخدام Figma.", descEn:"Full UI/UX design from scratch using Figma.", tags:["UI/UX","Figma"], gradient:"#e0a94f,#33220c", image:"", link:"" },
    { id:"p4", titleAr:"هبوط Aster", titleEn:"Aster Landing", descAr:"صفحة هبوط تفاعلية مع حركات انسيابية.", descEn:"Interactive landing page with smooth motion.", tags:["Landing","Motion"], gradient:"#4fb8d1,#142833", image:"", link:"" },
  ];

  function escHtml(s) {
    return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }
  function escUrl(s) {
    const str = String(s).trim();
    if (/^javascript:/i.test(str)) return "#";
    return str.replace(/["'()]/g, "");
  }

  function renderProjects() {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;
    const saved = localStorage.getItem("only-admin-projects");
    let projects;
    try { projects = JSON.parse(saved); } catch(e){}
    if (!projects) projects = defaultProjects;
    const lang = root.dataset.lang || "ar";
    grid.innerHTML = projects.map(function(p, i) {
      const grad = p.gradient || "#6d4fe0,#2c2350";
      const colors = grad.split(",");
      const title = lang === "ar" ? escHtml(p.titleAr) : escHtml(p.titleEn);
      const glyph = escHtml((p.titleEn || "?")[0]);
      const artStyle = p.image
        ? "background-image:url(" + escUrl(p.image) + ");background-size:cover;background-position:center;"
        : "background:linear-gradient(135deg," + escHtml(colors[0]) + "," + escHtml(colors[1] || colors[0]) + ");";
      const tags = p.tags || (p.tag ? p.tag.split(/[·,]\s*/) : []);
      const tagsHtml = tags.map(function(t){ return '<span class="project-card__tag">' + escHtml(t.trim()) + '</span>'; }).join("");
      return '<article class="project-card glass" data-project-idx="' + i + '">' +
        '<div class="project-card__art" style="' + artStyle + '">' +
          (p.image ? '<img src="' + escUrl(p.image) + '" alt="' + title + '" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;">' : '<span class="project-card__glyph">' + glyph + '</span>') +
        '</div>' +
        '<div class="project-card__info">' +
          '<div class="project-card__tags">' + tagsHtml + '</div>' +
          '<h3 class="project-card__title">' + title + '</h3>' +
        '</div>' +
      '</article>';
    }).join("");
    bindProjectCards();
  }

  /* ============================================================
     PROJECT MODAL
     ============================================================ */
  let currentProjects = [];
  function getProjectsList() {
    let projects;
    try { projects = JSON.parse(localStorage.getItem("only-admin-projects")); } catch(e){}
    return projects || defaultProjects;
  }

  function openProjectModal(idx) {
    currentProjects = getProjectsList();
    const p = currentProjects[idx];
    if (!p) return;
    const lang = root.dataset.lang || "ar";
    const grad = p.gradient || "#6d4fe0,#2c2350";
    const colors = grad.split(",");
    const title = lang === "ar" ? escHtml(p.titleAr) : escHtml(p.titleEn);
    const desc = lang === "ar" ? escHtml(p.descAr || "") : escHtml(p.descEn || "");
    const link = escUrl(p.link || "");
    const tags = p.tags || [];
    const tagsHtml = tags.map(function(t){ return '<span class="project-modal__tag">' + escHtml(t.trim()) + '</span>'; }).join("");
    const artStyle = p.image
      ? "background-image:url(" + escUrl(p.image) + ");background-size:cover;background-position:center;"
      : "background:linear-gradient(135deg," + escHtml(colors[0]) + "," + escHtml(colors[1] || colors[0]) + ");";

    const modal = document.getElementById("projectModal");
    modal.querySelector(".project-modal__art").style.cssText = artStyle;
    modal.querySelector(".project-modal__art").innerHTML = p.image
      ? '<img src="' + escUrl(p.image) + '" alt="' + title + '" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-lg);">'
      : '<span class="project-card__glyph" style="font-size:4rem;">' + escHtml((p.titleEn || "?")[0]) + '</span>';
    modal.querySelector(".project-modal__title").textContent = title;
    modal.querySelector(".project-modal__tags").innerHTML = tagsHtml;
    modal.querySelector(".project-modal__desc").textContent = desc || (lang === "ar" ? "لا يوجد وصف بعد." : "No description yet.");
    const linkEl = modal.querySelector(".project-modal__link");
    if (link) {
      linkEl.href = link;
      linkEl.style.display = "inline-flex";
    } else {
      linkEl.style.display = "none";
    }
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    const modal = document.getElementById("projectModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function bindProjectCards() {
    document.querySelectorAll(".project-card[data-project-idx]").forEach(function(card) {
      card.addEventListener("click", function() {
        openProjectModal(parseInt(card.dataset.projectIdx));
      });
    });
  }
  renderProjects();
  observeCards();

  /* Modal close handlers */
  const modalCloseBtn = document.getElementById("projectModalClose");
  const modalOverlayBtn = document.getElementById("projectModalOverlay");
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
  if (modalOverlayBtn) modalOverlayBtn.addEventListener("click", closeProjectModal);
  document.addEventListener("keydown", function(e) { if (e.key === "Escape") closeProjectModal(); });

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  const navBurger = document.getElementById("navBurger");
  const navLinksEl = document.getElementById("navLinks");

  if (navBurger && navLinksEl) {
    navBurger.addEventListener("click", () => {
      const isOpen = navLinksEl.classList.toggle("open");
      navBurger.classList.toggle("open", isOpen);
      navBurger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ============================================================
     FOOTER YEAR
     ============================================================ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     CLIPBOARD
     ============================================================ */
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const t = document.createElement("textarea");
        t.value = text;
        t.style.cssText = "position:fixed;opacity:0";
        document.body.appendChild(t);
        t.select();
        document.execCommand("copy");
        document.body.removeChild(t);
      }
      return true;
    } catch { return false; }
  }

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const ok = await copyText(btn.dataset.copy);
      const t = translations[root.dataset.lang];
      const label = btn.dataset.label || "Text";
      showToast(ok ? t.copy_ok.replace("{label}", label) : t.copy_fail);
    });
  });

  /* ============================================================
     EXPOSE FOR ADMIN.JS
     ============================================================ */
  /* ============================================================
     AUTO-SYNC — poll server for changes from other devices
     ============================================================ */
  setInterval(async function () {
    try {
      const r = await fetch("/api/data");
      const serverData = await r.json();
      if (serverData && typeof serverData === "object") {
        const snapshot = JSON.stringify(serverData);
        let changed = false;
        Object.keys(serverData).forEach(function (key) {
          const prev = localStorage.getItem(key);
          if (prev !== JSON.stringify(serverData[key])) {
            localStorage.setItem(key, JSON.stringify(serverData[key]));
            changed = true;
          }
        });
        if (changed) renderProjects();
      }
    } catch (e) {}
  }, 8000);

  window.__onlySite = { setLang, renderProjects, getHash, translations, applyBgImage, applyAnimations, renderCustomContactMethods };

})();
