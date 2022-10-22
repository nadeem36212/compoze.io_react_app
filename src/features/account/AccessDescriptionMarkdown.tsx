import {
  Stack,
  Heading,
  Text,
  Link,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

export const Markdown = (): JSX.Element => {
  const costExplorer = `~~~json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
              "ce:GetCostCategories",
              "ce:GetCostAndUsageWithResources",
              "ce:GetCostAndUsage",
              "config:GetDiscoveredResourceCounts",
              "config:GetComplianceDetailsByConfigRule",
              "ce:GetCostForecast"
            ],
            "Resource": "*"
        }
    ]
}
  ~~~`;

  const permissionJson = `~~~json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "CompozeCompliancePermissions",
            "Effect": "Allow",
            "Action": [
              "config:GetComplianceSummaryByConfigRule",
              "config:GetComplianceSummaryByResourceType",
              "config:StartConfigRulesEvaluation",
              "config:DescribeComplianceByConfigRule"
            ],
            "Resource": "*"
        }
    ]
}
  ~~~`;

  const relationshipPolicy = `~~~json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::939383412842:root"  //939383412842 is the role of the compoze account and should be used as is
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "<YOUR_EXTERNAL_ID>" //The ExternalID should be something random and not easily guessed (UUID works well)
        }
      }
    }
  ]
}
  ~~~`;
  return (
    <Stack pt={10} pb={50} spacing={8}>
      <Heading>Third party access</Heading>
      <Stack>
        <Text>
          In order to securely grant the Compoze Management platform access to
          your accounts, you must create and provide a third party, cross
          account AWS IAM Role with the appropriate access. Full AWS
          Documentation can be found{' '}
          <Link href='https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html'>
            here
          </Link>
          . This method is more secure than providing an access key and secret
          key.
        </Text>
        <Text>
          In order to create an IAM Role you simply need to create an IAM Role
          and Policy with the appropriate{' '}
          <Link href='https://aws.amazon.com/iam/features/manage-permissions/'>
            Permissions
          </Link>{' '}
          and{' '}
          <Link href='https://aws.amazon.com/blogs/security/how-to-use-trust-policies-with-iam-roles/'>
            Trust Relationships
          </Link>
          .
        </Text>
      </Stack>
      <OrderedList spacing={5}>
        <ListItem>
          <Stack>
            <Text>
              First, create an IAM Policy with permissions to access the Cost
              Explorer Cost and Forecast actions.
            </Text>
            <Text>
              Name:{' '}
              <span style={{ fontWeight: 700 }}>CostExplorerReadOnly</span>{' '}
            </Text>
            <Text>Document:</Text>
            <ReactMarkdown>{costExplorer}</ReactMarkdown>

            <Text>
              If you choose to have Compoze Manager manage your compliance rules
              (by selecting{' '}
              <span style={{ fontWeight: 700 }}>Monitor Compliance</span>{' '}
              above), create another policy named{' '}
              <span style={{ fontWeight: 700 }}>CompozeCompliancePolicy</span>{' '}
              with the following permission json:
            </Text>
            <ReactMarkdown>{permissionJson}</ReactMarkdown>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack>
            <Text>
              Next, create a role named{' '}
              <span style={{ fontWeight: 700 }}>
                CompozeCostExplorerAutomationRole
              </span>
              . Attach the{' '}
              <span style={{ fontWeight: 700 }}>CostExplorerReadOnly</span> (and
              if required the{' '}
              <span style={{ fontWeight: 700 }}>CompozeCompliancePolicy</span>)
              permissions policies. Finally, create a unique External ID and use
              it with the below Trust Relationships policy:
            </Text>
            <ReactMarkdown>{relationshipPolicy}</ReactMarkdown>

            <Text>
              Take the create Role ARN and External ID and provide them in the
              above document above.
            </Text>
            <Text>
              Attach the policy you created to the role and finish the IAM Role
              creation process. You can then use the Role's ARN in the above
              form.
            </Text>
          </Stack>
        </ListItem>
      </OrderedList>
    </Stack>
  );
};
