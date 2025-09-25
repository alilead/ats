const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  const provided = event.headers['x-admin-token'] || (event.queryStringParameters && event.queryStringParameters.token);
  if (!ADMIN_TOKEN || provided !== ADMIN_TOKEN) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE_NAME;
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE) {
    return { statusCode: 500, body: 'Airtable not configured' };
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?pageSize=100&sort%5B0%5D%5Bfield%5D=CreatedAt&sort%5B0%5D%5Bdirection%5D=desc`;
  try {
    const resp = await fetch(url, { headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` } });
    const data = await resp.json();
    if (!resp.ok) return { statusCode: resp.status || 500, body: JSON.stringify(data) };
    const rows = (data.records || []).map(r => ({ id: r.id, ...r.fields }));
    return { statusCode: 200, body: JSON.stringify(rows) };
  } catch (e) {
    return { statusCode: 500, body: String(e) };
  }
}
