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
  const deletedAds = await prisma.advertisements.deleteMany({})
  console.log(`${deletedAds.count} anúncios removidos`)

  const deletedNews = await prisma.news.deleteMany({})
  console.log(`${deletedNews.count} notícias removidas`)

  const ads = [
    {
      title: 'Super Oferta',
      image: '/propa1.png', 
      link: 'https://exemplo.com/oferta',
      description: 'Aproveite a super oferta do dia!',
      isActive: true,
      endDate: new Date('2026-12-31'),
    },
    {
      title: 'Desconto Especial',
      image: '/propa2.png', 
      link: 'https://exemplo.com/desconto',
      description: '10% de desconto na primeira compra',
      isActive: true,
    },
    {
      title: 'Lançamento',
      image: '/propa1.png',
      link: 'https://exemplo.com/lancamento',
      description: 'Novo produto disponível!',
      isActive: false,
    },
  ]

  const noticies = [
    {
      title: 'Nova funcionalidade lançada!',
      image: '/noticia1.png',
      description: 'Confira as novas funcionalidades que adicionamos ao sistema para melhorar sua experiência.'
    },
    {
      title: 'Atualização de segurança importante',
      image: '/noticia2.png',
      description: 'Lançamos uma atualização de segurança crítica. Recomendamos que todos os usuários atualizem o sistema.'
    },
    {
      title: 'Parceria estratégica anunciada',
      image: '/noticia1.png',
      description: 'Fechamos uma nova parceria que trará benefícios exclusivos para nossos clientes.'
    },
    {
      title: 'Novo recorde de usuários',
      image: null,
      description: 'Alcançamos a marca de 1 milhão de usuários ativos! Agradecemos a confiança de todos.'
    },
    {
      title: 'Workshop gratuito de tecnologia',
      image: '/noticia2.png',
      description: 'Participe do nosso workshop gratuito sobre as tendências tecnológicas para 2025.'
    },
  ]

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

main().catch((e) => {
    console.error('Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('Desconectado do banco.')
  })