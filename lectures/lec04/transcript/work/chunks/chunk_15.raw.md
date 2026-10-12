# chunk_15  OWNS 02:45:51 -> 02:59:03  (segments #2693-#2938, 2321 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:44:52] STUDENT_3: Okay.   {#2675}
CTX| [02:44:53] STUDENT_3: So my question is about, uh, about the implementation of that.   {#2676}
CTX| [02:44:57] STUDENT_3: Like, how is it, is it doing?   {#2677}
CTX| [02:45:00] TEACHER: We will discuss this.   {#2678}
CTX| [02:45:01] TEACHER: We'll discuss this in third week.   {#2679}
CTX| [02:45:02] TEACHER: When we design cache, we'll have this discussion on this.   {#2680}
CTX| [02:45:05] TEACHER: How, how, how, how TTL happens.   {#2681}
CTX| [02:45:07] TEACHER: We'll have this discussion third week.   {#2682}
CTX| [02:45:09] STUDENT_5: Sure.   {#2683}
CTX| [02:45:12] TEACHER: Surya.   {#2684}
CTX| [02:45:13] STUDENT_5: Yeah.   {#2685}
CTX| [02:45:14] STUDENT_5: Uh, I have a question around, uh, um, around the index, how database   {#2686}
CTX| [02:45:20] STUDENT_5: index length. Does it, I was under the impression that it always stores on the disc and it,   {#2687}
CTX| [02:45:26] STUDENT_5: I mean, yes, does it ever store on Ram as well permanently?   {#2688}
CTX| [02:45:30] TEACHER: Ram? No permanent is always this always, always, always, always. I have a video on it on my   {#2689}
CTX| [02:45:36] STUDENT_1: YouTube. What's that? How database, how indexes make database read faster. It will come in   {#2690}
CTX| [02:45:40] TEACHER: pre-reads for the next week also. So what's that video? You'll understand what, how it   {#2691}
CTX| [02:45:44] TEACHER: happens. Okay.   {#2692}

---- OWNED SEGMENTS START ----
[02:45:51] STUDENT_2: I just wanted to ask this soft delete and archival the same thing.   {#2693}
[02:45:57] STUDENT_1: No soft delete allows you to archive.   {#2694}
[02:46:02] STUDENT_2: Okay.   {#2695}
[02:46:03] STUDENT_1: Because if you do hard delete you don't have time to archive.   {#2696}
[02:46:07] STUDENT_1: Right.   {#2697}
[02:46:08] STUDENT_2: Okay.   {#2698}
[02:46:09] STUDENT_2: So like it happens to be like in one of our project, I don't remember exactly, but they   {#2699}
[02:46:14] STUDENT_2: were proposing to have soft delete as well as archival.   {#2700}
[02:46:17] STUDENT_1: So soft delete, you need soft delete so that you can archive after like you can   {#2701}
[02:46:21] STUDENT_1: archive after a day or so, right?   {#2702}
[02:46:23] STUDENT_1: Because imagine you are doing hard delete and immediately copying it on S3.   {#2703}
[02:46:27] STUDENT_1: How slow would that be?   {#2704}
[02:46:28] STUDENT_1: Correct.   {#2705}
[02:46:30] STUDENT_1: So which is where, which is where soft delete would allow you to do archival because you   {#2706}
[02:46:36] TEACHER: would have time to collect all the soft deleted rows and put it into different   {#2707}
[02:46:39] TEACHER: ways and then do hard delete from here.   {#2708}
[02:46:42] TEACHER: Okay.   {#2709}
[02:46:43] TEACHER: Got it.   {#2710}
[02:46:43] TEACHER: Got it.   {#2711}
[02:46:44] TEACHER: DK.   {#2712}
[02:46:47] TEACHER: So in our online and offline problem, we actually, the way we started is, see, whenever we talk about Redis, we generally talk in terms of that, you know, we want to cache something.   {#2713}
[02:47:00] TEACHER: I mean, that's just a general tendency.   {#2714}
[02:47:02] TEACHER: But the way we have started a solution, we have proposed either DynamiteDB or Redis as the mainstream database for, you know, that solution.   {#2715}
[02:47:12] TEACHER: Why we just started with that?   {#2716}
[02:47:13] TEACHER: I mean, instead of, you know, proposing a database and then coming to the cash part   {#2717}
[02:47:17] TEACHER: of it, we directly propose.   {#2718}
[02:47:19] STUDENT_1: I use Redis as a primary DVO worker.   {#2719}
[02:47:22] STUDENT_1: Why not?   {#2720}
[02:47:24] TEACHER: So like, it's like a trade-off that whether we want to persist that data or not, because   {#2721}
[02:47:28] TEACHER: see in Redis, we can persist the data, we can persist the data, but there's a possibility.   {#2722}
[02:47:32] TEACHER: We don't want to persist that data.   {#2723}
[02:47:34] TEACHER: So, so it depends that if we want to persist that data, I mean, I'm not able to, you know,   {#2724}
[02:47:42] STUDENT_1: clearly defined. There is no problem in that you are on the right, right. You've got all   {#2725}
[02:47:46] STUDENT_1: the points checked. Now, depending on the guarantees that your system would need to   {#2726}
[02:47:49] TEACHER: provide you pick one over the other. Right. Okay. So it depends on the guarantees. What   {#2727}
[02:47:54] TEACHER: kind of guarantees I'm looking for based on that, whether I need some primary database   {#2728}
[02:47:59] TEACHER: and top of, and on top of that, we should we add redis or should we just go with the   {#2729}
[02:48:04] TEACHER: redis? Yeah. All depends on the guarantees. That's what you're saying. So I'm using redis   {#2730}
[02:48:09] STUDENT_1: has my primary DB.   {#2731}
[02:48:09] STUDENT_1: There is no harm in that.   {#2732}
[02:48:10] STUDENT_1: I can just configure AI based persistence on Redis and I'll get on this   {#2733}
[02:48:14] STUDENT_1: persistence for that.   {#2734}
[02:48:15] STUDENT_1: Right.   {#2735}
[02:48:16] STUDENT_1: There will be zero data loss.   {#2736}
[02:48:17] STUDENT_1: Right.   {#2737}
[02:48:17] STUDENT_1: But I'll get speed.   {#2738}
[02:48:18] STUDENT_1: I have enough.   {#2739}
[02:48:19] TEACHER: I have small enough data only 8 GB so I can store it in RAM.   {#2740}
[02:48:23] TEACHER: Right.   {#2741}
[02:48:24] TEACHER: So there is no, no reason for me to not use Redis.   {#2742}
[02:48:28] TEACHER: Got it.   {#2743}
[02:48:29] TEACHER: That's why.   {#2744}
[02:48:30] TEACHER: Okay.   {#2745}
[02:48:30] TEACHER: And it just being open.   {#2746}
[02:48:32] STUDENT_1: It's an, which is where this hard stereotypes that people have made   {#2747}
[02:48:39] STUDENT_1: dynamo db just for use for this thing or sql is just used for that thing that's all it's very   {#2748}
[02:48:44] STUDENT_1: it's it just depends on how you know how to leverage a particular tech that's all matters   {#2749}
[02:48:51] STUDENT_1: right   {#2750}
[02:48:53] STUDENT_8: so got it yeah yeah yeah while you were comparing uh redis and dynamo should uh auto scaling be   {#2751}
[02:49:05] STUDENT_8: also a factor in that like with dynamo you could uh it would provide you like auto scaling in case   {#2752}
[02:49:12] STUDENT_8: you have a sudden surge uh whereas in a self-managed redis you probably might not be able to react in a   {#2753}
[02:49:21] STUDENT_8: small window of time when you see a sudden so that's a disadvantage right so that's a property   {#2754}
[02:49:27] STUDENT_1: of engineering teams rather than the tool itself right so assuming that even as we discussed assuming   {#2755}
[02:49:35] STUDENT_1: handling searches and all of that   {#2756}
[02:49:37] TEACHER: remain same then we discuss but if you   {#2757}
[02:49:39] TEACHER: want to consider that those points   {#2758}
[02:49:41] TEACHER: and this that's a disadvantage   {#2759}
[02:49:43] TEACHER: when you're self-hosting something that you need engineering   {#2760}
[02:49:44] STUDENT_1: expertise to manage and scale and react   {#2761}
[02:49:47] STUDENT_1: with searches right   {#2762}
[02:49:49] STUDENT_1: that's an added strain on the engineering   {#2763}
[02:49:51] STUDENT_1: teams and so that is   {#2764}
[02:49:53] STUDENT_1: one more point that can go against self-hosted   {#2765}
[02:49:55] STUDENT_1: redis versus DynamoDB   {#2766}
[02:49:57] STUDENT_1: so if you have lean team   {#2767}
[02:49:59] STUDENT_1: you can just offload   {#2768}
[02:50:01] STUDENT_1: everything to DynamoDB you throw money at them   {#2769}
[02:50:03] STUDENT_1: they become your extended engineering team   {#2770}
[02:50:05] TEACHER: correct but with redis you have to manage so it's a trade-off so you need engineering expertise to   {#2771}
[02:50:11] STUDENT_5: pull that off okay yeah yeah so like uh in the online offline thing we were discussing about   {#2772}
[02:50:23] STUDENT_5: using ttl in redis right now i don't know if that is a feature that is widely available in all kind   {#2773}
[02:50:31] STUDENT_5: of databases but in general should we try to avoid features that are specific to some dbs because in   {#2774}
[02:50:38] TEACHER: future in future we may not be able to change no we wanted that right we wanted we wanted   {#2775}
[02:50:42] TEACHER: expiration that's why we went for a database that gives us a dynamic db gives you redis gives you   {#2776}
[02:50:48] TEACHER: right then though you can also say what can i not live without acid you need some features right   {#2777}
[02:50:56] TEACHER: you just cannot say because your data you're picking databases that would give you those things   {#2778}
[02:51:01] TEACHER: to move into a database that would not give you the features that you need.   {#2779}
[02:51:05] TEACHER: Right.   {#2780}
[02:51:06] TEACHER: You would always find databases that give you similar features and move   {#2781}
[02:51:08] TEACHER: into those database.   {#2782}
[02:51:10] TEACHER: If not, you always have an option to re-implement it.   {#2783}
[02:51:13] TEACHER: For example, writing a cron job that does that exact same thing.   {#2784}
[02:51:15] TEACHER: Yes.   {#2785}
[02:51:16] TEACHER: Right.   {#2786}
[02:51:17] TEACHER: So you need to draw a line where you need to stop overthinking.   {#2787}
[02:51:22] STUDENT_14: Yeah.   {#2788}
[02:51:23] TEACHER: Correct.   {#2789}
[02:51:24] TEACHER: He like going, uh, entire, uh, uh, basically not, not, not, uh,   {#2790}
[02:51:31] TEACHER: uh, making everything abstractionized and whatnot.   {#2791}
[02:51:34] TEACHER: So you need to draw a line.   {#2792}
[02:51:35] TEACHER: What are some realistic things?   {#2793}
[02:51:37] TEACHER: What are some unrealistic things?   {#2794}
[02:51:38] TEACHER: Drop all the unrealistic things that focus on realistic and then design a system.   {#2795}
[02:51:43] TEACHER: Otherwise you'll drop the rabbit hole and eventually write your own database.   {#2796}
[02:51:49] TEACHER: Don't do that.   {#2797}
[02:51:52] STUDENT_5: Yeah.   {#2798}
[02:51:53] STUDENT_5: Oh yeah.   {#2799}
[02:51:53] STUDENT_5: I'm because like when I was working on a project, yeah, I was working on a project   {#2800}
[02:51:57] STUDENT_5: where for archival, I propose like TTL and then listening to streams and   {#2801}
[02:52:03] STUDENT_5: like the senior engineer in my team challenge saying, you can only do this   {#2802}
[02:52:06] STUDENT_5: with Dynamo, you can't do it if we move to something else.   {#2803}
[02:52:09] TEACHER: But then you would not use Dynamo DB streams, but your CDCs, DBZM gives you that.   {#2804}
[02:52:14] STUDENT_1: Right.   {#2805}
[02:52:15] STUDENT_1: If you're using my SQL use DBZM to capture all this.   {#2806}
[02:52:17] STUDENT_1: See, either someone could give you with managed or you would have to write a   {#2807}
[02:52:23] STUDENT_1: small service that would do that for you.   {#2808}
[02:52:25] STUDENT_1: Yes.   {#2809}
[02:52:25] STUDENT_1: Right.   {#2810}
[02:52:27] STUDENT_1: we are rigid as we can code anything and everything out there right so don't worry about it's a   {#2811}
[02:52:32] STUDENT_1: basically that's one thing that you would have to document it if we would want to ever do that this   {#2812}
[02:52:37] STUDENT_1: is the like these are the steps that we would have to take yeah just being aware of the limitations   {#2813}
[02:52:42] TEACHER: of your design is a good place to be okay thanks i should use it thanks for that question amrik gaur   {#2814}
[02:52:51] TEACHER: uh yeah i don't know means uh i have not never used the connection pooling okay so uh just a   {#2815}
[02:52:57] TEACHER: portion out of curiosity, uh, suppose that, uh, if I scale my database, okay.   {#2816}
[02:53:03] TEACHER: I mean, it's from one DBI, uh, switch to two, then the connection pooling will also   {#2817}
[02:53:07] TEACHER: be multiplied by two means it is a directory proportional or it depends on the   {#2818}
[02:53:11] STUDENT_1: implementation.   {#2819}
[02:53:11] TEACHER: So what I would recommend is.   {#2820}
[02:53:13] TEACHER: Today, spend some time writing a hello world with connection,   {#2821}
[02:53:16] TEACHER: pulling local database, run it.   {#2822}
[02:53:17] TEACHER: You'll see the kind of configurations it provides.   {#2823}
[02:53:20] TEACHER: Right.   {#2824}
[02:53:20] TEACHER: And you understand the limitations of it.   {#2825}
[02:53:22] TEACHER: Right.   {#2826}
[02:53:23] STUDENT_1: You'll be in much better position to answer this on your own.   {#2827}
[02:53:26] STUDENT_1: Right.   {#2828}
[02:53:27] STUDENT_1: The way if you're moving, if you're horizontally scaling your DB,   {#2829}
[02:53:30] STUDENT_1: how you do it, that also depends.   {#2830}
[02:53:31] STUDENT_1: We'll talk about it next, right?   {#2831}
[02:53:33] STUDENT_1: Horizontally scaling of databases and how to do it.   {#2832}
[02:53:35] STUDENT_1: We'll talk about next week.   {#2833}
[02:53:36] STUDENT_1: A lot of things will get clear, but today try to write a hello world   {#2834}
[02:53:40] STUDENT_1: with correction pulling, right?   {#2835}
[02:53:41] TEACHER: So that you will be in a position to understand horizontal scaling   {#2836}
[02:53:44] TEACHER: of database and the role of correction pulling better.   {#2837}
[02:53:47] TEACHER: Okay.   {#2838}
[02:53:48] TEACHER: Okay.   {#2839}
[02:53:48] TEACHER: Okay.   {#2840}
[02:53:49] TEACHER: One more question.   {#2841}
[02:53:51] TEACHER: We, we optimized that online and offline DB by means deleting   {#2842}
[02:53:57] TEACHER: offline fields, right?   {#2843}
[02:54:00] TEACHER: Suppose if I have to show the, that in WhatsApp, it shows, right?   {#2844}
[02:54:05] TEACHER: We discussed it.   {#2845}
[02:54:06] TEACHER: Someone asked if you want to show, then you cannot delete.   {#2846}
[02:54:10] STUDENT_1: Okay.   {#2847}
[02:54:12] STUDENT_1: So, and then it's a product call.   {#2848}
[02:54:13] STUDENT_1: If they want to show it, then you cannot delete it.   {#2849}
[02:54:15] STUDENT_1: If they don't, you will delete it.   {#2850}
[02:54:17] TEACHER: So that how can we optimize that?   {#2851}
[02:54:19] TEACHER: That was, I was thinking.   {#2852}
[02:54:21] STUDENT_1: You cannot, because storage is not a problem, right?   {#2853}
[02:54:22] STUDENT_1: It's just 8 GB of storage.   {#2854}
[02:54:23] STUDENT_1: You don't have to optimize on that.   {#2855}
[02:54:25] STUDENT_1: Okay.   {#2856}
[02:54:26] STUDENT_1: That's what I said.   {#2857}
[02:54:27] TEACHER: stretch so that we think on those lines, right?   {#2858}
[02:54:31] TEACHER: Because storage is not problem.   {#2859}
[02:54:33] TEACHER: 8 GB is peanuts for everything.   {#2860}
[02:54:35] TEACHER: Right.   {#2861}
[02:54:50] STUDENT_2: Yeah.   {#2862}
[02:54:52] STUDENT_2: Thank you.   {#2863}
[02:54:52] STUDENT_2: So we discussed a lot of pros of connection pooling and I think at a   {#2864}
[02:54:57] STUDENT_2: also mentioned that we should almost use it everywhere.   {#2865}
[02:55:01] STUDENT_2: Uh, and I understood a lot about it today, but what I also want to   {#2866}
[02:55:05] STUDENT_2: understand is, are there any catches or cons or any situations where   {#2867}
[02:55:10] STUDENT_2: using connection pooling might be, uh, detrimental that you are aware of.   {#2868}
[02:55:15] TEACHER: Imagine you configure a connection pool with minimum number of   {#2869}
[02:55:18] TEACHER: hundred connections.   {#2870}
[02:55:19] TEACHER: Okay.   {#2871}
[02:55:20] TEACHER: Let me give a hypothetical situation.   {#2872}
[02:55:22] TEACHER: Let's say you have a database that supports, uh, at packs, 1000   {#2873}
[02:55:27] TEACHER: Just to make a calculation simpler.   {#2874}
[02:55:30] TEACHER: Let's say you have a database that supports maximum connections of 1000.   {#2875}
[02:55:34] STUDENT_1: And, uh, you have a, you configuring a repair server, a connection pool of   {#2876}
[02:55:39] STUDENT_1: 100 minimum number.   {#2877}
[02:55:41] TEACHER: And now you had one server, a hundred and here, 1000 works fine.   {#2878}
[02:55:47] TEACHER: You got some traffic.   {#2879}
[02:55:48] TEACHER: You add one more server.   {#2880}
[02:55:49] TEACHER: You got some more traffic.   {#2881}
[02:55:50] TEACHER: You had one more server, right?   {#2882}
[02:55:52] TEACHER: Three servers, 10 servers.   {#2883}
[02:55:53] STUDENT_1: but then suddenly you add 20 more because you saw massive massive spike now what would happen   {#2884}
[02:56:00] STUDENT_1: you exhausted the maximum number of connections that could be made with the database so by not   {#2885}
[02:56:06] STUDENT_1: configuring your connection pool properly you can limit the number of api servers that you can have   {#2886}
[02:56:13] STUDENT_1: correct that's what you have to worry about that what are the maximum number of api servers would   {#2887}
[02:56:18] STUDENT_1: I have that would depend on the connection pool that you have got the minimum number   {#2888}
[02:56:22] STUDENT_1: of connections in the connection pool that are configuring the maximum number of connections   {#2889}
[02:56:26] STUDENT_1: that could exist on your database.   {#2890}
[02:56:28] STUDENT_1: It's all a factor of that, right?   {#2891}
[02:56:30] STUDENT_1: So that is where just blindly using connection pooling is not a good idea, right?   {#2892}
[02:56:37] TEACHER: Because if you just put it in an overstretch mode, let's say it grows to as many connections   {#2893}
[02:56:43] TEACHER: as it wants, but then you cannot have large number of servers because if every server   {#2894}
[02:56:48] STUDENT_1: then it would put a lot of pressure on a database.   {#2895}
[02:56:50] STUDENT_1: And let's say if you set up your expiration time on connection to be very high,   {#2896}
[02:56:54] STUDENT_1: let's say 10 minutes now, which means that your existing connections   {#2897}
[02:56:59] TEACHER: on connections would not break.   {#2898}
[02:57:01] TEACHER: You need more servers to handle the load, but your existing connections cannot break.   {#2899}
[02:57:05] TEACHER: The load balancer has set up connection with some other server,   {#2900}
[02:57:08] TEACHER: but some other server is fogging up the database connections.   {#2901}
[02:57:11] TEACHER: Now what?   {#2902}
[02:57:12] TEACHER: Gone.   {#2903}
[02:57:13] TEACHER: You're having an outage, right?   {#2904}
[02:57:15] TEACHER: Those users who are connected to that other server,   {#2905}
[02:57:18] TEACHER: the data because some other server   {#2906}
[02:57:20] TEACHER: is having very large TTL on the connection   {#2907}
[02:57:22] TEACHER: pool. Problem.   {#2908}
[02:57:24] TEACHER: Right?   {#2909}
[02:57:26] TEACHER: Life is filled with problems. Just find   {#2910}
[02:57:30] TEACHER: a near optimal   {#2911}
[02:57:31] TEACHER: solution and move on.   {#2912}
[02:57:33] TEACHER: But grass is not always green.   {#2913}
[02:57:35] TEACHER: You need to know how to tune it,   {#2914}
[02:57:36] TEACHER: where to tune it, all the factors that you see.   {#2915}
[02:57:38] TEACHER: You need to know   {#2916}
[02:57:39] TEACHER: the places where it can bring.   {#2917}
[02:57:42] TEACHER: So,   {#2918}
[02:57:43] TEACHER: think on multiple directions at a shot,   {#2919}
[02:57:45] TEACHER: document everything and start to   {#2920}
[02:57:48] TEACHER: step by step what could go wrong what could go wrong what could go wrong start with a conservative   {#2921}
[02:57:52] TEACHER: which is where i said that in most cases you start with the minimum number of connections   {#2922}
[02:57:56] TEACHER: in a connection pool you start with three or five not more than that and you make it grow to a   {#2923}
[02:58:02] STUDENT_1: certain stage maybe less than 50 or 100 the amount of time the ttl of the connection pool   {#2924}
[02:58:11] STUDENT_1: or the connection that after which it would be deleted it cannot be too small because if it is   {#2925}
[02:58:18] STUDENT_1: connections to the backend or to the database.   {#2926}
[02:58:20] STUDENT_1: If it's too large, then you are having unused, a large number of unused connections.   {#2927}
[02:58:25] STUDENT_1: So you need to find a sweet spot and it depends on the use case.   {#2928}
[02:58:28] STUDENT_1: Why?   {#2929}
[02:58:28] STUDENT_1: Because let's say you are having, you are firing queries, which are taking longer time   {#2930}
[02:58:33] STUDENT_1: on your database to execute, which means you need to keep the connections open for a very   {#2931}
[02:58:37] STUDENT_1: long time, which means that you cannot have a short TTL.   {#2932}
[02:58:41] STUDENT_1: Yes.   {#2933}
[02:58:42] STUDENT_1: So depending on what your use case is,   {#2934}
[02:58:46] STUDENT_1: so one factor or one metric that you should track is average time for SQL query   {#2935}
[02:58:51] TEACHER: completion on your database workflow.   {#2936}
[02:58:54] TEACHER: That is the most important factor that would help you tune your connection   {#2937}
[02:58:58] TEACHER: pool the best, right?   {#2938}
---- OWNED SEGMENTS END ----

CTX| [02:59:03] STUDENT_1: Think on those slides.   {#2939}
CTX| [02:59:06] STUDENT_6: Yeah.   {#2940}
CTX| [02:59:07] STUDENT_2: If just small follow up with, if the average time to query a particular table for a particular   {#2941}
CTX| [02:59:14] STUDENT_2: record, let's say for a particular variable, it goes up.   {#2942}
CTX| [02:59:18] STUDENT_2: Then if we have a very frequent use case for that, we should think about expanding our   {#2943}
CTX| [02:59:22] STUDENT_2: connection pool for that DB.   {#2944}
CTX| [02:59:24] STUDENT_2: Correct.   {#2945}
CTX| [02:59:26] STUDENT_2: Yeah.   {#2946}
CTX| [02:59:26] STUDENT_2: Thank you.   {#2947}
CTX| [02:59:27] STUDENT_2: That was very insightful.   {#2948}
CTX| [02:59:28] STUDENT_2: Yeah.   {#2949}
CTX| [02:59:29] STUDENT_10: Great.   {#2950}
CTX| [02:59:29] STUDENT_10: Deepak.   {#2951}
CTX| [02:59:31] STUDENT_4: So I wanted to know like in case of a database server, we have multiple, we have fixed number   {#2952}
CTX| [02:59:38] STUDENT_4: of codes and each TCP connection is two codes.   {#2953}
CTX| [02:59:40] STUDENT_4: So how we maintain more than 30,000 connections?   {#2954}
CTX| [02:59:44] STUDENT_1: Yeah, just a Google search.   {#2955}
CTX| [02:59:45] STUDENT_1: Just a Google search.   {#2956}
CTX| [02:59:47] TEACHER: See something that can be Google search to ECD.   {#2957}
CTX| [02:59:49] TEACHER: I would recommend do that.   {#2958}
CTX| [02:59:51] TEACHER: Do a Google search in case you still don't find an answer more than happy to answer it,   {#2959}
CTX| [02:59:55] TEACHER: but spend some time because you will stumble upon something very interesting.   {#2960}
CTX| [02:59:58] TEACHER: So, Hussain Nasser has a great video on that.   {#2961}
CTX| [03:00:01] TEACHER: You'll find a couple of stack overflow answers on it.   {#2962}
