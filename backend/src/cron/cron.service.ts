import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import * as cron from 'node-cron';

@Injectable()
export class CronService implements OnModuleInit {
    constructor(private prisma: PrismaService) {}

    onModuleInit() {
        cron.schedule('* * * * *', async () => {
            await this.unbanUsers();
        });
    }

    async unbanUsers() {
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

        try {
            const usersToUnban = await this.prisma.user.updateMany({
                where: {
                    Ban: true,
                    BanDate: { lte: fifteenDaysAgo },
                },
                data: {
                    Ban: false,
                    BanDate: null,
                },
            });
        } catch (error) {
            console.error('Error unbanning users:', error);
        }
    }
}
