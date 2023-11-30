import { FastifyReply, FastifyRequest } from "fastify";
import { SETTING_TYPE } from "../../typings/index.js";
import prisma from "../../lib/prisma.js";

export async function post(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const body = request.body as any;

    if (!body) {
        return reply.badGateway("No body provided");
    }

    if (!Object.keys(body).find(key => SETTING_TYPE.find(type => type == key))) return reply.badGateway(`Not supported type. Supported type are ${SETTING_TYPE.join(", ")}`);

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