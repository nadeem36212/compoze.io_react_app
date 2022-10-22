import { VictoryPie } from 'victory';
import { Label } from './Label';
import { Box, Heading } from '@chakra-ui/react';
import { Card } from '../../../components/Card';

const PieChartColors = [
  '#FFD572',
  '#FD95D3',
  '#57E365',
  '#6BCAFA',
  '#F18A90',
  '#917EF7',
  '#FF7A42',
  '#8AFFEA',
  '#BEFF8B',
  '#FE6C6C',
];

export const ResourceChart = ({
  title,
  resourceTotal,
  innerRadius,
  radius,
  height,
  width,
  data,
  nameKey,
  valueKey,
  prefix,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const total = `$${nameKey}`
  return (
    <Card w='65%' h='100%'>
      <Heading as='h1' size='xl' variant='med-dark'>
        {title}
      </Heading>
      <Box overflowX='auto'>
        <svg width={width} height={height}>
          <VictoryPie
            standalone={false}
            height={height}
            width={width}
            innerRadius={innerRadius}
            colorScale={PieChartColors}
            animate={{ duration: 300 }}
            data={data}
            x={nameKey}
            y={valueKey}
            startAngle={-90}
            radius={({ index }) => 115 + index * -3}
            labelComponent={
              <Label
                innerRadius={innerRadius}
                radius={radius}
                nameKey={nameKey}
                valueKey={valueKey}
                cx={centerX}
                cy={centerY}
                prefix={prefix}
              />
            }
          />
          <circle
            cx={width / 2}
            cy={height / 2}
            r={innerRadius}
            fill='white'
            style={{ filter: 'drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.15))' }}
          />
          <circle
            cx={width / 2}
            cy={height / 2}
            r={innerRadius - 5}
            fill='white'
            opacity={0.1}
            stroke='#454459'
            strokeWidth='1px'
            className='chart'
          />
          <text
            x={width / 2}
            y={height / 2}
            textAnchor='middle'
            alignmentBaseline='middle'
            fill='#595959'
            fontSize={30}
          >
            {resourceTotal}
          </text>
        </svg>
      </Box>
    </Card>
  );
};

ResourceChart.defaultProps = {
  innerRadius: 55,
  radius: 115 + 3,
  nameKey: 'x',
  valueKey: 'y',
};
