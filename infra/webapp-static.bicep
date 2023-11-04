param webAppName string = 'webapp-ssr'
param location string = resourceGroup().location

resource staticAppService 'Microsoft.Web/staticSites@2022-09-01' = {
  name: 'swa-${webAppName}'
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    provider: 'None'
  }
}
