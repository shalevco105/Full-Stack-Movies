import crypto from 'crypto';

const algorithm = 'aes-256-cbc'; 
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY";

const key = crypto.createHash('sha256').update(JWT_SECRET_KEY).digest();

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
