import NotFoundUI from '@/components/NotFoundUI'

export default function CategoryNotFound(){
  return (
    <NotFoundUI
      title="Category Not Found"
      subtitle="Sorry, category doesn't exist"
      link_text="See all models"
      link_href="/3d-models"
    />
  )
}