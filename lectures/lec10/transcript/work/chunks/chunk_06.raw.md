# chunk_06  OWNS 01:02:35 -> 01:13:48  (segments #1084-#1284, 1729 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:01:37] TEACHER: S3 gives you that.   {#1070}
CTX| [01:01:38] TEACHER: Everyone understands S3.   {#1071}
CTX| [01:01:39] TEACHER: That's why I'm going with S3.   {#1072}
CTX| [01:01:41] TEACHER: So now on S3, what we'll have is we'll put this file having header, index and data in   {#1073}
CTX| [01:01:47] TEACHER: this one file and we store it on S3.   {#1074}
CTX| [01:01:50] TEACHER: And now what our reads would look like.   {#1075}
CTX| [01:01:52] TEACHER: Now the entire flow, end to end flow, what it would look like is when any of my API server   {#1076}
CTX| [01:02:00] TEACHER: boots up, what it would do.   {#1077}
CTX| [01:02:02] TEACHER: It would read the first 16 bytes of this file.   {#1078}
CTX| [01:02:05] TEACHER: So first of all, now this comes one step back.   {#1079}
CTX| [01:02:10] TEACHER: What each API server need to know is needs to know the file path on S3.   {#1080}
CTX| [01:02:18] TEACHER: So that can be a static configuration that this is the dictionary that we are serving.   {#1081}
CTX| [01:02:22] TEACHER: It can be a static, but I will go deeper into this because we still have to do deployment of this.   {#1082}
CTX| [01:02:27] TEACHER: So all we want is we want a file path on S3 that where exactly is the dictionary stored on S3.   {#1083}

---- OWNED SEGMENTS START ----
[01:02:35] TEACHER: So let's say we pass it as a configuration.   {#1084}
[01:02:37] TEACHER: This is a configuration.   {#1085}
[01:02:38] TEACHER: This is the path where it is stored on S3.   {#1086}
[01:02:41] TEACHER: Given that API server starts with that, what it would do it from this path, it would read   {#1087}
[01:02:46] TEACHER: the first 16 bytes.   {#1088}
[01:02:48] TEACHER: It would read the first 16 bytes, interpret it as header.   {#1089}
[01:02:51] TEACHER: It would understand it is a dictionary file, like whatever our format is.   {#1090}
[01:02:55] TEACHER: From where it would know the index size.   {#1091}
[01:02:57] TEACHER: It would read, then it would make another S3 call to read those many bytes and create   {#1092}
[01:03:02] TEACHER: a hash table in memory hash table over here.   {#1093}
[01:03:05] TEACHER: what we would have we would have an in-memory hash table in-memory hash table in-memory   {#1094}
[01:03:09] TEACHER: hash table over here then it would start serving the request whenever a get request comes in goes   {#1095}
[01:03:16] TEACHER: to any api server it would refer to this in-memory hash table if the word exists good enough if it   {#1096}
[01:03:21] TEACHER: does not exist 404 right if it exists in the in-memory hash table it would have that this   {#1097}
[01:03:29] TEACHER: word is present at this offset so what it would do it would take this know the offset go to that   {#1098}
[01:03:37] TEACHER: particular offset on s3 and read this file how would it go s3 api gives you that in the s3   {#1099}
[01:03:43] TEACHER: documentation you can do a random read and it looks on this file at this offset read these many   {#1100}
[01:03:50] TEACHER: bytes you can issue a command like this but in case you are replacing s3 with let's say hdfs   {#1101}
[01:03:55] TEACHER: has the exact same semantics. Network hard disk has the exact same semantics.   {#1102}
[01:04:00] TEACHER: Right? So you can seamlessly read the bytes that you are interested in and nothing before that,   {#1103}
[01:04:05] TEACHER: nothing after that. So you're doing the bare minimum over here. And this is how your normal   {#1104}
[01:04:11] TEACHER: gets would look like. But if you look the beauty of the system, the beauty of the system up right   {#1105}
[01:04:19] TEACHER: now is what you were just being able to do was to have pointed reads on S3.   {#1106}
[01:04:28] TEACHER: Very efficient reads.   {#1107}
[01:04:29] TEACHER: If you look carefully, what we just built is we are now able to read on a specific record   {#1108}
[01:04:39] TEACHER: from S3 just that much without reading the entire file.   {#1109}
[01:04:43] TEACHER: So we are just built our database because what a database is?   {#1110}
[01:04:49] TEACHER: Key value store, right?   {#1111}
[01:04:50] TEACHER: We just build a key value store that supports huge amount of gets on S3.   {#1112}
[01:04:56] TEACHER: So we got this ability to fire pointed queries on S3 without us having to read this entire   {#1113}
[01:05:03] TEACHER: file.   {#1114}
[01:05:03] TEACHER: And that is magical.   {#1115}
[01:05:05] TEACHER: It has a ton of applications.   {#1116}
[01:05:07] TEACHER: And we'll talk about them.   {#1117}
[01:05:08] TEACHER: We'll talk about how to extend this part into building various applications out of it.   {#1118}
[01:05:16] TEACHER: Now this is still not done.   {#1119}
[01:05:18] TEACHER: There is still a big chunk remaining.   {#1120}
[01:05:21] TEACHER: Updates.   {#1121}
[01:05:22] TEACHER: Now for us to have seamless updates.   {#1122}
[01:05:25] TEACHER: I'll just copy this diagram because we are still not discussed on updates.   {#1123}
[01:05:32] TEACHER: So we discussed on storage, we discussed on query, we discussed on high level infra that   {#1124}
[01:05:38] TEACHER: like but now what about updates? Now the updates that we are having they are weekly updates right?   {#1125}
[01:05:47] TEACHER: Updates are weekly which means every week I'll get a file from Oxford which has the words that   {#1126}
[01:05:55] TEACHER: have changed and the new meaning for that apple change let's say ball change and let's say zoo   {#1127}
[01:06:00] TEACHER: change these three words changed right? Now what would we do? We have to apply these changes   {#1128}
[01:06:07] TEACHER: to the file that we have on S3,   {#1129}
[01:06:09] TEACHER: how would we go about it?   {#1130}
[01:06:13] TEACHER: Vikram?   {#1131}
[01:06:15] STUDENT_1: Yeah, so as this is a weekly update,   {#1132}
[01:06:17] STUDENT_1: so we can have a batch job.   {#1133}
[01:06:20] STUDENT_1: So what it will do is   {#1134}
[01:06:22] STUDENT_1: it will add those newly words to the end.   {#1135}
[01:06:24] STUDENT_1: Did you mean cron job, batch job?   {#1136}
[01:06:28] STUDENT_1: Yeah, we can have a cron job also.   {#1137}
[01:06:31] STUDENT_1: See, batch job is batch processing.   {#1138}
[01:06:34] STUDENT_1: job is periodic updates.   {#1139}
[01:06:37] STUDENT_1: Yeah, periodic periodic periodic periodic job.   {#1140}
[01:06:39] STUDENT_1: Whenever there is update from Oxford, we can trigger that job or we can also have the job   {#1141}
[01:06:44] STUDENT_1: also.   {#1142}
[01:06:45] STUDENT_1: And what it will do is it will update the dictionary and at the same time it will update the index   {#1143}
[01:06:50] STUDENT_1: and so it will repackage the whole file, upload it to the S3 and where, where, where, where   {#1144}
[01:06:58] STUDENT_1: it would update what?   {#1145}
[01:07:02] STUDENT_1: Yeah, so we can have on another machine.   {#1146}
[01:07:07] STUDENT_1: Now we are talking.   {#1147}
[01:07:08] TEACHER: Okay.   {#1148}
[01:07:08] TEACHER: You're spinning up another server.   {#1149}
[01:07:10] TEACHER: Yeah.   {#1150}
[01:07:11] STUDENT_1: Now.   {#1151}
[01:07:12] STUDENT_1: And in that file, whenever we receive a new update, so we can recompute this whole file.   {#1152}
[01:07:18] TEACHER: Do you have change log on this server?   {#1153}
[01:07:20] TEACHER: Correct.   {#1154}
[01:07:21] STUDENT_1: I will add these change log files to the dictionary.   {#1155}
[01:07:25] STUDENT_1: So where is dictionary?   {#1156}
[01:07:27] STUDENT_1: Dictionary means we have to pull it from S3.   {#1157}
[01:07:29] TEACHER: Correct.   {#1158}
[01:07:30] TEACHER: You'll download it from S3.   {#1159}
[01:07:32] STUDENT_1: Then update the version of it.   {#1160}
[01:07:35] STUDENT_1: How?   {#1161}
[01:07:36] STUDENT_1: Because we know that in the header file,   {#1162}
[01:07:40] STUDENT_1: we have the version stored, right?   {#1163}
[01:07:41] STUDENT_1: At the initial byte.   {#1164}
[01:07:42] TEACHER: That's okay.   {#1165}
[01:07:43] TEACHER: That's the last thing that we'll do.   {#1166}
[01:07:44] TEACHER: But how are you updating the dictionary?   {#1167}
[01:07:47] TEACHER: This file, how are you updating?   {#1168}
[01:07:49] STUDENT_1: So are we getting only change log or the whole?   {#1169}
[01:07:53] TEACHER: Only change log.   {#1170}
[01:07:54] STUDENT_1: Only change log, right?   {#1171}
[01:07:57] STUDENT_1: So we can append it at the end because our dictionary is not sorted.   {#1172}
[01:08:05] TEACHER: But then in that case, what would happen is the dictionary would be ever increasing plus   {#1173}
[01:08:11] TEACHER: it would have duplicate entries.   {#1174}
[01:08:13] TEACHER: And I just added that you cannot have repetitive entries in the dictionary that you are serving.   {#1175}
[01:08:18] STUDENT_14: Correct.   {#1176}
[01:08:19] TEACHER: Okay.   {#1177}
[01:08:20] STUDENT_1: So now, so we can iterate the whole dictionary once and check that if the file, if the change   {#1178}
[01:08:29] STUDENT_1: log has duplicate, what else keep it.   {#1179}
[01:08:31] STUDENT_1: Or if the meaning or the, if the meaning of the word is changed, then replace that thing   {#1180}
[01:08:37] STUDENT_1: like that.   {#1181}
[01:08:38] TEACHER: Is it really that simple?   {#1182}
[01:08:42] TEACHER: Think of it.   {#1183}
[01:08:43] TEACHER: Think, go into a little more details of it.   {#1184}
[01:08:46] STUDENT_1: Yeah, we can also have a hash of it and compare the hash with two, the existing one and the   {#1185}
[01:08:52] STUDENT_1: new one.   {#1186}
[01:08:53] TEACHER: You are directly have them.   {#1187}
[01:08:54] TEACHER: See change log, anything has what needs to be changed.   {#1188}
[01:08:57] TEACHER: Simple.   {#1189}
[01:08:58] TEACHER: So you don't need hash sort of comparison.   {#1190}
[01:09:00] TEACHER: Like see, again, as I always say, it's easy to build complex systems.   {#1191}
[01:09:04] TEACHER: It's very difficult to build simple systems.   {#1192}
[01:09:06] TEACHER: Right?   {#1193}
[01:09:07] TEACHER: Think all the things that you really need.   {#1194}
[01:09:10] TEACHER: Hash, you don't need it because change log directly contains the changes that are, that   {#1195}
[01:09:15] TEACHER: on the dictionary, right?   {#1196}
[01:09:18] TEACHER: So how will you apply the changes that you have   {#1197}
[01:09:21] TEACHER: with the changelog in this file?   {#1198}
[01:09:24] TEACHER: What are the challenges that would come in?   {#1199}
[01:09:27] TEACHER: Challenges is to generate the diff actually.   {#1200}
[01:09:31] TEACHER: Why do you want to generate a diff?   {#1201}
[01:09:32] TEACHER: Change log already has this, right?   {#1202}
[01:09:34] TEACHER: You just want to apply this changes over here.   {#1203}
[01:09:36] TEACHER: What do you mean when you say to apply these changes?   {#1204}
[01:09:39] STUDENT_1: Yeah, so correct.   {#1205}
[01:09:41] STUDENT_1: So we already have an index right here.   {#1206}
[01:09:45] STUDENT_1: already had it.   {#1207}
[01:09:46] STUDENT_14: Okay.   {#1208}
[01:09:47] STUDENT_14: Correct.   {#1209}
[01:09:47] STUDENT_1: And we have a change log.   {#1210}
[01:09:49] STUDENT_1: So what we can do is, so let's say the change of meaning of apple.   {#1211}
[01:09:54] STUDENT_1: Right?   {#1212}
[01:09:54] STUDENT_1: So we can use that index file and use the index and apply those changes or replace that the   {#1213}
[01:10:02] STUDENT_1: whole line of the PSV.   {#1214}
[01:10:05] TEACHER: Okay.   {#1215}
[01:10:06] TEACHER: You're saying that if I have this file and let's say I have the word apple over here and   {#1216}
[01:10:16] TEACHER: and then let's say I have ball and I have a round object.   {#1217}
[01:10:22] TEACHER: Right.   {#1218}
[01:10:23] TEACHER: Okay.   {#1219}
[01:10:23] TEACHER: Now let's say my change log contains.   {#1220}
[01:10:27] TEACHER: I should have drawn it.   {#1221}
[01:10:29] TEACHER: Let's say my change log contains that apple   {#1222}
[01:10:31] TEACHER: and now the new meaning is a round fruit.   {#1223}
[01:10:35] TEACHER: Now, how will these changes be applied over here?   {#1224}
[01:10:38] TEACHER: You say that using index,   {#1225}
[01:10:40] TEACHER: let's say you know the offset when it needs to be changed.   {#1226}
[01:10:42] TEACHER: Now, what will you do?   {#1227}
[01:10:45] TEACHER: by this? Yes.   {#1228}
[01:10:47] TEACHER: Okay. What happens when you replace this by this?   {#1229}
[01:10:50] TEACHER: Will this entry move down?   {#1230}
[01:10:53] TEACHER: Yeah, we have to.   {#1231}
[01:10:55] STUDENT_17: Yeah. Correct.   {#1232}
[01:10:56] TEACHER: We have to do that happen in file IO.   {#1233}
[01:10:59] TEACHER: No.   {#1234}
[01:11:01] TEACHER: What happens in file IO?   {#1235}
[01:11:02] TEACHER: Let's say if I write around fruit, what would happen?   {#1236}
[01:11:07] TEACHER: It would look something like this.   {#1237}
[01:11:10] TEACHER: So this is how this is the limitation of how disk works.   {#1238}
[01:11:15] TEACHER: So when you go to a particular location and start writing,   {#1239}
[01:11:19] TEACHER: it would blindfoldedly write the bytes.   {#1240}
[01:11:22] TEACHER: Like in the IDE, when we add, we can hit enter and move other lines down.   {#1241}
[01:11:26] TEACHER: Because it is in memory.   {#1242}
[01:11:28] TEACHER: In memory, you can do that.   {#1243}
[01:11:29] TEACHER: On disk, you cannot.   {#1244}
[01:11:31] TEACHER: So when you go to this particular offset and start writing,   {#1245}
[01:11:36] TEACHER: apple, round, fruit.   {#1246}
[01:11:41] TEACHER: You are overriding the existing one.   {#1247}
[01:11:45] TEACHER: So you cannot just say I would replace it because it's not as trivial.   {#1248}
[01:11:52] STUDENT_2: So how do we go?   {#1249}
[01:12:06] TEACHER: Thanks, but thanks for making this.   {#1250}
[01:12:08] TEACHER: So this is, see, these are the details that I want all of you to focus on.   {#1251}
[01:12:14] TEACHER: Right?   {#1252}
[01:12:14] TEACHER: Because this is what makes us better engineers, because it's easy to just say, I would replace it.   {#1253}
[01:12:20] TEACHER: But when you are going to write the code, that's what I always say.   {#1254}
[01:12:24] TEACHER: An engineer, a good engineer or a senior engineer always wear three hats.   {#1255}
[01:12:28] TEACHER: Product manager, architect, and an engineer.   {#1256}
[01:12:31] TEACHER: This is what an engineer hat looks like.   {#1257}
[01:12:33] TEACHER: You go because imagine you are the one implementing it.   {#1258}
[01:12:36] TEACHER: What code will you write to implement it?   {#1259}
[01:12:39] TEACHER: And when you think of implementation, you realize the things that would break.   {#1260}
[01:12:44] TEACHER: Right.   {#1261}
[01:12:45] TEACHER: Okay.   {#1262}
[01:12:46] TEACHER: Let me pull in someone who has not spoken today.   {#1263}
[01:12:50] TEACHER: Yeah.   {#1264}
[01:12:50] STUDENT_2: Jodhinda, how would you solve this problem?   {#1265}
[01:12:53] STUDENT_3: Can we have sort of like graveyard entries, which sort of replace the   {#1266}
[01:12:57] STUDENT_3: currently existing entries there?   {#1267}
[01:12:59] STUDENT_3: For example, if we have a new meaning for Apple, we append it to the end of   {#1268}
[01:13:03] STUDENT_3: the file and the previous.   {#1269}
[01:13:04] TEACHER: No repetitive entries.   {#1270}
[01:13:07] STUDENT_3: Uh, okay.   {#1271}
[01:13:09] STUDENT_3: Well, okay.   {#1272}
[01:13:10] STUDENT_3: So I was thinking like you just, uh, sort of, uh, waste, waste, that space for some   {#1273}
[01:13:14] STUDENT_3: time and, uh, later run some sort of compaction process after.   {#1274}
[01:13:19] TEACHER: No, but we don't see it would work well when you are doing live updates.   {#1275}
[01:13:23] TEACHER: This is an even weekly update.   {#1276}
[01:13:24] TEACHER: So have it very clean up it directly.   {#1277}
[01:13:27] TEACHER: Right.   {#1278}
[01:13:27] STUDENT_2: Yeah.   {#1279}
[01:13:29] STUDENT_2: Uh, Shreya.   {#1280}
[01:13:33] STUDENT_9: Hello.   {#1281}
[01:13:34] STUDENT_9: Yeah.   {#1282}
[01:13:35] STUDENT_9: Um, yeah.   {#1283}
[01:13:36] STUDENT_9: approach would be to just a very naive approach would be to look for every word.   {#1284}
---- OWNED SEGMENTS END ----

CTX| [01:13:48] STUDENT_9: Get the byte where we are supposed to like enter it. And then so we what we are doing is we are   {#1285}
CTX| [01:13:55] STUDENT_9: creating a new file. Now, add that change in that file. And then append all the rest file to it.   {#1286}
CTX| [01:14:03] STUDENT_9: and then I mean it would be a very naive approach no no it's not naive it's not naive it's kind of   {#1287}
CTX| [01:14:09] TEACHER: like merge of merge sort correct yeah yeah and that's exactly why you should do it that's what   {#1288}
CTX| [01:14:14] TEACHER: the best approach is I'm not even kidding it's not a naive approach to be honest it's not a   {#1289}
CTX| [01:14:19] TEACHER: approach given the design that we have we're not using fancy b plus trees over here we're going   {#1290}
CTX| [01:14:23] TEACHER: with very simple approach but that's how it works right you think of a simple approach and that's   {#1291}
CTX| [01:14:29] TEACHER: what is going to be really efficient when you make things complex.   {#1292}
CTX| [01:14:32] TEACHER: It has its own set of disadvantages.   {#1293}
CTX| [01:14:34] TEACHER: Right.   {#1294}
CTX| [01:14:35] TEACHER: Okay.   {#1295}
CTX| [01:14:35] TEACHER: So this is why and the requirement to do that merge of merge sort to be to be efficient   {#1296}
CTX| [01:14:43] TEACHER: is that your file needs to be sorted.   {#1297}
CTX| [01:14:46] TEACHER: I'll just quickly walk you through on what this is all about.   {#1298}
