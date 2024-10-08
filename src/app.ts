import * as path from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import { fileURLToPath } from 'url'
import cors from '@fastify/cors'
import Middie from '@fastify/middie'
import { bypassMiddleware } from './constant/bypassMiddleware.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// export const discordClient = new Client({
//   intents: [
//     "Guilds"
//   ],
//   rest: {
//     version: "10"
//   }
// })

// discordClient.login(process.env.DISCORD_TOKEN)

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
      if (!bypassMiddleware.some((route) => request.url.includes(route))) {
        const token = request.headers.authorization;

        if (!token) return reply.unauthorized();
        if (token !== process.env.AUTH) return reply.unauthorized();
      }
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
