import {useForm} from 'react-hook-form';
import {useAuth} from "../context/AuthContext";
import {useEffect} from "react";
import {useNavigate,Link} from "react-router-dom";

function RegisterPage() {

    const {register,handleSubmit,formState:{errors}} = useForm();
    const {singup,isAuthenticated,errors:registerErrors} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isAuthenticated) navigate("/tasks")
    },[isAuthenticated])

    const onSubmit = handleSubmit(async(values) => {
        singup(values);
    });
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <h1 className="text-2xl font-bold">Registro</h1>
                {
                    registerErrors.map((error,i) => (
                        <div className='bg-red-500 p-2 text-white' key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        {...register('username',{required:true})}
                        className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
                        placeholder='Nome' />
                        {errors.username && (<p className='text-red-500'>Nome obrigatorio</p>)}
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
                    <button className='bg-sky-500 text-white px-4 py-2 rounded-md my-2' type='submit'>registar</button>
                </form>
                <p className="flex gap-x-2 justify-between">
                    Possui conta <Link to="/login" className="text-sky-500">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage