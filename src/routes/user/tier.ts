import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma.js";

export async function tier(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };

    const subscription = await prisma.subscription.findFirst({
        where: {
            userId: params.id
        },
        select: {
            premiumTier: true,
            premiumCount: true,
            premiumGuild: true
        }
    })

    const tier = subscription ? subscription.premiumTier : "FREE";
    const count = subscription ? subscription.premiumCount : 0;

    return reply.send({
        data: {
            tier: tier,
            count: count,
            premiumGuild: subscription?.premiumGuild
        }
    });
}