interface Name {
  first: string;
  last: string;
}

export class Customer {
  customerID: number;
  name: Name;
  birthday: string;
  gender: string;
  lastContact: Date;
  customerLifetimeValue: number;
}
