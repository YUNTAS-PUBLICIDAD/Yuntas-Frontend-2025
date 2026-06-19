import Text from '@/components/atoms/Text'
import Image from 'next/image'

type BlogCardProps = {
	imgUrl: string,
	imgAlt: string,
	imgTitle: string,
	productName: string,
	blogTitle: string
}

const BlogCard = ({ imgUrl, imgAlt, imgTitle, productName, blogTitle }: BlogCardProps) => {
	return (
		<div className="group block w-full h-full max-w-[420px] mx-auto bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
			<div className='relative w-full aspect-[16/10] overflow-hidden'>
				{/*<img
					src={imgUrl}
					alt={imgAlt}
					title={imgTitle}
					className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
				/>*/}

				<Image
					quality={70}
					src={imgUrl} alt={imgAlt} title={imgTitle} fill className='object-cover transition-transform duration-700 group-hover:scale-110' sizes="(max-with:768px) 100vw, (max-width:1200px) 50vw,33vw " />
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			</div>

			{/* Contenido */}
			<div className='p-6 flex flex-col'>
				<div>
					<Text variant='small' className='font-bold uppercase tracking-wider mb-2 text-gray-800'>{productName}</Text>
					<Text variant='subtitle' className='font-extrabold text-[#203565] line-clamp-2 leading-tight mb-3 group-hover:text-[#18879B] transition-colors'>
						{blogTitle}
					</Text>
				</div>

				<div className="flex items-center text-[#18879B] font-bold text-sm mt-4">
					<span className="mr-2 uppercase tracking-tighter">Leer más</span>
					<svg
						className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
					</svg>
				</div>
			</div>
		</div>
	)
}

export default BlogCard
