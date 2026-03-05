// Production environment (used when building with ng build --configuration production)
export const environment = {
  production: true,
  baseApiUrl: 'https://expense-tracker-api-d3hmahgkccf2gbaa.ukwest-01.azurewebsites.net'
};

// For backwards compatibility
export const baseApiUrl = environment.baseApiUrl;
