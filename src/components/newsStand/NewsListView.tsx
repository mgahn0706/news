import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { NewsStandContent } from './Layout'

const CATEGORY_TABS = [
  { value: 'general-economy', label: '종합/경제' },
  { value: 'broadcast-telecom', label: '방송/통신' },
  { value: 'it', label: 'IT' },
  { value: 'sports-entertainment', label: '스포츠/연예' },
  { value: 'magazine-specialty', label: '매거진/전문지' },
  { value: 'local', label: '지역' },
] as const

export function NewsListView() {
  const [currentCategory, setCurrentCategory] = useState(
    CATEGORY_TABS[0].value,
  )

  return (
    <Tabs
      value={currentCategory}
      onValueChange={setCurrentCategory}
      className="mt-4"
    >
      <NewsStandContent>
        <div className="overflow-hidden border border-[#D2DAE0] bg-white">
          <TabsList className="grid h-10 w-full grid-cols-6 rounded-none border-0 bg-[#F5F7F9] p-0">
            {CATEGORY_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-10 rounded-none border-r border-[#D2DAE0] bg-transparent px-4 text-sm font-medium tracking-[-0.01em] last:border-r-0 data-[state=active]:bg-[#7890E7] data-[state=active]:font-bold data-[state=active]:text-white data-[state=inactive]:text-[#5F6E76]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORY_TABS.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="min-h-[388px] border-t border-[#D2DAE0] bg-white px-8 py-6"
            >
              <div className="flex h-full flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="h-5 w-40 bg-[#F5F7F9]" />
                  <div className="h-4 w-20 bg-[#F5F7F9]" />
                </div>
                <div className="grid gap-4">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div
                      key={`${tab.value}-row-${index}`}
                      className="flex items-start gap-4 border-b border-[#F5F7F9] pb-4 last:border-b-0"
                    >
                      <div className="mt-1 h-2 w-2 shrink-0 bg-[#14212B]" />
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="h-4 w-full max-w-[560px] bg-[#F5F7F9]" />
                        <div className="h-3 w-32 bg-[#F5F7F9]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </NewsStandContent>
    </Tabs>
  )
}
