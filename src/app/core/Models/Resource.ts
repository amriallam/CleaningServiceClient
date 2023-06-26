export class Resource {
  constructor(
    public resourceTypeId: number,
    public price: number,
    public name: string,
    public imageUrls: string[],
    public id?: number,
    public selected?: boolean) {
      selected = false;
    }
}
