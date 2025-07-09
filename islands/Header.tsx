import { FunctionalComponent } from "preact/src/index.d.ts";

export const Header: FunctionalComponent = () => {
    const handleLogout = () => {
        // Eliminar la cookie de correo
        document.cookie = "correo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Eliminar la cookie del carrito
        document.cookie = "carrito=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirigir a la página de login
        globalThis.location.href = "/";
    };

    return (
        <header class="header">
            <nav class="nav-container">
                <div class="nav-brand">
                    <a href="#" onClick={handleLogout}>🧙‍♂️ Cerrar Sesión</a>
                </div>
                <div class="nav-links">
                    <a href="/home">Inicio</a>
                    <a href="/carrito">🛒 Carrito</a>
                </div>
            </nav>
        </header>
    );
};
