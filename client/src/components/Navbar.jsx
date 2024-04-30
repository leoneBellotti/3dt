import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const {isAuthenticated,logout,user} = useAuth();
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to={isAuthenticated ? '/tasks':"/"}>
                <h1 className="text-2xl font-bold">Menu</h1>
            </Link>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            Bem vindo {user.username}
                        </li>
                        <li>
                            {/* <Link className="bg-indigo-500 px-4 py-1 rounded-sm" to='/'>home</Link> */}
                        </li>
                        <li>
                            <Link to='/' className="bg-red-500 px-4 py-1 rounded-sm" onClick={() => {logout()}}>Logout</Link>
                        </li>
                    </>
                ):(
                    <>
                        <li>
                            <Link className="bg-indigo-500 px-4 py-1 rounded-sm" to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link className="bg-indigo-500 px-4 py-1 rounded-sm" to='/register'>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar