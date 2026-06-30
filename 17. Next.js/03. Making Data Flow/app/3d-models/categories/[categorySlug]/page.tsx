import ModelsBrowser from '@/components/ModelsBrowser'
import {getModels, getModelCount} from '@/lib/models'
import {getCategoryBySlug} from '@/lib/categories'
import {notFound} from 'next/navigation'
import {MODELS_PER_PAGE} from '@/lib/constants'
import {getQueryParams} from '@/lib/utils'
import {redirect} from 'next/navigation'

export default async function CategoryPage({params, searchParams}:{
  params: Promise<{categorySlug:string}>,
  searchParams: Promise<{
    sort?:string, 
    search?:string,
    page?:string
    }>
}){

  const {search, sort, page} = getQueryParams(await searchParams)


  const {categorySlug} = await params

  const category = await getCategoryBySlug(categorySlug)
  if (!category){
    notFound()
  }

  const models = await getModels({sort, categorySlug, search, page, modelsPerPage:MODELS_PER_PAGE})
  const modelCount = await getModelCount({search, categorySlug})

  const totalPages = Math.max(1, Math.ceil(modelCount/MODELS_PER_PAGE))

  if (page < 1 || page > totalPages || sort === null ){
    redirect(`/3d-models/categories/${categorySlug}`)
  }

  return (
    <ModelsBrowser 
      models={models} 
      categoryName={category.name} 
      search={search}
      totalPages={totalPages}
      currentPage={page}
    />
  )
}