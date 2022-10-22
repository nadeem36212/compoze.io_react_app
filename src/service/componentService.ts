import { AxiosInstance } from "axios";
import { Component } from "../features/component/componentSlice";
import AuthService from "./authService";

export default class ComponentService {
    constructor(
        protected readonly http: AxiosInstance,
        protected readonly authService: AuthService,
        protected readonly baseUri: string
    ) { }

    async create(productName: string, name: string, technology: string, attributes: any): Promise<Component> {
        const url = this.createURL(`/products/${productName}/components`);

        const headers = Object.assign(this.getHeaders(), await this.getHeaders());

        return await (await this.http.post<Component>(
            url,
            {
                name,
                technology,
                attributes,
                environmentVariables: {},
            },
            { headers }
        )).data;
    }

    async get(productName: string, componentName: string): Promise<Component> {
        const url = this.createURL(`/products/${productName}/components/${componentName}`);

        const headers = Object.assign(this.getHeaders(), await this.getHeaders());

        return await (await this.http.get(url, { headers })).data

    }

    async delete(productName: string, componentName: string): Promise<Component> {
        const url = this.createURL(`/products/${productName}/components/${componentName}`);

        const headers = Object.assign(this.getHeaders(), await this.getHeaders());

        return await (await this.http.delete(url, { headers })).data

    }

    private createURL(urlPath: string): string {
        return this.baseUri + urlPath;
    }


    private async getHeaders(): Promise<any> {
        const Authorization = await this.authService.getToken();
        return Authorization ? { Authorization, gitUser: "hello", githubToken: "world" } : {};
    }
}