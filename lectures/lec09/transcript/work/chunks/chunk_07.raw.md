# chunk_07  OWNS 01:13:54 -> 01:25:56  (segments #1349-#1560, 2001 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:12:56] TEACHER: I should put it in my t-shirt.   {#1329}
CTX| [01:12:58] TEACHER: Always remember.   {#1330}
CTX| [01:12:59] TEACHER: Always, always, always.   {#1331}
CTX| [01:13:01] TEACHER: Because it gives you the necessary flexibility that you want   {#1332}
CTX| [01:13:04] TEACHER: to just switch the CDN whenever you want   {#1333}
CTX| [01:13:07] TEACHER: or directly pinpoint to S3 and whatnot.   {#1334}
CTX| [01:13:10] TEACHER: It just makes your life so, so, so, so simple.   {#1335}
CTX| [01:13:13] TEACHER: Right?   {#1336}
CTX| [01:13:14] TEACHER: Okay.   {#1337}
CTX| [01:13:15] TEACHER: This is what I wanted to bring up.   {#1338}
CTX| [01:13:16] TEACHER: This is a really important point.   {#1339}
CTX| [01:13:20] TEACHER: This tells us this adds up another interesting thing, a post service.   {#1340}
CTX| [01:13:24] TEACHER: Post service is where your API call to create a post, submit a post, read a post, that part   {#1341}
CTX| [01:13:29] TEACHER: would come over here.   {#1342}
CTX| [01:13:31] TEACHER: But this is where your flow now looks something like this.   {#1343}
CTX| [01:13:35] TEACHER: You have your user, user wants to upload an image, talks to image service, it prepares   {#1344}
CTX| [01:13:40] TEACHER: for upload by creating a signed URL on S3.   {#1345}
CTX| [01:13:43] TEACHER: We get a signed URL, user uploads it to S3.   {#1346}
CTX| [01:13:46] TEACHER: Once that upload is complete, it makes an API call to post service   {#1347}
CTX| [01:13:50] TEACHER: and post service creates an entry into this database.   {#1348}

---- OWNED SEGMENTS START ----
[01:13:54] TEACHER: So separating out image and post is really important.   {#1349}
[01:14:00] TEACHER: And the way they are connected is through this image ID in the post.   {#1350}
[01:14:05] TEACHER: This way you get very nice separation of concerns between images and post.   {#1351}
[01:14:11] TEACHER: You don't have to merge them.   {#1352}
[01:14:13] TEACHER: Although Instagram is all about images.   {#1353}
[01:14:16] TEACHER: Today itself, Instagram is not just about images.   {#1354}
[01:14:19] TEACHER: It's about videos, shots and reels and stories and this and that.   {#1355}
[01:14:24] TEACHER: You don't want to mix them up, separating them out.   {#1356}
[01:14:28] TEACHER: Images, different.   {#1357}
[01:14:30] TEACHER: So now imagine you have like image upload service.   {#1358}
[01:14:32] TEACHER: You may have a video upload service.   {#1359}
[01:14:33] TEACHER: You may have a shots upload service.   {#1360}
[01:14:35] TEACHER: What are they called reels upload service, right?   {#1361}
[01:14:37] TEACHER: But then your concept of post remains the same.   {#1362}
[01:14:40] TEACHER: You don't have to change it.   {#1363}
[01:14:43] TEACHER: That's the beauty of having separation of concerns.   {#1364}
[01:14:46] TEACHER: This is what I want all of you to think about this implementation details.   {#1365}
[01:14:51] TEACHER: Dubba dubba boxes boxes.   {#1366}
[01:14:53] TEACHER: As I always say, my two year old daughter can draw these boxes, but what happens?   {#1367}
[01:14:58] TEACHER: This nitty gritties, these are important, right?   {#1368}
[01:15:01] TEACHER: Okay.   {#1369}
[01:15:02] TEACHER: So this is what happened up until now.   {#1370}
[01:15:04] TEACHER: Now, how will this image be served?   {#1371}
[01:15:06] TEACHER: Through CDN.   {#1372}
[01:15:07] TEACHER: CDN transparently sits between your user and your S3.   {#1373}
[01:15:10] TEACHER: AWS keys uploaded on the CDN for it to read from S3 if it is private.   {#1374}
[01:15:16] TEACHER: And when your API server is generating the path,   {#1375}
[01:15:18] TEACHER: now coming to that question from the first discussion that,   {#1376}
[01:15:21] TEACHER: hey, how would this get my CDN URL?   {#1377}
[01:15:23] TEACHER: Look carefully.   {#1378}
[01:15:24] TEACHER: Someone's not on my PC.   {#1379}
[01:15:27] TEACHER: How will my user get the CDN URL?   {#1380}
[01:15:30] TEACHER: Through this, user makes a call.   {#1381}
[01:15:32] TEACHER: I have it written.   {#1382}
[01:15:34] TEACHER: Something like this.   {#1383}
[01:15:34] TEACHER: The overflow.   {#1384}
[01:15:35] TEACHER: The overflow would be user A uploads photo using image upload service.   {#1385}
[01:15:41] TEACHER: User A posts the photo creates an entry into the post table.   {#1386}
[01:15:46] TEACHER: Now user B visits A's profile.   {#1387}
[01:15:50] TEACHER: A has uploaded a photo.   {#1388}
[01:15:52] TEACHER: B is now visiting A's profile.   {#1389}
[01:15:54] TEACHER: B would make a APAC or look, look something like this slash user slash A slash post that   {#1390}
[01:15:58] TEACHER: they give me all the posts of a user.   {#1391}
[01:16:00] TEACHER: Right?   {#1392}
[01:16:00] TEACHER: When user B makes this call, request comes to your post service.   {#1393}
[01:16:06] TEACHER: It goes to filters out all the posts for A, selects are from post where user ID equal to A.   {#1394}
[01:16:12] TEACHER: It generates this response.   {#1395}
[01:16:14] TEACHER: Now in this response, user ID caption is there, but instead of image ID, it generates, it returns this URL.   {#1396}
[01:16:20] TEACHER: This URL is what would be rendered on the front end, which would be derived from this path.   {#1397}
[01:16:30] TEACHER: This thing.   {#1398}
[01:16:32] TEACHER: So given the CDN experiment that they are running, what it can do is it can create   {#1399}
[01:16:36] TEACHER: this path in the business logic that you are written.   {#1400}
[01:16:39] TEACHER: It's not storing the URL, but it would create this path.   {#1401}
[01:16:41] TEACHER: Insta CDN.net slash a slash one, two, three, four, five, whatever this ID is,   {#1402}
[01:16:45] TEACHER: it would create and create this path and send it on the front end.   {#1403}
[01:16:48] TEACHER: It is dynamically generated by back.   {#1404}
[01:16:50] TEACHER: And that's really important.   {#1405}
[01:16:51] TEACHER: You are not storing the actual image URL over here.   {#1406}
[01:16:54] TEACHER: And then this, whatever this response it got in the dome,   {#1407}
[01:16:59] TEACHER: what we are doing is we are rendering it in IMG tag or image in case of Android   {#1408}
[01:17:03] TEACHER: and whatever is an iOS, right?   {#1409}
[01:17:04] TEACHER: It puts them in IMG tag and it renders because it's an IMG tag.   {#1410}
[01:17:09] TEACHER: Then what would happen once you put the URL in the IMG tag,   {#1411}
[01:17:12] TEACHER: it would just make a get request on that URL.   {#1412}
[01:17:14] TEACHER: This URL would be the CDN URL that you are generating on the fly or   {#1413}
[01:17:18] TEACHER: generating on the fly just by concatenating the string,   {#1414}
[01:17:21] TEACHER: because you have the fixed CDN prefix.   {#1415}
[01:17:24] TEACHER: You have user ID, you have random image ID, .png, you concatenate them and you send it in the response.   {#1416}
[01:17:29] TEACHER: The request, this is what we generated.   {#1417}
[01:17:32] TEACHER: When we make this load in IMG tag, where would this go?   {#1418}
[01:17:35] TEACHER: It would go to instacdn.net, which is this CDN.   {#1419}
[01:17:39] TEACHER: It would have the data, it would send it back in case it does not have the data, it would go to S3, read the data, cache it and send it back to the user.   {#1420}
[01:17:45] TEACHER: So this is how we would read A's profile.   {#1421}
[01:17:47] TEACHER: We would get the URL to render because our backend, sorry, because our backend generated instacdn.net URL,   {#1422}
[01:17:54] TEACHER: Insta CDN over here tomorrow.   {#1423}
[01:17:56] TEACHER: I may add another CDN.   {#1424}
[01:17:58] TEACHER: Let's say cloudflare and I am my backend can now generate cloudflare.cdn.net   {#1425}
[01:18:05] TEACHER: slash a slash abc.png something like that.   {#1426}
[01:18:09] TEACHER: Now, if someone makes a request, it goes over here and it goes over here.   {#1427}
[01:18:13] TEACHER: So now you can balance between the two CDN seamlessly.   {#1428}
[01:18:17] TEACHER: Right.   {#1429}
[01:18:18] TEACHER: This is why you never store the derived value.   {#1430}
[01:18:22] TEACHER: You can do a lot of experiments.   {#1431}
[01:18:26] TEACHER: So this is how your image upload flow post the separation of concerns that we talked   {#1432}
[01:18:32] TEACHER: about would work.   {#1433}
[01:18:34] TEACHER: Okay.   {#1434}
[01:18:34] TEACHER: Now what next?   {#1435}
[01:18:35] TEACHER: We covered storage, we covered data flow, we covered separation of concerns.   {#1436}
[01:18:39] TEACHER: Right.   {#1437}
[01:18:39] TEACHER: Now, elephant in the room, privacy, Insta and most social platforms.   {#1438}
[01:18:46] TEACHER: Okay.   {#1439}
[01:18:47] TEACHER: This was also the question that was brought away.   {#1440}
[01:18:50] TEACHER: What about the private data that you are storing on S3 and all?   {#1441}
[01:18:54] TEACHER: When something is out on the internet, it is out on the internet.   {#1442}
[01:18:58] TEACHER: There is nothing called privacy.   {#1443}
[01:19:01] TEACHER: Literally nothing.   {#1444}
[01:19:02] TEACHER: You think your Insta posts are private?   {#1445}
[01:19:04] TEACHER: No, they are not.   {#1446}
[01:19:05] TEACHER: I can access that.   {#1447}
[01:19:06] TEACHER: FYI.   {#1448}
[01:19:07] TEACHER: It's just that I need short term access for it as a basic hacker.   {#1449}
[01:19:10] TEACHER: And hacker is a strong one anyway.   {#1450}
[01:19:12] TEACHER: So what happens is you can very clearly see that   {#1451}
[01:19:20] TEACHER: But your photo, any photo, even if your Insta account is private, let's say B is visiting   {#1452}
[01:19:27] TEACHER: A's profile, A's account is private, but B follows A or A is allowed B to read the photos,   {#1453}
[01:19:33] TEACHER: how whatever the flow is.   {#1454}
[01:19:34] TEACHER: I don't use Insta, so I don't know much about it.   {#1455}
[01:19:36] TEACHER: So whatever that flow is, user B is now allowed to see the photos of A. Now what would happen?   {#1456}
[01:19:43] TEACHER: The photos will be any way we saw via CDN.   {#1457}
[01:19:46] TEACHER: If you don't serve it via CDN and let you direct your service, then your cost would shoot really high.   {#1458}
[01:19:52] TEACHER: So you don't want to do that.   {#1459}
[01:19:54] TEACHER: You would always serve via CDN to give the best experience for the user, which means your photo is cached on the CDN.   {#1460}
[01:20:01] TEACHER: So if your photo is on the CDN, anyone having the URL should be able to access the photo.   {#1461}
[01:20:08] TEACHER: And that's what happens.   {#1462}
[01:20:09] TEACHER: So, because your photos are cached on the CDN for some time, your photos are accessible   {#1463}
[01:20:17] TEACHER: to anyone having the URL of that particular photo.   {#1464}
[01:20:24] TEACHER: Once the TTL expires, once the certificate expires, then your photo becomes invalidated.   {#1465}
[01:20:29] TEACHER: Then no one can access it.   {#1466}
[01:20:30] TEACHER: But up until the certificate is valid, anyone having the URL can access the photo.   {#1467}
[01:20:37] TEACHER: So for example, if your profile is private, you post a photo, one of your followers did   {#1468}
[01:20:43] TEACHER: an inspect element, copy it to URL and send it to other friend who does not follow you   {#1469}
[01:20:48] TEACHER: that other friend will have access to your photo FYI.   {#1470}
[01:20:51] TEACHER: So beware to whom you send to whom you grant taxes.   {#1471}
[01:20:54] TEACHER: Okay.   {#1472}
[01:20:55] TEACHER: Okay.   {#1473}
[01:20:56] TEACHER: Not heretical jargon.   {#1474}
[01:20:57] TEACHER: I'll show you it like actual demo on Instagram.   {#1475}
[01:21:00] TEACHER: And this is how it actually works.   {#1476}
[01:21:02] TEACHER: So your best friend through this session, you would have already known that your best   {#1477}
[01:21:07] TEACHER: is uh chrome dev tools or whatever i use firepower but dev tools oh i have some notifications   {#1478}
[01:21:14] TEACHER: as well someone's watching it okay so what we'll do is we don't want this uh i'm not sure if my   {#1479}
[01:21:23] TEACHER: profile is private can someone just confirm my profile is private i'm not sure i think i made   {#1480}
[01:21:27] TEACHER: it public some time back uh let me check so what i'll uh actually someone can please confirm if my   {#1481}
[01:21:37] TEACHER: or not it's rpd underscore behind me meanwhile i'll just copy the you are i'll do the inspect element   {#1482}
[01:21:45] TEACHER: i open this first photo uh three and a half years uh so i open this photo   {#1483}
[01:22:05] STUDENT_10: inspect   {#1484}
[01:22:08] TEACHER: oh yeah it's private it's private right thanks thanks for confirming   {#1485}
[01:22:12] TEACHER: okay so now if i do this it's a tag where did it go div   {#1486}
[01:22:19] TEACHER: yeah this is the one okay now see this is the so sir if my profile is private you are not able to   {#1487}
[01:22:26] TEACHER: see this photo which means even on private uh incognito window i should not be able to open   {#1488}
[01:22:32] TEACHER: this but if i copy this url and i paste it over here tada privacy is a myth my friend   {#1489}
[01:22:41] TEACHER: So what they do?   {#1490}
[01:22:42] STUDENT_1: Yeah, Azure window is not visible.   {#1491}
[01:22:46] TEACHER: Oh, sorry.   {#1492}
[01:22:47] TEACHER: My bad, my bad, my bad, my bad.   {#1493}
[01:22:48] TEACHER: I should always share my full screen.   {#1494}
[01:22:51] TEACHER: Okay.   {#1495}
[01:22:51] TEACHER: I just opened that same URL.   {#1496}
[01:22:53] TEACHER: I'll just do it.   {#1497}
[01:22:53] TEACHER: I wanted to tagal.   {#1498}
[01:22:55] TEACHER: I copied that URL and I now will paste it in the incognito window.   {#1499}
[01:23:03] TEACHER: I have image open.   {#1500}
[01:23:06] TEACHER: There is nothing called privacy over here.   {#1501}
[01:23:08] TEACHER: Right?   {#1502}
[01:23:08] TEACHER: Because your photo is on CDN, anyone having that CDN URL,   {#1503}
[01:23:14] TEACHER: this image URL will be able to access it.   {#1504}
[01:23:17] TEACHER: As simple as that.   {#1505}
[01:23:19] TEACHER: As simple as that.   {#1506}
[01:23:21] TEACHER: Now, let's see how it actually works.   {#1507}
[01:23:24] TEACHER: Then what is this privacy all about?   {#1508}
[01:23:26] TEACHER: What is this private?   {#1509}
[01:23:27] TEACHER: How do these companies implement private photos?   {#1510}
[01:23:30] TEACHER: So first, let's talk about how it works and how companies implement.   {#1511}
[01:23:36] TEACHER: will take you through that entire flow.   {#1512}
[01:23:39] TEACHER: So if you look carefully at this URL, this thing,   {#1513}
[01:23:43] TEACHER: here you see this is your CDN name, FBCDN.net.   {#1514}
[01:23:49] TEACHER: They were using Cloudflare, they migrated to FBCDN.   {#1515}
[01:23:51] TEACHER: Obviously, if the company gets acquired, they have to do it.   {#1516}
[01:23:54] TEACHER: Then there is some path.   {#1517}
[01:23:55] TEACHER: This is the CDN path.   {#1518}
[01:23:56] TEACHER: This is the image name, the random ID and whatnot,   {#1519}
[01:23:59] TEACHER: the combination of it.   {#1520}
[01:24:01] TEACHER: Then you see a bunch of query parameters.   {#1521}
[01:24:03] TEACHER: This query parameters is what makes the photos private.   {#1522}
[01:24:09] TEACHER: So what happens is, CDN does not have any authentication.   {#1523}
[01:24:15] TEACHER: CDN is 100% stateless because for example, CDN does not know you are user B, that is   {#1524}
[01:24:24] TEACHER: user A, you follow user A, that's why you're allowed to see that.   {#1525}
[01:24:27] TEACHER: CDN has no idea about it.   {#1526}
[01:24:29] TEACHER: So what it relies on, it relies on certificates, basically time bounded certificates, which   {#1527}
[01:24:36] TEACHER: you create, you create a certificate out of it to ensure that no one has changed this time   {#1528}
[01:24:41] TEACHER: and you just have an expiration time in that.   {#1529}
[01:24:44] TEACHER: So that's how CDN authentication works.   {#1530}
[01:24:46] TEACHER: CDN does not have any authentication of its own.   {#1531}
[01:24:48] TEACHER: So now what happens here is that these parameters, OE, this is most probably the expiry.   {#1532}
[01:24:54] TEACHER: I don't know what this internal parameters are.   {#1533}
[01:24:55] TEACHER: It's very specific to Facebook CDN.   {#1534}
[01:24:57] TEACHER: But every CDN has something like this.   {#1535}
[01:24:59] TEACHER: So pick your favorite CDN and go through that.   {#1536}
[01:25:01] TEACHER: OH is the hash is what I got to know.   {#1537}
[01:25:04] TEACHER: And then this is the certificate.   {#1538}
[01:25:06] TEACHER: This one.   {#1539}
[01:25:07] TEACHER: Sorry.   {#1540}
[01:25:08] TEACHER: This is a cache key.   {#1541}
[01:25:09] TEACHER: IG cache key.   {#1542}
[01:25:10] TEACHER: Instagram cache key.   {#1543}
[01:25:12] TEACHER: And some EDN, some certificate, something, something, something.   {#1544}
[01:25:14] TEACHER: But if I don't pass a bunch of these keys, right?   {#1545}
[01:25:17] TEACHER: It gives me error.   {#1546}
[01:25:19] TEACHER: Bad URL timestamp.   {#1547}
[01:25:21] TEACHER: So it requires all of this.   {#1548}
[01:25:23] TEACHER: So now what is happening?   {#1549}
[01:25:25] TEACHER: It was from the end where OE was the expiry, object expiry.   {#1550}
[01:25:31] TEACHER: Most probably that's my guess, but I did not pass that.   {#1551}
[01:25:35] TEACHER: So it threw me bad URL timestamp.   {#1552}
[01:25:37] TEACHER: So it was expecting something.   {#1553}
[01:25:38] TEACHER: Now this response is generated from where?   {#1554}
[01:25:41] TEACHER: CDN.   {#1555}
[01:25:42] TEACHER: CDN was expecting that query parameter to be passed, which I did not.   {#1556}
[01:25:47] TEACHER: And which is why it failed.   {#1557}
[01:25:48] TEACHER: But if I would have passed that same thing, my image would have loaded.   {#1558}
[01:25:53] TEACHER: Right.   {#1559}
[01:25:53] TEACHER: So now what is happening?   {#1560}
---- OWNED SEGMENTS END ----

CTX| [01:25:56] TEACHER: privacy thing is implemented. The way this privacy feature is implemented is what if I do not send   {#1561}
CTX| [01:26:02] TEACHER: you in the API response. So when someone is accessing my profile, this profile, whoever is   {#1562}
CTX| [01:26:09] TEACHER: accessing this profile, having access to this profile, going through the photos, they need the   {#1563}
CTX| [01:26:14] TEACHER: JSON response in which the URL needs to be there. The URL that we are sending is the FBCDN URL,   {#1564}
CTX| [01:26:20] TEACHER: URL, the entire URL.   {#1565}
CTX| [01:26:21] TEACHER: Now, because this URL needs to be there for that to render for a user in the API response.   {#1566}
CTX| [01:26:29] TEACHER: If let's say, if let's say someone among you open my Insta profile, when you open my Insta   {#1567}
CTX| [01:26:35] TEACHER: profile, you see you because you're following me, you see the photos that I posted.   {#1568}
CTX| [01:26:41] TEACHER: Why are you able to see the photos?   {#1569}
CTX| [01:26:43] TEACHER: Because in the JSON response, I send you the 15, 20 photos that I posted.   {#1570}
CTX| [01:26:47] TEACHER: right but when the account is private i won't even send you the response but who has this   {#1571}
CTX| [01:26:52] TEACHER: information your api server has this information right because cdn does not have access to your   {#1572}
