import React,{ useState } from 'react'
import { useModal } from "../../contexts/modalContext";
import './ContactFormModal.css'

function ContactFormModal() {
    const { isModalOpen, closeModal } = useModal();
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
      // Here you would typically send the data to your backend
      
      // Clear form fields
      setFormData({
        name: '',
        email: '',
        priority: '',
        companySize: ''
      });
      
      closeModal();
      alert('Form submitted successfully!');
    };
  
    if (!isModalOpen) return null;
  
    return (
      <div className="modal-overlay">
        {/* Modal Content */}
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h2 className="modal-title">Let's Re-Engineer Your Legacy.</h2>
            <button 
              onClick={closeModal}
              className="close-btn"
            >
              <span>×</span>
            </button>
          </div>
  
          {/* Modal Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-fields">
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
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
  
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
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
  
                {/* Growth Priority Dropdown */}
                <div className="form-group">
                  <label htmlFor="priority" className="form-label">
                    My Growth Priority Is...
                  </label>
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
  
                {/* Company Size */}
                <div className="form-group">
                  <label className="form-label">
                    Company Size
                  </label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="companySize"
                        value="Startup"
                        checked={formData.companySize === "Startup"}
                        onChange={handleChange}
                        className="radio-input"
                        required
                      />
                      <span className="radio-text">Startup</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="companySize"
                        value="Mid-Market"
                        checked={formData.companySize === "Mid-Market"}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="radio-text">Mid-Market</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="companySize"
                        value="Enterprise"
                        checked={formData.companySize === "Enterprise"}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="radio-text">Enterprise</span>
                    </label>
                  </div>
                </div>
              </div>
  
              {/* Submit Button */}
              <div className="form-footer">
                <button
                  type="submit"
                  className="submit-btn"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default ContactFormModal