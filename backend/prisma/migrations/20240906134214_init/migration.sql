-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL,
    "Fname" TEXT NOT NULL,
    "Sname" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Birthday" TIMESTAMP(3) NOT NULL,
    "Department" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "AvatarURL" TEXT NOT NULL,
    "Ban" BOOLEAN DEFAULT false,
    "isAdmin" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Notification" (
    "NotificationID" TEXT NOT NULL,
    "Time" TIMESTAMP(3) NOT NULL,
    "NotificationType" TEXT NOT NULL,
    "FriendID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("NotificationID")
);

-- CreateTable
CREATE TABLE "Post" (
    "PostID" TEXT NOT NULL,
    "ImgURL" TEXT,
    "Title" TEXT NOT NULL,
    "Categories" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "Likes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "translates" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("PostID")
);

-- CreateTable
CREATE TABLE "Friends" (
    "FriendID" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "FriendId" TEXT NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("FriendID")
);

-- CreateTable
CREATE TABLE "Comment" (
    "CommentID" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("CommentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Phone_key" ON "User"("Phone");

-- CreateIndex
CREATE UNIQUE INDEX "Friends_UserId_FriendId_key" ON "Friends"("UserId", "FriendId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_FriendId_fkey" FOREIGN KEY ("FriendId") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("PostID") ON DELETE RESTRICT ON UPDATE CASCADE;
