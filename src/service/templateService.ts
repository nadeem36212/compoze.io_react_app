import { AxiosInstance } from "axios";
import { Component } from "../features/component/componentSlice";
import { ProductInformation } from "../features/products/productSlice";
import { Template } from "../features/templates/templateSlice";
import AuthService from "./authService";

export default class TemplateService {

    constructor(
        protected readonly http: AxiosInstance,
        protected readonly authService: AuthService,
        protected readonly baseUri: string
    ) { }

    async createTemplate(
        productName: string,
        name: string,
        technology: string,
        attributes: any): Promise<Template> {
        const url = this.createURL(`/products/${productName}/components/templates`);
        const headers = Object.assign(this.getHeaders(), await this.getHeaders());

        return await (await this.http.post<Template>(
            url,
            {
                name,
                technology,
                attributes
            },
            { headers }
        )).data;
    }

    async getTemplates(productName: string): Promise<Template[]> {
        const url = this.createURL(`/products/${productName}/components/templates`);
        const headers = Object.assign(this.getHeaders(), await this.getHeaders());
        return await (await this.http.get<Template[]>(url, { headers })).data;
    }

    async deleteTemplate(productName: string, id: string): Promise<void> {
        const url = this.createURL(`/products/${productName}/components/templates/${id}`);
        const headers = Object.assign(this.getHeaders(), await this.getHeaders());
        await this.http.delete(url, { headers });
    }


    private createURL(urlPath: string): string {
        return this.baseUri + urlPath;
    }


    private async getHeaders(): Promise<any> {
        const Authorization = await this.authService.getToken();
        return Authorization ? { Authorization, gitUser: "hello", githubToken: "world" } : {};
    }
}