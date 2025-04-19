import React, { useRef, useState, useEffect } from 'react';
import blog1 from "../assets/img/blog1.png";
import blog2 from "../assets/img/blog2.png";
import blog3 from "../assets/img/blog3.png";
import blog4 from "../assets/img/blog4.png";
// import { ReactComponent as CustomIcon } from "../assets/icons/arrow.svg"

// BLOG DATA ARRAY
const blogData = [
  {
    title: "Why 80% of AI Projects Fail and How to Engineer the 20% that Soar",
    desc: "Spoiler: It’s not about the tech. It’s about the humans behind it.",
    image: blog1,
  },
  {
    title: "The DEI Delusion: From Lip Service to Legacy",
    desc: "Data proves performative DEI costs $3M/year. Here’s the fix.",
    image: blog2,
  },
  {
    title: "Decoding Data Strategy for Scalable Growth",
    desc: "Why data without direction is like a compass without a needle.",
    image: blog3,
  },
  {
    title: "AI vs. Ethics: Drawing the Line in Automation",
    desc: "At what point does convenience compromise conscience?",
    image: blog4,
  },
];

const ArrowIcon = ({ direction, isActive }) => (
  <svg
    className={`arrow-icon ${direction} ${isActive ? 'active' : 'inactive'}`}
    width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M25.1231 37.7298V32.7447L8.91268 32.7271L37.4975 4.14226L33.9619 0.60673L5.37715 29.1915L5.37715 12.9634L0.37437 12.9811V37.7298H25.1231Z" fill="currentColor"/>
  </svg>
);

const ProgressysBlog = () => {
  const blogContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = blogContainerRef.current;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction) => {
    const el = blogContainerRef.current;
    el.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = blogContainerRef.current;
    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <section className="progressysBlog">
      <div className='pb_top'>
        <span className='subtitle'>Featured Posts</span>
        <p className='pb_top-title'>Progressys Blog</p>
        <div className='pb_top-btns'>
          <button className='pb_top-btn' onClick={() => scroll('left')}>
            <ArrowIcon direction="left" isActive={canScrollLeft} />
          </button>
          <button className='pb_top-btn' onClick={() => scroll('right')}>
            <ArrowIcon direction="right" isActive={canScrollRight} />
          </button>
        </div>
      </div>
      <div className='pb_blogs' ref={blogContainerRef}>
        {blogData.map((blog, index) => (
          <div className="pb_blog" key={index}>
            <img src={blog.image} alt={`blog-${index}`} />
            <div className='pb_blog-texts'>
              <p className="pb_blog-title">{blog.title}</p>
              <p className="pb_blog-desc">Excerpt: {blog.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgressysBlog;
