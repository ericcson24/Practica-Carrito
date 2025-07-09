import { FreshContext, Handlers } from "$fresh/server.ts";
import { Form } from "../islands/Form.tsx";
import { Cookie, setCookie } from "https://deno.land/std/http/cookie.ts"

export const handler:Handlers = {
  POST: async(req:Request, _ctx:FreshContext) => {
    const form = await req.formData()
    const correo = form.get("correo") as string

    const headers = new Headers()
    const date = new Date()
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000))

    if(correo) {
      const cookie:Cookie = {name:"correo", value:correo, expires:date}
      setCookie(headers, cookie)
      
      headers.set("location", "/home")
      return new Response(null, {
        status:303,
        headers
      })
    }

    headers.set("location", "/")
    return new Response(null, {
      status:303,
      headers
    })
  }
}

export default function Home() {
  return <Form />
}