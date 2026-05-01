import { useState } from 'react'

import { Header } from './components/Header'
import { MediaGrid } from './components/ui/mediaGrid'
import { mediaDummyList } from './fixtures/mediaDummyList'

const MEDIA_PER_PAGE = 24

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(mediaDummyList.length / MEDIA_PER_PAGE)
  const pageStart = currentPage * MEDIA_PER_PAGE
  const pageItems = mediaDummyList.slice(pageStart, pageStart + MEDIA_PER_PAGE)

  return (
    <main
      className="min-h-screen bg-[#FEFEFE] pb-16 text-[#14212B]"
      aria-label="News stand application"
    >
      <Header />
      <MediaGrid
        items={pageItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={() => setCurrentPage((page) => Math.max(page - 1, 0))}
        onNextPage={() =>
          setCurrentPage((page) => Math.min(page + 1, totalPages - 1))
        }
      />
    </main>
  )
}

export default App
