import { useState } from 'react'

import type { Media } from '../../type/types'

type MediaGridProps = {
  items: Media[]
  currentPage: number
  totalPages: number
  onPreviousPage: () => void
  onNextPage: () => void
}

const GRID_CAPACITY = 24

function MediaCard({ media }: { media: Media }) {
  const [imageError, setImageError] = useState(false)

  return (
    <article className="flex h-[154px] items-center justify-center bg-white p-4">
      <div className="flex w-full max-w-[122px] flex-col items-center gap-3">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#D2DAE0] bg-[#F5F7F9]">
          {!imageError ? (
            <img
              src={media.image}
              alt={`${media.title} logo`}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="px-2 text-center text-[11px] font-semibold leading-tight tracking-[-0.01em] text-[#14212B]">
              {media.title}
            </span>
          )}
        </div>
        <div className="text-center">
          <p className="line-clamp-2 break-keep text-sm leading-[1.15] font-medium tracking-[-0.01em] text-[#14212B]">
            {media.title}
          </p>
        </div>
      </div>
    </article>
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
      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D2DAE0] bg-white text-[#879298] transition hover:border-[#14212B] hover:text-[#14212B] disabled:cursor-default disabled:opacity-0 lg:inline-flex"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          d={isLeft ? 'M14.5 6.5L9 12L14.5 17.5' : 'M9.5 6.5L15 12L9.5 17.5'}
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
      className="mx-auto mt-12 flex w-[min(1034px,calc(100vw-48px))] items-center gap-8 md:mt-8 md:w-[calc(100vw-32px)] lg:gap-[32px]"
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
              <MediaCard key={media.id} media={media} />
            ))}
            {Array.from({ length: emptyCells }, (_, index) => (
              <div
                key={`empty-cell-${index}`}
                aria-hidden="true"
                className="h-[154px] bg-white"
              />
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
