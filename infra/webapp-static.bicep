param name string
param location string = resourceGroup().location

resource staticSite 'Microsoft.Web/staticSites@2022-09-01' = {
  name: name
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    provider: 'None'
  }
}

module appInsightsDeployment './appinsights.bicep' = {
  name: 'appInsightsDeployment'
  params: {
    name: name
    location: location
  }
}
