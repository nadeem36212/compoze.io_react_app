import { LabelLine } from './LabelLine';
import { getXOffset, getYOffset, getAverage } from './mathUtils';

interface LabelProps {
  datum?: any;
  innerRadius: number;
  radius: number;
  slice: { startAngle: number; endAngle: number };
  nameKey: string;
  valueKey: string;
  cx: number;
  cy: number;
  prefix: string;
}

export const Label = ({
  datum,
  innerRadius,
  radius,
  slice,
  nameKey,
  valueKey,
  cx,
  cy,
  prefix
}: LabelProps) => {
  // calculation
  const middleRadius = getAverage([innerRadius, radius]);
  const midAngle = getAverage([slice.endAngle, slice.startAngle]);
  const labelOffset = radius + middleRadius / 3;
  const x = cx + getXOffset(labelOffset, midAngle);
  const y = cy + getYOffset(labelOffset, midAngle);
  const textAnchor = cx < x ? 'start' : 'end';

  const name: string = datum[nameKey].substring(5);
  const value = datum[valueKey];

  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill='#595959'
        fontFamily='Lato'
        fontSize={15}
        textDecoration='underline'
      >
        {`${name}: ${prefix}${value}`}
      </text>
      <LabelLine
        cx={cx}
        cy={cy}
        middleRadius={middleRadius}
        radius={radius}
        midAngle={midAngle}
      />
    </g>
  );
};
