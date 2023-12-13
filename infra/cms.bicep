param name string
param location string = resourceGroup().location
param mongoDbName string
param keyVaultName string
param vnetName string
param vnetIntegrationSubnetName string
@secure()
param payloadSecret string
param mongoDbConnectionStringKeyVaultKey string
param storageAccountName string
param storageAccountConnectionStringKeyVaultKey string

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
        {
          name: 'AZURE_STORAGE_CONNECTION_STRING'
          value: '@Microsoft.KeyVault(VaultName=${keyVault.name};SecretName=${keyVault::storageAccountConnectionStringSecret.name})'
        }
        {
          name: 'AZURE_STORAGE_ACCOUNT_BASE_URL'
          value: storageAccount.properties.primaryEndpoints.blob
        }
        {
          name: 'AZURE_STORAGE_CONTAINER_NAME'
          value: newsPostMediaStorageContainer.name
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '3~'
        }
      ]
    }
  }
}

module appInsightsDeployment './appinsights.bicep' = {
  name: 'appInsightsDeployment-cms'
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

resource newsPostMediaStorageContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  name: 'news-post-media'
  parent: storageAccount::blob
  properties: {
    publicAccess: 'Blob'
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName

  resource mongoDbConnectionStringSecret 'secrets' existing = {
    name: mongoDbConnectionStringKeyVaultKey
  }

  resource storageAccountConnectionStringSecret 'secrets' existing = {
    name: storageAccountConnectionStringKeyVaultKey
  }
}

resource vnet 'Microsoft.Network/virtualNetworks@2023-05-01' existing = {
  name: vnetName

  resource integrationSubnet 'subnets' existing = {
    name: vnetIntegrationSubnetName
  }
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' existing = {
  name: storageAccountName

  resource blob 'blobServices' existing = {
    name: 'default'
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: name
}
