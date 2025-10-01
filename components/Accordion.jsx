import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionCard({table}) {
  return (
    <div className="px-4 text-textGreen font-roboto py-10 md:py-15 md:px-20">
  <Accordion
      type='single'
      collapsible
      className="w-full"
    
    >
        {table.map((q)=> (
   <AccordionItem key={q.index} value={q.index}>
        <AccordionTrigger className={'font-medium text-lg'}>{q.title}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 p-4 bg-green-200">
          <p className="leading-[1.5] text-lg text-left ">
           {q.body}
          </p>
          
        </AccordionContent>
      </AccordionItem>

        ))}
      

      
    </Accordion>

    </div>
    
  )
}
