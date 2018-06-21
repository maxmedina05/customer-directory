interface Name {
  first: string;
  last: string;
}

export class Customer {
  customerID: number;
  name: Name;
  birthday: string | Date;
  gender: string;
  lastContact: string | Date;
  customerLifetimeValue: number;
}
