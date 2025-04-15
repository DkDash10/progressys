import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import mission from "../assets/img/mission.png";
import vision from "../assets/img/vision1.png";
import goal from "../assets/img/goal.png";

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
    extraClass: "ge_card-vision"
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
  spanRefs.current = [];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
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
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            scaleX: 1,
            duration: 0.6,
            transformOrigin: 'left center',
            ease: 'power2.out',
          }
        );
      });
    });
  

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section className='growthEngineers'>
      <p className='ge_title' ref={titleRef}>
        We are Growth Engineers. Obsessed with <br /> Your Success.”
      </p>
      <div className="ge_cards">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="ge_card"
          >
            <img src={card.image} alt={card.title} className={card.extraClass || ''} />
            <div className='ge_card-texts'>
            <span ref={(el) => (spanRefs.current[index] = el)}>{card.title}</span>
              <p>{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GrowthEngineers;
