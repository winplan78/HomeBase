const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN']
const DAY_NUMS = [27, 28, 29, 30, 1, 2, 3]
const TIMES = ['8AM','9AM','10AM','11AM','12PM']

// Events keyed by day index (0=Mon)
const CAL_EVENTS = {
  0: [
    { top: 0,   height: 52, color: '#f5a623', label: 'School',          owner: 'kids' },
    { top: 104, height: 40, color: '#a78bfa', label: 'Dr. Chen',        owner: 'mom'  },
  ],
  1: [
    { top: 0,   height: 52, color: '#f5a623', label: 'School',          owner: 'kids' },
    { top: 52,  height: 30, color: '#7dd3fc', label: 'Standup',         owner: 'dad'  },
    { top: 130, height: 45, color: '#f5a623', label: 'Lunch w/Board',   owner: 'mom'  },
  ],
  2: [
    { top: 0,   height: 52, color: '#f5a623', label: 'School',          owner: 'kids' },
    { top: 52,  height: 104,color: '#ff6b6b', label: '→ NY',            owner: 'mom'  },
    { top: 70,  height: 80, color: '#ff6b6b80',label: '→ SF',           owner: 'dad'  },
  ],
  3: [
    { top: 0,   height: 52, color: '#f5a623', label: 'IQZ · ATL',      owner: 'dad'  },
    { top: 52,  height: 78, color: '#7dd3fc', label: 'SF conf.',        owner: 'dad'  },
    { top: 130, height: 36, color: '#f5a623', label: "Rumi's Kitchen",  owner: 'mom'  },
  ],
  4: [
    { top: 0,   height: 52, color: '#f5a623', label: 'School',          owner: 'kids' },
    { top: 78,  height: 52, color: '#6ee7b7', label: 'Nanny off',       owner: 'nanny'},
    { top: 156, height: 36, color: '#a78bfa', label: 'Soccer',          owner: 'kids' },
  ],
  5: [
    { top: 0,   height: 36, color: '#a78bfa', label: 'Swim',            owner: 'kids' },
    { top: 78,  height: 52, color: '#f5a623', label: 'Family brunch',   owner: 'both' },
  ],
  6: [
    { top: 52,  height: 78, color: '#6ee7b7', label: 'Playground',      owner: 'kids' },
    { top: 156, height: 36, color: '#7dd3fc', label: 'Prep week',       owner: 'dad'  },
  ],
}

const LEGEND = [
  { color: '#f5a623', label: 'Maya'   },
  { color: '#7dd3fc', label: 'Will'   },
  { color: '#6ee7b7', label: 'Nanny'  },
  { color: '#a78bfa', label: 'Kids'   },
  { color: '#ff6b6b', label: 'Travel / Conflict' },
]

export default function CalendarScreen() {
  return (
    <div className="scroll-area" style={{ paddingTop: 4 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0 16px' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500, color: 'var(--text-primary)' }}>April 2026</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['‹','›'].map((ch, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--navy-raised)', border: '1px solid var(--navy-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 16 }}>{ch}</div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {LEGEND.map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.3px' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color, flexShrink: 0 }}/>
            {l.label}
          </div>
        ))}
      </div>

      {/* Gap warning */}
      <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,107,107,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animation: 'pulse-warning 2s ease-in-out infinite' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--coral)', marginBottom: 2 }}>Coverage Gap — Wed & Thu</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Both parents unavailable · No backup assigned yet</div>
        </div>
      </div>

      {/* Week grid */}
      <div style={{ background: 'var(--navy-card)', border: '1px solid var(--navy-border)', borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}>
        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '40px repeat(7, 1fr)', borderBottom: '1px solid var(--navy-border)' }}>
          <div style={{ borderRight: '1px solid var(--navy-border)' }}/>
          {DAYS.map((d, i) => {
            const conflict = i === 2 || i === 3
            const today = i === 3
            return (
              <div key={i} style={{ padding: '10px 0', textAlign: 'center', position: 'relative', background: conflict ? 'rgba(255,107,107,0.06)' : 'transparent' }}>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: conflict ? 'var(--coral)' : 'var(--text-muted)', marginBottom: 4 }}>{d}</div>
                <div style={today ? { fontSize: 14, fontWeight: 600, color: 'var(--navy)', background: 'var(--gold)', width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' } : { fontSize: 16, fontWeight: 600, color: conflict ? 'var(--coral)' : 'var(--text-secondary)' }}>
                  {DAY_NUMS[i]}
                </div>
                {conflict && (
                  <div style={{ position: 'absolute', bottom: -1, left: '50%', transform: 'translateX(-50%)', background: 'var(--coral)', color: 'white', fontSize: 8, fontWeight: 700, padding: '2px 5px', borderRadius: '3px 3px 0 0', whiteSpace: 'nowrap' }}>GAP</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Grid body */}
        <div style={{ display: 'grid', gridTemplateColumns: '40px repeat(7, 1fr)' }}>
          {/* Time column */}
          <div style={{ borderRight: '1px solid var(--navy-border)' }}>
            {TIMES.map((t, i) => (
              <div key={i} style={{ height: 52, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '4px 6px 0 0', fontSize: 9, fontWeight: 500, color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>{t}</div>
            ))}
          </div>

          {/* Day columns */}
          {DAYS.map((_, di) => {
            const conflict = di === 2 || di === 3
            return (
              <div key={di} style={{ position: 'relative', height: TIMES.length * 52, borderRight: di < DAYS.length - 1 ? '1px solid rgba(255,255,255,0.02)' : 'none', background: conflict ? 'rgba(255,107,107,0.04)' : 'transparent' }}>
                {TIMES.map((_, ti) => (
                  <div key={ti} style={{ height: 52, borderBottom: '1px solid rgba(255,255,255,0.02)' }}/>
                ))}
                {(CAL_EVENTS[di] || []).map((ev, ei) => (
                  <div key={ei} style={{ position: 'absolute', top: ev.top, height: ev.height, left: 1, right: 1, borderRadius: 4, padding: '2px 4px', fontSize: 8, fontWeight: 600, overflow: 'hidden', cursor: 'pointer', letterSpacing: '0.2px', lineHeight: 1.3, background: ev.color + '22', borderLeft: `2px solid ${ev.color}`, color: ev.color }}>
                    {ev.label}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
