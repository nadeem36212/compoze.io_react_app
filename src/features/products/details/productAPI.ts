import services from "../../../service";
import { Component } from "../../component/componentSlice";

export async function getComponents(productName: string): Promise<Component[]> {
  return await services.productService.getComponents(productName)
}
