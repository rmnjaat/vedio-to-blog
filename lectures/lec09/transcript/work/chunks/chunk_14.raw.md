# chunk_14  OWNS 02:36:28 -> 02:47:12  (segments #2762-#2973, 1761 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:35:28] TEACHER: at every step you do you find that pattern and you fix it you learn about batching and counting and   {#2741}
CTX| [02:35:33] TEACHER: the standard way to or almost a standard way to think about system is read path and write path   {#2742}
CTX| [02:35:39] TEACHER: optimization think of what the read paths are think of what the right paths are and then tackle   {#2743}
CTX| [02:35:42] TEACHER: one at a time because there's standard practice is to scale the read separately in the right shape   {#2744}
CTX| [02:35:46] TEACHER: right okay and this is all what i wanted to cover now i'll take questions folks who want to drop   {#2745}
CTX| [02:35:52] TEACHER: up will be to drop off everything else will be anyway part of the recording uh tomorrow we'll   {#2746}
CTX| [02:35:58] TEACHER: social networks again.   {#2747}
CTX| [02:36:00] TEACHER: And we'll be talking about,   {#2748}
CTX| [02:36:02] TEACHER: we'll be tomorrow implementing   {#2749}
CTX| [02:36:03] TEACHER: image optimization service. Today we   {#2750}
CTX| [02:36:05] TEACHER: saw how CDN, how we can leverage   {#2751}
CTX| [02:36:07] TEACHER: CDN to do that. Tomorrow we'll implement   {#2752}
CTX| [02:36:09] TEACHER: it. And very interesting   {#2753}
CTX| [02:36:12] TEACHER: problem assessment   {#2754}
CTX| [02:36:13] TEACHER: around message indicators.   {#2755}
CTX| [02:36:15] TEACHER: We'll talk about that in there.   {#2756}
CTX| [02:36:17] TEACHER: I'll upload a recording by evening   {#2757}
CTX| [02:36:19] TEACHER: and notes and recordings by the evening   {#2758}
CTX| [02:36:21] TEACHER: you'll be notified over email.   {#2759}
CTX| [02:36:24] TEACHER: Okay.   {#2760}
CTX| [02:36:25] TEACHER: Yeah, something caught.   {#2761}

---- OWNED SEGMENTS START ----
[02:36:28] STUDENT_1: So, Arfit, one question that I have is,   {#2762}
[02:36:30] STUDENT_1: you said that read path and write path have to be analyzed   {#2763}
[02:36:33] STUDENT_1: and we should blow it in proportion,   {#2764}
[02:36:35] STUDENT_1: out of proportion to see how the scalability and all that stuff, right?   {#2765}
[02:36:39] STUDENT_1: But one question I have is, you have put a separate service   {#2766}
[02:36:43] STUDENT_1: or you can say simple service, whatever,   {#2767}
[02:36:46] STUDENT_1: just for reading and for writing,   {#2768}
[02:36:49] STUDENT_1: you have put another separate service, right?   {#2769}
[02:36:52] STUDENT_1: So don't you think...   {#2770}
[02:36:52] STUDENT_5: What service are you talking about?   {#2771}
[02:36:55] STUDENT_1: Can you please go to the other picture   {#2772}
[02:36:58] STUDENT_5: you were talking about read path and write path this is that only this is your read path so this   {#2773}
[02:37:03] STUDENT_5: is your write path this is your read path this is the exact same thing yeah but you said that   {#2774}
[02:37:11] STUDENT_1: one thing that you mentioned was you want to separate them out in different services right   {#2775}
[02:37:15] TEACHER: the entire read path we did not i never said we have to separate it just because it is   {#2776}
[02:37:19] TEACHER: read path and write path we separate it we approach it as separate concerns   {#2777}
[02:37:25] TEACHER: because this is web server this is asynchronous worker these two cannot be in sparta same thing   {#2778}
[02:37:30] TEACHER: correct yes that's correct we did not separate it because it's read path and write path we   {#2779}
[02:37:36] TEACHER: separated because they had different responsibilities okay these are all synchronous workers this is a   {#2780}
[02:37:42] TEACHER: web server correct that's why we separated it it's not because read path and write path is separated   {#2781}
[02:37:51] STUDENT_4: yeah i didn't really understand the part where you said the you know kafka partitioning how   {#2782}
[02:37:57] STUDENT_4: does it work when the right path uh because we talked about it second we talked about it second   {#2783}
[02:38:02] TEACHER: week what's that we we went in depth of kafka partitioning what it happens how it does that   {#2784}
[02:38:08] TEACHER: second week we talked about it   {#2785}
[02:38:12] STUDENT_4: spend one minute saying for example i have let's say you know 20 hashtags right and so then how   {#2786}
[02:38:21] STUDENT_4: many because partitions obviously cannot be as per number of hashtags right yeah yeah so so how   {#2787}
[02:38:28] TEACHER: do you bucket them basically you define n partitions you measure the throughput that you   {#2788}
[02:38:34] TEACHER: are getting if you're getting less you increase the number of partitions simple   {#2789}
[02:38:39] STUDENT_4: right no no how will you sort of batch them together so i have let's say 20 that's how   {#2790}
[02:38:46] STUDENT_4: kafka works that's how kafka works no i understand the partitioning that way yes no wait wait maybe   {#2791}
[02:38:52] STUDENT_4: i have not explained the question clearly all right so let's say i have 20 hashtags right   {#2792}
[02:38:57] STUDENT_4: now i have i have posted it to kafka right and it goes to let's say   {#2793}
[02:39:04] STUDENT_4: four partitions.   {#2794}
[02:39:05] TEACHER: When you say 20 hashtag, it comes over here.   {#2795}
[02:39:08] STUDENT_4: Right. So, let's say there are   {#2796}
[02:39:10] STUDENT_4: four partitions   {#2797}
[02:39:12] STUDENT_4: because you cannot have as many   {#2798}
[02:39:13] STUDENT_4: partitions as there are tags.   {#2799}
[02:39:15] STUDENT_4: So, let's have four partitions.   {#2800}
[02:39:17] STUDENT_4: So, one counting server is reading   {#2801}
[02:39:19] STUDENT_4: one of the partitions, right?   {#2802}
[02:39:22] STUDENT_4: So,   {#2803}
[02:39:23] STUDENT_4: from that partition, there could   {#2804}
[02:39:25] STUDENT_4: be multiple hashtags which are not the same.   {#2805}
[02:39:27] STUDENT_4: So, how will they, the counting server   {#2806}
[02:39:29] STUDENT_4: now know, okay,   {#2807}
[02:39:31] STUDENT_4: in this partition I am reading   {#2808}
[02:39:33] STUDENT_4: now this many hashtags   {#2809}
[02:39:36] STUDENT_4: but they are not the same right how do you   {#2810}
[02:39:37] TEACHER: hash map it would read   {#2811}
[02:39:40] TEACHER: messages extract the hashtag out of   {#2812}
[02:39:42] TEACHER: it   {#2813}
[02:39:43] TEACHER: what will you send in the message in this Kafka   {#2814}
[02:39:47] TEACHER: you will send   {#2815}
[02:39:48] TEACHER: in the message this is the hashtag this is the post   {#2816}
[02:39:50] TEACHER: id correct   {#2817}
[02:39:52] TEACHER: on the counting server   {#2818}
[02:39:54] TEACHER: side have a hash table   {#2819}
[02:39:58] TEACHER: do count us plus and update   {#2820}
[02:40:01] TEACHER: map to count.   {#2821}
[02:40:04] TEACHER: What are you asking Mohan?   {#2822}
[02:40:06] TEACHER: See, this is where you get hashtag and post.   {#2823}
[02:40:09] TEACHER: Correct?   {#2824}
[02:40:10] TEACHER: Here you have hash table.   {#2825}
[02:40:11] TEACHER: And you have an integer.   {#2826}
[02:40:13] TEACHER: You have to count plus plus every time you read the message.   {#2827}
[02:40:17] STUDENT_7: Okay.   {#2828}
[02:40:18] STUDENT_4: Got it.   {#2829}
[02:40:18] STUDENT_4: No, no, no.   {#2830}
[02:40:19] STUDENT_4: That's okay.   {#2831}
[02:40:19] STUDENT_4: You know, we don't always, not everybody is as sharp as you.   {#2832}
[02:40:24] STUDENT_4: So please don't disperse the questions.   {#2833}
[02:40:26] STUDENT_4: No, I'm not disperse the question.   {#2834}
[02:40:28] TEACHER: This is, it's not being sharp.   {#2835}
[02:40:31] TEACHER: It's not being sharp Mohan.   {#2836}
[02:40:32] TEACHER: First of all, you distracted me.   {#2837}
[02:40:34] TEACHER: I have specifically said, please don't raise the question.   {#2838}
[02:40:37] TEACHER: And this is not, I'm not saying this is a stupid question.   {#2839}
[02:40:40] TEACHER: This is very simple detail where I cannot literally write every single line over here.   {#2840}
[02:40:46] TEACHER: I'm not here to implement the actual service.   {#2841}
[02:40:49] TEACHER: Correct?   {#2842}
[02:40:50] TEACHER: It's not dispersing the question Mohan.   {#2843}
[02:40:52] TEACHER: And I'm not disrespecting you in any case.   {#2844}
[02:40:54] TEACHER: I'm just saying that this is something that you can very easily chalk up.   {#2845}
[02:41:01] TEACHER: It's not that difficult.   {#2846}
[02:41:02] TEACHER: I literally cannot spoon feed everything.   {#2847}
[02:41:05] TEACHER: I'm more than happy to answer questions.   {#2848}
[02:41:07] TEACHER: I've stretched the session still four, four and a half hours as well.   {#2849}
[02:41:09] TEACHER: And you know it, right?   {#2850}
[02:41:11] TEACHER: I'm a hundred percent without disrespecting you in any case.   {#2851}
[02:41:14] TEACHER: It just that this is something that you could think about.   {#2852}
[02:41:20] TEACHER: And I just, it's my natural reaction to it.   {#2853}
[02:41:22] TEACHER: That it's simple.   {#2854}
[02:41:23] TEACHER: Then you're just sending, if you need to count it or group it by hashtag,   {#2855}
[02:41:31] TEACHER: send that information that this is the hashtag.   {#2856}
[02:41:32] TEACHER: This is the post which is going over here.   {#2857}
[02:41:34] TEACHER: You can put it in a hash table and say, this is the hashtag.   {#2858}
[02:41:37] TEACHER: This is an integer which starts with zero and do count plus plus.   {#2859}
[02:41:40] TEACHER: Once you have enough batch, you put it onto DB.   {#2860}
[02:41:43] STUDENT_5: And then that's how we move forward.   {#2861}
[02:41:45] STUDENT_5: Right.   {#2862}
[02:41:46] STUDENT_5: Sure.   {#2863}
[02:41:47] STUDENT_5: Thank you.   {#2864}
[02:41:49] STUDENT_3: Mohit.   {#2865}
[02:41:50] STUDENT_3: Yeah.   {#2866}
[02:41:51] STUDENT_3: I have a couple of questions.   {#2867}
[02:41:53] STUDENT_3: First is when we are getting those top hundred items from popularity   {#2868}
[02:41:58] STUDENT_3: service. Like, uh, I think in this, we have assumed that the popularity service would also   {#2869}
[02:42:04] STUDENT_3: be giving popularity based on hashtag. Whereas that we don't care about it. No, uh, whatever   {#2870}
[02:42:10] STUDENT_3: the logic is extension to that is basically, if that is not based on hashtag, then you would   {#2871}
[02:42:15] STUDENT_3: probably need some sort of, uh, like this adapter to, uh, get the hashtags from there as well.   {#2872}
[02:42:23] STUDENT_3: Right.   {#2873}
[02:42:24] TEACHER: If they need it, if they need it, they can consume it from here as well.   {#2874}
[02:42:28] TEACHER: They can listen to this Kafka.   {#2875}
[02:42:30] TEACHER: Correct.   {#2876}
[02:42:32] STUDENT_3: Okay.   {#2877}
[02:42:33] STUDENT_3: Got it.   {#2878}
[02:42:33] TEACHER: Here we anyway have that information.   {#2879}
[02:42:35] TEACHER: Why do we use that?   {#2880}
[02:42:36] TEACHER: Right.   {#2881}
[02:42:37] TEACHER: Why do, why do they have to rebuild that same thing that we did over here?   {#2882}
[02:42:40] TEACHER: So that's a great question because now if they want to leverage, uh, that this   {#2883}
[02:42:46] TEACHER: photo is clicked this many times and like something like this has happened, they   {#2884}
[02:42:49] TEACHER: can, if they want data, which is there in this Kafka in that specific format,   {#2885}
[02:42:54] TEACHER: consume process here. The consumer of this Kafka right now is the counting   {#2886}
[02:42:57] TEACHER: server. Right. And tomorrow they might like data science might also start   {#2887}
[02:43:02] TEACHER: consuming from this Kafka to do their crunching if they want, if they want.   {#2888}
[02:43:06] STUDENT_3: Okay. Uh, one more question. Um, like this is slightly can go little off   {#2889}
[02:43:13] STUDENT_3: tangential. Um, um, this is around the redis pub sub. I think we use redis   {#2890}
[02:43:19] STUDENT_3: pubs up in our chat application design as well, wherein the idea was to kind of model each group   {#2891}
[02:43:27] STUDENT_3: or each, I would say membership as a Redis channel, right? To basically send information   {#2892}
[02:43:35] STUDENT_3: between different chat servers when WebSocket clients are not attached on the same server.   {#2893}
[02:43:41] STUDENT_3: So now your membership could also grow in a huge volume, right? You could maybe have millions of   {#2894}
[02:43:49] STUDENT_3: membership, right? Which in case of WhatsApp would be mimicked as WhatsApp groups. So you said,   {#2895}
[02:43:57] STUDENT_3: when we were doing this hashtag extraction part that Reddit's PubSub would kind of be,   {#2896}
[02:44:05] STUDENT_3: can be an overkill and it will have a huge, so like, I just want to have your thoughts on this,   {#2897}
[02:44:14] STUDENT_3: like how does Reddit pubs up fits there and not here?   {#2898}
[02:44:18] STUDENT_3: Like these are...   {#2899}
[02:44:19] TEACHER: It would not...   {#2900}
[02:44:20] TEACHER: There we needed real-time pubs up.   {#2901}
[02:44:22] TEACHER: Here we don't need real-time.   {#2902}
[02:44:24] TEACHER: When it is real-time, it does not give you persistence.   {#2903}
[02:44:27] TEACHER: Whichever connection,   {#2904}
[02:44:28] TEACHER: whichever server is connected to Reddit   {#2905}
[02:44:30] TEACHER: at that time, subscribe it to that channel   {#2906}
[02:44:32] TEACHER: will get the message.   {#2907}
[02:44:33] TEACHER: Correct?   {#2908}
[02:44:34] TEACHER: Here, we do not want that.   {#2909}
[02:44:36] TEACHER: Here, accounting services consuming at its own sweet pace,   {#2910}
[02:44:39] TEACHER: we still want messages to be persistent over here.   {#2911}
[02:44:41] TEACHER: If not, what would happen is what if one of the server is down?   {#2912}
[02:44:47] TEACHER: Hashtag extension is sending the message.   {#2913}
[02:44:49] TEACHER: Other server is down, which is never receiving it.   {#2914}
[02:44:51] TEACHER: And that message is discarded.   {#2915}
[02:44:52] TEACHER: Do you want that?   {#2916}
[02:44:54] TEACHER: No.   {#2917}
[02:44:55] TEACHER: You don't want real time pubs up.   {#2918}
[02:44:58] TEACHER: You still want pubs up, kind of pubs up, but you don't want real time pubs up.   {#2919}
[02:45:03] TEACHER: That's what the differentiation is.   {#2920}
[02:45:05] TEACHER: Here the counting servers can count it at its own sweet pace.   {#2921}
[02:45:09] STUDENT_3: Okay.   {#2922}
[02:45:10] STUDENT_3: Okay.   {#2923}
[02:45:11] STUDENT_3: was the difference here.   {#2924}
[02:45:14] STUDENT_5: Persistence and speed of consumption.   {#2925}
[02:45:17] STUDENT_3: But I think if I keep   {#2926}
[02:45:19] STUDENT_3: the   {#2927}
[02:45:22] STUDENT_3: persistence part   {#2928}
[02:45:24] STUDENT_3: aside, I think speed   {#2929}
[02:45:26] STUDENT_3: of consumption, I think a resist   {#2930}
[02:45:27] STUDENT_3: would also be   {#2931}
[02:45:29] STUDENT_3: this would bombard   {#2932}
[02:45:33] TEACHER: a server. Let's say there is a   {#2933}
[02:45:35] TEACHER: very popular hashtag. Very   {#2934}
[02:45:38] TEACHER: popular. A lot of things are   {#2935}
[02:45:39] TEACHER: popping out. Continuous state would send   {#2936}
[02:45:41] TEACHER: the message across one of the server would keep on getting   {#2937}
[02:45:44] TEACHER: bombarded because it's push based, not full based.   {#2938}
[02:45:47] STUDENT_3: Okay.   {#2939}
[02:45:48] STUDENT_3: Okay.   {#2940}
[02:45:49] TEACHER: Consumers are full based.   {#2941}
[02:45:50] STUDENT_3: They are batching.   {#2942}
[02:45:51] STUDENT_3: Yeah.   {#2943}
[02:45:51] STUDENT_3: Yeah.   {#2944}
[02:45:52] STUDENT_3: Okay.   {#2945}
[02:45:52] STUDENT_3: Got it.   {#2946}
[02:45:52] STUDENT_3: Those are batch mode.   {#2947}
[02:45:53] STUDENT_3: Okay.   {#2948}
[02:45:54] STUDENT_3: Fine.   {#2949}
[02:45:54] TEACHER: Plus, plus this is also adding to the DB.   {#2950}
[02:45:58] TEACHER: So these are over well, they put data out.   {#2951}
[02:46:01] TEACHER: So they need to batch and then write.   {#2952}
[02:46:03] TEACHER: If this DB is overwhelmed due to any reason, the right would take time.   {#2953}
[02:46:07] TEACHER: By the time the message comes in, this would get overwhelmed even further.   {#2954}
[02:46:11] TEACHER: So slowness of your database would also affect the rate of consumption.   {#2955}
[02:46:18] TEACHER: In case of real-time.   {#2956}
[02:46:21] TEACHER: Got it.   {#2957}
[02:46:22] STUDENT_3: Got it.   {#2958}
[02:46:23] STUDENT_3: Thanks.   {#2959}
[02:46:23] STUDENT_3: Thanks a lot.   {#2960}
[02:46:24] TEACHER: Yeah.   {#2961}
[02:46:24] TEACHER: And then we were able to use it because that was our use case.   {#2962}
[02:46:27] TEACHER: We wanted because the latency had to be minimal.   {#2963}
[02:46:30] TEACHER: We had to push the messages to the user rather than users pulling it out because   {#2964}
[02:46:34] TEACHER: server could not pull the messages.   {#2965}
[02:46:36] TEACHER: We anyway wanted very low latency because it was chat.   {#2966}
[02:46:39] TEACHER: Right.   {#2967}
[02:46:43] TEACHER: subject. Great question. Loved it.   {#2968}
[02:46:46] STUDENT_8: Uh, yeah. Hi. So my question was regarding this, uh, popular,   {#2969}
[02:46:54] STUDENT_8: a popularity service. So instead of like having a separate   {#2970}
[02:46:58] STUDENT_8: Kappa, would it be like more sufficient? Like, uh, if the   {#2971}
[02:47:03] STUDENT_8: popularity, this service directly call like, uh, use webhooks   {#2972}
[02:47:08] STUDENT_8: and directly call the API servers.   {#2973}
---- OWNED SEGMENTS END ----

CTX| [02:47:12] STUDENT_5: Right.   {#2974}
CTX| [02:47:13] STUDENT_8: There's API server update that because it would not be that frequent, right?   {#2975}
CTX| [02:47:18] STUDENT_8: This popularity.   {#2976}
CTX| [02:47:20] TEACHER: That's a good approach.   {#2977}
CTX| [02:47:21] TEACHER: Right.   {#2978}
CTX| [02:47:22] TEACHER: But again, pros and cons, everything in computer science is a trade-off.   {#2979}
CTX| [02:47:26] TEACHER: Now you need to know what you are trading, which things for what.   {#2980}
CTX| [02:47:31] TEACHER: So what you're suggesting is what a popularity service directly writes to DB through a hashtag   {#2981}
CTX| [02:47:37] TEACHER: API through whatever they're doing.   {#2982}
CTX| [02:47:38] TEACHER: Right.   {#2983}
CTX| [02:47:39] TEACHER: If they do it, they need to implement the code to make a call to your API.   {#2984}
CTX| [02:47:44] TEACHER: Imagine that is data science team.   {#2985}
CTX| [02:47:46] TEACHER: Right.   {#2986}
CTX| [02:47:47] TEACHER: Why would they do that?   {#2987}
CTX| [02:47:48] TEACHER: They say, it's not our job.   {#2988}
CTX| [02:47:50] TEACHER: We'll write it to Kafka and done.   {#2989}
CTX| [02:47:52] TEACHER: Humans, humans, right?   {#2990}
CTX| [02:47:55] TEACHER: No, like, because then they have to manage that system.   {#2991}
CTX| [02:47:59] TEACHER: Wow.   {#2992}
CTX| [02:47:59] TEACHER: Now you would say, my system was down.   {#2993}
CTX| [02:48:01] TEACHER: Let's say you do some reason I'm hashtag API was down summary.   {#2994}
CTX| [02:48:05] TEACHER: Right.   {#2995}
CTX| [02:48:06] TEACHER: They were that, that those who are folks were making web, who calls to our HTTP server and   {#2996}
CTX| [02:48:12] TEACHER: your server was down and you lost that update.   {#2997}
