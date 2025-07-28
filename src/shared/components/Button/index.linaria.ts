import { styled } from '@linaria/react'

import LoaderIMG from '@/shared/assets/icons/btn-loader.svg'
import { BTN_BACKGROUND_VARIABLES, BUTTON_COLOR_VARIABLES } from '@/shared/assets/styles/colors'

export const ChildrenContainer = styled.div`
  font-weight: 500;
`

export const Loader = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  background: url('${LoaderIMG}');
  animation: 1s rotate infinite linear;
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const ButtonComponent = styled.button`
  position: relative;
  cursor: pointer;
  color: ${BUTTON_COLOR_VARIABLES.DARK_COLOR};
  font-weight: 500 !important;
  border-radius: ${(props) => (props.roundedCorner ? '12' : '4')}px;
  padding: 9px 24px 9px 24px;
  text-align: center;
  font-size: 16px;
  line-height: 28px;
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

    &:hover {
      box-shadow: 0 0 5px 5px rgba(22, 238, 246, 0.2);
    }

    &:active {
      box-shadow: 0 0 5px 5px rgba(22, 238, 246, 0);
    }

    &:disabled {
      color: rgba(255, 255, 255, 1);
      background: ${BTN_BACKGROUND_VARIABLES.PRIMARY_GRADIENT_DISABLED_BUTTON};
      box-shadow:
        inset 0px 8px 12px 0px rgba(255, 255, 255, 0.08),
        0px 24px 24px -16px rgba(0, 0, 0, 0.12),
        inset 16px 24px 64px -24px rgba(255, 255, 255, 0.08);
    }
  }

  &.outline {
    background: transparent;
    border-style: solid;
    border-width: 1px;

    &.primary {
      border-color: rgb(17, 240, 40);
      color: rgb(17, 240, 40);
      &:hover {
        color: rgb(9, 166, 25);
      }

      &:active {
        color: rgb(17, 240, 40);
      }
    }

    &.secondary {
      border-color: rgb(255, 255, 255, 0.8);
      color: rgb(255, 255, 255, 0.8);
      &:hover {
        color: rgb(255, 255, 255, 0.6);
      }

      &:active {
        color: rgb(255, 255, 255, 0.8);
      }
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &.small {
    font-size: 12px;
    padding: 0px 12px 0px 12px;
  }

  &.text {
    padding: 0;
    transition: all 0.2s;

    &.primary {
      background: linear-gradient(45deg, rgb(22, 238, 246), rgb(4, 187, 209));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    &:hover {
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

  &:disabled ${Loader} {
    filter: invert(100%);
  }
`
