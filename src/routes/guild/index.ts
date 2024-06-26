import { FastifyPluginAsync } from "fastify"

import { get } from "./get.js";
import { post } from "./post.js";
import { put } from "./put.js";
import { info } from "./info.js";

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/:id', get)
    fastify.post('/:id', post)
    fastify.put('/:id', put)


    fastify.get('/info/:id', info)
}

export default route;