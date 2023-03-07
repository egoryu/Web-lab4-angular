import { User } from "../user/user";

export class RequestUser implements User {
    username: string;
    password: string;


  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
