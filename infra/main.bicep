targetScope = 'subscription'

param resourceGroupName string = 'attv71'

@allowed(['westeurope'])
param location string = 'westeurope'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
}

module vault 'vault.bicep' = {
  name: 'keyvaultDeployment'
  scope: resourceGroup
  params: {
    name: 'attv71'
    location: location
  }
}

module appInsights 'insights.bicep' = {
  name: 'appInsightsDeployment'
  scope: resourceGroup
  params: {
    name: 'attv71'
    location: location
  }
}
