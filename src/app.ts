import * as path from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import { fileURLToPath } from 'url'
import cors from '@fastify/cors'
import Middie from '@fastify/middie'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;


// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  await fastify.register(cors, {
    origin: "*"
  })

  void fastify.register(Middie.default, {
    prefix: "/guild/*",
    hook: "onRequest"
  }).register(middleWareSystem)

  async function middleWareSystem() {
    fastify.addHook('onRequest', async (request, reply) => {
      const token = request.headers.authorization;

      if (!token) return reply.unauthorized();
      if (token !== process.env.AUTH) return reply.unauthorized();
    })
  }

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: opts,
    forceESM: true
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: opts,
    forceESM: true
  })

};

export default app;
export { app, options }
