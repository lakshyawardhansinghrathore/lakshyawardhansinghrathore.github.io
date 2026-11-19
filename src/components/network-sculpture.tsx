"use client";

import { useEffect, useRef } from "react";
import { mesh, projectPoint } from "@/lib/feature-surface";

export function NetworkSculpture() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const quiet = matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse), (max-width: 740px)");
    let width = 0, height = 0, target = 0, tilt = 0;
    let visible = false, frame = 0;
    function draw() {
      if (!context) return;
      context.clearRect(0,0,width,height);
      const angle = .54 + tilt;
      const size = Math.min(width,height*1.25);
      const gradient = context.createLinearGradient(width*.1,height*.65,width*.83,height*.26);
      gradient.addColorStop(0,"#aa7659"); gradient.addColorStop(.48,"#edc8a3"); gradient.addColorStop(1,"#f0e7d9");
      context.strokeStyle = gradient;
      context.lineWidth = .9;
      const readingPosition = Math.min(1, Math.max(0, scrollY / Math.max(height, 1)));
      const slice = Math.round(8 + readingPosition * (mesh.length - 16));
      let previous: number[][] | undefined;
      for (const [rowIndex,row] of mesh.entries()) {
        const points = row.map(point => {
          const [x,y] = projectPoint(point,angle,size);
          return [width*.5+x,height*.50+y];
        });
        if (previous) {
          context.beginPath();
          previous.forEach(([x,y],i) => i ? context.lineTo(x,y) : context.moveTo(x,y));
          for (let i=points.length-1;i>=0;i--) context.lineTo(points[i][0],points[i][1]);
          context.closePath(); context.fillStyle = "#26221e"; context.fill();
          context.beginPath();
          for (let i=0;i<points.length;i+=4) {
            context.moveTo(previous[i][0],previous[i][1]); context.lineTo(points[i][0],points[i][1]);
          }
          context.globalAlpha=.38; context.stroke(); context.globalAlpha=1;
        }
        context.beginPath();
        points.forEach(([x,y],i)=>i ? context.lineTo(x,y) : context.moveTo(x,y));
        context.strokeStyle = rowIndex === slice ? "#ffdbb2" : gradient;
        context.lineWidth = rowIndex === slice ? 2.15 : .9;
        context.globalAlpha = rowIndex === slice ? 1 : .59 + rowIndex/mesh.length*.3;
        context.stroke(); context.globalAlpha=1;
        previous=points;
      }

      // Project the highlighted mesh row onto a common height axis.
      // Both views use exactly the same samples as the reader scrolls.
      const crossSection = mesh[slice];
      const left = width * .11, right = width * .89, baseline = height * .93;
      context.beginPath();
      context.moveTo(left, baseline);
      context.lineTo(right, baseline);
      context.strokeStyle = "#ae968466";
      context.lineWidth = 1;
      context.stroke();
      context.beginPath();
      crossSection.forEach(({u, h}, i) => {
        const x = left + (u + 1) * .5 * (right - left);
        const y = baseline - h * height * .12;
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.strokeStyle = "#efc296";
      context.lineWidth = 1.6;
      context.stroke();
    }
    function render() {
      frame = 0;
      if (!visible || document.hidden) return;
      tilt += (target - tilt) * .24;
      draw();
      if (Math.abs(target - tilt) > .001) schedule();
    }
    function schedule() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(render);
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(devicePixelRatio, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      schedule();
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) window.addEventListener("scroll", schedule, { passive:true });
      else window.removeEventListener("scroll", schedule);
      schedule();
    });
    function move(e:PointerEvent) {
      if (quiet.matches) return;
      target = (e.offsetX / Math.max(width,1) - .5) * .32;
      schedule();
    }
    function leave() { target=0; schedule(); }
    resize.observe(canvas); observer.observe(canvas);
    quiet.addEventListener("change",schedule); document.addEventListener("visibilitychange",schedule);
    canvas.addEventListener("pointermove",move); canvas.addEventListener("pointerleave",leave);
    return ()=>{cancelAnimationFrame(frame); window.removeEventListener("scroll",schedule); resize.disconnect(); observer.disconnect();
      quiet.removeEventListener("change",schedule); document.removeEventListener("visibilitychange",schedule);
      canvas.removeEventListener("pointermove",move); canvas.removeEventListener("pointerleave",leave);};
  },[]);
  return <canvas className="sculpture" ref={ref} aria-hidden="true"/>;
}

