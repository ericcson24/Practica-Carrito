import { FunctionalComponent } from "preact/src/index.d.ts";
import { Spell } from "../utils/type.ts";
import CarritoBoton from "../islands/carrito_boton.tsx";


type data={
    Spells: Spell[]
}

export const MostrarTodos :FunctionalComponent <data>=(props)=>{

    return(
        <div>
          
            <div class="grid-spells">
                <h1>Hechizos Disponibles</h1>
                <div class="spells-container">
                    {props.Spells.map(e=>
                        <div key={e.index} class="card">
                            <div class="card-info">
                                <a href={`/spells/${e.index}`} class="name">
                                    {e.name}
                                </a>
                                <span class="level">Nivel {e.level}</span>
                            </div>
                            <CarritoBoton index={e.index} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}