"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUsers } from "@/actions/user.actions";
import useUserStore from "@/lib/zustand/user.select";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SelectUser() {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState<string[]>([]);
  const useUser = useUserStore();

  React.useEffect(() => {
    (async () => {
      const result: any = await getUsers();
      setUsers(result);
    })();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {useUser.userid
            ? users.find((user) => user.toLowerCase() === useUser.userid)
            : "Select user"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-96 w-full rounded-md border">
              {users.map((user: string) => (
                <CommandItem
                  key={user}
                  value={user}
                  onSelect={(currentValue) => {
                    useUser.setUser(
                      currentValue === useUser.userid ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      useUser.userid === user ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
