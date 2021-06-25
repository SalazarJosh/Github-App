gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".header",
    start: "-5px top",
    end: "bottom top",
    scrub: true,
    //toggleClass: "active"
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
  .to(".ball05, .text04", {}, 0.62)
  .to(".ball06, .text05", {}, 0.88)



var action = gsap.timeline({
    defaults: {
      duration: 2
    },
    scrollTrigger: {
      trigger: "#svg",
      scrub: true,
      start: "200px center",
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

//underline anim start
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {
    x: x,
    y: y,
    autoAlpha: 0
  }, {
    duration: 3.25,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: "expo",
    overwrite: "auto"
  });
}

function hide(elem) {
  gsap.set(elem, {
    autoAlpha: 0
  });
}

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view

    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() {
        animateFrom(elem)
      },
      onEnterBack: function() {
        animateFrom(elem, -1)
      },
      onLeave: function() {
        hide(elem)
      } // assure that the element is hidden when scrolled into view
    });
  });
});
//underline anim end

//section 3 start
gsap.to(".fadeInLandscape", {
  scrollTrigger: {
    trigger: ".fadeInLandscape",
    start: "center center",
    end: "bottom bottom",
    scrub: true,
    pin: true
  },
  opacity: 1,
  duration: 1
})
//section 3 end
window.onscroll = function(e) {
  if (window.scrollY > 1000) {
    console.log("1");
    $(".paragraph1").text("Thank you!");
  } else {
    $(".paragraph1").text("Hi, GitHub!");
    console.log("2");
  }
}