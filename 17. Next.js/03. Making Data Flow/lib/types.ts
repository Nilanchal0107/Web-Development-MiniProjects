export type Model = {
  id: number,
  name: string,
  description: string,
  likes: number,
  image: string,
  category: string,
  dateAdded: string
}

export type Category = {
  name: string,
  slug: string
}