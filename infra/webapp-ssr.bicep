param name string
param location string = resourceGroup().location
param keyVaultName string

resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: name
  location: location
  sku: {
    name: 'B1'
  }
  properties: {
    reserved: true
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2022-09-01' = {
  name: name
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    enabled: true
    serverFarmId: appServicePlan.id
    httpsOnly: true
    clientAffinityEnabled: false
    siteConfig: {
      ftpsState: 'Disabled'
      linuxFxVersion: 'Node|18'
      http20Enabled: true
      appSettings: [
        {
          name: 'NODE_ENV'
          value: 'production'
        }
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '3~'
        }
      ]
    }
  }

  resource authentication 'config' = {
    name: 'authsettingsV2'
    properties: {
      globalValidation: {
        requireAuthentication: true
        unauthenticatedClientAction: 'RedirectToLoginPage'
      }
      platform: {
        enabled: true
      }
      identityProviders: {
        azureActiveDirectory: {
          enabled: true
          registration: {
            clientId: appRegistration.properties.outputs.appId
            clientSecretSettingName: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=${appRegistrationClientSecret.name})'
            openIdIssuer: 'https://sts.windows.net/${subscription().tenantId}/v2.0'
          }
        }
      }
      login: {
        tokenStore: {
          enabled: false
        }
      }
    }
  }
}

resource appRegistration 'Microsoft.Resources/deploymentScripts@2023-08-01' = {
  name: 'webapp-app-registration-deployment-script'
  kind: 'AzureCLI'
  location: location
  properties: {
    azCliVersion: '2.54.0'
    scriptContent: '''
      az ad app create --display-name testapp --sign-in-audience AzureADMyOrg --enable-access-token-issuance false --enable-id-token-issuance true --web-home-page-url https://attv71-webapp-ssr.azurewebsites.net --web-redirect-uris https://attv71-webapp-ssr.azurewebsites.net/.auth/login/aad/callback
      credentials=$(az ad app credential reset --id 3146bad4-828b-4fee-9d16-cc3448112df4 --display-name 'Generated for test' --years 10)
      echo $credentials > $AZ_SCRIPTS_OUTPUT_PATH
    ''' // Output { "appId": "guid", "password": "string", "tenant": "guid" }
    retentionInterval: 'PT1H'
    cleanupPreference: 'OnSuccess'
  }
}

module appInsightsDeployment './appinsights.bicep' = {
  name: 'appInsightsDeployment-webapp-ssr'
  params: {
    name: name
    location: location
  }
}

resource appRegistrationClientSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  name: 'WEBAPP-SSR-ENTRA-CLIENT-SECRET'
  parent: keyVault
  properties: {
    value: appRegistration.properties.outputs.password
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: name
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}
