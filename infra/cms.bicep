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

  resource staticWebAppSettings 'config@2024-04-01' = {
    name: 'functionappsettings'
    properties: {
      APPINSIGHTS_INSTRUMENTATIONKEY: appInsights.properties.InstrumentationKey
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
