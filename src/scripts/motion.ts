import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const ease = "power4.out";
const all = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);
const inView = (trigger: Element, start = "top 85%") => ({ trigger, start, once: true });

// Header readout: the visitor's position down the page, as a machine's digital readout shows the tool's.
const dro = document.querySelector<HTMLElement>("[data-dro]");
if (dro) {
  const mm = (n: number) => n.toFixed(3).padStart(8, "0");
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => (dro.textContent = `X ${mm(0)} Y ${mm(self.progress * 600)} Z ${mm(0)}`),
  });
}

// Demo videos load and play only while on screen. With reduced motion they wait for the visitor,
// with controls to start them.
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
for (const video of gsap.utils.toArray<HTMLVideoElement>("video[data-demo]")) {
  if (reduceMotion) {
    video.controls = true;
    continue;
  }
  ScrollTrigger.create({
    trigger: video,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? video.play().catch(() => {}) : video.pause()),
  });
}

// Everything below only moves for visitors who haven't asked for reduced motion; they get the
// static page, already fully visible.
gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  // Hero: the headline's letters rise out of each line's mask, then the rest settles in.
  const hero = gsap.timeline({ defaults: { ease } });
  const headline = document.querySelector<HTMLElement>("[data-split-hero]");
  if (headline) {
    const split = SplitText.create(headline, { type: "words,chars" });
    hero
      .set(headline, { autoAlpha: 1 })
      .from(split.chars, { yPercent: 115, duration: 1.1, stagger: 0.025 });
  }
  hero.from("[data-hero]", { autoAlpha: 0, y: 24, duration: 1, stagger: 0.12 }, "-=0.7");

  // Section labels decode like a terminal line when they come into view.
  for (const el of all("[data-scramble]")) {
    gsap.to(el, {
      scrambleText: { text: el.textContent ?? "", chars: "XYZ0123456789#", speed: 0.5 },
      duration: 1,
      scrollTrigger: inView(el, "top 90%"),
    });
  }

  // Headings rise line by line, each line masked.
  for (const el of all("[data-split]")) {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, { yPercent: 105, duration: 1, stagger: 0.09, ease, scrollTrigger: inView(el) }),
    });
  }

  for (const el of all("[data-fade]")) {
    gsap.from(el, { autoAlpha: 0, y: 30, duration: 0.9, ease, scrollTrigger: inView(el) });
  }

  // Lists and grids come in item by item.
  for (const el of all("[data-stagger]")) {
    gsap.from(el.children, { autoAlpha: 0, y: 30, duration: 0.8, stagger: 0.07, ease, scrollTrigger: inView(el) });
  }

  // The open source statement fills in word by word, tied to the scroll.
  for (const el of all("[data-scrub-words]")) {
    SplitText.create(el, {
      type: "words",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.words, {
          opacity: 0.15,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        }),
    });
  }
});
