import { useState } from 'react'

import { Header } from './components/Header'
import { MediaGrid } from './components/newsStand/MediaGrid'
import { TabPanel } from './components/newsStand/TabPanel'
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
  const [currentTab, setCurrentTab] = useState<CurrentTab>(DEFAULT_TAB)
  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE)
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

  function renderGrid() {
    return (
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
    )
  }

  return (
    <main
      className="min-h-screen bg-[#FEFEFE] pb-16 text-[#14212B]"
      aria-label="News stand application"
    >
      <Header />
      <TabPanel
        currentTab={currentTab}
        onTabChange={(value) => {
          setCurrentTab(value)
          setPagination(0)
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        subscribedCount={user.subscribingMediaList.length}
      >
        {{
          all: viewMode === 'GRID' ? renderGrid() : null,
          subscribing: viewMode === 'GRID' ? renderGrid() : null,
        }}
      </TabPanel>
    </main>
  )
}

export default App
