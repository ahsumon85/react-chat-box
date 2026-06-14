import { useEffect, useRef } from 'react'

function useFocusOnMount<T extends HTMLElement = HTMLInputElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return ref
}

export default useFocusOnMount
