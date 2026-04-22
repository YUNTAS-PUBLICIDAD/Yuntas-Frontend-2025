'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
import InputText from '@/components/atoms/InputText';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';
import { useAuth } from '@/hooks/useAuth';
import { HiEye, HiEyeOff, HiArrowLeft } from "react-icons/hi";

export default function FormSection() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { login, isLoading, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({ email, password });
    };

    return (
        <section className="
            relative z-10
            bg-white/10 backdrop-blur-lg
            border border-white/15
            rounded-3xl
            px-8 py-10 md:px-12 md:py-12
            w-full max-w-sm md:max-w-none
            flex flex-col items-center gap-6
            shadow-[0_8px_60px_rgba(0,0,0,0.4)]
            mx-auto
        ">
            {/* Logo */}
            <div className="flex flex-col items-center w-44">
                <Logo src="/logo.svg" size="xl" alt="Yuntas Publicidad" />
            </div>

            {/* Título */}
             <div className="relative z-10 flex flex-col items-center text-center px-6">
                <span className="text-white/50 md:text-s tracking-[0.3em] uppercase mb-1">Bienvenido a</span>
                <h1 className="text-white font-bold text-2xl md:text-2xl leading-tight drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
                    Yuntas{" "}
                    <span className="text-cyan-300">Producciones</span>
                </h1>
                {/* Línea decorativa */}
                <div className="mt-2 flex items-center gap-2">
                    <div className="w-6 h-[1.5px] bg-cyan-400/60 rounded-full" />
                    <div className="w-6 h-[1.5px] bg-white/80 rounded-full" />
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="w-full bg-red-500/20 border border-red-400/40 text-red-100 px-4 py-3 rounded-xl text-sm text-center">
                    ⚠️ {error}
                </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center">
                <InputText
                    placeholder="Usuario"
                    className="rounded-xl bg-white/90 border-0 w-full md:py-3 md:text-base"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />

                <div className="relative w-full">
                    <InputText
                        placeholder="Contraseña"
                        className="rounded-xl bg-white/90 border-0 pr-12 w-full md:py-3 md:text-base"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10"
                    >
                        {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
                    </button>
                </div>

                <Button
                    type="submit"
                    className="uppercase flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wider px-18 mt-1"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader size="sm" color="border-white" />
                            <span>Ingresando...</span>
                        </>
                    ) : (
                        "Ingresar"
                    )}
                </Button>
            </form>

            {/* Regresar */}
            <Link
                href="/"
                className="flex items-center gap-1.5 text-white/40 hover:text-white/80 text-sm md:text-sm transition-colors"
            >
                <HiArrowLeft size={14} />
                Regresar a la página de inicio
            </Link>
        </section>
    );
}