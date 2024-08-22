import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type Props = {
  strength: {
    topic: string;
    totalScore: number;
  };
};

const StrengthCard = ({ strength }: Props) => {
  return (
    <Card className="flex justify-between p-4 bg-[#FFFFFF]">
      <div className="text-xs font-semibold  flex justify-center items-center text-left text-[#5B8989]">
        {strength.topic}
      </div>
      <div className="flex justify-center items-center text-left">
        <span className="text-sm font-semibold  text-[#5B8989]">
          {strength.totalScore}
        </span>
        Star
      </div>
    </Card>
  );
};

export default StrengthCard;
