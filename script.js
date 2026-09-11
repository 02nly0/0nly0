(function() {
    const toastEl = document.getElementById('toast');

    function showToast(msg) {
        toastEl.textContent = msg;
        toastEl.classList.add('show');
        setTimeout(() => toastEl.classList.remove('show'), 1800);
    }

    // ----- Tab navigation between Home and Projects -----
    const navButtons = document.querySelectorAll('.page-nav button');
    const views = document.querySelectorAll('.view');

    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.view;

            navButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            views.forEach(v => v.classList.remove('active'));
            document.getElementById('view-' + target).classList.add('active');
        });
    });

    // ----- Discord accordion -----
    const discordToggle = document.getElementById('discordToggle');
    const discordCollapse = document.getElementById('discordCollapse');
    if (discordToggle && discordCollapse) {
        discordToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            discordCollapse.classList.toggle('open');
        });
    }

    const mobileBtn = document.querySelector('.mobile-view-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            showToast('Mobile view simulated');
        });
    }

    const avatarIcon = document.querySelector('.avatar i');
    if (avatarIcon) {
        avatarIcon.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.4s ease';
            this.style.transform = 'rotate(10deg) scale(1.05)';
        });
        avatarIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    }

    console.log('✅ Only profile ready');
})();
