const STATUS_LABELS = {
  'on-time':  'On Time',
  'delayed':  'Delayed',
  'boarding': 'Boarding',
  'upcoming': 'Upcoming',
  'landed':   'Landed',
}

const STATUS_COLORS = {
  'on-time':  { bg: 'rgba(110,231,183,0.12)', border: 'rgba(110,231,183,0.25)', color: 'var(--sage)' },
  'delayed':  { bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.25)', color: 'var(--coral)' },
  'boarding': { bg: 'rgba(245,166,35,0.12)',  border: 'rgba(245,166,35,0.25)',  color: 'var(--gold)' },
  'upcoming': { bg: 'rgba(125,211,252,0.08)', border: 'rgba(125,211,252,0.2)',  color: 'var(--sky)' },
  'landed':   { bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.2)',  color: 'var(--lavender)' },
}

const CARD_BORDERS = {
  'on-time':  'rgba(110,231,183,0.25)',
  'delayed':  'rgba(255,107,107,0.30)',
  'boarding': 'rgba(245,166,35,0.25)',
  'upcoming': 'rgba(245,166,35,0.20)',
  'landed':   'rgba(167,139,250,0.20)',
}

export default function FlightCard({ flight, expanded, onTap }) {
  const { airline, code, color, number, from, fromCity, to, toCity,
          dep, depOrig, arr, arrOrig, date, duration, status,
          gate, terminal, seat, delay, progress, calEvent, whoInitial, insight } = flight

  const sc = STATUS_COLORS[status] || STATUS_COLORS['upcoming']

  return (
    <div
      onClick={onTap}
      style={{
        borderRadius: 20,
        marginBottom: 14,
        overflow: 'hidden',
        background: 'var(--navy-card)',
        border: `1px solid ${CARD_BORDERS[status] || 'var(--navy-border)'}`,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* ── Top row: airline + status badge ── */}
      <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: color + '22', color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, letterSpacing: '-0.5px' }}>
            {code}
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>{airline} · {date}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.3px' }}>{number}</div>
          </div>
        </div>
        <div style={{
          background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color,
          borderRadius: 20, padding: '4px 10px', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.5px', textTransform: 'uppercase',
          animation: status === 'boarding' ? 'boarding-blink 1.5s ease-in-out infinite' : 'none',
        }}>
          {STATUS_LABELS[status]}
        </div>
      </div>

      {/* ── Route ── */}
      <div style={{ padding: '0 16px 14px', display: 'flex', alignItems: 'center' }}>
        {/* Origin */}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>{from}</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, fontWeight: 500, letterSpacing: '0.3px' }}>{fromCity}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{dep}</div>
          {depOrig && <div style={{ fontSize: 10, color: 'var(--text-muted)', textDecoration: 'line-through' }}>{depOrig}</div>}
        </div>

        {/* Plane */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '0 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: 80 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--navy-border)', flexShrink: 0 }}/>
            <div style={{ flex: 1, height: 1, background: 'var(--navy-border)' }}/>
            <span style={{ fontSize: 14, margin: '0 2px', animation: 'float-plane 3s ease-in-out infinite', display: 'inline-block' }}>✈</span>
            <div style={{ flex: 1, height: 1, background: 'var(--navy-border)' }}/>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--navy-border)', flexShrink: 0 }}/>
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>{duration}</div>
        </div>

        {/* Destination */}
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>{to}</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, fontWeight: 500, letterSpacing: '0.3px' }}>{toCity}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{arr}</div>
          {arrOrig && <div style={{ fontSize: 10, color: 'var(--text-muted)', textDecoration: 'line-through' }}>{arrOrig}</div>}
        </div>
      </div>

      {/* ── Progress bar (in-flight) ── */}
      {progress > 0 && (
        <div style={{ height: 2, background: 'var(--navy-raised)', margin: '0 16px 14px', borderRadius: 1, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, borderRadius: 1, background: 'linear-gradient(90deg, var(--sage), var(--teal))', transition: 'width 1s ease' }}/>
        </div>
      )}

      {/* ── Expanded details ── */}
      {expanded && (
        <>
          <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid var(--navy-border)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'Gate',     value: gate,     warn: false },
              { label: 'Terminal', value: terminal,  warn: false },
              { label: 'Seat',     value: seat,      warn: false },
              delay && { label: 'Delay', value: `+${delay} min`, warn: true },
            ].filter(Boolean).map((d, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{d.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: d.warn ? 'var(--coral)' : 'var(--text-primary)' }}>{d.value}</div>
              </div>
            ))}
          </div>

          {insight && (
            <div style={{ padding: '0 14px 14px' }}>
              <div style={{ background: 'rgba(125,211,252,0.06)', border: '1px solid rgba(125,211,252,0.15)', borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--sky)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Smart Insight
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{insight}</div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Footer ── */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--navy-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="avatar-chip mom">{whoInitial}</div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>
            📅 {calEvent}
          </span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>Live · just now</span>
      </div>
    </div>
  )
}
