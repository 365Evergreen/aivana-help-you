
import { useState, useEffect } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react';
import { callGraphApi } from './graphApi';
import AdminComponents from './AdminComponents';

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Use environment variables for Azure AD app registration values

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
};
const msalInstance = new PublicClientApplication(msalConfig);

function Sidebar({ onLogout, isAuthenticated, onNavigate, currentPage }) {
  return (
    <nav className="sidebar">
      <h2>Assistant</h2>
      <ul>
        <li><button onClick={() => onNavigate('dashboard')} style={{ fontWeight: currentPage === 'dashboard' ? 'bold' : 'normal' }}>Dashboard</button></li>
        <li>Email</li>
        <li>Calendar</li>
        <li>Files</li>
        <li>AI Chat</li>
        <li><button onClick={() => onNavigate('admin')} style={{ fontWeight: currentPage === 'admin' ? 'bold' : 'normal' }}>Admin</button></li>
      </ul>
      {isAuthenticated && (
        <button onClick={onLogout} style={{ marginTop: '2rem' }}>Logout</button>
      )}
    </nav>
  );
}

function Dashboard({ accessToken, mock }) {
  const [emails, setEmails] = useState([]);
  const [events, setEvents] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mock) {
      setEmails([
        { from: { emailAddress: { name: 'Demo User' } }, subject: 'Welcome!', bodyPreview: 'This is a demo email.' },
      ]);
      setEvents([
        { start: { dateTime: '2025-08-26T09:00:00' }, subject: 'Demo Event' },
      ]);
      setFiles([
        { name: 'demo.txt', lastModifiedDateTime: '2025-08-25T12:00:00' },
      ]);
      setLoading(false);
      return;
    }
    if (!accessToken) return;
    setLoading(true);
    Promise.all([
      callGraphApi(accessToken, 'me/messages?$top=5'),
      callGraphApi(accessToken, 'me/events?$top=5'),
      callGraphApi(accessToken, 'me/drive/recent'),
    ])
      .then(([emailRes, eventRes, fileRes]) => {
        setEmails(emailRes.value || []);
        setEvents(eventRes.value || []);
        setFiles(fileRes.value || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch data from Microsoft 365.');
        setLoading(false);
      });
  }, [accessToken, mock]);

  if (!accessToken && !mock) return <div>Please sign in to view your dashboard.</div>;
  if (loading) return <div>Loading data...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="dashboard">
      <section className="widget">
        <h3>Unread Emails</h3>
        <ul>
          {emails.map((email, i) => (
            <li key={i}><b>{email.from?.emailAddress?.name || 'Unknown'}:</b> {email.subject} <span>- {email.bodyPreview?.slice(0, 40)}</span></li>
          ))}
        </ul>
      </section>
      <section className="widget">
        <h3>Today’s Events</h3>
        <ul>
          {events.map((event, i) => (
            <li key={i}>{event.start?.dateTime?.slice(11, 16)} - {event.subject}</li>
          ))}
        </ul>
      </section>
      <section className="widget">
        <h3>Recent Files</h3>
        <ul>
          {files.map((file, i) => (
            <li key={i}>{file.name} <span>({file.lastModifiedDateTime?.slice(0, 10)})</span></li>
          ))}
        </ul>
      </section>
      <section className="widget">
        <h3>AI Assistant</h3>
        <div className="ai-chat">
          <div className="ai-message">How can I help you today?</div>
          <input type="text" placeholder="Ask about your schedule, emails, or files..." />
        </div>
      </section>
    </div>
  );
}


function AuthenticatedApp({ mock }) {
  const [page, setPage] = useState('dashboard');
  // Move hooks to the top level, before any conditional returns
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [accessToken, setAccessToken] = useState(null);
  const [ssoTried, setSsoTried] = useState(false);

  useEffect(() => {
    if (mock) return; // Don't run effect in mock mode
    // Try SSO on load if not authenticated
    if (!isAuthenticated && !ssoTried) {
      const ssoRequest = {
        scopes: ['User.Read', 'Mail.Read', 'Calendars.Read', 'Files.Read'],
        loginHint: '', // Optionally set to a known user principal name
      };
      instance.ssoSilent(ssoRequest)
        .then((res) => setAccessToken(res.accessToken))
        .catch(() => {
          // SSO failed, will require login
        })
        .finally(() => setSsoTried(true));
      return;
    }
    if (!isAuthenticated || !accounts[0]) return;
    const request = {
      scopes: ['User.Read', 'Mail.Read', 'Calendars.Read', 'Files.Read'],
      account: accounts[0],
    };
    instance.acquireTokenSilent(request)
      .then((res) => setAccessToken(res.accessToken))
      .catch(() => {
        instance.acquireTokenPopup(request).then((res) => setAccessToken(res.accessToken));
      });
  }, [isAuthenticated, accounts, instance, ssoTried, mock]);

  if (mock) {
    // Localhost: skip auth, show dashboard as signed in
    return (
      <div className="container">
        <Sidebar isAuthenticated={true} onNavigate={setPage} currentPage={page} />
        <main>
          {page === 'admin' ? (
            <AdminComponents />
          ) : (
            <>
              <h1>Personal Assistant Dashboard (Dev Mode)</h1>
              <Dashboard accessToken={null} mock={true} />
            </>
          )}
        </main>
      </div>
    );
  }

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <div className="container">
      <Sidebar onLogout={handleLogout} isAuthenticated={isAuthenticated} onNavigate={setPage} currentPage={page} />
      <main>
        {page === 'admin' ? (
          <AdminComponents />
        ) : (
          <>
            <h1>Personal Assistant Dashboard</h1>
            <Dashboard accessToken={accessToken} mock={false} />
          </>
        )}
      </main>
    </div>
  );
}

  const [page, setPage] = useState('dashboard');
  const { instance } = useMsal();
  if (mock) {
    // Localhost: skip auth, show dashboard as signed in
    return (
      <div className="container">
        <Sidebar isAuthenticated={true} onNavigate={setPage} currentPage={page} />
        <main>
          {page === 'admin' ? (
            <AdminComponents />
          ) : (
            <>
              <h1>Personal Assistant Dashboard (Dev Mode)</h1>
              <Dashboard accessToken={null} mock={true} />
            </>
          )}
        </main>
      </div>
    );
  }
  return (
    <div className="container">
      <Sidebar isAuthenticated={false} onNavigate={setPage} currentPage={page} />
      <main>
        {page === 'admin' ? (
          <AdminComponents />
        ) : (
          <>
            <h1>Personal Assistant Dashboard</h1>
            <button onClick={() => instance.loginPopup({ scopes: ['User.Read', 'Mail.Read', 'Calendars.Read', 'Files.Read'] })}>
              Sign in with Microsoft 365
            </button>
          </>
        )}
      </main>
    </div>
  );
}

function AppRoutes({ mock }) {
  const isAuthenticated = useIsAuthenticated();
  // If localhost, always show as authenticated
  if (mock) return <AuthenticatedApp mock={true} />;
  return isAuthenticated ? <AuthenticatedApp mock={false} /> : <UnauthenticatedApp mock={false} />;
}

function App() {
  if (isLocalhost) {
    // Localhost: skip MSAL, show dashboard as signed in
    return <AppRoutes mock={true} />;
  }
  return (
    <MsalProvider instance={msalInstance}>
      <AppRoutes mock={false} />
    </MsalProvider>
  );
}

export default App;
