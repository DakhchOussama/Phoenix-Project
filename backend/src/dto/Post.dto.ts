interface PostDto{
    title: string;
    categorie: string;
    Type: string;
    isEnabled: Boolean;
    imageUri: string;
}

interface Post {
    PostID: string;
    ImgURL?: string;
    Title: string;
    Categories: string;
    Type: string;
    isEnabled: boolean;
    Likes: number;
    userId: string;
  }
  