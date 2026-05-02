import { useState } from 'react'

const TOGGLE_SETTINGS = [
  { name: 'Coverage Alerts',   sub: 'When gaps are detected',        default: true  },
  { name: 'Travel Reminders',  sub: '24h & 2h before departure',     default: true  },
  { name: 'Daily Briefing',    sub: 'Every morning at 7 AM',         default: true  },
  { name: 'Flight Scan',       sub: 'Auto-scan every 6 hours',       default: false },
]

const CALENDAR_ROWS = [
  { name: 'matt@winplan.blog',   sub: '6 calendars · Syncing' },
  { name: 'School Calendar',     sub: 'Read-only · District feed' },
]

function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{ width: 44, height: 26, borderRadius: 13, background: on ? 'var(--gold)' : 'var(--navy-raised)', border: `1px solid ${on ? 'var(--gold)' : 'var(--navy-border)'}`, position: 'relative', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}/>
    </div>
  )
}

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}

export default function SettingsScreen() {
  const [toggles, setToggles] = useState(TOGGLE_SETTINGS.map(t => t.default))
  const flipToggle = (i) => setToggles(t => t.map((v, j) => j === i ? !v : v))

  return (
    <div className="scroll-area" style={{ paddingTop: 4 }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500, color: 'var(--text-primary)', padding: '8px 0 20px' }}>Settings</div>

      {/* Profile cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        {[
          { initial: 'M', name: 'Matt',  role: 'Parent · Owner', color: 'var(--mom)', glow: 'rgba(245,166,35,0.5)', dimBg: 'rgba(245,166,35,0.15)' },
        ].map((p, i) => (
          <div key={i} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: p.dimBg, color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, boxShadow: `0 0 0 2px ${p.glow}, 0 0 20px ${p.dimBg}` }}>
              {p.initial}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.role}</div>
            </div>
          </div>
        ))}
        <div className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--navy-raised)', border: '1.5px dashed var(--navy-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Add Partner</div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px 8px', fontSize: 10, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Notifications</div>
        {TOGGLE_SETTINGS.map((s, i) => (
          <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{s.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.sub}</div>
            </div>
            <Toggle on={toggles[i]} onToggle={() => flipToggle(i)}/>
          </div>
        ))}
      </div>

      {/* Calendars */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px 8px', fontSize: 10, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Calendars Connected</div>
        {CALENDAR_ROWS.map((r, i) => (
          <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{r.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{r.sub}</div>
            </div>
            <Chevron/>
          </div>
        ))}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, borderTop: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500 }}>Add calendar</span>
        </div>
      </div>

      {/* App */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px 8px', fontSize: 10, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>App</div>
        {[
          { name: 'Nanny Account',    sub: "Manage Maria's access"       },
          { name: 'Data & Privacy',   sub: 'Export, delete, permissions' },
          { name: 'About Home Base',  sub: 'Version 0.1.0 · Build 1'    },
        ].map((r, i) => (
          <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{r.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{r.sub}</div>
            </div>
            <Chevron/>
          </div>
        ))}
      </div>
    </div>
  )
}
