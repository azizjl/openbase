import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <Empty className="border">
      <EmptyHeader>
        {Icon && (
          <EmptyMedia variant="icon">
            <Icon />
          </EmptyMedia>
        )}
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {actionLabel && (
        <EmptyContent>
          <Button onClick={onAction}>{actionLabel}</Button>
        </EmptyContent>
      )}
    </Empty>
  )
}
