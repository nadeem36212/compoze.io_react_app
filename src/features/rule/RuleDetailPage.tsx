import { Box, Heading, HStack, Stack, Button, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Card } from "../../components/Card";
import NavBar from "../../navigation/navbar";
import { MitigationMarkdown } from "./MitigationMarkdown";
import { evaluateRule, fetchRuleDetails, Mitigations, RuleDetails, selectAPIError, selectEvaluationTriggered, selectRuleDetailsStatus } from "./ruleDetailsSlice";

export function RuleDetailsPage() {
    const params = useParams<{ name: string, id: string }>();
    const dispatch = useAppDispatch();
    const ruleStatus: RuleDetails | undefined = useAppSelector(selectRuleDetailsStatus);
    const apiFailure: boolean = useAppSelector(selectAPIError);
    const evaluationTriggered: boolean = useAppSelector(selectEvaluationTriggered);

    const toast = useToast()

    useEffect(() => {
        dispatch(fetchRuleDetails({ name: params.name, accountId: params.id }));
    }, []);

    useEffect(() => {
        if (apiFailure) {
            triggerFailureToast()
        }
    }, [apiFailure]);

    useEffect(() => {
        if (evaluationTriggered) {
            triggerSuccessToast()
        }
    }, [evaluationTriggered]);

    useEffect(() => {
        if (apiFailure) {
            triggerFailureToast()
        }
    }, [apiFailure]);

    async function reevaluateRule() {
        dispatch(evaluateRule({ name: params.name, accountId: params.id }))
    }

    function triggerFailureToast() {
        toast({
            title: 'Rule reevaluation trigger failed.',
            description: "The evaluation of your rule failed to trigger. Please try again shortly, or contact the Compoze support team.",
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
    }

    function triggerSuccessToast() {
        toast({
            title: 'Rule reevaluation trigger.',
            description: "This evaluation takes a couple minutes. Please check back shortly to see if your rule is not compliant.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }
    function createHeaders(resources: string[]) {
        return (
            <div>
                {resources.map(resource => {
                    return (
                        <Heading as='h3' size='md' variant='med-dark'>
                            {resource}
                        </Heading>
                    )

                })}
            </div>
        )
    }

    function createMitigations(mitigations: Mitigations[]) {
        return (
            <div>
                {mitigations.map(mitigation => {
                    return (
                        <div>

                            <Heading as='h2' size='lg' variant='light' >
                                {mitigation.type} Mitigations
                            </Heading>
                            {mitigation.description ?
                                <Heading as='h3' size='md' variant='med-dark' marginTop={10}>
                                    {mitigation.description}
                                </Heading>
                                :
                                <div></div>
                            }
                            {mitigation.document ?
                                <Heading as='h3' size='md' height='100%' width='100%' variant='med-dark' marginTop={10}>
                                    < MitigationMarkdown mitigation={mitigation.document} />
                                </Heading>
                                :
                                <div></div>
                            }
                        </div>
                    )

                })}
            </div>
        )
    }

    return (
        <div className='App container py-3'>
            <NavBar />
            <Heading as='h1' size='xl' mb={8} textAlign='center'>
                {params.name} Rule Details
            </Heading>
            {ruleStatus ?

                <div>
                    <Button style={{marginBottom: '15px'}} alignContent={'right'} onClick={() => {
                        reevaluateRule()
                    }}>Reevaluate Rule</Button>

                    < Box >

                        <HStack spacing={31} w='100%' h={550}>

                            <Card w='40%' h='100%'>
                                <Heading as='h1' size='xl' variant='med-dark' mb={4} >
                                    Details
                                </Heading>
                                <Stack marginTop={10}>
                                    <Heading as='h2' size='lg' variant='light'>
                                        Description
                                    </Heading>
                                    <Stack pl={5}>
                                        <Heading as='h2' size='md' variant='light'>
                                            {ruleStatus.description}
                                        </Heading>
                                    </Stack>
                                    <Heading as='h2' size='lg' variant='light'>
                                        Severity
                                    </Heading>
                                    <Stack pl={5}>
                                        <Heading as='h2' size='md' variant='light'>
                                            {ruleStatus.severityDescription}
                                        </Heading>
                                    </Stack>

                                </Stack>

                                <Heading as='h1' size='xl' variant='med-dark' mb={4} marginTop={10}>
                                    Noncompliant {ruleStatus.resourceType}
                                </Heading>
                                <Stack pl={5}>
                                    {createHeaders(ruleStatus.resources)}
                                </Stack>
                            </Card>
                            <Card w='50%' h='100%' overflow={'auto'}>
                                <Heading as='h1' size='xl' variant='med-dark' mb={4} >
                                    Mitigations
                                </Heading>
                                <Stack pl={0} height='100%' marginTop={10}>
                                    {createMitigations(ruleStatus.mitigations)}
                                </Stack>
                            </Card>
                        </HStack>

                    </Box>
                </div>
                :
                <div>Loading...</div>

            }
        </div >
    );
}
