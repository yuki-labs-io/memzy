import { PrismaClient } from "@prisma/client";
import { IUserRepository, UserData } from "./UserRepository.interface";

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findOrCreateByEmail(data: {
    email: string;
    name?: string;
    image?: string;
  }): Promise<UserData> {
    const user = await this.prisma.user.upsert({
      where: { email: data.email },
      update: {
        name: data.name,
        image: data.image,
      },
      create: {
        email: data.email,
        name: data.name,
        image: data.image,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name ?? undefined,
      image: user.image ?? undefined,
    };
  }

  async findByEmail(email: string): Promise<UserData | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name ?? undefined,
      image: user.image ?? undefined,
    };
  }
}
