import { AxiosInstance } from "axios";
import { Component } from "../features/component/componentSlice";
import { ProductInformation } from "../features/products/productSlice";
import AuthService from "./authService";

export default class ProductService {
    constructor(
        protected readonly http: AxiosInstance,
        protected readonly authService: AuthService,
        protected readonly baseUri: string
    ) { }
    async getProducts(): Promise<ProductInformation[]> {
        const url = this.createURL('/products');

        const headers = Object.assign(this.getHeaders(), await this.getHeaders());

        return await (await this.http.get<ProductInformation[]>(
            url,
            { headers }
        )).data;
    }

    // export interface VPCProps {
    //     openVpnUserName: string,
    //     openVpnUserPassword: string
    //     compozeEnvironment: string,
    //     compozeProductName: string,
    // }

    async createProduct(name: string,
        accountId: string,
        region: string,
        environments: string[],
        createVpc: boolean,
        githubOrganization?: string,): Promise<ProductInformation> {
        const url = this.createURL(`/accounts/${accountId}/products`);
        const headers = Object.assign(this.getHeaders(), await this.getHeaders());

        return await (await this.http.post<ProductInformation>(
            url,
            {
                name,
                githubOrganization,
                region,
                environments,
                createVpc,
            },
            { headers }
        )).data;
    }

    async getComponents(productName: string): Promise<Component[]> {
        const url = this.createURL(`/products/${productName}/components`);

        const headers = Object.assign(this.getHeaders(), await this.getHeaders());

        return await (await this.http.get<Component[]>(
            url,
            { headers }
        )).data;
    }


    private createURL(urlPath: string): string {
        return this.baseUri + urlPath;
    }


    private async getHeaders(): Promise<any> {
        const Authorization = await this.authService.getToken();
        return Authorization ? { Authorization, gitUser: "hello", githubToken: "world" } : {};
    }
}