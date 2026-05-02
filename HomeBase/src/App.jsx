import { useState, useCallback } from 'react'
import StatusBar from './components/shared/StatusBar'
import BottomNav from './components/shared/BottomNav'
import HomeScreen from './components/screens/HomeScreen'
import FlightTracker from './components/screens/FlightTracker'
import CalendarScreen from './components/screens/CalendarScreen'
import ActionsScreen from './components/screens/ActionsScreen'
import VoiceScreen from './components/screens/VoiceScreen'
import SettingsScreen from './components/screens/SettingsScreen'

export default function App() {
  const [screen, setScreen] = useState(0)   // 0=home 1=flights 2=calendar 3=actions 4=settings
  const [voiceOpen, setVoiceOpen] = useState(false)

  const navigateTo = useCallback((idx) => setScreen(idx), [])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 0%, #1a0f2e 0%, #050810 60%)',
    }}>
      <div className="device-shell">

        {/* Voice overlay — sits above everything */}
        {voiceOpen && (
          <VoiceScreen onClose={() => setVoiceOpen(false)} />
        )}

        {/* ── Screens ── */}
        <div className={`screen ${screen !== 0 ? 'hidden' : ''}`} style={{ background: 'var(--navy)' }}>
          <StatusBar />
          <HomeScreen onNavigate={navigateTo} onVoice={() => setVoiceOpen(true)} />
        </div>

        <div className={`screen ${screen !== 1 ? 'hidden' : ''}`} style={{ background: 'var(--navy)' }}>
          <StatusBar />
          <FlightTracker />
        </div>

        <div className={`screen ${screen !== 2 ? 'hidden' : ''}`} style={{ background: 'var(--navy)' }}>
          <StatusBar />
          <CalendarScreen />
        </div>

        <div className={`screen ${screen !== 3 ? 'hidden' : ''}`} style={{ background: 'var(--navy)' }}>
          <StatusBar />
          <ActionsScreen onNavigate={navigateTo} onVoice={() => setVoiceOpen(true)} />
        </div>

        <div className={`screen ${screen !== 4 ? 'hidden' : ''}`} style={{ background: 'var(--navy)' }}>
          <StatusBar />
          <SettingsScreen />
        </div>

        {/* ── Bottom Nav ── */}
        <BottomNav active={screen} onNavigate={navigateTo} />
      </div>
    </div>
  )
}
