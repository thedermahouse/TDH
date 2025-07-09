import { CiLogin } from "react-icons/ci";
import { signIn } from "next-auth/react";

export default function Login() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const { value: password } = e.target.password;
    const { ok } = await signIn("credentials", {
      password,
      callbackUrl: "/admin/dashboard",
      redirect: false,
    });
    if (!ok) {
      alert("Incorrect password");
    } else {
      window.location.reload();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 from-10% via-gray-700 via-30% to-gray-900 to-90% ">
      <div>
        <div className="font-black text-white text-4xl text-center py-12 uppercase">
          <h1>The Derma House</h1>
        </div>
        <div className="text-center bg-primary/10 glass rounded-lg p-3">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-screen-lg mx-auto p-3 grid grid-cols-1 gap-3 h-48"
          >
            <div className="uppercase font-semibold text-sm text-gray-50 text-start">
              <h1>Admin Login</h1>
              <div className="divider my-0 divider-accent py-0"></div>
            </div>
            <div className="w-full">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-md input-bordered bg-transparent border input-secondary placeholder:text-white/60 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-accent btn-md btn-active"
              >
                <span className="text-xl">
                  <CiLogin />
                </span>
                <span>Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
