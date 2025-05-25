# 📑 Processos Frontend

Frontend de gerenciamento de processos desenvolvido em **React + Vite**, com gerenciamento de estado usando **Zustand** e estilização utilizando **Material UI + TailwindCSS**. O projeto consome APIs para autenticação de usuários e manipulação dos processos.

---

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Router Dom](https://reactrouter.com/)

---

## 🏗️ Pré-requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

## ⚙️ Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/JeffersonMeira99/processos.git
```

2. **Acesse a pasta do projeto:**

```bash
cd processos
cd processos-frontend
```

3. **Instale as dependências:**

```bash
npm install
```

---

## 🔑 Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias. Exemplo:

```env
VITE_API_URL=http://localhost:3000
```

Substitua o valor da URL pela URL da sua API backend.

---

## 🏃‍♂️ Executando o projeto

### 🔥 Ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```
http://localhost:5173
```

---

---

---

## 🧠 Funcionalidades

- ✅ Login e autenticação de usuários
- ✅ Listagem de processos
- ✅ Cadastro de novos processos
- ✅ Edição de processos existentes
- ✅ Exclusão de processos
- ✅ Filtros por número de processo e status

---

## 🗂️ Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
├── pages/              # Páginas de navegação
├── services/           # Integração com API
├── store/              # Gerenciamento de estado (Zustand)
├── types/              # Tipagens e interfaces
├── utils/              # Api
├── App.tsx             # Componente principal
├── main.tsx            # Entry point
└── ...
```

---

---

## 👨‍💻 Autor

Jefferson Meira  
💼 Desenvolvedor Full Stack
