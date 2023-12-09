param name string
param location string = resourceGroup().location
param mongoDbName string
param keyVaultName string
param vnetName string
param vnetIntegrationSubnetName string
@secure()
param payloadSecret string

param mongoDbConnectionStringKeyVaultKey string

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
    virtualNetworkSubnetId: vnet::integrationSubnet.id
    siteConfig: {
      vnetName: vnet.name
      vnetRouteAllEnabled: true
      http20Enabled: true
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
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
        {
          name: 'DATABASE_NAME'
          value: database.properties.resource.id
        }
        {
          name: 'PAYLOAD_SECRET'
          value: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=${payloadKeyVaultSecret.name})'
        }
        {
          name: 'DATABASE_URI'
          value: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=${keyVault::mongoDbConnectionStringSecret.name})'
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
}

resource database 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2023-09-15' = {
  name: 'cms'
  parent: mongoDb
  properties: {
    resource: {
      id: 'cms'
    }
  }
}

resource keyVaultAccessPolicy 'Microsoft.KeyVault/vaults/accessPolicies@2023-07-01' = {
  name: 'add'
  parent: keyVault
  properties: {
    accessPolicies: [
      {
        objectId: appService.identity.principalId
        tenantId: appService.identity.tenantId
        permissions: {
          secrets: [
            'get'
          ]
        }
      }
    ]
  }
}

resource payloadKeyVaultSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: 'PAYLOAD-SECRET'
  parent: keyVault
  properties: {
    value: payloadSecret
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName

  resource mongoDbConnectionStringSecret 'secrets' existing = {
    name: mongoDbConnectionStringKeyVaultKey
  }
}

resource vnet 'Microsoft.Network/virtualNetworks@2023-05-01' existing = {
  name: vnetName

  resource integrationSubnet 'subnets' existing = {
    name: vnetIntegrationSubnetName
  }
}
