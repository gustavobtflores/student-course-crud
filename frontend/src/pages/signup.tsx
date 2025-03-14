import { NavLink } from "react-router";

export function Signup() {
  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("http://localhost:3333/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="signup">
      <div className="signup__wrapper card">
        <h1 className="signup__title card__title">Criar uma conta</h1>
        <span className="signup__description card__description">Insira suas informações para se cadastrar</span>
        <form className="signup__form" onSubmit={handleSignup}>
          <label className="form-label" htmlFor="">
            E-mail
          </label>
          <input id="email" name="email" className="form-input" type="email" placeholder="exemplo@exemplo.com" required />
          <label className="form-label" htmlFor="password">
            Senha
          </label>
          <input id="password" name="password" className="form-input" type="password" placeholder="********" required />
          <button className="btn" type="submit">
            Cadastrar
          </button>
          <span className="account__warning">
            Já possui uma conta? Faça login <NavLink to="/">aqui</NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}
