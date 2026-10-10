/**
 * SUDHANSHU SAKHARE — 3D SKILLS GALAXY ENGINE
 * Powered by Three.js
 * Theme: Minimalist Obsidian Black & Refined Studio Green (#22c55e)
 * Mobile: Full PointerEvents dragging support with touch-action: none
 * Performance: IntersectionObserver pauses rendering when offscreen (60+ FPS)
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.error('Three.js is not loaded.');
    return;
  }

  /* ==========================================================================
     3D SKILLS CONSTELLATION: Black & Studio Green Minimalist Galaxy
     ========================================================================== */
  const SKILLS_DATA = [
    {
      id: 'threejs',
      name: 'Three.js / WebGL',
      category: '3d-front',
      proficiency: 95,
      desc: 'Real-time 3D rendering, custom GLSL shaders, camera physics & particle systems.',
      color: 0x22c55e,
      orbitRadius: 10.5,
      orbitSpeed: 0.35,
      orbitTilt: 0.2,
      orbitAngle: 0.1,
      size: 1.1
    },
    {
      id: 'react',
      name: 'React.js & Next.js',
      category: '3d-front',
      proficiency: 96,
      desc: 'Modern component architectures, SSR/SSG, state management & reactive dashboards.',
      color: 0x22c55e,
      orbitRadius: 8.2,
      orbitSpeed: 0.42,
      orbitTilt: -0.3,
      orbitAngle: 1.4,
      size: 1.15
    },
    {
      id: 'javascript',
      name: 'Modern JavaScript',
      category: '3d-front',
      proficiency: 98,
      desc: 'ESNext, async event loops, DOM performance optimization, Web APIs.',
      color: 0x4ade80,
      orbitRadius: 12.4,
      orbitSpeed: 0.28,
      orbitTilt: 0.45,
      orbitAngle: 2.7,
      size: 1.05
    },
    {
      id: 'figma',
      name: 'UI/UX & Figma',
      category: 'design',
      proficiency: 94,
      desc: 'High-fidelity wireframes, interactive design tokens, micro-interactions.',
      color: 0x22c55e,
      orbitRadius: 9.6,
      orbitSpeed: 0.38,
      orbitTilt: -0.5,
      orbitAngle: 3.9,
      size: 1.1
    },
    {
      id: 'wordpress',
      name: 'WordPress / CMS',
      category: 'backend-cms',
      proficiency: 92,
      desc: 'Custom theme architecture, Headless WP REST API, Elementor mastery, speed tuning.',
      color: 0x4ade80,
      orbitRadius: 11.2,
      orbitSpeed: 0.31,
      orbitTilt: 0.15,
      orbitAngle: 4.8,
      size: 1.0
    },
    {
      id: 'nodejs',
      name: 'Node.js & Express',
      category: 'backend-cms',
      proficiency: 88,
      desc: 'RESTful architectures, authentication, real-time WebSockets, microservices.',
      color: 0x22c55e,
      orbitRadius: 13.5,
      orbitSpeed: 0.25,
      orbitTilt: -0.25,
      orbitAngle: 5.6,
      size: 1.05
    },
    {
      id: 'css3',
      name: 'CSS3 & Animation',
      category: '3d-front',
      proficiency: 98,
      desc: 'Clean layouts, responsive CSS Grid/Flexbox, GSAP animations, fluid typography.',
      color: 0x4ade80,
      orbitRadius: 7.2,
      orbitSpeed: 0.48,
      orbitTilt: 0.35,
      orbitAngle: 0.8,
      size: 0.95
    },
    {
      id: 'seo',
      name: 'Performance & SEO',
      category: 'tools',
      proficiency: 95,
      desc: 'Core Web Vitals 95+, schema structured data, semantic SEO & Lighthouse audits.',
      color: 0x4ade80,
      orbitRadius: 10.0,
      orbitSpeed: 0.34,
      orbitTilt: 0.6,
      orbitAngle: 3.3,
      size: 0.95
    }
  ];

  function initSkills3DScene() {
    const canvas = document.getElementById('skills-3d-canvas');
    if (!canvas) return;

    const wrapper = canvas.parentElement;
    let width = wrapper.clientWidth || 1100;
    let height = wrapper.clientHeight || 520;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080908);
    scene.fog = new THREE.FogExp2(0x080908, 0.02);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 8, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting (Studio Green & Subtle Charcoal)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const greenPointLight = new THREE.PointLight(0x22c55e, 2.5, 45);
    greenPointLight.position.set(0, 0, 0);
    scene.add(greenPointLight);

    const softTopLight = new THREE.PointLight(0x22c55e, 1.2, 50);
    softTopLight.position.set(10, 20, 20);
    scene.add(softTopLight);

    // Master Galaxy Group
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // 1. Central Core Sphere
    const coreGeom = new THREE.SphereGeometry(2.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0c0f0c,
      emissive: 0x22c55e,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    galaxyGroup.add(coreMesh);

    // Green Geometric Wireframe Shell
    const shellGeom = new THREE.IcosahedronGeometry(2.55, 2);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const shellMesh = new THREE.Mesh(shellGeom, shellMat);
    galaxyGroup.add(shellMesh);

    // Orbit Guideline Rings
    const orbitRings = [7.2, 8.2, 9.6, 10.5, 11.2, 12.4, 13.5];
    orbitRings.forEach(radius => {
      const ringG = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
      const ringM = new THREE.MeshBasicMaterial({
        color: 0x1f241f,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
      });
      const rMesh = new THREE.Mesh(ringG, ringM);
      rMesh.rotation.x = Math.PI / 2;
      galaxyGroup.add(rMesh);
    });

    // 2. Skill Nodes Array
    const skillNodes = [];
    const raycastMeshes = [];

    // Helper for high-dpi text sprite labels
    function createTextSprite(text) {
      const textCanvas = document.createElement('canvas');
      const ctx = textCanvas.getContext('2d');
      textCanvas.width = 256;
      textCanvas.height = 64;

      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, 32);

      const texture = new THREE.CanvasTexture(textCanvas);
      texture.minFilter = THREE.LinearFilter;
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(3.2, 0.8, 1);
      return sprite;
    }

    SKILLS_DATA.forEach(skill => {
      const nodeGroup = new THREE.Group();

      // Node Sphere
      const sphereGeom = new THREE.SphereGeometry(skill.size * 0.72, 20, 20);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: skill.color,
        emissive: skill.color,
        emissiveIntensity: 0.55,
        roughness: 0.25,
        metalness: 0.8
      });
      const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
      sphereMesh.userData = { skill: skill, parentGroup: nodeGroup };
      nodeGroup.add(sphereMesh);
      raycastMeshes.push(sphereMesh);

      // Corona Wireframe
      const coronaGeom = new THREE.SphereGeometry(skill.size * 0.92, 14, 14);
      const coronaMat = new THREE.MeshBasicMaterial({
        color: 0x22c55e,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const coronaMesh = new THREE.Mesh(coronaGeom, coronaMat);
      nodeGroup.add(coronaMesh);

      // Text Sprite Label
      const label = createTextSprite(skill.name);
      label.position.set(0, skill.size * 1.15, 0);
      nodeGroup.add(label);

      galaxyGroup.add(nodeGroup);

      skillNodes.push({
        data: skill,
        group: nodeGroup,
        mesh: sphereMesh,
        corona: coronaMesh,
        label: label,
        currentAngle: skill.orbitAngle,
        currentRadius: skill.orbitRadius
      });
    });

    // 3. Starlight Background
    const starCount = 450;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 120;
      starPos[i + 1] = (Math.random() - 0.5) * 80;
      starPos[i + 2] = (Math.random() - 0.5) * 120;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x22c55e,
      size: 0.65,
      transparent: true,
      opacity: 0.35
    });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    // 4. Laser Connection Line to Selected Node
    const laserGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0)
    ]);
    const laserMat = new THREE.LineBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.75,
      linewidth: 2
    });
    const laserLine = new THREE.Line(laserGeom, laserMat);
    laserLine.visible = false;
    galaxyGroup.add(laserLine);

    // State Variables
    let isAutoRotating = true;
    let isExploded = false;
    let currentFilter = 'all';
    let selectedSkill = null;
    let hoveredSkill = null;

    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };
    const targetGalaxyRotation = { x: 0.2, y: 0 };
    const currentGalaxyRotation = { x: 0.2, y: 0 };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-999, -999);

    // DOM References
    const dragHint = document.getElementById('canvas-drag-hint');
    const hudCard = document.getElementById('hologram-hud-card');
    const hudSkillName = document.getElementById('hud-skill-name');
    const hudSkillBadge = document.getElementById('hud-skill-badge');
    const hudSkillDesc = document.getElementById('hud-skill-desc');
    const hudProgressFill = document.getElementById('hud-progress-fill');

    function updateHologramHUD(skill) {
      if (!hudCard) return;
      if (!skill) return;
      hudSkillName.textContent = skill.name;
      hudSkillBadge.textContent = `${skill.proficiency}% Mastery`;
      hudSkillDesc.textContent = skill.desc;
      if (hudProgressFill) hudProgressFill.style.width = `${skill.proficiency}%`;
    }

    // Dismiss drag hint after first touch or drag
    function dismissDragHint() {
      if (dragHint && dragHint.style.opacity !== '0') {
        dragHint.style.transition = 'opacity 0.4s ease';
        dragHint.style.opacity = '0';
      }
    }

    // Modern Pointer Events (Works seamlessly across Desktop Mouse, Trackpad, and Mobile Touch!)
    canvas.addEventListener('pointerdown', (e) => {
      isDragging = true;
      previousPointerPosition = { x: e.clientX, y: e.clientY };
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (err) {}
      dismissDragHint();
    });

    canvas.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerPosition.x;
        const deltaY = e.clientY - previousPointerPosition.y;

        targetGalaxyRotation.y += deltaX * 0.007;
        targetGalaxyRotation.x += deltaY * 0.007;
        targetGalaxyRotation.x = Math.max(-0.6, Math.min(0.8, targetGalaxyRotation.x));

        previousPointerPosition = { x: e.clientX, y: e.clientY };
        dismissDragHint();
      }
    });

    function endDrag(e) {
      if (isDragging) {
        isDragging = false;
        try {
          if (e && e.pointerId) canvas.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }
    }

    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    window.addEventListener('pointerup', endDrag);

    // Node Selection on Tap / Click
    canvas.addEventListener('click', () => {
      if (hoveredSkill) {
        selectedSkill = hoveredSkill;
        updateHologramHUD(selectedSkill);
        if (window.playSfx) window.playSfx('click');

        const matchingCard = document.querySelector(`[data-skill-id="${selectedSkill.id}"]`);
        if (matchingCard) {
          document.querySelectorAll('.skill-card-3d').forEach(c => c.style.borderColor = '');
          matchingCard.style.borderColor = 'var(--accent-green)';
          matchingCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });

    // Window Controls Hooks
    window.filterGalaxySkills = function (category) {
      currentFilter = category;
      skillNodes.forEach(node => {
        const matches = (category === 'all' || node.data.category === category);
        node.group.visible = matches;
      });
      if (window.playSfx) window.playSfx('switch');
    };

    window.toggleGalaxyAutoRotate = function (btn) {
      isAutoRotating = !isAutoRotating;
      if (btn) btn.classList.toggle('active', isAutoRotating);
      if (window.playSfx) window.playSfx('click');
    };

    window.toggleGalaxyExplode = function (btn) {
      isExploded = !isExploded;
      if (btn) btn.classList.toggle('active', isExploded);
      if (window.playSfx) window.playSfx('switch');
    };

    window.resetGalaxyView = function () {
      targetGalaxyRotation.x = 0.2;
      targetGalaxyRotation.y = 0;
      isExploded = false;
      const explodeBtn = document.getElementById('btn-explode-galaxy');
      if (explodeBtn) explodeBtn.classList.remove('active');
      if (window.playSfx) window.playSfx('click');
    };

    // IntersectionObserver to pause rendering when outside viewport
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    observer.observe(wrapper);

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      if (!isVisible) return; // 0% GPU load when scrolled past!

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth Rotation Lerp
      if (isAutoRotating && !isDragging) {
        targetGalaxyRotation.y += delta * 0.2;
      }
      currentGalaxyRotation.x += (targetGalaxyRotation.x - currentGalaxyRotation.x) * 0.1;
      currentGalaxyRotation.y += (targetGalaxyRotation.y - currentGalaxyRotation.y) * 0.1;

      galaxyGroup.rotation.x = currentGalaxyRotation.x;
      galaxyGroup.rotation.y = currentGalaxyRotation.y;

      // Central core pulsing
      coreMesh.rotation.y = elapsedTime * 0.3;
      shellMesh.rotation.y = -elapsedTime * 0.25;
      shellMesh.rotation.x = elapsedTime * 0.15;
      const corePulse = 1 + Math.sin(elapsedTime * 2.5) * 0.05;
      coreMesh.scale.set(corePulse, corePulse, corePulse);

      // Starfield subtle drift
      stars.rotation.y = elapsedTime * 0.03;

      // Raycasting for hover node detection
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(raycastMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        hoveredSkill = hit.userData.skill;
        canvas.style.cursor = 'pointer';
        updateHologramHUD(hoveredSkill);
      } else {
        hoveredSkill = null;
        canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
      }

      // Update Orbiting Nodes
      skillNodes.forEach(node => {
        if (!node.group.visible) return;

        // Auto orbit
        node.currentAngle += delta * node.data.orbitSpeed * 0.8;

        // Explode / Collapse Expansion Lerp
        const targetRadius = isExploded ? node.data.orbitRadius * 1.35 : node.data.orbitRadius;
        node.currentRadius += (targetRadius - node.currentRadius) * 0.08;

        // Calculate 3D position
        const x = Math.cos(node.currentAngle) * node.currentRadius;
        const z = Math.sin(node.currentAngle) * node.currentRadius;
        const y = Math.sin(node.currentAngle + node.data.orbitAngle) * (node.data.orbitTilt * 4);

        node.group.position.set(x, y, z);

        // Keep labels facing camera
        node.label.quaternion.copy(camera.quaternion);

        // Corona spin
        node.corona.rotation.y = elapsedTime * 1.2;

        // Highlight if hovered or selected
        const isTarget = (hoveredSkill && hoveredSkill.id === node.data.id) ||
                         (selectedSkill && selectedSkill.id === node.data.id);

        const targetScale = isTarget ? 1.35 : 1.0;
        node.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

        // Update Laser to selected node
        if (selectedSkill && selectedSkill.id === node.data.id) {
          laserLine.visible = true;
          const pos = laserGeom.attributes.position.array;
          pos[3] = x;
          pos[4] = y;
          pos[5] = z;
          laserGeom.attributes.position.needsUpdate = true;
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    // Support Dynamic Accent Color Switching
    window.updateThreeGalaxyAccent = function(accent) {
      const ACCENT_HEX = {
        'emerald': 0x22c55e,
        'indigo': 0x6366f1,
        'cyan': 0x06b6d4,
        'amber': 0xf59e0b,
        'rose': 0xf43f5e
      };
      const hex = ACCENT_HEX[accent] || 0x22c55e;
      if (greenPointLight) greenPointLight.color.setHex(hex);
      if (softTopLight) softTopLight.color.setHex(hex);
      if (coreMat) coreMat.emissive.setHex(hex);
      if (shellMat) shellMat.color.setHex(hex);
      if (laserLine) laserLine.material.color.setHex(hex);
    };

    // Window Resize Handler
    window.addEventListener('resize', () => {
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkills3DScene);
  } else {
    initSkills3DScene();
  }

})();
