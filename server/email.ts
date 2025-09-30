import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface BookingDetails {
  service: string;
  audience: string;
  date: string;
  selectedSlots: string[];
  address: string;
  postal: string;
  city: string;
  selectedTasks: string[];
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export async function sendBookingConfirmationEmails(booking: BookingDetails) {
  const clientEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9fafb; }
    .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
    h2 { color: #dc2626; margin-top: 0; }
    .label { font-weight: bold; color: #374151; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ATS - All Trade Services</h1>
    </div>
    <div class="content">
      <h2>Confirmation de Réservation</h2>
      <p>Bonjour ${booking.name},</p>
      <p>Merci pour votre demande de réservation. Nous avons bien reçu votre demande et nous vous contacterons dans les plus brefs délais.</p>
      
      <div class="details">
        <h3>Détails de votre réservation:</h3>
        <p><span class="label">Service:</span> ${booking.service}</p>
        <p><span class="label">Type:</span> ${booking.audience === 'commercial' ? 'Commercial' : 'Particulier'}</p>
        <p><span class="label">Date souhaitée:</span> ${booking.date}</p>
        <p><span class="label">Créneaux horaires:</span> ${booking.selectedSlots.join(', ')}</p>
        <p><span class="label">Adresse:</span> ${booking.address}, ${booking.postal} ${booking.city}</p>
        ${booking.selectedTasks.length > 0 ? `<p><span class="label">Tâches:</span> ${booking.selectedTasks.join(', ')}</p>` : ''}
        ${booking.notes ? `<p><span class="label">Notes:</span> ${booking.notes}</p>` : ''}
      </div>
      
      <div class="details">
        <h3>Vos coordonnées:</h3>
        <p><span class="label">Nom:</span> ${booking.name}</p>
        <p><span class="label">Email:</span> ${booking.email}</p>
        <p><span class="label">Téléphone:</span> ${booking.phone}</p>
      </div>
      
      <p>Notre équipe vous contactera bientôt pour confirmer votre rendez-vous.</p>
    </div>
    <div class="footer">
      <p><strong>ATS - All Trade Services</strong></p>
      <p>Téléphone: +41 77 288 38 38 | Email: info@atsgenerale.ch</p>
      <p>Genève, Suisse</p>
    </div>
  </div>
</body>
</html>
`;

  const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1f2937; color: white; padding: 20px; }
    .content { padding: 20px; background: #f9fafb; }
    .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #dc2626; }
    h2 { color: #dc2626; margin-top: 0; }
    .label { font-weight: bold; color: #374151; display: inline-block; width: 150px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .badge-residential { background: #dbeafe; color: #1e40af; }
    .badge-commercial { background: #fef3c7; color: #92400e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouvelle Réservation Reçue</h1>
      <span class="badge ${booking.audience === 'commercial' ? 'badge-commercial' : 'badge-residential'}">
        ${booking.audience === 'commercial' ? 'COMMERCIAL' : 'PARTICULIER'}
      </span>
    </div>
    <div class="content">
      <div class="details">
        <h3>Informations Client:</h3>
        <p><span class="label">Nom:</span> ${booking.name}</p>
        <p><span class="label">Email:</span> <a href="mailto:${booking.email}">${booking.email}</a></p>
        <p><span class="label">Téléphone:</span> <a href="tel:${booking.phone}">${booking.phone}</a></p>
      </div>
      
      <div class="details">
        <h3>Détails du Service:</h3>
        <p><span class="label">Service:</span> ${booking.service}</p>
        <p><span class="label">Date:</span> ${booking.date}</p>
        <p><span class="label">Créneaux:</span> ${booking.selectedSlots.join(', ')}</p>
        ${booking.selectedTasks.length > 0 ? `<p><span class="label">Tâches:</span> ${booking.selectedTasks.join(', ')}</p>` : ''}
      </div>
      
      <div class="details">
        <h3>Adresse du Service:</h3>
        <p>${booking.address}</p>
        <p>${booking.postal} ${booking.city}</p>
      </div>
      
      ${booking.notes ? `
      <div class="details">
        <h3>Notes Additionnelles:</h3>
        <p>${booking.notes}</p>
      </div>
      ` : ''}
      
      <p style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 5px;">
        <strong>Action requise:</strong> Veuillez contacter le client dans les plus brefs délais pour confirmer le rendez-vous.
      </p>
    </div>
  </div>
</body>
</html>
`;

  // Check if Resend is configured
  if (!resend) {
    console.warn('RESEND_API_KEY not configured. Skipping email notifications.');
    return {
      clientEmailSent: false,
      adminEmailSent: false,
      errors: ['Email service not configured. Please set RESEND_API_KEY environment variable.'],
    };
  }

  try {
    const results = await Promise.allSettled([
      // Send email to client
      resend.emails.send({
        from: 'ATS - All Trade Services <onboarding@resend.dev>',
        to: [booking.email],
        subject: 'Confirmation de votre réservation - ATS',
        html: clientEmailHtml,
      }),
      
      // Send email to admin
      resend.emails.send({
        from: 'ATS Réservations <onboarding@resend.dev>',
        to: ['info@atsgenerale.ch'],
        subject: `Nouvelle réservation: ${booking.service} - ${booking.name}`,
        html: adminEmailHtml,
      }),
    ]);

    const clientResult = results[0];
    const adminResult = results[1];

    console.log('Email sending results:', {
      client: clientResult.status === 'fulfilled' ? 'sent' : 'failed',
      admin: adminResult.status === 'fulfilled' ? 'sent' : 'failed',
    });

    return {
      clientEmailSent: clientResult.status === 'fulfilled',
      adminEmailSent: adminResult.status === 'fulfilled',
      errors: results
        .filter((r) => r.status === 'rejected')
        .map((r: any) => r.reason?.message || 'Unknown error'),
    };
  } catch (error) {
    console.error('Error sending booking confirmation emails:', error);
    return {
      clientEmailSent: false,
      adminEmailSent: false,
      errors: [error instanceof Error ? error.message : 'Failed to send emails'],
    };
  }
}
