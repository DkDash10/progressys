import React, { useEffect, useRef } from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import gsap from 'gsap';


const Footer = () => {
    const svgRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const footer = footerRef.current;

    const handleMouseMove = (e) => {
      const { left, top } = footer.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      gsap.to(svg, {
        x: x - 150, // Offset to center the circle
        y: y - 150,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(svg, {
        opacity: 0,
        duration: 0.3,
      });
    };

    const handleMouseEnter = () => {
      gsap.to(svg, {
        opacity: 1,
        duration: 0.3,
      });
    };

    footer.addEventListener('mousemove', handleMouseMove);
    footer.addEventListener('mouseenter', handleMouseEnter);
    footer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      footer.removeEventListener('mousemove', handleMouseMove);
      footer.removeEventListener('mouseenter', handleMouseEnter);
      footer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  return (
    <footer ref={footerRef}>
        <div className="footer_container">
            <div className='footer_top'>
                <p>let`s talk</p>
                <div className='footer_top-links'>
                    <a href="https://www.linkedin.com/company/progressys-group/" target='_blank' rel="noopener noreferrer">
                        <FaLinkedinIn />
                    </a>
                    <a href="https://www.instagram.com/progressys_group/" target='_blank' rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://x.com/ProgressysGroup" target='_blank' rel="noopener noreferrer">
                        <FaXTwitter />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61569821011817" target='_blank' rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                </div>
            </div>
            <div className='footer_middle'>
                <div className='footer_middle-left'></div>
                <div className='footer_middle-center'>
                    <p>Contacts</p>
                    {/* <div>
                        <span>address:</span>
                        <span> &nbsp; 27 Noida, UP 10000 INDIA</span>
                    </div> */}
                    <div>
                        <span>email:</span>
                        <a href="mailto:growth@progressys.com"> &nbsp; growth@progressys.com</a>
                    </div>
                    <div>
                        <span>phone:</span>
                        <a href="tel:+91 8103123456"> &nbsp; +91 8103123456</a>
                    </div>
                </div>
                <div className='footer_middle-right'>
                    <p>Working hours</p>
                    <div>
                        <span>mon – fri:</span>
                        <span> &nbsp; 9am – 6pm</span>
                    </div>
                    <div>
                        <span>sat – sun:</span>
                        <span> &nbsp; 10am – 12am</span>
                    </div>
                </div>
            </div>
            <p className='footer_bottom'>Copyright © 2025 Progressys. All Rights Reserved</p>
        </div>
        <svg ref={svgRef} className='footer_svg' width="303" height="303" viewBox="0 0 303 303" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="151.5" cy="151.5" r="151.5" fill="#8080e6" fill-opacity="1"/>
        </svg>

    </footer>
  )
}

export default Footer