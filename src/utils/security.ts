import crypto from 'crypto';

export class Security {
  // PRIVATE
  private static generateRandomNumber(length: number): string {
    const chars: string = '0123456789';
    let result: string = '';
    for (let i = 0; i < length; i++) {
      const randomIndex: number = crypto.randomInt(0, chars.length);
      result += chars[randomIndex];
    }
    return result;
  }


  // PUBLIC
  public static hash(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return `${salt}:${hash}`;
  }

  public static verifyPassword(password: string, hash: string): boolean {
    const [salt, originalHash] = hash.split(':');
    const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return originalHash === hashVerify;
  }

  public static timestampIntGenerateId(): number {
    const uniqueNumber: string = new Date().toISOString().slice(2, 3) + 
        Security.generateRandomNumber(3) +
        new Date().toISOString().slice(3, 10).replace(/-/g, '') +
        Security.generateRandomNumber(2) +
        new Date().getMinutes().toString().padStart(2, '0');
    return parseInt(uniqueNumber, 10);
  }
}
