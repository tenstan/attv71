param name string
param location string = resourceGroup().location

resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: name
  location: location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_RAGRS'
  }
  properties: {
    accessTier: 'Hot'
    allowBlobPublicAccess: true
    publicNetworkAccess: 'Enabled'
    supportsHttpsTrafficOnly: true
  }
}
