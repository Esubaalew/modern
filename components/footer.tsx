import { Github, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Developed by{" "}
          <a
            href="https://esubalew.et"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Esubalew Chekol
          </a>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/esubaalew"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline-offset-4 hover:underline flex items-center gap-1"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://esubalew.et"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline-offset-4 hover:underline flex items-center gap-1"
          >
            <Globe className="h-4 w-4" />
            <span>Website</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
