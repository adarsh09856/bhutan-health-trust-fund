import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const ConfirmationContext = createContext<(message: string) => Promise<boolean>>(async () => false);

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const resolve = useRef<((accepted: boolean) => void) | null>(null);
  function finish(accepted: boolean) {
    resolve.current?.(accepted);
    resolve.current = null;
    setMessage(null);
  }
  useEffect(() => () => { resolve.current?.(false); }, []);
  function confirm(message: string) {
    resolve.current?.(false);
    setMessage(message);
    return new Promise<boolean>(done => { resolve.current = done; });
  }
  return <ConfirmationContext.Provider value={confirm}>
    {children}
    <AlertDialog open={message !== null} onOpenChange={open => { if (!open) finish(false); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm removal</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => finish(false)}>Keep record</AlertDialogCancel>
          <AlertDialogAction onClick={() => finish(true)}>Remove record</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </ConfirmationContext.Provider>;
}

export function useConfirmation() { return useContext(ConfirmationContext); }
