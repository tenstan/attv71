import { useFetch } from '#app'
import type { ArticlesApiResponse } from '~/shared/models/api/articles'

const useArticlesFetch = () => {
  return useFetch<ArticlesApiResponse>('/api/articles')
}

export default useArticlesFetch
