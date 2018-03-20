export class LeaveModel {

    constructor ( 
        public leaveType: string,
        public startDatetime: Date,
        public endDatetime: Date,
        public viewPublic: boolean,
        public description?: string,
        public _id?: string) {}
   
}
