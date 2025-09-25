// HeroIcicleBubbles.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/** === VERTEX: центр -> глубина -> вихрь === */
const vertexShader = `
  float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
  float noise(vec3 p){
    vec3 i = floor(p), f = fract(p);
    f = f*f*(3.0-2.0*f);
    float n = mix(
      mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z);
    return n;
  }

  vec2 vortex(vec2 p, vec2 c, float k){
    vec2 d = p - c;
    float r2 = max(dot(d,d), 0.006);
    vec2 tangential = vec2(-d.y, d.x) / r2;
    return k * tangential;
  }

  uniform float uTime, uFlow, uDepth;
  uniform float uSize, uDPR, uTwist, uRadial, uJitter;
  uniform vec2  uCenter;
  uniform vec2  uC0; uniform float uK0;
  uniform vec2  uC1; uniform float uK1;
  uniform vec2  uC2; uniform float uK2;

  attribute vec3 aStart;
  // seed для мерцания и «стипплинга» в fragment
  attribute float aSeed;

  varying float vDepth01;
  varying float vSeed;

  void main(){
    // бесконечная прокрутка по Z
    float z = mod(aStart.z + uTime * uFlow, uDepth) - uDepth;
    float prog = (z + uDepth) / uDepth; // 0..1

    // радиальное расширение (ближе к камере шире)
    vec2 pxy = aStart.xy;
    vec2 toCenter = normalize(pxy - uCenter);
    pxy += toCenter * uRadial * prog;

    // вихри (центры слегка "дышат")
    vec2 c0 = uC0 + 0.4*vec2(sin(uTime*0.35), cos(uTime*0.22));
    vec2 c1 = uC1 + 0.4*vec2(sin(uTime*0.27+1.3), cos(uTime*0.31+0.7));
    vec2 c2 = uC2 + 0.4*vec2(sin(uTime*0.19-0.8), cos(uTime*0.29-1.2));
    vec2 v = vec2(0.0);
    v += vortex(pxy, c0, uK0);
    v += vortex(pxy, c1, uK1);
    v += vortex(pxy, c2, uK2);
    pxy += uTwist * v;

    // лёгкая «зернистость»
    float n = noise(vec3(pxy*0.35, uTime*0.6));
    pxy += (n - 0.5) * uJitter;

    vec3 p = vec3(pxy, z);

    // перспектива
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = uSize * (260.0 / -mv.z) * uDPR; // аккуратный размер
    gl_PointSize = clamp(size, 0.8, 7.0);

    vDepth01 = prog;      // для затухания и цвета
    vSeed = aSeed;        // для стриплинга/мерцания
  }
`

/** === FRAGMENT: "льдинки" (icicles) — зернистые и мерцающие === */
const fragmentShader = `
  precision highp float;
  varying float vDepth01;
  varying float vSeed;

  uniform vec3 uColorNear; // почти белый
  uniform vec3 uColorFar;  // холодный голубой
  uniform float uGlow;
  uniform float uGrain;    // зернистость
  uniform float uFade;     // затухание дальних
  uniform float uBlink;    // сила мерцания

  // простая псевдослучайная функция
  float rand(float x){ return fract(sin(x) * 43758.5453123); }

  void main(){
    // мягкий диск
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    float disk = smoothstep(0.5, 0.0, r);

    // зернистый «стипплинг»: часть пикселей отбрасываем
    float grain = rand(floor((uv.x+0.5)*8.0) + floor((uv.y+0.5)*8.0) * 57.0 + vSeed*251.0);
    float stipple = step(uGrain, grain); // чем выше uGrain, тем «дырчатее»

    // глубинное затухание: дальние тусклее
    float depthFade = mix(1.0, 0.25, pow(1.0 - vDepth01, uFade));

    // лёгкое мерцание
    float blink = 0.85 + 0.15 * sin((vSeed*123.0) + vDepth01*12.0);

    vec3 col = mix(uColorFar, uColorNear, pow(vDepth01, 0.6));
    float alpha = disk * stipple * depthFade * blink;

    // центральное свечение для «льдинок»
    alpha += (1.0 - smoothstep(0.10, 0.45, r)) * uGlow;

    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`

type Props = {
  count?: number
  spread?: number // масштаб сцены по XY
  depth?: number // глубина тоннеля
  flow?: number // скорость пролёта
  size?: number // базовый размер точки
  twist?: number // сила закручивания
  radial?: number // сила разлёта от центра
  jitter?: number // дрожание
  background?: string
}

export default function HeroIcicleBubbles({
  count = 10000, // больше частиц = мягче узоры
  spread = 100.5,
  depth = 100,
  flow = 4.2,
  size = 10.2, // МАЛЕНЬКИЕ точки — это критично
  twist = 1.15,
  radial = 100,
  jitter = 1.9,
  background = '#17191A',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current!
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 0)
    // мягкая экспозиция, чтобы не «выбивало» в белый
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.9
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, 16 / 9, 0.1, 100)
    camera.position.z = 6

    // ====== СПАВН: ГАУСС ВОКРУГ ЦЕНТРА ======
    const gaussian = () => {
      let u = Math.random() || 1e-6
      let v = Math.random() || 1e-6
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    }

    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const j = i * 3
      const sigma = spread * 0.65 // под 16:9 — самое то
      positions[j + 0] = gaussian() * sigma
      positions[j + 1] = gaussian() * sigma
      positions[j + 2] = -Math.random() * depth
      seeds[i] = Math.random() * 1000.0
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('aStart', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geo.computeBoundingSphere()

    const uniforms = {
      uTime: { value: 0 },
      uFlow: { value: flow },
      uDepth: { value: depth },
      uSize: { value: size },
      uDPR: { value: dpr },
      uTwist: { value: twist },
      uRadial: { value: radial },
      uJitter: { value: jitter },
      uCenter: { value: new THREE.Vector2(0.0, 0.0) },

      // три вихря вокруг центра (симметрично)
      uC0: { value: new THREE.Vector2(-spread * 0.9, spread * 0.3) },
      uC1: { value: new THREE.Vector2(0.0, -spread * 0.45) },
      uC2: { value: new THREE.Vector2(spread * 0.9, spread * 0.25) },
      uK0: { value: 7.0 },
      uK1: { value: -8.5 },
      uK2: { value: 6.5 },

      uColorNear: { value: new THREE.Color('#F6FAFF') }, // почти белый
      uColorFar: { value: new THREE.Color('#7FCCF3') }, // холодный голубой
      uGlow: { value: 0.12 },
      uGrain: { value: 0.35 }, // ↑ = более «дырчато» (icicle look)
      uFade: { value: 1.3 }, // затухание дальних
    }

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    })

    const pts = new THREE.Points(geo, mat)
    pts.frustumCulled = false
    scene.add(pts)

    const resize = () => {
      const w = el.clientWidth || 1
      const h = el.clientHeight || 1
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    const clock = new THREE.Clock()
    let raf = 0
    const loop = () => {
      uniforms.uTime.value += clock.getDelta()
      raf = requestAnimationFrame(loop)
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      scene.remove(pts)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === el) el.removeChild(renderer.domElement)
    }
  }, [count, depth, flow, jitter, radial, size, spread, twist])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 320,
        background,
        overflow: 'hidden',
        borderRadius: 24,
      }}
      aria-hidden
    />
  )
}
