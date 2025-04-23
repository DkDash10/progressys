import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import BnC from "../assets/img/brandAndCulture.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ArrowIcon = ({ direction, isActive }) => (
  <svg
    className={`arrow-icon ${direction} ${isActive ? "active" : "inactive"}`}
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.1231 37.7298V32.7447L8.91268 32.7271L37.4975 4.14226L33.9619 0.60673L5.37715 29.1915L5.37715 12.9634L0.37437 12.9811V37.7298H25.1231Z"
      fill="currentColor"
    />
  </svg>
);

const OurTeam = () => {
  const titleRef = useRef(null);
  const teamContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Array of team members with random names and designations
  const teamMembers = [
    { name: "Alex Morgan", designation: "UI/UX Designer" },
    { name: "Jamie Chen", designation: "Frontend Developer" },
    { name: "Taylor Rodriguez", designation: "Project Manager" },
    { name: "Jordan Smith", designation: "Backend Developer" },
    { name: "Casey Wilson", designation: "Digital Strategist" },
    { name: "Riley Johnson", designation: "Content Creator" },
    { name: "Morgan Lewis", designation: "SEO Specialist" },
    { name: "Quinn Davis", designation: "Motion Designer" },
    { name: "Avery Thompson", designation: "Marketing Director" },
    { name: "Blake Anderson", designation: "Product Manager" },
    { name: "Skyler Martinez", designation: "Full Stack Developer" },
    { name: "Dakota Brown", designation: "Creative Director" },
    { name: "Parker Williams", designation: "Data Analyst" },
    { name: "Reese Garcia", designation: "Copywriter" },
    { name: "Sidney Taylor", designation: "Social Media Manager" },
  ];

  const checkScroll = () => {
    const el = teamContainerRef.current;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction) => {
    const el = teamContainerRef.current;
    const scrollOffset = window.innerWidth <= 480 ? 315 : 380;
    el.scrollBy({
      left: direction === "left" ? -scrollOffset : scrollOffset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = teamContainerRef.current;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 660px)");
    const ctx = gsap.context(() => {
      // Animate titleRef to bottom of container
      if (mediaQuery.matches && titleRef.current) {
        const container = titleRef.current.parentNode;
  
        gsap.to(titleRef.current, {
          scrollTrigger: {
            trigger: container,
            start: "top 50%",
            end: "top 30%",
            scrub: true,
          },
          y: () => container.clientHeight - titleRef.current.clientHeight,
          ease: "none",
        });
      }
  
      // Animate cards with "fall" effect
      const cards = gsap.utils.toArray(".oT_card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".oT_cards",
            start: "top 60%",
            once: true, // animate only once
          },
        }
      );
    });
  
    return () => ctx.revert();
  }, []);

  return (
    <section className="ourTeam">
      <div className="oT_top">
        <span className="subtitle">Our Team</span>
        <div className="oT_top-texts">
          <p className="oT_texts-title" ref={titleRef}>
            Our Growth Engineers
          </p>
          <p className="oT_texts-desc">
            Digital agencies are at the forefront of the digital landscape,
            combining creative and technical expertise to help clients thrive in
            the digital world.
          </p>
        </div>
      </div>
      <div className="oT_cards" ref={teamContainerRef}>
        {teamMembers.map((member, index) => (
          <div className="oT_card" key={index}>
            <img src={BnC} alt={`${member.name} profile`} loading="lazy" />
            <div className="oT_card-top">
              <p>{member.name}</p>
            </div>
            <div className="oT_card-bottom">
              <span>({member.designation})</span>
              {/* <svg
                className="read_more_icon"
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 1.75V6.75H18.9625L14.4875 2.2625L16.25 0.5L23.75 8L16.25 15.5L14.4875 13.7375L18.9625 9.25H0V1.75H2.5Z"
                  fill="currentColor"
                />
              </svg> */}
            </div>
          </div>
        ))}
      </div>
      <div className="oT_bottom">
        <button className="pb_top-btn" onClick={() => scroll("left")}>
          <ArrowIcon direction="left" isActive={canScrollLeft} />
        </button>
        <button className="pb_top-btn" onClick={() => scroll("right")}>
          <ArrowIcon direction="right" isActive={canScrollRight} />
        </button>
      </div>
    </section>
  );
};

export default OurTeam;
