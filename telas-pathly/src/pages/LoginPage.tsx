import { useState } from 'react'
import { Lock, Mail, Pencil, UserCircle } from 'lucide-react'

const USERS = [
  { email: 'criador@email.com', senha: '123456', role: 'criador' },
  { email: 'aprendiz@email.com', senha: '123456', role: 'aprendiz' },
]

type Props = {
  onLoginCriador: () => void
  onLoginAprendiz: () => void
}

export function LoginPage({ onLoginCriador, onLoginAprendiz }: Props) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const iconMuted = 'rgba(255,255,255,0.45)'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const user = USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.senha === senha
    )
    if (user) {
      setErro('')
      user.role === 'aprendiz' ? onLoginAprendiz() : onLoginCriador()
    } else {
      setErro('E-mail ou senha inválidos.')
    }
  }

  return (
    <div style={shell}>
      <aside style={brandColumn} aria-label="Marca Pathly">
        <div style={brandInner}>
          <div style={logoMark}>
            <PathlyIcon />
          </div>
          <h1 style={pathlyTitle}>PATHLY</h1>
          <p style={brandTagline}>APRENDA. EVOLUA. CONQUISTE.</p>
          <hr style={brandRule} />
          <p style={brandSubtitle}>Plataforma de trilhas de aprendizado gamificadas que transformam seu progresso em conquista e evolução.</p>
        </div>
        <div style={illustrationWrap}><PathIllustration /></div>

      </aside>

      <main style={mainColumn}>
        <div style={mainInner}>
          <h2 style={loginHeading}>Login</h2>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div style={inputShell}>
              <Mail size={20} strokeWidth={2} color="#1385EA" aria-hidden />
              <input style={inputField} type="email" name="email" placeholder="E-mail"
                autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div style={inputShell}>
              <Lock size={20} strokeWidth={2} color="#1385EA" aria-hidden />
              <input style={inputField} type="password" name="senha" placeholder="Senha"
                autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            {erro && <p style={erroStyle}>{erro}</p>}
            <button type="submit" style={primaryBtn}>Entrar</button>
          </form>

          <p style={hintStyle}>
            Use <strong>criador@email.com</strong> ou <strong>aprendiz@email.com</strong> com a senha <strong>123456</strong>
          </p>

          <div style={dividerRow}>
            <div style={dividerLine} />
            <span style={dividerLabel}>ou</span>
            <div style={dividerLine} />
          </div>

          <button type="button" style={actionCard}>
            <span style={actionIconBg}><UserCircle size={22} strokeWidth={2} color="#1385EA" /></span>
            <span style={actionLabel}>Quero seguir uma trilha</span>
          </button>

          <button type="button" style={actionCard}>
            <span style={{ ...actionIconBg, backgroundColor: '#E6FAF0' }}><Pencil size={22} strokeWidth={2} color="#22C55E" /></span>
            <span style={actionLabel}>Quero criar uma trilha</span>
          </button>
        </div>
      </main>
    </div>
  )
}


function PathlyIcon() {
  return (
    <svg width={52} height={52} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="26" fill="rgba(255,255,255,0.1)" />
      <path d="M14 36C20 30 22 22 28 20C34 18 36 28 42 24"
        stroke="#1385EA" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="36" r="3" fill="#22C55E" />
      <circle cx="42" cy="24" r="3" fill="#F4BD48" />
      <circle cx="28" cy="20" r="2" fill="white" opacity="0.7" />
    </svg>
  )
}

function PathIllustration() {
  return (
    <svg width={260} height={140} viewBox="0 0 260 140" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ maxWidth: '100%', height: 'auto' }}>
      <path d="M20 115C48 100 62 80 80 74C100 67 118 86 138 80C162 73 174 50 196 42C210 36 220 28 234 22"
        stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" />
      <circle cx="20" cy="115" r="6" fill="#22C55E" />
      <circle cx="80" cy="74" r="5" fill="#1385EA" opacity="0.8" />
      <circle cx="138" cy="80" r="5" fill="#F4BD48" opacity="0.8" />
      <circle cx="196" cy="42" r="5" fill="#1385EA" opacity="0.8" />
      <circle cx="234" cy="22" r="7" fill="#F4BD48" />
      <path d="M230 14L238 22L230 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="66" y="60" width="28" height="28" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <text x="80" y="79" textAnchor="middle" fontSize="13" fill="white">⭐</text>
      <rect x="124" y="66" width="28" height="28" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <text x="138" y="85" textAnchor="middle" fontSize="13" fill="white">🏆</text>
    </svg>
  )
}

const fontStack = "'Poppins', ui-sans-serif, system-ui, -apple-system, sans-serif"

const shell: React.CSSProperties = {
  minHeight: '100vh', display: 'flex', fontFamily: fontStack,
  color: '#0B1D29', backgroundColor: '#ffffff'
}
const brandColumn: React.CSSProperties = {
  flex: '0 0 36%', minWidth: '300px', maxWidth: '460px',
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  padding: '48px 40px 36px', boxSizing: 'border-box',
  background: 'linear-gradient(160deg, #0B1D29 0%, #0F4C5C 100%)',
  minHeight: '100vh'
}
const brandInner: React.CSSProperties = {
  width: '100%', maxWidth: '320px', display: 'flex',
  flexDirection: 'column', alignItems: 'center', textAlign: 'center',
  flex: 1, justifyContent: 'center', gap: 0
}
const logoMark: React.CSSProperties = { marginBottom: 16 }
const pathlyTitle: React.CSSProperties = {
  margin: '0 0 4px', fontSize: 'clamp(2rem, 4vw, 2.8rem)',
  fontWeight: 900, letterSpacing: '0.15em', color: '#ffffff'
}
const brandTagline: React.CSSProperties = {
  margin: '0 0 20px', fontSize: '0.72rem', fontWeight: 700,
  letterSpacing: '0.18em', color: '#1385EA', textTransform: 'uppercase'
}
const brandRule: React.CSSProperties = {
  width: '64px', height: '2px',
  background: 'linear-gradient(90deg, #1385EA, #22C55E)',
  margin: '0 0 18px', border: 'none', borderRadius: 2
}
const brandSubtitle: React.CSSProperties = {
  margin: 0, fontSize: '0.88rem', fontWeight: 500,
  color: 'rgba(255,255,255,0.6)', lineHeight: 1.65
}
const illustrationWrap: React.CSSProperties = {
  width: '100%', maxWidth: '320px', display: 'flex',
  justifyContent: 'center', paddingTop: '28px', paddingBottom: '12px'
}

const mainColumn: React.CSSProperties = {
  flex: '1 1 auto', minWidth: 0, display: 'flex',
  alignItems: 'center', justifyContent: 'center',
  padding: '48px 32px', boxSizing: 'border-box',
  backgroundColor: '#ffffff'
}
const mainInner: React.CSSProperties = {
  width: '100%', maxWidth: '420px',
  display: 'flex', flexDirection: 'column', alignItems: 'stretch'
}
const loginHeading: React.CSSProperties = {
  margin: '0 0 28px', fontSize: '1.75rem', fontWeight: 800,
  letterSpacing: '-0.02em', color: '#0B1D29', textAlign: 'center'
}
const inputShell: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '12px',
  padding: '14px 16px', marginBottom: '14px',
  border: '1px solid #E4EAF0', borderRadius: '14px',
  backgroundColor: '#F5F7FA', boxSizing: 'border-box'
}
const inputField: React.CSSProperties = {
  flex: 1, minWidth: 0, border: 'none', outline: 'none',
  background: 'transparent', fontSize: '1rem', color: '#0B1D29', fontFamily: 'inherit'
}
const primaryBtn: React.CSSProperties = {
  display: 'block', width: '100%', margin: '8px 0 0',
  padding: '14px 40px', fontSize: '0.95rem', fontWeight: 700,
  fontFamily: 'inherit', color: '#ffffff',
  background: 'linear-gradient(135deg, #1385EA 0%, #0F4C5C 100%)',
  border: 'none', borderRadius: '12px', cursor: 'pointer',
  boxShadow: '0 8px 20px -8px rgba(19, 133, 234, 0.55)'
}
const erroStyle: React.CSSProperties = {
  margin: '0 0 12px', color: '#FF6B6B',
  fontSize: '0.875rem', fontWeight: 500, textAlign: 'center'
}
const hintStyle: React.CSSProperties = {
  marginTop: '20px', fontSize: '0.8rem',
  color: '#A0AEBB', textAlign: 'center', lineHeight: 1.6
}
const dividerRow: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '16px', margin: '28px 0 22px' }
const dividerLine: React.CSSProperties = { flex: 1, height: '1px', backgroundColor: '#E4EAF0' }
const dividerLabel: React.CSSProperties = { fontSize: '0.875rem', color: '#A0AEBB', fontWeight: 500 }
const actionCard: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '16px', width: '100%',
  padding: '18px 20px', marginBottom: '12px',
  border: '1px solid #E4EAF0', borderRadius: '14px',
  backgroundColor: '#ffffff', cursor: 'pointer',
  fontFamily: 'inherit', textAlign: 'left', boxSizing: 'border-box'
}
const actionIconBg: React.CSSProperties = {
  flexShrink: 0, width: '48px', height: '48px', borderRadius: '50%',
  backgroundColor: '#E8F3FD', display: 'flex', alignItems: 'center',
  justifyContent: 'center'
}
const actionLabel: React.CSSProperties = {
  fontSize: '1rem', fontWeight: 600, color: '#0B1D29', lineHeight: 1.35
}
