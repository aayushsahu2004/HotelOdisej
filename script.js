function init(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

document.addEventListener("wheel",function(dets){

    if(dets.offsetY > 400){
        if(dets.deltaY > 0){
            gsap.to("#nav",{
                top:"-100px",
                duration:0.5,
                ease:Power4.easeNone, 
            })
        }
    }
    if(dets.deltaY < 0){
        gsap.to("#nav",{
            top:"0px",
            duration:0.5,
            ease:Power4.easeNone,
        })
    }
})

}
init()

function page1Gsap(){
gsap.to("#nav svg",{
    transform: "translateY(0px) scale(0.15)",
    ease:Power0.easeNone,
    scrollTrigger:{
        trigger:"#nav",
        scroller:"#main",
        // markers:true,
        start:"top -2%",
        end:"top -10%",
        scrub:2
    }
})
    
gsap.from("#nav svg",{
    y: -40,
    opacity: 0,
    delay: 0.3,
    duration: 0.7,
})
var tl = gsap.timeline()
tl.from("#page1 img",{
    scale:0.5,
    delay:1,
    duration:1,
    ease:Power4.easeOut,
    borderRadius:"20px"
})
.from("#nav #part1, #part2",{
    y:-50,
    opacity:0,
    delay:-0.4,
    duration:0.5
})
}
page1Gsap()

function page2textGsap(){
var h2Data = document.querySelectorAll("#page2 h2");
h2Data.forEach(function(elem){
    var textData = elem.textContent
    var splitedText = textData.split("");
    clutter = ""
    splitedText.forEach(function(e){
        clutter += `<span>${e}</span>`;
    })
    elem.innerHTML = clutter;
});

gsap.to("#page2 h2 span",{
    color: "#E3E3C4",
    stagger: 0.3,
    scrollTrigger:{
        trigger:"#page2 h2 span",
        scroller:"#main",
        // markers:true,
        start:"top 60%",
        end: "top -30%",
        scrub:2
    }
})
}
page2textGsap()

function page2btmGsap(){
    gsap.to("#page2 #svg2",{
        left:"-100vw",
        scrollTrigger:{
            trigger:"#page2 #svg2",
            scroller:"#main",
            // markers:true,
            scrub:2
        }
    })
    
    gsap.to("#page2 #svg3",{
        left:"-100vw",
        scrollTrigger:{
            trigger:"#page2 #svg3",
            scroller:"#main",
            // markers:true,
            scrub:2
        }
    })
}
page2btmGsap()

function page3TextGsap(){
var h2text = document.querySelectorAll("#page3 h2");
h2text.forEach(function(elem){
    var textData1 = elem.textContent
    var splitedText1 = textData1.split("");
    clutter1 = ""
    splitedText1.forEach(function(e){
        clutter1 += `<span>${e}</span>`;
    })
    elem.innerHTML = clutter1;
});

gsap.to("#page3 h2 span",{
    color: "#434B34",
    stagger: 0.1,
    scrollTrigger:{
        trigger:"#page3 h2 span",
        scroller:"#main",
        // markers:true,
        start:"top 45%",
        end: "top 30%",
        scrub:2
    }
})
}
page3TextGsap()

function page3Gsap(){
    gsap.from("#page3 #left h3",{
        y:30,
        opacity:0,
        scrollTrigger:{
            trigger:"#page3 #bottom",
            scroller:"#main",
            // markers:true,
            start:"top 70%",
            end:"top 68%",
            scrub:2
        }
    })
    
    gsap.from("#page3 #bottom #right #img1",{
        y:30,
        opacity:0,  
        scrollTrigger:{
            trigger:"#page3 #bottom",
            scroller:"#main",
            // markers:true,
            start:"top 70%",
            end:"top 68%",
            scrub:2
        }
    })
    
    gsap.from("#page3 #bottom h1",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page3 #left",
            scroller:"#main",
            // markers:true,
            start:"top 60%",
            end:"top 58%",
            scrub:2
        }
    })
    
    gsap.from("#page3 #left img",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page3 #left",
            scroller:"#main",
            // markers:true,
            start:"top 35%",
            end:"top 33%",
            scrub:2
        }
    })
    
    gsap.from("#page3 #right #img2",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page3 #left",
            scroller:"#main",
            // markers:true,
            start:"top 10%",
            end:"top 7%",
            scrub:2
        }
    })
}   
page3Gsap()

function page5Slider(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          type:"fraction"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });
}
page5Slider()

function page6topGsap(){
    gsap.to("#page6-svg1",{
        left:"70vw",
        scrollTrigger:{
            trigger:"#page6-svg1",
            scroller:"#main",
            // markers:true,
            scrub:2
        }
    })
    
    gsap.to("#page6-svg2",{
        left:"70vw",
        scrollTrigger:{
            trigger:"#page6-svg2",
            scroller:"#main",
            // markers:true,
            scrub:2
        }
    })
}
page6topGsap()

function page6TextGsap(){
    var h2text = document.querySelectorAll("#page6-text h2");
    h2text.forEach(function(elem){
        var textData1 = elem.textContent
        var splitedText1 = textData1.split("");
        clutter1 = ""
        splitedText1.forEach(function(e){
            clutter1 += `<span>${e}</span>`;
        })
        elem.innerHTML = clutter1;
    });
    
    gsap.to("#page6-text h2 span",{
        color: "#E3E3C4",
        stagger: 0.5,
        scrollTrigger:{
            trigger:"#page6-text h2 span",
            scroller:"#main",
            // markers:true,
            start:"top 65%",
            end: "top 40%",
            scrub:2
        }
    })

    gsap.from("#page6-text p",{
        y:50,
        opacity:0,
        scrollTrigger:{
            trigger:"#page6-text h2 span",
            scroller:"#main",
            // markers:true,
            start:"top 50%",
            end: "top 40%",
            scrub:2
        }
    })
}
page6TextGsap()

function page6imgGsap(){
    gsap.from("#page6-img #third-img",{
        y:50,
        opacity:0,
        scrollTrigger:{
            trigger:"#page6-img #third-img ",
            scroller:"#main",
            // markers:true,
            start:"top 85%",
            end:"top 80%",
            scrub:2
        }
    })
    
    gsap.from("#page6-img #first-img",{
        y:50,
        opacity:0,
        scrollTrigger:{
            trigger:"#page6-img #first-img ",
            scroller:"#main",
            // markers:true,
            start:"top 86.5%",
            end:"top 81.5%",
            scrub:2
        }
    })
    
    gsap.from("#page6-img #second-img",{
        y:50,
        opacity:0,
        scrollTrigger:{
            trigger:"#page6-img #second-img ",
            scroller:"#main",
            // markers:true,
            start:"top 90%",
            end:"top 85%",
            scrub:2
        }
    })
    
    gsap.from("#page6-btn",{
        y:50,
        opacity:0,
        scrollTrigger:{
            trigger:"#page6-btn",
            scroller:"#main",
            // markers:true,
            start:"top 90%",
            end:"top 85%",
            scrub:2
        }
    })
}
page6imgGsap()

function page6btmGsap(){
    gsap.to("#page6-svg3",{
        left:"-100vw",
        scrollTrigger:{
            trigger:"#page6-svg3",
            scroller:"#main",
            // markers:true,
            scrub:2
        }
    })
    
    gsap.to("#page6-svg4",{
        left:"-100vw",
        scrollTrigger:{
            trigger:"#page6-svg4",
            scroller:"#main",
            // markers:true,
            scrub:2
        }
    })
}
page6btmGsap()

function page7textGsap(){
    var h2Data = document.querySelectorAll("#page7 #text h2");
    h2Data.forEach(function(elem){
        var textData = elem.textContent
        var splitedText = textData.split("");
        clutter = ""
        splitedText.forEach(function(e){
            clutter += `<span>${e}</span>`;
        })
        elem.innerHTML = clutter;
    });
    
    gsap.to("#page7 #text h2 span",{
        color: "#434B34",
        stagger: 0.5,
        scrollTrigger:{
            trigger:"#page7 #text h2 span",
            scroller:"#main",
            // markers:true,
            start:"top 60%",
            end: "top -10%",
            scrub:2
        }
    })
}
page7textGsap()

function page8Gsap(){
    var tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#page8",
          scroller: "#main",
        //   markers: true,
          start: "top 80%",
          end: "top 40%",
          scrub: 3,
        },
      });
    tl2.to("#page8-left", {
        transform: `translateX(-50%)`,
        duration: 1,
    },"page8-anim");
    tl2.to("#page8-right", {
        transform: `translateX(50%)`,
        duration: 1,
    },"page8-anim");
    
    gsap.to("#page8-center",{
        opacity:1,
        duration:1,
        scrollTrigger:{
            trigger:"#page8-center",
            scroller:"#main",
            // markers:true,
            start:"top 60%",
            end:"top 10%",
            scrub:2
        }
    })
    
    gsap.from("#page8-btn",{
        y:50,
        opacity:0,
        duration:1,
        scrollTrigger:{
            trigger:"#page8-btn",
            scroller:"#main",
            // markers:true,
            start:"top 90%",
            end:"top 80%",
            scrub:2
        }
    })
}
page8Gsap()

function page10TopGsap(){
    gsap.to("#page10 #page10-svg1",{
        left:"70vw",
        scrollTrigger:{
            trigger:"#page10 #page10-svg1",
            scroller:"#main",
            // markers:true,
            scrub:2,
        }
    })
        
    gsap.to("#page10 #page10-svg2",{
        left:"70vw",
        scrollTrigger:{
            trigger:"#page10 #page10-svg2",
            scroller:"#main",
            // markers:true,
            scrub:2,
        }
    })
}
page10TopGsap()

function page10TextGsap(){
    var h2Data = document.querySelectorAll("#page10 #page10-text h2");
    h2Data.forEach(function(elem){
        var textData = elem.textContent
        var splitedText = textData.split("");
        clutter = ""
        splitedText.forEach(function(e){
            clutter += `<span>${e}</span>`;
        })
        elem.innerHTML = clutter;
    });
    
    gsap.to("#page10 #page10-text h2 span",{
        color: "#E3E3C4",
        stagger: 0.5,
        scrollTrigger:{
            trigger:"#page10 #page10-text h2 span",
            scroller:"#main",
            // markers:true,
            start:"top 60%",
            end: "top 45%",
            scrub:2
        }
    })
    gsap.from("#page10 #page10-text p",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page10 #page10-text p",
            scroller:"#main",
            // markers:true,
            start:"top 85%",
            end: "top 75%",
            scrub:2
        }
    })
}
page10TextGsap()

function page10imgGsap(){
    var tl3 = gsap.timeline({
        scrollTrigger:{
            trigger:"#page10-images",
            scroller:"#main",
            // markers:true,
            start:"top 85%",
            end:"top 75%",
            scrub:2
        }
    })
    tl3.from("#page10-img2",{
        y:40,
        opacity:0,
    },"page10-anim")
    tl3.from("#page10-img3",{
        y:40,
        opacity:0,
    },"page10-anim")

    gsap.from("#page10-img1",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page10-images",
            scroller:"#main",
            // markers:true,
            start:"top 40%",
            end:"top 30%",
            scrub:2
        }
    })

    gsap.from("#page10-btn",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page10-btn",
            scroller:"#main",
            // markers:true,
            start:"top 85%",
            end:"top 75%",
            scrub:2
        }
    })
}
page10imgGsap()

function page11Gsap(){
    gsap.from("#page11-text h2",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page11-text",
            scroller:"#main",
            // markers:true,
            start:"top 50%",
            end:"top 40%",
            scrub:2,
        }
    })
    
    gsap.from("#page11-text p",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page11-text",
            scroller:"#main",
            // markers:true,
            start:"top 30%",
            end:"top 20%",
            scrub:2,
        }
    })
    
    gsap.from("#first-left img",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page11-first",
            scroller:"#main",
            // markers:true,
            start:"top 78%",
            end:"top 66%",
            scrub:2,
        }
    })
    
    gsap.from("#first-right h3",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page11-first",
            scroller:"#main",
            // markers:true,
            start:"top 65%",
            end:"top 60%",
            scrub:2,
        }
    })
    
    gsap.from("#first-right p",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page11-first",
            scroller:"#main",
            // markers:true,
            start:"top 55%",
            end:"top 50%",
            scrub:2,
        }
    })
    
    gsap.from("#first-right h4",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page11-first",
            scroller:"#main",
            // markers:true,
            start:"top 35%",
            end:"top 30%",
            scrub:2,
        }
    })
    
    gsap.from("#second-right img",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page11-second",
            scroller:"#main",
            // markers:true,
            start:"top 75%",
            end:"top 65%",
            scrub:2,
        }
    })
    
    gsap.from("#second-left h3",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page11-second",
            scroller:"#main",
            // markers:true,
            start:"top 65%",
            end:"top 60%",
            scrub:2,
        }
    })
    
    gsap.from("#second-left p",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page11-second",
            scroller:"#main",
            // markers:true,
            start:"top 55%",
            end:"top 50%",
            scrub:2,
        }
    })
    
    gsap.from("#second-left h4",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page11-second",
            scroller:"#main",
            // markers:true,
            start:"top 30%",
            end:"top 25%",
            scrub:2,
        }
    })
}
page11Gsap()

function page12Gsap(){
    gsap.from("#page12-text",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#page12-text",
            scroller:"#main",
            // markers:true,
            start:"top 90%",
            end:"top 80%",
            scrub:2
        }
    })
}
page12Gsap()

function footergsap(){
    gsap.from("#first-head",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#first-head",
            scroller:"#main",
            // markers:true,
            start:"top 80%",
            end:"top 70%",
            scrub:2
        }
    })
    
    gsap.from("#second-head",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#second-head",
            scroller:"#main",
            // markers:true,
            start:"top 90%",
            end:"top 80%",
            scrub:2
        }
    })
    
    gsap.from("#third-head",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#third-head",
            scroller:"#main",
            // markers:true,
            start:"top 90%",
            end:"top 80%",
            scrub:2
        }
    })
    
    gsap.from("#btm-head",{
        y:40,
        opacity:0,
        scrollTrigger:{
            trigger:"#btm-head",
            scroller:"#main",
            // markers:true,
            start:"top 105%",
            end:"top 100%",
            scrub:2
        }
    })
}
footergsap()