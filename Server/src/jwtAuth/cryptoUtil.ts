import crypto from 'crypto';
import { appConfig } from '../utils/appConfig';

const algorithm = 'aes-256-cbc';

const key = crypto.createHash('sha256').update(appConfig.JWT_SECRET_KEY).digest();

const generateIV = () => crypto.randomBytes(16);

export function encrypt(text: string): string {
  const iv = generateIV();
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}