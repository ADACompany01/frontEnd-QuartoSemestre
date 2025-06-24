# ADA Company - Frontend

Este repositório contém o frontend do projeto ADA Company, desenvolvido em React + Vite.

## Sumário
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Docker](#docker)
- [Integração com o Backend](#integração-com-o-backend)
- [Deploy](#deploy)
- [Links Úteis](#links-úteis)

---

## Sobre o Projeto

Interface web para interação com a API do ADA Company, permitindo acesso às funcionalidades do sistema de forma intuitiva e responsiva.

---

## Tecnologias Utilizadas
- React
- Vite
- JavaScript/TypeScript
- CSS
- Nginx (para produção via Docker)

---

## Como Rodar Localmente

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/ADACompany01/frontEnd-QuartoSemestre.git
   cd frontEnd-QuartoSemestre
   ```
2. **Instale as dependências:**
   ```sh
   npm install
   ```
3. **Configure a URL do backend:**
   - Edite o arquivo `.env` ou configure a variável `REACT_APP_BACKEND_URL` conforme necessário.
4. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```
5. Acesse em: [http://localhost:5173](http://localhost:5173)

---

## Docker

Para rodar o frontend em um container Docker:

1. **Build da imagem:**
   ```sh
   docker build -t ada-company-frontend .
   ```
2. **Execute o container:**
   ```sh
   docker run -d -p 80:80 \
     -e REACT_APP_BACKEND_URL=http://localhost:3000 \
     --name ada-frontend ada-company-frontend
   ```
   > Ajuste a variável de ambiente `REACT_APP_BACKEND_URL` conforme o endereço do backend.

---

## Integração com o Backend

- O frontend consome a API do backend disponível em: `http://localhost:3000` (ou conforme configurado).
- Certifique-se de que o backend esteja rodando antes de acessar o frontend.

---

## Deploy

A aplicação está publicada em:
- [front-end-quarto-semestre.vercel.app](https://front-end-quarto-semestre.vercel.app)

---

## Links Úteis
- **Repositório do Backend:** [ADACompany01/backEnd-QuartoSemestre](https://github.com/ADACompany01/backEnd-QuartoSemestre.git)
- **Documentação Geral:** Consulte o README do backend para detalhes completos do projeto.

---

## Contato
Dúvidas ou sugestões? Abra uma issue ou entre em contato com os integrantes do projeto.
