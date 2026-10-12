# chunk_15  OWNS 02:52:43 -> 03:05:22  (segments #2753-#3012, 2024 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:51:44] TEACHER: else is just like they're already on the internet.   {#2732}
CTX| [02:51:46] TEACHER: Right.   {#2733}
CTX| [02:51:48] TEACHER: There's nothing much to add there because there's a pretty standard.   {#2734}
CTX| [02:51:52] TEACHER: Isn't it right?   {#2735}
CTX| [02:51:54] TEACHER: Handling DDoS equal to rate limiter.   {#2736}
CTX| [02:51:56] TEACHER: You add rate limit on a different layer.   {#2737}
CTX| [02:51:58] TEACHER: You get, you get the answer.   {#2738}
CTX| [02:52:00] TEACHER: Right.   {#2739}
CTX| [02:52:00] TEACHER: Like, like you know how to solve that problem.   {#2740}
CTX| [02:52:03] TEACHER: When you talk about SQL injection, there are standard ways to do it.   {#2741}
CTX| [02:52:06] TEACHER: You talk about CVEs.   {#2742}
CTX| [02:52:08] TEACHER: You exactly know how to patch it.   {#2743}
CTX| [02:52:09] TEACHER: Now what else?   {#2744}
CTX| [02:52:11] TEACHER: because these are pretty things which is available across the internet.   {#2745}
CTX| [02:52:16] TEACHER: There is nothing much specific to add.   {#2746}
CTX| [02:52:20] STUDENT_7: Okay.   {#2747}
CTX| [02:52:21] STUDENT_7: Final thing, the clustering of databases,   {#2748}
CTX| [02:52:27] STUDENT_7: that is part of you probably are saying vertical scaling, right?   {#2749}
CTX| [02:52:34] TEACHER: No, how is it all scaling?   {#2750}
CTX| [02:52:35] TEACHER: Clustering, now you can read out a cluster that are multiple machines.   {#2751}
CTX| [02:52:38] TEACHER: So how is it all scaling?   {#2752}

---- OWNED SEGMENTS START ----
[02:52:43] STUDENT_5: You create a database cluster cluster is equal to multiple machines.   {#2753}
[02:52:47] STUDENT_7: So it didn't cover it in the examples.   {#2754}
[02:52:50] STUDENT_7: So it was, so you said vertical one and the other is the, uh, read replica and sharding   {#2755}
[02:52:56] TEACHER: is the sharding cluster cluster.   {#2756}
[02:52:59] TEACHER: How does it all scale multiple machines?   {#2757}
[02:53:01] STUDENT_7: I mean, I don't know whether, you know, when you create a cluster, which is provided by   {#2758}
[02:53:06] STUDENT_7: the database vendor, for example, is it based on sharding or not?   {#2759}
[02:53:11] TEACHER: It is based on sharding.   {#2760}
[02:53:12] TEACHER: It is based on sharding.   {#2761}
[02:53:12] STUDENT_7: It appears as one database, right?   {#2762}
[02:53:15] TEACHER: Yeah.   {#2763}
[02:53:17] TEACHER: So in that sense, we classic example sharded database internally.   {#2764}
[02:53:21] TEACHER: For us, it is one database internally,   {#2765}
[02:53:23] TEACHER: it is split across multiple storage nodes cluster.   {#2766}
[02:53:27] STUDENT_7: Correct.   {#2767}
[02:53:28] STUDENT_7: So then we don't need to handle the sharding part, right?   {#2768}
[02:53:32] TEACHER: Ourselves depends on the database vendor.   {#2769}
[02:53:34] TEACHER: You are talking about vendors.   {#2770}
[02:53:35] TEACHER: They, if they are charging money for you,   {#2771}
[02:53:37] TEACHER: they would be handling it for you.   {#2772}
[02:53:38] TEACHER: If you are using open-source technologies which does not provide native sharding, you   {#2773}
[02:53:42] TEACHER: have to implement it.   {#2774}
[02:53:44] STUDENT_7: Got it.   {#2775}
[02:53:45] STUDENT_7: Okay.   {#2776}
[02:53:45] STUDENT_7: Understood.   {#2777}
[02:53:46] STUDENT_7: Thanks.   {#2778}
[02:53:49] STUDENT_5: Yes, Chandan.   {#2779}
[02:53:56] STUDENT_16: Chandan, you there?   {#2780}
[02:54:00] STUDENT_5: I'll circle back.   {#2781}
[02:54:02] STUDENT_5: Audio problem.   {#2782}
[02:54:03] STUDENT_5: Surya.   {#2783}
[02:54:04] STUDENT_6: Yeah.   {#2784}
[02:54:05] STUDENT_6: Hi.   {#2785}
[02:54:06] STUDENT_6: So I have a question related to again Kafka Kinesis.   {#2786}
[02:54:11] STUDENT_6: Okay.   {#2787}
[02:54:12] STUDENT_6: You mentioned that usually partitions in Kafka is used to increase the parallelism, right?   {#2788}
[02:54:18] STUDENT_6: Like increase the crossing rate.   {#2789}
[02:54:22] STUDENT_6: You mentioned also like Kinesis Shards is also similar, right?   {#2790}
[02:54:25] STUDENT_6: Yeah, exactly.   {#2791}
[02:54:26] STUDENT_5: Same as Kafka partitions.   {#2792}
[02:54:28] STUDENT_6: Yeah.   {#2793}
[02:54:28] STUDENT_6: Okay.   {#2794}
[02:54:29] STUDENT_6: So and with respect to the consumers, right?   {#2795}
[02:54:31] STUDENT_6: Like would the similar concepts apply?   {#2796}
[02:54:35] STUDENT_6: one consumer subscribing to one partition and will never said one subscriber subscribing to   {#2797}
[02:54:41] TEACHER: one partition consumer just comes and reads it kafka manages it for you that from which consumer   {#2798}
[02:54:47] TEACHER: or from which partition it would read it okay that's the responsibility of kafka it's a it's   {#2799}
[02:54:52] TEACHER: very easy integration for consumer to talk to kafka and read the message okay but eventually   {#2800}
[02:54:58] STUDENT_6: like uh scaling up the partitions will increase the parallelism right like correct correct yes   {#2801}
[02:55:05] STUDENT_6: Does this similar concept like just the way you mentioned it Kafka manages   {#2802}
[02:55:09] STUDENT_6: like which partition to read and supplies.   {#2803}
[02:55:12] STUDENT_6: Kinesis also does the same like exactly same thing.   {#2804}
[02:55:16] STUDENT_5: Copy paste same.   {#2805}
[02:55:19] STUDENT_12: Okay.   {#2806}
[02:55:20] TEACHER: Okay.   {#2807}
[02:55:21] TEACHER: Because in Kinesis consumer, when you start, you don't specify which   {#2808}
[02:55:24] TEACHER: shard to read from.   {#2809}
[02:55:26] TEACHER: Yep.   {#2810}
[02:55:28] TEACHER: Right.   {#2811}
[02:55:28] TEACHER: So internally does that management for you.   {#2812}
[02:55:32] STUDENT_6: Okay.   {#2813}
[02:55:32] STUDENT_6: And just a continuation like, but it doesn't have the limitation   {#2814}
[02:55:38] STUDENT_6: that you explained, right?   {#2815}
[02:55:39] STUDENT_6: Like having more number of consumers, right?   {#2816}
[02:55:42] STUDENT_6: You mentioned one limitation, limitation with three, if you have   {#2817}
[02:55:46] TEACHER: three partitions and you have five consumers, two consumers will do nothing.   {#2818}
[02:55:50] STUDENT_6: Okay.   {#2819}
[02:55:50] TEACHER: Same thing goes for kinases.   {#2820}
[02:55:51] TEACHER: Same thing goes for Kafka.   {#2821}
[02:55:53] TEACHER: See the logic, right?   {#2822}
[02:55:55] TEACHER: How would Kafka keep track of which consumer rental, which point of two   {#2823}
[02:55:58] TEACHER: are reading from the same one?   {#2824}
[02:56:00] TEACHER: Not possible.   {#2825}
[02:56:01] TEACHER: Right.   {#2826}
[02:56:02] TEACHER: That's a fundamental limitation, right?   {#2827}
[02:56:04] TEACHER: Because think of implementation.   {#2828}
[02:56:06] TEACHER: If you think of the implementation, you realize it is not possible for Kafka to maintain it   {#2829}
[02:56:10] TEACHER: efficiently that which consumer, if two consumers are reading from the same partition Kafka   {#2830}
[02:56:14] TEACHER: for it to maintain which consumer, which message was read from which partition and ensuring   {#2831}
[02:56:19] TEACHER: ordering not possible.   {#2832}
[02:56:21] TEACHER: They cannot implement it.   {#2833}
[02:56:23] TEACHER: Right.   {#2834}
[02:56:24] STUDENT_6: Okay.   {#2835}
[02:56:24] STUDENT_6: Okay.   {#2836}
[02:56:25] STUDENT_6: Not it.   {#2837}
[02:56:25] STUDENT_6: Not it.   {#2838}
[02:56:26] STUDENT_6: Good.   {#2839}
[02:56:28] STUDENT_5: Yeah.   {#2840}
[02:56:31] STUDENT_8: Yeah.   {#2841}
[02:56:33] STUDENT_8: question with respect to   {#2842}
[02:56:34] STUDENT_8: the streaming.   {#2843}
[02:56:36] STUDENT_8: I heard the concept   {#2844}
[02:56:38] STUDENT_8: today, so bear with my knife   {#2845}
[02:56:40] STUDENT_8: question. I did   {#2846}
[02:56:42] STUDENT_8: not understand the part of a commit.   {#2847}
[02:56:45] STUDENT_8: Like when we say a commit,   {#2848}
[02:56:46] STUDENT_8: is it a commit to the Kafka service   {#2849}
[02:56:48] STUDENT_8: or is it a commit saying   {#2850}
[02:56:50] STUDENT_8: we did it and we store with the database   {#2851}
[02:56:52] STUDENT_8: itself? No, no, it's not Kafka commit.   {#2852}
[02:56:54] TEACHER: Kafka will keep track that this consumer   {#2853}
[02:56:56] TEACHER: read till this point.   {#2854}
[02:56:59] TEACHER: It's a commit operation.   {#2855}
[02:57:06] TEACHER: So Kafka will keep track that this consumer has read till this point.   {#2856}
[02:57:09] TEACHER: So next time when the consumer wants to read, it would start from that check point.   {#2857}
[02:57:13] STUDENT_8: It makes sense.   {#2858}
[02:57:14] STUDENT_8: So follow up question on the example, right?   {#2859}
[02:57:19] STUDENT_8: Like for example, when we started, like there are two databases we wanted to commit one,   {#2860}
[02:57:24] STUDENT_8: a DB and other one, the elastic search and right.   {#2861}
[02:57:28] STUDENT_8: And then we said that streaming is a solution that can replace distributed transaction.   {#2862}
[02:57:36] TEACHER: Not really.   {#2863}
[02:57:37] TEACHER: Not really.   {#2864}
[02:57:38] TEACHER: You cannot replace distributed transaction.   {#2865}
[02:57:40] TEACHER: You can implement it with distributed transaction.   {#2866}
[02:57:43] TEACHER: But you now have.   {#2867}
[02:57:45] TEACHER: It's not that it is replacing distributed transaction.   {#2868}
[02:57:47] TEACHER: In some cases you have to have distributed transaction.   {#2869}
[02:57:49] TEACHER: But here what we are doing is.   {#2870}
[02:57:51] TEACHER: We have two independent processes.   {#2871}
[02:57:54] TEACHER: Who are doing two very independent things.   {#2872}
[02:57:56] TEACHER: On this exact same message.   {#2873}
[02:57:58] TEACHER: So that's why they can contribute their own sweet face.   {#2874}
[02:58:01] STUDENT_8: Yeah.   {#2875}
[02:58:02] STUDENT_8: So yeah, like my, my general question was like in general, if you are doing two writes on   {#2876}
[02:58:06] STUDENT_8: two different databases, like any, any, right, any two persistent services, there's no option   {#2877}
[02:58:11] STUDENT_8: other than doing a distributed, like for a consistent, there is no option, right?   {#2878}
[02:58:15] STUDENT_5: For strong consistency.   {#2879}
[02:58:17] STUDENT_5: There is no option, but to distribute transactions.   {#2880}
[02:58:20] STUDENT_5: Thanks.   {#2881}
[02:58:21] STUDENT_5: Yeah.   {#2882}
[02:58:22] STUDENT_5: Simra.   {#2883}
[02:58:25] STUDENT_2: Yeah.   {#2884}
[02:58:26] STUDENT_2: Hi, Epit.   {#2885}
[02:58:28] STUDENT_2: message queue so here like we were talking that consumer consumes the message and once that is   {#2886}
[02:58:35] STUDENT_2: done yeah he updates that that this message is done so do we have any time and suppose that the   {#2887}
[02:58:41] STUDENT_2: consumer goes down and that message was never updated we spoke about that with visibility   {#2888}
[02:58:48] TEACHER: timeout right so depending on the queue that you are using it would have it should have some way   {#2889}
[02:58:53] TEACHER: to do it. If I talk about SQS, SQS gives you visibility timeout, which means that if let's   {#2890}
[02:58:58] TEACHER: say your consumer consumed a message, but before deleting it, your consumer crashed.   {#2891}
[02:59:04] TEACHER: Then after visibility timeout, let's say 10 seconds or 10 minutes, for example, whatever   {#2892}
[02:59:08] TEACHER: you configure, the message would reappear at the head of the queue and would be re consumed   {#2893}
[02:59:13] TEACHER: by some other consumer or busy, whichever are available at that time.   {#2894}
[02:59:17] TEACHER: So that's a concept of visibility timeout.   {#2895}
[02:59:21] STUDENT_9: Okay.   {#2896}
[02:59:21] STUDENT_9: Got it.   {#2897}
[02:59:23] TEACHER: So read visibility timeout in SQS, but you get, and something similar exists in rabbit   {#2898}
[02:59:28] TEACHER: time.   {#2899}
[02:59:28] TEACHER: Also I've used excuse very widely, same thing exists in Google pubs, everything comes up.   {#2900}
[02:59:33] TEACHER: Every feature is copy paste everywhere.   {#2901}
[02:59:35] TEACHER: You'll find equivalent of one another.   {#2902}
[02:59:37] TEACHER: Right.   {#2903}
[02:59:38] TEACHER: But the key term is visibility timeout in SQS.   {#2904}
[02:59:41] TEACHER: You start from that, pick your favorite technology and you'll find an equivalence of that.   {#2905}
[02:59:45] STUDENT_18: Sure.   {#2906}
[02:59:46] STUDENT_18: Sure.   {#2907}
[02:59:46] TEACHER: Yeah.   {#2908}
[02:59:47] TEACHER: Great.   {#2909}
[02:59:48] STUDENT_18: Uh,   {#2910}
[02:59:49] TEACHER: Gaurav.   {#2911}
[02:59:50] TEACHER: Hi, Arpit.   {#2912}
[02:59:51] TEACHER: So how is browser level caching implemented?   {#2913}
[02:59:54] TEACHER: Local storage browser has a limited local storage that you can leverage.   {#2914}
[03:00:00] TEACHER: So you can like, you cannot store huge amount of data, but still pretty decent   {#2915}
[03:00:04] TEACHER: amount of data on the browser side of things.   {#2916}
[03:00:09] TEACHER: So browser caches images also so that it doesn't have to make an   {#2917}
[03:00:14] TEACHER: expensive network call to fetch the images.   {#2918}
[03:00:15] TEACHER: So once the image is loaded, the next load is very fast.   {#2919}
[03:00:18] TEACHER: It's not because of CDN, but because the browser cached the   {#2920}
[03:00:21] TEACHER: assets so you can check the network tab of the browser of a web page that you would want to   {#2921}
[03:00:26] TEACHER: open but bunch of images are there and you can see that it says that content already present or   {#2922}
[03:00:30] TEACHER: something like that when it tries to get it so it just loads it from the cache without making a   {#2923}
[03:00:35] TEACHER: network file so what you can use is you can use local storage uh uh sdk to do it so local storage   {#2924}
[03:00:43] TEACHER: html5 or basically if i may put it quote unquote modern browsers they give you local storage uh as a   {#2925}
[03:00:51] TEACHER: object which you can use to set item get item uh cache images and what not you can use it for a   {#2926}
[03:00:56] TEACHER: bunch of stuff so in the network tab you go to storage so in chrome or firefox anywhere you go   {#2927}
[03:01:02] TEACHER: to storage on left side you'll find local storage click on that for any website you'll see what they   {#2928}
[03:01:06] STUDENT_1: are caching got it thanks and also for a message queue we do not have any partitions right in   {#2929}
[03:01:16] TEACHER: message queue internally we don't know if they are doing partition or not right so i cannot comment   {#2930}
[03:01:21] TEACHER: that, but naively from outside, you don't see those internally.   {#2931}
[03:01:25] TEACHER: SQS might be partitioning it.   {#2932}
[03:01:26] TEACHER: We don't know.   {#2933}
[03:01:28] TEACHER: Right.   {#2934}
[03:01:28] TEACHER: And there's no explicit nuance of it.   {#2935}
[03:01:31] STUDENT_1: Got it.   {#2936}
[03:01:32] STUDENT_1: And does the worker read a message then delete it and work on it or.   {#2937}
[03:01:36] TEACHER: It's your implementation.   {#2938}
[03:01:38] TEACHER: SQS will give you APIs to do it.   {#2939}
[03:01:40] TEACHER: Have you do it.   {#2940}
[03:01:41] TEACHER: It's up to you.   {#2941}
[03:01:41] TEACHER: You delete first, you delete later up to you, but it makes sense to delete after you have   {#2942}
[03:01:46] TEACHER: done processing.   {#2943}
[03:01:47] TEACHER: Yep.   {#2944}
[03:01:48] TEACHER: Right.   {#2945}
[03:01:49] TEACHER: Otherwise there's a loss of message.   {#2946}
[03:01:51] TEACHER: Thanks.   {#2947}
[03:01:53] TEACHER: Rajiv.   {#2948}
[03:01:58] STUDENT_9: Hi, Arpit.   {#2949}
[03:01:59] STUDENT_9: So Arpit, I just, this idea came to my mind.   {#2950}
[03:02:01] STUDENT_9: I know you will discuss DB for the weeks, but really a question.   {#2951}
[03:02:06] STUDENT_9: Do you have any formula for shredding?   {#2952}
[03:02:08] STUDENT_9: No.   {#2953}
[03:02:10] STUDENT_9: How do you approach shredding?   {#2954}
[03:02:11] STUDENT_9: I mean, you just see data.   {#2955}
[03:02:12] STUDENT_9: How, what is the constraint and then analyze it and then see, okay, what needs to be done?   {#2956}
[03:02:18] STUDENT_5: Yes.   {#2957}
[03:02:19] STUDENT_5: It's very subjective.   {#2958}
[03:02:21] STUDENT_5: golden formula, there is no magic number to do that.   {#2959}
[03:02:25] TEACHER: Right.   {#2960}
[03:02:26] TEACHER: There is no magic formula to do it.   {#2961}
[03:02:27] TEACHER: It's always analyzing, like going through the data, seeing the access   {#2962}
[03:02:31] TEACHER: pattern, then taking a call.   {#2963}
[03:02:33] TEACHER: Right.   {#2964}
[03:02:33] TEACHER: That's all it depends.   {#2965}
[03:02:38] TEACHER: Uh, Pankaj.   {#2966}
[03:02:42] STUDENT_10: Yeah.   {#2967}
[03:02:42] STUDENT_10: Hi.   {#2968}
[03:02:42] STUDENT_10: So, uh, my question was, uh, around these web sockets and all   {#2969}
[03:02:47] STUDENT_10: server side events.   {#2970}
[03:02:48] STUDENT_10: So like when we are maintaining a TCP connection open, right?   {#2971}
[03:02:53] STUDENT_10: So if a server has a lot of, you know, connections with the connection open with different clients   {#2972}
[03:02:59] STUDENT_10: and it's crashes because of some reason.   {#2973}
[03:03:03] STUDENT_10: So like when it spins up a new instance again, like many of them will be connecting at the   {#2974}
[03:03:08] STUDENT_10: same time, right?   {#2975}
[03:03:09] STUDENT_10: So is there a layer between server and the client by which we are maintaining these connections   {#2976}
[03:03:14] STUDENT_10: or like our server is directly connected?   {#2977}
[03:03:16] TEACHER: Once the connection is broken between client and the server,   {#2978}
[03:03:19] TEACHER: client would reestablish the connection to whichever server is available.   {#2979}
[03:03:23] TEACHER: I will connect to only this specific server.   {#2980}
[03:03:26] TEACHER: Whatever is available, the client will connect to that.   {#2981}
[03:03:30] STUDENT_10: Okay.   {#2982}
[03:03:31] STUDENT_10: So in our case, it's basically like,   {#2983}
[03:03:33] STUDENT_10: so if I want to make thousand connections at the same time,   {#2984}
[03:03:38] STUDENT_10: it will not increase the load on the server then?   {#2985}
[03:03:40] STUDENT_5: It will, but at that time, the server is not doing anything, right?   {#2986}
[03:03:44] TEACHER: Is server doing anything?   {#2987}
[03:03:46] TEACHER: up thousand connections. It does not take much time. How's the connection establishing in my   {#2988}
[03:03:50] STUDENT_10: shot is nothing, nothing for the server. Okay. And the second point was not sure.   {#2989}
[03:03:57] STUDENT_10: I joined a bit late, but like we have now some frameworks like react query also,   {#2990}
[03:04:03] STUDENT_10: which caches the API response as well on the client side. So if you are making a server API   {#2991}
[03:04:09] STUDENT_10: call and if the response is not changing, then the react query will automatically give you the   {#2992}
[03:04:16] STUDENT_10: So that is also one use case of that.   {#2993}
[03:04:19] TEACHER: It might be, it might be caching it in your native JavaScript runtime memory of that,   {#2994}
[03:04:25] TEACHER: or maybe local storage, wherever it is choosing to cache, but that's an excellent example.   {#2995}
[03:04:31] TEACHER: See every where you see caching, like no one wants to do repetitive computation.   {#2996}
[03:04:35] TEACHER: That's why dynamic programming, right?   {#2997}
[03:04:37] TEACHER: You do memoization, ensuring that you don't re do the same things again in it.   {#2998}
[03:04:43] TEACHER: Adit.   {#2999}
[03:04:44] STUDENT_2: Hey, hi, one basic question for in, uh, long polling and server side server sent events   {#3000}
[03:04:52] STUDENT_2: in both of the cases, uh, TCP connection would be open, right?   {#3001}
[03:04:56] STUDENT_2: Yes.   {#3002}
[03:04:56] STUDENT_2: So in case of SSE, uh, when is the TCP connection closed?   {#3003}
[03:05:02] TEACHER: When your client wants to terminate it, it's on the side of the client, either the server   {#3004}
[03:05:07] TEACHER: goes down or the client chooses to terminate the connection that I'm done consuming.   {#3005}
[03:05:12] TEACHER: Okay.   {#3006}
[03:05:13] STUDENT_5: Okay.   {#3007}
[03:05:14] STUDENT_5: Okay. Thank you.   {#3008}
[03:05:15] STUDENT_5: Yeah. Thank you.   {#3009}
[03:05:17] STUDENT_5: Sure. Great.   {#3010}
[03:05:18] STUDENT_5: Any other question?   {#3011}
[03:05:18] STUDENT_5: Anyone?   {#3012}
---- OWNED SEGMENTS END ----

CTX| [03:05:22] STUDENT_1: Yeah. We check.   {#3013}
CTX| [03:05:25] STUDENT_1: So how do you test those SSC type of connections?   {#3014}
CTX| [03:05:30] STUDENT_5: As in how do I test?   {#3015}
CTX| [03:05:31] STUDENT_1: Is it like, uh, how, how can, how, how do we like ensure that like any, any sort of a   {#3016}
CTX| [03:05:37] STUDENT_1: unit testing or.   {#3017}
CTX| [03:05:39] TEACHER: I've never write.   {#3018}
CTX| [03:05:40] TEACHER: I've never written tests on servers that I just deployed in production.   {#3019}
CTX| [03:05:44] TEACHER: I wanted to write the deployment logs that I gave as an example.   {#3020}
CTX| [03:05:47] TEACHER: I just built it.   {#3021}
CTX| [03:05:48] TEACHER: I never tested.   {#3022}
CTX| [03:05:49] TEACHER: I never wrote unit test for connections per se.   {#3023}
CTX| [03:05:52] TEACHER: Never.   {#3024}
CTX| [03:05:53] TEACHER: I just said, but I do, I have tested what needs to be done when you   {#3025}
CTX| [03:05:57] TEACHER: receive a certain type of message, never tested the connection, but I've   {#3026}
CTX| [03:06:02] TEACHER: tested what I received on the connection.   {#3027}
CTX| [03:06:06] TEACHER: Right.   {#3028}
CTX| [03:06:06] TEACHER: So you can rely on that anyway, because that would be functional anyway.   {#3029}
CTX| [03:06:11] TEACHER: Okay.   {#3030}
CTX| [03:06:11] TEACHER: So I did test the business logic on what to do when I receive a certain type of message   {#3031}
CTX| [03:06:17] TEACHER: on SSE and not the actual connection connection.   {#3032}
CTX| [03:06:22] STUDENT_1: Yeah.   {#3033}
CTX| [03:06:22] STUDENT_1: And one more follow up question.   {#3034}
