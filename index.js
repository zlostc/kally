const Aoijs = require("aoi.js")

require('dotenv').config();

const express = require('express');
const app = express();
app.get('/', (request, response) => {
	response.sendStatus(200);
});
app.listen(process.env.PORT);

const bot = new Aoijs.Bot({
	token: process.env.TOKEN,
	prefix: '$getServerVar[prefixo]'
});

bot.onMessage();
bot.variables({
	prefixo: 'ky!',
	corno: 'gay',
	bl: 'false',
	entrada: 'null',
	saida: 'null',
	madeira: '0',
	tabua: '0',
	graveto: '0',
	varadepesca: 'não tem',
	picareta: 'nenhuma',
	esmeralda: '0'
});

bot.status({
	text: 'Me mencione para ver o meu prefix!',
	type: 'LISTENING',
	time: 7
});

bot.status({
	text:
		'Dúvidas? Bugs? Reporte em meu servidor de suporte: https://discord.gg/AP6ayagqUN',
	type: 'LISTENING',
	time: 7
});

bot.status({
	text: '😴 Faz $uptime que eu não durmo!',
	type: 'PLAYING',
	time: 7
});

bot.status({
	text: 'Ping: $ping | Ram: $ram | Cpu: $cpu',
	type: 'PLAYING',
	time: 7
});

bot.status({
	text: 'Me siga no twitter: @BotKally',
	type: 'WATCHING',
	time: 7
});

bot.status({
	text: 'Já votou em mim? https://www.top.gg/bot/817207028169965589',
	type: 'LISTENING',
	time: 7
});

bot.status({
	text: '$serverCount Servidores e $allMembersCount Membros!',
	type: 'WATCHING',
	time: 7
});

bot.rateLimitCommand({ 
channel: '841207264550715422',
code: `tomei ratelimit kkkkkjjjjj
Timeout: $rateLimt[timeout]
Limite: $rateLimit[limit]
Método: $rateLimit[method]
Path: $rateLimit[path]
Rota: $rateLimit[route]
`
});

bot.command({
name: '<@!817160910871330836>', 
code: `$addCmdReactions[<:a_gatonsd:828681458662506537>]`, 
nonPrefixed: true
});

bot.command({
name: '<@817160910871330836>', 
nonPrefixed: true, 
code: `$addCmdReactions[<:a_gatonsd:828681458662506537>] 
`
});

bot.command({
name: '<@!841785236084752464>', 
code: `$addCmdReactions[<:a_gatonsd:828681458662506537>]`, 
nonPrefixed: true
});

bot.command({
name: '<@841785236084752464>', 
nonPrefixed: true, 
code: `$addCmdReactions[<:a_gatonsd:828681458662506537>] 
`
});



bot.command({
	name: 'shuffle-queue',
	aliases: ['embaralhar', 'shuffle'],
	code: `
<@$authorID> Embaralhou a fila de músicas.
 $shuffleQueue
$onlyIf[$queueLength!=0;Não tem nenhuma música na fila.]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];> :x: » Você precisa estar no canal de voz que eu estou.]
$onlyIf[$voiceID!=;Você não está conectado a um canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
 `
});

bot.command({
  name: 'daily',
  code: `
  $description[<:esmeralda:842166813236133949> »  <@$authorID> pegou $random[100;500] Esmeraldas no daily!]
  $color[DD105E]
$setGlobalUserVar[esmeralda;$sum[$getGlobalUserVar[esmeralda];$random[100;500]]]
$globalCooldown[24h;<:timer:828671291992178708> » **Espere 24 horas para pegar as suas esmeraldas novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'pegar-madeira',
	code: `
  $description[<:madeira:835708778846486609> »  <@$authorID> pegou 1 madeira!]
  $color[DD105E]
  $setGlobalUserVar[madeira;$sum[$getGlobalUserVar[madeira];1]]
$globalCooldown[10m;<:timer:828671291992178708> » **Espere 10 minutos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'bal',
	aliases: ['saldo', 'atm', 'balance', 'money', 'inventario'],
	code: `$color[DD105E]
	<@$authorID>
 $title[Inventário de $username[$findUser[$message]]]
 $description[
  > <:madeira:835708778846486609> »  Madeiras: **$getGlobalUserVar[madeira;$findUser[$message]]**
  > <:tabua:835735687865040906> » Tábuas: **$getGlobalUserVar[tabua;$findUser[$message]]**
  > <:stick:835860823418601512> » Gravetos: **$getGlobalUserVar[graveto;$findUser[$message]]**
  > <:picareta_madeira:835733572350246942> » Picareta: **$getGlobalUserVar[picareta;$findUser[$message]]**
  > <:varadepesca:837627634489884693> » Vara de pesca: **$getGlobalUserVar[varadepesca;$findUser[$message]]**
  > <:esmeralda:842166813236133949> » Esmeraldas: **$getGlobalUserVar[esmeralda;$findUser[$message]]**]
  $thumbnail[$userAvatar[$findUser[$message]]]
  $botTyping
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'craftar',
	code: `
  $description[<:tabua:835735687865040906> » Tábua:
\`$getServerVar[prefixo]craftar-tabua\`
Preço: \`1 Madeira\`

<:picareta_madeira:835733572350246942> » Picareta de Madeira:
\`$getServerVar[prefixo]craftar-picareta-madeira\`
Preço: \`2 gravetos\` e \`3 tábuas\`

<:stick:835860823418601512> » Graveto:
\`$getServerVar[prefixo]craftar-graveto\`
Preço: \`2 tábuas\`]
  $color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'craftar-tabua',
	code: `$description[<:mesadetrabalho:835853739897126923> » <@$authorID> Craftou **4** Tábuas por **1** Madeiras.]
 $setGlobalUserVar[madeira;$sub[$getGlobalUserVar[madeira];1]]
  $setGlobalUserVar[tabua;$sum[$getGlobalUserVar[tabua];4]]
  $color[DD105E]
$onlyIf[$getGlobalUserVar[madeira]>=1;Você não tem madeiras o suficiente!]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
  name: 'minerar',
  code: `esse comando ainda está em teste!
$onlyIf[$getGlobalUserVar[picareta]!=nenhuma;Você não tem uma picareta!]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'craftar-picareta-madeira',
	code: `$description[<:mesadetrabalho:835853739897126923> » <@$authorID> Craftou **1** Picareta por **2** gravetos e **3** Tábuas.]
 $setGlobalUserVar[tabua;$sub[$getGlobalUserVar[tabua];3]]
$setGlobalUserVar[graveto;$sub[$getGlobalUserVar[graveto];2]]
  $setGlobalUserVar[picareta;de madeira]
  $color[DD105E]
$onlyIf[$getGlobalUserVar[tabua]>=3;Você não tem tábuas o suficiente!]
$onlyIf[$getGlobalUserVar[graveto]>=2;Você não tem gravetos o suficiente!]
$onlyIf[$getGlobalUserVar[picareta]!=de madeira;Você já possui uma picareta de madeira!]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'craftar-graveto',
	code: `$description[<:mesadetrabalho:835853739897126923> » <@$authorID> Craftou **4** gravetos por **2** Tábuas.]
 $setGlobalUserVar[tabua;$sub[$getGlobalUserVar[tabua];2]]
  $setGlobalUserVar[graveto;$sum[$getGlobalUserVar[graveto];4]]
  $color[DD105E]
$onlyIf[$getGlobalUserVar[tabua]>=2;Você não tem tábuas o suficiente!]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'volume',
	code: `$volume[$message[1]]
$description[<:volume:832027715947331614> » Volume setado para **$message[1]%**]
$color[DD105E]
$onlyIf[$message<=100;O volume maximo é \`100%\`!]
$onlyIf[$message=>4;O volume mínimo é \`4%\`!]
$onlyIf[$message!=;Você precisa dizer algum volume!]
$onlyIf[$queueLength!=0;Não tem nenhuma música na fila.]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];> :x: » Você precisa estar no canal de voz que eu estou.]
$onlyIf[$voiceID!=;Você não está conectado à um canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'setprefix',
	code: `<@$authorID> O meu prefix nesse server agora é \`$message\`
  $setServerVar[prefixo;$message]
  $argsCheck[>1;<@$authorID> Você precisa falar um novo prefix!]
  $onlyPerms[manageserver;<@$authorID> Você precisa da permissão \`Gerenciar Servidor\` para utilizar esse comando.]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'resetprefix',
	code: `<@$authorID> Agora o meu prefixo é \`ky!\` (meu prefixo padrão)
$setServerVar[prefixo;ky!]
$onlyIf[$getServerVar[prefixo]!=ky!;O meu prefixo neste servidor não foi alterado em nenhum momento.]
  $onlyPerms[manageserver;<@$authorID> Você precisa da permissão \`Gerenciar Servidor\` para utilizar esse comando.]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'loop-song',
	code: `$description[O modo loop está $replaceText[$replaceText[$loopSong;true;ligado];false;desligado] agora.]
$footer[Comando requisitado por: $username]
$color[DD105E]
$onlyIf[$queueLength!=0;Não tem nenhuma música na fila!]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];> :x: » Você precisa estar no canal de voz que eu estou.]
$onlyIf[$voiceID!=;Você não está conectado ao canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'loop-queue',
	code: `$description[O modo loop está $replaceText[$replaceText[$loopQueue;true;ligado];false;desligado] agora.]
$footer[Comando requisitado por: $username]
$color[DD105E]
$onlyIf[$queueLength!=0;Não tem nenhuma música na fila!]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];> :x: » Você precisa estar no canal de voz que eu estou.]
$onlyIf[$voiceID!=;Você não está conectado ao canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'np',
	code: `$title[$songInfo[title]]
$addField[URL:;[Clique Aqui]($songInfo[url])]
$addField[Duração:;$songInfo[duration]]
$addField[Canal:;$songInfo[publisher]]
$addField[Quanto tempo falta para acabar:;$songInfo[duration_left]]
$addField[Pedido por:;<@$songInfo[userID]>]
$footer[Comando requisitado por: $username]
$thumbnail[$songInfo[thumbnail]]
$color[DD105E]
$onlyIf[$queueLength!=0;Não tem nenhuma música na fila]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`,
	aliases: ['nowplaying']
});

bot.command({
	name: 'pause',
	code: `<:pause:830878614161457242> » A música foi pausada por <@$authorID>
$pauseSong
$onlyIf[$queueLength!=0;Não tem nenhuma música na fila.]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];> :x: » Você precisa estar no canal de voz que eu estou.]
$onlyIf[$voiceID!=;Você não está conectado a um canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`,
	aliases: ['pausar', 'stop']
});

bot.command({
	name: 'play',
	aliases: ['p'],
	code: `$description[<a:cd:826947867624341605> » Adicionado a fila: $playSong[$message;1m;yes;yes;Houve um erro ao tentar reproduzir a musica, tente novamente!]]
$footer[Comando requisitado por $username]
$color[DD105E]
$suppressErrors
$onlyIf[$message!=;Você precisa dizer o nome de uma música para eu tocar!]
$argsCheck[>1;Você precisa dizer o nome de uma música para eu tocar!]
$onlyIf[$voiceID!=;<@$authorID> Você não está conectado a um canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

  
bot.command({
	name: 'queue',
	code: `$description[$queue[1;10;{number} - {title} (pedido por <@$songInfo[userID]>)]

Tocando agora:
**$songInfo[title]**]
$onlyIf[$queueLength!=0;Não tem nenhuma música na fila!]
$onlyIf[$queueLength!=1;Precisa ter mais de 1 música na fila para eu mostrar!]
$color[DD105E]
$footer[Lembre-se que eu só posso mostrar até 9 músicas da fila!]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`,
	aliases: ['q']
});

bot.command({
	name: 'resume',
	code: `$resumeSong
<:resume:830878731832131654> » Voltei a tocar a música novamente.
$onlyIf[$queueLength!=0;Não tem nenhuma música na fila!]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];> :x: » Você precisa estar no canal de voz que eu estou.]
$onlyIf[$voiceID!=;Você não está conectado a um canal de voz!]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'skip',
	code: `$skipSong
<@$authorID> pulou a música!
$onlyIf[$queueLength!=0;<@$authorID> Não tem nenhuma música na fila!]
$onlyIf[$queueLength!=1;Não tem outra música na fila para pular!]
$suppressErrors
$onlyIf[$voiceid[$authorid]==$voiceid[$clientID];> :x: » Você precisa estar no canal de voz que eu estou.]
$onlyIf[$voiceID!=;Você não está conectado a um canal de voz.]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`,
	alises: ['pular']
});

bot.command({
	name: 'eval',
	code: `$eval[$message]
$onlyIf[$message!=;Escreva algo, burrão kjkjkjkkj]
  $onlyForIDs[817160910871330836;841785236084752464;Apenas o meu dono pode utilizar este comando!]`,
	aliases: ['e']
});

bot.command({
	name: 'djseval',
	code: `$djsEval[$message]
$onlyIf[$message!=;Escreva algo, burrão kjkjkjkkj]
  $onlyForIDs[817160910871330836;841785236084752464;Apenas o meu dono pode utilizar este comando!]`,
	aliases: ['djs', 'djse']
});

bot.command({
	name: 'ping',
	code: `<@$authorID>
  $description[Ping: **$botping**
Websocket: **$ping**
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'randomavatar',
	code: `
$title[Avatar de $userTag[$randomUserID]]
$description[<:download:827653725521838121> Clique [aqui]($userAvatar[$randomUserID]) Para baixar]
$image[$userAvatar[$randomUserID]]
$color[DD105E]
$footer[Avatar de um usuário aleatório deste servidor.]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: '<@!817207028169965589>',
	code: `Olá <@$authorID>, o meu prefix nesse servidor é \`$getServerVar[prefixo]\`, use \`$getServerVar[prefixo]help\` para saber mais!`,
	nonPrefixed: true
});

bot.command({
	name: '<@817207028169965589>',
	nonPrefixed: true,
	code: `Olá <@$authorID>, o meu prefix nesse servidor é \`$getServerVar[prefixo]\`, use \`$getServerVar[prefixo]help\` para saber mais!
  `
});

bot.command({
	name: 'mod',
	code: `$description[> <:staff:826502114074427463> **Comandos dos Owners**
\`blacklist\` **|** \`whitelist\` **|** \`eval\` **|** \`djseval\`]
`
});

bot.command({
	name: 'comandos',
	code: `$description[> <:um:825234716726525992> **Comandos de Economia** (em desenvolvimento)
\`pegar-madeira\` **|** \`saldo\` **|** \`craftar\` **|** \`daily\`
  
> <:dois:825234747260534784> **Comandos de Música**
\`play\` **|** \`playspotify\` **|** \`np\` **|** \`loop-song\` **|** \`loop-queue\` **|** \`skip\` **|** \`stop\` **|** \`resume\` **|** \`queue\` **|** \`clear-queue\` **|** \`volume\` **|** \` shuffle\` **|**

> <:tres:825373654262611988> **Comandos de Diversão**
\`coinflip\` **|** \`gado\` **|** \`jokenpo\` **|** \`8ball\` **|** \`dado\` **|** \`campo-minado\` **|**

> <:quatro:825975295793823774> **Comandos de Utilidade**
\`botinfo\` **|** \`ping\` **|** \`avatar\` **|** \`invite\` **|** \`google\` **|** \`yt\` **|** \`servericon\` **|** \`userinfo\` **|** \`upvote\` **|** \`channelinfo\` **|** \`serverinfo\` **|** \`embed\` **|** \`anuncio\` **|** \`uptime\` **|** \`randomavatar\` **|** \`length\` **|** \`doar\` **|**

> <:cinco:826590783892095007> **Comandos de Configuração/Personalização**
\`setprefix\` **|** \`resetprefix\` **|** \`setjoin\` **|** \`resetjoin\` **|** \`setleave\` **|** \`resetleave\` **|**]
  $color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
  name: 'length',
  code: `$description[A mensagem "**$message**" possui **\`$charCount[$message]\`** Caracteres!]
  $argsCheck[>1;Como usar: \`$getServerVar[prefixo]length <mensagem>\`]
  $color[DD105E]
  $globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
  name: 'campo-minado',
  code: `$title[Chegue até o final sem se deparar com uma bomba!]
  $description[||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:||
||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:||
||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:blue_square:|| | ||:blue_square:|| | ||🏆||
||:blue_square:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:blue_square:|| | ||:blue_square:|| | ||:blue_square:|| | ||:bomb:|| | ||:bomb:||
||:blue_square:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:blue_square:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:||
||:blue_square:|| | ||:blue_square:|| | ||:blue_square:|| | ||:bomb:|| | ||:blue_square:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:||
||:bomb:|| | ||:bomb:|| | ||:blue_square:|| | ||:blue_square:|| | ||:blue_square:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:|| | ||:bomb:||
]
  $color[DD015E]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'upvote',
	code: `$description[<a:topgg:831230227731841074> Clique [aqui](https://top.gg/bot/817207028169965589/vote) para votar em mim no top.gg!]
  $color[DD105E]
  $footer[A cada voto eu fico mais visível e mais pessoas irão me conhecer!]
  $globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]`
});

bot.command({
	name: 'doar',
	code: `$description[<:dinheirokally:844953382288228353> Clique [aqui](https://discord.gg/jA7hgV5yhA) para doar]
  $color[DD105E]
  $footer[Estamos arrecadando doações para me manter online 😢]
  $globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]`
});


bot.command({
	name: 'botinfo',
	code: `$description[<:Pink_DeveloperTDM:828676357528617000> » \`Sobre o Criador:\`
> <:id:828673062479200297> » Tag: **$username[817160910871330836]#$discriminator[817160910871330836]**
> <:info:828675097292177460> » ID: **817160910871330836**
> <:emoji_17:840422660953210940> » Twitter: [@ydroxz007](https://twitter.com/ydroxz007?s=09)

<:id:828673062479200297> » \`Sobre a Kally™: (bot)\`
> <:aoijs:837748431321694259> » Package: [Aoi.Js](https://discord.gg/RbMmfqZyB9)
> <:copiar:828675328255328307> » Plataforma: [Linux](https://discord.gg/YfKQBqbEPy)
> <:Code:828675849720823821> » CPU: **$cpu%/100%**
> <:memoryram:828673704132345856> » RAM: **$ram mb/1gb**
> <:id:828673062479200297> » Tag: **Kally™#5904**
> <:info:828675097292177460> » ID: **817207028169965589**

<:review:828672852143112213> » \`Informações e Estatísticas:\`
> <:blacklisted:828673331036291146> » Servidores: **$serverCount**
> <:users:828672510030643260> » Membros: **$allMembersCount**
> <:timer:828671291992178708> » Uptime: **$uptime**
> <a:load:828671640384307280> » Ping: **$ping**
> <:gilmar:831927656362278962> » Emojis: **$allEmojiCount**
> <:canal:834797788209348689> » Canais: **$allChannelsCount**
> <:config:828671920965943407> » Data de Criação: **04/03/2021 ás 22:28**
> <:Business:828673559295164436> » Comandos: **$commandsCount**
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'anuncio',
	aliases: ['anunciar'],
	code: `Fiz um anúncio em <#$mentionedChannels[1]>.
  $channelSendMessage[$mentionedChannels[1];{description:$noMentionMessage}
  {footer:Anunciado por $userTag / $authorID}
  {color:RANDOM}]
  $onlyIf[$noMentionMessage!=;Como usar o comando: \`$getServerVar[prefixo]anunciar <canal> <mensagem>\`]
$onlyIf[$mentionedChannels[1]!=;Como usar o comando: \`$getServerVar[prefixo]anunciar <canal> <mensagem>\`]
  $onlyPerms[manageserver;Você precisa da permissão \`Gerenciar Servidor\` para utilizar este comando.]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'gado',
	code: `<@$mentioned[1;yes]>, Você é $random[0;100]% Gado.
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
  $onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'coinflip',
	code: `$onlyIf[$message!=coroa; Você apostou em \`coroa\` e eu apostei em \`cara\`, o resultado foi: \`$randomText[cara;coroa]\`.]
$onlyIf[$message!=cara; Você apostou em \`cara\` e eu apostei em \`coroa\`, o resultado foi: \`$randomText[cara;coroa]\`.]
$color[DD105E]
$description["$message" Não é válida no cara ou coroa, use somente: \`cara\` ou \`coroa\`]
$argsCheck[>1;Como utilizar: \`$getServerVar[prefixo]coinflip coroa\` ou \`$getServerVar[prefixo]coinflip cara\`]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'jokenpo',
	code: `$onlyIf[$message!=pedra; Você jogou \`$message\` e eu joguei $randomText[\`Pedra\`, Empatamos; \`Papel\`, eu Ganhei;\`Tesoura\`, eu Perdi]]
$onlyIf[$message!=tesoura; Você jogou \`$message\` e eu joguei $randomText[\`Pedra\`, eu Ganhei;\`Papel\`, eu Perdi; \`Tesoura\`, Empate]]
$onlyIf[$message!=papel; Você jogou \`$message\` e eu joguei $randomText[\`Pedra\`, eu Perdi;\`Papel\`, Empate;\`Tesoura\`, eu Ganhei]]
$description["$message" Não é válida no jokenpo, use somente \`pedra\`, \`papel\` ou \`tesoura\`.]
$argsCheck[>1;Como utilizar: \`$getServerVar[prefixo]jokenpo papel\` ou \`$getServerVar[prefixo]jokenpo tesoura\` ou \`$getServerVar[prefixo]jokenpo pedra\`]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'embed',
	code: `$description[$message]
  $color[RANDOM]
  $footer[embed enviada por: $username#$discriminator[$authorID] / $authorID]
  $argsCheck[>1;Escreva algo!]
  $onlyPerms[manageserver;Você precisa da permissão \`Gerenciar Servidor\` para utilizar este comando.]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'clear-queue',
	aliases: 'cq',
	code: `$clearSongQueue
$stopSong
Fila limpa!
$onlyIf[$queueLength!=0;<@$authorID> Não tem nenhuma música na fila!]
$onlyIf[$voiceID!=;Você não está conectado a um canal de voz.]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]`
});

bot.command({
	name: 'yt',
	code: `$description[Url: [clique aqui](https://www.youtube.com/results?search_query=$replaceText[$message; ;+;-1])
Pesquisa: **$message**
Quem pesquisou: **$username**]
$color[df0a0a]
$argsCheck[>1;Digite algo para eu poder pesquisar!]
$onlyNSFW[Este comando só pode ser executado em canais NSFW.]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'google',
	code: `$color[#ffffff]
$description[Url: [clique aqui](https://www.google.com/search?q=$replaceText[$message; ;+;-1])
Pesquisa: **$message**
Quem Pesquisou: **$username**]
$argsCheck[>1;Digite algo para eu poder pesquisar!]
$onlyNSFW[Este comando só pode ser executado em canais NSFW.
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'dado',
	code: `<@$authorID> Rolou um dado e caiu \`$random[1;6]\`!
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: '8ball',
	code: `$onlyIf[$checkContains[$message;?]==true;<a:errado:817270804386807858> | Sua pergunta não contém "?"]
$description[**Pergunta:** $message
**Resposta:** $randomText[Não.;Sim.;Eu não sei.;Você sabe.;Claro!;Claro que não!;Sei lá.;Eu não quero responder.;Eu não posso responder.;Eu não entendi.;É o que???;O que é isso?;Eu quero.;Saia daqui.;Sai fora!;Talvez...;mano, eu sou um robô;Lógico;Óbvio;Eu não sei responder a isso.;Adoro!]]
$color[DD105E]
$argsCheck[>1;<@$authorID> Escreva alguma pergunta!]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'help',
	code: `$description[> <:San_Happy:828680343081975908> Olá **$username**, Eu sou a Kally, uma bot de diversão, utilidade, música e minecraft! O meu prefix neste servidor é \`$getServerVar[prefixo]\`, Use \`$getServerVar[prefixo]comandos\` para ver meus comandos.
> Eu fui feita utilizando <:js:840758458592526336> **Javascript** e a package <:aoijs:837748431321694259> **Aoi.JS**, Atualmente tenho **$commandsCount** Comandos e estou em **$serverCount** Servidores, **$allMembersCount** Membros e **$allChannelsCount** canais.
> <:love:840969611511463937> **Meus Amiguinhos: [Dark](https://discord.com/oauth2/authorize?client_id=750782444533186652&permissions=8&scope=bot), [Ayra](https://discord.com/oauth2/authorize?client_id=730826055018872862&scope=bot&permissions=281029662)**

> **[Invite](https://discord.com/api/oauth2/authorize?client_id=817207028169965589&permissions=8&scope=bot) | [Server Suporte](https://discord.gg/wPWTHJY3Kw) | [Upvote](https://top.gg/bot/817207028169965589/vote) | [Twitter](https://twitter.com/BotKally?s=09)**]
$color[DD105E]
$title[Kally™ • Ajuda]
$thumbnail[$userAvatar[$clientID]]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `,
	aliases: ['ajuda']
});

bot.command({
	name: 'avatar',
	code: `<@$authorID>
  $author[Avatar de $username[$message[1]]#$discriminator[$message[1]]]
  $description[<:download:827653725521838121> Clique [aqui]($userAvatar[$message[1]]) para baixar]
  $image[$userAvatar[$message[1]]]
$color[DD105E]
$suppressErrors[ID inválido!]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
$argsCheck[>1;]
$onlyIf[$checkContains[$message[1];@]==false;]
  `
});

bot.command({
	name: 'avatar',
	code: `<@$authorID>
  $author[Avatar de $username[$authorID]#$discriminator[$authorID]]
  $description[<:download:827653725521838121> Clique [aqui]($userAvatar[$authorID]) para baixar]
$image[$userAvatar[$authorID]]
$color[DD105E]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
$argsCheck[0;]
$onlyIf[$checkContains[$message[1];@]==false;]`
});

bot.command({
	name: 'avatar',
	code: `<@$authorID>
  $author[Avatar de $username[$mentioned[1]]#$discriminator[$mentioned[1]]]
  $description[<:download:827653725521838121> Clique [aqui]($userAvatar[$mentioned[1]]) para baixar]
  $image[$userAvatar[$mentioned[1]]]
$color[DD105E]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
$onlyIf[$checkContains[$message[1];@]==true;]
$onlyIf[$mentioned[1]!=;]
$argsCheck[>1;]
  `
});

bot.command({
	name: 'invite',
	code: `$color[DD105E]
  $description[Clique [aqui](https://discord.com/api/oauth2/authorize?client_id=817207028169965589&permissions=8&scope=bot) Para me adicionar em seu servidor!]
  <@$authorID>
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
  $onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'servericon',
	code: `$color[DD105E]
  $description[<:Doc:828682168078434344> [download]($serverIcon)]
  $image[$serverIcon?size=2048]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'userinfo',
	code: `$thumbnail[$userAvatar[$mentioned[1;yes]]]
  $color[DD105E]
  $title[Informações de $userTag[$mentioned[1;yes]]]
  $description[> <:id:828673062479200297> » Tag: **$userTag[$mentioned[1;yes]]**
 > <:review:828672852143112213> » ID: **$mentioned[1;yes]**
 > <:bot:834780123727134790> » É um bot? **$replaceText[$replaceText[$isBot[$mentioned[1;yes]];false;não];true;sim]**
 > <:boost:834779219291799572> » Está impulsionando o servidor? **$replaceText[$replaceText[$isBoosting[$mentioned[1;yes]];false;não];true;sim]**
 > 👀 » Status Customizado: \`$replaceText[$getCustomStatus[$mentioned[1;yes]];none;Nenhum]\`
 > <:chat:834814064344563793> » Status da DM: **$replaceText[$replaceText[$isUserDMEnabled[$mentioned[1;yes]];false;fechada];true;aberta]**
 > <:calendario_branco:834813292521586759> » Entrou aqui faz: **$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$memberJoinedDate[$mentioned[1;yes];time];years;anos];year;ano];months;meses];weeks;semanas];month;mês];week;semana];second;segundo];hour;hora];day;dia];minutes;minutos];and;e]**
> <:calendario_branco:834813292521586759> » Conta criada há: **$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$creationDate[$mentioned[1;yes];time];years;anos];year;ano];months;meses];month;mês];weeks;semanas];week;semana];second;segundo];hour;hora];day;dia];minutes;minutos];and;e]**]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'uptime',
	code: `
  $description[<:timer:828671291992178708> Tempo de Atividade
  
<@$authorID> Estou online há **$uptime**!]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'channelinfo',
	code: `$description[**Informações de** <#$mentionedChannels[1;yes]>
  
<:id:828673062479200297> » Nome do canal:
**$channelName[$mentionedChannels[1;yes]]**
  
<:review:828672852143112213> » ID do canal:
**$channelID[$channelName[$mentionedChannels[1;yes]]]**
  
<:hehehe:834818796493209640> » É nsfw?
**$replaceText[$replaceText[$channelNSFW[$mentionedChannels[1;yes]];true;sim];false;não**]

<:canal:834797788209348689> » Tópico:
**$replaceText[$channelTopic[$mentionedChannels[1;yes]];none;Nenhum]**

<:timer:828671291992178708> » Slowmode:
**$getChannelSlowmode[$mentionedChannels[1;yes]] segundos**]

$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'serverinfo',
	code: `$title[Informações do servidor]
  $description[> <:id:828673062479200297> » Nome: **$serverName**
> <:review:828672852143112213> » Server ID: **$guildID**
> <a:owner:834777178667089920> » Owner: **$username[$ownerID]#$discriminator[$ownerID]**
> <:boost:834779219291799572> » Boost Level: **$serverBoostLevel**
> <:boost:834779219291799572> » Boosters: **$serverBoostCount**
> <:canal:834797788209348689> » Canais totais: **$channelCount**
> ✍ » Canais de texto: **$channelCount[text]**
> <:volume:832027715947331614> » Canais de voz: **$channelCount[voice]**
> 🗂 » Categorias: **$channelCount[category]**
> <:users:828672510030643260> » Membros: **$sub[$membersCount;$botCount]**
> <:bot:834780123727134790> » Bots: **$botCount**
> 😎 » Total de Membros: **$membersCount**
> <:Business:828673559295164436> » Total de Cargos: **$roleCount**
> <:gilmar:831927656362278962> » Total de Emojis: **$emojiCount**]
$color[DD105E]
$globalCooldown[5s;<:timer:828671291992178708> » **Espere 5 segundos para executar este comando novamente.**]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
`
});

bot.command({
	name: 'blacklist',
	code: `$description[O usuário entrou para a blacklist.]
  $setGlobalUserVar[bl;true;$findUser[$message[1]]] $channelSendMessage[829026201812205608;{description:🚫 O usuário $userTag[$findUser[$message[1]]] está na minha blacklist e não poderá executar meus comandos}]
$color[ff0000]
$argsCheck[>1;tu e dev do bot e nao sabe usar os comandos do teu proprio bot, pqp tu é muito burro (use \`$getServerVar[prefixo]blacklist <id>\` ou mencione alguem)]
$onlyForIDs[817160910871330836;841785236084752464;Apenas o meu criador pode utilizar este comando.]
  `
});

bot.command({
	name: 'whitelist',
	code: `$description[ usuário saiu da blacklist.]
  $setGlobalUserVar[bl;false;$findUser[$message[1]]]
  $channelSendMessage[829026201812205608;{description:✅ O usuario $userTag[$findUser[$message[1]]] saiu da blacklist}]
$color[ff0000]
$argsCheck[>1;tu e dev do bot e nao sabe usar os comandos do teu proprio bot, pqp tu é muito burro (use \`$getServerVar[prefixo]whitelist <id>\` ou mencione alguem)]
$onlyForIDs[817160910871330836;841785236084752464;Apenas o meu criador pode utilizar este comando.]
`
});

bot.joinCommand({
	channel: '$getServerVar[entrada]',
	code: `<@$authorID>
        $thumbnail[$userAvatar]
        $color[DD105E]
        $title[Novo membro na área!]
        $description[> <:welcome:828072001083015198> **$userName#$discriminator[$authorID]** Bem vindo ao **$serverName**! Espero que curta este servidor!]
        $footer[Com você agora $membersCount membros! ($sub[$membersCount;$botCount] humanos e $botCount bots)]`
});
bot.onJoined();

bot.command({
	name: 'setjoin',
	code: `$channelSendMessage[$channelID;Agora sempre que algum usuário entrar no servidor eu irei avisar em <#$mentionedChannels[1]>]
  $setServerVar[entrada;$mentionedChannels[1]]
$channelSendMessage[$mentionedChannels[1];este canal foi setado como canal de entrada.]
$suppressErrors[Mencione algum canal!]
$argsCheck[>1;Mencione algum canal!]
  $onlyPerms[manageserver;Você precisa da permissão \`Gerenciar Servidor\` para utilizar este comando.]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'resetjoin',
	code: `O sistema de canal de entrada foi desativado por <@$authorID>
  $setServerVar[entrada;null]
  $onlyPerms[manageserver;Você precisa da permissão \`Gerenciar Servidor\` para utilizar este comando.]
  $onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]`
});

bot.leaveCommand({
	channel: '$getServerVar[saida]',
	code: `$title[👋 Adeus!]
        $description[> <:zerotwocry:828084524209668107> **$username#$discriminator[$authorID]** Saiu do servidor **$serverName**, espero que volte algum dia...]
        $thumbnail[$userAvatar]
        $footer[Com sua saída agora somos $membersCount membros! ($sub[$membersCount;$botCount] humanos e $botCount bots
        $color[DD105E]
        `
});
bot.onLeave();

bot.command({
	name: 'setleave',
	code: `$channelSendMessage[$channelID;Agora sempre que algum usuário sair do servidor eu irei avisar em <#$mentionedChannels[1]>]
  $setServerVar[saida;$mentionedChannels[1]]
$channelSendMessage[$mentionedChannels[1];este canal foi setado como canal de saida.]
$suppressErrors[Mencione algum canal!]
$argsCheck[>1;Mencione algum canal!]
  $onlyPerms[manageserver;Você precisa da permissão \`Gerenciar Servidor\` para utilizar este comando.]
$onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]
  `
});

bot.command({
	name: 'resetleave',
	code: `O sistema de canal de saída foi desativado por <@$authorID>
  $setServerVar[saida;null]
  $onlyPerms[manageserver;Você precisa da permissão \`Gerenciar Servidor\` para utilizar este comando.]
  $onlyIf[$getGlobalUserVar[bl]!=true;Você está na blacklist!]`
});

bot.readyCommand({
	channel: '828310554120028230',
	code: `$title[Inicialização!]
 $description[Acabei de ser atualizada!]
$color[DD105E]
 `
});

bot.musicStartCommand({
	channel: '$channelID',
	code: ``
});

bot.musicEndCommand({
	channel: '$channelID',
	code: `**Não tem nada tocando, então irei sair do canal de voz.**`
});