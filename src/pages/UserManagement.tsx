import { Card } from "../components/atoms/Card";
import { useUsers } from "../hooks/services/use-users";

export default function UserManagementPage() {
    const { data } = useUsers();
    const users = data?.data?.users ?? [];
    console.log(users)
    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <Card className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-foreground">You're logged in!</div>
                    <ul className="mb-4">
                        {users?.map((user: any) => (
                            <li key={user.id} className="flex justify-between items-center py-1">
                                <span>{user.name} ({user.email})</span>
                                <div>

                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
}
