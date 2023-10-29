export interface PresignedPostResponse {
  url: string;
  fields: {
    key: string;
    policy: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    'X-Amz-Signature': string;
  };
}
