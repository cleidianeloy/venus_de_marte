# Vênus de Marte — Front-end

Site oficial e portfólio da artista multimídia Vênus de Marte. A aplicação apresenta a artista, seus projetos transmídia, eventos futuros e canais de contato em uma experiência de página única, responsiva e orientada a conteúdo visual.

## Visão geral

O front-end foi construído com React e TypeScript e utiliza o Vite como ferramenta de desenvolvimento e build. O conteúdo principal é organizado em seções navegáveis:

- **Home** — apresentação visual com slideshow automático de imagens;
- **Sobre** — biografia e apresentação artística;
- **Projetos** — portfólio horizontal com cards expansíveis e navegação por arraste;
- **Agenda** — eventos futuros, filtrados automaticamente pela data atual;
- **Contato** — redes sociais, formulário de contato, player do Spotify e vídeo do YouTube.

A navegação do cabeçalho é gerada a partir das seções que possuem `id` e `data-name`. O cabeçalho também acompanha a seção visível e altera seu estado conforme o progresso de rolagem.

## Tecnologias

- [React](https://react.dev/) 19;
- [TypeScript](https://www.typescriptlang.org/) 6;
- [Vite](https://vite.dev/) 8;
- [Sass](https://sass-lang.com/) e Bootstrap Grid;
- [Axios](https://axios-http.com/) para comunicação com a API de contato;
- [Font Awesome](https://fontawesome.com/) para ícones;
- [Fancybox](https://fancyapps.com/fancybox/) para mensagens modais;
- [Style Dictionary](https://styledictionary.com/) para geração de variáveis de estilo;
- Cloudinary para imagens e logotipo;
- Spotify e YouTube para conteúdos incorporados.

## Requisitos

- Node.js e npm instalados;
- acesso à internet para carregar imagens, fontes, ícones, players incorporados e enviar o formulário de contato.

Não há variáveis de ambiente obrigatórias no estado atual do projeto. A URL da API de contato está definida em `src/components/contact/ContactForm.tsx`.

## Instalação

A partir desta pasta:

```bash
npm install
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Executa a verificação TypeScript e gera a versão de produção em `dist/`. |
| `npm run preview` | Serve localmente o build já gerado. |
| `npm run lint` | Executa o ESLint nos arquivos do projeto. |
| `npm run style` | Gera variáveis Sass usando a configuração do Style Dictionary. |

Para iniciar o desenvolvimento:

```bash
npm run dev
```

Depois, abra a URL exibida pelo Vite, normalmente `http://localhost:5173`.

Para validar uma versão de produção:

```bash
npm run lint
npm run build
npm run preview
```

## Estrutura do projeto

```text
front-end/
├── public/                  # Arquivos públicos, quando aplicável
├── src/
│   ├── components/
│   │   ├── agenda/           # Componentes de eventos
│   │   ├── contact/          # Formulário, redes e players
│   │   ├── header/           # Cabeçalho e navegação
│   │   ├── modal/            # Feedbacks exibidos pelo Fancybox
│   │   └── projects/         # Cards de projetos
│   ├── pages/                # Seções principais da página
│   ├── styles/               # Sass, fontes, menu e estilos das páginas
│   ├── utils/                # Hooks e utilitários
│   ├── App.tsx               # Composição da página e observação das seções
│   └── main.tsx              # Ponto de entrada da aplicação
├── config.json               # Configuração do Style Dictionary
├── index.html                # Metadados, fontes, favicon e Google Tag Manager
├── package.json
└── vite.config.ts
```

## Organização e comportamento

### Navegação e rolagem

`App.tsx` renderiza todas as seções dentro de um elemento principal. O hook `useScrollProgress` calcula o progresso da rolagem inicial e o envia para o cabeçalho, que usa esse valor para animar a posição e o tamanho do logotipo.

Um `IntersectionObserver` identifica a seção atualmente visível. Os links do menu são criados com base nos atributos `data-name` das seções, evitando a manutenção de uma lista de navegação duplicada.

### Projetos

Os projetos são mantidos como dados no componente `Projects.tsx`. Cada card pode ser aberto para mostrar sua descrição completa. Em telas maiores, a lista pode ser arrastada horizontalmente; um deslocamento pequeno ainda é tratado como clique, enquanto um deslocamento maior não abre o card acidentalmente.

Para adicionar ou alterar um projeto, edite a lista `projects` nesse componente, informando:

```ts
{
  name: "Nome do projeto",
  image: "https://...",
  description: ["Primeiro parágrafo", "Segundo parágrafo"]
}
```

### Agenda

Os eventos são definidos em `pages/Agenda.tsx`. Eventos cuja data já passou são removidos antes da renderização. Quando não existem eventos futuros, a aplicação exibe a mensagem de agenda vazia.

As datas usam o construtor `new Date(ano, mês, dia)`, em que o mês começa em `0` (janeiro). Por exemplo, `new Date(2026, 7, 16)` representa 16 de agosto de 2026.

### Formulário de contato

O formulário valida localmente se nome, e-mail e mensagem foram preenchidos e envia um `POST` para:

```text
https://venus-de-marte-backend.onrender.com/api/contact
```

Payload enviado:

```json
{
  "name": "Nome da pessoa",
  "email": "pessoa@exemplo.com",
  "message": "Mensagem enviada"
}
```

Os estados de carregamento, sucesso e erro são apresentados ao usuário por meio do Fancybox. A implementação também trata respostas comuns da API, como `400`, `429` e `500`.

### Conteúdo externo e carregamento

Imagens são servidas pelo Cloudinary. O Spotify e o YouTube são carregados de forma tardia na seção de contato; os componentes dos players são importados com `React.lazy` e só são ativados quando o navegador está ocioso, ou após um fallback de tempo em navegadores sem `requestIdleCallback`.

O documento HTML também configura:

- título, descrição e URL canônica;
- favicon e preload do logotipo;
- fontes Barrio, Poppins e Quicksand;
- Google Tag Manager.

## Estilos e tokens

Os estilos globais são importados em `src/main.tsx` por meio de `src/styles/index.scss`. A folha principal importa as variáveis, o grid do Bootstrap, fontes, menu e estilos das páginas.

O script `npm run style` usa `config.json` para procurar tokens em `tokens/**/*.json` e gerar `_variables.scss` em `build/scss/`. Caso os arquivos de tokens sejam adicionados ou movidos, atualize os caminhos no `config.json` antes de executar esse script.

## Build e publicação

O comando de build:

```bash
npm run build
```

faz duas etapas:

1. verifica e compila o projeto TypeScript com `tsc -b`;
2. gera os arquivos estáticos otimizados com `vite build`.

O resultado fica em `dist/` e pode ser publicado em qualquer serviço que hospede aplicações estáticas. A configuração atual utiliza uma aplicação publicada no Render, conforme a URL canônica presente em `index.html`.

Ao publicar em outro domínio, revise:

- `link rel="canonical"` em `index.html`;
- URL da API em `ContactForm.tsx`;
- identificador do Google Tag Manager;
- links e conteúdos externos dos componentes.


## Boas práticas para manutenção

- Prefira URLs otimizadas do Cloudinary com `f_auto` e `q_auto`;
- atualize o atributo `alt` das imagens quando inserir novos conteúdos;
- mantenha os `id` das seções únicos e os `data-name` preenchidos para que o menu continue funcionando;
- execute `npm run lint` e `npm run build` antes de publicar;
- ao alterar o contrato da API, atualize simultaneamente o payload e o tratamento de erros do formulário;
- evite inserir credenciais ou chaves privadas no código do front-end.

## Licença e conteúdo

Este repositório contém o código do site e referências a conteúdos artísticos, imagens, vídeos e marcas de terceiros. Verifique as permissões de uso dos assets antes de redistribuir ou reutilizar o material em outro projeto.
