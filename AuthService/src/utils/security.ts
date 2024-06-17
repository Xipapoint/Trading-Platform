import crypto from 'crypto';
import bcrypt from 'bcrypt';

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

  private static timestampIntGenerateId(): number {
    const uniqueNumber: string = new Date().toISOString().slice(2, 3) + 
        this.generateRandomNumber(3) +
        new Date().toISOString().slice(3, 10).replace(/-/g, '') +
        this.generateRandomNumber(2) +
        new Date().getMinutes().toString().padStart(2, '0');
    return parseInt(uniqueNumber, 10);
  }


  // PUBLIC
  public static async hash(data: string): Promise<string> {
    const saltRounds = 10; // количество раундов хеширования
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  public static async generateRandomUUID() : Promise<string>{
    return await crypto.randomUUID();
  }

  public static async createCardNumber(): Promise<string> {
    const saltRounds = 15; // количество раундов хеширования
    const salt = await bcrypt.genSalt(saltRounds);
    const data: string = this.timestampIntGenerateId().toString();
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  public static verifyPassword(password: string, hash: string): boolean {
    const [salt, originalHash] = hash.split(':');
    const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return originalHash === hashVerify;
  }

}
