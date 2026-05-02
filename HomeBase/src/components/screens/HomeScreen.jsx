import PersonCard from '../shared/PersonCard'

const UPCOMING = [
  { d: '30', dw: 'WED', name: 'IQZ & WinPlan — Atlanta',   sub: '5-hour meeting · In person',     who: 'mom',  urgent: true },
  { d: '30', dw: 'WED', name: "Rumi's Kitchen, Colony Sq.", sub: '4:30 PM · Midtown Atlanta',       who: 'mom',  urgent: false },
  { d: '1',  dw: 'THU', name: 'Sales Alignment Meeting',    sub: '2:00 PM · Microsoft Teams',       who: 'both', urgent: false },
  { d: '6',  dw: 'WED', name: 'Ron & Matt 1:1',             sub: '8:00 AM · Google Meet',           who: 'dad',  urgent: false },
  { d: '7',  dw: 'THU', name: 'TK & Matt Bi-Weekly',        sub: '3:00 PM · Google Meet',           who: 'both', urgent: false },
]

const WHO_CHIP = { mom: 'M', dad: 'W', both: '↔', nanny: 'N' }

export default function HomeScreen({ onNavigate, onVoice }) {
  return (
    <>
      <div className="scroll-area" style={{ paddingTop: 0 }}>

        {/* Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0 20px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Good morning,<br/>Matt.
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Friday, May 1 · 9:41 AM</div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--navy-raised)', border: '1px solid var(--navy-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
            <div style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: 'var(--coral)', border: '1.5px solid var(--navy)' }}/>
          </div>
        </div>

        {/* Briefing card */}
        <div style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.1) 0%, rgba(20,28,46,0.6) 60%)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 20, padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)', pointerEvents: 'none' }}/>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', animation: 'pulse-gold 2s ease-in-out infinite' }}/>
            Daily Briefing
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 400, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.5 }}>
            Atlanta trip is{' '}
            <em style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--gold)' }}>6 days out</em>
            {' '}— no flight booked yet. Rumi's Kitchen at 4:30 PM means you'll want a{' '}
            <em style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--gold)' }}>late return</em>
            {' '}or overnight stay.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <div className="chip coral">✈ No flight booked</div>
            <div className="chip sky">📍 Atlanta Apr 30</div>
            <div className="chip gold">🍽 Dinner confirmed</div>
          </div>
        </div>

        {/* Today at a glance */}
        <div className="section-label">Today at a Glance</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <PersonCard
            name="Maya" initial="M" role="mom"
            events={[
              { time: '9A',  label: 'Board call',    color: 'var(--mom)' },
              { time: '12P', label: 'Lunch w/team',  color: 'var(--mom)' },
              { time: '3P',  label: 'School pickup', color: 'var(--nanny)' },
            ]}
            bars={[
              { w: '30%', color: 'var(--navy-raised)' },
              { w: '25%', color: 'var(--mom)' },
              { w: '15%', color: 'var(--mom)' },
              { w: '20%', color: 'var(--nanny)' },
              { w: '10%', color: 'var(--navy-raised)' },
            ]}
          />
          <PersonCard
            name="Will" initial="W" role="dad"
            events={[
              { time: '8A',  label: 'Standup',      color: 'var(--dad)' },
              { time: '10A', label: '1:1s block',   color: 'var(--dad)' },
              { time: '2P',  label: 'Sales mtg',    color: 'var(--lavender)' },
            ]}
            bars={[
              { w: '20%', color: 'var(--dad)' },
              { w: '35%', color: 'var(--dad)' },
              { w: '20%', color: 'var(--navy-raised)' },
              { w: '15%', color: 'var(--lavender)' },
              { w: '10%', color: 'var(--navy-raised)' },
            ]}
          />
        </div>

        {/* Upcoming */}
        <div className="section-label">Coming Up</div>
        <div style={{ background: 'var(--navy-card)', border: '1px solid var(--navy-border)', borderRadius: 18, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid var(--navy-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>This Week</span>
            <span onClick={() => onNavigate(2)} style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 500, cursor: 'pointer' }}>Calendar →</span>
          </div>
          {UPCOMING.map((u, i) => (
            <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < UPCOMING.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', cursor: 'pointer' }}>
              <div style={{ width: 38, height: 40, background: u.urgent ? 'rgba(255,107,107,0.1)' : 'var(--navy-raised)', border: u.urgent ? '1px solid rgba(255,107,107,0.2)' : 'none', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: u.urgent ? 'var(--coral)' : 'var(--text-primary)', lineHeight: 1 }}>{u.d}</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.5px', color: u.urgent ? 'var(--coral)' : 'var(--text-muted)', textTransform: 'uppercase', marginTop: 2 }}>{u.dw}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 3 }}>{u.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{u.sub}</div>
              </div>
              <div className={`avatar-chip ${u.who}`}>{WHO_CHIP[u.who]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mic */}
      <div className="mic-anchor">
        <button className="mic-btn" onClick={onVoice}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
          </svg>
        </button>
      </div>
    </>
  )
}
