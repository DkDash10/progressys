import React from 'react'
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";


const Footer = () => {
  return (
    <footer>
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
                        <span>st – sun:</span>
                        <span> &nbsp; 10am – 12am</span>
                    </div>
                </div>
            </div>
            <p className='footer_bottom'>Copyright © 2025 Progressys. All Rights Reserved</p>
        </div>
    </footer>
  )
}

export default Footer