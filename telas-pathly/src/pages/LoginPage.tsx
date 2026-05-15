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

  const iconMuted = '#9ca3af'

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
          <h1 style={pathlyTitle}>PATHLY</h1>
          <hr style={brandRule} />
          <p style={brandSubtitle}>Bem-vindo ao Pathly</p>
        </div>
        <div style={illustrationWrap}><PathIllustration /></div>
      </aside>

      <main style={mainColumn}>
        <div style={mainInner}>
          <h2 style={loginHeading}>Login</h2>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div style={inputShell}>
              <Mail size={20} strokeWidth={2} color={iconMuted} aria-hidden />
              <input style={inputField} type="email" name="email" placeholder="E-mail"
                autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div style={inputShell}>
              <Lock size={20} strokeWidth={2} color={iconMuted} aria-hidden />
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
            <span style={actionIconBg}><UserCircle size={22} strokeWidth={2} /></span>
            <span style={actionLabel}>Quero seguir uma trilha</span>
          </button>

          <button type="button" style={actionCard}>
            <span style={actionIconBg}><Pencil size={22} strokeWidth={2} /></span>
            <span style={actionLabel}>Quero criar uma trilha</span>
          </button>
        </div>
      </main>
    </div>
  )
}

function PathIllustration() {
  return (
    <svg width={200} height={120} viewBox="0 0 200 120" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ maxWidth: '100%', height: 'auto' }}>
      <path d="M18 96C38 88 48 72 62 68C78 63 92 78 108 74C126 70 138 48 152 42C162 38 168 32 176 28"
        stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M118 96H196V86C188 78 170 72 154 78C142 82 128 92 118 96Z"
        stroke="#94a3b8" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M176 28V44" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M176 28L192 34L176 42V28Z" fill="#94a3b8" stroke="#94a3b8" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

const fontStack = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
const shell: React.CSSProperties = { minHeight: '100vh', display: 'flex', fontFamily: fontStack, color: '#0f172a', backgroundColor: '#ffffff' }
const brandColumn: React.CSSProperties = { flex: '0 0 34%', minWidth: '280px', maxWidth: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 40px', boxSizing: 'border-box', background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)', borderRight: '1px solid #e2e8f0', minHeight: '100vh' }
const brandInner: React.CSSProperties = { width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1, justifyContent: 'center', gap: 0 }
const pathlyTitle: React.CSSProperties = { margin: 0, fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', fontWeight: 800, letterSpacing: '0.06em', color: '#0f172a' }
const brandRule: React.CSSProperties = { width: '72px', height: '1px', backgroundColor: '#cbd5e1', margin: '20px 0 18px', border: 'none' }
const brandSubtitle: React.CSSProperties = { margin: 0, fontSize: '1.05rem', fontWeight: 500, color: '#475569', lineHeight: 1.5 }
const illustrationWrap: React.CSSProperties = { width: '100%', maxWidth: '320px', display: 'flex', justifyContent: 'center', paddingTop: '24px', paddingBottom: '8px' }
const mainColumn: React.CSSProperties = { flex: '1 1 auto', minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px', boxSizing: 'border-box', backgroundColor: '#ffffff' }
const mainInner: React.CSSProperties = { width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }
const loginHeading: React.CSSProperties = { margin: '0 0 28px', fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#0f172a', textAlign: 'center' }
const inputShell: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', marginBottom: '14px', border: '1px solid #e2e8f0', borderRadius: '14px', backgroundColor: '#fafafa', boxSizing: 'border-box' }
const inputField: React.CSSProperties = { flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem', color: '#0f172a', fontFamily: 'inherit' }
const primaryBtn: React.CSSProperties = { display: 'block', width: '100%', margin: '8px 0 0', padding: '14px 40px', fontSize: '0.95rem', fontWeight: 600, fontFamily: 'inherit', color: '#ffffff', backgroundColor: '#4f46e5', border: 'none', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 8px 20px -8px rgba(79, 70, 229, 0.55)' }
const erroStyle: React.CSSProperties = { margin: '0 0 12px', color: '#dc2626', fontSize: '0.875rem', fontWeight: 500, textAlign: 'center' }
const hintStyle: React.CSSProperties = { marginTop: '20px', fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center', lineHeight: 1.6 }
const dividerRow: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '16px', margin: '28px 0 22px' }
const dividerLine: React.CSSProperties = { flex: 1, height: '1px', backgroundColor: '#e2e8f0' }
const dividerLabel: React.CSSProperties = { fontSize: '0.875rem', color: '#94a3b8', fontWeight: 500 }
const actionCard: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '18px 20px', marginBottom: '12px', border: '1px solid #e2e8f0', borderRadius: '14px', backgroundColor: '#ffffff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', boxSizing: 'border-box' }
const actionIconBg: React.CSSProperties = { flexShrink: 0, width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }
const actionLabel: React.CSSProperties = { fontSize: '1rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.35 }
