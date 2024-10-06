/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, "")
          }
        ]
      }
    ];
  }
};

export default nextConfig;

const cspHeader = `
default-src 'self' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com;
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://www.google-analytics.com;
style-src 'self' 'unsafe-inline' https://www.gstatic.com;
img-src 'self' blob: data: https://www.googletagmanager.com https://www.gstatic.com http://127.0.0.1:9199;
font-src 'self' https://www.gstatic.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
frame-src 'self' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com;
child-src 'self' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com;
connect-src 'self' https://www.google.com https://www.gstatic.com https://www.google-analytics.com http://127.0.0.1:9099 http://127.0.0.1:8080 http://127.0.0.1:9199;
upgrade-insecure-requests;
`;
