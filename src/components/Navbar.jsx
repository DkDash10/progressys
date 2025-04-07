import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../assets/img/logo.png"
import aboutus from "../assets/icons/aboutus.png"
import GIT from "../assets/icons/getInTouch.svg"
import { RxHamburgerMenu } from "react-icons/rx"
import gsap from 'gsap'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hideNav, setHideNav] = useState(false)
  const menuRef = useRef(null)
  const prevScrollY = useRef(window.scrollY)
  const debounceTimeout = useRef(null)

  // Debounced scroll direction detector
  useEffect(() => {
    const handleScroll = () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)

      debounceTimeout.current = setTimeout(() => {
        const currentScroll = window.scrollY
        const direction = currentScroll > prevScrollY.current ? 'down' : 'up'
        const pastScreenHeight = currentScroll > window.innerHeight

        if (direction === 'down' && pastScreenHeight) {
          setHideNav(true)
        } else if (direction === 'up') {
          setHideNav(false)
        }

        prevScrollY.current = currentScroll
      }, 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(debounceTimeout.current)
    }
  }, [])

  // Animate mobile menu
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        display: 'flex',
      })
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = 'none'
        }
      })
    }
  }, [isOpen])

  const handleLinkClick = () => setIsOpen(false)

  return (
    <nav className={`navbar ${hideNav ? 'hide-navbar' : ''}`}>
      <Link to="/"><img src={Logo} alt="Logo" /></Link>

      <div className='nav_links'>
        <Link to="#aboutUs" className="nav_link">About Us <img src={aboutus} alt="aboutus" /></Link>
        <Link to="#ourSpecialization" className="nav_link">Our Specialization</Link>
        <Link to="#progressysBlog" className="nav_link">Progressys Blog</Link>
        <Link to="#contactUs" className="nav_link">Contact Us</Link>
      </div>

      <div className='nav_btn'>
        <img src={GIT} alt="Get in touch" />
        <p>Get In touch</p>
      </div>

      <div className="hamburger_icon" onClick={() => setIsOpen(!isOpen)}>
        <RxHamburgerMenu size={28} />
      </div>

      <div ref={menuRef} className="mobile_nav_links">
        <Link to="#aboutUs" className="nav_link" onClick={handleLinkClick}>About Us</Link>
        <Link to="#ourSpecialization" className="nav_link" onClick={handleLinkClick}>Our Specialization</Link>
        <Link to="#progressysBlog" className="nav_link" onClick={handleLinkClick}>Progressys Blog</Link>
        <Link to="#contactUs" className="nav_link" onClick={handleLinkClick}>Contact Us</Link>
        <div className='nav_btn mobile_btn' onClick={handleLinkClick}>
          <img src={GIT} alt="Get in touch" />
          <p>Get In touch</p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
