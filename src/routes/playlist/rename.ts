import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function rename(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const body = request.body as { old_name: string, new_name: string }

    if (!body.new_name || !body.old_name) return reply.badGateway("Missing body")

    const oldPlaylist = await prisma.playlist.findFirst({
        where: {
            name: body.old_name,
            user: {
                userId: params.id
            }
        }
    })

    const newPlaylist = await prisma.playlist.findFirst({
        where: {
            name: body.new_name,
            user: {
                userId: params.id
            }
        }
    })

    if (!oldPlaylist) return reply.badGateway(`There is no playlist named **${body.old_name}**`)

    if (newPlaylist) return reply.badGateway(`There is already playlist named **${body.new_name}**`)

    return prisma.playlist.update({
        where: {
            id: oldPlaylist?.id
        },
        data: {
            name: body.new_name
        }
    }).then(updatedPlaylist => {
        return reply.send({ data: `Playlist **${body.old_name}** updated to **${updatedPlaylist.name}**` });
    })
}