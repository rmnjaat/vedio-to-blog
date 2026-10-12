# chunk_06  OWNS 00:58:43 -> 01:12:04  (segments #990-#1221, 2301 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:57:49] STUDENT_1: So what if the master goes down and I mean, it's an outage, master goes down, it's an   {#979}
CTX| [00:57:56] TEACHER: outage.   {#980}
CTX| [00:57:57] STUDENT_1: I think, I mean, during college time, we read about different types of architecture, like   {#981}
CTX| [00:58:04] STUDENT_1: in this case, it would be like a multi-layered architecture where the master is the root of   {#982}
CTX| [00:58:12] STUDENT_1: And then, uh, there are, uh, read replicas beyond, I mean, the children are the replicas   {#983}
CTX| [00:58:18] STUDENT_1: of the master note.   {#984}
CTX| [00:58:19] STUDENT_1: So whenever the master note, I mean, the master notes are used for a right and, uh, reads,   {#985}
CTX| [00:58:25] STUDENT_1: but, uh, if, uh, the rights are propagated to its children.   {#986}
CTX| [00:58:29] STUDENT_1: Okay.   {#987}
CTX| [00:58:29] STUDENT_1: In a synchronous manner, whenever a master note goes down, then there's a, uh, kind of   {#988}
CTX| [00:58:36] STUDENT_1: voting system between all the, yeah, leader election.   {#989}

---- OWNED SEGMENTS START ----
[00:58:43] STUDENT_1: another node becomes as a master,   {#990}
[00:58:46] STUDENT_1: till that the master nodes goes up.   {#991}
[00:58:48] STUDENT_1: Correct.   {#992}
[00:58:48] TEACHER: That's a way to automatically recover from failures.   {#993}
[00:58:51] TEACHER: But you may not always see that in production.   {#994}
[00:58:55] TEACHER: Not always.   {#995}
[00:58:56] TEACHER: There are some systems that use leader election   {#996}
[00:58:58] TEACHER: and that's the way to do automatic recover from failures.   {#997}
[00:59:03] TEACHER: But in most cases,   {#998}
[00:59:04] TEACHER: you would see because the world is cloud native now.   {#999}
[00:59:08] TEACHER: If you are building AWS,   {#1000}
[00:59:09] TEACHER: you would have to do leader election.   {#1001}
[00:59:10] TEACHER: But if you are using AWS,   {#1002}
[00:59:12] TEACHER: AWS itself will do leader election for you and have a standby node become   {#1003}
[00:59:16] TEACHER: and basically promote a replica to be the master and whatnot.   {#1004}
[00:59:19] TEACHER: It would do it internet.   {#1005}
[00:59:20] TEACHER: Right.   {#1006}
[00:59:21] TEACHER: So talking from a practical perspective, we'll talk about   {#1007}
[00:59:23] TEACHER: leader election next week, next to next week.   {#1008}
[00:59:26] TEACHER: Right.   {#1009}
[00:59:26] TEACHER: But here when you talk about in simplistic way, I'm not over   {#1010}
[00:59:30] TEACHER: complicating it on first week.   {#1011}
[00:59:32] TEACHER: But when you talk about it simplistic way, what you're talking about   {#1012}
[00:59:35] TEACHER: leader election, where your replica becomes a master and all that is   {#1013}
[00:59:38] TEACHER: there, that is recovery.   {#1014}
[00:59:39] TEACHER: That is automatic recovering from failures.   {#1015}
[00:59:42] TEACHER: kicks in, right?   {#1016}
[00:59:43] TEACHER: But you may not always see it in production when you are having this   {#1017}
[00:59:46] TEACHER: kind of architecture, right?   {#1018}
[00:59:48] TEACHER: Because implementing it is a pain and not product companies need that   {#1019}
[00:59:52] TEACHER: because cloud gives you those guarantees.   {#1020}
[00:59:54] STUDENT_13: Okay.   {#1021}
[00:59:55] TEACHER: But we'll talk about leader election.   {#1022}
[00:59:56] TEACHER: We'll talk about leader election at three different places.   {#1023}
[00:59:59] STUDENT_1: Uh, so why I ask this because in my experience, I have never, I mean, um,   {#1024}
[01:00:04] STUDENT_1: we have never provided a setting string as a, uh, re-replica.   {#1025}
[01:00:07] STUDENT_1: we always like, we just always provide a single connection string.   {#1026}
[01:00:12] TEACHER: And, uh, I think that it's abstracted.   {#1027}
[01:00:16] TEACHER: Correct.   {#1028}
[01:00:17] TEACHER: That's what I'm saying.   {#1029}
[01:00:18] TEACHER: That architecture is abstracted.   {#1030}
[01:00:19] TEACHER: So that part, so that is a proxy kind of thing, which is you are providing one   {#1031}
[01:00:24] TEACHER: connection string and it is doing this heavy lifting for right.   {#1032}
[01:00:28] TEACHER: And not everyone would have that.   {#1033}
[01:00:29] TEACHER: That is where the naive way to do it is let your API server itself do this one.   {#1034}
[01:00:36] STUDENT_1: and also one last small thing if if we are providing multiple connections at the api   {#1035}
[01:00:42] STUDENT_1: server level and the api server is responsible for making a connection pool with each of them   {#1036}
[01:00:49] STUDENT_1: then there won't won't there be a heavy load on the api like to maintain a connection to send   {#1037}
[01:00:56] TEACHER: out heartbeats now and then but you need that right you need that you need that and there is   {#1038}
[01:01:03] TEACHER: Your API server to have connection with both variables so that you can forward   {#1039}
[01:01:06] TEACHER: the request to the corresponding one.   {#1040}
[01:01:08] STUDENT_15: Okay.   {#1041}
[01:01:09] STUDENT_15: I got it.   {#1042}
[01:01:11] STUDENT_16: Okay.   {#1043}
[01:01:12] STUDENT_16: Thanks for that.   {#1044}
[01:01:13] STUDENT_3: Um, yeah, actually we did touch upon a bit of what I want to   {#1045}
[01:01:19] STUDENT_3: understand towards the end, but I'll just elaborate the session a bit more.   {#1046}
[01:01:23] STUDENT_3: So in a normal use cases, do we manage connection pools separately for all   {#1047}
[01:01:29] STUDENT_3: these horizontal scale instances?   {#1048}
[01:01:31] STUDENT_5: For each database is a separate connection because TCP connections are stateful.   {#1049}
[01:01:35] STUDENT_5: Right.   {#1050}
[01:01:36] TEACHER: It's between a server and a database.   {#1051}
[01:01:39] TEACHER: It's a stateful.   {#1052}
[01:01:40] TEACHER: Right.   {#1053}
[01:01:40] TEACHER: So you need to have a separate TCP connection pool for every one of them,   {#1054}
[01:01:45] TEACHER: for every database.   {#1055}
[01:01:46] STUDENT_3: Okay.   {#1056}
[01:01:47] STUDENT_3: Okay.   {#1057}
[01:01:48] STUDENT_3: And this could either happen like at a proxy layer and we maintain a pool with the proxy.   {#1058}
[01:01:53] STUDENT_3: Yeah.   {#1059}
[01:01:54] TEACHER: Either way, your API server can maintain it, proxy can maintain it with the database.   {#1060}
[01:01:58] TEACHER: This can be stateless.   {#1061}
[01:01:59] TEACHER: All options are possible.   {#1062}
[01:02:01] STUDENT_12: Got it.   {#1063}
[01:02:02] STUDENT_12: Yeah.   {#1064}
[01:02:02] STUDENT_12: Thank you.   {#1065}
[01:02:06] STUDENT_3: Yeah.   {#1066}
[01:02:07] STUDENT_3: Hi.   {#1067}
[01:02:07] STUDENT_3: So I just want to understand that this sharding, so does it mean that instead of one database,   {#1068}
[01:02:13] STUDENT_3: we have exact same three databases?   {#1069}
[01:02:16] STUDENT_13: No, these are exclusive subset of data.   {#1070}
[01:02:18] STUDENT_13: So a third of rows will be over here.   {#1071}
[01:02:20] STUDENT_13: A third of rows will be over here.   {#1072}
[01:02:21] STUDENT_13: A third of rows will be over here.   {#1073}
[01:02:24] STUDENT_3: Okay.   {#1074}
[01:02:24] STUDENT_3: Or can we do something like if I have a hundred tables in my application, so we can   {#1075}
[01:02:28] STUDENT_3: have 30 tables somewhere.   {#1076}
[01:02:30] STUDENT_3: Correct.   {#1077}
[01:02:31] STUDENT_3: vertical sharding but it will also we need to manage those connection pulling in two three   {#1078}
[01:02:36] STUDENT_3: databases yeah yeah yeah okay yeah all right sure sure uh i have a question on catching can ask now   {#1079}
[01:02:47] TEACHER: uh not on caching we'll basically take it at the end sure okay sure so when we talk like   {#1080}
[01:02:54] STUDENT_2: no master DB or like no child DB, right.   {#1081}
[01:02:57] STUDENT_2: And then like no replica DB.   {#1082}
[01:02:58] STUDENT_2: So it is not server DB, right.   {#1083}
[01:03:01] STUDENT_2: So we can have like, no cluster of like no DB server.   {#1084}
[01:03:04] STUDENT_2: If it is Oracle database, Oracle rack, if it is Amazon, then we can,   {#1085}
[01:03:10] TEACHER: there's no one way to build any system by the right.   {#1086}
[01:03:12] TEACHER: So you can have it the way you'd like.   {#1087}
[01:03:15] STUDENT_5: The reason I wanted to bring up this, right.   {#1088}
[01:03:17] STUDENT_5: So we can avoid like no DB outage.   {#1089}
[01:03:19] STUDENT_5: So if we, we can, we can definitely do that.   {#1090}
[01:03:21] STUDENT_5: And this is a very simplistic view.   {#1091}
[01:03:24] TEACHER: tolerance of databases in fifth week, you'll see how we restructure this into ensuring   {#1092}
[01:03:30] TEACHER: that there is no, no outage at all.   {#1093}
[01:03:32] TEACHER: Right.   {#1094}
[01:03:33] TEACHER: How we handle, how we recover from failures and whatnot.   {#1095}
[01:03:35] TEACHER: We'll, we'll touch up.   {#1096}
[01:03:37] TEACHER: It's still first week.   {#1097}
[01:03:40] TEACHER: I'll take two more.   {#1098}
[01:03:42] STUDENT_1: Uh, hi, does auto scaling of easy to instances go under horizontal scaling or vertical scale?   {#1099}
[01:03:50] STUDENT_5: Autoscaling.   {#1100}
[01:03:51] STUDENT_5: You add more instances, right?   {#1101}
[01:03:52] STUDENT_5: You have steps scaling there.   {#1102}
[01:03:54] TEACHER: when an average CPU utilization of the cluster goes beyond 60%, add one more node. Right. That's   {#1103}
[01:03:59] TEACHER: what the rule that you write. That's what general scale. Thanks. Yeah, Amrita.   {#1104}
[01:04:06] STUDENT_12: Yeah. So, uh, hi Gaurav. So my question is around the scaling of API servers and DB   {#1105}
[01:04:13] STUDENT_12: all together to handle the loads. So, uh, there are, um, out of the box solutions available in   {#1106}
[01:04:19] STUDENT_12: the market which auto scale themselves so in that case uh like like give me example of one so that   {#1107}
[01:04:25] STUDENT_12: i can be a little more specific um like uh let's take example of uh ec2 only so uh they auto scale   {#1108}
[01:04:35] STUDENT_12: so in the in those cases um we who takes the responsibility of scaling the api server and if it   {#1109}
[01:04:42] STUDENT_12: is responsibility of R,   {#1110}
[01:04:46] STUDENT_12: then do we have out of the box solutions   {#1111}
[01:04:48] STUDENT_12: available for that?   {#1112}
[01:04:50] STUDENT_12: We define the rules.   {#1113}
[01:04:51] TEACHER: Autoscaling group will just spin up instances   {#1114}
[01:04:54] TEACHER: and add it behind a load balancer.   {#1115}
[01:04:56] TEACHER: We have to define the rules that   {#1116}
[01:04:57] TEACHER: when do we want to scale?   {#1117}
[01:04:59] TEACHER: For example, one way to scale is   {#1118}
[01:05:01] TEACHER: average CPU utilization of a cluster.   {#1119}
[01:05:05] TEACHER: So if average CPU utilization goes beyond a certain factor,   {#1120}
[01:05:07] TEACHER: add one more machine.   {#1121}
[01:05:08] TEACHER: If it goes beyond that, add one more machine.   {#1122}
[01:05:12] TEACHER: define those rules to scale up and scale down.   {#1123}
[01:05:14] TEACHER: Right.   {#1124}
[01:05:15] TEACHER: But auto scaling, what it, auto scaling group, the auto scaler that you have provided by   {#1125}
[01:05:19] TEACHER: AWS or any cloud in general, that responsibility is to spin up a machine and add it behind   {#1126}
[01:05:26] TEACHER: the load balancer.   {#1127}
[01:05:27] TEACHER: That's what it would take care of.   {#1128}
[01:05:29] TEACHER: Okay.   {#1129}
[01:05:30] TEACHER: But the rules you have to define.   {#1130}
[01:05:32] STUDENT_12: Okay.   {#1131}
[01:05:34] TEACHER: Great.   {#1132}
[01:05:35] TEACHER: We almost covered everyone.   {#1133}
[01:05:37] TEACHER: Ritin, Chandan, and Deepak, I'll take your questions at the end.   {#1134}
[01:05:41] TEACHER: Okay.   {#1135}
[01:05:42] TEACHER: let's move to delegation delegation and now here i'll cover basically kafka essentials which   {#1136}
[01:05:47] TEACHER: everything that you should know about kafka in order to design systems so those factors will   {#1137}
[01:05:52] TEACHER: cover the delegation is the most like it's like it's the most underrated way to get performance   {#1138}
[01:06:01] TEACHER: out of system so i happen to attend a talk uh 2020 we just uh went in the lockdown and there   {#1139}
[01:06:09] TEACHER: There was a session by VP engineering Hotstar.   {#1140}
[01:06:15] TEACHER: What he said stuck with me.   {#1141}
[01:06:18] TEACHER: The principle that Hotstar is known for handling massive skills.   {#1142}
[01:06:22] TEACHER: Obviously I give credit more to Akamai than Hotstar,   {#1143}
[01:06:25] TEACHER: but still Hotstar does that pretty well on the API side.   {#1144}
[01:06:28] TEACHER: So what Hotstar, what that person I really should remember his name,   {#1145}
[01:06:32] TEACHER: but what he suggested was the way Hotstar looks at systems.   {#1146}
[01:06:39] TEACHER: They live by this principle that whatever that does not need to be done in real time   {#1147}
[01:06:47] TEACHER: should not be done in real time.   {#1148}
[01:06:49] TEACHER: Now this real time implies in the context of the request.   {#1149}
[01:06:52] TEACHER: So when you send the request and it does bunch of stuff,   {#1150}
[01:06:56] TEACHER: out of those bunch of stuff that it has to do,   {#1151}
[01:06:59] TEACHER: what is extremely essential for it to do in the request context,   {#1152}
[01:07:03] TEACHER: do that.   {#1153}
[01:07:04] TEACHER: For everything else, just delegate it to the worker.   {#1154}
[01:07:08] TEACHER: This is what it lives by because of which the response time that you see, because in   {#1155}
[01:07:13] TEACHER: the context of the request, the amount of work that it has to do is bare minimum.   {#1156}
[01:07:17] TEACHER: You get very fast responses to the user.   {#1157}
[01:07:20] TEACHER: User gets good experience.   {#1158}
[01:07:21] TEACHER: There is very less load on the database and whatever can be done in an asynchronous way   {#1159}
[01:07:25] TEACHER: is done in a sequence.   {#1160}
[01:07:28] TEACHER: So this is what is superb about building systems at scale, doing or leveraging delegation   {#1161}
[01:07:34] TEACHER: to the fullest.   {#1162}
[01:07:37] TEACHER: I want to talk it in the context of medium let's say we had user information but now let's I want   {#1163}
[01:07:43] TEACHER: to add the number of essays that a person wrote on the platform but this number you may say yeah   {#1164}
[01:07:50] TEACHER: I can do it with join yeah you can do it with join but I'm just manufacturing this use case to   {#1165}
[01:07:54] TEACHER: help you understand delegation part and we'll go into Kafka essentials through this so say when I   {#1166}
[01:08:00] TEACHER: want to render this number.   {#1167}
[01:08:01] TEACHER: So what I can do is I can actually come to that.   {#1168}
[01:08:06] TEACHER: So I can actually add a field in my users table called total blocks.   {#1169}
[01:08:10] TEACHER: Right?   {#1170}
[01:08:11] TEACHER: So every time the blog is published, I want to do count plus plus over here, but   {#1171}
[01:08:15] TEACHER: this is not so critical application or not the critical update.   {#1172}
[01:08:19] TEACHER: I can do it as synchronously.   {#1173}
[01:08:21] TEACHER: Right?   {#1174}
[01:08:22] TEACHER: So which is what this delegation is all about.   {#1175}
[01:08:24] TEACHER: So the core idea of delegation looks something like this.   {#1176}
[01:08:30] TEACHER: client you get a request API server submits a task and sends the response that's only the job   {#1177}
[01:08:38] TEACHER: of API server so whatever needs to be done in the request context it's done in the request context   {#1178}
[01:08:42] TEACHER: here the request context ends as soon as the client gets the response right okay now when   {#1179}
[01:08:49] TEACHER: the task is submitted it is submitted in a buffer typically called as a broker right message broker   {#1180}
[01:08:55] TEACHER: message stream same concepts over here.   {#1181}
[01:08:57] TEACHER: So it is pushed in a broker which is consumed by a bunch of workers and these   {#1182}
[01:09:02] TEACHER: workers do the heavy lifting and update the database.   {#1183}
[01:09:06] TEACHER: Right.   {#1184}
[01:09:07] TEACHER: So for our account example, this is exactly what would happen where the   {#1185}
[01:09:13] TEACHER: updates would flow.   {#1186}
[01:09:14] TEACHER: For example, request from a user comes to the API server where a blog is   {#1187}
[01:09:19] TEACHER: published, let's say a blog is published.   {#1188}
[01:09:20] TEACHER: So what we do is we send a message called on publish in a message broker.   {#1189}
[01:09:25] TEACHER: Let's say I'm using SQS, SQS, RabbitMQ, anything.   {#1190}
[01:09:28] TEACHER: We put a message in a broker that a blog is published.   {#1191}
[01:09:31] TEACHER: Now in the worker, when a worker reads this message, it says, Hey, a blog is published.   {#1192}
[01:09:37] TEACHER: What do I do?   {#1193}
[01:09:37] TEACHER: Worker has the business logic to do total blog plus plus in the database by firing an update query.   {#1194}
[01:09:42] TEACHER: So workers make a DB call to update this total blog and do con plus plus.   {#1195}
[01:09:48] TEACHER: and then reads anywhere happen and it reads the count from here when the page refreshes   {#1196}
[01:09:55] TEACHER: and does whatever.   {#1197}
[01:09:56] TEACHER: But the updation is done in an asynchronous way in the database.   {#1198}
[01:10:00] TEACHER: So whenever a user reads the next time would see the updated value.   {#1199}
[01:10:04] TEACHER: Here you can very clearly see the delay in processing that would happen because of asynchronous   {#1200}
[01:10:10] TEACHER: flow.   {#1201}
[01:10:11] TEACHER: But what you are saving from this is that API server does not have to directly write   {#1202}
[01:10:17] TEACHER: the database. It is updating this count asynchronously. So there is no synchronous load on the database.   {#1203}
[01:10:24] TEACHER: So the number of concurrent writes happening on the database are fewer. So database is experiencing   {#1204}
[01:10:29] TEACHER: less load. So the database is happy because it is the most brittle component of your infrastructure.   {#1205}
[01:10:35] TEACHER: Protect it. It's that iPhone. It's like iPhone, right? When you, it's like the new iPhone that   {#1206}
[01:10:42] TEACHER: you purchase it's so it's so expensive that you have to keep you have to take very good you have   {#1207}
[01:10:50] TEACHER: to take very good care of it right you put it in a shell or not shell you basically put a nice cover   {#1208}
[01:10:55] TEACHER: on it to ensure that even if it falls nothing breaks same your database is iphone you have to   {#1209}
[01:11:01] TEACHER: take care of it very much because if this goes down everything is done right so take care of   {#1210}
[01:11:08] TEACHER: database like you are newly purchased for not just like but you're but you're newly purchased   {#1211}
[01:11:12] TEACHER: for right so do whatever it takes put less load on that let it work just fine it's like that pampered   {#1212}
[01:11:19] TEACHER: child right you have to keep care you have to take care of it very much right so this is how   {#1213}
[01:11:25] TEACHER: a typical flow would look like but this is where the magic happens this broker this is the heart   {#1214}
[01:11:34] TEACHER: and soul of delegation as a principle.   {#1215}
[01:11:38] TEACHER: So there are two ways to implement it, two kinds of broker.   {#1216}
[01:11:43] TEACHER: First are message queues.   {#1217}
[01:11:46] TEACHER: Second are message streams.   {#1218}
[01:11:48] TEACHER: So message queues are literal queues in which you put the message.   {#1219}
[01:11:54] TEACHER: There are bunch of consumers and they consume the message from them.   {#1220}
[01:11:58] TEACHER: Now this consumers are homogeneous consumers, which means they all do the exact same thing   {#1221}
---- OWNED SEGMENTS END ----

CTX| [01:12:04] TEACHER: that you push so let's say i have a task to publish that hey do this spin up an ec2 instance   {#1222}
CTX| [01:12:10] TEACHER: or update the account or do or send an email notification send a reminder something right   {#1223}
CTX| [01:12:17] TEACHER: a task is submitted in a message and it gets stored in the broker in a message queue sqs rabbit mq are   {#1224}
CTX| [01:12:26] TEACHER: queues then you have another message that is coming in it got over here third message came   {#1225}
CTX| [01:12:31] TEACHER: over here, right? It's a queue. So one after another. Now from this, the consumer pulls   {#1226}
CTX| [01:12:38] TEACHER: the message from the queue. It's never push base. It's very few instances where you do   {#1227}
CTX| [01:12:42] TEACHER: push base things. Your consumer pulls the message from the queue and let's say consumer   {#1228}
CTX| [01:12:47] TEACHER: to pull the message first and it will get this message.   {#1229}
CTX| [01:12:52] TEACHER: Right. Then first consumer pulled the message and it got this message. Now consumer to pull   {#1230}
CTX| [01:12:58] TEACHER: the message it saw what needs to be done it start doing that particular part right which is where   {#1231}
