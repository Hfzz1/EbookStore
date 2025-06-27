import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

// Import Komponen UI
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProductCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        author: '',
        description: '',
        price: '',
        cover_image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            onSuccess: () => reset(), // Reset form setelah berhasil submit
        });
    };

    return (
        <AppLayout>
            <Head title="Add New Product" />
            <div className="p-4 sm:p-6 lg:p-8">
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Add New Product</CardTitle>
                        <CardDescription>Fill in the details to add a new ebook to the store.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="author">Author</Label>
                                <Input id="author" value={data.author} onChange={(e) => setData('author', e.target.value)} required />
                                <InputError message={errors.author} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="price">Price (in Rupiah)</Label>
                                <Input id="price" type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} required />
                                <InputError message={errors.price} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="cover_image">Cover Image</Label>
                                <Input
                                    id="cover_image"
                                    type="file"
                                    onChange={(e) => setData('cover_image', e.target.files ? e.target.files[0] : null)}
                                    required
                                />
                                <InputError message={errors.cover_image} className="mt-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Create Product</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
