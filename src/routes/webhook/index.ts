import { FastifyPluginAsync } from "fastify"
import { paymentComplete } from "./paymentComplete.js";
import { recurringEnd } from "./recurringEnd.js";

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post("/payment-complete", paymentComplete)
    fastify.post("/recurring-end", recurringEnd)
}

export default route;