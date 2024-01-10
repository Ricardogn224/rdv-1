// Dans un composant parent
import React from "react";
import LoginForm from "./components/LoginForm";

function Login() {
  return (
    <div class="login">
      <h2>J'ai déjà un compte</h2>
      <LoginForm />
    </div>
  );
}

export default Login;
