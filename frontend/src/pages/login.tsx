import { NavLink, useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("http://localhost:3333/students/authenticate", {
        body: JSON.stringify(data),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      // navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="login">
      <div className="login__wrapper card">
        <h1 className="login__title card__title">Fazer login</h1>
        <span className="login__description card__description">Insira seu e-mail e senha para fazer login</span>
        <form className="login__form" onSubmit={handleLogin}>
          <label className="form-label" htmlFor="email">
            E-mail
          </label>
          <input id="email" name="email" className="form-input" type="text" placeholder="exemplo@exemplo.com" />
          <label className="form-label" htmlFor="password">
            Senha
          </label>
          <input className="form-input" id="password" name="password" type="password" placeholder="********" />
          <button className="btn" type="submit">
            Entrar
          </button>
          <span className="account__warning">
            Ainda não possui uma conta? Crie <NavLink to="/signup">aqui</NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}
