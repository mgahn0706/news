import { useState } from 'react'

import { Header } from './components/Header'
import { MediaGrid } from './components/newsStand/MediaGrid'
import { mediaDummyList } from './fixtures/mediaDummyList'
import { useSubscription } from './hooks/useSubscription'

const MEDIA_PER_PAGE = 24
const DEFAULT_TAB = 'ALL' as const
const DEFAULT_VIEW_MODE = 'GRID' as const

type CurrentTab = 'ALL' | 'SUBSCRIBING'
type ViewMode = 'LIST' | 'GRID'

function clampPagination(page: number, totalPages: number) {
  return Math.min(Math.max(page, 0), Math.max(totalPages - 1, 0))
}

function App() {
  const { isSubscribed, toggleSubscription, user } = useSubscription()
  const [currentTab] = useState<CurrentTab>(DEFAULT_TAB)
  const [viewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE)
  const [pagination, setPagination] = useState(0)
  const visibleMedia =
    currentTab === 'SUBSCRIBING'
      ? mediaDummyList.filter((media) =>
          user.subscribingMediaList.includes(media.id),
        )
      : mediaDummyList
  const totalPages = Math.ceil(visibleMedia.length / MEDIA_PER_PAGE)
  const pageStart = pagination * MEDIA_PER_PAGE
  const pageItems = visibleMedia.slice(pageStart, pageStart + MEDIA_PER_PAGE)

  return (
    <main
      className="min-h-screen bg-[#FEFEFE] pb-16 text-[#14212B]"
      aria-label="News stand application"
    >
      <Header />
      {currentTab === 'ALL' && viewMode === 'GRID' ? (
        <MediaGrid
          items={pageItems}
          currentPage={pagination}
          totalPages={totalPages}
          isSubscribed={isSubscribed}
          onToggleSubscription={toggleSubscription}
          onPreviousPage={() =>
            setPagination((page) => clampPagination(page - 1, totalPages))
          }
          onNextPage={() =>
            setPagination((page) => clampPagination(page + 1, totalPages))
          }
        />
      ) : null}
    </main>
  )
}

export default App
