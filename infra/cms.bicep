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

var newsPostMediaStorageContainerSasToken = storageAccount.listServiceSAS('2023-01-01', {
  canonicalizedResource: '/blob/${storageAccount.name}/${newsPostMediaStorageContainer.name}'
  signedExpiry: '2099-01-01T00:00:00Z'
  signedResource: 'c'
  signedProtocol: 'https'
  signedPermission: 'rwdlu'
}).serviceSasToken

// TODO: Replace with usage of managed identity instead of connection string once Payload plugin supports it
resource newsPostMediaContainerConnectionStringSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  name: 'NEWS-POST-MEDIA-CONTAINER-CONNECTION-STRING'
  parent: keyVault
  properties: {
    value: '${storageAccount.properties.primaryEndpoints.blob}${newsPostMediaStorageContainer.name}?${newsPostMediaStorageContainerSasToken}'
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

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' existing = {
  name: storageAccountName

  resource blob 'blobServices' existing = {
    name: 'default'
  }
}
