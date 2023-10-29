import { useQuery } from '@tanstack/react-query';
import { CategoryTagService } from 'generated/api/front';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';

export const useGetCategories = () => {
  return useQuery(
    ['/category-tags'],
    () => CategoryTagService.getCategories(),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};
