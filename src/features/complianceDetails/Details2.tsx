import { Box, Heading, HStack, Spinner, Stack } from '@chakra-ui/react';
import { ImpactStatus } from './ImpactStatus';
import {
  ComplianceDetails,
  ResourceCount,
  ResourceSummary,
} from './compliantDetailsSlice';
import { ComplianceStatus } from './ComplianceStatus';
import { AccountComplianceSummary } from '../compliance/compliantSlice';
import { useHistory } from 'react-router-dom';
import routes from '../../routes';
import { ResourceChart } from './ResourceInventoryChart/PieChart';

interface ComplianceDetailsProps {
  resourceInventory: ResourceSummary;
  accountComplianceStatus: AccountComplianceSummary;
  accountComplianceDetails: ComplianceDetails[];
}

export const Details2 = ({
  resourceInventory,
  accountComplianceStatus,
  accountComplianceDetails,
}: ComplianceDetailsProps): JSX.Element => {
  const width = 620;
  const height = 330;
  const history = useHistory();

  const navigateToDetailsPage = (ruleName: string) => {

    history.push(routes.RULEDETAILS.path.replace(':name', ruleName).replace(":id", accountComplianceStatus.id));

  };
  return (
    <Box px='20px'>
      {accountComplianceDetails && accountComplianceDetails.length > 0 ? (
        <Box>
          <Heading as='h1' size='xl' mb={8} textAlign='center'>
            {accountComplianceStatus?.nickName ?? ''} Compliance Details
          </Heading>
          <Stack spacing={31}>
            <HStack spacing={31} w='100%' h={450}>
              <ComplianceStatus
                accountComplianceStatus={accountComplianceStatus}
              />
              <ResourceChart
                title={"Resource Inventory"}
                resourceTotal={resourceInventory.total}
                height={height}
                width={width}
                prefix={''}
                data={resourceInventory.resources
                  .filter((resource: ResourceCount) => {
                    return resource.count > 1;
                  })
                  .map((resource: ResourceCount) => {
                    return {
                      x: resource.resourceType,
                      y: resource.count,
                    };
                  })}
              />
            </HStack>
            <ImpactStatus data={accountComplianceDetails} navigation={navigateToDetailsPage} />
          </Stack>
        </Box>
      ) : (
        <div>
          Loading <Spinner />
        </div>
      )}
    </Box>
  );
};
