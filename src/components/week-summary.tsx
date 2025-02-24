import { CiCircleCheck, CiSquarePlus } from 'react-icons/ci'
import { TbHandFinger } from 'react-icons/tb'

import { CreateGoal } from '@/components/create-goal'
import { TrakingIcon } from '@/components/traking-icon'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { OutlineButton } from '@/components/ui/outline-button'
import { Progress, ProgressIndicator } from '@/components/ui/progress-bar'
import { Separator } from '@/components/ui/separator'

export function WeekSummary() {
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between ">
        <div className="flex gap-2 items-center border border-zinc-600 px-3 rounded-lg py-1">
          <TrakingIcon />
          <span className="text-lg font-semibold max-sm:text-base">
            23 a 28 de fevereiro
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
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: '50%' }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="">
            Você completou <span className="text-zinc-200">8</span> de{' '}
            <span className="text-zinc-200">15</span> metas essa semana.
          </span>
          <span className="">50%</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          <TbHandFinger className="size-4 text-zinc-600" />
          Meditar
        </OutlineButton>

        <OutlineButton>
          <TbHandFinger className="size-4 text-zinc-600" />
          Estudar Node.js
        </OutlineButton>

        <OutlineButton>
          <TbHandFinger className="size-4 text-zinc-600" />
          Estudar React and Next.js
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Domingo{' '}
            <span className="text-zinc-400 text-xs">(23 de Fevereiro)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CiCircleCheck className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{' '}
                <span className="text-zinc-100">08:13h</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
