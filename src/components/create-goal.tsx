import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { z } from 'zod'

import { Button } from '../components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '../components/ui/radio-group'

import { createGoal } from '../api/create-goal'

const createGoalForm = z.object({
  title: z.string().min(1, { message: '⚠️ O título não pode estar vazio' }),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalForm = z.infer<typeof createGoalForm>

export function CreateGoal() {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalForm),
    })

  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })

    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    queryClient.invalidateQueries({ queryKey: ['summary'] })

    reset()
  }

  return (
    <DialogContent className="h-screen overflow-y-auto">
      <div className="flex flex-col gap-6 h-full scroll-smooth scroll-m-0">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <IoIosCloseCircleOutline size={20} />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te{' '}
            <span className="bg-gradient-to-r from-blue-400 via-pink-400 to-purple-700 bg-clip-text text-transparent font-bold">
              fazem bem
            </span>{' '}
            e que você quer continuar praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-col flex-1 justify-between h-h-full overflow-y-auto"
        >
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual é a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, Estudar, meditar, etc..."
                {...register('title')}
              />

              {formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantas vezes na semana?</Label>

              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={1}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <RadioGroupItem value="1">
                        {' '}
                        <RadioGroupIndicator />{' '}
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          1 vez na semana
                        </span>{' '}
                        <span className="text-lg leading-none">🥱</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="2">
                        {' '}
                        <RadioGroupIndicator />{' '}
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          2 vezes na semana
                        </span>{' '}
                        <span className="text-lg leading-none">🙂</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="3">
                        {' '}
                        <RadioGroupIndicator />{' '}
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          3 vezes na semana
                        </span>{' '}
                        <span className="text-lg leading-none">😎</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="4">
                        {' '}
                        <RadioGroupIndicator />{' '}
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          4 vezes na semana
                        </span>{' '}
                        <span className="text-lg leading-none">😜</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="5">
                        {' '}
                        <RadioGroupIndicator />{' '}
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          5 vezes na semana
                        </span>{' '}
                        <span className="text-lg leading-none">🤨</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="6">
                        {' '}
                        <RadioGroupIndicator />{' '}
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          6 vezes na semana
                        </span>{' '}
                        <span className="text-lg leading-none">🤯</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="7">
                        {' '}
                        <RadioGroupIndicator />{' '}
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          Todos os dias na semana
                        </span>{' '}
                        <span className="text-lg leading-none">🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <Button className="flex-1" variant="primary" type="submit">
              Salvar
            </Button>

            <DialogClose asChild>
              <Button className="flex-1" variant="secondary" type="submit">
                Fechar
              </Button>
            </DialogClose>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
