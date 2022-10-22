import { RouteProps } from "react-router-dom";
import Home from "../containers/Home";
import Login from "../containers/Login";
import SignUp from "../containers/Signup";
import AccountPage from "../features/account/Account";
import CompliancePage from "../features/compliance/Compliance";
import ComplianceDetailsPage from "../features/complianceDetails/ComplianceDetails";
import ComponentDetailsPage from "../features/component/ComponentDetailsPage";
import CreateComponentTemplatePage from "../features/component/create/CreateComponentTemplatePage";
import CreateComponentPage from "../features/component/create/CreateComponentPage";
import { Cost } from "../features/costs/Cost";
import { CostDetailsPage } from "../features/costs/costDetails/CostDetails";
import OrganizationPage from "../features/organization/Organization";
import CreateProductPage from "../features/products/create/CreateProductPage";
import ProductDetailsPage from "../features/products/details/ProductDetails";
import { ProductPage } from "../features/products/ProductsPage";
import { RuleDetailsPage } from "../features/rule/RuleDetailPage";
import { TemplatesPage } from "../features/templates/TemplatesPage";
import { AccountList } from "../features/account/Account-List";

const asTypedRoutes = <T extends Routes>(routes: T) => routes;

const routes = asTypedRoutes({
    LOGIN: {
        path: '/login',
        component: Login,
        guarded: false,
    },
    SIGNUP: {
        path: '/signup',
        component: SignUp,
        guarded: false,
    },
    COST: {
        path: '/costs',
        component: Cost,
        guarded: true,
    },
    COSTDETAILS: {
        path: '/costs/:id',
        component: CostDetailsPage,
        guarded: true,
    },
    COMPLIANCE: {
        path: '/compliance',
        component: CompliancePage,
        guarded: true,
    },
    COMPLIANCEDETAILS: {
        path: '/compliance/:id',
        component: ComplianceDetailsPage,
        guarded: true,
    },
    RULEDETAILS: {
        path: '/accounts/:id/rules/:name',
        component: RuleDetailsPage,
        guarded: true,
    },
    ORGANIZATION: {
        path: '/organization',
        component: OrganizationPage,
        guarded: true,
    },
    CREATECOMPONENT: {
        path: '/products/:name/CreateComponent',
        component: CreateComponentPage,
        guarded: true,
    },
    COMPONENTDETAILS: {
        path: '/products/:productName/component/:componentName/ComponentDetails',
        component: ComponentDetailsPage,
        guarded: true,
    },
    HOME: {
        path: '/',
        component: Home,
        guarded: true,
        title:'Home',

    },
    ACCOUNT: {
        path: '/accounts',
        component: AccountList,
        guarded: true,
        title:'Accounts',
    },
    PRODUCTS: {
        path: '/products',
        component: ProductPage,
        guarded: true,
        title:'Products',
    },
    TEMPLATES: {
        path: '/products/:name/Templates',
        component: TemplatesPage,
        guarded: true,
    },
    CREATECOMPONENTFROMTEMPLATE: {
        path: '/products/:name/Templates/:templateId/CreateComponent',
        component: CreateComponentTemplatePage,
        guarded: true,
    },
    CREATEPRODUCT: {
        path: '/products/CreateProduct',
        component: CreateProductPage,
        guarded: true,
    },
    PRODUCTDETAILS: {
        path: '/products/:name',
        component: ProductDetailsPage,
        guarded: true,
    },

})

export default routes;

export type Routes<K extends string = string> = Record<
    K,
    RouteProps & {
        path: string;
        guarded: boolean;
    }
>;
