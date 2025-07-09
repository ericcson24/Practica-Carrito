//tienda de habilidades pokemon

import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { MostrarTodos } from "../../components/mostrat_todos.tsx";
import { getSpells } from "../../utils/API.ts";
import { Spell } from "../../utils/type.ts";

 export const handler: Handlers = {

    async GET(_req:Request, ctx:FreshContext<unknown,Spell[]>) {

        const spells= await getSpells();


        return await ctx.render(spells);
  },
};

export default function Home(props:PageProps<Spell[]>) {
  return <MostrarTodos Spells={props.data}/>
}