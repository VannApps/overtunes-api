import { FastifyPluginAsync } from "fastify"

import { get } from "./get.js";
import { post } from "./post.js";
import { put } from "./put.js";

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/:id', get)
    fastify.post('/:id', post)
    fastify.put('/:id', put)
}

export default route;