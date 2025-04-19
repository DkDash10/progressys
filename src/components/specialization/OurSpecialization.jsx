import React, { useState, useEffect, useRef } from "react";
import "./OurSpecialization.css";
import BnC from "../../assets/img/brandAndCulture.png"
import { GoDotFill } from "react-icons/go";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const OurSpecialization = () => {
  const researchStrategyOfferings = [
    {
      title: "Market & Competitive Intelligence",
      approach: "Deep-dive analytics into market trends, customer behavior, and competitor strategies.",
      subpoints: "Market sizing, SWOT analysis, disruptive threat assessment.",
      impact: "Uncover untapped opportunities and preempt risks."
    },
    {
      title: "Strategic Vision & Roadmapping",
      approach: "Co-create long-term visions with actionable 3–5-year roadmaps.",
      subpoints: "Scenario planning, resource allocation, agile execution frameworks.",
      impact: "Align stakeholders and adapt dynamically to market shifts."
    },
    {
      title: "Customer-Centric Strategy",
      approach: "Leverage data-driven insights to refine segmentation and journey mapping.",
      subpoints: "Personalization strategies, loyalty program design, CX/UX optimization.",
      impact: "Boost retention and lifetime value through hyper-relevance."
    },
    {
      title: "Digital Transformation & AI-Driven Innovation",
      approach: "Integrate cutting-edge tech (AI, IoT, automation) into core operations.",
      subpoints: "Digital maturity assessment, AI-powered decision tools, omnichannel ecosystems.",
      impact: "Unlock new revenue streams and operational efficiencies."
    },
    {
      title: "Operational Excellence",
      approach: "Streamline processes using Lean Six Sigma and automation.",
      subpoints: "Supply chain optimization, cost-reduction levers, agile workflows.",
      impact: "Achieve scalability with 20–30% efficiency gains."
    },
    {
      title: "Risk Management & Resilience Building",
      approach: "Stress-test strategies against geopolitical, economic, and operational risks.",
      subpoints: "Crisis playbooks, continuity planning, regulatory compliance.",
      impact: "Fortify against disruptions and ensure sustainable growth."
    },
    {
      title: "Sustainability & ESG Integration",
      approach: "Embed ESG principles into core strategy and operations.",
      subpoints: "Carbon footprint reduction, ethical sourcing, impact measurement.",
      impact: "Enhance brand equity and attract conscious investors."
    },
    {
      title: "Growth & Market Expansion",
      approach: "Identify whitespace opportunities via blue ocean strategies.",
      subpoints: "Entry into emerging markets, M&A targeting, product diversification.",
      impact: "Accelerate revenue growth with minimal risk."
    },
    {
      title: "Organizational & Cultural Transformation",
      approach: "Align talent, structure, and culture with strategic goals.",
      subpoints: "Change management, leadership development, DEI initiatives.",
      impact: "Foster innovation and agility through empowered teams."
    },
    {
      title: "M&A and Strategic Partnerships",
      approach: "Advise on deal sourcing, due diligence, and post-merger integration.",
      subpoints: "Synergy analysis, joint venture structuring, alliance ecosystems.",
      impact: "Drive value capture and competitive consolidation."
    },
    {
      title: "Performance Tracking & KPI Optimization",
      approach: "Design real-time dashboards and predictive analytics frameworks.",
      subpoints: "Balanced scorecards, OKR alignment, ROI measurement.",
      impact: "Enable data-driven pivots and continuous improvement."
    },
    {
      title: "Thought Leadership & Future Trends",
      approach: "Publish proprietary research on megatrends (e.g., AI, decarbonization).",
      subpoints: "Trend forecasting, innovation labs, policy shaping.",
      impact: "Position clients as industry pioneers."
    }
  ];

  // Data structure for accordion items
  const specializationData = [
    {
      id: "01",
      title: "Research & Strategy",
      content: "Velocity meets Scalability to transform your business.",
      offerings: researchStrategyOfferings,
      image: BnC
    },
    {
      id: "02",
      title: "Digital Transformation",
      headline: "Rewrite Your Code. Redefine Your Future.",
      tagline: "From legacy systems to AI-powered dominance.",
      offerings: [
        {
          title: "AI & Automation",
          description: "Custom AI models for supply chain optimization, predictive analytics, and customer experience (CX) personalization.",
          tools: "Tools: Generative AI, NLP, IoT, and Quantum Computing integration."
        },
        {
          title: "Cloud Ecosystems",
          description: "Seamless migration to hybrid cloud architectures (AWS, Azure) with embedded cybersecurity protocols."
        },
        {
          title: "CX Overhaul",
          description: "Omnichannel customer journeys powered by sentiment analysis and real-time data."
        }
      ],
      image: BnC
    },
    {
      id: "03",
      title: "Social Transformation",
      headline: "Impact That Multiplies.",
      offerings: [
        {
          title: "DEI Frameworks",
          description: "Bias-free recruitment algorithms + inclusive workplace audits."
        },
        {
          title: "Youth & Economic Inclusion",
          description: "Upskilling programs for underserved communities (EdTech partnerships)."
        },
        {
          title: "ESG Strategy",
          description: "Carbon footprint analytics + stakeholder transparency dashboards."
        }
      ],
      image: BnC
    },
    {
      id: "04",
      title: "MarTech Strategy",
      headline: "The convergence of AdTech, MarTech, DataTech, and Agentic Automation.",
      offerings: [
        {
          title: "Omnichannel Campaigns",
          description: "AI-curated content for Meta, Google, TikTok + programmatic ad bidding."
        },
        {
          title: "Customer Data Platforms (CDP)",
          description: "Unified customer profiles with predictive lifetime value scoring."
        },
        {
          title: "ROI Amplification",
          description: "A/B testing labs + attribution modeling."
        }
      ],
      image: BnC
    },
    {
      id: "05",
      title: "Brand & Culture",
      headline: "From employer branding to employee evangelists.",
      offerings: [
        {
          title: "Brand Positioning",
          description: "Competitive moat analysis + emotional resonance mapping."
        },
        {
          title: "Employee Experience (EX)",
          description: "Gamified learning platforms + AI-powered wellness trackers."
        },
        {
          title: "Crisis Navigation",
          description: "Reputation resilience playbooks + real-time sentiment monitoring."
        }
      ],
      image: BnC
    },
    {
      id: "06",
      title: "HR Consulting",
      headline: "Talent and winning strategies that fuel your growth algorithm.",
      offerings: [
        {
          title: "AI Recruitment",
          description: "Bias-free candidate matching + competency-based gamification."
        },
        {
          title: "Leadership Pipelines",
          description: "Succession planning with VR-based scenario simulations."
        },
        {
          title: "Gig Workforce Integration",
          description: "Hybrid team analytics + contractor engagement platforms."
        }
      ],
      image: BnC
    },
    {
      id: "07",
      title: "Training & Skill Enhancements",
      headline: "Future-ready technology-agnostic workforce.",
      offerings: [
        {
          title: "Tech-Agnostic Upskilling",
          description: "Modules on AI ethics, quantum basics, and blockchain for non-coders."
        },
        {
          title: "Leadership in the Metaverse",
          description: "Virtual boardroom simulations + NFT-based credentialing."
        },
        {
          title: "Microlearning Platforms",
          description: "Byte-sized courses on-demand (5G-enabled AR/VR)."
        }
      ],
      image: BnC
    },
    {
      id: "08",
      title: "Thought Leadership Programs",
      headline: "Transformative insights that reshape your world.",
      offerings: [
        {
          title: "White Papers & Industry Reports",
          description: "Data-driven narratives on AI ethics, Web3 economies, and sustainable tech."
        },
        {
          title: "C-Suite Podcasts",
          description: "\"The Growth Algorithm\" – Featuring clients as co-hosts."
        },
        {
          title: "Global Summits",
          description: "Progress Algorithm Conclave (live debates on quantum + ESG)."
        }
      ],
      image: BnC
    }
  ];

  // State to manage which accordion is open and its position
  const [openAccordion, setOpenAccordion] = useState(); // Default to Digital Transformation
  const [openPosition, setOpenPosition] = useState(null); // null means open normally
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  // Refs for animation targets
  const descriptionRef = useRef(null);
  const accordionRefs = useRef([]);
  const modalRef = useRef(null);
  const modalOverlayRef = useRef(null);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    if (descriptionElement) {
      const text = descriptionElement.textContent;
      const words = text.split(' ');
  
      // Clear the original content
      descriptionElement.textContent = '';
  
      // Create span for each word + add space after it
      words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.style.display = 'inline-block';
        wordSpan.style.opacity = '0.2';
        wordSpan.style.transform = 'translateY(20px)';
        descriptionElement.appendChild(wordSpan);
  
        // Add a space as a separate text node
        if (index < words.length - 1) {
          descriptionElement.appendChild(document.createTextNode(' '));
        }
      });
  
      // Animate the words
      gsap.to(descriptionElement.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: descriptionElement,
          start: 'top 80%',
          end: 'bottom 50%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, []);
  

  // Function to handle accordion animations
  const animateAccordionContent = (id, position) => {
    const accordionContent = document.querySelector(`[data-accordion="${id}"] .accordion_content`);
    
    if (accordionContent) {
      // Clear any existing animations
      gsap.killTweensOf(accordionContent);
      
      // Set initial position
      gsap.set(accordionContent, { 
        opacity: 0,
        y: position === "below" ? -50 : 50
      });
      
      // Animate
      gsap.to(accordionContent, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  // Toggle accordion function with position control and animation
  const toggleAccordion = (id) => {
    const currentIndex = specializationData.findIndex(item => item.id === openAccordion);
    const newIndex = specializationData.findIndex(item => item.id === id);
    
    // Determine if new accordion should open from below or above
    let position;
    if (currentIndex < newIndex) {
      position = "below";
    } else {
      position = "above";
    }
    
    setOpenPosition(position);
    setOpenAccordion(id === openAccordion ? null : id);
    
    // If opening an accordion, trigger animation after state update
    if (id !== openAccordion) {
      setTimeout(() => animateAccordionContent(id, position), 50);
    }
  };

  // Handle read more click with position tracking
  const handleReadMore = (content, event) => {
    // Capture click position for modal animation
    setClickPosition({
      x: event.clientX,
      y: event.clientY
    });
    
    setModalContent(content);
    setShowModal(true);
  };

  // Modal animation when it opens/closes
  useEffect(() => {
    if (showModal && modalRef.current && modalOverlayRef.current) {
      // Animate overlay
      gsap.fromTo(
        modalOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      // Animate modal from click position
      gsap.fromTo(
        modalRef.current,
        { 
          opacity: 0,
          scale: 0.5,
          x: clickPosition.x - window.innerWidth / 2,
          y: clickPosition.y - window.innerHeight / 2
        },
        { 
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [showModal, clickPosition]);

  // Handle click outside modal
  const handleOverlayClick = (event) => {
    if (event.target === modalOverlayRef.current) {
      closeModal();
    }
  };

  // Close modal with animation
  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => setShowModal(false)
      });
      
      gsap.to(modalOverlayRef.current, {
        opacity: 0,
        duration: 0.3
      });
    }
  };

  return (
    <section className="ourSpecialization">
      <div className="oS_container">
        {/* Top section with subtitle and description */}
        <div className="oS_top">
          <p className="subtitle">Our Specialization</p>
          <p className="description" ref={descriptionRef}>
            Our agency offers a range of services 
            aimed at helping businesses establish
            and enhance their online presence, 
            attract customers, and achieve their 
            digital marketing goals.
          </p>
        </div>

        {/* Accordion section */}
        <div className="oS_bottom">
          {specializationData.map((item, index) => (
            <div 
              key={item.id}
              className={`accordion_item ${
                openAccordion === item.id ? "accordion_open" : "accordion_closed"
              } ${openAccordion === item.id && openPosition ? `open_${openPosition}` : ""}`}
              ref={el => accordionRefs.current[index] = el}
              data-accordion={item.id}
            >
              {/* Accordion header */}
              <div 
                className="accordion_header"
                onClick={() => toggleAccordion(item.id)}
              >
                <span className="accordion_index">{item.id}</span>
                <div className="accordion_title">
                  <p className="accordion_heading">{item.title}</p>
                  <svg 
                    className="accordion_arrow"
                    width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M25.1231 37.7298V32.7447L8.91268 32.7271L37.4975 4.14226L33.9619 0.60673L5.37715 29.1915L5.37715 12.9634L0.37437 12.9811V37.7298H25.1231Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>

              {/* Accordion content */}
              {openAccordion === item.id && (
                <div className="accordion_content">
                  <div className="content_wrapper">
                    {/* Text content (40%) */}
                    <div className="text_card">
                      {item.id === "01" ? (
                        // Special content for Research & Strategy
                        <div className="research_strategy">
                          <div className="content">
                            <p className="main_content">{item.content}</p>
                            <div className="offerings_list">
                              {item.offerings.map((offering, idx) => (
                                <div key={idx} className="offering_item">
                                  <p className="offering_title">{offering.title}</p>
                                  <p className="offering_detail"><GoDotFill /><strong>Approach:</strong> {offering.approach}</p>
                                  <p className="offering_detail"><GoDotFill /><strong>Subpoints:</strong> {offering.subpoints}</p>
                                  <p className="offering_detail"><GoDotFill /><strong>Transformation Impact:</strong> {offering.impact}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="read_more_container">
                            <svg
                              className="read_more_icon" 
                              width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2.5 1.75V6.75H18.9625L14.4875 2.2625L16.25 0.5L23.75 8L16.25 15.5L14.4875 13.7375L18.9625 9.25H0V1.75H2.5Z" fill="currentColor"/>
                            </svg>
                            <button 
                              onClick={(e) => handleReadMore(item, e)}
                              className="read_more_btn"
                            >
                              Read More
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Standard content for other items
                        <div className="standard_content">
                          <div className="content">
                            <p className="headline">{item.headline}</p>
                            {/* {item.tagline && <p className="tagline">{item.tagline}</p>} */}
                            
                            <div className="offerings">
                              <p className="offerings_title">Key Offerings:</p>
                              {item.offerings.map((offering, idx) => (
                                <div key={idx} className="offering_item">
                                  <span className="offering_name"><GoDotFill />{offering.title}: </span>
                                  <span className="offering_desc">{offering.description || offering.tools}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="read_more_container">
                            <svg
                              className="read_more_icon" 
                              width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2.5 1.75V6.75H18.9625L14.4875 2.2625L16.25 0.5L23.75 8L16.25 15.5L14.4875 13.7375L18.9625 9.25H0V1.75H2.5Z" fill="currentColor"/>
                            </svg>
                            <button 
                              onClick={(e) => handleReadMore(item, e)}
                              className="read_more_btn"
                            >
                              Read More
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Image (60%) - Hidden on mobile */}
                    <div className="image_container">
                      <img 
                        src={item.image} 
                        alt={`${item.title} illustration`}
                        className="content_image"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div 
          className="modal_overlay" 
          ref={modalOverlayRef}
          onClick={handleOverlayClick}
        >
          <div 
            className="modal_container"
            ref={modalRef}
          >
            <div className="modal_content">
              <div className="modal_header">
                <p className="modal_title">{modalContent.title}</p>
                <button 
                  onClick={closeModal}
                  className="modal_close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="close_icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="modal_body">
                {modalContent.id === "01" ? (
                  // Special content for Research & Strategy in modal
                  <div className="research_strategy_modal">
                    <p className="main_content">{modalContent.content}</p>
                    <div className="offerings_list_modal">
                      {modalContent.offerings.map((offering, idx) => (
                        <div key={idx} className="offerings_item_modal">
                          <p className="offering_title_modal">{offering.title}</p>
                          <p className="offering_detail_modal"><GoDotFill /><strong>Approach:</strong> {offering.approach}</p>
                          <p className="offering_detail_modal"><GoDotFill /><strong>Subpoints:</strong> {offering.subpoints}</p>
                          <p className="offering_detail_modal"><GoDotFill /><strong>Transformation Impact:</strong> {offering.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Standard content for other items in modal
                  <div className="all_modal">
                    <p className="headline_modal">{modalContent.headline}</p>
                    {/* {modalContent.tagline && <p className="tagline_modal">{modalContent.tagline}</p>} */}
                    
                    <div className="offerings_modal">
                      <p className="offerings_title_modal">Key Offerings:</p>
                      {modalContent.offerings.map((offering, idx) => (
                        <div key={idx} className="offering_item_modal">
                          <span className="offering_name_modal"><GoDotFill />{offering.title}: </span>
                          <span className="offering_desc_modal">{offering.description || offering.tools}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OurSpecialization;