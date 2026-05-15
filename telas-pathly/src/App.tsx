import { Lock, Pencil, User, UserCircle } from 'lucide-react'

const fontStack =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: '100vh',
    display: 'flex',
    fontFamily: fontStack,
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },
  brandColumn: {
    flex: '0 0 34%',
    minWidth: '280px',
    maxWidth: '440px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px 40px',
    boxSizing: 'border-box',
    background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
    borderRight: '1px solid #e2e8f0',
    minHeight: '100vh',
  },
  brandInner: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: 0,
  },
  pathlyTitle: {
    margin: 0,
    fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
    fontWeight: 800,
    letterSpacing: '0.06em',
    color: '#0f172a',
  },
  brandRule: {
    width: '72px',
    height: '1px',
    backgroundColor: '#cbd5e1',
    margin: '20px 0 18px',
    border: 'none',
  },
  brandSubtitle: {
    margin: 0,
    fontSize: '1.05rem',
    fontWeight: 500,
    color: '#475569',
    lineHeight: 1.5,
  },
  illustrationWrap: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '24px',
    paddingBottom: '8px',
  },
  mainColumn: {
    flex: '1 1 auto',
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 32px',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
  },
  mainInner: {
    width: '100%',
    maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  loginHeading: {
    margin: '0 0 28px',
    fontSize: '1.75rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#0f172a',
    textAlign: 'center',
  },
  inputShell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    marginBottom: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    backgroundColor: '#fafafa',
    boxSizing: 'border-box',
  },
  inputField: {
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '1rem',
    color: '#0f172a',
    fontFamily: 'inherit',
  },
  primaryBtn: {
    display: 'block',
    margin: '8px auto 0',
    padding: '11px 40px',
    fontSize: '0.95rem',
    fontWeight: 600,
    fontFamily: 'inherit',
    color: '#ffffff',
    backgroundColor: '#4f46e5',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 8px 20px -8px rgba(79, 70, 229, 0.55)',
  },
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    margin: '28px 0 22px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e2e8f0',
  },
  dividerLabel: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontWeight: 500,
  },
  actionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
    padding: '18px 20px',
    marginBottom: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
  },
  actionIconBg: {
    flexShrink: 0,
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#475569',
  },
  actionLabel: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1e293b',
    lineHeight: 1.35,
  },
  footerLink: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#4f46e5',
    textDecoration: 'underline',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
    padding: 0,
  },
}

function PathIllustration() {
  return (
    <svg
      width={200}
      height={120}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      <path
        d="M18 96C38 88 48 72 62 68C78 63 92 78 108 74C126 70 138 48 152 42C162 38 168 32 176 28"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M118 96H196V86C188 78 170 72 154 78C142 82 128 92 118 96Z"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M176 28V44"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M176 28L192 34L176 42V28Z"
        fill="#94a3b8"
        stroke="#94a3b8"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function App() {
  const iconMuted = '#9ca3af'

  return (
    <div style={styles.shell}>
      <aside style={styles.brandColumn} aria-label="Marca Pathly">
        <div style={styles.brandInner}>
          <h1 style={styles.pathlyTitle}>PATHLY</h1>
          <hr style={styles.brandRule} />
          <p style={styles.brandSubtitle}>Bem-vindo ao Pathly</p>
        </div>
        <div style={styles.illustrationWrap}>
          <PathIllustration />
        </div>
      </aside>

      <main style={styles.mainColumn}>
        <div style={styles.mainInner}>
          <h2 style={styles.loginHeading}>Login</h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ width: '100%' }}
          >
            <div style={styles.inputShell}>
              <User size={20} strokeWidth={2} color={iconMuted} aria-hidden />
              <input
                style={styles.inputField}
                type="text"
                name="usuario"
                placeholder="Usuário"
                autoComplete="username"
              />
            </div>
            <div style={styles.inputShell}>
              <Lock size={20} strokeWidth={2} color={iconMuted} aria-hidden />
              <input
                style={styles.inputField}
                type="password"
                name="senha"
                placeholder="Senha"
                autoComplete="current-password"
              />
            </div>
            <button type="submit" style={styles.primaryBtn}>
              Entrar
            </button>
          </form>

          <div style={styles.dividerRow}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerLabel}>ou</span>
            <div style={styles.dividerLine} />
          </div>

          <button type="button" style={styles.actionCard}>
            <span style={styles.actionIconBg}>
              <UserCircle size={22} strokeWidth={2} />
            </span>
            <span style={styles.actionLabel}>Quero seguir uma trilha</span>
          </button>
          <button type="button" style={styles.actionCard}>
            <span style={styles.actionIconBg}>
              <Pencil size={22} strokeWidth={2} />
            </span>
            <span style={styles.actionLabel}>Quero criar uma trilha</span>
          </button>

          <button
            type="button"
            style={styles.footerLink}
          >
            Criar conta
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
