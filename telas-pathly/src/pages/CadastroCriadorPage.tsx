import { useState, type FormEvent } from 'react'
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, Lock, Mail, Phone, UserRound } from 'lucide-react'
import { PathlyLogo } from '../components/PathlyLogo'

type CadastroCriadorPageProps = {
  onBackToLogin: () => void
  onCadastroConcluido: () => void
}

type FormData = {
  nome: string
  email: string
  telefone: string
  areaAtuacao: string
  experiencia: string
  senha: string
  confirmarSenha: string
}

const initialFormData: FormData = {
  nome: '',
  email: '',
  telefone: '',
  areaAtuacao: '',
  experiencia: '',
  senha: '',
  confirmarSenha: '',
}

export function CadastroCriadorPage({ onBackToLogin, onCadastroConcluido }: CadastroCriadorPageProps) {
  const [formData, setFormData] = useState(initialFormData)
  const [aceitouTermos, setAceitouTermos] = useState(false)
  const [erro, setErro] = useState('')
  const [cadastroFinalizado, setCadastroFinalizado] = useState(false)

  function updateField(field: keyof FormData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (formData.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas informadas não conferem.')
      return
    }

    if (!aceitouTermos) {
      setErro('É necessário aceitar os termos para criar uma conta de criador.')
      return
    }

    setErro('')
    setCadastroFinalizado(true)
  }

  return (
    <div className="creator-register-page">
      <aside className="creator-register-brand" aria-label="Marca Pathly">
        <div className="creator-register-brand-content">
          <PathlyLogo variant="branco" size="lg" className="login-brand-logo" />
          <h1>Compartilhe conhecimento em trilhas gamificadas.</h1>
          <p>
            Crie conteúdos, acompanhe alunos e transforme sua experiência em jornadas de aprendizado dentro do Pathly.
          </p>
        </div>
      </aside>

      <main className="creator-register-main">
        <section className="creator-register-card" aria-labelledby="creator-register-title">
          <button className="creator-register-back" type="button" onClick={onBackToLogin}>
            <ArrowLeft size={18} />
            Voltar para login
          </button>

          {cadastroFinalizado ? (
            <div className="creator-register-success">
              <span className="creator-register-success-icon" aria-hidden="true">
                <CheckCircle2 size={34} />
              </span>

              <span className="creator-register-eyebrow">Cadastro enviado</span>
              <h2 id="creator-register-title">Sua conta de criador foi criada</h2>
              <p>
                O cadastro foi concluído com sucesso. Agora você já pode acessar a área do criador e começar a montar suas trilhas.
              </p>

              <button className="creator-register-submit" type="button" onClick={onCadastroConcluido}>
                Entrar como criador
              </button>
            </div>
          ) : (
            <>
              <div className="creator-register-heading">
                <span className="creator-register-eyebrow">Comece agora</span>
                <h2 id="creator-register-title">Criar conta de criador</h2>
                <p>Preencha seus dados para acessar a área de criação de trilhas.</p>
              </div>

              <form className="creator-register-form" onSubmit={handleSubmit}>
                <label className="creator-register-field creator-register-field-full">
                  Nome completo
                  <span>
                    <UserRound size={19} aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Ex: Criador"
                      value={formData.nome}
                      onChange={(event) => updateField('nome', event.target.value)}
                      required
                    />
                  </span>
                </label>

                <label className="creator-register-field">
                  E-mail
                  <span>
                    <Mail size={19} aria-hidden="true" />
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={formData.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      required
                    />
                  </span>
                </label>

                <label className="creator-register-field">
                  Telefone
                  <span>
                    <Phone size={19} aria-hidden="true" />
                    <input
                      type="tel"
                      placeholder="(48) 99999-9999"
                      value={formData.telefone}
                      onChange={(event) => updateField('telefone', event.target.value)}
                      required
                    />
                  </span>
                </label>

                <label className="creator-register-field creator-register-field-full">
                  Área de atuação
                  <span>
                    <BriefcaseBusiness size={19} aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Ex: Desenvolvimento front-end, UX, Java, Banco de Dados..."
                      value={formData.areaAtuacao}
                      onChange={(event) => updateField('areaAtuacao', event.target.value)}
                      required
                    />
                  </span>
                </label>

                <label className="creator-register-field creator-register-field-full">
                  Experiência como criador ou mentor
                  <textarea
                    placeholder="Conte brevemente sobre sua experiência, temas que deseja ensinar ou público que pretende acompanhar."
                    value={formData.experiencia}
                    onChange={(event) => updateField('experiencia', event.target.value)}
                    required
                  />
                </label>

                <label className="creator-register-field">
                  Senha
                  <span>
                    <Lock size={19} aria-hidden="true" />
                    <input
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={formData.senha}
                      onChange={(event) => updateField('senha', event.target.value)}
                      required
                    />
                  </span>
                </label>

                <label className="creator-register-field">
                  Confirmar senha
                  <span>
                    <Lock size={19} aria-hidden="true" />
                    <input
                      type="password"
                      placeholder="Repita sua senha"
                      value={formData.confirmarSenha}
                      onChange={(event) => updateField('confirmarSenha', event.target.value)}
                      required
                    />
                  </span>
                </label>

                <label className="creator-register-terms">
                  <input
                    type="checkbox"
                    checked={aceitouTermos}
                    onChange={(event) => setAceitouTermos(event.target.checked)}
                  />
                  <span>Declaro que as informações são verdadeiras e aceito atuar como criador no Pathly.</span>
                </label>

                {erro && <p className="creator-register-error">{erro}</p>}

                <button className="creator-register-submit" type="submit">
                  Criar conta de criador
                </button>
              </form>
            </>
          )}
        </section>
      </main>
    </div>
  )
}