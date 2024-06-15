import { Injectable } from "@nestjs/common";

@Injectable()
abstract class IStorageService {
  abstract uploadFile(key: string, file: Buffer): Promise<string>;
  abstract deleteFile(key: string): Promise<void>;
}
export default IStorageService;
