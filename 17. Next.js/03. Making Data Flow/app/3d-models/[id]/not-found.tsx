import NotFoundUI from '@/components/NotFoundUI'
export default function ModelNotFound(){
  return (
    <NotFoundUI
      title="Model Not Found"
      subtitle="We can't find the requested model"
      link_text="See all models"
      link_href="/3d-models"
    />
  )
}