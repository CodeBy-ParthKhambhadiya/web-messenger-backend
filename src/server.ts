import { buildApp } from "./app";

(async () => {
  const { fastify } = await buildApp();
  const PORT = process.env.PORT || 5000;

  try {
    await fastify.listen({ port: Number(PORT), host: "0.0.0.0" });
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
