import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function deletePlaylist(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const body = request.body as { name: string }

    if (!body.name) return reply.badGateway("Missing body")

    if (!/^([a-zA-Z0-9 _-]+)$/.test(body.name)) return reply.badGateway("Playlist name must be number or letter")

    const playlist = await prisma.playlist.findFirst({
        where: {
            name: body.name,
            user: {
                userId: params.id
            }
        }
    })

    if (!playlist) return reply.forbidden("Playlist not found")

    await prisma.song.deleteMany({
        where: {
            playlistId: playlist.id
        }
    })

    return prisma.playlist.delete({
        where: {
            id: playlist?.id
        },
        include: {
            songs: true
        }
    }).then(deletedPlaylist => {
        return reply.send({ data: `Playlist **${deletedPlaylist.name}** deleted` })
    })
}