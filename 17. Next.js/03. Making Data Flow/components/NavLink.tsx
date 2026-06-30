'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'


export default function NavLink({href, children, exact}:{
  href:string,
  children:React.ReactNode,
  exact?:boolean
}){

  const pathname = usePathname()
  const isActive = exact    
			   ? pathname === href
			   : pathname.startsWith(href)

  return (
    <li className="text-sm uppercase">
      <Link className={`px-4 py-2 transition-colors rounded-md cursor-pointer hover:text-orange-400 ${isActive ? 'text-orange-400' : 'text-gray-700'}`}
        href={href}>{children}</Link>
    </li>
  )
}