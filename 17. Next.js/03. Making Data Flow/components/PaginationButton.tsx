'use client'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

export default function PaginationButton({page, isActive, label}:{
  page:number,
  isActive:boolean,
  label:string
}){

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  function handlePageChange(){
    const urlSearchParams = new URLSearchParams(searchParams.toString())
    urlSearchParams.set('page', page.toString())
    const url = `${pathname}?${urlSearchParams.toString()}`
    router.push(url)
  }

  return (
    <button 
      onClick={handlePageChange}
      className={`px-3 py-1.5 text-sm rounded-md border cursor-pointer ${isActive ? 'text-white bg-orange-400 border-orange-300' : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}>  
      {label || page}  
    </button>
  )
}