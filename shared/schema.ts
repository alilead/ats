import { pgTable, serial, text, timestamp, json, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  service: text("service"),
  audience: varchar("audience", { length: 20 }), // 'residential' or 'commercial'
  date: text("date").notNull(),
  selectedSlots: json("selected_slots").$type<string[]>().notNull(),
  address: text("address").notNull(),
  postal: text("postal").notNull(),
  city: text("city").notNull(),
  selectedTasks: json("selected_tasks").$type<string[]>().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  notes: text("notes"),
  formType: varchar("form_type", { length: 20 }), // 'commercial' or 'residential'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contacts table (for contact form submissions)
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Types
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

// Zod schemas for validation
export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export const selectBookingSchema = createSelectSchema(bookings);

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const selectContactSchema = createSelectSchema(contacts);

// Legacy compatibility with existing Zod schema
export const bookingSchema = z.object({
  id: z.string().optional(),
  service: z.string().optional(),
  audience: z.enum(['residential', 'commercial']).optional(),
  date: z.string(),
  selectedSlots: z.array(z.string()),
  address: z.string(),
  postal: z.string(),
  city: z.string(),
  selectedTasks: z.array(z.string()),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  notes: z.string().optional(),
  formType: z.enum(['commercial', 'residential']).optional(),
  createdAt: z.string().optional()
});