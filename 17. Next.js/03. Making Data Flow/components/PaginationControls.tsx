import PaginationButton from '@/components/PaginationButton'

export default function PaginationControls({totalPages, currentPage}:{
  totalPages:number,
  currentPage:number
}){
  //[1, 2, 3, 4, 5]
  const pagesArray = Array.from({length:totalPages}, (_,i) => i + 1)
  return (
    <div className="flex justify-center gap-1">  
      {currentPage !== 1 && (<PaginationButton label="<<" page={1}/>)}
      {currentPage !== 1 && (<PaginationButton page={currentPage-1}/>)}
      <PaginationButton page={currentPage} isActive={true}/>
      {currentPage !== totalPages && (<PaginationButton page={currentPage+1}/>)}
      {currentPage !== totalPages && (<PaginationButton page={totalPages} label=">>"/>)}
    </div>
  )
}