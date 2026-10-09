import React, { useState, useEffect, useRef } from "react";
import { useModal } from "../../contexts/modalContext";
import gsap from "gsap";
import "./ContactFormModal.css";
import { HiXMark } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck, FaTimes } from "react-icons/fa";
import Select from "react-select";

function ContactFormModal() {
  const { isModalOpen, closeModal } = useModal();
  // const [isSelectFocused, setIsSelectFocused] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const formRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    if (
      !isModalOpen ||
      !modalRef.current ||
      !overlayRef.current ||
      !formRef.current
    )
      return;

    const modal = modalRef.current;
    const overlay = overlayRef.current;
    const form = formRef.current;

    // const { x, y } = window.modalClickPosition || {
    //   x: window.innerWidth / 2,
    //   y: window.innerHeight / 2,
    // };

    // const bounds = modal.getBoundingClientRect();
    // const offsetX = x - (bounds.left + bounds.width / 2);
    // const offsetY = y - (bounds.top + bounds.height / 2);

    const tl = gsap.timeline();

    tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        modal,
        {
          opacity: 0,
          y: 100, // Start lower (bottom)
          scale: 1,
        },
        {
          opacity: 1,
          y: 0, // Move up into position
          scale: 1,
          duration: 0.5,
          ease: "power4.out",
        },
        "<"
      )
      .from(
        modal.querySelector(".modal-header"),
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
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

  const closeAnimateModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        y: 100, // Move modal downward
        opacity: 0,
        scale: 1,
        duration: 0.4,
        ease: "power4.in",
        onComplete: () => {
          closeModal();
        },
      });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
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
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    priority: "",
    companySize: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/xyzwyryw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const tl = gsap.timeline();
      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          priority: "",
          companySize: "",
        });
        setFormStatus("success");

        tl.fromTo(
          messageRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );

        setTimeout(() => {
          setFormStatus("idle");
          closeAnimateModal();
        }, 1000);
      } else {
        setFormStatus("error");

        tl.fromTo(
          messageRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      }
      setTimeout(() => {
        setFormStatus("idle");
        closeAnimateModal();
      }, 1000);
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus("error");

      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
    setTimeout(() => {
      setFormStatus("idle");
      closeAnimateModal();
    }, 1000);
  };

  if (!isModalOpen) return null;

  const customStyles = {
    control: (provided) => ({
      ...provided,
      boxShadow: "none",
      background: "white",
      color: "#555555",
      fontWeight: "600"
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "5px",
      position: "absolute",
      width: "100%",
      zIndex: 9999,
      background: "white",
      borderRadius: "12px",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      borderRadius: "12px",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "12px",
      backgroundColor: state.isFocused ? "#8080e6" : "white",
      color: state.isFocused ? "white" : "#555555",
      cursor: "pointer",
      fontWeight: "500",
      "&:hover": {
        backgroundColor: "#8080e6",
        color: "white",
      },
    }),
    container: (provided) => ({
      ...provided,
      padding: 0,
      position: "relative",
    }),
  };

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className="modal-content" ref={modalRef}>
        {formStatus === "idle" || formStatus === "submitting" ? (
          <>
            <div className="modal-header">
              <button className="modal-back" onClick={closeAnimateModal}>
                Go back
              </button>
              <div className="modal-texts">
                <p className="modal-title">Let's Re-Engineer Your Legacy.</p>
                <p className="modal-subtitle">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
              </div>
              <button onClick={closeAnimateModal} className="close-btn">
                <HiXMark />
              </button>
            </div>

            <div className="modal-body" ref={formRef}>
              <form onSubmit={handleSubmit}>
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
                      placeholder="Name*"
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
                      placeholder="Email*"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="priority" className="form-label">
                      My Growth Priority Is*
                    </label>
                    <Select
                      id="priority"
                      name="priority"
                      options={[
                        { value: "Tech", label: "Tech" },
                        { value: "Social Impact", label: "Social Impact" },
                        { value: "Talent", label: "Talent" },
                        { value: "Brand", label: "Brand" },
                      ]}
                      styles={customStyles}
                      value={
                        formData.priority
                          ? {
                              value: formData.priority,
                              label: formData.priority,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        setFormData({
                          ...formData,
                          priority: selectedOption.value,
                        })
                      }
                      classNamePrefix="react-select"
                      placeholder="Select a priority"
                      required
                      isSearchable={false}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label company-size">Company Size*</label>
                    <div className="radio-group">
                      {["Startup", "Mid-Market", "Enterprise"].map((size) => (
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
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={formStatus === "submitting"}
                  >
                    {formStatus === "submitting" ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="form-message-screen" ref={messageRef}>
            {formStatus === "success" ? (
              <>
                <FaCheck className="message-icon success" />
                <p className="message-text success">
                  Thank you! <br />
                  We’ll get back to you shortly.
                </p>
              </>
            ) : (
              <>
                <FaTimes className="message-icon error" />
                <p className="message-text error">
                  Something went wrong. <br />
                  Please try again.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactFormModal;
