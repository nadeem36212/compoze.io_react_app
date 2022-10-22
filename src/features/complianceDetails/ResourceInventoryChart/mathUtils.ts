export const radian = Math.PI / 180;
export const getXOffsetMultiplayerByAngle = (angle: number) =>
  Math.cos(angle - 90 * radian);
export const getYOffsetMultiplayerByAngle = (angle: number) =>
  Math.sin(angle - 90 * radian);
export const getXOffset = (offset: number, angle: number) =>
  offset * getXOffsetMultiplayerByAngle(angle);
export const getYOffset = (offset: number, angle: number) =>
  offset * getYOffsetMultiplayerByAngle(angle);
export const getAverage = (array: any) =>
  array.reduce((acc: number, cur: number) => acc + cur, 0) / array.length;
