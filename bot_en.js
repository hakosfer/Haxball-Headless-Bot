(function(){let room=HBInit({roomName:"👽 Haxball Room",maxPlayers:12,public:true,noPlayer:true});
let Bot={config:{adminPass:"admPs",mapsUrl:""},pa:[],po:{},data:{mode:0,popLimit:0,msg:"",recent:[],nameBL:[],connBL:[],maps:[]},stats:{kc:{id:1,team:1},kl:{id:1,team:1},victories:[0,0],onKick:a=>{let t=Bot.stats;t.kl=t.kc,t.kc={id:a.id,team:a.team}},onGoal:a=>{let t,s,i=Bot.stats,o="⚽ Goal",e=Bot.po;(s=e[(t=i.kc).id])&&(o+="! "+e[t.id].name+" scores",t.team===a?(i=i.kl).team===a&&t.id!==i.id&&(o+=" (assist: "+e[i.id].name+")"):o+=" (own goal)"),Lib.say(o)}}};
room.setTeamColors(1,60,16777215,[11730944,7208960,3866624]),room.setTeamColors(2,60,16777215,[1079446,809328,606546]),room.setTeamsLock(!0),room.setScoreLimit(3),room.setTimeLimit(5),room.setDefaultStadium("Easy"),room.startGame();let Lib={t:null,victory:e=>{room.stopGame();let a=Bot.data.mode;if(-1===a)return room.startGame();let t=Bot.pa,o,n,l,m=Bot.stats.victories;for(m[e-1]++,Lib.say("🏆 "+(1===e?"Red":"Blue")+" team wins! Red "+m[0]+":"+m[1]+" Blue"),(2<m[0]||2<m[1])&&(a=-2,m[0]=0,m[1]=0),o=t.length-1;0<=o;o--)n=t[o],l=n.pref,l.afk||(-2===a?(l.team=0===n.team?e-3:l.team,n.team=0,room.setPlayerTeam(n.id,0)):0===a||n.team===3-e?(n.team=0,room.setPlayerTeam(n.id,0)):0===n.team&&(l.team=e-3));Lib.balance(),room.startGame()},balance:()=>{var i=Bot.data.mode;if(-1!==i){let e=[[],[],[],[],[]],a,t=Bot.pa,o,n,l,m;for(a=t.length-1;0<=a;a--)o=t[a],n=o.pref,n.afk||(0===n.team?e[o.team].push(o.id):(e[Math.abs(n.team)+2].push(o.id),n.team<0&&(n.team=0)));for(t=e[0],a=t.length-1;0<a;a--)n=Math.floor(Math.random()*(a+1)),o=t[a],t[a]=t[n],t[n]=o;for(a=t.length-1;0<=a&&(l=e[1].length+e[3].length,m=e[2].length+e[4].length,!(0<i&&l>=i&&m>=i));a--)n=l-m,o=0===n?1+Math.floor(2*Math.random()):0<n?2:1,e[o].push(t[a]),t.splice(a,1);if(0===i){if(n=e[1].length+e[3].length-e[2].length-e[4].length,n<-1||1<n)for(m=n<0?2:1,t=e[m],n=Math.floor(Math.abs(n)/2),a=t.length-1;0<=a&&(o=t[a],e[3-m].push(o),t.splice(a,1),n--,0!==n);a--);}else for(a=1;a<3;a++)if(t=e[a],o=t.length+e[a+2].length,o>i)for(o-=i,n=t.length-1;0<=n&&(e[0].push(t[n]),t.splice(n,1),o--,0!==o);n--);for(a=0;a<5;a++)for(o=e[a],n=o.length-1;0<=n;n--)room.setPlayerTeam(o[n],a<3?a:a-2)}},fetchMaps:()=>{if(!(Bot.config.mapsUrl.length<1)){let a=Bot.data;fetch(Bot.config.mapsUrl).then(function(e){return e.ok?e.json():Promise.reject({status:e.status,statusText:e.statusText})}).then(function(e){a.maps=e}).catch(e=>{console.log(e)})}},setPW:(e,a=!1)=>{e=!e||e.length<1?null:-1===e?Math.round(1e9*Math.random()).toString(16):e,room.setPassword(e),a&&Lib.msgAdmins("password"+(null===e?" cleared":": "+e))},nameToPlayer:(e=null)=>{if(null===e||e.length<1)return null;if("#"===e[0])return Bot.po[parseInt(e.substring(1))];e=e.toLowerCase();let a=Bot.pa,t,o,n;for(t=a.length-1;0<=t;t--)if(o=a[t],n=o.name.toLowerCase(),n===e)return o;for(t=a.length-1;0<=t;t--)if(o=a[t],n=o.name.toLowerCase(),n.includes(e))return o;return null},mix:e=>{let a,t,o=Bot.pa;for(a=o.length-1;0<=a;a--)t=o[a],room.setPlayerTeam(t.id,0),t.team=0;Lib.balance(),e&&e()},mute:(e,a,t=null,o=!0)=>{e.log.mu=Date.now()+6e4*a,o&&Lib.say("🔕 "+e.name+" is "+(0<a?"muted for "+a+" minutes"+(t?" ("+t+")":""):"unmuted"))},say:(e,a)=>{room.sendAnnouncement(e,a,a?11393254:8513796)},msgAdmins:(e,a=1)=>{let t,o,n=Bot.pa;for(t=n.length-1;0<=t;t--)o=n[t],o.admin>=a&&room.sendAnnouncement(e,o.id,16768768)},ch:{help:{f:(e,a)=>{let t=Lib,o=t.ch,n;a.length?a[0]in o&&(n=o[a[0]],"h"in n&&n.h&&t.say(n.h,e.id)):(t.say("commands: "+Object.keys(o).join(", "),e.id),t.say("detailed help: .help [cmd]",e.id))},h:null,a:1},admin:{f:(e,a)=>{e.admin<=0&&a[0]!==Bot.config.adminPass||(e.admin=2,1<a.length?(room.setPlayerAdmin(e.id,!1),Lib.msgAdmins(e.name+" is hidden admin.")):room.setPlayerAdmin(e.id,!0))},h:"admin [password] (hidden)",a:0},setadminlevel:{f:(e,a)=>{let t=Lib.nameToPlayer(a[0]),o=Math.min(2,Math.abs(parseInt(a[1])));t.admin=o,room.setPlayerAdmin(t.id,0<o&&a.length<3),Lib.msgAdmins(t.name+" is "+(0===o?" not":"")+(0<o&&2<a.length?"hidden ":"")+"admin ("+e.name+")")},h:"setadminlevel [player] [level] (hidden)",a:2},say:{f:(e,a)=>{Lib.say(a.join(" "))},h:null,a:1},v:{f:(e,a)=>{Lib.say("v5.4.1")},h:null,a:1},m:{f:(e,a)=>{let t=Bot.data;a.length&&(t.msg=a.join(" ")),Lib.say(t.msg)},h:"m ([msg])",a:1},pm:{f:(e,a)=>{var t=a.slice(1).join(" "),a=Lib.nameToPlayer(a[0]);Lib.say("(PM) "+e.name+": "+t,a.id),Lib.say("(PM to "+a.name+"): "+t,e.id)},h:"pm [player] [message]",a:2},mute:{f:(e,a)=>{let t=a[0].toLowerCase(),o=Math.min(parseFloat(a[1]),10),n,l=Lib.mute;if((isNaN(o)||o<0)&&(o=0),"all"===t){let e,a=Bot.pa;for(e=a.length-1;0<=e;e--)n=a[e],n.a||l(n,o,null,!1);Lib.say("🔕 everyone is "+(0<o?"muted for "+o+" minutes":"unmuted"))}else n=Lib.nameToPlayer(t),n.a||l(n,o,"admin")},h:"mute [player/all] [mins]",a:2},team:{f:(e,a)=>{let t=a[0],o=a[1][0],n,l,m,i=Lib,r=!1;if("-"===o&&(r=!0,a[1]=a[1].substring(1),o=a[1][0]),l="r"===o?1:"b"===o?2:"n"===o?0:parseInt(a[1]),(isNaN(l)||l<0||2<l)&&(l=0),"all"===t)o=Bot.pa,m="Everyone";else{if(o=i.nameToPlayer(t),!o)return;m=o.name,o=[o]}if(i.say(m+" "+(0===l?"removed their team preference":"is "+(r?"moved":"assigned")+" to "+(1===l?"red":"blue")+" team")),r)for(n=o.length-1;0<=n;n--)room.setPlayerTeam(o[n].id,l),o[n].team=l;else{for(n=o.length-1;0<=n;n--)o[n].pref.team=l;i.balance()}},h:"team [player/all] [0/1/2]",a:2},afk:{f:(e,a)=>{let t=Lib,o=0===a.length?e:t.nameToPlayer(a[0]);o&&((e=o.pref).afk=!e.afk,t.say(o.name+" is"+(e.afk?"":" not")+" AFK."),e.team=0,e.afk&&room.setPlayerTeam(o.id,0),t.balance())},h:null,a:1},blacklist:{f:(e,a)=>{let t=a[0],o=a[1],n=Bot.data,l;switch(t){case"recent":for(Lib.say("recent players (oldest first):",e.id),n=n.recent,o=0;o<n.length;o++)t=n[o],Lib.say('"'+t.name+'": '+t.conn,e.id);l=null;break;case"ip":t=n.connBL,-1===t.indexOf(o)&&t.push(o);var m=n.recent.find(e=>e.conn===o);l=(m?m.name:o)+" ip-blacklisted";break;case"name":n=n.nameBL,-1===n.indexOf(o)&&n.push(o),l=o+" name-blacklisted";break;case"clear":n.nameBL=[],n.connBL=[],l="blacklists cleared";break;case"get":Lib.msgAdmins("Blacklists:"),Lib.msgAdmins("Names: "+n.nameBL.join(", ")),l="IPs:"+n.connBL.join(", ");break;default:Lib.say("pls "+Lib.ch.blacklist.h,e.id),l=null}l&&Lib.msgAdmins(l)},h:"blacklist [clear/get/recent/ip/name] ([conn/ExactName])",a:2},kick:{f:(e,a)=>{var t=Lib.nameToPlayer(a[0]),a=1<a.length&&0<a[1].length?a.slice(1).join(" "):null;room.kickPlayer(t.id,a,!1)},h:null,a:2},ban:{f:(e,a)=>{var t=Lib.nameToPlayer(a[0]),a=1<a.length&&0<a[1].length?a.slice(1).join(" "):null;room.kickPlayer(t.id,a,!0)},h:null,a:2},game:{f:(e,a)=>{let t=Lib.mix,o=e.name;switch(a[0]){case"mix":t(),o+=" mixed the teams";break;case"remix":room.stopGame(),t(room.startGame),o+=" mixed the teams";break;case"restart":room.stopGame(),room.startGame(),o+=" restarted the game";break;case"mode":t=a[1][0].toLowerCase(),t="m"===t?-1:"f"===t?0:parseInt(a[1]),t=isNaN(t)?0:t<0?-1:t,Bot.data.mode=t,Lib.balance(),o+=", game mode: "+(-1===t?"manual":0===t?"free for all":t+"v"+t);break;case"poplimit":t=parseInt(a[1]),t=isNaN(t)?0:Math.abs(t),Bot.data.popLimit=t,Lib.setPW(t&&Bot.pa.length>=t?-1:null),o+=" set pop limit "+(0===t?"off":t);break;case"commentator":t=a[1].toLowerCase(),t="on"===t?1:"off"===t?0:parseInt(t),t=isNaN(t)?0:t,o+=" set commentator "+(1===t?"on":"off"),0===t?(room.onPlayerBallKick=null,room.onTeamGoal=null):(t=Bot.stats,room.onPlayerBallKick=t.onKick,room.onTeamGoal=t.onGoal);break;default:o=null}o&&Lib.msgAdmins(o)},h:"game mix/remix/restart/mode/commentator/poplimit ([value])",a:2},setpw:{f:(e,a)=>{var t=a[0].substring(0,4);"rand"===t||"null"!==t&&a[0],Lib.setPW(t,!0)},h:"setpw [aBc123/rand/null]",a:2},avatar:{f:(e,a)=>{let t=a[0],o=a[1][0],n,l,m;if("all"===t)l=Bot.pa;else{if(l=Lib.nameToPlayer(t),!l)return;l=[l]}for(t=l.length,n="c"===o?null:"d"===o?"🎃":a[1],m=t-1;0<=m;m--)room.setPlayerAvatar(l[m].id,n);1===t&&(l[0].log.av=n)},h:"avatar [player/all] clear/default/[av]",a:2},funkyball:{f:(e,a)=>{a=1===parseInt(a[0]),room.onPlayerBallKick=a?()=>{room.setDiscProperties(0,{color:Math.floor(16777215*Math.random())})}:null,Lib.say("funkyball "+(a?"on":"off"))},h:null,a:2},maps:{f:(e,a)=>{a.length&&"fetch"===a[0]?(Lib.fetchMaps(),Lib.msgAdmins("stadiums reloaded")):Lib.say(Object.keys(Bot.data.maps).join(", "),e.id)},h:"maps (fetch)",a:2},load:{f:(n,l)=>{if(l.length){let e,a=l[0].toLowerCase(),t=null,o=Bot.data.maps;for(e in o)if(e.toLowerCase()===a){t=e;break}if(!t)for(e in o)if(e.toLowerCase().includes(a)){t=e;break}t?("object"==typeof o[t]&&(o[t]=JSON.stringify(o[t])),room.stopGame(),room.setCustomStadium(o[t]),room.startGame(),Lib.msgAdmins(n.name+" loaded "+e)):Lib.say("no such stadium",n.id)}},h:null,a:2}}};room.onPlayerTeamChange=e=>{Bot.po[e.id].team=e.team},room.onPlayerAdminChange=(a,e)=>{if(e){let e=Bot.po[a.id];e.admin=a.admin?Math.max(1,e.admin):0}},room.onGameStart=e=>{clearTimeout(Lib.t)},room.onTeamVictory=e=>{let a=Lib;a.t=setTimeout(()=>{a.victory(e.red>e.blue?1:2)},5e3)},room.onPlayerJoin=a=>{let e=Bot.pa,t=a.name.toLowerCase(),o,n=!1;for(o=e.length-1;0<=o;o--)if(e[o].name.toLowerCase()===t)return room.kickPlayer(a.id,"Name is already taken.",!1);for(t=Bot.data,e=t.nameBL,o=e.length-1;0<=o;o--)if(a.name.includes(e[o])){n=!0;break}if(!n)for(e=t.connBL,o=e.length-1;0<=o;o--)if(a.conn===e[o]){n=!0,e.splice(o,1);break}if(n)return room.kickPlayer(a.id,"blacklist",!0);let l={},m={};n=Date.now(),t=Bot.data.recent,o=t.findIndex(e=>e.conn===a.conn),l.id=a.id,l.name=a.name,l.team=0,l.admin=0,m.afk=!1,m.team=0,l.pref=m,m={},m.conn=a.conn,m.mu=-(n+1e4),m.lm=n,m.tc=0,m.av=null,l.log=m,-1===o?n=null:(o=t[o],n=o.name,n===l.name&&(n=null),m.av=o.av,o.mu>-m.mu&&(m.mu=o.mu)),Bot.pa.push(l),Bot.po[l.id]=l,m.av&&room.setPlayerAvatar(l.id,m.av),m=Lib,m.say("Welcome "+l.name+"!"+(n?" (Previous name: "+n+")":"")),m.balance(),l=Bot.data.popLimit,l&&Bot.pa.length>=l&&m.setPW(-1)},room.onPlayerLeave=n=>{if(n=Bot.po[n.id]){let e={},a=n.log,t={},o;for(e.name=n.name,e.conn=a.conn,e.av=a.av,e.mu=a.mu,a=Bot.data.recent,o=a.length-1;0<=o;o--)if(a[o].conn===e.conn){a.splice(o,1);break}for(a.push(e),20<a.length&&a.splice(0,1),t=Lib,Bot.po[n.id]=null,a=Bot.pa,o=a.length-1;0<=o;o--)if(a[o].id===n.id){a.splice(o,1);break}t.balance(),e=Bot.data.popLimit,e&&a.length<e&&t.setPW(null)}},room.onPlayerChat=(e,a)=>{e=Bot.po[e.id];let t=Lib,o,n,l;if(e.admin<1){var m=Date.now();if(l=e.log,n=l.mu,n<0&&(-n<m?l.mu=0:15<a.length&&(n=-n)),n>m)return room.sendAnnouncement("you can chat in "+Math.ceil((n-m)/1e3)+" seconds.",e.id),!1;if(o=m-l.lm,5e3<o)l.t=0;else if(o<1100&&(l.tc++,2<l.tc))return l.tc=0,t.mute(e,1,"spam"),!1;l.lm=m}if("."===a[0]&&"."!==a[1])try{return o=a.substring(1).split(" "),n=o[0].toLowerCase(),n=t.ch[n],n.a>e.admin?(t.say("you are not authorized to use this command",e.id),!1):!!n.f(e,o.slice(1))}catch(o){return 0<e.admin&&(t.msgAdmins(e.name+", an error occurred. message: "+a),t.msgAdmins(o.message+" @"+o.lineNumber)),!1}},Lib.fetchMaps();})();