import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Props = {
  count?: number
  background?: string
  strandWidth?: number
  trail?: number
  color1?: string
  color2?: string
  speeds?: [number, number, number, number, number, number] // baseSpeed, curlSize, outer, radial, emitStrength, emitFriction
  gain?: number
}

export default function IcicleBubbles({
  count = 4000,
  background = 'rgba(23,25,26,1)',
  strandWidth = 2.2,
  trail = 2.2,
  color1 = '#9FD7FF',
  color2 = '#FFFFFF',
  // [forwardSpeed, curlSize, outerScale, radialSpread, emitStrength, emitFriction]
  speeds = [520, 0.0009, 1.0, 60, 2.0, 4.0],
  gain = 1.15,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    // renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    })
    renderer.debug.checkShaderErrors = true
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    wrap.appendChild(renderer.domElement)

    // scene/camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 5000)
    camera.position.z = 1000

    // geometry: два треугольника = полоска
    const corners = new Float32Array([-1, 0, 1, 0, 1, 1, -1, 0, 1, 1, -1, 1])
    const verts = new Float32Array(count * 6 * 2)
    const seeds = new Float32Array(count * 6 * 3)
    const pos = new Float32Array(count * 6 * 3)

    let vi = 0,
      si = 0,
      pi = 0
    for (let i = 0; i < count; i++) {
      const sx = Math.random(),
        sy = Math.random(),
        sz = Math.random()
      for (let k = 0; k < 6; k++) {
        verts[vi++] = corners[k * 2 + 0]
        verts[vi++] = corners[k * 2 + 1]
        seeds[si++] = sx
        seeds[si++] = sy
        seeds[si++] = sz
        pos[pi++] = 0
        pos[pi++] = 0
        pos[pi++] = 0
      }
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geom.setAttribute('corner', new THREE.BufferAttribute(verts, 2))
    geom.setAttribute('seed', new THREE.BufferAttribute(seeds, 3))
    geom.computeBoundingSphere()

    // shaders
    const vertex = `

precision highp float;
attribute vec2 corner;
attribute vec3 seed;

uniform float uTime, uDt, uTrail, uWidth;
uniform vec2  uResolution;

// speeds[]: [uForward, uCurlSize, uOuter, uRadial, uEmitStrength, uEmitFriction]
uniform float uForward;
uniform float uCurlSize;
uniform float uOuter;
uniform float uRadial;
uniform float uEmitStrength;
uniform float uEmitFriction;

varying float vAlpha;
varying float vMix;

/* --- simplex 3D (Ashima) --- */
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.xxx*2.0;
  vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,p3)));
}

vec3 curl(vec3 p){
  float e=0.1;
  vec3 dx=vec3(e,0.0,0.0), dy=vec3(0.0,e,0.0), dz=vec3(0.0,0.0,e);
  float x=snoise(p+dy)-snoise(p-dy);
  float y=snoise(p+dz)-snoise(p-dz);
  float z=snoise(p+dx)-snoise(p-dx);
  const float k=1.0/(2.0*0.1);
  return normalize(vec3(x,y,z)*k);
}

// детерминированный «возраст» [0..1)
float lifeAt(vec3 s, float t){ return fract(t*0.35 + s.x*0.37 + s.y*0.19 + s.z*0.11); }

// равномерное распределение по диску (центр кадра)
vec2 uniformDisk(vec2 u){              // u in [0..1]^2
  float r = sqrt(u.x);
  float a = 6.2831853 * u.y;
  return vec2(cos(a), sin(a)) * r;
}

// позиция: рождение в центре экрана, Z позади, полёт к камере
vec3 positionAt(vec3 s, float t){
  float life = lifeAt(s, t);
  float gain = mix(1.0, uEmitStrength, pow(life, uEmitFriction));

  vec2 disk = uniformDisk(s.xy) * 24.0;     // радиус эмиттера в px (в мире)
  vec3 start = vec3(disk, -600.0);          // позади «экрана» (камера смотрит к -Z)

  // базовая скорость: вперёд к камере (по +Z) + чуть разлёта по XY
  vec3 vel = vec3(normalize(vec3(disk, 0.0)).xy * uRadial, +uForward);

  // curl-шум (мягко)
  vec3 flow = curl((start + vel*life*0.01) * uCurlSize + vec3(t*0.15)) * 70.0;

  vec3 p = start + (vel * gain) * life * 1.2 + flow * life;

  // лёгкое «дыхание» — расширение по возрасту
  p.xy *= (1.0 + uOuter * pow(life, 2.0) * 0.05);

  return p;
}

void main(){
  float t  = uTime;
  float dt = max(uDt, 0.016);
  vec3 p   = positionAt(seed, t);
  vec3 pp  = positionAt(seed, t - dt);

  vec4 clip     = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  vec4 clipPrev = projectionMatrix * modelViewMatrix * vec4(pp,1.0);

  vec2 ndc     = clip.xy     / max(1e-6, clip.w);
  vec2 ndcPrev = clipPrev.xy / max(1e-6, clipPrev.w);
  vec2 dirNDC  = ndc - ndcPrev;

  float speedPx = length(dirNDC * uResolution);
  vec2  dir = normalize(dirNDC + vec2(1e-6, 0.0));
  vec2  nrm = normalize(vec2(-dir.y, dir.x));
  vec2  px2ndc = 2.0 / uResolution;

  float trailPx = clamp(speedPx * uTrail, 8.0, 160.0);

  vec2 offsetNDC = nrm * (corner.x * uWidth) * px2ndc
                 + dir * (corner.y * trailPx) * px2ndc;

  clip.xy += offsetNDC * clip.w;

  vAlpha = (1.0 - corner.y) * smoothstep(0.0, 22.0, trailPx);
  vMix   = lifeAt(seed, t);

  gl_Position = clip;
}
    `

    const fragment = `
precision mediump float;
varying float vAlpha;
varying float vMix;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uGain;
void main(){
  vec3 col = mix(uColor1, uColor2, vMix) * uGain;
  float a = max(vAlpha, 0.08);
  gl_FragColor = vec4(col, a);
  if (gl_FragColor.a < 0.015) discard;
}
    `

    const uniforms = {
      uTime: { value: 0 },
      uDt: { value: 1 / 60 },
      uTrail: { value: trail },
      uWidth: { value: strandWidth },
      uForward: { value: speeds[0] }, // к камере
      uCurlSize: { value: speeds[1] },
      uOuter: { value: speeds[2] },
      uRadial: { value: speeds[3] },
      uEmitStrength: { value: speeds[4] },
      uEmitFriction: { value: speeds[5] },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uGain: { value: gain },
    }

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geom, mat)
    mesh.frustumCulled = false
    scene.add(mesh)

    // resize
    const applySize = () => {
      const w = Math.max(1, wrap.clientWidth | 0)
      const h = Math.max(1, wrap.clientHeight | 0)
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      uniforms.uResolution.value.set(w, h)
    }
    applySize()
    window.addEventListener('resize', applySize)

    // loop
    const clock = new THREE.Clock()
    let raf = 0
    const loop = () => {
      const dt = Math.min(0.05, clock.getDelta())
      uniforms.uDt.value = dt
      uniforms.uTime.value += dt
      raf = requestAnimationFrame(loop)
      renderer.render(scene, camera)
    }
    loop()

    // cleanup
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', applySize)
      geom.dispose()
      mat.dispose?.()
      renderer.dispose()
      wrap.removeChild(renderer.domElement)
    }
  }, [count, strandWidth, trail, color1, color2, speeds, gain])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        inset: 0,
        background,
        overflow: 'hidden',
        borderRadius: 'inherit',
        zIndex: 1,
      }}
      aria-hidden
    />
  )
}
