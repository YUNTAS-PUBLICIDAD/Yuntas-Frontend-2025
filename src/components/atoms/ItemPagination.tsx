import React from 'react'

type ItemPagination = {
	children: React.ReactNode
	classname?: string,
	onClick?: () => void,
	active?: boolean,
	disabled?: boolean;
}

const ItemPagination = ({ children, classname, onClick, active = false, disabled = false }: ItemPagination) => {
	return (
		<button
			onClick={onClick}
			className={`
				rounded-full size-8 font-bold  text-black flex justify-center items-center cursor-pointer hover:bg-gray-300 hover:text-black ${classname} 
				${active ? 'bg-[#0B0B1F] text-white' : ''}
				${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
			`}
		>
			{children}
		</button >
	)
}

export default ItemPagination