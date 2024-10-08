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
