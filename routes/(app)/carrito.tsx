import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std/http/cookie.ts";
import { Spell } from "../../utils/type.ts";
import { getSpells } from "../../utils/API.ts";
import { Header } from "../../islands/Header.tsx";

type CarritoItem = {
    index: string
    cantidad: number
}

type CarritoData = {
    items: Array<Spell & { cantidad: number }>
    total: number
}

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, CarritoData>) => {
        const cookie = getCookies(req.headers)
        
        if (cookie.carrito) {
            try {
                const carritoItems = JSON.parse(decodeURIComponent(cookie.carrito)) as CarritoItem[]
                const allSpells = await getSpells()
                
                const items = carritoItems.map(carritoItem => {
                    const spell = allSpells.find(s => s.index === carritoItem.index)
                    return {
                        ...spell!,
                        cantidad: carritoItem.cantidad
                    }
                }).filter(item => item.name) // Filtrar items válidos
                
                const total = items.reduce((sum, item) => sum + item.cantidad, 0)
                
                return ctx.render({ items, total })
            } catch (error) {
                console.error("Error parsing cart cookie:", error)
                return ctx.render({ items: [], total: 0 })
            }
        }
        
        return ctx.render({ items: [], total: 0 })
    }
}

export default (props: PageProps<CarritoData>) => {
    const { items, total } = props.data
    
    return (
        <div class="carrito-page">
            
            
            <div class="main">
                <h1>🛒 Mi Carrito</h1>
                
                {items.length === 0 ? (
                    <div class="empty-cart">
                        <p>Tu carrito está vacío</p>
                        <a href="/home" class="continue-shopping">Continuar comprando</a>
                    </div>
                ) : (
                    <div class="cart-content">
                        <div class="cart-summary">
                            <h2>Resumen del carrito</h2>
                            <p>Total de hechizos: <strong>{total}</strong></p>
                        </div>
                        
                        <div class="cart-items">
                            {items.map(item => (
                                <div key={item.index} class="cart-item">
                                    <div class="item-info">
                                        <h3>{item.name}</h3>
                                        <p class="item-level">Nivel {item.level}</p>
                                    </div>
                                    <div class="item-quantity">
                                        <span class="quantity-label">Cantidad:</span>
                                        <span class="quantity-value">{item.cantidad}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div class="cart-actions">
                            <a href="/home" class="continue-shopping">Comprar</a>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
