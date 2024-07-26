import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../hooks/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      navigate("/komunitas");
    }
  });

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };
  return (
    <div className="bg-blue-500">
      <div className="flex flex-col w-full  h-screen items-center justify-center text-white">
        <div>
          <h1 className="text-3xl font-bold mb-3">Login</h1>
        </div>
        <div className="text-black">
          {isError && <div className="text-red-500">Something Wrong</div>}
          <form onSubmit={Auth} className="flex flex-col gap-2">
            <div>
              <input
                type="text"
                className="w-60 h-12 px-2 border-2 rounded-lg placeholder:text-sm"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                className="w-60 h-12 px-2 border-2 rounded-lg placeholder:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full my-2 shadow-md py-2 bg-white rounded-md font-bold"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
            <div>
              <p className="text-white text-sm text-center font-light">
                Belum punya akun?{" "}
                <Link to="/register" className="hover:underline font-semibold">
                  Daftar
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
