import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function put(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };

    const guild = await prisma.guild.create({
        data: {
            guildId: params.id
        }
    }).catch(e => reply.internalServerError(e));

    if (reply.sent) return;

    return reply.send({ data: guild });
}