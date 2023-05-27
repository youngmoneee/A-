import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return file.filename;
  }
}
