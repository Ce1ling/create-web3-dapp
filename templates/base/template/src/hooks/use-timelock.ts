import { useEffect, useState } from 'react'
import { useInterval, useLocalStorageState } from 'ahooks'

interface Options {
  duration?: number
  storageKey?: string
}

/**
 * A localStorage-based timelock hook. default lock duration is `5m`.
 **/
export const useTimelock = (
  target: string | undefined | null,
  { duration = 5 * 60 * 1000, storageKey = 'timelockMap' }: Options = {}
) => {
  const [isLocking, setIsLocking] = useState(true)
  const [lockMap, setLockMap] = useLocalStorageState(storageKey, {
    defaultValue: {} as Record<string, number>,
    serializer: (v) => JSON.stringify(v),
    deserializer: (v) => JSON.parse(v),
  })

  const lock = () => {
    if (!target) return setIsLocking(false)

    setIsLocking(true)
    setLockMap((prev) => ({
      ...prev,
      [target]: Date.now(),
    }))
  }

  const unlock = () => {
    if (!target) return setIsLocking(false)

    setIsLocking(false)
    setLockMap((prev) => {
      prev = prev || {}
      delete prev[target]
      return prev
    })
  }

  useInterval(
    () => {
      const ts = lockMap?.[target || '']
      if (!ts) return setIsLocking(false)
      if (Date.now() - ts > duration) setIsLocking(false)
    },
    isLocking ? 1000 : undefined
  )

  // Locking when target changed
  useEffect(() => {
    setIsLocking(true)
  }, [target])

  return {
    isLocking,
    lock,
    unlock,
  }
}
