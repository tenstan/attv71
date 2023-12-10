targetScope = 'subscription'

param location string = deployment().location
@secure()
param payloadSecret string

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
    vnetName: networkDeployment.outputs.vnetName
    subnetNames: [ networkDeployment.outputs.appServiceIntegrationSubnetName ]
  }
}

module mongoDbDeployment 'mongodb.bicep' = {
  name: 'mongoDbDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-mongodb'
    location: location
    keyVaultName: keyVaultDeployment.outputs.keyVaultName
    vnetName: networkDeployment.outputs.vnetName
    subnetNames: [ networkDeployment.outputs.appServiceIntegrationSubnetName ]
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
    vnetName: networkDeployment.outputs.vnetName
    vnetIntegrationSubnetName: networkDeployment.outputs.appServiceIntegrationSubnetName
    payloadSecret: payloadSecret
    storageAccountName: storageDeployment.outputs.storageAccountName
  }
}

module storageDeployment 'storage.bicep' = {
  name: 'storageDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}storage'
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

module networkDeployment 'network.bicep' = {
  name: 'networkDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-vnet'
    location: location
  }
}
