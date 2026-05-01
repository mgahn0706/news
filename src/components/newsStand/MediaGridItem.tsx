import { useState } from 'react'

import { SubscriptionButton } from './SubscriptionButton'

type MediaGridItemProps = {
  id: string
  title: string
  image: string
  subscribed: boolean
  onToggleSubscription: (mediaId: string) => void
}

export function MediaGridItem({
  id,
  title,
  image,
  subscribed,
  onToggleSubscription,
}: MediaGridItemProps) {
  const [imageError, setImageError] = useState(false)
  const baseBackground = subscribed
    ? 'bg-gradient-to-br from-white via-[#FCFCFF] to-[#F3F6FF]'
    : 'bg-white'

  return (
    <article
      id={id}
      className={`group relative aspect-video p-4 transition-colors hover:bg-[#F5F7F9] ${baseBackground}`}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4 transition-opacity group-hover:opacity-0">
        <div className="flex w-full max-w-[122px] flex-col items-center gap-3">
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#D2DAE0] bg-[#F5F7F9]">
            {!imageError ? (
              <img
                src={image}
                alt={`${title} logo`}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="px-2 text-center text-[11px] font-semibold leading-tight tracking-[-0.01em] text-[#14212B]">
                {title}
              </span>
            )}
          </div>
          <div className="text-center">
            <p className="line-clamp-2 break-keep text-sm leading-[1.15] font-medium tracking-[-0.01em] text-[#14212B]">
              {title}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <div className="pointer-events-none group-hover:pointer-events-auto">
          <SubscriptionButton
            subscribed={subscribed}
            onClick={() => onToggleSubscription(id)}
          />
        </div>
      </div>
    </article>
  )
}
