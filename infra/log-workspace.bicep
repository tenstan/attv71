param location string = resourceGroup().location

resource logWorkspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
    name: 'default-lwsp'
    location: location
    properties: {
        workspaceCapping: {
            dailyQuotaGb: 2
        }
    }
}

output logWorkspaceId string = logWorkspace.id
