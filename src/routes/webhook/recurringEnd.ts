import { FastifyReply, FastifyRequest } from "fastify";
import { RecurringEndWebhook } from "../../typings/index.js";
import prisma from "../../lib/prisma.js";
import crypto from "crypto";

export async function recurringEnd(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as RecurringEndWebhook;

    const bodyHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(request.body), 'utf-8')
        .digest('hex');

    const finalHash = crypto.createHmac('sha256', process.env.TEBEX_SECRET as string)
        .update(bodyHash)
        .digest('hex');

    if (finalHash !== request.headers["x-signature"]) {
        return reply.notFound();
    }

    // used for verifying the webhook
    if (body.type === "validation.webhook") {
        return reply.send({
            "id": body.id
        });
    }

    try {
        await prisma.subscription.update({
            where: {
                userId: body.subject.initial_payment.customer.username.id
            },
            data: {
                premiumGuild: {
                    set: []
                }
            }
        })
    
        await prisma.subscription.delete({
            where: {
                userId: body.subject.initial_payment.customer.username.id
            },
            include: {
                premiumGuild: true,
            }
        })
    
        return reply.send({
            "id": body.id
        });
    } catch {
        return reply.send({
            "error": "Subscription not found"
        })
    }
}