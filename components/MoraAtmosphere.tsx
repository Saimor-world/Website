'use client';

import { useEffect, useRef, type RefObject, type MutableRefObject } from 'react';
import styles from './MoraAtmosphere.module.css';
import MoraClearing from './MoraClearing';

type Props = {
  dawn: boolean; hurry: boolean; paused: boolean; reduced: boolean; onArrival: () => void; settling?: RefObject<number>; progress?: MutableRefObject<number>;
  look?: RefObject<{ x: number; y: number }>;
};

const VERTEX = `attribute vec2 a_position;
void main(){gl_Position=vec4(a_position,0.,1.);}`;
const FRAGMENT = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_size;
uniform float u_time;
uniform float u_dawn;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float mist(vec2 p){float v=0.,a=.5;mat2 r=mat2(.8,-.6,.6,.8);
for(int i=0;i<4;i++){v+=a*noise(p);p=r*p*2.03+vec2(7.1,3.7);a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_size;
 float aspect=u_size.x/u_size.y;
 vec2 p=vec2(uv.x*aspect,uv.y);
 float d=smoothstep(0.,1.,u_dawn);
 vec2 wind=vec2(u_time*.022,-u_time*.008);
 float deep=mist(p*1.6+wind*.45);
 float fog=mist(p*3.1+vec2(deep*1.8)+wind);
 float near=mist(p*5.2-wind*.8+fog*.7);
 vec2 sun=vec2(.59*aspect,.57);
 float dist=length((p-sun)*vec2(.85,1.));
 float glow=exp(-dist*3.2);
 float heart=exp(-dist*17.);
 float shafts=pow(clamp(mist(vec2((p.x+p.y*.48)*5.5,u_time*.009)),0.,1.),3.);
 vec3 night=mix(vec3(.24,.32,.28),vec3(.40,.50,.42),fog*.85);
 night+=vec3(.14,.20,.16)*pow(near,2.);
 vec3 day=mix(vec3(.18,.26,.22),vec3(.42,.50,.38),uv.y*.5+deep*.35);
 day+=vec3(.72,.48,.19)*glow*(.48+fog*.40);
 day+=vec3(1.,.79,.43)*heart*.75;
 day+=vec3(.8,.64,.37)*shafts*glow*1.4;
 vec3 col=mix(night,day,d);
 float veil=smoothstep(.27,.8,near);
 col=mix(col,mix(vec3(.32,.40,.34),vec3(.58,.60,.44),d),veil*mix(.28,.18,d));
 float edge=(1.-smoothstep(.18,.91,length((uv-.5)*vec2(1.,.82))));
 col*=mix(.82,1.,edge);
 float grain=(hash(gl_FragCoord.xy+mod(u_time*3.,100.))-.5)*.008;
 gl_FragColor=vec4(col+grain,1.);
}`;

/** GPU mist with a CSS fallback. Time stops for pause, reduced motion and hidden tabs. */
export default function MoraAtmosphere(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const controls = useRef(props);
  const resetClock = useRef<((restart: boolean) => void) | null>(null);
  useEffect(() => {
    const restart = controls.current.dawn && !props.dawn;
    controls.current = props;
    resetClock.current?.(restart);
  }, [props]);

  useEffect(() => {
    const element = canvas.current;
    const surface = layer.current;
    if (!element || !surface) return;
    let gl: WebGLRenderingContext | null = null;
    let cleanupGl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    const shaders: WebGLShader[] = [];
    try {
      if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        gl = element.getContext('webgl', {
          alpha: false, antialias: false, depth: false, preserveDrawingBuffer: true,
        });
      }
      cleanupGl = gl;
      if (gl) {
        const compile = (kind: number, source: string) => {
          const shader = gl!.createShader(kind);
          if (!shader) throw new Error('Shader unavailable');
          shaders.push(shader);
          gl!.shaderSource(shader, source); gl!.compileShader(shader);
          if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
            throw new Error(gl!.getShaderInfoLog(shader) || 'Shader unavailable');
          }
          return shader;
        };
        program = gl.createProgram();
        if (!program) throw new Error('Program unavailable');
        gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
        gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Program unavailable');
        gl.useProgram(program);
        buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      }
    } catch (error) {
      surface.dataset.rendererError = error instanceof Error ? error.message : 'GPU unavailable';
      gl = null;
    }
    const renderer = gl;
    let gpuLost = false;
    const loseGpu = (event: Event) => { event.preventDefault(); gpuLost = true; };
    element.addEventListener('webglcontextlost', loseGpu);
    const size = renderer && program ? renderer.getUniformLocation(program, 'u_size') : null;
    const time = renderer && program ? renderer.getUniformLocation(program, 'u_time') : null;
    const dawn = renderer && program ? renderer.getUniformLocation(program, 'u_dawn') : null;
    const resize = () => {
      const bounds = surface.getBoundingClientRect();
      const scale = Math.min(1, 960 / Math.max(bounds.width, 1), 640 / Math.max(bounds.height, 1));
      const width = Math.max(1, Math.round(bounds.width * scale));
      const height = Math.max(1, Math.round(bounds.height * scale));
      // Assigning even the same canvas size clears its drawing buffer.
      if (element.width !== width) element.width = width;
      if (element.height !== height) element.height = height;
      renderer?.viewport(0, 0, element.width, element.height);
    };
    resize();
    const observer = new ResizeObserver(resize); observer.observe(surface);
    let frame = 0, previous = performance.now(), clock = 0, progress = 0;
    let arrived = false, lastClock = -1, lastProgress = -1, lastWidth = 0, lastHeight = 0;
    const syncClock = () => { previous = performance.now(); };
    const restartClock = (restart: boolean) => {
      syncClock();
      if (restart) { progress = 0; arrived = false; lastProgress = -1; }
    };
    resetClock.current = restartClock;
    document.addEventListener('visibilitychange', syncClock);
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.max((now - previous) / 1000, 0); previous = now;
      const c = controls.current;
      const running = !c.paused && !c.reduced && !document.hidden;
      if (running && (!c.dawn || progress < 1)) clock += dt * (1 - (c.settling?.current ?? 0) * .9);
      if (!c.dawn) { progress = 0; arrived = false; }
      else if (c.reduced || (c.paused && c.hurry)) progress = 1;
      else if (running) progress = Math.min(1, progress + dt / (c.hurry ? 1.4 : 8));
      if (progress !== lastProgress) surface.style.setProperty('--dawn', String(progress));
      if (c.progress) c.progress.current = progress;
      const still = String(!running);
      if (surface.dataset.still !== still) surface.dataset.still = still;
      const canRender = renderer && !gpuLost && !renderer.isContextLost();
      const rendered = canRender ? 'true' : 'false';
      if (surface.dataset.rendered !== rendered) surface.dataset.rendered = rendered;
      if (lastClock === clock && lastProgress === progress && lastWidth === element.width &&
          lastHeight === element.height) return;
      lastClock = clock; lastProgress = progress;
      lastWidth = element.width; lastHeight = element.height;
      // The opaque dawn scene no longer needs an invisible full-screen fog pass.
      if (canRender && progress < 1) {
        renderer.uniform2f(size, element.width, element.height);
        renderer.uniform1f(time, clock); renderer.uniform1f(dawn, progress);
        renderer.drawArrays(renderer.TRIANGLE_STRIP, 0, 4);
      }
      const phase = progress === 1 ? 'morning' : 'mist';
      if (surface.dataset.dawn !== phase) surface.dataset.dawn = phase;
      // The title arrives only after both the fallback and GPU have the morning.
      if (progress === 1 && !arrived) { arrived = true; c.onArrival(); }
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      resetClock.current = null;
      document.removeEventListener('visibilitychange', syncClock);
      element.removeEventListener('webglcontextlost', loseGpu);
      if (cleanupGl) {
        if (buffer) cleanupGl.deleteBuffer(buffer);
        if (program) cleanupGl.deleteProgram(program);
        shaders.forEach(shader => cleanupGl!.deleteShader(shader));
      }
    };
  }, []);

  return <div ref={layer} className={styles.atmosphere} aria-hidden="true">
    <MoraClearing look={props.look} still={props.paused || props.reduced} />
    <div className={styles.fallback}><i /><i /><i /></div>
    <canvas ref={canvas} className={styles.canvas} />
  </div>;
}
