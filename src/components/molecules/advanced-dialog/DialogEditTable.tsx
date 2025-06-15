import { Check, Info, Newspaper, PackageSearch } from 'lucide-react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Separator } from '../../ui/separator';
import { Label } from '../../atoms/Label';
import { Badge } from '../../atoms/Badge';
import type { DummyProductType } from '../../../types/dummy-product-types';

type DialogEditTableProps = {
  product: DummyProductType;
};

export function DialogEditTable({ product }: DialogEditTableProps) {
  return (
    <>
      <DialogTitle className="flex items-center gap-4 text-foreground">
        <PackageSearch size={36} />
        <div className="gap-2">
          <h1 className="text-xl font-semibold">Details Products</h1>
          <p className="text-xs text-muted-foreground">
            Product code:{' '}
            <span className="text-foreground font-semibold">
              {product.code}
            </span>{' '}
            SKU:{' '}
            <span className="text-foreground font-semibold">{product.sku}</span>
          </p>
        </div>
      </DialogTitle>
      <Separator />
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1 flex flex-col gap-2 px-2">
          <Label className="font-semibold pb-2 flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            Status
          </Label>
          <div className="space-y-4 border-l-2 border-green-500 pl-6 relative">
            <div className="absolute -left-3 top-0">
              <div className="rounded-full bg-teal p-1">
                <Check className="text-background w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-green-700 font-semibold">12 Desember 2025</p>
              <p className="text-sm">
                Proses pembuatan produk dimulai oleh{' '}
                <span className="font-semibold">{product.created_by}</span>.
              </p>
            </div>
            <div className="absolute -left-3 top-[85px]">
              <div className="rounded-full bg-teal p-1">
                <Check className="text-background w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-green-700 font-semibold">18 Desember 2025</p>
              <p className="text-sm">
                Produk telah diperbarui, kuantitas saat ini: {product.qty}.
              </p>
            </div>
            <div className="absolute -left-3 top-[180px]">
              <div className="rounded-full bg-teal p-1">
                <Check className="text-background w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-green-700 font-semibold">25 Desember 2025</p>
              <p className="text-sm">
                Status: <strong>Completed</strong>.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 gap-2">
          <div className="pb-2 gap-4">
            <Label className="font-semibold pb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Details
            </Label>
            <div className="pb-2">
              <Label className="font-semibold text-sm pb flex items-center">
                Supplier Name :
              </Label>
              <p className="text-sm">{product.supplier}</p>
            </div>
            <div className="grid grid-cols-2 pb-2">
              <div className="col-span-1">
                <Label className="font-semibold text-sm pb flex items-center">
                  From :
                </Label>
                <p className="text-sm">{product.location}</p>
              </div>
              <div className="col-span-1">
                <Label className="font-semibold text-sm pb flex items-center">
                  To :
                </Label>
                <p className="text-sm">{product.destination_transfer || '-'}</p>
              </div>
            </div>
          </div>
          <div className="gap-2">
            <Label className="font-semibold pb-2 flex items-center">
              Status Approval
            </Label>
            <Badge variant="growth">
              {product.status_approval || 'Pending'}
            </Badge>
          </div>
          <p className="text-sm py-2">
            Approve by :{' '}
            <span className="font-semibold">{product.approved_by || '-'}</span>
          </p>
        </div>
      </div>
    </>
  );
}
