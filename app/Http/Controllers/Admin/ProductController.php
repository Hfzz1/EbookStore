<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Menampilkan halaman daftar produk.
     */
    public function index()
    {
        // Nantinya akan mengirim data produk ke view
        return Inertia::render('admin/products/index', [
             'products' => Product::latest()->get(), // Mengambil semua produk, diurutkan dari yang terbaru
        ]);
    }

    /**
     * Menampilkan halaman form untuk membuat produk baru.
     */
    public function create()
    {
        return Inertia::render('admin/products/create');
    }

    /**
     * Menyimpan produk baru ke database.
     */
    public function store(Request $request)
    {
        // 1. Validasi data yang masuk dari form
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'cover_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi untuk file gambar
        ]);

        // 2. Simpan file gambar
        $imagePath = $request->file('cover_image')->store('product-covers', 'public');

        // 3. Buat produk baru di database
        Product::create([
            'title' => $validated['title'],
            'author' => $validated['author'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'cover_image_path' => $imagePath,
        ]);

        // 4. Redirect kembali ke halaman daftar produk
        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

     public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', [
            'product' => $product,
        ]);
    }

    /**
     * Memperbarui data produk di database.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Gambar tidak wajib diisi saat update
        ]);

        if ($request->hasFile('cover_image')) {
            // Hapus gambar lama jika ada
            if ($product->cover_image_path) {
                Storage::disk('public')->delete($product->cover_image_path);
            }
            // Simpan gambar baru
            $imagePath = $request->file('cover_image')->store('product-covers', 'public');
            $validated['cover_image_path'] = $imagePath;
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        // Hapus gambar sampul dari storage jika ada
        if ($product->cover_image_path) {
            Storage::disk('public')->delete($product->cover_image_path);
        }

        // Hapus data produk dari database
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
    }
}
