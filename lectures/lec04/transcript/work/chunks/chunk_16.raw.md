# chunk_16  OWNS 02:59:03 -> 03:06:46  (segments #2939-#3121, 1354 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:58:11] STUDENT_1: or the connection that after which it would be deleted it cannot be too small because if it is   {#2925}
CTX| [02:58:18] STUDENT_1: connections to the backend or to the database.   {#2926}
CTX| [02:58:20] STUDENT_1: If it's too large, then you are having unused, a large number of unused connections.   {#2927}
CTX| [02:58:25] STUDENT_1: So you need to find a sweet spot and it depends on the use case.   {#2928}
CTX| [02:58:28] STUDENT_1: Why?   {#2929}
CTX| [02:58:28] STUDENT_1: Because let's say you are having, you are firing queries, which are taking longer time   {#2930}
CTX| [02:58:33] STUDENT_1: on your database to execute, which means you need to keep the connections open for a very   {#2931}
CTX| [02:58:37] STUDENT_1: long time, which means that you cannot have a short TTL.   {#2932}
CTX| [02:58:41] STUDENT_1: Yes.   {#2933}
CTX| [02:58:42] STUDENT_1: So depending on what your use case is,   {#2934}
CTX| [02:58:46] STUDENT_1: so one factor or one metric that you should track is average time for SQL query   {#2935}
CTX| [02:58:51] TEACHER: completion on your database workflow.   {#2936}
CTX| [02:58:54] TEACHER: That is the most important factor that would help you tune your connection   {#2937}
CTX| [02:58:58] TEACHER: pool the best, right?   {#2938}

---- OWNED SEGMENTS START ----
[02:59:03] STUDENT_1: Think on those slides.   {#2939}
[02:59:06] STUDENT_6: Yeah.   {#2940}
[02:59:07] STUDENT_2: If just small follow up with, if the average time to query a particular table for a particular   {#2941}
[02:59:14] STUDENT_2: record, let's say for a particular variable, it goes up.   {#2942}
[02:59:18] STUDENT_2: Then if we have a very frequent use case for that, we should think about expanding our   {#2943}
[02:59:22] STUDENT_2: connection pool for that DB.   {#2944}
[02:59:24] STUDENT_2: Correct.   {#2945}
[02:59:26] STUDENT_2: Yeah.   {#2946}
[02:59:26] STUDENT_2: Thank you.   {#2947}
[02:59:27] STUDENT_2: That was very insightful.   {#2948}
[02:59:28] STUDENT_2: Yeah.   {#2949}
[02:59:29] STUDENT_10: Great.   {#2950}
[02:59:29] STUDENT_10: Deepak.   {#2951}
[02:59:31] STUDENT_4: So I wanted to know like in case of a database server, we have multiple, we have fixed number   {#2952}
[02:59:38] STUDENT_4: of codes and each TCP connection is two codes.   {#2953}
[02:59:40] STUDENT_4: So how we maintain more than 30,000 connections?   {#2954}
[02:59:44] STUDENT_1: Yeah, just a Google search.   {#2955}
[02:59:45] STUDENT_1: Just a Google search.   {#2956}
[02:59:47] TEACHER: See something that can be Google search to ECD.   {#2957}
[02:59:49] TEACHER: I would recommend do that.   {#2958}
[02:59:51] TEACHER: Do a Google search in case you still don't find an answer more than happy to answer it,   {#2959}
[02:59:55] TEACHER: but spend some time because you will stumble upon something very interesting.   {#2960}
[02:59:58] TEACHER: So, Hussain Nasser has a great video on that.   {#2961}
[03:00:01] TEACHER: You'll find a couple of stack overflow answers on it.   {#2962}
[03:00:03] TEACHER: Like, how that happens.   {#2963}
[03:00:04] TEACHER: There is a hardware specification that you would stumble upon.   {#2964}
[03:00:07] TEACHER: Google search.   {#2965}
[03:00:08] TEACHER: Google search.   {#2966}
[03:00:10] TEACHER: Right?   {#2967}
[03:00:10] TEACHER: In case you still don't get an answer, by third week, I'll be more than happy to answer.   {#2968}
[03:00:13] TEACHER: Because that's when it would be much more relevant.   {#2969}
[03:00:15] TEACHER: Right?   {#2970}
[03:00:16] TEACHER: More than happy to answer that.   {#2971}
[03:00:19] TEACHER: Sure.   {#2972}
[03:00:19] TEACHER: Husha?   {#2973}
[03:00:20] STUDENT_15: Can you hear me now?   {#2974}
[03:00:22] STUDENT_6: Yeah.   {#2975}
[03:00:23] STUDENT_6: So, yeah.   {#2976}
[03:00:23] STUDENT_6: I was asking key when we use TTL to save space, uh, we are increasing   {#2977}
[03:00:28] STUDENT_6: computation power on Reddit side.   {#2978}
[03:00:30] STUDENT_6: So how to do that trade-off.   {#2979}
[03:00:34] STUDENT_1: How did it is that the space was important.   {#2980}
[03:00:37] TEACHER: That's why we did that.   {#2981}
[03:00:38] STUDENT_6: Yeah.   {#2982}
[03:00:39] TEACHER: In case space is not important.   {#2983}
[03:00:40] TEACHER: You skip that.   {#2984}
[03:00:41] TEACHER: Okay.   {#2985}
[03:00:41] TEACHER: You just keep those entries handy there.   {#2986}
[03:00:43] STUDENT_6: Okay.   {#2987}
[03:00:44] STUDENT_6: So that computation power won't slow down the system that much, not   {#2988}
[03:00:48] TEACHER: much because it's in memory deletion.   {#2989}
[03:00:50] TEACHER: It's peanuts for redis.   {#2990}
[03:00:51] TEACHER: speedups oh thank you yeah great questions quite quite interesting loved every one of them   {#2991}
[03:01:00] TEACHER: nice i have a couple of notes to make on this point because these are excellent questions i   {#2992}
[03:01:06] TEACHER: loved it thanks thanks so much any other question anyone before i wrap yeah anything   {#2993}
[03:01:12] TEACHER: um so uh so today i mean i quite learned like uh uh like how to do like um you said right the   {#2994}
[03:01:21] TEACHER: gain something, we have to lose something.   {#2995}
[03:01:23] TEACHER: Right.   {#2996}
[03:01:23] TEACHER: So, uh, you know, how to build that intuition that we are making the right   {#2997}
[03:01:28] TEACHER: choice, we are making the right trade-offs.   {#2998}
[03:01:32] STUDENT_1: So at the end of eight weeks, second era, you'll have this intuition.   {#2999}
[03:01:39] STUDENT_1: Bill, every single decision, every single system will design.   {#3000}
[03:01:42] STUDENT_1: We'll do this.   {#3001}
[03:01:43] STUDENT_1: We'll spend hours talking about those trade-offs over time.   {#3002}
[03:01:47] TEACHER: Intuition will be the hundred percent.   {#3003}
[03:01:49] TEACHER: Right.   {#3004}
[03:01:51] TEACHER: of this course which i understand now that it just pro i'll and today we didn't have any brainstorming   {#3005}
[03:01:56] STUDENT_1: right but next week on what when we'll have those brainstorming right we'll not move forward unless   {#3006}
[03:02:02] STUDENT_1: and until we have answers that why are we making a certain decision what are the trade-offs for that   {#3007}
[03:02:07] TEACHER: and then only we'll be moving forward so over time it will be done don't worry and also you mentioned   {#3008}
[03:02:13] TEACHER: about uh not to overthink and just go with a certain solution and just try it on yeah so um   {#3009}
[03:02:21] TEACHER: learn about that? Like, uh, at what stage we need to just stop it and just go with the solution.   {#3010}
[03:02:26] TEACHER: That would be, it will happen. Sixth week, we'll wear three hats. Uh, six week. We in one of the   {#3011}
[03:02:33] TEACHER: discussion, like it's not, and obviously this is not just an engineering course. So what we will do   {#3012}
[03:02:38] TEACHER: is we'll think from different perspectives, same system from a management perspective, from managers,   {#3013}
[03:02:46] TEACHER: from product managers perspective, from senior engineer perspective, from junior engineer   {#3014}
[03:02:51] TEACHER: understand where to draw that line.   {#3015}
[03:02:53] TEACHER: So all of that is covered.   {#3016}
[03:02:54] TEACHER: Six weeks, second day, we'll discuss that.   {#3017}
[03:02:56] STUDENT_6: Great.   {#3018}
[03:02:57] STUDENT_6: Thanks.   {#3019}
[03:02:57] STUDENT_6: Thanks.   {#3020}
[03:02:59] TEACHER: Gaurav?   {#3021}
[03:03:01] TEACHER: Uh, so this is very, very basic question.   {#3022}
[03:03:03] TEACHER: You mentioned in the very beginning that HTTP is a stateless and the   {#3023}
[03:03:08] TEACHER: connections are not always on.   {#3024}
[03:03:10] TEACHER: Uh, no.   {#3025}
[03:03:11] TEACHER: So, so HTTP is designed to be stateless people like, but you can still have a   {#3026}
[03:03:16] TEACHER: persistent HTTP connection where you can pass in that, uh, basically keep   {#3027}
[03:03:21] TEACHER: Your web server understands that I've got this keep alive header.   {#3028}
[03:03:24] TEACHER: So I'll not terminate it, but HTTP in itself is a stateless thing.   {#3029}
[03:03:31] TEACHER: Okay.   {#3030}
[03:03:31] TEACHER: Which means that it's one request.   {#3031}
[03:03:33] TEACHER: You send a request, you get a response, deal done, but there are ways to keep the   {#3032}
[03:03:37] TEACHER: connection support HTTP two keeps the persistent connections.   {#3033}
[03:03:40] TEACHER: Web socket keeps up.   {#3034}
[03:03:41] TEACHER: Web socket is not HTTP, but it keeps the persistent connection.   {#3035}
[03:03:44] TEACHER: So there is no rule which says that you cannot, or you have to always   {#3036}
[03:03:47] TEACHER: terminate the connection.   {#3037}
[03:03:48] TEACHER: Right.   {#3038}
[03:03:49] TEACHER: But what happens is the web servers have made those hacks by passing in a specific header.   {#3039}
[03:03:57] TEACHER: The web server would not terminate because what happens is your client sends a request,   {#3040}
[03:04:00] TEACHER: your server sends a response and server terminates the connection.   {#3041}
[03:04:03] TEACHER: So if your server doesn't terminate a connection, client does not terminate the connection.   {#3042}
[03:04:07] TEACHER: The connection will always remain open.   {#3043}
[03:04:09] TEACHER: Which is what this keep alive header that you pass in to keep the connection open does for you.   {#3044}
[03:04:16] TEACHER: But motor motor overall understand that HTTP, think of it as a stateless.   {#3045}
[03:04:21] TEACHER: It would simplify your design much because making it state full, you would find other   {#3046}
[03:04:26] TEACHER: better options.   {#3047}
[03:04:28] TEACHER: Like for the web sockets, MQTT that would come in very handy when you'd want to make   {#3048}
[03:04:32] TEACHER: HTTP state.   {#3049}
[03:04:33] TEACHER: Right.   {#3050}
[03:04:34] TEACHER: But that's a simplistic way, overly simplistic way to do it at one in one of the systems   {#3051}
[03:04:39] TEACHER: in the future, we'll use HTTP to specifically and we'll keep it stateful.   {#3052}
[03:04:44] TEACHER: Right.   {#3053}
[03:04:45] TEACHER: We'll also talk about that.   {#3054}
[03:04:46] TEACHER: But where to use it, how to use it,   {#3055}
[03:04:48] TEACHER: we'll go into depth of it   {#3056}
[03:04:50] TEACHER: and then make that same decision.   {#3057}
[03:04:52] TEACHER: Why are we going on those routes   {#3058}
[03:04:53] TEACHER: and not making a statement?   {#3059}
[03:04:55] TEACHER: So we'll talk about it.   {#3060}
[03:04:56] TEACHER: So a lot of things will be covered.   {#3061}
[03:04:57] TEACHER: So fifth week, second day.   {#3062}
[03:05:00] TEACHER: And also in one of the resources   {#3063}
[03:05:01] TEACHER: that you shared previously,   {#3064}
[03:05:03] TEACHER: it was mentioned that HTTP   {#3065}
[03:05:05] TEACHER: cannot be used on top of TCP.   {#3066}
[03:05:07] TEACHER: Is it true?   {#3067}
[03:05:08] TEACHER: HTTP is on top of TCP.   {#3068}
[03:05:09] TEACHER: Which resource was that, Baba?   {#3069}
[03:05:11] TEACHER: Okay, I might have misunderstood it.   {#3070}
[03:05:15] TEACHER: Share it with me, share it with me.   {#3071}
[03:05:16] TEACHER: Just, just drop me a DM.   {#3072}
[03:05:18] TEACHER: I read through all three.   {#3073}
[03:05:19] TEACHER: I don't think there is any, but in case there is something I'll just   {#3074}
[03:05:22] TEACHER: shoot a clarification.   {#3075}
[03:05:23] TEACHER: Uh, HTTP is TC.   {#3076}
[03:05:25] TEACHER: HTTP is a protocol.   {#3077}
[03:05:26] TEACHER: HTTP is a specification.   {#3078}
[03:05:28] TEACHER: Uh, and TCP is the layer for protocol.   {#3079}
[03:05:31] TEACHER: So no relation.   {#3080}
[03:05:32] TEACHER: So you can run, you can send HTTP message on top of UDP also.   {#3081}
[03:05:36] TEACHER: No one's stopping you from doing that.   {#3082}
[03:05:37] STUDENT_1: Right.   {#3083}
[03:05:38] STUDENT_1: So that's fine.   {#3084}
[03:05:39] STUDENT_1: Thank you.   {#3085}
[03:05:40] STUDENT_1: Sure.   {#3086}
[03:05:40] STUDENT_1: Sankal.   {#3087}
[03:05:47] TEACHER: So I got gone.   {#3088}
[03:05:52] TEACHER: So I can be inaudible.   {#3089}
[03:05:54] TEACHER: So shoot me a DM with your question because morning also your voice was not that.   {#3090}
[03:06:00] TEACHER: So check the mic, shoot me a DM more than happy to answer your question.   {#3091}
[03:06:04] TEACHER: Right.   {#3092}
[03:06:05] TEACHER: Great.   {#3093}
[03:06:06] TEACHER: Any other question?   {#3094}
[03:06:07] TEACHER: Anyone?   {#3095}
[03:06:12] TEACHER: Super.   {#3096}
[03:06:13] TEACHER: Thanks folks for tuning in.   {#3097}
[03:06:15] TEACHER: upload the recording by tonight.   {#3098}
[03:06:17] TEACHER: I'll shoot a message.   {#3099}
[03:06:19] TEACHER: I'll shoot an email when that's done.   {#3100}
[03:06:21] TEACHER: Sometimes it's happened by two also.   {#3101}
[03:06:23] TEACHER: But I cannot commit to that.   {#3102}
[03:06:24] TEACHER: I can commit to end of the day.   {#3103}
[03:06:26] TEACHER: So we'll upload the recording,   {#3104}
[03:06:28] TEACHER: upload the notes,   {#3105}
[03:06:28] TEACHER: what we just shared.   {#3106}
[03:06:30] TEACHER: You'll have access to that.   {#3107}
[03:06:31] TEACHER: You'll get an email on that.   {#3108}
[03:06:32] TEACHER: See you folks tomorrow morning.   {#3109}
[03:06:34] TEACHER: Remember that fun exercise.   {#3110}
[03:06:35] TEACHER: Do that.   {#3111}
[03:06:36] TEACHER: We'll discover something   {#3112}
[03:06:37] TEACHER: very interesting tomorrow.   {#3113}
[03:06:39] TEACHER: Right?   {#3114}
[03:06:39] TEACHER: Sure.   {#3115}
[03:06:39] TEACHER: Thanks folks for tuning   {#3116}
[03:06:40] TEACHER: and have a great day.   {#3117}
[03:06:41] TEACHER: Bye-bye.   {#3118}
[03:06:43] STUDENT_8: Thank you.   {#3119}
[03:06:44] STUDENT_8: Bye.   {#3120}
[03:06:46] STUDENT_8: Thank you.   {#3121}
