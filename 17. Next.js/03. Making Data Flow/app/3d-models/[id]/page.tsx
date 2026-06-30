import Image from 'next/image'
import {getModelById} from '@/lib/models'
import {notFound} from 'next/navigation'

export default async function ModelPage({params}:{
  params:Promise<{id:string}>
}){

  const {id} = await params
  const model = await getModelById(id)

  if (!model){
    notFound()
  }

  return (
    <div className="container max-w-6xl px-4 py-8 mx-auto">
      <article className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <figure className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
          <Image
            width={500}
            height={500}
            src={model.image}
            alt={model.name}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </figure>

        <section className="flex flex-col justify-center h-full">
          <div
            className="flex items-center mb-2 text-2xl text-gray-600"
            role="status"
            aria-label="Likes count"
          >
            <span className="font-light" aria-label="model likes">&hearts; {model.likes}</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold">{model.name}</h1>
          <span
            className="inline-block bg-transparent border border-gray-400 rounded-full px-3 py-1 text-sm text-gray-800 mb-6 w-fit"
            role="status"
            aria-label="Category"
          >
            {model.category}
          </span>

          <div className="mb-6 prose prose-lg max-w-none">
            <p className="leading-relaxed text-gray-700">
              {model.description}
            </p>
          </div>

          <footer className="text-sm text-gray-500">
            <time dateTime={model.dateAdded}>
              Added on {new Date(model.dateAdded).toLocaleDateString()}
            </time>
          </footer>
        </section>
      </article>
    </div>
  )
}