import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };

    const guilds = await prisma.guild.upsert({
        where: {
            guildId: params.id
        },
        create: {
            guildId: params.id
        },
        update: {}
    })

    return reply.send({ data: guilds });
}