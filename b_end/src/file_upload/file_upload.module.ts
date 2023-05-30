import { Module } from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: '../../uploads',
        filename: (req, file, cb) => {
          //  unique fileName
          const fileName = `${file.fieldname}-${uuidv4()}`;
          console.log('fileName::', fileName);
          cb(null, fileName);
        },
      }),
    }),
  ],
  providers: [FileUploadService],
})
export class FileUploadModule {}
