# Kally

Bot Discord multifuncional com musica, economia estilo Minecraft, diversao e utilidades.

Atualizado para 2026: aoi.js v6 + discord.js v14 + Express com headers de seguranca.

## Funcionalidades

- Sistema de musica (play, pause, skip, queue, loop, volume, shuffle)
- Economia Minecraft (coleta de madeira, craft de itens, daily reward)
- Comandos de diversao (coinflip, jokenpo, 8ball, dado, campo minado)
- Utilidades (userinfo, serverinfo, avatar, ping, uptime)
- Configuracao por servidor (prefixo, canal entrada/saida)
- Blacklist/whitelist
- Sistema de welcome/leave messages

## Stack

- [aoi.js](https://aoi.js.org/) v6
- [discord.js](https://discord.js.org/) v14
- [Express](https://expressjs.com/) v4
- [@distube/ytdl-core](https://github.com/distubejs/ytdl-core)

## Instalacao

```bash
npm install
cp .env.example .env
# Edite .env com seu TOKEN do Discord
npm start
```

## Variaveis de Ambiente

| Variavel | Descricao |
|----------|-----------|
| TOKEN | Token do bot Discord |
| PORT | Porta do servidor HTTP (default 3000) |

## Comandos

Prefixo padrao: `ky!`

### Musica
`play`, `pause`, `resume`, `skip`, `queue`, `shuffle`, `loop-song`, `loop-queue`, `volume`, `clear-queue`, `np`

### Economia
`daily`, `pegar-madeira`, `saldo`, `craftar`, `minerar`

### Diversao
`coinflip`, `jokenpo`, `8ball`, `dado`, `gado`, `campo-minado`

### Utilidade
`help`, `comandos`, `ping`, `botinfo`, `uptime`, `invite`, `avatar`, `randomavatar`, `servericon`, `userinfo`, `serverinfo`, `channelinfo`, `embed`, `anuncio`, `google`, `yt`, `length`, `upvote`, `doar`

### Configuracao
`setprefix`, `resetprefix`, `setjoin`, `resetjoin`, `setleave`, `resetleave`

### Admin (owner only)
`eval`, `djseval`, `blacklist`, `whitelist`, `mod`

## Licenca

MIT

---

Desenvolvido por [Gustavo](https://github.com/zlostc)
