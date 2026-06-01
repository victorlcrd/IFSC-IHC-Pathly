type PathlyLogoProps = {
  onClick?: () => void
  variant?: 'azul' | 'branco' | 'cinza' | 'preto'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const logoByVariant = {
  azul: '/logos/logo-pathly-azul.png',
  branco: '/logos/logo-pathly-branco.png',
  cinza: '/logos/logo-pathly-cinza.png',
  preto: '/logos/logo-pathly-preto.png',
}

export function PathlyLogo({
  onClick,
  variant = 'branco',
  size = 'md',
  className = '',
}: PathlyLogoProps) {
  const logo = (
    <img
      className="pathly-logo-image"
      src={logoByVariant[variant]}
      alt="Pathly"
    />
  )

  const classes = `pathly-logo pathly-logo-${size} ${className}`

  if (onClick) {
    return (
      <button
        className={classes}
        type="button"
        onClick={onClick}
        aria-label="Voltar para o início"
      >
        {logo}
      </button>
    )
  }

  return <div className={classes}>{logo}</div>
}
