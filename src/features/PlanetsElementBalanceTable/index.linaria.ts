import { styled } from '@linaria/react'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 2fr) repeat(4, 1fr);
  grid-auto-rows: 1fr;
  width: 100%;
  height: 100%;
  font-size: clamp(12px, 2vw, 14px);

  & > div {
    line-height: 1.6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 4px;
    text-align: center;
  }

  & > div.planet {
    justify-content: flex-start;
    text-align: left;
    padding-left: 8px;
  }

  & > div.header {
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  & > div.footer {
    font-weight: 600;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  & > div.highlight {
    color: rgb(22, 238, 246);
    font-weight: 700;
  }
`
