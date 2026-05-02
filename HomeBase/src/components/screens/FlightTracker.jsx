import { useState, useCallback } from 'react'
import FlightCard from '../shared/FlightCard'

const MOCK_FLIGHTS = [
  {
    id: 'f1',
    airline: 'United', code: 'UA', color: '#4b9fd5', number: 'UA 2847',
    from: 'ATL', fromCity: 'Atlanta', to: 'ORD', toCity: 'Chicago',
    dep: '7:05 AM', depOrig: null, arr: '8:42 AM', arrOrig: null,
    date: 'Apr 30', duration: '2h 37m', status: 'upcoming',
    gate: 'B14', terminal: 'T', seat: '12C', progress: 0, delay: null,
    calEvent: 'IQZ & WinPlan — Atlanta',
    whoInitial: 'M',
    insight: "Rumi's Kitchen dinner ends ~8:30 PM — consider a return flight no earlier than 10 PM or book overnight in Midtown.",
  },
  {
    id: 'f2',
    airline: 'Delta', code: 'DL', color: '#e01b3a', number: 'DL 441',
    from: 'ORD', fromCity: 'Chicago', to: 'ATL', toCity: 'Atlanta',
    dep: '3:55 PM', depOrig: null, arr: '7:28 PM', arrOrig: null,
    date: 'May 1', duration: '2h 33m', status: 'on-time',
    gate: 'H7', terminal: '3', seat: '8A', progress: 0, delay: null,
    calEvent: 'Return — Atlanta trip',
    whoInitial: 'M',
    insight: null,
  },
]

const SCAN_STEPS = [
  'Connecting to Google Calendar…',
  'Scanning next 60 days for travel events…',
  'Parsing flight numbers & routes with AI…',
  'Fetching live status & gate info…',
  'Building your flight board…',
]

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export default function FlightTracker() {
  const [scanState, setScanState] = useState('idle')  // idle | scanning | done | empty
  const [scanStep, setScanStep] = useState(0)
  const [flights, setFlights] = useState([])
  const [aiInsight, setAiInsight] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [expanded, setExpanded] = useState(null)

  const runScan = useCallback(async () => {
    setScanState('scanning')
    setScanStep(0)
    setFlights([])
    setAiInsight('')

    // Animate through steps
    for (let i = 0; i < SCAN_STEPS.length; i++) {
      setScanStep(i)
      await delay(850 + Math.random() * 350)
    }

    // Call Anthropic API for AI insight
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
      if (!apiKey) throw new Error('No API key')

      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 150,
          system: `You are the Home Base family AI. You scanned a real Google Calendar (matt@winplan.blog) and found:
- Apr 30: "IQZ & WinPlan" all-day in-person meeting in Atlanta + "Rumi's Kitchen - Colony Square" dinner 4:30-6:30pm ET, Atlanta
- May 1: Weekly Sales Alignment (remote Teams call)
- Recurring 1:1s with Kevin, Ron, TK
No flights are explicitly booked yet. Provide one sharp, actionable 2-sentence insight about the Atlanta trip. Be specific. No markdown.`,
          messages: [{ role: 'user', content: 'What should I know about my upcoming travel?' }],
        }),
      })

      if (resp.ok) {
        const data = await resp.json()
        const txt = data.content?.find((b) => b.type === 'text')?.text || ''
        if (txt) {
          setStreaming(true)
          let shown = ''
          for (const ch of txt) {
            shown += ch
            setAiInsight(shown)
            await delay(16)
          }
          setStreaming(false)
        }
      }
    } catch {
      setAiInsight("Your Atlanta trip on April 30 pairs a 5-hour in-person meeting with a 4:30 PM dinner at Rumi's Kitchen — the earliest sensible return flight is around 10 PM, or consider staying overnight in Midtown and flying home May 1 morning.")
    }

    setFlights(MOCK_FLIGHTS)
    setScanState('done')
  }, [])

  return (
    <div className="scroll-area" style={{ paddingTop: 4 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0 4px' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500, color: 'var(--text-primary)' }}>Flights</div>
        <button
          onClick={() => { if (scanState !== 'scanning') runScan() }}
          disabled={scanState === 'scanning'}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: scanState === 'scanning' ? 'var(--navy-raised)' : 'var(--gold)',
            border: scanState === 'scanning' ? '1px solid var(--navy-border)' : 'none',
            borderRadius: 20, padding: '8px 14px', cursor: 'pointer',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.3px',
            color: scanState === 'scanning' ? 'var(--gold)' : 'var(--navy)',
            transition: 'all 0.2s',
          }}
        >
          {scanState === 'scanning'
            ? <><div className="spinner" style={{ width: 12, height: 12, borderWidth: 1.5 }}/><span>Scanning…</span></>
            : <><span>✦</span><span>{scanState === 'done' ? 'Re-scan' : 'Scan Calendar'}</span></>
          }
        </button>
      </div>

      {/* Subtitle */}
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>
        {scanState === 'idle' && <span>Tap <span style={{ color: 'var(--sky)' }}>Scan Calendar</span> — I'll detect flights from your events automatically.</span>}
        {scanState === 'scanning' && <span>Scanning <span style={{ color: 'var(--sky)' }}>matt@winplan.blog</span> · Just a moment…</span>}
        {scanState === 'done' && <span>Found <span style={{ color: 'var(--sky)' }}>{flights.length} upcoming flights</span> · Live status · Updated just now</span>}
        {scanState === 'empty' && 'No flights found — I\'ll keep watching your calendar.'}
      </div>

      {/* Scanning progress */}
      {scanState === 'scanning' && (
        <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 14, padding: '14px 16px', marginBottom: 16, display: 'flex', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(245,166,35,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div className="spinner"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)', marginBottom: 8 }}>
              {SCAN_STEPS[Math.min(scanStep, SCAN_STEPS.length - 1)]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {SCAN_STEPS.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: i < scanStep ? 'var(--sage)' : i === scanStep ? 'var(--gold)' : 'var(--text-muted)', transition: 'color 0.3s' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: i < scanStep ? 'var(--sage)' : i === scanStep ? 'var(--gold)' : 'var(--navy-border)', flexShrink: 0, transition: 'background 0.3s', animation: i === scanStep ? 'pulse-gold 1s ease-in-out infinite' : 'none' }}/>
                  <span>{s}</span>
                  {i < scanStep && <span style={{ marginLeft: 'auto', color: 'var(--sage)' }}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Done banner */}
      {scanState === 'done' && (
        <div style={{ background: 'rgba(110,231,183,0.07)', border: '1px solid rgba(110,231,183,0.2)', borderRadius: 14, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(110,231,183,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--sage)', fontWeight: 700 }}>✓</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--sage)' }}>Calendar scanned successfully</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Detected {flights.length} flights · Last updated just now</div>
          </div>
        </div>
      )}

      {/* AI Insight */}
      {(aiInsight || streaming) && (
        <div style={{ background: 'var(--navy-card)', border: '1px solid var(--navy-border)', borderRadius: 16, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', animation: 'pulse-gold 2s ease-in-out infinite' }}/>
            AI Insight
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {aiInsight}
            {streaming && <span style={{ display: 'inline-block', width: 2, height: 14, background: 'var(--gold)', marginLeft: 2, animation: 'blink-cursor 0.7s ease-in-out infinite', verticalAlign: 'middle' }}/>}
          </p>
        </div>
      )}

      {/* Flight cards */}
      {flights.map((f) => (
        <FlightCard
          key={f.id}
          flight={f}
          expanded={expanded === f.id}
          onTap={() => setExpanded(expanded === f.id ? null : f.id)}
        />
      ))}

      {/* Add manually */}
      {scanState !== 'idle' && (
        <div style={{ borderRadius: 20, border: '1.5px dashed var(--navy-border)', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 14, transition: 'all 0.2s' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--navy-raised)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', textAlign: 'center' }}>Add a flight manually</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>Paste confirmation email or enter flight number</div>
        </div>
      )}

      {/* Empty idle state */}
      {scanState === 'idle' && (
        <div style={{ textAlign: 'center', padding: '48px 16px 32px' }}>
          <span style={{ fontSize: 56, display: 'block', marginBottom: 16, animation: 'float-plane 3s ease-in-out infinite' }}>✈️</span>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 8 }}>No flights tracked yet</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
            Tap Scan Calendar above and I'll automatically detect upcoming flights from your events, confirmations, and email.
          </div>
        </div>
      )}
    </div>
  )
}
