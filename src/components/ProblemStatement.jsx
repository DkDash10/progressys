import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PSI from "../assets/img/ProblemStatement.png";
// import pause from "../assets/icons/pause.svg";


gsap.registerPlugin(ScrollTrigger);

const ProblemStatement = () => {
  const textBlockRef1 = useRef(null);
  const textBlockRef2 = useRef(null);
  const textBlockRef3 = useRef(null);

  const lines1 = ["Stagnation is the Only Risk", "You Can’t Afford."];

  const lines2 = [
    "Legacy systems crumble.",
    "Markets shift overnight.",
    "Talent gaps explode.",
  ];

  const lines3 = [
    "In a fractured world, standing still isn’t an option—it’s extinction.",
  ];

  const renderAnimatedLines = (lines, className) => {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <p key={i} style={{ margin: 0 }}>
            {line.split(" ").map((word, j) => (
              <span key={j} style={{ display: "inline-block", opacity: 0 }}>
                {word}&nbsp;
              </span>
            ))}
          </p>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const animateWords = (ref, delay = 0) => {
      const words = ref.current.querySelectorAll("span");

      gsap.fromTo(
        words,
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 1,
          stagger: 0.05,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    };

    animateWords(textBlockRef1); // no delay
    animateWords(textBlockRef2, 0.2); // slight delay
    animateWords(textBlockRef3, 0.4); // more delay
  }, []);

  return (
    <section className="problemStatement">
      <div className="pS_container">
        {/* <div className="ps_videoBlock">
        <img className="ps_video" src={PSI} alt="problestatement" />
        <img className="ps_pause" src={pause} alt="pause" />
      </div> */}

        <div className="ps_textBlock-1">
          <div ref={textBlockRef1}>
            {renderAnimatedLines(lines1, "ps_text-1")}
          </div>
          <div ref={textBlockRef2}>
            {renderAnimatedLines(lines2, "ps_text-2")}
          </div>
          <div ref={textBlockRef3}>
            {renderAnimatedLines(lines3, "ps_text-3")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
