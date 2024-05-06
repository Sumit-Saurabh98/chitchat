/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{ hostname: "youthful-jellyfish-0.convex.cloud" },
			{ hostname: "oaidalleapiprodscus.blob.core.windows.net" }
		],
	},
};

export default nextConfig;