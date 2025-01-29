targetScope = 'subscription'

param location string = deployment().location

var resourcePrefix = 'attv71'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: 'attv71'
  location: location
}

module cmsDeployment 'cms.bicep' = {
  name: 'cmsDeployment'
  scope: resourceGroup
  params: {
    name: '${resourcePrefix}-cms'
    location: location
  }
}

