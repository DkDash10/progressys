import React from 'react'
// import fb from "../assets/icons/fb.svg"
// import insta from "../assets/icons/insta.svg"
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer>
        <div className='footer_top'>
            <p>let`s talk</p>
            <div className='footer_top-links'>
                <Link to="">
                    <FaLinkedinIn />
                </Link>
                <Link to="">
                    <FaXTwitter />
                    {/* <img src={insta} alt="instagram" /> */}
                </Link>
                <Link to="">
                    <FaYoutube />
                    {/* <img src={insta} alt="instagram" /> */}
                </Link>
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
                    <Link to="mailto:growth@progressys.com"> &nbsp; growth@progressys.com</Link>
                </div>
                <div>
                    <span>phone:</span>
                    <Link to="tel:+91 8103123456"> &nbsp; +91 8103123456</Link>
                </div>
            </div>
            <div className='footer_middle-right'>
                <p>Working hours</p>
                <div>
                    <span>mon – fri:</span>
                    <span> &nbsp; 9am – 6pm</span>
                </div>
                <div>
                    <span>st – sun:</span>
                    <span> &nbsp; 10am – 12am</span>
                </div>
            </div>
        </div>
        <p className='footer_bottom'>Copyright © 2025 Progressys. All Rights Reserved</p>
    </footer>
  )
}

export default Footer