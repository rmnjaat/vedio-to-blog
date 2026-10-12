# chunk_03  OWNS 00:22:56 -> 00:33:50  (segments #365-#545, 1880 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:21:59] TEACHER: You can evolve it the way you want.   {#345}
CTX| [00:22:01] TEACHER: So, but building an intuition, intuition that you hold will stay with you forever.   {#346}
CTX| [00:22:07] TEACHER: Right.   {#347}
CTX| [00:22:07] TEACHER: And which is what is required?   {#348}
CTX| [00:22:09] TEACHER: Because it's not that there are only 15, 16 systems that the world has and you would   {#349}
CTX| [00:22:14] TEACHER: Exactly that, right?   {#350}
CTX| [00:22:15] TEACHER: No, you at real world, you will be thrown into situations where you have to build systems   {#351}
CTX| [00:22:20] TEACHER: that does not even exist.   {#352}
CTX| [00:22:22] TEACHER: How will you go about it?   {#353}
CTX| [00:22:24] TEACHER: Right?   {#354}
CTX| [00:22:24] TEACHER: So which is where intuition matters the most.   {#355}
CTX| [00:22:28] TEACHER: Okay.   {#356}
CTX| [00:22:29] STUDENT_1: Now, if I start on online offline indicator, if you think about it, let's say we pick our   {#357}
CTX| [00:22:35] STUDENT_1: core of the system as database.   {#358}
CTX| [00:22:38] STUDENT_1: That's the easiest one to start.   {#359}
CTX| [00:22:39] STUDENT_1: So let's say we start with a database and we'll think about if I'd want to render this   {#360}
CTX| [00:22:44] TEACHER: this online offline stuff, what do I need?   {#361}
CTX| [00:22:47] TEACHER: I see that there is a user and I see there is a green or a grey button or green or a   {#362}
CTX| [00:22:53] TEACHER: grey indicator.   {#363}
CTX| [00:22:54] TEACHER: Okay.   {#364}

---- OWNED SEGMENTS START ----
[00:22:56] STUDENT_1: So when it is there, it means that what I have is for a user, I want to store if the   {#365}
[00:23:04] STUDENT_1: user is online or not, because this is exactly what I'll make a call, get the information   {#366}
[00:23:09] STUDENT_1: and render it on the UI.   {#367}
[00:23:11] STUDENT_1: So let's say we store it exactly that way.   {#368}
[00:23:14] STUDENT_1: I'll store it as an integer because user ID integer fair assumption and online or offline.   {#369}
[00:23:19] STUDENT_1: So I'll store a boolean true or false.   {#370}
[00:23:21] STUDENT_1: True means online, false means offline.   {#371}
[00:23:23] STUDENT_1: And for all the users, I'll store this information.   {#372}
[00:23:26] STUDENT_1: So this is a classic key value use case.   {#373}
[00:23:30] STUDENT_1: It's just access pattern.   {#374}
[00:23:31] STUDENT_1: It's not kind of database.   {#375}
[00:23:33] STUDENT_1: I'm just picking the access pattern.   {#376}
[00:23:35] STUDENT_1: Because for a set of users, give me their online offline status.   {#377}
[00:23:38] STUDENT_1: For a single user, give me the status.   {#378}
[00:23:41] STUDENT_1: For a single user, update the status.   {#379}
[00:23:42] STUDENT_1: These are the operations that we would do.   {#380}
[00:23:44] STUDENT_1: So here, when we look at this, what we find is that this is a very key value type use case.   {#381}
[00:23:52] STUDENT_1: It's still not decided on the database, right?   {#382}
[00:23:54] STUDENT_1: But we know that this is the access pattern that we would typically operate on.   {#383}
[00:24:01] STUDENT_1: Right?   {#384}
[00:24:01] STUDENT_1: Okay.   {#385}
[00:24:03] STUDENT_1: So now that we have data in our database, now we know how we are storing it.   {#386}
[00:24:08] STUDENT_1: Let's come a step back.   {#387}
[00:24:09] STUDENT_1: Who will query the data from the database?   {#388}
[00:24:12] STUDENT_1: An API server.   {#389}
[00:24:13] TEACHER: Right?   {#390}
[00:24:14] TEACHER: call the API user.   {#391}
[00:24:16] TEACHER: So on API server, we need to write API that would make call to the data   {#392}
[00:24:19] TEACHER: of this and give this.   {#393}
[00:24:20] TEACHER: Now here, one critical decision.   {#394}
[00:24:24] TEACHER: Sure.   {#395}
[00:24:25] TEACHER: You have two ways to implement it.   {#396}
[00:24:27] TEACHER: First is given a user, give me the status.   {#397}
[00:24:30] TEACHER: And you expose this one endpoint, give me the user ID, give me the status.   {#398}
[00:24:35] STUDENT_1: Now here, imagine on the UI where you are entering four users.   {#399}
[00:24:40] STUDENT_1: If you only have one API endpoint exposed, which says that, Hey, for a   {#400}
[00:24:45] STUDENT_1: Then to render this online offline status for four users, you will have to make four   {#401}
[00:24:51] STUDENT_1: API calls from the front end.   {#402}
[00:24:53] TEACHER: Very poor experience and because a large number of API calls system will be over pertinent   {#403}
[00:24:58] TEACHER: and whatnot.   {#404}
[00:24:59] TEACHER: So the first critical design decision that we'll take is we'll expose a batch endpoint.   {#405}
[00:25:07] TEACHER: Instead of exposing an endpoint that gives the status of just one user, we write one   {#406}
[00:25:11] STUDENT_1: more end point that accepts a bunch of user IDs and returns the status of all of them.   {#407}
[00:25:19] TEACHER: This way it would reduce the amount of network call that your front end has to make to the   {#408}
[00:25:25] STUDENT_1: backend while ensuring that all the heavy lifting is done by the backend and front end   {#409}
[00:25:30] STUDENT_1: makes fewer network calls to get the exact same information.   {#410}
[00:25:33] STUDENT_1: So that is one reason.   {#411}
[00:25:35] STUDENT_1: These are the intricate details that I was talking about rather than just drawing boxes.   {#412}
[00:25:41] STUDENT_1: understand like why are we exposing it in a certain way.   {#413}
[00:25:45] STUDENT_1: Right.   {#414}
[00:25:45] STUDENT_1: So we expose the endpoint slash data slash users and we accept a bunch of IDs there.   {#415}
[00:25:50] STUDENT_1: And his job is for all the IDs that I provide, give me the online offense status of it.   {#416}
[00:25:55] STUDENT_1: Right.   {#417}
[00:25:56] STUDENT_1: Pretty simple thing.   {#418}
[00:25:57] STUDENT_1: So what we sort out is rendering part is sorted out.   {#419}
[00:26:01] STUDENT_1: Right.   {#420}
[00:26:01] STUDENT_1: We expose an endpoint that would help us render the status of it on the front end.   {#421}
[00:26:07] STUDENT_1: Now comes the part where we have to update it.   {#422}
[00:26:11] STUDENT_1: it is we now have a database on which we can fire a query, get the data.   {#423}
[00:26:16] STUDENT_1: Right.   {#424}
[00:26:16] STUDENT_1: That part is sorted.   {#425}
[00:26:17] STUDENT_1: Now someone has to update this information because reading is done.   {#426}
[00:26:22] STUDENT_1: What about updating?   {#427}
[00:26:23] STUDENT_1: So now here, when we are updating this, that for every user, I need to put out   {#428}
[00:26:28] STUDENT_1: online or offline, something like this.   {#429}
[00:26:31] STUDENT_1: So now how do we go about this?   {#430}
[00:26:33] TEACHER: Now here, there are two ways to get this information.   {#431}
[00:26:38] TEACHER: First is a pull based model.   {#432}
[00:26:41] STUDENT_1: push based on when I talk about pull based which means that your API server is trying   {#433}
[00:26:47] STUDENT_1: to fetch this information that are you alive are you alive are you alive kind of that right   {#434}
[00:26:52] STUDENT_1: where your API server is making call to front end and getting it but that is not possible   {#435}
[00:26:56] STUDENT_1: because HTTP stateless there is no persistent connection so API server cannot talk to client   {#436}
[00:27:04] STUDENT_1: client has to talk to API server and say this so pull based model will not work because of   {#437}
[00:27:11] STUDENT_1: The client has to push this information that,   {#438}
[00:27:14] STUDENT_1: Hey, I am alive.   {#439}
[00:27:15] STUDENT_1: I am alive.   {#440}
[00:27:16] STUDENT_1: I am alive.   {#441}
[00:27:17] STUDENT_1: So periodicity.   {#442}
[00:27:19] STUDENT_1: So periodically you would send heartbeats to the backend   {#443}
[00:27:24] STUDENT_1: and say that I am alive.   {#444}
[00:27:25] STUDENT_1: It's like mimicking our heartbeats, right?   {#445}
[00:27:28] STUDENT_1: So you have your machine.   {#446}
[00:27:29] STUDENT_1: So long as the heart is beating, you are alive.   {#447}
[00:27:31] STUDENT_1: Heart stops beating, you are dead, right?   {#448}
[00:27:33] STUDENT_1: So what you do is every client will periodically make an API call,   {#449}
[00:27:41] TEACHER: a heartbeat API call, which would tell the API server, I am alive.   {#450}
[00:27:46] TEACHER: Right.   {#451}
[00:27:47] TEACHER: So this is what you do.   {#452}
[00:27:48] TEACHER: So you need one API endpoint where clients can post their heartbeat.   {#453}
[00:27:55] STUDENT_1: So what do you do?   {#454}
[00:27:56] STUDENT_1: You expose the endpoint slash heartbeat on which you can pass in post and say that   {#455}
[00:28:00] STUDENT_1: whatever the authenticated user is will be marked as alive.   {#456}
[00:28:04] TEACHER: But now with heartbeat, what you have to do is you cannot just say one.   {#457}
[00:28:11] STUDENT_1: Again, if we go into a bit more details on that,   {#458}
[00:28:14] STUDENT_1: this heartbeat call, do you need periodically   {#459}
[00:28:18] STUDENT_1: or just one time heartbeat call is fine?   {#460}
[00:28:20] STUDENT_1: For example, you may say that,   {#461}
[00:28:21] STUDENT_1: why do I need to send it periodically?   {#462}
[00:28:23] STUDENT_1: What if I send it once when I'm online   {#463}
[00:28:26] STUDENT_1: and once when I log out?   {#464}
[00:28:28] STUDENT_1: So that's a common thing that,   {#465}
[00:28:30] STUDENT_1: hey, I just need two API calls.   {#466}
[00:28:31] STUDENT_1: When I'm online, when I'm logging in the first time,   {#467}
[00:28:35] STUDENT_1: I would send a heartbeat   {#468}
[00:28:36] STUDENT_1: and when I'm logging out, I'll say now I'm offline.   {#469}
[00:28:40] TEACHER: But think about it.   {#470}
[00:28:41] TEACHER: Let's say a user sent a call which says that, Hey, I'm online, but then the machine crashed.   {#471}
[00:28:50] STUDENT_1: Right?   {#472}
[00:28:50] STUDENT_1: The client device ran out of battery.   {#473}
[00:28:52] STUDENT_1: The user is actually offline, but your UI is showing it is online because you never received a call offline.   {#474}
[00:29:01] STUDENT_1: And this is a very common case.   {#475}
[00:29:03] STUDENT_1: So given that you can tell when you are online, but offline you cannot tell because you are   {#476}
[00:29:14] TEACHER: not in that control or you do not have control of making an API call just before I die, right?   {#477}
[00:29:19] STUDENT_1: Or just before the device die, you cannot make an API call because what if someone just   {#478}
[00:29:23] STUDENT_1: plugs off the device, right?   {#479}
[00:29:25] STUDENT_1: You don't get time to do that.   {#480}
[00:29:27] STUDENT_1: So, which is where you know that because of this fundamental limitation, you will have   {#481}
[00:29:34] STUDENT_1: to periodically send the heartbeat to the backend.   {#482}
[00:29:38] STUDENT_1: So that it's like, I'm alive, I'm alive, I'm alive, I'm alive.   {#483}
[00:29:43] STUDENT_1: When you do that, and if the backend does not receive a heartbeat for a long enough   {#484}
[00:29:48] STUDENT_1: time, then the backend would say that this user is offline.   {#485}
[00:29:52] STUDENT_1: This is the most natural progression to the system.   {#486}
[00:29:57] STUDENT_1: is we converge to this that because I was constantly receiving heartbeat from this   {#487}
[00:30:05] STUDENT_1: particular user I was constantly marking this user as online but if I don't get it long enough   {#488}
[00:30:12] STUDENT_1: now this long becomes a subjective word how long is long enough for me now this depends on this case   {#489}
[00:30:19] STUDENT_1: for some system it would be in 10 minutes if I don't receive a heartbeat I'll mark this user as   {#490}
[00:30:24] STUDENT_1: offline for some if it is 10 seconds for some it is one minute right now depending on what you are   {#491}
[00:30:29] TEACHER: building you will configure this time right that hey this is what i'll say that if i don't receive   {#492}
[00:30:37] TEACHER: a heartbeat for let's say 30 seconds i'll mark this user as offline so this is your business logic   {#493}
[00:30:43] STUDENT_1: so now you need to keep track of what was the time at which i received the last heartbeat from this   {#494}
[00:30:54] STUDENT_1: So that you know that it has been long enough.   {#495}
[00:30:57] STUDENT_1: Correct.   {#496}
[00:30:58] STUDENT_1: So earlier what we were storing was we were storing int and bool.   {#497}
[00:31:02] TEACHER: But what we need is we need to store the time at which we received the last heartbeat.   {#498}
[00:31:07] TEACHER: So this is the pulse that we are sending.   {#499}
[00:31:09] TEACHER: So instead of storing bool what we store is we store the time at which we received the last heartbeat.   {#500}
[00:31:16] TEACHER: So every time user sends a heartbeat to the post heartbeat request.   {#501}
[00:31:21] TEACHER: we update the last heartbeat of that particular user in the table.   {#502}
[00:31:27] TEACHER: Okay.   {#503}
[00:31:28] TEACHER: Just one thing.   {#504}
[00:31:29] TEACHER: Whenever I draw something like this does not mean it is relational.   {#505}
[00:31:32] TEACHER: It just helps you visualize the schema of it.   {#506}
[00:31:35] TEACHER: You can model it however you want.   {#507}
[00:31:37] TEACHER: Right.   {#508}
[00:31:38] TEACHER: And whenever I try SQL does not mean we are only using SQL.   {#509}
[00:31:42] TEACHER: It's just an easy way to understand this.   {#510}
[00:31:44] TEACHER: Right.   {#511}
[00:31:44] TEACHER: F-Y-O.   {#512}
[00:31:45] TEACHER: Okay.   {#513}
[00:31:46] TEACHER: So whenever we receive a heartbeat in the post request,   {#514}
[00:31:51] TEACHER: and update on this database and update and mark this last heartbeat as something right the current   {#515}
[00:31:57] STUDENT_1: time at which we receive the heartbeat so update pulse set last heartbeat equal to now where user   {#516}
[00:32:02] STUDENT_1: id is equal to something right we keep on doing this whenever we get heartbeat from a user we keep   {#517}
[00:32:07] STUDENT_1: on updating the corresponding row in the data right so now if this is how we are storing the   {#518}
[00:32:16] STUDENT_1: data now so which means now our get needs to change earlier what we did is while getting   {#519}
[00:32:22] STUDENT_1: we just went to the database read true or false and returned it to the user but now instead of   {#520}
[00:32:28] STUDENT_1: having true and false we are having integer which is the last heartbeat type so now our get method   {#521}
[00:32:34] TEACHER: changes the business logic of it now what we do is we becomes little more complex so what we do   {#522}
[00:32:41] STUDENT_1: is whenever we get a status call to check an API for a user,   {#523}
[00:32:45] STUDENT_1: also holds true for batch users,   {#524}
[00:32:47] STUDENT_1: batch IDs that are provided.   {#525}
[00:32:49] STUDENT_1: That if there is no entry in the database,   {#526}
[00:32:52] STUDENT_1: we say it's offline.   {#527}
[00:32:53] STUDENT_1: Because if there is no entry for U4 over here,   {#528}
[00:32:56] STUDENT_1: it means user never came online.   {#529}
[00:32:59] STUDENT_1: Correct?   {#530}
[00:33:00] STUDENT_1: So which means that user is offline.   {#531}
[00:33:01] STUDENT_1: So if there is no entry in the database for a user,   {#532}
[00:33:04] STUDENT_1: we say it's offline.   {#533}
[00:33:05] STUDENT_1: We return offline for that.   {#534}
[00:33:06] STUDENT_1: If there is an entry and entry.lastheartbeat   {#535}
[00:33:11] STUDENT_1: less than now minus 30 seconds, which means the time at which I received the last heartbeat   {#536}
[00:33:15] STUDENT_1: is older than current time minus 30 seconds, which means it has been more than 30 seconds   {#537}
[00:33:21] STUDENT_1: that I have received heartbeat from this particular user.   {#538}
[00:33:26] STUDENT_1: I'll return offline.   {#539}
[00:33:27] STUDENT_1: If I don't match these two conditions, the user is online, right?   {#540}
[00:33:31] STUDENT_1: Either the entry does not exist, then it is definitely offline.   {#541}
[00:33:34] STUDENT_1: If the entry exists, but the last heartbeat I received is older than 30 seconds and the   {#542}
[00:33:39] TEACHER: user is offline.   {#543}
[00:33:41] TEACHER: user is online.   {#544}
[00:33:43] TEACHER: So this is how our business logic would change for the getStatus API.   {#545}
---- OWNED SEGMENTS END ----

CTX| [00:33:50] STUDENT_1: Now let's estimate the scale of it.   {#546}
CTX| [00:33:53] TEACHER: Pretty simple system, we implemented database, schema, update, reads, then long enough duration.   {#547}
CTX| [00:34:02] TEACHER: We did that.   {#548}
CTX| [00:34:02] TEACHER: Now let's see what happens at scale.   {#549}
CTX| [00:34:05] TEACHER: Let's do some back of the envelope calculation as fancy people tell.   {#550}
CTX| [00:34:10] TEACHER: Normal planning, normal crunching of mathematics, seventh standard.   {#551}
CTX| [00:34:15] TEACHER: So if we look here, each row of this table has two columns.   {#552}
CTX| [00:34:25] STUDENT_1: So each row has two values in it.   {#553}
CTX| [00:34:27] STUDENT_1: First column is user ID.   {#554}
CTX| [00:34:28] STUDENT_1: Second column is last heartbeat.   {#555}
CTX| [00:34:30] STUDENT_1: So last heartbeat, let's say we are storing epoch seconds.   {#556}
CTX| [00:34:35] STUDENT_1: This the seconds elapsed from 1st January 1970, which is a standard Unix epoch that we would store over here.   {#557}
CTX| [00:34:42] STUDENT_1: If you compute the size or the length of a row, it will come up one integer, another integer.   {#558}
