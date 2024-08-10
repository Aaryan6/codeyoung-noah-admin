import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotebookPen } from "lucide-react";
export default function StatsCard({
  figure,
  title,
  percentage,
}: {
  figure: number;
  title: string;
  percentage?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <NotebookPen className="stroke-gray-600" size={16} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {percentage ? figure + "%" : figure || "N/A"}
        </div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
}
