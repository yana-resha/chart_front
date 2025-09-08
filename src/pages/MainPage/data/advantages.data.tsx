import { ReactNode } from 'react'

export const AdvantagesListData: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: 'Интерактивная карта',
    text: 'Наводите на планеты и дома, смотрите подсказки и связи.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="8"
        />
        <circle
          cx="12"
          cy="12"
          r="2"
        />
        <line
          x1="12"
          y1="4"
          x2="12"
          y2="20"
        />
        <line
          x1="4"
          y1="12"
          x2="20"
          y2="12"
        />
      </svg>
    ),
  },
  {
    title: 'Бесплатные настройки и интерпретации',
    text: 'Никаких скрытых ограничений — результат видно сразу.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="3"
        />
        <path d="M19 12a7 7 0 0 0-.2-1.6l2.1-1.6-2-3.5-2.5 1A7 7 0 0 0 14 4l-.5-2h-3L10 4a7 7 0 0 0-2.4 1.3l-2.5-1-2 3.5 2.1 1.6A7 7 0 0 0 5 12c0 .55.07 1.08.2 1.6l-2.1 1.6 2 3.5 2.5-1A7 7 0 0 0 10 20l.5 2h3l.5-2a7 7 0 0 0 2.4-1.3l2.5 1 2-3.5-2.1-1.6c.13-.52.2-1.05.2-1.6Z" />
      </svg>
    ),
  },
  {
    title: 'Неограниченные расчёты',
    text: 'Стройте сколько угодно карт — для себя, друзей или примеров.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M7 12c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5Z" />
        <path d="M4 12h16" />
      </svg>
    ),
  },
  {
    title: 'Современный интерфейс',
    text: 'Минимализм, тёмная тема и плавные анимации.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="12"
          rx="2"
        />
        <path d="M8 19h8" />
      </svg>
    ),
  },
]
