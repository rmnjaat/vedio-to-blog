# chunk_03  OWNS 00:24:53 -> 00:37:03  (segments #325-#500, 1996 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:23:58] TEACHER: have. In that case, you can just write skip log and move forward. Another extreme of skip log is   {#307}
CTX| [00:24:05] TEACHER: no wait. But for example, your use case dictates that, Hey, when you are firing a query in case any   {#308}
CTX| [00:24:12] TEACHER: of the row is logged by any other transaction, kill myself. You don't want to wait. If you wait,   {#309}
CTX| [00:24:19] TEACHER: your throughput would go down. It's your use case. You don't want to wait. If like, for example,   {#310}
CTX| [00:24:23] TEACHER: if you know that some transaction has picked that row,   {#311}
CTX| [00:24:26] TEACHER: it would process that.   {#312}
CTX| [00:24:28] TEACHER: And you don't have to do it.   {#313}
CTX| [00:24:29] TEACHER: So you can kill yourself.   {#314}
CTX| [00:24:31] TEACHER: Because now you have no reason to exist.   {#315}
CTX| [00:24:34] TEACHER: Like that transaction is going into existential crisis.   {#316}
CTX| [00:24:37] TEACHER: That hey, someone else is doing it.   {#317}
CTX| [00:24:38] TEACHER: Why should I do it?   {#318}
CTX| [00:24:39] TEACHER: So you kill yourself.   {#319}
CTX| [00:24:40] TEACHER: So in that case, you do no wait.   {#320}
CTX| [00:24:43] TEACHER: So where do you say that?   {#321}
CTX| [00:24:45] TEACHER: If for your use case,   {#322}
CTX| [00:24:48] TEACHER: if some other transaction has locked the rows   {#323}
CTX| [00:24:51] TEACHER: that you were interested in   {#324}

---- OWNED SEGMENTS START ----
[00:24:53] TEACHER: to and you don't want to wait you kill yourself and then maybe retry and all depending on your   {#325}
[00:24:57] TEACHER: business but this is that hardcore construct that you need to know where you it's okay for you to   {#326}
[00:25:04] TEACHER: crash yourself just because someone else took that right a classic weird mentality but how   {#327}
[00:25:12] TEACHER: there are use cases where you need to do no wait and why this is like why this even exists because   {#328}
[00:25:19] TEACHER: Because it helps you ensure that you are not waiting because if you don't give anything   {#329}
[00:25:26] TEACHER: a transaction T2 will wait for you to acquire the lock.   {#330}
[00:25:30] TEACHER: And then waiting, let's say your SQL query timeout is let's say 10 seconds.   {#331}
[00:25:33] TEACHER: So it would wait for 10 seconds unnecessarily.   {#332}
[00:25:36] TEACHER: That would choke down entire performance of the database for that thread.   {#333}
[00:25:40] TEACHER: Plus your client would have to wait unnecessarily.   {#334}
[00:25:42] TEACHER: If your use case says that, hey, if the row is locked, I don't care.   {#335}
[00:25:46] TEACHER: Kill yourself.   {#336}
[00:25:48] TEACHER: Right.   {#337}
[00:25:49] TEACHER: So then you do that.   {#338}
[00:25:51] TEACHER: So these are basic constructs.   {#339}
[00:25:54] TEACHER: Theory, now we look at practical to understand all of them in detail.   {#340}
[00:25:57] TEACHER: So in order to do that, what we'll do is we'll build or rather more importantly, we'll implement   {#341}
[00:26:04] TEACHER: the airline checking system.   {#342}
[00:26:05] TEACHER: Now the core takeaway from this is how I did not build entire airline checking system.   {#343}
[00:26:12] TEACHER: We build the part that we are most interested in the database.   {#344}
[00:26:17] TEACHER: right because the idea for this system is not to build at high level fancy boxes but to understand   {#345}
[00:26:24] TEACHER: database log right similarly you can do it with every other system out there understand the core   {#346}
[00:26:31] TEACHER: of the system and implement it that's how you learn you don't have to write crowd and all for   {#347}
[00:26:34] TEACHER: every single thing out there right be smart the way you'd want to write hello worlds or small   {#348}
[00:26:40] TEACHER: prototypes of everything. I was so happy to see folks trying out all the four like short pulling,   {#349}
[00:26:48] TEACHER: long pulling, SSCs and web sockets. Do that. When you actually implement, you learn the most.   {#350}
[00:26:54] TEACHER: And this is not just some random stuff that I did. All of these things that I'm talking about,   {#351}
[00:27:00] TEACHER: 85% of them is something that I've built myself. That's why I have deep understanding of that   {#352}
[00:27:05] TEACHER: rather than just mugging up some blogs and research papers to regurgitate over here.   {#353}
[00:27:10] TEACHER: No, I build those systems.   {#354}
[00:27:12] TEACHER: I know where they falter, what happens in production.   {#355}
[00:27:14] TEACHER: Because of which I can add a ton of value.   {#356}
[00:27:17] TEACHER: Which is why I am highly recommending you to implement what we study.   {#357}
[00:27:22] TEACHER: That's where you get these deep insights about it.   {#358}
[00:27:25] TEACHER: Heretical dappa dappa, everyone can do it.   {#359}
[00:27:27] TEACHER: Like heretical boxes, everyone can draw.   {#360}
[00:27:29] TEACHER: Knowing those details is what makes you better achieve.   {#361}
[00:27:32] TEACHER: right okay so let's briefly talk about airline check-in system i'll show you a demand then we'll   {#362}
[00:27:38] TEACHER: take questions so this airline check-in system is just a small prototype just a small prototype   {#363}
[00:27:44] TEACHER: for us to understand database lock so we have multiple airlines air indigo go air and whatnot   {#364}
[00:27:51] TEACHER: every airline has multiple planes or flights each flight has 120 seats i'm just oversimplifying it   {#365}
[00:27:59] TEACHER: each flight has 120 seats.   {#366}
[00:28:01] TEACHER: Every flight has multiple trips.   {#367}
[00:28:04] TEACHER: Users book a seat in one trip of a flight.   {#368}
[00:28:08] TEACHER: Usually how we all travel.   {#369}
[00:28:11] TEACHER: Now here, what we have to do is   {#370}
[00:28:13] TEACHER: we have to handle multiple people   {#371}
[00:28:15] TEACHER: trying to pick the same seat.   {#372}
[00:28:17] TEACHER: We will go step by step to understand   {#373}
[00:28:20] TEACHER: where locking would come into the picture over here.   {#374}
[00:28:23] TEACHER: So a simple database schema for that   {#375}
[00:28:25] TEACHER: would look something like this.   {#376}
[00:28:27] TEACHER: You have airline stable.   {#377}
[00:28:29] TEACHER: you have all unique airlines listed over here.   {#378}
[00:28:33] TEACHER: For each airline, there are multiple flights.   {#379}
[00:28:36] TEACHER: So flight ID, airline ID and flight name,   {#380}
[00:28:39] TEACHER: Air India 101, Air India 279, Indigo 60, 101 something.   {#381}
[00:28:44] TEACHER: Each flight has a trip.   {#382}
[00:28:47] TEACHER: So where you say that, hey, this is the trip ID.   {#383}
[00:28:49] TEACHER: This is for this flight.   {#384}
[00:28:50] TEACHER: It would fly at this time, land at this time and whatnot.   {#385}
[00:28:53] TEACHER: Some random information, right?   {#386}
[00:28:55] TEACHER: So you have that as trip.   {#387}
[00:28:57] TEACHER: Then you have a user's table.   {#388}
[00:28:59] TEACHER: as in the people who are there in your system and a seat stable where you are saying that,   {#389}
[00:29:04] TEACHER: hey, on this trip, this seat is occupied by this user.   {#390}
[00:29:11] TEACHER: Initially, for a particular trip, all this will be null and it's our responsibility to fill that out.   {#391}
[00:29:18] TEACHER: This is what we are doing.   {#392}
[00:29:19] TEACHER: Now, this is where locking would be required.   {#393}
[00:29:22] TEACHER: We'll talk about that.   {#394}
[00:29:24] TEACHER: Okay, a simple high level stuff for that just to get all bases covered is you have your   {#395}
[00:29:31] TEACHER: check-in service, you have a database.   {#396}
[00:29:32] TEACHER: Let's say I pick MySQL to do this relational database, no brainer because we're talking   {#397}
[00:29:36] TEACHER: about relational databases here and an admin service.   {#398}
[00:29:39] TEACHER: So the role of the admin service is that for every flight, for every trip, creating entries   {#399}
[00:29:46] TEACHER: for all the seats out there.   {#400}
[00:29:48] TEACHER: So for example, let's say Indigo scheduled a particular flight that, Hey, now this flight   {#401}
[00:29:53] TEACHER: available for booking in the backend for all the seats in that you would have one entry for each   {#402}
[00:29:59] TEACHER: seat with user id set to null and some trip id set away right this is the job of admin service   {#403}
[00:30:06] TEACHER: it creates adds new flight strips and keeps the things updated right now here the interesting part   {#404}
[00:30:14] TEACHER: is assuming different situation 120 people like each flight has 120 seat i want that 120 seat to   {#405}
[00:30:24] TEACHER: be filled in best way possible which is what we'll take a look at right okay let me share my entire   {#406}
[00:30:33] TEACHER: your screen now.   {#407}
[00:30:39] TEACHER: Okay.   {#408}
[00:30:40] TEACHER: We'll start with the schema that we just discussed.   {#409}
[00:30:44] TEACHER: Okay.   {#410}
[00:30:45] TEACHER: So I just simplified it.   {#411}
[00:30:47] TEACHER: I just kept it simple.   {#412}
[00:30:49] TEACHER: I have users table.   {#413}
[00:30:50] TEACHER: User ID one, name is Maurya Harmon.   {#414}
[00:30:52] TEACHER: User ID two is Rene Jacobi.   {#415}
[00:30:54] TEACHER: User ID three is Makina Sveta, some random names.   {#416}
[00:30:57] STUDENT_8: Faker library, right?   {#417}
[00:30:59] TEACHER: I have 120 names.   {#418}
[00:31:01] TEACHER: Then I have trips.   {#419}
[00:31:03] TEACHER: Trip ID 1, name air India 1 or something and I have seats.   {#420}
[00:31:07] TEACHER: Now here I have set some user ID.   {#421}
[00:31:09] TEACHER: Initially it would be null.   {#422}
[00:31:10] TEACHER: Here some random values are set at the moment.   {#423}
[00:31:13] TEACHER: So seat ID 1A for this trip is booked by user 4.   {#424}
[00:31:19] TEACHER: So this is what we would have to do.   {#425}
[00:31:22] TEACHER: Now here one thing to note is what we are not doing is we are not reservation system.   {#426}
[00:31:29] TEACHER: People have already booked the flight.   {#427}
[00:31:33] TEACHER: Now they are here to pick a seat.   {#428}
[00:31:36] TEACHER: So now what we'll do is we'll walk through different approaches.   {#429}
[00:31:40] TEACHER: Approach 0 to approach 5.   {#430}
[00:31:42] TEACHER: Take mini steps to understand database locking, pessimistic locking in depth.   {#431}
[00:31:48] TEACHER: Now here what we would have is here people have made the payment.   {#432}
[00:31:54] TEACHER: Now imagine all 120 people of a particular flight.   {#433}
[00:32:03] TEACHER: all reach the airport at the exact same moment. They all have purchased the flight. Now they   {#434}
[00:32:09] TEACHER: entered the airport. There are 120 kiosks in which you have to just go and pick your seat.   {#435}
[00:32:17] TEACHER: You have to go and pick your seat. Now here imagine all 120 people of that same 120 flight   {#436}
[00:32:25] TEACHER: they're trying to pick a particular seat. That's all we have to do. We are not here to payment.   {#437}
[00:32:33] TEACHER: We are here to just pick a seed.   {#438}
[00:32:35] TEACHER: Now here, let me start really small and then we'll go into the advancements of lockup.   {#439}
[00:32:41] TEACHER: Okay.   {#440}
[00:32:41] TEACHER: So let's start small.   {#441}
[00:32:42] TEACHER: Let's see a very basic case over here.   {#442}
[00:32:46] TEACHER: We saw the database schema.   {#443}
[00:32:47] TEACHER: Now here what I have, this code is written in Golang.   {#444}
[00:32:50] TEACHER: I love Golang because of its simplicity, because of its elegance, because of easy concurrency.   {#445}
[00:32:55] TEACHER: This written Golang, you can implement it in any language you want so long as it supports   {#446}
[00:32:58] TEACHER: concurrency.   {#447}
[00:32:59] TEACHER: So otherwise you would need multiple code bases someplace rather multiple   {#448}
[00:33:02] TEACHER: processes to mimic them.   {#449}
[00:33:04] TEACHER: Doing it with threads is much easier.   {#450}
[00:33:06] TEACHER: So I picked Golang, but it's easy to understand.   {#451}
[00:33:09] TEACHER: Nothing fancy about it.   {#452}
[00:33:11] TEACHER: Okay.   {#453}
[00:33:12] TEACHER: So first approach is very simple just to see if everything is working or not.   {#454}
[00:33:16] TEACHER: What I did is I am accepting an argument, a command and argument that I am this   {#455}
[00:33:24] TEACHER: user and my system asked me, which seed do you want to book?   {#456}
[00:33:27] TEACHER: and it would try to book the seat.   {#457}
[00:33:29] TEACHER: So it would get the user.   {#458}
[00:33:31] TEACHER: So let's say I have user.   {#459}
[00:33:33] TEACHER: So whatever user I pass in,   {#460}
[00:33:35] TEACHER: it would get the seat   {#461}
[00:33:37] TEACHER: and book that seat for me and return.   {#462}
[00:33:39] TEACHER: So for example, I'll just run and show you.   {#463}
[00:33:45] TEACHER: Run approach 0 main.   {#464}
[00:33:47] TEACHER: In command and argument, I have to pass the user ID.   {#465}
[00:33:49] TEACHER: Let's say I pass in 1.   {#466}
[00:33:50] TEACHER: So which means that, hey, hello, Maurya Harman.   {#467}
[00:33:53] TEACHER: Wait, do you want to book?   {#468}
[00:33:54] TEACHER: Let's say I want to book seat 3.   {#469}
[00:33:57] TEACHER: and it would now book the seat 3. Now here you can see seat 1c is booked by Moria Harman and in   {#470}
[00:34:05] TEACHER: the seat layout this is how typically your plane sitting looks like 1a 1b 1c 1d 1e 1f 2a 2b 2c   {#471}
[00:34:12] TEACHER: 2d 2e 2f right so here seat 1c is booked by Moria Harman right this shows that basic stop   {#472}
[00:34:22] TEACHER: is working just fine now let's see what book function looks like where is my book function   {#473}
[00:34:28] TEACHER: this so book function accepts a user a seed and it starts a transaction in which it does select   {#474}
[00:34:40] TEACHER: id from seeds where id is equal to this that's it transition got the seed update seeds set user id   {#475}
[00:34:46] TEACHER: equal to question mark where user id is this and id equal to this user id seat id right   {#476}
[00:34:54] TEACHER: just simply pause it and you do transaction.commit now here if you look at this implementation   {#477}
[00:34:59] TEACHER: here what we are doing is we are just starting a transaction we are literally updating seats   {#478}
[00:35:07] TEACHER: set user id equal to this where seat id is equal to this no no checks are there there are zero   {#479}
[00:35:16] TEACHER: here right which means that tomorrow i can have another user coming in and can book the exact same   {#480}
[00:35:26] TEACHER: seat and my system would not prevent that because there are no checks that we have applied yet we   {#481}
[00:35:32] TEACHER: are not checking if the seat is already booked or what we are just doing is we are picking and   {#482}
[00:35:37] TEACHER: updating a very naive implementation but at least we have the foundation right okay so we did it   {#483}
[00:35:43] TEACHER: This is approach zero where we just see everything is working or not.   {#484}
[00:35:47] TEACHER: It's working.   {#485}
[00:35:48] TEACHER: Now, let me do something different.   {#486}
[00:35:51] TEACHER: Now, instead of given that here we can allow people to block every, like to just provide a random   {#487}
[00:35:59] TEACHER: seat ID and we just book that it leads to people booking the same, like two people booking the   {#488}
[00:36:05] TEACHER: same seat and then both of their boarding passes getting printed and there's a chaos in the plane.   {#489}
[00:36:09] TEACHER: Now, in order to reduce this, let's say what we do is instead of asking user to pick a seat,   {#490}
[00:36:16] TEACHER: let's say we pick a seat at random.   {#491}
[00:36:20] TEACHER: There's a natural progression to that.   {#492}
[00:36:22] TEACHER: So now what we do is we get all the seats of the airplane.   {#493}
[00:36:26] TEACHER: We pick one seat at random, like literally random choice from this array.   {#494}
[00:36:32] TEACHER: We are picking all the seats.   {#495}
[00:36:33] TEACHER: So if you look here, airline.seats gives me all the seats of the airplane,   {#496}
[00:36:41] TEACHER: not all the available seats, all the seats of the airplane.   {#497}
[00:36:44] TEACHER: I'm just picking one seat at random and I'm just giving that user that particular seat.   {#498}
[00:36:50] TEACHER: So still update seat set, user id equal to this, where id equal to this.   {#499}
[00:36:56] TEACHER: So again, no checks, but I'm now just relying on a random function   {#500}
---- OWNED SEGMENTS END ----

CTX| [00:37:03] TEACHER: This is also where it is very much possible for two people getting the same seat because   {#501}
CTX| [00:37:11] TEACHER: it's just a random function that is invoking.   {#502}
CTX| [00:37:13] TEACHER: It's very likely for this random function to pick the same seat in two different iterations.   {#503}
CTX| [00:37:19] TEACHER: Problem, right?   {#504}
CTX| [00:37:20] TEACHER: So that's where what we do is this is where now I'll start taking your opinions on this.   {#505}
CTX| [00:37:26] TEACHER: now now let's mimic all 120 people trying to book the exact like trying to book or trying to pick   {#506}
CTX| [00:37:38] TEACHER: seats at the same time so what i do is i'm mimicking concurrency over here so for example   {#507}
CTX| [00:37:46] TEACHER: look at this when my main function starts i'm simulating all 120 users coming into my system   {#508}
CTX| [00:37:54] TEACHER: at the exact same time and trying to book a seat. So what we are doing is for all the users that I   {#509}
CTX| [00:37:59] TEACHER: have, I'm triggering a goroutine. Goroutine is like a thread, like a thread which is running in its own   {#510}
