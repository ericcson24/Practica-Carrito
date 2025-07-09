import { FunctionalComponent } from "preact/src/index.d.ts";

export const Header: FunctionalComponent = () => {
    return (
        <header class="header">
            <nav class="nav-container">
                <div class="nav-brand">
                    <a href="/">🧙‍♂️ Tienda de Hechizos</a>
                </div>
                <div class="nav-links">
                    <a href="/home">Inicio</a>
                    <a href="/carrito">🛒 Carrito</a>
                </div>
            </nav>
        </header>
    );
};
