import { useQuery } from '@tanstack/react-query';
import { WikiCategoriesService } from 'generated/api/front';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';

export const useFindAllWikiCategories = () => {
  return useQuery(
    ['/wiki-category-entities'],
    () => WikiCategoriesService.findAllWikiCategories(),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};
