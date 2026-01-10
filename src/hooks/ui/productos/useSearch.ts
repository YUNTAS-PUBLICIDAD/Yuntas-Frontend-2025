'use client'

import { useState } from "react"
type useSearchProps = {
    listItem: any[],
}

export const useSearch = ({ listItem }: useSearchProps) => {
    const [textSearch, setTextSearch] = useState("")
    const searchList = listItem?.filter((e) => ((e.name || (e as any).nombre || '').toString().toLowerCase()).includes(textSearch.toLowerCase())) || [];
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const input = e.currentTarget.querySelector("input") as HTMLInputElement | null
        if (input) setTextSearch(input.value)
        console.log(input?.value)
    }
    return {
        searchList,
        handleSubmit

    }
}