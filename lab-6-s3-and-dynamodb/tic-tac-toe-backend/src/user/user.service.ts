import { Injectable } from '@nestjs/common';
import IStorageService from '../storage/interfaces/storage.interface';

@Injectable()
export class UserService {

  constructor(private storageService: IStorageService) { }

  public async uploadProfilePicture(userId: string, file: Buffer): Promise<string> {
    const key = `profile-pictures/${userId}.jpg`;
    return this.storageService.uploadFile(key, file);
  }
}
