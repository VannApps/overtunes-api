import { FastifyPluginAsync } from "fastify"
import { tier } from "./tier.js";
import { guild } from "./guild.js";

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get("/tier/:id", tier)
    fastify.post("/guild/:id", guild)
}

export default route;