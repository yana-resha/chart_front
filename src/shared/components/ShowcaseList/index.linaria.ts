import { styled } from '@linaria/react'

import { glassBackground } from '@/shared/assets/styles/glass'

export const List = styled.div`
  display: flex;
  flex-direction: column;
`

export const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  min-height: 170px;
  border-bottom: 1px solid rgba(255, 255, 255, 1);

  &:first-child {
    border-top: 1px solid rgba(255, 255, 255, 1);
  }

  &:nth-child(even) {
    direction: rtl;

    & > * {
      direction: ltr;
    }
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 720px) {
    height: 200px;
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: 1rem;
  ${glassBackground()};

  @media (max-width: 720px) {
    padding: 1.25rem;
  }
`

export const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 500;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.2;
`

export const Text = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.35;
`
