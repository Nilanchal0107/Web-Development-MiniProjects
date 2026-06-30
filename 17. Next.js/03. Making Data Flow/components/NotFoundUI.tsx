import Link from 'next/link'

export default function NotFoundUI({title, subtitle, link_text, link_href}:{
  title:string,
  subtitle:string,
  link_text:string,
  link_href:string
}){
  return (
    <main className="flex flex-col items-center justify-center gap-2 mt-10">
      <span className="mt-10 text-7xl">🙈</span>
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p>{subtitle}</p>
      <Link
        href={link_href}
        className="border-2 border-orange-400 px-3 py-3 rounded-lg text-orange-400 font-semibold"
      >
	      {link_text}
      </Link>
  </main>
  )
}