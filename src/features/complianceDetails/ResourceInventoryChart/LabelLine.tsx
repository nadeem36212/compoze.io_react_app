import { getXOffset, getYOffset } from './mathUtils';

interface LabelLineProps {
  cx: number;
  cy: number;
  midAngle: number;
  middleRadius: number;
  radius: number;
}
export const LabelLine = ({
  cx,
  cy,
  midAngle,
  middleRadius,
  radius,
}: LabelLineProps) => {
  const xStart = cx + getXOffset(middleRadius, midAngle);
  const yStart = cy + getYOffset(middleRadius, midAngle);

  const offSetEnd = 2 * radius - middleRadius;
  const xEnd = cx + getXOffset(offSetEnd, midAngle);
  const yEnd = cy + getYOffset(offSetEnd, midAngle) + 2;

  return (
    <polyline
      style={{
        opacity: '0.8',
        fill: 'none',
        stroke: '#595959',
        strokeWidth: '1px',
      }}
      points={`${xStart},${yStart} ${xEnd},${yEnd}`}
    />
  );
};
