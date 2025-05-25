'use client';

import { useToast } from '../../hooks/use-toast';
import { Button } from '../atoms/Button';

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
