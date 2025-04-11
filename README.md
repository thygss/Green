# 🚀 Desafio Técnico Backend - Green Acesso

API desenvolvida como parte do desafio técnico da Green. A aplicação permite importar boletos via CSV, consultar com filtros e gerar relatórios em PDF via base64.

---

## ⚙️ Tecnologias utilizadas

- Node.js + TypeScript
- Express
- Sequelize
- MySQL
- Multer
- csv-parser
- PDFKit
- dotenv

---

## 🧪 Como rodar o projeto localmente

### 1. Instale as dependências
```bash
npm install
```

### 2. Configure o arquivo `.env`
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=green_acesso
PORT=3000
```

### 3. Rode o seed para popular os dados iniciais
```bash
npx ts-node src/scripts/seed.ts
```

### 4. Inicie o servidor
```bash
npm run dev
```

---

## 📬 Endpoints disponíveis

### ✅ Importação de boletos via CSV
`POST /import/csv`

- Envie um arquivo `.csv` via `form-data` com o campo `file`.
- Exemplo de retorno:
```json
{ "message": "Boletos importados com sucesso!" }
```

---

### ✅ Listagem de boletos com filtros
`GET /boletos`

#### Filtros disponíveis (via query):
- `nome`
- `id_lote`
- `valor_inicial`
- `valor_final`
- `relatorio=1` → Gera PDF com os boletos (retorna base64)

Exemplo de uso com filtro:
```
GET /boletos?nome=Jose&id_lote=3&valor_inicial=100&valor_final=200
```

Exemplo com relatório:
```
GET /boletos?relatorio=1
```

Retorno:
```json
{
  "base64": "JVBERi0xLjQKJ..."
}
```

Para visualizar o PDF, você pode colar o conteúdo em:
[https://www.base64decode.org/base64-to-pdf-converter/](https://www.base64decode.org/base64-to-pdf-converter/)

---

## ✅ Funcionalidades entregues

- [x] Importação de boletos via CSV
- [x] Mapeamento de unidade para ID de lote
- [x] Listagem de boletos com filtros (nome, lote, valor)
- [x] Geração de relatório em PDF (base64)
- [x] Seed para popular lotes e boletos para testes

---

## 👨‍💻 Autor

**Thiago Rocha de Sousa**  
[GitHub](https://github.com/thygss) • [LinkedIn](https://www.linkedin.com/in/thiago-rocha-thygss/)