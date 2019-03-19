export interface User {
  id?: string,

  username: string,

  displayName?: string,

  password: string,

  repeatPassword?: string;

  profileImage?: { uri: string };
}

export interface FeedContent {
  image: { uri: string };

  title: string;

  tags?: string[] | string;

  createdDate?: number | null;

  userId?: string;

  userProfileImg?: {uri: string};
}

