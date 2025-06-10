import { roleDummy } from '../../helper/mock/role-dummy';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { Label } from './Label';

export default function AccordionOutline() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-2"
      defaultValue="item-1"
    >
      {roleDummy.map((group, index) => (
        <AccordionItem
          key={index}
          value={`group-${index + 1}`}
          className="rounded-md border! border-muted-foreground/30"
        >
          <AccordionTrigger className="px-5 font-semibold">
            {group.title}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground px-5 space-y-2 ">
            <div className="text-xs">{group.content}</div>
            <Separator />
            <RadioGroup defaultValue={group.roles[0]?.defaultPlan ?? 'basic'}>
              {group.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="flex gap-2">
                  <RadioGroupItem
                    value={role.defaultPlan}
                    id={`${group.title.toLowerCase()}-${role.name.toLowerCase()}`}
                  />
                  <div className="grid flex-1 space-y-2">
                    <Label
                      htmlFor={`${group.title.toLowerCase()}-${role.name.toLowerCase()}`}
                    >
                      {role.name}
                    </Label>
                    <p className="text-muted-foreground text-xs">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
