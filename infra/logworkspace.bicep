param name string
param location string = resourceGroup().location

resource logWorkspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: name
  location: location
  properties: {
    workspaceCapping: {
      dailyQuotaGb: 2
    }
  }
}

output logWorkspaceId string = logWorkspace.id
