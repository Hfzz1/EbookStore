import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    product: Product;
}

export default function ProductShow({ product }: Props) {
    return (
        <AppLayout>
            <Head title={product.title} />

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Kolom Gambar */}
                    <div>
                        {product.cover_image_path ? (
                            <img
                                src={`/storage/${product.cover_image_path}`}
                                alt={product.title}
                                className="mx-auto w-full max-w-sm rounded-lg shadow-lg"
                            />
                        ) : (
                            <div className="flex h-96 w-full max-w-sm items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Kolom Detail & Aksi */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">{product.title}</h1>
                        <p className="mt-2 text-xl text-muted-foreground">by {product.author}</p>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Description</h2>
                            <p className="mt-2 text-base text-muted-foreground">{product.description || 'No description available.'}</p>
                        </div>

                        <div className="mt-auto pt-8">
                            <p className="text-3xl font-bold text-foreground">Rp{new Intl.NumberFormat('id-ID').format(Number(product.price))}</p>
                            <Button size="lg" className="mt-4 w-full">
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
