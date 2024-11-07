/**
 * Map with a LRU (Least recently used) policy.
 *
 * @link https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU
 */
export class LruMap<V = unknown> extends Map<string, V> {
  maxSize: number

  constructor(size: number) {
    super()
    this.maxSize = size
  }

  override get(key: string) {
    const value = super.get(key)

    if (super.has(key) && value !== undefined) {
      this.delete(key)
      super.set(key, value)
    }

    return value
  }

  override set(key: string, value: V) {
    super.set(key, value)
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value
      if (firstKey) this.delete(firstKey)
    }
    return this
  }
}
