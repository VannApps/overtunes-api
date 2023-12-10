import { FastifyReply, FastifyRequest } from "fastify";

export async function editable(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };

    const response = await fetch(`${process.env.DISCORD_API_BASE_URL}/guilds/${params.id}`, {
        headers: {
            "Authorization": `Bot ${process.env.DISCORD_TOKEN}`
        }
    })

    return reply.send({ data: response.status === 200 });
}