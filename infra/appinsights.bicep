param name string
param location string = resourceGroup().location
param logWorkspaceId string

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: name
  location: location
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logWorkspaceId
  }
  kind: 'web'
}

output appInsightsConnectionString string = appInsights.properties.ConnectionString
