"use client";

import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { CITIES } from "@/utils/constants";
import { useTranslations } from "next-intl";
import Loading from "../../components/core/Loading";
import "react-datepicker/dist/react-datepicker.css";
import TextArea from "../../components/common/TextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectBox from "../../components/common/SelectBox";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import InputField from "../../components/common/InputField";
import CheckBoxGroup from "../../components/common/CheckBoxGroup";
import DatePickerField from "../../components/common/DatePickerField";
import Event from "@/pages/api/services/event";

const schema = Yup.object({
    eventInfo: Yup.object({
        eventName: Yup.string().required("Event name is required"),
        eventType: Yup.string().required("Event type is required"),
        seminarDuration: Yup.number().required("Seminar duratio n is required"),
        dateTime: Yup.object({
            startDate: Yup.date().required("Start date is required"),
            endDate: Yup.date()
                .min(Yup.ref("startDate"), "End date cannot be before start date")
                .required("End date is required"),
        }).required(),
        city: Yup.string().required("City is required"),
        address: Yup.string().required("Address is required"),
        description: Yup.string(),
        organizerInfo: Yup.object({
            name: Yup.string().required("Organizer name is required"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            phone: Yup.string().required("Phone number is required"),
        }).required(),
    }).required(),
    participantInfo: Yup.object({
        maxParticipants: Yup.number()
            .integer("Must be an integer")
            .positive("Must be a positive number")
            .required("Maximum participants are required"),
        participationFee: Yup.object({
            isPaid: Yup.boolean().required(),
            feeAmount: Yup.number()
                .positive("Fee amount must be a positive number")
                .required("Fee amount is required"),
        }).required(),
    }).required(),
    eventDetails: Yup.object({
        programSchedule: Yup.array()
            .of(
                Yup.object({
                    session: Yup.string().required("Session name is required"),
                    startTime: Yup.string().required("Start time is required"),
                    endTime: Yup.string().required("End time is required"),
                }).required()
            )
            .required(),
        speakersOrTrainers: Yup.array()
            .of(
                Yup.object({
                    name: Yup.string().required("Speaker or trainer name is required"),
                    bio: Yup.string(),
                }).required()
            )
            .required(),
    }).required(),
} as const);

type FormSchema = Yup.InferType<typeof schema>;

const Events: React.FC<any> = ({ selectedEvent, isEditForm }) => {
    const {
        watch,
        reset,
        control,
        setFocus,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            eventInfo: {
                eventName: "",
                eventType: "",
                seminarDuration: 0,
                dateTime: {
                    endDate: new Date(),
                    startDate: new Date(),
                },
                city: "",
                address: "",
                description: "",
                organizerInfo: {
                    name: "",
                    email: "",
                    phone: "",
                },
            },
            participantInfo: {
                maxParticipants: 0,
                participationFee: {
                    isPaid: false,
                    feeAmount: 0,
                },
            },
            eventDetails: {
                programSchedule: [{ session: "", startTime: "", endTime: "" }],
                speakersOrTrainers: [{ name: "", bio: "" }],
            },
        },
    });

    const {
        fields: scheduleFields,
        append: appendSchedule,
        remove: removeSchedule,
    } = useFieldArray({
        control,
        name: "eventDetails.programSchedule",
    });

    const {
        fields: speakerFields,
        append: appendSpeaker,
        remove: removeSpeaker,
    } = useFieldArray({
        control,
        name: "eventDetails.speakersOrTrainers",
    });

    const t = useTranslations("events");
    const eventType = watch("eventInfo.eventType");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onEventTypeChange = () => {
        setValue("eventInfo.seminarDuration", 0);
    };

    const onSubmit: SubmitHandler<FormSchema> = async (data: FormSchema) => {
        setLoading(true);
        setError(null);

        try {
            await Event.createEvent({ ...data });
            reset();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedEvent && isEditForm) {
            reset({
                eventInfo: {
                    eventName: selectedEvent.eventName,
                    eventType: selectedEvent.eventType,
                    seminarDuration: selectedEvent.seminarDuration || 0,
                    dateTime: {
                        startDate: new Date(selectedEvent.startDate),
                        endDate: new Date(selectedEvent.endDate),
                    },
                    city: selectedEvent.city,
                    address: selectedEvent.address,
                    description: selectedEvent.description,
                    organizerInfo: {
                        name: selectedEvent.organizerName,
                        email: selectedEvent.organizerEmail,
                        phone: selectedEvent.organizerPhone,
                    },
                },
                participantInfo: {
                    maxParticipants: selectedEvent.maxParticipants,
                    participationFee: {
                        isPaid: selectedEvent.isPaid,
                        feeAmount: selectedEvent.feeAmount,
                    },
                },
                eventDetails: {
                    programSchedule: selectedEvent.programSchedule || [],
                    speakersOrTrainers: selectedEvent.speakersOrTrainers || [],
                },
            });
        }
    }, [selectedEvent, isEditForm, reset]);

    if (loading) return <Loading />;


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mx-auto p-8 bg-white rounded-lg shadow-lg"
        >
            {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
            <div className="grid grid-cols-2 gap-4">
                <InputField
                    type="text"
                    widthSize="w-80"
                    name="eventInfo.eventName"
                    control={control}
                    label={t("eventInfo.eventName")}
                    placeholder={t("eventInfo.eventName")}
                    error={errors.eventInfo?.eventName?.message}
                    required
                />
                <SelectBox
                    name="eventInfo.eventType"
                    label={t("eventInfo.eventType")}
                    control={control}
                    options={[
                        { value: "Konser", label: "Konser" },
                        { value: "Seminer", label: "Seminer" },
                        { value: "Konferans", label: "Konferans" },
                        { value: "Workshop", label: "Workshop" },
                    ]}
                    onChange={onEventTypeChange}
                    placeholder={t("eventInfo.eventType")}
                    error={errors.eventInfo?.eventType?.message}
                    required
                />
                {eventType === "Seminer" && (
                    <InputField
                        type="number"
                        widthSize="w-20"
                        control={control}
                        name="eventInfo.seminarDuration"
                        label={t("eventInfo.seminarDuration")}
                        placeholder={t("eventInfo.seminarDuration")}
                        required
                    />
                )}
                <DatePickerField
                    name="eventInfo.dateTime.startDate"
                    control={control}
                    label={t("eventInfo.dateTime.startDate")}
                    placeholderText={t("eventInfo.dateTime.startDate")}
                    error={errors.eventInfo?.dateTime?.startDate?.message}
                    required
                />
                <DatePickerField
                    name="eventInfo.dateTime.endDate"
                    control={control}
                    label={t("eventInfo.dateTime.endDate")}
                    placeholderText={t("eventInfo.dateTime.endDate")}
                    error={errors.eventInfo?.dateTime?.endDate?.message}
                    required
                />
                <SelectBox
                    name="eventInfo.city"
                    label={t("eventInfo.city")}
                    control={control}
                    options={CITIES}
                    placeholder={t("eventInfo.city")}
                    error={errors.eventInfo?.city?.message}
                    required
                />
                <InputField
                    type="text"
                    widthSize="w-80"
                    name="eventInfo.address"
                    control={control}
                    label={t("eventInfo.address")}
                    placeholder={t("eventInfo.address")}
                    error={errors.eventInfo?.address?.message}
                    required
                />
                <InputField
                    type="text"
                    widthSize="w-80"
                    name="eventInfo.organizerInfo.name"
                    control={control}
                    label={t("eventInfo.organizerInfo.name")}
                    placeholder={t("eventInfo.organizerInfo.name")}
                    error={errors.eventInfo?.organizerInfo?.name?.message}
                    required
                />
                <InputField
                    type="email"
                    widthSize="w-80"
                    name="eventInfo.organizerInfo.email"
                    control={control}
                    label={t("eventInfo.organizerInfo.email")}
                    placeholder={t("eventInfo.organizerInfo.email")}
                    error={errors.eventInfo?.organizerInfo?.email?.message}
                    required
                />
                <InputField
                    type="tel"
                    widthSize="w-80"
                    name="eventInfo.organizerInfo.phone"
                    control={control}
                    label={t("eventInfo.organizerInfo.phone")}
                    placeholder={t("eventInfo.organizerInfo.phone")}
                    error={errors.eventInfo?.organizerInfo?.phone?.message}
                    required
                />
                <CheckBoxGroup
                    control={control}
                    type="checkbox"
                    name="participantInfo.participationFee.isPaid"
                    label={t("participantInfo.participationFee.isPaid")}
                    options={[
                        {
                            label: `${t("participantInfo.participationFee.isPaid")}`,
                            value: `${t("participantInfo.participationFee.isPaid")}`,
                        },
                    ]}
                    error={errors?.participantInfo?.participationFee?.isPaid?.message}
                />
                <InputField
                    type="number"
                    widthSize="w-50"
                    control={control}
                    name="participantInfo.participationFee.feeAmount"
                    label={t("participantInfo.participationFee.feeAmount")}
                    placeholder={t("participantInfo.participationFee.feeAmount")}
                    error={errors.participantInfo?.participationFee?.feeAmount?.message}
                    required
                />
                <InputField
                    type="number"
                    widthSize="w-50"
                    control={control}
                    name="participantInfo.maxParticipants"
                    label={t("participantInfo.maxParticipants")}
                    placeholder={t("participantInfo.maxParticipants")}
                    error={errors.participantInfo?.maxParticipants?.message}
                    required
                />
                <TextArea
                    control={control}
                    name="eventInfo.description"
                    label={t("eventInfo.description")}
                    placeholder={t("eventInfo.description")}
                    error={errors.eventInfo?.description?.message}
                />
                <div className="col-span-2 mt-4">
                    {scheduleFields.map((item, index) => (
                        <div key={item.id} className="flex space-x-4 mb-4">
                            <InputField
                                required
                                type="text"
                                widthSize="w-50"
                                control={control}
                                placeholder={t("eventDetails.sessions.sessionTitle")}
                                label={`${t("eventDetails.sessions.sessionTitle")} ${index + 1
                                    }`}
                                name={`eventDetails.programSchedule.${index}.session`}
                                error={
                                    errors.eventDetails?.programSchedule?.[index]?.session
                                        ?.message
                                }
                            />
                            <DatePickerField
                                required
                                control={control}
                                label={t("eventDetails.sessions.sessionStartTime")}
                                placeholderText={t("eventDetails.sessions.sessionStartTime")}
                                name={`eventDetails.programSchedule.${index}.startTime`}
                                error={
                                    errors.eventDetails?.programSchedule?.[index]?.startTime
                                        ?.message
                                }
                            />
                            <DatePickerField
                                required
                                control={control}
                                label={t("eventDetails.sessions.sessionEndTime")}
                                placeholderText={t("eventDetails.sessions.sessionEndTime")}
                                name={`eventDetails.programSchedule.${index}.endTime`}
                                error={
                                    errors.eventDetails?.programSchedule?.[index]?.endTime
                                        ?.message
                                }
                            />
                            <button
                                type="button"
                                className="text-blue-500 text-sm px-1"
                                onClick={() => removeSchedule(index)}
                            >
                                {t("remove")}
                            </button>
                        </div>
                    ))}
                    <button
                        className="text-blue-500 text-sm px-1 py-2"
                        type="button"
                        onClick={() =>
                            appendSchedule({ session: "", startTime: "", endTime: "" })
                        }
                    >
                        {t("addSession")}
                    </button>
                </div>
                <hr />
                <div className="col-span-2 mt-4">
                    {speakerFields.map((item, index) => (
                        <div key={item.id} className="flex space-x-4 mb-4">
                            <InputField
                                required
                                type="text"
                                widthSize="w-50"
                                control={control}
                                placeholder={t("eventDetails.speakers.speakerName")}
                                label={`${t("eventDetails.speakers.speakerName")} ${index + 1}`}
                                name={`eventDetails.speakersOrTrainers.${index}.name`}
                                error={
                                    errors.eventDetails?.speakersOrTrainers?.[index]?.name
                                        ?.message
                                }
                            />
                            <TextArea
                                control={control}
                                placeholder={t("eventDetails.speakers.speakerBio")}
                                label={`${t("eventDetails.speakers.speakerBio")} ${index + 1}`}
                                name={`eventDetails.speakersOrTrainers.${index}.bio`}
                                error={
                                    errors.eventDetails?.speakersOrTrainers?.[index]?.bio?.message
                                }
                            />
                            <button
                                type="button"
                                className="text-blue-500 text-sm px-1"
                                onClick={() => removeSpeaker(index)}
                            >
                                {t("remove")}
                            </button>
                        </div>
                    ))}
                    <button
                        className="text-blue-500 text-sm px-1 py-2"
                        type="button"
                        onClick={() => appendSpeaker({ name: "", bio: "" })}
                    >
                        {t("addSpeaker")}
                    </button>
                </div>
                <hr />
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full px-6 py-3 mb-10 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500"
                >
                    {isEditForm ? t("updateEvent")
                        : t("submitEvent")}
                </button>
            </div>
        </form>
    );
};

export default Events;
