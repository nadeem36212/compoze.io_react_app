import services from "../../service";
import { AccountCost } from "./costSlice";

export async function getCosts(orgId: string): Promise<AccountCost[]> {

  const costs = await services.costsService.getCosts(orgId);
  return costs
}
