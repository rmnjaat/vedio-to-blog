# chunk_15  OWNS 02:49:59 -> 03:02:13  (segments #2675-#2950, 2125 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:49:01] TEACHER: Evaluation of queries.   {#2657}
CTX| [02:49:03] TEACHER: from RN would still fire inquiries internally database will evaluate those.   {#2658}
CTX| [02:49:08] STUDENT_3: Yeah. So basically what happened is suppose 120 threads and all of them at the same time got   {#2659}
CTX| [02:49:13] STUDENT_3: the seat one. And you told us that the, that one of the thread will get the execution where we'll,   {#2660}
CTX| [02:49:21] STUDENT_3: we'll be faster than the others and it will get the first seat and the database will then trigger   {#2661}
CTX| [02:49:24] STUDENT_3: the other thread that the row one is filled because they were waiting for the seat one.   {#2662}
CTX| [02:49:29] STUDENT_3: and then the database will trigger that the row one is filled.   {#2663}
CTX| [02:49:32] STUDENT_3: Now they will reevaluate the query.   {#2664}
CTX| [02:49:34] STUDENT_3: The database internally will reevaluate the query.   {#2665}
CTX| [02:49:37] STUDENT_3: And that is why you set that N into N plus one by two queries.   {#2666}
CTX| [02:49:40] STUDENT_3: Correct.   {#2667}
CTX| [02:49:40] STUDENT_3: Correct.   {#2668}
CTX| [02:49:40] STUDENT_3: Because for the next 119 seats, now the locking will happen on the seat two.   {#2669}
CTX| [02:49:46] STUDENT_3: And then all the, all of them will wait for the seat two and then 118 will wait.   {#2670}
CTX| [02:49:50] STUDENT_8: One would move forward.   {#2671}
CTX| [02:49:52] STUDENT_8: Yeah.   {#2672}
CTX| [02:49:52] STUDENT_3: So on and so forth for the subsequent queries, but for the four updates,   {#2673}
CTX| [02:49:57] STUDENT_3: skip logged.   {#2674}

---- OWNED SEGMENTS START ----
[02:49:59] STUDENT_3: Suppose 120 threads, they went at the same time and for the first query,   {#2675}
[02:50:04] STUDENT_3: everybody will, uh, but the database will, everybody will first wait for the first   {#2676}
[02:50:08] STUDENT_3: seat, right?   {#2677}
[02:50:10] TEACHER: Because that's what your database would not have to do it.   {#2678}
[02:50:14] TEACHER: Your database internally, when it reads, it does not just read one row.   {#2679}
[02:50:17] TEACHER: It reads one dispatch when this page may content hundred rows.   {#2680}
[02:50:20] TEACHER: If it sees that first row is locked by someone, it can immediately move it.   {#2681}
[02:50:24] TEACHER: It doesn't have to do revaluate the query again.   {#2682}
[02:50:26] STUDENT_3: Okay.   {#2683}
[02:50:27] STUDENT_3: So, so what I understand is the query that we wrote was limit one, right?   {#2684}
[02:50:31] STUDENT_3: Order by limit one.   {#2685}
[02:50:33] STUDENT_3: So when the, the, that, that read will happen, it will have only one row.   {#2686}
[02:50:37] TEACHER: No, that's what I'm saying.   {#2687}
[02:50:39] TEACHER: That's what database intervals is all about.   {#2688}
[02:50:41] TEACHER: It would not just read one row.   {#2689}
[02:50:42] TEACHER: Anytime when you read from the database, it does not just read one row.   {#2690}
[02:50:46] TEACHER: It reads one display that one disk page one B plus three node may contain hundreds of   {#2691}
[02:50:50] TEACHER: rows.   {#2692}
[02:50:51] STUDENT_6: Okay.   {#2693}
[02:50:52] TEACHER: So it does not really have, it can just move to the next one.   {#2694}
[02:50:56] TEACHER: That's the beauty of it.   {#2695}
[02:50:57] STUDENT_3: Then, then I could, we can say that only one 20 evaluations will be triggered.   {#2696}
[02:51:02] STUDENT_3: Right.   {#2697}
[02:51:02] STUDENT_3: Yeah.   {#2698}
[02:51:03] STUDENT_3: And then I can, can I also say that I'm not sure about the internals, but can I also say   {#2699}
[02:51:07] STUDENT_3: that then the limit one that occurs in any query that we write, whenever we use the limit   {#2700}
[02:51:14] STUDENT_3: keyword that occurs after the disc, we have read something.   {#2701}
[02:51:19] STUDENT_8: Perfect.   {#2702}
[02:51:19] TEACHER: It happens at the last step when you are filtering it out.   {#2703}
[02:51:23] STUDENT_6: Okay.   {#2704}
[02:51:24] STUDENT_6: Okay.   {#2705}
[02:51:24] STUDENT_6: Got it.   {#2706}
[02:51:24] TEACHER: So it does not happen before it happens at the end.   {#2707}
[02:51:28] STUDENT_3: So ideally in case of skip blocking, whenever we skip   {#2708}
[02:51:31] STUDENT_3: blocking and we are using a limit, so we should not consider   {#2709}
[02:51:35] STUDENT_3: that as a part of the query.   {#2710}
[02:51:36] STUDENT_3: We should understand that the first where clause will, uh, read   {#2711}
[02:51:41] STUDENT_3: the entire disk page, whatever you're saying, and then the limit   {#2712}
[02:51:44] STUDENT_3: operation will occur and then it will enable us to limit   {#2713}
[02:51:47] TEACHER: operation Everest.   {#2714}
[02:51:48] TEACHER: So limit and offset.   {#2715}
[02:51:49] TEACHER: So basically limit operation happens at the end, right?   {#2716}
[02:51:52] TEACHER: After that, so when you're when he's accumulating the results, that's where limit operations   {#2717}
[02:51:56] TEACHER: comes in.   {#2718}
[02:51:57] STUDENT_3: Okay.   {#2719}
[02:51:58] STUDENT_3: Got it.   {#2720}
[02:51:58] STUDENT_3: Got it.   {#2721}
[02:51:58] STUDENT_3: Also one small thing on the, you just mentioned that you don't like ORMs.   {#2722}
[02:52:03] STUDENT_3: So could you give me a nudge about like, uh, where to read why?   {#2723}
[02:52:09] TEACHER: Just Google search.   {#2724}
[02:52:11] TEACHER: Why ORMs are why ORM sucks.   {#2725}
[02:52:14] TEACHER: You'll find tons of articles about it.   {#2726}
[02:52:17] TEACHER: Tons of articles.   {#2727}
[02:52:18] TEACHER: ORM does not generate.   {#2728}
[02:52:19] TEACHER: First of all, ORM does not generate optimal queries.   {#2729}
[02:52:22] TEACHER: hard you try ORM sucks at doing advanced SQL queries they don't always generate optimal queries   {#2730}
[02:52:29] TEACHER: then third it assumes a lot of stuff it gives makes your life simple it gives you speed but   {#2731}
[02:52:34] TEACHER: it takes away a lot of stuff a lot of stuff for example if you'd want to just make a procedure call   {#2732}
[02:52:39] TEACHER: you did an optimized query you put it in a stored procedure you want to invoke it ORM if you're   {#2733}
[02:52:44] TEACHER: writing SQL query normal SQL query firing it every time that's how you do it with ORM but you'd want   {#2734}
[02:52:50] TEACHER: to do an optimization and put it into a stored procedure and then invoke it.   {#2735}
[02:52:54] TEACHER: ORMs do not have a great support for that.   {#2736}
[02:52:56] TEACHER: It just, so ORMs handle, like ORMs are good for mid-scale.   {#2737}
[02:53:01] TEACHER: When you operate at high scale, when you want that micro-optimizations,   {#2738}
[02:53:05] TEACHER: when you want to take control of your SQL query creation, ORMs are the worst.   {#2739}
[02:53:09] TEACHER: So just Google about it, why ORMs sucks or why ORMs,   {#2740}
[02:53:13] TEACHER: why you should not use ORMs, you'll find tons of hacker news articles about it.   {#2741}
[02:53:18] TEACHER: Like why you should not do that.   {#2742}
[02:53:20] STUDENT_6: Okay.   {#2743}
[02:53:20] TEACHER: And it's, and it saw that if you're a startup, you should use ORM.   {#2744}
[02:53:23] TEACHER: I use ORM day in and day out.   {#2745}
[02:53:27] TEACHER: But if I work at scale, I would not do that.   {#2746}
[02:53:29] STUDENT_3: That is why I was asking because the, my company uses ORM heavily.   {#2747}
[02:53:34] TEACHER: Startups have to use it, right?   {#2748}
[02:53:35] TEACHER: You cannot rely because people write stupid queries, but when you are talking   {#2749}
[02:53:39] TEACHER: about raw performance, ORM.   {#2750}
[02:53:41] TEACHER: Devoits you from getting the draw performance because it cannot always   {#2751}
[02:53:45] TEACHER: create optimized queries.   {#2752}
[02:53:46] TEACHER: For example, it always has to select all the columns by default.   {#2753}
[02:53:50] TEACHER: Right.   {#2754}
[02:53:51] TEACHER: But then you have to explicitly write project and pick the columns that you need.   {#2755}
[02:53:54] TEACHER: The kind of complexity you get when you start getting performance out of   {#2756}
[02:53:59] TEACHER: ORM that code itself becomes unreadable.   {#2757}
[02:54:02] STUDENT_3: Yeah, that is true.   {#2758}
[02:54:03] STUDENT_3: Yeah.   {#2759}
[02:54:03] TEACHER: You would feel like SQL query is more readable than your ORM junk.   {#2760}
[02:54:06] TEACHER: Well, if you're using Django, you'd heard prefetch reload and auto prefetch and   {#2761}
[02:54:10] TEACHER: whatnot utter mess, same thing with hybrid.   {#2762}
[02:54:13] TEACHER: Right.   {#2763}
[02:54:16] TEACHER: you would be so much more comfortable when you look at a SQL query,   {#2764}
[02:54:20] TEACHER: doing that exact same thing.   {#2765}
[02:54:22] TEACHER: And plus you can use, plus ORMs are meant for specialized,   {#2766}
[02:54:28] TEACHER: like, sorry, they are meant for that particular database.   {#2767}
[02:54:31] TEACHER: Now, sorry, ORMs are meant for general use cases.   {#2768}
[02:54:35] TEACHER: Like you can use that same ORM for MySQL also, Postgres also and whatnot.   {#2769}
[02:54:38] TEACHER: But now, for example, if I want to leverage a particular query construct   {#2770}
[02:54:42] TEACHER: that only MySQL offers, ORM might not have support for that.   {#2771}
[02:54:46] STUDENT_6: Yes.   {#2772}
[02:54:46] TEACHER: Then I have to write a rock very far and then fire it.   {#2773}
[02:54:49] TEACHER: So that's a prepared statement works better when you want those special stuff.   {#2774}
[02:54:54] TEACHER: Out of it.   {#2775}
[02:54:55] TEACHER: It is.   {#2776}
[02:54:55] STUDENT_12: Okay.   {#2777}
[02:54:56] STUDENT_12: Okay.   {#2778}
[02:54:56] STUDENT_12: Thank you.   {#2779}
[02:54:56] STUDENT_12: Thank you so much.   {#2780}
[02:54:57] TEACHER: Plus one more point connection pooling or plus basically connection to use ORF.   {#2781}
[02:55:01] TEACHER: Suck at that also.   {#2782}
[02:55:03] TEACHER: I'm behind my pair share of problems with ORF.   {#2783}
[02:55:07] STUDENT_6: Okay.   {#2784}
[02:55:08] TEACHER: But I've been there, but a startup early stage company, you have to do it.   {#2785}
[02:55:11] TEACHER: Don't over optimize on that because it would slow you down.   {#2786}
[02:55:16] TEACHER: like they increase the shipping velocity that you need when you're at a early sales startup.   {#2787}
[02:55:22] STUDENT_12: Okay.   {#2788}
[02:55:23] STUDENT_12: Thank you.   {#2789}
[02:55:23] TEACHER: Hello.   {#2790}
[02:55:27] STUDENT_5: Yeah.   {#2791}
[02:55:28] STUDENT_5: Hi.   {#2792}
[02:55:28] STUDENT_1: I have this question on this ORM thing.   {#2793}
[02:55:30] STUDENT_1: So if we are writing native queries in ORM when we need the bigger queries, so that sounds   {#2794}
[02:55:36] STUDENT_1: like a good compromise.   {#2795}
[02:55:40] TEACHER: Yeah.   {#2796}
[02:55:41] TEACHER: So you said we are writing native queries.   {#2797}
[02:55:43] TEACHER: Yeah.   {#2798}
[02:55:44] STUDENT_5: So does that sound like a good compromise?   {#2799}
[02:55:47] TEACHER: Yeah, 100%.   {#2800}
[02:55:49] TEACHER: Because when you want raw performance, ORMs don't give you raw performance.   {#2801}
[02:55:56] TEACHER: ORMs are not at scale.   {#2802}
[02:55:58] TEACHER: And when you need something very specific to a database, ORM gives you general operations.   {#2803}
[02:56:04] TEACHER: They don't give you specific operations.   {#2804}
[02:56:05] TEACHER: Plus readability takes a hit when you're writing complex queries.   {#2805}
[02:56:10] TEACHER: and imagine writing very complex queries requiring joints of 10 or 15 tables doing bunch of   {#2806}
[02:56:15] TEACHER: aggregations there normal transactional requirement it's not i'm not talking about even a data warehouse   {#2807}
[02:56:20] TEACHER: you'd need that you'd need that so when you write an orm based query of that it becomes so unreadable   {#2808}
[02:56:26] TEACHER: no one will be able to understand but if you just write a normal sql it is so elegant so simple to   {#2809}
[02:56:32] TEACHER: understand what exactly are you doing with that so that's why thanks so this is also what i saw in   {#2810}
[02:56:39] STUDENT_5: And yeah, again, it is sensible.   {#2811}
[02:56:41] STUDENT_5: And I have a separate question on this Java and Golang,   {#2812}
[02:56:44] STUDENT_5: but I will park it at the end.   {#2813}
[02:56:46] STUDENT_5: No, no, go on, go on.   {#2814}
[02:56:47] STUDENT_5: Let the other questions.   {#2815}
[02:56:48] STUDENT_5: Go on, go on.   {#2816}
[02:56:49] STUDENT_5: So you say you're not happy with Java,   {#2817}
[02:56:51] STUDENT_5: and I see you're writing Golang,   {#2818}
[02:56:53] STUDENT_5: and I do not know Golang,   {#2819}
[02:56:56] STUDENT_5: but I use Kotlin.   {#2820}
[02:56:57] STUDENT_5: In Kotlin, we have coroutines.   {#2821}
[02:56:58] STUDENT_5: We write suspend functions in them.   {#2822}
[02:57:00] STUDENT_5: They're a little bit different from Java synchronization.   {#2823}
[02:57:03] STUDENT_5: I was just curious.   {#2824}
[02:57:04] STUDENT_5: Do you know about this Kotlin coroutines   {#2825}
[02:57:06] STUDENT_5: and Golang coroutines?   {#2826}
[02:57:07] STUDENT_5: Are they similar?   {#2827}
[02:57:09] STUDENT_8: idea about JVM stack.   {#2828}
[02:57:10] STUDENT_8: I'm far away from JVM.   {#2829}
[02:57:13] TEACHER: I just write bare minimum that I have to.   {#2830}
[02:57:17] TEACHER: Sorry.   {#2831}
[02:57:17] TEACHER: I just write bare minimum that I have to at my job in Java.   {#2832}
[02:57:20] TEACHER: Otherwise everything is Python, Golang.   {#2833}
[02:57:22] TEACHER: That's it.   {#2834}
[02:57:23] TEACHER: Or C++.   {#2835}
[02:57:25] STUDENT_5: I'm very interested in knowing about that.   {#2836}
[02:57:27] STUDENT_5: Why are you not interested in JVM and favoring Golang and Python?   {#2837}
[02:57:32] STUDENT_5: I might have some idea, but then I still want to.   {#2838}
[02:57:35] TEACHER: I feel people have abused Java.   {#2839}
[02:57:39] TEACHER: Unfortunately, just abstracting out every day and I'm, I have very strong   {#2840}
[02:57:44] TEACHER: opinions about it because I like readable code.   {#2841}
[02:57:46] TEACHER: Java gives me zero readability automatically things happen in that   {#2842}
[02:57:49] TEACHER: being injection and this and that I like sequential flow of code C++   {#2843}
[02:57:54] TEACHER: Golang Python gives me that Golang gives me concurrency much better   {#2844}
[02:57:58] TEACHER: than what Java gives me.   {#2845}
[02:58:00] TEACHER: I'm more happy with Golang any day.   {#2846}
[02:58:03] TEACHER: I, if you throw in Java code base, it's like, it's like a labyrinth   {#2847}
[02:58:07] TEACHER: for me, which I can never solve.   {#2848}
[02:58:09] STUDENT_5: So for you, the problem is that the more verbosity and the boilerplate kind of code, which this   {#2849}
[02:58:18] STUDENT_5: spring like frameworks generate.   {#2850}
[02:58:21] TEACHER: Yeah.   {#2851}
[02:58:22] TEACHER: Unnecessary like dynamic injection, singleton injection and whatnot.   {#2852}
[02:58:25] TEACHER: Why just write a SQL in it, like just invoke the function.   {#2853}
[02:58:28] TEACHER: Now I don't want to automatically inject everything.   {#2854}
[02:58:32] TEACHER: So I don't like that.   {#2855}
[02:58:34] TEACHER: I don't like that.   {#2856}
[02:58:34] STUDENT_5: So we have basically a microservice-based setup.   {#2857}
[02:58:37] STUDENT_5: And in this, so in one project,   {#2858}
[02:58:40] STUDENT_5: we were using Vertex instead of Spring.   {#2859}
[02:58:45] STUDENT_5: And there the reasoning was really simple   {#2860}
[02:58:49] STUDENT_5: that Vertex will give you very fine-grained control   {#2861}
[02:58:51] STUDENT_5: as compared to Spring Boot,   {#2862}
[02:58:54] STUDENT_1: which again gives you a high velocity in starting up,   {#2863}
[02:58:58] STUDENT_1: but then later on it becomes boilerplate-y.   {#2864}
[02:59:00] STUDENT_5: And yeah, so I get the same discussion.   {#2865}
[02:59:04] STUDENT_5: Your reason of favoring Golang in Python is because of this leanness.   {#2866}
[02:59:10] TEACHER: Plus speed also plus concurrency benefits.   {#2867}
[02:59:13] TEACHER: Golang concurrency is so much better than Java plus garbage collection.   {#2868}
[02:59:18] TEACHER: Golang spends bare minimum amount in garbage collection.   {#2869}
[02:59:21] TEACHER: It's so optimized Java JBM, you spin up something.   {#2870}
[02:59:25] TEACHER: It takes up 200 MP, either 200 MP, I can run an entire startup.   {#2871}
[02:59:30] TEACHER: Right.   {#2872}
[02:59:31] STUDENT_1: Huge difference.   {#2873}
[02:59:32] STUDENT_1: old language.   {#2874}
[02:59:33] TEACHER: So I have   {#2875}
[02:59:35] TEACHER: had very poor experience with Java.   {#2876}
[02:59:38] TEACHER: I know people   {#2877}
[02:59:39] TEACHER: say a lot like when I posted something   {#2878}
[02:59:42] TEACHER: similar on LinkedIn, people   {#2879}
[02:59:43] TEACHER: jumped on me.   {#2880}
[02:59:44] TEACHER: Just look at FizBus test   {#2881}
[02:59:47] TEACHER: Enterprise Edition. GitHub search.   {#2882}
[02:59:50] TEACHER: Just search.   {#2883}
[02:59:51] TEACHER: By the way, folks, if you are not aware, just search   {#2884}
[02:59:53] TEACHER: FizBus test Enterprise Edition   {#2885}
[02:59:55] TEACHER: and you will see what I mean there.   {#2886}
[02:59:57] TEACHER: It's a simple code and you have to write   {#2887}
[02:59:59] TEACHER: FizBus test.   {#2888}
[03:00:02] STUDENT_5: FIZZ, BUZZ.   {#2889}
[03:00:03] TEACHER: Yeah, FIZZ, BUZZ.   {#2890}
[03:00:06] TEACHER: Fizbus test, Enterprise Edition.   {#2891}
[03:00:08] TEACHER: You'll see how people mess up with Java.   {#2892}
[03:00:11] TEACHER: Unnecessary classes and this and that.   {#2893}
[03:00:13] TEACHER: Assuming everything will be extended.   {#2894}
[03:00:16] TEACHER: Nothing.   {#2895}
[03:00:17] TEACHER: You'd never need it.   {#2896}
[03:00:18] TEACHER: You'd think, oh my God, I need to change my database.   {#2897}
[03:00:21] TEACHER: Oh my God, I'll need to change this logic.   {#2898}
[03:00:22] TEACHER: You'd never need it.   {#2899}
[03:00:23] TEACHER: But you just be yourself prepared.   {#2900}
[03:00:25] TEACHER: But I know where it comes from.   {#2901}
[03:00:27] TEACHER: years where you make something survive for more than two decades this is what gonna happen same   {#2902}
[03:00:33] TEACHER: thing will happen with golang i'm not saying golang is the best same thing will happen with   {#2903}
[03:00:36] TEACHER: 10 years from the run i'll still be dreaming about golang then right same thing will happen with rust   {#2904}
[03:00:42] STUDENT_5: also i'm i'm currently personally very happy with kotlin because it this improves on java   {#2905}
[03:00:52] STUDENT_5: conciseness   {#2906}
[03:00:52] STUDENT_1: but yeah again   {#2907}
[03:00:54] STUDENT_1: so this is   {#2908}
[03:00:54] STUDENT_1: see   {#2909}
[03:00:55] TEACHER: so everyone   {#2910}
[03:00:56] TEACHER: starts with   {#2911}
[03:00:57] TEACHER: something fresh   {#2912}
[03:00:58] TEACHER: then over time   {#2913}
[03:00:59] TEACHER: it messes up   {#2914}
[03:01:00] TEACHER: people move to   {#2915}
[03:01:01] TEACHER: something new   {#2916}
[03:01:01] TEACHER: same thing   {#2917}
[03:01:02] TEACHER: happened with   {#2918}
[03:01:02] TEACHER: javascript   {#2919}
[03:01:03] TEACHER: typescript   {#2920}
[03:01:03] TEACHER: people move to   {#2921}
[03:01:04] TEACHER: typescript   {#2922}
[03:01:05] TEACHER: after something   {#2923}
[03:01:06] TEACHER: typescript will   {#2924}
[03:01:06] TEACHER: also become messy   {#2925}
[03:01:07] TEACHER: then something new   {#2926}
[03:01:08] TEACHER: will come up   {#2927}
[03:01:08] STUDENT_15: right   {#2928}
[03:01:09] STUDENT_15: it's already   {#2929}
[03:01:09] STUDENT_15: getting messy   {#2930}
[03:01:11] STUDENT_15: yeah   {#2931}
[03:01:12] TEACHER: so that's   {#2932}
[03:01:13] TEACHER: that's the circle   {#2933}
[03:01:14] TEACHER: of life   {#2934}
[03:01:14] TEACHER: when it comes to   {#2935}
[03:01:15] TEACHER: programming languages   {#2936}
[03:01:16] TEACHER: either a language   {#2937}
[03:01:18] TEACHER: die as a hero   {#2938}
[03:01:19] TEACHER: or live long enough to become an enterprise version of code.   {#2939}
[03:01:23] TEACHER: I think that's a good one.   {#2940}
[03:01:25] TEACHER: Okay, thanks.   {#2941}
[03:01:28] TEACHER: Yeah, so, Simran?   {#2942}
[03:01:30] STUDENT_1: Yeah, so, I have a question regarding Upset.   {#2943}
[03:01:34] STUDENT_1: So, there we were saying that we have to use it   {#2944}
[03:01:37] STUDENT_1: because we don't have to do two operations,   {#2945}
[03:01:40] STUDENT_1: first to read and then to update.   {#2946}
[03:01:42] STUDENT_1: But I have seen in some of the production system   {#2947}
[03:01:46] STUDENT_1: that we use top11 and basically check the records and then do a update kind of a thing   {#2948}
[03:01:53] STUDENT_1: if that satisfies the condition so does top11 also like what is top11 like it returns one   {#2949}
[03:02:01] STUDENT_1: if the record is present else it returns uh false top 11 yeah select top 11   {#2950}
---- OWNED SEGMENTS END ----

CTX| [03:02:13] TEACHER: belt and select top one, one in SQL.   {#2951}
CTX| [03:02:16] TEACHER: Oh, depends between top one, one select one.   {#2952}
CTX| [03:02:21] TEACHER: Okay.   {#2953}
CTX| [03:02:22] TEACHER: Uh, I've never, so select top one.   {#2954}
CTX| [03:02:25] TEACHER: It is.   {#2955}
CTX| [03:02:26] TEACHER: Do you also provide a very close in that?   {#2956}
CTX| [03:02:29] TEACHER: Fair.   {#2957}
CTX| [03:02:29] TEACHER: Okay.   {#2958}
CTX| [03:02:29] TEACHER: Select top one, one.   {#2959}
CTX| [03:02:30] TEACHER: Oh, okay.   {#2960}
CTX| [03:02:32] TEACHER: Okay.   {#2961}
CTX| [03:02:32] TEACHER: Okay.   {#2962}
CTX| [03:02:32] TEACHER: So it just picking me selecting the very first record in the results.   {#2963}
CTX| [03:02:36] TEACHER: That means one.   {#2964}
CTX| [03:02:37] TEACHER: Oh, okay.   {#2965}
CTX| [03:02:39] TEACHER: the result the row you are just resulting you are just returning one in case the row exists kind of   {#2966}
CTX| [03:02:44] TEACHER: stuff yeah yeah okay so with that what you'll achieve so select top one one from this table   {#2967}
CTX| [03:02:50] TEACHER: where some condition so this way you check for the existence right and then if it exists you do   {#2968}
CTX| [03:02:56] TEACHER: something if it doesn't exist you do something else yeah yeah basically update operation after   {#2969}
CTX| [03:03:01] STUDENT_1: just checking that so i was thinking like uh like what why absurd was not used there and why we are   {#2970}
CTX| [03:03:09] TEACHER: That is that to your developer, your, your engineers might tell you better, but one disadvantage   {#2971}
