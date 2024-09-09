# Simple Fluid/Liquid template renderer

A primitive web app to render [Fluid](https://github.com/sebastienros/fluid)
templates in .NET with the provided JSON context.

Gives you two texareas, one for template, one for context (provided as a JSON
object) and the "render" button.

## Manual build

To build the frontend:

```sh
cd FluidRendererFrontend
npm ci
npm run build
```

It will create a `wwwroot` in the backend directory.

Then in root dir:

```sh
cd ../FluidRendererApi
dotnet publish
cp -r FluidRendererApi/wwwroot publish/wwwroot
```

To launch the app, run the publish dir (change the port in urls to the one you
want):

```sh
dotnet FluidRendererApi.dll --urls http://localhost:9345
```

## Deploy with docker

App can be launched with the provided docker file:

```sh
docker build . -t fluidrenderer

docker run -p 5005:8080 fluidrenderer
```

## Usage through the API

```
POST /api/render:

{
  "template": "foo {{bar}}",
  "context": {
    "bar": "biz"
  }
}
```

will return:

```
{
  "success": true,
  "data": "foo biz",
  "error": null
}
```
