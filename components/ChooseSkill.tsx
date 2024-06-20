"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "Full Stack Developer",
    label: "Full Stack Developer",
  },
  {
    value: "Frontend Developer",
    label: "Frontend Developer",
  },
  {
    value: "Backend Developer",
    label: "Backend Developer",
  },
  {
    value: "Android App Developer",
    label: "Android App Developer",
  },
  {
    value: "Ml Developer",
    label: "ML Developer",
  },
]
interface ChooseSkillProps {
    value: string;
    onSelect: (value: string) => void;
  }
  
export function ChooseSkill({ value, onSelect }: ChooseSkillProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between shadow-lg"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Skill..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] shadow-lg p-0">
        <Command>
          <CommandInput placeholder="Search Skill..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    onSelect(framework.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
