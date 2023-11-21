param name string
param location string = resourceGroup().location

resource account 'Microsoft.DocumentDB/databaseAccounts@2023-09-15' = {
  name: name
  kind: 'MongoDB' // Required for PayloadCMS/CosmosDB interop
  location: location
  properties: {
    publicNetworkAccess: 'Disabled'
    consistencyPolicy: {
      defaultConsistencyLevel: 'Strong'
    }
    databaseAccountOfferType: 'Standard'
    backupPolicy: {
      type: 'Continuous'
      continuousModeProperties: {
        tier: 'Continuous7Days'
      }
    }
    locations: [
      {
        failoverPriority: 0
        locationName: location
        isZoneRedundant: false
      }
    ]
    capabilities: [
      {
        name: 'EnableServerless'
      }
      {
        name: 'EnableMongo'
      }
    ]
  }
}
