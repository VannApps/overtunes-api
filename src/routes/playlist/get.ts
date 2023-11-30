import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };

    const data = await prisma.user.findFirst({
        where: {
            userId: params.id
        },
        select: {
            playlists: true
        }
    })

    if (!data?.playlists) return reply.notFound("Playlist not found");

    return reply.send({ data: data.playlists });
}