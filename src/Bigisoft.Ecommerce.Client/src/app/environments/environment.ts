
export const environment = {
  production: false,
  //apiEndpoint: 'http://localhost:3000',
  amplify: {
    Auth: {
      // IdentityPoolId is for federated
      //identityPoolId: 'ap-northeast-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      region: 'eu-central-1',
      userPoolId: 'eu-central-1_fjjKslxbQ',
      userPoolWebClientId: '7fmkj33in2po5havib537rffbq'
    }
  },
  cognito: {
    region: "eu-central-1",
    userPoolId: 'eu-central-1_fjjKslxbQ',
    userPoolClientId: '7fmkj33in2po5havib537rffbq'
  },
};

