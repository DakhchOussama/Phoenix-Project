import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Get, Res, Param, Response, Query, Delete, InternalServerErrorException, Patch  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; // Import diskStorage from multer
import { extname, join } from 'path';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { PostServiceService } from '../post-service/post-service.service';
import { createReadStream } from 'fs';
import { UserService } from 'src/modules/user/services/user.service';
import { AppGateway } from 'src/modules/Socket/app.gateway';
import { NotificationService } from 'src/modules/notification/notification.service';
import { Server } from 'socket.io';

@Controller('posts')
export class PostControllerController {

    constructor(
        private readonly PostService: PostServiceService,
        private readonly UserService: UserService,
        private readonly appGateway: AppGateway,
        private readonly NotificationService: NotificationService
        
    ){}


    @Get('postuser')
    @UseGuards(JwtAuthGuard)
    async getPost(@Request() req, @Res() res) {
        try {
            const currentUserId = req.user.UserID;
            const posts = await this.PostService.getPost(currentUserId);

            return res.status(200).json(posts);
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

            const newComment = await this.PostService.createPost(post, userId);

            return newComment;

        } catch (error){
            console.error('Error creating post:', error);
            throw new Error('Error creating post');
        }
    };


    @Post('getcomments')
    @UseGuards(JwtAuthGuard)
    async getComments(@Body() data, @Request() req) {
        try {
            const userId = req.user?.UserID;
    
            if (!userId) {
                throw new Error('User not authenticated');
            }
    
            const comments = await this.PostService.getComments(data.postId);
    
            const filteredComments = comments.map(comment => ({
                fname: comment.user.fname,
                sname: comment.user.sname,
                avatar: comment.user.avatar,
                content: comment.content,
            }));
    
            return { success: true, data: filteredComments };
        } catch (error) {
            console.error('Error retrieving comments:', error);
            throw new Error('Error retrieving comments');
        }
    }

    @Patch('edit')
    @UseGuards(JwtAuthGuard)
    async editpost(@Body() data) {
        try {
            if (data) {
                const response = await this.PostService.editPost(data);
                if (response) {
                    return {
                        message: 'Post updated successfully',
                        success: true,
                    };
                } else {
                    throw new Error('Failed to update the post');
                }
            }
        } catch (error) {
            return {
                message: 'An error occurred while updating the post',
                success: false,
            };
        }
    }

    @Post('Traduction')
    @UseGuards(JwtAuthGuard)
    async uploadTraduction(@Body() data) {
        try {
            if (data) {
                const response = await this.PostService.addTraduction(data);
                if (response) {
                    return {
                        message: 'Post updated successfully',
                        success: true,
                    };
                } else {
                    throw new Error('Failed to update the post');
                }
            }
        } catch (error) {
            return {
                message: 'An error occurred while updating the post',
                success: false,
            };
        }
    }

    @Post('addcomment')
    @UseGuards(JwtAuthGuard)
    async Addcomment(@Body() data, @Request() req){
        try{
            const userId =  req.user?.UserID;
            if (!userId) {
                throw new Error('User not found');
              }

            if (!userId) {
                throw new Error('User not authenticated');
            }

            const newComment = await this.PostService.createcomment(data, userId);

            if (newComment) {
                const user = await this.UserService.findById(userId);
                const post = await this.PostService.findPostById(data.postId);
                if (post.userId != userId){
                    const notification = await this.NotificationService.createNotification({
                        NotificationType: 'Comment',
                        FriendID: userId,
                        UserID: post.userId
                    });
    
                    if (notification){
                        const senddata = {
                            notificationId: notification.NotificationID,
                            notificationType: notification.NotificationType,
                            username: `${user.Fname} ${user.Sname}`,
                                                avatar: user.AvatarURL,
                            createdAt: notification.createdAt
                        };
    
                        const post = await this.PostService.findPostById(data.postId);
    
                        const socket: Server = this.appGateway.server;
                        socket.to(post.userId).emit('notification', senddata);
                    }
                }
                const senddata = {
                    username: `${user.Fname} ${user.Sname}`,
                    avatar: user.AvatarURL,
                    comment: data.comment
                };  

                return senddata;
            } else {
                return false;
            }

        } catch (error){
            console.error('Error creating post:', error);
            throw new Error('Error creating post');
        }
    }
    
    @Get(':postId/like')
    @UseGuards(JwtAuthGuard)
    async likePost(
        @Param('postId') postId: string,
        @Query('userId') userId: string,
    ): Promise<boolean>
    {
        try{
            const check = await this.PostService.likedpost(postId, userId);
            if (check){
                const post = await this.PostService.findPostById(postId);

                if (post.userId != userId){
                    const user = await this.UserService.findById(userId);
                    
                    const notification = await this.NotificationService.createNotification({
                        NotificationType: 'like',
                        FriendID: userId,
                        UserID: post.userId,
                    });

                    if (notification){
                        
                        const senddata = {
                            notificationId: notification.NotificationID,
                            notificationType: notification.NotificationType,
                            username: `${user.Fname} ${user.Sname}`,
                                                avatar: user.AvatarURL,
                            createdAt: notification.createdAt
                        };

                        const socket: Server = this.appGateway.server;
                        socket.to(post.userId).emit('notification', senddata);
                        
                    }
                }
            }
            return true;
        } catch (error){
            return false; // change this 
        }
    }


    @Get(':postId/like/check')
    @UseGuards(JwtAuthGuard)
    async CheckPost(
        @Param('postId') postId: string,
        @Query('userId') userId: string,
    ): Promise<boolean>
    {
        try{
            const check = await this.PostService.checkpost(postId, userId); // change return of checkpost
            return check;
        } catch (error){
            throw new InternalServerErrorException('Failed to like post');
        }
    }

    @Delete(':postId/removepost')
    @UseGuards(JwtAuthGuard)
    async RemovePost(
        @Param('postId') postId: string,
    ): Promise<{ success: boolean; message?: string }>
    {
        try{
            await this.PostService.removepost(postId);
            return {success: true};
        } catch (error){
            throw new InternalServerErrorException('Failed to remove post');
        }
    }

    @Get('userdata')
    @UseGuards(JwtAuthGuard)
    async getuserPost(@Request() req, @Res() res) {
        try {
            const currentUserId = req.user.UserID;
            const stats = await this.PostService.getUserPostsStatistics(currentUserId);

            return res.status(200).json(stats);
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({ message: 'Internal server error' });
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
    };
    
    
    @Get('/image/:imgPath')
    // @UseGuards(JwtAuthGuard)
    async getImage(@Param('imgPath') img, @Response() res){
        const filePath = join(process.cwd(), 'uploads', img);
        
        const filestream = createReadStream(filePath);
        
        filestream.on('error', (err) => {
            res.status(404).send({ message: 'File not found' });
        });
        
        filestream.pipe(res);
    }
}
