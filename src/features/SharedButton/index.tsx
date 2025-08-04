import { useState } from 'react'

import {
  dropdownContainer,
  Title,
  Emoji,
  Description,
  LinkBlock,
  LinkText,
  ShareFooter,
  ShareLabel,
  ShareIcons,
  IconLink,
  ButtonContent,
  ShakyIcon,
} from './index.linaria'
import Telegram from '@/shared/assets/icons/messenger-icons/telegram.svg?react'
import Whatsapp from '@/shared/assets/icons/messenger-icons/whatsapp.svg?react'
import VK from '@/shared/assets/icons/messenger-icons/vkontakte.svg?react'
import ShareIcon from '@/shared/assets/icons/share.svg?react'
import { Button } from '@/shared/components/Button'
import { Dropdown } from '@/shared/components/Dropdown'

interface SharedButtonProps {
  shareUrl: string
  title?: string
  description?: string
  buttonText?: string
  messageText?: string // <= новый пропс для мессенджеров
}

export const SharedButton = ({
  shareUrl,
  buttonText = 'Поделиться',
  title = 'Поделиться картой',
  description = 'Нажми, чтобы скопировать ссылку и отправить друзьям',
  messageText = '', // <= по умолчанию
}: SharedButtonProps) => {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setOpen(false)
    }, 1500)
  }

  const whatsappMessage = `${messageText}\n${shareUrl}`

  return (
    <Dropdown
      open={open}
      className={dropdownContainer}
      onClose={() => setOpen(false)}
      trigger={
        <Button
          onClick={() => setOpen((prev) => !prev)}
          theme="primary"
          kind="outline"
          size="small"
        >
          <ButtonContent>
            {buttonText}
            <ShakyIcon>
              <ShareIcon
                width={18}
                height={18}
              />
            </ShakyIcon>
          </ButtonContent>
        </Button>
      }
    >
      <Title>
        {title} <Emoji> 💫</Emoji>
      </Title>
      <Description>{description}</Description>

      <LinkBlock onClick={handleCopy}>
        <LinkText>{shareUrl}</LinkText>
        <Button
          theme="primary"
          kind="outline"
          roundedCorner
          onClick={handleCopy}
          style={{ minWidth: '120px' }}
          size="small"
        >
          {copied ? 'Скопировано!' : 'Копировать'}
        </Button>
      </LinkBlock>

      <ShareFooter>
        <ShareLabel>Поделись в мессенджере</ShareLabel>
        <ShareIcons>
          <IconLink
            href={`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Поделиться в WhatsApp"
          >
            <Whatsapp />
          </IconLink>

          <IconLink
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(messageText)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Поделиться в Telegram"
          >
            <Telegram />
          </IconLink>
          <IconLink
            href={`https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&comment=${encodeURIComponent(messageText)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Поделиться в VK"
          >
            <VK />
          </IconLink>
        </ShareIcons>
      </ShareFooter>
    </Dropdown>
  )
}
