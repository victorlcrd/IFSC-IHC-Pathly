type LoginPageProps = {
  onOpenEditor: () => void
}

export function LoginPage({ onOpenEditor }: LoginPageProps) {
  return (
    <main className="login-page">
      <section className="login-card">
        <p className="login-eyebrow">PATHLY</p>
        <h1>Escolha como você quer começar</h1>
        <p className="login-description">
          Entre como aprendiz para seguir trilhas ou como criador para montar uma nova experiência de aprendizagem.
        </p>

        <div className="login-actions">
          <button className="outline-button" type="button">
            Quero seguir uma trilha
          </button>
          <button className="primary-button" type="button" onClick={onOpenEditor}>
            Quero criar uma trilha
          </button>
        </div>
      </section>
    </main>
  )
}
