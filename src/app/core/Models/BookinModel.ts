import { Time } from "@angular/common";
import { BookingStaus } from "./BookingStaus";

export class BookingModel{
    constructor(
        public date: string,
        public startTime: string ,
        public endTime :string ,
        public location : string ,
        public totalCost:number,
        public userID : string ,
        public serviceID: number,
        public resourceIDs: number[],
        public status? : BookingStaus,
        public id? :number 
    ){}
}

