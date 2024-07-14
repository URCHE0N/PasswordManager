FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 7095

ENV ASPNETCORE_URLS=http://+:7095

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["PasswordManager.Server/PasswordManager.Server/PasswordManager.Server.csproj", "PasswordManager.Server/PasswordManager.Server/"]
RUN dotnet restore "PasswordManager.Server/PasswordManager.Server/PasswordManager.Server.csproj"
COPY . .
WORKDIR "/src/PasswordManager.Server/PasswordManager.Server"
RUN dotnet build "PasswordManager.Server.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "PasswordManager.Server.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PasswordManager.Server.dll"]
