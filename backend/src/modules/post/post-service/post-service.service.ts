import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostServiceService {

    constructor(
        private readonly prisma: PrismaService
    ){}

    async getPost(){

        const posts = await this.prisma.post.findMany({
            include: {
                user: {
                    select: {
                        Fname: true,
                        Sname: true,
                        AvatarURL: true,
                    },
                },
            },
        });

        const formattedPosts = posts.map(post => ({
            PostID: post.PostID,
            ImgURL: post.ImgURL,
            Title: post.Title,
            Categories: post.Categories,
            Type: post.Type,
            isEnabled: post.isEnabled,
            Likes: post.Likes,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            fname: post.user.Fname,
            sname: post.user.Sname,
            avatar: post.user.AvatarURL,
            translates: post.translates,
        }));

        console.log('posts : ', formattedPosts);

        // const UserId = post.userId;

        // const user = this.prisma.user.findUnique({
        //     where: {UserId},
        // });

       return formattedPosts;
    }


    async createPost(createPost: PostDto, userId: string): Promise<Post> {
        const { title, categorie, Type, isEnabled, imageUri } = createPost;
    
        const isEnabledValue: boolean = Boolean(isEnabled);
    
        const post = await this.prisma.post.create({
            data: {
                ImgURL: imageUri,
                Title: title,
                Categories: categorie,
                Type: Type,
                isEnabled: isEnabledValue,
                Likes: 0,
                userId: userId,
                translates: null 
            }
        });
    
        return post;
    }

    async likedpost(postId: string, userId: string): Promise<{ post: Post, message: string }> {
        const post = await this.prisma.post.findUnique({
            where: { PostID: postId },
        });
    
        if (!post) {
            throw new NotFoundException('Post not found');
        }
    
        const existingLike = await this.prisma.like.findUnique({
            where: {
                postId_userId: { postId, userId },
            },
        });
    
        if (existingLike) {
            throw new BadRequestException('You have already liked this post');
        }
    
        await this.prisma.like.create({
            data: {
                postId: postId,
                userId: userId,
            },
        });
    
        const updatedPost = await this.prisma.post.update({
            where: { PostID: postId },
            data: {
                Likes: post.Likes + 1,
            },
        });
    
        return { post: updatedPost, message: 'Post liked successfully' };
    }
    
}
