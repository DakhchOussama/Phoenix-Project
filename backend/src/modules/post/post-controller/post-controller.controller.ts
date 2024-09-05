import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; // Import diskStorage from multer
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';

@Controller('posts')
export class PostControllerController {

    constructor(){}

    @Post('create')
    async createPost(@Body() post){
        console.log('Post : ', post);
    }

    @Post('image')
    // @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return {
            message: 'File uploaded successfully',
            filename: file.filename,
        };
    }
}
