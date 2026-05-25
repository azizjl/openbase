import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { aiAgents } from "@/data/agents"

export function AIModelSelector({ selectedAgent, onSelect }) {
  const agent = aiAgents.find((a) => a.id === selectedAgent) || aiAgents[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm">
            {agent.name}
            <span className="text-muted-foreground">· {agent.model}</span>
            <ChevronDown data-icon="inline-end" />
          </Button>
        }
      />
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>AI Agents</DropdownMenuLabel>
          {aiAgents.map((a) => (
            <DropdownMenuItem key={a.id} onClick={() => onSelect?.(a.id)}>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{a.name}</span>
                <span className="text-xs text-muted-foreground">{a.description}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
