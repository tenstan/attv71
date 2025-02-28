import { useFetch } from '#app'
import type { NavigationApiResponse } from '~/shared/models/api/navigation'

const useNavigationFetch = () => {
  return useFetch<NavigationApiResponse>('/api/navigation')
}

export default useNavigationFetch
