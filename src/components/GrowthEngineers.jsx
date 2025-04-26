import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BGIT from "../assets/icons/blackGetInTouch.svg";
import mission from "../assets/img/mission.png";
import vision from "../assets/img/vision.png";
import goal from "../assets/img/goal.png";
import { useModal } from "../contexts/modalContext";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    title: "Mission",
    text: "To engineer ecosystems where businesses, societies, and lives evolve.",
    image: mission,
  },
  {
    title: "Vision",
    text: "A world where progress is a system, not a privilege.",
    image: vision,
  },
  {
    title: "Goal",
    text: "Building the Future, Together.",
    image: goal,
  },
];

const GrowthEngineers = () => {
  const titleRef = useRef(null);
  const spanRefs = useRef([]);
  const imgRefs = useRef([]);
  imgRefs.current = [];
  spanRefs.current = [];

  const { openModal } = useModal();

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 660px)");
    const ctx = gsap.context(() => {
      if (mediaQuery.matches && titleRef.current) {
        const container = titleRef.current.parentNode;
  
        gsap.to(titleRef.current, {
          scrollTrigger: {
            trigger: container,
            start: "top 50%",
            end: "bottom 0%",
            scrub: true,
          },
          y: () => container.clientHeight - titleRef.current.clientHeight,
          ease: "expoScale(0.5,7,none)",
        });
      }
  
      spanRefs.current.forEach((span) => {
        if (!span) return;
        gsap.fromTo(
          span,
          { opacity: 0, scaleX: 0 },
          {
            scrollTrigger: {
              trigger: span,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            scaleX: 1,
            duration: 0.6,
            transformOrigin: "left center",
            ease: "power2.out",
          }
        );
      });
  
      imgRefs.current.forEach((img) => {
        if (!img) return;
        const card = img.closest(".ge_card");
      
        gsap.fromTo(
          img,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 60%", // Animate as the card enters
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
  
    return () => ctx.revert();
  }, []);
  

  return (
    <section className="growthEngineers">
      <div className="ge_container">
        <div className="ge_top">
          <p className="ge_title" ref={titleRef}>
            We are Growth Engineers. Obsessed with <br /> Your Success.”
          </p>
          <div className="ge_textBlock">
            <p>We are a group of seasoned growth architects from various Cross-disciplines. In 2025, we saw a world divided by tech ideologies—and decided to bridge them. Not with compromises, but with our <strong>Growth Algorithms™.</strong></p>
            <div className="ge_getInTouch" onClick={openModal}>
              <img src={BGIT} alt="getInTouch" />
              <p>Get in Touch</p>
            </div>
          </div>
        </div>
        <div className="ge_cards">
          {cardData.map((card, index) => (
            <div key={index} className="ge_card">
              <img
                src={card.image}
                alt={card.title}
                className={card.extraClass || ""}
                ref={(el) => (imgRefs.current[index] = el)}
              />
              <div className="ge_card-texts">
                <span ref={(el) => (spanRefs.current[index] = el)}>
                  {card.title}
                </span>
                <p>{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthEngineers;
