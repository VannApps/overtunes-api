import { FastifyPluginAsync } from "fastify"
import prisma from "../../lib/prisma.js"
import { SETTING_TYPE } from "../../typings/index.js";

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/:id', async function (request, reply) {
        const params = request.params as { id: string };

        const guilds = await prisma.guild.findFirst({
            where: {
                guildId: params.id
            }
        })

        return reply.send({ data: guilds })
    })

    fastify.post('/:id/', async function (request, reply) {
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
    })
}

export default route;