import Form from 'next/form'
import type {TransitionStartFunction} from 'react'
import {useRouter, usePathname} from 'next/navigation'

export default function SearchForm({search, startTransition}:{
  search?:string,
  startTransition:TransitionStartFunction
}){

  const pathname = usePathname()
  const router = useRouter()

  function handleSearch(formData:FormData){
    const search = formData.get("search")?.toString().trim() || ""
    const url = search ? `${pathname}?search=${encodeURIComponent(search)}` : pathname 
    startTransition(()=>{
      router.push(url)
    })
    
  }

  return (
    <Form 
      action={handleSearch}
      className="w-full px-5 md:px-0 md:max-w-xl">
      <input
        type="text"
        defaultValue={search}
        id="search"
        name="search"
        placeholder="E.g. dragon"
        autoComplete="off"
        className="w-full py-3 pl-5 pr-5 text-sm placeholder-gray-500 bg-white border border-[#606060] rounded-full focus:border-[#606060] focus:outline-none focus:ring-0 md:text-base"
      />
    </Form>
  )
}