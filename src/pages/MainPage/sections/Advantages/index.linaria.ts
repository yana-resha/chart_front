import { styled } from '@linaria/react'

import { Section, SECTION_CONTENT_PADDINGS, SectionHeadWrapper, SectionSubtitle } from '../../index.linaria'

export const AdvantagesSection = styled(Section)`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-left: 0;
  padding-right: 0;
  background: rgb(159, 166, 167);
`

export const SectionHead = styled.div`
  padding-top: 0;
  padding-bottom: 0;
`

export const BottomContainer = styled(SectionHeadWrapper)`
  padding-top: ${SECTION_CONTENT_PADDINGS.padding_bottom.large};
  margin-bottom: 0;
`
export const BottomDescription = styled(SectionSubtitle)`
  text-align: center;

  & strong {
    font-weight: 700;
  }
`
