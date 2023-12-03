param name string
param location string = resourceGroup().location

var vnetAddressSpace = '10.0.0.0/16'
var appServiceIntegrationSubnetRange = '10.0.0.0/24'

resource vnet 'Microsoft.Network/virtualNetworks@2023-05-01' = {
  name: name
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [
        vnetAddressSpace
      ]
    }
    subnets: [
      {
        name: 'snet-appServiceIntegration'
        properties: {
          addressPrefix: appServiceIntegrationSubnetRange
          delegations: [
            {
              name: 'delegation'
              properties: {
                serviceName: 'Microsoft.Web/serverFarms'
              }
            }
          ]
          serviceEndpoints: [
            {
              service: 'Microsoft.KeyVault'
              locations: [
                location
              ]
            }
          ]
        }
      }
    ]
  }

  resource appServiceIntegrationSubnet 'subnets' existing = {
    name: 'snet-appServiceIntegration'
  }
}

output vnetName string = vnet.name
output appServiceIntegrationSubnetName string = vnet::appServiceIntegrationSubnet.name
