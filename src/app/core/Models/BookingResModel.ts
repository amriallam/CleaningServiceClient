export class BookingResModel{
     constructor(
        public result : string,
        public exception: any,
        public isCanceled: boolean,
        public isCompleted :boolean,
        public isCompletedSuccessfully :boolean,
        public creationOptions : any,
        public asyncState:any,
        public isFaulted: boolean,
        public status? : any,
        public id ? : number
     ){}   
}
