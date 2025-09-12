import { HTMLAttributes } from 'react'

export interface IPreviewPostCard extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  link: string
  imageSrc: string
  imageAlt: string
}
