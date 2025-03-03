param name string
param location string = resourceGroup().location
param logWorkspaceId string
param cmsBaseUrl string

@secure()
param websiteApiKeyForCms string

resource website 'Microsoft.Web/staticSites@2024-04-01' = {
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

      NUXT_CMS_API_KEY: websiteApiKeyForCms
      NUXT_CMS_BASE_URL: cmsBaseUrl
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
