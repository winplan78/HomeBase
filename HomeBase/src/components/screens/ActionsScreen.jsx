import { useState } from 'react'
import NannyView from '../shared/NannyView'

const ACTIONS = [
  { icon: '🛒', name: 'Shopping',    status: '7 items',              statusColor: '',          cls: 'gold'    },
  { icon: '✈️', name: 'Travel',      status: 'Atlanta · Apr 30',     statusColor: 'var(--sky)', cls: 'sky'    },
  { icon: '📅', name: 'Schedule',    status: '2 gaps this week',     statusColor: 'var(--coral)', cls: 'coral' },
  { icon: '🧒', name: 'Nanny Brief', status: 'Updated 2h ago',       statusColor: 'var(--sage)', cls: 'sage'  },
  { icon: '🎉', name: 'Family Fun',  status: 'Weekend: Brunch!',     statusColor: 'var(--sage)', cls: 'lavender' },
  { icon: '⚡', name: 'Add Event',   status: 'Voice or type',        statusColor: '',          cls: 'gold'    },
]

const GRADIENTS = {
  gold:     'linear-gradient(135deg, #1a2540 0%, #141c2e 100%)',
  sky:      'linear-gradient(135deg, #1a1f35 0%, #141c2e 100%)',
  coral:    'linear-gradient(135deg, #1f1a2e 0%, #141c2e 100%)',
  sage:     'linear-gradient(135deg, #162030 0%, #141c2e 100%)',
  lavender: 'linear-gradient(135deg, #1e1a35 0%, #141c2e 100%)',
}

const BORDER_COLORS = {
  gold:     'rgba(245,166,35,0.2)',
  sky:      'rgba(125,211,252,0.2)',
  coral:    'rgba(255,107,107,0.2)',
  sage:     'rgba(110,231,183,0.2)',
  lavender: 'rgba(167,139,250,0.2)',
}

const RECENT = [
  { icon: '✈️', bg: 'rgba(125,211,252,0.1)', text: 'Atlanta trip flagged — no flight booked',   time: '8:00 AM · Auto' },
  { icon: '🛒', bg: 'rgba(245,166,35,0.1)',   text: 'Matt added 6 items to shopping list',       time: '1h ago' },
  { icon: '🧒', bg: 'rgba(110,231,183,0.1)',  text: 'Nanny brief updated for Thursday',          time: '2h ago' },
  { icon: '⚠️', bg: 'rgba(255,107,107,0.1)', text: 'Coverage gap detected · Wed & Thu',         time: 'Auto · 8AM' },
]

export default function ActionsScreen({ onNavigate, onVoice }) {
  const [nannyMode, setNannyMode] = useState(false)

  return (
    <div className="scroll-area" style={{ paddingTop: 4 }}>

      {/* Nanny toggle */}
      <div style={{ display: 'flex', alignItems: 'center', background: 'var(--navy-raised)', border: '1px solid var(--navy-border)', borderRadius: 100, padding: 3, gap: 2, marginBottom: 16 }}>
        {[{ label: 'Family', nm: false }, { label: 'Nanny View', nm: true }].map(({ label, nm }) => (
          <button
            key={label}
            onClick={() => setNannyMode(nm)}
            style={{
              flex: 1, padding: '7px 0', borderRadius: 100, border: 'none',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
              background: nannyMode === nm ? (nm ? 'var(--sage)' : 'var(--gold)') : 'transparent',
              color: nannyMode === nm ? 'var(--navy)' : 'var(--text-muted)',
              boxShadow: nannyMode === nm ? `0 2px 8px ${nm ? 'rgba(110,231,183,0.3)' : 'rgba(245,166,35,0.3)'}` : 'none',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {nannyMode ? (
        <NannyView/>
      ) : (
        <>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>Quick Actions</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>Tap to manage · Hold for voice</div>

          {/* Action grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {ACTIONS.map((a, i) => (
              <div
                key={i}
                onClick={i === 1 ? () => onNavigate(1) : i === 5 ? onVoice : undefined}
                style={{
                  borderRadius: 20, padding: '20px 16px',
                  display: 'flex', flexDirection: 'column', gap: 12,
                  cursor: 'pointer', transition: 'transform 0.2s',
                  position: 'relative', overflow: 'hidden',
                  background: GRADIENTS[a.cls] || GRADIENTS.gold,
                  border: `1px solid ${BORDER_COLORS[a.cls] || BORDER_COLORS.gold}`,
                  WebkitTapHighlightColor: 'transparent',
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onTouchStart={e => e.currentTarget.style.transform = 'scale(0.95)'}
                onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontSize: 28, lineHeight: 1 }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: a.statusColor || 'var(--text-secondary)', fontWeight: a.statusColor ? 500 : 400 }}>{a.status}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div className="section-label">Recent Updates</div>
          <div style={{ background: 'var(--navy-card)', border: '1px solid var(--navy-border)', borderRadius: 18, overflow: 'hidden' }}>
            {RECENT.map((r, i) => (
              <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < RECENT.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{r.text}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{r.time}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
