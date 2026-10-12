# chunk_04  OWNS 00:33:50 -> 00:46:38  (segments #546-#714, 1984 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:32:52] STUDENT_1: we say it's offline.   {#527}
CTX| [00:32:53] STUDENT_1: Because if there is no entry for U4 over here,   {#528}
CTX| [00:32:56] STUDENT_1: it means user never came online.   {#529}
CTX| [00:32:59] STUDENT_1: Correct?   {#530}
CTX| [00:33:00] STUDENT_1: So which means that user is offline.   {#531}
CTX| [00:33:01] STUDENT_1: So if there is no entry in the database for a user,   {#532}
CTX| [00:33:04] STUDENT_1: we say it's offline.   {#533}
CTX| [00:33:05] STUDENT_1: We return offline for that.   {#534}
CTX| [00:33:06] STUDENT_1: If there is an entry and entry.lastheartbeat   {#535}
CTX| [00:33:11] STUDENT_1: less than now minus 30 seconds, which means the time at which I received the last heartbeat   {#536}
CTX| [00:33:15] STUDENT_1: is older than current time minus 30 seconds, which means it has been more than 30 seconds   {#537}
CTX| [00:33:21] STUDENT_1: that I have received heartbeat from this particular user.   {#538}
CTX| [00:33:26] STUDENT_1: I'll return offline.   {#539}
CTX| [00:33:27] STUDENT_1: If I don't match these two conditions, the user is online, right?   {#540}
CTX| [00:33:31] STUDENT_1: Either the entry does not exist, then it is definitely offline.   {#541}
CTX| [00:33:34] STUDENT_1: If the entry exists, but the last heartbeat I received is older than 30 seconds and the   {#542}
CTX| [00:33:39] TEACHER: user is offline.   {#543}
CTX| [00:33:41] TEACHER: user is online.   {#544}
CTX| [00:33:43] TEACHER: So this is how our business logic would change for the getStatus API.   {#545}

---- OWNED SEGMENTS START ----
[00:33:50] STUDENT_1: Now let's estimate the scale of it.   {#546}
[00:33:53] TEACHER: Pretty simple system, we implemented database, schema, update, reads, then long enough duration.   {#547}
[00:34:02] TEACHER: We did that.   {#548}
[00:34:02] TEACHER: Now let's see what happens at scale.   {#549}
[00:34:05] TEACHER: Let's do some back of the envelope calculation as fancy people tell.   {#550}
[00:34:10] TEACHER: Normal planning, normal crunching of mathematics, seventh standard.   {#551}
[00:34:15] TEACHER: So if we look here, each row of this table has two columns.   {#552}
[00:34:25] STUDENT_1: So each row has two values in it.   {#553}
[00:34:27] STUDENT_1: First column is user ID.   {#554}
[00:34:28] STUDENT_1: Second column is last heartbeat.   {#555}
[00:34:30] STUDENT_1: So last heartbeat, let's say we are storing epoch seconds.   {#556}
[00:34:35] STUDENT_1: This the seconds elapsed from 1st January 1970, which is a standard Unix epoch that we would store over here.   {#557}
[00:34:42] STUDENT_1: If you compute the size or the length of a row, it will come up one integer, another integer.   {#558}
[00:34:51] STUDENT_1: 4 byte plus 4 byte is equal to 8 byte.   {#559}
[00:34:56] STUDENT_1: So for each user, I am requiring 8 bytes of space.   {#560}
[00:35:02] STUDENT_1: Not really disk space yet.   {#561}
[00:35:05] STUDENT_1: 8 bytes of space, which means if I have 100 users, there will be 100 entries.   {#562}
[00:35:10] STUDENT_1: If I have 1000 users, 1000 entries and so on and so forth.   {#563}
[00:35:14] TEACHER: So if I talk about, let's say I have a billion users, 1 eighth of the world population on   {#564}
[00:35:19] TEACHER: my platform, let's say I'm Facebook.   {#565}
[00:35:20] TEACHER: Facebook has much more than that, but let's say we have 1 billion users.   {#566}
[00:35:25] STUDENT_1: So the amount of the number of entries we would have is 1 billion because one user,   {#567}
[00:35:30] STUDENT_1: one entry and each entry is eight bytes long. One for user ID, one for timestamp. The total   {#568}
[00:35:38] STUDENT_1: size of this would be one billion entries. Each entry is eight bytes. So the total size   {#569}
[00:35:47] TEACHER: is eight GB. This is interesting because eight GB is not that big of a storage to worry about.   {#570}
[00:36:00] TEACHER: 128 GB is right there, more than 8 GB is right there in your pocket.   {#571}
[00:36:04] TEACHER: And your phone has 128 GB.   {#572}
[00:36:09] TEACHER: This tells us, this calculation, this computation tells us that this system does not require   {#573}
[00:36:16] TEACHER: a massive storage.   {#574}
[00:36:19] TEACHER: This system requires something else.   {#575}
[00:36:20] TEACHER: Storage is not a challenge for the system.   {#576}
[00:36:23] TEACHER: Very evident.   {#577}
[00:36:24] TEACHER: Storage is the amount of space you require to store the data.   {#578}
[00:36:28] TEACHER: Because all we are doing is two integers we are storing.   {#579}
[00:36:33] TEACHER: Even for a billion users, the total storage required for you is just 8 GB, which you can   {#580}
[00:36:40] STUDENT_1: literally fit in RAM of a very trivial cheap machine.   {#581}
[00:36:44] STUDENT_1: So this tells us that storage is not the problem for the system, but still, still, right.   {#582}
[00:36:53] TEACHER: Let's say we are being very mighty.   {#583}
[00:36:56] TEACHER: We are being very frugal over here and say that, hey, can we optimize this?   {#584}
[00:37:03] TEACHER: Can we optimize this 8 GB to something even smaller?   {#585}
[00:37:07] TEACHER: I don't want to spend 8 GB on this.   {#586}
[00:37:10] TEACHER: Can I do that?   {#587}
[00:37:12] TEACHER: Hypothetically.   {#588}
[00:37:12] TEACHER: Hypothetically.   {#589}
[00:37:13] TEACHER: We don't have to do it for every system, but hypothetically.   {#590}
[00:37:17] TEACHER: If we would want to do it.   {#591}
[00:37:20] STUDENT_1: So when you are thrown and now why we are talking about this optimization is because   {#592}
[00:37:25] TEACHER: every step now always remember this whenever you're designing a system   {#593}
[00:37:29] TEACHER: every single step that you take ask those questions ask those critical questions that hey   {#594}
[00:37:36] TEACHER: can I change this can I go for an alternate because it's all about trade-offs every single   {#595}
[00:37:44] TEACHER: system is all about analyzing hundreds and thousands of trade-offs and then picking the   {#596}
[00:37:50] TEACHER: best path for yourself.   {#597}
[00:37:53] STUDENT_1: So now here, given that we know that storage is not a problem, but still, what if we would   {#598}
[00:38:00] TEACHER: want to do better on storage?   {#599}
[00:38:02] TEACHER: Always be open for every single possibility.   {#600}
[00:38:06] TEACHER: And that's what makes you a better senior engineer.   {#601}
[00:38:07] TEACHER: thinking of all possible, all of the possibilities that you hold without being buyers.   {#602}
[00:38:14] TEACHER: We don't need this being overconfident.   {#603}
[00:38:17] TEACHER: Hey, I know this stuff better than you be humble, always document every single possibility   {#604}
[00:38:23] TEACHER: that you know, and tell why you took a certain path.   {#605}
[00:38:27] STUDENT_1: You need to have that clarity because if let's say someone says, did you think of this thing?   {#606}
[00:38:33] STUDENT_1: and then you say no I did not that would make you seem like that would not give you brownie points   {#607}
[00:38:40] STUDENT_1: right thinking of all possible cases whenever you are designing system is the heart and the   {#608}
[00:38:47] STUDENT_1: soul of being a better senior engineer right okay so now if let's say even though storage is not a   {#609}
[00:38:53] STUDENT_1: problem for us what if we would want to reduce it even further can we do it right if such is a   {#610}
[00:39:02] STUDENT_1: approach. So look from this perspective, see what your user is seeing, your end user. Your end user   {#611}
[00:39:08] STUDENT_1: is seeing for the user if it is online or offline. All the user, all anything that user is like,   {#612}
[00:39:17] TEACHER: everything that user is getting is about just seeing this green or grey dots. There is no   {#613}
[00:39:24] TEACHER: additional information that we are showing to the user.   {#614}
[00:39:28] TEACHER: And so can we say if the entry exists in the database, user is online.   {#615}
[00:39:35] TEACHER: If the entry does not exist in the database, user is offline.   {#616}
[00:39:39] STUDENT_1: What if absence is equal to offline?   {#617}
[00:39:41] STUDENT_1: So absence of entry in the database is equal to offline.   {#618}
[00:39:46] STUDENT_1: This way we would reduce the rows by a significant margin because you   {#619}
[00:39:54] TEACHER: have the users you would only have the entries here for the users who are actually online   {#620}
[00:40:01] STUDENT_1: correct so if you think on those lines what if absence is equal to online which means that   {#621}
[00:40:09] STUDENT_1: what it means that in order to delete it i would want my entries to expire or delete   {#622}
[00:40:16] STUDENT_1: after 30 seconds because 30 seconds is the time that which we are playing that if i don't receive   {#623}
[00:40:20] STUDENT_1: a heartbeat in 30 seconds, I'll mark this user as offline.   {#624}
[00:40:23] STUDENT_1: So which means that whenever I receive a heartbeat, I reset the timer of 30 seconds   {#625}
[00:40:29] STUDENT_1: and then once 30 seconds exhaust, I'll delete those entries.   {#626}
[00:40:35] TEACHER: This way, the number of entries we would require in the database will be equal to the number   {#627}
[00:40:42] TEACHER: of users who are online at that moment.   {#628}
[00:40:45] TEACHER: This ensures that we are reducing the storage requirement.   {#629}
[00:40:48] STUDENT_1: Although storage is not picked, but we're still doing that optimization.   {#630}
[00:40:53] STUDENT_1: And so who will do this delete?   {#631}
[00:40:56] STUDENT_1: So you may think that, Hey, I'll just write a cron job.   {#632}
[00:41:00] STUDENT_1: That's the simplest one.   {#633}
[00:41:02] STUDENT_1: And so you say that, Hey, let's just write a cron job that deletes the expired entries.   {#634}
[00:41:09] STUDENT_1: So what you do is you have your database in which you have this exact same schema.   {#635}
[00:41:14] STUDENT_1: You have your user ID and last heartbeat.   {#636}
[00:41:16] STUDENT_1: you write a cron job that goes through entries of the database that are expired which means   {#637}
[00:41:21] STUDENT_1: whenever the cron job runs it finds the entries whose last heartbeat is older than 30 seconds   {#638}
[00:41:27] TEACHER: and it deletes those corresponding entries from the database right sounds okay right so this is a   {#639}
[00:41:36] TEACHER: good solution this way now what you can do is your get when you are making when you want to get a   {#640}
[00:41:43] STUDENT_1: status of a particular user or making a call.   {#641}
[00:41:45] STUDENT_1: If the entry exists in the database, good.   {#642}
[00:41:48] STUDENT_1: If entry does not exist, then user is offline.   {#643}
[00:41:52] STUDENT_1: This solution sounds good.   {#644}
[00:41:54] TEACHER: Would work for a startup when you are just launching out.   {#645}
[00:41:57] TEACHER: But it's not a robust solution.   {#646}
[00:41:58] TEACHER: You need to handle edge cases and whatnot.   {#647}
[00:42:01] STUDENT_1: But the core idea is that can we not like this adds up to having another moving part,   {#648}
[00:42:10] STUDENT_1: another service, another process in your system.   {#649}
[00:42:13] STUDENT_1: And because Cron job has to be a separate process whose job is to iterate   {#650}
[00:42:17] STUDENT_1: through the database, find the expand entries and delete them.   {#651}
[00:42:20] STUDENT_1: So now you are hosting the surveys.   {#652}
[00:42:23] STUDENT_1: You also need to ensure your Cron is constantly running.   {#653}
[00:42:25] STUDENT_1: Otherwise your business logic would falter.   {#654}
[00:42:28] STUDENT_1: Right.   {#655}
[00:42:29] TEACHER: So now uptime of the service becomes important for you.   {#656}
[00:42:33] TEACHER: Uptime of this actual service is anyway important for you.   {#657}
[00:42:35] TEACHER: So you are adding one more moving part in your system.   {#658}
[00:42:39] TEACHER: Don't.   {#659}
[00:42:40] TEACHER: So which is where?   {#660}
[00:42:43] TEACHER: It's very counterintuitive from everything that's happening on the internet,   {#661}
[00:42:46] TEACHER: YouTube videos, people who are creating, adding random services here and there.   {#662}
[00:42:52] TEACHER: You as an engineer, think about implementation.   {#663}
[00:42:56] TEACHER: Think about you are the one who would have to build those two components,   {#664}
[00:43:01] TEACHER: the actual rest based service and this cron that is running.   {#665}
[00:43:05] TEACHER: You have to manage uptime for that.   {#666}
[00:43:07] TEACHER: You have to manage telemetry for that.   {#667}
[00:43:09] TEACHER: So many things on your page.   {#668}
[00:43:13] TEACHER: implementation, you realize that there is too much work in having this another process running,   {#669}
[00:43:18] TEACHER: ensuring it's uptime, doing monitoring of that and whatnot. So never just draw boxes for the   {#670}
[00:43:24] TEACHER: sake of it. Think from the implementation and see if you would really want to implement that,   {#671}
[00:43:29] TEACHER: monitor that, manage that. If not, think for a better alternative. Always, always, always do   {#672}
[00:43:36] TEACHER: that. Don't just draw boxes. Making your diagram look complex is the worst thing that you can do.   {#673}
[00:43:43] STUDENT_1: Okay, so if not cron job ask this question, can you offload this to the database?   {#674}
[00:43:50] STUDENT_1: Can your database do this deletion for it?   {#675}
[00:43:53] STUDENT_1: Which means that now what we know is given that there exists databases who do this thing,   {#676}
[00:44:00] STUDENT_1: you don't have to reinvent the wheel by writing a cron job.   {#677}
[00:44:04] STUDENT_1: So what we do is we want a database that gives us key value like access and expiration, which   {#678}
[00:44:13] STUDENT_1: time to leave.   {#679}
[00:44:14] STUDENT_1: Two very common databases are Redis and DynamoDB.   {#680}
[00:44:17] STUDENT_1: And there is a specific reason I chose only these two.   {#681}
[00:44:19] TEACHER: There are others also, but I specifically for,   {#682}
[00:44:22] TEACHER: in order to drive another discussion, I've chose these two.   {#683}
[00:44:25] STUDENT_1: So this way, what we are doing is we are offloading the cron part   {#684}
[00:44:29] STUDENT_1: to the database that gives you this as a native feature   {#685}
[00:44:32] STUDENT_1: so that you don't have to worry about it.   {#686}
[00:44:34] STUDENT_1: Why to reinvent the wheel?   {#687}
[00:44:35] STUDENT_1: Why to add unnecessary components in your system?   {#688}
[00:44:39] STUDENT_1: Keep it really simple.   {#689}
[00:44:40] STUDENT_1: So now our entire logic becomes that whenever we receive heartbeat,   {#690}
[00:44:47] STUDENT_1: so whenever we receive heartbeat, we update the entry in Redis and DynamoDB,   {#691}
[00:44:52] STUDENT_1: whichever DB you choose with a TTL of 30 seconds.   {#692}
[00:44:56] STUDENT_1: And as soon as 30 seconds expires, your Redis and DynamoDB internally   {#693}
[00:45:00] STUDENT_1: will automatically delete it.   {#694}
[00:45:01] STUDENT_1: You don't have to worry about it.   {#695}
[00:45:03] STUDENT_1: You're offloading those complexities to database   {#696}
[00:45:05] STUDENT_1: and keeping your business logic very simple.   {#697}
[00:45:08] STUDENT_1: Every time you receive a heartbeat, you reset the TTR to 30 seconds,   {#698}
[00:45:11] STUDENT_1: which means that if the entry exists, it's online.   {#699}
[00:45:15] TEACHER: If entry does not exist, it's offline.   {#700}
[00:45:17] TEACHER: If I don't receive heartbeat in 30 seconds,   {#701}
[00:45:20] TEACHER: my entry would be automatically deleted by the database.   {#702}
[00:45:22] TEACHER: I don't have to worry about it.   {#703}
[00:45:25] STUDENT_1: So this way, our entire design becomes extremely simple   {#704}
[00:45:30] STUDENT_1: and we are managing the least.   {#705}
[00:45:33] STUDENT_1: The database is taking care of the complexity,   {#706}
[00:45:37] TEACHER: deletion part database is taking care all you have to do is just write rest endpoints that talks to   {#707}
[00:45:42] TEACHER: this database exposes them to user right really simplistic system right okay now given that we   {#708}
[00:45:52] TEACHER: have two choices and i specifically even in periods i mentioned read about redis and dynamo db right   {#709}
[00:45:56] TEACHER: we will probe some discussions around it so given that we have two choices one is redis one is   {#710}
[00:46:04] TEACHER: both gives us key value both gives us expiration right which one would you choose for the system   {#711}
[00:46:10] TEACHER: and why so raise your hand i'll pull you in we'll go in the we'll go in the order right sometimes i   {#712}
[00:46:18] STUDENT_1: just skip the order to give people fair chances to speak up right but uh raise your hands don't   {#713}
[00:46:24] STUDENT_1: barge it raise your hands i'll pull you in and uh which one would you pick redis dynamo db and   {#714}
---- OWNED SEGMENTS END ----

CTX| [00:46:38] STUDENT_4: I think I can go with the DynamoDB.   {#715}
CTX| [00:46:42] STUDENT_4: Why?   {#716}
CTX| [00:46:45] STUDENT_4: I want to store data permanently maybe sometime.   {#717}
CTX| [00:46:50] STUDENT_4: So persistence is required.   {#718}
CTX| [00:46:53] TEACHER: Why would you need persistence for this?   {#719}
CTX| [00:46:56] STUDENT_1: We said that 30 seconds gone, your data is anyway deleted.   {#720}
CTX| [00:47:05] STUDENT_4: expiration. Redis can go down. Redis is in memory database. So it can also go down and   {#721}
CTX| [00:47:11] STUDENT_4: DynamoDB is something that is self managed. It's managed by the AWS. So I don't have to   {#722}
CTX| [00:47:16] STUDENT_1: worry about that. You're going in because of manage. So what advantage does a managed   {#723}
CTX| [00:47:22] STUDENT_4: service give you? I don't have to worry about that. It's managed by the AWS. So it will   {#724}
CTX| [00:47:28] STUDENT_4: be highly available and that is something that i have to manage that so i have to take care of that   {#725}
CTX| [00:47:34] STUDENT_1: part okay so you are offloading the management part to the cloud vendor that you have so that   {#726}
