import axiosInstance from "@/utils/axiosInstance";
import { CreateUserRequest, CreateUserResponse } from "@/types/interfaces/user";

class User {
    subdomain = "/users";

    createUser(options: CreateUserRequest) {
        return axiosInstance.post<CreateUserResponse>(`${this.subdomain}`, options);
    }
}

export default new User();
