import { Progress, ProgressLabel, useInterval } from "@chakra-ui/react";
import { useState } from "react";

export default function CompozeProgress() {
    const [progress, setProgress] = useState(0)
    
    useInterval(() => {
        setProgress(progress + 1);
    }, 2500);

    return (
        <Progress hasStripe height={15} value={progress} >
            <ProgressLabel>Creation in Progress</ProgressLabel>
        </Progress>
    )
}
