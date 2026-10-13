# chunk_11  OWNS 01:56:24 -> 02:09:26  (segments #2029-#2222, 2067 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:55:27] TEACHER: they need to have a very strict SLA and they need to adhere to that because   {#2010}
CTX| [01:55:31] TEACHER: you have a synchronous dependency on that.   {#2011}
CTX| [01:55:33] TEACHER: And now you also need to create a fallback plan.   {#2012}
CTX| [01:55:36] TEACHER: What if that API does not respond in time?   {#2013}
CTX| [01:55:38] TEACHER: What would you do?   {#2014}
CTX| [01:55:38] TEACHER: Will you not allow user to tag or will you allow user to manually tag?   {#2015}
CTX| [01:55:43] TEACHER: It's still a protocol.   {#2016}
CTX| [01:55:44] TEACHER: call, it sounds straightforward, but it's still a product call because it might be   {#2017}
CTX| [01:55:48] TEACHER: possible in some cases that you don't even allow people to tag unless it's coming   {#2018}
CTX| [01:55:52] TEACHER: from your MLT for some reason, for some reason you want to do that.   {#2019}
CTX| [01:55:56] TEACHER: But it's important to think on those slides.   {#2020}
CTX| [01:55:58] TEACHER: Okay.   {#2021}
CTX| [01:55:59] TEACHER: One more point before I cover one other aspect of it.   {#2022}
CTX| [01:56:02] TEACHER: Alok sir, go on.   {#2023}
CTX| [01:56:04] TEACHER: What's that one feature you want, like what things that you'd want to consider?   {#2024}
CTX| [01:56:08] STUDENT_5: One question, should we update the user's activity page or where the user   {#2025}
CTX| [01:56:13] STUDENT_5: can see what happened?   {#2026}
CTX| [01:56:16] TEACHER: Profile service activity.   {#2027}
CTX| [01:56:18] TEACHER: Now, how would this affect your system?   {#2028}

---- OWNED SEGMENTS START ----
[01:56:24] TEACHER: If I say yes to this, what does this end?   {#2029}
[01:56:28] STUDENT_5: We would be maintaining this information somewhere that what happened, what happens   {#2030}
[01:56:33] STUDENT_5: to user profile.   {#2031}
[01:56:34] STUDENT_5: So we have to actually start pushing this information.   {#2032}
[01:56:36] STUDENT_5: They're also asynchronously.   {#2033}
[01:56:37] TEACHER: Correct.   {#2034}
[01:56:38] TEACHER: That's fine.   {#2035}
[01:56:42] STUDENT_5: and also who can see this activity but then that is probably the users itself will be   {#2036}
[01:56:49] TEACHER: will be seeing that activity that's fine but now i'll just add to that what does this affect   {#2037}
[01:56:55] TEACHER: this affects one very interesting part that this the way you are storing this information   {#2038}
[01:57:01] TEACHER: that in this photo these people attack they need to be indexed somehow you need to store   {#2039}
[01:57:06] TEACHER: this information in a database where you can now you should be able to query that.   {#2040}
[01:57:11] TEACHER: Now you cannot just have just things stored in an array, which is unindexable.   {#2041}
[01:57:17] TEACHER: You have to store it in a database like the tagging in this photo.   {#2042}
[01:57:21] TEACHER: These people are tagged in a way that you should be able to query that who all or rather   {#2043}
[01:57:27] TEACHER: in which photos is this particular user tagged, which means the database that we pick.   {#2044}
[01:57:34] TEACHER: has to support that query.   {#2045}
[01:57:36] TEACHER: You just cannot pick any random database here.   {#2046}
[01:57:40] TEACHER: You need to be very particular about the database   {#2047}
[01:57:42] TEACHER: that supports this kind of queries very efficiently.   {#2048}
[01:57:46] TEACHER: Very seemingly simple problem statement.   {#2049}
[01:57:49] TEACHER: But this is what happens typically in startups and mid-scale companies   {#2050}
[01:57:53] TEACHER: where senior management has not thought it through.   {#2051}
[01:57:56] TEACHER: But when we start brainstorming on it,   {#2052}
[01:57:58] TEACHER: when we start diving deep,   {#2053}
[01:57:59] TEACHER: we realize that it affects so many things.   {#2054}
[01:58:03] TEACHER: interface with so many other systems.   {#2055}
[01:58:06] TEACHER: Some honorable mentions are feed.   {#2056}
[01:58:10] TEACHER: For example, do you want to send or to like, let's say someone tagged Arpit in a photo.   {#2057}
[01:58:18] TEACHER: Do you want Arpit's follower to get that event right in their feed?   {#2058}
[01:58:24] TEACHER: If yes, then product call feed team needs to gear up for that scale because every time   {#2059}
[01:58:30] TEACHER: someone tags, you push it into a feed.   {#2060}
[01:58:33] TEACHER: to happen on feed that you don't show this kind of post every time. Only two few users you show   {#2061}
[01:58:38] TEACHER: and whatnot. And those kinds of things would come up. Now on a bit of mathematical details of it,   {#2062}
[01:58:46] TEACHER: what I want to bring out is this point that in most cases, when people are tagging in photo,   {#2063}
[01:58:54] TEACHER: there are two ways to tag it. First is you just say, Hey, I just do X and Y. But if you look   {#2064}
[01:59:03] TEACHER: X and Y of the sort of, of the coordinate where you are tagging it, but rather what   {#2065}
[01:59:09] TEACHER: if you do X and Y, let's say your image is 720 by 720 pixel.   {#2066}
[01:59:15] TEACHER: And let's say user tagged at this particular location.   {#2067}
[01:59:18] TEACHER: Let's say this is 320, 320 comma 120.   {#2068}
[01:59:21] TEACHER: Right.   {#2069}
[01:59:22] TEACHER: Now, when you do this, you cannot store 320 comma 120 in the database.   {#2070}
[01:59:26] TEACHER: Why?   {#2071}
[01:59:27] TEACHER: Because image resizing.   {#2072}
[01:59:30] TEACHER: What if on a low end device, the image is 360 cost 360.   {#2073}
[01:59:35] TEACHER: And then if you tag at this location, X, Y, 320,   {#2074}
[01:59:39] TEACHER: it would come somewhere over here, which is incorrect.   {#2075}
[01:59:43] TEACHER: Right?   {#2076}
[01:59:44] TEACHER: So that is where whenever you are tagging a bit of granular detail is that you have to   {#2077}
[01:59:49] TEACHER: tag the relative positioning of it rather than the absolute one.   {#2078}
[01:59:53] TEACHER: And it's a relative positioning.   {#2079}
[01:59:54] TEACHER: It means that you store instead of storing 320, 120, you store 320 divided by   {#2080}
[02:00:00] TEACHER: 720 and 120 divided by 720.   {#2081}
[02:00:03] TEACHER: This way it's relative, which means no matter how this image is resized, so long as the   {#2082}
[02:00:09] TEACHER: aspect ratio is maintained, your tag position will be perfect.   {#2083}
[02:00:13] TEACHER: No matter how small the device is, no matter how large the device is.   {#2084}
[02:00:17] TEACHER: So storing relative positioning is a very important implementation decision over here.   {#2085}
[02:00:23] TEACHER: Okay.   {#2086}
[02:00:23] TEACHER: Apart from that, what you stored is instead of just storing this one point, because in   {#2087}
[02:00:30] TEACHER: So you are not just literally your mouse is not hovered on exactly this point for it to   {#2088}
[02:00:34] TEACHER: show who is tagged over here.   {#2089}
[02:00:35] TEACHER: It's typically a bounding box, which means that instead of just storing X, Y relative   {#2090}
[02:00:44] TEACHER: position of it, you store the X, Y of this point and this point or X, Y of this and width   {#2091}
[02:00:51] TEACHER: and height.   {#2092}
[02:00:51] TEACHER: So these are called bounding box that you would store.   {#2093}
[02:00:54] TEACHER: So you would store either left top, right bottom or X, Y width, height.   {#2094}
[02:01:00] TEACHER: LTRB is left top and right bottom coordinates of these two points, the relative coordinates.   {#2095}
[02:01:05] TEACHER: One way to store it.   {#2096}
[02:01:07] TEACHER: Second way to store it is to store the coordinate of this and relative width and relative height   {#2097}
[02:01:12] TEACHER: over here.   {#2098}
[02:01:13] TEACHER: Either way, whatever your front end is more comfortable.   {#2099}
[02:01:16] TEACHER: But these are really important when you are storing this information, because this way   {#2100}
[02:01:21] TEACHER: you would be able to properly place your mapping.   {#2101}
[02:01:25] TEACHER: And when mouse is forward, you show it.   {#2102}
[02:01:26] TEACHER: even when your screen is like shrinking or growing   {#2103}
[02:01:29] TEACHER: and you resize and whatnot.   {#2104}
[02:01:31] TEACHER: Right?   {#2105}
[02:01:32] TEACHER: Okay.   {#2106}
[02:01:33] TEACHER: And just using things that you're interfacing with,   {#2107}
[02:01:36] TEACHER: search, page detection, location, notification,   {#2108}
[02:01:39] TEACHER: role-based access control, RBAC,   {#2109}
[02:01:40] TEACHER: role-based access control,   {#2110}
[02:01:41] TEACHER: the authorization that we spoke about.   {#2111}
[02:01:43] TEACHER: And anything that you're interfacing with,   {#2112}
[02:01:45] TEACHER: you will put it in Kafka no matter what.   {#2113}
[02:01:48] TEACHER: So search, notification, analytics, profile, feed,   {#2114}
[02:01:50] TEACHER: activity and whatnot.   {#2115}
[02:01:51] TEACHER: Right?   {#2116}
[02:01:52] TEACHER: So some things that senior management typically   {#2117}
[02:01:55] TEACHER: has not thought about,   {#2118}
[02:01:56] TEACHER: We have to think on that behalf and figure those details out because devil lies in the details.   {#2119}
[02:02:03] TEACHER: Always remember. Right? Okay. So this is just a quick brainstorming that I wanted to do   {#2120}
[02:02:07] TEACHER: around this system because it tells you that a very simple statement allowing people to tag   {#2121}
[02:02:14] TEACHER: in photos leads to so many interesting things out there. And you can extend it in many ways.   {#2122}
[02:02:20] TEACHER: And it is not that engineer cannot propose product ideas. Engineers can. It's just that   {#2123}
[02:02:26] TEACHER: about it because we don't have product experience but we can still pitch in ideas and make them and   {#2124}
[02:02:32] TEACHER: ask them the critical questions which they typically would not have thought of very possible   {#2125}
[02:02:36] TEACHER: so whenever you're working with product team whenever you're working on something that is   {#2126}
[02:02:40] TEACHER: user interfacing think as an end user put them put yourself into their shoes and think and propose   {#2127}
[02:02:46] TEACHER: that's how you create a cross-team influence and a positive impact in the organization leading you   {#2128}
[02:02:52] TEACHER: to have a good career.   {#2129}
[02:02:54] TEACHER: Right.   {#2130}
[02:02:55] TEACHER: Okay.   {#2131}
[02:02:56] TEACHER: Now the final system for today is with design, newly unread indicator.   {#2132}
[02:03:01] TEACHER: Listen to the problem statement really well.   {#2133}
[02:03:03] TEACHER: Right.   {#2134}
[02:03:04] TEACHER: So the problem statement is that you see this day in and day out on LinkedIn,   {#2135}
[02:03:12] TEACHER: Twitter, Facebook, every, even Instagram, every social platform out there.   {#2136}
[02:03:16] TEACHER: So it is possible that you are offline.   {#2137}
[02:03:23] TEACHER: You receive a message and when you log in the next time, you see the counter of it.   {#2138}
[02:03:30] TEACHER: I think I can show you a demo.   {#2139}
[02:03:32] TEACHER: Let me quickly check if I received any messages on LinkedIn or Twitter.   {#2140}
[02:03:37] TEACHER: If yes, I will show it to you.   {#2141}
[02:03:41] TEACHER: No message on LinkedIn and no message on Twitter.   {#2142}
[02:03:46] TEACHER: Okay.   {#2143}
[02:03:46] TEACHER: On Instagram.   {#2144}
[02:03:48] TEACHER: Do I have a message?   {#2145}
[02:03:49] TEACHER: Oh yeah, I have messages.   {#2146}
[02:03:52] TEACHER: I'll show you Devo.   {#2147}
[02:03:53] TEACHER: It would clear out the requirements.   {#2148}
[02:03:56] TEACHER: Because it's something that we see every day.   {#2149}
[02:03:58] TEACHER: But we typically take it for granted.   {#2150}
[02:04:02] TEACHER: Okay.   {#2151}
[02:04:03] TEACHER: So the statement is that this message is three.   {#2152}
[02:04:08] TEACHER: I don't know when I last checked it.   {#2153}
[02:04:10] TEACHER: But these three messages that you see.   {#2154}
[02:04:12] TEACHER: These are three messages.   {#2155}
[02:04:13] TEACHER: These are not three unread messages.   {#2156}
[02:04:15] TEACHER: These are three newly unread messages.   {#2157}
[02:04:18] TEACHER: Because it is possible that now when I click on this.   {#2158}
[02:04:22] TEACHER: the count becomes zero.   {#2159}
[02:04:24] TEACHER: It does not mean that I have read the messages.   {#2160}
[02:04:27] TEACHER: You can still see unread messages over here.   {#2161}
[02:04:30] TEACHER: Right.   {#2162}
[02:04:31] TEACHER: It does not mean that I have read the messages.   {#2163}
[02:04:33] TEACHER: It just means that I am acknowledging that I have messages.   {#2164}
[02:04:38] TEACHER: This is not behaving the way I wanted to, but you get the idea.   {#2165}
[02:04:40] TEACHER: This count should reduce to zero.   {#2166}
[02:04:43] TEACHER: Right.   {#2167}
[02:04:43] TEACHER: So what we are doing is if I would have received any message over here,   {#2168}
[02:04:47] TEACHER: I can just click on it.   {#2169}
[02:04:49] TEACHER: Flying taxi.   {#2170}
[02:04:51] TEACHER: Okay.   {#2171}
[02:04:52] TEACHER: I have one message, but when I click on it, that count disappears,   {#2172}
[02:04:57] TEACHER: but you could still see that there are a lot of messages which are unread.   {#2173}
[02:05:03] TEACHER: Unread messages are there, but this does not mean that here I would say 99 or 10,000 or 50,000.   {#2174}
[02:05:09] TEACHER: What I'm actually looking at over here is I have so many hundred messages,   {#2175}
[02:05:14] TEACHER: but count there was zero because these are not acknowledged by me.   {#2176}
[02:05:19] TEACHER: It's just that the presence of it is gone.   {#2177}
[02:05:22] TEACHER: So this is newly unread.   {#2178}
[02:05:24] TEACHER: So you can choose not to read the message,   {#2179}
[02:05:28] TEACHER: but it indicates that there are new unread messages.   {#2180}
[02:05:33] TEACHER: This is what we have built.   {#2181}
[02:05:35] TEACHER: So let me clear out.   {#2182}
[02:05:38] TEACHER: Now the problem statement is a bit more clear.   {#2183}
[02:05:40] TEACHER: Let me walk you through the requirements   {#2184}
[02:05:42] TEACHER: and then we brainstorm.   {#2185}
[02:05:43] TEACHER: There is a very interesting high level pattern   {#2186}
[02:05:46] TEACHER: that I want to introduce through the system.   {#2187}
[02:05:49] TEACHER: Let me share.   {#2188}
[02:05:56] TEACHER: Okay.   {#2189}
[02:05:58] TEACHER: So the statement is very simple that we need to inform the user about presence of new messages.   {#2190}
[02:06:05] TEACHER: Terminology, like the words that are used very carefully, presence of new messages, not unread, not unacknowledged.   {#2191}
[02:06:11] TEACHER: So on the message icon, when you see this three, this implies that you have three newly unread messages.   {#2192}
[02:06:19] TEACHER: It does not mean you have three total unread messages.   {#2193}
[02:06:22] TEACHER: So you click on this and this country goes to zero.   {#2194}
[02:06:25] TEACHER: It does not matter if you read the messages or not.   {#2195}
[02:06:28] TEACHER: This is what we are building.   {#2196}
[02:06:30] TEACHER: Now I'm just twisting it, twisting the problem statement and I just add a pseudo constraint   {#2197}
[02:06:36] TEACHER: where this three does not indicate that you have three newly unread messages, but it indicates   {#2198}
[02:06:42] TEACHER: that you have messages from three unique people.   {#2199}
[02:06:48] TEACHER: right so if i say three over here it means i might have gotten 300 messages   {#2200}
[02:06:53] TEACHER: but from three unique people so i'll show three only right so this is what a requirement is right   {#2201}
[02:07:00] TEACHER: and when someone clicks on the messages this icon irrespective the user read all those messages or   {#2202}
[02:07:06] TEACHER: not the count would disappear that's what we have to do right okay requirements near real-time   {#2203}
[02:07:12] TEACHER: update message when received newly new and reads equal to demover of unique people from which you   {#2204}
[02:07:17] TEACHER: received the messages valuable how would you approach this problem let's brainstorm   {#2205}
[02:07:25] STUDENT_3: yeah something go on so first and foremost when we say newly right i think uh i would like to say   {#2206}
[02:07:31] TEACHER: newly means less than 24 hours that is last time when i clicked on the message icon since then okay   {#2207}
[02:07:39] STUDENT_3: okay so then what we need to do is uh okay first first and foremost the messages that we are   {#2208}
[02:07:47] STUDENT_3: getting right we need to have an indication whether they are read or not that is the first   {#2209}
[02:07:52] STUDENT_3: first indication just to know how many messages i have read and how many messages have not been read   {#2210}
[02:07:59] STUDENT_3: and then there should be a way in which i can also know when was my last read time when i last   {#2211}
[02:08:07] STUDENT_3: that the message icon so these are the two indicators and the third indicator is once I   {#2212}
[02:08:13] STUDENT_3: have that there should be a kind of a filtering mechanism based on the last thread time so that   {#2213}
[02:08:19] STUDENT_3: I can get the number of unique users that have messaged me and using that I can populate that   {#2214}
[02:08:26] STUDENT_3: count on that on that icon these are the three aspects that I would focus on so the first thing   {#2215}
[02:08:33] STUDENT_3: would be uh so first i want to start with a data model like the message data model that is received   {#2216}
[02:08:39] STUDENT_3: from the message itself and the time stamp because time stamp is very critical here   {#2217}
[02:08:49] TEACHER: received uh sorry you have your message yeah you have from which user yeah and you can also put   {#2218}
[02:08:59] TEACHER: two users that could yeah that's that that's that two users also let's put so from and to yeah   {#2219}
[02:09:08] STUDENT_3: and a time step and then there should be another data model which would be like   {#2220}
[02:09:13] STUDENT_3: last red time so that is very important for me because i need the count   {#2221}
[02:09:19] STUDENT_3: last red time   {#2222}
---- OWNED SEGMENTS END ----

CTX| [02:09:26] STUDENT_3: now yeah so now whenever uh so i'm so i you want me to talk about how the messages would be read   {#2223}
CTX| [02:09:33] STUDENT_3: and all that stuff or that is already everything everything so what so obviously because this is a   {#2224}
CTX| [02:09:38] STUDENT_3: messaging thing right so there will be a messaging queue and this user will be subscribed to that queue   {#2225}
CTX| [02:09:43] STUDENT_3: and based on the number of uh and the partitioning would be on the from user that would okay let's   {#2226}
CTX| [02:09:50] TEACHER: Let's go step back.   {#2227}
CTX| [02:09:51] TEACHER: What is the input to the system?   {#2228}
CTX| [02:09:54] TEACHER: Are you storing all the messages that your user received in this table?   {#2229}
CTX| [02:10:01] TEACHER: Am I in this messages table?   {#2230}
CTX| [02:10:04] TEACHER: Are you storing all the messages that a user ever received?   {#2231}
CTX| [02:10:10] STUDENT_3: I can store.   {#2232}
CTX| [02:10:11] STUDENT_3: There's no harm in storing, but I think that would not be a scalable solution.   {#2233}
CTX| [02:10:16] TEACHER: Because then what are you storing in this?   {#2234}
CTX| [02:10:17] TEACHER: What is this messages table?   {#2235}
CTX| [02:10:24] STUDENT_3: Okay.   {#2236}
CTX| [02:10:24] STUDENT_3: So I was just thinking one snippet of a message, like, you know, one message, one, like, hi,   {#2237}
