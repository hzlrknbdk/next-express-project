import axiosInstance from "@/utils/axiosInstance";
import { CreateUserRequest, CreateUserResponse, UserInterface } from "@/types/interfaces/user";

class User {
    subdomain = "/users";

    createUser(options: CreateUserRequest) {
        return axiosInstance.post<CreateUserResponse>(`${this.subdomain}`, options);
    }

    getUserById(id: number) {
        return axiosInstance.get<UserInterface>(`${this.subdomain}/${id}`)
    }


}

export default new User();
