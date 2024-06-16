import { Injectable } from '@nestjs/common';
import { S3, S3Client, ListBucketsCommand, UploadPartCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import IStorageService from '../interfaces/storage.interface';
import { todo } from 'node:test';

class S3Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'S3Error';
  }
}

@Injectable()
export class S3Service implements IStorageService {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.client = new S3({ region: 'us-east-1' });
    this.bucket = process.env.BUCKET_NAME;
  }
  private getS3Url(key: string) {
    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }


  public async uploadFile(key: string, body: Buffer) {
    const uploadFileCommand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: body,
    })
    try {
      const response = await this.client.send(uploadFileCommand);
      console.log(response);
      return this.getS3Url(key);
    } catch (error) {
      console.error(`Couldn't upload a file: `, error);
      throw new S3Error(`Couldn't upload a file: ${error}`);
    }
  }
  public async deleteFile(key: string) {
    todo();
  }

  public getFileUrl(key: string) {
    return this.getS3Url(key);
  }

}
