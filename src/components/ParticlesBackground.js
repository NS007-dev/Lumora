import React, { useEffect } from "react";
import "../styles/ParticleBackground.css"; // Ensure this file exists for styling

const ParticlesBackground = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    // Function to set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize(); // Ensure full coverage on load

    let particles = [];
    const numParticles = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Keep particles within bounds
        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = "rgba(173, 216, 230, 0.7)"; // Light blue color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    function initParticles() {
      particles = []; // Reset particles when resizing
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Handle screen resizing
    const handleResize = () => {
      setCanvasSize();
      initParticles(); // Reinitialize particles on resize
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the canvas when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null; // This component only renders the canvas in the background
};

export default ParticlesBackground;
