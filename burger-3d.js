(async () => {
  const canvas = document.querySelector(".burger-3d-canvas");
  const stage = canvas?.closest(".burger-visual");
  stage?.classList.add("is-3d-loading");

  try {
  const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");
  if (!canvas || !stage) throw new Error("Burger 3D canvas is missing.");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
  camera.position.set(0, 0.98, 6.85);
  camera.lookAt(0, -0.18, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.24;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  scene.add(new THREE.HemisphereLight(0xffe2c2, 0x32170c, 2.2));

  const keyLight = new THREE.DirectionalLight(0xffd09a, 4.2);
  keyLight.position.set(-3, 5, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 18;
  keyLight.shadow.bias = -0.00035;
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0xff6a19, 110, 12, 2);
  rimLight.position.set(3, 1.2, -2.2);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0xffbd68, 36, 9, 2);
  fillLight.position.set(-3.5, 0, 3);
  scene.add(fillLight);

  const frontLight = new THREE.PointLight(0xfff0d0, 24, 10, 2);
  frontLight.position.set(0, 2.4, 4.2);
  scene.add(frontLight);

  const food = new THREE.Group();
  scene.add(food);
  const foodLayers = {
    base: new THREE.Group(),
    bottomBun: new THREE.Group(),
    patty: new THREE.Group(),
    cheese: new THREE.Group(),
    tomato: new THREE.Group(),
    lettuce: new THREE.Group(),
    topBun: new THREE.Group(),
  };
  Object.values(foodLayers).forEach((layer) => food.add(layer));
  let activeLayer = foodLayers.base;

  const material = (color, roughness = 0.56, metalness = 0) =>
    new THREE.MeshPhysicalMaterial({
      color,
      roughness,
      metalness,
      clearcoat: 0.08,
      clearcoatRoughness: 0.38,
    });

  function makeFoodTexture(base, toasted) {
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 512;
    textureCanvas.height = 512;
    const context = textureCanvas.getContext("2d");
    const gradient = context.createRadialGradient(190, 150, 20, 250, 250, 420);
    gradient.addColorStop(0, base);
    gradient.addColorStop(1, toasted);
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 512);

    let seed = 19;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let index = 0; index < 580; index += 1) {
      const x = random() * 512;
      const y = random() * 512;
      const radius = 0.5 + random() * 4.2;
      context.fillStyle = `rgba(70, 31, 11, ${0.025 + random() * 0.12})`;
      context.beginPath();
      context.ellipse(x, y, radius, radius * (0.48 + random() * 0.6), random(), 0, Math.PI * 2);
      context.fill();
    }

    for (let index = 0; index < 38; index += 1) {
      const x = random() * 512;
      const y = random() * 512;
      const radius = 8 + random() * 28;
      const patch = context.createRadialGradient(x, y, 1, x, y, radius);
      patch.addColorStop(0, `rgba(117, 54, 16, ${0.12 + random() * 0.16})`);
      patch.addColorStop(1, "rgba(117, 54, 16, 0)");
      context.fillStyle = patch;
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return texture;
  }

  const bunTexture = makeFoodTexture("#f5ca7d", "#ad591f");
  const pattyTexture = makeFoodTexture("#51301e", "#21100b");
  const bun = new THREE.MeshPhysicalMaterial({
    color: 0xffe0a1,
    map: bunTexture,
    bumpMap: bunTexture,
    bumpScale: 0.035,
    roughness: 0.64,
    clearcoat: 0.16,
    clearcoatRoughness: 0.34,
    sheen: 0.2,
    sheenRoughness: 0.58,
    sheenColor: new THREE.Color(0xffbd72),
  });
  const bunTopMaterial = bun;
  const patty = new THREE.MeshPhysicalMaterial({
    color: 0xa9764d,
    map: pattyTexture,
    bumpMap: pattyTexture,
    bumpScale: 0.07,
    roughness: 0.88,
    clearcoat: 0.04,
    clearcoatRoughness: 0.72,
  });
  const cheese = material(0xffc928, 0.3);
  const tomato = material(0xe94c35, 0.34);
  const lettuce = material(0x58ad3e, 0.66);
  const seedMaterial = material(0xffe9bd, 0.5);
  const plateMaterial = material(0x241a15, 0.3, 0.12);

  function addCylinder(radiusTop, radiusBottom, height, y, surface, segments = 64) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments),
      surface,
    );
    mesh.position.y = y;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    activeLayer.add(mesh);
    return mesh;
  }

  function addWavyLayer(radius, y, surface, frequency, amount, phase = 0) {
    const shape = new THREE.Shape();
    const points = 112;

    for (let index = 0; index < points; index += 1) {
      const angle = (index / points) * Math.PI * 2;
      const edge = 1 + Math.sin(angle * frequency + phase) * amount
        + Math.sin(angle * (frequency * 1.7) - phase) * amount * 0.42;
      const x = Math.cos(angle) * radius * edge;
      const z = Math.sin(angle) * radius * edge;
      if (index === 0) shape.moveTo(x, z);
      else shape.lineTo(x, z);
    }
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.075,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.025,
      bevelThickness: 0.025,
      curveSegments: 2,
    });
    geometry.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geometry, surface);
    mesh.position.y = y;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    activeLayer.add(mesh);
    return mesh;
  }

  function addPatty() {
    const shape = new THREE.Shape();
    const points = 96;
    for (let index = 0; index < points; index += 1) {
      const angle = (index / points) * Math.PI * 2;
      const edge = 1 + Math.sin(angle * 7 + 0.6) * 0.025
        + Math.sin(angle * 13) * 0.012;
      const x = Math.cos(angle) * 1.41 * edge;
      const z = Math.sin(angle) * 1.36 * edge;
      if (index === 0) shape.moveTo(x, z);
      else shape.lineTo(x, z);
    }
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.045,
      bevelThickness: 0.045,
      curveSegments: 3,
    });
    geometry.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geometry, patty);
    mesh.position.y = -0.79;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    activeLayer.add(mesh);

    const charMaterial = material(0x2b170e, 0.94);
    for (let index = 0; index < 7; index += 1) {
      const mark = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.024, 0.3 + (index % 3) * 0.08, 3, 6),
        charMaterial,
      );
      mark.rotation.set(Math.PI / 2, 0, -0.56);
      mark.position.set(-0.82 + (index % 4) * 0.53, 0.32, -0.65 + Math.floor(index / 4) * 0.72);
      mesh.add(mark);
    }
    return mesh;
  }

  function addCheeseSlice() {
    const shape = new THREE.Shape();
    shape.moveTo(-1.18, -0.12);
    shape.lineTo(-0.8, -0.98);
    shape.lineTo(0.26, -1.22);
    shape.lineTo(1.18, -0.72);
    shape.lineTo(1.34, 0.12);
    shape.lineTo(0.86, 0.94);
    shape.lineTo(-0.22, 1.2);
    shape.lineTo(-1.12, 0.72);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.11,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.055,
      bevelThickness: 0.035,
      curveSegments: 4,
    });
    geometry.rotateX(-Math.PI / 2);
    const slice = new THREE.Mesh(geometry, cheese);
    slice.position.set(0.015, -0.52, 0);
    slice.rotation.y = 0.18;
    slice.castShadow = true;
    slice.receiveShadow = true;
    activeLayer.add(slice);
  }

  activeLayer = foodLayers.base;
  const plate = addCylinder(1.75, 1.9, 0.16, -1.32, plateMaterial);
  plate.scale.z = 0.76;

  const plateRim = new THREE.Mesh(
    new THREE.TorusGeometry(1.78, 0.055, 12, 80),
    material(0x63412c, 0.26, 0.18),
  );
  plateRim.rotation.x = Math.PI / 2;
  plateRim.scale.set(1, 0.76, 1);
  plateRim.position.y = -1.22;
  activeLayer.add(plateRim);

  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 256;
  shadowCanvas.height = 128;
  const shadowContext = shadowCanvas.getContext("2d");
  const shadowGradient = shadowContext.createRadialGradient(128, 64, 5, 128, 64, 62);
  shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0.5)");
  shadowGradient.addColorStop(0.42, "rgba(0, 0, 0, 0.24)");
  shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  shadowContext.fillStyle = shadowGradient;
  shadowContext.fillRect(0, 0, 256, 128);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

  const floorShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(4.3, 2.2),
    new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }),
  );
  floorShadow.rotation.x = -Math.PI / 2;
  floorShadow.position.y = -1.225;
  activeLayer.add(floorShadow);

  activeLayer = foodLayers.bottomBun;
  const bottomBunGeometry = new THREE.LatheGeometry(
    [
      new THREE.Vector2(0, -0.18),
      new THREE.Vector2(0.9, -0.18),
      new THREE.Vector2(1.16, -0.16),
      new THREE.Vector2(1.27, -0.1),
      new THREE.Vector2(1.3, 0.08),
      new THREE.Vector2(1.25, 0.16),
      new THREE.Vector2(1.05, 0.18),
      new THREE.Vector2(0, 0.18),
    ],
    64,
  );
  bottomBunGeometry.scale(1, 1, 0.94);
  const bottomBun = new THREE.Mesh(bottomBunGeometry, bun);
  bottomBun.position.y = -1.02;
  bottomBun.castShadow = true;
  activeLayer.add(bottomBun);

  activeLayer = foodLayers.patty;
  addPatty();

  activeLayer = foodLayers.cheese;
  addCheeseSlice();

  activeLayer = foodLayers.tomato;
  addCylinder(1.31, 1.29, 0.13, -0.34, tomato, 96);

  activeLayer = foodLayers.lettuce;
  addWavyLayer(1.47, -0.19, lettuce, 13, 0.075, 0.4);

  activeLayer = foodLayers.topBun;
  const topGeometry = new THREE.SphereGeometry(
    1.48,
    64,
    40,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2,
  );
  topGeometry.scale(1.02, 0.88, 0.9);
  const topBun = new THREE.Mesh(topGeometry, bunTopMaterial);
  topBun.position.y = -0.17;
  topBun.castShadow = true;
  activeLayer.add(topBun);

  for (let index = 0; index < 24; index += 1) {
    const angle = index * 2.399;
    const polar = 0.28 + (index % 5) * 0.17;
    const radiusX = 1.48 * 1.02 * Math.sin(polar);
    const radiusZ = 1.48 * 0.9 * Math.sin(polar);
    const seed = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 10, 8),
      seedMaterial,
    );
    seed.scale.set(0.48, 1.35, 0.34);
    seed.position.set(
      Math.cos(angle) * radiusX,
      -0.17 + 1.48 * 0.88 * Math.cos(polar),
      Math.sin(angle) * radiusZ,
    );
    seed.rotation.set(0.25 + Math.sin(angle) * 0.3, angle, 0.45);
    activeLayer.add(seed);
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animatedLayers = [
    [foodLayers.topBun, 1.1, 0.72],
    [foodLayers.lettuce, 0.9, 0.44],
    [foodLayers.tomato, 0.7, 0.22],
    [foodLayers.cheese, 0.5, -0.08],
    [foodLayers.patty, 0.3, -0.34],
    [foodLayers.bottomBun, 0.15, -0.58],
  ];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function renderScene() {
    renderer.render(scene, camera);
  }

  function resizeStage() {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    if (reducedMotion.matches) renderScene();
    else scheduleRender();
  }

  let resizeObserver = null;
  if ("ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(resizeStage);
    resizeObserver.observe(stage);
  } else {
    window.addEventListener("resize", resizeStage, { passive: true });
    resizeStage();
  }

  stage.classList.remove("is-3d-loading");
  stage.classList.add("is-3d");

  const clock = new THREE.Clock();
  let animationFrameId = 0;
  let isStageVisible = true;
  let isDocumentVisible = !document.hidden;

  function stopRender() {
    if (!animationFrameId) return;
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }

  function scheduleRender() {
    if (reducedMotion.matches) {
      stopRender();
      if (isStageVisible && isDocumentVisible) renderScene();
      return;
    }
    if (!animationFrameId && isStageVisible && isDocumentVisible) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  function render() {
    animationFrameId = 0;
    if (!isStageVisible || !isDocumentVisible) return;
    const elapsed = clock.getElapsedTime();

    if (reducedMotion.matches) {
      renderScene();
      return;
    }

    const explode = Number.parseFloat(getComputedStyle(stage).getPropertyValue("--burger-explode")) || 0;
    animatedLayers.forEach(([layer, entryLift, explodeDistance], index) => {
      const progress = clamp((elapsed - index * 0.08) / 0.62, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      layer.position.y = entryLift * (1 - eased) + explodeDistance * explode;
    });

    food.rotation.x = Math.sin(elapsed * 0.55) * 0.025;
    food.rotation.y = elapsed * 0.12;
    food.position.y = Math.sin(elapsed * 0.9) * 0.045;

    renderScene();
    scheduleRender();
  }

  const startVisibilityObserver = () => {
    if (!("IntersectionObserver" in window)) {
      scheduleRender();
      return;
    }

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isStageVisible = entry.isIntersecting;
      if (isStageVisible) scheduleRender();
      else stopRender();
    }, { threshold: 0.01 });
    intersectionObserver.observe(stage);
  };

  document.addEventListener("visibilitychange", () => {
    isDocumentVisible = !document.hidden;
    if (isDocumentVisible) scheduleRender();
    else stopRender();
  });

  const handleMotionChange = () => {
    stopRender();
    scheduleRender();
  };
  if (typeof reducedMotion.addEventListener === "function") reducedMotion.addEventListener("change", handleMotionChange);
  else reducedMotion.addListener(handleMotionChange);

  startVisibilityObserver();
  if (reducedMotion.matches) renderScene();
  else scheduleRender();
  } catch {
    stage?.classList.remove("is-3d", "is-3d-loading");
    stage?.classList.add("is-3d-fallback");
  }
})();
