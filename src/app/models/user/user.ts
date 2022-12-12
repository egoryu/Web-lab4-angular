export class User {
  username: string;
  password: string;
  salt: string;
  token: string;
  
  constructor(username: string, password: string, salt: string, token: string) {
    this.username = username;
    this.password = password;
    this.salt = salt;
    this.token = token;
  }
}
