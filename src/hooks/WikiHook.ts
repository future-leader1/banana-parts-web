import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CreateWikiDto,
  UpdateWikiDto,
  WikisService,
} from 'generated/api/front';
import { ApiError } from 'generated/api/front/core/ApiError';
import { useRouter } from 'next/router';
import { PaginationDto } from 'src/types';
import { frontToastError, toastSuccess } from 'src/utils/toast';
interface UseSearchWiki extends PaginationDto {
  searchKeyword: string;
}
interface UseGetMyWikisDto extends PaginationDto {
  searchKeyword?: string;
}
interface PopularWikisByWriterDto extends PaginationDto {
  writerId: number;
}

export const useCreateWiki = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(
    (requestBody: CreateWikiDto) => WikisService.createWiki(requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/wikis']);
        toastSuccess('위키 작성이 완료되었습니다.');
        router.push('/writer/wiki');
        onSuccess?.();
      },
      onError: (err: ApiError) => {
        frontToastError(err);
      },
    }
  );
};

export const useGetMyWikis = (useGetMyWikisDto: UseGetMyWikisDto) => {
  const { page, itemsPerPage, searchKeyword } = useGetMyWikisDto;

  return useQuery(
    ['/wikis', '/me', useGetMyWikisDto],
    () => WikisService.getMyWikis(page, itemsPerPage, searchKeyword),
    {
      enabled: true,
    }
  );
};

export const useGetRelatedWikis = (wikiCategoryId: number, wikiId: number) => {
  return useQuery(
    ['/wikis', '/related-wikis', wikiCategoryId, wikiId],
    () => WikisService.getRelatedWikis(wikiCategoryId, wikiId),
    {
      enabled: !!wikiId && !!wikiCategoryId,
    }
  );
};

export const useGetWikisMappedByCategory = () => {
  return useQuery(['/wikis', '/categories'], () =>
    WikisService.getWikisMappedByCategory()
  );
};

export const useGetAllWikis = (paginationDto: PaginationDto) => {
  return useQuery(['/wikis', '/all', paginationDto], () =>
    WikisService.getAllWikis(paginationDto.page, paginationDto.itemsPerPage)
  );
};

export const useSearchWiki = (useSearchWiki: UseSearchWiki) => {
  const { page, itemsPerPage, searchKeyword } = useSearchWiki;
  return useQuery(
    ['/wikis', '/search', useSearchWiki],
    () => WikisService.searchWiki(searchKeyword, page, itemsPerPage),
    {
      enabled: !!searchKeyword,
      keepPreviousData: true,
    }
  );
};

export const useGetPopularWikisByWriter = (
  popularWikisByWriterDto: PopularWikisByWriterDto
) => {
  const { writerId, page, itemsPerPage } = popularWikisByWriterDto;

  return useQuery(
    ['/wikis', '/writer-popular', popularWikisByWriterDto],
    () => WikisService.getWriterPopularWikis(writerId, page, itemsPerPage),
    {
      enabled: !!writerId,
    }
  );
};

export const useGetExpertWikis = (ExpertWikisDto: PaginationDto) => {
  const { page, itemsPerPage } = ExpertWikisDto;
  return useQuery(
    ['/wikis', '/experts', ExpertWikisDto],
    () => WikisService.getExpertWikis(page, itemsPerPage),
    {
      enabled: true,
    }
  );
};

export const useUpdateWiki = (wikiId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(
    (requestBody: UpdateWikiDto) => {
      return WikisService.updateWiki(wikiId, requestBody);
    },
    {
      onSuccess: () => {
        router.back();
        toastSuccess('변경된 내용이 저장되었습니다.');
        queryClient.invalidateQueries(['/wikis']);
      },
      onError: (error: ApiError) => {
        frontToastError(error);
      },
    }
  );
};

export const useGetWikiDetail = (wikiId: number) => {
  return useQuery(
    ['/wikis', wikiId],
    () => WikisService.getWikiDetail(wikiId),
    {
      enabled: !!wikiId,
    }
  );
};

export const useDeleteWiki = (wikiId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(
    () => {
      return WikisService.deleteWiki(wikiId);
    },
    {
      onSuccess: () => {
        router.back();
        toastSuccess('삭제가 완료되었습니다.');
        queryClient.invalidateQueries(['/wikis']);
      },
      onError: (error: ApiError) => {
        frontToastError(error);
      },
    }
  );
};

export const useGetPopularWikis = (dto?: PaginationDto) => {
  return useQuery(['/wikis', '/popular', dto], () =>
    WikisService.getPopularWikis(dto?.page, dto?.itemsPerPage)
  );
};

export const useValidateTitle = (title: string) => {
  const queryKey = ['/wikis', '/valid-duplicate-title', title];

  const { isError, error } = useQuery(
    queryKey,
    () => WikisService.validDuplicateTitle({ title }),
    {
      enabled: !!title,
      retry: false,
    }
  );

  return {
    error,
    isError,
  };
};
