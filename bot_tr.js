(function(){let room=HBInit({roomName:"👽 Haxball Odası",maxPlayers:12,public:true,noPlayer:true});
let Bot={config:{adminPass:"admPs",mapsUrl:""},pa:[],po:{},data:{mode:0,popLimit:0,msg:"",recent:[],nameBL:[],connBL:[],maps:[]},stats:{kc:{id:1,team:1},kl:{id:1,team:1},victories:[0,0],onKick:t=>{let a=Bot.stats;a.kl=a.kc,a.kc={id:t.id,team:t.team}},onGoal:t=>{let a,i,e=Bot.stats,s="⚽ Gol",o=Bot.po;(i=o[(a=e.kc).id])&&(s+="! "+o[a.id].name+" attı",a.team===t?(e=e.kl).team===t&&a.id!==e.id&&(s+=" (asist: "+o[e.id].name+")"):s+=" (kendi kalesine)"),Lib.say(s)}}};
room.setTeamColors(1,60,16777215,[11730944,7208960,3866624]),room.setTeamColors(2,60,16777215,[1079446,809328,606546]),room.setTeamsLock(!0),room.setScoreLimit(3),room.setTimeLimit(5),room.setDefaultStadium("Easy"),room.startGame();let Lib={t:null,victory:a=>{room.stopGame();let e=Bot.data.mode;if(-1===e)return room.startGame();let t=Bot.pa,n,o,l,i=Bot.stats.victories;for(i[a-1]++,Lib.say("🏆 "+(1===a?"Kırmızı":"Mavi")+" takım kazandı. Tebrikler! Kırmızı "+i[0]+":"+i[1]+" Mavi"),(2<i[0]||2<i[1])&&(e=-2,i[0]=0,i[1]=0),n=t.length-1;0<=n;n--)o=t[n],l=o.pref,l.afk||(-2===e?(l.team=0===o.team?a-3:l.team,o.team=0,room.setPlayerTeam(o.id,0)):0===e||o.team===3-a?(o.team=0,room.setPlayerTeam(o.id,0)):0===o.team&&(l.team=a-3));Lib.balance(),room.startGame()},balance:()=>{var r=Bot.data.mode;if(-1!==r){let a=[[],[],[],[],[]],e,t=Bot.pa,n,o,l,i;for(e=t.length-1;0<=e;e--)n=t[e],o=n.pref,o.afk||(0===o.team?a[n.team].push(n.id):(a[Math.abs(o.team)+2].push(n.id),o.team<0&&(o.team=0)));for(t=a[0],e=t.length-1;0<e;e--)o=Math.floor(Math.random()*(e+1)),n=t[e],t[e]=t[o],t[o]=n;for(e=t.length-1;0<=e&&(l=a[1].length+a[3].length,i=a[2].length+a[4].length,!(0<r&&l>=r&&i>=r));e--)o=l-i,n=0===o?1+Math.floor(2*Math.random()):0<o?2:1,a[n].push(t[e]),t.splice(e,1);if(0===r){if(o=a[1].length+a[3].length-a[2].length-a[4].length,o<-1||1<o)for(i=o<0?2:1,t=a[i],o=Math.floor(Math.abs(o)/2),e=t.length-1;0<=e&&(n=t[e],a[3-i].push(n),t.splice(e,1),o--,0!==o);e--);}else for(e=1;e<3;e++)if(t=a[e],n=t.length+a[e+2].length,n>r)for(n-=r,o=t.length-1;0<=o&&(a[0].push(t[o]),t.splice(o,1),n--,0!==n);o--);for(e=0;e<5;e++)for(n=a[e],o=n.length-1;0<=o;o--)room.setPlayerTeam(n[o],e<3?e:e-2)}},fetchMaps:()=>{if(!(Bot.config.mapsUrl.length<1)){let e=Bot.data;fetch(Bot.config.mapsUrl).then(function(a){return a.ok?a.json():Promise.reject({status:a.status,statusText:a.statusText})}).then(function(a){e.maps=a}).catch(a=>{console.log(a)})}},setPW:(a,e=!1)=>{a=!a||a.length<1?null:-1===a?Math.round(1e9*Math.random()).toString(16):a;room.setPassword(a),e&&Lib.msgAdmins("şifre"+(null===a?" temizlendi":": "+a))},nameToPlayer:(a=null)=>{if(null===a||a.length<1)return null;if("#"===a[0])return Bot.po[parseInt(a.substring(1))];a=a.toLowerCase();let e=Bot.pa,t,n,o;for(t=e.length-1;0<=t;t--)if(n=e[t],o=n.name.toLowerCase(),o===a)return n;for(t=e.length-1;0<=t;t--)if(n=e[t],o=n.name.toLowerCase(),o.includes(a))return n;return null},mix:a=>{let e,t,n=Bot.pa;for(e=n.length-1;0<=e;e--)t=n[e],room.setPlayerTeam(t.id,0),t.team=0;Lib.balance(),a&&a()},mute:(a,e,t=null,n=!0)=>{a.log.mu=Date.now()+6e4*e,n&&Lib.say("🔕 "+a.name+" "+(0<e?e+" dakika susturuldu"+(t?" ("+t+")":""):"artık konuşabilir"))},say:(a,e)=>{room.sendAnnouncement(a,e,e?11393254:8513796)},msgAdmins:(a,e=1)=>{let t,n,o=Bot.pa;for(t=o.length-1;0<=t;t--)n=o[t],n.admin>=e&&room.sendAnnouncement(a,n.id,16768768)},ch:{help:{f:(a,e)=>{let t=Lib,n=t.ch,o;e.length?e[0]in n&&(o=n[e[0]],"h"in o&&o.h&&t.say(o.h,a.id)):(t.say("komutlar: "+Object.keys(n).join(", "),a.id),t.say("detaylı bilgi: .help [cmd]",a.id))},h:null,a:1},admin:{f:(a,e)=>{a.admin<=0&&e[0]!==Bot.config.adminPass||(a.admin=2,1<e.length?(room.setPlayerAdmin(a.id,!1),Lib.msgAdmins(a.name+" gizli admin.")):room.setPlayerAdmin(a.id,!0))},h:"admin [password] (hidden)",a:0},setadminlevel:{f:(a,e)=>{let t=Lib.nameToPlayer(e[0]),n=Math.min(2,Math.abs(parseInt(e[1])));t.admin=n,room.setPlayerAdmin(t.id,0<n&&e.length<3),Lib.msgAdmins(t.name+" "+(0<n&&2<e.length?"gizli ":"")+"admin"+(0===n?" değil":"")+" ("+a.name+")")},h:"setadminlevel [player] [level] (hidden)",a:2},say:{f:(a,e)=>{Lib.say(e.join(" "))},h:null,a:1},v:{f:(a,e)=>{Lib.say("v5.4.1")},h:null,a:1},m:{f:(a,e)=>{let t=Bot.data;e.length&&(t.msg=e.join(" ")),Lib.say(t.msg)},h:"m ([msg])",a:1},pm:{f:(a,e)=>{var t=e.slice(1).join(" "),e=Lib.nameToPlayer(e[0]);Lib.say("(PM) "+a.name+": "+t,e.id),Lib.say("(PM to "+e.name+"): "+t,a.id)},h:"pm [player] [message]",a:2},mute:{f:(a,e)=>{let t=e[0].toLowerCase(),n=Math.min(parseFloat(e[1]),10),o,l=Lib.mute;if((isNaN(n)||n<0)&&(n=0),"all"===t){let a,e=Bot.pa;for(a=e.length-1;0<=a;a--)o=e[a],o.a||l(o,n,null,!1);Lib.say("🔕 herkes "+(0<n?n+" dakika susturuldu":"konuşabilir"))}else o=Lib.nameToPlayer(t),o.a||l(o,n,"admin")},h:"mute [player/all] [mins]",a:2},team:{f:(a,e)=>{let t=e[0],n=e[1][0],o,l,i,r=Lib,m=!1;if("-"===n&&(m=!0,e[1]=e[1].substring(1),n=e[1][0]),l="r"===n?1:"b"===n?2:"n"===n?0:parseInt(e[1]),(isNaN(l)||l<0||2<l)&&(l=0),"all"===t)n=Bot.pa,i="Herkes";else{if(n=r.nameToPlayer(t),!n)return;i=n.name,n=[n]}if(r.say(i+" "+(0===l?"takım tercihini sildi":(1===l?"kırmızı":"mavi")+" takıma "+(m?"geçti":"atandı"))),m)for(o=n.length-1;0<=o;o--)room.setPlayerTeam(n[o].id,l),n[o].team=l;else{for(o=n.length-1;0<=o;o--)n[o].pref.team=l;r.balance()}},h:"team [player/all] [0/1/2]",a:2},afk:{f:(a,e)=>{let t=Lib,n=0===e.length?a:t.nameToPlayer(e[0]);n&&((a=n.pref).afk=!a.afk,t.say(n.name+" AFK"+(a.afk?"":" değil")+"."),a.team=0,a.afk&&room.setPlayerTeam(n.id,0),t.balance())},h:null,a:1},blacklist:{f:(a,e)=>{let t=e[0],n=e[1],o=Bot.data,l;switch(t){case"recent":for(Lib.say("recent players (oldest first):",a.id),o=o.recent,n=0;n<o.length;n++)t=o[n],Lib.say('"'+t.name+'": '+t.conn,a.id);l=null;break;case"ip":t=o.connBL,-1===t.indexOf(n)&&t.push(n);var i=o.recent.find(a=>a.conn===n);l=(i?i.name:n)+" ip-blacklistlendi";break;case"name":o=o.nameBL,-1===o.indexOf(n)&&o.push(n),l=n+" name-blacklistlendi";break;case"clear":o.nameBL=[],o.connBL=[],l="blacklistler temizlendi";break;case"get":Lib.msgAdmins("Blacklists:"),Lib.msgAdmins("Names: "+o.nameBL.join(", ")),l="IPs:"+o.connBL.join(", ");break;default:Lib.say("pls "+Lib.ch.blacklist.h,a.id),l=null}l&&Lib.msgAdmins(l)},h:"blacklist [clear/get/recent/ip/name] ([conn/ExactName])",a:2},kick:{f:(a,e)=>{var t=Lib.nameToPlayer(e[0]),e=1<e.length&&0<e[1].length?e.slice(1).join(" "):null;room.kickPlayer(t.id,e,!1)},h:null,a:2},ban:{f:(a,e)=>{var t=Lib.nameToPlayer(e[0]),e=1<e.length&&0<e[1].length?e.slice(1).join(" "):null;room.kickPlayer(t.id,e,!0)},h:null,a:2},game:{f:(a,e)=>{let t=Lib.mix,n=a.name;switch(e[0]){case"mix":t(),n+=" takımları kardı";break;case"remix":room.stopGame(),t(room.startGame),n+=" takımları kardı";break;case"restart":room.stopGame(),room.startGame(),n+=" oyunu yeniden başlattı";break;case"mode":t=e[1][0].toLowerCase(),t="m"===t?-1:"f"===t?0:parseInt(e[1]),t=isNaN(t)?0:t<0?-1:t,Bot.data.mode=t,Lib.balance(),n+=", oyun modu: "+(-1===t?"manuel":0===t?"herkes oyunda":t+"v"+t);break;case"poplimit":t=parseInt(e[1]),t=isNaN(t)?0:Math.abs(t),Bot.data.popLimit=t,Lib.setPW(t&&Bot.pa.length>=t?-1:null),n+=" oyuncu limitini "+(0===t?"kaldırdı":t+" yaptı");break;case"commentator":t=e[1].toLowerCase(),t="on"===t?1:"off"===t?0:parseInt(t),t=isNaN(t)?0:t,n+=" spikeri "+(1===t?"açtı":"kapattı"),0===t?(room.onPlayerBallKick=null,room.onTeamGoal=null):(t=Bot.stats,room.onPlayerBallKick=t.onKick,room.onTeamGoal=t.onGoal);break;default:n=null}n&&Lib.msgAdmins(n)},h:"game mix/remix/restart/mode/commentator/poplimit ([value])",a:2},setpw:{f:(a,e)=>{var t=e[0].substring(0,4);"rand"===t||"null"!==t&&e[0],Lib.setPW(t,!0)},h:"setpw [aBc123/rand/null]",a:2},avatar:{f:(a,e)=>{let t=e[0],n=e[1][0],o,l,i;if("all"===t)l=Bot.pa;else{if(l=Lib.nameToPlayer(t),!l)return;l=[l]}for(t=l.length,o="c"===n?null:"d"===n?"🎃":e[1],i=t-1;0<=i;i--)room.setPlayerAvatar(l[i].id,o);1===t&&(l[0].log.av=o)},h:"avatar [player/all] clear/default/[av]",a:2},funkyball:{f:(a,e)=>{e=1===parseInt(e[0]);room.onPlayerBallKick=e?()=>{room.setDiscProperties(0,{color:Math.floor(16777215*Math.random())})}:null,Lib.say("funkyball "+(e?"açık":"kapalı"))},h:null,a:2},maps:{f:(a,e)=>{e.length&&"fetch"===e[0]?(Lib.fetchMaps(),Lib.msgAdmins("haritalar tekrar yüklendi")):Lib.say(Object.keys(Bot.data.maps).join(", "),a.id)},h:"maps (fetch)",a:2},load:{f:(o,l)=>{if(l.length){let a,e=l[0].toLowerCase(),t=null,n=Bot.data.maps;for(a in n)if(a.toLowerCase()===e){t=a;break}if(!t)for(a in n)if(a.toLowerCase().includes(e)){t=a;break}t?("object"==typeof n[t]&&(n[t]=JSON.stringify(n[t])),room.stopGame(),room.setCustomStadium(n[t]),room.startGame(),Lib.msgAdmins(o.name+" "+a+" açtı")):Lib.say("bu harita yok",o.id)}},h:null,a:2}}};room.onPlayerTeamChange=a=>{Bot.po[a.id].team=a.team},room.onPlayerAdminChange=(e,a)=>{if(a){let a=Bot.po[e.id];a.admin=e.admin?Math.max(1,a.admin):0}},room.onGameStart=a=>{clearTimeout(Lib.t)},room.onTeamVictory=a=>{let e=Lib;e.t=setTimeout(()=>{e.victory(a.red>a.blue?1:2)},5e3)},room.onPlayerJoin=e=>{let a=Bot.pa,t=e.name.toLowerCase(),n,o=!1;for(n=a.length-1;0<=n;n--)if(a[n].name.toLowerCase()===t)return room.kickPlayer(e.id,"Odada aynı adlı bir oyuncu var.",!1);for(t=Bot.data,a=t.nameBL,n=a.length-1;0<=n;n--)if(e.name.includes(a[n])){o=!0;break}if(!o)for(a=t.connBL,n=a.length-1;0<=n;n--)if(e.conn===a[n]){o=!0,a.splice(n,1);break}if(o)return room.kickPlayer(e.id,"blacklist",!0);let l={},i={};o=Date.now(),t=Bot.data.recent,n=t.findIndex(a=>a.conn===e.conn),l.id=e.id,l.name=e.name,l.team=0,l.admin=0,i.afk=!1,i.team=0,l.pref=i,i={},i.conn=e.conn,i.mu=-(o+1e4),i.lm=o,i.tc=0,i.av=null,l.log=i,-1===n?o=null:(n=t[n],o=n.name,o===l.name&&(o=null),i.av=n.av,n.mu>-i.mu&&(i.mu=n.mu)),Bot.pa.push(l),Bot.po[l.id]=l,i.av&&room.setPlayerAvatar(l.id,i.av),i=Lib,i.say("Hoş geldin "+l.name+"!"+(o?" (Önceki ad: "+o+")":"")),i.balance(),l=Bot.data.popLimit,l&&Bot.pa.length>=l&&i.setPW(-1)},room.onPlayerLeave=o=>{if(o=Bot.po[o.id]){let a={},e=o.log,t={},n;for(a.name=o.name,a.conn=e.conn,a.av=e.av,a.mu=e.mu,e=Bot.data.recent,n=e.length-1;0<=n;n--)if(e[n].conn===a.conn){e.splice(n,1);break}for(e.push(a),20<e.length&&e.splice(0,1),t=Lib,Bot.po[o.id]=null,e=Bot.pa,n=e.length-1;0<=n;n--)if(e[n].id===o.id){e.splice(n,1);break}t.balance(),a=Bot.data.popLimit,a&&e.length<a&&t.setPW(null)}},room.onPlayerChat=(e,t)=>{e=Bot.po[e.id];let n=Lib,a,o,l;if(e.admin<1){var i=Date.now();if(l=e.log,o=l.mu,o<0&&(-o<i?l.mu=0:15<t.length&&(o=-o)),o>i)return room.sendAnnouncement(Math.ceil((o-i)/1e3)+" saniye sonra yazı yazabilirsiniz.",e.id),!1;if(a=i-l.lm,5e3<a)l.t=0;else if(a<1100&&(l.tc++,2<l.tc))return l.tc=0,n.mute(e,1,"spam"),!1;l.lm=i}if("."===t[0]&&"."!==t[1])try{return a=t.substring(1).split(" "),o=a[0].toLowerCase(),o=n.ch[o],o.a>e.admin?(n.say("bu komutu kullanma yetkiniz yok",e.id),!1):!!o.f(e,a.slice(1))}catch(a){return 0<e.admin&&(n.msgAdmins(e.name+", bir sorun oldu. mesaj: "+t),n.msgAdmins(a.message+" @"+a.lineNumber)),!1}},Lib.fetchMaps();})();