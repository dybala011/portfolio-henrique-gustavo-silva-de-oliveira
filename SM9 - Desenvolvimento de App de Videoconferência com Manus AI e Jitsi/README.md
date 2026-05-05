# TechConnect — Suporte Remoto para Loja de Tecnologia

<div align="center">
  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663628128427/XeyD2Bx2dqND2BfqxVcYnm/techconnect-icon-G3enUeJxRS2A7mZ4pDVBBy.png" width="120" alt="TechConnect Logo" style="border-radius: 24px;" />
  
  **TechConnect** é um aplicativo móvel para loja de celulares e equipamentos de tecnologia que oferece suporte remoto via videoconferência, permitindo atendimento personalizado ao cliente de qualquer lugar.

  ![React Native](https://img.shields.io/badge/React_Native-0.81-blue?logo=react)
  ![Expo](https://img.shields.io/badge/Expo-SDK_54-black?logo=expo)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
  ![Jitsi Meet](https://img.shields.io/badge/Jitsi_Meet-WebView-green?logo=jitsi)
</div>

---

## Descrição do Problema

Clientes de lojas de tecnologia frequentemente enfrentam dificuldades para obter suporte técnico presencial, especialmente para dúvidas sobre configuração de dispositivos, demonstração de produtos e atendimento pós-venda. O deslocamento até a loja física é inconveniente e, muitas vezes, desnecessário para resolver questões simples que poderiam ser tratadas remotamente.

## Proposta de Valor

O TechConnect elimina a barreira física entre cliente e especialista, oferecendo um canal de atendimento remoto via videoconferência integrado diretamente ao aplicativo da loja. Com apenas alguns toques, o cliente entra em uma sala virtual para receber suporte técnico ao vivo, conversar com um vendedor especializado ou explorar o catálogo de produtos com demonstração em tempo real.

---

## Funcionalidades

| Tela | Descrição | Status |
|------|-----------|--------|
| **Login** | Identificação do usuário com nome temporário via AsyncStorage | ✅ Implementado |
| **Home** | Painel principal com 3 ações: Suporte, Vendedor e Produtos | ✅ Implementado |
| **Seleção de Sala** | Entrada em sala personalizada ou geração automática | ✅ Implementado |
| **Videoconferência** | WebView integrado ao Jitsi Meet com nome do participante | ✅ Implementado |
| **Produtos** | Catálogo com 10 produtos, filtros por categoria e modal de detalhes | ✅ Implementado |

### Fluxos Principais

O aplicativo suporta três fluxos de atendimento distintos. No **Fluxo de Suporte Técnico**, o cliente acessa a tela de Login, informa seu nome, navega até a Home, toca em "Suporte ao Vivo", define o nome da sala (ou gera automaticamente) e inicia a videoconferência. No **Fluxo de Vendedor**, o mesmo processo ocorre com destino à sala de atendimento comercial. No **Fluxo de Produtos**, o cliente navega pelo catálogo, visualiza detalhes de qualquer produto e pode iniciar uma chamada com um vendedor diretamente da tela de detalhes.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| **React Native** | 0.81 | Framework mobile multiplataforma |
| **Expo SDK** | 54 | Ambiente de desenvolvimento e build |
| **TypeScript** | 5.9 | Tipagem estática e segurança de código |
| **Expo Router** | 6 | Navegação baseada em arquivos (Stack + Tabs) |
| **NativeWind v4** | 4.2 | Estilização com Tailwind CSS |
| **Jitsi Meet** | WebView | Videoconferência via meet.jit.si |
| **react-native-webview** | Latest | Renderização do Jitsi Meet no app |
| **AsyncStorage** | 2.2 | Persistência local do nome do usuário |
| **expo-haptics** | 15 | Feedback tátil nas interações |
| **Manus AI** | — | Geração e estruturação do projeto |

---

## Estrutura do Projeto

```
techconnect/
├── app/
│   ├── _layout.tsx              # Root layout com Stack Navigator e UserProvider
│   ├── index.tsx                # Redirect inteligente (login ou home)
│   ├── login.tsx                # Tela de Login
│   ├── room-selection.tsx       # Tela de Seleção de Sala
│   ├── conference.tsx           # Videoconferência via Jitsi Meet (WebView)
│   └── (tabs)/
│       ├── _layout.tsx          # Tab Navigator (Home + Produtos)
│       ├── index.tsx            # Tela Home
│       └── products.tsx         # Catálogo de Produtos
├── components/
│   ├── screen-container.tsx     # Container com SafeArea
│   └── ui/
│       └── icon-symbol.tsx      # Mapeamento de ícones (SF Symbols → Material Icons)
├── lib/
│   ├── user-context.tsx         # Contexto global do usuário (nome + AsyncStorage)
│   └── products-data.ts         # Dados mock de produtos (10 itens, 4 categorias)
├── assets/
│   └── images/
│       ├── icon.png             # Ícone do app
│       ├── splash-icon.png      # Splash screen
│       └── favicon.png          # Favicon web
├── theme.config.js              # Paleta de cores TechConnect
├── app.config.ts                # Configuração Expo (nome, bundle ID, ícones)
└── README.md                    # Este arquivo
```

---

## Instalação e Execução

### Pré-requisitos

- Node.js 18+ e pnpm instalados
- Expo CLI: `npm install -g expo-cli`
- Para Android: Android Studio com emulador configurado
- Para iOS: Xcode (apenas macOS)
- App **Expo Go** no dispositivo físico (para teste rápido)

### Passos

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd techconnect

# 2. Instalar dependências
pnpm install

# 3. Iniciar o servidor de desenvolvimento
pnpm dev

# 4. Abrir no emulador ou dispositivo
# Android: pressione 'a' no terminal
# iOS:     pressione 'i' no terminal
# Web:     pressione 'w' no terminal
# Expo Go: escaneie o QR code exibido no terminal
```

### Gerar APK (Android)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Configurar e fazer build
eas build --platform android --profile preview
```

---

## Preview do App

### URL de Preview (Web)

> Disponível após publicação: `https://<seu-dominio>.manus.computer`

### QR Code para Expo Go

Após executar `pnpm dev`, escaneie o QR code exibido no terminal com o aplicativo **Expo Go** (disponível na App Store e Google Play) para testar diretamente no seu dispositivo físico.

---

## Instruções de Uso

**1. Login:** Ao abrir o app pela primeira vez, informe seu nome na tela de login e toque em "Entrar". O nome é salvo localmente e utilizado como identificador na videoconferência.

**2. Home:** A tela principal apresenta três opções de atendimento. Toque em qualquer card para iniciar o fluxo correspondente.

**3. Suporte ao Vivo / Falar com Vendedor:** Após escolher o tipo de atendimento, você pode informar um nome de sala específico ou deixar em branco para gerar uma sala automática. Toque em "Entrar na Sala" para iniciar a videoconferência.

**4. Videoconferência:** O Jitsi Meet abre diretamente no app. Seu nome de usuário é configurado automaticamente. Para encerrar, toque em "Sair" e confirme a saída.

**5. Produtos:** Navegue pelo catálogo usando os filtros de categoria (Todos, Smartphone, Acessório, Computador, Tablet). Toque em "Ver detalhes" para abrir o modal com especificações completas. No modal, toque em "Falar com Vendedor" para iniciar uma chamada sobre aquele produto.

---

## Integração com Jitsi Meet

O TechConnect utiliza o serviço público **meet.jit.si** para videoconferências, sem necessidade de servidor próprio ou autenticação. A integração é realizada via `react-native-webview`, carregando a URL:

```
https://meet.jit.si/{nomeDaSala}#userInfo.displayName="{nomeDoUsuario}"
```

Os parâmetros de configuração incluem desativação da página de pré-entrada (`prejoinPageEnabled=false`) e desativação de deep links para manter o usuário no app. A sala é criada automaticamente no primeiro acesso e qualquer pessoa com o mesmo nome de sala pode entrar.

---

## Design e Identidade Visual

A paleta de cores do TechConnect foi desenvolvida para transmitir confiança e modernidade:

| Token | Cor (Claro) | Uso |
|-------|-------------|-----|
| `primary` | `#0057FF` | Botões principais, Suporte ao Vivo |
| `secondary` | `#00C2A8` | Falar com Vendedor |
| `background` | `#F0F4FF` | Fundo das telas |
| `surface` | `#FFFFFF` | Cards e modais |

---

## Desenvolvido com Manus AI

Este projeto foi inteiramente estruturado, codificado e documentado com o auxílio do **Manus AI**, demonstrando a capacidade da plataforma de criar aplicativos móveis completos e funcionais a partir de uma descrição de requisitos em linguagem natural.

---

*TechConnect v1.0 — Desenvolvido com Manus AI · React Native · Expo · Jitsi Meet*
