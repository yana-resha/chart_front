import { styled } from '@linaria/react'

export const Article = styled.article``

export const MetaRowWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  align-items: center;
  color: rgba(255, 255, 255, 0.56);
  font-size: 14px;
  margin-bottom: 8px;
`

export const MetaRowTime = styled.time`
  font-variant-numeric: tabular-nums;
`

export const Cover = styled.figure`
  margin: 12px 0 0;
  border-radius: 24px;
  overflow: hidden;
  background: #141824;
  border: 1px solid rgba(255, 255, 255, 0.16);

  /* на всякий случай, если figcaption будет */
  figcaption {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.56);
    margin-top: 6px;
    text-align: center;
  }
`

export const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  margin: 28px 0;
`
