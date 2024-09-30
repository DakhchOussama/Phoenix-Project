import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { UserService } from '../user/services/user.service';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {}

    @Get('fetchnotification')
    @UseGuards(JwtAuthGuard)
    async sendNotification(@Request() req, @Res() res) {
        try {
            const currentUserId = req.user.UserID;
            const notifications = await this.notificationService.getNotification(currentUserId);

            if (notifications && notifications.length > 0) {
                return res.status(200).json(notifications);
            } else {
                return res.status(200).json([]);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return res.status(500).json({ message: 'An error occurred while fetching notifications.' });
        }
    }

 
  
}
