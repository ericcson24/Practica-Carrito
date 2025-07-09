import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { MostrarUno } from "../../../components/mostrar_hechizo.tsx";
import { getSpellsID } from "../../../utils/API.ts";
import { Spell } from "../../../utils/type.ts";

export const handler:Handlers = {
    GET: async(_req:Request, ctx:FreshContext<unknown,Spell>) => {
        const { index } = ctx.params
        const Spell = await getSpellsID(index)
        return ctx.render(Spell)
    }
}

export default (props:PageProps<Spell>) => {
    return <MostrarUno Spell={props.data}/>
}