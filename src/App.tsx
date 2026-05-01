import { useState } from 'react'

import { Header } from './components/Header'
import { HeadlineBar } from './components/newsStand/HeadlineBar'
import { MediaGrid } from './components/newsStand/MediaGrid'
import { NewsListView } from './components/newsStand/NewsListView'
import { TabPanel } from './components/newsStand/TabPanel'
import { mediaDummyList } from './fixtures/mediaDummyList'
import { useSubscription } from './hooks/useSubscription'
import { useTimer } from './hooks/useTimer'

const MEDIA_PER_PAGE = 24
const DEFAULT_TAB = 'ALL' as const
const DEFAULT_VIEW_MODE = 'GRID' as const
const LEFT_HEADLINE_CATEGORIES = ['ECONOMY', 'IT', 'LOCAL'] as const
const RIGHT_HEADLINE_CATEGORIES = [
  'BROADCAST',
  'SPORTS',
  'MAGAZINE',
] as const

type CurrentTab = 'ALL' | 'SUBSCRIBING'
type ViewMode = 'LIST' | 'GRID'

function clampPagination(page: number, totalPages: number) {
  return Math.min(Math.max(page, 0), Math.max(totalPages - 1, 0))
}

function getHeadlineContent(mediaTitle: string, newsTitle: string) {
  const prefix = `${mediaTitle} | `

  if (newsTitle.startsWith(prefix)) {
    return newsTitle.slice(prefix.length)
  }

  return newsTitle
}

function buildHeadlineItems(
  mediaList: typeof mediaDummyList,
  categories: readonly string[],
) {
  return mediaList
    .filter((media) => categories.includes(media.category))
    .flatMap((media) =>
      media.news.map((news) => ({
        mediaId: media.id,
        mediaTitle: media.title,
        newsTitle: getHeadlineContent(media.title, news.title),
      })),
    )
}

function RotatingHeadlineBar({ visibleMedia }: { visibleMedia: typeof mediaDummyList }) {
  const allHeadlineItems = visibleMedia.flatMap((media) =>
    media.news.map((news) => ({
      mediaId: media.id,
      mediaTitle: media.title,
      newsTitle: getHeadlineContent(media.title, news.title),
    })),
  )
  const leftHeadlineItems = buildHeadlineItems(
    visibleMedia,
    LEFT_HEADLINE_CATEGORIES,
  )
  const rightHeadlineItems = buildHeadlineItems(
    visibleMedia,
    RIGHT_HEADLINE_CATEGORIES,
  )
  const [leftHeadlineIndex, setLeftHeadlineIndex] = useState(0)
  const [rightHeadlineIndex, setRightHeadlineIndex] = useState(0)
  const fallbackHeadline = {
    mediaId: mediaDummyList[0]?.id ?? '',
    mediaTitle: mediaDummyList[0]?.title ?? '',
    newsTitle: mediaDummyList[0]?.news[0]?.title ?? '',
  }
  const leftHeadline =
    leftHeadlineItems[leftHeadlineIndex] ??
    allHeadlineItems[0] ??
    fallbackHeadline
  const rightHeadline =
    rightHeadlineItems[rightHeadlineIndex] ??
    allHeadlineItems.find((item) => item.mediaId !== leftHeadline.mediaId) ??
    fallbackHeadline

  useTimer(
    () => {
      setLeftHeadlineIndex((currentIndex) => {
        if (leftHeadlineItems.length <= 1) {
          return 0
        }

        return (currentIndex + 1) % leftHeadlineItems.length
      })

      setRightHeadlineIndex((currentIndex) => {
        if (rightHeadlineItems.length <= 1) {
          return 0
        }

        return (currentIndex + 1) % rightHeadlineItems.length
      })
    },
    {
      delay: 5200,
      enabled: allHeadlineItems.length > 1,
    },
  )

  if (!leftHeadline.mediaTitle || !leftHeadline.newsTitle) {
    return null
  }

  return (
    <HeadlineBar
      leftHeadline={leftHeadline}
      rightHeadline={rightHeadline}
    />
  )
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
  const headlineScopeKey = `${currentTab}:${pagination}:${user.subscribingMediaList.join(',')}`

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

  function renderCurrentView() {
    if (viewMode === 'LIST') {
      return (
        <NewsListView
          items={visibleMedia}
          isSubscribed={isSubscribed}
          onToggleSubscription={toggleSubscription}
        />
      )
    }

    return renderGrid()
  }

  return (
    <main
      className="min-h-screen bg-[#FEFEFE] pb-16 text-[#14212B]"
      aria-label="News stand application"
    >
      <Header />
      <RotatingHeadlineBar
        key={headlineScopeKey}
        visibleMedia={visibleMedia}
      />
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
          all: renderCurrentView(),
          subscribing: renderCurrentView(),
        }}
      </TabPanel>
    </main>
  )
}

export default App
