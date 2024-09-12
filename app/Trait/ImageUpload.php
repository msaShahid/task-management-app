<?php

namespace App\Trait;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

trait ImageUpload
{
    public function uploadImage($image,$uploadDirPath){
        if ($image) {
            $randomString = Str::random();  
            $imageName = $randomString . '.' . $image->getClientOriginalExtension(); 
            return $image->storeAs($uploadDirPath, $imageName, 'public');
        }
        return null;
    }

    public function updateImage($currentImage,$image,$uploadDirPath){
        
        if ($image) {
            if ($currentImage && Storage::disk('public')->exists($currentImage)) {
                Storage::disk('public')->delete($currentImage);
            }
            return $this->uploadImage($image,$uploadDirPath);
        }

        // Return current image path if no new image is provided.
        return $currentImage;

    }

    public function deleteImage($currentImage){
        
        if ($currentImage && Storage::disk('public')->exists($currentImage)) {
            Storage::disk('public')->delete($currentImage);
        }

    }


}
