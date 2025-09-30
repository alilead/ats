import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale-context";

// Security: Admin password removed from frontend code
// Use environment variables or proper authentication instead

function downloadCSV(data: any[]) {
  if (!data || data.length === 0) return;
  const keys = Object.keys(data[0]);
  const csv = [keys.join(',')].concat(data.map(row => keys.map(k => `"${String(row[k] ?? '')}"`).join(','))).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'bookings.csv'; a.click();
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [pw, setPw] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const t = useLocale();

  useEffect(() => {
    async function load() {
      try {
        // Try to fetch bookings from database API first
        const bookingsResp = await fetch('/api/bookings');
        if (bookingsResp.ok) {
          const bookingsData = await bookingsResp.json();
          setBookings(bookingsData || []);
        } else {
          // Fallback to localStorage if API fails
          console.warn('Database API not available, using localStorage');
          const raw = localStorage.getItem('bookings');
          setBookings(raw ? JSON.parse(raw) : []);
        }

        // Try to fetch contacts from database API
        try {
          const contactsResp = await fetch('/api/contacts');
          if (contactsResp.ok) {
            const contactsData = await contactsResp.json();
            setContacts(contactsData || []);
          } else {
            // Fallback to localStorage if API fails
            const contactsRaw = localStorage.getItem('contacts');
            setContacts(contactsRaw ? JSON.parse(contactsRaw) : []);
          }
        } catch (e) {
          // Fallback to localStorage for contacts
          const contactsRaw = localStorage.getItem('contacts');
          setContacts(contactsRaw ? JSON.parse(contactsRaw) : []);
        }
      } catch (e) {
        console.warn('API not available, using localStorage:', e);
        // Complete fallback to localStorage
        const raw = localStorage.getItem('bookings');
        setBookings(raw ? JSON.parse(raw) : []);
        
        const contactsRaw = localStorage.getItem('contacts');
        setContacts(contactsRaw ? JSON.parse(contactsRaw) : []);
      }
    }
    load();
  }, []);

  async function refresh() {
    try {
      // Try to fetch from database API first
      const bookingsResp = await fetch('/api/bookings');
      if (bookingsResp.ok) {
        const bookingsData = await bookingsResp.json();
        setBookings(bookingsData || []);
      } else {
        // Fallback to localStorage
        const raw = localStorage.getItem('bookings');
        setBookings(raw ? JSON.parse(raw) : []);
      }

      const contactsResp = await fetch('/api/contacts');
      if (contactsResp.ok) {
        const contactsData = await contactsResp.json();
        setContacts(contactsData || []);
      } else {
        // Fallback to localStorage
        const contactsRaw = localStorage.getItem('contacts');
        setContacts(contactsRaw ? JSON.parse(contactsRaw) : []);
      }
    } catch (e) {
      console.warn('API refresh failed, using localStorage:', e);
      // Complete fallback to localStorage
      const raw = localStorage.getItem('bookings');
      setBookings(raw ? JSON.parse(raw) : []);
      
      const contactsRaw = localStorage.getItem('contacts');
      setContacts(contactsRaw ? JSON.parse(contactsRaw) : []);
    }
  }

  function remove(index:number){
    const raw = localStorage.getItem('bookings');
    const arr = raw ? JSON.parse(raw) : [];
    arr.splice(index,1);
    localStorage.setItem('bookings', JSON.stringify(arr));
    refresh();
  }

  function removeContact(index:number){
    const raw = localStorage.getItem('contacts');
    const arr = raw ? JSON.parse(raw) : [];
    arr.splice(index,1);
    localStorage.setItem('contacts', JSON.stringify(arr));
    refresh();
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">{t.admin.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t.admin.description}</p>
          <label className="sr-only">Admin token or password</label>
          <input placeholder={t.admin.placeholder} className="w-full mb-4 border rounded px-3 py-2" value={pw} onChange={(e)=>setPw(e.target.value)} />
          <div className="flex gap-2 mb-4">
            <Button onClick={() => {
              // store token for server calls
              try { window.localStorage.setItem('admin_token', pw); } catch (e) {}
              setAuthorized(true);
            }} className="w-full">{t.admin.enter}</Button>
          </div>
          <p className="text-xs text-muted-foreground">{t.admin.vercelNote}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{t.admin.bookings}</h2>
        <div className="flex gap-2">
          <Button onClick={() => downloadCSV(bookings)}>{t.admin.exportCSV}</Button>
          <Button variant="outline" onClick={() => { localStorage.removeItem('bookings'); localStorage.removeItem('contacts'); refresh(); }}>{t.admin.clearAll}</Button>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No bookings found
          </div>
        ) : (
          bookings.map((b, i) => (
            <div key={b.id || i} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Booking #{b.id || (i + 1)} - {b.service || 'Service not specified'}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {b.audience === 'commercial' ? 'Commercial' : 'Residential'}
                    </span>
                    {b.createdAt && (
                      <span>
                        Created: {new Date(b.createdAt).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => remove(i)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  {t.admin.delete}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 border-b pb-1">
                    {b.audience === 'commercial' ? 'Company Information' : 'Customer Information'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">
                        {b.audience === 'commercial' ? 'Company Name:' : 'Name:'}
                      </span>
                      <span className="ml-2">{b.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">
                        {b.audience === 'commercial' ? 'Company Email:' : 'Email:'}
                      </span>
                      <span className="ml-2">
                        <a href={`mailto:${b.email}`} className="text-blue-600 hover:underline">
                          {b.email}
                        </a>
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Phone:</span>
                      <span className="ml-2">
                        <a href={`tel:${b.phone}`} className="text-blue-600 hover:underline">
                          {b.phone}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 border-b pb-1">Service Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Date:</span>
                      <span className="ml-2">{b.date}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Time Slots:</span>
                      <span className="ml-2">{(b.selectedSlots || []).join(', ') || 'Not specified'}</span>
                    </div>
                    {b.selectedTasks && b.selectedTasks.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-600">Selected Tasks:</span>
                        <div className="ml-2 mt-1">
                          {b.selectedTasks.map((task, idx) => (
                            <span key={idx} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1">
                              {task}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 border-b pb-1">Service Address</h4>
                  <div className="space-y-1 text-sm">
                    <div>{b.address}</div>
                    <div>{b.postal} {b.city}</div>
                  </div>
                </div>

                {/* Additional Notes */}
                {b.notes && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 border-b pb-1">Additional Notes</h4>
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {b.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Contact Form Submissions */}
      {contacts.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-6 mt-12">
            <h2 className="text-2xl font-semibold">Contact Form Submissions</h2>
          </div>
          
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Company</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Service</th>
                  <th className="p-2">Message</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 align-top">{i+1}</td>
                    <td className="p-2 align-top">{c.name}</td>
                    <td className="p-2 align-top">{c.entrepriseName || '-'}</td>
                    <td className="p-2 align-top">{c.email}</td>
                    <td className="p-2 align-top">{c.phone}</td>
                    <td className="p-2 align-top">{c.service}</td>
                    <td className="p-2 align-top">{c.message}</td>
                    <td className="p-2 align-top">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="p-2 align-top">
                      <Button variant="outline" size="sm" onClick={() => removeContact(i)}>{t.admin.delete}</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
