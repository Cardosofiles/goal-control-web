import { Dialog } from '@/components/ui/dialog'
import { WeekSummary } from '@/components/week-summary'
// import { CreateGoal } from '@/components/create-goal'
// import { EmptyGoals } from './components/emptyy-goals'

export function App() {
  return (
    <Dialog>
      <WeekSummary />
      {/* <EmptyGoals /> */}
      {/* <CreateGoal /> */}
    </Dialog>
  )
}
