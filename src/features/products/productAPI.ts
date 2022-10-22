import services from "../../service";
import { ProductInformation } from "./productSlice";

export async function getProducts(): Promise<ProductInformation[]> {
  return await services.productService.getProducts()
}

export async function createProduct(name: string, accountId: string, region: string, environments: string[], createVpc: boolean, githubOrganization?: string,): Promise<ProductInformation> {

  return await services.productService.createProduct(name, accountId, region, environments, createVpc, githubOrganization)
}