import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

interface ITrackInfo {
    info: {
        isSeekable: boolean
        isStream: boolean
        title: string
        uri: string
        identifier: string
        sourceName: string
        author?: string
        length: number
    }
}

export async function multiple(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const body = request.body as { name: string, tracks: ITrackInfo[] }

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

    return prisma.song.createMany({
        data: body.tracks.map((val) => ({
            playlistId: playlist.id,
            info: {
                author: val.info.author,
                identifier: val.info.identifier,
                isSeekable: val.info.isSeekable,
                isStream: val.info.isStream,
                length: val.info.length,
                sourceName: val.info.sourceName,
                title: val.info.title,
                uri: val.info.uri,
            }
        }))
    }).then(() => {
        return reply.send({ data: `Added ${body.tracks.length} to **${playlist.name}**` })
    })
}