const CLIENT_ENVS: { [key: string]: string | undefined } = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ADMIN_API_URL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
  NEXT_PUBLIC_AWS_LAMBDA_API_URL: process.env.NEXT_PUBLIC_AWS_LAMBDA_API_URL,
  NEXT_PUBLIC_TEMPLATE_URL: process.env.NEXT_PUBLIC_TEMPLATE_URL,
  NEXT_PUBLIC_ENG_TEMPLATE_URL: process.env.NEXT_PUBLIC_ENG_TEMPLATE_URL,
  NEXT_PUBLIC_DOWNLOAD_URL: process.env.NEXT_PUBLIC_DOWNLOAD_URL,
  NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  NEXT_PUBLIC_CHANNEL_IO_KEY: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
  NEXT_PUBLIC_KAKAO_APP_KEY: process.env.NEXT_PUBLIC_KAKAO_APP_KEY,
  NEXT_PUBLIC_FROALA_KEY: process.env.NEXT_PUBLIC_FROALA_KEY,
};

const getEnvironmentVariable = (environmentVariable: string): string => {
  const unValidatedEnvironmentVariable =
    process.env[environmentVariable] || CLIENT_ENVS[environmentVariable];
  if (!unValidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unValidatedEnvironmentVariable;
  }
};

export const config = {
  apiUrl: getEnvironmentVariable('NEXT_PUBLIC_API_URL'),
  adminApiUrl: getEnvironmentVariable('NEXT_PUBLIC_ADMIN_API_URL'),
  awsLambdaApiUrl: getEnvironmentVariable('NEXT_PUBLIC_AWS_LAMBDA_API_URL'),
  templateUrl: getEnvironmentVariable('NEXT_PUBLIC_TEMPLATE_URL'),
  engTemplateUrl: getEnvironmentVariable('NEXT_PUBLIC_ENG_TEMPLATE_URL'),
  downloadUrl: getEnvironmentVariable('NEXT_PUBLIC_DOWNLOAD_URL'),
  gaTrackingId: getEnvironmentVariable('NEXT_PUBLIC_GA_TRACKING_ID'),
  channelIOKey: getEnvironmentVariable('NEXT_PUBLIC_CHANNEL_IO_KEY'),
  kakaoKey: getEnvironmentVariable('NEXT_PUBLIC_KAKAO_APP_KEY'),
  froalaKey: getEnvironmentVariable('NEXT_PUBLIC_FROALA_KEY'),
};
