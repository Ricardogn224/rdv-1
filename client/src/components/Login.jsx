import React from 'react';

function Login() {
  return (
    <div className="flex-center flex-column">
      <section className=" flex-column mt-80 form-zone">
        <div className="flex-center">
          <h1 className="title">J'ai déjà un compte</h1>
        </div>

        <form >
          <div className="flex-column flex-center">
            <input
              className="field"
              type="email"
              name="email"
              id="email"
              placeholder="Email ou numéro de téléphone"
            />
            <input
              className="field"
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
            />

            <div className="field flex">
              <div className='flex space-between'>

                <div className='ml-20'>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="remember"
                    name="remember"
                  />
                </div>

                <div className='space-around flex-center'>
                  <label htmlFor="remember">Se souvenir de mon identifiant</label>
                </div>

              </div>
            </div>
          </div>

          <div className="flex-center">
            <button className="btn-submit" type="submit">
              Se connecter
            </button>
          </div>

          <div className="flex-center">
            <a className="field link flex-center" href="">
              Mot de passe oublié
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
