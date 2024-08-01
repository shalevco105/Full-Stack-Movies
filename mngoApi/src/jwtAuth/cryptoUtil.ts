import crypto from 'crypto';

// Use AES-GCM which handles key internally
const ALGORITHM = 'aes-256-gcm'; // AES-256-GCM is more modern and does not require a 32-byte key manually
const KEY_LENGTH = 32; // 256-bit key length for AES-256
const IV_LENGTH = 12; // AES-GCM standard IV length

// Generate a key derived from a passphrase (password) - not directly used here, but could be for more complex scenarios
const generateKey = (passphrase: string): Buffer => {
  return crypto.createHash('sha256').update(passphrase).digest();
};

// Encrypt a text using AES-256-GCM
export const encrypt = (text: string, passphrase: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = generateKey(passphrase);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted.toString('hex');
};

// Decrypt a text using AES-256-GCM
export const decrypt = (text: string, passphrase: string): string => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const tag = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const key = generateKey(passphrase);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString('utf8');
};
