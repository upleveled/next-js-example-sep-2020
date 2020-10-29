export type User = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  following?: boolean;
  passwordHash: string;
  username: string;
};

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};
