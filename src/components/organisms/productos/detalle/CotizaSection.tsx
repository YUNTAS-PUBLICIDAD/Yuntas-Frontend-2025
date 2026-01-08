import Banner from "@/components/atoms/Banner"
import Text from "@/components/atoms/Text"
import Button from "@/components/atoms/Button";
import Link from "next/link";

export default function CotizaSection() {
    return (
        <section className="w-full">
           
            <Banner 
                color='bg-[#E2F6F6]' 
                className='flex flex-col h-auto gap-8 py-12 px-6 md:py-16 md:gap-10 font-normal text-xl md:text-2xl items-center'
            >
                <Text 
                    variant="h2" 
                    color="text-[#203565]" 
                    className="font-bold text-center leading-tight"
                >
                    ¿ENCONTRASTE LO QUE BUSCABAS?
                </Text>

                {/* Versión Desktop */}
                <div className="hidden md:block">
                    <Link href="/contacto">
                        <Button variant="tertiary" size="lg">
                            ¡COTIZA AHORA!
                        </Button>
                    </Link>
                </div>

                {/* Versión Móvil */}
                <div className="block md:hidden w-full text-center">
                    <Link href="/contacto">
                        <Button variant="primary" size="lg" className="w-full max-w-xs">
                            ¡COTIZA AHORA!
                        </Button>
                    </Link>
                </div>

            </Banner>
        </section>
    )
}