import Link from 'next/link'
import Image from 'next/image'
import type {Model} from '@/lib/types'


export default function ModelCard({model}:{model:Model}){
  return (
    <Link
      href={`/3d-models/${model.id}`}
      className="block group hover:shadow-[0_5px_12px_rgba(0,0,0,0.1)] hover:-translate-y-[3px] transition-all"
    >
      <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
            role="article">
        <div className="relative aspect-square">
          <Image
            width={500}
            height={500}
            src={model.image}
            alt={model.name}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="p-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 leading-tight">
              {model.name}
            </h2>
          </div>
          <p className="text-gray-800 text-sm line-clamp-2 min-h-[2.5rem] leading-[1.25rem]">
            {model.description}
          </p>
          <div className="mt-2">
            <span
              className="inline-block bg-transparent border border-gray-400 rounded-full px-3 py-1 text-sm text-gray-800">
                {model.category}
            </span>
          </div>
          <div className="flex items-center mt-2 text-gray-600">
            <span>&hearts; {model.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}