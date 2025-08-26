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
