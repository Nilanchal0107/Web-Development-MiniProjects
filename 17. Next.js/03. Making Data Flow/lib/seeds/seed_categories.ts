import { getDBConnection } from "@/lib/db"
import categories from "@/lib/data/categories"

async function seedCategories() {
  const db = await getDBConnection()

  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );
  `)

  const insertModel = await db.prepare(`
    INSERT OR REPLACE INTO categories (
      slug,
      name
    ) VALUES (?, ?)
  `)

  for (const category of categories) {
    await insertModel.run(
      category.slug,
      category.name
    )
  }

  await insertModel.finalize()
  await db.close()

  console.log("Categories table seeded")
}

seedCategories().catch((error) => {
  console.error("Seeding failed:", error)
})