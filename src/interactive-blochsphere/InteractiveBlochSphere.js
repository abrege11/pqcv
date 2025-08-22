import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { default as TextSprite } from "@seregpie/three.text-sprite";


import GUI from "lil-gui";
import * as Qubit from "./Qubit";
import * as Gates from "./Gates";

export class InteractiveBlochSphere {
  qubit = new Qubit.Qubit();
  infoText;
  qubitAnchor;
  qubitArrow;

  constructor(parentElement) {
    if (!parentElement) throw new Error("InteractiveBlochSphere: parentElement is null");

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const scene = new THREE.Scene();

    // Sphere outline
    const sphereRadius = 15;
    const sphereSegments = 32;

    const geometryZAxis = new THREE.CircleGeometry(sphereRadius, sphereSegments);
    const lineZAxis = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometryZAxis),
      new THREE.LineBasicMaterial({ color: 0x000000 })
    );

    const geometryXAxis = new THREE.CircleGeometry(sphereRadius, sphereSegments);
    geometryXAxis.rotateX(Math.PI / 2);
    const lineXAxis = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometryXAxis),
      new THREE.LineBasicMaterial({ color: 0x000000 })
    );

    const geometryYAxis = new THREE.CircleGeometry(sphereRadius, sphereSegments);
    geometryYAxis.rotateY(Math.PI / 2);
    const lineYAxis = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometryYAxis),
      new THREE.LineBasicMaterial({ color: 0x000000 })
    );

    // x, y and z axis arrows
    const origin = new THREE.Vector3(0, 0, 0);
    const length = 18;
    const hex = 0x000000;
    const headLength = 1.0;
    const headWidth = 0.75;

    const dirY = new THREE.Vector3(0, 1, 0);
    const arrowY = new THREE.ArrowHelper(dirY, origin, length, hex, headLength, headWidth);

    const dirYNeg = new THREE.Vector3(0, -1, 0);
    const arrowYNeg = new THREE.ArrowHelper(dirYNeg, origin, length, hex, headLength, headWidth);

    const dirX = new THREE.Vector3(1, 0, 0);
    const arrowX = new THREE.ArrowHelper(dirX, origin, length, hex, headLength, headWidth);

    const dirXNeg = new THREE.Vector3(-1, 0, 0);
    const arrowXNeg = new THREE.ArrowHelper(dirXNeg, origin, length, hex, headLength, headWidth);

    const dirZ = new THREE.Vector3(0, 0, 1);
    const arrowZ = new THREE.ArrowHelper(dirZ, origin, length, hex, headLength, headWidth);

    const dirZNeg = new THREE.Vector3(0, 0, -1);
    const arrowZNeg = new THREE.ArrowHelper(dirZNeg, origin, length, hex, headLength, headWidth);

    // intersection dots
    const dotRadius = 0.2;
    const dotColor = 0x0000ff;

    const geometry = new THREE.SphereGeometry(dotRadius, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: dotColor });

    const dotZero = new THREE.Mesh(geometry, material);
    this.setPosition(dotZero, new THREE.Vector3(0, sphereRadius, 0));

    const dotOne = new THREE.Mesh(geometry, material);
    this.setPosition(dotOne, new THREE.Vector3(0, -sphereRadius, 0));

    const dotPos = new THREE.Mesh(geometry, material);
    this.setPosition(dotPos, new THREE.Vector3(0, 0, sphereRadius));

    const dotNeg = new THREE.Mesh(geometry, material);
    this.setPosition(dotNeg, new THREE.Vector3(0, 0, -sphereRadius));

    const dotIPos = new THREE.Mesh(geometry, material);
    this.setPosition(dotIPos, new THREE.Vector3(sphereRadius, 0, 0));

    const dotINeg = new THREE.Mesh(geometry, material);
    this.setPosition(dotINeg, new THREE.Vector3(-sphereRadius, 0, 0));

    // qubit position arrow
    const qubitArrowLength = 16;
    const qubitArrowColor = 0xff0000;

    const qubitDirection = new THREE.Vector3(0, 1, 0);
    this.qubitArrow = new THREE.ArrowHelper(
      qubitDirection,
      origin,
      qubitArrowLength,
      qubitArrowColor,
      headLength,
      headWidth
    );
    this.qubitAnchor = new THREE.Group();

    // rendering text
    const arrowTextColor = "black";
    const dotTextColor = "blue";
    const qubitTextColor = "red";
    const fontFamily = 'Times, serif, "Times New Roman"';
    const fontStyle = "italic";
    const fontSize = 2;

    // axis text (fix labels if needed)
    this.addTextAsChild(
      arrowX.cone,
      new TextSprite({ color: arrowTextColor, fontFamily, fontSize, fontStyle, text: "x" }),
      new THREE.Vector3(0, -1.2, -2.4)
    );
    this.addTextAsChild(
      arrowY.cone,
      new TextSprite({ color: arrowTextColor, fontFamily, fontSize, fontStyle, text: "y" }),
      new THREE.Vector3(-2.4, -1.2, 0)
    );
    this.addTextAsChild(
      arrowZ.cone,
      new TextSprite({ color: arrowTextColor, fontFamily, fontSize, fontStyle, text: "z" }),
      new THREE.Vector3(0, 1.8, 0)
    );

    // dot text
    this.addTextAsChild(
      dotIPos,
      new TextSprite({ color: dotTextColor, fontFamily, fontSize, fontStyle, text: "|+i⟩" }),
      new THREE.Vector3(-2.4, 1.8, 0)
    );
    this.addTextAsChild(
      dotINeg,
      new TextSprite({ color: dotTextColor, fontFamily, fontSize, fontStyle, text: "|-i⟩" }),
      new THREE.Vector3(2.4, 1.8, 0)
    );
    this.addTextAsChild(
      dotPos,
      new TextSprite({ color: dotTextColor, fontFamily, fontSize, fontStyle, text: "|+⟩" }),
      new THREE.Vector3(0, 1.8, -2.4)
    );
    this.addTextAsChild(
      dotNeg,
      new TextSprite({ color: dotTextColor, fontFamily, fontSize, fontStyle, text: "|-⟩" }),
      new THREE.Vector3(0, 1.8, 2.4)
    );
    this.addTextAsChild(
      dotOne,
      new TextSprite({ color: dotTextColor, fontFamily, fontSize, fontStyle, text: "|1⟩" }),
      new THREE.Vector3(1.8, 2.4, 0)
    );
    this.addTextAsChild(
      dotZero,
      new TextSprite({ color: dotTextColor, fontFamily, fontSize, fontStyle, text: "|0⟩" }),
      new THREE.Vector3(1.8, -1.2, 0)
    );

    // qubit arrow text
    this.addTextAsChild(
      this.qubitArrow.cone,
      new TextSprite({ color: qubitTextColor, fontFamily, fontSize, fontStyle, text: "|Ψ⟩" }),
      new THREE.Vector3(1.8, 1.8, 0)
    );

    // containers
    const group = document.createElement("div");
    group.id = "interactive-blochsphere-root";
    group.style.height = "100%";
    group.style.width = "100%";
    group.style.display = "flex";
    group.style.alignItems = "center"; // valid value
    group.style.gap = "8px";

    const controlsContainer = document.createElement("div");
    controlsContainer.id = "interactive-blochsphere-controls";
    controlsContainer.style.width = "150px";

    const contentContainer = document.createElement("div");
    contentContainer.id = "interactive-blochsphere-content";
    contentContainer.style.width = "100%";
    contentContainer.style.height = "100%";
    contentContainer.style.minHeight = "400px";

    // Info text
    this.infoText = document.createElement("pre");
    this.infoText.id = "interactive-blochsphere-info";
    this.infoText.style.marginLeft = "10px";
    this.infoText.style.fontSize = "16pt";

    // GUI
    const gui = new GUI({ container: controlsContainer, width: 150 });
    this.buildGUI(gui);

    parentElement.appendChild(this.infoText);
    parentElement.appendChild(group);
    group.appendChild(contentContainer);
    group.appendChild(controlsContainer);
    contentContainer.appendChild(renderer.domElement);

    // camera (define BEFORE resize handler)
    const camera = new THREE.PerspectiveCamera(
      75,
      contentContainer.clientWidth /
        Math.max(1, contentContainer.clientHeight - this.getAbsoluteHeight(this.infoText)),
      1,
      1000
    );
    camera.position.set(22, 15, 30);
    const controls = new OrbitControls(camera, renderer.domElement);

    // set sizes
    const resize = () => {
      const height = Math.max(1, contentContainer.clientHeight - this.getAbsoluteHeight(this.infoText));
      const width = Math.max(1, contentContainer.clientWidth);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    // scene
    scene.background = new THREE.Color(0xffffff);
    scene.add(lineZAxis, lineXAxis, lineYAxis);
    scene.add(arrowX, arrowY, arrowZ, arrowXNeg, arrowYNeg, arrowZNeg);
    scene.add(dotZero, dotOne, dotNeg, dotPos, dotIPos, dotINeg);

    this.qubitAnchor = this.qubitAnchor || new THREE.Group();
    this.qubitAnchor.add(this.qubitArrow);
    scene.add(this.qubitAnchor);

    const addLight = (...pos) => {
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(...pos);
      scene.add(light);
    };
    addLight(-1, 2, 4);
    addLight(1, -1, -2);

    // initial
    this.refreshArrowPosition();

    let disposed = false;
    const animate = () => {
      if (disposed) return;
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // expose a destroy for React cleanup
    this.destroy = () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      try { gui?.destroy?.(); } catch {}
      controls?.dispose?.();
      renderer?.dispose?.();
      // optional: remove DOM children
      parentElement?.contains(group) && parentElement.removeChild(group);
      parentElement?.contains(this.infoText) && parentElement.removeChild(this.infoText);
    };
  }

  // optional destroy, set by constructor
  destroy = undefined;

  setPosition(element, v) {
    element.position.set(v.x, v.y, v.z);
  }

  addTextAsChild(parent, textSprite, v) {
    const g = new THREE.Group();
    this.setPosition(g, v);
    g.add(textSprite);
    parent.add(g);
  }

  setArrowWithSphericalPolarCoordinates(polar, azimuthal) {
    this.qubitAnchor.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), azimuthal);
    this.qubitArrow.setRotationFromAxisAngle(new THREE.Vector3(1, 0, 0), polar);
  }

  refreshArrowPosition() {
    const { theta: polar, phi: azimuthal } = this.qubit.polarCoordinates();
    const { realAlpha, imagAlpha, realBeta, imagBeta } = this.qubit.qubitValue();
    this.setArrowWithSphericalPolarCoordinates(polar, azimuthal);
    this.refreshTextInfo(polar, azimuthal, realAlpha, imagAlpha, realBeta, imagBeta);
  }

  setState(state) {
    this.qubit = new Qubit.Qubit(state[0], state[1]);
    this.refreshArrowPosition();
  }

  applyGate(gate) {
    this.qubit.applyGate(gate);
    this.refreshArrowPosition();
  }

  refreshTextInfo(polar, azimuthal, realAlpha, imagAlpha, realBeta, imagBeta) {
    this.infoText.innerText = `Alpha: ${realAlpha.toFixed(4)} ${imagAlpha < 0 ? "" : "+"}${imagAlpha.toFixed(4)}i${
      realAlpha < 0 ? "   " : "    "
    }φ: ${Math.round((azimuthal / Math.PI) * 180)}°
Beta:  ${realBeta.toFixed(4)} ${imagBeta < 0 ? "" : "+"}${imagBeta.toFixed(4)}i${
      realBeta < 0 ? "   " : "    "
    }θ: ${Math.round((polar / Math.PI) * 180)}°`;
  }

  buildGUI(gui) {
    const actions = {
      State0: () => this.setState(Qubit.baseState0),
      State1: () => this.setState(Qubit.baseState1),
      StateM: () => this.setState(Qubit.baseStateM),
      StateP: () => this.setState(Qubit.baseStateP),
      StateMi: () => this.setState(Qubit.baseStateMi),
      StatePi: () => this.setState(Qubit.baseStatePi),
      XGate: () => this.applyGate(Gates.XGate),
      YGate: () => this.applyGate(Gates.YGate),
      ZGate: () => this.applyGate(Gates.ZGate),
      HGate: () => this.applyGate(Gates.HGate),
      SGate: () => this.applyGate(Gates.SGate),
      SNegGate: () => this.applyGate(Gates.SNegGate),
      YHalfGate: () => this.applyGate(Gates.YHalfGate),
      YNegHalfGate: () => this.applyGate(Gates.YNegHalfGate),
      XHalfGate: () => this.applyGate(Gates.XHalfGate),
      XNegHalfGate: () => this.applyGate(Gates.XNegHalfGate),
      TGate: () => this.applyGate(Gates.TGate),
      TNegGate: () => this.applyGate(Gates.TNegGate),
      YQuarterGate: () => this.applyGate(Gates.YQuarterGate),
      YNegQuarterGate: () => this.applyGate(Gates.YNegQuarterGate),
      XQuarterGate: () => this.applyGate(Gates.XQuarterGate),
      XNegQuarterGate: () => this.applyGate(Gates.XNegQuarterGate),
    };

    const setStateFolder = gui.addFolder("Set Qubit State");
    setStateFolder.add(actions, "State0").name("|0⟩");
    setStateFolder.add(actions, "State1").name("|1⟩");
    setStateFolder.add(actions, "StateM").name("|-⟩");
    setStateFolder.add(actions, "StateP").name("|+⟩");
    setStateFolder.add(actions, "StateMi").name("|-i⟩");
    setStateFolder.add(actions, "StatePi").name("|+i⟩");

    const halfTurnsFolder = gui.addFolder("Half Turn Gates");
    halfTurnsFolder.add(actions, "XGate").name("X");
    halfTurnsFolder.add(actions, "YGate").name("Y");
    halfTurnsFolder.add(actions, "ZGate").name("Z");
    halfTurnsFolder.add(actions, "HGate").name("H");

    const quarterTurnsFolder = gui.addFolder("Quarter Turn Gates");
    quarterTurnsFolder.add(actions, "SGate").name("S");
    quarterTurnsFolder.add(actions, "SNegGate").name("S^-1");
    quarterTurnsFolder.add(actions, "YHalfGate").name("Y^½");
    quarterTurnsFolder.add(actions, "YNegHalfGate").name("Y^-½");
    quarterTurnsFolder.add(actions, "XHalfGate").name("X^½");
    quarterTurnsFolder.add(actions, "XNegHalfGate").name("X^-½");

    const eighthTurnsFolder = gui.addFolder("Eighth Turn Gates");
    eighthTurnsFolder.add(actions, "TGate").name("T");
    eighthTurnsFolder.add(actions, "TNegGate").name("T^-1");
    eighthTurnsFolder.add(actions, "YQuarterGate").name("Y^¼");
    eighthTurnsFolder.add(actions, "YNegQuarterGate").name("Y^-¼");
    eighthTurnsFolder.add(actions, "XQuarterGate").name("X^¼");
    eighthTurnsFolder.add(actions, "XNegQuarterGate").name("X^-¼");

    halfTurnsFolder.open();
    quarterTurnsFolder.open();
    eighthTurnsFolder.open();
  }

  getAbsoluteHeight(el) {
    if (!el) return 0;
    el = typeof el === "string" ? document.querySelector(el) : el;
    if (!el) return 0;
    const styles = window.getComputedStyle(el);
    const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
    return Math.ceil(el.offsetHeight + margin);
  }
}
