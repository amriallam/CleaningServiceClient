import { ResourceType } from "./ResourceType";

export class ResourceAttribute {
  constructor(
    public attributeId: number,
    public resourceTypeId: ResourceType,
    public attributeName: string,
    public attributeType: string
  ) { }
}
