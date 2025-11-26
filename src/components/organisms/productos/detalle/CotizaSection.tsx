import Banner from "@/components/atoms/Banner"
import Text from "@/components/atoms/Text"
import Button from "@/components/atoms/Button";
export default function CotizaSection() {
	return (
		<section className="w-full">
			<Banner color='bg-[#E2F6F6]' className='flex flex-col h-auto gap-10 py-16 font-normal text-2xl '>
				<Text variant="h2" color="text-[#203565]" className="font-bold text-center">¿ENCONTRASTE LO QUE BUSCABAS?</Text>
				<div className="hidden md:block">
                    <Button variant="tertiary" size="lg">
                        ¡COTIZA AHORA!
                    </Button>
                </div>
                <div className="block md:hidden">
                    <Button variant="primary" size="lg">
                        ¡COTIZA AHORA!
                    </Button>
                </div>

			</Banner>
		</section>
	)
}
