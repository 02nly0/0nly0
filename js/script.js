(() => {
  "use strict";

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
    if (bgData && bgData.bgImage) {
      siteBg.style.backgroundImage = "url(" + bgData.bgImage + ")";
      siteBg.style.opacity = (bgData.bgOpacity !== undefined ? bgData.bgOpacity / 100 : 0.3);
      siteBg.classList.remove("hidden");
    } else {
      siteBg.classList.add("hidden");
    }
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
      window.location.hash = "#" + id;
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
     PROJECTS
     ============================================================ */
  const defaultProjects = [
    { id:"p1", titleAr:"لوحة تحكم Nova", titleEn:"Nova Dashboard", descAr:"لوحة تحكم متكاملة لإدارة البيانات والمستخدمين بتصميم عصري.", descEn:"Full dashboard for data and user management with modern design.", tags:["HTML5","CSS3","JS"], gradient:"#6d4fe0,#2c2350", image:"", link:"" },
    { id:"p2", titleAr:"متجر Lumen", titleEn:"Lumen Store", descAr:"متجر إلكتروني بواجهة سلسة وتجربة مستخدم مميزة.", descEn:"E-commerce store with smooth UI and great user experience.", tags:["React","API"], gradient:"#d1548f,#3a1730", image:"", link:"" },
    { id:"p3", titleAr:"تطبيق Pulse", titleEn:"Pulse App", descAr:"تصميم واجهة مستخدم كامل من الصفر باستخدام Figma.", descEn:"Full UI/UX design from scratch using Figma.", tags:["UI/UX","Figma"], gradient:"#e0a94f,#33220c", image:"", link:"" },
    { id:"p4", titleAr:"هبوط Aster", titleEn:"Aster Landing", descAr:"صفحة هبوط تفاعلية مع حركات انسيابية.", descEn:"Interactive landing page with smooth motion.", tags:["Landing","Motion"], gradient:"#4fb8d1,#142833", image:"", link:"" },
  ];

  function escHtml(s) {
    return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
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
      const colors = p.gradient.split(",");
      const title = lang === "ar" ? escHtml(p.titleAr) : escHtml(p.titleEn);
      const glyph = escHtml((p.titleEn || "?")[0]);
      const artStyle = p.image
        ? "background-image:url(" + escUrl(p.image) + ");background-size:cover;background-position:center;"
        : "background:linear-gradient(135deg," + escHtml(colors[0]) + "," + escHtml(colors[1]) + ");";
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
    const colors = p.gradient.split(",");
    const title = lang === "ar" ? escHtml(p.titleAr) : escHtml(p.titleEn);
    const desc = lang === "ar" ? escHtml(p.descAr || "") : escHtml(p.descEn || "");
    const link = p.link || "";
    const tags = p.tags || [];
    const tagsHtml = tags.map(function(t){ return '<span class="project-modal__tag">' + escHtml(t.trim()) + '</span>'; }).join("");
    const artStyle = p.image
      ? "background-image:url(" + escUrl(p.image) + ");background-size:cover;background-position:center;"
      : "background:linear-gradient(135deg," + escHtml(colors[0]) + "," + escHtml(colors[1]) + ");";

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
  window.__onlySite = { setLang, renderProjects, getHash, translations, applyBgImage, applyAnimations };

})();
