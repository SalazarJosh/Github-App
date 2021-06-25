gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".header",
    start: "-5px top",
    end: "bottom top",
    scrub: true,
    toggleClass: "active"
  }
});

gsap.utils.toArray(".parallax").forEach(layer => {
  const depth = layer.dataset.depth;
  const movement = -(layer.offsetHeight * depth)
  tl.to(layer, {
    y: movement,
    ease: "none"
  }, 0)
});

gsap.to(".contentArea1", {
  scrollTrigger: {
    trigger: ".contentArea1",
    scrub: true,
    pin: true,
    start: "center center",
    end: "bottom -300%",
    ease: "power2"
  },
});

///SVG ANIM start
gsap.set(".ball", {
  xPercent: -50,
  yPercent: -50
})

var svgtl = gsap.timeline({
    defaults: {
      duration: 0.05,
      autoAlpha: 1,
      scale: 2,
      transformOrigin: 'center',
      ease: "elastic(2.5, 1)"
    }
  })
  .to(".ball02, .text01", {}, 0.2)
  .to(".ball03, .text02", {}, 0.33)
  .to(".ball04, .text03", {}, 0.46)

var action = gsap.timeline({
    defaults: {
      duration: 2
    },
    scrollTrigger: {
      trigger: "#svg",
      scrub: true,
      start: "top center",
      end: "bottom center"
    }
  })
  .to(".ball01", {
    duration: 0.01,
    autoAlpha: 1
  })
  .from(".theLine", {
    drawSVG: 0
  }, 0)
  .to(".ball01", {
    motionPath: {
      path: ".theLine",
      alignOrigin: [0.5, 0.5]
    }
  }, 0)
  .add(svgtl, 0);
//SVG ANIM END