import { styled } from '@linaria/react'

import { BADGE_BACKGROUND_VARIABLES } from '@/shared/assets/styles/colors'

export const BadgeComponent = styled.div`
  font-weight: 500;
  letter-spacing: 0.15px;
  background: ${BADGE_BACKGROUND_VARIABLES.ACTIVE_BADGE};
  border-radius: 12px;
  color: rgb(1, 1, 1);
  border-top: none;
  line-height: 15px;
  padding: 4px 8px;
  font-size: 8px;

  &[data-kind='neutral'] {
    background: ${BADGE_BACKGROUND_VARIABLES.NEUTRAL_BADGE};
    color: rgb(205, 206, 207);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  &[data-size='l'] {
    padding: 4px 12px;
    font-size: 14px;
    line-height: 24px;
  }
`
