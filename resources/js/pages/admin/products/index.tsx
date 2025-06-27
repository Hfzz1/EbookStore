// Lokasi: resources/js/pages/Admin/Products/Index.tsx

import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react'; // [1] Tambahkan 'router'

// [2] Import komponen UI yang dibutuhkan
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
    products: Product[];
}

export default function ProductsIndex({ products }: Props) {
    // [3] Buat fungsi untuk menangani penghapusan
    const handleDelete = (product: Product) => {
        router.delete(route('admin.products.destroy', product.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Manage Products" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base leading-6 font-semibold text-foreground">Products</h1>
                        <p className="mt-2 text-sm text-muted-foreground">A list of all the products in your store.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href={route('admin.products.create')}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Add product
                        </Link>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full divide-y divide-border">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-foreground sm:pl-0">
                                        Cover
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                                        Title
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                                        Author
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">
                                        Price
                                    </th>
                                    <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-foreground sm:pl-0">
                                            {product.cover_image_path ? (
                                                <img
                                                    src={`/storage/${product.cover_image_path}`}
                                                    alt={product.title}
                                                    className="h-16 w-12 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-16 w-12 items-center justify-center rounded bg-secondary text-xs text-muted-foreground">
                                                    No Image
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-muted-foreground">{product.title}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-muted-foreground">{product.author}</td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-muted-foreground">
                                            Rp{new Intl.NumberFormat('id-ID').format(Number(product.price))}
                                        </td>

                                        {/* [4] MODIFIKASI: Ganti komentar dengan tombol-tombol aksi
                                         */}
                                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                            {/* Tombol Edit akan kita fungsikan selanjutnya */}
                                            <Link
                                                href={route('admin.products.edit', product.id)}
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>

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
                                                            This action cannot be undone. This will permanently delete the product:{' '}
                                                            <strong>{product.title}</strong>.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="secondary">Cancel</Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button variant="destructive" onClick={() => handleDelete(product)}>
                                                                Delete Product
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
