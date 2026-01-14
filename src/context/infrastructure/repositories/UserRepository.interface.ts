export interface UserData {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export interface IUserRepository {
  findOrCreateByEmail(data: {
    email: string;
    name?: string;
    image?: string;
  }): Promise<UserData>;

  findByEmail(email: string): Promise<UserData | null>;
}
