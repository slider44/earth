export class EmployeeModel {
    constructor (
        public lastName: string,
        public firstName: string,
        public contact? : string,
        public email?: string,
        public _id?: string
    ) {}
}
