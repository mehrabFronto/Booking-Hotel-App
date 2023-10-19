import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

const Login = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState("mehrab@gmial.com");
   const [password, setPassword] = useState("1234");

   const { user, login, isAuthenticated } = useAuth();

   const submitHandler = (e) => {
      e.preventDefault();
      if (email && password) login(email, password);
   };

   useEffect(() => {
      if (isAuthenticated) navigate("/", { replace: true });
   }, [isAuthenticated, navigate]);

   return (
      <div className="loginContainer">
         <h2>Login</h2>
         <form
            onSubmit={submitHandler}
            className="form">
            <div className="formControl">
               <label htmlFor="email">Email</label>
               <input
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  type="text"
                  name="email"
                  id="email"
               />
            </div>
            <div className="formControl">
               <label htmlFor="password">Password</label>
               <input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  type="password"
                  name="password"
                  id="password"
               />
            </div>
            <div className="buttons">
               <button className="btn btn--primary">Login</button>
            </div>
         </form>
      </div>
   );
};

export default Login;
