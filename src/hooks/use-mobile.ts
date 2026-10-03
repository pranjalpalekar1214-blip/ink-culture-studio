import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Subscribes to the mobile breakpoint via useSyncExternalStore instead of
 * setState-in-effect. No cascading render on mount, and the subscription is
 * torn down automatically on unmount.
 */
export function useIsMobile(): boolean {
  const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

  const subscribe = React.useCallback((onChange: () => void) => {
    const mql = window.matchMedia(query)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  const getSnapshot = React.useCallback(
    () => window.matchMedia(query).matches,
    [query],
  )

  // Server snapshot must be stable to avoid a hydration mismatch.
  const getServerSnapshot = () => false

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}