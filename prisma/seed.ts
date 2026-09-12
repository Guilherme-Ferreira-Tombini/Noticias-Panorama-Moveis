import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL não encontrada no .env')
  process.exit(1)
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {

  // limpeza para dados base
  const deletedAds = await prisma.advertisements.deleteMany()
  const deletedNews = await prisma.news.deleteMany()
  console.log(`${deletedAds.count} anúncios removidos`)
  console.log(`${deletedNews.count} notícias removidas`)

  // Dados de anúncios para o site
  const ads = [
    {
      title: 'Super Oferta de Verão',
      image: '/propa1.png',
      link: 'https://exemplo.com/oferta-verao',
      description: 'Aproveite descontos de até 50% em toda a loja!',
      isActive: true,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-03-31'),
    },
    {
      title: 'Desconto Especial para Novos Clientes',
      image: '/propa2.png',
      link: 'https://exemplo.com/novo-cliente',
      description: '10% de desconto na primeira compra. Cadastre-se já!',
      isActive: true,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-12-31'),
    },
    {
      title: 'Lançamento Exclusivo',
      image: '/propa1.png',
      link: 'https://exemplo.com/lancamento',
      description: 'Novo produto disponível com frete grátis para todo o Brasil.',
      isActive: true,
      startDate: new Date('2025-04-15'),
      endDate: new Date('2025-06-30'),
    },
    {
      title: 'Black Friday Antecipada',
      image: '/propa2.png',
      link: 'https://exemplo.com/black-friday',
      description: 'Ofertas imperdíveis antes da hora. Corre que é por tempo limitado!',
      isActive: false,
      startDate: new Date('2025-11-01'),
      endDate: new Date('2025-11-30'),
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
      endDate: null,
    },
  ]

  // Dados de noticias no banco
  const noticies = [
    {
      title: 'Nova funcionalidade lançada!',
      image: '/noticia1.png',
      description:
        'Confira as novas funcionalidades que adicionamos ao sistema para melhorar sua experiência.',
      date: new Date('2025-01-10'),
    },
    {
      title: 'Atualização de segurança importante',
      image: '/noticia2.png',
      description:
        'Lançamos uma atualização de segurança crítica. Recomendamos que todos os usuários atualizem o sistema.',
      date: new Date('2025-02-05'),
    },
    {
      title: 'Parceria estratégica anunciada',
      image: '/noticia1.png',
      description:
        'Fechamos uma nova parceria que trará benefícios exclusivos para nossos clientes.',
      date: new Date('2025-03-12'),
    },
    {
      title: 'Novo recorde de usuários',
      image: '/noticia2.png',
      description:
        'Alcançamos a marca de 1 milhão de usuários ativos! Agradecemos a confiança de todos.',
      date: new Date('2025-04-01'),
    },
    {
      title: 'Workshop gratuito de tecnologia',
      image: '/noticia2.png',
      description:
        'Participe do nosso workshop gratuito sobre as tendências tecnológicas para 2025.',
      date: new Date('2025-04-20'),
    },
    {
      title: 'Atualização do aplicativo móvel',
      image: '/noticia1.png',
      description:
        'Nova versão do app já está disponível com melhorias de desempenho e correções de bugs.',
      date: new Date('2025-05-02'),
    },
    {
      title: 'Campanha de sustentabilidade',
      image: '/noticia2.png',
      description:
        'Iniciamos uma campanha para reduzir o impacto ambiental das nossas operações.',
      date: new Date('2025-05-15'),
    },
    {
      title: 'Entrevista com o CEO',
      image: '/noticia1.png',
      description:
        'Nosso CEO concedeu uma entrevista exclusiva sobre os planos da empresa para o próximo ano.',
      date: new Date('2025-06-01'),
    },
    {
      title: 'Pesquisa de satisfação 2025',
      image: '/noticia2.png',
      description:
        'Sua opinião é muito importante! Responda à nossa pesquisa de satisfação e ajude-nos a melhorar.',
      date: new Date('2025-07-05'),
    },
  ]

  // Inserção dos dados no banco
  const adsResult = await prisma.advertisements.createMany({
    data: ads,
  })
  console.log(`${adsResult.count} anúncios publicados com sucesso!`)

  const newsResult = await prisma.news.createMany({
    data: noticies,
  })
  console.log(`${newsResult.count} notícias publicadas com sucesso!`)

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