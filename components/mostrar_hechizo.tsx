import { FunctionalComponent } from "preact/src/index.d.ts";
import { Spell } from "../utils/type.ts";
import CarritoBoton from "../islands/carrito_boton.tsx";


type data={
    Spell: Spell
}

export const MostrarUno :FunctionalComponent <data>=(props)=>{

    return(
        <div>
           
            <div class="detail">
                <h1>Hechizo: {props.Spell.name}</h1>
                <div class="spell-info">
                    <p><strong>Nivel:</strong> {props.Spell.level}</p>
                    <p><strong>Índice:</strong> {props.Spell.index}</p>
                </div>
                
                <div class="spell-description">
                    <h3>Descripción:</h3>
                    <p>{props.Spell.desc}</p>
                </div>

                
                <div class="spell-higher-level">
                    <h3>Niveles Superiores:</h3>
                    <p>{props.Spell.higher_level}</p>
                </div>
                

                <div class="spell-actions">
                    <CarritoBoton index={props.Spell.index} />
                    <a href="/home" class="continue-shopping">← Volver a hechizos</a>
                </div>
            </div>
        </div>
    )

}