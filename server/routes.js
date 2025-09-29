import express from 'express';
import { insertBookingSchema } from './schema.js';
import { storage } from './storage.js';

const router = express.Router();

// Submit booking endpoint
router.post('/api/submit-booking', async (req, res) => {
  try {
    // Validate request body
    const validationResult = insertBookingSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Invalid booking data',
        details: validationResult.error.issues 
      });
    }

    // Create booking using storage interface
    const booking = await storage.createBooking(validationResult.data);
    
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
    const booking = await storage.getBookingById(req.params.id);
    
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

export default router;