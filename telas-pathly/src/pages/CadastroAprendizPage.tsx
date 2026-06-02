import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Lock,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react'
import { PathlyLogo } from '../components/PathlyLogo'

type CadastroAprendizPageProps = {
  onBackToLogin: () => void
  onCadastroConcluido: () => void
}

type FormData = {
  nome: string
  email: string
  telefone: string
  areaInteresse: string
  instituicao: string
  objetivoAprendizado: string
  senha: string
  confirmarSenha: string
}

const initialFormData: FormData = {
  nome: '',
  email: '',
  telefone: '',
  areaInteresse: '',
  instituicao: '',
  objetivoAprendizado: '',
  senha: '',
  confirmarSenha: '',
}

export function CadastroAprendizPage({ onBackToLogin, onCadastroConcluido }: CadastroAprendizPageProps) {
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
      setErro('É necessário aceitar os termos para criar uma conta de aprendiz.')
      return
    }

    setErro('')
    setCadastroFinalizado(true)
  }

  return (
    <div className="creator-register-page aprendiz-register-page">
      <aside className="creator-register-brand" aria-label="Marca Pathly">
        <div className="creator-register-brand-content">
          <PathlyLogo variant="branco" size="lg" className="login-brand-logo" />
          <h1>Aprenda no seu ritmo com trilhas gamificadas.</h1>
          <p>
            Inscreva-se em trilhas, acompanhe seu progresso, desbloqueie conquistas e evolua com conteúdos organizados no Pathly.
          </p>
        </div>
      </aside>

      <main className="creator-register-main">
        <section className="creator-register-card" aria-labelledby="aprendiz-register-title">
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
              <h2 id="aprendiz-register-title">Sua conta de aprendiz foi criada</h2>
              <p>
                Tudo pronto! Agora você pode explorar trilhas, acompanhar seu progresso e começar a desbloquear conquistas.
              </p>

              <button className="creator-register-submit" type="button" onClick={onCadastroConcluido}>
                Entrar como aprendiz
              </button>
            </div>
          ) : (
            <>
              <div className="creator-register-heading">
                <span className="creator-register-eyebrow">Comece agora</span>
                <h2 id="aprendiz-register-title">Criar conta de aprendiz</h2>
                <p>Preencha seus dados para acessar trilhas e acompanhar sua evolução.</p>
              </div>

              <form className="creator-register-form" onSubmit={handleSubmit}>
                <label className="creator-register-field creator-register-field-full">
                  Nome completo
                  <span>
                    <UserRound size={19} aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Ex: Aprendiz"
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

                <label className="creator-register-field">
                  Área de interesse
                  <span>
                    <BookOpen size={19} aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Ex: React, UX, Git, TypeScript..."
                      value={formData.areaInteresse}
                      onChange={(event) => updateField('areaInteresse', event.target.value)}
                      required
                    />
                  </span>
                </label>

                <label className="creator-register-field">
                  Instituição
                  <span>
                    <GraduationCap size={19} aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Ex: IFSC — Campus São José"
                      value={formData.instituicao}
                      onChange={(event) => updateField('instituicao', event.target.value)}
                      required
                    />
                  </span>
                </label>

                <label className="creator-register-field creator-register-field-full">
                  Objetivo de aprendizado
                  <textarea
                    placeholder="Conte o que você deseja aprender, suas metas ou como pretende usar as trilhas do Pathly."
                    value={formData.objetivoAprendizado}
                    onChange={(event) => updateField('objetivoAprendizado', event.target.value)}
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
                  <span>Declaro que as informações são verdadeiras e aceito os termos de uso do Pathly como aprendiz.</span>
                </label>

                {erro && <p className="creator-register-error">{erro}</p>}

                <button className="creator-register-submit" type="submit">
                  Criar conta de aprendiz
                </button>
              </form>
            </>
          )}
        </section>
      </main>
    </div>
  )
}
