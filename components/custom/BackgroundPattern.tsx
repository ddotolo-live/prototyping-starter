'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

import { useWebGLSupport } from '@/lib/hooks/useWebGLSupport';

type HomeHeroBackgroundProps = {
  width: number;
  height: number;
  animationDelay?: number;
  colors?: {
    off?: number;
    light?: number;
    accent?: number;
  };
  triggerRipple?: boolean;
};

const defaultOffColor = new THREE.Color(0x070707);
const defaultLightColor = new THREE.Color(0x666666);
const defaultAccentColor = new THREE.Color(0xffffff);

const lerpThreshold = 0.01; // Threshold to avoid tiny lerp calculations
const lerpSpeed = 0.025;
const accentLerpSpeed = 0.045;
const intervalDuration = 500;
const minBrightLights = 0.85;
const maxYAffected = 3;
const particleSize = 2.8;
const separation = 12;

export const BackgroundPattern = ({
  width,
  height,
  animationDelay = 0,
  colors,
  triggerRipple = false,
}: HomeHeroBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const particleColumns = Math.floor(width / separation);
  const particleRows = Math.floor(height / separation);
  const canUseWebGL = useWebGLSupport();
  const tempColor = new THREE.Color();
  const rippleTriggeredRef = useRef(false);

  // Use provided colors or defaults
  const offColor = new THREE.Color(colors?.off ?? defaultOffColor);
  const lightColor = new THREE.Color(colors?.light ?? defaultLightColor);
  const accentColor = new THREE.Color(colors?.accent ?? defaultAccentColor);

  const randomColor = (offPercentage: number, onPercentage: number) => {
    const random = Math.random();
    if (random < offPercentage) return offColor;
    if (random < onPercentage) return lightColor;
    return accentColor;
  };

  useEffect(() => {
    if (!canUseWebGL || !mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000,
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(offColor, 1);
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(particleSize, particleSize);
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });
    const particles = new THREE.InstancedMesh(geometry, material, particleColumns * particleRows);

    const colors = new Float32Array(particleColumns * particleRows * 3);
    const targetColors = new Float32Array(particleColumns * particleRows * 3);

    for (let i = 0; i < particleColumns * particleRows; i++) {
      const initialColor = lightColor;
      colors[i * 3] = initialColor.r;
      colors[i * 3 + 1] = initialColor.g;
      colors[i * 3 + 2] = initialColor.b;

      const randomTargetColor = randomColor(0.6, 0.3);
      targetColors[i * 3] = randomTargetColor.r;
      targetColors[i * 3 + 1] = randomTargetColor.g;
      targetColors[i * 3 + 2] = randomTargetColor.b;
    }

    const colorAttribute = new THREE.InstancedBufferAttribute(colors, 3);
    particles.geometry.setAttribute('color', colorAttribute);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < particleColumns; i++) {
      for (let j = 0; j < particleRows; j++) {
        dummy.position.set(
          i * separation - width / 2 + separation / 2,
          j * separation - height / 2 + separation / 2,
          0,
        );
        dummy.updateMatrix();
        particles.setMatrixAt(i * particleRows + j, dummy.matrix);
      }
    }

    scene.add(particles);

    const updateTargetColors = () => {
      for (let i = 0; i < particleColumns; i++) {
        for (let j = 0; j < particleRows; j++) {
          const index = i * particleRows + j;
          const yDistance = maxYAffected;
          let randomTargetColor;
          if (Math.abs(j - particleRows / 2) < yDistance) {
            randomTargetColor = randomColor(minBrightLights, minBrightLights);
          } else {
            randomTargetColor = randomColor(0.88, 1);
          }
          targetColors[index * 3] = randomTargetColor.r;
          targetColors[index * 3 + 1] = randomTargetColor.g;
          targetColors[index * 3 + 2] = randomTargetColor.b;
        }
      }
    };

    const interval = setInterval(updateTargetColors, intervalDuration);

    // Ripple effect function
    const triggerRippleEffect = () => {
      const centerX = particleColumns / 2;
      const centerY = particleRows / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      let currentRadius = 0;
      const radiusStep = 0.8; // How much the radius expands per step
      const stepInterval = 40; // Milliseconds between expansion steps
      
      const rippleInterval = setInterval(() => {
        for (let i = 0; i < particleColumns; i++) {
          for (let j = 0; j < particleRows; j++) {
            const index = i * particleRows + j;
            const distance = Math.sqrt(
              Math.pow(i - centerX, 2) + Math.pow(j - centerY, 2)
            );
            
            // If particle is within the current ripple ring (with some thickness)
            if (distance <= currentRadius && distance >= currentRadius - 2) {
              targetColors[index * 3] = accentColor.r;
              targetColors[index * 3 + 1] = accentColor.g;
              targetColors[index * 3 + 2] = accentColor.b;
            }
          }
        }
        
        currentRadius += radiusStep;
        
        // Stop when ripple has expanded beyond the grid
        if (currentRadius > maxDistance + 2) {
          clearInterval(rippleInterval);
        }
      }, stepInterval);
      
      return rippleInterval;
    };

    function animate() {
      requestAnimationFrame(animate);

      for (let i = 0; i < particleColumns * particleRows; i++) {
        tempColor.fromArray(colors, i * 3);
        const targetColor = new THREE.Color(
          targetColors[i * 3],
          targetColors[i * 3 + 1],
          targetColors[i * 3 + 2],
        );

        if (
          Math.abs(tempColor.r - targetColor.r) > lerpThreshold ||
          Math.abs(tempColor.g - targetColor.g) > lerpThreshold ||
          Math.abs(tempColor.b - targetColor.b) > lerpThreshold
        ) {
          tempColor.lerp(
            targetColor,
            targetColor.equals(accentColor) ? accentLerpSpeed : lerpSpeed,
          );
          colors[i * 3] = tempColor.r;
          colors[i * 3 + 1] = tempColor.g;
          colors[i * 3 + 2] = tempColor.b;
        }
      }

      colorAttribute.needsUpdate = true;
      renderer.render(scene, camera);
    }

    animate();
    
    // Trigger ripple if requested
    let rippleInterval: NodeJS.Timeout | null = null;
    if (triggerRipple && !rippleTriggeredRef.current) {
      rippleTriggeredRef.current = true;
      rippleInterval = triggerRippleEffect();
    }

    return () => {
      clearInterval(interval);
      if (rippleInterval) clearInterval(rippleInterval);
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [width, height, particleRows, particleColumns, canUseWebGL, offColor, lightColor, accentColor, tempColor, triggerRipple]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 3,
        delay: animationDelay,
      }}
      ref={mountRef}
      className="absolute left-0 top-0 z-0 bg-bg1"
      style={{ width: width + 'px', height: height + 'px' }}
    ></motion.div>
  );
};
