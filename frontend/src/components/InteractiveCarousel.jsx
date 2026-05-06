import React, { useEffect, useRef, useState } from 'react';

const CONFIG = {
  totalCards: 12,
  wheelRadius: 35, // 35% of viewport
  images: [
    "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80",
    "https://images.unsplash.com/photo-1490750967868-88df5691cc21?w=800&q=80",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    "https://images.unsplash.com/photo-1536240478700-b869ad10f039?w=800&q=80",
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80",
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"
  ],
  animations: {
    initialDuration: 1,
    rotationDuration: 0.64,
    flipDuration: 0.64,
    transitionDuration: 1.2,
    circleTransitionDuration: 0.8
  }
};

export default function InteractiveCarousel() {
  const containerRef = useRef(null);
  const itemsRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadScripts = async () => {
      const loadScript = (src) => new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Draggable.min.js");
        // Using the CodePen trial InertiaPlugin just for this demo effect
        await loadScript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/InertiaPlugin.min.js");
        setLoaded(true);
      } catch (err) {
        console.error("Failed to load GSAP scripts", err);
      }
    };

    loadScripts();
  }, []);

  useEffect(() => {
    if (!loaded || !containerRef.current || !itemsRef.current) return;

    const gsap = window.gsap;
    const Draggable = window.Draggable;
    const InertiaPlugin = window.InertiaPlugin;

    gsap.registerPlugin(Draggable, InertiaPlugin);

    const carouselContainerEl = containerRef.current;
    const carouselItemsEl = itemsRef.current;
    
    gsap.set(carouselContainerEl.querySelector(".switch"), { opacity: 0, visibility: "hidden" });

    const resetBtn = carouselContainerEl.querySelector("#resetBtn");
    const circleBtn = carouselContainerEl.querySelector("#circleBtn");
    const waveBtn = carouselContainerEl.querySelector("#waveBtn");
    const staggerBtn = carouselContainerEl.querySelector("#staggerBtn");
    const gridBtn = carouselContainerEl.querySelector("#gridBtn");
    const fanBtn = carouselContainerEl.querySelector("#fanBtn");
    const depthBtn = carouselContainerEl.querySelector("#depthBtn");
    const allButtons = carouselContainerEl.querySelectorAll(".switch-button");

    let currentAnimation = "circle";
    let isTransitioning = false;
    let activeAnimations = [];
    let draggableInstance = null;
    let originalZIndices = [];

    const getViewportSize = () => {
      return {
        width: carouselContainerEl.clientWidth,
        height: carouselContainerEl.clientHeight
      };
    };

    function updateMenuState(newAnimation) {
      allButtons.forEach((button) => {
        button.classList.remove("switch-button-current");
      });
      let activeButton;
      switch (newAnimation) {
        case "circle": activeButton = circleBtn; break;
        case "wave": activeButton = waveBtn; break;
        case "stagger": activeButton = staggerBtn; break;
        case "grid": activeButton = gridBtn; break;
        case "fan": activeButton = fanBtn; break;
        case "depth": activeButton = depthBtn; break;
        default: activeButton = circleBtn;
      }
      if (activeButton) {
        activeButton.classList.add("switch-button-current");
      }
    }

    function generateCards() {
      carouselItemsEl.innerHTML = "";
      for (let i = 1; i <= CONFIG.totalCards; i++) {
        const cardEl = document.createElement("div");
        cardEl.className = "carousel-item";
        const formattedNumber = String(i).padStart(3, "0");
        const imageIndex = i - 1;
        if (imageIndex < CONFIG.images.length) {
          cardEl.style.backgroundImage = `url(${CONFIG.images[imageIndex]})`;
        } else {
          cardEl.style.backgroundImage = `url(${CONFIG.images[0]})`;
        }
        cardEl.innerHTML = `<div class="card__number">${formattedNumber}</div>`;
        carouselItemsEl.appendChild(cardEl);
        cardEl.style.zIndex = i;
      }
      initializeZIndices();
    }

    function initializeZIndices() {
      const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
      originalZIndices = cards.map((card, index) => {
        const zIndex = 100 + (CONFIG.totalCards - index);
        gsap.set(card, { zIndex: zIndex });
        return zIndex;
      });
    }

    function killActiveAnimations() {
      gsap.killTweensOf(carouselItemsEl);
      gsap.killTweensOf(carouselContainerEl.querySelectorAll(".carousel-item"));
      activeAnimations.forEach((animation) => {
        if (animation && animation.kill) {
          animation.kill();
        }
      });
      activeAnimations = [];
    }

    function setupCirclePositions(animated = true) {
      const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
      const viewportSize = Math.min(carouselContainerEl.clientWidth, carouselContainerEl.clientHeight);
      const radius = viewportSize * (CONFIG.wheelRadius / 100);
      const totalAngle = 2 * Math.PI;
      const angleStep = totalAngle / CONFIG.totalCards;
      
      const currentWheelRotation = gsap.getProperty(carouselItemsEl, "rotation") || 0;
      const currentWheelRotationRad = currentWheelRotation * (Math.PI / 180);
      
      const timeline = gsap.timeline();
      cards.forEach((card, i) => {
        const angle = i * angleStep + currentWheelRotationRad;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        if (animated) {
          timeline.to(card, {
            x: x, y: y,
            rotation: -currentWheelRotation,
            scale: 0.8,
            duration: CONFIG.animations.transitionDuration,
            ease: "power2.inOut"
          }, 0);
        } else {
          gsap.set(card, { x: x, y: y, rotation: -currentWheelRotation, scale: 0.8 });
        }
      });
      return timeline;
    }

    function setupDraggable() {
      if (draggableInstance) {
        draggableInstance.kill();
        draggableInstance = null;
      }
      carouselItemsEl.classList.add("draggable");
      draggableInstance = Draggable.create(carouselItemsEl, {
        type: "rotation",
        inertia: true,
        throwResistance: 0.3,
        onDrag: updateCardRotations,
        onThrowUpdate: updateCardRotations,
      })[0];
      gsap.set(carouselItemsEl, { overwrite: "auto" });
    }

    function updateCardRotations() {
      if (isTransitioning) return;
      const wheelRotation = this.rotation || 0;
      const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
      if (currentAnimation === "circle") {
        cards.forEach((card) => {
          gsap.set(card, { rotation: -wheelRotation });
        });
      } else if (currentAnimation === "fan") {
        const viewport = getViewportSize();
        const maxFanAngle = Math.min(180, viewport.width / 5);
        const fanStartAngle = -maxFanAngle / 2;
        const fanEndAngle = maxFanAngle / 2;
        cards.forEach((card, index) => {
          const progress = index / (CONFIG.totalCards - 1);
          const fanAngle = fanStartAngle + progress * (fanEndAngle - fanStartAngle);
          gsap.set(card, { rotation: fanAngle - wheelRotation });
        });
      }
    }

    function setupWavePositions() {
      const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
      const viewport = getViewportSize();
      const cardWidth = 350;
      const lineWidth = Math.min(viewport.width * 0.8, CONFIG.totalCards * cardWidth * 0.4);
      const cardSpacing = lineWidth / (CONFIG.totalCards - 1);
      const waveHeight = Math.min(viewport.height * 0.1, 80);
      const timeline = gsap.timeline();
      cards.forEach((card, index) => {
        const xPos = (index - (CONFIG.totalCards - 1) / 2) * cardSpacing;
        const yPos = Math.sin((index / (CONFIG.totalCards - 1)) * Math.PI * 2) * waveHeight;
        timeline.to(card, {
          x: xPos, y: yPos, rotation: 0, scale: 0.7,
          duration: CONFIG.animations.transitionDuration,
          ease: "power2.inOut"
        }, 0);
      });
      return timeline;
    }

    function startWaveAnimation() {
      const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
      const viewport = getViewportSize();
      const waveHeight = Math.min(viewport.height * 0.1, 80);
      return gsap.to(cards, {
        y: (i) => {
          const normalizedIndex = i / (CONFIG.totalCards - 1);
          return Math.sin(normalizedIndex * Math.PI * 2 + Math.PI) * waveHeight;
        },
        duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    }

    function setupStaggerPositions() {
      const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
      const cardWidth = 350;
      const cardHeight = 497;
      const rows = 3;
      const cols = 4;
      const xSpacing = cardWidth * 0.7;
      const ySpacing = cardHeight * 0.7;
      const timeline = gsap.timeline();
      cards.forEach((card, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const xOffset = row % 2 === 1 ? xSpacing / 2 : 0;
        const xPos = (col - (cols - 1) / 2) * xSpacing + xOffset;
        const yPos = (row - (rows - 1) / 2) * ySpacing;
        timeline.to(card, {
          x: xPos, y: yPos, rotation: 0, scale: 0.7,
          duration: CONFIG.animations.transitionDuration, ease: "power2.inOut"
        }, 0);
      });
      return timeline;
    }

    function setupStaggerMouseTracking() {
      const viewport = getViewportSize();
      const cardWidth = 350;
      const cardHeight = 497;
      const rows = 3;
      const cols = 4;
      const xSpacing = cardWidth * 0.7;
      const ySpacing = cardHeight * 0.7;
      const maxOffset = 40;
      carouselContainerEl.onmousemove = (e) => {
        if (currentAnimation !== "stagger" || isTransitioning) return;
        const rect = carouselContainerEl.getBoundingClientRect();
        const clientY = e.clientY - rect.top;
        const mouseY = clientY / viewport.height;
        const offset = (mouseY - 0.5) * -maxOffset;
        const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
        cards.forEach((card, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const xOffset = row % 2 === 1 ? xSpacing / 2 : 0;
          const yPos = (row - (rows - 1) / 2) * ySpacing + offset;
          gsap.to(card, { y: yPos, duration: 0.8, ease: "power2.out" });
        });
      };
    }

    function setupGridPositions() {
      const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
      const viewport = getViewportSize();
      const cardWidth = 350;
      const cardHeight = 497;
      const viewport_ratio = viewport.width / viewport.height;
      let rows, cols;
      if (viewport_ratio > 1) { rows = 3; cols = 4; }
      else { rows = 4; cols = 3; }
      const scale = Math.min(0.8, viewport.width / (cols * cardWidth * 1.2), viewport.height / (rows * cardHeight * 1.2));
      const xSpacing = cardWidth * scale * 1.2;
      const ySpacing = cardHeight * scale * 1.2;
      const timeline = gsap.timeline();
      cards.forEach((card, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const xPos = (col - (cols - 1) / 2) * xSpacing;
        const yPos = (row - (rows - 1) / 2) * ySpacing;
        timeline.to(card, {
          x: xPos, y: yPos, rotation: 0, scale: scale,
          duration: CONFIG.animations.transitionDuration, ease: "power2.inOut"
        }, 0);
      });
      return timeline;
    }

    function setupFanPositions() {
      const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
      const viewport = getViewportSize();
      const maxFanAngle = Math.min(180, viewport.width / 5);
      const fanStartAngle = -maxFanAngle / 2;
      const fanEndAngle = maxFanAngle / 2;
      const timeline = gsap.timeline();
      cards.forEach((card, index) => {
        const progress = index / (CONFIG.totalCards - 1);
        const angle = fanStartAngle + progress * (fanEndAngle - fanStartAngle);
        const yOffset = Math.sin((progress - 0.5) * Math.PI) * 50;
        timeline.to(card, {
          x: 0, y: yOffset, rotation: angle, scale: 0.8,
          duration: CONFIG.animations.transitionDuration, ease: "power2.inOut"
        }, 0);
      });
      return timeline;
    }

    function setup3DDepthPositions() {
      const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
      const viewport = getViewportSize();
      const positions = [
        { x: -viewport.width * 0.25, y: -viewport.height * 0.2, z: -200, scale: 0.9, rotX: -5, rotY: 5 },
        { x: viewport.width * 0.25, y: -viewport.height * 0.25, z: -300, scale: 0.85, rotX: -3, rotY: -4 },
        { x: -viewport.width * 0.3, y: viewport.height * 0.2, z: -400, scale: 0.8, rotX: 4, rotY: 6 },
        { x: viewport.width * 0.3, y: viewport.height * 0.25, z: -500, scale: 0.75, rotX: 5, rotY: -5 },
        { x: 0, y: -viewport.height * 0.3, z: -700, scale: 0.7, rotX: -6, rotY: 0 },
        { x: -viewport.width * 0.35, y: 0, z: -800, scale: 0.65, rotX: 0, rotY: 7 },
        { x: viewport.width * 0.35, y: 0, z: -900, scale: 0.6, rotX: 0, rotY: -7 },
        { x: 0, y: viewport.height * 0.3, z: -1000, scale: 0.55, rotX: 6, rotY: 0 },
        { x: -viewport.width * 0.2, y: -viewport.height * 0.15, z: -1200, scale: 0.5, rotX: -3, rotY: 3 },
        { x: viewport.width * 0.2, y: -viewport.height * 0.15, z: -1300, scale: 0.45, rotX: -3, rotY: -3 },
        { x: -viewport.width * 0.2, y: viewport.height * 0.15, z: -1400, scale: 0.4, rotX: 3, rotY: 3 },
        { x: viewport.width * 0.2, y: viewport.height * 0.15, z: -1500, scale: 0.35, rotX: 3, rotY: -3 }
      ];
      const timeline = gsap.timeline();
      cards.forEach((card, index) => {
        if (index >= positions.length) return;
        const pos = positions[index];
        const zIndex = 1000 - Math.round(Math.abs(pos.z));
        gsap.set(card, { zIndex: zIndex });
        timeline.to(card, {
          x: pos.x, y: pos.y, z: pos.z, rotationX: pos.rotX, rotationY: pos.rotY, scale: pos.scale,
          duration: CONFIG.animations.transitionDuration, ease: "power2.inOut"
        }, 0);
      });
      return timeline;
    }

    function setup3DDepthMouseTracking() {
      const viewport = getViewportSize();
      carouselContainerEl.onmousemove = (e) => {
        if (currentAnimation !== "depth" || isTransitioning) return;
        const rect = carouselContainerEl.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        const mouseX = clientX / viewport.width - 0.5;
        const mouseY = clientY / viewport.height - 0.5;
        gsap.to(carouselItemsEl, {
          rotationY: mouseX * 3,
          rotationX: -mouseY * 3,
          duration: 1.2,
          ease: "power1.out"
        });
      };
    }

    function transitionToPattern(newPattern) {
      if (isTransitioning) return;
      isTransitioning = true;
      updateMenuState(newPattern);
      killActiveAnimations();
      
      if (draggableInstance) {
        draggableInstance.kill();
        draggableInstance = null;
      }
      carouselItemsEl.classList.remove("draggable");
      carouselContainerEl.onmousemove = null;
      
      const prevAnimation = currentAnimation;
      currentAnimation = newPattern;
      
      const timeline = gsap.timeline({
        onComplete: () => {
          isTransitioning = false;
          if (newPattern === "circle") {
            setupDraggable();
          } else if (newPattern === "wave") {
            const waveAnim = startWaveAnimation();
            if (waveAnim) activeAnimations.push(waveAnim);
          } else if (newPattern === "stagger") {
            setupStaggerMouseTracking();
          } else if (newPattern === "fan") {
            setupDraggable();
          } else if (newPattern === "depth") {
            setup3DDepthMouseTracking();
          }
        }
      });
      activeAnimations.push(timeline);
      
      if (prevAnimation === "fan") {
        const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
        const normalizeTimeline = gsap.timeline();
        cards.forEach((card) => {
          normalizeTimeline.to(card, {
            rotation: 0, rotationX: 0, rotationY: 0,
            duration: CONFIG.animations.transitionDuration / 2, ease: "power2.inOut"
          }, 0);
        });
        timeline.add(normalizeTimeline);
        timeline.to({}, { duration: 0.1 });
      }
      
      let patternTimeline;
      if (newPattern !== "circle" && newPattern !== "fan") {
        if (prevAnimation === "circle" || prevAnimation === "fan") {
          timeline.set(carouselItemsEl, { rotationX: 0, rotationY: 0 });
        } else {
          timeline.set(carouselItemsEl, { rotation: 0, rotationX: 0, rotationY: 0 });
        }
      }
      
      switch (newPattern) {
        case "circle":
          patternTimeline = setupCirclePositions(true);
          if (patternTimeline) timeline.add(patternTimeline, 0);
          break;
        case "wave":
          patternTimeline = setupWavePositions();
          if (patternTimeline) timeline.add(patternTimeline, 0);
          if (prevAnimation === "circle" || prevAnimation === "fan") {
            timeline.to(carouselItemsEl, { rotation: 0, duration: CONFIG.animations.transitionDuration, ease: "power2.inOut" }, 0);
          }
          break;
        case "stagger":
          patternTimeline = setupStaggerPositions();
          if (patternTimeline) timeline.add(patternTimeline, 0);
          if (prevAnimation === "circle" || prevAnimation === "fan") {
            timeline.to(carouselItemsEl, { rotation: 0, duration: CONFIG.animations.transitionDuration, ease: "power2.inOut" }, 0);
          }
          break;
        case "grid":
          patternTimeline = setupGridPositions();
          if (patternTimeline) timeline.add(patternTimeline, 0);
          if (prevAnimation === "circle" || prevAnimation === "fan") {
            timeline.to(carouselItemsEl, { rotation: 0, duration: CONFIG.animations.transitionDuration, ease: "power2.inOut" }, 0);
          }
          break;
        case "fan":
          patternTimeline = setupFanPositions();
          if (patternTimeline) timeline.add(patternTimeline, 0);
          if (prevAnimation === "circle") {
            timeline.to(carouselItemsEl, { rotation: 0, duration: CONFIG.animations.transitionDuration, ease: "power2.inOut" }, 0);
          }
          break;
        case "depth":
          patternTimeline = setup3DDepthPositions();
          if (patternTimeline) timeline.add(patternTimeline, 0);
          if (prevAnimation === "circle" || prevAnimation === "fan") {
            timeline.to(carouselItemsEl, { rotation: 0, duration: CONFIG.animations.transitionDuration, ease: "power2.inOut" }, 0);
          }
          break;
      }
    }

    function initializeCarousel() {
      const cards = gsap.utils.toArray(carouselContainerEl.querySelectorAll(".carousel-item"));
      const totalCards = cards.length;
      gsap.set(cards, { x: 0, y: 0, rotation: 0, scale: 0, opacity: 0 });
      gsap.set(carouselContainerEl.querySelector(".switch"), { opacity: 0, visibility: "hidden" });
      
      const timeline = gsap.timeline({
        onComplete: () => {
          isTransitioning = false;
          setupDraggable();
          gsap.to(carouselContainerEl.querySelector(".switch"), {
            opacity: 1, visibility: "visible", duration: 0.8, ease: "power2.inOut"
          });
        }
      });

      for (let i = 0; i < totalCards; i++) {
        const card = cards[i];
        const delay = (totalCards - 1 - i) * 0.1;
        gsap.set(card, { zIndex: 100 + (totalCards - 1 - i) });
        timeline.to(card, { opacity: 1, scale: 0.8, duration: 0.5, ease: "power2.out" }, delay);
      }
      timeline.to({}, { duration: 0.3 });
      const circleTimeline = setupCirclePositions(true);
      timeline.add(circleTimeline);
      currentAnimation = "circle";
      activeAnimations.push(timeline);
      updateMenuState("circle");
      return timeline;
    }

    function resetCarousel() {
      killActiveAnimations();
      if (draggableInstance) {
        draggableInstance.kill();
        draggableInstance = null;
      }
      carouselContainerEl.onmousemove = null;
      gsap.set(carouselItemsEl, { rotation: 0, rotationX: 0, rotationY: 0 });
      gsap.to(carouselContainerEl.querySelector(".switch"), {
        opacity: 0, visibility: "hidden", duration: 0.3, ease: "power2.inOut",
        onComplete: () => {
          generateCards();
          initializeCarousel();
        }
      });
      currentAnimation = "circle";
      isTransitioning = false;
      updateMenuState("circle");
    }

    function handleResize() {
      if (!isTransitioning) {
        transitionToPattern(currentAnimation);
      }
    }

    const unbindEvents = () => {
      resetBtn.removeEventListener("click", resetCarousel);
      circleBtn.removeEventListener("click", () => transitionToPattern("circle"));
      waveBtn.removeEventListener("click", () => transitionToPattern("wave"));
      staggerBtn.removeEventListener("click", () => transitionToPattern("stagger"));
      gridBtn.removeEventListener("click", () => transitionToPattern("grid"));
      fanBtn.removeEventListener("click", () => transitionToPattern("fan"));
      depthBtn.removeEventListener("click", () => transitionToPattern("depth"));
      window.removeEventListener("resize", handleResize);
      killActiveAnimations();
      if (draggableInstance) draggableInstance.kill();
    };

    resetBtn.addEventListener("click", resetCarousel);
    circleBtn.addEventListener("click", () => transitionToPattern("circle"));
    waveBtn.addEventListener("click", () => transitionToPattern("wave"));
    staggerBtn.addEventListener("click", () => transitionToPattern("stagger"));
    gridBtn.addEventListener("click", () => transitionToPattern("grid"));
    fanBtn.addEventListener("click", () => transitionToPattern("fan"));
    depthBtn.addEventListener("click", () => transitionToPattern("depth"));
    window.addEventListener("resize", handleResize);

    generateCards();
    initializeCarousel();

    return unbindEvents;
  }, [loaded]);

  return (
    <div className="interactive-carousel-wrapper" ref={containerRef}>
      <style>{`
        @import url("https://fonts.cdnfonts.com/css/thegoodmonolith");

        .interactive-carousel-wrapper {
          --color-primary: #ffffff;
          --card-width: 350px;
          --card-height: 497px;
          --card-border-radius: 6px;
          
          font-family: "TheGoodMonolith", monospace;
          color: var(--color-primary);
          background-color: transparent;
          font-weight: 600;
          width: 100%;
          height: 800px;
          overflow: hidden;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 2500px;
        }

        @media screen and (max-width: 768px) {
          .interactive-carousel-wrapper {
            --card-width: 250px;
            --card-height: 350px;
            height: 600px;
          }
        }

        .interactive-carousel-wrapper .carousel-items {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform-origin: center center;
          user-select: none;
        }

        .interactive-carousel-wrapper .carousel-items.draggable {
          cursor: grab;
        }

        .interactive-carousel-wrapper .carousel-items.draggable:active {
          cursor: grabbing;
        }

        .interactive-carousel-wrapper .carousel-item {
          position: absolute;
          width: var(--card-width);
          height: var(--card-height);
          border-radius: var(--card-border-radius);
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transform: translate(-50%, -50%);
          transform-origin: center center;
          user-select: none;
          cursor: pointer;
          background-size: cover;
          background-position: center;
        }

        .interactive-carousel-wrapper .card__number {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          z-index: 10;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .interactive-carousel-wrapper .switch {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
          background-color: #222;
          background-image: radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 0);
          background-size: 7px 7px;
          background-position: -1px -1px;
          padding: 10px 20px;
          border-radius: 4px;
          z-index: 1000;
          transition: padding 0.3s ease-in-out;
          flex-wrap: wrap;
          justify-content: center;
        }

        .interactive-carousel-wrapper .switch-button {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-family: "TheGoodMonolith", monospace;
          font-size: 14px;
          padding: 5px 10px;
          position: relative;
          transition: all 0.3s ease-in-out;
        }

        .interactive-carousel-wrapper .switch-button-current {
          color: #f0f0f0;
        }

        .interactive-carousel-wrapper .indicator-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: #f0f0f0;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          top: 50%;
          transform: translateY(-50%);
        }

        .interactive-carousel-wrapper .switch-button .indicator-dot {
          left: -8px;
        }

        .interactive-carousel-wrapper .switch-button:hover .indicator-dot {
          opacity: 1;
        }
      `}</style>
      
      <div className="carousel-items" ref={itemsRef}>
        {/* Cards will be generated here by JS */}
      </div>

      <div className="switch" id="controls">
        <button className="switch-button" id="resetBtn">
          <span className="indicator-dot"></span>
          RESET
        </button>
        <button className="switch-button switch-button-current" id="circleBtn">
          <span className="indicator-dot"></span>
          CIRCLE
        </button>
        <button className="switch-button" id="waveBtn">
          <span className="indicator-dot"></span>
          WAVE
        </button>
        <button className="switch-button" id="staggerBtn">
          <span className="indicator-dot"></span>
          STAGGER
        </button>
        <button className="switch-button" id="gridBtn">
          <span className="indicator-dot"></span>
          GRID
        </button>
        <button className="switch-button" id="fanBtn">
          <span className="indicator-dot"></span>
          FAN
        </button>
        <button className="switch-button" id="depthBtn">
          <span className="indicator-dot"></span>
          3D DEPTH
        </button>
      </div>
    </div>
  );
}
