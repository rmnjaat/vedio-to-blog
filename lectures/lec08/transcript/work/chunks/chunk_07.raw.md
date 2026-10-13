# chunk_07  OWNS 01:10:17 -> 01:21:35  (segments #1206-#1402, 1838 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:09:19] TEACHER: internally screen that's fine okay uh i'll take your question okay let's start with brainstorming   {#1198}
CTX| [01:09:27] TEACHER: let's start with the so the four factors that we would brainstorm on is lb configurations monitoring   {#1199}
CTX| [01:09:33] TEACHER: availability and extensibility like here we'll touch upon those factors how are we doing what   {#1200}
CTX| [01:09:38] STUDENT_5: we are doing right okay let me open up uh i'll also copy this for my reference so that i don't   {#1201}
CTX| [01:09:45] STUDENT_5: forget to cover i don't forget to miss anything during a discussion just a minute   {#1202}
CTX| [01:09:53] TEACHER: okay so let's start with this how would you store the configuration the configuration that you know   {#1203}
CTX| [01:10:00] TEACHER: now you know what kind of configuration would we need to store how would you store and what   {#1204}
CTX| [01:10:04] TEACHER: would you store i'll meanwhile i'll start drawing this part raise your hands i'll pull you in   {#1205}

---- OWNED SEGMENTS START ----
[01:10:17] TEACHER: Yes, Shalendra.   {#1206}
[01:10:19] STUDENT_6: So how would I be storing this server configuration, right?   {#1207}
[01:10:23] STUDENT_6: So what would you store?   {#1208}
[01:10:26] TEACHER: First, let's start with that.   {#1209}
[01:10:27] STUDENT_6: The backend server configurations, IP address and...   {#1210}
[01:10:33] TEACHER: IP address and port, right?   {#1211}
[01:10:35] TEACHER: Backend servers.   {#1212}
[01:10:36] TEACHER: Yeah.   {#1213}
[01:10:37] TEACHER: All the backend servers that you have, you would have IP address and port mapping of all   {#1214}
[01:10:41] TEACHER: of them.   {#1215}
[01:10:42] TEACHER: Okay.   {#1216}
[01:10:42] TEACHER: Anything else?   {#1217}
[01:10:44] STUDENT_6: Algorithms.   {#1218}
[01:10:45] TEACHER: Okay. Balancing algorithm. Great.   {#1219}
[01:10:48] TEACHER: Um, this is the bare minimum that you need, right?   {#1220}
[01:10:51] TEACHER: Bare minimum.   {#1221}
[01:10:52] TEACHER: Right.   {#1222}
[01:10:53] TEACHER: Otherwise you can add more, more fancy stuff to that.   {#1223}
[01:10:55] TEACHER: Let's start with bare minimum because then you can obviously infinitely build   {#1224}
[01:10:58] TEACHER: that system, make it more and more complex, but this is the bare minimum that you   {#1225}
[01:11:01] TEACHER: need that what algorithm you are using and what are the backend servers that   {#1226}
[01:11:04] TEACHER: are connected to that.   {#1227}
[01:11:06] TEACHER: Right.   {#1228}
[01:11:06] TEACHER: Okay.   {#1229}
[01:11:07] TEACHER: Where would you store this?   {#1230}
[01:11:09] STUDENT_6: So, uh, okay.   {#1231}
[01:11:11] STUDENT_6: If I go from the beginning, let's think about the simple system.   {#1232}
[01:11:15] STUDENT_6: I will just use a database for that.   {#1233}
[01:11:19] STUDENT_16: Okay.   {#1234}
[01:11:20] STUDENT_6: So, we'll be adding some latency there.   {#1235}
[01:11:26] STUDENT_6: So, we can use a database, but we can also store those information in the server itself.   {#1236}
[01:11:33] STUDENT_6: I mean, it will keep pulling from the database before getting the request call.   {#1237}
[01:11:38] TEACHER: Okay, you are storing this information in a DB, but now you also pointed out that it's   {#1238}
[01:11:43] TEACHER: painful.   {#1239}
[01:11:44] TEACHER: Why it is painful?   {#1240}
[01:11:47] STUDENT_6: If you think like I should be having some confidence, I mean, like if I'm adding load   {#1241}
[01:11:52] STUDENT_6: balancer, then it shouldn't add some any latency.   {#1242}
[01:11:55] STUDENT_6: Otherwise, if it starts adding latency, then request will take more time to process.   {#1243}
[01:12:03] TEACHER: So you are saying the latency of when request comes from user to LB server, if LB server   {#1244}
[01:12:07] TEACHER: for every request makes a call to database to get this information, that is slow, right?   {#1245}
[01:12:13] TEACHER: Because that would slow things down.   {#1246}
[01:12:14] TEACHER: And this network call itself is very expensive, three milliseconds to five milliseconds.   {#1247}
[01:12:19] TEACHER: So doing that every time you are adding.   {#1248}
[01:12:22] TEACHER: So anyway, your load balancer is itself adding latency, that network hop on top of that, if   {#1249}
[01:12:27] TEACHER: you add this, it would just slow things down.   {#1250}
[01:12:31] TEACHER: balancer. So you want this to be bare minimum. So what you are proposing is?   {#1251}
[01:12:37] STUDENT_6: I mean, when system gets started or it should keep on pulling data from the DB in interval.   {#1252}
[01:12:45] TEACHER: Okay. You are saying that when your LB server started, you should pull data from your database   {#1253}
[01:12:52] TEACHER: for the specific load balancer and keep an in-memory copy so that when the request comes in,   {#1254}
[01:12:56] TEACHER: you don't have to make a network call. And from here, you can directly pick that up.   {#1255}
[01:13:01] TEACHER: in the demo right you have a simple list it just picks one that random from the list or depending   {#1256}
[01:13:06] TEACHER: on the balancing strategy and this using it so this way i save this network okay what is the   {#1257}
[01:13:11] STUDENT_6: disadvantage of this of having this in sync uh like from the console if configuration gets changed   {#1258}
[01:13:17] STUDENT_6: like any server goes down it's correct it will be a problem so we need something um which like keep   {#1259}
[01:13:25] TEACHER: on updating the server so which means that what if this backend server 2 went down now how will   {#1260}
[01:13:31] TEACHER: your in-memory copy because when this server went down,   {#1261}
[01:13:34] TEACHER: first of all, how would you know that a backend server went down?   {#1262}
[01:13:39] STUDENT_6: Server should send some, I mean,   {#1263}
[01:13:42] STUDENT_6: Correct.   {#1264}
[01:13:42] STUDENT_6: It should send some man.   {#1265}
[01:13:44] STUDENT_6: You're killing it today.   {#1266}
[01:13:44] STUDENT_6: You're killing it today.   {#1267}
[01:13:45] STUDENT_6: Okay.   {#1268}
[01:13:46] STUDENT_6: Brilliant.   {#1269}
[01:13:47] STUDENT_6: I mean, there should be some hell check service.   {#1270}
[01:13:49] STUDENT_6: Like I should keep on sending the details of the server.   {#1271}
[01:13:52] STUDENT_6: Correct.   {#1272}
[01:13:53] TEACHER: Correct.   {#1273}
[01:13:54] TEACHER: I'm so happy, man.   {#1274}
[01:13:55] TEACHER: So happy.   {#1275}
[01:13:56] TEACHER: You are, you are exactly taking it in the direction.   {#1276}
[01:13:59] TEACHER: I wanted it to go.   {#1277}
[01:14:01] TEACHER: Okay. So, uh, the first question that came to us is, Hey, this has a problem.   {#1278}
[01:14:06] TEACHER: What if a backend server goes down, but how would you first detect that a backend   {#1279}
[01:14:09] TEACHER: server went down? You said you need something to do that.   {#1280}
[01:14:12] TEACHER: So who would that be something?   {#1281}
[01:14:14] TEACHER: So let's call it.   {#1282}
[01:14:16] TEACHER: That's why I like this is just a fancy, but that I always used for orchestrator.   {#1283}
[01:14:21] TEACHER: Now you need some kind of health check.   {#1284}
[01:14:23] TEACHER: Now what orchestrator would do is you said it would need health checks to backend   {#1285}
[01:14:27] TEACHER: servers.   {#1286}
[01:14:28] TEACHER: Yes.   {#1287}
[01:14:29] TEACHER: Right, but how would that health check look like?   {#1288}
[01:14:32] STUDENT_6: What would it health check on?   {#1289}
[01:14:35] STUDENT_6: Health check basically it will be telling you, telling any backend server that it is   {#1290}
[01:14:41] STUDENT_6: it up or not.   {#1291}
[01:14:42] STUDENT_6: So is it working?   {#1292}
[01:14:43] TEACHER: What kind of health check would that be?   {#1293}
[01:14:45] TEACHER: When I say what kind of health check is my server is up.   {#1294}
[01:14:48] TEACHER: What do you mean when you say my server is up?   {#1295}
[01:14:51] STUDENT_6: So if it is handling request properly, it's just a rest API.   {#1296}
[01:14:55] STUDENT_6: Okay, so if it is sending the response 200 then I can think of like it's working properly   {#1297}
[01:15:01] STUDENT_6: and I can direct my request to the server.   {#1298}
[01:15:03] STUDENT_6: For all requests 200?   {#1299}
[01:15:05] STUDENT_6: Some time, okay.   {#1300}
[01:15:09] TEACHER: Health check endpoint needs to be there?   {#1301}
[01:15:12] TEACHER: So are you saying on health check endpoint it should be 200 or for all user requests   {#1302}
[01:15:17] TEACHER: it should be 200?   {#1303}
[01:15:21] STUDENT_6: No, it's not for user request.   {#1304}
[01:15:23] STUDENT_6: It's for the health only.   {#1305}
[01:15:24] TEACHER: Okay.   {#1306}
[01:15:24] TEACHER: Okay.   {#1307}
[01:15:25] TEACHER: Health check endpoint.   {#1308}
[01:15:25] TEACHER: Okay.   {#1309}
[01:15:26] TEACHER: Got it.   {#1310}
[01:15:26] TEACHER: So health check endpoint, hardware, however you'd want to implement.   {#1311}
[01:15:30] TEACHER: Right?   {#1312}
[01:15:30] TEACHER: But you need something.   {#1313}
[01:15:31] TEACHER: So this means we need to have, so we need to know the health check endpoint.   {#1314}
[01:15:38] TEACHER: Okay.   {#1315}
[01:15:38] TEACHER: Let me pull in Anubhav.   {#1316}
[01:15:39] TEACHER: Anubhav, where would we have this, like, what would be the health check endpoint over here?   {#1317}
[01:15:47] TEACHER: For a backend set.   {#1318}
[01:15:48] TEACHER: For this orchestrator.   {#1319}
[01:15:50] TEACHER: Like, do we configure something like this?   {#1320}
[01:15:54] STUDENT_7: Actually, we don't necessarily need to have a specialized LCHIC endpoint.   {#1321}
[01:15:59] STUDENT_7: We can configure a very lightweight endpoint on the backend that just responds with a ping,   {#1322}
[01:16:04] STUDENT_7: but also just make TCP pings to the port and IP to see if we get back any packet.   {#1323}
[01:16:12] TEACHER: Have you configured a load by answer ever?   {#1324}
[01:16:15] STUDENT_7: Not really.   {#1325}
[01:16:17] TEACHER: That's fine.   {#1326}
[01:16:18] TEACHER: That's fine.   {#1327}
[01:16:19] TEACHER: Okay.   {#1328}
[01:16:19] TEACHER: Okay, so what kind of things would this backend server expose?   {#1329}
[01:16:25] TEACHER: It's your API server, correct?   {#1330}
[01:16:27] TEACHER: Because it is possible.   {#1331}
[01:16:28] TEACHER: Now, let me just basically go into bit more granular details of it   {#1332}
[01:16:32] TEACHER: so that we all understand what it needs to expose   {#1333}
[01:16:34] TEACHER: and what configuration would be needed to have.   {#1334}
[01:16:36] TEACHER: So backend servers at the end is a virtual machine   {#1335}
[01:16:40] TEACHER: in which you can run hundreds of processes.   {#1336}
[01:16:44] TEACHER: But with respect to this load balancer,   {#1337}
[01:16:47] TEACHER: there is one process that matters.   {#1338}
[01:16:49] TEACHER: saying this is a profile service so the http server that is handling the profile service   {#1339}
[01:16:55] TEACHER: needs needs to be up and running which means that this might have some ssh process running   {#1340}
[01:17:02] TEACHER: some http server running some nginx running something running but what we what for this   {#1341}
[01:17:08] TEACHER: load balancer what matters what matters is the core web server that is balancing against which   {#1342}
[01:17:14] TEACHER: is on port 8081 that we discussed right now that is why on every http server that we create we   {#1343}
[01:17:22] TEACHER: always have some health check let's say slash status or slash help something like that endpoint   {#1344}
[01:17:29] TEACHER: defined now what you do is you typically configure this endpoint on the load balancer site which tells   {#1345}
[01:17:39] TEACHER: you that this is my health check endpoint. So apart from load balancing I'll go you have   {#1346}
[01:17:45] TEACHER: health check endpoint which is what you provide when you spin up a load balancer. Now here why do   {#1347}
[01:17:52] TEACHER: we need this because it is possible that in your backend server your virtual machine is up. You   {#1348}
[01:17:59] TEACHER: say hey why Orkoset is not checking on virtual machine because it would have the infrastructure   {#1349}
[01:18:03] TEACHER: access can just check if virtual machine is up or not because it is possible that your virtual   {#1350}
[01:18:09] TEACHER: But because of divided by zero exception, your process crashed or because of null pointer exception, your process crashed.   {#1351}
[01:18:16] TEACHER: So if your process crashed, which matter to this load balancer, which is your backend service, if that crashed, you need to know that this server is now unhealthy because if it sends request to that, because that process itself is killed, it cannot entertain that request.   {#1352}
[01:18:34] TEACHER: which means that we just don't need that VM to be up,   {#1353}
[01:18:41] TEACHER: but we need our process to be up.   {#1354}
[01:18:44] TEACHER: So that is why we have explicit health checks,   {#1355}
[01:18:47] TEACHER: which you configure in your DBS part of load balancing configuration   {#1356}
[01:18:51] TEACHER: and orchestrator uses this to fire continuous health checks   {#1357}
[01:18:55] TEACHER: onto your backend servers to see if your actual service is up or not.   {#1358}
[01:19:01] TEACHER: Not the server, but your service is upper.   {#1359}
[01:19:05] TEACHER: Now again, pick online off-line indicator.   {#1360}
[01:19:08] TEACHER: However, you may want to implement it either.   {#1361}
[01:19:12] TEACHER: Typically orchestrator itself makes those HTTP calls to each of the servers and needs to   {#1362}
[01:19:22] TEACHER: get a 200 response.   {#1363}
[01:19:24] TEACHER: There are other protocols that also accepts, but I'm just simplifying it with HTTP, but   {#1364}
[01:19:30] TEACHER: specification that can listen to.   {#1365}
[01:19:32] TEACHER: But the idea is that orchestrator would need access to this database so that it   {#1366}
[01:19:39] TEACHER: knows these are the servers.   {#1367}
[01:19:41] TEACHER: This is the health check endpoint that I would have to call to.   {#1368}
[01:19:45] TEACHER: When one of the server is down, the health check would fail.   {#1369}
[01:19:48] TEACHER: Orchestrator would immediately go and update the database.   {#1370}
[01:19:52] TEACHER: And now comes the problem.   {#1371}
[01:19:54] TEACHER: Now let me paint the picture.   {#1372}
[01:19:57] TEACHER: So orchestrator does periodic heartbeats, periodic health check sends to each of these backend servers.   {#1373}
[01:20:05] TEACHER: It found that backend server 2 responded with or it did not respond because the process, the service died.   {#1374}
[01:20:12] TEACHER: Because the service died, now what orchestrator would do that because this backend server 2 is unhealthy,   {#1375}
[01:20:18] TEACHER: it removes that entry from the database for backend server 2.   {#1376}
[01:20:22] TEACHER: So orchestrator, the mastermind of the system updated in the database saying that backend   {#1377}
[01:20:29] TEACHER: server two is dead.   {#1378}
[01:20:30] TEACHER: So it removed that entry.   {#1379}
[01:20:31] TEACHER: Now, how would this change that orchestrator made in the DB get updated in the LB servers   {#1380}
[01:20:37] TEACHER: in memory, in memory hash map that it has?   {#1381}
[01:20:42] TEACHER: Anwar, how would you do that?   {#1382}
[01:20:46] STUDENT_7: Like the most naive way would be for the LB server to keep pulling, but that would not   {#1383}
[01:20:51] STUDENT_7: be an optimal way to.   {#1384}
[01:20:53] TEACHER: Why?   {#1385}
[01:20:53] TEACHER: Why that is, why that wouldn't work?   {#1386}
[01:20:57] STUDENT_7: Because the process is consuming some latency to first figure out if the, like intermittently   {#1387}
[01:21:04] STUDENT_7: it is first figuring out if backend servers are alive or not.   {#1388}
[01:21:07] STUDENT_7: And at the same time, it is also getting a barrage of requests from end users.   {#1389}
[01:21:11] STUDENT_7: So some of those requests will experience more latency when it is.   {#1390}
[01:21:16] TEACHER: No, no, no.   {#1391}
[01:21:17] TEACHER: Orkastator is doing it.   {#1392}
[01:21:18] TEACHER: User requests are coming to LB server.   {#1393}
[01:21:20] TEACHER: Orkastator, there is no effect on that.   {#1394}
[01:21:23] STUDENT_7: But the LB server would be polling to figure out this, right?   {#1395}
[01:21:27] STUDENT_7: Okay.   {#1396}
[01:21:28] STUDENT_7: Okay.   {#1397}
[01:21:28] TEACHER: This one, this one you're talking about.   {#1398}
[01:21:29] TEACHER: Okay.   {#1399}
[01:21:29] TEACHER: This would be keeping on polling on doing this.   {#1400}
[01:21:31] TEACHER: Okay.   {#1401}
[01:21:32] TEACHER: So then is there a better way?   {#1402}
---- OWNED SEGMENTS END ----

CTX| [01:21:35] STUDENT_7: Instead of polling, like if there was a way for the database to communicate it to   {#1403}
CTX| [01:21:41] STUDENT_7: Maybe in base solution, which triggers this, which, which gets triggered when this change happens.   {#1404}
CTX| [01:21:47] STUDENT_7: Got it.   {#1405}
CTX| [01:21:48] TEACHER: So you reached that point, right?   {#1406}
CTX| [01:21:50] TEACHER: But now just one more point to add on that where you said that it is already handling   {#1407}
CTX| [01:21:54] TEACHER: because now it also has to pull much more than that.   {#1408}
CTX| [01:21:57] TEACHER: The problem is that polling has a frequency.   {#1409}
CTX| [01:22:00] TEACHER: Let's say 10 seconds.   {#1410}
CTX| [01:22:02] TEACHER: Now let's say your backend server crashed over here.   {#1411}
CTX| [01:22:07] TEACHER: the next poll is happening over here.   {#1412}
CTX| [01:22:09] TEACHER: So for these much of time.   {#1413}
CTX| [01:22:11] TEACHER: So let's say this was first second.   {#1414}
CTX| [01:22:13] TEACHER: This is nine and this is the 10th second for nine seconds.   {#1415}
CTX| [01:22:17] TEACHER: Your request will still continue to go to backhand server.   {#1416}
CTX| [01:22:19] TEACHER: Even though that's dead.   {#1417}
CTX| [01:22:22] TEACHER: So you cannot.   {#1418}
CTX| [01:22:23] TEACHER: So for your polling frequency,   {#1419}
CTX| [01:22:25] TEACHER: if it happens at the first segment of a polling frequency for last N minus one second,   {#1420}
CTX| [01:22:30] TEACHER: it would still keep sending request to backhand server too,   {#1421}
CTX| [01:22:32] TEACHER: even though it is dead.   {#1422}
CTX| [01:22:33] TEACHER: So because it is not checking the DB every time it is just, it is just when a new request comes in from the client, it just refers to this in-memory structure, the configuration, and just forwards the request to that.   {#1423}
