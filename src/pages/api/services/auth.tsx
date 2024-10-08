import axiosInstance from "@/utils/axiosInstance";
import { LoginRequest, LoginResponse } from "@/types/interfaces/auth";

class Login {
  subdomain = "/login";

  login(credentials: LoginRequest) {
    return axiosInstance.post<LoginResponse>(`${this.subdomain}`, credentials);
  }
}

export default new Login();

