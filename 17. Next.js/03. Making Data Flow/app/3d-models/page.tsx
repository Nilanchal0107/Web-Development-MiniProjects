import ModelsBrowser from '@/components/ModelsBrowser'
import {getQueryParams} from '@/lib/utils'
import {MODELS_PER_PAGE} from '@/lib/constants'
import {redirect} from 'next/navigation'

import {getModels, getModelCount} from '@/lib/models'

export default async function ModelsPage({searchParams}:{
  searchParams:Promise<{
    search?:string,
    sort?:string,
    page?:string
  }>
}){

  const {search, sort, page} = getQueryParams(await searchParams)

  const models = await getModels({search, sort, page, modelsPerPage:MODELS_PER_PAGE})

  const modelCount = await getModelCount({search})
  const totalPages = Math.max(1, Math.ceil(modelCount / MODELS_PER_PAGE))

  if (page < 1 || page > totalPages || sort === null ){
      redirect('/3d-models')
  }

  return (
    <ModelsBrowser 
      search={search}
      models={models} 
      totalPages={totalPages}
      currentPage={page}
    />
  )
}
