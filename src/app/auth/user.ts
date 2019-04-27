export interface UserProfile {
  user: User;
}

export interface User {
  username?: string;
  password?: string;
  token?: string;
  email?: string;
  bio?: string;
  image?: any;
}

export interface LoginError {
  body: string[];
}
