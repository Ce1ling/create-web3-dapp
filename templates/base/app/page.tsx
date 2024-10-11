'use client'

import { useState } from 'react'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { H1 } from '@/components/ui/typography/h1'
import { H2 } from '@/components/ui/typography/h2'
import { H3 } from '@/components/ui/typography/h3'
import { H4 } from '@/components/ui/typography/h4'
import { P } from '@/components/ui/typography/p'
import { Link } from '@/components/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export default function HomePage() {
  const [type, setType] = useState<'password' | 'text'>('password')
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: 'L1en',
      password: '123456',
    },
  })

  const onSubmit = (values: any) => {
    console.log('submit', values)
    toast.success(`submit: ${Object.values(values)}`)
  }

  return (
    <div className="mx-auto p-4 space-y-4">
      <H1>Hello, world</H1>
      <H2>Hello, world</H2>
      <H3>Hello, world</H3>
      <H4>Hello, world</H4>
      <P>Hello, world</P>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Open a dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Ttile</DialogTitle>
          <DialogDescription>Dailog Description</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="w-72">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      <Label className="flex items-center space-x-2">
        <Checkbox />
        <span>Checkbox with label</span>
      </Label>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border rounded-md p-4 w-72"
          autoComplete="off"
        >
          <H4>Build a form</H4>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="· · · · · ·"
                    type={type}
                    {...field}
                    endIcon={
                      <button
                        type="button"
                        onClick={() =>
                          setType(type === 'password' ? 'text' : 'password')
                        }
                      >
                        {type === 'text' ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-2">Login</Button>
          <p className="text-sm text-zinc-500 mt-2">
            No account? <Link href="#">Register for now</Link>.
          </p>
        </form>
      </Form>
    </div>
  )
}
