/* ================================================================
   DADOS DAS COMISSÕES PERMANENTES — TRE-RN
   Arquivo de dados centralizado. Toda a manutenção de conteúdo
   deve ser feita aqui. Os arquivos index.html e comissao.html
   leem este arquivo e geram a visualização automaticamente.
   ================================================================

   ESTRUTURA DE CADA COMISSÃO:
   ─────────────────────────────────────────────────────────────────
   id            (string)  identificador único, sem espaços        ex: 'cgpls'
   sigla         (string)  sigla oficial                           ex: 'CGPLS'
   nome          (string)  nome completo
   area          (string)  área/secretaria responsável
   cor           (string)  use uma chave do objeto CORES abaixo    ex: CORES.azul_royal

   presidencia   (objeto)  { nome, setor }
   secretaria    (obj/array) { nome, setor } ou [ { nome, setor }, ... ] — use array para múltiplos secretários
   membros_total (número)  total de membros; null = não informado
   periodicidade (string)  ex: 'Mensal', 'Trimestral', 'Sob demanda'

   base_legal    (objeto)  { nome, link }   — ato que CRIOU a comissão
                           link: null se não houver

   genero        (objeto)  { fem, masc }    — números absolutos; null = não informado
   etnia         (objeto)  { branco, pardo, amarelo, negro, indigena }
                           omita etnias com valor 0; null = não informado

   normas_vinculadas (array) lista de normas relacionadas
     cada item: { orgao, nome, descricao, link }
     orgao: 'CNJ' | 'TSE' | 'TRE-RN' | 'LEI' | 'DECRETO' | etc.
     link: null se não houver

   normas_designacao (array) série histórica de portarias de designação
     cada item: { nome, descricao, link, vigente }
     vigente: true = portaria atual; false = histórico

   composicao    (array)   membros da comissão
     cada item: { unidade, membro, obs }
     obs: ex. 'Presidente', 'Secretária', '' = membro comum

   atas          (array)   reuniões realizadas, agrupadas por registro
     cada item:
       ano      (string)   '2025'
       num      (string)   'Ata 01' | '—' se não houver
       titulo   (string)   título descritivo
       data     (string)   'fev/2025' ou '—'
       url      (string|null) link para o inteiro teor da ata
       duracao  (string)   duração da reunião no formato 'hh:mm'  ex: '01:30' — null se não informado
       pauta    (array)    lista de strings com os itens de pauta
       delib    (array)    deliberações: { txt, status, ano }
                           status: 'cumprida' | 'pendente' | 'informativa'

   proximas      (array)   reuniões previstas
     cada item: { titulo, data, horario, duracao, local, pauta }
     duracao: duração prevista no formato 'hh:mm' — null se não informado
     data: 'AAAA-MM-DD'

   ================================================================
   PARA ADICIONAR UMA NOVA COMISSÃO:
     Copie um bloco existente, altere os campos e adicione ao array.
   PARA REMOVER:
     Apague o bloco correspondente do array.
   PARA MARCAR CAMPO COMO "A PREENCHER":
     Use null para números, [] para listas, e a string
     'A confirmar' para textos.
   ================================================================ */

const ANO_ATUAL = new Date().getFullYear();



/* ================================================================
   PALETA DE CORES DAS COMISSÕES
   ─────────────────────────────────────────────────────────────────
   Para alterar a cor de uma comissão:
     1. Ajuste o valor hex aqui se quiser uma nova tonalidade, OU
     2. No bloco da comissão, troque a chave usada no campo "cor".

   Para adicionar uma nova cor:
     Inclua uma nova entrada neste objeto seguindo o mesmo padrão.
   ================================================================ */
const CORES = {
  azul_royal    : '#0249b9',  // CGPLS
  violeta       : '#5449c2',  // CACESS
  teal          : '#0e7490',  // CREG
  verde_escuro  : '#1a7a4a',  // CJE
  roxo          : '#7c3aed',  // CPSI
  marrom        : '#92400e',  // CPAD
  rosa          : '#be185d',  // CPEGD
  verde_floresta: '#065f46',  // CPMEM
  laranja       : '#b45309',  // CEDEM
  azul_marinho  : '#1e3a5f',  // CPÉ
  borde         : '#7c2d12',  // CEAAD
};

const COMISSOES = [

  /* ══════════════════════════════════════════════════
     CGPLS — Comissão Gestora do Plano de Logística Sustentável
  ══════════════════════════════════════════════════ */
  {
    id: 'cgpls',
    sigla: 'CGPLS',
    nome: 'Comissão Gestora do Plano de Logística Sustentável',
    area: 'Diretoria-Geral',
    cor: '#0249b9',

    presidencia: { nome: 'Ana Esmera Pimentel da Fonseca', setor: 'Diretora-Geral' },
    secretaria: { nome: 'Não indicado', setor: 'Núcleo Socioambiental/AGE' },
    membros_total: 8,
    periodicidade: 'Trimestral',

    base_legal: { nome: 'Portaria nº 92/2023/PRES', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2023-1/tre-rn-portaria-92-2023-pres/@@display-file/file/TRE-RN-Portaria-92-2023-PRES-INSTITUI%2520COMISS%25C3%2583O%2520GESTORA%2520DO%2520PLANO%2520DE%2520LOG%25C3%258DSTICA%2520SUSTENT%25C3%2581VEL%2520DO%2520TRE-PAE%25203264%25202023.pdf' },

    genero: { fem: 5, masc: 3 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 400/2021', descricao: 'Política de sustentabilidade do Judiciário', link: 'https://atos.cnj.jus.br/files/compilado1505392025092468d408c35bc5d.pdf' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 550/2024', descricao: 'Altera a Res. CNJ 400/2021', link: 'https://atos.cnj.jus.br/atos/detalhar/5509' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 594/2024', descricao: 'Programa Justiça Carbono Zero', link: 'https://atos.cnj.jus.br/files/original144529202411136734bb89548b2.pdf' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 92/2023/PRES', descricao: 'Composição atual da CGPLS', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2023-1/tre-rn-portaria-92-2023-pres/@@display-file/file/TRE-RN-Portaria-92-2023-PRES-INSTITUI%2520COMISS%25C3%2583O%2520GESTORA%2520DO%2520PLANO%2520DE%2520LOG%25C3%258DSTICA%2520SUSTENT%25C3%2581VEL%2520DO%2520TRE-PAE%25203264%25202023.pdf', vigente: true }
    ],

    composicao: [
      { unidade: 'Diretoria-Geral', membro: 'Ana Esmera Pimentel da Fonseca', obs: 'Presidente' },
      { unidade: 'Asses. Gestão Estrat., Governança e Inovação', membro: 'Maria Ruth Bezerra Maia de Hollanda', obs: 'Secretária' },
      { unidade: 'Secretaria Judiciária', membro: 'João Paulo de Araújo', obs: 'Membro' },
      { unidade: 'Secretaria Administração, Orçamento e Finanças', membro: 'Simone Maria de Oliveira Soares Mello', obs: 'Membro' },
      { unidade: 'Secretaria Tecnologia da Inform. e Eleições', membro: 'Marcos Flávio Nascimento Maia', obs: 'Membro' },
      { unidade: 'Secretaria de Gestão de Pessoas', membro: 'Cláudia Josemira Marinho de Lima', obs: 'Membro' },
      { unidade: 'Coordenadoria de Licitações e Contratos', membro: 'Hermann Prudente Doria', obs: 'Membro' },
      { unidade: 'Núcleo Socioambiental', membro: 'Evelyn Monique de Arruda Farias', obs: 'Membro' }
    ],

    atas: [
      {
        ano: '2026', num: 'Ata 01', titulo: '1ª Reunião CGPLS — 2026',
        data: 'fev/2026', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/atas/ata-1-2026/@@display-file/file/SEI_2482924_Ata_de_reuniao_1%2520%25281%2529.pdf',
        pauta: [
        'Relatório de Desempenho 2025',
        'Validação de metas e ações PLS 2026'
      ],
        delib: [
        { txt: 'APROVADO — Relatório 2025 e propostas de metas e ações para 2026', status: 'cumprida' }
      ]
      },
      {
        ano: '2025', num: 'Ata 05', titulo: '5ª Reunião CGPLS — 2025',
        data: 'dez/2025', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/rede-de-governanca-e-gestao-do-tre-rn/comissao-gestora-do-pls/arquivos/ata-cgpls-no-05_2025/@@display-file/file/SEI_2438983_Ata_de_reuniao_5.pdf',
        pauta: [
        'Apresentação dos resultados parciais (out/2025)',
        'Apresentação e validação de propostas preliminares de metas e ações 2026',
        'Resoluções do CNJ - Plano de Descarbonização e Protocolo de Crise Socioambiental'
      ],
        delib: [
        { txt: 'AJUSTES — Metas e ações do PLS 2025', status: 'cumprida' },
        { txt: 'APROVADO — Propostas preliminares de metas e ações do PLS 2026', status: 'cumprida' },
        { txt: 'Res. CNJ: novo indicador TI e Protocolo de crise socioambiental', status: 'informativa' }
      ]
      },
      {
        ano: '2025', num: 'Ata 04', titulo: '4ª Reunião CGPLS — 2025',
        data: 'out/2025', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/rede-de-governanca-e-gestao-do-tre-rn/comissao-gestora-do-pls/arquivos/ata-cgpls-no-04_2025/@@display-file/file/SEI_2414060_Ata_de_reuniao_4.pdf',
        pauta: [
        'Acompanhamento do plano de ações (unidades da SAOF)'
      ],
        delib: [
        { txt: 'Monitoramento pontual das metas e ações vinculadas à SAOF', status: 'informativa' }
      ]
      },
      {
        ano: '2025', num: 'Ata 03', titulo: '3ª Reunião CGPLS — 2025',
        data: 'set/2025', duracao: '02:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/rede-de-governanca-e-gestao-do-tre-rn/comissao-gestora-do-pls/arquivos/ata-cgpls-no-03_2025/@@display-file/file/SEI_2399184_Ata_de_reuniao_3.pdf',
        pauta: [
        'Análise dos resultados do IDS 2024',
        'Monitoramento do PLS - Indicadores e ações',
        'Monitoramento do Programa Carbono Zero (Emissões de GEE)'
      ],
        delib: [
        { txt: 'Avaliação e discussão dos resultados do IDS 2024', status: 'informativa' },
        { txt: 'AJUSTES — Metas e ações com base nos resultados do IDS 2025', status: 'cumprida' },
        { txt: 'APROVADO — Monitoramento das ações do Plano de Descarbonização', status: 'cumprida' }
      ]
      },
      {
        ano: '2025', num: 'Ata 02', titulo: '2ª Reunião CGPLS — 2025',
        data: 'mar/2025', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/rede-de-governanca-e-gestao-do-tre-rn/comissao-gestora-do-pls/arquivos/ata-cgpls-no-02_2025/@@display-file/file/Ata%2520CGPLS%2520n%25C2%25BA%252002_2025.pdf',
        pauta: [
        'Aprovação do PLS 2024-2025 - Versão 2.0',
        'Aprovação do Plano de Ação do PLS 2025',
        'Inclusão dos indicadores de Equidade e Diversidade e Justiça Carbono Zero'
      ],
        delib: [
        { txt: 'APROVADO — Versão 2.0 do PLS 2024-2025 (inclusão de novos indicadores)', status: 'cumprida' },
        { txt: 'APROVADO — Plano de Ação do PLS 2024-2025', status: 'cumprida' }
      ]
      },
      {
        ano: '2025', num: 'Ata 01', titulo: '1ª Reunião CGPLS — 2025',
        data: 'fev/2025', duracao: '02:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/rede-de-governanca-e-gestao-do-tre-rn/comissao-gestora-do-pls/arquivos/ata-cgpls-no-01_2025/@@display-file/file/Ata%2520CGPLS%2520n%25C2%25BA%252001_2025.pdf',
        pauta: [
        'Apresentação e aprovação do Relatório de Desempenho 2024',
        'Metas e aprovação do Plano de Descarbonização 2025-2030',
        'Encaminhamentos para o Plano de Ação do PLS 2025'
      ],
        delib: [
        { txt: 'APROVADO — Relatório de Desempenho do PLS 2024', status: 'informativa' },
        { txt: 'APROVADO — Plano de Descarbonização - Versão 1.0', status: 'informativa' },
        { txt: 'Direcionamentos para o Plano de Ação 2025', status: 'informativa' }
      ]
      },
      {
        ano: '2024.0', num: 'Ata 04', titulo: '4ª Reunião CGPLS — 2024',
        data: 'set/2024', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/atas/tre-rn-ata-da-4a-cgpls-2024/@@display-file/file/Ata%2520n%25C2%25BA%25204_%2520CGPLS.pdf',
        pauta: [
        'Análise do PLS do TRE-RN: indicadores críticos',
        'Prêmio CNJ de Qualidade 2025 e Ranking da Transparência 2025',
        'Balanço da Sustentabilidade'
      ],
        delib: [
        { txt: 'Avaliação e discussão dos indicadores críticos do PLS 2024', status: 'informativa' },
        { txt: 'Impactos do PLS/IDS no Ranking da Transparência e Prêmio CNJ de Qualidade', status: 'informativa' },
        { txt: 'AJUSTES — Metas e ações com base nos resultados do IDS 2024', status: 'cumprida' }
      ]
      },
      {
        ano: '2024.0', num: 'Ata 03', titulo: '3ª Reunião CGPLS — 2024',
        data: 'jun/2024', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/atas/tre-rn-ata-da-3a-cgpls-2024/@@display-file/file/Ata%2520n%25C2%25BA%25203_CGPLS.pdf',
        pauta: [
        'Análise do Balanço da Sustentabilidade 2023 e IDS (foco PLS 2024)',
        'Apresentação do painel do GEE (Gases de efeito estufa)',
        'Atualização do Plano de Ação 2024'
      ],
        delib: [
        { txt: 'Análise do Balanço da Sustentabilidade 2023 (IDS)', status: 'informativa' },
        { txt: 'Avaliação do painel do GEE', status: 'informativa' },
        { txt: 'AJUSTES — Plano de Ação 2023', status: 'cumprida' }
      ]
      },
      {
        ano: '2024.0', num: 'Ata 02', titulo: '2ª Reunião CGPLS — 2024',
        data: 'mar/2024', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/atas/ata-cgpls-02-2024/@@display-file/file/2%25C2%25AA%2520Ata%2520da%2520CGPLS%2520-%252012.03.2024.pdf',
        pauta: [
        'Avaliação e aprovação das ações do PLS 2024'
      ],
        delib: [
        { txt: 'APROVADO — Plano de Ação 2024', status: 'cumprida' }
      ]
      },
      {
        ano: '2024.0', num: 'Ata 01', titulo: '1ª Reunião CGPLS — 2024',
        data: 'fev/2024', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/arquivo/ata-cgpls-01-2024/@@display-file/file/1%25C2%25AA%2520Ata%2520da%2520CGPLS%2520-%252021.02.2024.pdf',
        pauta: [
        'Proposição de metas do PLS 2024 e 2025 e deliberações'
      ],
        delib: [
        { txt: 'APROVADO — Metas do PLS 2024-2025', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 04', titulo: '4ª Reunião CGPLS — 2023',
        data: 'nov/2023', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/atas/ata-cgpls-04-2023/@@display-file/file/ataFinalizadaReuniao-CGPL-4-2023.pdf',
        pauta: [
        'Deliberações sobre para garrafas descartáveis, garrafões, ação solidária e estagiários (impacto no FTT)'
      ],
        delib: [
        { txt: 'APROVADO — Verificação de dados de consumo de garrafas descartáveis e garrafões retornáveis', status: 'cumprida' },
        { txt: 'APROVADO — Inclusão do projeto AMAR como ação solidária', status: 'cumprida' },
        { txt: 'APROVADO — Estudo comparativo do programa de estágio de outros TREs', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 03', titulo: '3ª Reunião CGPLS — 2023',
        data: 'mai/2023', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/arquivo/ata-cgpls-03-2023/@@display-file/file/3%25C2%25AA%2520Reuni%25C3%25A3o%2520da%2520CGPLS.pdf',
        pauta: [
        'Apresentação dos resultados parciais (jan. a abr.)',
        'Apresentação dos painéis de BI elaborados pelo TRE-CE (resultados RN)',
        'Apresentação da planilha de correspondência do IDS 2021 e PLS 2023',
        'Deliberações quanto aos indicadores energia elétrica, veículos e impressão'
      ],
        delib: [
        { txt: 'Avaliação e discussão dos resultados parciais (jan. a abr.)', status: 'informativa' },
        { txt: 'Avaliação e discussão dos resultados do IDS TRE-RN (BI TRE-CE)', status: 'informativa' },
        { txt: 'APROVADO — Encaminhamentos voltados à redução do consumo de energia elétrica', status: 'cumprida' },
        { txt: 'APROVADO — Agilização dos processos de desfazimento de veículos', status: 'cumprida' },
        { txt: 'APROVADO — Dar andamento ao projeto para novo modelo de transporte', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 02', titulo: '2ª Reunião CGPLS — 2023',
        data: 'abr/2023', duracao: '01:40:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/arquivo/ata-cgpls-02-2023/@@display-file/file/ataFinalizadaReuniao-CGPL-2-2023%25282%2529.pdf',
        pauta: [
        'Aprovação das metas do PLS 2023',
        'Deliberações principais quanto aos indicadores copos descartáveis, garrafas descartáveis e energia'
      ],
        delib: [
        { txt: 'APROVADO — Metas do PLS 2023', status: 'cumprida' },
        { txt: 'APROVADO — Encaminhamentos relativos aos itens energia, copos e garrafas descartáveis', status: 'cumprida' },
        { txt: 'Decisão de não aquisição de água mineral para o pleito 2024', status: 'informativa' },
        { txt: 'Ampla divulgação às ZEs sobre a água mineral para o pleito 2024 (NSA)', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 01', titulo: '1ª Reunião CGPLS — 2023',
        data: 'mar/2023', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/arquivo/ata-cgpls-01-2023/@@display-file/file/ataFinalizadaReuniao-CGPL-1-2023%25284%2529.pdf',
        pauta: [
        'Apresentação do Relatório de Desempenho 2022 para validação da CGPLS',
        'Apresentação dos resultados obtidos em 2022 e análise comparativa - série histórica',
        'Apresentação das propostas de metas e ações para 2023'
      ],
        delib: [
        { txt: 'APROVADO — Relatório de Desempenho do PLS 2022', status: 'cumprida' },
        { txt: 'APROVADO — Metas do PLS 2023', status: 'cumprida' }
      ]
      },
      {
        ano: '2022.0', num: 'Ata 01', titulo: '1ª Reunião CGPLS — 2022',
        data: 'abr/2022', duracao: '00:20:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/arquivo/ata-1-2022-nova/@@display-file/file/Ata%25201%25C2%25BA%2520Reuni%25C3%25A3o%2520da%2520Comiss%25C3%25A3o%2520Gestora%2520do%2520PLS.pdf',
        pauta: [
        'Apresentação dos indicadores do PLS'
      ],
        delib: [
        { txt: 'APROVADO — Ação de conscientização com os servidores sobre o uso de energia', status: 'cumprida' },
        { txt: 'APROVADO — Verificação de causas para o aumento do consumo da água', status: 'cumprida' },
        { txt: 'APROVADO — Verificação de necessidade de garrafas de água descartáveis', status: 'cumprida' },
        { txt: 'APROVADO — Verificação de cenário sobre o uso de filtros e a qualidade da água pela CAERN', status: 'cumprida' },
        { txt: 'APROVADO — Solução de container para o Ecoponto', status: 'cumprida' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 04', titulo: '4ª Reunião CGPLS — 2021',
        data: 'out/2021', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/atas/ata-cgpls-11out2021/@@display-file/file/ataFinalizadaReuniao-NGS-1-2021%2520%25281%2529.pdf',
        pauta: [
        'Acompanhamento das metas 2021',
        'Definição de metas 2022 do PLS'
      ],
        delib: [
        { txt: 'Apresentação e discussão: Itens avaliados no IDS 2021', status: 'informativa' },
        { txt: 'APROVADO — Metas do PLS 2022', status: 'cumprida' },
        { txt: 'Apresentação: Mudanças introduzidas pela Res. CNJ 400/2021', status: 'informativa' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 03', titulo: '3ª Reunião CGPLS — 2021',
        data: 'ago/2021', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/plano-de-logistica-sustentavel/arquivos/tre-rn-ata-cgpls-03-2021/@@display-file/file/Reuni%25C3%25A3o%2520da%2520CGPLS%2520-%25203%25C2%25AA%2520Ata%2520-%252010.08.2021_Final.pdf',
        pauta: [
        'Apresentação do Balanço da Sustentabilidade (ano 2020)',
        'Análise dos indicadores – 1º sem',
        'Análise das ações de 2021 – 1º sem'
      ],
        delib: [
        { txt: 'Apresentação: Balanço da sustentabilidade e metodologia de aferição do CNJ', status: 'informativa' },
        { txt: 'Apresentação: Dados parciais do PLS no ano (1º semestre)', status: 'informativa' },
        { txt: 'APROVADO — Realização de estudo comparativo de dados de consumo com a média da JE', status: 'cumprida' },
        { txt: 'APROVADO — Verificação de vazamentos de água e cumprimento da política de copos descartáveis', status: 'cumprida' },
        { txt: 'Início do processo de contratação do Ecoponto', status: 'informativa' },
        { txt: 'APROVADO — Verificação e andamento do processo de desfazimento de veículos (2021)', status: 'cumprida' },
        { txt: 'APROVADO — Realização de estudo de viabilidade para outsourcing de impressão', status: 'cumprida' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 02', titulo: '2ª Reunião CGPLS — 2021',
        data: 'mai/2021', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/plano-de-logistica-sustentavel/arquivos/tre-rn-ata-cgpls-02-2021/@@display-file/file/1%2520-%2520Reuni%25C3%25A3o%2520da%2520CGPLS%2520-%25202%25C2%25AA%2520Ata%2520-%252018.05.2021-com%2520todas%2520as%2520assinaturas.pdf',
        pauta: [
        'Apresentação e aprovação do Plano de Logística Sustentável 2021-2022'
      ],
        delib: [
        { txt: 'Apresentação: PLS 2021-2022 e o plano de ação, de acordo com a Res. CNJ 201/2015', status: 'informativa' },
        { txt: 'APROVADO — PLS 2021-2022 e plano de ação com ajustes da CGPLS', status: 'cumprida' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 01', titulo: '1ª Reunião CGPLS — 2021',
        data: 'abr/2021', duracao: '03:00:00', url: 'https://www.tre-rn.jus.br/institucional/planejamento-e-gestao-estrategica/arquivos/nucleo-socio-ambiental/documentos/tre-rn-ata-no-01-2021-cgpls/@@display-file/file/1%2520-%2520Reuni%25C3%25A3o%2520da%2520CGPLS%2520-%25201%25C2%25AA%2520Ata%2520-%252005.04.2021-2%2520Recebido%2520DG.pdf',
        pauta: [
        'Apresentação dos resultados 2020',
        'Análise das ações 2021',
        'Proposição e aprovação de metas 2021'
      ],
        delib: [
        { txt: 'APROVADO — Periodicidade bienal do PLS (2021-2022) e metas anuais', status: 'cumprida' },
        { txt: 'AJUSTES — Inclusão de ações de natureza contínua no PLS 2022', status: 'cumprida' },
        { txt: 'APROVADO — Análise do desempenho do PLS pelo NSA e submissão trimestral à CGPLS', status: 'cumprida' },
        { txt: 'Apresentação: Painéis estatísticos (BI) elaborados pelo NE e estagiários', status: 'informativa' },
        { txt: 'APROVADO — Metas do PLS 2021', status: 'cumprida' }
      ]
      },
      {
        ano: '2020.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2019.0', num: 'Ata 06', titulo: '6ª Reunião CGPLS — 2019',
        data: 'ago/2019', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/atas/ata-no-06-2019-ngs/@@display-file/file/Ata%2520n%25C2%25BA%252006-2019%2520-%2520NGS.pdf',
        pauta: [
        'Reunião NSA e SCP: Gestão eficiente de resíduos sólidos na Sede, Fórum da capital e COJE'
      ],
        delib: [
        { txt: 'APROVADO — Mapeamento e redistribuição de coletores de coleta seletiva', status: 'informativa' },
        { txt: 'APROVADO — Remanejamento e levantamento de necessidades para o Fórum Eleitoral da capital', status: 'cumprida' },
        { txt: 'APROVADO — Remanejamento e levantamento de necessidades para o COJE', status: 'cumprida' },
        { txt: 'APROVADO — Remanejamento e levantamento de necessidades para a Sede', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 05', titulo: '5ª Reunião CGPLS — 2019',
        data: 'ago/2019', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/plano-de-logistica-sustentavel/arquivos/atas/ata-no-5-ngs/@@display-file/file/Ata%2520n%25C2%25BA%25205%2520ngs.pdf',
        pauta: [
        'Reunião NSA e SCP: Implementação da nova política de uso de copos descartáveis (Port. 216/2019-DG)'
      ],
        delib: [
        { txt: 'Início de vigência da Port. 216/2019-DG', status: 'informativa' },
        { txt: 'APROVADO — Unidades de guarda e distribuição de copos descartáveis', status: 'cumprida' },
        { txt: 'Controle mensal da distribuição e envio mensal de dados ao NSA', status: 'informativa' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 04', titulo: '4ª Reunião CGPLS — 2019',
        data: 'nov/2019', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/atas/ata-no-04-2019-cgpls/@@display-file/file/ATA%2520DE%2520REUNI%25C3%2583O%2520N%25C2%25BA%252004-2019%2520-%2520PLS.pdf',
        pauta: [
        'Retomada dos temas abordados na reunião anterior (indicadores jan a out/2019)'
      ],
        delib: [
        { txt: 'APROVADO — Meta de redução de copos descartáveis', status: 'cumprida' },
        { txt: 'APROVADO — Redução em 10% o consumo de água em 2020', status: 'cumprida' },
        { txt: 'APROVADO — Realização de estudo de viabilidade para implantação do táxigov no TRE', status: 'cumprida' },
        { txt: 'Publicação do PLS com planos de ação e metas', status: 'informativa' },
        { txt: 'APROVADO — Ajuste nas torneiras para redução da vazão de água', status: 'cumprida' },
        { txt: 'Apresentação: Minuta de portaria sobre as práticas de sustentabilidade apresentada pelo NSA', status: 'informativa' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 03', titulo: '3ª Reunião CGPLS — 2019',
        data: 'out/2019', duracao: '01:10:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/atas/ata-de-reuniao-03-2019-pls/@@display-file/file/ATA%2520DE%2520REUNI%25C3%2583O%252003-2019%2520-%2520PLS.pdf',
        pauta: [
        'Retomada dos temas abordados na reunião anterior (indicadores)'
      ],
        delib: [
        { txt: 'Expedição de memorando sobre redução de envio de papel (-30%)', status: 'informativa' },
        { txt: 'Envio de dados de impressões e redução de 30% no volume para o novembro', status: 'cumprida' },
        { txt: 'APROVADO — Ação de monitoramento das impresões', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 02', titulo: '2ª Reunião CGPLS — 2019',
        data: 'jun/2019', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/plano-de-logistica-sustentavel/arquivos/atas/ata-no-02-2019-pls-11-06-2019-pdf/@@display-file/file/ATA%2520DE%2520REUNI%25C3%2583O%2520N%25C2%25BA%252002-2019%2520-PLS.pdf',
        pauta: [
        'Discussão das pendências da ata anterior'
      ],
        delib: [
        { txt: 'APROVADO — Campanha de redução do uso de copos descartáveis', status: 'cumprida' },
        { txt: 'APROVADO — Minuta de comunicado DG sobre as mudanças de configurações das impressoras', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 01', titulo: '1ª Reunião CGPLS — 2019',
        data: 'mai/2019', duracao: '01:20:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/sustentabilidade/sustentabilidade/plano-de-logistica-sustentavel/arquivos/atas/1a-ata-reuniao-comissao-gestora-do-pls/@@display-file/file/1%25C2%25BA%2520Ata%2520-%2520Reuni%25C3%25A3o%2520Comit%25C3%25AA%2520Gestor%2520do%2520PLS.pdf',
        pauta: [
        'Apresentação do novo PLS 2019-2020'
      ],
        delib: [
        { txt: 'Direcionamento para apresentação de campanhas de consumo consciente na próxima reunião', status: 'cumprida' },
        { txt: 'Consulta aos cartórios eleitorais sobre copos para substituir os descartáveis', status: 'cumprida' },
        { txt: 'APROVADO — Levantamento de dados de impressões', status: 'cumprida' },
        { txt: 'Viabilização de dashboards de dados estatísticos de sustentabilidade', status: 'cumprida' }
      ]
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CGPLS — 2026', data: '2026-02-27',
        horario: '', duracao: null,
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Aprovação do Relatório de Desempenho 2025',
        'Definição do Plano de Ação PLS 2026',
        'Adoção do Protocolo de Crise Socioambiental (pendência)'
      ]
      },
      {
        titulo: '5ª Reunião CGPLS — 2025', data: '2025-12-10',
        horario: '10:00:00', duracao: '02:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Resultados parciais (out/2025)',
        'Propostas preliminares de metas e ações 2026',
        'Res. CNJ - Descarbonização e Protocolo de Crise Socioambiental'
      ]
      },
      {
        titulo: '4ª Reunião CGPLS — 2025', data: '2025-10-28',
        horario: '08:30:00', duracao: '01:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Acompanhamento do PA (unidades da SAOF)'
      ]
      },
      {
        titulo: '3ª Reunião CGPLS — 2025', data: '2025-09-26',
        horario: '09:30:00', duracao: '02:30:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Resultados do IDS 2024',
        'Monitoramento do PLS - Indicadores e ações',
        'Monitoramento do Programa Carbono Zero (Emissões de GEE)'
      ]
      },
      {
        titulo: '2ª Reunião CGPLS — 2025', data: '2025-03-27',
        horario: '16:00:00', duracao: '01:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Aprovação do PLS 2024-2025 - Versão 2.0',
        'Plano de Ação do PLS 2025',
        'Indicadores de Equidade e Diversidade e Justiça Carbono Zero'
      ]
      },
      {
        titulo: '1ª Reunião CGPLS — 2025', data: '2025-02-21',
        horario: '10:30:00', duracao: '02:30:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Aprovação do Relatório de Desempenho 2024',
        'Plano de Descarbonização 2025-2030',
        'Plano de Ação do PLS 2025'
      ]
      },
      {
        titulo: '4ª Reunião CGPLS — 2024', data: '2024-09-19',
        horario: '10:00:00', duracao: '02:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Análise dos indicadores críticos',
        'Prêmio CNJ de Qualidade 2025 e Ranking da Transparência 2025',
        'Balanço da Sustentabilidade'
      ]
      },
      {
        titulo: '3ª Reunião CGPLS — 2024', data: '2024-06-28',
        horario: '10:00:00', duracao: '02:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Balanço da Sustentabilidade 2023 e IDS (PLS 2024)',
        'Painel do GEE (Gases de efeito estufa)',
        'Atualização do Plano de Ação 2024'
      ]
      },
      {
        titulo: '2ª Reunião CGPLS — 2024', data: '2024-03-12',
        horario: '15:00:00', duracao: '01:30:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Avaliação e aprovação das ações do PLS 2024'
      ]
      },
      {
        titulo: '1ª Reunião CGPLS — 2024', data: '2024-02-21',
        horario: '16:00:00', duracao: '02:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Proposição de metas do PLS 2024 e 2025 e deliberações'
      ]
      },
      {
        titulo: '4ª Reunião CGPLS — 2023', data: '2023-11-28',
        horario: '14:30:00', duracao: '01:30:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Deliberações sobre para garrafas descartáveis, garrafões, ação solidária e estagiários (impacto no FTT)'
      ]
      },
      {
        titulo: '3ª Reunião CGPLS — 2023', data: '2023-05-22',
        horario: '16:00:00', duracao: '01:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Resultados parciais (janeiro a abril)',
        'BI do TRE-CE (resultado RN)',
        'Correspondência do IDS 2021 e PLS 2023',
        'Deliberações quanto aos indicadores críticos'
      ]
      },
      {
        titulo: '2ª Reunião CGPLS — 2023', data: '2023-04-04',
        horario: '15:00:00', duracao: '01:30:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Aprovação das metas do PLS 2023',
        'Deliberações principais quanto aos indicadores critícos'
      ]
      },
      {
        titulo: '1ª Reunião CGPLS — 2023', data: '2023-03-08',
        horario: '16:00:00', duracao: '02:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Validação do Relatório de Desempenho 2022',
        'Análise dos resultados de 2022',
        'Propostas de metas e ações para 2023'
      ]
      },
      {
        titulo: '1ª Reunião CGPLS — 2022', data: '2022-04-20',
        horario: '17:09:00', duracao: '00:21:00',
        local: 'Videoconferência',
        pauta: [
        'Apresentação dos indicadores do PLS'
      ]
      },
      {
        titulo: '4ª Reunião CGPLS — 2021', data: '2021-11-10',
        horario: '16:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Acompanhamento das metas 2021',
        'Definição de metas 2022 do PLS'
      ]
      },
      {
        titulo: '3ª Reunião CGPLS — 2021', data: '2021-08-10',
        horario: '16:00:00', duracao: '02:00:00',
        local: 'Videoconferência',
        pauta: [
        'Balanço da Sustentabilidade: indicadores, matriz de importância e pesos atribuídos',
        'Análise dos indicadores – 1º sem',
        'Análise das ações de 2021 – 1º sem'
      ]
      },
      {
        titulo: '2ª Reunião CGPLS — 2021', data: '2021-05-18',
        horario: '16:00:00', duracao: '02:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Apresentação do Plano de Logística Sustentável 2021-2022',
        'Aprovação do documento final',
        'Outras deliberações'
      ]
      },
      {
        titulo: '1ª Reunião CGPLS — 2021', data: '2021-04-05',
        horario: '14:20:00', duracao: '01:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Apresentação dos resultados 2020',
        'Análise de ações 2021',
        'Proposição e aprovação de metas 2021',
        'Outras deliberações'
      ]
      },
      {
        titulo: '4ª Reunião CGPLS — 2019', data: '2019-11-29',
        horario: '10:30:00', duracao: '01:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Retomada dos temas abordados na reunião anterior da CGPLS'
      ]
      },
      {
        titulo: '3ª Reunião CGPLS — 2019', data: '2019-10-11',
        horario: '10:30:00', duracao: '01:10:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Retomada dos temas abordados na reunião anterior da CGPLS'
      ]
      },
      {
        titulo: '2ª Reunião CGPLS — 2019', data: '2019-06-07',
        horario: '16:20:00', duracao: '01:00:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Retomada dos temas abordados na reunião anterior da CGPLS'
      ]
      },
      {
        titulo: '1ª Reunião CGPLS — 2019', data: '2019-05-03',
        horario: '09:10:00', duracao: '01:20:00',
        local: 'TRE-RN — Sala DG',
        pauta: [
        'Apresentação do novo PLS 2019-2020'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CACESS — Comissão Permanente de Acessibilidade e Inclusão
  ══════════════════════════════════════════════════ */
  {
    id: 'cacess',
    sigla: 'CACESS',
    nome: 'Comissão Permanente de Acessibilidade e Inclusão',
    area: 'Presidência',
    cor: '#5449c2',

    presidencia: { nome: 'Maria Ruth Bezerra Maia de Hollanda', setor: 'Asses. Gestão Estrat, Governança e Inovação' },
    secretaria: [
      { nome: 'Adriana Karla de Oliveira Ferreira Bezerra', setor: 'NAI — Núcleo de Acessibilidade e Inclusão' },
      { nome: 'André José Lins Leal', setor: 'NEAD / EJE' }
    ],
    membros_total: 11,
    periodicidade: 'Mensal',

    base_legal: { nome: 'Portaria nº 27/2025/PRES', link: null },

    genero: { fem: 7, masc: 4 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 401/2021', descricao: 'Diretrizes de acessibilidade e inclusão do Judiciário', link: 'https://atos.cnj.jus.br/atos/detalhar/3987' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 537/2023', descricao: 'Altera a Res. CNJ 401/2021', link: 'https://atos.cnj.jus.br/atos/detalhar/5385' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 549/2024', descricao: 'Altera as Res. nº 401/2021 e 512/2023', link: 'https://atos.cnj.jus.br/atos/detalhar/5498' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 561/2024', descricao: 'Altera as Res. nº 106/2010 e 401/202', link: 'https://atos.cnj.jus.br/atos/detalhar/5582' },
      { orgao: 'TSE', nome: 'Resolução TSE nº 23.381/2012', descricao: 'Programa de Acessibilidade da Justiça Eleitoral', link: 'https://www.tse.jus.br/legislacao/compilada/res/2012/resolucao-no-23-381-de-19-de-junho-de-2012' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 27/2025/PRES', descricao: 'Composição atual da CACESS', link: null, vigente: true }
    ],

    composicao: [
      { unidade: 'AGE', membro: 'Maria Ruth Bezerra Maia de Hollanda', obs: 'Presidente' },
      { unidade: 'Núcleo de Acessibilidade e Inclusão', membro: 'Adriana Karla de Oliveira Ferreira Bezerra', obs: 'Secretária' },
      { unidade: 'Asses. Gestão Estrat., Governança e Inovação', membro: 'Maria Ruth Bezerra Maia de Hollanda', obs: 'Presidente' },
      { unidade: 'Núcleo Socioambiental', membro: 'Evelyn Monique de Arruda Farias', obs: '' },
      { unidade: 'Seção de Engenharia', membro: 'Ronald José Amorim Fernandes', obs: '' },
      { unidade: 'Seção de Assist. Médica e Saúde Ocupacional', membro: 'Waldylécio Souza da Silva', obs: '' },
      { unidade: 'Seção de Seg. da Informação', membro: 'Helder Jean Brito da Silva', obs: '' },
      { unidade: 'Gabinete da PRES', membro: 'Maxelli Xavier de Andrade Rebouças', obs: '' },
      { unidade: '2ª Zona Eleitoral', membro: 'Sandra Regina da Silva Pegado', obs: '' },
      { unidade: 'Núcleo de Ensino a Distância/EJE', membro: 'André José Lins Leal', obs: '' },
      { unidade: 'Asses. Comunicação Social e Cerimonial', membro: 'Fernanda Gabriela Oliveira de Figueiredo Gomes', obs: '' },
      { unidade: 'Laboratório de Inovação Alzira Inova', membro: 'Juliana Vieira Costa de Aguiar', obs: '' }
    ],

    atas: [
      {
        ano: '2026', num: 'Ata 01', titulo: '1ª Reunião CACESS — 2026',
        data: 'mar/2026', duracao: '03:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/atas-cacess-2026/ata-1-2026-cacess/@@display-file/file/SEI_2479558_Ata_de_reuniao_1.pdf',
        pauta: [
        'Relatório de atividades 2025',
        'Planejamento preliminar das ações 2026'
      ],
        delib: [
        { txt: 'APROVADO — Ações preliminares propostas e prazo para os integrantes sugerirem novas ações', status: 'cumprida' }
      ]
      },
      {
        ano: '2025', num: 'Ata 01', titulo: '1ª Reunião CACESS — 2025',
        data: 'set/2025', duracao: '03:20:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/atas-cacess-2024-2025/ata-1_2025_cacess/@@display-file/file/SEI_2389877_Ata_de_reuniao_1.pdf',
        pauta: [
        'Balanço das ações realizadas em 2025 e encaminhamento das ações com pendências'
      ],
        delib: [
        { txt: 'Ações realizadas no 1º semestre', status: 'informativa' },
        { txt: 'APROVADO — Planejamento das ações do 2º semestre', status: 'cumprida' }
      ]
      },
      {
        ano: '2024', num: 'Ata 01', titulo: '1ª Reunião CACESS — 2024',
        data: 'fev/2024', duracao: '03:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/atas-cacess-2024-2025/ata-01_2024-cacess',
        pauta: [
        'Plano de ação 2024: direcionamentos',
        'Retomada do projeto avatar de acessibilidade (Alex)',
        'Inclusão de matérias no Giro',
        'Apresentação da campanha anual contra assédio e discriminação'
      ],
        delib: [
        { txt: 'APROVADO — Projeto do avatar ALEX como porta-voz da acessibilidade', status: 'cumprida' },
        { txt: 'APROVADO — Inclusão permanente de matérias no GIRO TRE-RN', status: 'cumprida' },
        { txt: 'APROVADO — Campanha anual contra os assédios e discriminação', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 01', titulo: '1ª Reunião CACESS — 2023',
        data: 'mar/2023', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/atas-da-cacess-2023/ata-cacess-2023-n-1/@@display-file/file/Ata%2520reuni%25C3%25A3o%2520CACESS%252001.23.pdf',
        pauta: [
        'Plano de comunicação da CACESS: eventos e ações',
        'Cartilha de linguagem de gênero (ASCOM)',
        'Manual de Atos Administrativos',
        'Cursos/trilha de acessibilidade',
        'Consultoria de acessibilidade física',
        'Atualização de cadastro PCD',
        'Ampliação do projeto Coordenador de Acessibilidade 2024'
      ],
        delib: [
        { txt: 'APROVADO — Calendário de eventos alusivos à acessibilidade', status: 'cumprida' },
        { txt: 'APROVADO — Verificação junto à ASCOM da publicação da cartilha de linguagem de gênero', status: 'cumprida' },
        { txt: 'APROVADO — Verificação do andamento da elaboração do Manual de Atos Administrativos', status: 'cumprida' },
        { txt: 'COMUNICADO — Inviabilidade técnica de uso de trilha de aprendizagem do TRE-CE', status: 'informativa' },
        { txt: 'Inclusão no orçamento 2024 de projetos executivos para acessibilidade física', status: 'informativa' },
        { txt: 'Dificuldades de atualização do cadastro de servidores PCD', status: 'informativa' },
        { txt: 'APROVADO — Ampliação do projeto Coordenador de Acessibilidade 2024, por adesão', status: 'cumprida' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 01', titulo: '1ª Reunião CACESS — 2021',
        data: 'jan/2021', duracao: '00:40:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/tre-rn-atas-reunioes-nai-cacess-2021/tre-rn-ata-nai-cacess-01-2021/@@display-file/file/Ata%2520de%2520reuni%25C3%25A3o%252001-2021%2520-%2520Comiss%25C3%25A3o%2520de%2520Acessibilidade%2520-%2520assinado%2520todos.pdf',
        pauta: [
        'Projeto Vamos Falar de Nós',
        'Homenagem a servidor cego pela condução do pleito (22ª ZE)',
        'Recomposição da comissão',
        'Contratação de tradutor de Libras'
      ],
        delib: [
        { txt: 'Projeto Vamos Falar de Nós: avaliação de novo formato e ampliação do escopo', status: 'cumprida' },
        { txt: 'APROVADO — Proposta de homenagem ao chefe de cartório da 22ª ZE (servidor PCD)', status: 'cumprida' },
        { txt: 'APROVADO — Recomposição da comissão', status: 'cumprida' },
        { txt: 'Contratação de tradutor de Libras: viabilidade contratual com aval da Presidência', status: 'informativa' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 02', titulo: '2ª Reunião CACESS — 2021',
        data: 'abr/2021', duracao: '01:20:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/tre-rn-atas-reunioes-nai-cacess-2021/tre-rn-ata-02-nai-cacess/@@display-file/file/Ata%2520de%2520reuni%25C3%25A3o%252002-2021%2520-%2520Comiss%25C3%25A3o%2520de%2520Acessibilidade-%2520NAI%2520-%2520assinado%2520juliana%2520-%2520Ata%2520de%2520reuni%25C3%25A3o%252002-2021%2520-%2520Comiss%25C3%25A3o%2520de%2520Acessibilidade-%2520TODO%2520MUNDO.pdf',
        pauta: [
        'Elaboração do Plano de Ação 2021'
      ],
        delib: [
        { txt: 'APROVADO — Diretrizes do Plano de Ação 2021', status: 'cumprida' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 03', titulo: '3ª Reunião CACESS — 2021',
        data: 'jul/2021', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/tre-rn-atas-reunioes-nai-cacess-2021/ata3-reuniao-cacess-2021/@@display-file/file/Ata%2520de%2520reuni%25C3%25A3o%252003-2021%2520-%2520Comiss%25C3%25A3o%2520de%2520Acessibilidade-%2520NAI.pdf',
        pauta: [
        'Discussão sobre viabilidade de aquisição de impressora em braille'
      ],
        delib: [
        { txt: 'APROVADO — Não aquisição de impressora Braille: análise custos x benefícios', status: 'cumprida' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 04', titulo: '4ª Reunião CACESS — 2021',
        data: 'jul/2021', duracao: '00:40:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/tre-rn-atas-reunioes-nai-cacess-2021/ata4-reuniao-cacess-2021/@@display-file/file/Ata%2520de%2520reuni%25C3%25A3o%252004-2021%2520-%2520Comiss%25C3%25A3o%2520de%2520Acessibilidade-%2520NAI%2520-%2520Ata%2520de%2520reuni%25C3%25A3o%252004-2021%2520-%2520Comiss%25C3%25A3o%2520de%2520Acessibilidade-%2520NAI%2520%2528assinada%2529.pdf',
        pauta: [
        'Apresentação dos integrantes ao novo presidente da CACESS',
        'Rediscussão sobre a impressora Braille',
        'Avaliação do projeto coordenador de acessibilidade para 2022',
        'Demanda de retirada de tapetes nas dependências da Sede'
      ],
        delib: [
        { txt: 'APROVADO — Articulação com Governo Estadual e prefeituras para adaptações nos locais de votação', status: 'cumprida' },
        { txt: 'APROVADO — Retomada do projeto Coordenador de Acessibilidade em 2022', status: 'cumprida' },
        { txt: 'APROVADO — Solicitação de parecer técnico do NSI sobre retirada dos tapetes', status: 'cumprida' }
      ]
      },
      {
        ano: '2020.0', num: 'Ata 01', titulo: '1ª Reunião CACESS — 2020',
        data: 'jun/2020', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/tre-rn-atas-reunioes-nai-cacess-2020/tre-rn-ata-01-reuniao-conjunta-cacess-e-nai/@@display-file/file/TRE-RN%2520Ata%2520de%2520reuni%25C3%25A3o%252001-2020%2520-%2520Comiss%25C3%25A3o%2520de%2520Acessibilidade-%2520NAI.pdf',
        pauta: [
        'Norma interna de acessibilidade',
        'Avaliação do site por PCD visual',
        'Deliberações sobre escopo do projeto Vamos Falar de Nós',
        'Novas turmas de Libras'
      ],
        delib: [
        { txt: 'APROVADO — Proposta de norma de atribuições do Núcleo de Acessibilidade e Inclusão (NAI)', status: 'cumprida' },
        { txt: 'APROVADO — Proposta do projeto Vamos Falar de Nós: sensibilização junto à PRES', status: 'cumprida' },
        { txt: 'APROVADO — Retomada da ação de retirada dos tapetes e obra de acessibilidade no estacionamento', status: 'cumprida' }
      ]
      },
      {
        ano: '2020.0', num: 'Ata 02', titulo: '2ª Reunião CACESS — 2020',
        data: 'jun/2020', duracao: '01:20:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/tre-rn-atas-reunioes-nai-cacess-2020/tre-rn-ata-02-reuniao-cacess-e-nai/@@display-file/file/TRE-RN%2520Ata%2520de%2520reuni%25C3%25A3o%252002-2020%2520-%2520Comiss%25C3%25A3o%2520de%2520Acessibilidade-%2520NAI.pdf',
        pauta: [
        'Acompanhamento das pendências de reuniões anteriores'
      ],
        delib: [
        { txt: 'Análise das pendências da reunião anterior', status: 'informativa' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 01', titulo: '1ª Reunião CACESS — 2019',
        data: 'fev/2019', duracao: '00:30:00', url: 'https://www.tre-rn.jus.br/institucional/planejamento-e-gestao-estrategica/arquivos/nucleo-de-acessibilidade/ata-no-1-comissao-acessibilidade-20-02-2019/@@display-file/file/Ata%2520n%25C2%25BA%25201%2520-%2520comissao-acessibilidade-%252020.02.2019.pdf',
        pauta: [
        'Aquisição de software e impressora Braille',
        'Discussão sobre retirada de tapetes de sinalização de extintores de incêndio',
        'Avaliação de viabilidade de pavimentação acessível no estacionamento de visitantes'
      ],
        delib: [
        { txt: 'APROVADO — Encaminhamentos: impressora Braille, retirada de tapetes e obra de acessibilidade no estacionamento', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 01', titulo: '2ª Reunião CACESS — 2019',
        data: 'jun/2019', duracao: '01:04:00', url: 'https://www.tre-rn.jus.br/institucional/planejamento-e-gestao-estrategica/arquivos/nucleo-de-acessibilidade/ata-2-2019-cacess-tre-rn/@@display-file/file/Ata%2520de%2520reuni%25C3%25A3o02-2019%2520-%2520CACESS.pdf',
        pauta: [
        'Minuta de norma de criação do Núcleo de Acessibilidade e Inclusão',
        'Inscrições para o curso de Libras',
        'Decisão administrativa de manutenção dos tapetes de sinalização de extintores',
        'Proposta de criação de escolas-modelo acessíveis'
      ],
        delib: [
        { txt: 'AJUSTES — Minuta da norma de criação do Núcleo de Acessibilidade e Inclusão (NAI)', status: 'cumprida' },
        { txt: 'COMUNICADO — Inviabilidade de retirada dos tapetes', status: 'informativa' }
      ]
      },
      {
        ano: '2018.0', num: 'Ata 01', titulo: '1ª Reunião CACESS — 2018',
        data: 'mar/2018', duracao: '01:10:00', url: 'https://www.tre-rn.jus.br/institucional/planejamento-e-gestao-estrategica/arquivos/nucleo-de-acessibilidade/reuniao-01-2018/@@display-file/file/Reuni%25C3%25A3o%252001-2018.pdf',
        pauta: [
        'Suplentes da comissão',
        'Curso EAD Libras',
        'Ações de divulgação/sensibilização',
        'Visita institucional à UFRN',
        'Inclusão de representante da ASCOM na comissão'
      ],
        delib: [
        { txt: 'APROVADO — Indicação de suplentes', status: 'cumprida' },
        { txt: 'APROVADO — Participação da ASCOM na comissão', status: 'cumprida' }
      ]
      },
      {
        ano: '2018.0', num: 'Ata 02', titulo: '2ª Reunião CACESS — 2018',
        data: 'abr/2018', duracao: '01:10:00', url: 'https://www.tre-rn.jus.br/institucional/planejamento-e-gestao-estrategica/arquivos/nucleo-de-acessibilidade/reuniao-02-2018/@@display-file/file/Reuni%25C3%25A3o%252002-2018.pdf',
        pauta: [
        'Produção de material institucional para sensibilização sobre deficiências'
      ],
        delib: [
        { txt: 'APROVADO — Conteúdo da campanha de sensibilização sobre o respeito às diferenças', status: 'cumprida' }
      ]
      },
      {
        ano: '2018.0', num: 'Ata 03', titulo: '3ª Reunião CACESS — 2018',
        data: 'abr/2018', duracao: '01:10:00', url: 'https://www.tre-rn.jus.br/institucional/planejamento-e-gestao-estrategica/arquivos/nucleo-de-acessibilidade/reuniao-03-2018/@@display-file/file/Reuni%25C3%25A3o%252003-2018.pdf',
        pauta: [
        'Spot para eleitor com deficiência',
        'Informações do indicador IA-5 (TSE/CNJ)'
      ],
        delib: [
        { txt: 'APROVADO — Representação na comissão e publicação por portarias', status: 'cumprida' }
      ]
      },
      {
        ano: '2018.0', num: 'Ata 04', titulo: '4ª Reunião CACESS — 2018',
        data: 'mai/2018', duracao: '01:10:00', url: 'https://www.tre-rn.jus.br/institucional/planejamento-e-gestao-estrategica/arquivos/nucleo-de-acessibilidade/reuniao-04-2018/@@display-file/file/Reuni%25C3%25A3o%252004-2018.pdf',
        pauta: [
        'Recursos de acessibilidade (fones e urnas para capacitação)',
        'Temas gerais: cursos Libras/Braille; lotação de PCD; divulgação interna de ações da CACESS'
      ],
        delib: [
        { txt: 'APROVADO — Disponibilização de fones de ouvido e urnas para capacitação de PCD', status: 'cumprida' }
      ]
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CACESS — 2026', data: '2026-03-11',
        horario: '08:15:00', duracao: '03:00:00',
        local: 'TRE-RN — Sala AGE',
        pauta: [
        'Relatório das atividades 2024',
        'Planejamento inicial das atividades 2025'
      ]
      },
      {
        titulo: '1ª Reunião CACESS — 2025', data: '2025-09-05',
        horario: '08:30:00', duracao: '03:20:00',
        local: 'TRE-RN — Sala AGE',
        pauta: [
        'Balanço das ações realizadas em 2025 e encaminhamento das ações com pendências'
      ]
      },
      {
        titulo: '1ª Reunião CACESS — 2024', data: '2024-02-09',
        horario: '08:30:00', duracao: '03:00:00',
        local: 'TRE-RN — Sala AGE',
        pauta: [
        'Plano de ação 2024: direcionamentos',
        'Retomada do projeto avatar de acessibilidade (Alex)',
        'Inclusão de matérias no Giro',
        'Apresentação da campanha anual contra assédio e discriminação'
      ]
      },
      {
        titulo: '1ª Reunião CACESS — 2023', data: '2023-03-17',
        horario: '08:30:00', duracao: '02:00:00',
        local: 'TRE-RN — Sala AGE',
        pauta: [
        'Plano de comunicação da CACESS: eventos e ações',
        'Cartilha de linguagem de gênero (ASCOM)',
        'Manual de Atos Administrativos',
        'Cursos/trilha de acessibilidade',
        'Consultoria de acessibilidade física',
        'Atualização de cadastro PCD',
        'Ampliação do projeto Coordenador de Acessibilidade 2024'
      ]
      },
      {
        titulo: '1ª Reunião CACESS — 2021', data: '2021-01-28',
        horario: '17:00:00', duracao: '00:40:00',
        local: 'Videoconferência',
        pauta: [
        'Projeto Vamos Falar de Nós',
        'Homenagem a servidor cego pela condução do pleito (22ª ZE)',
        'Recomposição da comissão',
        'Contratação de tradutor de Libras'
      ]
      },
      {
        titulo: '2ª Reunião CACESS — 2021', data: '2021-04-27',
        horario: '13:20:00', duracao: '01:20:00',
        local: 'Videoconferência',
        pauta: [
        'Elaboração do Plano de Ação 2021'
      ]
      },
      {
        titulo: '3ª Reunião CACESS — 2021', data: '2021-07-02',
        horario: '13:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Discussão sobre viabilidade de aquisição de impressora em braille'
      ]
      },
      {
        titulo: '4ª Reunião CACESS — 2021', data: '2021-07-19',
        horario: '10:00:00', duracao: '00:40:00',
        local: 'Videoconferência',
        pauta: [
        'Apresentação dos integrantes ao novo presidente da CACESS',
        'Rediscussão sobre a impressora Braille',
        'Avaliação do projeto coordenador de acessibilidade para 2022',
        'Demanda de retirada de tapetes nas dependências da Sede'
      ]
      },
      {
        titulo: '1ª Reunião CACESS — 2020', data: '2020-06-16',
        horario: '16:10:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Norma interna de acessibilidade',
        'Avaliação do site por PCD visual',
        'Deliberações sobre escopo do projeto Vamos Falar de Nós',
        'Novas turmas de Libras'
      ]
      },
      {
        titulo: '2ª Reunião CACESS — 2020', data: '2020-06-19',
        horario: '09:10:00', duracao: '01:20:00',
        local: 'Videoconferência',
        pauta: [
        'Acompanhamento das pendências de reuniões anteriores'
      ]
      },
      {
        titulo: '1ª Reunião CACESS — 2019', data: '2019-02-20',
        horario: '13:10:00', duracao: '00:30:00',
        local: 'TRE-RN — Sala dos Juízes',
        pauta: [
        'Aquisição de software e impressora Braille',
        'Discussão sobre retirada de tapetes de sinalização de extintores de incêndio',
        'Avaliação de viabilidade de pavimentação acessível no estacionamento de visitantes'
      ]
      },
      {
        titulo: '2ª Reunião CACESS — 2019', data: '2019-06-26',
        horario: '15:00:00', duracao: '01:04:00',
        local: 'TRE-RN — Sala dos Juízes',
        pauta: [
        'Minuta de norma de criação do Núcleo de Acessibilidade e Inclusão',
        'Inscrições para o curso de Libras',
        'Decisão administrativa de manutenção dos tapetes de sinalização de extintores',
        'Proposta de criação de escolas-modelo acessíveis'
      ]
      },
      {
        titulo: '1ª Reunião CACESS — 2018', data: '2018-03-21',
        horario: '12:30:00', duracao: '01:10:00',
        local: 'TRE-RN — Sala dos Juízes',
        pauta: [
        'Suplentes da comissão',
        'curso EAD Libras',
        'Ações de divulgação/sensibilização',
        'Visita institucional à UFRN',
        'Inclusão de representante da ASCOM na comissão'
      ]
      },
      {
        titulo: '2ª Reunião CACESS — 2018', data: '2018-04-04',
        horario: '12:30:00', duracao: '01:10:00',
        local: 'TRE-RN — Sala dos Juízes',
        pauta: [
        'Produção de material institucional para sensibilização sobre deficiências'
      ]
      },
      {
        titulo: '4ª Reunião CACESS — 2018', data: '2018-04-24',
        horario: '12:30:00', duracao: '01:10:00',
        local: 'TRE-RN — Sala dos Juízes',
        pauta: [
        'Spot para eleitor com deficiência',
        'Informações do indicador IA-5 (TSE/CNJ)'
      ]
      },
      {
        titulo: '4ª Reunião CACESS — 2018', data: '2018-05-10',
        horario: '12:30:00', duracao: '01:10:00',
        local: 'TRE-RN — Sala dos Juízes',
        pauta: [
        'Recursos de acessibilidade (fones e urnas para capacitação)',
        'Temas gerais: cursos Libras/Braille; lotação de PCD; divulgação interna de ações da CACESS'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CREG — Comissão de Regimento
  ══════════════════════════════════════════════════ */
  {
    id: 'creg',
    sigla: 'CREG',
    nome: 'Comissão de Regimento',
    area: 'Vice-Presidência / Corregedoria Regional Eleitoral',
    cor: '#0e7490',

    presidencia: { nome: 'Des. Ricardo Procópio Bandeira de Mello', setor: 'Vice-Presidência / Corregedoria' },
    secretaria: { nome: 'Não indicado', setor: 'Não indicado' },
    membros_total: 3,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'Portaria nº 26/2025/PRES', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2025/sei_tre-rn-0153745-portaria-pres-26-2025/@@display-file/file/SEI_TRE-RN%2520-%25200153745%2520-%2520Portaria%2520PRES%252026-2025.pdf' },

    genero: { fem: 1, masc: 2 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'TRE-RN', nome: 'Resolução TRE-RN nº 12/2019', descricao: 'Regimento Interno do TRE-RN', link: 'https://www.tre-rn.jus.br/legislacao/legislacao-compilada/resolucoes-do-tre-rn/resolucoes-por-ano/2012/resolucao-n-o-9-de-24-de-maio-de-2012' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 26/2025/PRES', descricao: 'Composição atual da CREG', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2025/sei_tre-rn-0153745-portaria-pres-26-2025/@@display-file/file/SEI_TRE-RN%2520-%25200153745%2520-%2520Portaria%2520PRES%252026-2025.pdf', vigente: true }
    ],

    composicao: [
      { unidade: 'Vice-Presidência / Corregedoria Regional Eleitoral', membro: 'Des. Ricardo Procópio Bandeira de Mello', obs: 'Presidente' },
      { unidade: 'Tribunal Pleno', membro: 'Juiz Marcello Rocha Lopes', obs: 'Membro' },
      { unidade: 'Tribunal Pleno', membro: 'Juíza Suely Maria Fernandes de Oliveira', obs: 'Membro' },
      { unidade: 'Tribunal Pleno', membro: 'Desa. Martha Danyelle Sant\'anna Costa Barbosa', obs: 'Membro substituta' }
    ],

    atas: [
      {
        ano: '2026.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025', num: 'Ata 01', titulo: '1ª Reunião CREG — 2025',
        data: 'mar/2025', duracao: '01:30', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/audiencias-e-sessoes-1/comissoes-permanentes/atas-da-comissao-de-regimento/ata-1-2025_comissao-de-regimento/@@display-file/file/comissa%25CC%2583o%2520Regimento%2520interno.pdf',
        pauta: [
        'Proposta de alteração do Regimento Interno (julgamento monocrático)'
      ],
        delib: [
        { txt: 'APROVADO — Estudo aprofundado pelos membros para rediscussão em nova reunião', status: 'cumprida' }
      ]
      },
      {
        ano: '2024', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2023.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2022.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2021.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2020.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2019.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2018.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2017.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2016.0', num: 'Ata 01', titulo: '1ª Reunião CREG — 2025',
        data: 'nov/2016', duracao: '01:45:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/audiencias-e-sessoes-1/comissoes-permanentes/atas-da-comissao-de-regimento/ata_1-2016-comissao-de-regimento/@@display-file/file/Ata%2520Reuniao%2520Comite%2520Regimento%2520-%25208-11-2016.pdf',
        pauta: [
        'Alteração do RITRERN para adequação à Res.TSE nº 23.493/2026 (mandatos e recondução)'
      ],
        delib: [
        { txt: 'APROVADO — Elaboração de minuta de alteração do Regimento para apreciação do Pleno', status: 'cumprida' }
      ]
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CREG — 2025', data: '2025-04-03',
        horario: '15:00:00', duracao: '01:00:00',
        local: 'TRE-RN — Sala da Vice-Presidência',
        pauta: [
        'Proposta de alteração do Regimento Interno (julgamento monocrático)'
      ]
      },
      {
        titulo: '1ª Reunião CREG — 2016', data: '2016-11-08',
        horario: '15:00:00', duracao: '01:45:00',
        local: 'TRE-RN — Sala da Vice-Presidência',
        pauta: [
        'Alteração do RITRERN para adequação à Res.TSE nº 23.493/2026 (mandatos e recondução)'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CJE — Comissão de Jurisprudência
  ══════════════════════════════════════════════════ */
  {
    id: 'cje',
    sigla: 'CJE',
    nome: 'Comissão de Jurisprudência',
    area: 'Juiz da Corte',
    cor: '#1a7a4a',

    presidencia: { nome: 'Juíza Suely Maria Fernandes de Oliveira', setor: 'Juiza do Tribunal Pleno' },
    secretaria: [
      { nome: 'Andréa Carla Guedes Toscano Campos', setor: 'Coordenadoria de Gestão da Informação/SJ' }
    ],
    membros_total: 3,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'Portaria nº 138/2025/PRES', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2025/tre-rn-portaria-138-2025-pres-2/@@display-file/file/PORTARIA%2520N%25C2%25BA%2520138-2025-PRES.pdf' },

    genero: { fem: 1, masc: 2 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'TRE-RN', nome: 'Resolução TRE-RN nº 12/2019', descricao: 'Regimento Interno do TRE-RN', link: 'https://www.tre-rn.jus.br/legislacao/legislacao-compilada/resolucoes-do-tre-rn/resolucoes-por-ano/2012/resolucao-n-o-9-de-24-de-maio-de-2012' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 138/2025/PRES', descricao: 'Composição atual da CJE', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2025/tre-rn-portaria-138-2025-pres-2/@@display-file/file/PORTARIA%2520N%25C2%25BA%2520138-2025-PRES.pdf', vigente: true }
    ],

    composicao: [
      { unidade: 'Tribunal Pleno', membro: 'Juíza Suely Maria Fernandes de Oliveira', obs: 'Presidente' },
      { unidade: 'Tribunal Pleno', membro: 'Juiz Eduardo Bezerra de Medeiros Pinheiro', obs: 'Membro' },
      { unidade: 'Tribunal Pleno', membro: 'Juiz Hallison Rêgo Bezerra', obs: 'Membro' },
      { unidade: 'Tribunal Pleno', membro: 'Juíza Francimar Dias de Araújo da Silva', obs: 'Membro substituta' }
    ],

    atas: [
      {
        ano: '2026', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 01', titulo: '1ª Reunião CJE — 2025',
        data: 'fev/2025', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/audiencias-e-sessoes-1/comissoes-permanentes/atas-da-comissao-de-jurisprudencia/ata-01_2025/@@display-file/file/Ata%252001_2025_Comiss%25C3%25A3o%2520de%2520Jurisprud%25C3%25AAncia.pdf',
        pauta: [
        'Apresentação do planejamento da CGI para a área de jurisprudência'
      ],
        delib: [
        { txt: 'APROVADO — Reformulação da revista eleitoral e consulta para novo nome', status: 'cumprida' },
        { txt: 'APROVADO — Revisão/criação de súmulas e inclusão na oficina do curso de prestação de contas', status: 'cumprida' },
        { txt: 'APROVADO — Criação de Banco de Decisões e Sentenças sobre Propaganda Eleitoral (1º Grau)', status: 'cumprida' },
        { txt: 'APROVADO — Ampliação da divulgação dos periódicos jurisprudenciais da SJL', status: 'cumprida' },
        { txt: 'APROVADO — Podcasts institucionais sobre julgados que impactam na sociedade', status: 'cumprida' },
        { txt: 'APROVADO — Adoção da Linguagem Simples no Informativo Eleitoral', status: 'cumprida' },
        { txt: 'APROVADO — Proposta de banco de dados colaborativo de julgados com palavras-chave e destaques por sessão', status: 'cumprida' }
      ]
      },
      {
        ano: '2024.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2023.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2022.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CJE — 2025', data: '2025-02-13',
        horario: '16:00:00', duracao: '01:30:00',
        local: 'TRE-RN — Sala de videoconferência',
        pauta: [
        'Apresentação do planejamento da CGI para a área de jurisprudência'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CPSI — Comissão Permanente de Segurança da Informação
  ══════════════════════════════════════════════════ */
  {
    id: 'cpsi',
    sigla: 'CPSI',
    nome: 'Comissão Permanente de Segurança da Informação',
    area: 'Secretaria de Tecnologia da Informação e Comunicação',
    cor: '#7c3aed',

    presidencia: { nome: 'Marcos Flávio Nascimento Maia', setor: 'Titular da STIE' },
    secretaria: { nome: 'Jussara de Góis Borba Melo Diniz', setor: 'Gabinete da STIE' },
    membros_total: 18,
    periodicidade: 'Mensal',

    base_legal: { nome: 'Portaria nº 55/2026/PRES', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2026/tre-rn-portaria-055-2026-pres/@@display-file/file/Portaria%2520055%25202026%2520PRES.pdf' },

    genero: { fem: 9, masc: 9 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 396/2021', descricao: 'Estratégia Nacional de Segurança Cibernética do PJ (ENSEC-PJ)', link: 'https://atos.cnj.jus.br/atos/detalhar/3975' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 55/2026/PRES', descricao: 'Composição atual da CPSI', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2026/tre-rn-portaria-055-2026-pres/@@display-file/file/Portaria%2520055%25202026%2520PRES.pdf', vigente: true },
      { nome: 'Portaria nº 21/2025/PRES', descricao: 'Nomina ocupantes de funções e investidura dos membros da CPSI', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2025/sei_tre-rn-0153072-portaria-pres-21-2025/@@display-file/file/SEI_TRE-RN%2520-%25200153072%2520-%2520Portaria%2520PRES%252021-2025.pdf', vigente: true }
    ],

    composicao: [
      { unidade: 'Presidência', membro: 'Sara Angélica Oliveira Cardoso', obs: '' },
      { unidade: 'Presidência', membro: 'Gabriela Domitildes da Silva Xavier', obs: '' },
      { unidade: 'Presidência', membro: 'Maria Ruth Bezerra Maia de Hollanda', obs: '' },
      { unidade: 'Presidência', membro: 'Yvette Bezerra Guerreiro Maia', obs: '' },
      { unidade: 'Corregedoria Regional Eleitoral', membro: 'Arnaud Diniz Flor Alves', obs: '' },
      { unidade: 'Diretoria-Geral', membro: 'Fernanda Araújo Cruz Barbosa', obs: '' },
      { unidade: 'Secretaria Judiciária', membro: 'Andréa Carla Guedes Toscano Campos', obs: '' },
      { unidade: 'Secretaria Administração, Orçamento e Finanças', membro: 'Nelson de Queiroz Oliveira', obs: '' },
      { unidade: 'Secretaria de Gestão de Pessoas', membro: 'Karla Ramos Donida', obs: '' },
      { unidade: 'Secretaria Tecnologia da Inform. e Eleições', membro: 'Marcos Flávio Nascimento Maia', obs: 'Presidente' },
      { unidade: 'Secretaria Tecnologia da Inform. e Eleições', membro: 'Carlos Magno do Rozário Câmara', obs: '' },
      { unidade: 'Secretaria Tecnologia da Inform. e Eleições', membro: 'Osmar Fernandes de Oliveira Júnior', obs: '' },
      { unidade: 'Secretaria Tecnologia da Inform. e Eleições', membro: 'Maria Teresa Farache Porto', obs: '' },
      { unidade: 'Secretaria Tecnologia da Inform. e Eleições', membro: 'Denilson Bastos da Silva', obs: '' },
      { unidade: 'Secretaria Tecnologia da Inform. e Eleições', membro: 'Francisco de Assis Paiva Leal', obs: '' },
      { unidade: 'Secretaria Tecnologia da Inform. e Eleições', membro: 'Daniel César Gurgel Coelho Ponte', obs: '' },
      { unidade: 'Secretaria Tecnologia da Inform. e Eleições', membro: 'José Wendell de Morais Silva', obs: '' },
      { unidade: 'Zonas Eleitorais', membro: 'Áurea Flaviana Oliveira da Silva', obs: '' }
    ],

    atas: [
      {
        ano: '2026', num: 'Ata 01', titulo: '1ª Reunião CPSI — 2026',
        data: 'mar/2026', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 01', titulo: '1ª Reunião CPSI — 2025',
        data: 'mai/2025', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-ata-cpsi-no012025/@@display-file/file/SEI_03468_2025%2520%25281%2529.pdf',
        pauta: [
        'Capacitações 2024',
        'Implantação de monitoramento da rede (DARK TRACE)'
      ],
        delib: [
        { txt: 'Panorama das ações de capacitação de 2024', status: 'informativa' },
        { txt: 'Aquisição e implantação da solução de monitoramento proativo de rede (Dark Trace)', status: 'informativa' },
        { txt: 'Aquisições conjuntas de soluções de cibersegurança para o ano de 2025', status: 'informativa' },
        { txt: 'Orçamento 2025 e 2026 - custeio do contrato com a Oracle', status: 'informativa' },
        { txt: 'Panorama da ENSEC-PJ e maturidade do TRE-RN', status: 'informativa' }
      ]
      },
      {
        ano: '2025.0', num: 'Ata 02', titulo: '2ª Reunião CPSI — 2025',
        data: 'ago/2025', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-ata-cpsi-no022025/@@display-file/file/SEI_2374109_Ata_de_reuniao_2.pdf',
        pauta: [
        'Planejamento Dia da Segurança 2025',
        'Benchmarking (TRE-PA)',
        'Revisão normativa (LGPD/Segurança da Informação)'
      ],
        delib: [
        { txt: 'Apresentação: Planejamento do Dia da Segurança 2025', status: 'informativa' },
        { txt: 'Apresentação: evento TRE-PA (II Cybersecurity Immersion Week)', status: 'informativa' },
        { txt: 'Proposta de revisão da norma de gestão de incidentes de segurança da informação com a LGPD', status: 'informativa' }
      ]
      },
      {
        ano: '2025.0', num: 'Ata 03', titulo: '3ª Reunião CPSI — 2025',
        data: 'set/2025', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-cpsi-ata03-2025/@@display-file/file/SEI_2391249_Ata_de_reuniao_3.pdf',
        pauta: [
        'Revisão de norma de gestão de incidentes',
        'Monitoramento 2025 e periodicidade das reuniões',
        'Evento de cibersegurança'
      ],
        delib: [
        { txt: 'APROVADO — Minuta da norma de Gestão de Incidentes', status: 'cumprida' },
        { txt: 'APROVADO — Periodicidade trimestral das reuniões da CPSI', status: 'cumprida' },
        { txt: 'APROVADO — Programa 4º Evento de Cibersegurança', status: 'cumprida' }
      ]
      },
      {
        ano: '2024.0', num: 'Ata 02', titulo: '1ª Reunião CPSI — 2024',
        data: 'mai/2024', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-ata-cpsi_02_2024/@@display-file/file/SEI_0041405_Ata_de_reuniao_2.pdf',
        pauta: [
        'Plano de trabalho anual',
        'Treinamento em segurança da informação',
        'Múltiplo Fator de Segurança (MFA)',
        'Evento de cibersegurança'
      ],
        delib: [
        { txt: 'Panorama analítico da segurança da informação', status: 'informativa' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 01', titulo: '1ª Reunião CPSI — 2023',
        data: 'jun/2023', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-ata-cpsi-01-2023-06-23-2023/@@display-file/file/ataFinalizadaReuniao-CPSI-1-2023%2520%25281%2529.pdf',
        pauta: [
        'Política de segurança (análise)',
        'Plano de trabalho anual',
        'Evento de cibersegurança',
        'Relatório de incidentes'
      ],
        delib: [
        { txt: 'Minuta da nova Política de Segurança da Informação', status: 'informativa' },
        { txt: 'Elaboração de projeto de evento sobre segurança da informação e cibernética no 2º semestre', status: 'informativa' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 02', titulo: '2ª Reunião CPSI — 2023',
        data: 'ago/2023', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-ata-cpsi-02-2023-16-08-2023/@@display-file/file/ataFinalizadaReuniao-CPSI-2-2023%2520%25281%2529%2520%25281%2529.pdf',
        pauta: [
        'Evento de cibersegurança (organização)',
        'Aprovação da PSI',
        'Propostas de normas complementares'
      ],
        delib: [
        { txt: 'APROVADO — Normas complementares à PSI atualizada (13)', status: 'cumprida' },
        { txt: 'APROVADO — Programação do 2º evento de cibersegurança', status: 'cumprida' }
      ]
      },
      {
        ano: '2022.0', num: 'Ata 01', titulo: '1ª Reunião CPSI — 2022',
        data: 'mai/2022', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-ata-reuniao-cpsi-n01-2022-09-05-2022/@@display-file/file/ataFinalizadaReuniao-CPSI-1-2022.pdf',
        pauta: [
        'Novos integrantes CPSI e Plano de ação anual',
        'Ampliação da divulgação dos informativos',
        'Divulgação de relatórios de incidentes'
      ],
        delib: [
        { txt: 'Ações realizadas em 2021', status: 'informativa' }
      ]
      },
      {
        ano: '2021.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2020.0', num: 'Ata 01', titulo: '1ª Reunião CPSI — 2021',
        data: 'mai/2021', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-ata-01-2021-cpsi-11-05-2021/@@display-file/file/Ata%252001%25202021%2520-%2520CPSI%2520-%252011.05.2021%2520Assinada.pdf',
        pauta: [
        'Planos de trabalho 2020/2021',
        'Indicador IA37 (resultado)',
        'Curso de segurança da informação e capacitação anual obrigatória',
        'Planos de ação de segurança cibernética',
        'Informativos Segurança em Foco'
      ],
        delib: [
        { txt: 'APROVADO — Plano de Ação 2021, com ajustes de 2020, e medição do indicador IA37', status: 'cumprida' },
        { txt: 'APROVADO — Inclusão de capacitação anual obrigatória', status: 'cumprida' }
      ]
      },
      {
        ano: '2020.0', num: 'Ata 02', titulo: '2ª Reunião CPSI — 2021',
        data: 'set/2021', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-ata-02-2021-cpsi-09-09-2021/@@display-file/file/Ata%2520002-2020%2520-%25202%25C2%25AA%2520Reuni%25C3%25A3o%2520CPSI%2520-%252009.09.2020%2520com%2520anexos_Falta%2520Renato%2520%25281%2529.pdf',
        pauta: [
        'Processos de segurança da informação (análise/revisão)',
        'PT Gestão de riscos da segurança da informação',
        'Análise de riscos de processos',
        'Conformidade da PSI (análise)',
        'Medidas de infraestrutura tecnológica para segurança da informação'
      ],
        delib: [
        { txt: 'APROVADO — Resultado da revisão de 03 processos instituídos em 2019', status: 'cumprida' },
        { txt: 'APROVADO — Fluxo: Gestão de Riscos da Segurança da Informação', status: 'cumprida' },
        { txt: 'Análise de riscos dos processos Atendimento ao PJe - Problemas Técnicos e Gerenciamento de Cópias de Segurança (backup) e de restauração de dados', status: 'informativa' },
        { txt: 'APROVADO — Riscos dos processos analisados', status: 'cumprida' },
        { txt: 'Conformidade da PSI no primeiro ano de vigência', status: 'informativa' },
        { txt: 'Panorama analítico da segurança da informação', status: 'informativa' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 01', titulo: '1ª Reunião CPSI — 2019',
        data: 'ago/2019', duracao: '01:20:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/ata-001-2019-1a-reuniao-cpsi-09-08-2019/@@display-file/file/Ata%2520001-2019%2520-%25201%25C2%25AA%2520Reuni%25C3%25A3o%2520CPSI-09.08.2019.pdf',
        pauta: [
        'Política de Segurança da Informação (minuta da norma e ajustes) e fluxo doprocesso de elaboração',
        'Normas complementares',
        'Indicador IA37 (ABNT ISO 271001/271002)',
        'Medição do indicador IA37 (PEJERN)'
      ],
        delib: [
        { txt: 'APROVADO — Minuta da PSI, fluxo do processo e plano de ação da CPSI após ajustes', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 02', titulo: '2ª Reunião CPSI — 2019',
        data: 'ago/2019', duracao: '00:53:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-ata-002-2019-2a-reuniao-cpsi-30-08-2019/@@display-file/file/Ata%2520002-2019-%25202%25C2%25AA%2520Reuni%25C3%25A3o%2520CPSI-30.08.2019.pdf',
        pauta: [
        'Fluxos de incidentes de segurança da informação e classificação da informação.'
      ],
        delib: [
        { txt: 'APROVADO — Fluxos: Gerenciamento de Incidentes de Segurança da Informação e Classificação da Informação, após ajustes', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 03', titulo: '3ª Reunião CPSI — 2019',
        data: 'nov/2019', duracao: '00:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-e-gestao-de-tic/sistema-de-gestao-da-seguranca-da-informacao/atas-cpsi/tre-rn-ata-n-03-2019-cpsi/@@display-file/file/Ata%2520n%25C2%25BA%252003-2019%2520-%2520CPSI%2520-%252025.11.2019.pdf',
        pauta: [
        'Plano de Ação da CPSI'
      ],
        delib: [
        { txt: 'APROVADO — Plano de Ação da CPSI e medição do indicador IA37', status: 'cumprida' }
      ]
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CPSI — 2026', data: '2026-03-26',
        horario: '09:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: []
      },
      {
        titulo: '1ª Reunião CPSI — 2025', data: '2025-05-23',
        horario: '09:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Capacitações 2024',
        'Implantação de monitoramento da rede (DARK TRACE)'
      ]
      },
      {
        titulo: '2ª Reunião CPSI — 2025', data: '2025-08-01',
        horario: '08:30:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Planejamento Dia da Segurança 2025',
        'Benchmarking (TRE-PA)',
        'Revisão normativa (LGPD/Segurança da Informação)'
      ]
      },
      {
        titulo: '3ª Reunião CPSI — 2025', data: '2025-09-10',
        horario: '11:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Revisão de norma de gestão de incidentes',
        'Monitoramento 2025 e periodicidade das reuniões',
        'Evento de cibersegurança'
      ]
      },
      {
        titulo: '1ª Reunião CPSI — 2024', data: '2024-05-17',
        horario: '09:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Plano de trabalho anual',
        'Treinamento em segurança da informação',
        'Múltiplo Fator de Segurança (MFA)',
        'Evento de cibersegurança'
      ]
      },
      {
        titulo: '1ª Reunião CPSI — 2023', data: '2023-06-23',
        horario: '13:30:00', duracao: '01:30:00',
        local: 'Videoconferência',
        pauta: [
        'Política de segurança (análise)',
        'Plano de trabalho anual',
        'Evento de cibersegurança',
        'Relatório de incidentes'
      ]
      },
      {
        titulo: '2ª Reunião CPSI — 2023', data: '2023-08-16',
        horario: '13:30:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Evento de cibersegurança (organização)',
        'Aprovação da PSI',
        'Propostas de normas complementares'
      ]
      },
      {
        titulo: '1ª Reunião CPSI — 2022', data: '2022-05-09',
        horario: '14:30:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Novos integrantes CPSI e Plano de ação anual',
        'Ampliação da divulgação dos informativos',
        'Divulgação de relatórios de incidentes'
      ]
      },
      {
        titulo: '1ª Reunião CPSI — 2020', data: '2020-05-11',
        horario: '16:30:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Planos de trabalho 2020/2021',
        'Indicador IA37 (resultado)',
        'Curso de segurança da informação e capacitação anual obrigatória',
        'Planos de ação de segurança cibernética',
        'Informativos Segurança em Foco'
      ]
      },
      {
        titulo: '2ª Reunião CPSI — 2020', data: '2020-09-09',
        horario: '13:30:00', duracao: '01:30:00',
        local: 'Videoconferência',
        pauta: [
        'Processos de segurança da informação (análise/revisão)',
        'PT Gestão de riscos da segurança da informação',
        'Análise de riscos de processos',
        'Conformidade da PSI (análise)',
        'Medidas de infraestrutura tecnológica para segurança da informação'
      ]
      },
      {
        titulo: '1ª Reunião CPSI — 2019', data: '2019-08-09',
        horario: '09:00:00', duracao: '01:20:00',
        local: 'TRE-RN — Sala de videoconferência',
        pauta: [
        'Política de Segurança da Informação (minuta da norma e ajustes) e fluxo doprocesso de elaboração',
        'Normas complementares',
        'Indicador IA37 (ABNT ISO 271001/271002).'
      ]
      },
      {
        titulo: '2ª Reunião CPSI — 2019', data: '2019-08-30',
        horario: '09:15:00', duracao: '00:53:00',
        local: 'TRE-RN — Sala VIP',
        pauta: [
        'Fluxos de incidentes de segurança da informação e classificação da informação'
      ]
      },
      {
        titulo: '3ª Reunião CPSI — 2019', data: '2019-11-25',
        horario: '13:30:00', duracao: '00:30:00',
        local: 'TRE-RN — Sala do STIE',
        pauta: [
        'Plano de ação da CPSI',
        'Medição do indicador IA37 (PEJERN)'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CPAD — Comissão Permanente de Avaliação de Documentos
  ══════════════════════════════════════════════════ */
  {
    id: 'cpad',
    sigla: 'CPAD',
    nome: 'Comissão Permanente de Avaliação de Documentos',
    area: 'Secretaria Judiciária',
    cor: '#92400e',

    presidencia: { nome: 'Juiz João Afonso Morais Pordeus', setor: 'Tribunal Pleno' },
    secretaria: { nome: 'Andréa Carla Guedes Toscano Campos', setor: 'Coordenadoria de Gestão da Informação/SJ' },
    membros_total: 8,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'Portaria nº 30/2025/PRES', link: 'https://sei.tre-rn.jus.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_visualizar&id_documento=168055&id_orgao_publicacao=0' },

    genero: null,
    etnia: null,

    normas_vinculadas: [
      { orgao: 'UNIÃO', nome: 'Decreto nº 10.148/2019', descricao: 'Dispõe sobre a CPAD e outras instâncias', link: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/d10148.htm' },
      { orgao: 'CNJ', nome: 'Resolução nº 324/2020', descricao: 'Gestão de Memória, Gestão Documental e Proname do Judiciário', link: 'https://atos.cnj.jus.br/atos/detalhar/3376' },
      { orgao: 'CNJ', nome: 'Resolução nº 403/2021', descricao: 'Altera a Res. nº 324/2020', link: 'https://atos.cnj.jus.br/atos/detalhar/4019' },
      { orgao: 'CNJ', nome: 'Resolução nº 469/2022', descricao: 'Altera a Res. nº 324/2020', link: 'https://atos.cnj.jus.br/atos/detalhar/4719' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 30/2025/PRES', descricao: 'Composição atual da CPAD', link: 'https://sei.tre-rn.jus.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_visualizar&id_documento=168055&id_orgao_publicacao=0', vigente: true }
    ],

    composicao: [
      { unidade: 'Tribunal Pleno', membro: 'Juiz João Afonso Morais Pordeus', obs: 'Presidente' },
      { unidade: 'Coordenadoria de Gestão da Informação', membro: 'Andréa Carla Guedes Toscano Campos', obs: 'Secretária' },
      { unidade: 'Seção de Documentação e Protocolo', membro: 'José Eduardo Raquel dos Santos', obs: '' },
      { unidade: 'Coordenadoria de Sistemas Corporativos', membro: 'Osmar Fernandes de Oliveira Júnior', obs: '' },
      { unidade: 'Núcleo de Biblioteca e Editoração', membro: 'Carlos José Tavares da Silva', obs: '' },
      { unidade: 'Gabinete da SAOF', membro: 'Maria Betânia Medeiros de Andrade', obs: '' },
      { unidade: 'Núcleo do Centro de Memória', membro: 'Ana Paula Vasconcelos do Amaral e Silva Araújo', obs: '' },
      { unidade: '44ª Zona Eleitoral', membro: 'Heloísa Helena Cunha Pinheiro de Souza', obs: '' }
    ],

    atas: [
      {
        ano: '2026', num: '—', titulo: 'Dados a confirmar',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 01', titulo: '1ª Reunião CPAD — 2025',
        data: 'fev/2025', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/gestao/gestao-documental/atas/2025/sei-01241_2025-ata-01/@@display-file/file/SEI%2520-%252001241_2025%2520-%2520Ata%252001.pdf',
        pauta: [
        'Análise de editais e listagens de eliminação documental (ZEs)',
        'Alteração TTD e PCD',
        'Plano de ação 2025 da CGI'
      ],
        delib: [
        { txt: 'AJUSTES — Listagem da 45ª ZE', status: 'cumprida' },
        { txt: 'APROVADO — Listagem e Edital 13ª (com ressalvas), 50ª, 32ª, 16ª, 68ª 44ª, 11ª e 27ª ZEs', status: 'cumprida' },
        { txt: 'APROVADO — Minuta de alteração da TTD e do PCD', status: 'cumprida' },
        { txt: 'APROVADO — Duas rotas anuais para coleta de documentos junto às ZEs do interior: divulgação e orientações', status: 'cumprida' },
        { txt: 'APROVADO — Roteiro para listagem de documentos para descarte pela ZEs', status: 'cumprida' },
        { txt: 'Projetos de gestão documental para 2025', status: 'informativa' }
      ]
      },
      {
        ano: '2025.0', num: 'Ata 02', titulo: '2ª Reunião CPAD — 2025',
        data: 'fev/2025', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/gestao/gestao-documental/atas/2025/sei-01241_2025-ata-02/@@display-file/file/SEI%2520-%252001241_2025%2520-%2520Ata%252002.pdf',
        pauta: [
        'Cronograma de atividades junto às unidades',
        'Roteiro de descarte de documentos 1º grau',
        'Rotas de recolhimento de documentos para descarte'
      ],
        delib: [
        { txt: 'APROVADO — Estrutura preliminar de planilha da TTD e PCD, inclusão de grau de sigilo e orientações às unidades', status: 'cumprida' },
        { txt: 'APROVADO — Roteiro de descarte de documentos no 1º grau, com ajuste propostos pela CPAD', status: 'cumprida' },
        { txt: 'APROVADO — Rota de recolhimento após a publicação dos editais pela ZEs', status: 'cumprida' }
      ]
      },
      {
        ano: '2025.0', num: 'Ata 03', titulo: '3ª Reunião CPAD — 2025',
        data: 'mar/2025', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/gestao/gestao-documental/atas/2025/sei-01241_2025-ata-03/@@display-file/file/SEI%2520-%252001241_2025%2520-%2520Ata%252003.pdf',
        pauta: [
        'Roteiro de descarte (ZEs)',
        'Validação de texto (IA)',
        'Calendário de reunião com unidades'
      ],
        delib: [
        { txt: 'APROVADO — Expedição de orientação da CPAD às ZEs sobre descarte de documentos', status: 'cumprida' },
        { txt: 'APROVADO — Mapeamento do processo de descarte, análise da IA para a elaboração de infográfico e finalização da minuta da norma', status: 'cumprida' },
        { txt: 'Verificação dos textos sugeridos do novo PCD', status: 'pendente' }
      ]
      },
      {
        ano: '2025.0', num: 'Ata 04', titulo: '4ª Reunião CPAD — 2025',
        data: 'mar/2025', duracao: '02:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/gestao/gestao-documental/atas/2025/sei-01241_2025-ata-04/@@display-file/file/SEI%2520-%252001241_2025%2520-%2520Ata%252004.pdf',
        pauta: [
        'Validação de texto (IA)',
        'Minuta sobre sigilo da informação',
        'TAP: mapeamento do processo de descarte de documentos e processos (1º grau)'
      ],
        delib: [
        { txt: 'APROVADO — Planilha da TTD e PCD', status: 'cumprida' },
        { txt: 'Publicação da Orientação 01/2025-CPAD no Boletim SEI', status: 'informativa' },
        { txt: 'APROVADO — Repositório de orientações na página da gestão documental', status: 'cumprida' },
        { txt: 'APROVADO — Inclusão de manual do processo de trabalho na norma de grau de sigilo', status: 'cumprida' },
        { txt: 'APROVADO — TAP do mapeamento do processo de descarte de documentos do 1º grau', status: 'cumprida' }
      ]
      },
      {
        ano: '2025.0', num: 'Ata 05', titulo: '5ª Reunião CPAD — 2025',
        data: 'mai/2025', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/gestao/gestao-documental/atas/2025/sei-01241_2025-ata-05/@@display-file/file/SEI%2520-%252001241_2025%2520-%2520Ata%252005.pdf',
        pauta: [
        'Análise de editais e listagens de eliminação documental (ZEs)',
        'Validação de dados (PCD/TTD)'
      ],
        delib: [
        { txt: 'APROVADO — Listagem e Edital 38ª, 41ª e 45ª ZEs (com correções e ressalvas)', status: 'cumprida' },
        { txt: 'APROVADO — Sugestões da AUDI, GABCRE, GAPSAOF e GAPSGP para a TTD e o PCD, exceto as conflitantes com o CNJ', status: 'cumprida' },
        { txt: 'Compartilhamento de sugetões da STIE e COELE', status: 'pendente' },
        { txt: 'Ajustes na planilha dos documentos do Centro de Memória', status: 'pendente' }
      ]
      },
      {
        ano: '2025.0', num: 'Ata 06', titulo: '6ª Reunião CPAD — 2025',
        data: 'mai/2025', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/gestao/gestao-documental/atas/2025/sei-01241_2025-ata-06/@@display-file/file/SEI%2520-%252001241_2025%2520-%2520Ata%252006.pdf',
        pauta: [
        'Reanálise de edital e listagem (45ª ZE)',
        'Conclusão da validação de dados (PCD/TTD)',
        'Normatização sobre sigilo da informação'
      ],
        delib: [
        { txt: 'APROVADO — Revisão dos anexos da norma atual e elaboração da minuta de nova resolução', status: 'cumprida' },
        { txt: 'APROVADO — Inclusão de prazo para elaboração do manual em Linguagem Simples (90 dias)', status: 'cumprida' },
        { txt: 'APROVADO — Consolidação a minuta da norma de sigilo à da LAI vigente', status: 'cumprida' }
      ]
      },
      {
        ano: '2025.0', num: 'Ata 07', titulo: '7ª Reunião CPAD — 2025',
        data: 'set/2025', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/gestao/gestao-documental/atas/2025/sei-01241_2025-ata-07/@@display-file/file/SEI%2520-%252001241_2025%2520-%2520Ata%252007.pdf',
        pauta: [
        'Análise de editais e listagens de eliminação documental (ZEs)',
        'Política de gestão documental e memória',
        'Minuta de norma de acesso à informação e sigilo'
      ],
        delib: [
        { txt: 'APROVADO — Minutas de modelos para os servidores dos cartórios eleitorais e orientações no 2º Momento SEI', status: 'cumprida' },
        { txt: 'APROVADO — Listagem e Edital 29ª, 9ª, 38ª e 33ª ZEs', status: 'cumprida' },
        { txt: 'APROVADO — Minutas de resolução: Políticas e Programas de Gestão Documental e da Memória', status: 'cumprida' },
        { txt: 'APROVADO — Minutas de resolução: Regulamentação da LAI e grau de sigilo após ajustes da CPAD', status: 'cumprida' },
        { txt: 'APROVADO — Criação no SEI de indicativo para documentos de valor histórico', status: 'cumprida' }
      ]
      },
      {
        ano: '2024.0', num: 'Ata 01', titulo: '1ª Reunião CPAD — 2024',
        data: 'abr/2024', duracao: '01:10:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/gestao/gestao-documental/atas/2024/sei_0025687_ata_de_reuniao_01_2024/@@display-file/file/SEI_0025687_Ata_de_reuniao_01_2024.pdf',
        pauta: [
        'Análise de edital e listagem de eliminação documental (54ª ZE)',
        'Organização dos trabalhos da comissão'
      ],
        delib: [
        { txt: 'Recomposição da comissão e ajustes na página da Gestão Documental no site', status: 'informativa' },
        { txt: 'APROVADO — Adequação da listagem enviada pela 54ª ZE e reenvio à CPAD para reanálise', status: 'cumprida' },
        { txt: 'APROVADO — Termos de Eliminação pela Coordenação da CPAD nos casos de documentos enviados pelas ZEs', status: 'cumprida' },
        { txt: 'Orientação aos cartórios para adoção do modelo do Anexo VII da norma', status: 'informativa' },
        { txt: 'Necessidade de atualização das normas de gestão documental com a implantação do SEI', status: 'informativa' }
      ]
      },
      {
        ano: '2024.0', num: 'Ata 02', titulo: '2ª Reunião CPAD — 2024',
        data: 'jun/2024', duracao: '00:08:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/gestao/gestao-documental/atas/2024/tre-rn-cpad_ata-de-reuniao-02_2024/@@display-file/file/TRE-RN%2520CPAD_Ata%2520de%2520reuni%25C3%25A3o%252002_2024%2520-%2520SEI_0054953.pdf',
        pauta: [
        'Análise de editais e listagens de eliminação documental (ZEs)',
        'Organização dos trabalhos da comissão'
      ],
        delib: [
        { txt: 'APROVADO — Editais e listagens: 30ª, 33ª, 34ª, 54ª, 58ª 69ª ZEs e Secretaria do TRE', status: 'cumprida' },
        { txt: 'Orientação aos cartórios para adoção do modelo do Anexo VII da norma', status: 'pendente' }
      ]
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CPAD — 2025', data: '2025-02-02',
        horario: '15:00:00', duracao: '02:00:00',
        local: 'TRE-RN — Sala de videoconferência',
        pauta: [
        'Análise de editais e listagens de eliminação documental (ZEs)',
        'Alteração TTD e PCD',
        'Plano de ação 2025 da CGI'
      ]
      },
      {
        titulo: '2ª Reunião CPAD — 2025', data: '2025-02-26',
        horario: '13:30:00', duracao: '01:30:00',
        local: 'TRE-RN — Sala de videoconferência',
        pauta: [
        'Cronograma de atividades junto às unidades',
        'Roteiro de descarte de documentos 1º grau',
        'Rotas de recolhimento de documentos para descarte'
      ]
      },
      {
        titulo: '3ª Reunião CPAD — 2025', data: '2025-03-11',
        horario: '14:00:00', duracao: '01:30:00',
        local: 'TRE-RN — Sala de videoconferência',
        pauta: [
        'Roteiro de descarte (Zes)',
        'Validação de texto (IA)',
        'Calendário de reunião com unidades'
      ]
      },
      {
        titulo: '4ª Reunião CPAD — 2025', data: '2025-03-21',
        horario: '09:00:00', duracao: '02:30:00',
        local: 'TRE-RN — Sala da CGI',
        pauta: [
        'Validação de texto (IA)',
        'Minuta sobre sigilo da informação',
        'TAP: mapeamento do processo de descarte de documentos e processos (1º grau)'
      ]
      },
      {
        titulo: '5ª Reunião CPAD — 2025', data: '2025-05-16',
        horario: '08:30:00', duracao: '01:30:00',
        local: 'TRE-RN — Sala da CGI',
        pauta: [
        'Análise de editais e listagens de eliminação documental (ZEs)',
        'Validação de dados (PCD/TTD)'
      ]
      },
      {
        titulo: '6ª Reunião CPAD — 2025', data: '2025-05-27',
        horario: '14:00:00', duracao: '02:00:00',
        local: 'TRE-RN — Sala da Juíza Auxiliar/PRES',
        pauta: [
        'Reanálise de edital e listagem (45ª ZE)',
        'Conclusão da validação de dados (PCD/TTD)',
        'Normatização sobre sigilo da informação'
      ]
      },
      {
        titulo: '7ª Reunião CPAD — 2025', data: '2025-09-04',
        horario: '09:00:00', duracao: '01:30:00',
        local: 'TRE-RN — Sala de videoconferência',
        pauta: [
        'Análise de editais e listagens de eliminação documental (ZEs)',
        'Política de gestão documental e memória',
        'Minuta de norma de acesso à informação e sigilo'
      ]
      },
      {
        titulo: '1ª Reunião CPAD — 2024', data: '2024-04-05',
        horario: '10:00:00', duracao: '01:10:00',
        local: 'Videoconferência',
        pauta: [
        'Análise de edital e listagem de eliminação documental (54ª ZE)',
        'Organização dos trabalhos da comissão'
      ]
      },
      {
        titulo: '2ª Reunião CPAD — 2024', data: '2024-06-28',
        horario: '10:08:00', duracao: '00:08:00',
        local: 'Videoconferência',
        pauta: [
        'Análise de editais e listagens de eliminação documental (ZEs)',
        'Organização dos trabalhos da comissão'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CPEGD — Comissão Permanente de Equidade, Gênero e Diversidade
  ══════════════════════════════════════════════════ */
  {
    id: 'cpegd',
    sigla: 'CPEGD',
    nome: 'Comissão Permanente de Equidade, Gênero e Diversidade',
    area: 'Presidência',
    cor: '#be185d',

    presidencia: { nome: 'A confirmar', setor: 'Presidência' },
    secretaria: { nome: 'A confirmar', setor: 'A confirmar' },
    membros_total: null,
    periodicidade: 'Mensal',

    base_legal: { nome: 'Portaria nº 245/2021/DG', link: null },

    genero: null,
    etnia: null,

    normas_vinculadas: [
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 255/2018', descricao: 'Política Nacional de Incentivo à Participação Institucional Feminina no PJ', link: 'https://atos.cnj.jus.br/atos/detalhar/2670' },
      { orgao: 'CNJ', nome: 'Pacto Nacional de Equidade Étnico-Racial e Diversidade', descricao: 'Diretrizes de Equidade, Gênero e Diversidade no Judiciário', link: 'https://www.cnj.jus.br/programas-e-acoes/direitos-humanos/pacto-nacional-do-judiciario-pela-equidade-racial/' }
    ],

    normas_designacao: [
      { nome: 'A confirmar', descricao: 'Aguardando links institucionais', link: null, vigente: true }
    ],

    composicao: [
      { unidade: 'Tribunal Pleno', membro: 'Juíza Francimar Dias de Araújo da Silva', obs: 'Presidência' },
      { unidade: 'Presidência (indicação)', membro: 'Juiz João Makson Bastos de Oliveira', obs: '' },
      { unidade: 'Asses. Comunicação Social e Cerimonial', membro: 'Sara Angélica Oliveira Cardoso', obs: '' },
      { unidade: 'Asses. Gestão Estrat., Governança e Inovação', membro: 'Maria Ruth Bezerra Maia de Hollanda', obs: '' },
      { unidade: 'Escola Judiciária Eleitoral', membro: 'Solon Rodrigues de Almeida Neto', obs: '' },
      { unidade: 'Com. Prev. e Enfrent. do Assédio e Discriminação', membro: 'Adriana Karla de Oliveira Ferreira Bezerra', obs: '' },
      { unidade: 'Com. Qualidade de Vida no Trabalho', membro: 'Sheila Maria Carvalho Bezerra de Araújo', obs: 'Secretária' },
      { unidade: 'Núcleo de Formação e Aperfeiçoamento', membro: 'Devânia de Figueiredo Araújo Varella', obs: '' }
    ],

    atas: [
      {
        ano: '2026', num: '—', titulo: 'Dados a confirmar',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2026.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      }
    ],

    proximas: []
  },

  /* ══════════════════════════════════════════════════
     CPGM — Comissão Permanente de Gestão da Memória
  ══════════════════════════════════════════════════ */
  {
    id: 'cpgm',
    sigla: 'CPGM',
    nome: 'Comissão Permanente de Gestão da Memória',
    area: 'Secretaria Judiciária',
    cor: '#065f46',

    presidencia: { nome: 'Ana Paula de Vasconcelos Amaral e Silva Araújo', setor: 'Núcleo do Centro de Memória/SJ' },
    secretaria: { nome: 'Não indicado', setor: 'Não indicado' },
    membros_total: 5,
    periodicidade: 'Não definida',

    base_legal: { nome: 'Portaria nº 245/2021/DG', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-diretoria-geral/portarias/2021/tre-rn-portaria-dg-2021-245-pdf/@@display-file/file/Portaria%2520n%25C2%25BA%2520245%25202021-Designa%2520servidores%2520para%2520a%2520Comiss%25C3%25A3o%2520Permanente%2520de%2520Gest%25C3%25A3o%2520da%2520Mem%25C3%25B3ria%2520-%2520CPGM.pdf' },

    genero: { fem: 3, masc: 3 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 324/2020', descricao: 'Gestão de Memória, Gestão Documental e Proname do Judiciário', link: 'https://atos.cnj.jus.br/atos/detalhar/3376' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 245/2021/DG', descricao: 'Institui a CPGM e a composição', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-diretoria-geral/portarias/2021/tre-rn-portaria-dg-2021-245-pdf/@@display-file/file/Portaria%2520n%25C2%25BA%2520245%25202021-Designa%2520servidores%2520para%2520a%2520Comiss%25C3%25A3o%2520Permanente%2520de%2520Gest%25C3%25A3o%2520da%2520Mem%25C3%25B3ria%2520-%2520CPGM.pdf', vigente: true }
    ],

    composicao: [
      { unidade: 'Núcleo do Centro de Memória', membro: 'Ana Paula Vasconcelos do Amaral e Silva Araújo', obs: 'Presidente' },
      { unidade: 'Núcleo de Biblioteca e Editoração', membro: 'Carlos José Tavares da Silva', obs: '' },
      { unidade: 'Seção de Documentação e Protocolo', membro: 'José Eduardo Raquel dos Santos', obs: '' },
      { unidade: 'Coordenadoria de Gestão da Informação', membro: 'Andréa Carla Guedes Toscano Campos', obs: '' },
      { unidade: 'Asses. Comunicação Social e Cerimonial', membro: 'Sara Angélica Oliveira Cardoso', obs: '' }
    ],

    atas: [
      {
        ano: '2021.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2022.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2023.0', num: 'Ata 01', titulo: '1ª Reunião CPGM — 2023',
        data: 'jul/2023', duracao: '01:13:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-da-gestao-da-memoria/arquivos_atas-da-cpm/ata-1-2023-cpgm-ass/@@display-file/file/ATA%25201.pdf',
        pauta: [
        'Evento de lançamento do Programa Selo Acervo Histórico: acervos, ações e comunicação',
        'Evento de lançamento do Programa Selo Acervo Histórico do TRE-RN'
      ],
        delib: []
      },
      {
        ano: '2023.0', num: 'Ata 02', titulo: '2ª Reunião CPGM — 2023',
        data: 'ago/2023', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-da-gestao-da-memoria/arquivos_atas-da-cpm/ata-2-202-cpgm-ass/@@display-file/file/ATA%25202.pdf',
        pauta: [
        'Organização do evento do Programa Selo Acervo Histórico',
        'Organização do evento do Programa Selo Acervo Histórico'
      ],
        delib: []
      },
      {
        ano: '2023.0', num: 'Ata 03', titulo: '3ª Reunião CPGM — 2023',
        data: 'set/2023', duracao: '01:45:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-da-gestao-da-memoria/arquivos_atas-da-cpm/ata-3-2023-cpgm-ass/@@display-file/file/ATA%25203.pdf',
        pauta: [
        'Organização do evento do Programa Selo Acervo Histórico',
        'Organização do evento do Programa Selo Acervo Histórico'
      ],
        delib: []
      },
      {
        ano: '2024.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 01', titulo: '1ª Reunião CPGM — 2025',
        data: 'set/2025', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-da-gestao-da-memoria/arquivos_atas-da-cpm/ata-1_2025/@@display-file/file/Ata%252001_2025_comiss%25C3%25A3o%2520mem%25C3%25B3ria.pdf',
        pauta: [
        'Ajustes do SEI para o Programa Selo acervo Histórico',
        'Ajustes do SEI para o Programa Selo acervo Histórico'
      ],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 02', titulo: '2ª Reunião CPGM — 2025',
        data: 'set/2025', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-da-gestao-da-memoria/arquivos_atas-da-cpm/ata-2_2025_memoria/@@display-file/file/ATA%252002_2025%2520CPGM.pdf',
        pauta: [
        'Apresentação da Reserva Técnica do NCEM',
        'Proposição de alteração da comissão',
        'Reserva Técnica do NCEM',
        'Alteração da comissão'
      ],
        delib: []
      },
      {
        ano: '2026', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CPGM — 2023', data: '2023-07-27',
        horario: '14:20:00', duracao: '01:13:00',
        local: 'TRE-RN — Centro de Memória',
        pauta: [
        'Evento de lançamento do Programa Selo Acervo Histórico do TRE-RN'
      ]
      },
      {
        titulo: '2ª Reunião CPGM — 2023', data: '2023-08-01',
        horario: '17:00:00', duracao: '01:30:00',
        local: 'TRE-RN — Centro de Memória',
        pauta: [
        'Organização do evento do Programa Selo Acervo Histórico'
      ]
      },
      {
        titulo: '3ª Reunião CPGM — 2023', data: '2023-09-08',
        horario: '15:00:00', duracao: '01:45:00',
        local: 'TRE-RN — Centro de Memória',
        pauta: [
        'Organização do evento do Programa Selo Acervo Histórico'
      ]
      },
      {
        titulo: '1ª Reunião CPGM — 2025', data: '2025-09-04',
        horario: '11:00:00', duracao: '01:00:00',
        local: 'TRE-RN — Sala de videoconferência',
        pauta: [
        'Ajustes do SEI para o Programa Selo acervo Histórico'
      ]
      },
      {
        titulo: '2ª Reunião CPGM — 2025', data: '2025-09-08',
        horario: '10:44:00', duracao: '01:30:00',
        local: 'TRE-RN — Centro de Memória',
        pauta: [
        'Reserva Técnica do NCEM'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CEDEM — Comissão Especial de Desfazimento de Materiais
  ══════════════════════════════════════════════════ */
  {
    id: 'cedem',
    sigla: 'CEDEM',
    nome: 'Comissão Especial de Desfazimento de Materiais',
    area: 'Secret. Administr, Orçamento e Finanças',
    cor: '#b45309',

    presidencia: { nome: 'José Jailson da Silva', setor: 'Coord. Gestão Patrim. Almoxarifado e Transporte' },
    secretaria: { nome: 'Não indicado', setor: 'Não indicado' },
    membros_total: 4,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'Portaria nº 93/2025/DG', link: 'https://sei.tre-rn.jus.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_visualizar&id_documento=1767093&id_orgao_publicacao=0' },

    genero: { fem: 2, masc: 2 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'UNIÃO', nome: 'Decreto nº 12.785/2025', descricao: 'Circularidade de bens móveis na Administração Pública Federal', link: 'https://www.planalto.gov.br/ccivil_03/_Ato2023-2026/2025/Decreto/D12785.htm#art23' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 93/2025/DG', descricao: 'Composição vigente da CEDEM', link: 'https://sei.tre-rn.jus.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_visualizar&id_documento=1767093&id_orgao_publicacao=0', vigente: true }
    ],

    composicao: [
      { unidade: 'Coord. Gestão Patrim. Almoxarifado e Transporte', membro: 'José Jailson da Silva', obs: 'Presidente' },
      { unidade: 'Seção de Gestão Patrimonial', membro: 'Andréa Karla Menezes Protásio', obs: '' },
      { unidade: 'Seção de Microinformática', membro: 'Dina Márcia de Vasconcelos Maranhão da Câmara', obs: '' },
      { unidade: 'Seção de Gestão de Materiais', membro: 'Carlos Monteiro Melo', obs: '' }
    ],

    atas: [
      {
        ano: '2026', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 01', titulo: '1ª Reunião CEDEM — 2025',
        data: 'fev/2025', duracao: '00:45:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/atas/2025/ata-1_2025-cedm/@@display-file/file/Ata_de_Reuniao_01-2025-CEDM_-_SEI_9288-23_assinado.pdf',
        pauta: [
        'Desfazimento de veículos: distribuição de bens e cronograma de entrega aos beneficiários'
      ],
        delib: [
        { txt: 'APROVADO — Desfazimento de veículos: análise, distribuição e entrega de bens com base nos preceitos legais (Decreto 9373/2018)', status: 'cumprida' }
      ]
      },
      {
        ano: '2025.0', num: 'Ata 02', titulo: '2ª Reunião CEDEM — 2025',
        data: 'abr/2025', duracao: '00:45:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/atas/2025/ata-2_cedm/@@display-file/file/Ata_de_Reuniao_02-2025-CEDM_-_SEI_10948-24_assinado_assinado-1.pdf',
        pauta: [
        'Desfazimento de veículos: distribuição de bens e cronograma de entrega aos beneficiários'
      ],
        delib: [
        { txt: 'APROVADO — Desfazimento de veículos: análise, distribuição e entrega de bens com base nos preceitos legais (Decreto 9373/2018)', status: 'cumprida' }
      ]
      },
      {
        ano: '2024.0', num: 'Ata 01', titulo: '1ª Reunião CEDEM — 2024',
        data: 'jan/2024', duracao: '00:20:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/atas/2024/ata-no-1-2024-reuniao-cedm/@@display-file/file/Ata_012024_-_PAE_92882023.pdf',
        pauta: [
        'Desistência de beneficiário e encaminhamentos decorrentes'
      ],
        delib: [
        { txt: 'APROVADO — Reinclusão de bens em novo edital por motivo de desistência de beneficiário', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 01', titulo: '1ª Reunião CEDEM — 2023',
        data: 'jul/2023', duracao: '00:15:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/atas/2023/ata-no-1-2023-reuniao-cedm/@@display-file/file/Ata_012023_-_PAE_112042020.pdf',
        pauta: [
        'Habilitações em editais de desfazimento'
      ],
        delib: [
        { txt: 'APROVADO — Doação de materiais à COOCAMAR via acordo de cooperação (PAE 11204/2020)', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 02', titulo: '2ª Reunião CEDEM — 2023',
        data: 'jul/2023', duracao: '00:15:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/atas/2023/ata-no-2-2023-reuniao-cedm/@@display-file/file/Ata_022023_-_PAE_45992021.pdf',
        pauta: [
        'Habilitações em editais de desfazimento'
      ],
        delib: [
        { txt: 'APROVADO — Distribuição de bens conforme edital (ordem de preferência) e transferência definitiva com base legal', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 03', titulo: '3ª Reunião CEDEM — 2023',
        data: 'dez/2023', duracao: '00:40:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/atas/2023/ata-no-3-2023-reuniao-cedm/@@display-file/file/Ata_032023_-_PAE_92882023.pdf',
        pauta: [
        'Destinação de materiais diversos'
      ],
        delib: [
        { txt: 'APROVADO — Transferência de bens conforme edital e critérios legais (órgão públicos da União)', status: 'cumprida' }
      ]
      },
      {
        ano: '2022.0', num: 'Ata 05', titulo: '5ª Reunião CEDEM — 2022',
        data: 'mar/2022', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/atas/2022/ata-no-05-2022-reuniao-com-saof/@@display-file/file/Ata%2520n%25C2%25BA%252005_2022%2520_%2520Reuniao%2520com%2520SAOF.pdf',
        pauta: [
        'Desfazimento de veículos e bens de TI (2ª etapa)',
        'Atualização no Portal da Transparência'
      ],
        delib: [
        { txt: 'Desfazimento de veículos (ajustes no edital, trâmite e fluxo do processo)', status: 'informativa' },
        { txt: 'APROVADO — Inclusões de melhorias na modelagem do processo de desfazimento', status: 'cumprida' },
        { txt: 'APROVADO — Prazo de mais 10 dias para resolução de pendência para desfazimento de bens de TI', status: 'cumprida' },
        { txt: 'APROVADO — Levantamento de bens no COJE para desfazimento, com destinação via acordo (IFRN) e descarte regular dos demais bens inservíveis', status: 'cumprida' },
        { txt: 'APROVADO — Sobrestamento do descarte de kits biométricos até ser definido pelo TSE', status: 'cumprida' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 17', titulo: '17ª Reunião CEDEM — 2021',
        data: 'out/2021', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/atas/2021/ata-no-17-2021-reuniao-com-a-cedm-22-10-2021/@@display-file/file/Ata%2520n%25C2%25BA%252017_2021%2520-%2520Reuni%25C3%25A3o%2520com%2520a%2520CEDM_22_10_2021.pdf',
        pauta: [
        'Desfazimento de materiais',
        'Doação de álcool em gel'
      ],
        delib: [
        { txt: 'Deliberações sobre PAEs (análise, encaminhamentos e prazos para desfazimento)', status: 'cumprida' },
        { txt: 'APROVADO — Alinhamento com a STIE para formatação de equipamentos de TIC (agilidade na tramitação)', status: 'cumprida' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 18', titulo: '18ª Reunião CEDEM — 2021',
        data: 'nov/2021', duracao: '00:35:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/atas/2021/ata-no-18-2021-reuniao-com-a-cedm-processos-de-desfazimento-de-bens-16-11-2021/@@display-file/file/Ata%2520n%25C2%25BA%252018_2021%2520-%2520Reuni%25C3%25A3o%2520com%2520a%2520CEDM%2520-%2520Processos%2520de%2520desfazimento%2520de%2520bens_16_11_2021.pdf',
        pauta: [
        'Desfazimento de materiais',
        'Atualização no Portal da Transparência',
        'Acesso a arquivos da comissão'
      ],
        delib: [
        { txt: 'Retirada dos bens doados ao IFRN pela instituição', status: 'informativa' },
        { txt: 'Desfazimento de veículos (edital, prazos, vistoria e trâmites)', status: 'informativa' },
        { txt: 'Direcionamento para agilidade na doação de álcool gel', status: 'cumprida' }
      ]
      },
      {
        ano: '2020.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2019.0', num: 'Ata 01', titulo: '1ª Reunião CEDEM — 2019',
        data: 'mar/2019', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/atas/2019/tre-rn-ata-de-reuniao-n-01-2019-cedm/@@display-file/file/TRE-RN-Ata%2520de%2520Reuni%25C3%25A3o%2520n%25C2%25B0%252001-CEDM.pdf',
        pauta: [
        'Habilitações em editais de desfazimento (veículos)'
      ],
        delib: [
        { txt: 'Priorização dos desfazimentos em trâmite: prazo 15/3', status: 'informativa' },
        { txt: 'Necessidade de maior publicidade nos próximos editais', status: 'informativa' },
        { txt: 'Solicitação adicionou de monitores pela Aeronáutica', status: 'informativa' },
        { txt: 'APROVADO — Alteração do Anexo I nos próximos editais', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 02', titulo: '2ª Reunião CEDEM — 2019',
        data: 'abr/2019', duracao: '02:30:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/editais/arquivos/2019/ata-de-reuniao-no-02-2019-cedm/@@display-file/file/Ata%2520de%2520Reuni%25C3%25A3o%2520n%25C2%25BA%252002-2019-CEDM.pdf',
        pauta: [
        'Análise de processos de desfazimento (veículos e TI)',
        'Distribuição de bens a órgãos externos'
      ],
        delib: [
        { txt: 'APROVADO — Indeferimento de solicitações por entidades não elegíveis (Decreto 9373/2018)', status: 'cumprida' },
        { txt: 'APROVADO — Distribuição de bens e sorteio entre habilitados conforme edital', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 03', titulo: '3ª Reunião CEDEM — 2019',
        data: 'set/2019', duracao: '00:45:00', url: 'https://www.tre-rn.jus.br/institucional/governanca-e-gestao/gestao-patrimonial/comissao-especial-desfazimento-materiais/editais/arquivos/ata-de-reuniao-no-03-cedm/@@display-file/file/Ata%2520de%2520Reuni%25C3%25A3o%2520N%25C2%25BA%252003%2520-%2520CEDM.pdf',
        pauta: [
        'Análise de processo de desfazimento (diversos e TI) para a Aeronáutica'
      ],
        delib: [
        { txt: 'APROVADO — Desfazimento de bens de TI, distribuição de bens conforme critérios e indeferimento de não habilitados', status: 'cumprida' },
        { txt: 'APROVADO — Novo edital para bens remanescentes, com prazo ampliado e inclusão de estados e municípios', status: 'cumprida' },
        { txt: 'APROVADO — Desclassificação de órgãos não elegíveis e priorização de órgãos da União (UFRN/IFRN)', status: 'cumprida' }
      ]
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CEDEM — 2025', data: '2025-02-24',
        horario: '17:30:00', duracao: '00:45:00',
        local: 'Videoconferência',
        pauta: [
        'Alteração da comissão'
      ]
      },
      {
        titulo: '2ª Reunião CEDEM — 2025', data: '2025-04-23',
        horario: '14:30:00', duracao: '00:45:00',
        local: 'Videoconferência',
        pauta: [
        'Desfazimento de veículos: distribuição de bens e cronograma de entrega aos beneficiários'
      ]
      },
      {
        titulo: '1ª Reunião CEDEM — 2024', data: '2024-01-09',
        horario: '15:00:00', duracao: '00:20:00',
        local: 'Videoconferência',
        pauta: [
        'Desistência de beneficiário e encaminhamentos decorrentes.'
      ]
      },
      {
        titulo: '1ª Reunião CEDEM — 2023', data: '2023-12-04',
        horario: '13:30:00', duracao: '00:15:00',
        local: 'Videoconferência',
        pauta: [
        'Habilitações em editais de desfazimento'
      ]
      },
      {
        titulo: '2ª Reunião CEDEM — 2023', data: '2023-07-18',
        horario: '16:15:00', duracao: '00:15:00',
        local: 'Videoconferência',
        pauta: [
        'Habilitações em editais de desfazimento'
      ]
      },
      {
        titulo: '3ª Reunião CEDEM — 2023', data: '2023-12-04',
        horario: '13:30:00', duracao: '00:40:00',
        local: 'Videoconferência',
        pauta: [
        'Destinação de materiais diversos'
      ]
      },
      {
        titulo: '5ª Reunião CEDEM — 2022', data: '2022-03-16',
        horario: '15:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Desfazimento de veículos e bens de TI (2ª etapa)',
        'Atualização no Portal da Transparência'
      ]
      },
      {
        titulo: '17ª Reunião CEDEM — 2021', data: '2021-10-21',
        horario: '08:30:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Desfazimento de materiais',
        'Doação de álcool em gel'
      ]
      },
      {
        titulo: '18ª Reunião CEDEM — 2021', data: '2021-11-16',
        horario: '17:30:00', duracao: '00:35:00',
        local: 'Videoconferência',
        pauta: [
        'Desfazimento de materiais',
        'Atualização no Portal da Transparência',
        'Acesso a arquivos da comissão.'
      ]
      },
      {
        titulo: '1ª Reunião CEDEM — 2019', data: '2019-03-08',
        horario: '10:30:00', duracao: '01:30:00',
        local: 'TRE-RN — Sala da SAOF',
        pauta: [
        'Habilitações em editais de desfazimento (veículos)'
      ]
      },
      {
        titulo: '2ª Reunião CEDEM — 2019', data: '2019-04-24',
        horario: '14:00:00', duracao: '02:30:00',
        local: 'TRE-RN — Sala da SAOF',
        pauta: [
        'Análise de processos de desfazimento (veículos e TI)',
        'Distribuição de bens a órgãos externos'
      ]
      },
      {
        titulo: '3ª Reunião CEDEM — 2019', data: '2019-09-03',
        horario: '17:30:00', duracao: '00:45:00',
        local: 'TRE-RN — Sala da SAOF',
        pauta: [
        'Análise de processo de desfazimento (diversos e TI) para a Aeronáutica'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CPET — Comissão Permanente de Ética
  ══════════════════════════════════════════════════ */
  {
    id: 'cpet',
    sigla: 'CPET',
    nome: 'Comissão Permanente de Ética',
    area: 'Secretaria de Gestão de Pessoas',
    cor: '#1e3a5f',

    presidencia: { nome: 'Lousianne Paskalle Solano Maia', setor: 'Seção de Análise Jurídica de Pessoal' },
    secretaria: { nome: 'Não indicado', setor: 'Não indicado' },
    membros_total: 3,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'Portaria nº 124/2025/PRES', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2025/portaria-no-124-2025-pres/@@display-file/file/PORTARIA%2520N%25C2%25BA%2520124-2025-PRES.pdf' },

    genero: { fem: 2, masc: 1 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'TRE-RN', nome: 'Resolução TRE-RN nº 153/2025', descricao: 'Código de Ética e Conduta do TRE-RN', link: 'https://www.tre-rn.jus.br/legislacao/compilada/resolucao/2025/resolucao-n-o-15-de-29-de-outubro-de-2025' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 124/2025/PRES', descricao: 'Composição vigente da CPET', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2025/portaria-no-124-2025-pres/@@display-file/file/PORTARIA%2520N%25C2%25BA%2520124-2025-PRES.pdf', vigente: true }
    ],

    composicao: [
      { unidade: 'Seção de Análise Jurídica de Pessoal', membro: 'Louisianne Paskalle Solano Maia', obs: 'Presidente' },
      { unidade: 'Seção de Análise de Contas Eleitorais e Partidárias', membro: 'Alexandra Maria Fernandes Rodrigues', obs: '' },
      { unidade: 'Seção de Editais e Contratos', membro: 'Hilmar Fernando Luciano de Azevedo', obs: '' }
    ],

    atas: [
      {
        ano: '2024.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 01', titulo: '1ª Reunião CPET — 2025',
        data: 'dez/2025', duracao: '00:30:00', url: 'https://drive.google.com/file/d/14bLRAJ08Fwcar6E49M6zgO1HAXKkd7-n/view',
        pauta: [
        'Funcionamento da CPET baseado no Programa de Integridade e no novo Código de Ética e Conduta'
      ],
        delib: []
      },
      {
        ano: '2026.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CPET — 2025', data: '2025-12-10',
        horario: '10:10:00', duracao: '00:30:00',
        local: 'TRE-RN — Sala da ASSINT',
        pauta: [
        'Funcionamento da CPET baseadono Programa de Integridade e no novo Código de Ética e Conduta'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CEAAD2 — Comissão de Enfrentamento ao Assédio Moral, Assédio Sexual e Discriminação 2º Grau
  ══════════════════════════════════════════════════ */
  {
    id: 'ceaad2',
    sigla: 'CEAAD2',
    nome: 'Comissão de Enfrentamento ao Assédio Moral, Assédio Sexual e Discriminação 2º Grau',
    area: 'Presidência',
    cor: '#7c2d12',

    presidencia: { nome: 'Juíza Aline Daniele Belém Cordeiro Lucas', setor: '54ª Zona Eleitoral' },
    secretaria: { nome: 'Adriana Karla de Oliveira Ferreira Bezerra', setor: 'Núcleo de Acessibilidade e Inclusão/AGE' },
    membros_total: 6,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'Portaria nº 89/2025/PRES', link: 'https://sei.tre-rn.jus.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_visualizar&id_documento=2612508&id_orgao_publicacao=0' },

    genero: { fem: 6, masc: 0 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 351/2020', descricao: 'Política de Prev. e Enfrent. do Assédio Moral, Sexual e da Discriminação', link: 'https://atos.cnj.jus.br/atos/detalhar/3557' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 413/2021', descricao: 'Altera a Res. 351/2020', link: 'https://atos.cnj.jus.br/atos/detalhar/4075' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 450/2022', descricao: 'Institui a Semana de Combate ao Assédio e Discriminação (agenda permanente)', link: 'https://atos.cnj.jus.br/atos/detalhar/4492' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 418/2023', descricao: 'Altera a Res. 351/2020', link: 'https://atos.cnj.jus.br/atos/detalhar/5242' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 538/2023', descricao: 'Altera a Res. 351/2020', link: 'https://atos.cnj.jus.br/atos/detalhar/5386' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 671/2026', descricao: 'Altera a Res. 351/2020', link: 'https://atos.cnj.jus.br/atos/detalhar/6717' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 89/2025/PRES', descricao: 'Composição atual da CEAAD1', link: 'https://sei.tre-rn.jus.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_visualizar&id_documento=2612508&id_orgao_publicacao=0', vigente: true }
    ],

    composicao: [
      { unidade: '54ª Zona Eleitoral', membro: 'Juíza Aline Daniele Belém Cordeiro Lucas', obs: 'Presidente' },
      { unidade: 'SINTRAJURN', membro: 'Anna Christina Pisco Rocha da Silva', obs: 'Membro' },
      { unidade: 'Núcleo de Acessibilidade e Inclusão', membro: 'Adriana Karla de Oliveira Ferreira Bezerra', obs: 'Secretária' },
      { unidade: 'Gabinete da PRES', membro: 'Maxelli Xavier de Andrade Rebouças', obs: 'Membro' },
      { unidade: 'Asses. Jurídico-Administrativa da Presidência', membro: 'Ana Paula Pinheiro Fonseca', obs: 'Membro' },
      { unidade: 'Empresa terceirizada', membro: 'Clarisse Silva da Costa', obs: 'Membro' }
    ],

    atas: [
      {
        ano: '2024.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 01', titulo: '1ª Reunião CEAAD1 — 2025',
        data: 'fev/2025', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/audiencias-e-sessoes-1/comissoes-permanentes/comissoes-de-enfrentamento-ao-assedio-moral-assedio-sexual-e-discriminacao/atas/tre-rn-ata-1-2025-reuniao-inaugural/@@display-file/file/tre-rn%2520ata%25201-2025%2520-%2520reuniao%2520inaugural.pdf',
        pauta: [
        'Plano de ações 2025: capacitação, campanha e pesquisa sobre assédio',
        'Avaliação de caso concreto de assédio (SIGILOSO)'
      ],
        delib: [
        { txt: 'APROVADO — Planejamento da Semana de Combate a Assédio (maio)', status: 'cumprida' },
        { txt: 'APROVADO — Plano de ações 2025 (capacitação, campanha e pesquisa) e reuniões periódicas de acompanhamento das ações', status: 'cumprida' }
      ]
      },
      {
        ano: '2025.0', num: 'Ata 01a', titulo: 'Avaliação de caso concreto (sigiloso)',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 02', titulo: 'Avaliação de caso concreto (sigiloso)',
        data: '—', duracao: null, url: null,
        pauta: [
        'Acolhimento de denúncia de situação de assédio moral (SIGILOSO)'
      ],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 03', titulo: 'Avaliação de caso concreto (sigiloso)',
        data: '—', duracao: null, url: null,
        pauta: [
        'Deliberações e encaminhamentos sobre denuncia de assédio (SIGILOSO)'
      ],
        delib: []
      },
      {
        ano: '2026.0', num: 'Ata 01', titulo: '1ª Reunião CEAAD1 — 2026',
        data: 'mar/2026', duracao: '01:25:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/audiencias-e-sessoes-1/comissoes-permanentes/comissoes-de-enfrentamento-ao-assedio-moral-assedio-sexual-e-discriminacao/atas/ata-1-2026/@@display-file/file/SEI_2482141_Ata_de_reuniao_1%2520%25282%2529.pdf',
        pauta: [
        'Apresentação do relatório de atividades 2025',
        'Planejamento das ações 2026'
      ],
        delib: []
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CEAAD2 — 2026', data: '2026-03-27',
        horario: '10:00:00', duracao: '01:25:00',
        local: 'Videoconferência',
        pauta: [
        'Relatório de ativdades 2025',
        'Planejamento da Semana de Combate ao Assédio e Discriminação (maio)'
      ]
      },
      {
        titulo: '1ª Reunião CEAAD2 — 2025', data: '2025-02-27',
        horario: '14:30:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Reunião inaugural',
        'Plano de ações 2025: capacitação, campanha e pesquisa sobre assédio',
        'Avaliação de caso concreto de assédio (SIGILOSO)'
      ]
      },
      {
        titulo: '2ª Reunião CEAAD2 — 2025', data: '',
        horario: '', duracao: null,
        local: 'Videoconferência',
        pauta: [
        'Acolhimento de denúncia de situação de assédio moral (SIGILOSO)'
      ]
      },
      {
        titulo: '3ª Reunião CEAAD2 — 2025', data: '2026-03-27',
        horario: '10:00:00', duracao: '01:25:00',
        local: 'Videoconferência',
        pauta: [
        'Deliberações e encaminhamentos sobre denuncia de assédio (SIGILOSO)'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CEADD1 — Comissão de Enfrentamento ao Assédio Moral, Assédio Sexual e Discriminação 1º Grau
  ══════════════════════════════════════════════════ */
  {
    id: 'ceaad1',
    sigla: 'CEADD1',
    nome: 'Comissão de Enfrentamento ao Assédio Moral, Assédio Sexual e Discriminação 1º Grau',
    area: 'Presidência',
    cor: '#b45309',

    presidencia: { nome: 'Juiz Daniel Cabral Mariz Maia', setor: 'Juiz do Tribunal Pleno' },
    secretaria: { nome: 'Adriana Karla de Oliveira Ferreira Bezerra', setor: 'Núcleo de Acessibilidade e Inclusão/AGE' },
    membros_total: 8,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'Portaria nº 91/2025/PRES', link: 'https://sei.tre-rn.jus.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_visualizar&id_documento=2612599&id_orgao_publicacao=0' },

    genero: { fem: 5, masc: 3 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 351/2020', descricao: 'Política de Prev. e Enfrent. do Assédio Moral, Sexual e da Discriminação', link: 'https://atos.cnj.jus.br/atos/detalhar/3557' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 413/2021', descricao: 'Altera a Res. 351/2020', link: 'https://atos.cnj.jus.br/atos/detalhar/4075' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 450/2022', descricao: 'Institui a Semana de Combate ao Assédio e Discriminação (agenda permanente)', link: 'https://atos.cnj.jus.br/atos/detalhar/4492' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 418/2023', descricao: 'Altera a Res. 351/2020', link: 'https://atos.cnj.jus.br/atos/detalhar/5242' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 538/2023', descricao: 'Altera a Res. 351/2020', link: 'https://atos.cnj.jus.br/atos/detalhar/5386' },
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 671/2026', descricao: 'Altera a Res. 351/2020', link: 'https://atos.cnj.jus.br/atos/detalhar/6717' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 91/2025/PRES', descricao: 'Composição atual da CEAAD2', link: 'https://sei.tre-rn.jus.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_visualizar&id_documento=2612599&id_orgao_publicacao=0', vigente: true },
      { nome: 'Portaria nº 50/2026/PRES', descricao: 'Altera a composição atual da CEAAD2', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2026/tre-rn-portaria-050-2026-pres/@@display-file/file/Portaria%2520050%25202026%2520PRES.pdf', vigente: true }
    ],

    composicao: [
      { unidade: 'Tribunal Pleno', membro: 'Juiz Daniel Cabral Mariz Maia', obs: 'Presidente' },
      { unidade: 'SINTRAJURN', membro: 'Antonio Klaus Vilas Boas de Souza Silva', obs: 'Membro' },
      { unidade: 'Núcleo Socioambiental', membro: 'Evelyn Monique de Arruda Farias', obs: 'Membro' },
      { unidade: 'Gabinete da PRES', membro: 'Maxelli Xavier de Andrade Rebouças', obs: 'Membro' },
      { unidade: 'Empresa terceirizada', membro: 'Gabriela de Araújo Souza', obs: 'Membro' },
      { unidade: 'Núcleo de Acessibilidade e Inclusão', membro: 'Adriana Karla de Oliveira Ferreira Bezerra', obs: 'Secretária' },
      { unidade: '', membro: 'Maximiano Foeppel Uchoa', obs: 'Membro' },
      { unidade: 'Gabinete da SGP', membro: 'Rejane Medeiros Kfouri', obs: 'Membro' }
    ],

    atas: [
      {
        ano: '2024.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: '—', titulo: 'Não houve reunião no período',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 01', titulo: '1ª Reunião CEAAD2 — 2026',
        data: 'mar/2026', duracao: '01:25:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/audiencias-e-sessoes-1/comissoes-permanentes/comissoes-de-enfrentamento-ao-assedio-moral-assedio-sexual-e-discriminacao/atas/ata-1-2026/@@display-file/file/SEI_2482141_Ata_de_reuniao_1%2520%25282%2529.pdf',
        pauta: [
        'Apresentação do relatório de atividades 2025',
        'Planejamento das ações 2026'
      ],
        delib: []
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CEAAD1 — 2026', data: '2025-02-27',
        horario: '14:30:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Relatório de ativdades 2025',
        'Planejamento da Semana de Combate ao Assédio e Discriminação (maio)'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CPFEM — Comissão de Participação Feminina
  ══════════════════════════════════════════════════ */
  {
    id: 'cpfem',
    sigla: 'CPFEM',
    nome: 'Comissão de Participação Feminina',
    area: 'Presidência',
    cor: '#1e3a5f',

    presidencia: { nome: 'Juíza Martha Danyelle Sant\'anna Costa Barbosa', setor: 'Juíza do Tribunal Pleno' },
    secretaria: { nome: 'Sara Angélica Oliveira Cardoso', setor: 'Asses. Comunicação Social e Cerimonial' },
    membros_total: null,
    periodicidade: 'Mensal',

    base_legal: { nome: 'Portaria nº 24/2025/PRES', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2025/sei_tre-rn-0153735-portaria-pres-24-2025/@@display-file/file/SEI_TRE-RN%2520-%25200153735%2520-%2520Portaria%2520PRES%252024-2025.pdf' },

    genero: { fem: 6, masc: 0 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'CNJ', nome: 'Resolução CNJ nº 255/2018', descricao: 'Política Nacional de Incentivo à Participação Institucional Feminina no PJ', link: 'https://atos.cnj.jus.br/atos/detalhar/2670' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 24/2025/PRES', descricao: 'Última composição da CPEM (incorporada à CPEGD)', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2025/sei_tre-rn-0153735-portaria-pres-24-2025/@@display-file/file/SEI_TRE-RN%2520-%25200153735%2520-%2520Portaria%2520PRES%252024-2025.pdf', vigente: false }
    ],

    composicao: [
      { unidade: 'Tribunal Pleno', membro: 'Juíza Martha Danielle Sant\'anna Costa Barbosa', obs: 'Presidente' },
      { unidade: 'Asses. Comunicação Social e Cerimonial', membro: 'Sara Angélica Oliveira Cardoso', obs: 'Secretária' },
      { unidade: 'Coord. Direitos Políticos e Cadastro Eleitoral/CRE', membro: 'Rossana Sheila Nóbrega Morais', obs: '' },
      { unidade: 'Diretoria-Geral', membro: 'Luciana Barbosa de Queiroz', obs: '' },
      { unidade: 'Escola Judiciária Eleitoral', membro: 'Andressa Castro de Araújo', obs: '' },
      { unidade: 'Zonas Eleitorais', membro: 'Rebeca de Almeida Medina Sales', obs: '' }
    ],

    atas: [
      {
        ano: '2026.0', num: 'Ata 01', titulo: 'Atividades encerradas (nova comissão: CPEGD)',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 01', titulo: '1ª Reunião CPFEM — 2025',
        data: 'fev/2025', duracao: '01:30:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/arquivos/sei_1999580_ata_de_reuniao_2/@@display-file/file/SEI_1999580_Ata_de_reuniao_2.pdf',
        pauta: [
        'Planejamento das ações 2025'
      ],
        delib: [
        { txt: 'APROVADO — Plano de Ação 2025: aula magna, roda de conversa, podcasts, audiências públicas, projeto com detentas de Mossoró e vídeos institucionais', status: 'cumprida' }
      ]
      },
      {
        ano: '2024.0', num: 'Ata 01', titulo: '1ª Reunião CPFEM — 2024',
        data: 'mar/2024', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/arquivos/sei_1734910_ata_de_reuniao_1/@@display-file/file/SEI_1734910_Ata_de_reuniao_1.pdf',
        pauta: [
        'Planejamento das ações 2024'
      ],
        delib: [
        { txt: 'APROVADO — Plano de Ação 2024: exposição, audiência pública, vídeos e mesa redonda', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 01', titulo: '1ª Reunião CPFEM — 2023',
        data: 'abr/2023', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2023/ata-1-2023/@@display-file/file/ataFinalizadaReuniao-ASCOM-1-2023.pdf',
        pauta: [
        'Planejamento das ações 2023'
      ],
        delib: [
        { txt: 'Discussão inicial para planejamento das ações 2023: apresentação de propostas', status: 'informativa' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 02', titulo: '2ª Reunião CPFEM — 2023',
        data: 'jun/2025', duracao: '00:50:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2023/ascom_ata_02_assinado-1-_assinado-assinado/@@display-file/file/ASCOM_Ata_02_assinado%255B1%255D_assinado-Assinado.pdf',
        pauta: [
        'Planejamento de ação sobre a presença da mulher negra no espaço político'
      ],
        delib: [
        { txt: 'APROVADO — Palestra com coletivo de mulheres com a participação da juíza Adriana Magalhães', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 03', titulo: '3ª Reunião CPFEM — 2023',
        data: 'jul/2023', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2023/ascom_ata_03_assinado-1-_assinado-assinado/@@display-file/file/ASCOM_Ata_03_assinado%255B1%255D_assinado-Assinado.pdf',
        pauta: [
        'Resposta à AUDI: Ação coordenada de auditoria sobre a política contra assédio e discriminação do PJ'
      ],
        delib: [
        { txt: 'Resposta ao questionário AUDI: ação coordenada de auditoria sobre o assédio e discriminação no PJ', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 04', titulo: '4ª Reunião CPFEM — 2023',
        data: 'ago/2023', duracao: '01:10:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2023/ascom_ata_04_assinado-1-_assinado-assinado/@@display-file/file/ASCOM_Ata_04_assinado%255B1%255D_assinado-Assinado.pdf',
        pauta: [
        'Planejamento de ação na Comunidade Indígena do Amarelão'
      ],
        delib: [
        { txt: 'APROVADO — Encaminhamentos para atuação da CPFEM do evento no Amarelão', status: 'cumprida' }
      ]
      },
      {
        ano: '2023.0', num: 'Ata 05', titulo: '5ª Reunião CPFEM — 2023',
        data: 'set/2023', duracao: '00:30:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2023/ascom_ata_05_assinado-1-_assinado-assinado/@@display-file/file/ASCOM_Ata_05_assinado%255B1%255D_assinado-Assinado.pdf',
        pauta: [
        'Calendário de evento na Comunidade Indígena do Amarelão'
      ],
        delib: [
        { txt: 'APROVADO — Encaminhamentos para a realização do evento no Amarelão', status: 'cumprida' }
      ]
      },
      {
        ano: '2022.0', num: 'Ata 01', titulo: '1ª Reunião CPFEM — 2022',
        data: 'mar/2022', duracao: '00:50:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2022/ascom-ata-01/@@display-file/file/ASCOM%2520Ata%252001.pdf',
        pauta: [
        'Alinhamento de atividades e metas para 2022'
      ],
        delib: [
        { txt: 'APROVADO — Integração com a EJE em pautas comuns relacionados à participação feminina', status: 'cumprida' }
      ]
      },
      {
        ano: '2022.0', num: 'Ata 02', titulo: '2ª Reunião CPFEM — 2022',
        data: 'abr/2022', duracao: '00:50:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2022/ascom-ata-02/@@display-file/file/ASCOM%2520Ata%252002.pdf',
        pauta: [
        'Planejamento das ações 2022'
      ],
        delib: [
        { txt: 'APROVADO — Ações anuais: lançamento de livro da juíza Adriana Magalhães; evento conjunto com ABMCJ; exposição fotográfica "A mulher e a política"', status: 'cumprida' }
      ]
      },
      {
        ano: '2022.0', num: 'Ata 03', titulo: '3ª Reunião CPFEM — 2022',
        data: 'abr/2022', duracao: '00:50:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2022/ascom-ata-03/@@display-file/file/ASCOM%2520Ata%252003.pdf',
        pauta: [
        'Ajustes da ação conjunta com a ABMCJ'
      ],
        delib: [
        { txt: 'Reunião de alinhamento do evento conjunto com a ABMCJ', status: 'informativa' }
      ]
      },
      {
        ano: '2022.0', num: 'Ata 04', titulo: '4ª Reunião CPFEM — 2022',
        data: 'nov/2022', duracao: '01:40:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2022/ata-04-2022-_participacao-feminina-retomada-dos-trabalhos-em-2022/@@display-file/file/Ata%252004-2022%2520_Participa%25C3%25A7%25C3%25A3o%2520feminina%2520-%2520retomada%2520dos%2520trabalhos%2520em%25202022_%2520_1_.pdf',
        pauta: [
        'Diretrizes para o plano de ação 2022/2023'
      ],
        delib: [
        { txt: 'Retomada dos trabalhos da CPFEM com nova composição: novas propostas de ações', status: 'informativa' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 01', titulo: '1ª Reunião CPFEM — 2021',
        data: 'jan/2021', duracao: '01:10:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2021/ata-no-01-2021-planejamento-acoes-2021/@@display-file/file/TRE-RN-ata-01-2021-planejamento-acoes-2021.pdf',
        pauta: [
        'Ajustes na ação [LIVE] A Balança da Justiça: relatos de conquistas femininas no judiciário eleitoral potiguar'
      ],
        delib: [
        { txt: 'Indicação de propostas iniciais de ações para o ano', status: 'informativa' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 02', titulo: '2ª Reunião CPFEM — 2021',
        data: 'fev/2021', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2021/ata-no-2-2021-planejamento-de-acoes-ii/@@display-file/file/TRE-RN-ata-02-2021-planejar-acoes-2021-b.pdf',
        pauta: [
        'Ajustes das atividades e metas da comissão para 2021'
      ],
        delib: [
        { txt: 'APROVADO — Logomarca da CPFEM', status: 'cumprida' },
        { txt: 'APROVADO — Evento híbrido para comemoração do Dia da Mulher', status: 'cumprida' },
        { txt: 'Projeto de eventos apresentados pelo servidor Reivaldo Vinas', status: 'informativa' }
      ]
      },
      {
        ano: '2021.0', num: 'Ata 06', titulo: '6ª Reunião CPFEM — 2021',
        data: 'out/2021', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2020/ata-06-2020-planejamento-3o-quadrimestre/@@display-file/file/TRE-RN-ata-06-2020-planejamento-3%25C2%25BA%2520quadrimestre.pdf',
        pauta: [
        'Análise de proposta de Plano de Ação'
      ],
        delib: [
        { txt: 'APROVADO — Ajustes das ações planejadas e reforço para delegação de atividades entre os membros', status: 'cumprida' }
      ]
      },
      {
        ano: '2020.0', num: 'Ata 01', titulo: '1ª Reunião CPFEM — 2020',
        data: 'fev/2020', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2020/ata-no-01-2020-reuniao-inicial-1636058125053/@@display-file/file/TRE-RN-ata-01-2020-reuni%25C3%25A3o-inicial.pdf',
        pauta: [
        'Reunião inicial do ano'
      ],
        delib: [
        { txt: 'Retomada dos trabalhos da comissão com programação sugerida de eventos', status: 'informativa' }
      ]
      },
      {
        ano: '2020.0', num: 'Ata 02', titulo: '2ª Reunião CPFEM — 2020',
        data: 'fev/2020', duracao: '00:55:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2020/ata-no-02-2020-validacao-e-detalhamento-de-acoes/@@display-file/file/TRE-RN-ata-02-2020-validacao-e-detalhamento-de-acoes.pdf',
        pauta: [
        'Detalhamento de ações para 2020'
      ],
        delib: [
        { txt: 'Encaminhamentos das ações programadas', status: 'cumprida' },
        { txt: 'APROVADO — Data do evento I Roda de Mulheres 2020', status: 'cumprida' }
      ]
      },
      {
        ano: '2020.0', num: 'Ata 03', titulo: '3ª Reunião CPFEM — 2020',
        data: 'abr/2020', duracao: '02:00:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2020/ata-no-03-2020-validacao-de-plano-de-trabalho/@@display-file/file/TRE-RN-ata-03-2021-apresenta%25C3%25A7%25C3%25A3o-de-equipe-e-planejamentos.PDF',
        pauta: [],
        delib: [
        { txt: 'Apresentação: Plano de trabalho do ano à nova presidente da comissão', status: 'informativa' }
      ]
      },
      {
        ano: '2020.0', num: 'Ata 04', titulo: '4ª Reunião CPFEM — 2020',
        data: 'jul/2020', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2020/ata-04-2020-plano-de-trabalho/@@display-file/file/TRE-RN-ata-%252004-2020-novas-acoes-2020-plano-de-trabalho.pdf',
        pauta: [
        'Adequação do plano de trabalho 2020 (pandemia COVID-19)'
      ],
        delib: [
        { txt: 'Adequação do plano de ação para realização de eventos virtuais', status: 'informativa' },
        { txt: 'APROVADO — Evento virtual I Café com Mulheres: cordelistas potiguares', status: 'cumprida' }
      ]
      },
      {
        ano: '2020.0', num: 'Ata 05', titulo: '5ª Reunião CPFEM — 2020',
        data: 'ago/2020', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2020/ata-no-05-2020-validacao-do-relatorio-do-cnj/@@display-file/file/TRE-RN-ata-05-2020-valida%25C3%25A7%25C3%25A3o-relat%25C3%25B3rio-do-cnj.pdf',
        pauta: [
        'Relatório do CNJ'
      ],
        delib: [
        { txt: 'APROVADO — Relatório de atividades da CPFEM para o CNJ', status: 'cumprida' }
      ]
      },
      {
        ano: '2020.0', num: 'Ata 06', titulo: '6ª Reunião CPFEM — 2020',
        data: 'out/2020', duracao: '01:00:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2020/ata-no-06-2020-planejamento-3o-quadrimestre/@@display-file/file/TRE-RN-ata-06-2020-planejamento-3%25C2%25BA%2520quadrimestreok.pdf',
        pauta: [
        'Planejamento 3º quadrimestre 2020'
      ],
        delib: [
        { txt: 'APROVADO — Ações para o período: exposição, audioaula, chatbot Celina e webinar Roda de Conversa', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 01', titulo: '1ª Reunião CPFEM — 2019',
        data: 'jul/2019', duracao: '01:10:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2019/ata-01-2019-reuniao-inicial-definicao-de-acoes-pdf/@@display-file/file/Ata%252001-2019%2520%2528reuni%25C3%25A3o%2520inicial%2520-%2520defini%25C3%25A7%25C3%25A3o%2520de%2520a%25C3%25A7%25C3%25B5es%2529.pdf',
        pauta: [
        'Reunião inicial do ano: definição de ações'
      ],
        delib: [
        { txt: 'APROVADO — Proposição de novas ações para realização até final de agosto, incluindo a Roda das Mulheres', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 02', titulo: '2ª Reunião CPFEM — 2019',
        data: 'ago/2019', duracao: '01:15:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2019/ata-02-2019-programacao-roda-de-mulheres-pdf/@@display-file/file/Ata%252002-2019%2520%2528programa%25C3%25A7%25C3%25A3o%2520-%2520Roda%2520de%2520Mulheres%2529.pdf',
        pauta: [
        'Programação de evento do ano: Roda de Mulheres'
      ],
        delib: [
        { txt: 'APROVADO — Programação da Roda das Mulheres e periodicidade de reuniões', status: 'cumprida' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 03', titulo: '3ª Reunião CPFEM — 2019',
        data: 'ago/2019', duracao: '01:10:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2019/ata-03-2019-programacao-roda-de-mulheres-pdf/@@display-file/file/Ata%252003-2019%2520%2528programa%25C3%25A7%25C3%25A3o%2520-%2520Roda%2520de%2520Mulheres%2529.pdf',
        pauta: [
        'Organização do evento  Roda de Mulheres (continuação)'
      ],
        delib: [
        { txt: 'Organização do evento Roda das Mulheres', status: 'informativa' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 04', titulo: '4ª Reunião CPFEM — 2019',
        data: 'ago/2019', duracao: '00:25:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2019/ata-04-2019-distribuicao-de-tarefas-roda-de-mulheres-pdf/@@display-file/file/Ata%252004-2019%2520%2528distribui%25C3%25A7%25C3%25A3o%2520de%2520tarefas%2520-%2520Roda%2520de%2520Mulheres%2529.pdf',
        pauta: [
        'Preparação do evento Roda de Mulheres (distribuição de tarefas)'
      ],
        delib: [
        { txt: 'Preparação das atividades finais da Roda das Mulheres', status: 'informativa' }
      ]
      },
      {
        ano: '2019.0', num: 'Ata 05', titulo: '5ª Reunião CPFEM — 2019',
        data: 'ago/2019', duracao: '00:30:00', url: 'https://www.tre-rn.jus.br/institucional/programas-institucionais/programa-de-participacao-feminina/arquivos/atas/2019/ata-05-2019-avaliacao-do-evento-pdf/@@display-file/file/Ata%252005-2019%2520%2528avalia%25C3%25A7%25C3%25A3o%2520do%2520evento%2529.pdf',
        pauta: [
        'Avaliação do evento Roda de Mulheres'
      ],
        delib: [
        { txt: 'Prestação de contas e registros do evento Roda das Mulheres', status: 'informativa' }
      ]
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CPFEM — 2025', data: '2025-02-27',
        horario: '14:00:00', duracao: '01:30:00',
        local: 'TRE-RN — Sala do LIODS',
        pauta: [
        'Planejamento das ações 2025'
      ]
      },
      {
        titulo: '1ª Reunião CPFEM — 2024', data: '2024-03-25',
        horario: '13:30:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Planejamento das ações 2024'
      ]
      },
      {
        titulo: '1ª Reunião CPFEM — 2023', data: '2023-04-04',
        horario: '16:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Planejamento das ações 2023'
      ]
      },
      {
        titulo: '2ª Reunião CPFEM — 2023', data: '2023-06-07',
        horario: '18:00:00', duracao: '00:50:00',
        local: 'Videoconferência',
        pauta: [
        'Planejamento de ação sobre a presença da mulher negra no espaço político'
      ]
      },
      {
        titulo: '3ª Reunião CPFEM — 2023', data: '2023-07-17',
        horario: '15:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Resposta à AUDI: Ação coordenada de auditoria sobre a política contra assédio e discriminação do PJ'
      ]
      },
      {
        titulo: '4ª Reunião CPFEM — 2023', data: '2023-08-31',
        horario: '19:30:00', duracao: '01:10:00',
        local: 'Videoconferência',
        pauta: [
        'Planejamento de ação na Comunidade Indígena do Amarelão'
      ]
      },
      {
        titulo: '5ª Reunião CPFEM — 2023', data: '2023-09-05',
        horario: '18:00:00', duracao: '00:30:00',
        local: 'Videoconferência',
        pauta: [
        'Calendário de evento na Comunidade Indígena do Amarelão'
      ]
      },
      {
        titulo: '1ª Reunião CPFEM — 2022', data: '2022-03-28',
        horario: '17:00:00', duracao: '00:50:00',
        local: 'Videoconferência',
        pauta: [
        'Alinhamento de atividades e metas para 2022'
      ]
      },
      {
        titulo: '2ª Reunião CPFEM — 2022', data: '2022-04-06',
        horario: '13:00:00', duracao: '00:50:00',
        local: 'Videoconferência',
        pauta: [
        'Planejamento das ações 2022'
      ]
      },
      {
        titulo: '3ª Reunião CPFEM — 2022', data: '2022-04-11',
        horario: '13:00:00', duracao: '00:50:00',
        local: 'Videoconferência',
        pauta: [
        'Ajustes da ação conjunta com a ABMCJ'
      ]
      },
      {
        titulo: '4ª Reunião CPFEM — 2022', data: '2022-11-30',
        horario: '16:00:00', duracao: '01:40:00',
        local: 'Videoconferência',
        pauta: [
        'Diretrizes para o plano de ação 2022/2023'
      ]
      },
      {
        titulo: '1ª Reunião CPFEM — 2021', data: '2021-01-08',
        horario: '12:30:00', duracao: '01:10:00',
        local: 'TRE-RN — Sala da ASCOM',
        pauta: [
        'Reunião inicial do ano'
      ]
      },
      {
        titulo: '2ª Reunião CPFEM — 2021', data: '2021-02-05',
        horario: '09:30:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Análise de proposta de Plano de Ação'
      ]
      },
      {
        titulo: '6ª Reunião CPFEM — 2021', data: '2021-09-27',
        horario: '16:20:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Ajustes das atividades e metas da comissão para 2021'
      ]
      },
      {
        titulo: '1ª Reunião CPFEM — 2020', data: '2020-02-03',
        horario: '14:45:00', duracao: '01:00:00',
        local: 'TRE-RN — Sala do LIODS',
        pauta: [
        'Reunião inicial do ano'
      ]
      },
      {
        titulo: '2ª Reunião CPFEM — 2020', data: '2020-02-07',
        horario: '09:20:00', duracao: '00:55:00',
        local: 'TRE-RN — Sala do LIODS',
        pauta: [
        'Detalhamento de ações para 2020'
      ]
      },
      {
        titulo: '4ª Reunião CPFEM — 2020', data: '2020-07-15',
        horario: '14:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Adequação do plano de trabalho 2020 (pandemia COVID-19)'
      ]
      },
      {
        titulo: '5ª Reunião CPFEM — 2020', data: '2020-08-25',
        horario: '14:00:00', duracao: '01:00:00',
        local: 'Videoconferência',
        pauta: [
        'Relatório do CNJ'
      ]
      },
      {
        titulo: '6ª Reunião CPFEM — 2020', data: '2020-10-21',
        horario: '14:00:00', duracao: '01:00:00',
        local: 'TRE-RN — Sala da AUDI',
        pauta: [
        'Planejamento 3º quadrimestre 2020'
      ]
      },
      {
        titulo: '1ª Reunião CPFEM — 2019', data: '2019-07-29',
        horario: '14:00:00', duracao: '01:10:00',
        local: 'TRE-RN — Sala do LIODS',
        pauta: [
        'Reunião inicial do ano: definição de ações'
      ]
      },
      {
        titulo: '2ª Reunião CPFEM — 2019', data: '2019-08-05',
        horario: '14:00:00', duracao: '01:15:00',
        local: 'TRE-RN — Sala do LIODS',
        pauta: [
        'Programação de evento do ano: Roda de Mulheres'
      ]
      },
      {
        titulo: '3ª Reunião CPFEM — 2019', data: '2019-08-09',
        horario: '11:00:00', duracao: '01:10:00',
        local: 'TRE-RN — Centro de Memória',
        pauta: [
        'Organização do evento  Roda de Mulheres (continuação)'
      ]
      },
      {
        titulo: '4ª Reunião CPFEM — 2019', data: '2019-08-15',
        horario: '16:50:00', duracao: '00:25:00',
        local: 'TRE-RN — Centro de Memória',
        pauta: [
        'Preparação do evento Roda de Mulheres (distribuição de tarefas)'
      ]
      },
      {
        titulo: '5ª Reunião CPFEM — 2019', data: '2019-08-27',
        horario: '14:45:00', duracao: '00:30:00',
        local: 'TRE-RN — Centro de Memória',
        pauta: [
        'Avaliação do evento Roda de Mulheres'
      ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════
     CEERD — Comissão de Equidade Étnico-Racial e Diversidade
  ══════════════════════════════════════════════════ */
  {
    id: 'ceerd',
    sigla: 'CEERD',
    nome: 'Comissão de Equidade Étnico-Racial e Diversidade',
    area: 'Presidência',
    cor: '#7c2d12',

    presidencia: { nome: 'Juiz João Makson Bastos de Oliveira', setor: '41ª Zona Eleitoral' },
    secretaria: { nome: 'Maria Ruth Bezerra Maia de Hollanda', setor: 'Asses. Gestão Estrat., Governança e Inovação' },
    membros_total: null,
    periodicidade: 'Mensal',

    base_legal: { nome: 'Portaria nº 33/2025/PRES', link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias-da-presidencia/portarias/2025/sei_tre-rn-0191090-portaria-pres-33-2025/@@display-file/file/SEI_TRE-RN%2520-%25200191090%2520-%2520Portaria%2520PRES%252033-2025.pdf' },

    genero: { fem: 5, masc: 2 },
    etnia: null,

    normas_vinculadas: [
      { orgao: 'CNJ', nome: 'Pacto Nacional de Equidade Étnico-Racial e Diversidade', descricao: 'Diretrizes de Equidade, Gênero e Diversidade no Judiciário', link: 'https://www.cnj.jus.br/programas-e-acoes/direitos-humanos/pacto-nacional-do-judiciario-pela-equidade-racial/' }
    ],

    normas_designacao: [
      { nome: 'Portaria nº 178/2025/PRES', descricao: 'Última composição da CEERD (incorporada à CPEGD)', link: 'https://www.tre-rn.jus.br/legislacao/compilada/portaria-gp/2025/portaria-no-178-2025-pres-de-2-de-outubro-de-2025', vigente: false }
    ],

    composicao: [
      { unidade: 'Presidência', membro: 'Juiz João Makson Bastos de Oliveira', obs: 'Presidente' },
      { unidade: 'Asses. Gestão Estrat., Governança e Inovação', membro: 'Maria Ruth Bezerra Maia de Hollanda', obs: 'Secretária' },
      { unidade: 'Escola Judiciária Eleitoral', membro: 'Solon Rodrigues de Almeida Netto', obs: '' },
      { unidade: 'Núcleo de Acessibilidade e Inclusão/AGE', membro: 'Adriana Karla de Oliveira Ferreira Bezerra', obs: '' },
      { unidade: 'Núcleo Socioambiental/AGE', membro: 'Lanna Patrícia da Silva', obs: '' },
      { unidade: 'Gabinete da SJ', membro: 'Sheila Maria Carvalho Bezerra de Araújo', obs: '' },
      { unidade: 'Gabinete da CRE', membro: 'Josinez Maria Pergentino Costa Gurgel de Faria', obs: '' }
    ],

    atas: [
      {
        ano: '2026.0', num: '—', titulo: 'Atividades encerradas (nova comissão: CPEGD)',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2025.0', num: 'Ata 01', titulo: '',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      },
      {
        ano: '2024.0', num: 'Ata 01', titulo: '',
        data: '—', duracao: null, url: null,
        pauta: [],
        delib: []
      }
    ],

    proximas: []
  },

];

/**
 * Converte duração 'hh:mm' em minutos. Retorna 0 se inválido.
 */
function durToMin(dur) {
  if (!dur || typeof dur !== 'string') return 0;
  const parts = dur.split(':').map(Number);
  if (parts.length !== 2) return 0;
  return (parts[0] || 0) * 60 + (parts[1] || 0);
}

/**
 * Retorna o total de minutos de reuniões de uma comissão em um dado ano.
 */
function minutosPorAno(com, ano) {
  let total = 0;
  (com.atas || []).forEach(a => {
    if (a.url && a.ano === String(ano)) total += durToMin(a.duracao);
  });
  (com.proximas || []).forEach(r => {
    if (r.data && r.data.startsWith(String(ano))) total += durToMin(r.duracao);
  });
  return total;
}

/**
 * Formata minutos em string legível: '2h30' ou '1h' ou '0h45' ou '—'
 */
function formatMin(min) {
  if (!min && min !== 0) return '—';
  if (!min) return '—';
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h && m) return `${h}h${String(m).padStart(2,'0')}`;
  if (h) return `${h}h`;
  if (m) return `0h${String(m).padStart(2,'0')}`;
  return '—';
}

/**
 * Retorna true se a comissão tem dados incompletos (a confirmar).
 */
function dadosIncompletos(com) {
  return com.membros_total === null ||
         com.base_legal.nome === 'A confirmar' ||
         com.composicao.length === 0;
}

/**
 * Retorna o status de atividade da comissão com base nas atas.
 * 'ativa'    → tem ata com URL no ano atual ou anterior
 * 'alerta'   → última ata registrada há mais de 1 ano
 * 'pendente' → tem deliberações pendentes
 * 'incompleto' → dados a confirmar
 */
function statusComissao(com) {
  if (dadosIncompletos(com)) return 'incompleto';
  const atasComUrl = (com.atas || []).filter(a => a.url);
  if (atasComUrl.length === 0) return 'alerta';
  const anos = atasComUrl.map(a => parseInt(a.ano)).filter(Boolean);
  const maxAno = Math.max(...anos);
  if (maxAno >= ANO_ATUAL - 1) {
    const temPendente = getPendencias(com).length > 0;
    return temPendente ? 'pendente' : 'ativa';
  }
  return 'alerta';
}

/**
 * Constrói a URL para adicionar reunião ao Google Calendar.
 */
function gcalUrl(reuniao, nomeComissao) {
  const d = reuniao.data.replace(/-/g, '');
  const hi = reuniao.horario.replace(':', '');
  const hfNum = parseInt(reuniao.horario.split(':')[0]) + 2;
  const hf = String(hfNum).padStart(2, '0') + hi.slice(2);
  const desc = (reuniao.pauta || []).map((p, i) => `${i + 1}. ${p}`).join('%0A');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE`
    + `&text=${encodeURIComponent(reuniao.titulo || nomeComissao)}`
    + `&dates=${d}T${hi}00/${d}T${hf}00`
    + `&details=Pauta:%0A${desc}`
    + `&location=${encodeURIComponent(reuniao.local || 'TRE-RN')}`;
}

/**
 * Retorna lista de áreas únicas para o filtro.
 */
function getAreas() {
  return [...new Set(COMISSOES.map(c => c.area))].sort();
}
