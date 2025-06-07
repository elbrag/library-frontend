import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://image.bokus.com/**")],
	},
};

export default nextConfig;
