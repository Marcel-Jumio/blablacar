import { useEffect, useRef, useState } from 'react';
import './App.css';
import '../node_modules/@jumio/websdk/assets/style.css';

function App() {
  const jumioRef = useRef(null);
  const sdkContainerRef = useRef(null);

  const [token, setToken] = useState('');
  const [dc, setDc] = useState('eu');
  const [slot, setSlot] = useState('');

  // plain string state to avoid TS syntax in JSX file
  const [view, setView] = useState('profile'); // 'profile' | 'verify'

  useEffect(() => { import('@jumio/websdk'); }, []);

  useEffect(() => {
    if (jumioRef.current) {
      jumioRef.current.setAttribute('token', token);
      jumioRef.current.setAttribute('dc', dc);
      if (slot) jumioRef.current.setAttribute('slot', slot); else jumioRef.current.removeAttribute('slot');
    }
  }, [token, dc, slot, view]);

  const startVerify = () => {
    if (!token) { alert('Paste a valid Jumio token first.'); return; }
    setView('verify');
    requestAnimationFrame(() => sdkContainerRef.current?.scrollIntoView({ behavior: 'smooth' }));
  };

  return (
    <div>
      <header className="bb-header">
        <div className="bb-header__left">
          <img src="/BlaBlaCar_logo.svg" alt="BlaBlaCar" className="bb-logo" />
          <nav className="bb-nav">
            <a href="#">Profile</a>
            <a href="#">Trips</a>
            <a href="#">Payments</a>
          </nav>
        </div>
        <div style={{ opacity: 0.8 }}>Demo</div>
      </header>

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
              <label>
                Slot
                <input type="text" value={slot} onChange={e => setSlot(e.target.value)} placeholder="Optional slot" style={{ width: 220 }} />
              </label>
            </div>
          </form>
        </section>
      </div>

      {view === 'profile' && (
        <main className="bb-container">
          <section className="bb-hero">
            <h1>About you</h1>
            <p>Verify your profile details to increase trust.</p>
          </section>

          <section className="bb-card" style={{ padding: 0 }}>
            <div style={{ padding: 16 }}>
              <h2 style={{ margin: '0 0 12px' }}>Verify your profile</h2>
              <button onClick={startVerify} className="verify-back" style={{ fontSize: 18 }}>
                <span style={{ display: 'inline-block', width: 20, height: 20, borderRadius: '50%', border: '2px solid #2dbfff', lineHeight: '16px', textAlign: 'center', fontWeight: 700 }}>+</span>
                &nbsp;Verify ID
              </button>
            </div>
          </section>
        </main>
      )}

      {view === 'verify' && (
        <main className="verify-view">
          <div className="verify-header">
            <button className="verify-back" onClick={() => setView('profile')}>&larr; Back to profile</button>
          </div>
          <div ref={sdkContainerRef} className="verify-sdk">
            <jumio-sdk ref={jumioRef}>
              
              <jumio-sdk-logger-console slot="logger" data-enabled="true"></jumio-sdk-logger-console>
              <jumio-sdk-logger-datadog slot="logger" data-enabled="true" data-config='{"applicationId": "123"}'></jumio-sdk-logger-datadog>
            </jumio-sdk>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
