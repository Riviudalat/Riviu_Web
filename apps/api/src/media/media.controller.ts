import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

export const UPLOAD_DIR = join(process.cwd(), 'uploads');

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];
const MAX_SIZE = 5 * 1024 * 1024;

@Controller('media')
export class MediaController {
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          if (!existsSync(UPLOAD_DIR)) {
            mkdirSync(UPLOAD_DIR, { recursive: true });
          }
          callback(null, UPLOAD_DIR);
        },
        filename: (_req, file, callback) => {
          const unique = `${Date.now()}-${randomBytes(4).toString('hex')}`;
          callback(
            null,
            `${unique}${extname(file.originalname).toLowerCase()}`,
          );
        },
      }),
      limits: { fileSize: MAX_SIZE },
      fileFilter: (_req, file, callback) => {
        if (ALLOWED_TYPES.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Chỉ nhận JPG, PNG, WebP hoặc PDF'),
            false,
          );
        }
      },
    }),
  )
  upload(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Thiếu file ảnh');
    }
    return { url: `/api/uploads/${file.filename}` };
  }
}
