import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Composite,
  Events,
  Runner,
  Query,
} from "matter-js";
import MobileTextAnimation from "./MobileTextAnimation";

const WhatWeDo = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const renderRef = useRef(null);
  const sectionRef = useRef(null); // Add this ref for the section
  const [isInView, setIsInView] = useState(false); // Add state to track visibility
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Services data

  const services = useMemo(() => [
    { name: "Business Strategy", size: 80 },
    { name: "People & Organizational Performance", size: 105 },
    { name: "Social Transformation", size: 95 },
    { name: "Media Engagement", size: 90 },
    { name: "Skill Development", size: 100 },
    { name: "Growth Strategy & Sustainability", size: 100 },
    { name: "Leadership Training and Grooming Workshops", size: 120 },
    { name: "Technology Strategy", size: 105 },
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Stop observing once animation starts
        }
      },
      {
        threshold: 0.3, // Start animation when 30% of section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const timeouts = [];

    // Create engine with higher gravity for faster falling
    engineRef.current = Engine.create({
      gravity: { x: 0, y: 0.8 },
    });

    // Create runner
    runnerRef.current = Runner.create();
    const remToPx =
      2.7 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const containerWidth = window.innerWidth - remToPx;
    const containerHeight = 750 - remToPx; // Reduced height as requested

    // Create renderer
    renderRef.current = Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    // Add walls
    const wallOptions = {
      isStatic: true,
      render: {
        fillStyle: "transparent",
        strokeStyle: "transparent",
      },
    };

    const walls = [
      // Bottom wall
      Bodies.rectangle(
        containerWidth / 2,
        containerHeight + 50,
        containerWidth,
        100,
        wallOptions
      ),
      // Left wall
      Bodies.rectangle(
        -50,
        containerHeight / 2,
        100,
        containerHeight,
        wallOptions
      ),
      // Right wall
      Bodies.rectangle(
        containerWidth + 50,
        containerHeight / 2,
        100,
        containerHeight,
        wallOptions
      ),
      // Top wall (we'll add this later after all circles have fallen)
    ];

    World.add(engineRef.current.world, walls);

    // Add mouse control for dragging
    const mouse = Mouse.create(renderRef.current.canvas);
    const mouseConstraint = MouseConstraint.create(engineRef.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    World.add(engineRef.current.world, mouseConstraint);
    renderRef.current.mouse = mouse;

    // Remove default Matter.js wheel event listeners
    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    // Fix for scrolling issue - prevent default only during dragging
    let isDragging = false;
    let draggedBody = null;

    mouseConstraint.mouse.element.addEventListener("mousedown", () => {
      const bodies = Composite.allBodies(engineRef.current.world);
      const mouseBodies = Query.point(bodies, mouseConstraint.mouse.position);
      if (mouseBodies.length > 0) {
        isDragging = true;
        draggedBody = mouseBodies[0];
      }
    });

    mouseConstraint.mouse.element.addEventListener("mouseup", () => {
      isDragging = false;
      draggedBody = null;
    });

    mouseConstraint.mouse.element.addEventListener("mousemove", (event) => {
      if (isDragging && draggedBody && !draggedBody.isStatic) {
        event.preventDefault();
      }
    });

    // Add custom grabbing cursor style on hover over circles
    if (renderRef.current && renderRef.current.canvas) {
      renderRef.current.canvas.style.cursor = "default";

      renderRef.current.canvas.addEventListener("mousemove", (event) => {
        const bounds = renderRef.current.canvas.getBoundingClientRect();
        const mousePosition = {
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        };

        const bodies = Composite.allBodies(engineRef.current.world);
        let hovering = false;

        bodies.forEach((body) => {
          if (!body.isStatic) {
            const dx = mousePosition.x - body.position.x;
            const dy = mousePosition.y - body.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < body.circleRadius) {
              body.render.fillStyle = "#EF5399";
              hovering = true;
            } else if (!body.highlighted) {
              body.render.fillStyle = "#444444";
            }
          }
        });

        renderRef.current.canvas.style.cursor = hovering ? "grab" : "default";
      });
    }

    // Start the runner and renderer
    Runner.run(runnerRef.current, engineRef.current);
    Render.run(renderRef.current);

    // Add circles one by one with delay
    services.forEach((service, index) => {
      const timeoutId = setTimeout(() => {
        addCircle(service, containerWidth);
      }, index * 600); // Faster spawning
      timeouts.push(timeoutId);
    });

    // Add top wall after all circles have dropped
    const finalTimeoutId = setTimeout(() => {
      const topWall = Bodies.rectangle(
        containerWidth / 2,
        -50,
        containerWidth,
        100,
        wallOptions
      );
      World.add(engineRef.current.world, topWall);
    }, services.length * 600 + 5000); // Add top wall 5 seconds after last circle
    timeouts.push(finalTimeoutId);

    // Setup custom rendering for circle labels with padding
    Events.on(renderRef.current, "afterRender", () => {
      const context = renderRef.current.context;
      const bodies = Composite.allBodies(engineRef.current.world);

      // Add labels to circles with text wrapping
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];

        // Skip walls
        if (body.isStatic) continue;

        // Draw labels with padding
        if (body.circleRadius) {
          drawWrappedText(
            context,
            body.label,
            body.position.x,
            body.position.y,
            body.circleRadius * 1.5, // Max width for text with padding
            14, // Font size
            "#fff" // Text color
          );
        }
      }
    });

    // Function to wrap text within circles
    function drawWrappedText(context, text, x, y, maxWidth, fontSize, color) {
      context.font = "20px DM Sans"; // Updated font-family
      context.fillStyle = color;
      context.textAlign = "center";
      context.textBaseline = "middle"; // Ensures vertical alignment
      context.lineHeight = 1.2; // Line height for better spacing

      const words = text.split(" ");
      let line = "";
      let lines = [];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      // Calculate total height to center vertically
      const lineHeight = fontSize * 1.2;
      const totalHeight = lines.length * lineHeight;
      let yPos = y - totalHeight / 2 + lineHeight / 2;

      for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], x, yPos);
        yPos += lineHeight;
      }
    }

    // Cleanup function
    return () => {
      timeouts.forEach(id => clearTimeout(id));
      if (renderRef.current) {
        Render.stop(renderRef.current);
        Runner.stop(runnerRef.current);
        World.clear(engineRef.current.world);
        Engine.clear(engineRef.current);
        if (renderRef.current.canvas) {
          renderRef.current.canvas.remove();
        }
        renderRef.current = null;
      }
    };
  }, [isInView, services]); // Added services to the dependency array

  const addCircle = (service, containerWidth) => {
    if (!engineRef.current) return;

    const x = Math.random() * (containerWidth - 200) + 100;
    const radius = service.size;

    const circle = Bodies.circle(x, -100, radius, {
      restitution: 0.8, // Bounciness
      friction: 0.005,
      density: 0.04,
      label: service.name,
      highlighted: service.highlighted,
      render: {
        fillStyle: service.highlighted ? "#EF5399" : "#444444",
        strokeStyle: "#333",
        lineWidth: 1,
      },
    });

    World.add(engineRef.current.world, circle);
  };

  // Add this effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section ref={sectionRef} className="whatWeDo">
      <div className="wwd_title-container">
        <p className="wwd_title">What we do</p>
        <div className="wwd_subTitle">
          <span>CONSULTING SERVICES</span>
        </div>
      </div>
      {isMobile ? (
        <MobileTextAnimation />
      ) : (
        <div className="matter-js-wrapper">
          <div ref={sceneRef} className="matter-js-container" />
          <div className="scroll-overlay" />
        </div>
      )}
    </section>
  );
};

export default WhatWeDo;
