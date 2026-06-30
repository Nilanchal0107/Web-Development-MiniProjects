import {getDBConnection} from '@/lib/db'
import models from '@/lib/data/models'

async function seedModels(){
  const db = await getDBConnection()

  //Create the models table
  await db.exec(`  
    CREATE TABLE IF NOT EXISTS models (  
      id INTEGER PRIMARY KEY,  
      name TEXT NOT NULL,  
      description TEXT NOT NULL,  
      likes INTEGER NOT NULL DEFAULT 0,  
      image TEXT NOT NULL,  
      category TEXT NOT NULL,  
      dateAdded TEXT NOT NULL  
    );  
  `)

  //Prepare INSERT query
  const insertModel = await db.prepare(`  
    INSERT OR REPLACE INTO models (  
      id,  
      name,  
      description,  
      likes,  
      image,  
      category,  
      dateAdded  
    ) VALUES (?, ?, ?, ?, ?, ?, ?)  
  `)

  //loop through models and run the INSERT query for each one
  for (const model of models) {  
    await insertModel.run(  
      model.id,  
      model.name,  
      model.description,  
      model.likes,  
      model.image,  
      model.category,  
      model.dateAdded  
    )  
  }

  await insertModel.finalize()  
  await db.close()

  console.log("Models table seeded")

}

seedModels().catch((error) => {
	console.error("Seeding failed:", error)
})