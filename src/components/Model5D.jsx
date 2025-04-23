import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GIT from "../assets/icons/getInTouch.svg";
import Ellipse from "../assets/img/5dModelEllipse.svg";
import Polygon from "../assets/img/5dModelPolygon.svg";
import d1 from "../assets/img/d1.png";
import d2 from "../assets/img/d2.png";
import d3 from "../assets/img/d3.png";
import d4 from "../assets/img/d4.png";
import d5 from "../assets/img/d5.png";
import BGIT from "../assets/icons/blackGetInTouch.svg";
import { useModal } from "../contexts/modalContext";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Model5D = () => {
  const modelData = [
    {
      id: 1,
      title: "Diagnose:",
      subtitle: "Uncover hidden growth barriers.",
      label: "D1",
      image: d1,
      className: "m5D_mid-d1",
      delay: 0,
    },
    {
      id: 2,
      title: "Design:",
      subtitle: "Build your custom engine.",
      label: "D2",
      image: d2,
      className: "m5D_mid-d2",
      delay: 0.2,
    },
    {
      id: 3,
      title: "Deploy:",
      subtitle: "Integrate tech, culture, and strategy.",
      label: "D3",
      image: d3,
      className: "m5D_mid-d3",
      delay: 0.4,
    },
    {
      id: 4,
      title: "Drive:",
      subtitle: "Optimize with AI-powered agility.",
      label: "D4",
      image: d4,
      className: "m5D_mid-d4",
      delay: 0.6,
    },
    {
      id: 5,
      title: "Dominate:",
      subtitle: "Own your industry's future.",
      label: "D5",
      image: d5,
      className: "m5D_mid-d5",
      delay: 0.8,
    },
  ];

  // Refs for elements we want to animate
  const topBlockRef = useRef(null);
  const d1Ref = useRef(null);
  const d2Ref = useRef(null);
  const d3Ref = useRef(null);
  const d4Ref = useRef(null);
  const d5Ref = useRef(null);
  const mobileBlocksRef = useRef(null);

  const { openModal } = useModal();
  const handleGetInTouchClick = (e) => {
    const clickX = e.clientX;
    const clickY = e.clientY;
  
    window.modalClickPosition = { x: clickX, y: clickY }; // store globally
    openModal("Let’s build something transformative together.");
  };

  useEffect(() => {
    // Animation for the top section
    gsap.fromTo(
      topBlockRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: topBlockRef.current,
          start: "top bottom",
          end: "top top",
          toggleActions: "play reverse restart reverse", // play, reverse, restart, reverse when scrolling down, up, down again, up again
          scrub: 0.5 // Smooth animation tied to scroll position
        }
      }
    );

    // Animate each desktop model block
    const blockElements = [d1Ref, d2Ref, d3Ref, d4Ref, d5Ref];
    
    blockElements.forEach((ref) => {
      gsap.fromTo(
        ref.current,
        { 
          y: 100, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play reverse restart reverse", // Enable reverse animation
            scrub: 1 // Smooth animation tied to scroll position
          }
        }
      );
    });

    // Animate mobile blocks container
    if (mobileBlocksRef.current) {
      // Get all child blocks
      const mobileBlocks = Array.from(mobileBlocksRef.current.children);
      
      mobileBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { 
            y: 100, 
            opacity: 0 
          },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top bottom-=50",
              end: "top center+=100",
              toggleActions: "play reverse restart reverse", // Enable reverse animation
              scrub: 0.5, // Smooth animation tied to scroll position
            }
          }
        );
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

   
  return (
    <section className="model5D">
      <div className="m5D_container">
        <div className="m5D_top" ref={topBlockRef}>
          <span className="subtitle">5D Model</span>
          <p className="m5D_top-title">The Progressys Edge</p>
          <div className="m5D_top-texts">
            <p>
              <span>Where others adapt, we redesign:</span> Turning disruption
              into dominance, stagnation into systems, and risks into
              revolutions—for businesses, societies, and the lives they power.
            </p>
            <div className="banner_bottom-scroll m5D_top-scroll">
              <img src={GIT} alt="Scroll" />
              <p>Scroll Down</p>
            </div>
          </div>
        </div>
        
        <div className="m5D_mid">
          <p className="m5D_mid-title">
            5D <br />
            Model
          </p>
          <p className="m5D_mid-subtitle">Our Growth Algorithm™</p>
          <div className="m5D_mid-main">
            <img className="m5D_mid-img1" src={Ellipse} alt="Ellipse" />
            <img className="m5D_mid-img2" src={Polygon} alt="Polygon" />
            
            {/* Desktop Layout */}
            <div className="m5D_mid-blocks">
              <div className="m5D_mid-block m5D_mid-d1" ref={d1Ref}>
                <p className="m5D_mid-blockTitle">Diagnose:</p>
                <p className="m5D_mid-blockSub">
                  Uncover hidden growth barriers.
                </p>
                <div className="m5D_mid-imgBlock">
                  <p>D1</p>
                  <img src={d1} alt="d1" />
                </div>
              </div>
              <div className="m5D_mid-sep">
                <div className="m5D_mid-blockLeft">
                  <div className="m5D_mid-block m5D_mid-d3" ref={d3Ref}>
                    <p className="m5D_mid-blockTitle">Deploy:</p>
                    <p className="m5D_mid-blockSub">
                      Integrate tech, culture, and strategy.
                    </p>
                    <div className="m5D_mid-imgBlock">
                      <p>D3</p>
                      <img src={d3} alt="d3" />
                    </div>
                  </div>
                  <div className="m5D_mid-block m5D_mid-d5" ref={d5Ref}>
                    <p className="m5D_mid-blockTitle">Dominate:</p>
                    <p className="m5D_mid-blockSub">
                      Own your industry's future.
                    </p>
                    <div className="m5D_mid-imgBlock">
                      <p>D5</p>
                      <img src={d5} alt="d5" />
                    </div>
                  </div>
                </div>
                <div className="m5D_mid-blockRight">
                  <div className="m5D_mid-block m5D_mid-d2" ref={d2Ref}>
                    <p className="m5D_mid-blockTitle">Design:</p>
                    <p className="m5D_mid-blockSub">Build your custom engine.</p>
                    <div className="m5D_mid-imgBlock">
                      <p>D2</p>
                      <img src={d2} alt="d2" />
                    </div>
                  </div>
                  <div className="m5D_mid-block m5D_mid-d4" ref={d4Ref}>
                    <p className="m5D_mid-blockTitle">Drive:</p>
                    <p className="m5D_mid-blockSub">
                      Optimize with AI-powered agility.
                    </p>
                    <div className="m5D_mid-imgBlock">
                      <p>D4</p>
                      <img src={d4} alt="d4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Layout */}
            <div className="m5D_mid-blocks-mobile" ref={mobileBlocksRef}>
              {modelData.map((item) => (
                <div key={item.id} className={`m5D_mid-block ${item.className}`}>
                  <div className="m5D_content">
                    <p className="m5D_mid-blockTitle">{item.title}</p>
                    <p className="m5D_mid-blockSub">{item.subtitle}</p>
                    <div className="m5D_mid-imgBlock">
                      <p>{item.label}</p>
                      <img src={item.image} alt={item.label} loading="lazy"/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="ps_textBlock-2 m5D_bottom">
          <p><span>Growth isn't luck. It's algorithmic.</span> We merge AI's precision, humanity's intuition, and strategies that outlast trends.</p>
          <div className="ps_getInTouch" onClick={handleGetInTouchClick}>
            <img src={BGIT} alt="getInTouch" />
            <p>Get in Touch</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model5D;