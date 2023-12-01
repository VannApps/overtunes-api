import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

interface ITrackInfo {
    isSeekable: boolean
    isStream: boolean
    title: string
    uri: string
    identifier: string
    sourceName: string
    author?: string
    length: number
}

export async function single(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const body = request.body as { name: string, info: ITrackInfo }

    if (!body.name) return reply.badGateway("Missing body")

    const playlist = await prisma.playlist.findFirst({
        where: {
            name: body.name,
            user: {
                userId: params.id
            }
        }
    })

    if (!playlist) return reply.notFound("Playlist not found");

    return prisma.song.create({
        data: {
            playlistId: playlist.id,
            info: {
                author: body.info.author,
                identifier: body.info.identifier,
                isSeekable: body.info.isSeekable,
                isStream: body.info.isStream,
                length: body.info.length,
                sourceName: body.info.sourceName,
                title: body.info.title,
                uri: body.info.uri,
            }
        }
    }).then(() => {
        return reply.send({ data: `Added ${body.info.title} to **${playlist.name}**` })
    })
}