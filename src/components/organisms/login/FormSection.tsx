'use client';

import { useState } from 'react';
import Logo from '@/components/atoms/Logo';
import Text from '@/components/atoms/Text';
import InputText from '@/components/atoms/InputText';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';
import { useAuth } from '@/hooks/useAuth';

export default function FormSection() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({ email, password });
    };

    return (
        <section className="
            bg-white/10 backdrop-blur-lg md:bg-gray-200
            rounded-3xl p-8 w-full max-w-md mx-auto mb-8
            border border-white/20
            flex flex-col justify-center gap-5 items-center
        ">
            <div className="flex flex-col items-center w-56">
                <Logo src="/logo.svg" size="xl" alt="Yuntas Publicidad" />
            </div>
            
            <Text variant='h2' className='font-bold text-white'>
                Bienvenido
            </Text>

            {error && (
                <div className="w-full bg-red-500/20 border border-red-500 text-red-100 md:text-red-600 md:bg-red-100 px-4 py-3 rounded-lg text-sm text-center animate-pulse">
                    ⚠️ {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full items-center'>
                <InputText 
                    placeholder='Usuario' 
                    className='rounded-full' 
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <InputText 
                    placeholder='Contraseña' 
                    className='rounded-full' 
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <Button 
                    type='submit' 
                    className='uppercase flex items-center justify-center gap-2'
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
        </section>
    );
}