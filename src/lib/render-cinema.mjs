// Offline artwork renderer. Run node src/lib/render-cinema.mjs from the repository root.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const tau = 2 * Math.PI;
const sin = Math.sin, cos = Math.cos;
const fixed = value => value.toFixed(2);
const directory = "public/cinema";
await mkdir(directory, { recursive: true });
const palette = [[36,33,30], [178,145,120], [250,218,180]];

function color(light) {
  const low = light < 0.68 ? 0 : 1;
  const t = Math.min(1, Math.max(0, low ? (light - 0.68) / 0.32 : light / 0.68));
  return "#" + palette[low].map((v,k) => Math.round(v + (palette[low+1][k]-v)*t).toString(16).padStart(2,"0")).join("");
}
function draw(name, count, samples, surface, view, light) {
  const faces = [];
  for (let i=0;i<count;i++) {
    const t = i / (count-1);
    for (let j=0;j<samples;j++) {
      const u = j/samples, v = (j+1)/samples;
      const corners = [[u,0],[v,0],[v,1],[u,1]].map(([s,b]) => view(surface(t,s,b)));
      const depth = corners.reduce((sum,p) => sum+p[2],0)/4;
      const fill = color(light(t,(u+v)/2,i));
      const points = corners.map(([x,y])=>fixed(540+x)+","+fixed(540-y)).join(" ");
      faces.push([depth,'<polygon points="'+points+'" fill="'+fill+'" stroke="'+fill+'" stroke-width="0.72"/>']);
    }
  }
  faces.sort((a,b)=>a[0]-b[0]);
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">'+faces.map(f=>f[1]).join("")+'</svg>';
  return sharp(Buffer.from(svg)).resize(900,900).webp({quality:84,alphaQuality:95,effort:5}).toFile(directory+"/"+name+".webp");
}
function camera(ax,ay,az) {
  return ([x,y,z]) => {
    const xx=x*cos(ay)+z*sin(ay), zz=-x*sin(ay)+z*cos(ay);
    const yy=y*cos(ax)-zz*sin(ax), depth=y*sin(ax)+zz*cos(ax);
    return [xx*cos(az)-yy*sin(az),xx*sin(az)+yy*cos(az),depth];
  };
}
// A stack of rounded, twisted, annular sections. The open centre is actual alpha.
await draw("aperture",55,140,(t,u,b)=>{
  const a=tau*u, n=.72, r=(332+53*sin(Math.PI*t))*(b?.84:1);
  const x=Math.sign(cos(a))*Math.abs(cos(a))**n*r;
  const y=Math.sign(sin(a))*Math.abs(sin(a))**n*r;
  const twist=.15+.92*t;
  return [x*cos(twist)-y*sin(twist),x*sin(twist)+y*cos(twist),(t-.5)*261+(b?-2:0)];
},camera(-.29,.47,-.16),(t,u,i)=>{
  const a=tau*u+.85*t;
  return .12+.39*(.5+.5*cos(a-1.6))+.47*Math.max(0,cos(2*a-.8))**9+.08*t+(i%9===0?.06:0);
});
// Two sheets converge along a shared axis, representing semantic alignment.
await draw("resupulse",76,94,(t,u,b)=>{
  const a=(u-.5)*2.05, s=(t-.5)*2;
  const x=430*a, y=s*156*cos(a*3.6)+118*sin(a*3.1)+b*2.6;
  return [x,y,176*s*sin(a*3.6)+35*cos(a*3.1)];
},camera(-.27,-.25,.27),(t,u)=>.21+.42*(.5+.5*cos(7*u+3*t))+.36*Math.max(0,cos(8*u-1.7*t))**6);
// Fanned document leaves with raised edges, like a cut section through a report.
await draw("finsight",49,120,(t,u,b)=>{
  const a=tau*u, signSquare=v=>Math.sign(v)*Math.abs(v)**.23;
  const x=signSquare(cos(a))*(b?305:315), y=signSquare(sin(a))*(b?187:197);
  const r=(t-.4)*.59;
  return [x*cos(r)-y*sin(r),x*sin(r)+y*cos(r),(t-.5)*335];
},camera(.9,-.46,-.21),(t,u,i)=>.18+.46*(.5+.5*cos(tau*u-.2))+.26*Math.max(0,cos(2*tau*u+.9*t))**8+(i%8===0?.09:0));
// An acoustic wave rendered as a sequence of changing membrane cross sections.
await draw("attendo",73,104,(t,u,b)=>{
  const a=tau*u, r=(125+109*(.5+.5*cos(t*11-.8))**1.4)*(b?.958:1);
  return [(t-.5)*690, r*cos(a),r*sin(a)];
},camera(-.35,.56,.23),(t,u)=>.15+.53*(.5+.5*cos(tau*u-.8))+.28*Math.max(0,cos(tau*u*2+.6*t))**7);

