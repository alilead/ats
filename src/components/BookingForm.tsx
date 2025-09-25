import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";

type BookingFormProps = {
  categoryId?: string;
  service?: string;
  onClose?: () => void;
  audience?: 'residential' | 'commercial';
};

const timeSlots = [
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
];

export default function BookingForm({ categoryId, service, onClose, audience }: BookingFormProps) {
  const t = useLocale();
  const [date, setDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  // Get filtered services based on category
  const getAvailableServices = () => {
    if (!categoryId || !audience) {
      return [...t.bookingForm.tasksList, t.contact.services.other || "Other"];
    }
    
    const audienceData = t.services.serviceData[audience];
    const category = audienceData?.categories.find(cat => cat.id === categoryId);
    
    if (category) {
      const categoryServices = category.items.map(item => item.title);
      return [...categoryServices, t.contact.services.other || "Other"];
    }
    
    return [...t.bookingForm.tasksList, t.contact.services.other || "Other"];
  };

  const availableServices = getAvailableServices();

  useEffect(() => {
    // scroll the form into view within the modal and focus the date input
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    dateRef.current?.focus();
  }, []);

  function toggleSlot(slot: string) {
    setSelectedSlots((s) => (s.includes(slot) ? s.filter((x) => x !== slot) : [...s, slot]));
  }

  function toggleTask(t: string) {
    setSelectedTasks((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      alert(t.bookingForm.alertConsent);
      return;
    }
    const payload = {
      service,
      audience,
      date,
      selectedSlots,
      address,
      postal,
      city,
      selectedTasks,
      name: audience === 'commercial' ? name : name, // Will show as Company Name for commercial
      email: audience === 'commercial' ? email : email, // Will show as Company Email for commercial
      phone,
      notes,
      // Add explicit tracking for form type
      formType: audience === 'commercial' ? 'commercial' : 'residential'
    };
    const submitToServer = async () => {
      try {
        const resp = await fetch('/.netlify/functions/submit-booking', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        if (resp.ok) {
          alert(t.bookingForm.alertServerSuccess);
          onClose?.();
          return true;
        }
        console.warn('Server rejected booking, falling back to localStorage');
      } catch (e) {
        console.warn('Server submit failed, falling back to localStorage', e);
      }
      return false;
    };

    const usedServer = await submitToServer();
    if (!usedServer) {
      try {
        const raw = localStorage.getItem('bookings');
        const arr = raw ? JSON.parse(raw) : [];
        arr.unshift(payload);
        localStorage.setItem('bookings', JSON.stringify(arr));
      } catch (e) {
        console.error(e);
      }
      alert(t.bookingForm.alertLocalSuccess);
      onClose?.();
    }
  }

  return (
  <div ref={containerRef} className="max-h-[85vh] overflow-auto">
    <form onSubmit={submit} className="max-w-2xl w-full bg-white p-4 md:p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{service ?? t.booking.title} {audience ? `· ${audience}` : ''}</h3>

  <label htmlFor="booking-date" className="block mb-2 text-sm font-medium">{t.bookingForm.desiredDate} <span aria-hidden="true">*</span></label>
  <input id="booking-date" ref={dateRef} value={date} onChange={(e) => setDate(e.target.value)} type="date" aria-required="true" className="w-full mb-4 border rounded px-3 py-2 text-sm" />

      <fieldset className="mb-4">
        <legend className="block mb-2 text-sm font-medium">{t.bookingForm.timeSlots}</legend>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.bookingForm.timeSlots}>
          {timeSlots.map((slot) => (
            <button
              type="button"
              key={slot}
              onClick={() => toggleSlot(slot)}
              className={`px-3 py-1.5 rounded-md text-sm border ${selectedSlots.includes(slot) ? 'bg-accent text-accent-foreground border-accent' : 'bg-muted/50 text-muted-foreground border-border'}`}
            >
              {slot}
            </button>
          ))}
        </div>
      </fieldset>

      <label htmlFor="addr-street" className="block mb-2 text-sm font-medium">{t.bookingForm.address} <span aria-hidden="true">*</span></label>
      <input id="addr-street" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t.bookingForm.streetNumber} aria-required="true" className="w-full mb-2 border rounded px-3 py-2" />
      <div className="flex gap-2 mb-4">
        <input id="addr-postal" value={postal} onChange={(e) => setPostal(e.target.value)} placeholder={t.bookingForm.postalCode} aria-required="true" className="flex-1 border rounded px-3 py-2" />
        <input id="addr-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder={t.bookingForm.city} aria-required="true" className="flex-2 border rounded px-3 py-2" />
      </div>

      <fieldset className="mb-4">
        <legend className="block mb-2 text-sm font-medium">{t.bookingForm.tasks} <span aria-hidden="true">*</span></legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label={t.bookingForm.tasks}>
          {availableServices.map((task) => (
            <button
              key={task}
              type="button"
              onClick={() => toggleTask(task)}
              className={`text-sm px-3 py-2 rounded-md border ${selectedTasks.includes(task) ? 'bg-accent text-accent-foreground border-accent' : 'bg-muted/50 text-muted-foreground border-border'}`}
            >
              {task}
            </button>
          ))}
        </div>
      </fieldset>

      <h4 className="text-md font-medium mb-2">{t.bookingForm.yourDetails} *</h4>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <label htmlFor="contact-name" className="sr-only">
          {audience === 'commercial' ? 'Nom d\'entreprise / Company Name' : t.bookingForm.fullName}
        </label>
        <input 
          id="contact-name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder={audience === 'commercial' ? 'Nom d\'entreprise / Company Name' : t.bookingForm.fullName} 
          aria-required="true" 
          className="border rounded px-3 py-2" 
        />
        <label htmlFor="contact-email" className="sr-only">
          {audience === 'commercial' ? 'Email d\'entreprise / Company Email' : t.bookingForm.email}
        </label>
        <input 
          id="contact-email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder={audience === 'commercial' ? 'Email d\'entreprise / Company Email' : t.bookingForm.email} 
          aria-required="true" 
          className="border rounded px-3 py-2" 
        />
      </div>
      <label htmlFor="contact-phone" className="sr-only">{t.bookingForm.phone}</label>
      <input id="contact-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.bookingForm.phone} className="w-full mb-4 border rounded px-3 py-2" />

      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.bookingForm.comments} className="w-full mb-4 border rounded px-3 py-2" rows={3} />

      <label className="flex items-center gap-2 mb-4">
        <input id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-required="true" />
        <span className="text-sm">{t.bookingForm.consent} <span aria-hidden="true">*</span></span>
      </label>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button type="submit" variant="accent">{t.bookingForm.orderNow}</Button>
        <Button type="button" variant="outline" onClick={onClose}>{t.bookingForm.cancel}</Button>
      </div>
    </form>
  </div>
  );
}
