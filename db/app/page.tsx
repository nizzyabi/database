'use client';

import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from "next/router";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from "@/components/ui/input";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  })
})

export default function Home() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/courses', values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="pt-40">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField 
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Course Title"/>
                </FormControl>
              </FormItem>
            )}
          />
          <button type='submit' className="bg-black text-white p-4 rounded mt-4">
            Submit
          </button>

        </form>
      </Form>
    </div>
  );
}
