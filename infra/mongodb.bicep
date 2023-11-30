param name string
param location string = resourceGroup().location
param keyVaultName string

resource mongoDb 'Microsoft.DocumentDB/databaseAccounts@2023-09-15' = {
  name: name
  kind: 'MongoDB'
  location: location
  properties: {
    publicNetworkAccess: 'Disabled'
    apiProperties: {
      serverVersion: '4.2'
    }
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

resource mongoDbConnectionString 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'MONGODB-CONNECTION-STRING'
  properties: {
    value: mongoDb.listConnectionStrings().connectionStrings[0].connectionString
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

output dbName string = mongoDb.name
