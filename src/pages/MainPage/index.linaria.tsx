import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { PageContentWrapper } from '@/shared/assets/styles/pages.linaria'

export const SECTION_CONTENT_PADDINGS = {
  padding_x: {
    large: '28px',
    medium: '16px',
    small: '8px',
  },

  padding_top: {
    large: '2rem',
    medium: '32px',
    small: '32px',
  },

  padding_bottom: {
    large: '1.5rem',
    medium: '32px',
    small: '32px',
  },
}

export const TEXT_COLORS = {
  LIGHT_TITLE_COLOR: 'rgba(255, 255, 255, 0.92)',
  LIGHT_SUBTITLE_COLOR: 'rgba(255, 255, 255, 0.65)',

  DARK_TITLE_COLOR: 'rgba(17, 17, 17, 0.92)',
  DARK_SUBTITLE_COLOR: 'rgba(17, 17, 17, 0.85)',
}

export const Layout = styled(PageContentWrapper)`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const Section = styled.section`
  padding-top: ${SECTION_CONTENT_PADDINGS.padding_top.large};
  padding-bottom: ${SECTION_CONTENT_PADDINGS.padding_bottom.large};
  padding-left: 10px;
  padding-right: 10px;
`

export const SectionHeadWrapper = styled.div`
  padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.large};
  padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.large};
  margin-bottom: 20px;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.large};
    padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.large};
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.medium};
    padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.medium};
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.medium};
    padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.medium};
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.small};
    padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.small};
  }
`

export const H2 = styled.h2<SectionProps>`
  margin: 0 0 6px;
  font-weight: 800;
  letter-spacing: 0.2px;

  color: ${({ variant }) =>
    variant === 'light' ? TEXT_COLORS.LIGHT_TITLE_COLOR : TEXT_COLORS.DARK_TITLE_COLOR};

  font-size: clamp(20px, 2.2vw, 28px);
  line-height: 1.15;
`

export const SectionSubtitle = styled.div<SectionProps>`
  margin: 0;

  color: ${({ variant }) =>
    variant === 'light' ? TEXT_COLORS.LIGHT_TITLE_COLOR : TEXT_COLORS.DARK_TITLE_COLOR};

  font-size: clamp(12px, 1.4vw, 14px);
`

/* Общие стили секций */

export const Inner = styled.div`
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

interface SectionProps {
  variant?: 'light' | 'dark'
}

export const CardTitle = styled.h3`
  font-weight: 500;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.2;
  font-size: clamp(15px, 1.8vw, 18px);
  text-shadow:
    0 1px 0 rgba(0, 0, 0, 0.25),
    0 6px 20px rgba(0, 0, 0, 0.25);
`
export const CardCaption = styled.p`
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.35;
  font-size: clamp(10px, 1.5vw, 13px);
`
