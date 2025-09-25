import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import netlifyIdentity from "netlify-identity-widget";
import { useLocale } from "@/lib/locale-context";

const ADMIN_PASSWORD = "ATSadmin56*"; // change in production or wire env var

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
      // If Netlify Identity is available and a user is logged in, use the JWT for server calls
      try {
        const user = netlifyIdentity.currentUser();
        if (user && user.token) {
          const jwt = user.token.access_token || user.token;
          const resp = await fetch('/.netlify/functions/list-bookings', { headers: { Authorization: `Bearer ${jwt}` } });
          if (resp.ok) {
            const data = await resp.json();
            setBookings(data || []);
            return;
          }
        }

        // Fallback to admin_token stored in localStorage (existing flow)
        const token = (window && window.localStorage && window.localStorage.getItem('admin_token')) || '';
        if (token) {
          const resp2 = await fetch('/.netlify/functions/list-bookings', { headers: { 'x-admin-token': token } });
          if (resp2.ok) {
            const data = await resp2.json();
            setBookings(data || []);
            return;
          }
        }
      } catch (e) {
        // fallback to localStorage
      }

      const raw = localStorage.getItem('bookings');
      setBookings(raw ? JSON.parse(raw) : []);
      
      const contactsRaw = localStorage.getItem('contacts');
      setContacts(contactsRaw ? JSON.parse(contactsRaw) : []);
    }
    load();
  }, []);

  function refresh() {
    const raw = localStorage.getItem('bookings');
    setBookings(raw ? JSON.parse(raw) : []);
    
    const contactsRaw = localStorage.getItem('contacts');
    setContacts(contactsRaw ? JSON.parse(contactsRaw) : []);
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
              // first try password mode
              if (pw === ADMIN_PASSWORD) { setAuthorized(true); return; }
              // store token for server calls
              try { window.localStorage.setItem('admin_token', pw); } catch (e) {}
              setAuthorized(true);
            }}>{t.admin.enter}</Button>
            <Button variant="outline" onClick={() => netlifyIdentity.open()}>{t.admin.loginWithNetlify}</Button>
          </div>
          <p className="text-xs text-muted-foreground">{t.admin.orSignIn}</p>
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

      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="p-2">{t.admin.columns.number}</th>
              <th className="p-2">{t.admin.columns.service}</th>
              <th className="p-2">{t.admin.columns.audience}</th>
              <th className="p-2">{t.admin.columns.date}</th>
              <th className="p-2">{t.admin.columns.slots}</th>
              <th className="p-2">{t.admin.columns.name}</th>
              <th className="p-2">{t.admin.columns.email}</th>
              <th className="p-2">{t.admin.columns.phone}</th>
              <th className="p-2">{t.admin.columns.notes}</th>
              <th className="p-2">{t.admin.columns.actions}</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className="border-t">
                <td className="p-2 align-top">{i+1}</td>
                <td className="p-2 align-top">{b.service}</td>
                <td className="p-2 align-top">{b.audience}</td>
                <td className="p-2 align-top">{b.date}</td>
                <td className="p-2 align-top">{(b.selectedSlots || []).join(', ')}</td>
                <td className="p-2 align-top">{b.name}</td>
                <td className="p-2 align-top">{b.email}</td>
                <td className="p-2 align-top">{b.phone}</td>
                <td className="p-2 align-top">{b.notes}</td>
                <td className="p-2 align-top">
                  <Button variant="outline" size="sm" onClick={() => remove(i)}>{t.admin.delete}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
