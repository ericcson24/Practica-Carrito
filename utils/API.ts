// deno-lint-ignore-file
//https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

import { Spell } from "./type.ts";


export const getSpells=async():Promise<Spell[]>=>{
    const res=await fetch("https://www.dnd5eapi.co/api/2014/spells")
    
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    
    return data.results.slice(0,20).map ((p:any)=>({

        index:p.index,
        name:p.name,
        level:p.level

    })
        
    )
}

export const getSpellsID=async(index:string):Promise<Spell>=>{
    const res=await fetch(`https://www.dnd5eapi.co/api/2014/spells/${index}`)
    
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    
    return {
        index: data.index,
        name: data.name,
        level: data.level,
        desc: data.desc ? data.desc.join(' ') : 'No description available',
        higher_level: data.higher_level ? data.higher_level.join(' ') : 'No higher level information'
    }
}
