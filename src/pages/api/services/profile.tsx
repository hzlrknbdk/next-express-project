import axiosInstance from "@/utils/axiosInstance";
import { ProfileInterface } from "@/types/interfaces/profile";

class Profile {
    subdomain = "/profile";

    createProfile(request: ProfileInterface) {
        return axiosInstance.post<ProfileInterface>(`${this.subdomain}`, request);
    }

    updateProfile(id: number, request: ProfileInterface) {
        return axiosInstance.put<ProfileInterface>(`${this.subdomain}/${id}`, request);
    }

    getProfileById(id: number) {
        return axiosInstance.get<ProfileInterface>(`${this.subdomain}/${id}`);
    }
}

export default new Profile();
