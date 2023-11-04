param name string
param location string = resourceGroup().location

resource insights 'Microsoft.Insights/components@2020-02-02' = {
  name: name
  location: location
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
  }
  kind: 'web'
}

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: 'myworkspace'
  location: location
  properties: {
    workspaceCapping: {
      dailyQuotaGb: 2
    }
  }
}

output appInsightsConnectionString string = insights.properties.ConnectionString
