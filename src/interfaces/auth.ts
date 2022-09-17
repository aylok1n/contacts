export interface Auth {
  accessToken: string;
  user: {
    email: string;
    id: number;
  }
}
