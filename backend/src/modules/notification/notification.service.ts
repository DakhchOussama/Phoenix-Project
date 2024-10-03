import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the import path based on your project structure
import { Notification } from '@prisma/client'; // Assuming you have a Notification model in Prisma
import { UserService } from '../user/services/user.service';
import { AppGateway } from '../Socket/app.gateway';

@Injectable()
export class NotificationService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
        private readonly appGateway: AppGateway
    ) {}

    // onModuleInit() {
    //     // Set up socket event listener
    //     this.appGateway.server.on('removeNotification', async (notificationId: string) => {
    //         try {
    //             const remove = await this.prisma.notification.delete({
    //                 where: {
    //                     NotificationID: notificationId,
    //                 },
    //             });

    //             console.log('remove : ', remove);

    //             // Notify the client about the result
    //             this.appGateway.server.emit('notificationRemoved', {
    //                 success: !!remove,
    //                 notificationId,
    //             });
    //         } catch (error) {
    //             console.error('Error removing notification:', error);
    //             this.appGateway.server.emit('notificationRemoved', { success: false, notificationId });
    //         }
    //     });
    // }

    async createNotification(data: {
        NotificationType: string;
        FriendID: string;
        UserID: string;
    }): Promise<Notification> {
        try {
            const notification = await this.prisma.notification.create({
                data: {
                    NotificationType: data.NotificationType,
                    FriendID: data.FriendID,
                    UserID: data.UserID,
                }
            });
            return notification;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw new Error('Could not create notification');
        }
    }

    async getNotification(userId: string){
        try {
            const notifications = await this.prisma.notification.findMany({
                where: {
                    UserID: userId
                }
            });

            const notificationDtos: NotificationDto[] = [];

            for (const notification of notifications) {
                const user = await this.userService.findById(notification.FriendID);

                // Push notification DTO with user details
                if (user) {
                    notificationDtos.push({
                        notificationId: notification.NotificationID,
                        notificationType: notification.NotificationType,
                        username: user.Fname + ' ' + user.Sname,
                        avatar: user.AvatarURL,
                        createdAt: notification.createdAt
                    });
                }
            }
            
            return notificationDtos;
            
        } catch (error) {
            return false
        }
    }
}
