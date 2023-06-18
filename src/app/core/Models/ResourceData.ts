export class ResourceData {
  constructor(
    public id: number,
    public name: string,
    public price: string,
    public resourceTypeId: number,
    public resourceTypeName: string,
    public attributes: { name: string, value: string }[]
  ) { }
}
