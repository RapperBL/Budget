import { useState } from "react";
import Swal from "sweetalert2";
import { loginApi } from "../Service";

export default function Login() {
  const [Login_User, setLogin_User] = useState("");
  const [Login_Pass, setLogin_Pass] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginApi({
        Login_User,
        Login_Pass,
      });
      if (response.message === 'Login successful') {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('Login_User', Login_User);
        window.location.href = "/Home";
      }
    } catch (error) {
      Swal.fire("Error", error.response.data.message, "error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section id="login" className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center mb-6 select-none text-red-600 text-5xl">
        <h1>LTC Budget</h1>
      </div>

      <div className="w-full max-w-sm select-none">
        <form className="space-y-4" noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2 text-red-600 text-sm font-medium">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              placeholder="Enter user here"
              onChange={(e) => setLogin_User(e.target.value)}
              className="w-full px-3 py-2 border border-red-600 rounded-md outline-none focus:ring focus:ring-red-200"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-red-600 text-sm font-medium">Password</label>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Enter password here"
                onChange={(e) => setLogin_Pass(e.target.value)}
                className="w-full px-3 py-2 border border-red-600 rounded-md outline-none focus:ring focus:ring-red-200"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </section>
  );
}
