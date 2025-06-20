import { ChevronLeftIcon, CirclePlus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/dialog';
import { Button } from '../../../../components/atoms/Button';
import { ScrollArea } from '../../../../components/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';

export default function CreateBoardPage() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div className="group" initial={false} animate={{}} layout>
          <Button
            variant="outline"
            size="icon"
            className="flex items-center justify-center gap-2 px-3 group-hover:w-auto transition-all duration-200"
          >
            <CirclePlus className="w-4 h-4 ml-2 hover:mr-2" />

            {/* Animate presence on label */}
            <AnimatePresence>
              <motion.span
                key="quick-create"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden text-sm font-medium whitespace-nowrap group-hover:ml-2"
              >
                Quick Create
              </motion.span>
            </AnimatePresence>
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="mb-8 flex h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)] flex-col justify-between gap-0 p-0">
        <ScrollArea className="flex flex-col justify-between overflow-hidden">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6">Product Information</DialogTitle>
            <DialogDescription asChild></DialogDescription>
          </DialogHeader>
        </ScrollArea>
        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">
              <ChevronLeftIcon />
              Back
            </Button>
          </DialogClose>
          <Button type="button">Read More</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
