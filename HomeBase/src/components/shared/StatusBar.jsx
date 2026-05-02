export default function StatusBar() {
  return (
    <div style={{
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px 0 32px',
      position: 'relative',
      zIndex: 10,
    }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.3px' }}>
        9:41
      </span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {/* Signal bars */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="var(--text-primary)">
          <rect x="0"    y="4"   width="3" height="8"    rx="1" opacity="0.4"/>
          <rect x="4.5"  y="2.5" width="3" height="9.5"  rx="1" opacity="0.6"/>
          <rect x="9"    y="0.5" width="3" height="11.5" rx="1"/>
          <rect x="13.5" y="3"   width="2" height="6"    rx="1"
            stroke="var(--text-primary)" strokeWidth="1" fill="none" opacity="0.5"/>
        </svg>
        {/* Wifi */}
        <svg width="15" height="12" viewBox="0 0 24 16" fill="none" stroke="var(--text-primary)" strokeWidth="1.8">
          <path d="M1 5.5C3.8 2.7 7.7 1 12 1s8.2 1.7 11 4.5" opacity="0.4"/>
          <path d="M4 9c2.1-2.1 5-3.3 8-3.3s5.9 1.2 8 3.3" opacity="0.7"/>
          <path d="M7.5 12.5C8.9 11.1 10.4 10.3 12 10.3s3.1.8 4.5 2.2"/>
          <circle cx="12" cy="16" r="1.5" fill="var(--text-primary)"/>
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0" y="1" width="21" height="10" rx="2.5" stroke="var(--text-primary)" strokeWidth="1.2" opacity="0.5"/>
          <rect x="22" y="3.5" width="2.5" height="5" rx="1" fill="var(--text-primary)" opacity="0.4"/>
          <rect x="1.5" y="2.5" width="15" height="7" rx="1.5" fill="var(--text-primary)"/>
        </svg>
      </div>
    </div>
  )
}
