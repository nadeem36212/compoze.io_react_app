import { Box, Heading, HStack, Spinner, Stack } from '@chakra-ui/react';
import { Card } from '../../../components/Card';
import { useParams } from "react-router-dom";
import NavBar from "../../../navigation/navbar";
import { ProjectedCostBar } from './PercentBar';
import { ResourceChart } from '../../complianceDetails/ResourceInventoryChart/PieChart';
import { CostDetails, fetchCostDetails, selectCostDetailsStatus } from './costDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

export const CostDetailsPage = (): JSX.Element => {
    const params = useParams<{ id: string }>();
    const width = 620;
    const height = 330;
    const dispatch = useAppDispatch();

    const costDetails: CostDetails | undefined = useAppSelector(selectCostDetailsStatus)!;

    useEffect(() => {
        dispatch(fetchCostDetails({ accountId: params.id }));
    }, []);

    const currentCost = 100;
    const projectedCost = 150;
    const resourcesCostPerService = filterResourceCostPerService(costDetails);
    return (
        <div className='App container py-3'>
            <NavBar />
            {costDetails ? (
                <Box px='20px'>
                    <Box>
                        <Heading as='h1' size='xl' mb={8} textAlign='center'>
                            {params.id} Cost Details
                        </Heading>
                        <Stack spacing={31}>
                            <HStack spacing={31} w='100%' h={400}>
                                {costCard(currentCost, projectedCost)}
                                <ResourceChart
                                    title={"Cost By Resource"}
                                    resourceTotal={resourcesCostPerService.length}
                                    height={height}
                                    width={width}
                                    prefix={'$'}
                                    data={resourcesCostPerService}
                                />
                            </HStack>
                            <Card w='100%' h={400} overflowY='auto'>
                                <Heading as='h1' size='xl' variant='med-dark' mb={4}>
                                    Impact Status
                                </Heading>
                                <Stack w='50%' mx='3%'>
                                    <VictoryChart
                                        theme={VictoryTheme.material}
                                    >
                                        <VictoryLine
                                            style={{
                                                data: { stroke: "#c43a31" },
                                                parent: { border: "1px solid #ccc" }
                                            }}
                                            data={costDetails.costOverTime.map(monthCost => {
                                                return {
                                                    y: monthCost.price,
                                                    x: monthCost.month
                                                }
                                            })}
                                        />
                                    </VictoryChart>
                                </Stack>
                            </Card>

                        </Stack>
                    </Box>
                </Box>
            ) : (
                <div>
                    Loading <Spinner />
                </div>
            )}
        </div>
    )

    function filterResourceCostPerService(costDetails: CostDetails | undefined): any {
        if (!costDetails) {
            return []
        }
        return costDetails.resourceCosts
            .filter(resource => {
                return Number(resource.price) > 0;
            })
            .map(resource => {
                return {
                    y: Math.round((Number(resource.price) + Number.EPSILON) * 100) / 100,
                    x: resource.resourceType
                };
            });
    }

    function costCard(currentCost: number, projectedCost: number) {
        return <Card w='35%' h='100%'>
            <Heading as='h1' size='xl' variant='med-dark' mb={4}>
                Cost This Month
            </Heading>
            <Stack overflowX='auto'>
                <Heading as='h3' size='md' variant='med-dark'>
                    Projected Cost
                    <ProjectedCostBar
                        compliant={false}
                        number={currentCost}
                        total={projectedCost} />
                </Heading>
            </Stack>
        </Card>;
    }
}