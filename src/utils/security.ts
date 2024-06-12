import crypto from 'crypto';

export class Security {
  public static hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return `${salt}:${hash}`;
  }

  public static verifyPassword(password: string, hash: string): boolean {
    const [salt, originalHash] = hash.split(':');
    const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return originalHash === hashVerify;
  }
}
