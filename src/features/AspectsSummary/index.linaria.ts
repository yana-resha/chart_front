import { styled } from '@linaria/react'

import { addAlpha } from '@/shared/helpers/addAlpha'

export const Wrapper = styled.div``

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`

export const Card = styled.div<{ color: string }>`
  flex: 1;
  min-width: 180px;
  border-radius: 8px;
  border: 1px solid ${(props) => addAlpha(props.color, 0.25)};
  background: linear-gradient(
    to bottom,
    ${(props) => addAlpha(props.color, 0.15)},
    ${(props) => addAlpha(props.color, 0.1)} 70%,
    rgba(255, 255, 255, 0.02) 100%
  );
  color: rgba(255, 255, 255, 0.85);
  padding: 1rem;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(
      to bottom,
      ${(props) => addAlpha(props.color, 0.25)},
      ${(props) => addAlpha(props.color, 0.15)} 70%,
      rgba(255, 255, 255, 0.04) 100%
    );
    border-color: ${(props) => addAlpha(props.color, 0.4)};
  }
`

export const CardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
`

export const CardText = styled.p`
  margin: 0.2rem 0;
  font-size: 0.875rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.8);
`

export const Summary = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
  padding: 1rem;
`

export const SummaryLine = styled.p`
  margin: 0.3rem 0;
  font-size: 0.875rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.8);
`

export const Highlight = styled.span`
  color: rgb(22, 238, 246);
`
