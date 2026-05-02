const WAVE_HEIGHTS = [6,14,20,28,18,24,12,20,16,22,10,18,26,14,8,20,16,24,12,18,8,22,16,28,10]

export default function VoiceScreen({ onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 300,
      background: 'var(--navy)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      {/* Status bar placeholder */}
      <div style={{ height: 44, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px 0 32px' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>9:41</span>
      </div>

      {/* Header */}
      <div style={{ width: '100%', padding: '8px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--navy-raised)', border: '1px solid var(--navy-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', animation: 'blink 1s ease-in-out infinite' }}/>
          Listening
        </div>
        <div style={{ width: 34 }}/>
      </div>

      {/* Orb */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 0, position: 'relative' }}>
        <div style={{ width: 200, height: 200, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%)', animation: 'orb-breathe 3s ease-in-out infinite' }}/>
          <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)', animation: 'orb-breathe 3s ease-in-out infinite 0.3s' }}/>
          <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)', animation: 'orb-breathe 3s ease-in-out infinite 0.6s' }}/>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #ffd780 0%, var(--gold) 40%, #d4820a 100%)', boxShadow: '0 0 40px rgba(245,166,35,0.5), 0 0 80px rgba(245,166,35,0.2), inset 0 2px 4px rgba(255,255,255,0.3)', animation: 'orb-core 3s ease-in-out infinite', position: 'relative', zIndex: 2 }}/>
        </div>

        {/* Waveform */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 28, marginTop: 20 }}>
          {WAVE_HEIGHTS.map((h, i) => (
            <div key={i} style={{ width: 3, borderRadius: 2, background: 'var(--gold)', animation: `wave ${0.9 + (i % 4) * 0.15}s ease-in-out infinite`, animationDelay: `${i * 0.06}s`, '--max-h': `${h}px` }}/>
          ))}
        </div>
        <style>{`@keyframes wave { 0%,100% { height: 4px; opacity: 0.35; } 50% { height: var(--max-h,20px); opacity: 1; } }`}</style>
      </div>

      {/* Transcript */}
      <div style={{ width: '100%', padding: '0 24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, var(--navy-border), transparent)' }}/>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.4, textAlign: 'center' }}>
          "Add nanny briefing for Thursday — school pickup at 3, no nuts for Ella's snack."
        </p>
        <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, var(--navy-border), transparent)' }}/>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'center' }}>
          Got it. I've updated the{' '}
          <span style={{ color: 'var(--gold)', fontWeight: 500 }}>Thursday nanny brief</span>
          {' '}— school pickup at 3:00 PM and added an allergy note for Ella. Want me to send a reminder to{' '}
          <span style={{ color: 'var(--gold)', fontWeight: 500 }}>Maria</span> tonight?
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, padding: '0 24px 100px', width: '100%' }}>
        <button onClick={onClose} style={{ flex: 1, padding: 12, borderRadius: 14, border: '1px solid var(--navy-border)', background: 'var(--navy-raised)', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'center' }}>
          Cancel
        </button>
        <button style={{ flex: 1, padding: 12, borderRadius: 14, border: 'none', background: 'var(--gold)', fontSize: 12, fontWeight: 600, color: 'var(--navy)', cursor: 'pointer', textAlign: 'center' }}>
          Confirm &amp; Send
        </button>
      </div>
    </div>
  )
}
