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
default-src 'self' https://*.firebaseapp.com https://*.googleapis.com;
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googletagmanager.com https://*.google.com https://*.gstatic.com https://*.google-analytics.com https://vercel.live https://*.firebaseapp.com https://*.googleapis.com;
style-src 'self' 'unsafe-inline' https://*.gstatic.com https://vercel.live/fonts;
img-src 'self' blob: data: https://*.googletagmanager.com https://*.gstatic.com https://*.googleapis.com https://*.firebaseapp.com https://vercel.live http://127.0.0.1:9199;
font-src 'self' https://*.gstatic.com https://vercel.live/fonts;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
frame-src 'self' https://*.googletagmanager.com https://*.google.com https://*.gstatic.com https://*.firebaseapp.com https://vercel.live;
child-src 'self' https://*.googletagmanager.com https://*.google.com https://*.gstatic.com https://*.firebaseapp.com https://vercel.live;
connect-src 'self' https://*.google.com https://*.gstatic.com https://*.google-analytics.com https://*.firebaseio.com https://*.googleapis.com wss://*.firebaseio.com wss://ws-us3.pusher.com https://sockjs-us3.pusher.com https://*.firebaseapp.com https://vercel.live http://127.0.0.1:9099 http://127.0.0.1:8080 http://127.0.0.1:9199;
upgrade-insecure-requests;
`;
