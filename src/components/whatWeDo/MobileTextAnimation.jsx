import React,{useRef,useEffect} from 'react';
import gsap from 'gsap';

const services = [
  'Business Strategy',
  'People & Organizational Performance',
  'Social Transformation',
  'Media Engagement',
  'Skill Development',
  'Growth Strategy & Sustainability',
  'Leadership Training and Grooming Workshops',
  'Technology Strategy'
];

const MobileTextAnimation = () => {
    const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  const animateScroll = (ref, direction = 'left', duration = 30) => {
    const el = ref.current;
    const distance = el.scrollWidth / 2;

    // For right direction, start from -distance so it enters from the left
    if (direction === 'right') {
      gsap.set(el, { x: -distance });
    }

    gsap.to(el, {
      x: direction === 'left' ? `-=${distance}` : `+=${distance}`,
      duration,
      ease: 'linear',
      repeat: -1,
      onRepeat: () => {
        gsap.set(el, { x: direction === 'right' ? -distance : 0 });
      }
    });
  };

  useEffect(() => {
    animateScroll(line1Ref, 'left', 30);
    animateScroll(line2Ref, 'right', 30);
  }, []);

  const renderLine = (ref, items) => {
    const repeated = [...items, ...items]; // Duplicate for seamless loop

    return (
      <div className="marquee-container">
        <div className="marquee" ref={ref}>
          {repeated.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="scroll-wrapper">
      {renderLine(line1Ref, services.slice(0, 4))}
      {renderLine(line2Ref, services.slice(4))}
    </div>
  );
};

export default MobileTextAnimation;
