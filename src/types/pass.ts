export interface BusPassData {
  name: string;
  employeeId: string;
  busStopName: string;
  routeType: string;
  startDate: string;
  endDate: string;
  officeInTime: string;
  officeOutTime: string;
  origin: string;
  destination: string;
  routeDescription: string;
  status: 'CONFIRMED' | 'ACTIVE' | 'EXPIRED';
  busNumber?: string;
  seatNumber?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'schedule' | 'alert' | 'pass';
}

export interface RouteStop {
  stopName: string;
  scheduledTime: string;
  isOrigin?: boolean;
  isDestination?: boolean;
  isUserStop?: boolean;
}
