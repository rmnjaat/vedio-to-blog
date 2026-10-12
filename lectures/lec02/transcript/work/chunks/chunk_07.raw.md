# chunk_07  OWNS 01:14:09 -> 01:27:03  (segments #1143-#1369, 2103 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:13:10] TEACHER: a generalized way of storing things, not specific cases.   {#1128}
CTX| [01:13:13] TEACHER: If this then go here, if that then go here.   {#1129}
CTX| [01:13:16] TEACHER: ifs and elses are the worst when it comes to databases.   {#1130}
CTX| [01:13:20] TEACHER: So the way we model this is your DMs are channeled with two people   {#1131}
CTX| [01:13:24] TEACHER: and you can add a type over here in channel,   {#1132}
CTX| [01:13:27] TEACHER: which says if it is a group or a user or a channel,   {#1133}
CTX| [01:13:35] TEACHER: something like this, right?   {#1134}
CTX| [01:13:36] TEACHER: You can have a regular channel, something like this, right?   {#1135}
CTX| [01:13:39] TEACHER: You may have type with this because now what you can have seamlessly   {#1136}
CTX| [01:13:43] TEACHER: is this channel ID pointing to here, right?   {#1137}
CTX| [01:13:46] TEACHER: So direct message still not a problem because now with this type you can render it on the top half or on the bottom half because direct messages are on the bottom half.   {#1138}
CTX| [01:13:55] TEACHER: Channels are on the top half.   {#1139}
CTX| [01:13:56] TEACHER: You can very easily render it.   {#1140}
CTX| [01:13:58] TEACHER: Using the channel you can iterate through historical messages because you have all of them.   {#1141}
CTX| [01:14:02] TEACHER: You would have a timestamp field on when it was created, message created at or something.   {#1142}

---- OWNED SEGMENTS START ----
[01:14:09] TEACHER: Created at and whatnot.   {#1143}
[01:14:11] TEACHER: You can iterate through this and go historical messages.   {#1144}
[01:14:14] TEACHER: Store membership information over here.   {#1145}
[01:14:16] TEACHER: Channel information over here is an information over there.   {#1146}
[01:14:19] TEACHER: And now the beauty of this design.   {#1147}
[01:14:22] TEACHER: Why I named it membership because it's a noun.   {#1148}
[01:14:26] TEACHER: It doesn't restrict us.   {#1149}
[01:14:27] TEACHER: Like if you hear the term user channel for this, I'm talking about this.   {#1150}
[01:14:33] TEACHER: If you think of user channel, you may think I would only just store   {#1151}
[01:14:37] TEACHER: a mapping of user and the channel.   {#1152}
[01:14:38] TEACHER: But now when you hear membership, now what you can do is you can actually store   {#1153}
[01:14:46] TEACHER: the checkpoint over here. What is this checkpoint? For example, a user is part of a channel. Now   {#1154}
[01:14:56] TEACHER: this checkpoint can store that I can, I have read messages till this point on the UI.   {#1155}
[01:15:02] TEACHER: You see the unread message count. You see you last read until here. And then like when you   {#1156}
[01:15:08] TEACHER: click on a channel, if there are a hundred messages, it takes you to that point. Right.   {#1157}
[01:15:12] TEACHER: That's a checkpoint that you last you read was still this point.   {#1158}
[01:15:16] TEACHER: With this, what you can do is you can implement checkpoint   {#1159}
[01:15:19] TEACHER: because you named it membership.   {#1160}
[01:15:20] TEACHER: It automatically wires your brain.   {#1161}
[01:15:22] TEACHER: It automatically triggers your brain to think that I can add more attributes to that.   {#1162}
[01:15:27] TEACHER: Now, what here you can do is in this user channel information,   {#1163}
[01:15:30] TEACHER: you can actually store that this user on this channel has read till this point   {#1164}
[01:15:37] TEACHER: is active for this time and whatnot.   {#1165}
[01:15:39] TEACHER: You can add a ton of attributes over here   {#1166}
[01:15:42] TEACHER: how a user is behaving or is interacting with the channel.   {#1167}
[01:15:47] TEACHER: Now this channel can be a channel or a user or a DM or anything, but this gives you a   {#1168}
[01:15:52] TEACHER: scope of extension.   {#1169}
[01:15:54] TEACHER: Checkpoint is just one placeholder that I kept it that I read till this timestamp.   {#1170}
[01:15:58] TEACHER: I need all the messages are now I can start reading from that.   {#1171}
[01:16:01] TEACHER: It shows you in a very nice way.   {#1172}
[01:16:03] TEACHER: So that is a checkpoint at last timestamp on this channel.   {#1173}
[01:16:06] TEACHER: I read till this part, right?   {#1174}
[01:16:08] TEACHER: Something on those lines.   {#1175}
[01:16:09] TEACHER: And whenever you open a channel, the checkpoint moves to the bottom of it.   {#1176}
[01:16:13] TEACHER: So the last message read might be there.   {#1177}
[01:16:16] TEACHER: So you can store timestamp, you can store message ID, anything over here depends on your implementation.   {#1178}
[01:16:20] TEACHER: Right.   {#1179}
[01:16:21] TEACHER: Which granularity you would want to, you either want to operate on the time level granularity   {#1180}
[01:16:25] TEACHER: that I read till this time, or you want to operate on message level granularity that   {#1181}
[01:16:28] TEACHER: I operate, I read till this message.   {#1182}
[01:16:30] TEACHER: So this checkpoint could be in it.   {#1183}
[01:16:31] TEACHER: But now with this membership as a noun, you can naturally see it extending into how a   {#1184}
[01:16:39] TEACHER: relationship of a user is with the channel.   {#1185}
[01:16:41] TEACHER: How active.   {#1186}
[01:16:42] TEACHER: Now, if let's say user muted a channel, add it over here.   {#1187}
[01:16:46] TEACHER: User favorited a channel, add it over here.   {#1188}
[01:16:48] TEACHER: No need to have another table to store favorites.   {#1189}
[01:16:52] TEACHER: That's the beauty of this design that you are keeping it really simple and giving entities   {#1190}
[01:16:59] TEACHER: like the entity of the table name.   {#1191}
[01:17:02] TEACHER: You are giving them identities, membership.   {#1192}
[01:17:05] TEACHER: Now it helps you go on those.   {#1193}
[01:17:09] TEACHER: interaction that a user has with the channel you can put it over here checkpoint favorites red till   {#1194}
[01:17:16] TEACHER: whatnot like muted these type of notification that type of notification what not you can do all of   {#1195}
[01:17:22] TEACHER: that over here that's why this table becomes that key thing in the system right okay done now this   {#1196}
[01:17:32] TEACHER: is done now let's go into high level part now this was like some key points that i wanted to throw out   {#1197}
[01:17:36] TEACHER: that you should always keep in mind.   {#1198}
[01:17:38] TEACHER: One key takeaways, noun-based stuff.   {#1199}
[01:17:40] TEACHER: How you are piggybacking and not having ifs and else's.   {#1200}
[01:17:43] TEACHER: Two big key takeaways from this.   {#1201}
[01:17:47] TEACHER: Okay, now let's go into the high-level design of it.   {#1202}
[01:17:51] TEACHER: Now, how would Slack's real-time communication actually work?   {#1203}
[01:17:55] TEACHER: Now, obviously, let me make things simple for you.   {#1204}
[01:17:58] TEACHER: Let's say, hypothetically, we are storing the data,   {#1205}
[01:18:03] TEACHER: the messages in a relational database which is sharded.   {#1206}
[01:18:09] TEACHER: You can also store it in non-relational.   {#1207}
[01:18:11] TEACHER: You don't typically need to store it in non-relational over here   {#1208}
[01:18:14] TEACHER: because the frequency of messages is not very high.   {#1209}
[01:18:18] TEACHER: A simple sharded relational database would work.   {#1210}
[01:18:21] TEACHER: You can also choose to store it on a non-relational database   {#1211}
[01:18:23] TEACHER: like MongoDB or Cassandra.   {#1212}
[01:18:25] TEACHER: No one's stopping that from you because all you need is a way   {#1213}
[01:18:29] TEACHER: to store all the messages that are getting ingested   {#1214}
[01:18:33] TEACHER: scroll through them nothing more nothing less even relational database would do a very good job over   {#1215}
[01:18:38] TEACHER: here obviously given that it is partitioned and sharded non-relational database like Cassandra   {#1216}
[01:18:44] TEACHER: would also do Cassandra like databases where it is very ingestion heavy you can use it to build   {#1217}
[01:18:50] TEACHER: very high ingestion system for example real-time chat messages like whatsapp or instagram or tinder   {#1218}
[01:18:57] TEACHER: or whatnot those kind of use cases suit very well for non-relational databases at scale   {#1219}
[01:19:03] TEACHER: an enterprise application for enterprise application the use case would be a little   {#1220}
[01:19:07] TEACHER: different because there is no huge amount of messages being exchanged once a while you don't   {#1221}
[01:19:12] TEACHER: chit chat like people chit chat but not everyone chit chats sends hundreds and thousands of messages   {#1222}
[01:19:18] TEACHER: to everyone because they are there to work that's why picking a database depends on the product   {#1223}
[01:19:24] TEACHER: and the requirement not your affinity to a particular stack so which is where it's not   {#1224}
[01:19:29] TEACHER: customary for you to pick a non-relational database but you would definitely need sharding   {#1225}
[01:19:34] TEACHER: and partitioning over here so we can go for a simple mysql or we can go for as well as we can   {#1226}
[01:19:41] TEACHER: go for cassandra we can go for mongo we can go for any database there is no hard and fast rule   {#1227}
[01:19:47] TEACHER: over here at all because the scale is not huge you can add more partitions put a bunch of   {#1228}
[01:19:55] TEACHER: enterprise customers on a particular database and whatnot.   {#1229}
[01:19:58] TEACHER: You can get it done on a relational degree.   {#1230}
[01:20:00] TEACHER: You don't need fancy NoSQL database to hold all of them.   {#1231}
[01:20:03] TEACHER: That's the beauty of this.   {#1232}
[01:20:04] TEACHER: So whenever you are picking something,   {#1233}
[01:20:06] TEACHER: understand where you are picking it from.   {#1234}
[01:20:08] TEACHER: What's the use case that you are solving?   {#1235}
[01:20:10] TEACHER: There is no big reason for you to pick Cassandra over here.   {#1236}
[01:20:14] TEACHER: But if you are building Instagram Messenger,   {#1237}
[01:20:16] TEACHER: I would have gone for Cassandra.   {#1238}
[01:20:18] TEACHER: Because there everyone is chit-chatting.   {#1239}
[01:20:21] TEACHER: All the data, all the users is present in this one database.   {#1240}
[01:20:25] TEACHER: Enterprise customers have different requirements.   {#1241}
[01:20:27] TEACHER: Normal users have different requirements.   {#1242}
[01:20:29] TEACHER: So I would have gone for high ingestion rate database.   {#1243}
[01:20:32] TEACHER: That's why Cassandra for Instagram use case.   {#1244}
[01:20:34] TEACHER: But for enterprise application, where this is not a real-time chit chat,   {#1245}
[01:20:38] TEACHER: you can do chit chat, but it's not, everyone is not doing chit chat.   {#1246}
[01:20:41] TEACHER: It's very formal messaging that is happening there.   {#1247}
[01:20:44] TEACHER: So even MySQL would work.   {#1248}
[01:20:46] TEACHER: I can still choose Cassandra, but even MySQL would work.   {#1249}
[01:20:49] TEACHER: So long as I'm partitioning and sharting, right?   {#1250}
[01:20:52] TEACHER: So there is no hard and fast food over here.   {#1251}
[01:20:55] TEACHER: what you want, all good.   {#1252}
[01:20:57] TEACHER: Right?   {#1253}
[01:20:57] TEACHER: Okay.   {#1254}
[01:20:58] TEACHER: So we pick a database to store this.   {#1255}
[01:21:00] TEACHER: Now, in any case, you pick MongoDB, MySQL, Cassandra, any,   {#1256}
[01:21:03] TEACHER: the overall schema would look something very similar to this.   {#1257}
[01:21:06] TEACHER: Like, no major devils there.   {#1258}
[01:21:09] TEACHER: Right?   {#1259}
[01:21:10] TEACHER: Okay.   {#1260}
[01:21:11] TEACHER: Now, what next?   {#1261}
[01:21:13] TEACHER: We have users that are there in the system.   {#1262}
[01:21:17] TEACHER: Now, comes a really interesting point.   {#1263}
[01:21:21] TEACHER: Imagine Slack.   {#1264}
[01:21:22] TEACHER: Right?   {#1265}
[01:21:25] TEACHER: only so when a user sends a message how should that message be persisted in this database   {#1266}
[01:21:35] TEACHER: so raise your hands i'll pull you in meanwhile i'll just draw a couple of stuff that we need   {#1267}
[01:21:50] TEACHER: Okay.   {#1268}
[01:21:52] TEACHER: Now I have drawn just one API servers.   {#1269}
[01:21:55] TEACHER: These are API servers over here.   {#1270}
[01:21:57] TEACHER: Now, how would the message sent by a particular user be for a particular channel go and be   {#1271}
[01:22:06] TEACHER: stored in the database?   {#1272}
[01:22:07] TEACHER: What would you do?   {#1273}
[01:22:12] TEACHER: Yeah.   {#1274}
[01:22:15] STUDENT_1: So what I'm currently thinking Arpit is like, first of all, there would be like some socket   {#1275}
[01:22:20] STUDENT_1: connection between the users and the API server.   {#1276}
[01:22:24] STUDENT_1: So that like we have a web socket connection and, why do you need a socket connection?   {#1277}
[01:22:31] TEACHER: Why do you need a web socket connection?   {#1278}
[01:22:32] STUDENT_1: So basically a point is like when a user sends a message, somebody would be replying to it   {#1279}
[01:22:39] STUDENT_1: and it would be like happening very on instant basis.   {#1280}
[01:22:43] STUDENT_1: So we need to like communicate from server to client also.   {#1281}
[01:22:46] STUDENT_1: Like we need to tell server to like inform all the clients of that channel that we have   {#1282}
[01:22:52] STUDENT_1: received a message.   {#1283}
[01:22:53] TEACHER: But this does not mean that sending also needs to be done on best topic.   {#1284}
[01:22:59] TEACHER: Does it?   {#1285}
[01:23:00] TEACHER: Receiving?   {#1286}
[01:23:01] TEACHER: Okay.   {#1287}
[01:23:02] TEACHER: So that people don't have to refresh.   {#1288}
[01:23:03] TEACHER: Right.   {#1289}
[01:23:04] TEACHER: But sending.   {#1290}
[01:23:06] STUDENT_1: So when we are sending the notification from server to,   {#1291}
[01:23:10] STUDENT_1: like we'll send the notification from server to client, right?   {#1292}
[01:23:13] STUDENT_1: That you have received a message.   {#1293}
[01:23:15] TEACHER: That is WebSocket.   {#1294}
[01:23:15] TEACHER: But sending a message.   {#1295}
[01:23:17] TEACHER: You said sending a message will happen over WebSocket.   {#1296}
[01:23:19] TEACHER: Why?   {#1297}
[01:23:20] TEACHER: Why should it happen over WebSocket?   {#1298}
[01:23:22] STUDENT_1: Okay.   {#1299}
[01:23:23] STUDENT_1: So like I thought of because we need server to client also.   {#1300}
[01:23:27] STUDENT_1: So anyways, I'll be using WebSocket.   {#1301}
[01:23:29] STUDENT_1: So I can use it for sending also.   {#1302}
[01:23:32] TEACHER: Why there has to be a proper ISD, right?   {#1303}
[01:23:34] TEACHER: Just because you have it does not mean you have to use it.   {#1304}
[01:23:38] TEACHER: Think about the guarantees that you get or things that you lose when you use web   {#1305}
[01:23:44] TEACHER: sockets.   {#1306}
[01:23:46] TEACHER: So let's say I have a bunch of web sockets server.   {#1307}
[01:23:49] TEACHER: I agree that user would have connections with normal API servers also.   {#1308}
[01:23:55] TEACHER: And web sockets servers also.   {#1309}
[01:23:57] TEACHER: Right now, when you are sending a message, you can send it.   {#1310}
[01:24:03] TEACHER: via API also, you can send it via web socket also.   {#1311}
[01:24:06] TEACHER: Now, why did you pick to send it over web socket?   {#1312}
[01:24:10] TEACHER: Just because you have it, was that the only reason behind it?   {#1313}
[01:24:13] TEACHER: Or do you get any other benefits?   {#1314}
[01:24:18] STUDENT_1: So initially, like my thought process was just this only that since I am anyways   {#1315}
[01:24:22] STUDENT_1: using web socket, I can leverage it to send the messages also.   {#1316}
[01:24:26] TEACHER: Okay.   {#1317}
[01:24:27] TEACHER: Okay.   {#1318}
[01:24:28] TEACHER: Let me pull in Sunil.   {#1319}
[01:24:29] TEACHER: Sunil, what would you have done?   {#1320}
[01:24:32] TEACHER: API or a special web socket server to send message special web socket.   {#1321}
[01:24:37] STUDENT_4: So the reason is overhead for each message.   {#1322}
[01:24:42] TEACHER: Okay.   {#1323}
[01:24:43] TEACHER: Are you just trying to save overhead for each message, but why are you   {#1324}
[01:24:45] STUDENT_4: trying to save that overhead?   {#1325}
[01:24:47] STUDENT_4: So compared to like no rest API communication, the overhead it requires   {#1326}
[01:24:53] STUDENT_4: to send to like, no backend it is low.   {#1327}
[01:24:57] TEACHER: And again, why the entire world is not using web socket for every   {#1328}
[01:25:02] TEACHER: Why does the rest even exist?   {#1329}
[01:25:03] STUDENT_4: This use case is frequent communication, right?   {#1330}
[01:25:06] STUDENT_4: Because users like to server, uh, very frequently.   {#1331}
[01:25:13] TEACHER: You're saying frequent is Slack really as frequent as your Instagram messenger.   {#1332}
[01:25:19] TEACHER: Think about it.   {#1333}
[01:25:20] TEACHER: How many messages do you receive on Slack slash teams?   {#1334}
[01:25:24] TEACHER: Not many.   {#1335}
[01:25:26] TEACHER: Do you really need to save that?   {#1336}
[01:25:28] TEACHER: But what is more critical for enterprise?   {#1337}
[01:25:30] TEACHER: Think on those lines.   {#1338}
[01:25:32] TEACHER: Is persistence of message more important?   {#1339}
[01:25:36] TEACHER: Right.   {#1340}
[01:25:37] TEACHER: What is like, it's an enterprise user, right?   {#1341}
[01:25:41] TEACHER: Slacks user base is an enterprise.   {#1342}
[01:25:44] TEACHER: Like basically slack customer is an enterprise customer.   {#1343}
[01:25:46] TEACHER: What is more important for them?   {#1344}
[01:25:48] TEACHER: Right.   {#1345}
[01:25:49] TEACHER: That is one way to think about it.   {#1346}
[01:25:50] TEACHER: Second way to think about it.   {#1347}
[01:25:51] TEACHER: Do you really need everything to be done in an instant?   {#1348}
[01:25:54] TEACHER: Then the normally pass of us would not have even existed because everything has an overhead.   {#1349}
[01:25:58] TEACHER: Let me just use web socket for everything.   {#1350}
[01:26:00] TEACHER: Right.   {#1351}
[01:26:01] TEACHER: But that's not happening.   {#1352}
[01:26:02] TEACHER: So there has to be a better reasoning for you to pick either these or this.   {#1353}
[01:26:08] TEACHER: Now, again, I'm just stretching it out.   {#1354}
[01:26:10] TEACHER: Just think on Slack's line that what kind of behavior.   {#1355}
[01:26:16] TEACHER: Now, enough that we talked about this part.   {#1356}
[01:26:19] TEACHER: Now, recall when you send a message on Slack, what happens?   {#1357}
[01:26:24] TEACHER: What happens when you send a message on Slack?   {#1358}
[01:26:27] TEACHER: what kind of behavior you see on Slack or Teams or any such tool.   {#1359}
[01:26:32] STUDENT_4: So the expectation is it should be shown immediately to other users.   {#1360}
[01:26:37] TEACHER: Not expectation.   {#1361}
[01:26:38] TEACHER: What do you see as a user?   {#1362}
[01:26:44] TEACHER: You don't see message immediately getting posted.   {#1363}
[01:26:46] TEACHER: Think about it.   {#1364}
[01:26:47] TEACHER: Try to recall.   {#1365}
[01:26:48] TEACHER: Or if you have a Slack open, just send yourself a Slack message   {#1366}
[01:26:51] TEACHER: and see what happens.   {#1367}
[01:26:56] TEACHER: Let me pull in summit summit.   {#1368}
[01:26:58] TEACHER: What would you do?   {#1369}
---- OWNED SEGMENTS END ----

CTX| [01:27:03] STUDENT_1: So I would choose a web socket.   {#1370}
CTX| [01:27:06] STUDENT_1: Definitely.   {#1371}
CTX| [01:27:07] STUDENT_1: Definitely.   {#1372}
CTX| [01:27:08] TEACHER: Definitely.   {#1373}
CTX| [01:27:09] TEACHER: It's a strong word.   {#1374}
CTX| [01:27:10] TEACHER: Okay.   {#1375}
CTX| [01:27:13] STUDENT_1: I'll tell you why.   {#1376}
CTX| [01:27:14] STUDENT_1: So see if I have to send message back and forth.   {#1377}
CTX| [01:27:18] STUDENT_1: So if I'm using API, then I would have to.   {#1378}
CTX| [01:27:21] STUDENT_1: It's Slack.   {#1379}
CTX| [01:27:23] TEACHER: Slack back and forth.   {#1380}
CTX| [01:27:25] TEACHER: It's only sending that we're talking about.   {#1381}
CTX| [01:27:26] TEACHER: I'm not even going into receiving part of it.   {#1382}
CTX| [01:27:28] TEACHER: Receiving has to be done over WebSocket.   {#1383}
CTX| [01:27:30] TEACHER: I'm not denying that at all.   {#1384}
CTX| [01:27:32] TEACHER: I'm talking about sending part.   {#1385}
CTX| [01:27:34] TEACHER: Sending the message.   {#1386}
CTX| [01:27:35] TEACHER: I'm not even talking about receiving.   {#1387}
CTX| [01:27:38] STUDENT_1: Sending also in case of sending message.   {#1388}
CTX| [01:27:42] STUDENT_1: If we establish a rest call, let's say.   {#1389}
CTX| [01:27:46] STUDENT_1: If we establish a rest call, then we would have to need to establish a handshake and everything.   {#1390}
CTX| [01:27:52] STUDENT_1: We have to establish a TCP.   {#1391}
CTX| [01:27:54] TEACHER: Then the entire world should use just WebSockets for everything.   {#1392}
CTX| [01:27:57] TEACHER: Right.   {#1393}
CTX| [01:27:57] TEACHER: Why are we not building everything on WebSocket?   {#1394}
CTX| [01:27:59] TEACHER: Why do we even have normal API servers?   {#1395}
CTX| [01:28:01] TEACHER: Why are you spinning up Spring Boot instances?   {#1396}
