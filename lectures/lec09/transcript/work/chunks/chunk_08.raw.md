# chunk_08  OWNS 01:25:56 -> 01:36:44  (segments #1561-#1739, 1856 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:24:57] TEACHER: But every CDN has something like this.   {#1535}
CTX| [01:24:59] TEACHER: So pick your favorite CDN and go through that.   {#1536}
CTX| [01:25:01] TEACHER: OH is the hash is what I got to know.   {#1537}
CTX| [01:25:04] TEACHER: And then this is the certificate.   {#1538}
CTX| [01:25:06] TEACHER: This one.   {#1539}
CTX| [01:25:07] TEACHER: Sorry.   {#1540}
CTX| [01:25:08] TEACHER: This is a cache key.   {#1541}
CTX| [01:25:09] TEACHER: IG cache key.   {#1542}
CTX| [01:25:10] TEACHER: Instagram cache key.   {#1543}
CTX| [01:25:12] TEACHER: And some EDN, some certificate, something, something, something.   {#1544}
CTX| [01:25:14] TEACHER: But if I don't pass a bunch of these keys, right?   {#1545}
CTX| [01:25:17] TEACHER: It gives me error.   {#1546}
CTX| [01:25:19] TEACHER: Bad URL timestamp.   {#1547}
CTX| [01:25:21] TEACHER: So it requires all of this.   {#1548}
CTX| [01:25:23] TEACHER: So now what is happening?   {#1549}
CTX| [01:25:25] TEACHER: It was from the end where OE was the expiry, object expiry.   {#1550}
CTX| [01:25:31] TEACHER: Most probably that's my guess, but I did not pass that.   {#1551}
CTX| [01:25:35] TEACHER: So it threw me bad URL timestamp.   {#1552}
CTX| [01:25:37] TEACHER: So it was expecting something.   {#1553}
CTX| [01:25:38] TEACHER: Now this response is generated from where?   {#1554}
CTX| [01:25:41] TEACHER: CDN.   {#1555}
CTX| [01:25:42] TEACHER: CDN was expecting that query parameter to be passed, which I did not.   {#1556}
CTX| [01:25:47] TEACHER: And which is why it failed.   {#1557}
CTX| [01:25:48] TEACHER: But if I would have passed that same thing, my image would have loaded.   {#1558}
CTX| [01:25:53] TEACHER: Right.   {#1559}
CTX| [01:25:53] TEACHER: So now what is happening?   {#1560}

---- OWNED SEGMENTS START ----
[01:25:56] TEACHER: privacy thing is implemented. The way this privacy feature is implemented is what if I do not send   {#1561}
[01:26:02] TEACHER: you in the API response. So when someone is accessing my profile, this profile, whoever is   {#1562}
[01:26:09] TEACHER: accessing this profile, having access to this profile, going through the photos, they need the   {#1563}
[01:26:14] TEACHER: JSON response in which the URL needs to be there. The URL that we are sending is the FBCDN URL,   {#1564}
[01:26:20] TEACHER: URL, the entire URL.   {#1565}
[01:26:21] TEACHER: Now, because this URL needs to be there for that to render for a user in the API response.   {#1566}
[01:26:29] TEACHER: If let's say, if let's say someone among you open my Insta profile, when you open my Insta   {#1567}
[01:26:35] TEACHER: profile, you see you because you're following me, you see the photos that I posted.   {#1568}
[01:26:41] TEACHER: Why are you able to see the photos?   {#1569}
[01:26:43] TEACHER: Because in the JSON response, I send you the 15, 20 photos that I posted.   {#1570}
[01:26:47] TEACHER: right but when the account is private i won't even send you the response but who has this   {#1571}
[01:26:52] TEACHER: information your api server has this information right because cdn does not have access to your   {#1572}
[01:26:58] TEACHER: database it will never happen so you rely on the fact that because you are not sending him the other   {#1573}
[01:27:06] TEACHER: user your list of photos they would not be able to render and you would see the account is private   {#1574}
[01:27:11] TEACHER: but if someone having the access to this photo url can simply share this photo url with the   {#1575}
[01:27:17] TEACHER: friends and they should be able to see the private profile of that particular user.   {#1576}
[01:27:21] TEACHER: Up until the key expires, up until then everything is accessible.   {#1577}
[01:27:26] TEACHER: And so this is how companies implement privacy.   {#1578}
[01:27:29] TEACHER: This is pseudo privacy.   {#1579}
[01:27:31] TEACHER: They are just making it difficult for people to barge in.   {#1580}
[01:27:36] TEACHER: They are not making a hundred percent private.   {#1581}
[01:27:38] TEACHER: In order to make things a hundred percent private, they have to go to the API server   {#1582}
[01:27:44] TEACHER: to read the images and not via CDN.   {#1583}
[01:27:47] TEACHER: Because only your API server knows   {#1584}
[01:27:50] TEACHER: who has access to read what   {#1585}
[01:27:53] TEACHER: because it's part of your database.   {#1586}
[01:27:55] TEACHER: CDN does not have access to your database.   {#1587}
[01:27:57] TEACHER: So in case you want to implement   {#1588}
[01:27:59] TEACHER: a truly private platform,   {#1589}
[01:28:02] TEACHER: a truly private platform,   {#1590}
[01:28:03] TEACHER: then you cannot use CDN.   {#1591}
[01:28:07] TEACHER: You have to let all of the requests,   {#1592}
[01:28:09] TEACHER: image upload, image download,   {#1593}
[01:28:11] TEACHER: everything should happen through your API server   {#1594}
[01:28:14] TEACHER: Every single request you check if this user has access to read this particular.   {#1595}
[01:28:22] TEACHER: That's how you implement a truly private, private, private platform.   {#1596}
[01:28:26] TEACHER: Otherwise it's all pseudo privacy, but because Instagram has to do it at scale,   {#1597}
[01:28:30] TEACHER: they have no other option.   {#1598}
[01:28:31] TEACHER: If they would have gotten through API server for every request,   {#1599}
[01:28:35] TEACHER: how everything would be gone.   {#1600}
[01:28:37] TEACHER: It would be so costly for them to do it.   {#1601}
[01:28:40] TEACHER: They would need at least 50 X to 100 X more servers.   {#1602}
[01:28:42] TEACHER: They are already running a fleet of more than 100,000 servers.   {#1603}
[01:28:48] TEACHER: That's what I've last heard.   {#1604}
[01:28:49] TEACHER: I'm not really sure.   {#1605}
[01:28:50] TEACHER: They keep on changing it, but assume it's 100 servers.   {#1606}
[01:28:53] TEACHER: If it reaches 100 today, then tomorrow it would be 500 servers at least because image   {#1607}
[01:28:59] TEACHER: transfer, this amount of huge data transfer happening between would require a large number   {#1608}
[01:29:02] TEACHER: of machines to handle it.   {#1609}
[01:29:05] TEACHER: But this is how companies implement privacy.   {#1610}
[01:29:10] TEACHER: It's no magic.   {#1611}
[01:29:13] TEACHER: It's just making it difficult for you to explore.   {#1612}
[01:29:17] TEACHER: So if one of your friends scraps the photos and shares it with someone else, your privacy   {#1613}
[01:29:24] TEACHER: is gone.   {#1614}
[01:29:25] TEACHER: Right?   {#1615}
[01:29:26] TEACHER: Okay.   {#1616}
[01:29:26] TEACHER: So let me formally cover it.   {#1617}
[01:29:28] TEACHER: I'll take your question.   {#1618}
[01:29:29] TEACHER: I'll take your question.   {#1619}
[01:29:30] TEACHER: Okay.   {#1620}
[01:29:31] TEACHER: So let's spend some time talking about privacy.   {#1621}
[01:29:34] TEACHER: We saw the demo, but just want to ensure that how that actually happens and how you can   {#1622}
[01:29:39] TEACHER: implement it.   {#1623}
[01:29:40] TEACHER: So this is where concept of signatures comes in, the timed signatures.   {#1624}
[01:29:45] TEACHER: Now, how they're implemented in case you are unaware about JWT, read about JWT.   {#1625}
[01:29:50] TEACHER: If you are aware, it's exactly same as JWT.   {#1626}
[01:29:53] TEACHER: So you have an expiration baked into the metadata of the URL and you have a   {#1627}
[01:29:59] TEACHER: certificate attached to ensure that no one has changed it.   {#1628}
[01:30:02] TEACHER: And then you validate the certificate, check the expiration time.   {#1629}
[01:30:06] TEACHER: So CDN all it does is whatever the keys are passed, this OE, OH, something, something,   {#1630}
[01:30:12] TEACHER: these keys, it uses these keys to see what's the expiry.   {#1631}
[01:30:16] TEACHER: Let's say that is five minutes.   {#1632}
[01:30:18] TEACHER: When the request comes beyond five minutes, then people would not be able to access it.   {#1633}
[01:30:22] TEACHER: So CDN would not return it.   {#1634}
[01:30:23] TEACHER: So CDN is a hundred percent stateless.   {#1635}
[01:30:25] TEACHER: There is no state maintenance CDN.   {#1636}
[01:30:27] TEACHER: All it works on these sort of query parameters.   {#1637}
[01:30:29] TEACHER: Now, depending on which CDN you use, they have their own set of query parameters,   {#1638}
[01:30:33] TEACHER: which they support.   {#1639}
[01:30:34] TEACHER: Right.   {#1640}
[01:30:36] TEACHER: Then your URL is rendered through the image stack.   {#1641}
[01:30:39] TEACHER: The request goes to CDN, CDN extracts these query parameters from it.   {#1642}
[01:30:43] TEACHER: It checks the validity of the certificate, sees if the URL is not expired.   {#1643}
[01:30:47] TEACHER: If not, it returns the image.   {#1644}
[01:30:49] TEACHER: Otherwise it returns bad URL.   {#1645}
[01:30:51] TEACHER: This is what your CDN does to kind of ensure privacy.   {#1646}
[01:30:57] TEACHER: But then what matters is you in the API service, in the post call, the slash post for a particular   {#1647}
[01:31:06] TEACHER: even return the response if user is not following this way you prevent that from happening but the   {#1648}
[01:31:12] TEACHER: idea still remains the same that if someone has access to your photo ur they can see it because   {#1649}
[01:31:17] TEACHER: nothing on the internet is private right okay so this is how privacy is implemented so we've talked   {#1650}
[01:31:23] TEACHER: about storage data flow separation of concerns privacy now let's talk about extensibility this   {#1651}
[01:31:28] TEACHER: is what i'll like skim through extensibility because we'll touch upon it in very depth   {#1652}
[01:31:34] TEACHER: So extensibility, very common practice, Kafka.   {#1653}
[01:31:38] TEACHER: Kafka is our friend.   {#1654}
[01:31:39] TEACHER: Kafka is the glue that stitches almost all social networks together.   {#1655}
[01:31:43] TEACHER: So the idea is whenever the post is published,   {#1656}
[01:31:46] TEACHER: you have to let other service know about it.   {#1657}
[01:31:50] TEACHER: That search, analytics, notification, feed and whatnot.   {#1658}
[01:31:55] TEACHER: So that is all done through Kafka.   {#1659}
[01:31:57] TEACHER: So whenever the post is published, we push a message onto Kafka,   {#1660}
[01:32:00] TEACHER: consumed by multiple services.   {#1661}
[01:32:02] TEACHER: and they do and each one does their job pretty well.   {#1662}
[01:32:06] TEACHER: And this is where your Kafka comes into the picture.   {#1663}
[01:32:09] TEACHER: Kafka solves that problem for you   {#1664}
[01:32:11] TEACHER: because now every service can iterate   {#1665}
[01:32:13] TEACHER: at their own speed pace from this Kafka   {#1666}
[01:32:16] TEACHER: and start doing their things.   {#1667}
[01:32:18] TEACHER: This is how you think about extensibility.   {#1668}
[01:32:20] TEACHER: Social media is all about extensibility   {#1669}
[01:32:22] TEACHER: and Kafka becomes that one central backbone   {#1670}
[01:32:24] TEACHER: that connects everything together.   {#1671}
[01:32:27] TEACHER: So that's about extensibility.   {#1672}
[01:32:30] TEACHER: We'll touch upon that in much more detail,   {#1673}
[01:32:32] TEACHER: like throughout this course, like Kafka will go very deep.   {#1674}
[01:32:36] TEACHER: And then the final part, optimization.   {#1675}
[01:32:41] TEACHER: Now this is where I will talk about optimization just a minute.   {#1676}
[01:32:48] TEACHER: Here it is.   {#1677}
[01:32:50] TEACHER: Okay.   {#1678}
[01:32:50] TEACHER: So here, when it comes to optimization, what I want to talk about is optimization.   {#1679}
[01:32:57] TEACHER: It's not about building service on your own.   {#1680}
[01:33:00] TEACHER: As simple as that.   {#1681}
[01:33:02] TEACHER: When people think about it, I'll do image optimization.   {#1682}
[01:33:05] TEACHER: I'll build a service that has image optimization.   {#1683}
[01:33:07] TEACHER: No, that's not how real world works.   {#1684}
[01:33:10] TEACHER: We'll build image optimization service tomorrow.   {#1685}
[01:33:12] TEACHER: But today let's focus on what CDN gives you out of the box.   {#1686}
[01:33:17] TEACHER: So almost every single CDN out there,   {#1687}
[01:33:20] TEACHER: because it's most common use case is to serve images and videos and whatnot.   {#1688}
[01:33:25] TEACHER: not it gives you options to do image optimizations on the CDN itself.   {#1689}
[01:33:32] TEACHER: It does not have to like you don't have to build that service on your own.   {#1690}
[01:33:36] TEACHER: So today we'll take a very real example of how CDN does that image optimization.   {#1691}
[01:33:40] TEACHER: Tomorrow we'll build our own image optimization service but building real world systems implies   {#1692}
[01:33:45] TEACHER: reusing things that already exist rather than reinventing the wheel every time.   {#1693}
[01:33:49] TEACHER: So what we talk about is first why we need image optimization typical thing.   {#1694}
[01:33:55] TEACHER: That not all users have high speed bandwidth.   {#1695}
[01:33:58] TEACHER: Imagine Sachin Tendulkar uploading photo 50 MB big.   {#1696}
[01:34:01] TEACHER: And one poor guy in tier 3 CT on geo internet accessing it.   {#1697}
[01:34:06] TEACHER: Entire day's data is gone and just scrolling through 10 photos of Sachin.   {#1698}
[01:34:09] TEACHER: Right?   {#1699}
[01:34:10] TEACHER: You don't want that to happen.   {#1700}
[01:34:11] TEACHER: So what do you do?   {#1701}
[01:34:13] TEACHER: You ensure that you compress the image.   {#1702}
[01:34:15] TEACHER: You optimize it for the resolution of the devices and whatnot.   {#1703}
[01:34:17] TEACHER: So you prepare it on various devices or for various resolutions.   {#1704}
[01:34:21] TEACHER: That is one way to do it.   {#1705}
[01:34:22] TEACHER: But today I want to talk about how we can leverage CDN to do this.   {#1706}
[01:34:26] TEACHER: Similar to how CDN gave you ways to make things private by passing this keys,   {#1707}
[01:34:32] TEACHER: CDN accepts bunch of query parameters around image processing.   {#1708}
[01:34:38] TEACHER: One of them is a W parameter or width.   {#1709}
[01:34:41] TEACHER: Depending on the CDN, it is W or width or OW, something like that.   {#1710}
[01:34:45] TEACHER: But this width is what the pixel width of your resultant photo should be.   {#1711}
[01:34:52] TEACHER: So what it does is let's say it uploaded 10,000 x 10,000 pixels photo.   {#1712}
[01:34:58] TEACHER: Hey, your user device is just 360 pixel big.   {#1713}
[01:35:02] TEACHER: Why would you send 10,000 x 10,000 on your device which is 360p?   {#1714}
[01:35:07] TEACHER: You would not, right?   {#1715}
[01:35:08] TEACHER: So what you do is while you pass this URL on the front end,   {#1716}
[01:35:14] TEACHER: because front end knows the dimensions of the screen,   {#1717}
[01:35:17] TEACHER: your front end appends in the image URL that it got from the back end,   {#1718}
[01:35:22] TEACHER: The frontend appends this new query parameter called w equal to 360.   {#1719}
[01:35:27] TEACHER: Whatever is the size you want to render and it puts it into IMG tag.   {#1720}
[01:35:32] TEACHER: It's done by the frontend.   {#1721}
[01:35:33] TEACHER: Frontend is smart now.   {#1722}
[01:35:35] TEACHER: So what frontend does it frontend knows the width frontend appends this on the URL on   {#1723}
[01:35:40] TEACHER: in the URL before adding it to where in the dog, in the IMG tag, in the image view, because   {#1724}
[01:35:48] TEACHER: when this is passed this request will go where cdn and this request goes to cdn says hey do i have   {#1725}
[01:35:56] TEACHER: this path let's say it does not have this path it says then do i have this path so first it would   {#1726}
[01:36:02] TEACHER: check do i have already processed image no do i have this path let's say no so it would first go   {#1727}
[01:36:07] TEACHER: to this go to origin read the image actual original image comes to cdn now cdn would see and apply oh   {#1728}
[01:36:14] TEACHER: this user requested me to do a w equal to 360.   {#1729}
[01:36:17] TEACHER: So it would do the image processing on the CDN server and cache it.   {#1730}
[01:36:21] TEACHER: So it would convert the image to 360p pixel image   {#1731}
[01:36:24] TEACHER: and it would cache it on the CDN and it would serve it to the user.   {#1732}
[01:36:28] TEACHER: Next time the same request comes in,   {#1733}
[01:36:30] TEACHER: this thing, it would just bluntly check if this path exists,   {#1734}
[01:36:33] TEACHER: if it exists good enough,   {#1735}
[01:36:34] TEACHER: which means already processed image exists.   {#1736}
[01:36:36] TEACHER: If not, it would see this image exists.   {#1737}
[01:36:38] TEACHER: If not, it would fetch the image, put it back,   {#1738}
[01:36:41] TEACHER: process it through this and serve it back.   {#1739}
---- OWNED SEGMENTS END ----

CTX| [01:36:44] TEACHER: you can leverage CDN to do image processing as well.   {#1740}
CTX| [01:36:48] TEACHER: Now you can do a lot more with this.   {#1741}
CTX| [01:36:50] TEACHER: Image resizing, image coloring, grayscaling,   {#1742}
CTX| [01:36:54] TEACHER: transpose, rotation.   {#1743}
CTX| [01:36:56] TEACHER: Some services also provide recognitions as all.   {#1744}
CTX| [01:37:00] TEACHER: Far too many things.   {#1745}
CTX| [01:37:01] TEACHER: Pick your favorite CDN,   {#1746}
CTX| [01:37:02] TEACHER: see the kind of image processing capabilities   {#1747}
CTX| [01:37:04] TEACHER: that it provides.   {#1748}
CTX| [01:37:05] TEACHER: So you don't really, in today's day in it,   {#1749}
CTX| [01:37:08] TEACHER: you don't really have to build your own image   {#1750}
CTX| [01:37:11] TEACHER: uploading service or image optimization service.   {#1751}
CTX| [01:37:14] TEACHER: gives you those tools out of the box.   {#1752}
CTX| [01:37:16] TEACHER: You just pay that bit of money.   {#1753}
CTX| [01:37:18] TEACHER: Problem solved.   {#1754}
CTX| [01:37:19] TEACHER: Right.   {#1755}
CTX| [01:37:19] TEACHER: This is how you build real systems.   {#1756}
CTX| [01:37:21] TEACHER: Drawing boxes.   {#1757}
CTX| [01:37:22] TEACHER: Again, as I say, is the easiest thing to do.   {#1758}
CTX| [01:37:25] TEACHER: Build things how they're supposed to be.   {#1759}
CTX| [01:37:28] TEACHER: How real world builds them.   {#1760}
CTX| [01:37:29] TEACHER: Not just theoretical jargon.   {#1761}
CTX| [01:37:31] TEACHER: Right.   {#1762}
CTX| [01:37:32] TEACHER: Okay.   {#1763}
CTX| [01:37:33] TEACHER: Okay.   {#1764}
CTX| [01:37:33] TEACHER: And this is what I wanted to cover.   {#1765}
CTX| [01:37:35] TEACHER: Everything about image upload service that I feel is important.   {#1766}
CTX| [01:37:38] TEACHER: How we and what we covered.   {#1767}
CTX| [01:37:40] TEACHER: We covered quite a few things in detail.   {#1768}
CTX| [01:37:42] TEACHER: We first talked about just to summarize.   {#1769}
