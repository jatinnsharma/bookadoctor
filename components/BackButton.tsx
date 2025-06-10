"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; 
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); 
  };

  return (
    <Button onClick={handleBack} variant="ghost" size="sm">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
}
