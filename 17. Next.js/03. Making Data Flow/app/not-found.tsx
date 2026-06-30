import Link from 'next/link'
import NotFoundUI from '@/components/NotFoundUI'
export default function NotFound(){
  return (
    <NotFoundUI
      title="Page Not Found"
      subtitle="Sorry, we can't find the requested page"
      link_text="Go back home"
      link_href="/"
    />
  )
}