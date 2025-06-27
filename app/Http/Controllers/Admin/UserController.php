<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User; // <-- Import model User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia; // <-- Import Inertia

class UserController extends Controller
{
    /**
     * Menampilkan daftar semua resource pengguna.
     */
    public function index()
    {
        // Ambil semua data pengguna dari database
        $users = User::all();

        // Kirim data users ke komponen React 'Admin/Users/Index'
        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/users/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => ['required', Rule::in(['admin', 'user'])],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        // Buat user baru dengan data yang sudah divalidasi
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']), // Jangan lupa hash password
        ]);

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => ['required', Rule::in(['admin', 'user'])],
        ]);

        $user->update($validated);

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        if ($user->id === Auth::id()) {
            return back()->withErrors(['general' => 'You cannot delete your own account.']);
        }
        $user->delete();
        return redirect()->route('admin.users.index');
    }
}
