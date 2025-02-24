import { useQuery } from '@tanstack/react-query'

import { CreateGoal } from './components/create-goal'
import { EmptyGoals } from './components/empty-goals'
import { Dialog } from './components/ui/dialog'
import { WeekSummary } from './components/week-summary'

import { getSummary } from './api/get-summary'

const timerController = 1000 * 60 // 60 seconds

export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: timerController,
  })

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <WeekSummary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
