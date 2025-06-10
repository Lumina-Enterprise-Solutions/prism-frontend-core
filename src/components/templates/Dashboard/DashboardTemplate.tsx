import { Activity, ActivityIcon, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../../atoms/Card';
import { ChartAreaInteractive } from '../../molecules/ChartAreaInteractive';
import { DataTableCustoms } from '../../molecules/advanced-data-table/DataTableCustoms';
import { useMemo } from 'react';
import { dummyProduct } from '../../../helper/mock/product-dummy';
import type { DummyProductType } from '../../../types/dummy-product-types';
import {
  createBadgeColumn,
  createCopyableColumn,
  createSortableHeader,
} from '../../molecules/advanced-data-table/Column';
import type { Row } from '@tanstack/react-table';

export default function DashboardTemplate() {
  const products = dummyProduct;

  const columns = useMemo(
    () => [
      {
        accessorKey: 'product_name',
        header: createSortableHeader<DummyProductType>(
          'Product Name',
          'product_name'
        ),
        cell: ({ row }: { row: Row<DummyProductType> }) => {
          return <div className="text-sm">{row.getValue('product_name')}</div>;
        },
      },
      createCopyableColumn<DummyProductType>('Product Code', 'code'),
      createCopyableColumn<DummyProductType>('SKU', 'sku'),
      createBadgeColumn<DummyProductType>('Category', 'category', {
        Accessories: 'destructive',
        Label: 'default',
        Fabric: 'secondary',
        Elastic: 'gold',
      }),
      createBadgeColumn<DummyProductType>('Unit', 'unit', {
        Meter: 'destructive',
        Kilogram: 'default',
        Roll: 'secondary',
        Piece: 'gold',
        Pack: 'outline',
      }),
      {
        accessorKey: 'qty',
        header: createSortableHeader<DummyProductType>('Quantity', 'qty'),
        cell: ({ row }: { row: Row<DummyProductType> }) => {
          return (
            <div className="flex items-center gap-2">
              <ActivityIcon size={16} />
              <div className="text-sm">{row.getValue('qty')}</div>
            </div>
          );
        },
      },
    ],
    []
  );

  const renderDetailPanel = ({ row }: { row: any }) => {
    const user = row.original;

    return (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">
          User Details: {user.firstname} {user.lastname}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="text-base">{user.email}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Role</div>
            <div className="capitalize">{user.role}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Tanggal Dibuat</div>
            <div>
              {new Date(user.created_at).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="p-4 md:p-10 flex flex-wrap justify-center gap-4 tour-product-overview">
        {[...Array(5)].map((_, idx) => (
          <Card
            key={idx}
            className="w-full sm:w-[300px] px-6 py-4 flex items-center gap-4 shadow-sm hover:bg-muted/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted shadow-2xl text-muted-foreground">
              <Activity className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-md font-semibold text-foreground">
                Product overview
              </h1>
              <div className="flex items-center">
                <p className="text-sm text-muted-foreground">25 products</p>
                <div className="flex items-center text-growth-green ml-2 gap-1">
                  <p className="text-xs">28+</p>
                  <TrendingUp className="w-3 h-3" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="p-4 md:p-10 tour-chart">
        <ChartAreaInteractive />
      </div>

      {/* Table */}
      <CardContent className="px-4 md:px-10 pt-4 space-y-2">
        <h1 className="text-3xl font-semibold text-foreground tour-welcome">
          Table Product
        </h1>
        <DataTableCustoms
          columns={columns}
          data={products}
          enableGrouping={false}
          renderDetailPanel={renderDetailPanel}
        />
      </CardContent>
    </>
  );
}
