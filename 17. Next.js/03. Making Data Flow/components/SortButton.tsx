'use client'

import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import type {TransitionStartFunction} from 'react'

export default function SortButton({children, sort, startTransition}:{
  children:React.ReactNode,
  sort:string,
  startTransition:TransitionStartFunction
}){

  const pathname = usePathname()
  const router = useRouter() 
  const searchParams = useSearchParams()

  const isActive = searchParams.get("sort") === sort

  function handleSort(){
    const urlSearchParams = new URLSearchParams(searchParams.toString())
    urlSearchParams.set('sort',sort)
    urlSearchParams.delete('page')
    const url = `${pathname}?${urlSearchParams.toString()}`
    startTransition(()=>{ 
      router.push(url)
    })
    
  }

  return (
    <button
      onClick={handleSort}
      className={`px-3 py-1.5 text-sm rounded-full border cursor-pointer ${isActive ? "text-white bg-orange-400 border-orange-400" : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
    >
      {children}
    </button>

  )
}