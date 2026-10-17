// Image-space banks of the actual 1672 × 941 clearing photograph.
// Projected with exactly the landscape's cover, crop and zoom on each viewport.
export const WATER_BANKS = [
  [.715,.585],[.795,.585],[.82,.625],[.835,.69],[.80,.735],[.73,.775],
  [.68,.82],[.65,.87],[.66,.92],[.72,1.02],[.49,1.02],[.45,.94],
  [.33,.91],[.30,.87],[.34,.82],[.40,.765],[.48,.72],[.55,.665],[.65,.62],
] as const;
const CHANNEL = [
  [.745,.594,.025],[.72,.63,.065],[.66,.68,.105],[.575,.735,.135],
  [.49,.795,.12],[.465,.85,.115],[.50,.90,.07],[.61,1.01,.06],
] as const;

export function waterPoint(t: number, lane: number) {
  const distance = Math.max(0, Math.min(.999999, t)) * (CHANNEL.length - 1);
  const index = Math.floor(distance), amount = distance - index;
  const a = CHANNEL[index], b = CHANNEL[index + 1];
  return { u: a[0] + (b[0] - a[0]) * amount + lane * (a[2] + (b[2] - a[2]) * amount),
    v: a[1] + (b[1] - a[1]) * amount };
}

export function waterProjection(width: number, height: number, dawn: number, lookX = 0, lookY = 0) {
  const mobile = width <= 700;
  const planeWidth = width * (mobile ? 1.32 : 1.12), planeHeight = height * (mobile ? 1.08 : 1.12);
  const cover = Math.max(planeWidth / 1672, planeHeight / 941);
  const imageWidth = 1672 * cover, imageHeight = 941 * cover;
  const offsetX = (planeWidth - imageWidth) * (mobile ? .64 : .6) - (planeWidth - width) / 2;
  const offsetY = (planeHeight - imageHeight) * (mobile ? .5 : .46) - (planeHeight - height) / 2;
  const zoom = 1.14 - dawn * .12;
  return (u: number, v: number) => ({
    x: ((u * imageWidth + offsetX - width / 2) * zoom + width / 2 - lookX * 12) / width,
    y: ((v * imageHeight + offsetY - height / 2) * zoom + height / 2 - lookY * 8) / height,
  });
}
