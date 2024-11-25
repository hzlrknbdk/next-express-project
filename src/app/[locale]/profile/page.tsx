import { useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import InputField from "@/app/[locale]/components/common/InputField";
import DatePickerField from "@/app/[locale]/components/common/DatePickerField";
import RadioGroup from "@/app/[locale]/components/common/RadioGroup";
import TextArea from "@/app/[locale]/components/common/TextArea";
import File from "@/app/[locale]/components/common/File";
import ProfileService from "@/pages/api/services/profile";
import User from "@/pages/api/services/user";
import { useState } from "react";
import Loading from "@/app/[locale]/components/core/Loading";
import { Button } from "@headlessui/react";
import Modal from "@/app/[locale]/components/features/Modal";
import { useTranslations } from "next-intl";

const schema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phoneNumber: Yup.string().optional(),
    birthDate: Yup.date().nullable().required("Birth date is required"),
    gender: Yup.string().required("Gender is required"),
    bio: Yup.string().optional(),
    profilePicture: Yup.mixed().optional(),
});

export default function ProfileForm() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const t = useTranslations("profile");

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            birthDate: undefined,
            gender: "",
            bio: "",
            profilePicture: "",
        },
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const userId = 1;
            try {
                // const res = await ProfileService.getProfileById(userId);
                // setValue(res.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const onSubmit = async (data: any) => {
        setLoading(true);
        setError(null);

        try {
            const userId = 1;

            const profileExists: any = await User.getUserById(userId);

            let response;

            if (profileExists.profile) {
                response = await ProfileService.updateProfile(userId, data);
            } else {
                response = await ProfileService.createProfile({ ...data, userId });
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg"
        >
            <Button
                onClick={handleOpenModal}
                className="rounded bg-gray-600 py-2 px-4 my-4 text-sm text-white data-[hover]:bg-gray-500 data-[hover]:data-[active]:bg-gray-700"
            >
                {t("showModal")}
            </Button>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={t("modalTitle")}
            >
                <p>{t("modalContent")}</p>
            </Modal>

            {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
            <InputField
                type="text"
                name="firstName"
                control={control}
                widthSize="w-full"
                label={t("firstNameLabel")}
                placeholder={t("firstNamePlaceholder")}
                error={errors.firstName?.message}
            />
            <InputField
                type="text"
                name="lastName"
                control={control}
                widthSize="w-full"
                label={t("lastNameLabel")}
                placeholder={t("lastNamePlaceholder")}
                error={errors.lastName?.message}
            />
            <InputField
                name="email"
                control={control}
                widthSize="w-full"
                label={t("emailLabel")}
                type="email"
                placeholder={t("emailPlaceholder")}
                error={errors.email?.message}
            />
            <InputField
                type="text"
                name="phoneNumber"
                widthSize="w-full"
                control={control}
                label={t("phoneNumberLabel")}
                placeholder={t("phoneNumberPlaceholder")}
                error={errors.phoneNumber?.message}
            />
            <DatePickerField
                name="birthDate"
                control={control}
                label={t("birthDateLabel")}
                placeholderText={t("birthDatePlaceholder")}
                error={errors.birthDate?.message}
            />
            <RadioGroup
                name="gender"
                label={t("genderLabel")}
                control={control}
                options={[
                    { label: t("male"), value: "male" },
                    { label: t("female"), value: "female" },
                    { label: t("other"), value: "other" },
                ]}
                error={errors.gender?.message}
            />
            <TextArea
                name="bio"
                label={t("bioLabel")}
                control={control}
                placeholder={t("bioPlaceholder")}
                error={errors.bio?.message}
            />
            <File
                type="file"
                name="profilePicture"
                control={control}
                label={t("profilePictureLabel")}
                error={errors.profilePicture?.message}
            />
            <div>
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500"
                >
                    {t("submitProfile")}
                </button>
            </div>
        </form>
    );
}
