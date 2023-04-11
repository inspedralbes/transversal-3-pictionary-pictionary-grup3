<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function createCategory(Request $request)
    {
        $request->validate([
            'idUser' => 'required',
            'category' => 'required',
        ]);

        $category = new Category();
        $category->idUser = auth()->user()->id;
        $category->category = $request->category;

        if ($category->save()) {
            return response()->json($category->id, Response::HTTP_CREATED);
        }
    }

    public function listCategories() {
        $categoriesList = DB::table('categories')->where('idUser', 1)->orWhere('idUser', auth()->user()->id)->select('id', 'idUser', 'category')->get();
        return response()->json(["categoriesList" => $categoriesList], Response::HTTP_OK);
    }
}
