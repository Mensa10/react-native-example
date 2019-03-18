export interface User {
  id?: string,

  username: string,

  displayName?: string,

  password: string,

  repeatPassword?: string;

  profileImage?: { uri: string };
}