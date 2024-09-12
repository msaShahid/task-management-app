<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // authorize must be ture
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ['required','max:255'],
            "image" => ['nullable', 'image'],
            "description" => ['nullable','string'],
            "due_date" => ['nullable','date'],
            "status" => ['required', Rule::in(['Pending','Inprogress','Completed'])]
        ];
    }
}
