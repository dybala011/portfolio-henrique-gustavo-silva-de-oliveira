<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Guia Sprint 3 — Execução e Desenvolvimento</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{
    font-family:'Inter',system-ui,sans-serif;
    background:#fafafa;
    color:#222;
    line-height:1.75;
    text-align:justify;
    -webkit-font-smoothing:antialiased;
  }

  /* ── HERO ── */
  .hero{
    background:#e8e8e8;
    color:#222;
    padding:56px 40px 44px;
    text-align:center;
    border-bottom:1px solid #d0d0d0;
  }
  .hero h1{font-size:clamp(1.5rem,3.8vw,2.2rem);font-weight:800;letter-spacing:-.4px;margin-bottom:6px;color:#111}
  .hero .sub{color:#666;font-size:.92rem;font-weight:400}
  .hero .intro{
    max-width:780px;margin:18px auto 0;font-size:.9rem;color:#555;
    line-height:1.75;text-align:justify;
  }

  /* ── KANBAN BAR ── */
  .kanban-bar{
    display:grid;
    grid-template-columns:repeat(8,1fr);
    gap:1px;
    background:#e0e0e0;
    border-bottom:1px solid #e0e0e0;
  }
  .kb-col{
    text-align:center;padding:14px 4px 10px;
    font-size:.7rem;font-weight:600;letter-spacing:.3px;
    cursor:pointer;transition:background .15s;
    color:#666;background:#f5f5f5;
    text-transform:uppercase;
  }
  .kb-col:hover{background:#eaeaea}
  .kb-col.active{background:#1a1a1a;color:#fff}
  .kb-col .num{display:block;font-size:1.4rem;font-weight:800;line-height:1;margin-bottom:3px;color:#333}
  .kb-col.active .num{color:#fff}

  /* ── PROGRESS ── */
  .progress-wrap{
    background:#fff;padding:14px 40px;
    border-bottom:1px solid #e8e8e8;
    position:sticky;top:0;z-index:10;
  }
  .progress-wrap .lbl{font-size:.78rem;font-weight:600;color:#999;margin-bottom:6px}
  .progress-track{display:flex;gap:3px;height:5px}
  .progress-track .dot{flex:1;background:#e8e8e8;border-radius:3px;transition:background .3s}
  .progress-track .dot.ok{background:#444}

  /* ── MAIN ── */
  .main{padding:32px 40px 60px}

  /* ── ETAPA CARD ── */
  .etapa{
    background:#fff;border:1px solid #e8e8e8;border-radius:4px;margin-bottom:12px;
    overflow:hidden;scroll-margin-top:70px;
  }
  .etapa-head{
    display:flex;align-items:center;gap:14px;
    padding:16px 24px;cursor:pointer;user-select:none;
    transition:background .1s;
  }
  .etapa-head:hover{background:#fafafa}
  .badge{
    width:38px;height:38px;border-radius:4px;display:flex;
    align-items:center;justify-content:center;font-weight:800;
    font-size:1rem;color:#fff;flex-shrink:0;background:#333;
  }
  .etapa-head .info{flex:1}
  .etapa-head .info h2{font-size:1rem;font-weight:700;line-height:1.3;text-align:left;color:#111}
  .etapa-head .info span{font-size:.78rem;color:#999;display:block;text-align:left}
  .etapa-head .arrow{
    font-size:.65rem;color:#aaa;transition:transform .2s;flex-shrink:0;
  }
  .etapa.open .arrow{transform:rotate(90deg)}
  .etapa-body{display:none;padding:0 24px 24px;border-top:1px solid #f0f0f0}
  .etapa.open .etapa-body{display:block}

  /* Kanban tag inside section */
  .col-tag{
    display:inline-flex;align-items:center;gap:6px;
    padding:4px 12px;border-radius:3px;font-size:.75rem;font-weight:600;
    margin:14px 0 6px;background:#f0f0f0;color:#555;
  }
  .col-tag .pip{width:6px;height:6px;border-radius:50%;background:#888}

  /* ── BLOCKS ── */
  .blk{margin:18px 0}
  .blk h3{font-size:.92rem;font-weight:700;margin-bottom:5px;text-align:left;color:#111}
  .blk p{font-size:.88rem;margin:4px 0;text-align:justify;color:#333}
  .blk ul,.blk ol{padding-left:20px;font-size:.88rem;color:#333}
  .blk li{margin:4px 0;text-align:justify}

  /* Role tag */
  .role-tag{
    display:inline-block;padding:2px 8px;border-radius:3px;
    font-size:.68rem;font-weight:700;text-transform:uppercase;
    letter-spacing:.4px;margin-bottom:6px;
    background:#e8e8e8;color:#555;
  }

  /* ── CODE BLOCK ── */
  .code{
    background:#1a1a1a;color:#d4d4d4;border-radius:4px;
    padding:14px 16px;margin:10px 0;
    font-family:'JetBrains Mono','Fira Code',monospace;font-size:.8rem;
    line-height:1.9;position:relative;overflow-x:auto;white-space:pre;
    text-align:left;
  }
  .code .cp{
    position:absolute;top:8px;right:8px;
    background:#333;color:#aaa;border:none;
    border-radius:3px;padding:3px 12px;cursor:pointer;font-size:.75rem;
    font-family:'Inter',sans-serif;transition:background .15s;
  }
  .code .cp:hover{background:#555;color:#ddd}
  .code .cm{color:#666}

  /* ── ALERTS ── */
  .nota{
    border-radius:4px;padding:13px 16px;margin:14px 0;
    font-size:.86rem;display:flex;gap:10px;align-items:flex-start;
    text-align:justify;background:#f5f5f5;border-left:3px solid #999;
    color:#444;
  }
  .nota-icon{flex-shrink:0;margin-top:1px;font-size:.95rem}
  .nota-warn{border-left-color:#b0b0b0;background:#f8f8f0}
  .nota-danger{border-left-color:#888;background:#f5f0f0}
  .nota-ok{border-left-color:#777;background:#f0f5f0}

  /* ── CHECKPOINT ── */
  .check{
    background:#f5f5f5;border:1px solid #e0e0e0;border-radius:4px;
    padding:12px 16px;margin:18px 0 4px;
  }
  .check label{
    cursor:pointer;display:flex;align-items:center;gap:10px;
    font-size:.88rem;font-weight:500;text-align:left;color:#333;
  }
  .check input[type=checkbox]{
    width:18px;height:18px;accent-color:#555;cursor:pointer;flex-shrink:0;
  }

  /* ── TABLES ── */
  table{width:100%;border-collapse:collapse;margin:12px 0;font-size:.84rem}
  th{background:#f0f0f0;padding:9px 14px;text-align:left;font-weight:600;border-bottom:2px solid #ddd;color:#333}
  td{padding:9px 14px;border-bottom:1px solid #eee;color:#444;text-align:left}
  tr:hover td{background:#fafafa}

  /* ── EXTRA SECTIONS ── */
  .extra{
    background:#fff;border:1px solid #e8e8e8;border-radius:4px;margin-bottom:12px;
    overflow:hidden;
  }
  .extra-head{
    padding:16px 24px;cursor:pointer;display:flex;align-items:center;gap:14px;user-select:none;
  }
  .extra-head:hover{background:#fafafa}
  .extra-head h2{flex:1;font-size:.95rem;font-weight:700;text-align:left;color:#111}
  .extra-head span{font-size:.78rem;color:#999;text-align:left}
  .extra-head .arrow{font-size:.65rem;color:#aaa;transition:transform .2s;flex-shrink:0}
  .extra.open .arrow{transform:rotate(90deg)}
  .extra-body{display:none;padding:0 24px 24px;border-top:1px solid #f0f0f0}
  .extra.open .extra-body{display:block}

  /* ── FOOTER ── */
  footer{
    text-align:center;color:#bbb;font-size:.76rem;
    padding:28px 40px 20px;border-top:1px solid #e8e8e8;
  }

  /* ── RESPONSIVE ── */
  @media(max-width:768px){
    .hero{padding:36px 20px 32px}
    .kanban-bar{grid-template-columns:repeat(4,1fr)}
    .progress-wrap{padding:12px 20px}
    .main{padding:20px 16px 40px}
    .etapa-head,.extra-head{padding:14px 16px}
    .etapa-body,.extra-body{padding:0 16px 16px}
  }
  @media(max-width:480px){
    .kanban-bar{grid-template-columns:repeat(4,1fr)}
    .kb-col{padding:10px 2px 8px;font-size:.6rem}
    .kb-col .num{font-size:1.1rem}
    .badge{width:32px;height:32px;font-size:.85rem}
  }
</style>
</head>
<body>

<!-- HERO -->
<div class="hero">
  <h1>Guia Sprint 3 &mdash; Execu&ccedil;&atilde;o e Desenvolvimento</h1>
  <p class="sub">Projeto de Software 2026/2 &bull; Prof. Rafael Cotrin &bull; UNICID</p>
  <p class="intro">
    Neste guia, voc&ecirc; vai encontrar o passo a passo para transformar as Features documentadas em Tasks de desenvolvimento,
    subir o c&oacute;digo-fonte no reposit&oacute;rio e acompanhar a evolu&ccedil;&atilde;o do trabalho pelo Kanban.
    Cada etapa corresponde a uma coluna do quadro Kanban do projeto da sua squad.
  </p>
</div>

<!-- KANBAN BAR -->
<div class="kanban-bar" id="kanbanBar"></div>

<!-- PROGRESS -->
<div class="progress-wrap">
  <div class="lbl">Progresso: <span id="pTxt">0 / 9 etapas conclu&iacute;das</span></div>
  <div class="progress-track" id="pTrack"></div>
</div>

<!-- MAIN -->
<div class="main">

<div id="etapas"></div>

<!-- RESUMO POR PAPEL -->
<div class="extra" id="extraResumo">
  <div class="extra-head" onclick="toggleExtra('extraResumo')">
    <div>
      <h2>Resumo: o que cada papel entrega nesta sprint</h2>
      <span>Responsabilidades por fun&ccedil;&atilde;o dentro da squad.</span>
    </div>
    <div class="arrow">&#9654;</div>
  </div>
  <div class="extra-body">
    <table>
      <tr><th>Papel</th><th>Principais responsabilidades</th></tr>
      <tr><td><strong>Product Owner</strong></td><td>Criar as Tasks no Kanban a partir das Features (FP, FA, FE), priorizar o backlog e validar as entregas conclu&iacute;das.</td></tr>
      <tr><td><strong>Scrum Master</strong></td><td>Organizar o Kanban (labels, assignees, colunas), facilitar o fluxo de trabalho da squad e documentar a retrospectiva.</td></tr>
      <tr><td><strong>Dev / Tech Lead</strong></td><td>Desenvolver o c&oacute;digo na pasta <code>src/</code>, realizar commits frequentes com mensagens claras e enviar o c&oacute;digo ao reposit&oacute;rio.</td></tr>
      <tr><td><strong>QA / Tester</strong></td><td>Testar as funcionalidades integradas na develop, reportar bugs via Issues no GitHub e validar os cards.</td></tr>
      <tr><td><strong>Documentador(a)</strong></td><td>Manter a documenta&ccedil;&atilde;o do projeto atualizada e revisar se o c&oacute;digo est&aacute; de acordo com os requisitos.</td></tr>
    </table>
  </div>
</div>

<!-- PROBLEMAS COMUNS -->
<div class="extra" id="extraErros">
  <div class="extra-head" onclick="toggleExtra('extraErros')">
    <div>
      <h2>Problemas comuns e como resolver</h2>
      <span>Solu&ccedil;&otilde;es r&aacute;pidas para os erros mais frequentes no Git.</span>
    </div>
    <div class="arrow">&#9654;</div>
  </div>
  <div class="extra-body">
    <div class="blk">
      <h3>&ldquo;N&atilde;o consigo fazer push &mdash; diz rejected&rdquo;</h3>
      <p>Provavelmente outro membro da squad enviou atualiza&ccedil;&otilde;es antes de voc&ecirc;. Baixe as altera&ccedil;&otilde;es primeiro:</p>
      <div class="code"><button class="cp" onclick="copyCmd(this)">Copiar</button>git pull origin develop
<span class="cm"># Resolva conflitos, se houver.</span>
git push origin develop</div>
    </div>
    <div class="blk">
      <h3>&ldquo;Commitei algo errado e ainda n&atilde;o fiz push&rdquo;</h3>
      <p>Voc&ecirc; pode desfazer o &uacute;ltimo commit sem perder os arquivos alterados:</p>
      <div class="code"><button class="cp" onclick="copyCmd(this)">Copiar</button>git reset --soft HEAD~1
<span class="cm"># Os arquivos voltam para staging, prontos para um novo commit.</span></div>
    </div>
    <div class="blk">
      <h3>&ldquo;O Git mostra conflito nos arquivos&rdquo;</h3>
      <p>Quando duas pessoas editam o mesmo trecho, o Git marca o conflito. Abra o arquivo, escolha o que manter, remova as marcas (<code>&lt;&lt;&lt;&lt;</code>, <code>====</code>, <code>&gt;&gt;&gt;&gt;</code>) e depois:</p>
      <div class="code"><button class="cp" onclick="copyCmd(this)">Copiar</button>git add .
git commit -m "resolver conflito"
git push origin develop</div>
    </div>
    <div class="blk">
      <h3>&ldquo;Quero ver o que mudou antes de commitar&rdquo;</h3>
      <div class="code"><button class="cp" onclick="copyCmd(this)">Copiar</button>git status
<span class="cm"># Mostra quais arquivos foram alterados.</span>
git diff
<span class="cm"># Mostra exatamente o que mudou em cada arquivo.</span></div>
    </div>
  </div>
</div>

<!-- GLOSSÁRIO -->
<div class="extra" id="extraGloss">
  <div class="extra-head" onclick="toggleExtra('extraGloss')">
    <div>
      <h2>Gloss&aacute;rio</h2>
      <span>Termos utilizados neste guia.</span>
    </div>
    <div class="arrow">&#9654;</div>
  </div>
  <div class="extra-body">
    <table>
      <tr><th style="width:130px">Termo</th><th>Significado</th></tr>
      <tr><td><strong>Commit</strong></td><td>Um registro do c&oacute;digo no Git, acompanhado de uma mensagem descrevendo a altera&ccedil;&atilde;o realizada.</td></tr>
      <tr><td><strong>Push</strong></td><td>Enviar os commits do computador local para o reposit&oacute;rio remoto no GitHub.</td></tr>
      <tr><td><strong>Pull</strong></td><td>Baixar as atualiza&ccedil;&otilde;es do reposit&oacute;rio remoto para o computador local.</td></tr>
      <tr><td><strong>Develop</strong></td><td>A branch principal da squad, onde todo o c&oacute;digo da equipe &eacute; integrado.</td></tr>
      <tr><td><strong>Merge</strong></td><td>A integra&ccedil;&atilde;o de c&oacute;digo de diferentes contribui&ccedil;&otilde;es em uma mesma branch.</td></tr>
      <tr><td><strong>Conflito</strong></td><td>Ocorre quando duas pessoas editam o mesmo trecho de c&oacute;digo &mdash; precisa ser resolvido manualmente.</td></tr>
      <tr><td><strong>Tag</strong></td><td>Uma marca&ccedil;&atilde;o no hist&oacute;rico do reposit&oacute;rio que indica um ponto oficial de entrega.</td></tr>
      <tr><td><strong>Issue</strong></td><td>Um registro no GitHub para reportar bugs ou solicitar funcionalidades.</td></tr>
      <tr><td><strong>Kanban</strong></td><td>Quadro visual com colunas que representa o andamento das tarefas da squad.</td></tr>
    </table>
  </div>
</div>

</div><!-- /main -->

<footer>Projeto de Software 2026/2 &bull; UNICID &bull; Prof. Rafael Cotrin</footer>

<script>
const KC=[
  {n:"Backlog"},{n:"Refinamento"},{n:"A Fazer"},{n:"Fazendo"},
  {n:"Merge"},{n:"Testes em DEV"},{n:"Testes em HOM"},{n:"Produ\u00e7\u00e3o"}
];

const S=[
  {
    num:1,title:"Backlog \u2014 Listar as Features",
    desc:"O PO lista todas as Features que ser\u00e3o desenvolvidas nesta sprint.",
    col:"Backlog",
    blocks:[
      {role:"PO",title:"Abrir a documenta\u00e7\u00e3o da squad",
       text:'Acesse o reposit\u00f3rio da squad no GitHub. Na pasta <code>docs/</code> ou <code>Entregas/</code>, localize a lista de Features documentadas (por exemplo: FT001, FT002, FT003). Cada Feature representa um caso de uso do sistema que a squad vai desenvolver.'},
      {title:"Entender a estrutura de cada Feature",
       text:'<p>Cada Feature (caso de uso) possui tr\u00eas tipos de fluxo:</p><ul><li><strong>Fluxo Principal (FP)</strong> \u2014 o caminho feliz, quando o usu\u00e1rio realiza todas as a\u00e7\u00f5es corretamente.</li><li><strong>Fluxos Alternativos (FA)</strong> \u2014 varia\u00e7\u00f5es do caminho feliz, quando o usu\u00e1rio toma uma decis\u00e3o diferente do esperado.</li><li><strong>Fluxos de Exce\u00e7\u00e3o (FE)</strong> \u2014 tratamento de erros, quando algo d\u00e1 errado no processo.</li></ul><p style="margin-top:8px">Cada um desses fluxos pode ser transformado em uma <strong>Task de desenvolvimento</strong> separada.</p>'},
      {title:"Exemplo de decomposi\u00e7\u00e3o de uma Feature em Tasks",
       html:'<table><tr><th>Feature</th><th>Fluxo</th><th>Task gerada</th></tr><tr><td>FT001 - Cadastro de Produtor</td><td>Fluxo Principal (FP)</td><td>Implementar cadastro b\u00e1sico</td></tr><tr><td>FT001 - Cadastro de Produtor</td><td>FA-1 - Produtor j\u00e1 cadastrado</td><td>Validar duplicidade de cadastro</td></tr><tr><td>FT001 - Cadastro de Produtor</td><td>FE-1 - Campos obrigat\u00f3rios</td><td>Implementar valida\u00e7\u00e3o de campos</td></tr></table>'}
    ],
    alert:{type:"info",text:"O PO deve listar todas as Features que a squad pretende desenvolver nesta sprint. Os cards permanecem na coluna <strong>Backlog</strong> at\u00e9 serem refinados."},
    ck:"Todas as Features est\u00e3o listadas como cards no Backlog do Kanban."
  },
  {
    num:2,title:"Refinamento \u2014 Detalhar as Tasks",
    desc:"Detalhar cada Feature em Tasks com t\u00edtulo, descri\u00e7\u00e3o e respons\u00e1vel.",
    col:"Refinamento",
    blocks:[
      {role:"PO / SM",title:"Criar um card para cada Task",
       text:'<p>No GitHub Projects da squad, crie um card para cada fluxo que ser\u00e1 implementado. Preencha todos os campos obrigat\u00f3rios:</p><table><tr><th>Campo</th><th>O que colocar</th><th>Exemplo</th></tr><tr><td>T\u00edtulo</td><td>Feature + Fluxo + descri\u00e7\u00e3o curta</td><td>FT001-FP: Cadastro b\u00e1sico do produtor</td></tr><tr><td>Descri\u00e7\u00e3o</td><td>O que precisa ser feito</td><td>Implementar os passos FP-1 a FP-7</td></tr><tr><td>Assignee</td><td>Quem vai desenvolver</td><td>Nome do desenvolvedor</td></tr><tr><td>Label</td><td>Feature de origem</td><td>feature, ft001</td></tr></table>'},
      {title:"Responsabilidades nesta etapa",
       text:'<ul><li><strong>PO</strong> \u2014 cria os cards e define as prioridades do backlog.</li><li><strong>SM</strong> \u2014 organiza labels, assignees e garante que todos os campos est\u00e3o preenchidos.</li><li><strong>Dev / TL</strong> \u2014 valida se a Task est\u00e1 clara o suficiente para ser desenvolvida.</li></ul>'}
    ],
    alert:{type:"warn",text:"Cards sem descri\u00e7\u00e3o, sem assignee ou sem label est\u00e3o incompletos. Preencha todos os campos antes de mover o card para <strong>A Fazer</strong>."},
    ck:"Cada Task possui t\u00edtulo claro, descri\u00e7\u00e3o, assignee e label. Cards movidos para A Fazer."
  },
  {
    num:3,title:"A Fazer \u2014 Pronto para desenvolver",
    desc:"Tasks prontas aguardando o desenvolvedor come\u00e7ar a trabalhar.",
    col:"A Fazer",
    blocks:[
      {role:"Desenvolvedor(a)",title:"Preparar o ambiente (apenas na primeira vez)",
       text:'Se voc\u00ea ainda n\u00e3o possui o reposit\u00f3rio no seu computador, fa\u00e7a o clone. Este passo s\u00f3 precisa ser executado uma \u00fanica vez:',
       cmd:'git clone https://github.com/unicid-projeto-software-2026-2/squad-XX.git\ncd squad-XX\n<span class="cm"># Troque XX pelo n\u00famero da sua squad.</span>'},
      {role:"Desenvolvedor(a)",title:"Verificar se existe a branch develop",
       text:'A branch <code>develop</code> \u00e9 onde todo o c\u00f3digo da squad \u00e9 integrado. Verifique se ela j\u00e1 existe:',
       cmd:'git branch -a\n<span class="cm"># Se aparecer remotes/origin/develop, ela j\u00e1 existe.</span>\n<span class="cm"># Se n\u00e3o existir, o TL ou SM deve cri\u00e1-la:</span>\ngit checkout -b develop\ngit push origin develop'},
      {role:"Desenvolvedor(a)",title:"Atualizar a develop",
       text:'Antes de come\u00e7ar qualquer trabalho, sempre atualize a branch develop para garantir que voc\u00ea possui a vers\u00e3o mais recente do c\u00f3digo:',
       cmd:'git checkout develop\ngit pull origin develop'},
      {role:"Todos",title:"Mover o card no Kanban",
       text:'Quando for come\u00e7ar a trabalhar em uma Task, mova o card de <strong>A Fazer</strong> para <strong>Fazendo</strong> no Kanban.'}
    ],
    ck:"Reposit\u00f3rio clonado, develop atualizada e card movido para Fazendo."
  },
  {
    num:4,title:"Fazendo \u2014 Desenvolver o c\u00f3digo",
    desc:"O desenvolvedor escreve c\u00f3digo, faz commits e envia ao GitHub.",
    col:"Fazendo",
    blocks:[
      {role:"Desenvolvedor(a)",title:"Trabalhar na pasta src/",
       text:'Todo o c\u00f3digo-fonte desenvolvido pela squad deve ficar dentro da pasta <code>src/</code> do reposit\u00f3rio. Se essa pasta ainda n\u00e3o existe, crie-a:',
       cmd:'mkdir -p src'},
      {role:"Desenvolvedor(a)",title:"Fazer commits frequentes",
       text:'Conforme voc\u00ea desenvolve o c\u00f3digo do card que est\u00e1 atribu\u00eddo a voc\u00ea, fa\u00e7a commits pequenos e frequentes. Cada commit deve ter uma mensagem clara descrevendo o que foi feito:',
       cmd:'git add src/\ngit commit -m "adicionar formul\u00e1rio de cadastro do produtor"\n\n<span class="cm"># Continuou desenvolvendo o card...</span>\ngit add src/\ngit commit -m "adicionar valida\u00e7\u00e3o de campos obrigat\u00f3rios"'},
      {role:"Desenvolvedor(a)",title:"Regras para mensagens de commit",
       text:'<ul><li>Comece com verbo no infinitivo: <strong>adicionar</strong>, <strong>corrigir</strong>, <strong>atualizar</strong>, <strong>remover</strong>.</li><li>Descreva de forma objetiva o que foi alterado no c\u00f3digo.</li><li>Bom: <code>adicionar valida\u00e7\u00e3o de e-mail no cadastro</code></li><li>Ruim: <code>update</code>, <code>fix bug</code>, <code>altera\u00e7\u00f5es</code>, <code>wip</code></li></ul>'},
      {role:"Desenvolvedor(a)",title:"Enviar o c\u00f3digo para o GitHub",
       text:'Ap\u00f3s fazer os commits, envie o c\u00f3digo para o reposit\u00f3rio remoto no GitHub:',
       cmd:'git push origin develop'}
    ],
    alert:{type:"info",text:"Os commits s\u00e3o de responsabilidade dos <strong>desenvolvedores</strong> da squad, realizados conforme trabalham nos cards atribu\u00eddos a eles. Commits pequenos e frequentes demonstram a evolu\u00e7\u00e3o real do trabalho ao longo da sprint."},
    ck:"C\u00f3digo na pasta src/ commitado e enviado ao GitHub pelo desenvolvedor respons\u00e1vel pelo card."
  },
  {
    num:5,title:"Merge \u2014 Integra\u00e7\u00e3o do c\u00f3digo",
    desc:"O c\u00f3digo foi enviado e est\u00e1 integrado na develop, pronto para testes.",
    col:"Merge",
    blocks:[
      {role:"Desenvolvedor(a)",title:"Verificar se o c\u00f3digo est\u00e1 na develop",
       text:'Ap\u00f3s o push, acesse o reposit\u00f3rio no GitHub e confirme que os arquivos desenvolvidos aparecem na branch <code>develop</code>. Verifique tamb\u00e9m se os commits est\u00e3o registrados no hist\u00f3rico.'},
      {role:"Desenvolvedor(a)",title:"Resolver conflitos (se houver)",
       text:'<p>Se ao fazer <code>git pull</code> ou <code>git push</code> o Git indicar conflitos, significa que outro membro da squad editou o mesmo trecho de c\u00f3digo. Para resolver:</p><ol><li>Abra os arquivos marcados com conflito.</li><li>Escolha o que manter (pode ser o seu c\u00f3digo, o do colega, ou ambos).</li><li>Remova as marcas de conflito (<code>&lt;&lt;&lt;&lt;</code>, <code>====</code>, <code>&gt;&gt;&gt;&gt;</code>).</li><li>Salve o arquivo, fa\u00e7a commit e push.</li></ol>',
       cmd:'git add .\ngit commit -m "resolver conflito na develop"\ngit push origin develop'},
      {role:"Todos",title:"Mover o card no Kanban",
       text:'Com o c\u00f3digo integrado e sem conflitos pendentes, mova o card para <strong>Testes em DEV</strong>.'}
    ],
    ck:"C\u00f3digo integrado na develop sem conflitos. Card movido para Testes em DEV."
  },
  {
    num:6,title:"Testes em DEV \u2014 Validar na develop",
    desc:"O QA testa se a funcionalidade est\u00e1 funcionando ap\u00f3s a integra\u00e7\u00e3o.",
    col:"Testes em DEV",
    blocks:[
      {role:"QA / Tester",title:"Atualizar a develop para testar",
       text:'O QA (ou outro membro respons\u00e1vel) deve baixar a vers\u00e3o mais recente da develop para testar localmente:',
       cmd:'git checkout develop\ngit pull origin develop'},
      {role:"QA / Tester",title:"O que testar",
       text:'<ul><li>A funcionalidade implementada faz o que a Task descreve?</li><li>O fluxo principal funciona corretamente?</li><li>Os erros s\u00e3o tratados de forma adequada?</li><li>Alguma funcionalidade que j\u00e1 existia parou de funcionar?</li></ul>'},
      {role:"QA / Tester",title:"Se encontrou um bug",
       text:'<ol><li>Crie uma <strong>Issue</strong> no GitHub descrevendo o problema encontrado.</li><li>Mova o card de volta para <strong>A Fazer</strong> no Kanban.</li><li>O desenvolvedor corrige o problema, faz novos commits, envia ao GitHub e o card volta a percorrer o fluxo.</li></ol>'},
      {role:"Todos",title:"Se est\u00e1 tudo correto",
       text:'Mova o card para <strong>Testes em HOM</strong>.'}
    ],
    ck:"Funcionalidade testada e validada na develop."
  },
  {
    num:7,title:"Testes em HOM \u2014 Homologa\u00e7\u00e3o",
    desc:"O professor homologa a funcionalidade, simulando a valida\u00e7\u00e3o do cliente ou usu\u00e1rio final.",
    col:"Testes em HOM",
    blocks:[
      {role:"PO / SM",title:"Apresentar a funcionalidade para homologa\u00e7\u00e3o",
       text:'<p>Nesta etapa, a funcionalidade desenvolvida \u00e9 apresentada ao <strong>professor</strong>, que atua como homologador simulando o papel do <strong>cliente ou usu\u00e1rio final do sistema</strong>. O objetivo \u00e9 confirmar que o que foi desenvolvido atende \u00e0s necessidades reais de quem vai utilizar o produto.</p><p style="margin-top:8px">Na Sprint 3, o professor ser\u00e1 o respons\u00e1vel por realizar essa homologa\u00e7\u00e3o. O PO deve organizar a demonstra\u00e7\u00e3o e apresentar as funcionalidades conclu\u00eddas.</p>'},
      {role:"PO / SM",title:"O que ser\u00e1 avaliado na homologa\u00e7\u00e3o",
       text:'<ul><li>A funcionalidade resolve o problema descrito na Feature?</li><li>O fluxo de uso est\u00e1 intuitivo e f\u00e1cil de entender?</li><li>Existe algo que o usu\u00e1rio final gostaria que fosse diferente?</li><li>Existe algum cen\u00e1rio que n\u00e3o foi considerado?</li></ul>'},
      {role:"PO / SM",title:"Se o professor solicitou ajustes",
       text:'<ol><li>Registre o feedback como uma <strong>Issue</strong> no GitHub.</li><li>Avalie a prioridade do ajuste com a squad.</li><li>Se for cr\u00edtico, volte o card para <strong>A Fazer</strong> para corre\u00e7\u00e3o.</li><li>Se for melhoria futura, mantenha a Issue no backlog para a pr\u00f3xima sprint.</li></ol>'},
      {role:"Todos",title:"Se a homologa\u00e7\u00e3o foi aprovada",
       text:'Mova o card para <strong>Produ\u00e7\u00e3o</strong>. A funcionalidade est\u00e1 homologada e pronta para entrega.'}
    ],
    alert:{type:"info",text:"Na Sprint 3, o <strong>professor</strong> ser\u00e1 o homologador, simulando o papel do cliente ou usu\u00e1rio final. A coluna <strong>Testes em HOM</strong> n\u00e3o \u00e9 um teste t\u00e9cnico \u2014 \u00e9 a confirma\u00e7\u00e3o de que o sistema atende \u00e0s expectativas de quem vai utiliz\u00e1-lo."},
    ck:"Funcionalidade homologada pelo professor. Card movido para Produ\u00e7\u00e3o."
  },
  {
    num:8,title:"Produ\u00e7\u00e3o \u2014 Task conclu\u00edda",
    desc:"A funcionalidade est\u00e1 pronta, validada pelo cliente e entregue.",
    col:"Produ\u00e7\u00e3o",
    blocks:[
      {role:"Todos",title:"Card finalizado",
       text:'<p>O card na coluna <strong>Produ\u00e7\u00e3o</strong> indica que a Task foi desenvolvida, integrada, testada pela equipe e validada pelo cliente ou usu\u00e1rio final. Essa \u00e9 a coluna final do fluxo de trabalho do Kanban.</p>'}
    ],
    ck:"Card em Produ\u00e7\u00e3o. Task conclu\u00edda com sucesso!"
  },
  {
    num:"F",title:"Tag da Sprint \u2014 Marcar a entrega",
    desc:"Ao final da sprint, o TL ou SM cria a tag oficial de entrega.",
    col:null,
    blocks:[
      {role:"TL / SM",title:"Criar a tag v3.0-sprint3",
       text:'No final da sprint, o Tech Lead ou o Scrum Master deve criar uma tag para marcar oficialmente o ponto de entrega do projeto:',
       cmd:'git checkout develop\ngit pull origin develop\ngit tag v3.0-sprint3\ngit push origin v3.0-sprint3'},
      {role:"Todos",title:"Verificar no GitHub",
       text:'A tag aparece na aba <strong>Tags</strong> ou <strong>Releases</strong> do reposit\u00f3rio. Isso marca oficialmente a conclus\u00e3o da Sprint 3.'}
    ],
    alert:{type:"ok",text:"Com a tag criada, a entrega da Sprint 3 est\u00e1 oficialmente conclu\u00edda."},
    ck:"Tag v3.0-sprint3 vis\u00edvel no GitHub. Entrega conclu\u00edda!"
  }
];

// ── Render kanban bar ──
const bar=document.getElementById("kanbanBar");
KC.forEach((c,i)=>{
  const d=document.createElement("div");
  d.className="kb-col";d.id=`kc-${i}`;
  d.innerHTML=`<span class="num">${i+1}</span>${c.n}`;
  d.onclick=()=>{const si=S.findIndex(s=>s.col===c.n);if(si>=0){openEtapa(si);document.getElementById(`et-${si}`).scrollIntoView({behavior:"smooth"})}};
  bar.appendChild(d);
});

function hlCol(name){
  KC.forEach((c,i)=>{const e=document.getElementById(`kc-${i}`);
    name&&c.n===name?e.classList.add("active"):e.classList.remove("active")});
}

// ── Render etapas ──
const cont=document.getElementById("etapas");
S.forEach((s,i)=>{
  const el=document.createElement("div");el.className="etapa";el.id=`et-${i}`;
  let body="";

  if(s.col){
    body+=`<div class="col-tag"><span class="pip"></span>Coluna do Kanban: ${s.col}</div>`;
  }

  s.blocks.forEach(b=>{
    body+=`<div class="blk">`;
    if(b.role) body+=`<span class="role-tag">${b.role}</span>`;
    body+=`<h3>${b.title}</h3>`;
    if(b.text) body+=b.text.startsWith("<")?b.text:`<p>${b.text}</p>`;
    if(b.html) body+=b.html;
    if(b.cmd) body+=`<div class="code"><button class="cp" onclick="copyCmd(this)">Copiar</button>${b.cmd}</div>`;
    body+=`</div>`;
  });

  if(s.alert){
    const t=s.alert.type;
    const cls=t==="info"?"nota-info":t==="warn"?"nota-warn":t==="danger"?"nota-danger":"nota-ok";
    const ico=t==="info"?"\u2139\ufe0f":t==="warn"?"\u26a0\ufe0f":t==="danger"?"\ud83d\udeab":"\u2705";
    body+=`<div class="nota ${cls}"><span class="nota-icon">${ico}</span><div>${s.alert.text}</div></div>`;
  }

  body+=`<div class="check"><label><input type="checkbox" onchange="prog(${i},this.checked)">${s.ck}</label></div>`;

  el.innerHTML=`
    <div class="etapa-head" onclick="toggle(${i})">
      <div class="badge">${s.num}</div>
      <div class="info"><h2>${s.title}</h2><span>${s.desc}</span></div>
      <div class="arrow">&#9654;</div>
    </div>
    <div class="etapa-body">${body}</div>`;
  cont.appendChild(el);
});

// ── Progress ──
const pt=document.getElementById("pTrack");
S.forEach((_,i)=>{const d=document.createElement("div");d.className="dot";d.id=`pd-${i}`;pt.appendChild(d)});

function toggle(i){
  const e=document.getElementById(`et-${i}`);
  const was=e.classList.contains("open");e.classList.toggle("open");
  if(!was&&S[i].col)hlCol(S[i].col);
}
function openEtapa(i){
  const e=document.getElementById(`et-${i}`);
  if(!e.classList.contains("open"))e.classList.add("open");
  if(S[i].col)hlCol(S[i].col);
}
function prog(i,ok){
  document.getElementById(`pd-${i}`).className=ok?"dot ok":"dot";
  const t=document.querySelectorAll(".dot.ok").length;
  document.getElementById("pTxt").textContent=`${t} / ${S.length} etapas conclu\u00eddas`;
  if(ok&&i+1<S.length)setTimeout(()=>{openEtapa(i+1);document.getElementById(`et-${i+1}`).scrollIntoView({behavior:"smooth",block:"start"})},400);
}
function toggleExtra(id){document.getElementById(id).classList.toggle("open")}
function copyCmd(btn){
  const t=btn.parentElement.innerText.replace("Copiar","").replace("Copiado!","").trim();
  navigator.clipboard.writeText(t).then(()=>{btn.textContent="Copiado!";setTimeout(()=>btn.textContent="Copiar",1500)});
}

toggle(0);
</script>
</body>
</html>
