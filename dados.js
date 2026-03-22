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

  /* ══════════════════════════════════════════════════════
     CGPLS — Comissão Gestora do Plano de Logística Sustentável
  ══════════════════════════════════════════════════════ */
  {
    id: 'cgpls',
    sigla: 'CGPLS',
    nome: 'Comissão Gestora do Plano de Logística Sustentável',
    area: 'Presidência',
    cor: CORES.azul_royal,

    presidencia: { nome: 'Ana Esmera Pimentel da Fonseca', setor: 'Diretoria-Geral' },
    secretaria:  { nome: 'Evelyn Monique de Arruda Farias', setor: 'Núcleo Socioambiental' },
    membros_total: 8,
    periodicidade: 'Trimestral',

    base_legal: {
      nome: 'Portaria nº 92/2023/PRES',
      link: null  // ← inserir link quando disponível
    },

    genero: { fem: 5, masc: 3 },
    etnia: null,  // ← preencher quando disponível

    normas_vinculadas: [
      {
        orgao: 'CNJ',
        nome: 'Resolução CNJ nº 400/2021',
        descricao: 'Institui a obrigatoriedade da Comissão Gestora do PLS no Poder Judiciário',
        link: null
      },
      {
        orgao: 'CNJ',
        nome: 'Resolução CNJ nº 550/2024',
        descricao: 'Equidade e diversidade no Plano de Logística Sustentável',
        link: null
      },
      {
        orgao: 'CNJ',
        nome: 'Resolução CNJ nº 594/2024',
        descricao: 'Programa Justiça Carbono Zero',
        link: null
      }
    ],

    normas_designacao: [
      {
        nome: 'Portaria nº 92/2023/PRES',
        descricao: 'Composição vigente da CGPLS',
        link: null,
        vigente: true
      },
      {
        nome: 'Portaria anterior',
        descricao: 'Composição até 2022 (histórico)',
        link: null,
        vigente: false
      }
    ],

    composicao: [
      { unidade: 'Diretoria-Geral',          membro: 'Ana Esmera Pimentel da Fonseca',       obs: 'Presidente' },
      { unidade: 'AGE',                       membro: 'Maria Ruth Bezerra Maia de Hollanda',  obs: '' },
      { unidade: 'SAOF',                      membro: 'Simone Maria de Oliveira Soares Mello', obs: '' },
      { unidade: 'SGP',                       membro: 'Cláudia Josemira Marinho de Lima',     obs: '' },
      { unidade: 'STIE',                      membro: 'Marcos Flávio Nascimento Maia',        obs: '' },
      { unidade: 'Secretaria Judiciária',     membro: 'João Paulo de Araújo',                 obs: '' },
      { unidade: 'COLIC',                     membro: 'Hermann Prudente Doria',               obs: '' },
      { unidade: 'NSA (Secretaria executiva)',membro: 'Evelyn Monique de Arruda Farias',      obs: 'Secretária' }
    ],

    atas: [
      {
        ano: '2026', num: '—', titulo: 'Reuniões 2026', data: '—', duracao: null, url: null,
        pauta: ['Não houve reunião da CGPLS até o momento (março/2026)'],
        delib: []
      },
      {
        ano: '2025', num: 'Ata 05', titulo: '5ª Reunião CGPLS — 2025', data: 'out/2025', duracao: '01:45',
        url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/rede-de-governanca-e-gestao-do-tre-rn/comissao-gestora-do-pls/arquivos/ata-cgpls-no-05_2025',
        pauta: [
          'Resultados parciais (out/2025)',
          'Propostas preliminares de metas e ações 2026',
          'Res. CNJ — Plano de Descarbonização e Protocolo de Crise Socioambiental'
        ],
        delib: [
          { txt: 'Propostas de metas 2026 — encaminhadas às unidades para validação e retorno', status: 'pendente' },
          { txt: 'Protocolo de Crise Socioambiental — análise e deliberação formal pendente', status: 'pendente' },
          { txt: 'Relatório de emissões de carbono 2025 — recebido e arquivado', status: 'informativa' }
        ]
      },
      {
        ano: '2025', num: 'Ata 04', titulo: '4ª Reunião CGPLS — 2025', data: 'ago/2025', duracao: '01:20',
        url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/rede-de-governanca-e-gestao-do-tre-rn/comissao-gestora-do-pls/arquivos/ata-cgpls-no-04_2025',
        pauta: [
          'Acompanhamento do plano de ações das unidades da SAOF',
          'Ações e metas — situação e pendências'
        ],
        delib: [
          { txt: 'Monitoramento das ações SAOF — pendências identificadas em 3 indicadores', status: 'pendente' },
          { txt: 'Adequação do PLS ao novo modelo de relatório CNJ — prazo: dez/2025', status: 'cumprida' }
        ]
      },
      {
        ano: '2025', num: 'Ata 03', titulo: '3ª Reunião CGPLS — 2025', data: 'jun/2025', duracao: '02:10',
        url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/rede-de-governanca-e-gestao-do-tre-rn/comissao-gestora-do-pls/arquivos/ata-cgpls-no-03_2025',
        pauta: [
          'Análise dos resultados do IDS 2024',
          'Monitoramento do PLS — indicadores e ações',
          'Monitoramento do Programa Carbono Zero'
        ],
        delib: [
          { txt: 'Resultados IDS 2024 analisados — providências por unidade encaminhadas', status: 'informativa' },
          { txt: 'Monitoramento PLS e Carbono Zero em curso — relatório parcial aprovado', status: 'cumprida' },
          { txt: 'Inclusão de indicadores de biodiversidade no PLS — estudo de viabilidade solicitado', status: 'pendente' }
        ]
      },
      {
        ano: '2025', num: 'Ata 02', titulo: '2ª Reunião CGPLS — 2025', data: 'mar/2025', duracao: '02:30',
        url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/rede-de-governanca-e-gestao-do-tre-rn/comissao-gestora-do-pls/arquivos/ata-cgpls-no-02_2025',
        pauta: [
          'Aprovação do PLS 2024–2025 Versão 2.0',
          'Aprovação do Plano de Ação PLS 2025',
          'Incorporação de indicadores Res. CNJ 550/2024 e 594/2024'
        ],
        delib: [
          { txt: 'PLS 2024–2025 Versão 2.0 — APROVADO e publicado em diário oficial', status: 'cumprida' },
          { txt: 'Plano de Ação PLS 2025 — APROVADO com 18 metas distribuídas às unidades', status: 'cumprida' },
          { txt: 'Indicadores de equidade e Carbono Zero incorporados ao PLS', status: 'cumprida' },
          { txt: 'Capacitação dos pontos focais do PLS — programada para mar/2025', status: 'cumprida' }
        ]
      },
      {
        ano: '2025', num: 'Ata 01', titulo: '1ª Reunião CGPLS — 2025', data: 'fev/2025', duracao: '01:55',
        url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/governanca-gestao/rede-de-governanca-e-gestao-do-tre-rn/comissao-gestora-do-pls/arquivos/ata-cgpls-no-01_2025',
        pauta: [
          'Aprovação do Relatório de Desempenho 2024',
          'Aprovação do Plano de Descarbonização 2025–2030',
          'Encaminhamentos para o Plano de Ação PLS 2025'
        ],
        delib: [
          { txt: 'Relatório de Desempenho 2024 — APROVADO por unanimidade', status: 'cumprida' },
          { txt: 'Plano de Descarbonização 2025–2030 — APROVADO e encaminhado à Presidência', status: 'cumprida' },
          { txt: 'Divulgação dos resultados 2024 no site institucional', status: 'informativa' }
        ]
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CGPLS 2026',
        data: '2026-04-15',
        horario: '10:00',
        duracao: '02:00',
        local: 'TRE-RN — Sala AGE',
        pauta: [
          'Aprovação do Relatório de Desempenho 2025',
          'Definição do Plano de Ação PLS 2026',
          'Adoção do Protocolo de Crise Socioambiental (pendência)'
        ]
      }
    ]
  },


  /* ══════════════════════════════════════════════════════
     CACESS — Comissão Permanente de Acessibilidade e Inclusão
  ══════════════════════════════════════════════════════ */
  {
    id: 'cacess',
    sigla: 'CACESS',
    nome: 'Comissão Permanente de Acessibilidade e Inclusão',
    area: 'Presidência',
    cor: CORES.violeta,

    presidencia: { nome: 'Maria Ruth Bezerra Maia de Hollanda', setor: 'AGE' },
    secretaria: [
      { nome: 'Adriana Karla de Oliveira Ferreira Bezerra', setor: 'NAI — Núcleo de Acessibilidade e Inclusão' },
      { nome: 'Fernanda Gabriela Oliveira de Figueiredo Gomes', setor: 'ASCOM' },
      { nome: 'André José Lins Leal', setor: 'NEAD / EJE' }
    ],
    membros_total: 11,
    periodicidade: 'Sob demanda',

    base_legal: {
      nome: 'Portaria nº 27/2025/PRES',
      link: null
    },

    genero: { fem: 7, masc: 4 },
    etnia: null,

    normas_vinculadas: [
      {
        orgao: 'CNJ',
        nome: 'Resolução CNJ nº 401/2021',
        descricao: 'Art. 25 — fundamenta a composição da comissão de acessibilidade',
        link: null
      },
      {
        orgao: 'CNJ',
        nome: 'Recomendação CNJ nº 27/2009',
        descricao: 'Base normativa original para acessibilidade no Judiciário',
        link: null
      },
      {
        orgao: 'TSE',
        nome: 'Resolução TSE nº 23.381/2012',
        descricao: 'Programa de Acessibilidade da Justiça Eleitoral',
        link: null
      }
    ],

    normas_designacao: [
      {
        nome: 'Portaria nº 27/2025/PRES',
        descricao: 'Composição vigente da CACESS',
        link: null,
        vigente: true
      },
      {
        nome: 'Portarias anteriores',
        descricao: 'Série histórica de designações desde 2012',
        link: null,
        vigente: false
      }
    ],

    composicao: [
      { unidade: 'AGE',                        membro: 'Maria Ruth Bezerra Maia de Hollanda',            obs: 'Presidente' },
      { unidade: 'NAI',                        membro: 'Adriana Karla de Oliveira Ferreira Bezerra',     obs: 'Secretária' },
      { unidade: 'NSA',                        membro: 'Evelyn Monique de Arruda Farias',                obs: '' },
      { unidade: 'Seção de Engenharia',        membro: 'Ronald José Amorim Fernandes',                  obs: '' },
      { unidade: 'SAMSO',                      membro: 'Waldylécio Souza da Silva',                      obs: '' },
      { unidade: 'Seção de Seg. da Informação',membro: 'Helder Jean Brito da Silva',                    obs: '' },
      { unidade: 'GAP',                        membro: 'Maxelli Xavier de Andrade Rebouças',             obs: '' },
      { unidade: '2ª Zona Eleitoral',          membro: 'Sandra Regina da Silva Pegado',                 obs: '' },
      { unidade: 'NEAD / EJE',                 membro: 'André José Lins Leal',                          obs: '' },
      { unidade: 'ASCOM',                      membro: 'Fernanda Gabriela Oliveira de Figueiredo Gomes', obs: '' },
      { unidade: 'Lab. Alzira Inova',          membro: 'Juliana Vieira Costa de Aguiar',                obs: '' }
    ],

    atas: [
      {
        ano: '2026', num: '—', titulo: 'Reuniões 2026', data: '—', duracao: null, url: null,
        pauta: ['Não houve reunião da CACESS até o momento (março/2026)'],
        delib: [{ txt: 'ALERTA: ausência de reuniões em 2025 e 2026', status: 'pendente' }]
      },
      {
        ano: '2025', num: '—', titulo: 'Reuniões 2025', data: '—', duracao: null, url: null,
        pauta: ['Não houve reunião da CACESS no ano de 2025'],
        delib: [{ txt: 'Ausência de reuniões em 2025 — atenção à continuidade', status: 'pendente' }]
      },
      {
        ano: '2024', num: 'Ata 01', titulo: '1ª Reunião CACESS — 2024', data: 'fev/2024', duracao: '01:30',
        url: 'https://www.tre-rn.jus.br/transparencia-e-prestacao-de-contas/acessibilidade/copy_of_acessibilidade-e-inclusao/atas-cacess-2024-2025/ata-01_2024-cacess',
        pauta: [
          'Direcionamento anual dos trabalhos 2024',
          'Avatar de Acessibilidade Alex — campanha institucional',
          'Inclusão de notícias no Giro',
          'Campanha de enfrentamento ao assédio e à discriminação (maio/2024)'
        ],
        delib: [
          { txt: 'Avatar Alex — campanha em implementação', status: 'pendente' },
          { txt: 'Campanha anti-assédio (maio/2024) — sem registro de conclusão', status: 'pendente' }
        ]
      }
    ],

    proximas: [
      {
        titulo: '1ª Reunião CACESS 2026',
        data: '2026-04-25',
        horario: '10:00',
        duracao: '01:30',
        local: 'TRE-RN — Sala AGE',
        pauta: [
          'Direcionamento anual dos trabalhos 2026',
          'Elaboração do Plano de Ação 2026',
          'Acompanhamento da campanha anti-assédio (pendência 2024)',
          'Cronograma anual de reuniões'
        ]
      }
    ]
  },


  /* ══════════════════════════════════════════════════════
     CREG — Comissão de Regimento
     ⚠ Dados de mock — substituir pelos dados reais
  ══════════════════════════════════════════════════════ */
  {
    id: 'creg',
    sigla: 'CREG',
    nome: 'Comissão de Regimento',
    area: 'Vice-Presidência / Corregedoria Regional Eleitoral',
    cor: CORES.teal,

    presidencia: { nome: 'Desembargador José Dantas de Paiva', setor: 'Vice-Presidência / CRE' },
    secretaria:  { nome: 'Fernanda Lima Cavalcanti', setor: 'Assessoria Jurídica e Correcional — AJCRE' },
    membros_total: 7,
    periodicidade: 'Sob demanda',

    base_legal: {
      nome: 'Portaria nº 18/2022/PRES',
      link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias/2022'
    },

    genero: { fem: 3, masc: 4 },
    etnia: { branco: 3, pardo: 3, negro: 1 },

    normas_vinculadas: [
      {
        orgao: 'TRE-RN',
        nome: 'Resolução TRE-RN nº 12/2019',
        descricao: 'Aprova o Regimento Interno do Tribunal Regional Eleitoral do Rio Grande do Norte',
        link: 'https://www.tre-rn.jus.br/legislacao/regulamentos-e-regimentos-do-tre-rn'
      },
      {
        orgao: 'TSE',
        nome: 'Resolução TSE nº 23.221/2010',
        descricao: 'Dispõe sobre o Regimento Interno do Tribunal Superior Eleitoral e serve de referência para os TREs',
        link: null
      },
      {
        orgao: 'CNJ',
        nome: 'Resolução CNJ nº 67/2009',
        descricao: 'Regulamenta os procedimentos de alteração dos regimentos internos dos tribunais',
        link: null
      }
    ],

    normas_designacao: [
      {
        nome: 'Portaria nº 18/2022/PRES',
        descricao: 'Designa membros da Comissão de Regimento — composição vigente',
        link: 'https://www.tre-rn.jus.br/legislacao/atos-normativos/portarias/2022',
        vigente: true
      },
      {
        nome: 'Portaria nº 35/2019/PRES',
        descricao: 'Primeira designação após aprovação do Regimento Interno de 2019',
        link: null,
        vigente: false
      },
      {
        nome: 'Portaria nº 11/2017/PRES',
        descricao: 'Comissão de Regimento para revisão do regimento então vigente',
        link: null,
        vigente: false
      }
    ],

    composicao: [
      { unidade: 'Vice-Presidência / CRE',    membro: 'Desembargador José Dantas de Paiva',    obs: 'Presidente' },
      { unidade: 'AJCRE',                      membro: 'Fernanda Lima Cavalcanti',              obs: 'Secretária' },
      { unidade: 'Assessoria Judiciária',      membro: 'Carlos Eduardo Melo Rodrigues',         obs: '' },
      { unidade: 'Secretaria Judiciária',      membro: 'Ana Paula Soares de Medeiros',          obs: '' },
      { unidade: 'Coordenadoria de Eleições',  membro: 'Ricardo Augusto Feitosa Lima',          obs: '' },
      { unidade: 'Assessoria Jurídica da DG',  membro: 'Mariana Cristina Bezerra Dantas',       obs: '' },
      { unidade: 'Gabinete da Presidência',    membro: 'Thiago Henrique Albuquerque Nascimento', obs: '' }
    ],

    atas: [
      {
        ano: '2026', num: 'Ata 01', titulo: '1ª Reunião CREG — 2026', data: 'fev/2026', duracao: '02:15',
        url: 'https://www.tre-rn.jus.br/institucional/corregedoria-regional-eleitoral',
        pauta: [
          'Análise de proposta de alteração dos arts. 42 a 47 do Regimento Interno (procedimentos de julgamento)',
          'Adequação do Regimento às Resoluções CNJ nº 543/2023 e 551/2024',
          'Calendário de trabalhos para 2026'
        ],
        delib: [
          { txt: 'Aprovado cronograma de trabalhos para revisão do RI em 2026', status: 'cumprida' },
          { txt: 'Constituído grupo de trabalho para análise das alterações propostas — arts. 42 a 47', status: 'pendente' },
          { txt: 'Adequação às Resoluções CNJ 543/2023 e 551/2024 — minuta a ser apresentada na próxima reunião', status: 'pendente' },
          { txt: 'Mapeamento de conflitos entre RI vigente e normas CNJ editadas em 2024-2025', status: 'pendente' }
        ]
      },
      {
        ano: '2025', num: 'Ata 03', titulo: '3ª Reunião CREG — 2025', data: 'nov/2025', duracao: '01:45',
        url: 'https://www.tre-rn.jus.br/institucional/corregedoria-regional-eleitoral',
        pauta: [
          'Revisão dos arts. 88 a 102 do Regimento Interno (normas de organização administrativa)',
          'Consolidação das alterações aprovadas em 2025',
          'Proposta de atualização do glossário do RI'
        ],
        delib: [
          { txt: 'Arts. 88 a 102 revisados — texto encaminhado ao Plenário para deliberação', status: 'cumprida' },
          { txt: 'Consolidação das alterações 2025 — aprovada e publicada no DJE', status: 'cumprida' },
          { txt: 'Glossário do RI — atualização aprovada e incorporada ao documento consolidado', status: 'cumprida' },
          { txt: 'Comunicado às unidades sobre as alterações publicado na intranet', status: 'informativa' }
        ]
      },
      {
        ano: '2025', num: 'Ata 02', titulo: '2ª Reunião CREG — 2025', data: 'jun/2025', duracao: '02:00',
        url: 'https://www.tre-rn.jus.br/institucional/corregedoria-regional-eleitoral',
        pauta: [
          'Análise comparativa com regimentos de outros TREs',
          'Proposta de novos arts. relativos ao uso de tecnologia em sessões plenárias',
          'Revisão dos prazos processuais internos'
        ],
        delib: [
          { txt: 'Análise comparativa concluída — relatório aprovado e arquivado', status: 'cumprida' },
          { txt: 'Novos artigos sobre tecnologia em sessões — aprovados e remetidos ao Plenário', status: 'cumprida' },
          { txt: 'Prazos processuais internos — revisão parcial aprovada', status: 'cumprida' },
          { txt: 'Distribuição do relatório comparativo aos membros da comissão', status: 'informativa' }
        ]
      },
      {
        ano: '2025', num: 'Ata 01', titulo: '1ª Reunião CREG — 2025', data: 'mar/2025', duracao: '01:30',
        url: 'https://www.tre-rn.jus.br/institucional/corregedoria-regional-eleitoral',
        pauta: [
          'Planejamento anual dos trabalhos da Comissão de Regimento',
          'Levantamento de demandas de alteração do Regimento Interno recebidas em 2024',
          'Definição de prioridades de revisão para 2025'
        ],
        delib: [
          { txt: 'Planejamento anual aprovado — cronograma de 3 reuniões em 2025', status: 'cumprida' },
          { txt: 'Levantamento de demandas concluído — 12 propostas de alteração identificadas', status: 'cumprida' },
          { txt: 'Prioridades definidas: arts. relacionados a tecnologia, prazos e organização administrativa', status: 'cumprida' },
          { txt: 'Comunicacao às unidades sobre o inicio dos trabalhos de revisão do RI', status: 'informativa' }
        ]
      },
      {
        ano: '2024', num: 'Ata 02', titulo: '2ª Reunião CREG — 2024', data: 'set/2024', duracao: '02:30',
        url: null,
        pauta: [
          'Revisão dos arts. 15 a 28 do Regimento Interno (competências da Corte)',
          'Análise de proposta de criação de câmara especializada'
        ],
        delib: [
          { txt: 'Arts. 15 a 28 revisados e aprovados — encaminhados ao Plenário', status: 'cumprida' },
          { txt: 'Proposta de câmara especializada — não aprovada, arquivada', status: 'cumprida' },
          { txt: 'Inclusão de dispositivo sobre sustentabilidade nas sessões — pendente de análise jurídica', status: 'pendente' }
        ]
      },
      {
        ano: '2024', num: 'Ata 01', titulo: '1ª Reunião CREG — 2024', data: 'abr/2024', duracao: '01:45',
        url: null,
        pauta: [
          'Planejamento dos trabalhos de 2024',
          'Análise das alterações legislativas com impacto no Regimento Interno',
          'Revisão do capítulo referente às sessões plenárias'
        ],
        delib: [
          { txt: 'Planejamento 2024 aprovado — cronograma de 2 reuniões', status: 'cumprida' },
          { txt: 'Capítulo de sessões plenárias revisado — aprovado com 3 emendas de redação', status: 'cumprida' },
          { txt: 'Publicação do cronograma 2024 na intranet do tribunal', status: 'informativa' }
        ]
      }
    ],

    proximas: [
      {
        titulo: '2ª Reunião CREG 2026',
        data: '2026-05-14',
        horario: '14:00',
        duracao: '02:00',
        local: 'TRE-RN — Sala da Vice-Presidência',
        pauta: [
          'Apresentação da minuta de adequação às Resoluções CNJ 543/2023 e 551/2024',
          'Análise do relatório do grupo de trabalho (arts. 42 a 47)',
          'Votação das propostas de alteração'
        ]
      },
      {
        titulo: '3ª Reunião CREG 2026',
        data: '2026-09-10',
        horario: '14:00',
        duracao: '02:00',
        local: 'TRE-RN — Sala da Vice-Presidência',
        pauta: [
          'Consolidação das alterações aprovadas em 2026',
          'Revisão final do texto do Regimento Interno',
          'Encaminhamento ao Plenário para deliberação final'
        ]
      }
    ]
  },


  /* ══════════════════════════════════════════════════════
     CJE — Comissão de Jurisprudência
  ══════════════════════════════════════════════════════ */
  {
    id: 'cje',
    sigla: 'CJE',
    nome: 'Comissão de Jurisprudência',
    area: 'Juiz da Corte',
    cor: CORES.verde_escuro,

    presidencia: { nome: 'A confirmar', setor: 'Juiz da Corte' },
    secretaria:  { nome: 'A confirmar', setor: 'A confirmar' },
    membros_total: null,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'A confirmar', link: null },

    genero: null,
    etnia: null,

    normas_vinculadas: [
      { orgao: 'TRE-RN', nome: 'A confirmar', descricao: 'Aguardando links institucionais para preenchimento', link: null }
    ],

    normas_designacao: [
      { nome: 'A confirmar', descricao: 'Aguardando links institucionais', link: null, vigente: false }
    ],

    composicao: [],
    atas: [
      {
        ano: '2026', num: '—', titulo: 'Dados a confirmar', data: '—', url: null,
        pauta: ['Aguardando links institucionais para preenchimento'],
        delib: []
      }
    ],
    proximas: []
  },


  /* ══════════════════════════════════════════════════════
     CPSI — Comissão Permanente de Segurança da Informação
  ══════════════════════════════════════════════════════ */
  {
    id: 'cpsi',
    sigla: 'CPSI',
    nome: 'Comissão Permanente de Segurança da Informação',
    area: 'STIE — Secretaria de Tecnologia da Informação e Comunicação',
    cor: CORES.roxo,

    presidencia: { nome: 'A confirmar', setor: 'STIE' },
    secretaria:  { nome: 'A confirmar', setor: 'Seção de Segurança da Informação' },
    membros_total: null,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'A confirmar', link: null },

    genero: null,
    etnia: null,

    normas_vinculadas: [
      {
        orgao: 'CNJ',
        nome: 'Resolução CNJ nº 396/2021',
        descricao: 'Política de Segurança da Informação do Poder Judiciário (a confirmar)',
        link: null
      }
    ],

    normas_designacao: [
      { nome: 'A confirmar', descricao: 'Aguardando links institucionais', link: null, vigente: false }
    ],

    composicao: [],
    atas: [
      {
        ano: '2026', num: '—', titulo: 'Dados a confirmar', data: '—', url: null,
        pauta: ['Aguardando links institucionais para preenchimento'],
        delib: []
      }
    ],
    proximas: []
  },


  /* ══════════════════════════════════════════════════════
     CPAD — Comissão Permanente de Avaliação de Documentos
  ══════════════════════════════════════════════════════ */
  {
    id: 'cpad',
    sigla: 'CPAD',
    nome: 'Comissão Permanente de Avaliação de Documentos',
    area: 'Secretaria Judiciária — Coordenadoria de Gestão da Informação',
    cor: CORES.marrom,

    presidencia: { nome: 'A confirmar', setor: 'Coordenadoria de Gestão da Informação / SJ' },
    secretaria:  { nome: 'A confirmar', setor: 'A confirmar' },
    membros_total: null,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'A confirmar', link: null },

    genero: null,
    etnia: null,

    normas_vinculadas: [
      {
        orgao: 'LEI',
        nome: 'Lei nº 8.159/1991',
        descricao: 'Política Nacional de Arquivos Públicos e Privados (a confirmar)',
        link: null
      }
    ],

    normas_designacao: [
      { nome: 'A confirmar', descricao: 'Aguardando links institucionais', link: null, vigente: false }
    ],

    composicao: [],
    atas: [
      {
        ano: '2026', num: '—', titulo: 'Dados a confirmar', data: '—', url: null,
        pauta: ['Aguardando links institucionais para preenchimento'],
        delib: []
      }
    ],
    proximas: []
  },


  /* ══════════════════════════════════════════════════════
     CPEGD — Comissão Permanente de Equidade, Gênero e Diversidade
  ══════════════════════════════════════════════════════ */
  {
    id: 'cpegd',
    sigla: 'CPEGD',
    nome: 'Comissão Permanente de Equidade, Gênero e Diversidade',
    area: 'Presidência',
    cor: CORES.rosa,

    presidencia: { nome: 'A confirmar', setor: 'Presidência' },
    secretaria:  { nome: 'A confirmar', setor: 'A confirmar' },
    membros_total: null,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'A confirmar', link: null },

    genero: null,
    etnia: null,

    normas_vinculadas: [
      {
        orgao: 'CNJ',
        nome: 'Resolução CNJ nº 550/2024',
        descricao: 'Equidade, Gênero e Diversidade no Poder Judiciário (a confirmar)',
        link: null
      }
    ],

    normas_designacao: [
      { nome: 'A confirmar', descricao: 'Aguardando links institucionais', link: null, vigente: false }
    ],

    composicao: [],
    atas: [
      {
        ano: '2026', num: '—', titulo: 'Dados a confirmar', data: '—', url: null,
        pauta: ['Aguardando links institucionais para preenchimento'],
        delib: []
      }
    ],
    proximas: []
  },


  /* ══════════════════════════════════════════════════════
     CPMEM — Comissão Permanente de Gestão da Memória
  ══════════════════════════════════════════════════════ */
  {
    id: 'cpmem',
    sigla: 'CPMEM',
    nome: 'Comissão Permanente de Gestão da Memória',
    area: 'Secretaria Judiciária — Coordenadoria de Gestão da Informação',
    cor: CORES.verde_floresta,

    presidencia: { nome: 'A confirmar', setor: 'Coordenadoria de Gestão da Informação / SJ' },
    secretaria:  { nome: 'A confirmar', setor: 'A confirmar' },
    membros_total: null,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'A confirmar', link: null },

    genero: null,
    etnia: null,

    normas_vinculadas: [
      {
        orgao: 'CNJ',
        nome: 'Resolução CNJ nº 324/2020',
        descricao: 'Gestão documental e memória do Poder Judiciário (a confirmar)',
        link: null
      }
    ],

    normas_designacao: [
      { nome: 'A confirmar', descricao: 'Aguardando links institucionais', link: null, vigente: false }
    ],

    composicao: [],
    atas: [
      {
        ano: '2026', num: '—', titulo: 'Dados a confirmar', data: '—', url: null,
        pauta: ['Aguardando links institucionais para preenchimento'],
        delib: []
      }
    ],
    proximas: []
  },


  /* ══════════════════════════════════════════════════════
     CEDEM — Comissão Especial de Desfazimento de Materiais
  ══════════════════════════════════════════════════════ */
  {
    id: 'cedem',
    sigla: 'CEDEM',
    nome: 'Comissão Especial de Desfazimento de Materiais',
    area: 'SAOF — Coordenadoria de Gestão Patrimonial, Almoxarifado e Transporte',
    cor: CORES.laranja,

    presidencia: { nome: 'A confirmar', setor: 'CGPAT / SAOF' },
    secretaria:  { nome: 'A confirmar', setor: 'A confirmar' },
    membros_total: null,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'A confirmar', link: null },

    genero: null,
    etnia: null,

    normas_vinculadas: [
      {
        orgao: 'DECRETO',
        nome: 'Decreto nº 9.373/2018',
        descricao: 'Desfazimento de bens móveis no âmbito da Administração Pública Federal (a confirmar)',
        link: null
      }
    ],

    normas_designacao: [
      { nome: 'A confirmar', descricao: 'Aguardando links institucionais', link: null, vigente: false }
    ],

    composicao: [],
    atas: [
      {
        ano: '2026', num: '—', titulo: 'Dados a confirmar', data: '—', url: null,
        pauta: ['Aguardando links institucionais para preenchimento'],
        delib: []
      }
    ],
    proximas: []
  },


  /* ══════════════════════════════════════════════════════
     CPÉ — Comissão Permanente de Ética
  ══════════════════════════════════════════════════════ */
  {
    id: 'cpe',
    sigla: 'CPÉ',
    nome: 'Comissão Permanente de Ética',
    area: 'Presidência',
    cor: CORES.azul_marinho,

    presidencia: { nome: 'A confirmar', setor: 'Presidência' },
    secretaria:  { nome: 'A confirmar', setor: 'A confirmar' },
    membros_total: null,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'A confirmar', link: null },

    genero: null,
    etnia: null,

    normas_vinculadas: [
      {
        orgao: 'CNJ',
        nome: 'Resolução CNJ nº 60/2008',
        descricao: 'Código de Ética da Magistratura Nacional (a confirmar)',
        link: null
      }
    ],

    normas_designacao: [
      { nome: 'A confirmar', descricao: 'Aguardando links institucionais', link: null, vigente: false }
    ],

    composicao: [],
    atas: [
      {
        ano: '2026', num: '—', titulo: 'Dados a confirmar', data: '—', url: null,
        pauta: ['Aguardando links institucionais para preenchimento'],
        delib: []
      }
    ],
    proximas: []
  },


  /* ══════════════════════════════════════════════════════
     CEAAD — Comissão de Enfrentamento ao Assédio Moral, Assédio Sexual e Discriminação
  ══════════════════════════════════════════════════════ */
  {
    id: 'ceaad',
    sigla: 'CEAAD',
    nome: 'Comissão de Enfrentamento ao Assédio Moral, Assédio Sexual e Discriminação',
    area: 'Presidência',
    cor: CORES.borde,

    presidencia: { nome: 'A confirmar', setor: 'Presidência' },
    secretaria:  { nome: 'A confirmar', setor: 'A confirmar' },
    membros_total: null,
    periodicidade: 'Sob demanda',

    base_legal: { nome: 'A confirmar', link: null },

    genero: null,
    etnia: null,

    normas_vinculadas: [
      {
        orgao: 'CNJ',
        nome: 'Resolução CNJ nº 351/2020',
        descricao: 'Combate ao assédio moral, sexual e à discriminação no Judiciário (a confirmar)',
        link: null
      }
    ],

    normas_designacao: [
      { nome: 'A confirmar', descricao: 'Aguardando links institucionais', link: null, vigente: false }
    ],

    composicao: [],
    atas: [
      {
        ano: '2026', num: '—', titulo: 'Dados a confirmar', data: '—', url: null,
        pauta: ['Aguardando links institucionais para preenchimento'],
        delib: []
      }
    ],
    proximas: []
  }

]; // fim de COMISSOES


/* ================================================================
   FUNÇÕES UTILITÁRIAS — não alterar
   ================================================================ */

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
 * Considera atas com URL (realizadas) e proximas com a data do ano (previstas).
 * Usa duracao real da ata/proxima; se null, conta como 0.
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
 * Formato sempre hh:mm compacto, sem a palavra "min".
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
 * Retorna o status efetivo de uma deliberação.
 * Deliberações "em_andamento" ou "informativa" de anos anteriores
 * são automaticamente promovidas para "cumprida".
 */
function statusEfetivo(delib) {
  if ((delib.status === 'em_andamento' || delib.status === 'informativa') && delib.ano < ANO_ATUAL) {
    return 'cumprida';
  }
  return delib.status;
}

/**
 * Retorna as deliberações pendentes de uma comissão (para pauta sugerida).
 */
function getPendencias(com) {
  const pend = [];
  (com.atas || []).forEach(a => {
    (a.delib || []).forEach(d => {
      if (statusEfetivo(d) === 'pendente') pend.push(d.txt);
    });
  });
  return [...new Set(pend)];
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
