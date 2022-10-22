import services from "../../service";
import { RuleDetails } from "./ruleDetailsSlice";

export function getRuleDetails(name: string, accountId: string): Promise<RuleDetails> {

    return services.ruleService.getRuleDetails(name, accountId)
}

export function triggerRuleEvaluation(name: string, accountId: string): Promise<void> {

    return services.ruleService.evaluateRule(name, accountId)
}

