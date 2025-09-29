import { db } from "./db";
import { bookings, contacts, type Booking, type InsertBooking, type Contact, type InsertContact } from "@shared/schema";
import { desc, eq } from "drizzle-orm";

// Storage interface definition
interface IStorage {
  createBooking(bookingData: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | null>;
  createContact(contactData: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(bookingData)
      .returning();
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt));
  }

  async getBookingById(id: number): Promise<Booking | null> {
    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, id));
    return booking || null;
  }

  async createContact(contactData: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(contactData)
      .returning();
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));
  }
}

// In-memory storage implementation (fallback)
class MemStorage implements IStorage {
  private bookings: (Booking & { id: number })[] = [];
  private contacts: (Contact & { id: number })[] = [];
  private nextBookingId = 1;
  private nextContactId = 1;

  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    const booking = {
      ...bookingData,
      id: this.nextBookingId,
      createdAt: new Date()
    };
    
    this.bookings.push(booking);
    this.nextBookingId++;
    
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return [...this.bookings].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getBookingById(id: number): Promise<Booking | null> {
    return this.bookings.find(booking => booking.id === id) || null;
  }

  async createContact(contactData: InsertContact): Promise<Contact> {
    const contact = {
      ...contactData,
      id: this.nextContactId,
      createdAt: new Date()
    };
    
    this.contacts.push(contact);
    this.nextContactId++;
    
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return [...this.contacts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

// Create storage instance - try database first, fallback to memory
let storage: IStorage;

try {
  if (process.env.DATABASE_URL) {
    storage = new DatabaseStorage();
    console.log('Using PostgreSQL database storage');
  } else {
    throw new Error('No DATABASE_URL found');
  }
} catch (error) {
  console.warn('Database not available, using in-memory storage:', error.message);
  storage = new MemStorage();
}

export { storage };