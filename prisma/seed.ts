import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import fs from 'node:fs/promises'
import path from 'node:path'

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL não encontrada no .env')
  process.exit(1)
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function loadImage(relativePath: string) {
  const cleanPath = relativePath.replace(/^\//, '')
  const fullPath = path.join(process.cwd(), 'public', cleanPath)
  const buffer = await fs.readFile(fullPath)

  const ext = path.extname(cleanPath).toLowerCase()
  const mime =
    ext === '.png' ? 'image/png' :
    ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
    ext === '.webp' ? 'image/webp' :
    ext === '.gif' ? 'image/gif' :
    'application/octet-stream'

  return { buffer, mime }
}

async function main() {
  // limpeza para dados base
  const deletedAds = await prisma.advertisements.deleteMany()
  const deletedNews = await prisma.news.deleteMany()
  console.log(`${deletedAds.count} anúncios removidos`)
  console.log(`${deletedNews.count} notícias removidas`)

  const ads = [
    {
      title: 'Super Oferta de Verão',
      image: '/propa1.png',
      link: 'https://exemplo.com/oferta-verao',
      description: 'Aproveite descontos de até 50% em toda a loja!',
      isActive: true,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2026-10-31'),
    },
    {
      title: 'Desconto Especial para Novos Clientes',
      image: '/propa2.png',
      link: 'https://exemplo.com/novo-cliente',
      description: '10% de desconto na primeira compra. Cadastre-se já!',
      isActive: true,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2026-10-31'),
    },
    {
      title: 'Lançamento Exclusivo',
      image: '/propa1.png',
      link: 'https://exemplo.com/lancamento',
      description: 'Novo produto disponível com frete grátis para todo o Brasil.',
      isActive: true,
      startDate: new Date('2025-04-15'),
      endDate: new Date('2026-10-31'),
    },
    {
      title: 'Black Friday Antecipada',
      image: '/propa2.png',
      link: 'https://exemplo.com/black-friday',
      description: 'Ofertas imperdíveis antes da hora. Corre que é por tempo limitado!',
      isActive: false,
      startDate: new Date('2025-11-01'),
      endDate: new Date('2026-10-31'),
    },
    {
      title: 'Promoção Relâmpago',
      image: '/propa1.png',
      link: null,
      description: 'Só hoje: 30% de desconto em produtos selecionados.',
      isActive: true,
      startDate: new Date('2025-05-10'),
      endDate: new Date('2025-05-11'),
    },
    {
      title: 'Assinatura Premium com Desconto',
      image: '/propa2.png',
      link: 'https://exemplo.com/premium',
      description: 'Assine o plano anual e ganhe 3 meses grátis.',
      isActive: true,
      startDate: new Date('2025-03-01'),
      endDate: new Date('2026-10-31'),
    },
  ]

  for (const ad of ads) {
    const { buffer, mime } = await loadImage(ad.image)

    await prisma.advertisements.create({
      data: {
        title: ad.title,
        image: buffer,
        imageMime: mime,
        link: ad.link,
        description: ad.description,
        isActive: ad.isActive,
        startDate: ad.startDate,
        endDate: ad.endDate,
      },
    })
    console.log(`Anúncio criado: ${ad.title}`)
  }

  const noticies = [
    {
      title: 'Nova funcionalidade lançada!',
      image: '/noticia1.png',
      summary:
        'Confira as novas funcionalidades que adicionamos ao sistema para melhorar sua experiência.',
      description: `É com grande entusiasmo que anunciamos a chegada de uma nova rodada de funcionalidades ao nosso sistema. Após meses de pesquisa com usuários, testes internos e ajustes finos, finalmente podemos compartilhar o que preparamos.

      Entre as principais novidades estão um painel de controle redesenhado, com navegação mais intuitiva e atalhos personalizáveis; notificações inteligentes que filtram o que realmente importa para cada perfil de uso; e um sistema de busca reformulado, capaz de encontrar resultados com muito mais precisão, mesmo quando o termo digitado está incompleto.

      Também implementamos melhorias de acessibilidade, como navegação por teclado em todos os fluxos críticos e ajustes de contraste que seguem as recomendações WCAG. Nosso objetivo é que ninguém fique de fora por causa de barreiras técnicas.

      Essas mudanças chegam a todos os usuários de forma gradual ao longo das próximas duas semanas. Caso você não veja as novidades imediatamente, não se preocupe: a atualização será liberada automaticamente.

      Como sempre, contamos com o seu feedback para continuar evoluindo. Se tiver sugestões, críticas ou ideias, fale com a gente pelos canais oficiais de atendimento.`,
      date: new Date('2025-01-10'),
    },
    {
      title: 'Atualização de segurança importante',
      image: '/noticia2.png',
      summary:
        'Lançamos uma atualização de segurança crítica. Recomendamos que todos os usuários atualizem o sistema.',
      description: `Identificamos recentemente uma vulnerabilidade que, em condições específicas, poderia permitir acesso não autorizado a determinadas informações do sistema. A falha já foi corrigida, mas é fundamental que todos os usuários apliquem a atualização o quanto antes.

      A correção está disponível a partir de hoje em todas as plataformas suportadas — web, desktop e aplicativo móvel. O processo de atualização é simples: na maioria dos casos, basta fechar e reabrir o aplicativo para que a nova versão seja baixada automaticamente. Usuários da versão desktop devem verificar manualmente em "Configurações > Atualizações".

      Reforçamos algumas boas práticas de segurança que ajudam a proteger sua conta: use senhas longas e únicas para cada serviço; ative a autenticação em dois fatores sempre que possível; desconfie de mensagens que pedem dados pessoais ou links suspeitos; e mantenha o sistema operacional e o navegador sempre atualizados.

      Nossa equipe de segurança continua monitorando o ambiente de forma contínua e trabalhando em melhorias preventivas. Caso você note qualquer comportamento estranho na sua conta, entre em contato imediatamente com nosso suporte.

      Agradecemos a compreensão e o compromisso de todos com a segurança da plataforma.`,
      date: new Date('2025-02-05'),
    },
    {
      title: 'Parceria estratégica anunciada',
      image: '/noticia1.png',
      summary:
        'Fechamos uma nova parceria que trará benefícios exclusivos para nossos clientes.',
      description: `Temos o prazer de anunciar uma parceria estratégica que marca um novo capítulo na nossa trajetória. Unimos forças com uma das empresas mais respeitadas do setor para oferecer aos nossos clientes soluções mais completas, integradas e competitivas.

      A parceria abrange três frentes principais. A primeira é a integração tecnológica: nossos sistemas passarão a se comunicar de forma nativa, eliminando retrabalho e permitindo fluxos mais fluidos entre as plataformas. A segunda é comercial: clientes de ambas as empresas terão acesso a condições especiais, pacotes combinados e suporte prioritário. A terceira é de inovação: vamos desenvolver, em conjunto, novos produtos e funcionalidades ao longo dos próximos meses.

      Os primeiros frutos dessa colaboração já devem ser percebidos pelos usuários nas próximas semanas, começando por uma integração de dados que simplifica o dia a dia de quem usa as duas soluções.

      Estamos animados com o que vem por aí e acreditamos que essa união reforça nosso compromisso de entregar valor real a quem confia no nosso trabalho. Fique atento aos nossos canais para acompanhar os próximos passos.`,
      date: new Date('2025-03-12'),
    },
    {
      title: 'Novo recorde de usuários',
      image: '/noticia2.png',
      summary:
        'Alcançamos a marca de 1 milhão de usuários ativos! Agradecemos a confiança de todos.',
      description: `É com enorme satisfação que celebramos a marca de 1 milhão de usuários ativos na nossa plataforma. Esse número representa muito mais do que uma métrica: simboliza a confiança de pessoas e empresas que escolheram construir junto com a gente.

      Quando começamos, éramos um time pequeno com uma ideia grande. Cada funcionalidade lançada, cada correção feita, cada sugestão recebida ajudou a moldar o que somos hoje. Chegar a 1 milhão de usuários ativos é resultado direto do esforço coletivo — da nossa equipe, dos nossos parceiros e, principalmente, de você que nos acompanha.

      Para marcar a ocasião, preparamos algumas novidades. Nos próximos dias, lançaremos uma série de conteúdos especiais, incluindo um balanço dos aprendizados do período e uma prévia do que estamos preparando para os próximos meses.

      Também queremos ouvir você: qual foi o momento em que nossa plataforma mais te ajudou? Compartilhe com a gente nas redes sociais usando nossas hashtags oficiais. Vamos adorar conhecer a sua história.

      Obrigado por fazer parte dessa jornada. E que venham os próximos milhões.`,
      date: new Date('2025-04-01'),
    },
    {
      title: 'Workshop gratuito de tecnologia',
      image: '/noticia2.png',
      summary:
        'Participe do nosso workshop gratuito sobre as tendências tecnológicas para 2025.',
      description: `Estão abertas as inscrições para o nosso workshop gratuito sobre as principais tendências tecnológicas de 2025. O evento é voltado para profissionais, estudantes e curiosos que querem entender, na prática, o que está moldando o futuro do setor.

      A programação foi pensada para cobrir temas que estão no centro das discussões atuais: inteligência artificial aplicada ao dia a dia das empresas; segurança da informação em um cenário de ameaças cada vez mais sofisticadas; computação em nuvem e arquiteturas modernas; além de uma mesa-redonda sobre carreira e novas habilidades exigidas pelo mercado.

      O workshop acontecerá em formato híbrido — presencial em nosso auditório e com transmissão ao vivo pela internet — para que ninguém fique de fora por questão de distância. Haverá espaço para perguntas ao final de cada palestra e também emissão de certificado de participação.

      As vagas são limitadas e serão preenchidas por ordem de inscrição. Para garantir a sua, acesse a página do evento e faça o cadastro. Em caso de dúvidas, nossa equipe está à disposição pelos canais de atendimento.

      Esperamos você para aprender, trocar ideias e sair com uma visão mais clara do que vem por aí.`,
      date: new Date('2025-04-20'),
    },
    {
      title: 'Atualização do aplicativo móvel',
      image: '/noticia1.png',
      summary:
        'Nova versão do app já está disponível com melhorias de desempenho e correções de bugs.',
      description: `A nova versão do nosso aplicativo móvel já está disponível para download nas lojas oficiais. Esta atualização foi construída a partir do feedback de milhares de usuários e traz melhorias que impactam diretamente a experiência no dia a dia.

      Entre os destaques, está um ganho significativo de desempenho: o app abre mais rápido, consome menos bateria e se comporta melhor em conexões instáveis. Também corrigimos diversos bugs relatados, especialmente aqueles relacionados a notificações que não apareciam e a travamentos ao alternar entre telas.

      Aproveitamos para redesenhar algumas seções que eram apontadas como confusas, tornando a navegação mais direta. O processo de login também ficou mais simples, com suporte a biometria em mais dispositivos.

      Recomendamos que todos atualizem assim que possível para aproveitar as melhorias e garantir a compatibilidade com os recursos que serão lançados em breve.

      Como sempre, se você encontrar qualquer problema, entre em contato com nosso suporte pelos canais habituais. Seu retorno é essencial para continuarmos evoluindo.`,
      date: new Date('2025-05-02'),
    },
    {
      title: 'Campanha de sustentabilidade',
      image: '/noticia2.png',
      summary:
        'Iniciamos uma campanha para reduzir o impacto ambiental das nossas operações.',
      description: `Damos início oficialmente à nossa campanha de sustentabilidade, um compromisso de longo prazo com a redução do impacto ambiental das nossas operações e com a promoção de práticas mais responsáveis em toda a nossa cadeia.

      O plano está estruturado em quatro pilares. O primeiro é a redução de emissões: vamos mapear e diminuir nossa pegada de carbono, priorizando fontes renováveis de energia e otimizando processos logísticos. O segundo é a gestão de resíduos: implementaremos políticas de reciclagem, reuso e descarte correto em todas as unidades. O terceiro é o consumo consciente: campanhas internas e externas para incentivar o uso racional de recursos como água, papel e energia. O quarto é a educação: parcerias com instituições para promover formação e conscientização sobre temas ambientais.

      Sabemos que mudanças reais exigem consistência, não apenas discursos. Por isso, vamos publicar relatórios periódicos com nossos indicadores, metas e resultados, permitindo que qualquer pessoa acompanhe o progresso.

      Convidamos clientes, parceiros e colaboradores a se engajarem nessa jornada. Pequenas atitudes, quando somadas, produzem impacto significativo. Juntos, podemos construir um futuro mais equilibrado.`,
      date: new Date('2025-05-15'),
    },
    {
      title: 'Entrevista com o CEO',
      image: '/noticia1.png',
      summary:
        'Nosso CEO concedeu uma entrevista exclusiva sobre os planos da empresa para o próximo ano.',
      description: `Em uma conversa exclusiva, nosso CEO compartilhou sua visão sobre o momento atual da empresa e os planos para o próximo ano. A entrevista abordou desde decisões estratégicas até aspectos mais pessoais da liderança.

      Sobre o crescimento recente, ele foi direto: "Nada disso acontece por acaso. É fruto de escolhas consistentes, de um time comprometido e da disposição de ouvir — clientes, colaboradores, parceiros. O sucesso é coletivo." Ele destacou que a empresa seguirá investindo em tecnologia, mas sem perder de vista o fator humano que sustenta qualquer negócio.

      Questionado sobre os desafios do setor, mencionou a velocidade das mudanças e a necessidade de adaptação constante: "O maior risco não é errar, é ficar parado. Preferimos testar, aprender e ajustar do que esperar a certeza absoluta." Também falou sobre a importância de manter uma cultura organizacional saudável, mesmo em momentos de crescimento acelerado.

      Para o próximo ano, os planos incluem expansão para novos mercados, lançamento de produtos que estão em desenvolvimento e fortalecimento das iniciativas de sustentabilidade e inclusão. Ele adiantou que novidades importantes serão anunciadas nos próximos meses.

      A entrevista completa, com trechos adicionais, está disponível em nosso canal oficial de vídeos.`,
      date: new Date('2025-06-01'),
    },
    {
      title: 'Pesquisa de satisfação 2025',
      image: '/noticia2.png',
      summary:
        'Sua opinião é muito importante! Responda à nossa pesquisa de satisfação e ajude-nos a melhorar.',
      description: `Está no ar a nossa pesquisa de satisfação de 2025. Este é o momento em que colocamos o microfone nas mãos de quem realmente importa: você, que usa nossos produtos e serviços todos os dias.

      A pesquisa é rápida — leva em média cinco minutos — e cobre temas como qualidade do atendimento, clareza das informações, desempenho das ferramentas, canais de comunicação e sugestões de melhoria. Não existem respostas certas ou erradas: queremos ouvir a sua percepção sincera, seja ela positiva ou crítica.
          
      Todos os dados são tratados de forma anônima e agregada. As informações coletadas serão usadas para orientar decisões internas, priorizar melhorias e definir o que entra no nosso plano de ação para os próximos meses. Em edições anteriores, foi a partir desse retorno que implementamos mudanças importantes, como a reformulação do suporte e a criação de novos canais de atendimento.
          
      Sua participação faz diferença real. Reserve alguns minutos, responda com atenção e nos ajude a construir uma experiência cada vez melhor. O link da pesquisa está disponível no nosso site e também foi enviado por e-mail aos usuários cadastrados.
          
      Desde já, obrigado pelo tempo e pela confiança.`,
      date: new Date('2025-07-05'),
    },
  ]

  for (const n of noticies) {
    const { buffer, mime } = await loadImage(n.image)

    await prisma.news.create({
      data: {
        title: n.title,
        summary: n.summary,
        description: n.description,
        image: buffer,
        imageMime: mime,
        date: n.date,
      },
    })
    console.log(`Notícia criada: ${n.title}`)
  }

  const totalNews = await prisma.news.count()
  const totalAds = await prisma.advertisements.count()
  console.log(`Total no banco: ${totalNews} notícias e ${totalAds} anúncios`)
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('Desconectado do banco.')
  })