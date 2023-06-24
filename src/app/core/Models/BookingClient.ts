import { Time } from "@angular/common";
import { BookingStaus } from "./BookingStaus";
import { Service } from "./Service";

export class BookingClient{
    constructor(
        public date: Date,
        public startTime: string | undefined,
        public endTime :string | undefined,
        public location : string |undefined,
        public bookingStatus : BookingStaus,
        public totalCost:number,
        public userId: string |undefined ,
        public serviceId: number,
        public service: Service,

        public resourceIDs: number[] |undefined,
        public serviceName: string| undefined,
        public id? :number 
    ){}
}






