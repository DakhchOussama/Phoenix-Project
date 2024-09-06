import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Get, Res  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; // Import diskStorage from multer
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { PostServiceService } from '../post-service/post-service.service';

@Controller('posts')
export class PostControllerController {

    constructor(private readonly PostService: PostServiceService){}


    @Get('postuser')
    @UseGuards(JwtAuthGuard)
    async getPost(@Request() req, @Res() res) {
        try {
            const Posts = await this.PostService.getPost();
            return res.status(200).json(Posts); // Use res to send a response
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createPost(@Body() post, @Request() req){
        try{
            const userId =  req.user?.UserID;

            if (!userId) {
                throw new Error('User not authenticated');
            }

            const newPost = await this.PostService.createPost(post, userId);

            return newPost;

        } catch (error){
            console.error('Error creating post:', error);
            throw new Error('Error creating post');
        }
    }

    @Post('image')
    @UseGuards(JwtAuthGuard)
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
