// export interface Address {
//   street: string;
//   city: string;
//   postalCode: number;
// }

export class User {
  constructor(
    public FullName: string,
    public UserID: string,
    public Email: string,
    public Address: string,
    public MobileNo: string,
    public Birthdate: Date,
    public Password: string,
    public ConfirmPassword: string
  ) { }
}
