# TechConnect — Plano de Design de Interface

## Visão Geral
Aplicativo para loja de tecnologia com atendimento remoto via videoconferência (Jitsi Meet).
Design moderno, orientação portrait 9:16, uso com uma mão.

---

## Paleta de Cores

| Token     | Claro       | Escuro      | Uso                          |
|-----------|-------------|-------------|------------------------------|
| primary   | #0057FF     | #3B82F6     | Botões principais, destaque  |
| secondary | #00C2A8     | #2DD4BF     | Botões secundários, badges   |
| background| #F0F4FF     | #0D1117     | Fundo de telas               |
| surface   | #FFFFFF     | #161B22     | Cards, modais                |
| foreground| #0D1117     | #F0F6FC     | Texto principal              |
| muted     | #6B7280     | #8B949E     | Texto secundário             |
| border    | #E2E8F0     | #30363D     | Bordas, divisores            |
| error     | #EF4444     | #F87171     | Erros                        |
| success   | #22C55E     | #4ADE80     | Sucesso                      |

---

## Lista de Telas

### 1. Splash / Onboarding
- Logo animado do TechConnect
- Tagline: "Suporte remoto na palma da sua mão"
- Redireciona automaticamente para Login

### 2. Login
- Campo: Nome do usuário
- Botão: "Entrar"
- Armazenamento temporário com AsyncStorage
- Design limpo, centrado, com logo no topo

### 3. Home (Principal)
- Header com logo + nome do usuário logado
- 3 botões de ação principais em cards:
  - "Suporte ao Vivo" (ícone: headset)
  - "Falar com Vendedor" (ícone: person.wave)
  - "Ver Produtos" (ícone: bag.fill)
- Seção "Atendimento Rápido" com status online
- Footer com versão do app

### 4. Seleção de Sala
- Campo: Nome da sala (opcional)
- Botão: "Entrar na Sala"
- Geração automática de sala se campo vazio
- Preview do nome da sala gerado
- Informação: nome do participante = nome do login

### 5. Videoconferência (Jitsi Meet)
- WebView abrindo meet.jit.si/{nomeSala}
- Parâmetros: displayName, startWithAudioMuted=false
- Botão de voltar sobreposto
- Loading indicator durante carregamento

### 6. Produtos
- Lista de produtos em cards com FlatList
- Cada card: imagem placeholder, nome, preço, badge categoria
- Botão "Ver Detalhes" em cada card
- Modal de detalhes com descrição e botão "Falar com Vendedor"
- Categorias: Smartphones, Acessórios, Computadores

### 7. Detalhes do Produto (Modal)
- Imagem grande
- Nome, preço, descrição
- Botão "Falar com Vendedor" → navega para Seleção de Sala

---

## Fluxos Principais

### Fluxo de Suporte ao Vivo
Login → Home → "Suporte ao Vivo" → Seleção de Sala → Jitsi Meet

### Fluxo de Vendedor
Login → Home → "Falar com Vendedor" → Seleção de Sala → Jitsi Meet

### Fluxo de Produtos
Login → Home → "Ver Produtos" → Lista de Produtos → Detalhes → "Falar com Vendedor" → Seleção de Sala → Jitsi Meet

---

## Estrutura de Navegação

```
app/
  _layout.tsx              ← Root layout (Stack)
  index.tsx                ← Redirect para login ou home
  login.tsx                ← Tela de Login
  (tabs)/
    _layout.tsx            ← Tab bar (Home, Produtos)
    index.tsx              ← Home Screen
    products.tsx           ← Lista de Produtos
  room-selection.tsx       ← Seleção de Sala
  conference.tsx           ← Videoconferência (WebView Jitsi)
```

---

## Componentes Reutilizáveis

- `ActionCard` — Card de ação com ícone, título e subtítulo
- `ProductCard` — Card de produto com imagem, nome, preço
- `PrimaryButton` — Botão principal com feedback de press
- `SecondaryButton` — Botão secundário outline
- `LoadingOverlay` — Overlay de carregamento

---

## Tipografia

- Títulos: font-bold, text-2xl/3xl
- Subtítulos: font-semibold, text-lg/xl
- Corpo: text-base, text-muted
- Botões: font-semibold, text-base

---

## Ícones Utilizados (Material Icons)

| SF Symbol           | Material Icon       | Uso                    |
|---------------------|---------------------|------------------------|
| house.fill          | home                | Tab Home               |
| bag.fill            | shopping-bag        | Tab Produtos           |
| headset             | headset-mic         | Suporte ao Vivo        |
| person.wave.2.fill  | support-agent       | Falar com Vendedor     |
| video.fill          | videocam            | Videoconferência       |
| chevron.left        | arrow-back          | Voltar                 |
| star.fill           | star                | Avaliação produto      |
| checkmark.circle    | check-circle        | Status online          |
