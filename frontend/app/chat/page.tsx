"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form";
import { messageHistoryAtom } from "../utils/atoms";
import { useAtom } from "jotai";
import { ChatGPTMessage } from "../utils/openai";

const FormSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
});

export default function TextareaReactHookForm() {
  const [streamed, setStreamed] = useState<string[]>([]);
  const [messages, setMessages] = useAtom(messageHistoryAtom);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const loading = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setStreamed([]);
    console.log(data);
    try {
      const body: ChatGPTMessage[] = [
        ...messages,
        {
          role: "user",
          content: data.prompt,
        },
      ];
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: body,
        }),
      });
      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error("No reader");
      }
      setMessages((b) => [...b, { role: "user", content: data.prompt }]);
      let a = "";
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          setStreamed((s) => [...s, decoder.decode(value)]);
          a += decoder.decode(value);
        }
      }
      setMessages((b) => [...b, { role: "system", content: a }]);
      form.reset({ prompt: "" });
    } catch (e) {
      console.error(e);
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data.prompt, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <>
      <div className="flex flex-col">
        {messages.map((message, i) => {
          return (
            <div key={i} className="">
              {message.role === "user" ? "User: " : "TherAPI: "}
              {message.content}
            </div>
          );
        })}
        {loading && streamed.length > 0 && <div>TherAPI: {streamed.join("")}</div>}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chat to TherAPI</FormLabel>
                <FormControl defaultValue="">
                  <Textarea placeholder="Ask TherAPI anything" className="resize-none" {...field} disabled={loading} />
                </FormControl>
                {/* <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
