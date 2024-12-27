import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
        <main className="container mt-14 md:mt-0 mx-auto xl:px-14 px-10 md:grid md:grid-cols-2 h-screen gap-10 items-center">
            <Outlet />
        </main>
    </>
  )
}

export default AuthLayout