targetScope = 'subscription'

param location string = deployment().location

@secure()
param payloadSecret string
@secure()
param cmsDatabaseConnectionString string
@secure()
param cmsEntraIdClientId string
@secure()
param cmsEntraIdClientSecret string

var resourcePrefix = 'attv71'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: 'attv71'
  location: location
}

module logWorkspaceDeployment 'log-workspace.bicep' = {
  name: 'logWorkspaceDeployment'
  scope: resourceGroup
  params: {
    location: location
  }
}

module cmsDeployment 'cms.bicep' = {
  name: 'cmsDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-cms'
    location: location
    logWorkspaceId: logWorkspaceDeployment.outputs.logWorkspaceId
    payloadSecret: payloadSecret
    databaseConnectionString: cmsDatabaseConnectionString
    cmsEntraIdClientId: cmsEntraIdClientId
    cmsEntraIdClientSecret: cmsEntraIdClientSecret
  }
}

module websiteDeployment 'website.bicep' = {
  name: 'websiteDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-website'
    location: location
    logWorkspaceId: logWorkspaceDeployment.outputs.logWorkspaceId
  }
}
