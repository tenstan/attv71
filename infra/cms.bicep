param name string
param location string = resourceGroup().location
param logWorkspaceId string

@secure()
param databaseConnectionString string
@secure()
param payloadSecret string
@secure()
param cmsEntraIdClientId string
@secure()
param cmsEntraIdClientSecret string

resource cms 'Microsoft.Web/staticSites@2024-04-01' = {
  name: name
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    branch: 'master'
    repositoryUrl: 'https://github.com/tenstan/attv71'
  }

  resource functionAppSettings 'config@2024-04-01' = {
    name: 'functionappsettings'
    properties: {
      // Key names are important to automatically link SWA to correct Application Insights resource
      APPLICATIONINSIGHTS_CONNECTION_STRING: appInsights.properties.ConnectionString
      ApplicationInsightsAgent_EXTENSION_VERSION: '~3'

      // While it would be better to put the secrets below in a key vault,
      // managed functions for SWAs unfortunately do not support key vault references (2025-02-15).
      DATABASE_CONNECTION_STRING: databaseConnectionString
      PAYLOAD_SECRET: payloadSecret

      ENTRA_ID_CLIENT_ID: cmsEntraIdClientId
      ENTRA_ID_CLIENT_SECRET: cmsEntraIdClientSecret
      #disable-next-line use-resource-id-functions
      ENTRA_ID_TENANT_ID: tenant().tenantId
    }
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: name
  location: location
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logWorkspaceId
  }
  kind: 'web'
}

