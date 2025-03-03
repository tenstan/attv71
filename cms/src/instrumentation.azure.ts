import { AzureMonitorOpenTelemetryOptions, useAzureMonitor } from '@azure/monitor-opentelemetry'
import { Resource } from '@opentelemetry/resources'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING

if (connectionString) {
  const resource = new Resource({
    [ATTR_SERVICE_NAME]: 'cms',
  })

  const options: AzureMonitorOpenTelemetryOptions = {
    azureMonitorExporterOptions: {
      connectionString,
    },
    resource,
    instrumentationOptions: {
      azureSdk: { enabled: true },
      http: { enabled: true },
      postgreSql: { enabled: true },
    },
    // This is disabled by default due to a performance hit while live metrics is opened.
    // This performance hit does not apply when live metrics is not opened.
    enableLiveMetrics: true,
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useAzureMonitor(options)
}
