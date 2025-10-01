'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation';
import api from '@/lib/api/api';
import { toast } from 'sonner';
import FullPageLoader from './FullPageLoader';
const LoginForm = () => {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // ✅ Gestion du submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.status === 200) {
        // Stocker le token (si ton backend le renvoie dans la réponse JSON)
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        toast.success("Successfully connected");
        router.push("/dashboard"); // ✅ redirection après login
      } else {
        toast.error(res.data.message || "Login failed ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading 
      ? (<FullPageLoader title='Authentification'/>) 
      : (
        <div className='px-4 pt-15 pb-15'>
      <div className="flex flex-col space-y-10 md:max-w-[50%] mx-auto">
        <h1 className='font-bold text-textGreen font-playfair text-5xl'> Login </h1>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col space-y-15'>
            <div className='flex flex-col space-y-20'>

              {/* Email */}
              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  required
                  className="peer w-full border-0 border-b border-borderGreen bg-transparent px-0 pt-5 pb-1 text-textGreen 
                  hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-borderGreen focus:outline-none font-roboto text-lg "
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all 
                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base 
                  peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen
                  peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
                  peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  Email
                </label>
              </div>

              {/* Password */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  required
                  className="peer w-full border-0 border-b border-borderGreen bg-transparent px-0 pt-5 pb-1 text-textGreen 
                  hover:border-b-2 placeholder-transparent focus:border-b-2 focus:border-borderGreen focus:outline-none font-roboto text-lg"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-textGreen transition-all 
                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-textGreen peer-placeholder-shown:text-base 
                  peer-focus:top-0 peer-focus:text-sm peer-focus:text-textGreen
                  peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-sm
                  peer-[&:not(:placeholder-shown)]:text-textGreen"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-textGreen" /> : <Eye className="w-5 h-5 text-textGreen" />}
                </button>
              </div>
            </div>

            {/* Bouton login */}
            <div className='flex flex-col space-y-5'>
              <button
                className='rounded-md bg-goldButton hover:bg-goldButtonHover py-2 flex flex-row justify-center items-center gap-3 w-full md:w-[200px] cursor-pointer text-textGreen font-inter text-lg font-semibold'
                type='submit'
                disabled={loading}
              >
                {loading ? "Loading..." : (
                  <>
                    <span>Login</span>
                    <FaLongArrowAltRight />
                  </>
                )}
              </button>

              
     <div className='flex flex-row items-center justify-between'>
      <Link href={'/forgot-password'} className="cursor-pointer hover:underline hover:text-borderGreen text-borderGreen">Forgot password ?</Link>
               <Link href={'/register'} className="cursor-pointer hover:underline hover:text-borderGreen text-borderGreen"> Sign up</Link>

     </div>
              


            </div>
          </div>
        </form>
      </div>
    </div>
      )}
    </>
  )
}

export default LoginForm;
