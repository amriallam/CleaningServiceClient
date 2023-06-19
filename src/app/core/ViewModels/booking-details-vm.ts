export class BookingDetailsVM {
  constructor(
    public date?: string,
    public from?: string,
    public to?: string,
    public location?: string,
    public selectedResIds?: number[]
  ){}
}
