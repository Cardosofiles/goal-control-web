import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { CiCircleCheck, CiSquarePlus } from 'react-icons/ci'
import { FaChevronRight, FaDatabase } from 'react-icons/fa6'

import { CreateGoal } from '../components/create-goal'
import { PendingGoals } from '../components/pending-goals'
import { TrakingIcon } from '../components/traking-icon'
import { Button } from '../components/ui/button'
import { DialogTrigger } from '../components/ui/dialog'
import { Progress, ProgressIndicator } from '../components/ui/progress-bar'
import { Separator } from '../components/ui/separator'

import { getSummary } from '../api/get-summary'

export function WeekSummary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  if (!data)
    return (
      <div>
        <span>Loading...</span>

        <div className="flex">
          <FaChevronRight />
          <FaDatabase />
        </div>
      </div>
    )

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = Math.round((data.completed * 100) / data!.total)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between ">
        <div className="flex gap-2 items-center border border-zinc-600 px-3 rounded-lg py-1">
          <TrakingIcon />
          <span className="text-lg font-semibold max-sm:text-base">
            {firstDayOfWeek} até {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button variant="primary" type="button" size="sm">
            <CiSquarePlus size={16} className="text-violet-50 animate-bounce" />
            Cadastrar meta
          </Button>
        </DialogTrigger>

        <CreateGoal />
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={data.completed} max={data.total}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="">
            Você completou{' '}
            <span className="text-zinc-200">{data.completed}</span> de{' '}
            <span className="text-zinc-200">{data.total}</span> metas essa
            semana.
          </span>
          <span className="">{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(data.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const formattedDate = dayjs(date).format('D [de] MMMM')

          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium">
                {weekDay}{' '}
                <span className="text-zinc-400 text-xs">{formattedDate}</span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals.map(goal => {
                  const time = dayjs(goal.completedAt).format('HH:mm')

                  return (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CiCircleCheck className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{' '}
                        <span className="text-zinc-100">{time}h</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
