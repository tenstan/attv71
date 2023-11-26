param name string
param location string = resourceGroup().location

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: name
  location: location
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logWorkspace.id
  }
  kind: 'web'
}

resource logWorkspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: 'defaultlogworkspace'
  location: location
  properties: {
    workspaceCapping: {
      dailyQuotaGb: 2
    }
  }
}
