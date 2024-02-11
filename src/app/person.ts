import { Address } from "./adress";
import { Telephone } from "./telephone";
import { Email } from "./email";

export interface Person {
  id: number;
  firstname: string;
  lastname: string;
  tel: Telephone[];
  email: Email[];
  address: Address | undefined;
}
