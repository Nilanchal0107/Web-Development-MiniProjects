import Link from 'next/link'
import NavLink from '@/components/NavLink'
import Image from 'next/image'

export default function NavBar(){
  return (
    <header className="w-full bg-white">
      <nav className="flex justify-between px-6 py-4 pr-2">
        <Link href="/">
          <div className="relative cursor-pointer">

            <Image
              width={200}
              height={42}
              src="/img/printforge-logo.svg"
              alt="PrintForge Logo"
              className="w-[200px] h-auto hidden md:block"
            />

            <Image
              width={40}
              height={35}
              src="/img/printforge-logo-icon.svg"
              alt="PrintForge Logo"
              className="w-[40px] h-auto block md:hidden"
            />
          </div>
        </Link>
        <ul className="flex items-center gap-1.5">
          <NavLink href="/3d-models">3D Models</NavLink>
          <NavLink href="/about">About</NavLink>
        </ul>
      </nav>
    </header>
  )
}

/*  
CHALLENGE - NavLink Component  
- Create a `NavLink.tsx` component  
- Accept `href` and `children` as props  
- Move one of the `<li>` elements from `Navbar.tsx` into the component  
- Replace the hardcoded values with props  
- Use `NavLink` inside `Navbar.tsx`
  
DOCS:
- https://react.dev/learn/passing-props-to-a-component#passing-props-to-a-component 
*/