FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Netice.Api/Netice.Api.csproj", "Netice.Api/"]
RUN dotnet restore "Netice.Api/Netice.Api.csproj"
COPY . .
WORKDIR "/src/Netice.Api"
RUN dotnet build "Netice.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Netice.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Netice.Api.dll"]
