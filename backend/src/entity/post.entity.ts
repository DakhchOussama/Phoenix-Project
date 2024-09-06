// post.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    categorie: string;

    @Column()
    type: string;

    @Column({ default: true })
    isEnabled: boolean;

    @Column({ nullable: true })
    image: string; // Store the image URL or path
}
