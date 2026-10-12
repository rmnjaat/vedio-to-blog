> **Student Question [02:49:59] - Student 3:** Suppose 120 threads, they went at the same time and for the first query, everybody will, but the database will, everybody will first wait for the first seat, right?

**[02:50:10] Teacher (answer):** Because that's what your database would not have to do it. Your database internally, when it reads, it does not just read one row. It reads one disk page, when this page may contain hundred rows. If it sees that first row is locked by someone, it can immediately move it. It doesn't have to do revaluate the query again.

**[02:50:26] Student 3:** Okay. So, so what I understand is the query that we wrote was limit one, right? Order by limit one. So when the, the, that, that read will happen, it will have only one row.

**[02:50:37] Teacher:** No, that's what I'm saying. That's what database internals is all about. It would not just read one row. Anytime when you read from the database, it does not just read one row. It reads one disk page, that one disk page, one B+ tree node may contain hundreds of rows.

**[02:50:51] Student 6:** Okay.

**[02:50:52] Teacher:** So it does not really have, it can just move to the next one. That's the beauty of it.

**[02:50:57] Student 3:** Then, then I could, we can say that only 120 evaluations will be triggered. Right. Yeah. And then I can, can I also say that I'm not sure about the internals, but can I also say that then the limit one that occurs in any query that we write, whenever we use the limit keyword, that occurs after the disk, we have read something.

**[02:51:19] Student?:** Perfect. [check: STUDENT_8 label (mixed); may be the Teacher evaluating the answer]

**[02:51:19] Teacher:** It happens at the last step when you are filtering it out.

**[02:51:23] Student 6:** Okay. Okay. Got it.

**[02:51:24] Teacher:** So it does not happen before, it happens at the end.

> **Student Question [02:51:28] - Student 3:** So ideally in case of skip locking, whenever we skip locking and we are using a limit, so we should not consider that as a part of the query. We should understand that the first where clause will read the entire disk page, whatever you're saying, and then the limit operation will occur and then it will enable us to limit

**[02:51:47] Teacher (answer):** [unclear: "operation Everest."] So limit and offset. So basically limit operation happens at the end, right? After that, so when you're, when he's accumulating the results, that's where limit operations comes in.

<!-- topic-candidate [02:51:58]: ORMs -->

> **Student Question [02:51:57] - Student 3:** Okay. Got it. Got it. Also one small thing on the, you just mentioned that you don't like ORMs. So could you give me a nudge about like, where to read why?

**[02:52:09] Teacher (answer):** Just Google search. Why ORMs are, why ORM sucks. You'll find tons of articles about it. Tons of articles. ORM does not generate. First of all, ORM does not generate optimal queries. [check: words may be lost before "hard you try"] Hard you try, ORM sucks at doing advanced SQL queries, they don't always generate optimal queries. Then third, it assumes a lot of stuff, it gives, makes your life simple, it gives you speed, but it takes away a lot of stuff, a lot of stuff. For example, if you'd want to just make a procedure call, you did an optimized query, you put it in a stored procedure, you want to invoke it. ORM, if you're writing SQL query, normal SQL query, firing it every time, that's how you do it with ORM. But you'd want to do an optimization and put it into a stored procedure and then invoke it. ORMs do not have a great support for that.

[02:52:56] It just, so ORMs handle, like ORMs are good for mid-scale. When you operate at high scale, when you want that micro-optimizations, when you want to take control of your SQL query creation, ORMs are the worst. So just Google about it, why ORMs sucks or why ORMs, why you should not use ORMs, you'll find tons of Hacker News articles about it. Like why you should not do that.

**[02:53:20] Student 6:** Okay.

**[02:53:20] Teacher:** And it's, and it saw that if you're a startup, you should use ORM. I use ORM day in and day out. But if I work at scale, I would not do that.

**[02:53:29] Student 3:** That is why I was asking because the, my company uses ORM heavily.

**[02:53:34] Teacher:** Startups have to use it, right? You cannot rely because people write stupid queries, but when you are talking about raw performance, ORM. [?Deprives | asr: "Devoits"] you from getting the raw performance because it cannot always create optimized queries. For example, it always has to select all the columns by default. Right. But then you have to explicitly write project and pick the columns that you need. The kind of complexity you get when you start getting performance out of ORM, that code itself becomes unreadable.

**[02:54:02] Student 3:** Yeah, that is true. Yeah.

**[02:54:03] Teacher:** You would feel like SQL query is more readable than your ORM junk. Well, if you're using Django, you'd heard [?prefetch related | asr: "prefetch reload"] and auto prefetch and whatnot, utter mess, same thing with [?Hibernate | asr: "hybrid"]. Right. You would be so much more comfortable when you look at a SQL query, doing that exact same thing. And plus you can use, plus ORMs are meant for specialized, like, sorry, they are meant for that particular database. Now, sorry, ORMs are meant for general use cases. Like you can use that same ORM for MySQL also, Postgres also and whatnot. But now, for example, if I want to leverage a particular query construct that only MySQL offers, ORM might not have support for that.

**[02:54:46] Student 6:** Yes.

**[02:54:46] Teacher:** Then I have to write a [?raw query | asr: "rock very far"] and then fire it. So that's a prepared statement works better when you want those special stuff. Out of it. It is.

**[02:54:55] Student 12:** Okay. Okay. Thank you. Thank you so much.

**[02:54:57] Teacher:** Plus one more point, connection pooling, or plus basically connection to use ORM. Suck at that also. [?I've had | asr: "I'm behind"] my fair share of problems with ORM.

**[02:55:07] Student 6:** Okay.

**[02:55:08] Teacher:** But I've been there, but a startup, early stage company, you have to do it. Don't over optimize on that because it would slow you down. Like they increase the shipping velocity that you need when you're at a early stage startup.

**[02:55:22] Student 12:** Okay. Thank you.

**[02:55:23] Teacher:** Hello.

**[02:55:27] Student 5:** Yeah. Hi.

> **Student Question [02:55:28] - Student?:** I have this question on this ORM thing. So if we are writing native queries in ORM when we need the bigger queries, so that sounds like a good compromise. [check: labelled STUDENT_1, but follows Student 5's "Hi" and Student 5 repeats the question at 02:55:44]

**[02:55:40] Teacher:** Yeah. So you said we are writing native queries. Yeah.

> **Student Question [02:55:44] - Student 5:** So does that sound like a good compromise?

**[02:55:47] Teacher (answer):** Yeah, 100%. Because when you want raw performance, ORMs don't give you raw performance. ORMs are not at scale. And when you need something very specific to a database, ORM gives you general operations. They don't give you specific operations. Plus readability takes a hit when you're writing complex queries. And imagine writing very complex queries requiring joins of 10 or 15 tables, doing bunch of aggregations there, normal transactional requirement. It's not, I'm not talking about even a data warehouse, you'd need that, you'd need that. So when you write an ORM based query of that, it becomes so unreadable, no one will be able to understand. But if you just write a normal SQL, it is so elegant, so simple to understand what exactly are you doing with that. So that's why.

**[~02:56:32] Student?:** Thanks, so this is also what I saw in

<!-- topic-candidate [02:56:41]: Java vs Golang (JVM) -->

**[02:56:39] Student 5:** And yeah, again, it is sensible. And I have a separate question on this Java and Golang, but I will park it at the end.

**[02:56:46] Teacher?:** No, no, go on, go on. Let the other questions. Go on, go on. [check: labelled STUDENT_5; reads like the Teacher telling the student to go ahead]

> **Student Question [02:56:49] - Student 5:** So you say you're not happy with Java, and I see you're writing Golang, and I do not know Golang, but I use Kotlin. In Kotlin, we have coroutines. We write suspend functions in them. They're a little bit different from Java synchronization. I was just curious. Do you know about this Kotlin coroutines and Golang coroutines? Are they similar?

**[02:57:09] Teacher (answer):** Idea about JVM stack. I'm far away from JVM. I just write bare minimum that I have to. Sorry. I just write bare minimum that I have to at my job in Java. Otherwise everything is Python, Golang. That's it. Or C++.

> **Student Question [02:57:25] - Student 5:** I'm very interested in knowing about that. Why are you not interested in JVM and favoring Golang and Python? I might have some idea, but then I still want to.

**[02:57:35] Teacher (answer):** I feel people have abused Java. Unfortunately, just abstracting out every day and I'm, I have very strong opinions about it because I like readable code. Java gives me zero readability, automatically things happen in that, [?bean injection | asr: "being injection"] and this and that. I like sequential flow of code. C++, Golang, Python gives me that. Golang gives me concurrency much better than what Java gives me. I'm more happy with Golang any day. I, if you throw in Java code base, it's like, it's like a labyrinth for me, which I can never solve.

**[02:58:09] Student 5:** So for you, the problem is that the more verbosity and the boilerplate kind of code, which this Spring like frameworks generate.

**[02:58:21] Teacher:** Yeah. Unnecessary like dynamic injection, singleton injection and whatnot. Why just write a SQL in it, like just invoke the function. Now I don't want to automatically inject everything. So I don't like that. I don't like that.

**[02:58:34] Student 5:** So we have basically a microservice-based setup. And in this, so in one project, we were using Vert.x instead of Spring. And there the reasoning was really simple that Vert.x will give you very fine-grained control as compared to Spring Boot, which again gives you a high velocity in starting up, but then later on it becomes boilerplate-y. And yeah, so I get the same discussion. Your reason of favoring Golang in Python is because of this leanness.

**[02:59:10] Teacher:** Plus speed also, plus concurrency benefits. Golang concurrency is so much better than Java, plus garbage collection. Golang spends bare minimum amount in garbage collection. It's so optimized. Java JVM, you spin up something, it takes up 200 MB, either 200 MB, I can run an entire startup. Right.

**[02:59:31] Student 1:** Huge difference. Old language.

**[02:59:33] Teacher:** So I have had very poor experience with Java. I know people say a lot, like when I posted something similar on LinkedIn, people jumped on me. Just look at FizzBuzz test Enterprise Edition. GitHub search. Just search. By the way, folks, if you are not aware, just search FizzBuzz test Enterprise Edition and you will see what I mean there. It's a simple code and you have to write FizzBuzz test.

**[~03:00:01] Student 5:** Fizz, Buzz.

**[03:00:03] Teacher:** Yeah, Fizz, Buzz. FizzBuzz test, Enterprise Edition. You'll see how people mess up with Java. Unnecessary classes and this and that. Assuming everything will be extended. Nothing. You'd never need it. You'd think, oh my God, I need to change my database. Oh my God, I'll need to change this logic. You'd never need it. But you just be yourself prepared. But I know where it comes from. Years where you make something survive for more than two decades, this is what gonna happen. Same thing will happen with Golang. I'm not saying Golang is the best. Same thing will happen with, 10 years [unclear: "from the run"] I'll still be dreaming about Golang then, right? Same thing will happen with Rust.

**[03:00:42] Student 5:** Also, I'm, I'm currently personally very happy with Kotlin because it, this improves on Java conciseness.

**[03:00:52] Student 1:** But yeah, again, so this is, see.

**[03:00:55] Teacher:** So everyone starts with something fresh, then over time it messes up, people move to something new. Same thing happened with JavaScript, TypeScript. People move to TypeScript. After something, TypeScript will also become messy, then something new will come up.

**[03:01:08] Student 15:** Right, it's already getting messy. Yeah.

**[03:01:12] Teacher:** So that's, that's the circle of life when it comes to programming languages. Either a language die as a hero or live long enough to become an enterprise version of code. I think that's a good one. Okay, thanks. Yeah, so, Simran?

<!-- topic-candidate [03:01:30]: Q&A - upsert vs select top one -->

> **Student Question [03:01:30] - Student 1:** Yeah, so, I have a question regarding upsert. So, there we were saying that we have to use it because we don't have to do two operations, first to read and then to update. But I have seen in some of the production system that we use top 1 1 and basically check the records and then do a update kind of a thing if that satisfies the condition. So does top 1 1 also, like, what is top 1 1? Like, it returns one if the record is present, else it returns false. Top 1 1, yeah, select top 1 1. [check: Teacher calls "Simran" just before; STUDENT_1 is Rahul elsewhere - diarization may mix students]
