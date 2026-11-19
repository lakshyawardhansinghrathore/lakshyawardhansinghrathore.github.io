import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

export function animateChapters(host: HTMLElement, gsap: typeof Gsap, ScrollTrigger: typeof Trigger, navHeight: () => number) {
  const about = host.querySelector("#about")!;
  const reading = gsap.timeline({scrollTrigger:{trigger:about,start:"top 85%",end:"bottom 65%",scrub:true}});
  reading.fromTo(".reading-line i",{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0% 0 0)",ease:"none",stagger:.24,duration:.35},0)
    .fromTo(".about-relief",{rotation:-9,scale:.86},{rotation:2,scale:1.06,duration:1.1,ease:"none"},0);

  const covers = Array.from(host.querySelectorAll<HTMLElement>(".project-cover"));
  covers.forEach((cover,index) => {
    const marker = document.getElementById("work-"+cover.dataset.cover)!;
    if (index < covers.length - 1) {
      ScrollTrigger.create({trigger:marker,start:()=> "top top+=" + navHeight(),end:()=>"+="+cover.offsetHeight,pin:cover,pinSpacing:false,invalidateOnRefresh:true});
    }
    const scene = gsap.timeline({scrollTrigger:{trigger:marker,start:"top bottom",end:()=> "top top+="+navHeight(),scrub:true}});
    scene.fromTo(cover.querySelector(".cover-art img"),{scale:1.32,rotate:-9},{scale:1,rotate:0,ease:"sine.out",duration:1},0)
      .fromTo(cover.querySelector("h3"),{clipPath:"inset(0 0 55% 0)",yPercent:12},{clipPath:"inset(0 0 0% 0)",yPercent:0,duration:.62},.05)
      .fromTo(cover.querySelector(".shot-result"),{xPercent:10},{xPercent:0,duration:.65},.35);
    if(index < covers.length - 1) {
      const exit = gsap.timeline({scrollTrigger:{trigger:marker,start:()=> "top top+="+navHeight(),end:()=>"+="+cover.offsetHeight,scrub:true}});
      exit.to(cover.querySelector(".cover-art"),{scale:.82,rotateY:-12,yPercent:-12,ease:"none"},0)
        .to(cover.querySelector(".cover-copy"),{scale:.93,yPercent:-8,transformOrigin:"left center",ease:"none"},0);
    }
  });

  const skills = host.querySelector("#skills")!;
  gsap.fromTo(skills.querySelector(".skill-signal"),{clipPath:"inset(0 52% 0 0)"},{clipPath:"inset(0 0% 0 0)",ease:"none",scrollTrigger:{trigger:skills,start:"top 85%",end:"top 20%",scrub:true}});
  gsap.fromTo(".career-rail i",{scaleY:0},{scaleY:1,ease:"none",scrollTrigger:{trigger:".career-track",start:"top 52%",end:"bottom 52%",scrub:true}});
  const finale = gsap.timeline({scrollTrigger:{trigger:"#contact",start:"top bottom",end:"center 48%",scrub:true}});
  finale.fromTo(".closing-optic",{scale:1.47,rotation:-34,yPercent:18},{scale:1,rotation:0,yPercent:0,duration:1,ease:"none"},0)
    .fromTo(".closing-line > span",{yPercent:85},{yPercent:0,duration:.65,stagger:.14,ease:"sine.out"},.04);
}
