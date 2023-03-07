<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Word;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class WordController extends Controller
{
    public function createWord(Request $request)
    {
        $request->validate([
            'idCategory' => 'required',
            'word' => 'required',
            'description' => 'required',
            'word_ca' => 'required',
            'description_ca' => 'required',
        ]);

        $word = new Word();
        $word->idCategory = $request->idCategory;
        $word->word = $request->word;
        $word->description = $request->description;
        $word->word_ca = $request->word_ca;
        $word->description_ca = $request->description_ca;

        if ($word->save()) {
            return response()->json($word->id, Response::HTTP_CREATED);
        }
    }

    public function listWords(Request $request) {
        $wordsList = DB::select(DB::raw('SELECT id FROM words'));
        return response()->json(["wordsList" => $wordsList], Response::HTTP_OK);
    }
}
