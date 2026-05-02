const NAV_ITEMS = [
  {
    label: 'Home',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'Flights',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 16l-4-4-8 1-3-3 1-1 3 1 2-2-8-5 2-2 11 3 3-3a2 2 0 013 3l-3 3 3 11-2 2-5-8-2 2 1 3-1 1z"/>
      </svg>
    ),
  },
  {
    label: 'Calendar',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8"  y1="2" x2="8"  y2="6"/>
        <line x1="3"  y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Actions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    label: 'Settings',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
]

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      height: 80,
      background: 'rgba(10,15,30,0.7)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      paddingTop: 12,
      zIndex: 100,
    }}>
      {NAV_ITEMS.map((item, i) => {
        const isActive = active === i
        return (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              padding: '0 8px',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div style={{ color: isActive ? 'var(--gold)' : 'var(--text-muted)', transition: 'color 0.2s' }}>
              {item.icon}
            </div>
            <span style={{
              fontSize: 10, fontWeight: 500, letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: isActive ? 'var(--gold)' : 'var(--text-muted)',
              transition: 'color 0.2s',
            }}>
              {item.label}
            </span>
            <div style={{
              width: 4, height: 4, borderRadius: '50%',
              background: 'var(--gold)',
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.2s',
            }}/>
          </button>
        )
      })}
    </nav>
  )
}
