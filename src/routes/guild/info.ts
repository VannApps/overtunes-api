import { FastifyReply, FastifyRequest } from "fastify";
import { discordClient } from "../../app.js";


export async function info(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };

    const data = discordClient.guilds.cache.get(params.id)

    return reply.send({ data: data });
}