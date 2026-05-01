import { useState } from 'react'

import { formatKoreanDate } from '../../libs/date'
import { useTimer } from '../../hooks/useTimer'
import type { Media, MediaCategory } from '../../type/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { NewsStandContent } from './Layout'
import { SubscriptionButton } from './SubscriptionButton'

const CATEGORY_TABS = [
  {
    value: 'general-economy',
    label: '종합/경제',
    categories: ['ECONOMY'] as MediaCategory[],
  },
  {
    value: 'broadcast-telecom',
    label: '방송/통신',
    categories: ['BROADCAST'] as MediaCategory[],
  },
  { value: 'it', label: 'IT', categories: ['IT'] as MediaCategory[] },
  {
    value: 'sports-entertainment',
    label: '스포츠/연예',
    categories: ['SPORTS'] as MediaCategory[],
  },
  {
    value: 'magazine-specialty',
    label: '매거진/전문지',
    categories: ['MAGAZINE'] as MediaCategory[],
  },
  {
    value: 'local',
    label: '지역',
    categories: ['LOCAL'] as MediaCategory[],
  },
] as const

type CategoryTabValue = (typeof CATEGORY_TABS)[number]['value']
type CategoryMediaIndexMap = Record<CategoryTabValue, number>

type NewsListViewProps = {
  items: Media[]
  isSubscribed: (mediaId: string) => boolean
  onToggleSubscription: (mediaId: string) => void
}

const AUTO_ADVANCE_DELAY = 6000

function getDisplayNewsTitle(mediaTitle: string, newsTitle: string) {
  const prefix = `${mediaTitle} | `

  if (newsTitle.startsWith(prefix)) {
    return newsTitle.slice(prefix.length)
  }

  return newsTitle
}

function ThumbnailPreview({
  src,
  title,
}: {
  src: string | null
  title: string
}) {
  const [imageError, setImageError] = useState(false)

  if (!src || imageError) {
    return (
      <div className="flex h-[188px] items-center justify-center border border-[#D2DAE0] bg-[linear-gradient(135deg,#EFF1F6,#DDE3EC)] px-6 text-center text-sm font-medium tracking-[-0.01em] text-[#5F6E76]">
        {title}
      </div>
    )
  }

  return (
    <div className="h-[188px] overflow-hidden border border-[#D2DAE0] bg-[#F5F7F9]">
      <img
        src={src}
        alt={title}
        className="h-full w-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  )
}

export function NewsListView({
  items,
  isSubscribed,
  onToggleSubscription,
}: NewsListViewProps) {
  const [currentCategory, setCurrentCategory] = useState<CategoryTabValue>(
    CATEGORY_TABS[0].value,
  )
  const [categoryMediaIndexMap, setCategoryMediaIndexMap] =
    useState<CategoryMediaIndexMap>({
      'general-economy': 0,
      'broadcast-telecom': 0,
      it: 0,
      'sports-entertainment': 0,
      'magazine-specialty': 0,
      local: 0,
    })
  const [isTickerPaused, setIsTickerPaused] = useState(false)

  function getCategoryItems(categories: MediaCategory[]) {
    return items.filter((media) => categories.includes(media.category))
  }

  function getActiveMedia(tabValue: CategoryTabValue, categories: MediaCategory[]) {
    const categoryItems = getCategoryItems(categories)

    if (categoryItems.length === 0) {
      return null
    }

    const currentIndex =
      categoryMediaIndexMap[tabValue] % categoryItems.length

    return categoryItems[currentIndex]
  }

  const activeTabConfig = CATEGORY_TABS.find(
    (tab) => tab.value === currentCategory,
  )
  const activeCategoryItems = activeTabConfig
    ? getCategoryItems(activeTabConfig.categories)
    : []

  useTimer(
    () => {
      if (!activeTabConfig || activeCategoryItems.length <= 1) {
        return
      }

      setCategoryMediaIndexMap((currentMap) => ({
        ...currentMap,
        [activeTabConfig.value]:
          (currentMap[activeTabConfig.value] + 1) % activeCategoryItems.length,
      }))
    },
    {
      delay: AUTO_ADVANCE_DELAY,
      enabled: activeCategoryItems.length > 1 && !isTickerPaused,
    },
  )

  return (
    <Tabs
      value={currentCategory}
      onValueChange={(value) => {
        setCurrentCategory(value as CategoryTabValue)
      }}
      className="mt-4"
    >
      <NewsStandContent>
        <div
          className="overflow-hidden border border-[#D2DAE0] bg-white"
          onMouseEnter={() => setIsTickerPaused(true)}
          onMouseLeave={() => setIsTickerPaused(false)}
          onFocusCapture={() => setIsTickerPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsTickerPaused(false)
            }
          }}
        >
          <TabsList className="flex h-10 w-full rounded-none border-0 bg-[#F5F7F9] p-0">
            {CATEGORY_TABS.map((tab) => {
              const categoryItems = getCategoryItems(tab.categories)
              const activeMedia = getActiveMedia(tab.value, tab.categories)
              const currentIndex = activeMedia
                ? categoryItems.findIndex((media) => media.id === activeMedia.id) + 1
                : 0
              const totalCount = categoryItems.length
              const isActive = currentCategory === tab.value

              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="group relative h-10 flex-1 overflow-hidden rounded-none border-r border-[#D2DAE0] bg-transparent px-3 text-sm font-medium tracking-[-0.01em] last:border-r-0 data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-white data-[state=inactive]:text-[#5F6E76]"
                >
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      key={`${tab.value}-${activeMedia?.id ?? 'empty'}`}
                      data-paused={isTickerPaused ? 'true' : 'false'}
                      className="list-tab-progress absolute inset-y-0 left-0 z-0 bg-[#7890E7]"
                      style={{ animationDuration: `${AUTO_ADVANCE_DELAY}ms` }}
                    />
                  ) : null}
                  <span className="flex w-full items-center justify-between gap-2">
                    <span className="relative z-10 truncate">{tab.label}</span>
                    <span className="relative z-10 hidden font-mono text-xs font-medium tabular-nums text-current/70 group-data-[state=active]:inline-flex">
                      <span className="text-current">{currentIndex}</span>
                      <span> / {totalCount}</span>
                    </span>
                  </span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {CATEGORY_TABS.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="min-h-[388px] border-t border-[#D2DAE0] bg-white px-8 py-6"
            >
              {(() => {
                const activeMedia = getActiveMedia(tab.value, tab.categories)

                if (!activeMedia) {
                  return (
                    <div className="flex min-h-[388px] items-center justify-center text-sm text-[#879298]">
                      표시할 언론사가 없습니다.
                    </div>
                  )
                }

                const featuredNews = activeMedia.news[0]
                const remainingNews = activeMedia.news.slice(1)
                const featuredNewsTitle = featuredNews
                  ? getDisplayNewsTitle(activeMedia.title, featuredNews.title)
                  : activeMedia.title

                return (
                  <div className="flex h-full gap-6">
                    <div className="flex w-[340px] shrink-0 flex-col gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        <h3 className="w-[104px] shrink-0 truncate text-base font-bold tracking-[-0.01em] text-[#14212B]">
                          {activeMedia.title}
                        </h3>
                        <p className="text-xs font-medium tabular-nums text-[#5F6E76]">
                          {formatKoreanDate(new Date())}
                        </p>
                        <SubscriptionButton
                          subscribed={isSubscribed(activeMedia.id)}
                          onClick={() => onToggleSubscription(activeMedia.id)}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <ThumbnailPreview
                          src={featuredNews?.thumbnail ?? null}
                          title={featuredNewsTitle}
                        />
                        <p className="text-base font-bold leading-[1.45] tracking-[-0.01em] text-[#14212B]">
                          {featuredNewsTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col pt-11">
                      <div className="grid gap-4">
                        {remainingNews.map((news) => (
                          <div key={news.id} className="flex items-start gap-4">
                            <div className="mt-1 h-[3px] w-[3px] shrink-0 bg-[#14212B]" />
                            <p className="min-w-0 text-sm leading-[1.5] tracking-[-0.01em] text-[#14212B]">
                              {getDisplayNewsTitle(activeMedia.title, news.title)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </TabsContent>
          ))}
        </div>
      </NewsStandContent>
    </Tabs>
  )
}
