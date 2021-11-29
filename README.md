# ServerUtils Downloads
A wrapper for https://repo.fvdh.dev/ to download [ServerUtils](https://www.spigotmc.org/resources/79599/) binaries.

## API Syntax
- Download Binary:
  ```html
  https://serverutils.fvdh.dev/api/v1/{platform}/{version}
  ```

- Binary Hash:
  ```html
  https://serverutils.fvdh.dev/api/v1/{platform}/{version}/{hash}
  ```

## Variable Explanation
- `{project}` is a ServerUtils Platform. Values: `Bukkit`, `Bungee`, `Velocity`
- `{version}` is the version to download. Examples: `3.2.0`, `latest`
- `{hash}` is a hash algorithm. Values: `md5`, `sha1`, `sha256`, `sha512`

## Examples
- url: https://serverutils.fvdh.dev/api/v1/Bukkit/latest
- curl:
  ```bash
  curl -L -o ServerUtils-Bukkit.jar https://serverutils.fvdh.dev/api/v1/Bukkit/latest
  ```
- wget:
  ```bash
  wget -O ServerUtils-Bukkit.jar https://serverutils.fvdh.dev/api/v1/Bukkit/latest
  ```
