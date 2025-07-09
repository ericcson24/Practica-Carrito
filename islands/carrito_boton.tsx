
import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact";

type Data = {
    index: string
}

type carrito_cantidad={
    index:string,
    cantidad:number
}

const carrito_boton: FunctionalComponent<Data> = (props) => {
    const [cantidad, setCantidad] = useState<number>(0)

    const getCarritoFromCookie =():carrito_cantidad[]=>{
        const cookie = document.cookie.split("; ").find(e => e.startsWith("carrito="))
        if(cookie){
            const value = JSON.parse(decodeURIComponent(cookie.split("=")[1])) as carrito_cantidad[]
            return value
        }
        return[]
    }

    const saveCarrito =(carrito: carrito_cantidad[])=>{
        const date = new Date()
        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000))
        document.cookie = `carrito=${encodeURIComponent(JSON.stringify(carrito))};Expires=${date.toUTCString()};Path=/`
    }

    const addCarrito=()=>{

        const carrito=getCarritoFromCookie()

        const encontrarItemIndexEnCarrito = carrito.findIndex(item => item.index === props.index)

        if(encontrarItemIndexEnCarrito >= 0){
            carrito[encontrarItemIndexEnCarrito].cantidad +=1
        }else{
            //basicamente es que no se le puede editar la cantidad porq no existe
            carrito.push({index: props.index, cantidad:1})
        }

        //guardamos
        saveCarrito(carrito)
        setCantidad(cantidad+1)

    }
    const quitarcarrito=()=>{

        if(cantidad<=0) return

        const carrito=getCarritoFromCookie()

        const encontrarItemIndexEnCarrito = carrito.findIndex(item => item.index === props.index)

        if (encontrarItemIndexEnCarrito >= 0){
            if(carrito[encontrarItemIndexEnCarrito].cantidad >1){
                carrito[encontrarItemIndexEnCarrito].cantidad -=1
            }
            else{
                carrito.splice(encontrarItemIndexEnCarrito, 1)
            }
        }

        //guardamos
        saveCarrito(carrito)
        setCantidad(cantidad-1)

    }

    useEffect(()=>{
        const carrito = getCarritoFromCookie()
        const item = carrito.find(item => item.index === props.index)
        if (item) {
            setCantidad(item.cantidad)
        }
    },[])


    if (cantidad === 0) {
        return (
            <button type="button" onClick={addCarrito} class="add-to-cart-btn">
                🛒 Añadir al carrito
            </button>
        )
    }

    return (
        <div class="cart-counter">
            <button type="button" onClick={quitarcarrito} class="counter-btn">-</button>
            <span class="counter-value">{cantidad}</span>
            <button type="button" onClick={addCarrito} class="counter-btn">+</button>
        </div>
    )
}

export default carrito_boton
