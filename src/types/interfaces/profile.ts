export interface ProfileInterface {
  userId: number;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  birthDate?: Date | null;
  gender?: string;
  bio?: string;
  profilePicture?: FileList | null;
}
