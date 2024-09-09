FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS backend
COPY FluidRendererApi /source
WORKDIR /source
ARG TARGETARCH
RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet publish -a ${TARGETARCH/amd64/x64} --use-current-runtime --self-contained false -o /app

FROM node:22-alpine3.19 as frontend
COPY FluidRendererFrontend /source
WORKDIR /source
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci
RUN npm ci
RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final
WORKDIR /app
COPY --from=backend /app .
COPY --from=frontend /FluidRendererApi/wwwroot wwwroot
USER $APP_UID
ENTRYPOINT ["dotnet", "FluidRendererApi.dll"]
