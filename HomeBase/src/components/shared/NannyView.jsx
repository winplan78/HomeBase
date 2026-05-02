import { useState } from 'react'

const NANNY_TASKS = [
  { text: 'School pickup — Ella & Liam', time: '3:00 PM', urgent: false },
  { text: 'No nuts in Ella\'s snack', time: '⚠️ Allergy', urgent: true },
  { text: 'Soccer gear ready by 4:30', time: '4:30 PM', urgent: false },
  { text: 'Dinner in fridge — just reheat', time: '6:00 PM', urgent: false },
]

const CONTACTS = [
  { name: 'Maya (Mom)',    phone: '720-555-0142' },
  { name: 'Will (Dad)',    phone: '720-555-0198' },
  { name: 'Pediatrician', phone: '303-555-0177' },
]

export default function NannyView() {
  const [done, setDone] = useState(NANNY_TASKS.map(() => false))
  const toggle = (i) => setDone(d => d.map((v, j) => j === i ? !v : v))

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-primary)', marginBottom: 4 }}>Hi Maria 👋</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Thursday, April 24 · Your tasks</div>
      </div>

      {/* Task list */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)' }}/>
          Today's Tasks
        </div>
        {NANNY_TASKS.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < NANNY_TASKS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
            <div
              onClick={() => toggle(i)}
              style={{
                width: 20, height: 20, borderRadius: '50%',
                border: done[i] ? 'none' : '1.5px solid var(--navy-border)',
                background: done[i] ? 'var(--sage)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {done[i] && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: 13, color: done[i] ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: done[i] ? 'line-through' : 'none', flex: 1 }}>
              {t.text}
            </span>
            <span style={{ fontSize: 11, fontWeight: t.urgent ? 600 : 500, color: t.urgent ? 'var(--coral)' : 'var(--text-muted)', flexShrink: 0 }}>
              {t.time}
            </span>
          </div>
        ))}
      </div>

      {/* Emergency contacts */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--sky)', marginBottom: 12 }}>Emergency Contacts</div>
        {CONTACTS.map((c, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < CONTACTS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
            <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: 'var(--sky)', fontWeight: 500 }}>{c.phone}</div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="card" style={{ background: 'rgba(110,231,183,0.05)', borderColor: 'rgba(110,231,183,0.15)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 8 }}>Note from Maya</div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Will and I are both traveling today — call me any time. Ella's been a little tired so extra gentle if she's cranky after school. Thanks so much Maria! 🙏
        </p>
      </div>
    </div>
  )
}
