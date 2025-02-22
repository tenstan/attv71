param name string
param location string = resourceGroup().location

resource app 'Microsoft.Web/staticSites@2024-04-01' = {
  name: name
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    branch: 'master'
    repositoryUrl: 'https://github.com/tenstan/attv71'
  }
}

