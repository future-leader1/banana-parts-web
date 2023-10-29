import { useQuery } from '@tanstack/react-query';
import { RegisterRequestTemplateService } from 'generated/api/front';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';

export const useGetRegisterRequestTemplate = () => {
  return useQuery(
    ['/register-request-templates'],
    () => RegisterRequestTemplateService.getRecentTemplate(),
    {
      enabled: !!OpenAPI.TOKEN,
    }
  );
};
