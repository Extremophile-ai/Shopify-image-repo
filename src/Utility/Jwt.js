import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secretKey = process.env.JWT_KEY;

/**
 *
 */
export default class jwtHelper {
  /**
   * @param {object} payload - The details to be signed
   * @param {string} secret - The JWT secret key
   * @returns {string} The JWT signed token
   */
  static async generateToken(payload, secret = secretKey) {
    const token = await jwt.sign(payload, secret, { expiresIn: "1d" });
    return token;
  }

  static async passwordToken(payload, secret) {
    return await jwt.sign(payload, secret, { expiresIn: "1h" });
  }

  static async verifyToken(payload, secret) {
    try {
    return await jwt.verify(payload, secret);
    } catch (error) {
      return error;
    }
    
  }
}
