import { useEffect, useRef } from 'react'

function useFocusOnMount() {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return ref
}

export default useFocusOnMount
