// File: resources/js/pages/dashboard.tsx

import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types'; // [1] Import tipe Product
import { Head, Link } from '@inertiajs/react';

// [2] Definisikan props yang diterima halaman ini
interface Props {
    products: Product[];
}

export default function Dashboard({ products }: Props) {
    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base leading-6 font-semibold text-foreground">Welcome to our Store!</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Discover our latest collection of amazing ebooks.</p>
                    </div>
                </div>

                {/* === [3] BAGIAN UNTUK MENAMPILKAN PRODUK === */}
                <div className="mt-8">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
                                >
                                    {/* Link ini akan kita fungsikan nanti untuk ke halaman detail produk */}
                                    <Link href={route('products.show', product.id)} className="block">
                                        <div className="aspect-[3/4] overflow-hidden">
                                            {product.cover_image_path ? (
                                                <img
                                                    src={`/storage/${product.cover_image_path}`}
                                                    alt={product.title}
                                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-secondary">
                                                    <span className="text-sm text-muted-foreground">No Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-foreground">{product.title}</h3>
                                            <p className="mt-1 text-sm text-muted-foreground">{product.author}</p>
                                            <p className="mt-2 font-semibold text-foreground">
                                                Rp{new Intl.NumberFormat('id-ID').format(Number(product.price))}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed p-8 text-center">
                            <h3 className="font-semibold">No Products Yet</h3>
                            <p className="mt-2 text-sm text-muted-foreground">There are no products available in the store right now.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
