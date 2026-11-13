import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeBackgroundGrid
 * 
 * Generates an algorithmic, randomized architectural grid in Three.js (WebGL).
 * Vertices are segmented so mouse cursor gently warps, bends, and illuminates
 * nearby grid lines with spring physics and brand emerald/cyan luminescence.
 */
export const ThreeBackgroundGrid = ({ theme = 'dark' }) => {
  const containerRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check device capabilities / reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Use OrthographicCamera matching 1:1 screen pixel coordinates centered at (0, 0)
    const camera = new THREE.OrthographicCamera(
      -width / 2, width / 2,
      height / 2, -height / 2,
      -500, 500
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // transparent background
    container.appendChild(renderer.domElement);

    // 2. Mouse Tracking with Smooth Lerp
    const mouse = {
      targetX: -9999,
      targetY: -9999,
      currentX: -9999,
      currentY: -9999,
      active: false
    };

    const handlePointerMove = (e) => {
      // Convert to centered world coordinates: origin (0, 0) at center of screen
      mouse.targetX = e.clientX - width / 2;
      mouse.targetY = -(e.clientY - height / 2);
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    // 3. Generate Randomized Grid Lines
    // Instead of uniform spacing, generate non-uniform intervals
    let lineSegmentsMesh = null;
    let crosshairsMesh = null;
    let positions = null;
    let originalPositions = null;
    let colors = null;
    let originalColors = null;
    let vertexCount = 0;

    const buildGrid = () => {
      if (lineSegmentsMesh) {
        scene.remove(lineSegmentsMesh);
        lineSegmentsMesh.geometry.dispose();
        lineSegmentsMesh.material.dispose();
      }
      if (crosshairsMesh) {
        scene.remove(crosshairsMesh);
        crosshairsMesh.geometry.dispose();
        crosshairsMesh.material.dispose();
      }

      const wHalf = width / 2 + 120;
      const hHalf = height / 2 + 120;

      // Determine random line intervals across X
      const xLines = [];
      let curX = -wHalf;
      // Seed pseudo-random intervals with rhythm
      const xSteps = [42, 68, 110, 55, 90, 140, 70, 125, 48, 85, 160, 60];
      let stepIdx = 0;
      while (curX < wHalf) {
        xLines.push(curX);
        const step = xSteps[stepIdx % xSteps.length];
        curX += step;
        stepIdx++;
      }

      // Determine random line intervals across Y
      const yLines = [];
      let curY = -hHalf;
      const ySteps = [50, 85, 130, 60, 105, 45, 140, 75, 115, 55, 95];
      stepIdx = 0;
      while (curY < hHalf) {
        yLines.push(curY);
        const step = ySteps[stepIdx % ySteps.length];
        curY += step;
        stepIdx++;
      }

      // Segment resolution along lines (approx every 18px for smooth curve deformation)
      const SEG_LEN = 20;

      const posList = [];
      const colList = [];
      const crosshairPos = [];

      const isDark = themeRef.current === 'dark';
      // Base line color: very subtle architectural wireframe
      const baseR = isDark ? 0.20 : 0.78;
      const baseG = isDark ? 0.24 : 0.80;
      const baseB = isDark ? 0.28 : 0.83;

      // Vertical lines subdivided into segments
      xLines.forEach((x, lineIdx) => {
        // Vary base line alpha via vertex color
        const lineAlpha = (lineIdx % 3 === 0) ? 1.4 : ((lineIdx % 2 === 0) ? 1.0 : 0.7);
        const yStart = -hHalf;
        const yEnd = hHalf;
        const numSegments = Math.ceil((yEnd - yStart) / SEG_LEN);
        const actualSegLen = (yEnd - yStart) / numSegments;

        for (let s = 0; s < numSegments; s++) {
          const y1 = yStart + s * actualSegLen;
          const y2 = yStart + (s + 1) * actualSegLen;

          // Vertex 1
          posList.push(x, y1, 0);
          colList.push(baseR * lineAlpha, baseG * lineAlpha, baseB * lineAlpha);

          // Vertex 2
          posList.push(x, y2, 0);
          colList.push(baseR * lineAlpha, baseG * lineAlpha, baseB * lineAlpha);
        }
      });

      // Horizontal lines subdivided into segments
      yLines.forEach((y, lineIdx) => {
        const lineAlpha = (lineIdx % 3 === 0) ? 1.3 : ((lineIdx % 2 === 0) ? 0.9 : 0.65);
        const xStart = -wHalf;
        const xEnd = wHalf;
        const numSegments = Math.ceil((xEnd - xStart) / SEG_LEN);
        const actualSegLen = (xEnd - xStart) / numSegments;

        for (let s = 0; s < numSegments; s++) {
          const x1 = xStart + s * actualSegLen;
          const x2 = xStart + (s + 1) * actualSegLen;

          // Vertex 1
          posList.push(x1, y, 0);
          colList.push(baseR * lineAlpha, baseG * lineAlpha, baseB * lineAlpha);

          // Vertex 2
          posList.push(x2, y, 0);
          colList.push(baseR * lineAlpha, baseG * lineAlpha, baseB * lineAlpha);
        }
      });

      // Scatter crosshairs (+) at subset of random intersections
      const CROSS_SIZE = 4;
      for (let i = 0; i < xLines.length; i += 2) {
        for (let j = 0; j < yLines.length; j += 2) {
          if ((i * 7 + j * 13) % 5 === 0) {
            const cx = xLines[i];
            const cy = yLines[j];
            // Horizontal bar of +
            crosshairPos.push(cx - CROSS_SIZE, cy, 0);
            crosshairPos.push(cx + CROSS_SIZE, cy, 0);
            // Vertical bar of +
            crosshairPos.push(cx, cy - CROSS_SIZE, 0);
            crosshairPos.push(cx, cy + CROSS_SIZE, 0);
          }
        }
      }

      // Build BufferGeometry for line segments
      const geometry = new THREE.BufferGeometry();
      positions = new Float32Array(posList);
      originalPositions = new Float32Array(posList);
      colors = new Float32Array(colList);
      originalColors = new Float32Array(colList);

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isDark ? 0.28 : 0.20,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false
      });

      lineSegmentsMesh = new THREE.LineSegments(geometry, material);
      scene.add(lineSegmentsMesh);

      // Build Crosshairs
      if (crosshairPos.length > 0) {
        const crossGeo = new THREE.BufferGeometry();
        crossGeo.setAttribute('position', new THREE.Float32BufferAttribute(crosshairPos, 3));
        const crossMat = new THREE.LineBasicMaterial({
          color: isDark ? 0x10b981 : 0x059669,
          transparent: true,
          opacity: isDark ? 0.35 : 0.25,
          blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending
        });
        crosshairsMesh = new THREE.LineSegments(crossGeo, crossMat);
        scene.add(crosshairsMesh);
      }

      vertexCount = positions.length / 3;
    };

    buildGrid();

    // 4. Handle Window Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      buildGrid();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 5. Interactive Animation Loop
    let animationFrameId;
    let time = 0;

    const INTERACTION_RADIUS = 220; // Radius of mouse influence in pixels
    const RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
    const MAX_DISPLACEMENT = 36;   // Max curve deformation in pixels

    // Target brand colors on interaction
    // Emerald: #10B981 (16, 185, 129) -> (0.063, 0.725, 0.505)
    // Cyan:    #06B6D4 (6, 182, 212) -> (0.024, 0.714, 0.831)
    const emeraldR = 0.063, emeraldG = 0.725, emeraldB = 0.505;
    const cyanR = 0.024, cyanG = 0.714, cyanB = 0.831;

    const animate = () => {
      time += 0.015;

      // Smooth mouse coordinates with inertia
      if (mouse.active) {
        mouse.currentX += (mouse.targetX - mouse.currentX) * 0.12;
        mouse.currentY += (mouse.targetY - mouse.currentY) * 0.12;
      } else {
        // Slowly glide away if inactive
        mouse.currentX += (-9999 - mouse.currentX) * 0.05;
        mouse.currentY += (-9999 - mouse.currentY) * 0.05;
      }

      if (positions && originalPositions && !prefersReducedMotion) {
        const mx = mouse.currentX;
        const my = mouse.currentY;

        for (let i = 0; i < vertexCount; i++) {
          const idx = i * 3;
          const origX = originalPositions[idx];
          const origY = originalPositions[idx + 1];
          const origZ = originalPositions[idx + 2];

          const dx = origX - mx;
          const dy = origY - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < RADIUS_SQ && mouse.active) {
            const dist = Math.sqrt(distSq);
            // Smooth bell curve falloff (1 at center, 0 at boundary)
            const influence = (1 - dist / INTERACTION_RADIUS);
            const factor = influence * influence;

            // Gentle radial magnetic repulsion with subtle tangential wave
            const nx = dist > 0.001 ? dx / dist : 0;
            const ny = dist > 0.001 ? dy / dist : 0;

            const targetX = origX + nx * factor * MAX_DISPLACEMENT;
            const targetY = origY + ny * factor * MAX_DISPLACEMENT;
            // 3D depth lift towards camera
            const targetZ = factor * 28;

            // Smooth spring lerp towards perturbed position
            positions[idx] += (targetX - positions[idx]) * 0.2;
            positions[idx + 1] += (targetY - positions[idx + 1]) * 0.2;
            positions[idx + 2] += (targetZ - positions[idx + 2]) * 0.2;

            // Illuminate line color towards luminous brand emerald / cyan
            const blend = factor * 1.5;
            colors[idx] += (Math.min(1.0, originalColors[idx] + (emeraldR * 2.2) * blend) - colors[idx]) * 0.25;
            colors[idx + 1] += (Math.min(1.0, originalColors[idx + 1] + (emeraldG * 2.2) * blend) - colors[idx + 1]) * 0.25;
            colors[idx + 2] += (Math.min(1.0, originalColors[idx + 2] + (cyanB * 2.2) * blend) - colors[idx + 2]) * 0.25;
          } else {
            // Smoothly relax back to original positions with micro breathing pulse
            const subtleBreathing = Math.sin(time + origX * 0.005 + origY * 0.005) * 0.6;
            positions[idx] += (origX - positions[idx]) * 0.08;
            positions[idx + 1] += ((origY + subtleBreathing) - positions[idx + 1]) * 0.08;
            positions[idx + 2] += (origZ - positions[idx + 2]) * 0.08;

            // Relax color back to original wireframe
            colors[idx] += (originalColors[idx] - colors[idx]) * 0.08;
            colors[idx + 1] += (originalColors[idx + 1] - colors[idx + 1]) * 0.08;
            colors[idx + 2] += (originalColors[idx + 2] - colors[idx + 2]) * 0.08;
          }
        }

        lineSegmentsMesh.geometry.attributes.position.needsUpdate = true;
        lineSegmentsMesh.geometry.attributes.color.needsUpdate = true;
      }

      // Subtle rotation or breathing for crosshairs
      if (crosshairsMesh) {
        crosshairsMesh.material.opacity = (themeRef.current === 'dark' ? 0.35 : 0.22) + Math.sin(time * 2) * 0.08;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);

      if (lineSegmentsMesh) {
        scene.remove(lineSegmentsMesh);
        lineSegmentsMesh.geometry.dispose();
        lineSegmentsMesh.material.dispose();
      }
      if (crosshairsMesh) {
        scene.remove(crosshairsMesh);
        crosshairsMesh.geometry.dispose();
        crosshairsMesh.material.dispose();
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update line colors whenever theme switches (Dark vs Light)
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    />
  );
};
