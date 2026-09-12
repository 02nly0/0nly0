"use strict";
(function () {
    // Render Lucide icons (https://lucide.dev) — replaces every
    // <i data-lucide="..."> with an inline <svg class="lucide ...">
    if (window.lucide) {
        window.lucide.createIcons();
    }
    const toastEl = document.getElementById('toast');
    let toastTimer = null;
    function showToast(msg) {
        if (!toastEl)
            return;
        // Clear any pending hide-timer first — without this, tapping the
        // trigger repeatedly stacks up timeouts that all keep a closure
        // (and toastEl) alive in memory until they fire one by one.
        if (toastTimer)
            clearTimeout(toastTimer);
        toastEl.textContent = msg;
        toastEl.classList.add('show');
        toastTimer = setTimeout(() => {
            toastEl.classList.remove('show');
            toastTimer = null;
        }, 1800);
    }
    // ----- Tab navigation between Home and Projects -----
    // A single delegated listener on the nav container instead of one
    // listener per button — fewer live listeners to keep in memory,
    // and it keeps working if more tabs get added later.
    const pageNav = document.querySelector('.page-nav');
    const navButtons = document.querySelectorAll('.page-nav button');
    const views = document.querySelectorAll('.view');
    if (pageNav) {
        pageNav.addEventListener('click', function (e) {
            const target = e.target;
            const btn = target === null || target === void 0 ? void 0 : target.closest('button[data-view]');
            if (!btn)
                return;
            const view = btn.dataset.view;
            if (!view)
                return;
            const targetView = document.getElementById('view-' + view);
            if (!targetView)
                return;
            navButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            views.forEach((v) => v.classList.remove('active'));
            targetView.classList.add('active');
        });
    }
    // ----- Discord accordion -----
    const discordToggle = document.getElementById('discordToggle');
    const discordCollapse = document.getElementById('discordCollapse');
    if (discordToggle && discordCollapse) {
        discordToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            discordCollapse.classList.toggle('open');
            // Load the Discord embed image on first open only — it sits
            // hidden by default, so there's no reason to spend memory /
            // bandwidth downloading it until the person actually opens it.
            const discordImg = discordCollapse.querySelector('img[data-src]');
            if (discordImg && discordImg.dataset.src) {
                discordImg.src = discordImg.dataset.src;
                discordImg.removeAttribute('data-src');
            }
        });
    }
})();
//# sourceMappingURL=script.js.map