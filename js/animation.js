import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger)

gsap.fromTo('.fruit1',{
  x: -2000,
  rotation: -360, 
},
{
  x: 0,
  rotation: 0,
  duration: 5,
  scrollTrigger: {
    trigger: ".img5",
    start: "1% 99%",
    end: "40% 90%",
    scrub: 5,
    toggleActions: "reverse none none none",
  }
})