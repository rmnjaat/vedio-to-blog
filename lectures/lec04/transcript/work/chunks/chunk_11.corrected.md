**[01:59:17] Teacher?:** *(admin)* Let me check on the mic in this.

**[01:59:24] Teacher:** Got it. Okay. So the first option that we had was date time was very readable. Looking at this, you can exactly tell what date, what time, what, what, what the date. I was looking at this number. You cannot tell what that was. Right? Readability, but it gives you performance. It is very lightweight on index. It's just integer comparison. So reading this, you are just reading an integer and comparing it. Most efficient operation for your database, for your disk, for everything, for your computer in general. Reading this, you have to create a complex object having multiple attributes and then you do comparison. So this is extremely lightweight, extremely optimal, all things good, but it takes away readability, right?

[02:00:04] But a lot of people choose to store date time as epoch integers in integer columns, right? Because you get a lot of benefits out of it. Now there is a third way where what if you relax some constraints, you need readability, but then you also need performance. So this is very specific to a company. So what happened in 2016? In 2016, Redbus is where people do bus booking. They were having a table which stored date time as date time. And this date time was becoming the performance bottleneck because it had to do massive date time comparisons and it was slowing things down to the core. So what they did is they wanted to move. So first of all, they were like, hey, can they move to an epoch integer? If they moved to an epoch integer, they lost readability. Readability because the way they were using it in their [?IDEs | asr: "IDs"], in their SQL [?IDEs | asr: "IDs"], in their UI, they were like literally rendering it as is. So now they were very used to in debugging it that way. Right. To lose out on readability when they use native [?IDEs | asr: "ids"] to look at text.

[02:01:11] So they wanted readability and this. So what they knew is they did not want time level granularity. All they wanted was date level granularity. So they were not using time type. They were just using date. So what they did is they stored date time as integer return in this format. So YYYYMMDD as an integer, not as a string, as an integer. So 20220402. So they relax the constraint. They said, hey, we don't need time. What we need is we need date. So we would store it in a format, which is custom format, very heavily optimized for their use case. So they get readability because you can looking at this, you can tell it 2nd of April. They get benefit because they get performance because it is integer. Integer comparison, integer index, lightning fast. Right.

[02:02:07] So be open to alter some things. There is no hard rule that you have to use date time as data. There is no hard rule that you only have to use the [?epoch integers | asr: "app of integers"]. Be creative with your solution. And that's where the next level of optimizations come. So these are three ways through which I would want to put forth how date times are stored. So date time has its own advantages and disadvantages. Date time has an epoch integer on advantages, disadvantages, and date time as a custom format, as an integer like this has its own, and you can change it to however you want. I just give an example of Redbus, which I definitely know because one of my friends did that. So an example of that, right? So being open to changes, being wary of the fact that do you need readability? Do you need performance? Do you need convenience? What do you want? Right. Depending on which you pick the corresponding type. Right. Okay.

<!-- topic-candidate [02:03:00]: Questions on storing date time (custom format, time zones) -->

[02:03:00] Any questions on this database?

**[02:03:08] Student?:** Yeah.

**[02:03:15] Teacher:** *(admin)* You're not audible. Let me check if it is me or you. Hello. Yeah.

> **Student Question [02:03:20] - Student 3:** Sorry. Yeah. So I didn't really understand what is the benefit you explained in the custom format. So if they wanted, because what I think is, this is really inflexible. If for whatever use case, they'll need timestamp in future, they'll have to do.

**[02:03:35] Teacher (answer):** They knew they did not. Right. They knew they did not. [check: possible ASR duplicate]

**[02:03:39] Student 3:** They could have, they could have also stored as an epoch. What you mentioned in the second step, right? But it's not readable.

**[02:03:45] Teacher:** They wanted readability.

**[02:03:46] Student 3:** I mean, this is a, this is a simple parsing function in the app side, like client side.

**[02:03:52] Teacher:** They did not want to. It's their decision, their company.

**[02:03:56] Student 3:** Want to do it, okay, but I mean, there is no performance improvement is what I'm saying.

**[02:04:00] Teacher?:** And then integer, integer, right? You get the same benefit. Correct? Yeah, that's what I'm saying, there's [check: segment may mix Teacher and Student 3 - "that's what I'm saying" sounds like Student 3]

**[02:04:07] Student 3:** No performance improvement. It's just what, from here to here there is. Yes, there is not. Yeah, correct.

**[02:04:15] Teacher:** Correct, that's all. Yeah, yeah. And it's their company, their use case, and I've seen a bunch of places where people have used custom format, I cannot reveal it because it's proprietary information, where you don't want to do either this or this, but go with something like this.

**[02:04:30] Student?:** Got it. Yeah.

**[02:04:35] Student 8:** Hi, I think with the first format, you also capture the time zone information, which is a little bit lost in second and third one. So I think that needs to be taken care while designing what scheme you want to use.

**[02:04:51] Teacher:** You get something, you lose something. But in any case, if you store it in Unix time zone, you store it in Unix format, depending on where the time is rendered, you can pick the local device system and render it in that. So if it's only for the viewing purpose, you can very easily do it. So in that case the, that

**[02:05:13] Student 8:** Same long value for that epoch time zone that represents different time in different time zones, right? So in that case you need to be especially careful, like that you take everything in UTC. Yes, yes, yes. Like I've burned my hands with this, so that's why. Yeah, everyone, everyone has been [check: crosstalk - "yes, yes, yes" / "everyone has been" may be the Teacher]

**[02:05:37] Teacher:** Through this. But see, you need something, you, you go for it, right? It's not that, it's not that this is better than the both, right? It's always that this has its own trade-off, this has their own [?trade-offs | asr: "redops"], this as they don't.

**[02:05:47] Student 8:** Yeah.

**[02:05:49] Teacher:** So, got it.

> **Student Question [02:05:52] - Student?:** Hi, so in the example that you just mentioned, why Redbus, Redbus didn't use date time as [?an epoch integer | asr: "a pocket teacher"]. Was it only for development purposes?

**[02:06:00] Teacher (answer):** No, no, no, it was production for a use case and I cannot reveal the use case. It was for a use case. They wanted it to be date. It was more of analytics use case, not for transactional systems, but date time was creating the havoc. It was becoming the bottleneck. They went with custom.

**[02:06:16] Student?:** Got it. Thanks.

<!-- topic-candidate [02:06:19]: Question on soft delete and tree rebalancing -->

**[02:06:19] Teacher:** Surya?

> **Student Question [02:06:20] - Student 5 (Surya):** Yeah, I have a doubt on the previous slide on the soft delete part, right? Like where you mentioned soft delete reasons are this. And one of the positives that you said, like, easy on the database engine, but eventually when you consider soft delete, right? Sometimes you never do hard delete. In that case, it perfectly makes sense in the tree balancing and stuff. Example of Google Drive where eventually you will do the hard delete.

**[02:06:51] Teacher:** Yeah.

**[02:06:53] Student 5 (Surya):** So in that case, like, that rebalancing is not really a benefit, right? Eventually after 30 days, you are doing the hard and a database has to do the rebalancing anyway. So it's beneficial only if you are in that soft delete state forever.

**[02:07:08] Teacher (answer):** No, no, no. I'll give you another example. So when you are, let's say you are doing hard deletes every time. Now what would happen is every time you do hard delete, you would have to rebalance. There's a very high chance that worst case, every delete requires you to do rebalancing. But imagine you have accumulated a bunch of soft deletes and you're deleting all of them in one shot. So [?database | asr: "DataWare"] has to do rebalancing once versus many times. So what you are saving on is you are clubbing all the tree rebalancing into one, doing hard deletes across all, so that your database rebalancing happens just once or rather few, or, basically fewer times than not. Okay. That is the advantage that you have.

**[02:07:54] Student 5 (Surya):** That, that still means that, let's say it, we take the example of Google Drive. So that means you can do the batch of all the hard deletes over a day, but you cannot even club multiple days. Okay. Yeah.

**[02:08:07] Teacher:** So basically doing staggered deletion and in a batch way, rather than doing a time. So if you do pointed deletion, you might have the worst cases, you would have to do rebalancing every time. That's the worst case, right? But when you are batching all of those and doing hard deleting one shot, and let's say basically delete 100 rows at a time and then committing it, so for 100 rows one rebalance, right? So you are slashing the number of rebalances by a factor of 100 by batching it in the size of 100. That's the advantage of it, right? Okay, I'll take one more question before we move to caching. Sandeep, go on.

<!-- topic-candidate [~02:08:39]: Question on epoch integer range (max out, MySQL date time storage) -->

> **Student Question [~02:08:39] - Student 4 (Sandeep):** Yeah, so that's my question is regarding the date format that you mentioned other slides. So here you mentioned that the serialized format and then in the form of a string and then you talked about epoch, right? But don't you, epoch, that number is increasing so exponentially, very soon you're going to max out on int, then you have to go to double, that will be like 64 bit. So I was thinking the epoch is the worst time format, the second worst serialized, and the third, it's not worst, but, but still on the worst, it's very limited, it's very limiting, third. Yeah, so yeah, that's, that was, I was thinking, but then when you're describing you said that, you know, epoch integers are always better. So I was just wondering.

**[~02:09:24] Teacher (answer):** No, no, but still your point is very true. Like, for example, it, right now it is four bytes. As soon as we hit 2032 is when we would limit, where we would basically max out, right? We would max out the range of integer. Right. Yes. So, for what integer. So now what do we do? So from [?four bytes | asr: "four by two"], we move to eight, but then it suddenly doubles the space required to store date type. Right. Yeah. So which is where a lot of databases have thought it, to go through MySQL documentation on how they store date type. So what they do. So one thing, if we start the date time from first January, 1970, what if I want to represent a 31st December, 1969 minus one with, if I do it with an epoch integer, I would have to represent it with minus one. Correct. So then that's wrong. That's wrong on so many levels. Right.

[02:10:15] So in that, but if you store it this way, you are, you are gaining something or losing something, but if you'd want to store date time as date time, what if you have another way, which helps you, which allows you to cover the entire spectrum of datetime, not limited by the size of integer, it would take a little extra space. Let's say eight bytes, not eight bytes, but rather six bytes, but it can store it in a very compressed way. So what I would recommend is go through MySQL's datetime documentation
