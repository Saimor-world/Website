// Runs inline in <head> before first paint. Adds `html.lite` on weak hardware so
// heavy effects (blur, infinite animations, particles, parallax) are switched off.
// iOS Safari caps hardwareConcurrency (often 2–4) on every iPhone, so the CPU check is skipped there.
// Override: ?lite=1 / ?lite=0 (remembered). Runtime fps probe remembers a slow device for
// LITE_SLOW_TTL_MS only, and measures once the page is idle, so one heavy first load never sticks.
// Lite switches off costly effects only (blur, shaders, particles); cheap transform/opacity motion
// such as Pixel MÔRA in the hero ([data-cheap-motion]) keeps running (see app/globals.css).
export const LITE_SLOW_TTL_MS = 3 * 24 * 60 * 60 * 1000;
export const LITE_MODE_SCRIPT = `(function(){try{
var d=document.documentElement,K='saimor-lite',ls=window.localStorage,q=/[?&]lite=([01])/.exec(location.search);
if(q){ls.setItem(K,q[1]==='1'?'force':'off')}
var st=ls.getItem(K);if(st==='off')return;
var sl=/^slow:([0-9]+)$/.exec(st||'');if(st==='slow'||(sl&&Date.now()-Number(sl[1])>${LITE_SLOW_TTL_MS})){ls.removeItem(K);st=null}else if(sl){st='slow'}
var on=function(r){if(d.classList.contains('lite'))return;d.classList.add('lite');d.setAttribute('data-lite',r);try{window.dispatchEvent(new Event('saimor-lite'))}catch(e){}};
if(st==='force'||st==='slow'){on(st);return}
var n=navigator,c=n.connection,ios=/iP(hone|ad|od)/.test(n.userAgent)||(n.platform==='MacIntel'&&n.maxTouchPoints>1);
if(!ios&&n.hardwareConcurrency&&n.hardwareConcurrency<=4){on('cpu');return}
if(n.deviceMemory&&n.deviceMemory<=4){on('mem');return}
if(c&&c.saveData){on('save');return}
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){on('motion');return}
try{var cv=document.createElement('canvas'),g=cv.getContext('webgl')||cv.getContext('experimental-webgl');
if(!g){on('nogl');return}
var x=g.getExtension('WEBGL_debug_renderer_info'),rn=String(x?g.getParameter(x.UNMASKED_RENDERER_WEBGL):g.getParameter(g.RENDERER));
if(/swiftshader|llvmpipe|softpipe|basic render|software/i.test(rn)){on('gl');return}
var lc=g.getExtension('WEBGL_lose_context');if(lc)lc.loseContext()}catch(e){}
var t0=0,f=0,probe=function(t){if(!t0)t0=t;f++;if(t-t0<2000){requestAnimationFrame(probe);return}
var fps=f*1000/(t-t0);if(fps<40&&!document.hidden){ls.setItem(K,'slow:'+Date.now());on('fps')}};
var idle=window.requestIdleCallback||function(cb){return setTimeout(cb,1500)};
window.addEventListener('load',function(){setTimeout(function(){idle(function(){if(!document.hidden)requestAnimationFrame(probe)},{timeout:4000})},1200)});
}catch(e){}})();`;

export function isLiteMode() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('lite');
}
