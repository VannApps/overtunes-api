import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function post(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const body = request.body as any;

    if (!body) {
        return reply.badGateway("No body provided");
    }

    const bodyKeys = Object.keys(body);
    const guildKeys = Object.keys(prisma.guild.fields);

    const validKeys = bodyKeys.filter(key => guildKeys.includes(key));

    if (validKeys.length !== bodyKeys.length) {
        return reply.badGateway(`Invalid keys provided: ${bodyKeys.filter(key => !guildKeys.includes(key)).join(", ")}`);
    }

    const updateSettings: any = {}

    Object.keys(body).forEach(key => {
        updateSettings[key] = body[key]
    })

    const guild = await prisma.guild.update({
        where: {
            guildId: params.id
        },
        data: updateSettings
    }).catch(e => reply.internalServerError(e));

    if (reply.sent) return;

    return reply.send({ data: guild });
}