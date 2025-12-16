// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Trigger hero animations after preloader is gone
            // (Optional: you can dispatch a custom event here if needed)
        }, 1500); // Minimum display time
    }
});

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with delay (using GSAP for smoothness)
        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.15,
            ease: "power2.out"
        });
    });

    // Hover effects
    const hoverables = document.querySelectorAll('a, button, .btn, .texture-btn');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                scale: 1.5,
                backgroundColor: "rgba(196, 154, 87, 0.1)",
                duration: 0.2
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                scale: 1,
                backgroundColor: "transparent",
                duration: 0.2
            });
        });
    });
}

// 0. Navbar Scroll Effect (Hide/Show on Hero)
(function() {
  const header = document.querySelector('.site-header');
  const heroSection = document.querySelector('.hero-new');
  
  if (!header || !heroSection) return;

  function checkNavbarScroll() {
    const heroBottom = heroSection.offsetHeight;
    if (window.scrollY > heroBottom) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', checkNavbarScroll);
  checkNavbarScroll(); // Check on load
})();

// 1. Full Screen Menu Toggle
(function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuText = document.querySelector('.menu-text');
    const fsMenu = document.querySelector('.fs-menu');
    const fsLinks = document.querySelectorAll('.fs-link');
    const siteHeader = document.querySelector('.site-header');
  
    if(menuToggle && fsMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = fsMenu.classList.contains('open');
            
            if (!isOpen) {
                // Open Menu
                fsMenu.classList.add('open');
                menuToggle.classList.add('active');
                if(siteHeader) siteHeader.classList.add('nav-open');
                if(menuText) menuText.textContent = "Close";
                
                // GSAP Animation for Links
                gsap.fromTo(fsLinks, 
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.4 }
                );
            } else {
                // Close Menu
                fsMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                if(siteHeader) siteHeader.classList.remove('nav-open');
                if(menuText) menuText.textContent = "Menu";
            }
        });

        // Close menu when a link is clicked
        fsLinks.forEach(link => {
            link.addEventListener('click', () => {
                fsMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                if(siteHeader) siteHeader.classList.remove('nav-open');
                if(menuText) menuText.textContent = "Menu";
            });
        });
    }
})();
  
  // 3. Number Counter Animation (Stats)
  (function() {
    const values = document.querySelectorAll('.stats .value');
    if (!values.length) return;
  
    // Use ScrollTrigger for stats
    values.forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        
        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
                let start = 0;
                const duration = 2000;
                const increment = target / (duration / 16); // 60fps
                
                function updateCount() {
                    start += increment;
                    if (start < target) {
                        el.textContent = Math.ceil(start) + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = target + suffix;
                    }
                }
                updateCount();
            }
        });
    });
  })();

  // 4. New Interactive Hero Section
  (function() {
    const tileData = [
  {
    id: 1,
    name: "The Architectural",
    type: "Carving Finish",
    description: "Expand your perspective with Horizon Ivory. The distinct linear veining of this surface draws the eye horizontally, visually stretching the width of your room. With its clean, parallel lines and soft ivory hue, it offers a structured yet subtle backdrop for modern minimalist design.",
    image: "./assets/img-1.png",
    thumb: "./assets/img-1.png"
  },
  {
    id: 2,
    name: "Elegant Vibe",
    type: "Glossy Finish",
    description: "A masterclass in monochrome elegance. Pietra Nobile offers a rich, velvety grey foundation that anchors your space in quiet luxury. The delicate interlacing of white quartz veins adds just the right amount of movement, creating a surface that feels both historic and delightfully current.",
    image: "./assets/img-2.png",
    thumb: "./assets/img-2.png"
  },
  {
    id: 3,
    name: "Short & Modern",
    type: "Carving Finish",
    description: "A curated selection of high-impact marble surfaces. Defined by their bold, clustered patterns and stunning depth, these textures are designed to make a statement. Explore the full palette of colors and redefine your interiors",
    image: "./assets/img-3.png",
    thumb: "./assets/img-3.png"
  },
  {
    id: 4,
    name: "Urban Vibe",
    type: "Matt Finish",
    description: "Redefine your workspace with the raw, understated elegance of Urban Bronze Concrete. This surface captures the cool, industrial essence of cement but warms it with deep copper and clay undertones. The smooth, matte finish provides a sleek foundation that is bold yet professional.",
    image: "./assets/img-4.png",
    thumb: "./assets/img-4.png"
  },
  {
    id: 5,
    name: "Marble Canvas",
    type: "Glassy Finish",
    description: "Where nature meets art. The Marble Canvas series treats the floor as a masterpiece, showcasing intricate grey strokes against a porcelain-white background. The dynamic movement of the veins adds rhythm and energy to the room without overpowering the senses",
    image: "./assets/img-5.png",
    thumb: "./assets/img-5.png"
  }
];

    const heroBgWrapper = document.getElementById('hero-bg-wrapper');
    const textureGrid = document.getElementById('texture-grid');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const heroLabel = document.getElementById('hero-label');
    const heroBtns = document.getElementById('hero-btns');
    const heroVibe = document.getElementById('hero-vibe');
    const heroContentWrapper = document.querySelector('.hero-content-wrapper');

    if (!heroBgWrapper || !textureGrid) return; // Hero not present

    let currentIndex = 0;
    let autoRotateInterval;
    const ROTATION_TIME = 5000;
    let startTime = Date.now();

    function initHero() {
      tileData.forEach((tile, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = `hero-bg ${index === 0 ? 'active' : ''}`;
        imgDiv.style.backgroundImage = `url('${tile.image}')`;
        imgDiv.dataset.index = index;
        heroBgWrapper.appendChild(imgDiv);

        const btn = document.createElement('button');
        btn.className = `texture-btn ${index === 0 ? 'active' : ''}`;
        btn.innerHTML = `
          <img src="${tile.thumb}" alt="${tile.name}">
          <span class="texture-tooltip">${tile.name}</span>
          <svg class="progress-ring" width="90" height="90">
             <circle cx="45" cy="45" r="40"></circle>
          </svg>
        `;
        btn.onclick = () => manualChange(index);
        textureGrid.appendChild(btn);
      });

      // Set initial hero content
      setHeroContent(0);
      
      // Initial Animation
      animateHeroContent();
      
      startAutoRotate();
      requestAnimationFrame(updateProgress);

      // Mouse Parallax Removed as per request
    }

    function updateProgress() {
        if (!autoRotateInterval) return;
        
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / ROTATION_TIME, 1);
        const offset = 251 - (251 * progress);
        
        const activeBtn = document.querySelector('.texture-btn.active circle');
        if (activeBtn) {
            activeBtn.style.strokeDashoffset = offset;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        }
    }

    function setHeroContent(index) {
      heroLabel.textContent = tileData[index].type || '';
      heroTitle.textContent = tileData[index].name || '';
      heroDesc.textContent = tileData[index].description || '';
      if (heroBtns) {
        heroBtns.innerHTML = '<a href="#" class="btn primary">View Full Catalogue</a>';
      }
      if (heroVibe) {
        heroVibe.innerHTML = 'Bring your vision to life with tiles that inspire. <br>Discover beauty, durability, and a touch of luxury for every space.';
        heroVibe.style.marginTop = '2.2rem';
      }
      
      // Split Text for Title (Simple word split)
      const words = heroTitle.textContent.split(' ');
      heroTitle.innerHTML = words.map(word => `<span style="display:inline-block">${word}&nbsp;</span>`).join('');
    }

    function animateHeroContent() {
        const tl = gsap.timeline();
        
        // Ensure parent title is visible (since we animate children)
        gsap.set(heroTitle, { opacity: 1 });

        // Animate Label
        tl.fromTo(heroLabel, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
        
        // Animate Title Words
        const titleWords = heroTitle.querySelectorAll('span');
        tl.fromTo(titleWords, 
            { y: 50, opacity: 0, rotationX: 45 },
            { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.1, ease: "back.out(1.7)" },
            "-=0.6"
        );
        
        // Animate Description & Buttons
        tl.fromTo([heroDesc, heroBtns, heroVibe], 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
            "-=0.8"
        );
    }

    function changeSlide(index) {
      const bgs = document.querySelectorAll('.hero-bg');
      bgs.forEach(bg => bg.classList.remove('active'));
      bgs[index].classList.add('active');

      const btns = document.querySelectorAll('.texture-btn');
      btns.forEach(btn => {
          btn.classList.remove('active');
          // Reset progress ring
          const circle = btn.querySelector('circle');
          if(circle) circle.style.strokeDashoffset = 251;
      });
      btns[index].classList.add('active');

      // GSAP Transition for Text
      const tl = gsap.timeline();
      
      // Out
      tl.to([heroLabel, heroTitle, heroDesc, heroBtns, heroVibe], {
          y: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
              setHeroContent(index);
              animateHeroContent(); // Use the new animation function
          }
      });

      currentIndex = index;
      startTime = Date.now();
      requestAnimationFrame(updateProgress);
    }

    function manualChange(index) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null; // Stop auto rotation on manual interaction
      changeSlide(index);
    }

    function startAutoRotate() {
      startTime = Date.now();
      autoRotateInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % tileData.length;
        changeSlide(nextIndex);
      }, ROTATION_TIME);
    }

    initHero();
  })();

// 5. General Scroll Animations (Fade Up)
gsap.utils.toArray('section h2, section p, .about-media, .product-card').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// 6. Parallax Effect for About Image
const aboutImage = document.querySelector('.about-media img');
if (aboutImage) {
    gsap.to(aboutImage, {
        scrollTrigger: {
            trigger: ".about",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: -50,
        ease: "none"
    });
}
