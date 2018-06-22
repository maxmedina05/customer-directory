interface Name {
  first: string;
  last: string;
}

export interface CustomerJSON {
  customerID: number;
  name: Name;
  birthday: string;
  gender: string;
  lastContact: string;
  customerLifetimeValue: number;
}

export class Customer {
  customerID: number;
  name: Name;
  birthday: Date;
  gender: string;
  lastContact: Date;
  customerLifetimeValue: number;

  constructor() {
    this.name = {
      first: '',
      last: ''
    };
    this.birthday = new Date();
    this.lastContact = new Date();
    this.customerLifetimeValue = 0;
  }

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }

  static buildCustomerFromJSON(obj: CustomerJSON): Customer {
    const customer = new Customer();
    customer.customerID = obj.customerID;
    customer.name = obj.name;
    customer.birthday = new Date(obj.birthday);
    customer.lastContact = new Date(obj.lastContact);
    customer.gender = obj.gender;
    customer.customerLifetimeValue = obj.customerLifetimeValue;

    return customer;
  }
}
