# chunk_06  OWNS 01:00:19 -> 01:11:59  (segments #1085-#1304, 1875 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:59:20] TEACHER: So where would you store this information that when was, let's say you're using LRU or   {#1065}
CTX| [00:59:24] TEACHER: LF in any case, you have to store this information that when was the key last used?   {#1066}
CTX| [00:59:29] TEACHER: When was the key?   {#1067}
CTX| [00:59:30] TEACHER: Like how frequently was the key used?   {#1068}
CTX| [00:59:31] TEACHER: Where would you store this information?   {#1069}
CTX| [00:59:33] STUDENT_3: Uh, so frequency is, uh, I mean, is a property of a key basically because key is, is in both   {#1070}
CTX| [00:59:40] STUDENT_3: case keys is accessed basically.   {#1071}
CTX| [00:59:42] STUDENT_3: So, um, I'm maintaining some, some, some sort of data structure to find out, uh, the eviction   {#1072}
CTX| [00:59:49] STUDENT_3: keys is necessary.   {#1073}
CTX| [00:59:50] STUDENT_3: Like for example, priority queue could be used for a frequency type, right?   {#1074}
CTX| [00:59:54] TEACHER: So you're talking about implementation.   {#1075}
CTX| [00:59:55] TEACHER: First, let's talk about storing this information.   {#1076}
CTX| [00:59:57] TEACHER: Where are you storing the information that when was my key?   {#1077}
CTX| [01:00:00] TEACHER: like least recently,   {#1078}
CTX| [01:00:01] TEACHER: when was my key last used?   {#1079}
CTX| [01:00:04] TEACHER: When would you store this information?   {#1080}
CTX| [01:00:06] TEACHER: Last used.   {#1081}
CTX| [01:00:07] TEACHER: You have to store,   {#1082}
CTX| [01:00:08] TEACHER: you said timestamp you need to store, right?   {#1083}
CTX| [01:00:10] TEACHER: Where are you storing this timestamp?   {#1084}

---- OWNED SEGMENTS START ----
[01:00:19] STUDENT_3: Okay.   {#1085}
[01:00:22] TEACHER: Which is why?   {#1086}
[01:00:23] TEACHER: This wrapper.   {#1087}
[01:00:27] STUDENT_3: In the my right use,   {#1088}
[01:00:28] STUDENT_3: that means you need to,   {#1089}
[01:00:30] STUDENT_3: It says all the keys then.   {#1090}
[01:00:32] TEACHER: No, we'll talk about deployment first storing the information is important.   {#1091}
[01:00:35] TEACHER: Right.   {#1092}
[01:00:35] TEACHER: When was this key last used, right?   {#1093}
[01:00:38] TEACHER: That is important.   {#1094}
[01:00:39] TEACHER: Right.   {#1095}
[01:00:40] TEACHER: So instead of storing that information in a separate data structure, you already have one.   {#1096}
[01:00:45] TEACHER: So in that, along with the type, what you store, you store LRU bits.   {#1097}
[01:00:52] TEACHER: Again, you store four bits or something like that.   {#1098}
[01:00:55] TEACHER: We'll, we'll come to like, what's the sizing of it.   {#1099}
[01:00:57] TEACHER: It's actually 24 bits.   {#1100}
[01:01:00] TEACHER: 8 bits, 28 bits, it stores as LRU bits.   {#1101}
[01:01:02] TEACHER: Redis does that.   {#1102}
[01:01:03] TEACHER: It looks like I'm going deep into Redis, but it's not just Redis,   {#1103}
[01:01:06] TEACHER: but any database that you pick has something around it.   {#1104}
[01:01:09] TEACHER: Now, if you look carefully, this 4 bits and this 28 bits becomes 32 bits.   {#1105}
[01:01:13] TEACHER: This becomes 32 bits.   {#1106}
[01:01:14] TEACHER: So this becomes one integer.   {#1107}
[01:01:15] TEACHER: This becomes two integers.   {#1108}
[01:01:17] TEACHER: So we are trying to make it very space efficient.   {#1109}
[01:01:20] TEACHER: So that's why wrapping it in an object is a very good decision   {#1110}
[01:01:23] TEACHER: because now we are attributing everything that we need,   {#1111}
[01:01:26] TEACHER: any meta information that we need for a key stores over here.   {#1112}
[01:01:31] TEACHER: And every time you are accessing it,   {#1113}
[01:01:33] TEACHER: just do plus plus or updated timestamp and whatnot.   {#1114}
[01:01:37] TEACHER: And LRU bits itself, you can plug in LFU.   {#1115}
[01:01:39] TEACHER: So you may use any eviction bits or something.   {#1116}
[01:01:42] TEACHER: Depending on LRU, you store timestamp.   {#1117}
[01:01:44] TEACHER: Depending on LFU, you store frequency.   {#1118}
[01:01:48] TEACHER: Okay.   {#1119}
[01:01:49] TEACHER: Now, given that these are two very common ways.   {#1120}
[01:01:54] TEACHER: Now that we have this information stored,   {#1121}
[01:01:56] TEACHER: Let me bring to one very interesting question around this.   {#1122}
[01:02:00] TEACHER: Given that we know where we are storing this, now my question is, given that we are storing   {#1123}
[01:02:07] TEACHER: this information, how will we implement LRU or LFE?   {#1124}
[01:02:14] TEACHER: Is priority queue the best way possible to know which one to emit?   {#1125}
[01:02:22] STUDENT_7: um so least recently used is like i mean permitted is in a map and a linked list   {#1126}
[01:02:29] STUDENT_7: um least recently with map and linked list okay how yes um so we are going to store all the key   {#1127}
[01:02:37] STUDENT_7: value pairs in linked list basically but the map is going to store address of those nodes   {#1128}
[01:02:42] STUDENT_7: and map is going to have key value pairs um key and values address of that linked list which stores   {#1129}
[01:02:51] STUDENT_7: value. So when we are going to add something in the map, sorry, when we're going to do the put call,   {#1130}
[01:02:59] STUDENT_7: we basically check the size. We'll also have a size variable of link list. So we are going to   {#1131}
[01:03:06] STUDENT_7: check that size. If it is ready to go in the list, then we will get the address of that value from   {#1132}
[01:03:14] STUDENT_7: the linked list and then make the changes in put call, change the value.   {#1133}
[01:03:20] STUDENT_7: And then just, it's a doubly linked list.   {#1134}
[01:03:22] STUDENT_7: So just remove it from there and put it, add it to the head.   {#1135}
[01:03:29] STUDENT_7: So that's how it is like off one operation only.   {#1136}
[01:03:34] STUDENT_7: And while removing also, we have the map already.   {#1137}
[01:03:38] STUDENT_7: So we'll check if the key exists or not.   {#1138}
[01:03:40] STUDENT_7: If it exists, then just get it from there and remove it directly.   {#1139}
[01:03:45] STUDENT_7: drop down the link.   {#1140}
[01:03:46] STUDENT_7: So that's how it works.   {#1141}
[01:03:48] STUDENT_7: Got it.   {#1142}
[01:03:48] TEACHER: And anytime you access it more,   {#1143}
[01:03:51] TEACHER: you bring it to the head of the list   {#1144}
[01:03:53] TEACHER: so that you know which one to evict.   {#1145}
[01:03:54] STUDENT_7: Right.   {#1146}
[01:03:55] STUDENT_7: Yes.   {#1147}
[01:03:56] TEACHER: Okay.   {#1148}
[01:03:57] TEACHER: This is, everyone talks about this.   {#1149}
[01:03:59] TEACHER: But we are very constrained on memory.   {#1150}
[01:04:03] TEACHER: What is a memory overhead over here, Shreya?   {#1151}
[01:04:06] TEACHER: Let's estimate that.   {#1152}
[01:04:07] TEACHER: For you to manage this node,   {#1153}
[01:04:10] TEACHER: what would be?   {#1154}
[01:04:11] TEACHER: So let's say you have a struct node.   {#1155}
[01:04:14] TEACHER: You said it would be a doubly linked list.   {#1156}
[01:04:16] TEACHER: So you have a next pointer.   {#1157}
[01:04:19] TEACHER: You have a previous pointer.   {#1158}
[01:04:21] TEACHER: And you have a value pointer.   {#1159}
[01:04:24] TEACHER: Which points to the value.   {#1160}
[01:04:25] TEACHER: Right?   {#1161}
[01:04:26] TEACHER: Yeah.   {#1162}
[01:04:28] TEACHER: So for every key.   {#1163}
[01:04:31] TEACHER: And you would have one node.   {#1164}
[01:04:32] TEACHER: For every key value pair that you have.   {#1165}
[01:04:34] TEACHER: Correct?   {#1166}
[01:04:36] STUDENT_7: One node for every.   {#1167}
[01:04:38] STUDENT_7: Yes.   {#1168}
[01:04:38] STUDENT_7: Yes.   {#1169}
[01:04:39] TEACHER: So for every key value pair that you have.   {#1170}
[01:04:42] TEACHER: You are adding overhead of 4 bytes plus 4 bytes plus 4 bytes, 12 bytes.   {#1171}
[01:04:49] TEACHER: Right?   {#1172}
[01:04:50] TEACHER: Now imagine, imagine you are just storing key as A and value as 2.   {#1173}
[01:04:57] TEACHER: So this is 1 byte character.   {#1174}
[01:05:00] TEACHER: This is 4 byte integer.   {#1175}
[01:05:03] TEACHER: For a 5 byte data, you are having 12 byte of overhead to store the least recent C part of it.   {#1176}
[01:05:12] TEACHER: Correct?   {#1177}
[01:05:13] STUDENT_7: Right.   {#1178}
[01:05:15] TEACHER: This is a huge waste of memory.   {#1179}
[01:05:18] TEACHER: So in most cases, when we, and this is what the difference between a very theoretical implementation, which we are taught mostly around this, hey, we'll just use linguist.   {#1180}
[01:05:28] TEACHER: And it's not that linguist is not used.   {#1181}
[01:05:30] TEACHER: Linguist is used, but when you don't have memory constraints, cache is very memory intensive application.   {#1182}
[01:05:36] TEACHER: And Linux kernels is filled with linguist with this exact same approach.   {#1183}
[01:05:42] TEACHER: So Linux, when your operating system is booted up,   {#1184}
[01:05:44] TEACHER: it creates at least 52,000 linked list in memory.   {#1185}
[01:05:50] TEACHER: How do I know that number?   {#1186}
[01:05:51] TEACHER: One of my friends works at a contributes to Linux kernel.   {#1187}
[01:05:55] TEACHER: He's a champ at it.   {#1188}
[01:05:56] TEACHER: He's C pro.   {#1189}
[01:05:58] TEACHER: So I talk to him a lot about this.   {#1190}
[01:06:00] TEACHER: So this is where those kinds of applications,   {#1191}
[01:06:04] TEACHER: it suits really well.   {#1192}
[01:06:05] TEACHER: But for our cache thing,   {#1193}
[01:06:07] TEACHER: which we are very concerned on memory anyway.   {#1194}
[01:06:09] TEACHER: Now what we have to do,   {#1195}
[01:06:12] TEACHER: adding a lot of extra overhead just to maintain this additional information just to implement   {#1196}
[01:06:18] TEACHER: this LRU stuff or LFU stuff over here.   {#1197}
[01:06:22] TEACHER: So there has to be a better way.   {#1198}
[01:06:24] TEACHER: There has to be a more memory efficient way, right?   {#1199}
[01:06:28] TEACHER: Which is where what Redis does is Redis does not maintain this because this requires an   {#1200}
[01:06:36] TEACHER: additional memory overhead.   {#1201}
[01:06:38] TEACHER: Redis would choose or any in-memory cache would choose to store user data.   {#1202}
[01:06:42] TEACHER: instead of storing this random meta information.   {#1203}
[01:06:46] TEACHER: Right.   {#1204}
[01:06:47] TEACHER: So which is why real world implementation of eviction is not about is they, a lot of databases   {#1205}
[01:06:55] TEACHER: choose not to use linked list or something similar for this.   {#1206}
[01:06:58] TEACHER: Right.   {#1207}
[01:06:59] TEACHER: We'll talk about those things in a bit more detail in some time, but which is where, although   {#1208}
[01:07:05] TEACHER: it uses LRE elephant that's very Redis internally cannot go into that depth.   {#1209}
[01:07:09] TEACHER: it would take me three years to talk about it.   {#1210}
[01:07:12] TEACHER: But more importantly, let me   {#1211}
[01:07:13] TEACHER: spend a little more time into   {#1212}
[01:07:15] TEACHER: a third strategy   {#1213}
[01:07:19] TEACHER: which is   {#1214}
[01:07:20] TEACHER: very memory efficient.   {#1215}
[01:07:22] TEACHER: Random eviction.   {#1216}
[01:07:24] TEACHER: So Redis, in general   {#1217}
[01:07:25] TEACHER: Redis also supports random eviction.   {#1218}
[01:07:27] TEACHER: So I didn't know that I   {#1219}
[01:07:29] TEACHER: implemented something back.   {#1220}
[01:07:31] TEACHER: It's a big story. But   {#1221}
[01:07:33] TEACHER: just to add to that context,   {#1222}
[01:07:35] TEACHER: what instead of   {#1223}
[01:07:37] TEACHER: what Redis does or what   {#1224}
[01:07:39] TEACHER: you tend to do is instead of having this additional memory overhead just to maintain this eviction   {#1225}
[01:07:45] TEACHER: to finding which is the most optimal key to remove or rather least recently used or least frequently   {#1226}
[01:07:51] TEACHER: used key to remove what if we pick one key at random and evict it we would not require this at   {#1227}
[01:07:57] TEACHER: all we are literally picking one key at random and evicting it now with this what happens is if   {#1228}
[01:08:05] TEACHER: If you are doing a pure random eviction, we might lose,   {#1229}
[01:08:10] TEACHER: we might delete the key that should be in cache.   {#1230}
[01:08:13] TEACHER: But in any case, if it is frequently used, it would be a cache miss   {#1231}
[01:08:18] TEACHER: and people would get that key and put it there.   {#1232}
[01:08:20] TEACHER: Right.   {#1233}
[01:08:20] TEACHER: It's still not heavy, but what it saves you, it saves you from having   {#1234}
[01:08:26] TEACHER: this extra information.   {#1235}
[01:08:27] TEACHER: So now you can put in more key value pairs in the same amount of space   {#1236}
[01:08:31] TEACHER: by just switching to a random key eviction algorithm.   {#1237}
[01:08:33] TEACHER: This is what I changed in production. FYI, I was eight months old in the industry.   {#1238}
[01:08:39] TEACHER: I changed the eviction strategy in production, changed it to remote.   {#1239}
[01:08:42] TEACHER: We were able to ingest large amount of keys with just very minimal increase in cash miss ratio.   {#1240}
[01:08:49] TEACHER: But we are able to fit in large number of keys. So it basically sorted, it basically balanced things out for us.   {#1241}
[01:08:55] TEACHER: We are literally relying on luck over here that it is possible for one of the most important keys to be evicted.   {#1242}
[01:09:03] TEACHER: But that's okay.   {#1243}
[01:09:04] TEACHER: What are the odds that every time eviction is happening   {#1244}
[01:09:08] TEACHER: and your most important key is getting evicted?   {#1245}
[01:09:10] TEACHER: Not much because you have millions of keys in your database.   {#1246}
[01:09:14] TEACHER: But because we did not have to have this overhead,   {#1247}
[01:09:18] TEACHER: it's very performant.   {#1248}
[01:09:19] TEACHER: Eviction becomes really fast.   {#1249}
[01:09:21] TEACHER: They are not optimal, but they are fast.   {#1250}
[01:09:23] TEACHER: So here you see this trade-off.   {#1251}
[01:09:25] TEACHER: Are you going for optimality when you are reducing it?   {#1252}
[01:09:28] TEACHER: Then you require extra space to maintain   {#1253}
[01:09:30] TEACHER: when was this least recent use   {#1254}
[01:09:34] TEACHER: As soon as you give up on optimality or rather not optimality, my bad, as you said, you give   {#1255}
[01:09:40] TEACHER: up on correctness, the absolute correctness of your system, you can increase or rather   {#1256}
[01:09:44] TEACHER: you can improve the performance of eviction by not having to compute and maintain and   {#1257}
[01:09:48] TEACHER: store this part.   {#1258}
[01:09:49] TEACHER: So it's a trade-off that we are taking.   {#1259}
[01:09:51] TEACHER: Computer science filled with trade-offs, right?   {#1260}
[01:09:54] TEACHER: So LRU, LFU and random, right?   {#1261}
[01:09:57] TEACHER: Okay.   {#1262}
[01:09:57] TEACHER: So let's talk, let's spend more time into understanding LRU and LFU, which is where   {#1263}
[01:10:03] TEACHER: I want to bring out this point.   {#1264}
[01:10:05] TEACHER: When would you sell RU?   {#1265}
[01:10:06] TEACHER: When would you sell a few?   {#1266}
[01:10:08] TEACHER: Now this is not with respect to cash discussion, but in general   {#1267}
[01:10:12] TEACHER: when which algorithm would you use?   {#1268}
[01:10:15] TEACHER: Well, and why Rahul when would you use LRU?   {#1269}
[01:10:20] STUDENT_8: So I think we will use LRU when basically we are having some sort of   {#1270}
[01:10:28] STUDENT_8: let's just say streaming kind of thing.   {#1271}
[01:10:31] STUDENT_8: uh as compared to like let's just say uh least frequently used is nothing like when   {#1272}
[01:10:40] STUDENT_8: when we will use basically uh there is like when there is a lot a lot of things that we need to   {#1273}
[01:10:50] STUDENT_8: access again and again i'm just a little bit confused see this is exactly where the thing is   {#1274}
[01:10:56] TEACHER: Right.   {#1275}
[01:10:57] TEACHER: Everyone gets confused between LRU and LFU.   {#1276}
[01:10:59] TEACHER: People can say it's least recently used, least frequently used, but there is this   {#1277}
[01:11:03] TEACHER: concrete thing, which tells you, Oh, this is where you should use LFU.   {#1278}
[01:11:07] TEACHER: This is where you should use LRU.   {#1279}
[01:11:08] TEACHER: Like what's the differentiator between the two?   {#1280}
[01:11:11] TEACHER: It's okay.   {#1281}
[01:11:11] TEACHER: It's okay.   {#1282}
[01:11:12] TEACHER: Everyone's been through that.   {#1283}
[01:11:13] TEACHER: I've been through that.   {#1284}
[01:11:14] TEACHER: It was very difficult for me, unless I wrote one LRU, LFU.   {#1285}
[01:11:17] TEACHER: Then I built an understanding of it, right?   {#1286}
[01:11:19] TEACHER: Up until then, even I was like that.   {#1287}
[01:11:20] TEACHER: It's because very tricky because at the end when we're explaining, we tend to use   {#1288}
[01:11:26] TEACHER: and frequently and that's exactly what the algorithms   {#1289}
[01:11:29] TEACHER: are but when? I'm looking for   {#1290}
[01:11:31] TEACHER: something more concrete. Mohit?   {#1291}
[01:11:34] TEACHER: When   {#1292}
[01:11:35] TEACHER: would you use LRU? When would you use LFU?   {#1293}
[01:11:36] STUDENT_4: So one place   {#1294}
[01:11:38] STUDENT_4: where I think LFU would make   {#1295}
[01:11:40] STUDENT_4: more sense is places   {#1296}
[01:11:43] STUDENT_4: where you are scanning   {#1297}
[01:11:44] STUDENT_4: a lot of data. In that case   {#1298}
[01:11:46] STUDENT_4: what happens? One   {#1299}
[01:11:48] STUDENT_4: scan basically   {#1300}
[01:11:51] STUDENT_4: could wipe   {#1301}
[01:11:53] STUDENT_4: out your earlier   {#1302}
[01:11:55] STUDENT_4: entries which were   {#1303}
[01:11:56] STUDENT_4: like very   {#1304}
---- OWNED SEGMENTS END ----

CTX| [01:11:59] STUDENT_4: which were used   {#1305}
CTX| [01:12:00] STUDENT_4: more often, right?   {#1306}
CTX| [01:12:02] STUDENT_4: So in that case, a frequency based   {#1307}
CTX| [01:12:04] STUDENT_4: option would be better. For example,   {#1308}
CTX| [01:12:07] STUDENT_4: you are doing a scan query on database.   {#1309}
CTX| [01:12:09] STUDENT_4: In that case, an LFU   {#1310}
CTX| [01:12:11] STUDENT_4: strategy would be better because   {#1311}
CTX| [01:12:12] STUDENT_4: a scan would not   {#1312}
CTX| [01:12:15] STUDENT_4: wipe out say   {#1313}
CTX| [01:12:17] STUDENT_4: very   {#1314}
CTX| [01:12:18] STUDENT_4: the items which are heavily used.   {#1315}
CTX| [01:12:22] TEACHER: Brilliant.   {#1316}
CTX| [01:12:23] TEACHER: This is a first time someone has   {#1317}
CTX| [01:12:24] TEACHER: very beautifully explained where you should use LFU.   {#1318}
CTX| [01:12:27] TEACHER: Thanks so much Mohit for this.   {#1319}
CTX| [01:12:28] TEACHER: I'll just elaborate on this so that everyone's on the same page.   {#1320}
CTX| [01:12:32] TEACHER: Thanks so much.   {#1321}
CTX| [01:12:33] TEACHER: So this is like stock market.   {#1322}
CTX| [01:12:35] TEACHER: So one analogy that I give people to understand LRU and LFU,   {#1323}
CTX| [01:12:39] TEACHER: especially LFU is stock market and not as a use case,   {#1324}
CTX| [01:12:43] TEACHER: but as a human behavior.   {#1325}
CTX| [01:12:44] TEACHER: So what happens is in stock market,   {#1326}
CTX| [01:12:50] TEACHER: Let's say you bought a stock, full faith in that stock.   {#1327}
CTX| [01:12:54] TEACHER: No matter what, this stock is going good, will do great.   {#1328}
CTX| [01:12:58] TEACHER: So you invested in that stock.   {#1329}
