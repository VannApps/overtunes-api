import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const body = request.body as { name: string }

    if (!body.name) return reply.badGateway("Missing body")

    if (!/^([a-zA-Z0-9 _-]+)$/.test(body.name)) return reply.badGateway("Playlist name must be number or letter")

    const data = await prisma.user.findUnique({
        where: {
            userId: params.id
        },
        select: {
            playlists: true
        }
    })


    if (data?.playlists.length! >= 10) return reply.forbidden("Maximum amount of playlist reached")

    if (data?.playlists.find(obj => obj.name === body.name)) return reply.badGateway("That playlist name already exist, please use another name")

    return prisma.playlist.create({
        data: {
            user: {
                connectOrCreate: {
                    where: {
                        userId: params.id
                    },
                    create: {
                        userId: params.id
                    }
                }
            },
            name: body.name
        }
    }).then(playlist => {
        return reply.send({ data: `Playlist **${playlist.name}** created` })
    })
}