import { CiSquarePlus } from 'react-icons/ci'

import { GoalTrakingLogo } from '@/components/goal-traking-logo'
import { LetsStart } from '@/components/lets-start'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <GoalTrakingLogo />
      <LetsStart />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou{' '}
        <span className="bg-gradient-to-r from-blue-400 via-pink-400 to-purple-700 bg-clip-text text-transparent font-bold">
          nenhuma meta
        </span>
        , que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button variant="primary" type="button">
          <CiSquarePlus size={16} className="text-violet-50 animate-bounce" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
