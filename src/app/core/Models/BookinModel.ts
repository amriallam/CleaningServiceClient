import { Time } from "@angular/common";
import { BookingStaus } from "./BookingStaus";

export class BookingModel{
    constructor(
        public date: Date,
        public startTime: string | undefined,
        public endTime :string | undefined,
        public location : string |undefined,
        public status : BookingStaus,
        public totalCost:number,
        public userID: string |undefined ,
        public serviceID: number,
        public resourceIDs: number[] |undefined,
        public id? :number 
    ){}
}

