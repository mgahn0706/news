import type { Media } from '../../type/types'
import { MediaGridItem } from './MediaGridItem'

type MediaGridProps = {
  items: Media[]
  currentPage: number
  totalPages: number
  onPreviousPage: () => void
  onNextPage: () => void
}

const GRID_CAPACITY = 24

function EmptyMediaGridItem() {
  return (
    <div
      aria-hidden="true"
      className="aspect-video bg-white p-4"
    >
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-[122px] flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-full bg-[#F5F7F9]" />
          <div className="flex w-full flex-col items-center gap-1.5">
            <div className="h-3 w-20 rounded-full bg-[#F5F7F9]" />
            <div className="h-3 w-14 rounded-full bg-[#F5F7F9]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function PaginationChevron({
  direction,
  onClick,
  disabled,
}: {
  direction: 'left' | 'right'
  onClick: () => void
  disabled: boolean
}) {
  const isLeft = direction === 'left'

  return (
    <button
      type="button"
      aria-label={isLeft ? 'Previous media page' : 'Next media page'}
      onClick={onClick}
      disabled={disabled}
      className="hidden w-12 shrink-0 self-stretch place-content-center place-items-center bg-transparent text-[#879298] transition hover:bg-[#F5F7F9] hover:text-[#14212B] disabled:cursor-default disabled:opacity-0 lg:grid"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-10 w-10"
      >
        <path
          d={isLeft ? 'M14 7L9 12L14 17' : 'M10 7L15 12L10 17'}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export function MediaGrid({
  items,
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}: MediaGridProps) {
  const showPagination = totalPages > 1
  const emptyCells = Math.max(GRID_CAPACITY - items.length, 0)

  return (
    <section
      aria-label="Media grid"
      className="mx-auto mt-12 flex w-[min(1034px,calc(100vw-48px))] items-stretch gap-8 md:mt-8 md:w-[calc(100vw-32px)] lg:gap-[32px]"
    >
      <PaginationChevron
        direction="left"
        onClick={onPreviousPage}
        disabled={currentPage === 0}
      />

      <div className="min-w-0 flex-1">
        <div className="overflow-hidden rounded-none border border-[#D2DAE0] bg-[#D2DAE0]">
          <div className="grid grid-cols-2 gap-px bg-[#D2DAE0] sm:grid-cols-3 lg:grid-cols-6">
            {items.map((media) => (
              <MediaGridItem
                key={media.id}
                id={media.id}
                title={media.title}
                image={media.image}
              />
            ))}
            {Array.from({ length: emptyCells }, (_, index) => (
              <EmptyMediaGridItem key={`empty-cell-${index}`} />
            ))}
          </div>
        </div>

        {showPagination ? (
          <div className="mt-4 flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={onPreviousPage}
              disabled={currentPage === 0}
              className="inline-flex h-10 items-center justify-center rounded-full border border-[#D2DAE0] px-4 text-sm font-medium text-[#14212B] disabled:opacity-40"
            >
              이전
            </button>
            <p className="text-xs font-medium tracking-[0.08em] text-[#5F6E76]">
              {currentPage + 1} / {totalPages}
            </p>
            <button
              type="button"
              onClick={onNextPage}
              disabled={currentPage === totalPages - 1}
              className="inline-flex h-10 items-center justify-center rounded-full border border-[#D2DAE0] px-4 text-sm font-medium text-[#14212B] disabled:opacity-40"
            >
              다음
            </button>
          </div>
        ) : null}
      </div>

      <PaginationChevron
        direction="right"
        onClick={onNextPage}
        disabled={currentPage === totalPages - 1}
      />
    </section>
  )
}
