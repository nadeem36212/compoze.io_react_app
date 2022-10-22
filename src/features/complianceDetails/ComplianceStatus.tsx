import { Heading, Stack } from '@chakra-ui/react';
import { Card } from '../../components/Card';
import { AccountComplianceSummary } from '../compliance/compliantSlice';
import { PercentBar } from './ComplianceStatus/PercentBar';

interface ComplianceDetailsProps {
  accountComplianceStatus: AccountComplianceSummary;
}

export const ComplianceStatus = ({
  accountComplianceStatus,
}: ComplianceDetailsProps): JSX.Element => {
  const totalRules =
    accountComplianceStatus.complianceSummary.ruleCompliance
      .nonComplianceResources +
    accountComplianceStatus.complianceSummary.ruleCompliance.compliantResources;

  const totalResources =
    accountComplianceStatus.complianceSummary.resourceCompliance
      .nonComplianceResources +
    accountComplianceStatus.complianceSummary.resourceCompliance
      .compliantResources;

  return (
    <Card w='35%' h='100%'>
      <Heading as='h1' size='xl' variant='med-dark' mb={4}>
        Compliance Status
      </Heading>
      <Stack overflowX='auto'>
        <Heading as='h2' size='lg' variant='light'>
          Rules
        </Heading>
        <Stack pl={5}>
          <Heading as='h3' size='md' variant='med-dark'>
            Out Of Compliance
            <PercentBar
              compliant={false}
              number={
                accountComplianceStatus.complianceSummary.ruleCompliance
                  .nonComplianceResources
              }
              total={totalRules}
            />
          </Heading>
          <Heading as='h3' size='md' variant='med-dark'>
            In Compliance
            <PercentBar
              compliant={true}
              number={
                accountComplianceStatus.complianceSummary.ruleCompliance
                  .compliantResources
              }
              total={totalRules}
            />
          </Heading>
        </Stack>
        <Heading as='h2' size='lg' variant='light'>
          Resources
        </Heading>
        <Stack pl={5}>
          <Heading as='h3' size='md' variant='med-dark'>
            Out Of Compliance
            <PercentBar
              compliant={false}
              number={
                accountComplianceStatus.complianceSummary.resourceCompliance
                  .nonComplianceResources
              }
              total={totalResources}
            />
          </Heading>
          <Heading as='h3' size='md' variant='med-dark'>
            In Compliance
            <PercentBar
              compliant={true}
              number={
                accountComplianceStatus.complianceSummary.resourceCompliance
                  .compliantResources
              }
              total={totalResources}
            />
          </Heading>
        </Stack>
      </Stack>
    </Card>
  );
};
