import { FunctionalComponent } from "preact";

export const Form: FunctionalComponent = () => {
    return (
        <div class="login">
            <h1>Login</h1>
            <form method="POST" action="/">
                <h3>Correo: <input type="email" name="correo" required /></h3>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};
