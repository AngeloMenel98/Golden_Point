"use client";

import Link from "next/link";
import GPLogo from "@/components/icons/GPLogo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Banner with wallpaper - takes 50% */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center bg-no-repeat relative"
        style={{ 
          backgroundImage: "url('/GP_WallPaper.jpg')",
        }}
      >
        {/* Logo at bottom left */}
        <div className="absolute bottom-8 left-8">
          <GPLogo width={180} height={90} />
        </div>
      </div>

      {/* Right side - Register form - takes 50%, pastel green background */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-8 bg-gp-pastel">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <GPLogo width={150} height={75} />
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-gp-dark">
              Regístrate
            </h1>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gp-dark mb-1">
                  Nombre
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border-2 border-gp-dark rounded-md bg-white text-gp-dark focus:outline-none focus:border-gp-dark" 
                  placeholder="Tu nombre" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gp-dark mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full p-3 border-2 border-gp-dark rounded-md bg-white text-gp-dark focus:outline-none focus:border-gp-dark" 
                  placeholder="email@ejemplo.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gp-dark mb-1">
                  Contraseña
                </label>
                <input 
                  type="password" 
                  className="w-full p-3 border-2 border-gp-dark rounded-md bg-white text-gp-dark focus:outline-none focus:border-gp-dark" 
                  placeholder="••••••••" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-gp-dark text-white font-semibold rounded-md hover:bg-gp-dark/80 transition-colors"
              >
                Regístrate
              </button>
            </form>

            <p className="text-center mt-6 text-gp-dark text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-gp-dark font-semibold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
