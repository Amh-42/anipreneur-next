// THIS IS THE NEW, CORRECTED CODE
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InteractiveBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, particles, rotationGroup;
        let mouseX = 0, mouseY = 0;
        let explosionProgress = 0; // <<< Keep this variable
        const originalPositions = [], randomPositions = [];
        const PARTICLE_COUNT = 5000, GLOBE_RADIUS = 5, EXPLOSION_RADIUS = 15, ROTATION_SPEED = 0.5, EASING_FACTOR = 0.05;

        function initGlobe() {
            scene = new THREE.Scene();
            rotationGroup = new THREE.Group();
            scene.add(rotationGroup);
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 12;
            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            createParticles();

            // <<< CHANGE: We no longer need a separate scroll listener
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('resize', onWindowResize);
        }

        function createParticles() {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(PARTICLE_COUNT * 3);
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i_float = i + 0.5, phi = Math.acos(1 - 2 * i_float / PARTICLE_COUNT), theta = Math.PI * (1 + Math.sqrt(5)) * i_float;
                const x = GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi), y = GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi), z = GLOBE_RADIUS * Math.cos(phi);
                originalPositions.push(x, y, z);
                const rX = (Math.random() - 0.5) * 2 * EXPLOSION_RADIUS, rY = (Math.random() - 0.5) * 2 * EXPLOSION_RADIUS, rZ = (Math.random() - 0.5) * 2 * EXPLOSION_RADIUS;
                randomPositions.push(rX, rY, rZ);
                positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z;
            }
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const material = new THREE.PointsMaterial({ color: 0x00bfff, size: 0.03, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false });
            particles = new THREE.Points(geometry, material);
            rotationGroup.add(particles);
        }

        function onMouseMove(event) { mouseX = (event.clientX / window.innerWidth) * 2 - 1; mouseY = -(event.clientY / window.innerHeight) * 2 + 1; }
        
        // <<< CHANGE: The onScroll function is completely removed.
        
        function onWindowResize() {
            if (!renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }

        function animateGlobe() {
            requestAnimationFrame(animateGlobe);
            if (!particles) return;

            // <<< CHANGE: Calculate scroll progress on every frame >>>
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            explosionProgress = scrollableHeight > 0 ? currentScroll / scrollableHeight : 0;
            
            rotationGroup.rotation.y += 0.0005;
            const targetRotationX = mouseY * ROTATION_SPEED;
            const targetRotationY = mouseX * ROTATION_SPEED;
            particles.rotation.x += (targetRotationX - particles.rotation.x) * EASING_FACTOR;
            particles.rotation.y += (targetRotationY - particles.rotation.y) * EASING_FACTOR;
            
            const positions = particles.geometry.attributes.position;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
                const currentX = THREE.MathUtils.lerp(originalPositions[ix], randomPositions[ix], explosionProgress);
                const currentY = THREE.MathUtils.lerp(originalPositions[iy], randomPositions[iy], explosionProgress);
                const currentZ = THREE.MathUtils.lerp(originalPositions[iz], randomPositions[iz], explosionProgress);
                positions.setXYZ(i, currentX, currentY, currentZ);
            }
            positions.needsUpdate = true;
            renderer.render(scene, camera);
        }

        initGlobe();
        animateGlobe();

        return () => {
            // <<< CHANGE: Remove the scroll listener from the cleanup
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onWindowResize);
            if(renderer) {
                renderer.dispose();
            }
        };
    }, []);

    return <canvas id="interactive-background" ref={canvasRef} />;
}