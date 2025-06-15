import { Check, Clock, Info, Newspaper, PackageSearch, X } from 'lucide-react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Separator } from '../../ui/separator';
import { Label } from '../../atoms/Label';
import { Badge } from '../../atoms/Badge';
import type { DummyProductType } from '../../../types/dummy-product-types';

type DialogTableProps = {
  product: DummyProductType;
};

export function DialogTable({ product }: DialogTableProps) {
  const statusIconMap = {
    approved: {
      icon: <Check className="w-4 h-4 text-white" />,
      bgColor: 'bg-teal',
      textColor: 'text-teal',
    },
    pending: {
      icon: <Clock className="w-4 h-4 text-white" />,
      bgColor: 'bg-gold',
      textColor: 'text-gold',
    },
    rejected: {
      icon: <X className="w-4 h-4 text-white" />,
      bgColor: 'bg-destructive',
      textColor: 'text-destructive',
    },
  };

  const statusColorMap: Record<string, 'growth' | 'gold' | 'destructive'> = {
    approved: 'growth',
    pending: 'gold',
    rejected: 'destructive',
  };

  const statusData = statusIconMap[
    product.status as keyof typeof statusIconMap
  ] || {
    icon: <Clock className="w-4 h-4 text-white" />,
    bgColor: 'bg-gray-400',
    textColor: 'text-gray-600',
  };
  const approvalStatus = product.status_approval?.toLowerCase() || 'pending';
  const badgeVariant = statusColorMap[approvalStatus] || 'growth';

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
              <div className={`rounded-full p-1 ${statusData.bgColor}`}>
                {statusData.icon}
              </div>
            </div>
            <div>
              <p className={`${statusData.textColor} font-semibold`}>
                25 Desember 2025
              </p>
              <p className="text-sm">
                Status:{' '}
                <strong
                  className={`${statusData.textColor} font-semibold uppercase`}
                >
                  {product.status}
                </strong>
                .
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
            <Badge variant={badgeVariant}>
              {approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)}
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
