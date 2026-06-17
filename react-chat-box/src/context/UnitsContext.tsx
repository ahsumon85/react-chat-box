import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type TempUnit = 'celsius' | 'fahrenheit'

interface UnitsContextValue {
  unit: TempUnit
  setUnit: (unit: TempUnit) => void
  formatTemp: (celsius: number) => string
}

const UnitsContext = createContext<UnitsContextValue | null>(null)

export function UnitsProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<TempUnit>('celsius')

  const value = useMemo(
    () => ({
      unit,
      setUnit,
      formatTemp: (celsius: number) => {
        const converted =
          unit === 'fahrenheit' ? (celsius * 9) / 5 + 32 : celsius
        const suffix = unit === 'fahrenheit' ? '°F' : '°C'
        return `${Math.round(converted)}${suffix}`
      },
    }),
    [unit]
  )

  return <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>
}

export function useUnits() {
  const context = useContext(UnitsContext)
  if (!context) {
    throw new Error('useUnits must be used within UnitsProvider')
  }
  return context
}
