'use client';

import { Button } from '../atoms/Button';
import { useToast } from '../hook/use-toast';

export function ToastCustom() {
  const { addToast } = useToast();

  return (
    <Button
      onClick={() => {
        console.log('Click Triggered'); // log ini muncul?
        addToast({
          title: 'Toast Berhasil!',
          description: 'Ini adalah pesan toast.',
          variant: 'default',
        });
      }}
    >
      Show Toast
    </Button>
  );
}
