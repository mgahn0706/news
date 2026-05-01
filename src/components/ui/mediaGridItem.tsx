import { useState } from 'react'

type MediaGridItemProps = {
  id: string
  title: string
  image: string
}

export function MediaGridItem({ id, title, image }: MediaGridItemProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <article
      id={id}
      className="flex h-[154px] items-center justify-center bg-white p-4 transition-colors hover:bg-[#F5F7F9]"
    >
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
    </article>
  )
}
