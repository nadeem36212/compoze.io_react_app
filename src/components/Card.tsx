import { Box, BoxProps } from '@chakra-ui/react';

export const Card = (props: BoxProps): JSX.Element => {
  return (
    <Box
      rounded='xl'
      boxShadow='0px 0px 15px rgba(0, 0, 0, 0.15)'
      boxSizing='border-box'
      p={26}
      {...props}
    ></Box>
  );
};
