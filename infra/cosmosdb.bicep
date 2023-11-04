param accountName string
param location string = resourceGroup().location

resource account 'Microsoft.DocumentDB/databaseAccounts@2023-09-15' = {
  name: 'csms-${accountName}'
  kind: 'MongoDB' // Required for PayloadCMS/CosmosDB interop
  location: location
  properties: {
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
        name: 'DisableRateLimitingResponses'
      }
    ]
  }
}
