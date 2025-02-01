import { AzureMonitorTraceExporter } from '@azure/monitor-opentelemetry-exporter'
import { registerOTel } from '@vercel/otel'

// Thanks to https://github.com/Azure/static-web-apps/issues/1269#issuecomment-2002515095.
export async function register() {
  registerOTel({
    serviceName: 'attv71',
    traceExporter: new AzureMonitorTraceExporter({
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    }),
  })
}
