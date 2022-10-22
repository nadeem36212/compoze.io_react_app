import axios from "axios";
import { environment } from "../config/environmenet";
import AccountService from "./accountService";
import AuthService from "./authService";
import ComplianceService from "./complianceService";
import ComponentService from "./componentService";
import CostDetailService from "./costDetailsService";
import CostsService from "./CostService";
import OrganizationService from "./organizationService";
import ProductService from "./productService";
import RestService from "./RestService"
import RuleService from "./ruleService";
import TemplateService from "./templateService";
import UserService from "./userService";



const authService = new AuthService()
const apiService = new RestService(
    axios,
    authService,
    environment.apiBase
);
const compozeApiService = new RestService(
    axios,
    authService,
    environment.compozeApiBase
);
const compozeUnathenticatedApiService = new RestService(
    axios,
    authService,
    environment.unauthenticatedcompozeApiBase
);

const productService = new ProductService(axios,
    authService,
    environment.compozeApiBase)
const templateService = new TemplateService(axios,
    authService,
    environment.compozeApiBase)

const costsService = new CostsService(apiService)
const componentService = new ComponentService(axios,
    authService,
    environment.compozeApiBase)
const accountService = new AccountService(compozeApiService)
const organizationService = new OrganizationService(apiService, compozeApiService)
const complianceService = new ComplianceService(apiService)
const ruleService = new RuleService(apiService)
const costDetailService = new CostDetailService(apiService)
const userService = new UserService(compozeApiService, compozeUnathenticatedApiService)

const services = {
    apiService,
    productService,
    ruleService,
    templateService,
    authService,
    componentService,
    organizationService,
    accountService,
    complianceService,
    costDetailService,
    costsService,
    userService,
};

export default services;