targetScope = 'subscription'

param location string = deployment().location

var resourcePrefix = 'attv71'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: 'attv71'
  location: location
}

module keyVaultDeployment 'keyvault.bicep' = {
  name: 'keyVaultDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-keyvault'
    location: location
  }
}

module mongoDbDeployment 'mongodb.bicep' = {
  name: 'mongoDbDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-mongodb'
    location: location
    keyVaultName: keyVaultDeployment.outputs.keyVaultName
  }
}

module cmsDeployment 'cms.bicep' = {
  name: 'cmsDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-cms'
    location: location
    mongoDbName: mongoDbDeployment.outputs.dbName
    keyVaultName: keyVaultDeployment.outputs.keyVaultName
    mongoDbConnectionStringKeyVaultKey: mongoDbDeployment.outputs.connectionStringKeyVaultKey
  }
}

module imageStorageDeployment 'imagestorage.bicep' = {
  name: 'imageStorageDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}images'
    location: location
  }
}

module webAppSsrDeployment 'webapp-ssr.bicep' = {
  name: 'webAppSsrDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-webapp-ssr'
    location: location
  }
}

module webAppStaticDeployment 'webapp-static.bicep' = {
  name: 'webAppStaticDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-webapp-static'
    location: location
  }
}
