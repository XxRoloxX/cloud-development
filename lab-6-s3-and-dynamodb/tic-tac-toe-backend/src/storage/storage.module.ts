import { Module } from '@nestjs/common';
import { S3Service } from './s3/s3.service';
import IStorageService from './interfaces/storage.interface';

@Module({
  providers: [{
    provide: IStorageService,
    useClass: S3Service
  }],
  exports: [{
    provide: IStorageService,
    useClass: S3Service
  }]
})
export class StorageModule { }
