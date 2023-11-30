param name string
param location string = resourceGroup().location
param mongoDbName string

resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: name
  location: location
  sku: {
    name: 'B1'
  }
  properties: {
    reserved: true
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2022-09-01' = {
  name: name
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    enabled: true
    serverFarmId: appServicePlan.id
    httpsOnly: true
    clientAffinityEnabled: false
    siteConfig: {
      ftpsState: 'Disabled'
      linuxFxVersion: 'Node|18'
      appSettings: [
        {
          name: 'NODE_ENV'
          value: 'production'
        }
        {
          name: 'PAYLOAD_CONFIG_PATH'
          value: 'dist/payload.config.js'
        }
      ]
    }
  }
}

module appInsightsDeployment './appinsights.bicep' = {
  name: 'appInsightsDeployment'
  params: {
    name: name
    location: location
  }
}

resource mongoDb 'Microsoft.DocumentDB/databaseAccounts@2023-09-15' existing = {
  name: mongoDbName

  resource database 'mongodbDatabases@2023-09-15' = {
    name: 'cms'
    properties: {
      resource: {
        id: 'cms'
      }
    }
  }
}
