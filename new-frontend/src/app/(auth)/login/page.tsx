"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import RedesignedLogo from "@/components/icons/RedesignedLogo";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await login(username, password);

    if (result.success) {
      router.push("/tours");
    } else {
      setError(result.error || "Login failed");
    }
  };

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
          <RedesignedLogo width={180} height={90} />
        </div>
      </div>

      {/* Right side - Login form - takes 50%, pastel green background */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-8 bg-gp-pastel">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <RedesignedLogo width={150} height={75} />
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-gp-dark">
              Iniciar Sesión
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gp-dark mb-1"
                >
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border-2 border-gp-dark rounded-md bg-white text-gp-dark focus:outline-none focus:border-gp-dark"
                  placeholder="Tu nombre de usuario"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gp-dark mb-1"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border-2 border-gp-dark rounded-md bg-white text-gp-dark focus:outline-none focus:border-gp-dark"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && <p className="text-gp-red text-sm text-center bg-gp-red/10 py-2 rounded">{error}</p>}

              <button 
                type="submit" 
                className="w-full py-3 bg-gp-dark text-white font-semibold rounded-md hover:bg-gp-dark/80 transition-colors disabled:opacity-60"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>

            <p className="text-center mt-6 text-gp-dark text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-gp-dark font-semibold hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
