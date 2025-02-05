param name string
param location string = resourceGroup().location
param logWorkspaceId string

resource cms 'Microsoft.Web/staticSites@2024-04-01' = {
  name: name
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {}

  resource functionAppSettings 'config@2024-04-01' = {
    name: 'functionappsettings'
    properties: {
      // Key name is important to automatically link SWA to correct AppInsights resource
      APPLICATIONINSIGHTS_CONNECTION_STRING: appInsights.properties.ConnectionString
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
