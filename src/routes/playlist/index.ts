import { FastifyPluginAsync } from "fastify"
import { get } from "./get.js";
import { view } from "./view.js";
import { rename } from "./rename.js";
import { create } from "./create.js";
import { deletePlaylist } from "./delete.js";
import { single } from "./single.js";
import { multiple } from "./multiple.js";

const route: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/:id', get)
    fastify.post('/:id', view)
    fastify.patch('/:id', rename)
    fastify.put('/:id', create)
    fastify.delete('/:id', deletePlaylist)

    fastify.put('/:id/single', single)
    fastify.put('/:id/multiple', multiple)
}

export default route;