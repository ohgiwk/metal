import { useEffect } from 'react'
import hotkeys from 'hotkeys-js'
import keycode from 'keycode'

type KeyMap = {
  sequence: string
  handler: Function
}

const orderedModifierKeys = Object.freeze(['command', 'ctrl', 'shift', 'alt'])

const getKeySequence = (
  codes: number[],
  options = {
    splitKey: '+',
  }
) => {
  const keys = codes
    .map((code) => keycode(code))
    .map((code) => (code.endsWith('command') ? 'command' : code))

  const modifierKeys = keys
    .filter((k) => orderedModifierKeys.includes(k))
    .sort((a, b) => {
      const aIndex = orderedModifierKeys.findIndex((key) => key === a)
      const bIndex = orderedModifierKeys.findIndex((key) => key === b)
      return aIndex - bIndex
    })

  const otherKeys = keys.filter((key) => !orderedModifierKeys.includes(key))

  return modifierKeys.concat(otherKeys).join(options.splitKey)
}

export const useHotkeys = (keyMaps: KeyMap[]): void => {
  useEffect(() => {
    hotkeys('*', (evt: Event) => {
      const keyCodes = hotkeys.getPressedKeyCodes()
      const sequence = getKeySequence(keyCodes)

      const keyMap = keyMaps.find((keyMap) => keyMap.sequence === sequence)
      if (!keyMap) return
      keyMap.handler(evt)
    })

    return () => hotkeys.unbind('*')
  }, [keyMaps])
}
export default useHotkeys
