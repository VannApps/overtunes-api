import { FastifyReply, FastifyRequest } from "fastify";
import { PaymentCompleteWebhook } from "../../typings/index.js";
import prisma from "../../lib/prisma.js";
import { premiumCount } from "../../constant/premiumCount.js";
import crypto from "crypto";

export async function paymentComplete(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as PaymentCompleteWebhook;

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

    const subscription = await prisma.subscription.findFirst({
        where: {
            userId: body.subject.customer.username.id
        }
    })

    const tierBody = body.subject.products[0].name.toUpperCase() as keyof typeof premiumCount;
    const oldTier = subscription ? subscription.premiumTier : "FREE";
    const newTier = (premiumCount[oldTier] > premiumCount[tierBody]) ? oldTier : tierBody;

    await prisma.subscription.upsert({
        where: {
            userId: body.subject.customer.username.id
        },
        create: {
            purchasedAt: new Date(),
            userId: body.subject.customer.username.id,
            premiumCount: premiumCount[tierBody],
            premiumTier: newTier
        },
        update: {
            purchasedAt: new Date(),
            premiumCount: {
                increment: premiumCount[tierBody],
            },
            premiumTier: newTier
        }
    })

    return reply.send({
        "id": body.id
    });
}