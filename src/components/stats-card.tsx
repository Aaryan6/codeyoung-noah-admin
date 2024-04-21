import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotebookPen } from "lucide-react";
export default function StatsCard({
  figure,
  title,
}: {
  figure: number;
  title: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <NotebookPen className="stroke-gray-600" size={16} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{figure}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
}
