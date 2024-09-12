<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Credentials</title>
    <style>
        /* Tailwind CSS */
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    </style>
</head>
<body class="bg-gray-100 font-sans leading-normal tracking-normal">

    <table class="bg-white w-full max-w-lg m-auto shadow-lg rounded-lg overflow-hidden">
        <tbody>
            <tr>
                <td class="p-6">
                    <h2 class="text-2xl font-semibold mb-2">User Credentials</h2>
                    <p class="text-gray-700">Hello <strong>{{ $user->name }}</strong>,</p>
                    <p class="text-gray-700">Your account has been created successfully. Here are your credentials:</p>
                    <ul class="text-gray-700 list-disc pl-5 mt-2">
                        <li><strong>User ID (Email):</strong> {{ $user->email }}</li>
                        <li><strong>Password:</strong>{{  $user->password }}</li>
                    </ul>
                    <p class="text-gray-700">Please keep these credentials safe and do not share them with anyone.</p>
                    <p class="text-gray-700">Thank you.</p>
                </td>
            </tr>
        </tbody>
    </table>

</body>
</html>
