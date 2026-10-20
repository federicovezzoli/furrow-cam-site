import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const ease = "power4.out";
const all = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);
// clamp(): elements near the page's end still trigger when the scroll can't reach their start.
const inView = (trigger: Element, start = "top 85%") => ({ trigger, start: `clamp(${start})`, once: true });

// Letters rise out of each line's mask. autoSplit re-splits once the fonts load and on resize.
const rise = (el: HTMLElement, vars: gsap.TweenVars = {}) =>
  SplitText.create(el, {
    type: "lines,chars",
    mask: "lines",
    autoSplit: true,
    onSplit: (self) => gsap.from(self.chars, { yPercent: 115, duration: 1.1, stagger: 0.018, ease, ...vars }),
  });

// Visitors who asked for reduced motion get the static page, already fully visible.
gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  // Hero: the headline is cut letter by letter, then the rest settles in around it.
  const headline = document.querySelector<HTMLElement>("[data-split-hero]");
  if (headline) {
    gsap.set(headline, { autoAlpha: 1 });
    rise(headline, { delay: 0.1, stagger: 0.022 });
  }
  gsap.from("[data-hero]", { autoAlpha: 0, y: 24, duration: 1, stagger: 0.1, ease, delay: 0.55 });

  // The demo frame grows to full size as it scrolls up, like the camera moving in.
  for (const el of all("[data-grow]")) {
    gsap.fromTo(el, { scale: 0.86 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 20%", scrub: true } });
  }

  // Mono labels decode like a controller's readout.
  for (const el of all("[data-scramble]")) {
    gsap.fromTo(
      el,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 1.1,
        scrambleText: { text: el.textContent ?? "", chars: "XYZ0123456789#/", revealDelay: 0.2, speed: 0.6 },
        scrollTrigger: inView(el, "top 92%"),
      },
    );
  }

  for (const el of all("[data-split]")) rise(el, { scrollTrigger: inView(el) });

  // Dividers are drawn left to right, like a profile pass.
  for (const el of all("[data-line]")) {
    gsap.from(el, { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "power4.inOut", scrollTrigger: inView(el, "top 95%") });
  }

  for (const el of all("[data-fade]")) {
    gsap.from(el, { autoAlpha: 0, y: 30, duration: 0.9, ease, scrollTrigger: inView(el) });
  }

  for (const el of all("[data-stagger]")) {
    gsap.from(el.children, { autoAlpha: 0, y: 30, duration: 0.8, stagger: 0.07, ease, scrollTrigger: inView(el) });
  }

  // The privacy statement fills in word by word, tied to the scroll.
  for (const el of all("[data-scrub-words]")) {
    SplitText.create(el, {
      type: "words",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.words, {
          opacity: 0.14,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 55%", scrub: true },
        }),
    });
  }
});
