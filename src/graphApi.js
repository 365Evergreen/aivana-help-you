// Outlook: Send mail
export async function sendMail(accessToken, message) {
  const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error('Send mail error');
  return response.status === 202;
}

// Outlook: Get calendar events
export async function getCalendarEvents(accessToken) {
  const response = await fetch('https://graph.microsoft.com/v1.0/me/events', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error('Calendar API error');
  return response.json();
}

// Outlook: Get contacts
export async function getContacts(accessToken) {
  const response = await fetch('https://graph.microsoft.com/v1.0/me/contacts', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error('Contacts API error');
  return response.json();
}

// SharePoint: List sites
export async function getSharePointSites(accessToken) {
  const response = await fetch('https://graph.microsoft.com/v1.0/sites?search=*', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error('SharePoint sites error');
  return response.json();
}

// SharePoint: List lists in a site
export async function getSharePointLists(accessToken, siteId) {
  const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/lists`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error('SharePoint lists error');
  return response.json();
}

// SharePoint: List files in a site drive
export async function getSharePointFiles(accessToken, siteId) {
  const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root/children`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error('SharePoint files error');
  return response.json();
}
// Utility for Microsoft Graph API calls
// Replace <YOUR_CLIENT_ID> and <YOUR_TENANT_ID> in msalConfig in App.jsx

export async function callGraphApi(accessToken, endpoint) {
  const response = await fetch(`https://graph.microsoft.com/v1.0/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error('Graph API error');
  return response.json();
}
