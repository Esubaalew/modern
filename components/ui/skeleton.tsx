import type React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export { Skeleton }
