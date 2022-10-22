import services from "../../../service";
import { CostDetails } from "./costDetailsSlice";

// A mock function to mimic making an async request for data
export function getCostDetails(accountId: string): Promise<CostDetails> {

    return services.costDetailService.getCostDetails(accountId)
}

