gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".layer1",
  start: "top top",
  end: "+=50px",
  pin: true
});

const tl = gsap.timeline();
tl.to(".layer1", {
    yPercent: -10
  })
  .to(".layer2", {
    yPercent: -11
  })
  .to(".layer3", {
    yPercent: -12
  });

ScrollTrigger.create({
  trigger: ".header",
  start: "top top",
  end: "+=4000",
  scrub: true,
  pin: true,
  anticipatePin: 1
});