import React, { useState, useEffect, useRef } from 'react';
import { useModal } from "../../contexts/modalContext";
import gsap from 'gsap';
import './ContactFormModal.css';
import { HiXMark } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";

function ContactFormModal() {
  const { isModalOpen, closeModal } = useModal();
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!isModalOpen || !modalRef.current || !overlayRef.current || !formRef.current) return;
  
    const modal = modalRef.current;
    const overlay = overlayRef.current;
    const form = formRef.current;
  
    const { x, y } = window.modalClickPosition || {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  
    const bounds = modal.getBoundingClientRect();
    const offsetX = x - (bounds.left + bounds.width / 2);
    const offsetY = y - (bounds.top + bounds.height / 2);
  
    const tl = gsap.timeline();
  
    tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        modal,
        {
          opacity: 0,
          scale: 0.5,
          x: offsetX,
          y: offsetY,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "<" // start at same time as overlay
      )
      .from(
        modal.querySelector(".modal-header"),
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2" // slightly before modal finishes
      )
      .from(
        form.querySelectorAll(".form-group, .form-footer"),
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );
  }, [isModalOpen]);

  // Animate modal out before closing
  const closeAnimateModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          closeModal();
        }
      });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  };

  // Close only when clicking on overlay (not modal)
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      closeAnimateModal();
    }
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    priority: '',
    companySize: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    setFormData({
      name: '',
      email: '',
      priority: '',
      companySize: ''
    });

    closeAnimateModal();
    alert('Form submitted successfully!');
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <button className="modal-back" onClick={closeAnimateModal}>Go back</button>
          <div className='modal-texts'>
            <p className="modal-title">Let's Re-Engineer Your Legacy.</p>
            <p className="modal-subtitle">Your email address will not be published. Required fields are marked *</p>
          </div>
          <button onClick={closeAnimateModal} className="close-btn">
            <HiXMark />
          </button>
        </div>

        <div className="modal-body" ref={formRef}>
          <form onSubmit={handleSubmit} >
            <div className="form-fields">
              <div className="form-group">
                {/* <label htmlFor="name" className="form-label">Name</label> */}
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder='Name*'
                  required
                />
              </div>

              <div className="form-group">
                {/* <label htmlFor="email" className="form-label">Email</label> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder='Email*'
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority" className="form-label">My Growth Priority Is...*</label>
                <div className='select-div'>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    onFocus={() => setIsSelectFocused(true)}
                    onBlur={() => setIsSelectFocused(false)}
                    className={`form-select ${formData.priority === '' ? 'placeholder' : ''}`}
                    required
                  >
                    <option value="" disabled>Select a priority</option>
                    <option value="Tech"><span>Tech</span></option>
                    <option value="Social Impact"><span>Social Impact</span></option>
                    <option value="Talent"><span>Talent</span></option>
                    <option value="Brand"><span>Brand</span></option>
                  </select>
                  <IoIosArrowDown
                    className={`form-icon ${
                      isSelectFocused ? 'rotate' : ''
                    } ${formData.priority !== '' ? 'hidden' : ''}`}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Company Size*</label>
                <div className="radio-group">
                  {["Startup", "Mid-Market", "Enterprise"].map(size => (
                    <label key={size} className="radio-label">
                      <input
                        type="radio"
                        name="companySize"
                        value={size}
                        checked={formData.companySize === size}
                        onChange={handleChange}
                        className="radio-input"
                        required
                      />
                      <span className="radio-text">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button type="submit" className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactFormModal;
