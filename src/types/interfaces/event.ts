export interface EventInterface {
  eventInfo: {
    eventName: string;
    eventType: string;
    seminarDuration: number;
    dateTime: {
      startDate: Date;
      endDate: Date;
    };
    city: string;
    address: string;
    description?: string;
    organizerInfo: {
      name: string;
      email: string;
      phone: string;
    };
  };
  participantInfo: {
    maxParticipants: number;
    participationFee: {
      isPaid: boolean;
      feeAmount?: number;
    };
  };
  eventDetails: {
    programSchedule: {
      session: string;
      startTime: string;
      endTime: string;
    }[];
    speakersOrTrainers: {
      name: string;
      bio?: string;
    }[];
  };
}
