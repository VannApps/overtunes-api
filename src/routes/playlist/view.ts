import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function view(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const body = request.body as { name: string }

    if (!body.name) return reply.badGateway("Missing body")

    const data = await prisma.playlist.findFirst({
        where: {
            name: body.name,
            user: {
                userId: params.id
            }
        },
        select: {
            songs: true
        }
    })

    if (!data) return reply.notFound("Playlist not found");

    return reply.send({ data: data.songs });
}