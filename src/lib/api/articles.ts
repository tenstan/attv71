import type { Article as CoreArticle } from "$lib/models/article";


export const getArticles = () => {
  const response: GetArticlesResponse = {
    articles: [
      {
        title: 'De trainingen zijn weer van start',
        createdBy: 'stanmartens',
        datePublished: new Date().toISOString(),
        content: 'Afgelopen week was het al weer zover. Na een lange rust van de zomervakantie hebben we weer kunnen trainen. Ik was er zelf niet bij, maar ik geloof dat er weer een gezellige tafeltennisavond van is gemaakt.' +
                 '\nDe competitie zal er spoedig ook aankomen voor velen van ons. Laten we het komende halfjaar net zo mooi maken als het voorgaande.'
      },
      {
        title: 'De trainingen zijn weer van start',
        createdBy: 'stanmartens',
        datePublished: new Date().toISOString(),
        content: 'Afgelopen week was het al weer zover. Na een lange rust van de zomervakantie hebben we weer kunnen trainen. Ik was er zelf niet bij, maar ik geloof dat er weer een gezellige tafeltennisavond van is gemaakt.' +
                 '\nDe competitie zal er spoedig ook aankomen voor velen van ons. Laten we het komende halfjaar net zo mooi maken als het voorgaande.'
      },
      {
        title: 'De trainingen zijn weer van start',
        createdBy: 'stanmartens',
        datePublished: new Date().toISOString(),
        content: 'Afgelopen week was het al weer zover. Na een lange rust van de zomervakantie hebben we weer kunnen trainen. Ik was er zelf niet bij, maar ik geloof dat er weer een gezellige tafeltennisavond van is gemaakt.' +
                 '\nDe competitie zal er spoedig ook aankomen voor velen van ons. Laten we het komende halfjaar net zo mooi maken als het voorgaande.'
      },
      {
        title: 'De trainingen zijn weer van start',
        createdBy: 'stanmartens',
        datePublished: new Date().toISOString(),
        content: 'Afgelopen week was het al weer zover. Na een lange rust van de zomervakantie hebben we weer kunnen trainen. Ik was er zelf niet bij, maar ik geloof dat er weer een gezellige tafeltennisavond van is gemaakt.' +
                 '\nDe competitie zal er spoedig ook aankomen voor velen van ons. Laten we het komende halfjaar net zo mooi maken als het voorgaande.'
      }
    ]
  }

  const mappedArticles: CoreArticle[] = response.articles.map(article => {
    return {
      title: article.title,
      content: article.content,
      createdBy: article.createdBy,
      datePublished: new Date(article.datePublished)
    }
  })

  return Promise.resolve(mappedArticles);
}

interface GetArticlesResponse {
  articles: Article[];
}

interface Article {
  title: string;
  createdBy: string;
  datePublished: string;
  content: string;
}