"use client";

import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function AddProfileDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    // Here you would typically handle the profile creation
    console.log("Creating profile for:", name);
    setOpen(false);
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium">
            Add Profile
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a profile for another person
            watching Netflix.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-[96px] w-[96px]">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="Profile picture"
                />
                <AvatarFallback className="bg-gray-800 text-4xl">
                  {name ? (
                    name[0].toUpperCase()
                  ) : (
                    <PlusCircle className="h-12 w-12 text-gray-400" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className="text-gray-400"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="bg-gray-800 border-gray-700 text-white focus:ring-red-600 focus:border-red-600"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Add Profile
            </Button>
          </DialogFooter>
        </form>
        <Button
          variant="ghost"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
