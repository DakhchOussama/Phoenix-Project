import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostServiceService {

    constructor(
        private readonly prisma: PrismaService
    ){}

    async getPost(userId: string){

        const post = await this.prisma.post.findMany({
            where: {
                userId: userId
            }
        });

       return post;
    }


    async createPost(createPost: PostDto, userId: string): Promise<Post> {
        const { title, categorie, Type, isEnabled, imageUri } = createPost;
    
        const isEnabledValue: boolean = Boolean(isEnabled);

        console.log('imageuril : ', imageUri);
        console.log('Type : ', Type);

    
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
    
}
