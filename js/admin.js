(() => {
  "use strict";

  const PIN = "123456";
  const root = document.documentElement;

  const site = window.__onlySite || {};

  const defaultProjects = [
    { id: "p1", titleAr: "لوحة تحكم Nova", titleEn: "Nova Dashboard", descAr: "لوحة تحكم متكاملة لإدارة البيانات والمستخدمين بتصميم عصري.", descEn: "Full dashboard for data and user management with modern design.", tags: ["HTML5", "CSS3", "JS"], gradient: "#6d4fe0,#2c2350", image: "", link: "" },
    { id: "p2", titleAr: "متجر Lumen", titleEn: "Lumen Store", descAr: "متجر إلكتروني بواجهة سلسة وتجربة مستخدم مميزة.", descEn: "E-commerce store with smooth UI and great user experience.", tags: ["React", "API"], gradient: "#d1548f,#3a1730", image: "", link: "" },
    { id: "p3", titleAr: "تطبيق Pulse", titleEn: "Pulse App", descAr: "تصميم واجهة مستخدم كامل من الصفر باستخدام Figma.", descEn: "Full UI/UX design from scratch using Figma.", tags: ["UI/UX", "Figma"], gradient: "#e0a94f,#33220c", image: "", link: "" },
    { id: "p4", titleAr: "هبوط Aster", titleEn: "Aster Landing", descAr: "صفحة هبوط تفاعلية مع حركات انسيابية.", descEn:"Interactive landing page with smooth motion.", tags: ["Landing", "Motion"], gradient: "#4fb8d1,#142833", image: "", link: "" },
  ];

  const defaultLinks = {
    github: "https://github.com/02nly0",
    instagram: "https://www.instagram.com/02nly0",
    email: "hello@only.dev",
  };

  const defaultTheme = {
    dark: { "--bg": "#0c0a1a", "--surface": "#14112a", "--accent-1": "#8b6bff", "--accent-2": "#a78bfa", "--accent-3": "#c4b5fd", "--text": "#f0edf9", "--text-muted": "#9088b8" },
    light: { "--bg": "#f0ecfe", "--surface": "#ffffff", "--accent-1": "#7c5ce0", "--accent-2": "#6d4dd0", "--accent-3": "#5b3fc0", "--text": "#1a1233", "--text-muted": "#766d9a" }
  };

  const defaultTranslations = {
    ar: {
      title: "Only — مطوّر واجهات أمامية",
      meta_desc: "الموقع الشخصي لـ Only، مطوّر واجهات أمامية أُحوّل الأفكار إلى تجارب رقمية هادئة ودقيقة.",
      nav_home: "الرئيسية", nav_about: "نبذة عني", nav_projects: "المشاريع", nav_contact: "التواصل",
      home_page_title: "الرئيسية — Only",
      about_page_title: "نبذة عني — Only",
      projects_page_title: "المشاريع — Only",
      contact_page_title: "التواصل — Only",
      lang_label: "EN",
      hero_available: "Made by Only",
      hero_subtitle: "اهلا اسمي",
      hero_cta_projects: "استعرض أعمالي", hero_cta_contact: "تواصل معي",
      stat_years: "سنوات خبرة", stat_projects: "مشروع منجز", stat_clients: "عميل سعيد",
      about_eyebrow: "نبذة عني", about_title: "من أنا؟",
      about_text: 'أُدعى <strong>Only</strong>، مطوّر واجهات أمامية شغوف بتحويل الأفكار المجرّدة إلى واجهات حيّة يشعر فيها المستخدم بالراحة والانسيابية. أعمل على تحويل التصاميم إلى كود نظيف، منظم، وسريع، مع اهتمام دائم بأدق التفاصيل: من توقيت الحركة إلى تباعد الحروف. أؤمن أن التجربة الرقمية الجيدة لا تُلاحظ — بل تُشعَر.',
      projects_eyebrow: "المشاريع", projects_title: "أعمال مختارة",
      contact_eyebrow: "التواصل", contact_title: "لنبدأ شيئًا رائعًا معًا",
      contact_desc: "لديك فكرة أو مشروع؟ راسلني على أي من القنوات التالية، وسأعود إليك في أقرب وقت.",
      contact_cta: "راسلني",
      footer_copy: "جميع الحقوق محفوظة.",
      copy_ok: "تم نسخ {label} ✓", copy_fail: "تعذّر النسخ، حاول يدويًا",
    },
    en: {
      title: "Only — Front-end Developer",
      meta_desc: "Only's personal website, a front-end developer.",
      nav_home: "Home", nav_about: "About", nav_projects: "Projects", nav_contact: "Contact",
      home_page_title: "Home — Only",
      about_page_title: "About — Only",
      projects_page_title: "Projects — Only",
      contact_page_title: "Contact — Only",
      lang_label: "ع",
      hero_available: "Made by Only",
      hero_subtitle: "Hi, my name is",
      hero_cta_projects: "View My Work", hero_cta_contact: "Get in Touch",
      stat_years: "Years Experience", stat_projects: "Projects Done", stat_clients: "Happy Clients",
      about_eyebrow: "About Me", about_title: "Who Am I?",
      about_text: 'I\'m <strong>Only</strong>, a passionate front-end developer who transforms abstract ideas into alive interfaces. I convert designs into clean, organized, and fast code, with constant attention to the finest details. I believe good digital experiences aren\'t noticed — they\'re felt.',
      projects_eyebrow: "Projects", projects_title: "Selected Works",
      contact_eyebrow: "Contact", contact_title: "Let\'s Start Something Amazing Together",
      contact_desc: "Have an idea or a project? Reach out and I\'ll get back to you ASAP.",
      contact_cta: "Message Me",
      footer_copy: "All rights reserved.",
      copy_ok: "{label} copied ✓", copy_fail: "Failed to copy, try manually",
    }
  };

  function load(key, fallback) {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : JSON.parse(JSON.stringify(fallback));
  }
  function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

  function getTranslations() { return load("only-admin-translations", defaultTranslations); }
  function getProjects() { return load("only-admin-projects", defaultProjects); }
  function getLinks() { return load("only-admin-links", defaultLinks); }
  function getTheme() { return load("only-admin-theme", defaultTheme); }

  const defaultSettings = { maintenance: false, siteNameAr: "Only", siteNameEn: "Only" };
  function getSettings() { return load("only-admin-settings", defaultSettings); }

  /* ============ SETTINGS DOM ============ */
  const maintenanceToggle = document.getElementById("maintenanceToggle");
  const maintenanceLabel = document.getElementById("maintenanceLabel");
  const siteNameAr = document.getElementById("siteNameAr");
  const siteNameEn = document.getElementById("siteNameEn");
  const animationsToggle = document.getElementById("animationsToggle");
  const animationsLabel = document.getElementById("animationsLabel");
  const adminBgFileDark = document.getElementById("adminBgFileDark");
  const adminBgPreviewDark = document.getElementById("adminBgPreviewDark");
  const adminBgRemoveDark = document.getElementById("adminBgRemoveDark");
  const adminBgFileLight = document.getElementById("adminBgFileLight");
  const adminBgPreviewLight = document.getElementById("adminBgPreviewLight");
  const adminBgRemoveLight = document.getElementById("adminBgRemoveLight");
  const adminBgOpacity = document.getElementById("adminBgOpacity");

  function loadSettings() {
    const s = getSettings();
    if (maintenanceToggle) { maintenanceToggle.checked = s.maintenance; }
    if (maintenanceLabel) { maintenanceLabel.textContent = s.maintenance ? "مفعّل" : "معطّل"; }
    if (siteNameAr) { siteNameAr.value = s.siteNameAr || ""; }
    if (siteNameEn) { siteNameEn.value = s.siteNameEn || ""; }
  }

  function setPreview(el, img) {
    if (!el) return;
    if (img) {
      el.innerHTML = '<img src="' + escHtml(img) + '" alt="bg">';
      el.classList.add("has-image");
    } else {
      el.innerHTML = '<span class="admin-bg-preview__placeholder" data-i18n="admin_bg_placeholder">لا توجد صورة</span>';
      el.classList.remove("has-image");
    }
  }

  function loadBgPreview() {
    const s = getSettings();
    setPreview(adminBgPreviewDark, s.bgImageDark);
    setPreview(adminBgPreviewLight, s.bgImageLight);
    if (adminBgOpacity) { adminBgOpacity.value = s.bgOpacity !== undefined ? s.bgOpacity : 30; }
  }

  function loadAnimationsToggle() {
    const s = getSettings();
    const enabled = s.animations !== false;
    if (animationsToggle) { animationsToggle.checked = enabled; }
    if (animationsLabel) { animationsLabel.textContent = enabled ? "مفعّل" : "معطّل"; }
  }

  function saveSettings() {
    const existing = getSettings();
    const s = {
      maintenance: maintenanceToggle ? maintenanceToggle.checked : existing.maintenance,
      siteNameAr: siteNameAr ? siteNameAr.value.trim() : (existing.siteNameAr || "Only"),
      siteNameEn: siteNameEn ? siteNameEn.value.trim() : (existing.siteNameEn || "Only"),
      animations: animationsToggle ? animationsToggle.checked : (existing.animations !== false),
    };
    if (existing.bgImageDark) s.bgImageDark = existing.bgImageDark;
    if (existing.bgImageLight) s.bgImageLight = existing.bgImageLight;
    if (existing.bgImage) s.bgImage = existing.bgImage;
    if (existing.bgOpacity !== undefined) s.bgOpacity = existing.bgOpacity;
    save("only-admin-settings", s);
    if (site.applyAnimations) site.applyAnimations();
  }

  /* ============ PROJECTS LIST REF ============ */
  const projectsList = document.getElementById("adminProjectsList");
  const gradients = ["#6d4fe0,#2c2350", "#d1548f,#3a1730", "#e0a94f,#33220c", "#4fb8d1,#142833", "#8b6bff,#3a1730", "#f472b6,#2c2350"];

  /* ============ PIN LOCK ============ */
  const adminLock = document.getElementById("adminLock");
  const adminPanel = document.getElementById("adminPanel");
  const pinInput = document.getElementById("pinInput");
  const pinDots = document.getElementById("pinDots");
  const pinError = document.getElementById("pinError");
  const pinBtn = document.getElementById("pinBtn");

  function updateDots(len) {
    if (!pinDots) return;
    pinDots.querySelectorAll("span").forEach((dot, i) => dot.classList.toggle("filled", i < len));
  }

  if (pinInput) {
    pinInput.addEventListener("input", () => {
      pinInput.value = pinInput.value.replace(/\D/g, "");
      updateDots(pinInput.value.length);
      if (pinError) pinError.classList.remove("show");
    });
  }

  function unlock() {
    if (adminLock) adminLock.classList.add("hidden");
    if (adminPanel) adminPanel.classList.add("active");
    loadFormValues();
    loadSettings();
    loadBgPreview();
    loadAnimationsToggle();
    renderProjects();
  }

  if (pinBtn) {
    pinBtn.addEventListener("click", () => {
      if (!pinInput) return;
      if (pinInput.value === PIN) {
        sessionStorage.setItem("only-admin-auth", "1");
        unlock();
      } else {
        if (pinError) pinError.classList.add("show");
        pinInput.value = "";
        updateDots(0);
        pinInput.focus();
      }
    });
  }

  if (pinInput) {
    pinInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && pinBtn) pinBtn.click(); });
  }
  if (sessionStorage.getItem("only-admin-auth")) unlock();

  /* ============ TOAST ============ */
  const adminToast = document.getElementById("adminToast");
  let toastTimer;
  function showToast(msg) {
    if (!adminToast) return;
    adminToast.textContent = msg;
    adminToast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => adminToast.classList.remove("show"), 2200);
  }

  /* ============ TABS ============ */
  document.querySelectorAll(".admin-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".admin-section").forEach((s) => s.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`.admin-section[data-content="${tab.dataset.tab}"]`).classList.add("active");
    });
  });

  /* ============ LOAD FORM VALUES ============ */
  function loadFormValues() {
    const t = getTranslations();
    const links = getLinks();
    const theme = getTheme();

    document.querySelectorAll("[data-key]").forEach((input) => {
      const key = input.dataset.key;
      const lang = input.dataset.lang;
      if (t[lang] && t[lang][key] !== undefined) input.value = t[lang][key];
    });

    document.querySelectorAll("[data-link]").forEach((input) => {
      if (links[input.dataset.link]) input.value = links[input.dataset.link];
    });

    document.querySelectorAll("[data-theme-var]").forEach((input) => {
      const mode = input.dataset.themeMode;
      const v = input.dataset.themeVar;
      if (theme[mode] && theme[mode][v]) input.value = theme[mode][v];
    });
  }

  /* ============ PROJECTS CRUD ============ */

  function escHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function renderProjects() {
    if (!projectsList) return;
    const projects = getProjects();
    projectsList.innerHTML = projects.map((p, i) => {
      const tags = p.tags || (p.tag ? p.tag.split(/[·,]\s*/) : []);
      const tagsHtml = tags.map((t, ti) =>
        `<span class="admin-tag" data-pid="${p.id}" data-tidx="${ti}">${escHtml(t)} <button class="admin-tag__remove" data-pid="${p.id}" data-tidx="${ti}" type="button">&times;</button></span>`
      ).join("");
      return `
      <div class="admin-project-card glass" data-id="${p.id}">
        <div class="admin-project-card__preview" style="background: linear-gradient(135deg, ${escHtml(p.gradient.split(",")[0])}, ${escHtml(p.gradient.split(",")[1])})">
          ${p.image ? `<img src="${escHtml(p.image)}" alt="" loading="lazy">` : `<span class="project-card__glyph">${escHtml((p.titleEn || "?")[0])}</span>`}
          <button class="admin-project-card__img-btn" type="button" title="إضافة صورة">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          </button>
          <input type="file" accept="image/*" class="admin-project-card__file" data-idx="${i}">
        </div>
        <div class="admin-project-card__body">
          <div class="admin-project-card__row">
            <label class="admin-field" style="flex:1">
              <span class="admin-field__label">Title (AR)</span>
              <input type="text" class="admin-input" data-pid="${p.id}" data-field="titleAr" value="${escHtml(p.titleAr)}">
            </label>
            <label class="admin-field" style="flex:1">
              <span class="admin-field__label">Title (EN)</span>
              <input type="text" class="admin-input" data-pid="${p.id}" data-field="titleEn" value="${escHtml(p.titleEn)}">
            </label>
          </div>
          <div class="admin-project-card__row">
            <label class="admin-field" style="flex:1">
              <span class="admin-field__label">Gradient</span>
              <input type="text" class="admin-input" data-pid="${p.id}" data-field="gradient" value="${escHtml(p.gradient)}" placeholder="#color1,#color2">
            </label>
            <label class="admin-field" style="flex:1">
              <span class="admin-field__label">Link</span>
              <input type="url" class="admin-input" data-pid="${p.id}" data-field="link" value="${escHtml(p.link || '')}" placeholder="https://...">
            </label>
          </div>
          <div class="admin-project-card__row">
            <label class="admin-field" style="flex:1">
              <span class="admin-field__label">Description (AR)</span>
              <textarea class="admin-input admin-textarea" data-pid="${p.id}" data-field="descAr" rows="2">${escHtml(p.descAr || '')}</textarea>
            </label>
            <label class="admin-field" style="flex:1">
              <span class="admin-field__label">Description (EN)</span>
              <textarea class="admin-input admin-textarea" data-pid="${p.id}" data-field="descEn" rows="2">${escHtml(p.descEn || '')}</textarea>
            </label>
          </div>
          <div class="admin-field">
            <span class="admin-field__label">Tags</span>
            <div class="admin-tags-editor">
              <div class="admin-tags-editor__list" data-pid="${p.id}">${tagsHtml}</div>
              <div class="admin-tags-editor__add">
                <input type="text" class="admin-input admin-tags-editor__input" data-pid="${p.id}" placeholder="Add tag...">
                <button class="admin-tags-editor__btn" type="button" data-add-tag="${p.id}" title="Add tag">+</button>
              </div>
            </div>
          </div>
          <div class="admin-project-card__actions">
            <button class="admin-project-card__delete" type="button" data-delete="${p.id}" title="حذف المشروع">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              حذف
            </button>
          </div>
        </div>
      </div>`;
    }).join("");

    projectsList.querySelectorAll(".admin-project-card__file").forEach((input) => {
      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 500 * 1024) { showToast("الصورة كبيرة جدًا (الحد الأقصى 500KB)"); return; }
        const reader = new FileReader();
        reader.onload = (ev) => {
          const projects = getProjects();
          const idx = parseInt(input.dataset.idx);
          projects[idx].image = ev.target.result;
          save("only-admin-projects", projects);
          renderProjects();
          showToast("تمت إضافة الصورة ✓");
        };
        reader.readAsDataURL(file);
      });
    });

    projectsList.querySelectorAll(".admin-project-card__img-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        btn.closest(".admin-project-card").querySelector(".admin-project-card__file").click();
      });
    });

    projectsList.querySelectorAll("[data-delete]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;
        const projects = getProjects().filter((p) => p.id !== btn.dataset.delete);
        save("only-admin-projects", projects);
        renderProjects();
        showToast("تم الحذف ✓");
      });
    });

    projectsList.querySelectorAll("[data-pid][data-field]").forEach((input) => {
      input.addEventListener("change", () => {
        const projects = getProjects();
        const p = projects.find((x) => x.id === input.dataset.pid);
        if (p) p[input.dataset.field] = input.value;
        save("only-admin-projects", projects);
      });
    });

    projectsList.querySelectorAll(".admin-tag__remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const projects = getProjects();
        const p = projects.find((x) => x.id === btn.dataset.pid);
        if (!p) return;
        const tags = p.tags || [];
        tags.splice(parseInt(btn.dataset.tidx), 1);
        p.tags = tags;
        save("only-admin-projects", projects);
        renderProjects();
      });
    });

    projectsList.querySelectorAll(".admin-tags-editor__input").forEach((input) => {
      input.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        addTag(input.dataset.pid, input);
      });
    });

    projectsList.querySelectorAll("[data-add-tag]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = projectsList.querySelector('.admin-tags-editor__input[data-pid="' + btn.dataset.addTag + '"]');
        if (input) addTag(btn.dataset.addTag, input);
      });
    });
  }

  function addTag(pid, input) {
    const val = input.value.trim();
    if (!val) return;
    const projects = getProjects();
    const p = projects.find((x) => x.id === pid);
    if (!p) return;
    if (!p.tags) p.tags = [];
    if (p.tags.indexOf(val) !== -1) { showToast("التاج موجود بالفعل"); return; }
    p.tags.push(val);
    save("only-admin-projects", projects);
    input.value = "";
    renderProjects();
    const newInput = projectsList.querySelector('.admin-tags-editor__input[data-pid="' + pid + '"]');
    if (newInput) newInput.focus();
  }

  const addProjectBtn = document.getElementById("addProjectBtn");
  if (addProjectBtn) {
    addProjectBtn.addEventListener("click", () => {
      const projects = getProjects();
      const idx = projects.length;
      projects.push({
        id: "p" + Date.now(),
        titleAr: "مشروع جديد",
        titleEn: "New Project",
        descAr: "",
        descEn: "",
        tags: ["HTML", "CSS", "JS"],
        gradient: gradients[idx % gradients.length],
        image: "",
        link: ""
      });
      save("only-admin-projects", projects);
      renderProjects();
      showToast("تمت الإضافة ✓");
    });
  }

  /* ============ CONTACT METHODS ============ */
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

  function getContactMethods() { return load("only-admin-contact-methods", []); }
  function saveContactMethods(m) { save("only-admin-contact-methods", m); }

  function renderContactMethods() {
    const list = document.getElementById("adminContactMethodsList");
    if (!list) return;
    const methods = getContactMethods();
    const iconOpts = Object.keys(contactIcons).map(function(k) { return '<option value="' + k + '">' + k.charAt(0).toUpperCase() + k.slice(1) + '</option>'; }).join("");
    list.innerHTML = methods.map(function(m) {
      return '<div class="admin-contact-method-card glass" data-cm-id="' + m.id + '">' +
        '<div class="admin-contact-method-card__preview">' + (contactIcons[m.icon] || contactIcons.link) + '</div>' +
        '<div class="admin-contact-method-card__icon-select">' +
          '<select class="admin-cm-icon" data-cm-id="' + m.id + '">' +
            Object.keys(contactIcons).map(function(k) {
              return '<option value="' + k + '"' + (m.icon === k ? ' selected' : '') + '>' + k.charAt(0).toUpperCase() + k.slice(1) + '</option>';
            }).join("") +
          '</select>' +
        '</div>' +
        '<label class="admin-field" style="flex:1"><span class="admin-field__label">Label</span><input type="text" class="admin-input admin-cm-label" data-cm-id="' + m.id + '" value="' + escHtml(m.label) + '"></label>' +
        '<label class="admin-field" style="flex:2"><span class="admin-field__label">URL</span><input type="url" class="admin-input admin-cm-url" data-cm-id="' + m.id + '" value="' + escHtml(m.url) + '" placeholder="https://..."></label>' +
        '<label class="admin-field" style="flex:1"><span class="admin-field__label">Display Text</span><input type="text" class="admin-input admin-cm-display" data-cm-id="' + m.id + '" value="' + escHtml(m.display || '') + '" placeholder="@username"></label>' +
        '<button class="admin-contact-method-card__delete" type="button" data-cm-delete="' + m.id + '" title="حذف">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>' +
        '</button>' +
      '</div>';
    }).join("");

    list.querySelectorAll(".admin-cm-icon").forEach(function(sel) {
      sel.addEventListener("change", function() {
        var methods = getContactMethods();
        var cm = methods.find(function(x) { return x.id === sel.dataset.cmId; });
        if (cm) cm.icon = sel.value;
        saveContactMethods(methods);
        renderContactMethods();
      });
    });
    list.querySelectorAll(".admin-cm-label, .admin-cm-url, .admin-cm-display").forEach(function(input) {
      input.addEventListener("change", function() {
        var methods = getContactMethods();
        var cm = methods.find(function(x) { return x.id === input.dataset.cmId; });
        if (!cm) return;
        if (input.classList.contains("admin-cm-label")) cm.label = input.value;
        if (input.classList.contains("admin-cm-url")) cm.url = input.value;
        if (input.classList.contains("admin-cm-display")) cm.display = input.value;
        saveContactMethods(methods);
      });
    });
    list.querySelectorAll("[data-cm-delete]").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var methods = getContactMethods().filter(function(x) { return x.id !== btn.dataset.cmDelete; });
        saveContactMethods(methods);
        renderContactMethods();
        showToast("تم الحذف ✓");
      });
    });
  }

  var addContactMethodBtn = document.getElementById("addContactMethodBtn");
  if (addContactMethodBtn) {
    addContactMethodBtn.addEventListener("click", function() {
      var methods = getContactMethods();
      methods.push({ id: "cm" + Date.now(), icon: "link", label: "", url: "", display: "" });
      saveContactMethods(methods);
      renderContactMethods();
      showToast("تمت الإضافة ✓");
    });
  }

  renderContactMethods();

  /* ============ SAVE ALL ============ */
  const adminSaveBtn = document.getElementById("adminSave");
  if (adminSaveBtn) {
    adminSaveBtn.addEventListener("click", () => {
    const t = getTranslations();
    const links = getLinks();
    const theme = getTheme();

    document.querySelectorAll("[data-key]").forEach((input) => {
      const key = input.dataset.key;
      const lang = input.dataset.lang;
      if (!t[lang]) t[lang] = {};
      t[lang][key] = input.value;
    });

    document.querySelectorAll("[data-link]").forEach((input) => {
      links[input.dataset.link] = input.value;
    });

    document.querySelectorAll("[data-theme-var]").forEach((input) => {
      const mode = input.dataset.themeMode;
      const v = input.dataset.themeVar;
      if (!theme[mode]) theme[mode] = {};
      theme[mode][v] = input.value;
    });

    save("only-admin-translations", t);
    save("only-admin-links", links);
    save("only-admin-theme", theme);
    saveSettings();
    if (site.renderProjects) site.renderProjects();
    showToast("تم الحفظ بنجاح ✓");
    });
  }

  /* ============ PREVIEW ============ */
  const adminPreviewBtn = document.getElementById("adminPreview");
  if (adminPreviewBtn) {
    adminPreviewBtn.addEventListener("click", () => {
      window.location.hash = "#home";
    });
  }

  /* ============ LOGOUT ============ */
  const adminLogoutBtn = document.getElementById("adminLogout");
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("only-admin-auth");
      if (adminPanel) adminPanel.classList.remove("active");
      if (adminLock) adminLock.classList.remove("hidden");
      if (pinInput) { pinInput.value = ""; updateDots(0); pinInput.focus(); }
    });
  }

  /* ============ THEME PREVIEW ============ */
  document.querySelectorAll(".admin-color").forEach((input) => {
    input.addEventListener("input", () => {
      root.dataset.theme = input.dataset.themeMode;
      root.style.setProperty(input.dataset.themeVar, input.value);
    });
  });

  /* ============ ADMIN LANG TOGGLE ============ */
  const adminLangToggle = document.getElementById("adminLangToggle");
  if (adminLangToggle) {
    adminLangToggle.addEventListener("click", () => {
      const newLang = root.dataset.lang === "ar" ? "en" : "ar";
      if (site.setLang) site.setLang(newLang);
      if (site.renderProjects) site.renderProjects();
    });
  }

  /* ============ BG + ANIMATIONS EVENT LISTENERS ============ */
  if (maintenanceToggle) {
    maintenanceToggle.addEventListener("change", () => {
      maintenanceLabel.textContent = maintenanceToggle.checked ? "مفعّل" : "معطّل";
    });
  }

  if (animationsToggle) {
    animationsToggle.addEventListener("change", () => {
      animationsLabel.textContent = animationsToggle.checked ? "مفعّل" : "معطّل";
    });
  }

  function bindBgUpload(fileInput, removeBtn, key) {
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { showToast("الصورة كبيرة جدًا (الحد الأقصى 2MB)"); return; }
        const reader = new FileReader();
        reader.onload = (ev) => {
          const s = getSettings();
          s[key] = ev.target.result;
          save("only-admin-settings", s);
          loadBgPreview();
          if (site.applyBgImage) site.applyBgImage();
          showToast("تمت إضافة الخلفية ✓");
        };
        reader.readAsDataURL(file);
      });
    }
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        const s = getSettings();
        delete s[key];
        save("only-admin-settings", s);
        loadBgPreview();
        if (site.applyBgImage) site.applyBgImage();
        showToast("تمت إزالة الخلفية ✓");
      });
    }
  }

  bindBgUpload(adminBgFileDark, adminBgRemoveDark, "bgImageDark");
  bindBgUpload(adminBgFileLight, adminBgRemoveLight, "bgImageLight");

  if (adminBgOpacity) {
    adminBgOpacity.addEventListener("input", () => {
      const s = getSettings();
      s.bgOpacity = parseInt(adminBgOpacity.value);
      save("only-admin-settings", s);
      if (site.applyBgImage) site.applyBgImage();
    });
  }

})();
