import { Injectable, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class FileUploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return file.filename;
  }
}
