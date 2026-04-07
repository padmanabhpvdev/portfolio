AOS.init({
    duration: 1000,once: true,offset: 100,easing: 'ease-out-cubic'
});
const typed = new Typed('.typed-text', {
    strings: ['Computer Programmer', 'Web Developer', 'Designer', 'Techie','Sound Engineer','Fitness Enthusiast'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1800,
    loop: true,
    showCursor: false
});
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#c084fc';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'rgba(100, 108, 255, 0.5)';
        });
    });
}
const links = document.querySelectorAll(".nav-link");
const indicator = document.getElementById("indicator");
const sections = document.querySelectorAll(".section");
function moveIndicator(el) {
    if (!el) return;
    requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const parentRect = el.parentElement.parentElement.getBoundingClientRect();
        if (window.innerWidth <= 768) {
            indicator.style.width = rect.width + "px";
            indicator.style.left = (rect.left - parentRect.left) + "px";
            indicator.style.height = "100%";
            indicator.style.top = "";
        } else {
            indicator.style.height = rect.height + "px";
            indicator.style.top = (rect.top - parentRect.top) + "px";
            indicator.style.width = "100%";
            indicator.style.left = "";
        }
    });
}
function updateActiveLink() {
    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
            current = section.getAttribute("id");
        }
    });
    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
            link.style.color = "#ffffff";
        } else {
            link.style.color = "#94a3b8";
        }
    });
    const active = document.querySelector(".nav-link.active");
    if (active) moveIndicator(active);
}
window.addEventListener("scroll", updateActiveLink);
window.addEventListener("resize", () => {
    const active = document.querySelector(".nav-link.active");
    if (active) moveIndicator(active);
});
links.forEach(link => {
    link.addEventListener("click", (e) => {
        setTimeout(() => {
            const active = document.querySelector(".nav-link.active");
            if (active) moveIndicator(active);
        }, 100);
    });
});
updateActiveLink();
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && !bar.style.width) {
            const width = bar.style.width;
            bar.style.transition = 'width 1s ease';
        }
    });
};
window.addEventListener('scroll', animateSkills);
setTimeout(animateSkills, 500);
const statNumbers = document.querySelectorAll('.stat-number');
const animateStats = () => {
    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && !stat.dataset.animated) {
            stat.dataset.animated = 'true';
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const increment = target / 50;
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    stat.innerText = Math.floor(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            updateCounter();
        }
    });
};
window.addEventListener('scroll', animateStats);
animateStats();
const swiper = new Swiper('.project-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    },
    autoplay: { delay: 4000, disableOnInteraction: false }
});
const form = document.getElementById('contactForm');
const feedbackDiv = document.getElementById('formFeedback');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('msgError').innerText = '';
    if (name === '') {
        document.getElementById('nameError').innerText = 'Please enter your name';
        isValid = false;
    }
    if (email === '' || !email.includes('@')) {
        document.getElementById('emailError').innerText = 'Valid email required';
        isValid = false;
    }
    if (message === '') {
        document.getElementById('msgError').innerText = 'Message cannot be empty';
        isValid = false;
    }
    if (isValid) {
        feedbackDiv.innerHTML = '<span style="color: #4ade80;">Message sent successfully! I\'ll get back soon.</span>';
        form.reset();
        setTimeout(() => feedbackDiv.innerHTML = '', 4000);
    } else {
        feedbackDiv.innerHTML = '<span style="color: #f87171;">Please fix errors above.</span>';
    }
});
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.3}px`;
    }
});