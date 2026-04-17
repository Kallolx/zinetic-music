"use client";

import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from "ogl";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { UNIVERSAL_EXPLORE_CARDS } from "./sections/FeaturePageSections";

import "./CircularGallery.css";

type GL = Renderer["gl"];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(
  gl: GL,
  text: string,
  font: string = "bold 30px monospace",
  color: string = "black",
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get 2d context");

  context.letterSpacing = "-2px";
  context.font = font;

  let lines = text.split(" ");
  if (lines.length > 2) {
    // Join first two words if there are more than 2 (e.g., "Analytics & Insights" -> ["Analytics &", "Insights"])
    lines = [lines[0] + " " + lines[1], lines.slice(2).join(" ")];
  }

  let maxWidth = 0;
  lines.forEach((line) => {
    const m = context.measureText(line);
    maxWidth = Math.max(maxWidth, m.width);
  });

  const textWidth = Math.ceil(maxWidth);
  const fontSize = getFontSize(font);
  const lineSpan = fontSize * 1.1;
  const textHeight = Math.ceil(lineSpan * lines.length);

  const resolution = 4;
  canvas.width = (textWidth + 40) * resolution;
  canvas.height = (textHeight + 40) * resolution;

  context.scale(resolution, resolution);
  context.letterSpacing = "-2px";
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);

  lines.forEach((line, i) => {
    const y =
      (textHeight + 40) / 2 -
      ((lines.length - 1) * lineSpan) / 2 +
      i * lineSpan;
    context.fillText(line, (textWidth + 40) / 2, y);
  });

  const texture = new Texture(gl, {
    generateMipmaps: true,
    minFilter: gl.LINEAR_MIPMAP_LINEAR,
    magFilter: gl.LINEAR,
    anisotropy: 16,
  });
  texture.image = canvas;
  return {
    texture,
    width: canvas.width / resolution,
    height: canvas.height / resolution,
  };
}

class TitleTexture {
  gl: GL;
  text: string;
  textColor: string;
  font: string;
  texture!: Texture;
  width!: number;
  height!: number;

  constructor(gl: GL, text: string, textColor: string, font: string) {
    this.gl = gl;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.update();
  }

  update() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
    );
    this.texture = texture;
    this.width = width;
    this.height = height;
  }
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  image?: string;
  color?: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  href?: string;
  borderRadius?: number;
  font?: string;
}

class Media {
  extra: number = 0;
  geometry: Plane;
  gl: GL;
  image: string;
  href: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius: number;
  font?: string;
  program!: Program;
  plane!: Mesh;
  titleTexture!: TitleTexture;
  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;
  isMobile: boolean = false;

  constructor({
    geometry,
    gl,
    image,
    color = "#10b981", // Default color
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    href,
    borderRadius = 0,
    font,
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image || "";
    this.href = href || "";
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createTitleTexture();
    this.createShader(color);
    this.createMesh();
    this.onResize();
  }

  createShader(boxColor: string) {
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
      minFilter: this.gl.LINEAR_MIPMAP_LINEAR,
      magFilter: this.gl.LINEAR,
      anisotropy: 16,
    });

    // Parse hex color to vec3
    const hexToRgb = (hex: string) => {
      const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
      return match
        ? [
            parseInt(match[1], 16) / 255,
            parseInt(match[2], 16) / 255,
            parseInt(match[3], 16) / 255,
          ]
        : [0.5, 0.5, 0.5];
    };

    const shaderColor = hexToRgb(boxColor);

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = 0.0; 
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec3 uColor;
        uniform sampler2D tMap;
        uniform sampler2D tText;
        uniform float uBorderRadius;
        uniform float uUseTexture;
        uniform float uTextAspect;
        uniform float uOpacity;
        uniform vec2 uPlaneSizes;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec3 color = uColor;
          float cardAspect = uPlaneSizes.x / uPlaneSizes.y;
          
          // 1. Icon Rendering (Middle) - Aspect Corrected
          if (uUseTexture > 0.5) {
            float iconScale = 0.38;
            vec2 iconSize = vec2(iconScale / cardAspect, iconScale);
            vec2 iconUv = (vUv - vec2(0.5, 0.60)) / iconSize + 0.5;
            
            if (iconUv.x >= 0.0 && iconUv.x <= 1.0 && iconUv.y >= 0.0 && iconUv.y <= 1.0) {
              vec4 texColor = texture2D(tMap, iconUv);
              color = mix(color, texColor.rgb, texColor.a);
            }
          }

          // 2. Title Rendering (Bottom) - Aspect Corrected
          float textScaleY = 0.30; // Substantially increased for visibility
          float textScaleX = textScaleY * uTextAspect / cardAspect;
          
          vec2 textUv = (vUv - vec2(0.5, 0.30)) / vec2(textScaleX, textScaleY) + 0.5;
          if (textUv.x >= 0.0 && textUv.x <= 1.0 && textUv.y >= 0.0 && textUv.y <= 1.0) {
            vec4 textColor = texture2D(tText, textUv);
            color = mix(color, textColor.rgb, textColor.a);
          }
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color, alpha * uOpacity);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        tText: { value: this.titleTexture.texture },
        uColor: { value: shaderColor },
        uUseTexture: { value: this.image ? 1.0 : 0.0 },
        uTextAspect: {
          value: this.titleTexture.width / this.titleTexture.height,
        },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
        uOpacity: { value: 1.0 },
      },
      transparent: true,
    });

    if (this.image) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = this.image;
      img.onload = () => {
        // High-res rasterization for SVGs: draw to a 512x512 canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const targetSize = 512;
        canvas.width = targetSize;
        canvas.height = targetSize;

        if (ctx) {
          // Maintain aspect ratio or just center it
          const scale =
            Math.min(
              targetSize / img.naturalWidth,
              targetSize / img.naturalHeight,
            ) * 0.9;
          const w = img.naturalWidth * scale;
          const h = img.naturalHeight * scale;
          ctx.drawImage(img, (targetSize - w) / 2, (targetSize - h) / 2, w, h);

          texture.image = canvas;
          texture.needsUpdate = true;
          this.program.uniforms.uImageSizes.value = [targetSize, targetSize];
        }
      };
    }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitleTexture() {
    this.titleTexture = new TitleTexture(
      this.gl,
      this.text,
      this.textColor,
      this.font || "bold 30px sans-serif",
    );
  }

  update(
    scroll: { current: number; last: number },
    direction: "right" | "left",
  ) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    const activeBend = this.isMobile ? 0 : this.bend;

    if (activeBend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(activeBend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (activeBend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    // Focal Opacity Logic with Temporal Easing
    const distFromCenter = Math.abs(this.plane.position.x);
    // Normalized distance (scaled to be roughly 1.0 at neighbor cards)
    const normalizedDist = Math.min(
      distFromCenter / (this.plane.scale.x * 1.5),
      1.0,
    );

    // Non-linear target: drops quickly to 0.7, then slower to 0.5
    const targetOpacity = 1.0 - Math.pow(normalizedDist, 0.7) * 0.5;

    // Smooth temporal interpolation (easing)
    const currentOpacity = this.program.uniforms.uOpacity.value;
    const easingFactor = 0.08; // Lower is smoother/slower
    this.program.uniforms.uOpacity.value =
      currentOpacity + (targetOpacity - currentOpacity) * easingFactor;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({
    screen,
    viewport,
  }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [
          this.viewport.width,
          this.viewport.height,
        ];
      }
    }
    this.isMobile = this.screen.width < 768;
    this.scale = this.screen.height / 1500;
    this.plane.scale.y =
      (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];
    this.padding = this.isMobile ? 0.2 : 1;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;

    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface AppConfig {
  items?: { image?: string; text: string; color?: string; href?: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  onCardClick?: (href: string) => void;
}

class App {
  container: HTMLElement;
  onCardClick?: (href: string) => void;
  scrollSpeed: number;
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
  };
  onCheckDebounce: (...args: any[]) => void;
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: {
    image?: string;
    text: string;
    color?: string;
    href?: string;
  }[] = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;

  boundOnResize!: () => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: (e: MouseEvent | TouchEvent) => void;

  isDown: boolean = false;
  start: number = 0;
  startTime: number = 0;
  startPos: { x: number; y: number } = { x: 0, y: 0 };

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = "#ffffff",
      borderRadius = 0,
      font = 'bold 30px "DM Sans", sans-serif',
      scrollSpeed = 2,
      scrollEase = 0.05,
      onCardClick,
    }: AppConfig,
  ) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.onCardClick = onCardClick;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias(
    items: { image?: string; text: string; color?: string }[] | undefined,
    bend: number = 1,
    textColor: string,
    borderRadius: number,
    font: string,
  ) {
    const defaultItems = UNIVERSAL_EXPLORE_CARDS.map((card) => ({
      text: card.title,
      image: card.icon,
      href: card.href,
      color:
        card.color === "purple"
          ? "#4E2BB0"
          : card.color === "orange"
            ? "#FF6A00"
            : card.color === "green"
              ? "#01AE3F"
              : "#008DFF",
    }));
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        color: data.color,
        href: data.href,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      });
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    this.start = clientX;
    this.startTime = Date.now();
    this.startPos = { x: clientX, y: clientY };
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp(e: MouseEvent | TouchEvent) {
    this.isDown = false;
    this.onCheck();

    // Check if it was a click (not a drag)
    const clientX =
      "touches" in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;

    const timeDiff = Date.now() - this.startTime;
    const dist = Math.hypot(
      clientX - this.startPos.x,
      clientY - this.startPos.y,
    );

    if (timeDiff < 250 && dist < 10 && this.onCardClick) {
      const rect = this.gl.canvas.getBoundingClientRect();
      const xNorm = ((clientX - rect.left) / rect.width) * 2 - 1;
      const xWorld = xNorm * (this.viewport.width / 2);

      // Find the card closest to the hit (on X axis)
      let closestMedia = null;
      let minDis = Infinity;

      for (const media of this.medias) {
        // Vertical hit check (optional but recommended)
        const yNorm = 1 - ((clientY - rect.top) / rect.height) * 2;
        const yWorld = yNorm * (this.viewport.height / 2);

        const dx = Math.abs(media.plane.position.x - xWorld);
        const dy = Math.abs(media.plane.position.y - yWorld);

        // Check if cursor is roughly within the plane's scale
        if (dx < media.plane.scale.x / 2 && dy < media.plane.scale.y / 2) {
          if (dx < minDis) {
            minDis = dx;
            closestMedia = media;
          }
        }
      }

      if (closestMedia && closestMedia.href) {
        this.onCardClick(closestMedia.href);
      }
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport }),
      );
    }
  }

  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease,
    );
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener("resize", this.boundOnResize);
    this.container.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    this.container.addEventListener("touchstart", this.boundOnTouchDown);
    window.addEventListener("touchmove", this.boundOnTouchMove);
    window.addEventListener("touchend", this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    this.container.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    this.container.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    if (
      this.renderer &&
      this.renderer.gl &&
      this.renderer.gl.canvas.parentNode
    ) {
      this.renderer.gl.canvas.parentNode.removeChild(
        this.renderer.gl.canvas as HTMLCanvasElement,
      );
    }
  }
}

interface CircularGalleryProps {
  items?: { image?: string; text: string; color?: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = 'bold 100px "Outfit", sans-serif',
  scrollSpeed = 2,
  scrollEase = 0.07,
}: CircularGalleryProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      onCardClick: (href) => router.push(href),
    });
    return () => {
      app.destroy();
    };
  }, [
    items,
    bend,
    textColor,
    borderRadius,
    font,
    scrollSpeed,
    scrollEase,
    router,
  ]);
  return <div className="circular-gallery cursor-pointer" ref={containerRef} />;
}
