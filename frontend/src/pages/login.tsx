import { NavLink, useNavigate } from "react-router";
import { useAlert } from "../hooks/useAlert";

export function Login() {
  const navigate = useNavigate();
  const { alert } = useAlert();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:3333/students/authenticate", {
        body: JSON.stringify(data),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw res;
      }

      const body = await res.json();
      console.log(body);
      localStorage.setItem("token", body.token);

      alert({ title: "Sucesso", description: "Login realizado com sucesso", type: "success" });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate("/student");
    } catch (err) {
      if ((err as { status: number }).status === 401) {
        alert({ title: "Erro", description: "E-mail ou senha inválidos", type: "error" });
      } else {
        alert({ title: "Erro", description: "Erro ao realizar login", type: "error" });
      }
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
