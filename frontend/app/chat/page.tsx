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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SendIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
});


export default function Chat({ className, ...props } : { className?: any }) {

  const [messages, setMessages] = useAtom(messageHistoryAtom);

  const [streamed, setStreamed] = useState<string[]>([]);

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
  }

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  // <div className="flex flex-col max-w-full justify-center items-center text-center flex-grow-0">

  return (
    <div className={cn(className, "flex flex-col justify-center items-center text-left p-3 pl-0")}>    
      { messages.length != 0 &&
        <ScrollArea className="h-[400px] min-w-full py-0 overflow-visible rounded-lg rounded-br-none rounded-bl-none backdrop-blur-lg bg-border bg-opacity-10 border border-b-0 px-4 drop-shadow-[0_0px_5px_rgba(0,0,0,0.10)] z-10">
          {
            messages.map((message, i) => {

              const senderName = message.role === "user" ? "You" : "therAPI";
              const bgColor = senderName === "You" ? "bg-white" : "bg-[#FFF4EB]";
              console.log(senderName, bgColor);

              return (
                <div key={i} className={`min-w-full bg-opacity-0 flex flex-row flex-wrap py-3 items-end transition drop-shadow-none hover:drop-shadow-[0_0px_15px_rgba(0,0,0,0.10)]`}>
                  {
                    senderName == "therAPI" &&
                    <div className="min-w-[70px]">
                      <div className="font-bold pb-3 text-left">
                        {`${senderName} `}
                      </div>
                    </div>
                  }
                  <div className={`flex-1 w-full max-w-1/2 rounded-[25px] rounded-b${senderName==="therAPI" ? "l" : "r"}-none font-light backdrop-blur-lg ${bgColor} bg-opacity-30 p-3 text-slate-700 text-${senderName == "therAPI" ? "left" : "right"}`}>
                    {message.content}
                  </div>
                  {
                    senderName == "You" &&
                    <div className="min-w-[50px]">
                      <div className="font-bold text-right">
                        {`${senderName} `}
                      </div>
                    </div>
                  }
                </div>
              );
            })
          }
          {
            loading && 
            streamed.length > 0 && 
              <div className={`min-w-full bg-opacity-0 flex flex-row flex-wrap py-3 items-end transition drop-shadow-none hover:drop-shadow-[0_0px_15px_rgba(0,0,0,0.10)]`}>
                {/* TherAPI: {streamed.join("")} */}
                
                <div className="min-w-[80px]">
                  <div className="font-bold pb-3 text-left">
                    {`${"therAPI"} `}
                  </div>
                </div>
                
                <div className={`flex-1 w-full max-w-1/2 rounded-lg rounded-tl-none font-light backdrop-blur-lg bg-slate-200 bg-opacity-50 p-3 text-slate-700 text-left`}>
                  {streamed.join("")}
                </div>
              </div>
          }
        </ScrollArea>
      }
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0 min-w-full w-full z-[9]" >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="space-y-0 relative bg-transparent rounded-lg">
                <FormControl defaultValue="">
                  <div className="w-full h-10 flex flex-row">
                    <Textarea placeholder="Ask TherAPI anything" className="z-[8] m-0 flex flex-1 max-h-full bg-white text-black border border-r-0 rounded-tr-none rounded-br-none rounded-tl-none rounded-bl-lg px-3 focus-visible:ring-0 focus-visible:ring-offset-0 transition-[filter] drop-shadow-none focus:drop-shadow-[0_0px_5px_rgba(0,0,0,0.10)] hover:drop-shadow-[0_0px_5px_rgba(0,0,0,0.10)] resize-none placeholder:text-slate-400 placeholder:italic justify-center items-center" {...field} disabled={loading} />
                    <Button className="z-[9] min-h-full h-auto bg-white border border-l-0 rounded-tl-none rounded-bl-none rounded-tr-none text-white" type="submit" disabled={loading}>
                      <SendIcon className="text-rose-800 transition-transform scale-110 hover:scale-130"></SendIcon>
                    </Button> 
                  </div>
                </FormControl>
                {/* <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription> */}
                <FormMessage 
                  className="absolute -mt-[8px] w-full h-min text-rose-600 lowercase text-xs"
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
