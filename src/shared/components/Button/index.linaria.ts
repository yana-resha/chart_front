import { styled } from '@linaria/react'

import { BTN_BACKGROUND_VARIABLES, BUTTON_COLOR_VARIABLES } from '@/shared/assets/styles/colors'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { TEXT_SIZE } from '@/shared/assets/styles/text-size'
import { addAlpha } from '@/shared/helpers/addAlpha'

export const ChildrenContainer = styled.div`
  font-weight: 500;
`

export const Loader = styled.div`
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;

  & svg {
    width: 100%;
    height: 100%;
    color: white;
  }
`

export const ButtonComponent = styled.button`
  all: unset; /* убивает нативные стили кнопки/ссылки */
  position: relative;
  cursor: pointer;
  color: ${BUTTON_COLOR_VARIABLES.DARK_COLOR};
  border-radius: ${(props) => (props.roundedCorner ? '16' : '4')}px;
  padding: 0.85rem 1.2rem 0.85rem 1.2rem;
  text-align: center;
  font-size: ${TEXT_SIZE.M};
  line-height: 1.1;
  letter-spacing: 0.15px;
  text-align: center;
  outline: none;
  border: 0px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  corner-shape: squircle;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${TEXT_SIZE.S};
    padding: 0.65rem 1rem 0.65rem 1rem;
  }

  &:disabled,
  &.isLoading {
    pointer-events: none;
    opacity: 0.5;
  }

  &.gradient {
    overflow: hidden;

    &.primary {
      background: ${BTN_BACKGROUND_VARIABLES.PRIMARY_GRADIENT_BUTTON};
      box-shadow: 0 0 5px 5px rgba(22, 238, 246, 0);
    }

    &:hover,
    &:focus-within {
      box-shadow: 0 0 5px 5px rgba(22, 238, 246, 0.15);
    }

    &:active {
      box-shadow: 0 0 5px 5px rgba(22, 238, 246, 0.08);
    }

    &.isLoading ${Loader} svg {
      color: ${BUTTON_COLOR_VARIABLES.DARK_COLOR};
    }
  }

  &.ghost {
    border: 1px solid transparent;

    &.primary {
      color: ${BUTTON_COLOR_VARIABLES.LIGHT_COLOR};
      background: ${addAlpha(BTN_BACKGROUND_VARIABLES.NORM_PRIMARY, 0.2)};

      &:hover,
      &:focus-within {
        background: ${addAlpha(BTN_BACKGROUND_VARIABLES.NORM_PRIMARY, 0.3)};
      }

      &:active {
        background: ${addAlpha(BTN_BACKGROUND_VARIABLES.NORM_PRIMARY, 0.25)};
      }

      &.isLoading ${Loader} svg {
        color: ${BUTTON_COLOR_VARIABLES.LIGHT_COLOR};
      }
    }

    &.secondary {
      color: ${BUTTON_COLOR_VARIABLES.LIGHT_COLOR};
      background: rgba(255, 255, 255, 0.1);

      &:hover,
      &:focus-within {
        background: rgba(255, 255, 255, 0.2);
      }

      &:active {
        background: rgba(255, 255, 255, 0.15);
      }

      &.isLoading ${Loader} svg {
        color: ${BUTTON_COLOR_VARIABLES.LIGHT_COLOR};
      }
    }
  }

  &.outline {
    background: transparent;
    border-style: solid;
    border-width: 1px;

    &.primary {
      border-color: ${BTN_BACKGROUND_VARIABLES.BRIGHT_PRIMARY};
      color: ${BTN_BACKGROUND_VARIABLES.BRIGHT_PRIMARY};
      box-shadow: 0 0 5px 5px rgba(22, 238, 246, 0);

      &:hover,
      &:focus-within {
        box-shadow: 0 0 5px 5px rgba(22, 238, 246, 0.1);
      }

      &:active {
        box-shadow: 0 0 5px 5px rgba(22, 238, 246, 0.05);
        filter: brightness(1.2);
      }

      &.isLoading ${Loader} svg {
        color: ${BTN_BACKGROUND_VARIABLES.BRIGHT_PRIMARY};
      }
    }

    &.secondary {
      border-color: rgb(255, 255, 255, 0.8);
      color: rgb(255, 255, 255, 0.8);
      box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0);

      &:hover,
      &:focus-within {
        box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.07);
      }

      &:active {
        box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.05);
        filter: brightness(1.2);
      }

      &.isLoading ${Loader} svg {
        color: rgb(255, 255, 255, 0.8);
      }
    }
  }

  &.small {
    font-size: clamp(12px, 0.75rem, 16px);
    padding: 0.5rem 0.7rem 0.5rem 0.7rem;

    @media (max-width: ${MEDIA_POINTS.TABLET}px) {
      padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    }
  }

  &.large {
    font-size: ${TEXT_SIZE.L};
    padding: 0.85rem 1.625rem 0.85rem 1.625rem;

    & ${ChildrenContainer} {
      /* font-weight: 400; */
    }

    @media (max-width: ${MEDIA_POINTS.TABLET}px) {
      font-size: ${TEXT_SIZE.M};
      padding: 0.75rem 1.3rem 0.75rem 1.3rem;
    }
  }

  &.text {
    padding: 0;
    transition: all 0.2s;

    &.primary {
      color: ${BTN_BACKGROUND_VARIABLES.BRIGHT_PRIMARY};
      background: linear-gradient(
        45deg,
        ${BTN_BACKGROUND_VARIABLES.NORM_PRIMARY},
        ${BTN_BACKGROUND_VARIABLES.BRIGHT_PRIMARY}
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    &.secondary {
      color: rgba(255, 255, 255, 1);
      background: linear-gradient(45deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    &:hover,
    &:focus-within {
      filter: brightness(0.7);
    }

    &:active {
      filter: brightness(0.95);
    }
  }

  &.isLoading ${ChildrenContainer} {
    opacity: 0;
  }
`
