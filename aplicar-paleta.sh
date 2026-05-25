#!/usr/bin/env bash
set -euo pipefail

if [ ! -d "telas-pathly/src" ]; then
  echo "Erro: rode este script na raiz do repositório IFSC-IHC-Pathly."
  exit 1
fi

cp "$(dirname "$0")/telas-pathly/src/pathly-theme.css" "telas-pathly/src/pathly-theme.css"
cp "$(dirname "$0")/telas-pathly/src/pages/LoginPage.tsx" "telas-pathly/src/pages/LoginPage.tsx"

if ! grep -q "./pathly-theme.css" telas-pathly/src/App.tsx; then
  python3 - <<'PY'
from pathlib import Path
p = Path('telas-pathly/src/App.tsx')
s = p.read_text()
s = s.replace("import './index.css'\n", "import './index.css'\nimport './pathly-theme.css'\n", 1)
p.write_text(s)
PY
fi

echo "Paleta aplicada. Agora rode: cd telas-pathly && npm run dev"
