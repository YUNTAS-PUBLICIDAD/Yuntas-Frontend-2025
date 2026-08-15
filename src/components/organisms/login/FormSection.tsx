'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
import { HiUser } from 'react-icons/hi';
import InputText from '@/components/atoms/InputText';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';
import { useAuth } from '@/hooks/useAuth';
import { HiEye, HiEyeOff, HiArrowLeft, HiInformationCircle } from "react-icons/hi";

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
        <section className="min-h-[40vh] lg:min-h-screen flex items-start justify-center bg-white pt-6 md:items-center md:pt-0">
            <div className="w-full px-5 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-12 xl:px-16 lg:py-14">
                <div className="mx-auto w-full max-w-lg md:max-w-xl lg:max-w-2xl">
                    <div className="mb-6 flex w-full justify-center md:hidden">
                        <Logo size="mobile" src="/logo.svg" alt="Yuntas Publicidad" />
                    </div>

                    <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 md:h-12 md:w-12">
                            <HiUser size={24} className="text-slate-700" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900">Bienvenido de nuevo</h2>
                    </div>

                    <div className="w-full rounded-lg border border-blue-100 bg-blue-50/40 p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="shrink-0 rounded-full bg-blue-100 p-2 text-blue-700">
                                <HiInformationCircle size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-800">Solo puedes ingresar si perteneces a una de las siguientes áreas:</p>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-blue-700">Administración</span>
                                    <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-blue-700">Marketing</span>
                                    <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-blue-700">Diseño</span>
                                </div>
                                <p className="mt-2 text-xs text-slate-500">Si no perteneces a estas áreas, no tendrás acceso al sistema.</p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <InputText
                            placeholder="Usuario"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 h-14"
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
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 h-14"
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
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
                            >
                                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                            </button>
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-xl px-6 py-3 text-lg font-semibold uppercase tracking-[0.04em] text-white bg-gradient-to-r from-brand-cyan via-[#3ECAD0] to-[#0ea5b7] shadow-[0_10px_30px_rgba(109,225,227,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 h-14"
                            disabled={isLoading}
                        >
                            {isLoading ? <span>Ingresando...</span> : 'Ingresar'}
                        </Button>
                    </form>

                    <div className="mt-8 border-t pt-6 text-center">
                        <Link href="/" className="group relative inline-flex rounded-xl p-[1.5px] overflow-hidden">
                            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-cyan via-[#22c55e] to-[#0ea5b7] opacity-90 group-hover:opacity-100 transition" />
                            <span className="relative px-6 py-3 rounded-[10px] bg-white text-[#0a1a3a] font-semibold flex items-center gap-2 h-14">
                                <HiArrowLeft />Volver a Inicio
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}