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
  const adminBgFile = document.getElementById("adminBgFile");
  const adminBgPreview = document.getElementById("adminBgPreview");
  const adminBgRemove = document.getElementById("adminBgRemove");
  const adminBgOpacity = document.getElementById("adminBgOpacity");

  function loadSettings() {
    const s = getSettings();
    if (maintenanceToggle) { maintenanceToggle.checked = s.maintenance; }
    if (maintenanceLabel) { maintenanceLabel.textContent = s.maintenance ? "مفعّل" : "معطّل"; }
    if (siteNameAr) { siteNameAr.value = s.siteNameAr || ""; }
    if (siteNameEn) { siteNameEn.value = s.siteNameEn || ""; }
  }

  const adminBgThemeLabel = document.getElementById("adminBgThemeLabel");

  function loadBgPreview() {
    if (!adminBgPreview) return;
    const s = getSettings();
    const mode = root.dataset.theme || "dark";
    const img = s["bgImage" + (mode === "light" ? "Light" : "Dark")] || s.bgImage;
    if (adminBgThemeLabel) {
      adminBgThemeLabel.textContent = mode === "light" ? "Light Mode" : "Dark Mode";
    }
    if (img) {
      adminBgPreview.innerHTML = '<img src="' + escHtml(img) + '" alt="bg">';
      adminBgPreview.classList.add("has-image");
    } else {
      adminBgPreview.innerHTML = '<span class="admin-bg-preview__placeholder" data-i18n="admin_bg_placeholder">لا توجد صورة</span>';
      adminBgPreview.classList.remove("has-image");
    }
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
                <input type="text" class="admin-input admin-tags-editor__input" data-pid="${p.id}" placeholder="Add tag + Enter">
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
        const val = input.value.trim();
        if (!val) return;
        const projects = getProjects();
        const p = projects.find((x) => x.id === input.dataset.pid);
        if (!p) return;
        if (!p.tags) p.tags = [];
        p.tags.push(val);
        save("only-admin-projects", projects);
        input.value = "";
        renderProjects();
      });
    });
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
      window.location.hash = "#projects";
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
      loadBgPreview();
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

  if (adminBgFile) {
    adminBgFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) { showToast("الصورة كبيرة جدًا (الحد الأقصى 2MB)"); return; }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const s = getSettings();
        const mode = root.dataset.theme || "dark";
        s["bgImage" + (mode === "light" ? "Light" : "Dark")] = ev.target.result;
        save("only-admin-settings", s);
        loadBgPreview();
        if (site.applyBgImage) site.applyBgImage();
        showToast("تمت إضافة الخلفية ✓");
      };
      reader.readAsDataURL(file);
    });
  }

  if (adminBgRemove) {
    adminBgRemove.addEventListener("click", () => {
      const s = getSettings();
      const mode = root.dataset.theme || "dark";
      delete s["bgImage" + (mode === "light" ? "Light" : "Dark")];
      save("only-admin-settings", s);
      loadBgPreview();
      if (site.applyBgImage) site.applyBgImage();
      showToast("تمت إزالة الخلفية ✓");
    });
  }

  if (adminBgOpacity) {
    adminBgOpacity.addEventListener("input", () => {
      const s = getSettings();
      s.bgOpacity = parseInt(adminBgOpacity.value);
      save("only-admin-settings", s);
      if (site.applyBgImage) site.applyBgImage();
    });
  }

})();
