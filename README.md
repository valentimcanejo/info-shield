
# 📱 Aplicação Expo + Backend Node.js (Mock API)

Este projeto consiste em uma aplicação **React Native com Expo** e um **backend Node.js mockado** utilizando `json-server`. O backend está localizado dentro da pasta `backend` na raiz do projeto.

---

## 🚀 Tecnologias utilizadas

- React Native (Expo)
- Node.js
- json-server (Mock API)
- dotenv

---

## ⚙️ Pré-requisitos

- Node.js instalado
- Expo CLI instalado (`npm install -g expo-cli`)
- Um gerenciador de pacotes (npm ou yarn)

---

## 🔧 Instalação e execução

### 1️⃣ Clone o repositório

```bash
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/valentimcanejo/info-shield.git)
cd info-shield
```

---

### 2️⃣ Instale as dependências da aplicação mobile (Expo)

```bash
npm install
# ou
yarn install
```

---

### 3️⃣ Instale as dependências do backend

```bash
cd backend
npm install
# ou
yarn install
cd ..
```

---

### 4️⃣ Configure as variáveis de ambiente

Na **raiz do projeto** (onde está o arquivo `package.json` da aplicação Expo), crie um arquivo chamado **`.env`** e adicione:

```
API_URL=http://SEU_IP_LOCAL:3001
```

⚠️ **Atenção:** Substitua `SEU_IP_LOCAL` pelo seu IP local.

### 🔍 Como descobrir seu IP local:

- **No Windows**, execute no terminal (cmd ou PowerShell):

```bash
ipconfig
```

Procure pelo campo **"Endereço IPv4"** na sua conexão ativa.

- **No Mac ou Linux**, execute:

```bash
ifconfig
```

Procure pelo endereço da sua rede (normalmente começa com `192.168.x.x` ou `10.x.x.x`).

✅ **Exemplo de `.env`:**

```
API_URL=http://192.168.0.2:3001
```

> 🏠 Utilize seu IP local para que o backend e o app rodando no celular ou emulador possam se comunicar corretamente.

---

### 5️⃣ Execute o backend (Mock API)

No terminal:

```bash
cd backend
npm run dev
```

O backend estará rodando em:

```
http://SEU_IP_LOCAL:3001
```

---

### 6️⃣ Execute a aplicação Expo

Em outro terminal (na raiz do projeto):

```bash
npx expo start
```

Use o aplicativo **Expo Go** no seu dispositivo físico para escanear o QR Code ou utilize um emulador.

---

## 🛠 Scripts disponíveis

### 🔹 No backend (`/backend`)

- `npm run dev` — Inicia o json-server mockado na porta 3001.

### 🔸 Na aplicação Expo

- `npx expo start` — Inicia o servidor de desenvolvimento do Expo.

---

## ❗ Observações importantes

- ⚠️ Certifique-se de que o backend esteja rodando **antes de iniciar** a aplicação Expo.
- 🌐 Se o seu IP mudar (ex.: ao trocar de rede Wi-Fi), **atualize o arquivo `.env`** com o novo IP.

---
