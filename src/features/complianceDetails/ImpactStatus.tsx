import { Heading, Stack } from '@chakra-ui/react';
import { ComplianceDetails } from './compliantDetailsSlice';
import { Toggle } from '../../components/Toggle';
import { Card } from '../../components/Card';

interface ImpactStatusProps {
  data: ComplianceDetails[];
  navigation?: (name: string) => void;
}

enum Severity {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Medium = 'MEDIUM',
  Low = 'LOW',
}

export const ImpactStatus = ({ data, navigation }: ImpactStatusProps): JSX.Element => {
  const criticalDetails = data.filter(
    (item) => item.severity === Severity.Critical
  );
  const highDetails = data.filter((item) => item.severity === Severity.High);
  const mediumDetails = data.filter(
    (item) => item.severity === Severity.Medium
  );
  const lowDetails = data.filter((item) => item.severity === Severity.Low);

  return (
    <Card w='100%' h={400} overflowY='auto'>
      <Heading as='h1' size='xl' variant='med-dark' mb={4}>
        Impact Status
      </Heading>
      <Stack w='94%' mx='3%'>
        <Toggle
          title={Severity.Critical}
          textColor='white'
          bgColor='#C22428'
          data={criticalDetails}
          navigation={navigation}
        />
        <Toggle
          title={Severity.High}
          textColor='white'
          bgColor='#FE5357'
          data={highDetails}
          navigation={navigation}

        />
        <Toggle
          title={Severity.Medium}
          textColor='black'
          bgColor='#FFD572'
          data={mediumDetails}
          navigation={navigation}

        />
        <Toggle
          title={Severity.Low}
          textColor='black'
          bgColor='#82FF8E'
          data={lowDetails}
          navigation={navigation}

        />
      </Stack>
    </Card>
  );
};
