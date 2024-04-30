import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function guild(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const body = request.body as {
        data: {
            guildId: string;
        }[],
        premiumCount: number;
    }

    const data = await prisma.subscription.update({
        where: {
            userId: params.id
        },
        data: {
            premiumGuild: {
                set: body.data
            },
            premiumCount: {
                set: body.premiumCount
            }
        },
        select: {
            premiumGuild: true,
            userId: true
        }
    })

    if (data.premiumGuild.length < body.data.length) {
        await prisma.subscription.update({
            where: {
                userId: params.id
            },
            data: {
                premiumCount: {
                    set: body.data.length - data.premiumGuild.length + body.premiumCount
                }
            }
        })
    }

    return reply.send({
        data: data.userId
    });
}