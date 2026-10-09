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
  const deletedAds = await prisma.advertisements.deleteMany()
  const deletedNews = await prisma.news.deleteMany()

  console.log(`${deletedAds.count} anúncios removidos`)
  console.log(`${deletedNews.count} notícias removidas`)

  const ads = [
    {
      title: 'Semana de Ofertas: economize até 50%',
      image: '/propa1.png',
      link: 'https://g1.globo.com/',
      description:
        'Renove seus favoritos com condições especiais por tempo limitado. Aproveite descontos de até 50% em produtos selecionados enquanto durar a campanha.',
      isActive: true,
      startDate: new Date('2026-10-01T00:00:00'),
      endDate: new Date('2026-10-31T23:59:59'),
    },
    {
      title: 'Sua primeira compra com 10% de desconto',
      image: '/propa2.png',
      link: 'https://novanews.com.br/',
      description:
        'Está chegando agora? Faça seu primeiro pedido e aproveite 10% de desconto. Conheça nossas ofertas e descubra uma nova forma de comprar.',
      isActive: true,
      startDate: new Date('2026-09-01T00:00:00'),
      endDate: new Date('2026-12-31T23:59:59'),
    },
    {
      title: 'Novidades que chegaram para facilitar seu dia',
      image: '/propa1.png',
      link: 'https://jornaldanova.com.br/',
      description:
        'Conheça nossa seleção de lançamentos e encontre opções pensadas para tornar sua rotina mais prática. Consulte as condições e a disponibilidade.',
      isActive: true,
      startDate: new Date('2026-10-01T00:00:00'),
      endDate: new Date('2026-11-30T23:59:59'),
    },
    {
      title: 'Esquenta Black Friday: ofertas selecionadas',
      image: '/propa2.png',
      link: 'https://google.com/',
      description:
        'Prepare sua lista de desejos e acompanhe as ofertas especiais da temporada. Confira os produtos participantes e as condições de cada promoção.',
      isActive: false,
      startDate: new Date('2026-11-01T00:00:00'),
      endDate: new Date('2026-11-30T23:59:59'),
    },
    {
      title: 'Oferta por tempo limitado',
      image: '/propa1.png',
      link: null,
      description:
        'Uma oportunidade para economizar em produtos selecionados. Consulte as condições da campanha e aproveite enquanto a oferta estiver disponível.',
      isActive: false,
      startDate: new Date('2026-10-01T00:00:00'),
      endDate: new Date('2026-10-02T23:59:59'),
    },
    {
      title: 'Plano anual: mais vantagens para você',
      image: '/propa2.png',
      link: 'https://exemplo.com/premium',
      description:
        'Escolha o plano anual e aproveite uma condição especial de assinatura, com três meses adicionais conforme as regras da oferta.',
      isActive: true,
      startDate: new Date('2026-09-15T00:00:00'),
      endDate: new Date('2026-12-31T23:59:59'),
    },
  ]

  for (const ad of ads) {
    await prisma.advertisements.create({
      data: {
        title: ad.title,
        image: ad.image,
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
      title:
        'Plataforma recebe atualização e promete uma experiência mais simples para os usuários',
      image: '/noticia1.png',
      summary:
        'Nova versão reorganiza o painel principal, melhora a busca e facilita o acesso às informações mais utilizadas. A implantação será gradual.',
      description: `A experiência de quem utiliza uma plataforma digital diariamente costuma ser definida por pequenos detalhes. Encontrar uma informação sem precisar abrir várias telas, receber um aviso no momento certo ou concluir uma tarefa sem repetir etapas são situações que fazem diferença na rotina. Foi a partir desse tipo de observação que a equipe responsável pelo sistema iniciou um projeto de atualização que agora começa a chegar aos usuários.

O trabalho teve início depois que o suporte passou a registrar dúvidas recorrentes sobre navegação e acesso a determinadas funções. Embora os recursos já estivessem disponíveis, parte dos usuários relatava dificuldade para identificar onde estavam algumas opções. Em outros casos, tarefas simples exigiam mais etapas do que o necessário. Os relatos foram reunidos e utilizados como ponto de partida para uma revisão mais ampla da interface.

Durante o desenvolvimento, a equipe analisou os caminhos mais utilizados, comparou diferentes propostas de organização e realizou testes com grupos de usuários. A prioridade não era apenas modificar a aparência das telas, mas tornar as ações cotidianas mais previsíveis. A nova versão reorganiza o painel inicial, destaca ferramentas utilizadas com frequência e apresenta atalhos que ajudam a reduzir o tempo gasto na navegação.

A busca também passou por mudanças. Agora, o sistema foi preparado para lidar melhor com termos incompletos e apresentar resultados de maneira mais organizada. A proposta é permitir que o usuário encontre conteúdos relevantes sem precisar conhecer exatamente o nome de cada seção. A atualização inclui ainda ajustes nas notificações, que passam a oferecer informações mais claras sobre os acontecimentos que exigem atenção.

Outro ponto considerado durante o projeto foi a acessibilidade. A equipe revisou elementos de contraste, identificou oportunidades para melhorar a navegação pelo teclado e reorganizou componentes que poderiam dificultar o uso por pessoas com diferentes necessidades. Essas alterações fazem parte de um esforço contínuo para tornar o ambiente digital mais compreensível e acessível.

Em uma situação fictícia utilizada durante os testes, uma pequena equipe administrativa relatou que precisava alternar entre várias áreas para acompanhar tarefas pendentes. Após experimentar o novo painel, os participantes conseguiram identificar com mais facilidade as atividades prioritárias. O exemplo ilustra o objetivo da atualização: diminuir obstáculos que, isoladamente, parecem pequenos, mas que podem consumir tempo ao longo de uma jornada de trabalho.

A implantação será realizada de forma gradual para permitir o acompanhamento do desempenho e a identificação de eventuais problemas. Durante esse período, a equipe pretende observar o comportamento dos recursos, analisar os chamados recebidos e corrigir inconsistências antes de ampliar a distribuição para todos os usuários.

A recomendação é que os usuários acompanhem os comunicados oficiais e consultem a área de ajuda caso percebam diferenças na interface. Como acontece em mudanças desse tipo, algumas opções podem aparecer em locais diferentes daqueles aos quais as pessoas estavam acostumadas.

A atualização representa uma etapa de um processo que não termina com o lançamento. A proposta é manter um ciclo de melhorias baseado em observações práticas, testes e sugestões. A equipe também pretende reunir novos comentários nas próximas semanas para identificar quais mudanças tiveram maior impacto e quais pontos ainda precisam de atenção.

Mais do que apresentar uma interface renovada, o projeto procura responder a uma necessidade comum em serviços digitais: fazer com que a tecnologia seja menos complicada e permita que as pessoas se concentrem no que realmente precisam realizar.`,
      date: new Date('2026-10-08T09:00:00'),
    },
    {
      title:
        'Pequenas empresas ampliam presença digital e apostam em atendimento mais próximo',
      image: '/noticia2.png',
      summary:
        'Comerciantes de diferentes segmentos investem em canais digitais, organização de pedidos e relacionamento com clientes para acompanhar novos hábitos de consumo.',
      description: `A rotina de pequenos comerciantes mudou à medida que os clientes passaram a pesquisar produtos, comparar preços e entrar em contato com as empresas pela internet. Para muitos negócios, estar presente nos canais digitais deixou de ser apenas uma alternativa de divulgação e passou a fazer parte do atendimento cotidiano.

Em uma cidade fictícia do interior paulista, a história de uma pequena loja de utilidades ajuda a ilustrar esse movimento. Durante anos, as vendas da loja dependeram principalmente das pessoas que passavam em frente ao estabelecimento e das recomendações feitas por clientes antigos. O contato era próximo, mas as informações sobre produtos, disponibilidade e horários ficavam concentradas no atendimento presencial.

A mudança começou quando a responsável pela loja percebeu que parte dos consumidores enviava mensagens antes mesmo de sair de casa. As perguntas eram simples: determinado produto estava disponível? A loja fechava para o almoço? Era possível reservar uma mercadoria para retirar mais tarde? Responder individualmente a cada solicitação passou a consumir uma parcela considerável do expediente.

A primeira medida foi organizar as informações mais procuradas e publicá-las em um canal digital. Em seguida, a equipe passou a registrar os pedidos recebidos, confirmar a disponibilidade dos produtos e estabelecer uma rotina para responder às mensagens. O processo não exigiu uma transformação completa do negócio, mas trouxe mais clareza para atividades que antes eram realizadas de maneira improvisada.

A experiência fictícia também evidencia um desafio comum entre empresas de menor porte: adotar ferramentas digitais sem perder a proximidade que caracteriza o atendimento local. Automatizar respostas pode ajudar a resolver dúvidas frequentes, mas questões específicas continuam exigindo atenção individual. O equilíbrio entre agilidade e relacionamento tornou-se uma preocupação importante para quem atende públicos com necessidades diferentes.

Outro aprendizado surgiu na organização do estoque. Quando as informações eram atualizadas apenas no estabelecimento, nem sempre a equipe conseguia confirmar rapidamente se um item anunciado ainda estava disponível. Com um registro mais consistente, os funcionários passaram a verificar as quantidades antes de confirmar os pedidos, reduzindo a possibilidade de oferecer produtos indisponíveis.

A presença digital, por si só, não garante o aumento das vendas. A qualidade das informações, o cumprimento dos prazos e a clareza das condições comerciais continuam sendo fatores decisivos. Uma página movimentada pode atrair visitantes, mas a confiança depende da experiência que o consumidor encontra depois do primeiro contato.

O custo também precisa ser considerado. Pequenos negócios nem sempre dispõem de orçamento para contratar plataformas sofisticadas ou manter uma equipe dedicada à comunicação. Por isso, a recomendação é começar com ferramentas compatíveis com a estrutura existente, estabelecer prioridades e avaliar os resultados antes de ampliar os investimentos.

Na prática, algumas ações podem fazer diferença: manter os horários atualizados, responder às dúvidas dentro de um prazo razoável, apresentar fotografias fiéis dos produtos e explicar claramente as condições de pagamento, entrega e troca. Essas medidas não substituem um planejamento comercial, mas ajudam a reduzir incertezas e tornam a comunicação mais transparente.

A mudança de hábitos dos consumidores também exige atenção à proteção de dados. Informações fornecidas durante um pedido ou atendimento devem ser utilizadas com responsabilidade, e as empresas precisam evitar solicitar dados que não sejam necessários para concluir a operação. A confiança construída no contato diário pode ser prejudicada quando o cliente não entende como suas informações são tratadas.

Apesar das dificuldades, a digitalização oferece oportunidades para empresas que desejam alcançar novos públicos e organizar melhor a própria rotina. A experiência descrita nesta reportagem é ilustrativa, mas representa situações que podem ser observadas em diferentes segmentos do comércio.

O próximo passo para negócios que já iniciaram essa transformação é acompanhar os resultados com critérios simples: quantidade de solicitações atendidas, tempo médio de resposta, pedidos concluídos e dúvidas que continuam aparecendo. Com essas informações, fica mais fácil identificar o que funciona e evitar investimentos que não correspondam às necessidades reais da empresa.

No fim, a presença digital mais eficiente não é necessariamente a que utiliza o maior número de ferramentas. É aquela que facilita o contato, oferece informações confiáveis e ajuda o negócio a manter um relacionamento consistente com seus clientes.`,
      date: new Date('2026-10-06T10:30:00'),
    },
    {
      title:
        'Segurança digital entra na rotina das empresas após aumento das tentativas de fraude',
      image: '/noticia1.png',
      summary:
        'Organizações reforçam orientações internas, revisão de acessos e procedimentos de recuperação de contas para reduzir riscos no ambiente digital.',
      description: `Uma mensagem que parece vir de um fornecedor conhecido, um pedido inesperado para redefinir uma senha ou um aviso urgente sobre uma conta bloqueada podem parecer situações comuns em um dia de trabalho. Entretanto, quando essas solicitações são utilizadas para induzir alguém a fornecer informações confidenciais, pequenos descuidos podem abrir caminho para fraudes.

A segurança digital passou a fazer parte das preocupações de empresas de diferentes tamanhos. O uso de ferramentas em nuvem, sistemas de atendimento remoto e plataformas integradas facilitou a execução de tarefas, mas também tornou necessário revisar a forma como os acessos são concedidos e monitorados.

Em um cenário fictício utilizado para ilustrar esse tipo de ocorrência, uma empresa de serviços recebeu uma mensagem que imitava a comunicação de um parceiro comercial. O texto solicitava a confirmação de dados de acesso e indicava um prazo curto para evitar a interrupção de um serviço. A urgência da mensagem chamou a atenção de um funcionário, que decidiu confirmar a solicitação por um canal já conhecido antes de realizar qualquer ação.

A verificação revelou inconsistências no endereço do remetente e no destino do link apresentado. O episódio levou a empresa a revisar as orientações internas e a preparar exemplos de mensagens suspeitas para discutir com a equipe. A situação não descreve uma ocorrência real, mas demonstra como procedimentos simples podem ajudar a interromper uma tentativa de fraude.

Uma das medidas mais importantes é a autenticação em dois fatores, que acrescenta uma etapa de verificação ao processo de entrada em uma conta. Mesmo quando uma senha é descoberta ou reutilizada indevidamente, essa camada adicional pode dificultar o acesso não autorizado. A proteção, porém, precisa estar acompanhada de outras práticas, pois nenhum recurso isolado elimina todos os riscos.

A escolha de senhas também merece atenção. Utilizar a mesma combinação em diferentes serviços amplia as consequências de um vazamento, já que criminosos podem tentar reaproveitar credenciais expostas em outros ambientes. Senhas longas e exclusivas, armazenadas em um gerenciador confiável quando apropriado, ajudam a reduzir esse problema.

Outro ponto essencial é a gestão de permissões. Nem todo funcionário precisa ter acesso a todas as informações ou ferramentas da organização. Definir permissões de acordo com as responsabilidades de cada pessoa reduz a exposição de dados e facilita a investigação de atividades inesperadas. Quando alguém muda de função ou deixa a empresa, os acessos correspondentes precisam ser revisados.

As atualizações de software também fazem parte da prevenção. Sistemas desatualizados podem conter falhas conhecidas para as quais já existem correções. Manter aplicativos, navegadores e sistemas operacionais atualizados reduz a exposição a vulnerabilidades corrigidas pelos fornecedores. Nas organizações, esse processo deve ser acompanhado para evitar que equipamentos importantes permaneçam sem manutenção.

A preparação para incidentes é outro aspecto frequentemente negligenciado. Mesmo com medidas preventivas, uma empresa precisa saber a quem comunicar uma suspeita, como suspender um acesso comprometido e onde encontrar cópias de segurança. Um procedimento claro pode reduzir a confusão nos primeiros minutos de um problema e facilitar a recuperação das operações.

A comunicação interna deve evitar a culpabilização automática de quem relata uma mensagem suspeita. Se os funcionários temerem punições por fazer perguntas ou informar um possível erro, poderão esconder situações importantes. Criar um ambiente no qual dúvidas sejam tratadas com seriedade contribui para identificar riscos mais cedo.

Também é necessário ter cuidado com informações recebidas por mensagens, ligações e redes sociais. Pedidos de pagamento inesperados, mudanças repentinas em dados bancários e solicitações de códigos de autenticação devem ser confirmados por um canal independente. A aparência profissional de uma mensagem não é garantia de legitimidade.

Para usuários comuns, as recomendações são semelhantes: desconfiar de links inesperados, conferir o endereço dos sites, utilizar senhas diferentes, ativar recursos adicionais de proteção e manter os dispositivos atualizados. Caso uma credencial seja inserida em uma página suspeita, a orientação é trocar a senha por um canal oficial e verificar outras contas que possam utilizar a mesma combinação.

A segurança digital não depende exclusivamente de ferramentas caras ou de profissionais especializados. Processos consistentes, treinamento periódico e atenção aos detalhes podem reduzir parte significativa dos riscos cotidianos. Ainda assim, cada organização deve adaptar suas medidas ao tipo de informação que mantém e às consequências de uma eventual interrupção.

À medida que as operações se tornam mais conectadas, proteger contas e informações deixa de ser uma tarefa restrita ao departamento técnico. É uma responsabilidade compartilhada, construída por decisões diárias e por procedimentos que precisam ser revisados continuamente.`,
      date: new Date('2026-10-03T08:45:00'),
    },
    {
      title:
        'Aplicativos móveis passam por mudanças para melhorar desempenho e estabilidade',
      image: '/noticia2.png',
      summary:
        'Atualização prioriza a velocidade de abertura, a redução de falhas e uma navegação mais consistente em diferentes dispositivos.',
      description: `O celular se tornou uma das principais ferramentas para acessar serviços digitais, consultar informações e resolver tarefas durante o dia. Por isso, problemas como demora na abertura de uma tela, interrupções inesperadas e notificações que não chegam no momento certo podem comprometer a experiência de quem depende de um aplicativo.

Uma nova etapa de melhorias no aplicativo, em um cenário fictício de desenvolvimento, foi planejada justamente para enfrentar essas dificuldades. A iniciativa começou com a análise dos relatos enviados pelos usuários e a revisão de situações em que o sistema apresentava comportamento inconsistente. Em vez de concentrar todos os esforços em mudanças visuais, a equipe priorizou a estabilidade e a resposta dos recursos mais utilizados.

Durante a análise, foram considerados diferentes fatores, incluindo a qualidade da conexão, a capacidade dos dispositivos e a quantidade de informações processadas ao abrir determinadas telas. Essa avaliação permitiu identificar etapas que poderiam ser simplificadas e operações que precisavam de tratamento mais eficiente.

Uma das mudanças previstas envolve a organização do carregamento de conteúdo. Em algumas situações, os usuários precisavam aguardar a conclusão de várias operações antes de conseguir visualizar as informações principais. Com a revisão do fluxo, a intenção é apresentar os elementos essenciais com mais rapidez, enquanto outros detalhes são carregados conforme necessário.

As notificações também receberam atenção. Alertas excessivos podem fazer com que mensagens importantes passem despercebidas, enquanto falhas de entrega deixam o usuário sem informações relevantes. A proposta é tornar os avisos mais claros e revisar as condições em que cada tipo de notificação deve ser apresentado.

Outro aspecto do trabalho foi a compatibilidade. Um aplicativo pode funcionar de maneira diferente dependendo da versão do sistema operacional, da memória disponível e das características do aparelho. Por essa razão, testes em diferentes configurações são importantes para identificar comportamentos que não aparecem em um único dispositivo.

A equipe também revisou situações relacionadas ao acesso à conta e à navegação entre telas. O objetivo é reduzir etapas desnecessárias e tornar mais previsível o retorno a uma atividade interrompida. Essas alterações são especialmente relevantes para pessoas que alternam entre o aplicativo e outras ferramentas durante o dia.

Mesmo com testes, atualizações podem apresentar dificuldades em determinados cenários. Por isso, o acompanhamento após a disponibilização da versão é uma etapa importante. Relatos dos usuários ajudam a identificar problemas que não foram reproduzidos durante o desenvolvimento e fornecem informações para orientar novas correções.

A recomendação para quem utiliza aplicativos é manter o sistema atualizado, instalar versões por meio das lojas oficiais e verificar os avisos publicados pelo responsável pelo serviço. Quando um problema persiste, registrar a versão do aplicativo, o modelo do dispositivo e os passos que levaram à falha pode ajudar a equipe de suporte a investigar a situação.

A atualização representa um trabalho contínuo de manutenção. A qualidade de um aplicativo não depende apenas de novos recursos, mas também da capacidade de realizar as tarefas existentes de forma estável, segura e compreensível. Melhorias pequenas, quando aplicadas de maneira consistente, podem produzir uma diferença importante na rotina dos usuários.`,
      date: new Date('2026-09-28T11:00:00'),
    },
    {
      title:
        'Consumo consciente ganha espaço e incentiva mudanças nos hábitos do dia a dia',
      image: '/noticia1.png',
      summary:
        'Iniciativas de redução de desperdício e melhor aproveitamento de recursos mostram como mudanças simples podem fazer parte da rotina de famílias e empresas.',
      description: `A preocupação com o desperdício tem levado famílias, comerciantes e organizações a observar com mais atenção a maneira como utilizam água, energia, embalagens e outros recursos. Embora as mudanças possam parecer pequenas quando consideradas individualmente, a adoção de hábitos consistentes ajuda a criar rotinas mais responsáveis.

Em uma iniciativa fictícia realizada por uma associação comunitária, moradores de diferentes bairros foram convidados a identificar situações de desperdício em suas casas e locais de trabalho. A proposta não envolvia grandes investimentos, mas uma análise prática das atividades cotidianas: luzes acesas em ambientes vazios, torneiras com vazamentos, alimentos descartados por falta de planejamento e materiais que poderiam ser reutilizados.

No início, os participantes perceberam que muitos desses hábitos estavam ligados à falta de organização ou à ausência de informações. Algumas famílias compravam mais alimentos do que conseguiam consumir, enquanto pequenos estabelecimentos descartavam materiais que poderiam ter outro destino. Ao registrar essas situações, os participantes conseguiram identificar oportunidades de mudança.

Uma das primeiras medidas foi planejar melhor as compras. A elaboração de listas, a verificação dos alimentos já disponíveis e o armazenamento adequado ajudaram a reduzir a perda de produtos. Em estabelecimentos comerciais, a organização do estoque também passou a ser vista como uma forma de evitar compras desnecessárias e diminuir o volume de resíduos.

A utilização de energia foi outro ponto observado. Aproveitar a iluminação natural, desligar equipamentos quando não estão em uso e verificar a eficiência de aparelhos são atitudes que podem contribuir para uma utilização mais racional dos recursos. O impacto de cada medida depende das condições do local e dos hábitos anteriores, por isso acompanhar o consumo é importante para avaliar os resultados.

Na gestão de resíduos, a separação correta dos materiais facilita a coleta seletiva onde esse serviço está disponível. Entretanto, separar os resíduos é apenas uma parte do processo. A redução do consumo desnecessário e a reutilização segura de materiais também ajudam a evitar que produtos descartáveis sejam utilizados sem necessidade.

A iniciativa ainda destacou a importância de compartilhar informações confiáveis. Recomendações genéricas nem sempre se aplicam a todas as realidades, especialmente em locais com infraestrutura diferente. Por isso, os participantes foram orientados a consultar os serviços municipais e as organizações responsáveis pela coleta para conhecer as opções existentes em cada região.

Empresas também podem contribuir ao revisar processos de compra, reduzir impressões desnecessárias e planejar melhor a utilização de materiais. Essas ações precisam ser acompanhadas por metas realistas e responsabilidades definidas, evitando que campanhas de conscientização se limitem a mensagens sem mudanças concretas na rotina.

Outro ponto importante é a continuidade. É comum que novas iniciativas despertem entusiasmo nas primeiras semanas, mas manter os resultados exige acompanhamento e revisão dos hábitos. Registrar o consumo, comparar períodos e discutir dificuldades ajuda a identificar medidas que funcionam e aquelas que precisam ser adaptadas.

A participação da comunidade também pode ampliar os efeitos das ações. Compartilhar experiências, organizar atividades educativas e divulgar os serviços disponíveis permite que mais pessoas conheçam alternativas adequadas à sua realidade. A colaboração, porém, deve respeitar as condições de cada família e evitar a ideia de que todas as pessoas dispõem dos mesmos recursos.

O consumo consciente não significa deixar de atender necessidades importantes, mas tomar decisões com maior atenção ao uso dos recursos e às consequências do desperdício. Em muitos casos, começar por uma mudança simples e mantê-la ao longo do tempo é mais eficaz do que adotar várias medidas difíceis de sustentar.

A experiência descrita é ilustrativa e não representa uma campanha real. Ainda assim, mostra como o planejamento, a informação e a participação coletiva podem transformar uma preocupação ampla em ações práticas e possíveis de acompanhar.`,
      date: new Date('2026-09-20T09:15:00'),
    },
    {
      title:
        'Pesquisa de satisfação busca entender o que os usuários esperam dos serviços digitais',
      image: '/noticia2.png',
      summary:
        'Questionário fictício reúne opiniões sobre atendimento, facilidade de uso e qualidade das informações para orientar futuras melhorias na plataforma.',
      description: `Entender como as pessoas utilizam um serviço é uma das etapas mais importantes para melhorar sua qualidade. Indicadores técnicos mostram se uma página carrega rapidamente ou se uma operação foi concluída, mas nem sempre explicam por que uma função parece simples para algumas pessoas e confusa para outras. É nesse espaço entre os números e a experiência cotidiana que as pesquisas de satisfação podem contribuir.

Em uma iniciativa fictícia, uma plataforma digital decidiu organizar uma pesquisa para conhecer melhor as expectativas de seus usuários. O questionário foi planejado para reunir opiniões sobre facilidade de navegação, clareza das informações, qualidade do atendimento e dificuldades encontradas durante o uso. A proposta também incluiu um campo aberto para sugestões que não estivessem contempladas nas perguntas principais.

A preparação começou com a definição dos temas que realmente poderiam orientar decisões. Em vez de perguntar sobre todos os aspectos possíveis do serviço, a equipe selecionou questões relacionadas às atividades mais frequentes e aos problemas que apareciam com maior regularidade nos canais de suporte.

Uma das preocupações foi tornar as perguntas claras e objetivas. Questões muito extensas ou que misturam vários assuntos podem dificultar a interpretação das respostas. A equipe fictícia também considerou a necessidade de oferecer opções equilibradas, evitando formular perguntas que induzissem os participantes a escolher uma resposta específica.

O questionário foi organizado para permitir a participação de pessoas com diferentes níveis de familiaridade com a plataforma. Além das avaliações fechadas, os participantes poderiam descrever situações concretas em que encontraram dificuldades ou indicar recursos que gostariam de ver aprimorados.

As respostas abertas podem revelar problemas que não aparecem em perguntas padronizadas. Um usuário pode avaliar positivamente o serviço de maneira geral e, ao mesmo tempo, relatar que não consegue encontrar determinada informação. Outro pode considerar a navegação simples, mas apontar que precisa de mais clareza sobre os prazos de atendimento.

Para que os resultados sejam úteis, a coleta precisa ser acompanhada por critérios de organização e análise. Agrupar respostas por assunto ajuda a identificar padrões, enquanto a leitura dos comentários permite compreender o contexto de cada avaliação. É importante, porém, não tratar a opinião de um grupo voluntário como se representasse automaticamente todos os usuários.

A privacidade também faz parte do planejamento. Os participantes devem receber informações claras sobre a finalidade da pesquisa e sobre como suas respostas serão utilizadas. Sempre que possível, a coleta deve evitar informações pessoais desnecessárias e seguir as regras aplicáveis à proteção de dados.

Depois da coleta, o passo seguinte é transformar os resultados em prioridades. Nem toda sugestão poderá ser implementada imediatamente, seja por limitações técnicas, custos ou necessidade de estudos adicionais. Comunicar quais melhorias serão consideradas e explicar as decisões ajuda a manter expectativas realistas e demonstra que as contribuições foram analisadas.

A equipe fictícia também planejou comparar os resultados com avaliações futuras. Uma pesquisa isolada oferece um retrato de determinado momento, mas a repetição em intervalos adequados pode ajudar a identificar mudanças na percepção dos usuários. Para que a comparação seja válida, é importante manter critérios consistentes e registrar alterações na metodologia.

O atendimento continua sendo um elemento importante nesse processo. Reclamações recorrentes podem indicar uma falha de comunicação, uma etapa desnecessária ou uma expectativa que não está sendo atendida. Ao investigar esses relatos, a organização pode encontrar oportunidades de melhoria que não seriam identificadas apenas por meio de indicadores de acesso.

A pesquisa descrita nesta reportagem é um exemplo fictício e não corresponde a um levantamento efetivamente realizado. Seu objetivo é ilustrar como a escuta organizada pode integrar um processo de melhoria contínua.

No fim, uma pesquisa de satisfação só produz valor quando suas conclusões são utilizadas para orientar decisões. Perguntar é o primeiro passo; analisar com responsabilidade, estabelecer prioridades e comunicar os resultados é o que transforma as respostas em mudanças concretas.`,
      date: new Date('2026-09-12T14:00:00'),
    },
  ]

  for (const n of noticies) {
    await prisma.news.create({
      data: {
        title: n.title,
        summary: n.summary,
        description: n.description,
        image: n.image,
        date: n.date,
      },
    })

    console.log(`Notícia criada: ${n.title}`)
  }

  const totalNews = await prisma.news.count()
  const totalAds = await prisma.advertisements.count()

  console.log(
    `Total no banco: ${totalNews} notícias e ${totalAds} anúncios`,
  )
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