"use client";

import Events from "./createEvent/page";
import { Button } from "@headlessui/react";
import DataTable from "../components/common/DataTable";
import Modal from "@/app/[locale]/components/features/Modal";
import { useEffect, useMemo, useState } from "react";
import EventService from "@/pages/api/services/event";

interface ColumnProps extends Record<string, any> {
    accessorKey: string;
    isVisible: boolean;
    header: string;
    filterType?: "text" | "number" | "select" | "date" | "boolean";
    filterOptions?: string[];
}

export default function EventList() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isEditForm, setEditForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);

    const columns = useMemo<ColumnProps[]>(
        () => [
            {
                accessorKey: "eventName",
                header: "Name",
                filterType: "text",
                isVisible: true,
            },
            {
                accessorKey: "eventType",
                header: "Type",
                filterType: "select",
                isVisible: true,
            },
            {
                accessorKey: "startDate",
                header: "StartDate",
                filterType: "date",
                isVisible: true,
            },
            {
                accessorKey: "endDate",
                header: "EndDate",
                filterType: "date",
                isVisible: true,
            },
            {
                accessorKey: "city",
                header: "City",
                filterType: "select",
                isVisible: true,
            },
            {
                accessorKey: "address",
                header: "Adress",
                filterType: "text",
                isVisible: true,
            },
            {
                accessorKey: "description",
                header: "Description",
                filterType: "text",
                isVisible: true,
            },
            {
                accessorKey: "organizerName",
                header: "OrganizerName",
                filterType: "text",
                isVisible: true,
            },
            {
                accessorKey: "organizerEmail",
                header: "OrganizerEmail",
                filterType: "text",
                isVisible: true,
            },
            {
                accessorKey: "organizerPhone",
                header: "OrganizerPhone",
                filterType: "number",
                isVisible: true,
            },
        ],
        []
    );


    const openCreateModal = () => {
        setSelectedEvent(null);
        setEditForm(false);
        setModalOpen(true);
    };

    const openEditModal = (eventId: any) => {
        getDetailEvent(eventId);
        setModalOpen(true);
        setEditForm(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditForm(false);
        getEvents()
    };

    const getDetailEvent = async (eventId: number) => {
        if (!eventId) return;
        const event = await EventService.getEventById(eventId);
        setSelectedEvent(event.data);
    };

    const getEvents = async () => {
        setLoading(true);

        try {
            const res: any = await EventService.getEvents();

            const formatDate = (dateString: any) => {
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();

                return `${day}.${month}.${year}`;
            };

            const formattedData = res.data.map((event: any) => ({
                ...event,
                startDate: formatDate(event.startDate),
                endDate: formatDate(event.endDate),
            }));

            setData(formattedData);

        } catch (error) {
            console.error("Error fetching event:", error);
        }
        finally {
            setLoading(false);
        }
    };


    const deleteEvent = async (eventId: number) => {
        if (!eventId) return;
        EventService.deleteEvent(eventId);
    }


    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className="flex flex-col max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="flex justify-end">

                {loading && "Loading..."}

                <Button
                    onClick={openCreateModal}
                    className="rounded border-gray-500 bg-white py-2 px-4 text-xs text-gray-600 hover:bg-gray-500 hover:text-white active:bg-gray-500 active:text-white shadow-lg"
                >
                    + Etkinlik Ekle
                </Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Events selectedEvent={selectedEvent} isEditForm={isEditForm} />
            </Modal>

            <DataTable
                data={data}
                refreshData={getEvents}
                columns={columns}
                openEditModal={(id: number) => openEditModal(id)}
                deleteSelectedRow={(id: number) => deleteEvent(id)}
            />

        </div>
    );
}
