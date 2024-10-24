export interface CreateUserResponse {
  data: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserInterface {
  id: number;
  email: string;
  name?: string;
  role: any;
  createdAt: Date;
  password: string;
  profileImage?: string;
  comments: any[];
  likes: any[];
  posts: any[];
  profile?: any;
}
