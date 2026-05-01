function formatToday(date: Date) {
  const weekdays = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ]
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const weekday = weekdays[date.getDay()]

  return `${year}. ${month}. ${day}. ${weekday}`
}

export function Header() {
  return (
    <header className="newsstand-header">
      <div className="newsstand-header__inner">
        <div className="newsstand-header__brand" aria-label="News stand">
          <svg
            className="newsstand-header__icon"
            viewBox="0 0 24 24"
            fill="none"
            role="img"
            aria-hidden="true"
          >
            <path
              d="M4.5 5.5H12.5C14.433 5.5 16 7.067 16 9V18.5H8C6.067 18.5 4.5 16.933 4.5 15V5.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M19.5 5.5H12.5C10.567 5.5 9 7.067 9 9V18.5H16C17.933 18.5 19.5 16.933 19.5 15V5.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path d="M7 9H10.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M7 12H10.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M14 9H17" stroke="currentColor" strokeWidth="1.4" />
            <path d="M14 12H17" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <h1 className="newsstand-header__title">뉴스스탠드</h1>
        </div>
        <p className="newsstand-header__date">{formatToday(new Date())}</p>
      </div>
    </header>
  )
}
