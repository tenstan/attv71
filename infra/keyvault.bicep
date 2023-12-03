param name string
param location string = resourceGroup().location
param vnetName string
param subnetNames string[]

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
      virtualNetworkRules: [for (subnet, index) in subnetNames: {
        id: vnet::subnets[index].id
        ignoreMissingVnetServiceEndpoint: false
      }]
    }
    tenantId: subscription().tenantId
    accessPolicies: []
  }
}

resource vnet 'Microsoft.Network/virtualNetworks@2023-05-01' existing = {
  name: vnetName

  resource subnets 'subnets' existing = [for subnetName in subnetNames: {
    name: subnetName
  }]
}

output keyVaultName string = keyVault.name
