import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { ImagesCrudService } from "../services/images-crud.service";
import { memoryStorage } from "multer";
import { uploadFileDto } from "../dtos/images-crud.dto";
import { UploadFileResponse } from "../responses/image-crud.response";
@ApiTags("Images - crud")
@Controller("images")
export class ImagesCrudController {
  constructor(private readonly imagesCrudService: ImagesCrudService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
          "application/pdf",
        ];
        if (allowedTypes.includes(file.mimetype)) cb(null, true);
        else cb(new BadRequestException("Недопустимый тип файла"), false);
      },
    })
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadFileResponse> {
    if (!file) throw new BadRequestException('Файл не загружен');
    return this.imagesCrudService.processFile(file);
  }
}
