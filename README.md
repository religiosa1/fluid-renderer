# Simple Fluid/Liquid template renderer

A simple web app to render [Fluid](https://github.com/sebastienros/fluid) .NET
templates with the provided JSON context.

## Deploy with docker

App can be launched with the provided docker file:

```sh
docker build . -t fluidrenderer

docker run -p 5005:8080 fluidrenderer
```

## Usage through API

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
