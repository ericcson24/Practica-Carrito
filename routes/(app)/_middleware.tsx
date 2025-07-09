import { FreshContext, Handler } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";

export const handler:Handler = async(req:Request, ctx:FreshContext) => {
    const cookie = getCookies(req.headers)
    if(cookie.correo) {
        return await ctx.next()
    }

    const headers = new Headers()
    headers.set("location", "/")
    return new Response(null, {
        status:303,
        headers
    })
}