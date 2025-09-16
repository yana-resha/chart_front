import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { TEXT_SIZE } from '@/shared/assets/styles/text-size'
import { styled } from '@linaria/react'

export const Container = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.025);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 300px;
  position: relative;
  backdrop-filter: blur(9.760000228881836px);
  box-shadow:
    inset 1px 1px 4px 0 rgba(255, 255, 255, 0.05),
    inset 2px 2px 9px 0 rgba(255, 255, 255, 0.05),
    -2px -2px 12px -8px rgba(0, 0, 0, 0.05),
    -11px -10px 48px -12px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding: 1.8rem;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    padding: 1rem;
  }
`

export const IconBox = styled.div`
  width: auto;
  height: 150px;
  margin-bottom: 1rem;

  & > svg {
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 0.6);
  }
`

export const Title = styled.h3`
  font-size: clamp(16px, 1.25rem, 22px);
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 1rem;
  margin-top: 0;
  color: rgba(255, 255, 255, 1);

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: clamp(16px, 1.1rem, 20px);
    line-height: 1.1;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: clamp(16px, 1rem, 18px);
    line-height: 1.1;
  }
`

export const Description = styled.p`
  font-size: ${TEXT_SIZE.M};
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  padding: 0;
  margin: 0;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${TEXT_SIZE.S};
  }

  & span {
    color: rgb(22, 238, 246);
  }

  & br {
    display: block;
    content: '';
    margin-bottom: 1rem;
  }
`

export const Quote = styled.div`
  margin-top: 2.5rem;
  line-height: 1.6;
  font-size: clamp(12px, 0.85rem, 16px);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.65);
  font-style: italic;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: clamp(11px, 0.8125rem, 15px);
    line-height: 1.5;
  }
  max-width: 700px;
`
