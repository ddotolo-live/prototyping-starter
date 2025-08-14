import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-4xl">Livekit Prototyping Starter Kit</h1>
      <p className="text-fg-1">
        This is a starter kit to help you vibe code faster without having to access the monorepo. 
      </p>
      <Button variant="primary" size="sm">
        View Github Repo
      </Button>
    </div>
  );
}
