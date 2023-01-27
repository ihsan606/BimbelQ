<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
{{--    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet">--}}
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,300&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
    @vite('resources/css/app.css')
    <style>
      body {
        background-color: white;
          font-family: 'Open Sans', sans-serif;
      }
    </style>
  </head>
  <body>

      @inertia

  </body>
</html>
