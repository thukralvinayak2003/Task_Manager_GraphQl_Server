import JWT from "jsonwebtoken";
import { User } from "@prisma/client";
import { JWTUser } from "../interfaces";

const jwt = process.env.JWT_SECRET as string;

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload: JWTUser = {
      id: user?.id,
      email: user?.email,
    };
    const token = JWT.sign(payload, jwt);
    return token;
  }

  public static decodeToken(token: string) {
    try {
      return JWT.verify(token, jwt) as JWTUser;
    } catch (error) {
      return null;
    }
  }
}

export default JWTService;
