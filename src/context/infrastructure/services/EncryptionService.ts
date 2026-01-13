import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

export class EncryptionService {
  private key: Buffer;

  constructor(encryptionKey?: string) {
    const key = encryptionKey || process.env.ENCRYPTION_KEY;
    if (!key) {
      throw new Error("ENCRYPTION_KEY is required for API key encryption");
    }
    this.key = Buffer.from(key, "base64");
    if (this.key.length !== 32) {
      throw new Error("ENCRYPTION_KEY must be 32 bytes (256 bits) when base64 decoded");
    }
  }

  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, this.key, iv);

    let encrypted = cipher.update(plaintext, "utf8", "base64");
    encrypted += cipher.final("base64");

    const authTag = cipher.getAuthTag();

    return Buffer.concat([iv, authTag, Buffer.from(encrypted, "base64")]).toString("base64");
  }

  decrypt(ciphertext: string): string {
    const buffer = Buffer.from(ciphertext, "base64");

    const iv = buffer.subarray(0, IV_LENGTH);
    const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const encrypted = buffer.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

    const decipher = crypto.createDecipheriv(ALGORITHM, this.key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted.toString("base64"), "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }

  maskApiKey(apiKey: string): string {
    if (apiKey.length <= 8) {
      return "***";
    }
    const prefix = apiKey.substring(0, 3);
    const suffix = apiKey.substring(apiKey.length - 4);
    return `${prefix}...${suffix}`;
  }
}
