import { addMinutes, isBefore, isAfter, setHours, setMinutes, format, parseISO, addDays } from 'date-fns';

// Types
export interface Table {
  id: number;
  name: string;
  capacity: number;
  count: number;
  type: 'window' | 'standard' | 'booth' | 'large' | 'private';
  minPartySize: number;
  maxPartySize: number;
  isAvailable: boolean;
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  availableTables: Table[];
}

export interface ReservationRequest {
  date: Date;
  time: string;
  guests: number;
  tableId: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface Reservation extends ReservationRequest {
  id: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Constants
export const RESTAURANT_CONFIG = {
  openingTime: 11, // 11 AM
  closingTime: 22, // 10 PM
  diningDuration: 120, // 2 hours
  minAdvanceBooking: 1, // 1 hour
  maxAdvanceBooking: 30, // 30 days
  minimumReservationNotice: 15, // 15 minutes minimum notice for reservations
  minPartySize: 1,
  maxPartySize: 8,
  timeSlotInterval: 30, // 30 minutes
  tables: [
    {
      id: 1,
      name: "Window Table",
      capacity: 2,
      count: 4,
      type: "window",
      minPartySize: 1,
      maxPartySize: 2,
      isAvailable: true
    },
    {
      id: 2,
      name: "Standard Table",
      capacity: 4,
      count: 8,
      type: "standard",
      minPartySize: 2,
      maxPartySize: 4,
      isAvailable: true
    },
    {
      id: 3,
      name: "Booth",
      capacity: 4,
      count: 6,
      type: "booth",
      minPartySize: 2,
      maxPartySize: 4,
      isAvailable: true
    },
    {
      id: 4,
      name: "Large Table",
      capacity: 6,
      count: 4,
      type: "large",
      minPartySize: 4,
      maxPartySize: 6,
      isAvailable: true
    },
    {
      id: 5,
      name: "Private Room",
      capacity: 8,
      count: 2,
      type: "private",
      minPartySize: 6,
      maxPartySize: 8,
      isAvailable: true
    }
  ] as Table[]
};

// Mock database - In a real app, this would be a database
let reservations: Reservation[] = [];

// Function to generate realistic availability based on time of day and day of week
const getRealisticAvailability = (date: Date, time: string): number => {
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  const [hours, minutes] = time.split(':').map(Number);
  const timeValue = hours + minutes / 60; // Convert to decimal hours
  
  // Weekend evenings are busier
  const isWeekend = day === 0 || day === 5 || day === 6;
  const isPeakHour = (timeValue >= 18.5 && timeValue <= 20.5); // 6:30 PM - 8:30 PM
  const isLunchHour = (timeValue >= 12 && timeValue <= 13.5); // 12 PM - 1:30 PM
  
  // Calculate a "busyness factor" (0-1)
  let busynessFactor = 0.3; // Base availability
  
  if (isWeekend && isPeakHour) {
    busynessFactor = 0.8; // Very busy
  } else if (isWeekend && isLunchHour) {
    busynessFactor = 0.6; // Moderately busy
  } else if (isPeakHour) {
    busynessFactor = 0.7; // Busy
  } else if (isLunchHour) {
    busynessFactor = 0.5; // Somewhat busy
  }
  
  // Calculate how many tables should be "reserved" based on busyness
  const totalTables = RESTAURANT_CONFIG.tables.length;
  return Math.floor(totalTables * busynessFactor);
};

// Utility functions
export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startTime = setHours(setMinutes(date, 0), RESTAURANT_CONFIG.openingTime);
  const endTime = setHours(setMinutes(date, 0), RESTAURANT_CONFIG.closingTime);
  
  // For same-day reservations, adjust the start time to be at least 15 minutes from now
  const now = new Date();
  const isToday = date.getDate() === now.getDate() && 
                  date.getMonth() === now.getMonth() && 
                  date.getFullYear() === now.getFullYear();
  
  // If it's today, set the start time to be the later of:
  // 1. The regular opening time
  // 2. Current time + minimum notice (15 minutes)
  let adjustedStartTime = startTime;
  if (isToday) {
    // Reduced minimum notice to 15 minutes for more flexibility
    const minimumReservationTime = addMinutes(now, 15);
    if (isAfter(minimumReservationTime, startTime)) {
      // Round up to the next interval
      const minutesToAdd = RESTAURANT_CONFIG.timeSlotInterval - 
                          (minimumReservationTime.getMinutes() % RESTAURANT_CONFIG.timeSlotInterval);
      adjustedStartTime = addMinutes(minimumReservationTime, minutesToAdd);
    }
  }

  for (
    let time = adjustedStartTime;
    isBefore(time, endTime);
    time = addMinutes(time, RESTAURANT_CONFIG.timeSlotInterval)
  ) {
    const timeString = format(time, 'HH:mm');
    const isAvailable = checkTimeSlotAvailability(date, timeString);
    const availableTables = getAvailableTables(date, timeString);

    slots.push({
      time: timeString,
      isAvailable,
      availableTables
    });
  }

  return slots;
};

export const checkTimeSlotAvailability = (date: Date, time: string): boolean => {
  const requestedTime = parseISO(`${format(date, 'yyyy-MM-dd')}T${time}`);
  const endTime = addMinutes(requestedTime, RESTAURANT_CONFIG.diningDuration);

  // Check if the time slot is within restaurant hours
  if (
    isBefore(requestedTime, setHours(setMinutes(date, 0), RESTAURANT_CONFIG.openingTime)) ||
    isAfter(endTime, setHours(setMinutes(date, 0), RESTAURANT_CONFIG.closingTime))
  ) {
    return false;
  }

  // Check if there are any available tables for this time slot
  const availableTables = getAvailableTables(date, time);
  return availableTables.length > 0;
};

export const getAvailableTables = (date: Date, time: string): Table[] => {
  const requestedTime = parseISO(`${format(date, 'yyyy-MM-dd')}T${time}`);
  const endTime = addMinutes(requestedTime, RESTAURANT_CONFIG.diningDuration);

  // Get all reservations that overlap with this time slot
  const overlappingReservations = reservations.filter(reservation => {
    const reservationTime = parseISO(`${format(reservation.date, 'yyyy-MM-dd')}T${reservation.time}`);
    const reservationEndTime = addMinutes(reservationTime, RESTAURANT_CONFIG.diningDuration);

    return (
      (isBefore(requestedTime, reservationEndTime) && isAfter(endTime, reservationTime)) ||
      (isBefore(reservationTime, endTime) && isAfter(reservationEndTime, requestedTime))
    );
  });

  // Get the IDs of tables that are already reserved from actual reservations
  const reservedTableIds = new Set(overlappingReservations.map(r => r.tableId));
  
  // Get all available tables
  const allTables = [...RESTAURANT_CONFIG.tables];
  
  // For realistic simulation, mark some tables as unavailable based on time/day
  if (reservations.length === 0) { // Only apply simulation if we don't have real reservations
    const tablesUnavailable = getRealisticAvailability(date, time);
    
    // Randomly mark some tables as unavailable to simulate realistic restaurant busyness
    const shuffledTables = [...allTables].sort(() => Math.random() - 0.5);
    for (let i = 0; i < tablesUnavailable && i < shuffledTables.length; i++) {
      reservedTableIds.add(shuffledTables[i].id);
    }
  }

  // Return tables that are not reserved and are available
  return allTables.filter(table => 
    !reservedTableIds.has(table.id) && 
    table.isAvailable
  );
};

export const validateReservationRequest = (request: ReservationRequest): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const now = new Date();
  const requestedDate = new Date(request.date);
  const requestedTime = parseISO(`${format(requestedDate, 'yyyy-MM-dd')}T${request.time}`);

  // Check if the combined date and time is in the past
  if (isBefore(requestedTime, now)) {
    errors.push("Cannot make reservations for a time that has already passed");
  }

  // Check if the reservation is too far in advance
  const maxDate = addDays(now, RESTAURANT_CONFIG.maxAdvanceBooking);
  if (isAfter(requestedDate, maxDate)) {
    errors.push(`Reservations can only be made up to ${RESTAURANT_CONFIG.maxAdvanceBooking} days in advance`);
  }

  // Check if the reservation is too soon (less than minimum notice)
  const minTime = addMinutes(now, RESTAURANT_CONFIG.minimumReservationNotice);
  if (isBefore(requestedTime, minTime)) {
    errors.push(`Reservations must be made at least ${RESTAURANT_CONFIG.minimumReservationNotice} minutes in advance`);
  }

  // Check party size
  if (request.guests < RESTAURANT_CONFIG.minPartySize) {
    errors.push(`Minimum party size is ${RESTAURANT_CONFIG.minPartySize}`);
  }
  if (request.guests > RESTAURANT_CONFIG.maxPartySize) {
    errors.push(`Maximum party size is ${RESTAURANT_CONFIG.maxPartySize}. Please contact us for larger groups`);
  }

  // Check if the table is suitable for the party size
  const table = RESTAURANT_CONFIG.tables.find(t => t.id === request.tableId);
  if (!table) {
    errors.push("Selected table is not available");
  } else {
    if (request.guests < table.minPartySize) {
      errors.push(`This table requires a minimum of ${table.minPartySize} guests`);
    }
    if (request.guests > table.maxPartySize) {
      errors.push(`This table can only accommodate up to ${table.maxPartySize} guests`);
    }
  }

  // Check if the time slot is available
  const availableTables = getAvailableTables(requestedDate, request.time);
  const isTableAvailable = availableTables.some(t => t.id === request.tableId);
  
  if (!isTableAvailable) {
    errors.push("The selected table is not available at this time");
  }

  // Validate contact information
  if (!request.name.trim()) {
    errors.push("Name is required");
  }
  if (!request.email.trim()) {
    errors.push("Email is required");
  }
  if (!request.phone.trim()) {
    errors.push("Phone number is required");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const createReservation = async (request: ReservationRequest): Promise<{ success: boolean; reservation?: Reservation; errors?: string[] }> => {
  // Validate the request
  const validation = validateReservationRequest(request);
  if (!validation.isValid) {
    return { success: false, errors: validation.errors };
  }

  // Create the reservation
  const reservation: Reservation = {
    ...request,
    id: Math.random().toString(36).substring(2, 8).toUpperCase(),
    status: 'confirmed',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // In a real app, this would be a database operation
  reservations.push(reservation);

  // Simulate sending confirmation email
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, reservation };
};

export const getReservation = async (id: string): Promise<Reservation | null> => {
  // In a real app, this would be a database query
  return reservations.find(r => r.id === id) || null;
};

export const cancelReservation = async (id: string): Promise<{ success: boolean; error?: string }> => {
  const reservation = await getReservation(id);
  if (!reservation) {
    return { success: false, error: "Reservation not found" };
  }

  // Check if the reservation can be cancelled (e.g., 24 hours in advance)
  const now = new Date();
  const reservationTime = parseISO(`${format(reservation.date, 'yyyy-MM-dd')}T${reservation.time}`);
  const hoursUntilReservation = (reservationTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilReservation < 24) {
    return { success: false, error: "Reservations can only be cancelled at least 24 hours in advance" };
  }

  // In a real app, this would be a database update
  reservation.status = 'cancelled';
  reservation.updatedAt = new Date();

  return { success: true };
}; 