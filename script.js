document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active-menu');
            const icon = hamburger.querySelector('i');
            icon.className = navMenu.classList.contains('active-menu') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });
    }

    // 2. Navigation Services Dropdown
    const navServicesBtn = document.getElementById('nav-services-btn');
    const navServicesContent = document.getElementById('nav-services-content');

    if (navServicesBtn && navServicesContent) {
        navServicesBtn.addEventListener('click', (e) => {
            navServicesContent.classList.toggle('show');

            const targetSection = document.getElementById('services-section');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 2.a. Bottom View All Services Button Toggle (Fix)
    const viewAllBtn = document.querySelector('.dropdown-trigger-btn');
    const viewAllContent = document.querySelector('.dropdown-target-grid');

    if (viewAllBtn && viewAllContent) {
        viewAllBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents page from jumping up
            viewAllContent.classList.toggle('show-dropdown');
        });
    }

    // 3. Success Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    const counterSection = document.querySelector('.counter-section');
    const startCounterAnimation = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = Math.ceil(target / 160);
                if (count < target) {
                    counter.innerText = count + inc;
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { startCounterAnimation(); observer.disconnect(); }
        }, { threshold: 0.4 });
        observer.observe(counterSection);
    }

    // // 4. FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpening = !answer.style.maxHeight;

            // Loop through all questions to close every other open FAQ
            document.querySelectorAll('.faq-question').forEach(otherQuestion => {
                const otherAnswer = otherQuestion.nextElementSibling;
                otherAnswer.style.maxHeight = null;

                const otherIcon = otherQuestion.querySelector('i');
                if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
            });

            // If the clicked FAQ was closed, open it now
            if (isOpening) {
                answer.style.maxHeight = answer.scrollHeight + "px";

                const icon = question.querySelector('i');
                if (icon) icon.style.transform = "rotate(180deg)";
            }
        });
    });

    // 5. Review Smooth Scroll
    const reviewLink = document.querySelector('a[href="#reviews"]');
    if (reviewLink) {
        reviewLink.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.getElementById('reviews');
            window.scrollTo({ top: targetElement.getBoundingClientRect().top + window.pageYOffset - 150, behavior: "smooth" });
        });
    }

    // 6. Infrastructure Image Rotator with Auto ALT Label
    const imageUrls = [
        "image/clinic-entry.jpg",
        "image/operation-1.jpg",
        "image/reception.jpg",
        "image/operation-2.jpg",
        "image/clinic-night-look.jpg"
    ];

    // HTML-alt names
    const altLabels = [
        "Tooth Clinique Clinic",
        "Operation Hall",
        "Reception Area",
        "Opreation Mordern Chair",
        "Clinic Night Look"
    ];

    let currentIndex = 0;
    const mainImg = document.querySelector('.main-premium-pic');
    const subImgs = document.querySelectorAll('.sub-premium-pic');
    const mainLabel = document.getElementById('main-image-label');

    if (mainImg && mainLabel) {
        mainLabel.innerText = mainImg.alt;
    }

    function rotateClinicImages() {
        currentIndex = (currentIndex + 1) % imageUrls.length;

        if (mainImg) {
            mainImg.src = imageUrls[currentIndex];
            mainImg.alt = altLabels[currentIndex];
        }

        if (mainLabel && mainImg) {
            mainLabel.innerText = mainImg.alt;
        }

        if (subImgs.length > 0) {
            subImgs.forEach((img, i) => {
                let subIndex = (currentIndex + 1 + i) % imageUrls.length;
                img.src = imageUrls[subIndex];
                img.alt = altLabels[subIndex];
            });
        }
    }

    // 3 செகண்டுக்கு ஒருமுறை லூப் ரன் ஆகும்
    setInterval(rotateClinicImages, 3000);

});