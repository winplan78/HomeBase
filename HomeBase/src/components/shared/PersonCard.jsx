export default function PersonCard({ name, initial, role, events = [], bars = [] }) {
  const ringStyle = role === 'mom'
    ? { background: 'rgba(245,166,35,0.15)', color: 'var(--mom)', boxShadow: '0 0 0 2px var(--mom), 0 0 12px rgba(245,166,35,0.2)' }
    : { background: 'rgba(125,211,252,0.12)', color: 'var(--dad)', boxShadow: '0 0 0 2px var(--dad), 0 0 12px rgba(125,211,252,0.15)' }

  return (
    <div className="card card-interactive" style={{ padding: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0, ...ringStyle }}>
          {initial}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>{events.length} events today</div>
        </div>
      </div>

      {/* Timeline bar */}
      {bars.length > 0 && (
        <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', gap: 2, marginBottom: 10 }}>
          {bars.map((b, i) => (
            <div key={i} style={{ width: b.w, background: b.color, borderRadius: 2, height: '100%', flexShrink: 0 }}/>
          ))}
        </div>
      )}

      {/* Event list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {events.map((ev, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color, flexShrink: 0 }}/>
            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', width: 32, flexShrink: 0 }}>{ev.time}</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
