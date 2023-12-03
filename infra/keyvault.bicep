param name string
param location string = resourceGroup().location
param vnetName string
param serviceEndpointSubnetName string

resource keyVault 'Microsoft.KeyVault/vaults@2023-02-01' = {
  name: name
  location: location
  properties: {
    sku: {
      name: 'standard'
      family: 'A'
    }
    networkAcls: {
      bypass: 'AzureServices'
      defaultAction: 'Deny'
      virtualNetworkRules: [
        {
          id: vnet::serviceEndpointSubnet.id
          ignoreMissingVnetServiceEndpoint: false
        }
      ]
    }
    tenantId: subscription().tenantId
    accessPolicies: []
  }
}

resource vnet 'Microsoft.Network/virtualNetworks@2023-05-01' existing = {
  name: vnetName

  resource serviceEndpointSubnet 'subnets' existing = {
    name: serviceEndpointSubnetName
  }  
}

output keyVaultName string = keyVault.name
