const { AoiClient } = require('aoi.js');
require('dotenv').config();

const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.get('/', (req, res) => {
  res.json({ name: 'Kally Bot API', version: '2.0.0', status: 'online', uptime: process.uptime() });
});

app.use('/.well-known', (req, res) => res.status(204).end());
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.listen(process.env.PORT || 3000, () => {
  console.log(`[KALLY] Servidor HTTP rodando na porta ${process.env.PORT || 3000}`);
});

const bot = new AoiClient({
  token: process.env.TOKEN,
  prefix: ['ky!', '$getServerVar[prefixo]'],
  intents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildVoiceStates', 'GuildMembers'],
  events: ['onMessage', 'onJoin', 'onLeave', 'onReady', 'onInteractionCreate'],
  database: {
    type: 'aoi.db',
    db: require('@akarui/aoi.db'),
    tables: ['main'],
    path: './database/',
    extraOptions: { dbType: 'aoi.db' },
  },
  mobilePlatform: true,
  respondOnEdit: {
    commands: true,
    nonPrefixed: true,
    time: 5000,
  },
  suppressAllErrors: false,
  errorMessage: ['<a:errado:817270804386807858> Ocorreu um erro ao executar este comando.'],
});

bot.variables({
  prefixo: 'ky!',
  corno: 'gay',
  bl: 'false',
  entrada: 'null',
  saida: 'null',
  madeira: '0',
  tabua: '0',
  graveto: '0',
  varadepesca: 'nao tem',
  picareta: 'nenhuma',
  esmeralda: '0',
  dinheiro: '0',
});

bot.status([
  { text: 'Me mencione para ver o meu prefix!', type: 'LISTENING', time: 7 },
  { text: 'Duvidas? Bugs? Reporte no servidor de suporte: https://discord.gg/AP6ayagqUN', type: 'LISTENING', time: 7 },
  { text: 'Faz $uptime que eu nao durmo!', type: 'PLAYING', time: 7 },
  { text: 'Ping: $ping | Ram: $ram | Cpu: $cpu', type: 'PLAYING', time: 7 },
  { text: 'Me siga no twitter: @BotKally', type: 'WATCHING', time: 7 },
  { text: 'Ja votou em mim? https://top.gg/bot/817207028169965589', type: 'LISTENING', time: 7 },
  { text: '$serverCount Servidores e $allMembersCount Membros!', type: 'WATCHING', time: 7 },
]);

bot.rateLimitCommand({
  channel: '841207264550715422',
  code: `Tomei ratelimit!
Timeout: $rateLimit[timeout]
Limite: $rateLimit[limit]
Metodo: $rateLimit[method]
Path: $rateLimit[path]
Rota: $rateLimit[route]`
});

bot.command({ name: '<@!817160910871330836>', code: '$addCmdReactions[<:a_gatonsd:828681458662506537>]', nonPrefixed: true });
bot.command({ name: '<@817160910871330836>', code: '$addCmdReactions[<:a_gatonsd:828681458662506537>]', nonPrefixed: true });
bot.command({ name: '<@!841785236084752464>', code: '$addCmdReactions[<:a_gatonsd:828681458662506537>]', nonPrefixed: true });
bot.command({ name: '<@841785236084752464>', code: '$addCmdReactions[<:a_gatonsd:828681458662506537>]', nonPrefixed: true });
bot.command({ name: '<@!817207028169965589>', code: `Ola <@$authorID>, o meu prefixo neste servidor e \`$getServerVar[prefixo]\`, use \`$getServerVar[prefixo]help\` para saber mais!`, nonPrefixed: true });
bot.command({ name: '<@817207028169965589>', code: `Ola <@$authorID>, o meu prefixo neste servidor e \`$getServerVar[prefixo]\`, use \`$getServerVar[prefixo]help\` para saber mais!`, nonPrefixed: true });

// ============ MUSICA ============
bot.command({
  name: 'play', aliases: ['p'],
  code: `$description[<a:cd:826947867624341605> Adicionado a fila: $playSong[$message;1m;yes;yes;Houve um erro ao tentar reproduzir a musica, tente novamente!]]
$footer[Comando requisitado por $username]
$color[DD105E]
$suppressErrors
$onlyIf[$message!=;Voce precisa dizer o nome de uma musica!]
$argsCheck[>1;Voce precisa dizer o nome de uma musica!]
$onlyIf[$voiceID!=;<@$authorID> Voce nao esta conectado a um canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'pause', aliases: ['pausar', 'stop'],
  code: `<:pause:830878614161457242> A musica foi pausada por <@$authorID>
$pauseSong
$onlyIf[$queueLength!=0;Nao tem nenhuma musica na fila.]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];Voce precisa estar no mesmo canal de voz.]
$onlyIf[$voiceID!=;Voce nao esta conectado a um canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'resume',
  code: `$resumeSong
<:resume:830878731832131654> Musica despausada.
$onlyIf[$queueLength!=0;Nao tem nenhuma musica na fila!]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];Voce precisa estar no mesmo canal de voz.]
$onlyIf[$voiceID!=;Voce nao esta conectado a um canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'skip', aliases: ['pular'],
  code: `$skipSong
<@$authorID> pulou a musica!
$onlyIf[$queueLength!=0;Nao tem nenhuma musica na fila!]
$onlyIf[$queueLength!=1;Nao tem outra musica para pular!]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];Voce precisa estar no mesmo canal de voz.]
$onlyIf[$voiceID!=;Voce nao esta conectado a um canal de voz.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'queue', aliases: ['q'],
  code: `$description[$queue[1;10;{number} - {title} (pedido por <@$songInfo[userID]>)]
Tocando agora: **$songInfo[title]**]
$onlyIf[$queueLength!=0;Nao tem nenhuma musica na fila!]
$onlyIf[$queueLength!=1;Precisa ter mais de 1 musica na fila!]
$color[DD105E]
$footer[Mostrando ate 9 musicas da fila]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'shuffle-queue', aliases: ['embaralhar', 'shuffle'],
  code: `<@$authorID> Embaralhou a fila de musicas.
$shuffleQueue
$onlyIf[$queueLength!=0;Nao tem nenhuma musica na fila.]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];Voce precisa estar no mesmo canal de voz.]
$onlyIf[$voiceID!=;Voce nao esta conectado a um canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'loop-song',
  code: `$description[Loop: $replaceText[$replaceText[$loopSong;true;ligado];false;desligado]]
$footer[Comando requisitado por: $username]
$color[DD105E]
$onlyIf[$queueLength!=0;Nao tem musica na fila!]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];Voce precisa estar no mesmo canal de voz.]
$onlyIf[$voiceID!=;Voce nao esta conectado ao canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'loop-queue',
  code: `$description[Loop da fila: $replaceText[$replaceText[$loopQueue;true;ligado];false;desligado]]
$footer[Comando requisitado por: $username]
$color[DD105E]
$onlyIf[$queueLength!=0;Nao tem musica na fila!]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];Voce precisa estar no mesmo canal de voz.]
$onlyIf[$voiceID!=;Voce nao esta conectado ao canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'volume',
  code: `$volume[$message[1]]
$description[<:volume:832027715947331614> Volume: **$message[1]%**]
$color[DD105E]
$onlyIf[$message<=100;Volume maximo e 100!]
$onlyIf[$message=>4;Volume minimo e 4!]
$onlyIf[$message!=;Diga um volume!]
$onlyIf[$queueLength!=0;Nao tem musica na fila.]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];Voce precisa estar no mesmo canal de voz.]
$onlyIf[$voiceID!=;Voce nao esta conectado a um canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'clear-queue', aliases: ['cq'],
  code: `$clearSongQueue
$stopSong
Fila limpa!
$onlyIf[$queueLength!=0;Nao tem musica na fila!]
$onlyIf[$voiceID!=;Voce nao esta conectado a um canal de voz.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'np', aliases: ['nowplaying'],
  code: `$title[$songInfo[title]]
$addField[URL:;[Clique Aqui]($songInfo[url])]
$addField[Duracao:;$songInfo[duration]]
$addField[Canal:;$songInfo[publisher]]
$addField[Tempo restante:;$songInfo[duration_left]]
$addField[Pedido por:;<@$songInfo[userID]>]
$footer[Comando requisitado por: $username]
$thumbnail[$songInfo[thumbnail]]
$color[DD105E]
$onlyIf[$queueLength!=0;Nao tem musica na fila]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

// ============ ECONOMIA ============
bot.command({
  name: 'daily',
  code: `$description[<:esmeralda:842166813236133949> <@$authorID> pegou $random[100;500] Esmeraldas no daily!]
$color[DD105E]
$setGlobalUserVar[esmeralda;$sum[$getGlobalUserVar[esmeralda];$random[100;500]]]
$globalCooldown[24h;<:timer:828671291992178708> Aguarde 24 horas.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'pegar-madeira',
  code: `$description[<:madeira:835708778846486609> <@$authorID> pegou 1 madeira!]
$color[DD105E]
$setGlobalUserVar[madeira;$sum[$getGlobalUserVar[madeira];1]]
$globalCooldown[10m;<:timer:828671291992178708> Aguarde 10 minutos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'bal', aliases: ['saldo', 'atm', 'balance', 'money', 'inventario'],
  code: `$color[DD105E]
<@$authorID>
$title[Inventario de $username[$findUser[$message]]]
$description[
<:madeira:835708778846486609> Madeiras: **$getGlobalUserVar[madeira;$findUser[$message]]**
<:tabua:835735687865040906> Tabuas: **$getGlobalUserVar[tabua;$findUser[$message]]**
<:stick:835860823418601512> Gravetos: **$getGlobalUserVar[graveto;$findUser[$message]]**
<:picareta_madeira:835733572350246942> Picareta: **$getGlobalUserVar[picareta;$findUser[$message]]**
<:varadepesca:837627634489884693> Vara de pesca: **$getGlobalUserVar[varadepesca;$findUser[$message]]**
<:esmeralda:842166813236133949> Esmeraldas: **$getGlobalUserVar[esmeralda;$findUser[$message]]**]
$thumbnail[$userAvatar[$findUser[$message]]]
$botTyping
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'craftar',
  code: `$description[<:tabua:835735687865040906> Tabua: \`$getServerVar[prefixo]craftar-tabua\` (1 Madeira)
<:picareta_madeira:835733572350246942> Picareta de Madeira: \`$getServerVar[prefixo]craftar-picareta-madeira\` (2 Gravetos + 3 Tabuas)
<:stick:835860823418601512> Graveto: \`$getServerVar[prefixo]craftar-graveto\` (2 Tabuas)]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'craftar-tabua',
  code: `$description[<:mesadetrabalho:835853739897126923> <@$authorID> Craftou 4 Tabuas por 1 Madeira.]
$setGlobalUserVar[madeira;$sub[$getGlobalUserVar[madeira];1]]
$setGlobalUserVar[tabua;$sum[$getGlobalUserVar[tabua];4]]
$color[DD105E]
$onlyIf[$getGlobalUserVar[madeira]>=1;Voce nao tem madeiras o suficiente!]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'craftar-graveto',
  code: `$description[<:mesadetrabalho:835853739897126923> <@$authorID> Craftou 4 Gravetos por 2 Tabuas.]
$setGlobalUserVar[tabua;$sub[$getGlobalUserVar[tabua];2]]
$setGlobalUserVar[graveto;$sum[$getGlobalUserVar[graveto];4]]
$color[DD105E]
$onlyIf[$getGlobalUserVar[tabua]>=2;Voce nao tem tabuas o suficiente!]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'craftar-picareta-madeira',
  code: `$description[<:mesadetrabalho:835853739897126923> <@$authorID> Craftou 1 Picareta por 2 Gravetos e 3 Tabuas.]
$setGlobalUserVar[tabua;$sub[$getGlobalUserVar[tabua];3]]
$setGlobalUserVar[graveto;$sub[$getGlobalUserVar[graveto];2]]
$setGlobalUserVar[picareta;de madeira]
$color[DD105E]
$onlyIf[$getGlobalUserVar[tabua]>=3;Voce nao tem tabuas o suficiente!]
$onlyIf[$getGlobalUserVar[graveto]>=2;Voce nao tem gravetos o suficiente!]
$onlyIf[$getGlobalUserVar[picareta]!=de madeira;Voce ja possui uma picareta!]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'minerar',
  code: `Esse comando ainda esta em teste!
$onlyIf[$getGlobalUserVar[picareta]!=nenhuma;Voce nao tem uma picareta!]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

// ============ DIVERSÃO ============
bot.command({
  name: 'coinflip',
  code: `$onlyIf[$message!=coroa;Voce apostou em coroa, resultado: $randomText[cara;coroa]]
$onlyIf[$message!=cara;Voce apostou em cara, resultado: $randomText[cara;coroa]]
$color[DD105E]
$description["$message" Invalido. Use: cara ou coroa]
$argsCheck[>1;Use: $getServerVar[prefixo]coinflip coroa ou cara]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'jokenpo',
  code: `$onlyIf[$message!=pedra;Voce jogou $message e eu joguei $randomText[Pedra, Empatamos; Papel, eu Ganhei; Tesoura, eu Perdi]]
$onlyIf[$message!=tesoura;Voce jogou $message e eu joguei $randomText[Pedra, eu Ganhei; Papel, eu Perdi; Tesoura, Empate]]
$onlyIf[$message!=papel;Voce jogou $message e eu joguei $randomText[Pedra, eu Perdi; Papel, Empate; Tesoura, eu Ganhei]]
$description["$message" Invalido. Use: pedra, papel ou tesoura.]
$argsCheck[>1;Use: $getServerVar[prefixo]jokenpo papel]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: '8ball',
  code: `$onlyIf[$checkContains[$message;?]==true;Sua pergunta nao contem "?"]
$description[**Pergunta:** $message
**Resposta:** $randomText[Nao.;Sim.;Nao sei.;Voce sabe.;Claro!;Claro que nao!;Talvez...;Logico;Obvio;Nao posso responder.;Adoro!;Sei la.]]
$color[DD105E]
$argsCheck[>1;Escreva alguma pergunta!]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'dado',
  code: `<@$authorID> Rolou um dado e caiu $random[1;6]!
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'gado',
  code: `<@$mentioned[1;yes]>, Voce e $random[0;100]% Gado.
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'campo-minado',
  code: `$title[Chegue ate o final sem se deparar com uma bomba!]
$description[||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:||
||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:||
||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:blue_square:|| ||:blue_square:|| ||:trophy:||
||:blue_square:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:blue_square:|| ||:blue_square:|| ||:blue_square:|| ||:bomb:|| ||:bomb:||
||:blue_square:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:blue_square:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:||
||:blue_square:|| ||:blue_square:|| ||:blue_square:|| ||:bomb:|| ||:blue_square:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:||
||:bomb:|| ||:bomb:|| ||:blue_square:|| ||:blue_square:|| ||:blue_square:|| ||:bomb:|| ||:bomb:|| ||:bomb:|| ||:bomb:||]
$color[DD015E]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

// ============ UTILIDADE ============
bot.command({
  name: 'help', aliases: ['ajuda'],
  code: `$description[<:San_Happy:828680343081975908> Ola **$username**, sou a Kally, bot de diversao, musica e minecraft! Prefixo: \`$getServerVar[prefixo]\`. Use \`$getServerVar[prefixo]comandos\` para ver meus comandos.
Feita com <:js:840758458592526336> **Javascript** e a package <:aoijs:837748431321694259> **Aoi.JS v6**. Tenho **$commandsCount** Comandos em **$serverCount** Servidores, **$allMembersCount** Membros e **$allChannelsCount** canais.
<:love:840969611511463937> **Amiguinhos: [Dark](https://discord.com/oauth2/authorize?client_id=750782444533186652&permissions=8&scope=bot), [Ayra](https://discord.com/oauth2/authorize?client_id=730826055018872862&scope=bot&permissions=281029662)**
**[Invite](https://discord.com/api/oauth2/authorize?client_id=817207028169965589&permissions=8&scope=bot) | [Servidor Suporte](https://discord.gg/wPWTHJY3Kw) | [Upvote](https://top.gg/bot/817207028169965589/vote) | [Twitter](https://twitter.com/BotKally?s=09)**]
$color[DD105E]
$title[Kally - Ajuda]
$thumbnail[$userAvatar[$clientID]]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'comandos',
  code: `$description[
<:um:825234716726525992> **Economia** (em desenvolvimento)
\`pegar-madeira\` | \`saldo\` | \`craftar\` | \`daily\`

<:dois:825234747260534784> **Musica**
\`play\` | \`np\` | \`loop-song\` | \`loop-queue\` | \`skip\` | \`stop\` | \`resume\` | \`queue\` | \`clear-queue\` | \`volume\` | \`shuffle\`

<:tres:825373654262611988> **Diversao**
\`coinflip\` | \`gado\` | \`jokenpo\` | \`8ball\` | \`dado\` | \`campo-minado\`

<:quatro:825975295793823774> **Utilidade**
\`botinfo\` | \`ping\` | \`avatar\` | \`invite\` | \`google\` | \`yt\` | \`servericon\` | \`userinfo\` | \`upvote\` | \`channelinfo\` | \`serverinfo\` | \`embed\` | \`anuncio\` | \`uptime\` | \`randomavatar\` | \`length\` | \`doar\`

<:cinco:826590783892095007> **Configuracao**
\`setprefix\` | \`resetprefix\` | \`setjoin\` | \`resetjoin\` | \`setleave\` | \`resetleave\`]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'ping',
  code: `<@$authorID>
$description[Ping: **$botPing**
Websocket: **$ping**]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'botinfo',
  code: `$description[
<:Pink_DeveloperTDM:828676357528617000> **Sobre o Criador:**
<:id:828673062479200297> Tag: **$username[817160910871330836]**
<:info:828675097292177460> ID: **817160910871330836**
<:emoji_17:840422660953210940> Twitter: [@ydroxz007](https://twitter.com/ydroxz007?s=09)

<:id:828673062479200297> **Sobre a Kally (bot):**
<:aoijs:837748431321694259> Package: [Aoi.JS v6](https://discord.gg/RbMmfqZyB9)
<:copiar:828675328255328307> Plataforma: Linux
<:Code:828675849720823821> CPU: **$cpu%/100%**
<:memoryram:828673704132345856> RAM: **$ram mb**
<:id:828673062479200297> Tag: **Kally#5904**
<:info:828675097292177460> ID: **817207028169965589**

<:review:828672852143112213> **Estatisticas:**
<:blacklisted:828673331036291146> Servidores: **$serverCount**
<:users:828672510030643260> Membros: **$allMembersCount**
<:timer:828671291992178708> Uptime: **$uptime**
<a:load:828671640384307280> Ping: **$ping**
<:gilmar:831927656362278962> Emojis: **$allEmojiCount**
<:canal:834797788209348689> Canais: **$allChannelsCount**
<:config:828671920965943407> Criacao: **04/03/2021 as 22:28**
<:Business:828673559295164436> Comandos: **$commandsCount**]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'uptime',
  code: `$description[<:timer:828671291992178708> <@$authorID> Estou online ha **$uptime**!]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'invite',
  code: `$color[DD105E]
$description[Clique [aqui](https://discord.com/api/oauth2/authorize?client_id=817207028169965589&permissions=8&scope=bot) para me adicionar!]
<@$authorID>
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'upvote',
  code: `$description[<a:topgg:831230227731841074> Clique [aqui](https://top.gg/bot/817207028169965589/vote) para votar em mim no top.gg!]
$color[DD105E]
$footer[Cada voto ajuda mais pessoas a me conhecerem!]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'doar',
  code: `$description[<:dinheirokally:844953382288228353> Clique [aqui](https://discord.gg/jA7hgV5yhA) para doar]
$color[DD105E]
$footer[Estamos arrecadando doacoes para me manter online]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'avatar',
  code: `<@$authorID>
$author[Avatar de $username[$message[1]]]
$description[<:download:827653725521838121> Clique [aqui]($userAvatar[$message[1]]) para baixar]
$image[$userAvatar[$message[1]]]
$color[DD105E]
$suppressErrors[ID invalido!]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]
$argsCheck[>1;]
$onlyIf[$checkContains[$message[1];@]==false;]`
});

bot.command({
  name: 'avatar',
  code: `<@$authorID>
$author[Avatar de $username[$authorID]]
$description[<:download:827653725521838121> Clique [aqui]($userAvatar[$authorID]) para baixar]
$image[$userAvatar[$authorID]]
$color[DD105E]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]
$argsCheck[0;]
$onlyIf[$checkContains[$message[1];@]==false;]`
});

bot.command({
  name: 'avatar',
  code: `<@$authorID>
$author[Avatar de $username[$mentioned[1]]]
$description[<:download:827653725521838121> Clique [aqui]($userAvatar[$mentioned[1]]) para baixar]
$image[$userAvatar[$mentioned[1]]]
$color[DD105E]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]
$onlyIf[$checkContains[$message[1];@]==true;]
$onlyIf[$mentioned[1]!=;]
$argsCheck[>1;]`
});

bot.command({
  name: 'randomavatar',
  code: `$title[Avatar de $userTag[$randomUserID]]
$description[<:download:827653725521838121> Clique [aqui]($userAvatar[$randomUserID]) para baixar]
$image[$userAvatar[$randomUserID]]
$color[DD105E]
$footer[Avatar de um usuario aleatorio deste servidor.]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'servericon',
  code: `$color[DD105E]
$description[<:Doc:828682168078434344> [download]($serverIcon)]
$image[$serverIcon?size=2048]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'userinfo',
  code: `$thumbnail[$userAvatar[$mentioned[1;yes]]]
$color[DD105E]
$title[Informacoes de $userTag[$mentioned[1;yes]]]
$description[
<:id:828673062479200297> Tag: **$userTag[$mentioned[1;yes]]**
<:review:828672852143112213> ID: **$mentioned[1;yes]**
<:bot:834780123727134790> Bot: **$replaceText[$replaceText[$isBot[$mentioned[1;yes]];false;nao];true;sim]**
<:boost:834779219291799572> Impulsionando: **$replaceText[$replaceText[$isBoosting[$mentioned[1;yes]];false;nao];true;sim]**
<:calendario_branco:834813292521586759> Entrou ha: **$memberJoinedDate[$mentioned[1;yes];time]**
<:calendario_branco:834813292521586759> Conta criada ha: **$creationDate[$mentioned[1;yes];time]**]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'serverinfo',
  code: `$title[Informacoes do servidor]
$description[
<:id:828673062479200297> Nome: **$serverName**
<:review:828672852143112213> ID: **$guildID**
<a:owner:834777178667089920> Owner: **$username[$ownerID]**
<:boost:834779219291799572> Boost Level: **$serverBoostLevel**
<:boost:834779219291799572> Boosters: **$serverBoostCount**
<:canal:834797788209348689> Canais: **$channelCount** (Texto: $channelCount[text] | Voz: $channelCount[voice])
<:users:828672510030643260> Membros: **$sub[$membersCount;$botCount]** (Bots: $botCount)
<:Business:828673559295164436> Cargos: **$roleCount**
<:gilmar:831927656362278962> Emojis: **$emojiCount**]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'channelinfo',
  code: `$description[**Informacoes de** <#$mentionedChannels[1;yes]>
<:id:828673062479200297> Nome: **$channelName[$mentionedChannels[1;yes]]**
<:review:828672852143112213> ID: **$channelID[$channelName[$mentionedChannels[1;yes]]]**
<:hehehe:834818796493209640> NSFW: **$replaceText[$replaceText[$channelNSFW[$mentionedChannels[1;yes]];true;sim];false;nao]**
<:canal:834797788209348689> Topico: **$replaceText[$channelTopic[$mentionedChannels[1;yes]];none;Nenhum]**
<:timer:828671291992178708> Slowmode: **$getChannelSlowmode[$mentionedChannels[1;yes]] segundos**]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'embed',
  code: `$description[$message]
$color[RANDOM]
$footer[Embed enviada por: $username / $authorID]
$argsCheck[>1;Escreva algo!]
$onlyPerms[manageserver;Permissao Gerenciar Servidor necessaria.]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'anuncio', aliases: ['anunciar'],
  code: `Fiz um anuncio em <#$mentionedChannels[1]>.
$channelSendMessage[$mentionedChannels[1];{description:$noMentionMessage}{footer:Anunciado por $userTag / $authorID}{color:RANDOM}]
$onlyIf[$noMentionMessage!=;Use: $getServerVar[prefixo]anunciar <canal> <mensagem>]
$onlyIf[$mentionedChannels[1]!=;Use: $getServerVar[prefixo]anunciar <canal> <mensagem>]
$onlyPerms[manageserver;Permissao Gerenciar Servidor necessaria.]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'google',
  code: `$color[#ffffff]
$description[Url: [clique aqui](https://www.google.com/search?q=$replaceText[$message; ;+;-1])
Pesquisa: **$message**
Quem pesquisou: **$username**]
$argsCheck[>1;Digite algo para pesquisar!]
$onlyNSFW[Este comando so pode ser executado em canais NSFW.]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'yt',
  code: `$description[Url: [clique aqui](https://www.youtube.com/results?search_query=$replaceText[$message; ;+;-1])
Pesquisa: **$message**
Quem pesquisou: **$username**]
$color[df0a0a]
$argsCheck[>1;Digite algo para pesquisar!]
$onlyNSFW[Este comando so pode ser executado em canais NSFW.]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'length',
  code: `$description[A mensagem **$message** possui **$charCount[$message]** Caracteres!]
$argsCheck[>1;Use: $getServerVar[prefixo]length <mensagem>]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> Aguarde 5 segundos.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

// ============ CONFIGURACAO ============
bot.command({
  name: 'setprefix',
  code: `<@$authorID> Meu prefixo neste servidor agora e \`$message\`
$setServerVar[prefixo;$message]
$argsCheck[>1;Voce precisa falar um novo prefixo!]
$onlyPerms[manageserver;Permissao Gerenciar Servidor necessaria.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'resetprefix',
  code: `<@$authorID> Prefixo resetado para \`ky!\` (padrao)
$setServerVar[prefixo;ky!]
$onlyIf[$getServerVar[prefixo]!=ky!;O prefixo ja e o padrao.]
$onlyPerms[manageserver;Permissao Gerenciar Servidor necessaria.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'setjoin',
  code: `$channelSendMessage[$channelID;Canal de entrada configurado em <#$mentionedChannels[1]>]
$setServerVar[entrada;$mentionedChannels[1]]
$channelSendMessage[$mentionedChannels[1];Este canal foi setado como canal de entrada.]
$suppressErrors[Mencione um canal!]
$argsCheck[>1;Mencione um canal!]
$onlyPerms[manageserver;Permissao Gerenciar Servidor necessaria.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'resetjoin',
  code: `Sistema de canal de entrada desativado por <@$authorID>
$setServerVar[entrada;null]
$onlyPerms[manageserver;Permissao Gerenciar Servidor necessaria.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'setleave',
  code: `$channelSendMessage[$channelID;Canal de saida configurado em <#$mentionedChannels[1]>]
$setServerVar[saida;$mentionedChannels[1]]
$channelSendMessage[$mentionedChannels[1];Este canal foi setado como canal de saida.]
$suppressErrors[Mencione um canal!]
$argsCheck[>1;Mencione um canal!]
$onlyPerms[manageserver;Permissao Gerenciar Servidor necessaria.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

bot.command({
  name: 'resetleave',
  code: `Sistema de canal de saida desativado por <@$authorID>
$setServerVar[saida;null]
$onlyPerms[manageserver;Permissao Gerenciar Servidor necessaria.]
$onlyIf[$getGlobalUserVar[bl]!=true;Voce esta na blacklist!]`
});

// ============ ADMIN (owner only) ============
bot.command({
  name: 'eval', aliases: ['e'],
  code: `$eval[$message]
$onlyIf[$message!=;Escreva algo.]
$onlyForIDs[817160910871330836;841785236084752464;Apenas o meu dono pode usar este comando!]`
});

bot.command({
  name: 'djseval', aliases: ['djs', 'djse'],
  code: `$djsEval[$message]
$onlyIf[$message!=;Escreva algo.]
$onlyForIDs[817160910871330836;841785236084752464;Apenas o meu dono pode usar este comando!]`
});

bot.command({
  name: 'blacklist',
  code: `$description[Usuario entrou para a blacklist.]
$setGlobalUserVar[bl;true;$findUser[$message[1]]]
$channelSendMessage[829026201812205608;{description:O usuario $userTag[$findUser[$message[1]]] esta na blacklist}]
$color[ff0000]
$argsCheck[>1;Use: $getServerVar[prefixo]blacklist <id> ou mencione]
$onlyForIDs[817160910871330836;841785236084752464;Apenas o meu dono pode usar este comando.]`
});

bot.command({
  name: 'whitelist',
  code: `$description[Usuario removido da blacklist.]
$setGlobalUserVar[bl;false;$findUser[$message[1]]]
$channelSendMessage[829026201812205608;{description:O usuario $userTag[$findUser[$message[1]]] saiu da blacklist}]
$color[00ff00]
$argsCheck[>1;Use: $getServerVar[prefixo]whitelist <id> ou mencione]
$onlyForIDs[817160910871330836;841785236084752464;Apenas o meu dono pode usar este comando.]`
});

bot.command({
  name: 'mod',
  code: `$description[<:staff:826502114074427463> **Comandos dos Owners**
\`blacklist\` | \`whitelist\` | \`eval\` | \`djseval\`]`
});

// ============ EVENTOS ============
bot.joinCommand({
  channel: '$getServerVar[entrada]',
  code: `<@$authorID>
$thumbnail[$userAvatar]
$color[DD105E]
$title[Novo membro!]
$description[<:welcome:828072001083015198> **$userName** Bem vindo ao **$serverName**!]
$footer[Agora somos $membersCount membros!]`
});
bot.onJoined();

bot.leaveCommand({
  channel: '$getServerVar[saida]',
  code: `$title[Adeus!]
$description[<:zerotwocry:828084524209668107> **$username** saiu do servidor **$serverName**, volte sempre...]
$thumbnail[$userAvatar]
$footer[Agora somos $membersCount membros!]
$color[DD105E]`
});
bot.onLeave();

bot.readyCommand({
  channel: '828310554120028230',
  code: `$title[Inicializacao!]
$description[Acabei de ser atualizada! Versao 2.0.0 - 2026]
$color[DD105E]`
});

bot.musicStartCommand({
  channel: '$channelID',
  code: ``
});

bot.musicEndCommand({
  channel: '$channelID',
  code: `**Nao tem nada tocando, saindo do canal de voz.**`
});

console.log('[KALLY] Bot iniciado com sucesso!');
console.log('[KALLY] Versao 2.0.0 - Atualizado para 2026');
console.log('[KALLY] aoi.js v6 + discord.js v14');
