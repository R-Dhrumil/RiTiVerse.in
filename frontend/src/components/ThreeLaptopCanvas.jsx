import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeLaptopCanvas({ className = "w-full h-full" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();

    // Material matching Stitch design (Navy #0F172A & Amber Glow #F59E0B)
    const laptopMaterial = new THREE.MeshPhongMaterial({ color: 0x0F172A, shininess: 100 });
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xF59E0B, 
      emissive: 0xF59E0B, 
      emissiveIntensity: 0.5 
    });

    // Laptop Base / Keyboard
    const baseGeom = new THREE.BoxGeometry(3, 0.1, 2);
    const base = new THREE.Mesh(baseGeom, laptopMaterial);
    group.add(base);

    // Screen Frame
    const frameGeom = new THREE.BoxGeometry(3, 2, 0.1);
    const frame = new THREE.Mesh(frameGeom, laptopMaterial);
    frame.position.y = 1;
    frame.position.z = -1;
    frame.rotation.x = -0.2;
    group.add(frame);

    // Screen Panel
    const panelGeom = new THREE.PlaneGeometry(2.8, 1.8);
    const panel = new THREE.Mesh(panelGeom, screenMaterial);
    panel.position.y = 1;
    panel.position.z = -0.94;
    panel.rotation.x = -0.2;
    group.add(panel);

    // Floating Code / App Cubes
    for (let i = 0; i < 7; i++) {
      const cubeGeom = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      const cubeMat = i % 2 === 0 ? laptopMaterial : screenMaterial;
      const cube = new THREE.Mesh(cubeGeom, cubeMat);
      cube.position.set(
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.5) * 2
      );
      group.add(cube);
    }

    scene.add(group);

    // Lights
    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    camera.position.z = 5.5;

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      group.position.x += (mouseX * 1.2 - group.position.x) * 0.05;
      group.position.y += (-mouseY * 1.2 - group.position.y) * 0.05;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
