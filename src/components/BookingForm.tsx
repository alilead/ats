import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type BookingFormProps = {
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

const tasks = [
  "Aspirateur",
  "Vaisselle",
  "Salle de bain",
  "Cuisine/four",
  "Vitres",
  "Repassage",
  "Lave-linge",
  "Sol",
  "Dépoussiérage",
  "Autre (voir notes)",
];

export default function BookingForm({ service, onClose, audience }: BookingFormProps) {
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
      alert("Veuillez accepter que vos données soient utilisées pour traiter la demande.");
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
      name,
      email,
      phone,
      notes,
    };
    const submitToServer = async () => {
      try {
        const resp = await fetch('/.netlify/functions/submit-booking', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        if (resp.ok) {
          alert('Demande envoyée — enregistrée sur le serveur.');
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
      alert("Demande envoyée — stockée localement (serveur indisponible).");
      onClose?.();
    }
  }

  return (
  <div ref={containerRef} className="max-h-[85vh] overflow-auto">
    <form onSubmit={submit} className="max-w-2xl w-full bg-white p-4 md:p-6 rounded-2xl shadow-lg">
      <div className="mb-4 text-sm text-muted-foreground">Tarif transparent : <span className="font-semibold text-accent">35 CHF/heure</span></div>

      <h3 className="text-xl font-semibold mb-4">{service ?? "Commander un service"} {audience ? `· ${audience}` : ''}</h3>

  <label htmlFor="booking-date" className="block mb-2 text-sm font-medium">Date souhaitée <span aria-hidden="true">*</span></label>
  <input id="booking-date" ref={dateRef} value={date} onChange={(e) => setDate(e.target.value)} type="date" aria-required="true" className="w-full mb-4 border rounded px-3 py-2 text-sm" />

      <fieldset className="mb-4">
        <legend className="block mb-2 text-sm font-medium">Créneaux horaires (max 4)</legend>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Créneaux horaires">
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

      <label htmlFor="addr-street" className="block mb-2 text-sm font-medium">Adresse <span aria-hidden="true">*</span></label>
      <input id="addr-street" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Rue et numéro" aria-required="true" className="w-full mb-2 border rounded px-3 py-2" />
      <div className="flex gap-2 mb-4">
        <input id="addr-postal" value={postal} onChange={(e) => setPostal(e.target.value)} placeholder="Code postal" aria-required="true" className="flex-1 border rounded px-3 py-2" />
        <input id="addr-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ville" aria-required="true" className="flex-2 border rounded px-3 py-2" />
      </div>

      <fieldset className="mb-4">
        <legend className="block mb-2 text-sm font-medium">Tâches à effectuer <span aria-hidden="true">*</span></legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label="Tâches à effectuer">
          {tasks.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleTask(t)}
              className={`text-sm px-3 py-2 rounded-md border ${selectedTasks.includes(t) ? 'bg-accent text-accent-foreground border-accent' : 'bg-muted/50 text-muted-foreground border-border'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <h4 className="text-md font-medium mb-2">Vos coordonnées *</h4>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <label htmlFor="contact-name" className="sr-only">Nom complet</label>
        <input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom complet" aria-required="true" className="border rounded px-3 py-2" />
        <label htmlFor="contact-email" className="sr-only">Email</label>
        <input id="contact-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-required="true" className="border rounded px-3 py-2" />
      </div>
      <label htmlFor="contact-phone" className="sr-only">Téléphone</label>
      <input id="contact-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Téléphone" className="w-full mb-4 border rounded px-3 py-2" />

      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Commentaires particuliers (optionnel)" className="w-full mb-4 border rounded px-3 py-2" rows={3} />

      <label className="flex items-center gap-2 mb-4">
        <input id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-required="true" />
        <span className="text-sm">J'accepte que mes données soient utilisées pour traiter ma demande <span aria-hidden="true">*</span></span>
      </label>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button type="submit" variant="accent">Commander maintenant</Button>
        <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
      </div>
    </form>
  </div>
  );
}
