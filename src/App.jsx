import { useEffect, useRef, useState } from 'react';
import './App.css';
import '../node_modules/@jumio/websdk/assets/style.css';

function App() {
  const jumioRef = useRef(null);
  const sdkContainerRef = useRef(null);

  const [token, setToken] = useState('');
  const [dc, setDc] = useState('eu');
  const [selectedScenario, setSelectedScenario] = useState('');

  // plain string state to avoid TS syntax in JSX file
  const [view, setView] = useState('profile'); // 'profile' | 'document-selection' | 'verify'
  const [selectedDocumentType, setSelectedDocumentType] = useState('');

  useEffect(() => { import('@jumio/websdk'); }, []);

  useEffect(() => {
    if (jumioRef.current) {
      jumioRef.current.setAttribute('token', token);
      jumioRef.current.setAttribute('dc', dc);
    }
  }, [token, dc, view]);

  const startVerify = () => {
    if (!token) { alert('Paste a valid Jumio token first.'); return; }
    
    // If "Document selection within Jumio SDK" is selected, skip custom document selection
    if (selectedScenario === 'document-in-sdk') {
      setView('verify');
    } else {
      setView('document-selection');
    }
  };

  const selectDocument = (documentType) => {
    setSelectedDocumentType(documentType);
    setView('verify');
    requestAnimationFrame(() => sdkContainerRef.current?.scrollIntoView({ behavior: 'smooth' }));
  };

  return (
    <div>
      {/* Top developer panel */}
      <div className="bb-devbar">
        <section className="bb-panel">
          <form onSubmit={e => e.preventDefault()}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <label>
                Token
                <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="Paste your Jumio token" style={{ width: 360 }} />
              </label>
              <label>
                Datacenter
                <select value={dc} onChange={e => setDc(e.target.value)}>
                  <option value="eu">EU</option>
                  <option value="us">US</option>
                  <option value="sgp">SGP</option>
                </select>
              </label>
              
              <div style={{ width: '1px', height: '32px', background: '#d6eefb', margin: '0 8px' }}></div>
              
              <button 
                type="button"
                className={`scenario-button ${selectedScenario === 'document-in-sdk' ? 'active' : ''}`}
                onClick={() => setSelectedScenario(selectedScenario === 'document-in-sdk' ? '' : 'document-in-sdk')}
              >
                Document selection within Jumio SDK
              </button>
              
              <button 
                type="button"
                className={`scenario-button ${selectedScenario === 'document-on-customer' ? 'active' : ''}`}
                onClick={() => setSelectedScenario(selectedScenario === 'document-on-customer' ? '' : 'document-on-customer')}
              >
                Document selection on customer page
              </button>
              
              <button 
                type="button"
                className={`scenario-button ${selectedScenario === 'placeholder' ? 'active' : ''}`}
                onClick={() => setSelectedScenario(selectedScenario === 'placeholder' ? '' : 'placeholder')}
              >
                Placeholder scenario
              </button>
            </div>
          </form>
        </section>
      </div>

      {view === 'profile' && (
        <div>
          {/* Top navigation bar */}
          <header className="bb-header">
            <div className="bb-header-content">
              <div className="bb-header-left">
                <img src="/BlaBlaCar_logo.svg" alt="BlaBlaCar" className="bb-header-logo" />
                <nav className="bb-header-nav">
                  <a href="#" className="bb-nav-link">Carpool</a>
                  <a href="#" className="bb-nav-link">Bus</a>
                </nav>
              </div>
              <div className="bb-header-right">
                <button className="bb-header-icon">🔍</button>
                <a href="#" className="bb-header-button">
                  <span className="bb-icon">+</span>
                  Publish a ride
                </a>
                <button className="bb-header-avatar">👤</button>
              </div>
            </div>
          </header>

          <main className="bb-container">
            {/* Navigation tabs */}
            <div className="bb-tabs">
              <button className="bb-tab bb-tab--active">About you</button>
              <button className="bb-tab">Account</button>
            </div>

          {/* User profile section */}
          <section className="bb-profile-section">
            <div className="bb-profile-header">
              <div className="bb-avatar">
                <div className="bb-avatar-placeholder"></div>
              </div>
              <div className="bb-profile-info">
                <div className="bb-profile-name">
                  <h2>Marcel</h2>
                  <span className="bb-profile-status">Newcomer</span>
                  <span className="bb-profile-arrow">›</span>
                </div>
                <div className="bb-profile-actions">
                  <button className="bb-profile-action">
                    <span className="bb-icon">+</span>
                    Add profile picture
                  </button>
                  <button className="bb-profile-action">
                    Edit personal details
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Reliability section */}
          <section className="bb-card">
            <h3>Your carpooling reliability</h3>
            <div className="bb-reliability-item">
              <span className="bb-icon bb-icon--green">📅</span>
              <span>Never cancels bookings as a passenger</span>
              <span className="bb-icon bb-icon--info">ℹ</span>
            </div>
          </section>

          {/* Verification section */}
          <section className="bb-card">
            <h3>Verify your profile</h3>
            <div className="bb-verification-options">
              <button onClick={startVerify} className="bb-verify-option bb-verify-option--primary">
                <span className="bb-icon">+</span>
                Verify ID
              </button>
              <button className="bb-verify-option">
                <span className="bb-icon">+</span>
                Confirm email marcel.bernatz@jumio.com
              </button>
              <button className="bb-verify-option">
                <span className="bb-icon">+</span>
                Confirm phone number
              </button>
            </div>
          </section>

          {/* About you section */}
          <section className="bb-card">
            <h3>About you</h3>
            <div className="bb-about-options">
              <button className="bb-about-option">
                <span className="bb-icon">+</span>
                Add a mini bio
              </button>
              <button className="bb-about-option">
                <span className="bb-icon">+</span>
                Edit travel preferences
              </button>
            </div>
          </section>

          {/* Vehicles section */}
          <section className="bb-card">
            <h3>Vehicles</h3>
            <div className="bb-vehicle-options">
              <button className="bb-vehicle-option">
                <span className="bb-icon">+</span>
                Add vehicle
              </button>
            </div>
          </section>
          </main>
        </div>
      )}

      {view === 'document-selection' && (
        <main className="bb-document-selection">
          <div className="bb-document-header">
            <img src="/BlaBlaCar_logo.svg" alt="BlaBlaCar" className="bb-logo" />
          </div>
          
          <div className="bb-document-content">
            <h1 className="bb-document-title">Which document would you like to upload?</h1>
            
            <div className="bb-document-options">
              <button 
                className="bb-document-option" 
                onClick={() => selectDocument('passport')}
              >
                <div className="bb-document-option-content">
                  <div className="bb-document-option-text">
                    <h3>Passport</h3>
                    <p>Face photo page</p>
                  </div>
                  <span className="bb-document-arrow">›</span>
                </div>
              </button>
              
              <div className="bb-document-divider"></div>
              
              <button 
                className="bb-document-option" 
                onClick={() => selectDocument('id-card')}
              >
                <div className="bb-document-option-content">
                  <div className="bb-document-option-text">
                    <h3>ID card (only Europe)</h3>
                    <p>Front and back</p>
                  </div>
                  <span className="bb-document-arrow">›</span>
                </div>
              </button>
            </div>
            
            <div className="bb-document-footer">
              <p>
                The data collected by Comuto SA is necessary for verifying your identity. 
                For more information and to exercise your rights, see our{' '}
                <a href="#" className="bb-privacy-link">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </main>
      )}

      {view === 'verify' && (
        <div>
          <div className="verify-header">
            <button className="verify-back" onClick={() => setView('profile')}>&larr; Back to profile</button>
          </div>
          <jumio-sdk ref={jumioRef}>
            <jumio-sdk-logger-console slot="logger" data-enabled="true"></jumio-sdk-logger-console>
            <jumio-sdk-logger-datadog slot="logger" data-enabled="true" data-config='{"applicationId": "123"}'></jumio-sdk-logger-datadog>
          </jumio-sdk>
        </div>
      )}
    </div>
  );
}

export default App;
