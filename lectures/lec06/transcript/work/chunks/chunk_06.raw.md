# chunk_06  OWNS 00:56:51 -> 01:08:10  (segments #984-#1174, 1826 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:55:55] TEACHER: Great.   {#965}
CTX| [00:55:56] TEACHER: Okay.   {#966}
CTX| [00:55:57] TEACHER: One more thing.   {#967}
CTX| [00:55:58] TEACHER: See, that's why it's, it's, this is exactly like code reviews.   {#968}
CTX| [00:56:01] TEACHER: When you write five lines of code, you'll get 50 comments.   {#969}
CTX| [00:56:04] TEACHER: When you write 500 lines of code, you'll get looks good to me.   {#970}
CTX| [00:56:07] TEACHER: Same thing.   {#971}
CTX| [00:56:08] TEACHER: When you have a simple system at hand, that's where people would try to basically nitpick   {#972}
CTX| [00:56:13] TEACHER: every single thing.   {#973}
CTX| [00:56:14] TEACHER: Okay.   {#974}
CTX| [00:56:15] TEACHER: There is one small minor, very minor optimization that you can do very minor.   {#975}
CTX| [00:56:25] TEACHER: Can anyone spot it?   {#976}
CTX| [00:56:26] TEACHER: Very minor.   {#977}
CTX| [00:56:27] TEACHER: Like it's literally insignificant, but still if you do it, it's slightly better.   {#978}
CTX| [00:56:32] TEACHER: Hey, man.   {#979}
CTX| [00:56:36] STUDENT_1: Actually, I'm not able to say, let me see it, but I have another question also.   {#980}
CTX| [00:56:41] STUDENT_1: And that's no question after a question.   {#981}
CTX| [00:56:43] TEACHER: Let's follow that optimization.   {#982}
CTX| [00:56:44] TEACHER: More than happy to take questions.   {#983}

---- OWNED SEGMENTS START ----
[00:56:51] STUDENT_1: Any hint for, are you talking about the first part of query?   {#984}
[00:56:54] STUDENT_1: Okay.   {#985}
[00:56:55] TEACHER: Let's write a query to pick an active photo of a user because that's what would happen when you hit this URL.   {#986}
[00:57:03] TEACHER: When you hit this URL, you have to pick the active photo of the user.   {#987}
[00:57:06] TEACHER: What your query would look like?   {#988}
[00:57:09] STUDENT_1: So select a star from photos where has what we have provided as the user ID and join on   {#989}
[00:57:25] STUDENT_1: user id from photos table   {#990}
[00:57:30] TEACHER: so exactly this query but just with one more word class yes okay let me just copy this for   {#991}
[00:57:40] STUDENT_1: so where user has is this yes and user uh user photos.id yeah photos id   {#992}
[00:57:50] TEACHER: and one more no no no no no no no no not photos id but photos dot is active photos dot is active true   {#993}
[00:57:59] TEACHER: correct okay correct this is your query this would give you for all the uh one photo because   {#994}
[00:58:06] TEACHER: photo active true only one we ensure the correctness over here user hash and we join on this   {#995}
[00:58:11] TEACHER: user table okay can we optimize on something in this query very micro optimization i'm literally   {#996}
[00:58:16] TEACHER: nitpicking but just it.   {#997}
[00:58:23] TEACHER: Are you talking about left right join?   {#998}
[00:58:25] TEACHER: No, no, that's okay.   {#999}
[00:58:27] TEACHER: Inner join would work exactly the same performance as left left in that.   {#1000}
[00:58:31] TEACHER: So it's fine.   {#1001}
[00:58:32] TEACHER: Okay.   {#1002}
[00:58:36] STUDENT_1: UJR has equal.   {#1003}
[00:58:40] STUDENT_1: I can see only as I evolve part first is the join thing.   {#1004}
[00:58:46] STUDENT_1: And then the conditional filtering filtering once we join on user ID, we got all the rows   {#1005}
[00:58:56] STUDENT_1: for user matching user ID and then user has.   {#1006}
[00:59:07] STUDENT_1: So I think eval should work not on that.   {#1007}
[00:59:10] STUDENT_1: But first user has equal to user ID.   {#1008}
[00:59:12] STUDENT_1: So it will figure it out.   {#1009}
[00:59:14] STUDENT_1: What are the rows with the user has, which will go one row from user's table.   {#1010}
[00:59:18] STUDENT_1: And then I got the row.   {#1011}
[00:59:21] STUDENT_1: So I got the user ID.   {#1012}
[00:59:22] STUDENT_1: Now that user ID will do the join on photos, which will give a number of,   {#1013}
[00:59:28] STUDENT_1: let's say rows, which are there for each user, for that user.   {#1014}
[00:59:34] STUDENT_1: And on that you are saying, which one is true?   {#1015}
[00:59:39] STUDENT_1: it seems very   {#1016}
[00:59:43] STUDENT_1: but   {#1017}
[00:59:44] TEACHER: I'm extremely nitpicking over here   {#1018}
[00:59:46] TEACHER: in practical use cases you might see   {#1019}
[00:59:49] TEACHER: very minimal performance difference   {#1020}
[00:59:51] TEACHER: very minimal but   {#1021}
[00:59:53] TEACHER: I just wanted to highlight that   {#1022}
[00:59:55] TEACHER: like just it's a very   {#1023}
[00:59:57] TEACHER: it's a stretch but I still want you to   {#1024}
[00:59:59] TEACHER: highlight that optimization that's why   {#1025}
[01:00:02] TEACHER: okay   {#1026}
[01:00:04] TEACHER: yeah Silesh   {#1027}
[01:00:05] TEACHER: oh sorry sorry go on go on go on   {#1028}
[01:00:09] STUDENT_1: Okay, so the only thing is the only extra work that we have to do is on ejective two.   {#1029}
[01:00:21] TEACHER: So is there any ordering or something which it's anyway indexed because you would be anyway narrowing down on that one row that would be indexed.   {#1030}
[01:00:31] TEACHER: So it will be an index lookup very fast.   {#1031}
[01:00:33] TEACHER: So that's not a problem.   {#1032}
[01:00:35] STUDENT_1: okay so i was i was able to think that only yeah maybe i'm giving up but again got it yeah sitesh   {#1033}
[01:00:42] STUDENT_2: god what would you optimize yeah i can't optimize something on right hand side but left hand side   {#1034}
[01:00:47] STUDENT_2: one optimization i can think is don't update if it is it's active it's true and so you're saying   {#1035}
[01:00:53] STUDENT_2: one one one describe there yeah and one more thing is if i just zoom out i would store active photo   {#1036}
[01:01:02] STUDENT_2: ID in the users table because it would be a heavy system. So writing this whole transaction would   {#1037}
[01:01:08] STUDENT_2: get us out. Which one? This entire one? I'm saying in the users table, I would like to store   {#1038}
[01:01:18] STUDENT_2: active photo ID. Ah, gotcha. So now what would it do? So basically like see on a high level,   {#1039}
[01:01:29] STUDENT_2: This is a readavis system.   {#1040}
[01:01:30] STUDENT_2: The whole transaction thing, the whole photo scan table, everything would...   {#1041}
[01:01:34] STUDENT_2: Like this is a single scan in the photos table.   {#1042}
[01:01:37] STUDENT_2: So we are saving everything.   {#1043}
[01:01:40] STUDENT_2: All of these transaction queries, all of this will be nullified.   {#1044}
[01:01:43] TEACHER: Correct.   {#1045}
[01:01:44] TEACHER: You can very well know, but you would still need this transaction.   {#1046}
[01:01:48] TEACHER: You would still need this because now you would want to update on that other thing.   {#1047}
[01:01:51] TEACHER: You would still need this transaction.   {#1048}
[01:01:53] TEACHER: Your queries would change.   {#1049}
[01:01:54] TEACHER: But in this case, for this query, you are avoiding that join.   {#1050}
[01:01:59] STUDENT_14: Yes.   {#1051}
[01:02:00] STUDENT_14: No, but my question was.   {#1052}
[01:02:02] TEACHER: Updating.   {#1053}
[01:02:02] TEACHER: Yeah, but now when you're updating,   {#1054}
[01:02:04] TEACHER: you would also need to update in that same transaction.   {#1055}
[01:02:10] TEACHER: Update users table.   {#1056}
[01:02:13] TEACHER: Set active photo ID.   {#1057}
[01:02:18] TEACHER: Equal to the one that you get from the above.   {#1058}
[01:02:20] TEACHER: So select from this and update over here.   {#1059}
[01:02:22] TEACHER: Where user ID equal to this.   {#1060}
[01:02:24] TEACHER: Where user ID equal to this.   {#1061}
[01:02:29] TEACHER: ID was there. This is what happens is if you maintain an active photo ID over here,   {#1062}
[01:02:33] TEACHER: you are more frequent query. The most frequent query on your platform would be this, right?   {#1063}
[01:02:40] TEACHER: Getting the active photo ID and then rendering it on the UI. Even this is the most active query.   {#1064}
[01:02:46] TEACHER: Here you can avoid this join. Although that's what I said. I'm very nitpicking,   {#1065}
[01:02:49] TEACHER: extreme nitpicking business because it's not going to be a massive performance difference,   {#1066}
[01:02:53] TEACHER: but we can still avoid this very small join that we are incurring. By just replacing this   {#1067}
[01:02:59] TEACHER: to be   {#1068}
[01:03:02] TEACHER: select star from   {#1069}
[01:03:03] TEACHER: photos, select star from users   {#1070}
[01:03:06] TEACHER: where   {#1071}
[01:03:06] TEACHER: id is equal to this. That's it.   {#1072}
[01:03:08] TEACHER: Because in star you get active photo id, active photo   {#1073}
[01:03:10] TEACHER: id and user id computation. You can create   {#1074}
[01:03:13] TEACHER: a S3 path, read the file and send it to the   {#1075}
[01:03:15] TEACHER: user. As simple as that.   {#1076}
[01:03:17] TEACHER: So you don't need   {#1077}
[01:03:18] TEACHER: to complicate at all.   {#1078}
[01:03:21] STUDENT_2: One question Arpit.   {#1079}
[01:03:22] STUDENT_2: Why do you need to like, is there any another   {#1080}
[01:03:24] STUDENT_2: query that we are supporting? Why do we need to store   {#1081}
[01:03:26] STUDENT_2: is active in the photos table?   {#1082}
[01:03:30] TEACHER: No, it's just that we have multiple photos.   {#1083}
[01:03:32] TEACHER: You have to mark one of them as active, right?   {#1084}
[01:03:34] TEACHER: That's right.   {#1085}
[01:03:35] STUDENT_2: I mean, if you are supporting a query that is given a photo ID,   {#1086}
[01:03:39] STUDENT_2: tell me it's active or not, you can join with the user, right?   {#1087}
[01:03:41] STUDENT_2: But that's not a frequent query.   {#1088}
[01:03:42] TEACHER: Now we can do that.   {#1089}
[01:03:43] TEACHER: Now we can do that, right?   {#1090}
[01:03:45] TEACHER: Yeah.   {#1091}
[01:03:45] TEACHER: Now that we are storing it over here.   {#1092}
[01:03:48] TEACHER: So there are two designs.   {#1093}
[01:03:50] TEACHER: Either you store it as active in the photos table   {#1094}
[01:03:52] TEACHER: or you store active photo ID in the users table, right?   {#1095}
[01:03:55] TEACHER: This is what happens is your most frequent query in your system does not have to go and   {#1096}
[01:04:01] TEACHER: join two tables.   {#1097}
[01:04:02] TEACHER: It is literally a primary key lookup.   {#1098}
[01:04:05] TEACHER: As simple as that.   {#1099}
[01:04:07] TEACHER: And now when you are marking a photo as active, you don't need to mark others as inactive,   {#1100}
[01:04:12] TEACHER: current one as active.   {#1101}
[01:04:13] TEACHER: You can simply do this.   {#1102}
[01:04:16] TEACHER: And it just simplifies your entire thing.   {#1103}
[01:04:20] TEACHER: But it is very counterintuitive because you think is active is a property of photo, not a user.   {#1104}
[01:04:29] TEACHER: This is another thing that I want to always bring out that we typically think like whenever   {#1105}
[01:04:34] TEACHER: we are doing class design or rather low level design, the basic class design or when we   {#1106}
[01:04:41] TEACHER: are designing schema of it, we tend to think in terms of attributes of a particular entity.   {#1107}
[01:04:48] TEACHER: think in a normal human way, you think that is active is property of photos,   {#1108}
[01:04:53] TEACHER: which is where in most cases we typically read is active in photo stable.   {#1109}
[01:04:57] TEACHER: But it again, as I said, extreme nitpicking, but if you think a little   {#1110}
[01:05:03] TEACHER: out of the box, you realize that if you store active photo ID over here,   {#1111}
[01:05:06] TEACHER: it just oversimplifies it because now we don't need this.   {#1112}
[01:05:10] TEACHER: Now we don't need this.   {#1113}
[01:05:12] TEACHER: All you need is this with that, with those two additional checks.   {#1114}
[01:05:15] TEACHER: Right?   {#1115}
[01:05:18] TEACHER: Update or marking a photos active becomes just single query.   {#1116}
[01:05:22] TEACHER: No need to have two or three queries put in a transaction at all.   {#1117}
[01:05:25] TEACHER: If you have auto commit, a single query is a transaction in itself.   {#1118}
[01:05:28] TEACHER: That would solve it.   {#1119}
[01:05:29] TEACHER: Single query would do the job.   {#1120}
[01:05:31] TEACHER: This query becomes really simple because all you are doing is just doing a normal select   {#1121}
[01:05:36] TEACHER: over your select start from users where ID is equal to this.   {#1122}
[01:05:40] TEACHER: You get a user ID, you get photo ID, you can create S3 path, read the image,   {#1123}
[01:05:44] TEACHER: serve it to the user.   {#1124}
[01:05:44] TEACHER: and you're just oversimplifying a lot of stuff.   {#1125}
[01:05:48] TEACHER: A little counter-intuitive, but it works, right?   {#1126}
[01:05:53] TEACHER: So I am purely highlighting these points purely from the perspective   {#1127}
[01:05:59] TEACHER: that what seems very simple, it's not as simple as it seems   {#1128}
[01:06:04] TEACHER: when you go into those details.   {#1129}
[01:06:05] TEACHER: When you go into those details, a lot of things can be challenged.   {#1130}
[01:06:09] TEACHER: There is no one way to build the system, right?   {#1131}
[01:06:14] TEACHER: or is active as a property of photo to being a property of user,   {#1132}
[01:06:19] TEACHER: which is showing the is active or active photo ID.   {#1133}
[01:06:22] TEACHER: Right.   {#1134}
[01:06:22] TEACHER: We are taking away, we just chopped up the complexities of the system by doing this.   {#1135}
[01:06:27] TEACHER: But instead of directly jumping to this, we went because it's a natural progression.   {#1136}
[01:06:33] TEACHER: It is 15th cohort of bike in every single cohort.   {#1137}
[01:06:37] TEACHER: Since the time when I started taking this question, every single cohort,   {#1138}
[01:06:40] TEACHER: people start with is active over here because we are trained to do so.   {#1139}
[01:06:45] TEACHER: We are trained to think in a certain way,   {#1140}
[01:06:48] TEACHER: but that might not be the most optimal.   {#1141}
[01:06:51] TEACHER: And I'm not saying this is like,   {#1142}
[01:06:52] TEACHER: that is like my approach is like humongously more optimal.   {#1143}
[01:06:54] TEACHER: I'm just proving you folks into thinking that,   {#1144}
[01:06:57] TEACHER: hey, some other solution,   {#1145}
[01:06:59] TEACHER: which might be a little more optimized can exist, right?   {#1146}
[01:07:03] TEACHER: So always be handy in challenging your own beliefs,   {#1147}
[01:07:06] TEACHER: unlearn, relearn and become a better, right?   {#1148}
[01:07:10] TEACHER: Okay, so these are the key things that I wanted to cover.   {#1149}
[01:07:13] TEACHER: Let me formally cover it before we take questions.   {#1150}
[01:07:15] TEACHER: And it's already one or 10 minutes that we didn't cover   {#1151}
[01:07:19] TEACHER: on-demand image optimization yet.   {#1152}
[01:07:22] TEACHER: Okay, nothing to worry about.   {#1153}
[01:07:23] TEACHER: We have enough.   {#1154}
[01:07:24] STUDENT_9: I have one question to this.   {#1155}
[01:07:25] STUDENT_9: Wait, wait, wait.   {#1156}
[01:07:25] TEACHER: We'll come back, we'll come back, we'll come back, right?   {#1157}
[01:07:28] TEACHER: Okay.   {#1158}
[01:07:29] TEACHER: So for our gravata.com,   {#1159}
[01:07:32] TEACHER: given that we dive very deep into the SQL query side of things,   {#1160}
[01:07:37] TEACHER: how we think about performance,   {#1161}
[01:07:38] TEACHER: how we think about architecting, like,   {#1162}
[01:07:40] TEACHER: Think about other implementation details.   {#1163}
[01:07:42] TEACHER: Let's talk about how will you design it in general?   {#1164}
[01:07:44] TEACHER: So we take the photo upload service that we designed yesterday,   {#1165}
[01:07:47] TEACHER: plug and play as it over here.   {#1166}
[01:07:49] TEACHER: No changes at all.   {#1167}
[01:07:51] TEACHER: Like your photo upload service, pre-signed URL and whatnot remains as is.   {#1168}
[01:07:55] TEACHER: Right.   {#1169}
[01:07:55] TEACHER: But now when user is publishing the photo,   {#1170}
[01:07:58] TEACHER: you just make an entry into the photo stable that we just designed.   {#1171}
[01:08:01] TEACHER: Right.   {#1172}
[01:08:01] TEACHER: That's how your photos upload would work.   {#1173}
[01:08:03] TEACHER: Then when you are when user puts that even here, usually.   {#1174}
---- OWNED SEGMENTS END ----

CTX| [01:08:10] TEACHER: user ID is active as true schema users you store email and the hash storing   {#1175}
CTX| [01:08:16] TEACHER: derived value contrary to what we studied yesterday here we are storing the   {#1176}
CTX| [01:08:21] TEACHER: derived value because it makes index look up faster right that's why we are   {#1177}
CTX| [01:08:25] TEACHER: doing it rendering the photo is really simple whatever you have now here just   {#1178}
CTX| [01:08:30] TEACHER: walking you through the actual thing because now we do not want to serve   {#1179}
CTX| [01:08:36] TEACHER: photos from our backend servers.   {#1180}
CTX| [01:08:40] TEACHER: We want to survey a CDN.   {#1181}
CTX| [01:08:42] TEACHER: Imagine at the scale of Facebook, at the scale of Instagram,   {#1182}
CTX| [01:08:44] TEACHER: if they start using Gravita, right?   {#1183}
CTX| [01:08:47] TEACHER: They're doing millions and millions and millions of hits coming in.   {#1184}
CTX| [01:08:49] TEACHER: If that's the case, then how will you handle the traffic, right?   {#1185}
CTX| [01:08:54] TEACHER: All so much of traffic coming to our backend servers,   {#1186}
CTX| [01:08:57] TEACHER: which in turn gets pushed onto S3 that would create chaos.   {#1187}
CTX| [01:09:01] TEACHER: Your AWS will go to shoot up.   {#1188}
CTX| [01:09:03] TEACHER: So what do you do?   {#1189}
CTX| [01:09:04] TEACHER: you have to use CDN for that to give a better user experience.   {#1190}
CTX| [01:09:07] TEACHER: So now what we are doing is we are writing api.gravita.com   {#1191}
