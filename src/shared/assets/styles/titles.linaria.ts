import { styled } from '@linaria/react'

export const PageTitle = styled.div`
  font-size: 1.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 1.875rem;
  text-align: center;
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);

  @media (max-width: 1000px) {
    font-size: 1.8rem;
    margin-bottom: 1.8rem;
  }
`

export const SectionTitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 500;
  padding-left: 1rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);
`
export const SubSectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  padding-left: 0.8rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);
`
