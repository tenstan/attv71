param name string
param location string = resourceGroup().location
param keyVaultName string

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: name
  location: location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    minimumTlsVersion: 'TLS1_2'
    accessTier: 'Hot'
    allowBlobPublicAccess: true
    publicNetworkAccess: 'Enabled'
    supportsHttpsTrafficOnly: true
  }
}

// Storing the whole connection string is only necessary because CMS doesn't support using SAS keys or managed identities.
// Should be fixed once this PR gets through https://github.com/payloadcms/plugin-cloud-storage/pull/28.
resource storageAccountConnectionString 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'STORAGE-ACCOUNT-CONNECTION-STRING'
  properties: {
    value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${storageAccount.listKeys().keys[0].value};EndpointSuffix=${environment().suffixes.storage}'
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

output storageAccountName string = storageAccount.name
output storageAccountConnectionStringKeyVaultKey string = storageAccountConnectionString.name
