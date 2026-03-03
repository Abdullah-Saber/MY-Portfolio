document.addEventListener("DOMContentLoaded", () => {
    
    // ────────────────────────────────────────────────
    // NEW: DYNAMIC COPYRIGHT YEAR
    // ────────────────────────────────────────────────
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.innerText = new Date().getFullYear();

    // ────────────────────────────────────────────────
    // NEW: ACTIVE NAVIGATION HIGHLIGHTING ON SCROLL
    // ────────────────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-links li a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                desktopNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' }); 

    sections.forEach(sec => navObserver.observe(sec));

    // HAMBURGER MENU LOGIC
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links li a');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if(navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // VERCEL-STYLE SPOTLIGHT MOUSE TRACKING
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // SCROLL PROGRESS BAR
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if(scrollProgress) scrollProgress.style.width = `${progress}%`;
    });

    // CUSTOM GLOWING CURSOR LOGIC
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        const hoverables = document.querySelectorAll('a, button, .interactive-card, .slider-track, .hamburger');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // 1.5 Word-by-word reveal for "About Me"
    const descElement = document.querySelector('.stagger-text');
    if (descElement) {
        const descText = descElement.innerText;
        const descWords = descText.split(" ");
        descElement.innerHTML = "";
        descWords.forEach(word => {
            if (word.trim() !== "") {
                const span = document.createElement("span");
                span.innerText = word;
                descElement.appendChild(span);
                descElement.appendChild(document.createTextNode(" "));
            }
        });
        gsap.to(".stagger-text span", {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: "power2.out", delay: 0.6
        });
    }

    // 2. Typewriter Loop Effect
    const roles = ["Fullstack C# Engineer", "3D Blender Artist", "Unity Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeTarget = document.querySelector('.typewriter-text');

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typeTarget.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeTarget.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; 
        }
        setTimeout(typeEffect, typeSpeed);
    }
    
    if (typeTarget) {
        setTimeout(typeEffect, 1000); 
    }

    // 3. SCROLL-TRIGGERED FADE UPS
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.fromTo(entry.target, 
                    { y: 50, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
                );
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        el.style.opacity = 0; 
        fadeObserver.observe(el);
    });

    // 4. Scroll To Top Button
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 5. REAL GLOBAL VISITOR COUNTER API
    const counterDisplay = document.getElementById("counterDisplay");
    if (counterDisplay) {
        const namespace = "abdullah-mohamed-portfolio-2026";
        const key = "global-site-visits";
        
        fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
            .then(response => response.json())
            .then(data => {
                const globalVisits = data.count; 
                let currentDisplayCount = 0;
                const increment = Math.max(1, Math.floor(globalVisits / 30)); 
                
                const timer = setInterval(() => {
                    currentDisplayCount += increment;
                    if (currentDisplayCount >= globalVisits) {
                        clearInterval(timer);
                        counterDisplay.innerText = globalVisits.toString().padStart(4, '0');
                    } else {
                        counterDisplay.innerText = currentDisplayCount.toString().padStart(4, '0');
                    }
                }, 40); 
            })
            .catch(error => {
                console.error("Counter API failed, displaying default.", error);
                counterDisplay.innerText = "0001";
            });
    }

    // 6. MASTER SLIDER LOGIC (DRAG TO SCROLL + ARROWS ONLY)
    const sliderWrappers = document.querySelectorAll('.slider-wrapper');
    
    sliderWrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.slider-track');
        const leftBtn = wrapper.querySelector('.left-arrow');
        const rightBtn = wrapper.querySelector('.right-arrow');
        
        let isDown = false;
        let startX;
        let scrollLeft;

        if(leftBtn) {
            leftBtn.addEventListener('click', () => {
                const itemWidth = track.querySelector('.slider-item').offsetWidth + 32;
                track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
            });
        }
        if(rightBtn) {
            rightBtn.addEventListener('click', () => {
                const itemWidth = track.querySelector('.slider-item').offsetWidth + 32;
                track.scrollBy({ left: itemWidth, behavior: 'smooth' });
            });
        }

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.classList.add('active'); 
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        
        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.classList.remove('active');
        });
        
        track.addEventListener('mouseup', () => {
            isDown = false;
            track.classList.remove('active');
        });
        
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; 
            track.scrollLeft = scrollLeft - walk;
        });
    });

    let isDragging = false;
    document.querySelectorAll('.slider-track').forEach(track => {
        track.addEventListener('mousedown', () => isDragging = false);
        track.addEventListener('mousemove', () => isDragging = true);
    });

    // 7. GALLERY LIGHTBOX
    const modal = document.getElementById("galleryModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close-modal");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const counter = document.getElementById("imageCounter");
    
    let currentGallery = [];
    let currentIndex = 0;

    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    document.querySelectorAll('.interactive-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if(isDragging) return; 

            const galleryData = card.getAttribute('data-gallery');
            if (galleryData) {
                currentGallery = galleryData.split(',').map(item => item.trim());
                currentIndex = 0;
                
                if (currentGallery.length > 0) {
                    updateModalImage();
                    modal.classList.add("show");
                }
            }
        });
    });

    function updateModalImage() {
        modalImg.src = currentGallery[currentIndex];
        counter.innerText = `${currentIndex + 1} / ${currentGallery.length}`;
        
        if(currentGallery.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateModalImage();
    });
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateModalImage();
    });
    closeBtn.addEventListener('click', () => {
        modal.classList.remove("show");
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    // 8. Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex'; 
                    gsap.fromTo(card, {opacity: 0, scale: 0.95}, {opacity: 1, scale: 1, duration: 0.4});
                } else {
                    card.style.display = 'none';
                }
            });
            
            const portfolioSlider = document.getElementById('portfolio-slider');
            if(portfolioSlider) portfolioSlider.scrollTo({ left: 0, behavior: 'smooth' });
        });
    });

   
});

document.addEventListener("DOMContentLoaded", function () {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");

    const certCards = document.querySelectorAll(".cert-card");

    certCards.forEach(card => {
        card.addEventListener("click", function () {

            const img = card.querySelector("img");
            if (!img) return;

            lightboxImg.src = img.src;

            lightbox.classList.add("active");

            gsap.fromTo(lightboxImg,
                { scale: 0.6, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
        });
    });

    function closeLightbox() {
        gsap.to(lightboxImg, {
            scale: 0.6,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                lightbox.classList.remove("active");
            }
        });
    }

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });


});
