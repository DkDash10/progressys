import React, { useState, useEffect, useRef } from 'react';
import { useModal } from "../../contexts/modalContext";
import gsap from 'gsap';
import './ContactFormModal.css';
import { HiXMark } from "react-icons/hi2";

function ContactFormModal() {
  const { isModalOpen, closeModal } = useModal();
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  // Animate modal in on open
  useEffect(() => {
    if (!isModalOpen || !modalRef.current) return;

    const { x, y } = window.modalClickPosition || {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    const modal = modalRef.current;
    const bounds = modal.getBoundingClientRect();
    const offsetX = x - (bounds.left + bounds.width / 2);
    const offsetY = y - (bounds.top + bounds.height / 2);

    gsap.fromTo(
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
        ease: 'back.out(1.7)',
      }
    );

    // Optional: fade in overlay
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
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
          <p className="modal-title">Let's Re-Engineer Your Legacy.</p>
          <button onClick={closeAnimateModal} className="close-btn">
            <HiXMark />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority" className="form-label">My Growth Priority Is...</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="" disabled>Select a priority</option>
                  <option value="Tech">Tech</option>
                  <option value="Social Impact">Social Impact</option>
                  <option value="Talent">Talent</option>
                  <option value="Brand">Brand</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Company Size</label>
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
