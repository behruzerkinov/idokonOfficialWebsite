import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeCustomCursor
 * 
 * High-performance WebGL cursor rendered in Three.js (r187).
 * Features:
 * - Luminous emerald core bead with zero latency
 * - Fluid lagging aura ring with squash-and-stretch velocity physics
 * - Interactive hover detection (scales up & shifts hue on buttons/links)
 * - Click shockwave ripples
 * - Trailing stardust micro-particles with alpha decay
 * - Auto-disables gracefully on mobile/touch screens
 */
export const ThreeCustomCursor = ({ theme = 'dark' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // 0. Disable custom cursor on touch/mobile screens or reduced motion
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2, width / 2,
      height / 2, -height / 2,
      -100, 100
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Cursor State
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      ringX: -9999,
      ringY: -9999,
      vx: 0,
      vy: 0,
      visible: false,
      isHovered: false,
      isMouseDown: false
    };

    // 3. Create Three.js Cursor Meshes

    // (A) Inner Sharp Luminous Dot (Core)
    const dotGeo = new THREE.CircleGeometry(3.5, 32);
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.95,
      depthTest: false
    });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    scene.add(dotMesh);

    // (B) Fluid Outer Aura Ring
    // Ring radius: inner 11, outer 13
    const ringGeo = new THREE.RingGeometry(11, 13, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
      depthTest: false,
      blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ringMesh);

    // (C) Hover Glow Disc (translucent backing when hovering links/buttons)
    const discGeo = new THREE.CircleGeometry(11, 32);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0,
      depthTest: false,
      blending: THREE.AdditiveBlending
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    scene.add(discMesh);

    // (D) Click Shockwave Rings Pool (3 concurrent ripples)
    const RIPPLE_COUNT = 3;
    const ripples = [];
    for (let r = 0; r < RIPPLE_COUNT; r++) {
      const ripGeo = new THREE.RingGeometry(8, 9.5, 48);
      const ripMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthTest: false,
        blending: THREE.AdditiveBlending
      });
      const ripMesh = new THREE.Mesh(ripGeo, ripMat);
      scene.add(ripMesh);
      ripples.push({
        mesh: ripMesh,
        active: false,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 0
      });
    }

    let rippleIdx = 0;
    const triggerRipple = (wx, wy) => {
      const rip = ripples[rippleIdx % RIPPLE_COUNT];
      rippleIdx++;
      rip.active = true;
      rip.x = wx;
      rip.y = wy;
      rip.scale = 0.5;
      rip.opacity = 0.9;
      rip.mesh.position.set(wx, wy, 1);
    };

    // (E) Trailing Stardust Micro-Particles
    const PARTICLE_COUNT = 24;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);
    const particleData = [];

    for (let p = 0; p < PARTICLE_COUNT; p++) {
      particlePositions[p * 3] = -9999;
      particlePositions[p * 3 + 1] = -9999;
      particlePositions[p * 3 + 2] = 0;

      // Brand gradient: emerald (#10b981) to cyan (#06b6d4)
      const isCyan = p % 2 === 0;
      particleColors[p * 3] = isCyan ? 0.024 : 0.063;
      particleColors[p * 3 + 1] = isCyan ? 0.714 : 0.725;
      particleColors[p * 3 + 2] = isCyan ? 0.831 : 0.505;

      particleData.push({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: 1
      });
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Create small round particle sprite canvas
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 16;
    particleCanvas.height = 16;
    const pctx = particleCanvas.getContext('2d');
    const grad = pctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(16, 185, 129, 0.8)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    pctx.fillStyle = grad;
    pctx.fillRect(0, 0, 16, 16);
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particlesMat = new THREE.PointsMaterial({
      size: 9,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthTest: false
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    let nextParticle = 0;
    const spawnParticle = (wx, wy, vx, vy) => {
      const p = particleData[nextParticle % PARTICLE_COUNT];
      nextParticle++;
      p.active = true;
      p.x = wx;
      p.y = wy;
      // Drift slightly in opposite direction of movement + small jitter
      p.vx = -vx * 0.15 + (Math.random() - 0.5) * 1.5;
      p.vy = -vy * 0.15 + (Math.random() - 0.5) * 1.5;
      p.life = 1.0;
      p.maxLife = 0.5 + Math.random() * 0.3;
    };

    // 4. Mouse Event Listeners
    let lastClientX = -9999;
    let lastClientY = -9999;

    const onPointerMove = (e) => {
      const wx = e.clientX - width / 2;
      const wy = -(e.clientY - height / 2);

      mouse.targetX = wx;
      mouse.targetY = wy;

      if (!mouse.visible) {
        mouse.visible = true;
        mouse.x = wx;
        mouse.y = wy;
        mouse.ringX = wx;
        mouse.ringY = wy;
      }

      // Calculate instant velocity
      if (lastClientX !== -9999) {
        mouse.vx = wx - mouse.x;
        mouse.vy = wy - mouse.y;
      }
      lastClientX = wx;
      lastClientY = wy;

      // Spawn stardust particle if moving fast enough
      const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      if (speed > 2.5) {
        spawnParticle(wx, wy, mouse.vx, mouse.vy);
      }
    };

    // Detect hover on interactive UI elements
    const onPointerOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], [data-cursor="pointer"], .cursor-pointer');
      mouse.isHovered = !!isInteractive;
    };

    const onPointerDown = (e) => {
      mouse.isMouseDown = true;
      const wx = e.clientX - width / 2;
      const wy = -(e.clientY - height / 2);
      triggerRipple(wx, wy);
    };

    const onPointerUp = () => {
      mouse.isMouseDown = false;
    };

    const onPointerLeave = () => {
      mouse.visible = false;
      mouse.isHovered = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseover', onPointerOver, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    // 5. Window Resize
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('resize', onResize, { passive: true });

    // 6. Animation Render Loop
    let animationFrameId;
    let targetRingScale = 1.0;
    let currentRingScale = 1.0;

    const animate = () => {
      // (A) Smooth Position Lerps
      if (mouse.visible) {
        // Dot tracks immediately
        mouse.x += (mouse.targetX - mouse.x) * 0.85;
        mouse.y += (mouse.targetY - mouse.y) * 0.85;

        // Ring follows with fluid spring delay
        mouse.ringX += (mouse.targetX - mouse.ringX) * 0.18;
        mouse.ringY += (mouse.targetY - mouse.ringY) * 0.18;

        dotMesh.visible = true;
        ringMesh.visible = true;
        discMesh.visible = true;
        particlesMesh.visible = true;

        dotMesh.position.set(mouse.x, mouse.y, 10);

        // Ring position
        ringMesh.position.set(mouse.ringX, mouse.ringY, 5);
        discMesh.position.set(mouse.ringX, mouse.ringY, 4);

        // Rotate ring slowly
        ringMesh.rotation.z += 0.02;

        // Hover scale & morphing
        if (mouse.isMouseDown) {
          targetRingScale = 0.85;
        } else if (mouse.isHovered) {
          targetRingScale = 1.95;
        } else {
          targetRingScale = 1.0;
        }

        currentRingScale += (targetRingScale - currentRingScale) * 0.2;

        // Velocity squash and stretch along movement vector
        const vx = mouse.targetX - mouse.ringX;
        const vy = mouse.targetY - mouse.ringY;
        const speed = Math.min(Math.sqrt(vx * vx + vy * vy), 40);
        const stretch = 1 + (speed / 40) * 0.35;
        const squash = 1 / stretch;

        const moveAngle = Math.atan2(vy, vx);

        ringMesh.scale.set(
          currentRingScale * stretch,
          currentRingScale * squash,
          1
        );
        discMesh.scale.set(
          currentRingScale * stretch,
          currentRingScale * squash,
          1
        );

        if (speed > 1.5) {
          ringMesh.rotation.z = moveAngle;
          discMesh.rotation.z = moveAngle;
        }

        // Hover Colors & Disc Opacity
        if (mouse.isHovered) {
          ringMat.color.setHex(0x06b6d4); // Cyan glow
          dotMat.color.setHex(0x34d399);  // Mint core
          discMat.opacity += (0.16 - discMat.opacity) * 0.2;
          ringMat.opacity += (0.95 - ringMat.opacity) * 0.2;
        } else {
          ringMat.color.setHex(0x10b981); // Emerald glow
          dotMat.color.setHex(0x10b981);
          discMat.opacity += (0 - discMat.opacity) * 0.2;
          ringMat.opacity += (0.75 - ringMat.opacity) * 0.2;
        }
      } else {
        // Fade out smoothly
        dotMesh.visible = false;
        ringMesh.visible = false;
        discMesh.visible = false;
      }

      // (B) Update Ripples
      for (let r = 0; r < RIPPLE_COUNT; r++) {
        const rip = ripples[r];
        if (rip.active) {
          rip.scale += 0.12;
          rip.opacity -= 0.035;
          rip.mesh.scale.set(rip.scale, rip.scale, 1);
          rip.mesh.material.opacity = Math.max(0, rip.opacity);
          if (rip.opacity <= 0) {
            rip.active = false;
            rip.mesh.visible = false;
          } else {
            rip.mesh.visible = true;
          }
        }
      }

      // (C) Update Trailing Stardust Particles
      let hasLiveParticles = false;
      const positionsAttr = particlesMesh.geometry.attributes.position;
      for (let p = 0; p < PARTICLE_COUNT; p++) {
        const pt = particleData[p];
        if (pt.active) {
          hasLiveParticles = true;
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.vx *= 0.94;
          pt.vy *= 0.94;
          pt.life -= 0.03;

          if (pt.life <= 0) {
            pt.active = false;
            positionsAttr.setXYZ(p, -9999, -9999, 0);
          } else {
            positionsAttr.setXYZ(p, pt.x, pt.y, 2);
          }
        }
      }
      if (hasLiveParticles) {
        positionsAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseover', onPointerOver);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('resize', onResize);

      // Dispose geometries & materials
      dotGeo.dispose();
      dotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      discGeo.dispose();
      discMat.dispose();
      ripples.forEach(rip => {
        rip.mesh.geometry.dispose();
        rip.mesh.material.dispose();
      });
      particlesGeo.dispose();
      particlesMat.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    />
  );
};
