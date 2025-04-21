import React, { useEffect, useMemo, useRef } from 'react'
import sample from '../assets/video/bannerVideo.mp4'
import bannerRect from "../assets/img/bannerRectangle.png"
import GIT from "../assets/icons/getInTouch.svg"
import gsap from 'gsap'
import { TextPlugin } from "gsap/TextPlugin"
import logo1 from "../assets/img/logo11.png"

// Register TextPlugin globally
gsap.registerPlugin(TextPlugin);

const Banner = () => {
  const staticRef = useRef(null);
  const textRef = useRef(null);
  const phrases = useMemo(() =>[
    "Engineering Business",
    "Imagining Societies",
    "Defining Lives"
  ], []);

  useEffect(() => {
    if (!textRef.current || !staticRef.current) return;

    const timeline = gsap.timeline({ repeat: -1 });
    
    const animateTypewriter = () => {
      phrases.forEach((phrase) => {
        timeline
          // Show static "Re-"
          .to(staticRef.current, {
            duration: 0,
            opacity: 1,
            text: "Re-"
          })
          // Show dynamic text from left to right
          .to(textRef.current, {
            duration: 0,
            opacity: 1
          })
          .to(textRef.current, {
            duration: 2,
            text: phrase,
            ease: "none"
          })
          .to(textRef.current, {
            duration: 1,
            opacity: 1
          })
          // Pause before deleting
          .to({}, { duration: 0.5 })
          // Delete text from right to left
          .to(textRef.current, {
            duration: 1,
            text: {
              value: "",
              rtl: true // Right to left deletion
            },
            ease: "none"
          })
          // Hide static "Re-"
          .to(staticRef.current, {
            duration: 0.3,
            opacity: 0
          })
          // Pause between phrases
          .to({}, { duration: 0.5 });
      });
    };

    animateTypewriter();
    
    return () => {
      timeline.kill();
    };
  }, [phrases]);

  return (
    <section className='banner'>
      <video className='banner_video' autoPlay loop muted>
        <source src={sample} type='video/mp4' />
      </video>
      <div className='banner_top'>
        <img src={bannerRect} alt="bannerRectangle" />
        <div className='banner_top-block'>
          <p>We are Progressys Group</p>
          <img src={logo1} alt="logo" />
        </div>
      </div>
      <div className='banner_bottom'>
        <div className='banner_bottom-text'>
          <span ref={staticRef} className="static-text"></span>
          <span ref={textRef} className="dynamic-text"></span>
        </div>
        <div className='banner_bottom-scroll'>
          <img src={GIT} alt="Scroll" />
          <p>Scroll Down</p>
        </div>
      </div>
    </section>
  )
}

export default Banner