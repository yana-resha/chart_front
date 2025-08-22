import { styled } from '@linaria/react'

import { BTN_BACKGROUND_VARIABLES, BUTTON_COLOR_VARIABLES } from '@/shared/assets/styles/colors'

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
  position: relative;
  cursor: pointer;
  color: ${BUTTON_COLOR_VARIABLES.DARK_COLOR};
  font-weight: 500 !important;
  border-radius: ${(props) => (props.roundedCorner ? '12' : '4')}px;
  padding: 0.875rem 1.5rem 0.875rem 1.5rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1;
  letter-spacing: 0.15px;
  text-align: center;
  outline: none;
  border: 0px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:disabled,
  &.isLoading {
    pointer-events: none;
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

    &:disabled {
      color: rgba(255, 255, 255, 1);
      background: ${BTN_BACKGROUND_VARIABLES.PRIMARY_GRADIENT_DISABLED_BUTTON};
      box-shadow:
        inset 0px 8px 12px 0px rgba(255, 255, 255, 0.08),
        0px 24px 24px -16px rgba(0, 0, 0, 0.12),
        inset 16px 24px 64px -24px rgba(255, 255, 255, 0.08);
    }

    &.isLoading ${Loader} svg {
      color: ${BUTTON_COLOR_VARIABLES.DARK_COLOR};
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

    &:disabled {
      opacity: 0.5;
    }
  }

  &.small {
    font-size: clamp(12px, 0.75rem, 16px);
    padding: 0.564rem 0.75rem 0.564rem 0.75rem;
  }

  &.large {
    font-size: 1.125rem;
    padding: 0.75rem 1.625rem 0.75rem 1.625rem;
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

    &:disabled {
      filter: grayscale(100%);
    }
  }

  &.isLoading ${ChildrenContainer} {
    opacity: 0;
  }
`
