import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import copyToClipboard from 'copy-to-clipboard'
import { useTranslation } from 'react-i18next'

export const useCopy = (delay = 1000) => {
  const { t } = useTranslation()
  const [isCopied, setIsCopied] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()

  const copy = (
    text: string,
    { successTip = t('copy.success'), errorTip = t('copy.failed') } = {}
  ) => {
    const isCopySuccess = copyToClipboard(text)

    if (isCopySuccess) {
      setIsCopied(true)
      toast.success(successTip)
    } else {
      toast.error(errorTip)
    }
  }

  const resetIsCopied = () => setIsCopied(false)

  useEffect(() => {
    if (!delay) return // user may want to keep state & close manually
    if (isCopied) {
      timerRef.current = setTimeout(resetIsCopied, delay)
    }

    return () => clearTimeout(timerRef.current)
  }, [isCopied])

  return {
    isCopied,
    resetIsCopied,
    copy,
  }
}
