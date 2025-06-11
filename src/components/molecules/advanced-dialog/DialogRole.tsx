import { CirclePlus, UserCogIcon, UserPenIcon } from 'lucide-react';
import { Button } from '../../atoms/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '../../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Separator } from '../../ui/separator';
import AccordionOutline from '../../atoms/AccordionOutline';

export default function DialogRole() {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="hover:bg-primary hover:text-primary-foreground"
      >
        <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors dark:hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
          <div className="flex items-center">
            <span className="mr-2">
              {' '}
              <UserPenIcon className="h-4 w-4" />
            </span>
            Role
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[425px] h-auto min-w-[calc(70vw-2rem)] overflow-y-auto">
        <DialogTitle className="flex items-center gap-4 text-foreground">
          <UserCogIcon size={36} />
          <div className="gap-2">
            <h1 className="text-xl font-semibold">Manage Permission</h1>
            <p className="text-sm text-muted-foreground">
              You can add permission for the selected role
            </p>
          </div>
        </DialogTitle>
        <Separator />
        <div>
          <AccordionOutline />
        </div>
        <DialogFooter className="sticky bottom-0 mt-2 py-3 flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
