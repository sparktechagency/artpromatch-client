export interface  GuestSpot {
  _id: string;

  startDate: Date;
  endDate: Date;

  startTime?: string;
  endTime?: string;

  stringLocation?: string;

  offDays?: string[];

  location: {
    coordinates: [number, number];
    until: string;
  };

  isActive: boolean;
}
