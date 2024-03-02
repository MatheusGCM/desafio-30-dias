import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'

import { Calendar } from '@/components/ui/calendar'
import { Progress } from '@/components/ui/progress'

export function App() {
  const [date, setDate] = useState<Date[] | undefined>(() => {
    const dateOnStorage = localStorage.getItem('@study-register:date')

    if (dateOnStorage) {
      return JSON.parse(dateOnStorage).map((item: string) => new Date(item))
    }

    return []
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(date)

    localStorage.setItem('@study-register:date', stateJSON)
  }, [date])

  return (
    <>
      <header className="fixed flex w-screen items-center justify-center gap-3 pt-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Desafio 30 dias
        </h1>
        {/* <ModeToggle /> */}
      </header>

      <div className="flex h-screen flex-col items-center justify-center">
        <div className="max-w-[17.2rem]">
          <Calendar
            showOutsideDays
            fixedWeeks
            locale={ptBR}
            mode="multiple"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          {date && date?.length === 0 ? (
            <h2 className="mt-5 scroll-m-20 text-center text-2xl font-semibold tracking-tight">
              Clique no dia para iniciar!
            </h2>
          ) : date && date?.length < 30 ? (
            <>
              <h4 className="my-5 scroll-m-20 text-xl font-semibold tracking-tight">
                {`Progresso: ${date?.length > 1 ? `${date?.length} dias` : `${date?.length} dia`}`}
              </h4>
              <Progress value={date?.length} />
              <div className="flex justify-between">
                <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                  0
                </h4>
                <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                  15
                </h4>
                <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                  30
                </h4>
              </div>
            </>
          ) : (
            <h2 className="mt-5 scroll-m-20 text-center text-2xl font-semibold tracking-tight">
              Parabéns, você alcançou os 30 dias 🎉
            </h2>
          )}
        </div>
      </div>
    </>
  )
}
