import { Edit, Eye, Trash } from 'lucide-react';
import { Card, CardContent } from '../../components/atoms/Card';
import {
  createActionsColumn,
  createBadgeColumn,
  createSortableHeader,
} from '../../components/molecules/advanced-data-table/Column';
import { DataTable } from '../../components/molecules/advanced-data-table/DataTable';
import type { UserData } from '../../types/UserData';
import { dummyUsers } from '../../helper/dummy/user-dummy';
import type { Row } from '@tanstack/react-table';
import { AvatarUser } from '../../components/atoms/Avatar';
import { useTitle } from '../../hooks/services/use-title';
import { useMemo } from 'react';
// import { useUsers } from '../hooks/services/use-users';

export default function UserManagementPage() {
  // Fetch data from the API
  //   const { data } = useUsers();
  //   const users = data?.data?.users ?? [];
  useTitle('User Management | Prism');
  const users = dummyUsers;
  const columns = useMemo(() => [
    {
      accessorKey: 'fullname',
      header: 'Full Name',
      cell: ({ row }: { row: Row<UserData> }) => {
        const { firstname, lastname } = row.original;

        return (
          <div className="flex items-center gap-3">
            <AvatarUser firstname={firstname} lastname={lastname} />
            <div className="font-medium">
              {firstname} {lastname}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: createSortableHeader<UserData>('Email', 'email'),
      cell: ({ row }: { row: Row<UserData> }) => {
        return <div className="text-sm">{row.getValue('email')}</div>;
      },
    },
    createBadgeColumn<UserData>('Role', 'role', {
      admin: 'destructive',
      manager: 'default',
      user: 'secondary',
      guest: 'outline',
    }),
    {
      accessorKey: 'created_at',
      header: 'Tanggal Pembuatan',
      cell: ({ row }: { row: Row<UserData> }) => {
        const rawDate = row.getValue('created_at') as string;
        const formattedDate = new Date(rawDate).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        return <div className="text-sm">{formattedDate}</div>;
      },
    },
    createActionsColumn<UserData>([
      {
        label: 'View Details',
        onClick: (data) => console.log('View', data),
        icon: <Eye className="h-4 w-4" />,
      },
      {
        label: 'Edit',
        onClick: (data) => console.log('Edit', data),
        icon: <Edit className="h-4 w-4" />,
      },
      {
        label: 'Delete',
        onClick: (data) => console.log('Delete', data),
        icon: <Trash className="h-4 w-4" />,
      },
    ]),
  ], []);


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
    <div className="mx-auto w-full h-full sm:px-4 lg:px-6">
      <Card className="overflow-hidden shadow-sm sm:rounded-lg">
        <div className="px-6 py-4 gap-1">
          <h1 className="text-foreground text-3xl font-semibold">
            User Management
          </h1>
          <p className="text-foreground text-sm font-light">
            Manage your team members and their account permission here.
          </p>
        </div>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={users}
            searchKey="email"
            searchPlaceholder="Cari berdasarkan email..."
            exportData={true}
            exportFilename="user-data"
            enableGrouping={false}
            enableExpanding={true}
            renderDetailPanel={renderDetailPanel}
            enableFilters={true}
            enableSavedViews={true}
            variant="card"
            savedViews={[]}
            onSaveView={(view) => console.log('Save view', view)}
            onDeleteView={(viewId) => console.log('Delete view', viewId)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
