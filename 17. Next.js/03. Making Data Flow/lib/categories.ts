import {getDBConnection} from '@/lib/db'

export async function getCategories(){
  const db = await getDBConnection()

  try {
    return await db.all("SELECT * FROM categories")
  } finally {
    await db.close()
  }
}

export async function getCategoryBySlug(categorySlug:string){
  const db = await getDBConnection()
  try {
    return await db.get("SELECT * FROM categories WHERE slug=?", [categorySlug])
  } finally {
    await db.close()
  }
}