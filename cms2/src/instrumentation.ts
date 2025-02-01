import type { SpanExporter } from '@opentelemetry/sdk-trace-base'
import { registerOTel } from '@vercel/otel'

// Thanks to https://github.com/Azure/static-web-apps/issues/1269#issuecomment-2002515095.
export async function register() {
  let traceExporter: SpanExporter | undefined

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { AzureMonitorTraceExporter } = await import('@azure/monitor-opentelemetry-exporter')
    traceExporter = new AzureMonitorTraceExporter({
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    })
  }

  registerOTel({ serviceName: 'attv71', traceExporter })
}
