import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { VStack, Heading, HStack, Box, Text } from '@chakra-ui/react';
import { ComplianceDetails } from '../features/complianceDetails/compliantDetailsSlice';
import { Tooltip } from '@chakra-ui/react'

interface ToggleProps {
  title: string;
  textColor: string;
  bgColor: string;
  data: ComplianceDetails[];
  navigation?: (name: string) => void;

}

export const Toggle = ({
  title,
  textColor,
  bgColor,
  data,
  navigation,
}: ToggleProps): JSX.Element => {
  const [showToggle, setShowToggle] = useState<boolean>(false);

  return (
    <VStack spacing={0}>
      <HStack
        w='100%'
        justifyContent='space-between'
        bg={bgColor}
        py={2}
        px={6}
        rounded='lg'
        color={textColor}
        onClick={() => {
          if (data.length > 0) {
            setShowToggle(!showToggle);
          }
        }}
      >
        <Heading as='h2' size='lg' fontWeight={500}>
          {title} {'('}
          {data.length}
          {')'}
        </Heading>
        {data.length > 0 &&
          (showToggle ? (
            <ChevronUpIcon w={8} h={8} />
          ) : (
            <ChevronDownIcon w={8} h={8} />
          ))}
      </HStack>
      {showToggle && (
        <Box
          w='98%'
          h={150}
          p={8}
          border='1px solid #E5E5E5'
          boxSizing='border-box'
          overflowY='auto'
          fontSize={14}
        >
          {data.map((item, i) => {
            return (
              <HStack
                justifyContent='space-between'
                key={`${item.ruleName} ${i}`}
              >
                <Tooltip hasArrow label='Click for details' bg='gray.300' color='black' >

                  <Text onClick={() => {
                    if (navigation) {
                      navigation(item.ruleName)
                    }
                  }}>{item.ruleName}</Text>
                </Tooltip>
                <Text>?+ Noncompliant resource(s)</Text>
              </HStack>
            );
          })}
        </Box>
      )}
    </VStack>
  );
};
