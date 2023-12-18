appId=$(az ad app create \
  --display-name 'attv71-webapp-ssr' \
  --sign-in-audience AzureADMyOrg \
  --enable-access-token-issuance false \
  --enable-id-token-issuance true \
  --web-home-page-url https://attv71-webapp-ssr.azurewebsites.net \
  --web-redirect-uris https://attv71-webapp-ssr.azurewebsites.net/.auth/login/aad/callback \
  --query appId \
  --output tsv)
az ad app credential reset --id $appId --display-name 'App Service Authentication'