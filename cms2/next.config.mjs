import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_MODE === 'standalone' ? 'standalone' : 'export',
  webpack: (config, { isServer }) => {
    if (isServer) {
      // @azure/functions-core is used by Azure Application Insights.
      // The module can only be resolved when hosting this application in Azure.
      // The package is added to `externals` to suppress warnings during build.
      config.externals.push('@azure/functions-core')

      // @opentelemetry/exporter-jaeger seems to be a package that gets improperly resolved by Webpack.
      // Instrumentation still functions as expected (as far as I can see).
      // The package is added to `externals` to suppress warnings during build.
      //
      // Relevant GitHub issue: https://github.com/open-telemetry/opentelemetry-js/issues/4297
      config.externals.push('@opentelemetry/exporter-jaeger')
    }
    return config
  },
}

export default withPayload(nextConfig)
