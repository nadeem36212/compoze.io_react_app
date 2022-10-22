import { Box, Text } from '@chakra-ui/react';

interface PercentBarProps {
  compliant: boolean;
  number: number;
  total: number;
}
export const ProjectedCostBar = ({
  compliant,
  number,
  total,
}: PercentBarProps): JSX.Element => {
  const fillColor = compliant ? '#82FF8E' : '#FE5357';
  const textColor = compliant ? 'black' : 'white';
  const width =
    Math.ceil((number / total) * 100) > 10
      ? Math.ceil((number / total) * 100)
      : 10;
  return (
    <Box
      width='100%'
      minW={250}
      height={30}
      background='#595959'
      borderRadius={30}
      marginTop={3}
    >
      <Box
        width={`${width}%`}
        height={30}
        background={fillColor}
        borderRadius={30}
        color={textColor}
      >
        <Text pl={5} pt={3}>
          Current: ${number} / ${total}
        </Text>
      </Box>
    </Box>
  );
};
