import { Time } from "@angular/common";
import { BookingStaus } from "./BookingStaus";

export class BookingModel{
    constructor(
        public date: Date,
        public startTime: Time,
        public endTime :Time,
        public location : string,
        public status : BookingStaus,
        public totalCost:number,
        public userEmail: string,
        public serviceName: string
    ){}
}

