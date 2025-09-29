import { insertBookingSchema } from "./schema.js";

// In-memory storage implementation
class MemStorage {
  constructor() {
    this.bookings = [];
    this.nextId = 1;
  }

  async createBooking(bookingData) {
    const booking = {
      ...bookingData,
      id: this.nextId.toString(),
      createdAt: new Date().toISOString()
    };
    
    this.bookings.push(booking);
    this.nextId++;
    
    return booking;
  }

  async getAllBookings() {
    return [...this.bookings].sort((a, b) => 
      new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
    );
  }

  async getBookingById(id) {
    return this.bookings.find(booking => booking.id === id) || null;
  }
}

export const storage = new MemStorage();