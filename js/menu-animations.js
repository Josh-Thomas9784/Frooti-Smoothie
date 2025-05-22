// Menu page animations using GSAP
document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate menu section headers
  gsap.utils.toArray('.menu-section h1').forEach(header => {
    gsap.fromTo(header, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Animate menu items with staggered effect
  gsap.utils.toArray('.menu-section').forEach(section => {
    const items = section.querySelectorAll('.menu-item');
    
    gsap.fromTo(items, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );
  });
  
  // Animate build-your-own banner
  gsap.fromTo('.build-your-own-banner', 
    { opacity: 0, scale: 0.9 },
    { 
      opacity: 1, 
      scale: 1, 
      duration: 1,
      scrollTrigger: {
        trigger: '.build-your-own-banner',
        start: "top 75%",
        toggleActions: "play none none none"
      }
    }
  );
  
  // Add hover animations for menu items
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { y: -10, duration: 0.3, ease: "power1.out" });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { y: 0, duration: 0.3, ease: "power1.out" });
    });
  });
});