import { styled } from '@linaria/react'

const BORDER = 'rgba(255,255,255,0.16)'
const TEXT = 'rgba(255,255,255,0.72)'
const TEXT_MUTED = 'rgba(255,255,255,0.56)'
const BG_HOVER = 'rgba(255,255,255,0.06)'
const ACCENT_BORDER = 'rgba(110,160,255,0.5)'
const ACCENT_BG = 'rgba(110,160,255,0.12)'
const ACCENT_TEXT = '#cfe1ff'

/** База — применяем к span/a/button через `as` */
export const TagBase = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid ${BORDER};
  color: ${TEXT};
  user-select: none;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  /* размеры */
  &[data-size='sm'] {
    padding: 2px 8px;
    font-size: 0.6875rem;
    line-height: 1rem;
  }
  &[data-size='md'] {
    padding: 4px 12px;
    font-size: 0.8125rem;
    line-height: 1.25rem;
  }

  /* варианты */
  &[data-variant='muted'] {
    color: ${TEXT_MUTED};
  }
  &[data-variant='accent'] {
    border-color: ${ACCENT_BORDER};
    color: ${ACCENT_TEXT};
    background: ${ACCENT_BG};
  }

  /* выбранное состояние */
  &[data-selected='true'] {
    background: ${BG_HOVER};
  }

  /* кликабельность */
  &[data-clickable='true'] {
    cursor: pointer;
  }
  &[data-clickable='true']:hover {
    background: ${BG_HOVER};
  }
  &[data-clickable='true']:focus-visible {
    outline: 2px solid ${ACCENT_BORDER};
    outline-offset: 2px;
  }
`
