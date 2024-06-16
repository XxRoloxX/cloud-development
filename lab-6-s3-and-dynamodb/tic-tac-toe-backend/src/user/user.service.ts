import { Injectable } from '@nestjs/common';
import IStorageService from '../storage/interfaces/storage.interface';
import IAuthService from '../auth/interfaces/auth.interface';
import UserResponseDto from './dto/user.response.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {

  constructor(private storageService: IStorageService, private authService: IAuthService) { }

  private static getProfilePictureUrl(userId: string) {
    return `profile-pictures/${userId}.jpg`;
  }

  public async uploadProfilePicture(userId: string, file: Buffer): Promise<string> {
    const key = UserService.getProfilePictureUrl(userId);
    return this.storageService.uploadFile(key, file);
  }

  public async getUser(userId: string): Promise<UserResponseDto> {
    const profile = await this.authService.profile(userId);
    const profilePictureUrl = this.storageService.getFileUrl(UserService.getProfilePictureUrl(userId));

    return {
      userId: profile.userId,
      username: profile.name,
      profilePictureUrl
    }


  }

}
