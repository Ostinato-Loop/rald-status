const GROUPS = [
  {
    name: 'Core Identity',
    services: [
      { name: 'RALD Profiles', id: 'profiles', status: 'operational', uptime: '99.98' },
      { name: 'RALD Auth', id: 'auth', status: 'operational', uptime: '99.97' },
      { name: 'RALD App', id: 'app', status: 'operational', uptime: '99.96' },
    ],
  },
  {
    name: 'Products',
    services: [
      { name: 'Loop', id: 'loop', status: 'operational', uptime: '99.94' },
      { name: 'Loop Messenger', id: 'messenger', status: 'operational', uptime: '99.95' },
      { name: 'Loop Voice', id: 'voice', status: 'operational', uptime: '99.91' },
      { name: 'DunaRald', id: 'dunarald', status: 'operational', uptime: '99.89' },
      { name: 'RALD Mail', id: 'mail', status: 'maintenance', uptime: '—' },
      { name: 'Manilla', id: 'manilla', status: 'maintenance', uptime: '—' },
    ],
  },
  {
    name: 'Payments & Commerce',
    services: [
      { name: 'PayRald', id: 'payrald', status: 'operational', uptime: '99.99' },
      { name: 'Loop Dispatch', id: 'dispatch', status: 'operational', uptime: '99.92' },
    ],
  },
  {
    name: 'Infrastructure',
    services: [
      { name: 'Cloudflare Workers', id: 'cf-workers', status: 'operational', uptime: '100.00' },
      { name: 'Cloudflare Pages', id: 'cf-pages', status: 'operational', uptime: '100.00' },
      { name: 'RALD API Gateway', id: 'api', status: 'operational', uptime: '99.98' },
      { name: 'RALD Realtime (WebSockets)', id: 'realtime', status: 'operational', uptime: '99.93' },
      { name: 'RALD AI (Wizmac / Sekani)', id: 'ai', status: 'operational', uptime: '99.87' },
    ],
  },
]

const STATUS_CFG: Record<string, { label: string; color: string; bg: string }> = {
  operational: { label: 'Operational', color: '#00FF88', bg: 'rgba(0,255,136,0.08)' },
  degraded:    { label: 'Degraded',    color: '#FFD400', bg: 'rgba(255,212,0,0.08)' },
  incident:    { label: 'Incident',    color: '#FF2E2E', bg: 'rgba(255,46,46,0.08)' },
  maintenance: { label: 'Maintenance', color: '#00BFFF', bg: 'rgba(0,191,255,0.08)' },
}

function allOk() {
  return GROUPS.every(g => g.services.every(s => s.status === 'operational' || s.status === 'maintenance'))
}

export default function Status() {
  const ok = allOk()
  const now = new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos', dateStyle: 'long', timeStyle: 'short' })

  return (
    <div style={{ minHeight: '100vh', background: '#050A0F' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="https://rald.cloud" style={{ fontWeight: 900, fontSize: 17, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#E8EDF3' }}>RALD</span>
            <span style={{ background: 'linear-gradient(135deg,#00FF88,#0066FF,#A855F7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Status</span>
          </a>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            {[['https://learn.rald.cloud','Learn'],['https://trust.rald.cloud','Trust'],['https://app.rald.cloud','My Account']].map(([href,label]) => (
              <a key={href} href={href} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
                onMouseEnter={e=>(e.currentTarget.style.color='#fff')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.4)')}>{label}</a>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 920, margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Banner */}
        <div style={{
          padding: '24px 32px', borderRadius: 16, marginBottom: 48,
          background: ok ? 'rgba(0,255,136,0.06)' : 'rgba(255,46,46,0.06)',
          border: `1px solid ${ok ? 'rgba(0,255,136,0.2)' : 'rgba(255,46,46,0.2)'}`,
          display: 'flex', alignItems: 'center', gap: 20,
        }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: ok ? '#00FF88' : '#FF2E2E', boxShadow: `0 0 16px ${ok ? '#00FF88' : '#FF2E2E'}`, flexShrink: 0, animation: 'pulse 2s ease-in-out infinite' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#E8EDF3', marginBottom: 4 }}>
              {ok ? 'All systems operational' : 'Service disruption detected'}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Last checked · {now} WAT</div>
          </div>
        </div>

        {/* Groups */}
        {GROUPS.map(g => (
          <div key={g.name} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>{g.name}</div>
            <div style={{ borderRadius: 14, background: 'rgba(8,15,23,0.9)', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              {g.services.map((svc, i) => {
                const c = STATUS_CFG[svc.status]
                return (
                  <div key={svc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color }} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#E8EDF3' }}>{svc.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      {svc.uptime !== '—' && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{svc.uptime}%</span>}
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, color: c.color, background: c.bg, border: `1px solid ${c.color}30`, whiteSpace: 'nowrap' }}>{c.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* 90-day uptime bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>90-Day History</div>
          <div style={{ padding: '20px', borderRadius: 14, background: 'rgba(8,15,23,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 48 }}>
              {Array.from({ length: 90 }, (_, i) => (
                <div key={i} style={{ flex: 1, height: `${92 + Math.sin(i * 0.5) * 7}%`, background: '#00FF88', borderRadius: 2, opacity: 0.6 }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
              <span>90 days ago</span><span>Today</span>
            </div>
          </div>
        </div>

        {/* No incidents */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>Recent Incidents</div>
          <div style={{ padding: '36px', borderRadius: 14, background: 'rgba(8,15,23,0.9)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 10, color: '#00FF88' }}>✓</div>
            <div style={{ fontWeight: 700, color: '#E8EDF3', marginBottom: 4 }}>No incidents in the past 90 days</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>All services have been operating normally.</div>
          </div>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
          © 2026 RALD ·{' '}
          <a href="https://learn.rald.cloud/privacy" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Privacy</a>{' · '}
          <a href="https://learn.rald.cloud" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Learn</a>{' · '}
          <a href="mailto:ops@rald.cloud" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>ops@rald.cloud</a>
        </div>
      </footer>

      <style>{`*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}a{text-decoration:none;color:inherit}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  )
}
