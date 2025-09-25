const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE_NAME;
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE) {
    return { statusCode: 500, body: 'Airtable not configured (set AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME)' };
  }

  let body;
  try { body = JSON.parse(event.body); } catch (e) { return { statusCode: 400, body: 'Invalid JSON' }; }

  const fields = {
    Service: body.service || '',
    Audience: body.audience || '',
    Date: body.date || '',
    Slots: (body.selectedSlots || []).join(', '),
    Address: body.address || '',
    Postal: body.postal || '',
    City: body.city || '',
    Tasks: (body.selectedTasks || []).join(', '),
    Name: body.name || '',
    Email: body.email || '',
    Phone: body.phone || '',
    Notes: body.notes || '',
    CreatedAt: body.createdAt || new Date().toISOString()
  };

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });
    const data = await resp.json();
    if (!resp.ok) return { statusCode: resp.status || 500, body: JSON.stringify(data) };
    return { statusCode: 200, body: JSON.stringify({ ok: true, record: data }) };
  } catch (e) {
    return { statusCode: 500, body: String(e) };
  }
}
