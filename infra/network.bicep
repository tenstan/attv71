param name string
param location string = resourceGroup().location

var vnetAddressSpace = '10.0.0.0/16'
var serviceEndpointSubnetRange = '10.0.0.0/24'
var appServiceIntegrationSubnetRange = '10.0.1.0/24'

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
        name: 'snet-serviceEndpoints'
        properties: {
          addressPrefix: serviceEndpointSubnetRange
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
        }
      }
    ]
  }

  resource serviceEndpointSubnet 'subnets' existing = {
    name: 'snet-serviceEndpoints'
  }

  resource appServiceIntegrationSubnet 'subnets' existing = {
    name: 'snet-appServiceIntegration'
  }
}

output vnetName string = vnet.name
output serviceEndpointSubnetName string = vnet::serviceEndpointSubnet.name
output appServiceIntegrationSubnetName string = vnet::appServiceIntegrationSubnet.name
