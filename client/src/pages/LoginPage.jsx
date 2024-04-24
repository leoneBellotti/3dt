/* eslint-disable no-undef */
import {useForm} from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {Link,useNavigate} from "react-router-dom";
import { useEffect,useState } from "react";
import Loading from "../components/TelaLoading";

function LoginPage() {
    const [isLoading, setIsLoading] = useState(true);
    const {register,handleSubmit,formState:{errors}} = useForm();
    const {signin,errors:signinErrors,isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const onSubmit = handleSubmit(data => {
        setIsLoading(true);
        signin(data);
    });
    useEffect(() => {
        if(isAuthenticated) navigate('/tasks');
    },[isAuthenticated, navigate])

    useEffect(() => {
        setIsLoading(false);
    }, []);
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            {isLoading ? <Loading /> : ''}
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {
                    signinErrors.map((error,i) => (
                        <div className='bg-red-500 p-2 text-white text-center' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className="text-2xl font-bold">Login</h1>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        {...register('email',{required:true})}
                        className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
                        placeholder='e-mail' />
                        {errors.email && (<p className='text-red-500'>email obrigatorio</p>)}
                    <input
                        type="password"
                        {...register('password',{required:true})}
                        className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
                        placeholder='senha' />
                        {errors.password && (<p className='text-red-500'>senha obrigatorio</p>)}
                    <button type='submit' className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>Login</button>
                    <p className="flex gap-x-2 justify-between">
                        Sem conta? <Link to="/register" className="text-sky-500">Registrar</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage