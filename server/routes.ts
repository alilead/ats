import express from 'express';
import { insertBookingSchema } from '@shared/schema';
import { storage } from './storage';
import { sendBookingConfirmationEmails } from './email';

const router = express.Router();

// Submit booking endpoint
router.post('/api/submit-booking', async (req, res) => {
  try {
    // Validate request body using the new Drizzle schema
    const validationResult = insertBookingSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Invalid booking data',
        details: validationResult.error.issues 
      });
    }

    // Create booking using storage interface
    const booking = await storage.createBooking(validationResult.data);
    
    // Send confirmation emails (don't block the response on email sending)
    sendBookingConfirmationEmails({
      service: req.body.service || 'Service non spécifié',
      audience: req.body.audience || 'residential',
      date: req.body.date || '',
      selectedSlots: req.body.selectedSlots || [],
      address: req.body.address || '',
      postal: req.body.postal || '',
      city: req.body.city || '',
      selectedTasks: req.body.selectedTasks || [],
      name: req.body.name || '',
      email: req.body.email || '',
      phone: req.body.phone || '',
      notes: req.body.notes,
    }).catch(err => {
      console.error('Failed to send confirmation emails:', err);
    });
    
    res.status(200).json({ 
      ok: true, 
      booking,
      message: 'Booking created successfully' 
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to create booking'
    });
  }
});

// List bookings endpoint (for admin)
router.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await storage.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch bookings'
    });
  }
});

// Get single booking
router.get('/api/bookings/:id', async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    if (isNaN(bookingId)) {
      return res.status(400).json({ 
        error: 'Invalid booking ID' 
      });
    }
    
    const booking = await storage.getBookingById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ 
        error: 'Booking not found' 
      });
    }
    
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch booking'
    });
  }
});

// List contacts endpoint (for admin)
router.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await storage.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch contacts'
    });
  }
});

export default router;