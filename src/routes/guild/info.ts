import { FastifyReply, FastifyRequest } from "fastify";

export async function info(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };

    const response = await fetch(`${process.env.DISCORD_API_BASE_URL}/guilds/${params.id}`, {
        headers: {
            "Authorization": `Bot ${process.env.DISCORD_TOKEN}`
        }
    })

    const data = await response.json()

    return reply.send({ data: data });
}