import { Button, Flex, Heading } from "@chakra-ui/react";
import { Steps, Step, useSteps } from "chakra-ui-steps";

interface CreateFormProps {
    steps: any[]
    heading: string
    finishForm: () => void
}
export default function CreateForm(props: CreateFormProps): JSX.Element {
    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 0,
    });

    return (
        <Flex flexDir="column" width="100%">
            <Heading marginBottom={10} textAlign='center'>{props.heading}</Heading>
            <Steps orientation={'horizontal'} size={'lg'} colorScheme='orange' activeStep={activeStep}>
                {props.steps.map(({ label, content }) => (
                    <Step label={label} key={label}>
                        {content}
                    </Step>
                ))}
            </Steps>
            {activeStep === props.steps.length ? (
                <Flex p={4}>
                    <Button onClick={reset}>
                        Reset
                    </Button>
                </Flex>
            ) : (
                <Flex width="100%" justify="flex-end" >
                    <Button
                        disabled={activeStep === 0}
                        onClick={prevStep}
                        marginRight={4}
                    >
                        Prev
                    </Button>

                    {activeStep === props.steps.length - 1 ?
                        <Button size="sm" onClick={() => props.finishForm()}>
                            Review
                        </Button> :
                        <Button size="sm" onClick={nextStep}>
                            Next
                        </Button>}
                </Flex>
            )}
        </Flex>
    )
}