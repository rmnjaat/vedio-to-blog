# chunk_07  OWNS 01:08:10 -> 01:19:14  (segments #1175-#1379, 1974 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:07:13] TEACHER: Let me formally cover it before we take questions.   {#1150}
CTX| [01:07:15] TEACHER: And it's already one or 10 minutes that we didn't cover   {#1151}
CTX| [01:07:19] TEACHER: on-demand image optimization yet.   {#1152}
CTX| [01:07:22] TEACHER: Okay, nothing to worry about.   {#1153}
CTX| [01:07:23] TEACHER: We have enough.   {#1154}
CTX| [01:07:24] STUDENT_9: I have one question to this.   {#1155}
CTX| [01:07:25] STUDENT_9: Wait, wait, wait.   {#1156}
CTX| [01:07:25] TEACHER: We'll come back, we'll come back, we'll come back, right?   {#1157}
CTX| [01:07:28] TEACHER: Okay.   {#1158}
CTX| [01:07:29] TEACHER: So for our gravata.com,   {#1159}
CTX| [01:07:32] TEACHER: given that we dive very deep into the SQL query side of things,   {#1160}
CTX| [01:07:37] TEACHER: how we think about performance,   {#1161}
CTX| [01:07:38] TEACHER: how we think about architecting, like,   {#1162}
CTX| [01:07:40] TEACHER: Think about other implementation details.   {#1163}
CTX| [01:07:42] TEACHER: Let's talk about how will you design it in general?   {#1164}
CTX| [01:07:44] TEACHER: So we take the photo upload service that we designed yesterday,   {#1165}
CTX| [01:07:47] TEACHER: plug and play as it over here.   {#1166}
CTX| [01:07:49] TEACHER: No changes at all.   {#1167}
CTX| [01:07:51] TEACHER: Like your photo upload service, pre-signed URL and whatnot remains as is.   {#1168}
CTX| [01:07:55] TEACHER: Right.   {#1169}
CTX| [01:07:55] TEACHER: But now when user is publishing the photo,   {#1170}
CTX| [01:07:58] TEACHER: you just make an entry into the photo stable that we just designed.   {#1171}
CTX| [01:08:01] TEACHER: Right.   {#1172}
CTX| [01:08:01] TEACHER: That's how your photos upload would work.   {#1173}
CTX| [01:08:03] TEACHER: Then when you are when user puts that even here, usually.   {#1174}

---- OWNED SEGMENTS START ----
[01:08:10] TEACHER: user ID is active as true schema users you store email and the hash storing   {#1175}
[01:08:16] TEACHER: derived value contrary to what we studied yesterday here we are storing the   {#1176}
[01:08:21] TEACHER: derived value because it makes index look up faster right that's why we are   {#1177}
[01:08:25] TEACHER: doing it rendering the photo is really simple whatever you have now here just   {#1178}
[01:08:30] TEACHER: walking you through the actual thing because now we do not want to serve   {#1179}
[01:08:36] TEACHER: photos from our backend servers.   {#1180}
[01:08:40] TEACHER: We want to survey a CDN.   {#1181}
[01:08:42] TEACHER: Imagine at the scale of Facebook, at the scale of Instagram,   {#1182}
[01:08:44] TEACHER: if they start using Gravita, right?   {#1183}
[01:08:47] TEACHER: They're doing millions and millions and millions of hits coming in.   {#1184}
[01:08:49] TEACHER: If that's the case, then how will you handle the traffic, right?   {#1185}
[01:08:54] TEACHER: All so much of traffic coming to our backend servers,   {#1186}
[01:08:57] TEACHER: which in turn gets pushed onto S3 that would create chaos.   {#1187}
[01:09:01] TEACHER: Your AWS will go to shoot up.   {#1188}
[01:09:03] TEACHER: So what do you do?   {#1189}
[01:09:04] TEACHER: you have to use CDN for that to give a better user experience.   {#1190}
[01:09:07] TEACHER: So now what we are doing is we are writing api.gravita.com   {#1191}
[01:09:11] TEACHER: and then we put everything behind the CDN.   {#1192}
[01:09:14] TEACHER: So now observe this, how CDN comes into the picture,   {#1193}
[01:09:17] TEACHER: making things efficient.   {#1194}
[01:09:18] TEACHER: So we expose an API endpoint called api.gravita.com   {#1195}
[01:09:23] TEACHER: slash photo slash hash.   {#1196}
[01:09:25] TEACHER: Whatever the hash we provide over here, we get the active photo.   {#1197}
[01:09:28] TEACHER: We read the file from S3 and we return the response.   {#1198}
[01:09:32] TEACHER: Standard procedure.   {#1199}
[01:09:34] TEACHER: So we derive the S3 path on the fly because we know the user ID and we know the photos ID.   {#1200}
[01:09:39] TEACHER: We take that and we generate this path and we send it over here.   {#1201}
[01:09:43] TEACHER: Sorry, basically whenever they do that, it would fetch the photo from S3 and send it.   {#1202}
[01:09:47] TEACHER: This way the photo is entered.   {#1203}
[01:09:48] TEACHER: But now what we have to do is we want CDN to serve the photos.   {#1204}
[01:09:53] TEACHER: So what we do is we configure a CDN and in CDN configuration,   {#1205}
[01:09:59] TEACHER: we create a property called gravita.com.   {#1206}
[01:10:04] TEACHER: behind the CDN collection gravita.com.   {#1207}
[01:10:07] TEACHER: Gravita.com points to this as my origin.   {#1208}
[01:10:12] TEACHER: api.gravita.com slash photos.   {#1209}
[01:10:14] TEACHER: Because what we implemented just as the API endpoint   {#1210}
[01:10:19] TEACHER: which serves the photo reading from a stream   {#1211}
[01:10:21] TEACHER: and serving it back looks something like this.   {#1212}
[01:10:23] TEACHER: api.gravita.com slash photos slash hash.   {#1213}
[01:10:26] TEACHER: So what we do is we configure gravita.com   {#1214}
[01:10:30] TEACHER: and origin to that is api.gravita.com slash photos.   {#1215}
[01:10:34] TEACHER: So which means that now when the request for gravita.com slash hash comes in, this request would go where CDN?   {#1216}
[01:10:41] TEACHER: Because in CDN we configured like how I configured edge.arpeedbhany.me.   {#1217}
[01:10:45] TEACHER: Here I'm giving gravita.com as my CDN property directly.   {#1218}
[01:10:51] TEACHER: My root domain itself is my property on CDN.   {#1219}
[01:10:53] TEACHER: So this way when I make a request like this gravita.com slash hash, the request will go to CDN.   {#1220}
[01:10:58] TEACHER: If CDN has the data, it would serve it.   {#1221}
[01:11:01] TEACHER: If it does not have the data, it would go to origin.   {#1222}
[01:11:04] TEACHER: What's the origin?   {#1223}
[01:11:04] TEACHER: api.gaveta.com.   {#1224}
[01:11:06] TEACHER: So what it would do?   {#1225}
[01:11:08] TEACHER: It would do api.gaveta.com.   {#1226}
[01:11:09] TEACHER: .   {#1227}
[01:11:11] TEACHER: Which is exactly what we have handled up until now.   {#1228}
[01:11:16] TEACHER: Because this is what we have handled, it would return the photo.   {#1229}
[01:11:20] TEACHER: It would go to S3, read the photo, send it to the CDN.   {#1230}
[01:11:25] TEACHER: CDN will cache it and serve to the user.   {#1231}
[01:11:28] TEACHER: The subsequent request would be all served from the CDN.   {#1232}
[01:11:32] TEACHER: So now this is what our flow would look like.   {#1233}
[01:11:35] TEACHER: A very basic flow, nothing super complicated about it.   {#1234}
[01:11:39] TEACHER: So we have a standard photo upload service.   {#1235}
[01:11:41] TEACHER: You upload a photo using pre-signed URL on S3.   {#1236}
[01:11:44] TEACHER: Once that is done, you make a call to API server and add a photo over here, which registers   {#1237}
[01:11:49] TEACHER: it in your MySQL server.   {#1238}
[01:11:50] TEACHER: Pick your favorite database.   {#1239}
[01:11:51] TEACHER: That's fine.   {#1240}
[01:11:52] TEACHER: Now, when the photo is published or let's say when a photo is marked updated, what we   {#1241}
[01:11:58] TEACHER: do we update it in the DB and push an event to Kafka.   {#1242}
[01:12:01] TEACHER: Right now why Kafka?   {#1243}
[01:12:03] TEACHER: Because we want to invalidate the cache because your CDN, where you configure   {#1244}
[01:12:08] TEACHER: gravita.com to API.gravita.com.   {#1245}
[01:12:10] TEACHER: Let's say user B, user 2 opened a profile of user 1 and it rendered photo, something   {#1246}
[01:12:15] TEACHER: like this, this URL, it rendered this photo.   {#1247}
[01:12:18] TEACHER: This request is served via CDN to all the users out there.   {#1248}
[01:12:21] TEACHER: Right.   {#1249}
[01:12:22] TEACHER: But now when you as user 1 updated your photo, you want it to be updated right   {#1250}
[01:12:28] TEACHER: So what do you do?   {#1251}
[01:12:29] TEACHER: In order to do this, you have to invalidate the CDN cache.   {#1252}
[01:12:33] TEACHER: So because photos don't change that often,   {#1253}
[01:12:36] TEACHER: you might have a TTL of let's say one day or two day or something like that.   {#1254}
[01:12:39] TEACHER: But now because you change it as to give a good user experience,   {#1255}
[01:12:43] TEACHER: you want to invalidate that photo right there and then   {#1256}
[01:12:45] TEACHER: so that the new photo is rendered.   {#1257}
[01:12:47] TEACHER: So what you do?   {#1258}
[01:12:48] TEACHER: When the photo is updated, you push an event to Kafka,   {#1259}
[01:12:50] TEACHER: the photo updated, it goes to a bunch of consumers   {#1260}
[01:12:54] TEACHER: whose job is to invalidate the CDN.   {#1261}
[01:12:56] TEACHER: That's it.   {#1262}
[01:12:58] TEACHER: by these workers they make API call to CDN CDN gives you those API so invalidate a particular   {#1263}
[01:13:03] TEACHER: path so you would invalidate a path slash h1 from here so that file is deleted from CDN next request   {#1264}
[01:13:10] TEACHER: that comes in CDN does not have the file it would go where it would go to the API server API server   {#1265}
[01:13:16] TEACHER: will talk to DB get the S3 path API server will go to S3 read the file and send it to CDN CDN   {#1266}
[01:13:24] TEACHER: will cache that file and serve it to the user.   {#1267}
[01:13:26] TEACHER: Subsequent request will just serve from the CDM.   {#1268}
[01:13:29] TEACHER: And this is how you can efficiently serve photos at scale.   {#1269}
[01:13:33] TEACHER: And this is how you can design your own gravata.   {#1270}
[01:13:37] TEACHER: Really simple, but covering those details is the key.   {#1271}
[01:13:42] TEACHER: How we leverage CDM, how we leverage database transactions,   {#1272}
[01:13:45] TEACHER: how we evolved our database schema over time,   {#1273}
[01:13:48] TEACHER: asking those critical questions,   {#1274}
[01:13:49] TEACHER: how we thought about security and correctness of the data,   {#1275}
[01:13:52] TEACHER: no matter what.   {#1276}
[01:13:54] TEACHER: These are the details that I want all of you to remember, no matter what.   {#1277}
[01:13:57] TEACHER: It's a very simple system, but these details make it very interesting.   {#1278}
[01:14:02] TEACHER: Right.   {#1279}
[01:14:02] TEACHER: Okay.   {#1280}
[01:14:03] TEACHER: Any question on this?   {#1281}
[01:14:05] TEACHER: We'll take for five minutes question and then we have covered on demand image   {#1282}
[01:14:08] TEACHER: optimization, then we take some more questions and then we go on a break.   {#1283}
[01:14:11] TEACHER: Okay.   {#1284}
[01:14:12] TEACHER: Go on, Heman.   {#1285}
[01:14:13] STUDENT_1: Yeah.   {#1286}
[01:14:14] STUDENT_1: Can you please go back to the screen where we have written the transaction   {#1287}
[01:14:17] STUDENT_1: three queries?   {#1288}
[01:14:19] STUDENT_1: Hmm.   {#1289}
[01:14:20] STUDENT_1: Hmm.   {#1290}
[01:14:21] STUDENT_1: Yeah.   {#1291}
[01:14:21] STUDENT_1: So when we were writing the transaction before we added this query,   {#1292}
[01:14:28] STUDENT_1: there was the second query, which says their ID equal to something for which we have to get the photo.   {#1293}
[01:14:35] STUDENT_1: I was thinking at that time, if let's say somebody passes a wrong photo ID.   {#1294}
[01:14:43] TEACHER: So that's why we have this user ID to prevent that, right?   {#1295}
[01:14:46] TEACHER: So no rose update, it would happen.   {#1296}
[01:14:48] STUDENT_1: That's okay.   {#1297}
[01:14:49] STUDENT_1: That user ID came a bit late when we start initially thinking, and then we added this.   {#1298}
[01:14:54] STUDENT_1: So let's say the user ID is not there.   {#1299}
[01:14:56] STUDENT_1: I'm just talking about maybe a bit general problem.   {#1300}
[01:14:59] STUDENT_1: I'm writing in a transaction some query and here I'm passing one parameter, which has   {#1301}
[01:15:04] STUDENT_1: to be used to find the identifier row.   {#1302}
[01:15:07] STUDENT_1: Now, due to any reason, it may be by mistake or something, I passed the wrong value.   {#1303}
[01:15:13] STUDENT_1: Now that inside the transaction one query is not successfully handled.   {#1304}
[01:15:19] STUDENT_1: Should we worry about writing something as a fallback here inside the transaction?   {#1305}
[01:15:24] STUDENT_1: Or should we leave it?   {#1306}
[01:15:26] STUDENT_1: What should be the right practice?   {#1307}
[01:15:28] TEACHER: Ideally, if you were expecting something to be updated, but it was not.   {#1308}
[01:15:33] TEACHER: So let's say a general behavior is something gets updated, but you saw that nothing got   {#1309}
[01:15:37] TEACHER: updated.   {#1310}
[01:15:38] TEACHER: That is an alarm for you.   {#1311}
[01:15:40] TEACHER: In most cases, in most cases, which means that there might be a bug in the front end,   {#1312}
[01:15:45] TEACHER: because here what you said is correct.   {#1313}
[01:15:48] TEACHER: In that case, if let's say this does not match anything, what would happen for that user?   {#1314}
[01:15:53] TEACHER: All the rows are false.   {#1315}
[01:15:55] TEACHER: Like another photo is active, right?   {#1316}
[01:15:57] TEACHER: And this does not make anything active.   {#1317}
[01:15:59] STUDENT_1: Yes.   {#1318}
[01:16:00] STUDENT_1: That's a problem.   {#1319}
[01:16:00] TEACHER: That's a, that's a 404.   {#1320}
[01:16:02] TEACHER: That's a 404 for user.   {#1321}
[01:16:03] TEACHER: Correct.   {#1322}
[01:16:03] TEACHER: So if that is your intended behavior, then no matter what,   {#1323}
[01:16:10] TEACHER: a user should have exactly one row as active.   {#1324}
[01:16:17] TEACHER: Exactly one row as active.   {#1325}
[01:16:19] TEACHER: If that is what your need is, then you have to have that check   {#1326}
[01:16:25] TEACHER: in this transaction that at least one is active or not.   {#1327}
[01:16:29] TEACHER: If this does not change anything, then you don't do anything.   {#1328}
[01:16:33] TEACHER: statement or you first do selects and ensure that everything is there.   {#1329}
[01:16:36] TEACHER: And then you do update either.   {#1330}
[01:16:39] TEACHER: So what you can do is you can select it.   {#1331}
[01:16:41] TEACHER: This, this user have at least one photo is active.   {#1332}
[01:16:44] TEACHER: It with Matt meets that day, you update an update that would solve your problem.   {#1333}
[01:16:48] TEACHER: Right.   {#1334}
[01:16:49] TEACHER: So the photo and this user, so you first do a get off the same thing.   {#1335}
[01:16:53] TEACHER: Select is active true.   {#1336}
[01:16:55] TEACHER: Sorry.   {#1337}
[01:16:55] TEACHER: Select is active false.   {#1338}
[01:16:57] TEACHER: That use where photo ID is this and user ID is this.   {#1339}
[01:16:59] TEACHER: If that row exists, then only you do this to them.   {#1340}
[01:17:02] TEACHER: Otherwise you don't.   {#1341}
[01:17:03] STUDENT_1: Okay, because that's normally a requirement that you should have one active ID.   {#1342}
[01:17:08] STUDENT_1: Yeah.   {#1343}
[01:17:09] STUDENT_1: And if we are not taking care of this thing, then I mean, it will be too late when you   {#1344}
[01:17:17] STUDENT_1: got to know that client is going to be taking care of at the first place itself.   {#1345}
[01:17:22] TEACHER: So it is always better to just validate that whatever changes that you are doing will not   {#1346}
[01:17:27] TEACHER: let your data go in consistent state.   {#1347}
[01:17:29] TEACHER: So you first check and then you do these two.   {#1348}
[01:17:32] STUDENT_1: Yeah, maybe there only we can say if the row zero rows return, then application logic take   {#1349}
[01:17:38] STUDENT_1: care of saying that ID was not one at all not find active one. But I mean, the logic has to   {#1350}
[01:17:44] STUDENT_1: be divided in two parts. Checking the result is coming as zero row. So we have application layer.   {#1351}
[01:17:51] STUDENT_1: And this transaction not going through, I mean, rollbacking itself should be taking care itself   {#1352}
[01:17:56] STUDENT_1: here I think that's all yes yes yes yes yeah could you explain the CDN mapping that we were doing   {#1353}
[01:18:03] TEACHER: there uh because like we did yesterday right we saw yesterday how that CDN is mapped that same   {#1354}
[01:18:08] TEACHER: thing what we are doing is we're configuring a CDN yeah and the specific property is gravita.com   {#1355}
[01:18:14] TEACHER: like how I specified edge.arkipani.me so any request for edge.arkipani.me goes to CDN   {#1356}
[01:18:20] TEACHER: Correct?   {#1357}
[01:18:21] TEACHER: Here, any request to gravita.com goes where?   {#1358}
[01:18:24] TEACHER: To CDN.   {#1359}
[01:18:25] TEACHER: API.com.   {#1360}
[01:18:25] STUDENT_5: Yeah.   {#1361}
[01:18:26] TEACHER: No, no.   {#1362}
[01:18:26] TEACHER: So it goes to CDN and CDN's origin is configured to API to gravita.com.   {#1363}
[01:18:30] TEACHER: So if it does not have it, what it is doing, it's going to API.   {#1364}
[01:18:34] TEACHER: And because only API server knows here, one common question that ask is why CDN not pointing   {#1365}
[01:18:40] TEACHER: to S3 directly?   {#1366}
[01:18:41] TEACHER: Because S3 is not public.   {#1367}
[01:18:43] TEACHER: Only my database knows which photo is active.   {#1368}
[01:18:46] TEACHER: S3 doesn't know which photo is active.   {#1369}
[01:18:47] TEACHER: Right?   {#1370}
[01:18:47] TEACHER: Only database is a source of truth for it to know which photo is active.   {#1371}
[01:18:51] TEACHER: So which is why what we have to do is CDN falls back to apatradar.com,   {#1372}
[01:18:57] TEACHER: reads the database, find active photo, goes to SP, gets the image and sends it to the CD.   {#1373}
[01:19:02] STUDENT_5: Right.   {#1374}
[01:19:02] STUDENT_5: Makes sense.   {#1375}
[01:19:03] STUDENT_5: I was sort of confused.   {#1376}
[01:19:05] STUDENT_5: Like I was taking it in the reverse order, the mapping that was there.   {#1377}
[01:19:08] STUDENT_5: Okay.   {#1378}
[01:19:10] STUDENT_8: DK.   {#1379}
---- OWNED SEGMENTS END ----

CTX| [01:19:14] STUDENT_2: Yeah.   {#1380}
CTX| [01:19:15] STUDENT_2: Hi Arpit.   {#1381}
CTX| [01:19:15] STUDENT_2: So first question is related to the hashing.   {#1382}
CTX| [01:19:18] STUDENT_2: So for hashing, you have said that, you know, we cannot do,   {#1383}
CTX| [01:19:22] STUDENT_2: we should not do the runtime hashing.   {#1384}
CTX| [01:19:24] STUDENT_2: I was not able to understand why it was.   {#1385}
CTX| [01:19:28] TEACHER: There we are there.   {#1386}
CTX| [01:19:29] TEACHER: We cannot do it because if your query looks like this,   {#1387}
CTX| [01:19:32] TEACHER: select start from users where hash of email ID equal to something.   {#1388}
CTX| [01:19:36] STUDENT_1: Right.   {#1389}
CTX| [01:19:37] TEACHER: Now for your database to evaluate, which email ID it matches to,   {#1390}
CTX| [01:19:42] TEACHER: it would have to literally go through every single row.   {#1391}
CTX| [01:19:45] TEACHER: compute the hash of the email ID.   {#1392}
CTX| [01:19:47] TEACHER: See if it matches with the thing that you passed.   {#1393}
CTX| [01:19:49] TEACHER: That is a full table scan.   {#1394}
CTX| [01:19:52] STUDENT_2: Got it. Got it.   {#1395}
CTX| [01:19:53] STUDENT_2: And in the, in those queries also,   {#1396}
CTX| [01:19:55] STUDENT_2: when you are joining, you are joining on the user's ID.   {#1397}
CTX| [01:19:59] STUDENT_2: And then you are putting a where clause of hash is equals to this.   {#1398}
CTX| [01:20:04] STUDENT_2: So when we are joining on the user ID,   {#1399}
CTX| [01:20:06] TEACHER: why can't we just search basis on the user ID itself?   {#1400}
CTX| [01:20:09] TEACHER: Why do we need to do it?   {#1401}
CTX| [01:20:10] TEACHER: You can do it because the input that we are getting from the URL is the hash.   {#1402}
