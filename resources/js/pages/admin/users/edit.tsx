import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// Import komponen UI
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Terima 'user' sebagai props dari controller
interface Props {
    user: User;
}

export default function UserEdit({ user }: Props) {
    // Gunakan useForm dari Inertia untuk state management form
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Kirim data menggunakan method PUT ke rute 'admin.users.update'
        put(route('admin.users.update', user.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit User: ${user.name}`} />

            <div className="p-4 sm:p-6 lg:p-8">
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Edit User</CardTitle>
                        <CardDescription>Update user information below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="role">Role</Label>
                                <Select onValueChange={(value) => setData('role', value)} defaultValue={data.role}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.role} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Update User</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
