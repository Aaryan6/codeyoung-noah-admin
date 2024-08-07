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
import useDatabaseStore from "@/lib/zustand/database.select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTables } from "@/actions/database.actions";

export function SelectDatabase() {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState<string[]>([]);
  const useDatabase = useDatabaseStore();

  React.useEffect(() => {
    (async () => {
      const result: any = await getTables();
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
          {/* {useDatabase.userid
            ? users.find((user) => user === useDatabase.userid)
            : "Select user"} */}
          hello
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search User Id..." />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {/* <ScrollArea className="h-96 w-full rounded-md border">
              {users.map((user: string) => (
                <CommandItem
                  key={user}
                  value={user}
                  onSelect={() => {
                    useDatabase.setUser(user === useDatabase.userid ? "" : user);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      useDatabase.userid === user ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user}
                </CommandItem>
              ))}
            </ScrollArea> */}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
