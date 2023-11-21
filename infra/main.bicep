targetScope = 'subscription'

param resourceGroupName string = 'attv71'

@allowed(['westeurope'])
param location string = 'westeurope'

var resourcePrefix = 'attv71'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
}

module keyVaultDeployment 'vault.bicep' = {
  name: 'keyvaultDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-kv'
    location: location
  }
}

module cosmosDbDeployment 'cosmosdb.bicep' = {
  name: 'cosmosDbDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-cosmosdb'
    location: location
  }
}

module cmsDeployment 'cms.bicep' = {
  name: 'cmsDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-cms'
    location: location
    keyVaultName: keyVaultDeployment.outputs.keyVaultName
    logWorkspaceId: logWorkspaceDeployment.outputs.logWorkspaceId
  }
}

module logWorkspaceDeployment 'logworkspace.bicep' = {
  name: 'logWorkspaceDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-logworkspace'
    location: location
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
    keyVaultName: keyVaultDeployment.outputs.keyVaultName
    location: location
    logWorkspaceId: logWorkspaceDeployment.outputs.logWorkspaceId
  }
}

module webAppStaticDeployment 'webapp-static.bicep' = {
  name: 'webAppStaticDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-webapp-static'
    location: location
    logWorkspaceId: logWorkspaceDeployment.outputs.logWorkspaceId
  }
}
