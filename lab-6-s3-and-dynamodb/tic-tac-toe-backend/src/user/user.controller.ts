import { Controller, MaxFileSizeValidator, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { Get, UseGuards, Param, Post, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { UserGuard } from './guards/user.guard';
import { Express } from 'express'

@Controller('users/:id')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @UseGuards(UserGuard)
  @Post("/profile-picture")
  @UseInterceptors(FileInterceptor('profile-picture'))
  async postProfilePicture(
    @Param() params: { id: string },
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000, message: "File size too large" }),
          new FileTypeValidator({ fileType: "image" })
        ]
      })
    ) file: Express.Multer.File): Promise<void> {
    try {
      this.userService.uploadProfilePicture(`${params.id}`, file.buffer)
    } catch (error) {
      console.log(`Error uploading profile picture: ${error.message}`)
      throw new BadRequestException(error.message)
    }
  }
  @Get()
  async getUser(@Param() params: { id: string }) {
    try {
      return this.userService.getUser(params.id)
    } catch (error) {
      console.log(`Error getting user: ${error.message}`)
      throw new BadRequestException(error.message)
    }
  }
}
