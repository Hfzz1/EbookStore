// File: resources/js/pages/Admin/Products/Edit.tsx

import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';

// Import komponen UI
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Props {
    product: Product;
}

export default function ProductEdit({ product }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: product.title,
        author: product.author,
        description: product.description || '',
        price: product.price,
        cover_image: null as File | null,
        // _method: 'PUT', // Memberitahu Laravel kita ingin melakukan update
    });

    // State untuk preview gambar
    const [preview, setPreview] = useState<string | null>(product.cover_image_path ? `/storage/${product.cover_image_path}` : null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('cover_image', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Gunakan method POST karena kita mungkin mengirim file
        post(route('admin.products.update', product.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit Product: ${product.title}`} />
            <div className="p-4 sm:p-6 lg:p-8">
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Edit Product</CardTitle>
                        <CardDescription>Update product information below.</CardDescription>
                    </CardHeader>
                    {/* === BAGIAN INI YANG SEBELUMNYA KOSONG === */}
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
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} required />
                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="cover_image">New Cover Image (Optional)</Label>
                                {preview && <img src={preview} alt="Cover preview" className="mt-2 h-32 w-auto rounded" />}
                                <Input id="cover_image" type="file" onChange={handleImageChange} />
                                <p className="mt-1 text-sm text-muted-foreground">Leave blank if you don't want to change the image.</p>
                                <InputError message={errors.cover_image} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Update Product</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
