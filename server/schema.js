import { z } from "zod";

// Booking data model
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

// Insert schema (for new bookings)
export const insertBookingSchema = bookingSchema.omit({ id: true, createdAt: true });