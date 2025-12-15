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

// 1. Mobile Menu & Dropdowns
(function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownParents = document.querySelectorAll('.has-dropdown > button');
  
    // Mobile menu toggle
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navMenu.classList.toggle('open');
            // Change icon
            navToggle.textContent = !expanded ? '✕' : '☰';
        });
    }
  
    // Dropdown interactions
    dropdownParents.forEach(btn => {
      const parent = btn.parentElement;
      // Click for mobile
      btn.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
           e.preventDefault(); // Stop link nav if it was a link
           parent.classList.toggle('active');
           const dropdown = parent.querySelector('.dropdown');
           if(dropdown) {
               dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
               dropdown.style.opacity = '1';
               dropdown.style.transform = 'translateY(0)';
           }
        }
      });
    });
  })();
  
  // 2. Hero Slider
  (function() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;
  
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const dotsContainer = slider.querySelector('.slider-dots');
    
    const intervalMs = Number(slider.dataset.interval) || 5000;
    const autoplay = slider.dataset.autoplay === 'true';
    let index = 0; 
    let timer = null;
  
    // Create Dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === 0) dot.setAttribute('aria-selected', 'true');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.children);
  
    function goToSlide(i) {
      // Handle wrapping
      if (i < 0) i = slides.length - 1;
      if (i >= slides.length) i = 0;
  
      // Update classes
      slides[index].classList.remove('active');
      dots[index].setAttribute('aria-selected', 'false');
      
      index = i;
      
      slides[index].classList.add('active');
      dots[index].setAttribute('aria-selected', 'true');
      
      resetAutoplay();
    }
  
    function next() { goToSlide(index + 1); }
    function prev() { goToSlide(index - 1); }
  
    // Listeners
    if(nextBtn) nextBtn.addEventListener('click', next);
    if(prevBtn) prevBtn.addEventListener('click', prev);
  
    // Autoplay Logic
    function startAutoplay() {
      if (!autoplay) return;
      timer = setInterval(next, intervalMs);
    }
    function resetAutoplay() {
      if (!autoplay) return;
      clearInterval(timer); 
      startAutoplay();
    }
    
    startAutoplay();
  })();
  
  // 3. Number Counter Animation (Stats)
  (function() {
    const values = document.querySelectorAll('.stats .value');
    if (!values.length) return;
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          
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
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
  
    values.forEach(v => observer.observe(v));
  })();

  // 4. New Interactive Hero Section
  (function() {
    const tileData = [
  {
    id: 1,
    name: "Celestial White",
    type: "Carving Finish",
    description: "A pristine white surface with subtle carving textures that reflect light beautifully, creating an airy and spacious feel.",
    image: "./assets/img-1.png",
    thumb: "./assets/img-1.png"
  },
  {
    id: 2,
    name: "Golden Statuario",
    type: "Carving Finish",
    description: "Classic Italian marble aesthetics featuring deep golden veining and a tactile carving finish for a touch of royal elegance.",
    image: "./assets/img-2.png",
    thumb: "./assets/img-2.png"
  },
  {
    id: 3,
    name: "Urban Concrete",
    type: "Carving Finish",
    description: "The raw beauty of concrete meets the sophistication of carving technology. Perfect for industrial-chic and minimalist interiors.",
    image: "./assets/img-3.png",
    thumb: "./assets/img-3.png"
  },
  {
    id: 4,
    name: "Royal Onyx",
    type: "Carving Finish",
    description: "Deep, translucent layers with a high-definition carving effect that adds depth and drama to feature walls and living areas.",
    image: "./assets/img-4.png",
    thumb: "./assets/img-4.png"
  },
  {
    id: 5,
    name: "Sandalwood Beige",
    type: "Carving Finish",
    description: "Warm earthy tones with a soft carving texture. This finish brings the serenity and warmth of nature into your living space.",
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

    if (!heroBgWrapper || !textureGrid) return; // Hero not present

    let currentIndex = 0;
    let autoRotateInterval;

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
        `;
        btn.onclick = () => manualChange(index);
        textureGrid.appendChild(btn);
      });

      // Set initial hero content
      setHeroContent(0);
      startAutoRotate();
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
    }

    function changeSlide(index) {
      const bgs = document.querySelectorAll('.hero-bg');
      bgs.forEach(bg => bg.classList.remove('active'));
      bgs[index].classList.add('active');

      const btns = document.querySelectorAll('.texture-btn');
      btns.forEach(btn => btn.classList.remove('active'));
      btns[index].classList.add('active');

      const textElements = [heroTitle, heroDesc, heroLabel];
      textElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
      });

      setTimeout(() => {
        setHeroContent(index);
        heroLabel.style.animation = 'fadeUpHero 0.8s forwards 0.1s';
        heroTitle.style.animation = 'fadeUpHero 0.8s forwards 0.2s';
        heroDesc.style.animation = 'fadeUpHero 0.8s forwards 0.3s';
      }, 50);

      currentIndex = index;
    }

    function manualChange(index) {
      clearInterval(autoRotateInterval);
      changeSlide(index);
    }

    function startAutoRotate() {
      autoRotateInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % tileData.length;
        changeSlide(nextIndex);
      }, 4000);
    }

    initHero();
  })();