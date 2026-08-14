(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    document.addEventListener('DOMContentLoaded', function () {
        initPreloader();
        initCursor();
        initMagnetic();
        initReveal();
        initNavProgress();
        initCounters();
        initRoleSwitch();
        initBackToTop();
    });

    // Fake-but-smooth loading bar that always resolves to 100%.
    function initPreloader() {
        var preloader = document.getElementById('preloader');
        var numberEl = document.getElementById('preloader-number');
        var fillEl = document.getElementById('preloader-fill');
        if (!preloader) return;

        if (prefersReducedMotion) {
            finish();
            return;
        }

        var progress = 0;
        var timer = window.setInterval(function () {
            progress += Math.random() * 18;
            if (progress >= 100) {
                progress = 100;
                window.clearInterval(timer);
                window.setTimeout(finish, 250);
            }
            render(progress);
        }, 140);

        function render(value) {
            var rounded = Math.round(value);
            if (numberEl) numberEl.textContent = rounded;
            if (fillEl) fillEl.style.width = rounded + '%';
        }

        function finish() {
            render(100);
            preloader.classList.add('is-done');
            document.body.classList.add('is-loaded');
            preloader.setAttribute('aria-hidden', 'true');
        }
    }

    // Two-part cursor: a dot that tracks instantly, a ring that eases behind it.
    function initCursor() {
        if (isCoarsePointer) return;

        var dot = document.getElementById('cursor-dot');
        var ring = document.getElementById('cursor-ring');
        if (!dot || !ring) return;

        var mouseX = window.innerWidth / 2;
        var mouseY = window.innerHeight / 2;
        var ringX = mouseX;
        var ringY = mouseY;

        window.addEventListener('mousemove', function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px)';
        });

        var hoverTargets = 'a, button, [data-magnetic], .work-card, .capability-row';
        document.addEventListener('mouseover', function (event) {
            if (event.target.closest(hoverTargets)) {
                ring.classList.add('is-active');
            }
        });
        document.addEventListener('mouseout', function (event) {
            if (event.target.closest(hoverTargets)) {
                ring.classList.remove('is-active');
            }
        });

        function tick() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            ring.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px)';
            window.requestAnimationFrame(tick);
        }
        window.requestAnimationFrame(tick);
    }

    // Buttons/links gently pull toward the cursor while hovered.
    function initMagnetic() {
        if (isCoarsePointer || prefersReducedMotion) return;

        var elements = document.querySelectorAll('[data-magnetic]');
        elements.forEach(function (el) {
            el.addEventListener('mousemove', function (event) {
                var bounds = el.getBoundingClientRect();
                var relX = event.clientX - bounds.left - bounds.width / 2;
                var relY = event.clientY - bounds.top - bounds.height / 2;
                el.style.transform = 'translate(' + relX * 0.3 + 'px, ' + relY * 0.3 + 'px)';
            });

            el.addEventListener('mouseleave', function () {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Fades sections/elements in as they enter the viewport.
    function initReveal() {
        var targets = document.querySelectorAll('[data-reveal]');
        if (!targets.length) return;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            targets.forEach(function (el) { el.classList.add('in-view'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

        targets.forEach(function (el) { observer.observe(el); });
    }

    // Thin bar under the nav that fills as the page is scrolled.
    function initNavProgress() {
        var bar = document.getElementById('nav-progress');
        if (!bar) return;

        function update() {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var ratio = docHeight > 0 ? scrollTop / docHeight : 0;
            bar.style.width = (ratio * 100) + '%';
        }

        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    // Counts each stat up to its target once it scrolls into view.
    function initCounters() {
        var counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        function animateCounter(el) {
            var target = parseInt(el.getAttribute('data-count'), 10) || 0;

            if (prefersReducedMotion || typeof window.anime !== 'function') {
                el.textContent = target;
                return;
            }

            var proxy = { value: 0 };
            window.anime({
                targets: proxy,
                value: target,
                round: 1,
                easing: 'easeOutCubic',
                duration: 1400,
                update: function () {
                    el.textContent = proxy.value;
                }
            });
        }

        if (!('IntersectionObserver' in window)) {
            counters.forEach(animateCounter);
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        counters.forEach(function (el) { observer.observe(el); });
    }

    // Cycles the role label in the hero subhead.
    function initRoleSwitch() {
        var el = document.getElementById('role-switch');
        if (!el || prefersReducedMotion) return;

        var roles = ['Product Designer', 'Visual Designer', 'Motion Designer', 'Brand Designer'];
        var index = 0;

        window.setInterval(function () {
            index = (index + 1) % roles.length;
            el.style.opacity = '0';
            window.setTimeout(function () {
                el.textContent = roles[index];
                el.style.opacity = '1';
            }, 250);
        }, 2600);

        el.style.transition = 'opacity 0.25s ease';
    }

    function initBackToTop() {
        var button = document.getElementById('to-top');
        if (!button) return;

        button.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }
})();
