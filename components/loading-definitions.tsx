import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function LoadingDefinitions() {
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Britannica</h2>
        <Card className="mb-4 overflow-hidden transition-all">
          <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/50">
                  <Skeleton className="h-3 w-3" />
                </Badge>
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />

            <div className="mt-4">
              <Skeleton className="h-3 w-20 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden transition-all">
          <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/50">
                  <Skeleton className="h-3 w-3" />
                </Badge>
                <Skeleton className="h-6 w-40" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Merriam-Webster</h2>
        <Card className="mb-4 overflow-hidden transition-all">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32" />
              <Badge variant="outline" className="text-xs">
                <Skeleton className="h-3 w-12" />
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-start gap-2 mb-4">
              <Skeleton className="h-4 w-4 flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Skeleton className="h-4 w-4 flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all">
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
