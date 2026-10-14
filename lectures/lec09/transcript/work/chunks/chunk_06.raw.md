# chunk_06  OWNS 01:00:44 -> 01:13:54  (segments #1076-#1348, 2347 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:59:48] TEACHER: server, which is located in Bangalore itself.   {#1035}
CTX| [00:59:50] TEACHER: So in this situation, S3 will be faster or a CDN will be faster.   {#1036}
CTX| [00:59:55] TEACHER: That's very specific example.   {#1037}
CTX| [00:59:56] TEACHER: If you are using Akama and if they have their edge server in Bangalore, then CDN.   {#1038}
CTX| [01:00:01] TEACHER: Okay.   {#1039}
CTX| [01:00:02] TEACHER: But, but it is because of the location only, which makes CDN faster, but you would pay   {#1040}
CTX| [01:00:07] TEACHER: a huge amount of cost on S3.   {#1041}
CTX| [01:00:10] TEACHER: CDN reads.   {#1042}
CTX| [01:00:13] TEACHER: Okay.   {#1043}
CTX| [01:00:14] TEACHER: There are some   {#1044}
CTX| [01:00:14] TEACHER: other optimizations   {#1045}
CTX| [01:00:15] TEACHER: also in   {#1046}
CTX| [01:00:18] TEACHER: it's not only   {#1047}
CTX| [01:00:19] TEACHER: the geographical   {#1048}
CTX| [01:00:20] TEACHER: location or   {#1049}
CTX| [01:00:21] TEACHER: the edge server   {#1050}
CTX| [01:00:21] TEACHER: location that   {#1051}
CTX| [01:00:22] TEACHER: makes it   {#1052}
CTX| [01:00:23] TEACHER: key reason is   {#1053}
CTX| [01:00:24] TEACHER: geography but   {#1054}
CTX| [01:00:25] TEACHER: there might be   {#1055}
CTX| [01:00:25] TEACHER: other things.   {#1056}
CTX| [01:00:26] TEACHER: Do a benchmark   {#1057}
CTX| [01:00:27] TEACHER: and find it   {#1058}
CTX| [01:00:27] TEACHER: out because I   {#1059}
CTX| [01:00:28] TEACHER: know there are   {#1060}
CTX| [01:00:30] TEACHER: at least 18   {#1061}
CTX| [01:00:31] TEACHER: locations of   {#1062}
CTX| [01:00:31] TEACHER: Akama in   {#1063}
CTX| [01:00:32] TEACHER: India but   {#1064}
CTX| [01:00:33] TEACHER: AWS only has   {#1065}
CTX| [01:00:34] TEACHER: two data   {#1066}
CTX| [01:00:34] TEACHER: centers, three   {#1067}
CTX| [01:00:34] TEACHER: data centers   {#1068}
CTX| [01:00:35] TEACHER: now.   {#1069}
CTX| [01:00:36] TEACHER: Right.   {#1070}
CTX| [01:00:36] TEACHER: But CDN   {#1071}
CTX| [01:00:37] TEACHER: has one in   {#1072}
CTX| [01:00:39] TEACHER: Bhopal.   {#1073}
CTX| [01:00:39] TEACHER: Akama has   {#1074}
CTX| [01:00:41] TEACHER: three in North India,   {#1075}

---- OWNED SEGMENTS START ----
[01:00:44] TEACHER: two in Northeast,   {#1076}
[01:00:46] TEACHER: three in West and four in South.   {#1077}
[01:00:49] TEACHER: Yeah, four in South.   {#1078}
[01:00:51] TEACHER: So they are much more geographically closer.   {#1079}
[01:00:53] TEACHER: So you don't even have to go to Bangalore to read it.   {#1080}
[01:00:56] TEACHER: You can literally serve it right there and then.   {#1081}
[01:00:59] STUDENT_10: Got it.   {#1082}
[01:01:00] TEACHER: So geographical reason is one of the biggest reasons.   {#1083}
[01:01:03] TEACHER: Apart from that,   {#1084}
[01:01:04] TEACHER: the way it is storing the data,   {#1085}
[01:01:05] TEACHER: the way S3 is handling it,   {#1086}
[01:01:07] TEACHER: S3 has some guarantees.   {#1087}
[01:01:08] TEACHER: Esri gives you nine nines guarantee, something like that.   {#1088}
[01:01:11] TEACHER: Right.   {#1089}
[01:01:11] TEACHER: Cedian gives you different guarantees.   {#1090}
[01:01:13] TEACHER: They give you better response time.   {#1091}
[01:01:14] TEACHER: It can store it.   {#1092}
[01:01:15] TEACHER: I don't know where they are storing.   {#1093}
[01:01:17] TEACHER: They are storing it on local days.   {#1094}
[01:01:18] TEACHER: They might be storing it on the SSDs.   {#1095}
[01:01:20] TEACHER: Esri doesn't store on SSDs.   {#1096}
[01:01:21] TEACHER: Right.   {#1097}
[01:01:22] TEACHER: So a lot of factors.   {#1098}
[01:01:23] TEACHER: But if you are so keen on announcing out performance out of it, do a benchmark and see what works   {#1099}
[01:01:28] TEACHER: the best for you.   {#1100}
[01:01:29] TEACHER: If Cedian does not work best for you, that's okay.   {#1101}
[01:01:31] TEACHER: Right.   {#1102}
[01:01:32] TEACHER: But then you will have to pay for Esri's egress cost.   {#1103}
[01:01:34] TEACHER: You should be okay for that.   {#1104}
[01:01:36] STUDENT_10: Got it.   {#1105}
[01:01:38] TEACHER: This question always keeps me wondering why CDN are faster than S3 also?   {#1106}
[01:01:43] TEACHER: Is it only the location?   {#1107}
[01:01:44] TEACHER: No, no.   {#1108}
[01:01:45] TEACHER: There are a lot of factors.   {#1109}
[01:01:46] TEACHER: S3 does not read from SSDs.   {#1110}
[01:01:50] TEACHER: CDN might have a bunch of SSDs.   {#1111}
[01:01:51] TEACHER: We don't know.   {#1112}
[01:01:52] TEACHER: Right.   {#1113}
[01:01:53] TEACHER: Talk to other ones.   {#1114}
[01:01:54] TEACHER: Just schedule the call with Android.   {#1115}
[01:01:56] TEACHER: CDN uses SSD.   {#1116}
[01:01:58] TEACHER: But S3, given that it's an ocean of data, it does not use SSD.   {#1117}
[01:02:02] TEACHER: It would become very costly for them to do so.   {#1118}
[01:02:04] TEACHER: Right.   {#1119}
[01:02:04] TEACHER: So that's one more reason.   {#1120}
[01:02:09] STUDENT_2: Yeah, so we talked about how CDN will fetch the data from S3, right?   {#1121}
[01:02:16] STUDENT_2: So it won't be a direct path because generally when we are fetching from S3, we have to again   {#1122}
[01:02:21] STUDENT_2: generate a signed URL and that is also valid for only some amount of time and then we can   {#1123}
[01:02:26] STUDENT_2: fetch it.   {#1124}
[01:02:26] TEACHER: No, if it's a private image, then you need a signed URL to do that.   {#1125}
[01:02:31] TEACHER: Otherwise you can directly access.   {#1126}
[01:02:33] TEACHER: So that's where I said, right? CDN has this special integration with AWS where you have   {#1127}
[01:02:38] TEACHER: to upload a AWS private key and secret key on CDN so that it can access private images   {#1128}
[01:02:42] TEACHER: from your private S3 bucket.   {#1129}
[01:02:44] STUDENT_2: Okay.   {#1130}
[01:02:45] STUDENT_2: Okay.   {#1131}
[01:02:46] STUDENT_2: So it is doing the same flow.   {#1132}
[01:02:48] STUDENT_2: Like it is generating that side URL.   {#1133}
[01:02:50] STUDENT_5: No, it does not.   {#1134}
[01:02:51] STUDENT_5: It has AWS access keys and secret keys.   {#1135}
[01:02:54] TEACHER: It can directly make an NS3 call to read it.   {#1136}
[01:02:56] STUDENT_2: Okay.   {#1137}
[01:02:58] TEACHER: normal s3 read not using url using normal aws sdk on it it has the skis with it right and directly   {#1138}
[01:03:05] TEACHER: make a call and read it and that's one of the ways that might not be the only case because now given   {#1139}
[01:03:10] TEACHER: that the popularity of cdn is very high and almost everyone uses it in front of s3 cdn has native   {#1140}
[01:03:16] TEACHER: integrations on s3 and s3 also by default supports seamless integration with cdn whether you don't   {#1141}
[01:03:21] TEACHER: have to do this kind of uh every time authenticated request and whatnot there is very seamless   {#1142}
[01:03:27] TEACHER: between CDNs and S3s.   {#1143}
[01:03:29] STUDENT_2: Okay.   {#1144}
[01:03:30] STUDENT_2: Yeah, thanks.   {#1145}
[01:03:31] TEACHER: Just sign up on Akamai or Cloudflare   {#1146}
[01:03:32] TEACHER: and configure it.   {#1147}
[01:03:34] TEACHER: Create an AWS account.   {#1148}
[01:03:35] TEACHER: Take out $100 from a salary.   {#1149}
[01:03:37] TEACHER: It's nothing, just 7,000 rupees   {#1150}
[01:03:38] TEACHER: or 8,000 rupees.   {#1151}
[01:03:39] TEACHER: Take it out.   {#1152}
[01:03:40] TEACHER: Play around with CDN.   {#1153}
[01:03:41] TEACHER: Play around with S3.   {#1154}
[01:03:42] TEACHER: Play around with AWS   {#1155}
[01:03:43] TEACHER: and experience this.   {#1156}
[01:03:45] TEACHER: Right?   {#1157}
[01:03:46] TEACHER: Okay.   {#1158}
[01:03:47] TEACHER: Prashant Raji,   {#1159}
[01:03:47] TEACHER: I'll take your questions in some time.   {#1160}
[01:03:48] TEACHER: There's still a huge set of things to cover.   {#1161}
[01:03:50] TEACHER: We'll also cover.   {#1162}
[01:03:51] TEACHER: I want to touch upon privacy.   {#1163}
[01:03:53] TEACHER: That's really interesting.   {#1164}
[01:03:54] TEACHER: Hey, where's my Insta account?   {#1165}
[01:03:56] TEACHER: demo. Do I have public? I'll need to check. I'll do that. Where are we? I'll share my iPad.   {#1166}
[01:04:07] TEACHER: Because I want to show you Insta images are not the private Insta images are not private. That's   {#1167}
[01:04:13] TEACHER: a big myth. We'll understand how privacy is implemented in social media. We'll also talk   {#1168}
[01:04:19] TEACHER: about that. And that's where it's the magic of CDN. Again, CDN cocks up. Okay. So we discussed   {#1169}
[01:04:27] TEACHER: Storage, we discuss how the data would flow.   {#1170}
[01:04:29] TEACHER: Uh, separation of concern is what I want to discuss next.   {#1171}
[01:04:33] TEACHER: Now, this is a very interesting concept.   {#1172}
[01:04:35] TEACHER: Now, a lot of folks, if I ask you, let me ask you this question.   {#1173}
[01:04:40] TEACHER: User imagine Instagram.   {#1174}
[01:04:42] TEACHER: What would your post table look like?   {#1175}
[01:04:46] TEACHER: What would be the scheme of that?   {#1176}
[01:04:48] TEACHER: Raise your hands.   {#1177}
[01:04:49] TEACHER: One raise your hand.   {#1178}
[01:04:50] TEACHER: What would be the scheme of your post table?   {#1179}
[01:04:52] TEACHER: What all would you store?   {#1180}
[01:04:58] STUDENT_2: Yeah, so it will have a user ID posted.   {#1181}
[01:05:05] STUDENT_2: Then it will have the post content like the text post text caption.   {#1182}
[01:05:11] TEACHER: Yeah.   {#1183}
[01:05:12] STUDENT_2: And it might have some tags also.   {#1184}
[01:05:15] STUDENT_2: So we can store it.   {#1185}
[01:05:17] TEACHER: It's not explicit tags.   {#1186}
[01:05:19] TEACHER: It's part of the caption.   {#1187}
[01:05:20] TEACHER: Okay.   {#1188}
[01:05:20] TEACHER: yeah and then when it was created created it that's fine and photos what photos what will   {#1189}
[01:05:31] STUDENT_2: you store in photos so it will be like the url of the photo which you got the pre-signed url this   {#1190}
[01:05:38] TEACHER: is what i want to talk about not present url the actual cd and url yeah basically yeah okay now this   {#1191}
[01:05:44] TEACHER: is what i want to bring to the notice that uh please go on this is what i want to bring to   {#1192}
[01:05:50] TEACHER: Every single one thinks of building it like this.   {#1193}
[01:05:54] TEACHER: Every single cohort, every single person thinks of it building.   {#1194}
[01:05:57] TEACHER: But no, this is wrong.   {#1195}
[01:06:00] TEACHER: Why?   {#1196}
[01:06:00] TEACHER: This is suboptimal.   {#1197}
[01:06:01] TEACHER: Wrong would be a strong word.   {#1198}
[01:06:03] TEACHER: This is suboptimal.   {#1199}
[01:06:04] TEACHER: I'll tell you why.   {#1200}
[01:06:05] TEACHER: Always remember.   {#1201}
[01:06:06] TEACHER: Always, always, always, always remember that if something is derivable, don't store it.   {#1202}
[01:06:13] TEACHER: For example, this is what I want to talk about.   {#1203}
[01:06:20] TEACHER: Almost every single one of you would have thought, Hey, it's simple.   {#1204}
[01:06:23] TEACHER: Now post, I'll have a post ID.   {#1205}
[01:06:25] TEACHER: I'll have user who created a post and I'll have image URL.   {#1206}
[01:06:28] TEACHER: Instagram, I'll have image URL.   {#1207}
[01:06:30] TEACHER: Now imagine what URL would you store in case you are storing the URL.   {#1208}
[01:06:35] TEACHER: Will you store S3 URL?   {#1209}
[01:06:37] TEACHER: Will you store CDN URL?   {#1210}
[01:06:38] TEACHER: Because I'm serving their CDN, I'll store CDN URL in S3.   {#1211}
[01:06:42] TEACHER: What if tomorrow you change your CDN provider?   {#1212}
[01:06:44] TEACHER: Real world use case.   {#1213}
[01:06:47] TEACHER: Imagine Instagram.   {#1214}
[01:06:51] TEACHER: most probably Cloudflare as a CDN.   {#1215}
[01:06:54] TEACHER: Most probably they were using Cloudflare as a CDN.   {#1216}
[01:06:57] TEACHER: Facebook came and acquired them,   {#1217}
[01:06:59] TEACHER: but now they cannot use Cloudflare CDN.   {#1218}
[01:07:02] TEACHER: They have to use Facebook CDN.   {#1219}
[01:07:03] TEACHER: Now imagine changing,   {#1220}
[01:07:06] TEACHER: going through your entire database,   {#1221}
[01:07:08] TEACHER: changing your image URL   {#1222}
[01:07:09] TEACHER: at every single post on Instagram.   {#1223}
[01:07:13] TEACHER: Imagine the amount of work that needs to be done.   {#1224}
[01:07:17] TEACHER: Worse, worse thing.   {#1225}
[01:07:20] TEACHER: way to do it. You may say, oh, why should I store serial?   {#1226}
[01:07:24] TEACHER: What if I store S3 URL? What if you change your cloud provider?   {#1227}
[01:07:27] TEACHER: You say, I don't need to change cloud provider.   {#1228}
[01:07:28] TEACHER: Let's say Amazon shoots up their pricing by Forex.   {#1229}
[01:07:31] TEACHER: You can't do much. Microsoft just did that.   {#1230}
[01:07:34] TEACHER: Microsoft changed their billing of Bing APIs, right?   {#1231}
[01:07:38] TEACHER: Because everyone now started using Bing.   {#1232}
[01:07:39] TEACHER: They said, ah, they should make it four to 10x every single API call.   {#1233}
[01:07:44] TEACHER: It's now four to 10x costly. World works on money, my friend.   {#1234}
[01:07:47] TEACHER: So, you always have to ensure the way you are structuring your system, you are not binding   {#1235}
[01:07:53] TEACHER: yourself to something.   {#1236}
[01:07:55] TEACHER: So, what do you do?   {#1237}
[01:07:58] TEACHER: Always anything that is derivable, don't store the derived information.   {#1238}
[01:08:02] TEACHER: For example, in the post table, whatever URL you want to generate, keep that as part of   {#1239}
[01:08:09] TEACHER: business logic.   {#1240}
[01:08:11] TEACHER: But what you store is the crux of the information.   {#1241}
[01:08:13] TEACHER: Again, in the image upload service that we had.   {#1242}
[01:08:17] TEACHER: So let's say we have a flow, something like this.   {#1243}
[01:08:21] TEACHER: You have a prepare upload where you talk to your image upload service.   {#1244}
[01:08:24] TEACHER: It talks to S3, generates a pre-signed URL.   {#1245}
[01:08:27] TEACHER: You make an upload, upload goes through S3.   {#1246}
[01:08:29] TEACHER: Now in this image service, what do you get?   {#1247}
[01:08:32] TEACHER: This image service is where you are getting, which is generating this random ID, this random   {#1248}
[01:08:36] TEACHER: image ID.   {#1249}
[01:08:38] TEACHER: What if you just store the random image ID over here?   {#1250}
[01:08:43] TEACHER: URL, just the random image ID.   {#1251}
[01:08:46] TEACHER: Now what you do is you structure the way you are storing the images on S3 such that you   {#1252}
[01:08:53] TEACHER: can create the path on the fly.   {#1253}
[01:08:55] TEACHER: For example, on GitHub image upload URL that we saw, we saw there was key equal to 47 something   {#1254}
[01:09:02] TEACHER: and then that ID, that random ID.   {#1255}
[01:09:04] TEACHER: What was that 47 something that was my GitHub user ID.   {#1256}
[01:09:08] TEACHER: So what typically happens is you would not just dump all images on the root folder of   {#1257}
[01:09:13] TEACHER: You would have it categorized as part of users.   {#1258}
[01:09:16] TEACHER: For example, instaimages.com slash userid slash random photo ID.   {#1259}
[01:09:21] TEACHER: Something like that.   {#1260}
[01:09:22] TEACHER: So all the photos of a user are contained in one folder.   {#1261}
[01:09:26] TEACHER: Similarly, for each user, you would have folders.   {#1262}
[01:09:28] TEACHER: Honest, right?   {#1263}
[01:09:30] TEACHER: So given this, if I give you this three information,   {#1264}
[01:09:34] TEACHER: like user ID, sorry, this two information, user ID and image ID,   {#1265}
[01:09:37] TEACHER: will you not be able to generate this part?   {#1266}
[01:09:39] TEACHER: You would be able to generate this part.   {#1267}
[01:09:41] TEACHER: So why do you want to store this bulky part again over here?   {#1268}
[01:09:46] TEACHER: Can you not generate it on the fly?   {#1269}
[01:09:47] TEACHER: You can and that's what you should.   {#1270}
[01:09:50] TEACHER: Because now what it gives you flexibility is when you are reading the post,   {#1271}
[01:09:56] TEACHER: you get these parameters and now you can generate any path and return in the response.   {#1272}
[01:10:00] TEACHER: You can generate raw ST path, you can generate CDN path,   {#1273}
[01:10:04] TEACHER: you can change your CDN, you can do AB testing on CDN,   {#1274}
[01:10:06] TEACHER: you can play around with two CDNs.   {#1275}
[01:10:08] TEACHER: For example, it's a very common practice that once every two years,   {#1276}
[01:10:12] TEACHER: your senior management would wake up and say, Oh my God,   {#1277}
[01:10:14] TEACHER: our CDN costs are very high.   {#1278}
[01:10:16] TEACHER: Let's switch the CDN.   {#1279}
[01:10:17] TEACHER: Let's put 20% traffic on other CDN.   {#1280}
[01:10:21] TEACHER: How will you implement putting 20% traffic on CDN?   {#1281}
[01:10:24] TEACHER: Because you have to provide that URL.   {#1282}
[01:10:26] TEACHER: It's not possible.   {#1283}
[01:10:28] TEACHER: That's why anything that is derivable,   {#1284}
[01:10:31] TEACHER: you do not store the derived value.   {#1285}
[01:10:36] TEACHER: So what you do is, and actually that happens.   {#1286}
[01:10:41] TEACHER: You become senior engineer.   {#1287}
[01:10:43] TEACHER: Your senior management will smoke weed one day and come up with this idea.   {#1288}
[01:10:47] TEACHER: Let's switch CD and let's switch cloud provider.   {#1289}
[01:10:49] TEACHER: And you have to work with that.   {#1290}
[01:10:51] TEACHER: So given that, what happens is instaimages.com slash user ID.   {#1291}
[01:10:57] TEACHER: Insta images slash user ID slash standup photo.   {#1292}
[01:11:00] TEACHER: This is S3 URL.   {#1293}
[01:11:01] TEACHER: You anyway cannot serve S3 URL.   {#1294}
[01:11:02] TEACHER: You have to create CDN URL on the fly.   {#1295}
[01:11:04] TEACHER: How will you create CDN URL?   {#1296}
[01:11:06] TEACHER: you don't have this information, you have to extract the URL, do string manipulation   {#1297}
[01:11:09] TEACHER: and then set and then send.   {#1298}
[01:11:11] TEACHER: It's always better, always better to store the cruxed information rather than the actual   {#1299}
[01:11:17] TEACHER: URL.   {#1300}
[01:11:18] TEACHER: Generate the URL on the fly, which means in the API server, when you're reading the post,   {#1301}
[01:11:23] TEACHER: you read the post, you read the row, you get these columns, you create signed URL as part   {#1302}
[01:11:27] TEACHER: of the API handler and send it in the JSON response that you have.   {#1303}
[01:11:30] TEACHER: This way in the handle that you return, you say, you pick a random number between 0 and 0.2.   {#1304}
[01:11:38] TEACHER: Sorry, if your random number lies between 0, 0.2 or 20% of the times you generate, you use CDN A, otherwise you use CDN B.   {#1305}
[01:11:45] TEACHER: This way you actually transfer 20% requests through other CDN and see what their performance is.   {#1306}
[01:11:52] TEACHER: And you can do a lot of fancy stuff there.   {#1307}
[01:11:54] TEACHER: This is how Instagram, when they would have migrated from Cloudflare to Facebook CDN,   {#1308}
[01:12:01] TEACHER: they would have done something similar.   {#1309}
[01:12:03] TEACHER: If they were actually storing the photo URL here, they would have to change literally   {#1310}
[01:12:07] TEACHER: every place and handle how new photos are uploaded because they don't know where it   {#1311}
[01:12:12] TEACHER: would be served from.   {#1312}
[01:12:14] TEACHER: So it's always better to store the crux information over here rather than storing the actual URL.   {#1313}
[01:12:19] TEACHER: This way you have the flexibility.   {#1314}
[01:12:20] TEACHER: You can do whatever you want.   {#1315}
[01:12:23] TEACHER: Let's say you want to delete the image of a user.   {#1316}
[01:12:24] TEACHER: You would use a server to delete the image.   {#1317}
[01:12:26] TEACHER: If you would not have stored this and you would have stored image URL.   {#1318}
[01:12:29] TEACHER: You don't know S3 path.   {#1319}
[01:12:31] TEACHER: How will you delete something from S3 where you don't know the path?   {#1320}
[01:12:34] TEACHER: I have the URL and trim off the CDN part and do this and that.   {#1321}
[01:12:39] TEACHER: Worst way to build a system.   {#1322}
[01:12:41] TEACHER: Store the correct information.   {#1323}
[01:12:42] TEACHER: You can easily using user ID and image ID generate this path   {#1324}
[01:12:45] TEACHER: and make an API call to S3 and delete the image once and for all.   {#1325}
[01:12:49] TEACHER: Very simple.   {#1326}
[01:12:50] TEACHER: So again, rehydrating this.   {#1327}
[01:12:53] TEACHER: Whenever something is derivable, don't store the derived value.   {#1328}
[01:12:56] TEACHER: I should put it in my t-shirt.   {#1329}
[01:12:58] TEACHER: Always remember.   {#1330}
[01:12:59] TEACHER: Always, always, always.   {#1331}
[01:13:01] TEACHER: Because it gives you the necessary flexibility that you want   {#1332}
[01:13:04] TEACHER: to just switch the CDN whenever you want   {#1333}
[01:13:07] TEACHER: or directly pinpoint to S3 and whatnot.   {#1334}
[01:13:10] TEACHER: It just makes your life so, so, so, so simple.   {#1335}
[01:13:13] TEACHER: Right?   {#1336}
[01:13:14] TEACHER: Okay.   {#1337}
[01:13:15] TEACHER: This is what I wanted to bring up.   {#1338}
[01:13:16] TEACHER: This is a really important point.   {#1339}
[01:13:20] TEACHER: This tells us this adds up another interesting thing, a post service.   {#1340}
[01:13:24] TEACHER: Post service is where your API call to create a post, submit a post, read a post, that part   {#1341}
[01:13:29] TEACHER: would come over here.   {#1342}
[01:13:31] TEACHER: But this is where your flow now looks something like this.   {#1343}
[01:13:35] TEACHER: You have your user, user wants to upload an image, talks to image service, it prepares   {#1344}
[01:13:40] TEACHER: for upload by creating a signed URL on S3.   {#1345}
[01:13:43] TEACHER: We get a signed URL, user uploads it to S3.   {#1346}
[01:13:46] TEACHER: Once that upload is complete, it makes an API call to post service   {#1347}
[01:13:50] TEACHER: and post service creates an entry into this database.   {#1348}
---- OWNED SEGMENTS END ----

CTX| [01:13:54] TEACHER: So separating out image and post is really important.   {#1349}
CTX| [01:14:00] TEACHER: And the way they are connected is through this image ID in the post.   {#1350}
CTX| [01:14:05] TEACHER: This way you get very nice separation of concerns between images and post.   {#1351}
CTX| [01:14:11] TEACHER: You don't have to merge them.   {#1352}
CTX| [01:14:13] TEACHER: Although Instagram is all about images.   {#1353}
CTX| [01:14:16] TEACHER: Today itself, Instagram is not just about images.   {#1354}
CTX| [01:14:19] TEACHER: It's about videos, shots and reels and stories and this and that.   {#1355}
CTX| [01:14:24] TEACHER: You don't want to mix them up, separating them out.   {#1356}
CTX| [01:14:28] TEACHER: Images, different.   {#1357}
CTX| [01:14:30] TEACHER: So now imagine you have like image upload service.   {#1358}
CTX| [01:14:32] TEACHER: You may have a video upload service.   {#1359}
CTX| [01:14:33] TEACHER: You may have a shots upload service.   {#1360}
CTX| [01:14:35] TEACHER: What are they called reels upload service, right?   {#1361}
CTX| [01:14:37] TEACHER: But then your concept of post remains the same.   {#1362}
CTX| [01:14:40] TEACHER: You don't have to change it.   {#1363}
CTX| [01:14:43] TEACHER: That's the beauty of having separation of concerns.   {#1364}
CTX| [01:14:46] TEACHER: This is what I want all of you to think about this implementation details.   {#1365}
CTX| [01:14:51] TEACHER: Dubba dubba boxes boxes.   {#1366}
CTX| [01:14:53] TEACHER: As I always say, my two year old daughter can draw these boxes, but what happens?   {#1367}
