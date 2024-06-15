import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { StorageModule } from '../storage/storage.module';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UserService],
  imports: [StorageModule, AuthModule],
  controllers: [UserController]
})
export class UserModule { }
