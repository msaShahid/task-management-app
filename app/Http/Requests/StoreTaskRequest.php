<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
            "project_id" => ['required','exists:projects,id'],
            "assigned_user_id" => ['required','exists:users,id'],
            "due_date" => ['nullable','date'],
            "status" => ['required', Rule::in(['Pending','Inprogress','Completed'])],
            "priority" => ['required', Rule::in(['low','medium','high'])],  
        ];
    }
}
