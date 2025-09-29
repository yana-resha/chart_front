import { styled } from '@linaria/react'

import { SECTION_CONTENT_PADDINGS } from '../../index.linaria'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const HeroSection = styled.article`
  width: 100%;
  height: calc(100dvh - 32px);
  border-radius: 0px;
  max-height: 1080px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: rgba(23, 25, 26, 1);
  margin-bottom: 20px;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    height: calc(100dvh - 15px - 50px);
  }
`

export const HeroContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.85);
  padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.large};
  padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.large};
  padding-top: ${SECTION_CONTENT_PADDINGS.padding_top.large};
  padding-bottom: ${SECTION_CONTENT_PADDINGS.padding_bottom.large};

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.medium};
    padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.medium};
    padding-top: ${SECTION_CONTENT_PADDINGS.padding_top.medium};
    padding-bottom: ${SECTION_CONTENT_PADDINGS.padding_bottom.medium};
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.small};
    padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.small};
    padding-top: ${SECTION_CONTENT_PADDINGS.padding_top.small};
    padding-bottom: ${SECTION_CONTENT_PADDINGS.padding_bottom.small};
  }
`

export const ContentWrapper = styled.div`
  /* border-radius: 40px;
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px); */
`

export const HeroTitle = styled.h1`
  margin: 0;
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(40px, 7vw, 80px);
  font-weight: 700;
  line-height: 1.05;
`

export const HeroSubtitle = styled.h2`
  margin: 0 0 20px 0;
  font-weight: 500;
  line-height: 1.15;
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(16px, 2vw, 24px);
  letter-spacing: 1.2px;

  @media (max-width: 850px) {
    letter-spacing: 1px;
    margin: 0 0 15px 0;
  }

  @media (max-width: 685px) {
    letter-spacing: 0.8px;
  }
`

export const HeroLead = styled.p`
  margin: 0 0 30px 0;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
  font-size: clamp(14px, 1.6vw, 18px);

  @media (max-width: 750px) {
    font-size: 14px;
    line-height: 1.4;
    margin: 0 0 20px 0;
  }
`

export const HeroButtonsBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: fit-content;
  gap: 10px;

  /* ширина ровно по кнопкам, не растягиваем */
  align-self: flex-start;

  @media (max-width: 400px) {
    width: 100%;
    grid-template-columns: auto 1fr;
  }
`
