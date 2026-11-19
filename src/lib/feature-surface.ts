// Illustrative surface, independent of any project's training data.
export const mesh = Array.from({length: 43}, (_, row) => {
  const v = row / 21 - 1;
  return Array.from({length: 63}, (_, column) => {
    const u = column / 31 - 1;
    const peak = .76 * Math.exp(-4.8 * ((u-.18)**2 + (v+.12)**2));
    const ridge = .42 * Math.exp(-10 * (u+.37+.24*Math.sin(3*v))**2 - 1.6*v*v);
    const ripple = .10 * Math.sin(6*u-4*v) * Math.exp(-1.3*(u*u+v*v));
    return {u, v, h:peak + ridge + ripple};
  });
});

export function projectPoint(point: {u:number; v:number; h:number}, angle: number, size:number) {
  const {u,v,h} = point;
  return [
    (u * Math.cos(angle) - v * Math.sin(angle)) * size * .34,
    ((u * Math.sin(angle) + v * Math.cos(angle)) * .48 - h*1.55 + .27) * size * .34,
  ];
}
