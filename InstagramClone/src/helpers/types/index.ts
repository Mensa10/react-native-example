export interface User {
  id?: string,

  email: string,

  displayName?: string,

  password: string,

  repeatPassword?: string;

  profileImage: { uri: string };
}

export interface FeedContent {
  image: { uri: string };

  title: string;

  createdDate?: number | null;

  userId?: string;

  displayName?: string;

  userProfileImg: { uri: string };
}

