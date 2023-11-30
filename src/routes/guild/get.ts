import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };

    const guilds = await prisma.guild.findFirst({
        where: {
            guildId: params.id
        }
    })

    if (!guilds) return reply.notFound("Guild not found");

    return reply.send({ data: guilds });
}