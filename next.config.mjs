/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  async rewrites() {
    return [
      {
        source: "/spaceapi.json",
        destination: "https://urlab.be/spaceapi.json",
      },
    ];
  },
};

export default nextConfig;
