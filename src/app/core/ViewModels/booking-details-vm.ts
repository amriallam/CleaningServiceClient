export class BookingDetailsVM {
  constructor(
    public serviceId?: number,
    public date?: string,
    public from?: string,
    public to?: string,
    public totalCost?: number,
    public regionId?:number,
    public transitionFees?:number,
    public selectedResIds?: number[],
    public selectedResourceNames?: string[]
  ){}
}
