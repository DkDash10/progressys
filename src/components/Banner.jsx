import React from 'react'
import sample from '../assets/video/bannerVideo.mp4'
import bannerRect from "../assets/img/bannerRectangle.png"
import GIT from "../assets/icons/getInTouch.svg"

const Banner = () => {
  return (
    <section className='banner'>
      <video className='banner_video' autoPlay loop muted>
          <source src={sample} type='video/mp4' />
      </video>
      <div className='banner_top'>
        <p>Re-Engineering Business</p>
        <img src={bannerRect} alt="bannerRectangle" />
      </div>
      <div className='banner_bottom'>
        <div className='banner_bottom-text'>
          <span>Re-Engineering Business</span>
          <span>/</span>
          <span>Re-Imagining Societies</span>
          <span>/</span>
          <span>Redefining Lives</span> 
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