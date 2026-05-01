import type { ReactNode } from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui/Tabs'
import { Badge } from '../ui/Badge'
import { NewsStandContent } from './Layout'

type CurrentTab = 'ALL' | 'SUBSCRIBING'
type ViewMode = 'LIST' | 'GRID'

type TabPanelProps = {
  currentTab: CurrentTab
  onTabChange: (value: CurrentTab) => void
  viewMode: ViewMode
  onViewModeChange: (value: ViewMode) => void
  subscribedCount: number
  children: {
    all: ReactNode
    subscribing: ReactNode
  }
}

function ListViewIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={active ? 'text-[#14212B]' : 'text-[#879298]'}
    >
      <path
        d="M6 7H18M6 12H18M6 17H18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function GridViewIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={active ? 'text-[#14212B]' : 'text-[#879298]'}
    >
      <path
        d="M6.5 6.5H10.5V10.5H6.5V6.5ZM13.5 6.5H17.5V10.5H13.5V6.5ZM6.5 13.5H10.5V17.5H6.5V13.5ZM13.5 13.5H17.5V17.5H13.5V13.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

export function TabPanel({
  currentTab,
  onTabChange,
  viewMode,
  onViewModeChange,
  subscribedCount,
  children,
}: TabPanelProps) {
  return (
    <Tabs
      value={currentTab}
      onValueChange={(value) => onTabChange(value as CurrentTab)}
      className="pt-8"
    >
      <NewsStandContent className="flex h-6 items-center justify-between">
        <TabsList className="inline-flex items-center gap-6 rounded-none border-0 bg-transparent p-0">
          <TabsTrigger
            value="ALL"
            className="h-6 rounded-none bg-transparent px-0 text-base tracking-[-0.01em] data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-[#14212B] data-[state=inactive]:font-medium data-[state=inactive]:text-[#879298]"
          >
            전체 언론사
          </TabsTrigger>
          <TabsTrigger
            value="SUBSCRIBING"
            className="h-6 rounded-none bg-transparent px-0 text-base tracking-[-0.01em] data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-[#14212B] data-[state=inactive]:font-medium data-[state=inactive]:text-[#879298]"
          >
            <span className="inline-flex items-center gap-2">
              <span>내가 구독한 언론사</span>
              <Badge className="h-5 bg-[#7890E7] text-[rgba(255,255,255,0.7)]">
                {subscribedCount}
              </Badge>
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            aria-label="List view"
            onClick={() => onViewModeChange('LIST')}
            className="inline-flex h-6 w-6 cursor-pointer items-center justify-center"
          >
            <ListViewIcon active={viewMode === 'LIST'} />
          </button>
          <button
            type="button"
            aria-label="Grid view"
            onClick={() => onViewModeChange('GRID')}
            className="inline-flex h-6 w-6 cursor-pointer items-center justify-center"
          >
            <GridViewIcon active={viewMode === 'GRID'} />
          </button>
        </div>
      </NewsStandContent>

      <TabsContent value="ALL">{children.all}</TabsContent>
      <TabsContent value="SUBSCRIBING">{children.subscribing}</TabsContent>
    </Tabs>
  )
}
