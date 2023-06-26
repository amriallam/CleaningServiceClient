import { Time } from "@angular/common";
import { BookingStaus } from "./BookingStaus";
import { Service } from "./Service";

export class BookingClient{
    constructor(
        public date: Date,
        public bookingItems : BookingItem[],
        public endTime :string | undefined,
        public startTime: string | undefined,
        public location : string |undefined,
        public paymentMethodName : string,
        public paymentStatus : string,
        public status : string,
        public totalCost:number,
        public userId: string |undefined ,
        public serviceId: number,        
        public serviceName: string| undefined,
        public id :number 
    ){}
}


interface BookingItem{
    price:number,
    resourceId :number,
    resourceName:string,
    resourceImages:image[]
}

interface image{
    id:number,
    uri:number

}


