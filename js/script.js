(async () => {
  "use strict";

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) document.body.classList.add("no-anim");

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
      contact_eyebrow: "التواصل", contact_title: "لنبدأ شيئًا رائعًا معًا",
      contact_desc: "لديك فكرة أو مشروع؟ راسلني على أي من القنوات التالية، وسأعود إليك في أقرب وقت.",
      footer_copy: "جميع الحقوق محفوظة.",
      project_visit: "زيارة المشروع",
      copy_ok: "تم نسخ {label} ✓", copy_fail: "تعذّر النسخ، حاول يدويًا",
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
      about_text: "I'm <strong>Only</strong>, a passionate front-end developer who transforms abstract ideas into alive interfaces. I convert designs into clean, organized, and fast code, with constant attention to detail: from animation timing to letter spacing. I believe good digital experiences aren't noticed — they're felt.",
      projects_eyebrow: "Projects", projects_title: "Selected Works",
      contact_eyebrow: "Contact", contact_title: "Let's Start Something Amazing Together",
      contact_desc: "Have an idea or a project? Reach out and I'll get back to you ASAP.",
      footer_copy: "All rights reserved.",
      project_visit: "Visit Project",
      copy_ok: "{label} copied ✓", copy_fail: "Failed to copy, try manually",
    }
  };

  const translations = JSON.parse(JSON.stringify(defaultTranslations));

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
        if (el.tagName === "TITLE") {
          el.textContent = t[key];
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
    if (t[titleMap[id]]) {
      document.title = t[titleMap[id]];
    }

    if (projectModal) projectModal.style.display = "";
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    requestAnimationFrame(() => observeCards());
  }

  function getHash() {
    const h = window.location.hash.replace("#", "");
    return ["home", "about", "projects", "contact"].includes(h) ? h : "home";
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

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("only-theme", theme);
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
     PROJECTS — ONLY 1 PROJECT
     ============================================================ */
  const projects = [
    { 
      id: "p1", 
      titleAr: "OnlyTiers bot", 
      titleEn: "OnlyTiers Bot", 
      descAr: "OnlyTiers - Using the **Tiers APIs** to let you check a player's tiers in Discord :)",
      descEn: "OnlyTiers - Using the Tiers APIs to let you check a player's tiers in Discord :)",
      tags: ["MCTIERS", "PVPTIERS", "&more"],
      gradient: "#6d4fe0,#2c2350",
      image: https://i.postimg.cc/ZRmg1z20/file-00000000bf5081f4bae6255911bf86ad.png,
      userImage: https://i.postimg.cc/3NJqxC3g/Picsart-26-07-30-14-04-43-572.jpg,
      link: "https://discord.com/oauth2/authorize?client_id=1529714167546646682"
    }
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
    const lang = root.dataset.lang || "ar";
    grid.innerHTML = projects.map(function(p, i) {
      const grad = p.gradient || "#6d4fe0,#2c2350";
      const colors = grad.split(",");
      const title = lang === "ar" ? escHtml(p.titleAr) : escHtml(p.titleEn);
      const glyph = escHtml((p.titleEn || "?")[0]);
      const artStyle = p.image
        ? "background-image:url(" + escUrl(p.image) + ");background-size:cover;background-position:center;"
        : "background:linear-gradient(135deg," + escHtml(colors[0]) + "," + escHtml(colors[1] || colors[0]) + ");";
      const tags = p.tags || [];
      const tagsHtml = tags.map(function(t){ return '<span class="project-card__tag">' + escHtml(t.trim()) + '</span>'; }).join("");
      
      const userImageHtml = p.userImage 
        ? '<img src="' + escUrl(p.userImage) + '" alt="' + title + ' user" class="project-card__user-img">'
        : '<div class="project-card__user-placeholder">' + glyph + '</div>';

      return '<article class="project-card glass" data-project-idx="' + i + '">' +
        '<div class="project-card__top">' +
          '<div class="project-card__art" style="' + artStyle + '">' +
            (p.image ? '<img src="' + escUrl(p.image) + '" alt="' + title + '" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;">' : '<span class="project-card__glyph">' + glyph + '</span>') +
          '</div>' +
          '<div class="project-card__user">' +
            userImageHtml +
          '</div>' +
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
  function openProjectModal(idx) {
    const p = projects[idx];
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
    if (link && link !== "#") {
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

})();
