gsap.registerPlugin(ScrollTrigger);

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

var quotes = [
  "&ldquo;Overall wonderful professor. I learned a lot during this class and I have a lot of respect for web developers because I could never do it! Josh, you helped me learn more than I thought I could. Thank you! A++&rdquo; <span style='color: #fff; font-style: normal; font-size: 1.4rem;'> - Fall 2018</span>",
  "&ldquo;Very encouraging on letting our ideas become reality. Knows what he's talking about on every aspect of the course resources. 10/10 prof!&rdquo; <span style='color: #fff; font-style: normal; font-size: 1.4rem;'> - Fall 2018</span>",
  "&ldquo;I feel like I learned a lot in this course, one of the best professors I have had!&rdquo; <span style='color: #fff; font-style: normal; font-size: 1.4rem;'> - Spring 2018</span>",
  "&ldquo;Very professional and organized content well. Helps students individually.&rdquo; <span style='color: #fff; font-style: normal; font-size: 1.4rem;'> - Spring 2018</span>",
  "&ldquo;Knew a lot about the subject and was very enthusiastic and helpful.&rdquo; <span style='color: #fff; font-style: normal; font-size: 1.4rem;'> - Spring 2017</span>"
]

var currentQuote = 0;

setInterval(function() {
  GetNewQuote()
}, 10000);

function GetNewQuote() {
  $(".quotes").fadeOut("slow", function() {
    $(".quotes").empty();
    $(".quotes").append(quotes[currentQuote]);
    currentQuote++;

    if (currentQuote > quotes.length - 1) {
      currentQuote = 0;
    }
    $(".quotes").fadeIn("slow", function() {});
  });

}

GetNewQuote();
