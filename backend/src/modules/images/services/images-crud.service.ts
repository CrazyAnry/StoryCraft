import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import * as cloudinary from 'cloudinary';
import * as streamifier from 'streamifier';
import { uploadFileDto } from '../dtos/images-crud.dto';
import { UploadFileResponse } from '../responses/image-crud.response';

@Injectable()
export class ImagesCrudService {

  constructor() {

    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async processFile(file: Express.Multer.File): Promise<UploadFileResponse>   {
    try {
      const ext = path.extname(file.originalname).toLowerCase();
      const isImage = file.mimetype.startsWith('image/') && file.mimetype !== 'image/svg+xml';
      const isPDF = file.mimetype === 'application/pdf';

      if (isImage) {
        const webpBuffer = await sharp(file.buffer).webp({ quality: 80 }).toBuffer();

        const result = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
              folder: 'files',
              resource_type: 'image',
              public_id: `file_${Date.now()}_${uuidv4().slice(0, 6)}`,
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          streamifier.createReadStream(webpBuffer).pipe(uploadStream);
        });

        return {
          success: true,
          url: result.secure_url,
          name: file.originalname,
          mimetype: 'image/webp',
          size: file.size,
          formatSize: this.formatFileSize(file.size),
          originalExtension: ext,
        };

      } else if (isPDF) {
        const filename = `${Date.now()}_${uuidv4()}${ext}`;

        return {
          success: true,
          url: `/uploads/${filename}`, // если сервишь статику
          name: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          formatSize: this.formatFileSize(file.size),
          originalExtension: ext,
        };
      } else {
        throw new BadRequestException('Недопустимый тип файла');
      }
    } catch (error) {
      console.error('Ошибка обработки файла:', error);
      throw new InternalServerErrorException('Ошибка загрузки файла');
    }
  }
}
