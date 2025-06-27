// Lokasi: resources/js/pages/Admin/Users/Index.tsx

import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

// Import komponen UI yang kita butuhkan
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
    users: User[];
}

export default function UsersIndex({ users }: Props) {
    const handleDelete = (user: User) => {
        router.delete(route('admin.users.destroy', user.id), {
            preserveScroll: true, // Agar halaman tidak scroll ke atas setelah aksi
        });
    };

    return (
        <AppLayout>
            <Head title="Manage Users" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base leading-6 font-semibold text-foreground">Users</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            A list of all the users in your account including their name, title, email and role.
                        </p>
                    </div>
                    {/* === TAMBAHKAN TOMBOL INI === */}
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href={route('admin.users.create')}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add user
                        </Link>
                    </div>
                    {/* === AKHIR BAGIAN TOMBOL === */}
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-border">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-foreground sm:pl-0">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                                            Role
                                        </th>
                                        <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {users.map((user) => (
                                        <tr key={user.email}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-foreground sm:pl-0">
                                                {user.name}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-muted-foreground">{user.email}</td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-muted-foreground">{user.role}</td>
                                            <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                <Link
                                                    href={route('admin.users.edit', user.id)}
                                                    className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </Link>
                                                {user.email !== 'admin@example.com' && (
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="destructive" size="sm">
                                                                Delete
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Are you sure?</DialogTitle>
                                                                <DialogDescription>
                                                                    This action cannot be undone. This will permanently delete the account for{' '}
                                                                    <strong>{user.name}</strong>.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button variant="secondary">Cancel</Button>
                                                                </DialogClose>
                                                                <DialogClose asChild>
                                                                    <Button variant="destructive" onClick={() => handleDelete(user)}>
                                                                        Delete User
                                                                    </Button>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
