# chunk_15  OWNS 02:45:27 -> 02:55:51  (segments #2842-#3092, 1768 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:44:30] TEACHER: So one time right over here, one time right over here for everything else.   {#2830}
CTX| [02:44:33] TEACHER: I'm just checking it over here.   {#2831}
CTX| [02:44:35] TEACHER: Correct.   {#2832}
CTX| [02:44:35] TEACHER: Because if it exists already, so let's say I take this example.   {#2833}
CTX| [02:44:39] TEACHER: If B sent a message to see if this entry already exists, why should I write it over   {#2834}
CTX| [02:44:45] TEACHER: here?   {#2835}
CTX| [02:44:47] TEACHER: right right so here i'll just check i don't have to create 99999 entries over here correct   {#2836}
CTX| [02:44:52] TEACHER: got it uh yeah there was a gap in my understanding i was thinking you are just incrementing the count   {#2837}
CTX| [02:44:56] TEACHER: here also no no there is no count there is no count over here this is just existence   {#2838}
CTX| [02:45:00] STUDENT_4: just existence got it got it got it got it yeah thank you uh i had question related to clear   {#2839}
CTX| [02:45:10] STUDENT_2: status because somewhere when we always keep B to C true, right?   {#2840}
CTX| [02:45:17] STUDENT_2: I read the message by clicking and then again B to C happens.   {#2841}

---- OWNED SEGMENTS START ----
[02:45:27] TEACHER: So when you clicked on the message icon, when you clicked on the message icon, this set   {#2842}
[02:45:32] TEACHER: got deleted.   {#2843}
[02:45:33] TEACHER: These entries got deleted.   {#2844}
[02:45:35] TEACHER: Okay.   {#2845}
[02:45:36] TEACHER: When another message was sent,   {#2846}
[02:45:38] TEACHER: then the entry would be created again.   {#2847}
[02:45:41] TEACHER: What is the edge case that you're talking about?   {#2848}
[02:45:43] TEACHER: Help me understand that.   {#2849}
[02:45:45] STUDENT_2: No, as long as both are getting synced,   {#2850}
[02:45:48] STUDENT_2: there is no issue.   {#2851}
[02:45:49] STUDENT_2: So I was...   {#2852}
[02:45:50] TEACHER: And obviously there is a problem.   {#2853}
[02:45:51] TEACHER: Yeah, as you very rightly said.   {#2854}
[02:45:53] TEACHER: In case, let's say you wrote over here,   {#2855}
[02:45:56] TEACHER: but this right field,   {#2856}
[02:45:57] TEACHER: or rather this right succeeded in this right field,   {#2857}
[02:46:00] TEACHER: then there is a problem.   {#2858}
[02:46:01] TEACHER: Not even denying that.   {#2859}
[02:46:02] TEACHER: Right?   {#2860}
[02:46:02] TEACHER: Not even denying that.   {#2861}
[02:46:03] TEACHER: Yeah.   {#2862}
[02:46:04] TEACHER: Right?   {#2863}
[02:46:04] TEACHER: Yeah.   {#2864}
[02:46:06] TEACHER: But it's not the end of the world.   {#2865}
[02:46:07] TEACHER: And it's very likely, very likely that the WhatsApp was that would happen.   {#2866}
[02:46:13] TEACHER: In the account, you would see two.   {#2867}
[02:46:15] TEACHER: But in reality, you would have 300 messages.   {#2868}
[02:46:19] STUDENT_7: Right?   {#2869}
[02:46:19] STUDENT_7: Yeah.   {#2870}
[02:46:20] TEACHER: And that's okay.   {#2871}
[02:46:20] TEACHER: It's still okay.   {#2872}
[02:46:21] TEACHER: Right?   {#2873}
[02:46:22] TEACHER: Because it's not dealing with a financial system or really critical things.   {#2874}
[02:46:26] TEACHER: Some inconsistency where one right succeeds, other right fails.   {#2875}
[02:46:30] TEACHER: That is a problem.   {#2876}
[02:46:31] TEACHER: But introducing that complexity of doing distributor transaction is not worth it.   {#2877}
[02:46:36] TEACHER: Right.   {#2878}
[02:46:36] TEACHER: You just accept a bit of inconsistency.   {#2879}
[02:46:39] TEACHER: Right.   {#2880}
[02:46:39] TEACHER: Yeah.   {#2881}
[02:46:40] STUDENT_2: Thanks.   {#2882}
[02:46:42] STUDENT_2: So should we build it, build this functionality where we're doing the status check API as a   {#2883}
[02:46:47] STUDENT_2: transactional base, like updating both the databases, like the auxiliary and the redis   {#2884}
[02:46:51] STUDENT_4: cluster at the same time, not required.   {#2885}
[02:46:56] TEACHER: You take up some inconsistency responses in favor of high throughput, not worth it because   {#2886}
[02:47:04] TEACHER: it's not very significant.   {#2887}
[02:47:06] TEACHER: See, what's the worst that would happen?   {#2888}
[02:47:09] TEACHER: You see two messages count of two, but in reality, you have three new messages.   {#2889}
[02:47:14] TEACHER: You're anyway, clicking on it, going on that screen, you would see a hundred messages.   {#2890}
[02:47:17] TEACHER: If that person has another thing and you did not respond and it was something about it   {#2891}
[02:47:20] TEACHER: that would send another message to you.   {#2892}
[02:47:22] TEACHER: That's okay.   {#2893}
[02:47:23] TEACHER: Right.   {#2894}
[02:47:24] TEACHER: So given how humans work, it's okay to, in this case, it's okay to have a bit of inconsistency,   {#2895}
[02:47:29] TEACHER: but why to add that unnecessary complications of distributed transactions?   {#2896}
[02:47:33] TEACHER: You really don't need that.   {#2897}
[02:47:36] STUDENT_4: Yeah.   {#2898}
[02:47:37] TEACHER: And this is again, that one thing that as engineer, you think you feel that you are   {#2899}
[02:47:41] TEACHER: cheating or by not having this real transaction, making a data going in   {#2900}
[02:47:45] TEACHER: inconsistent state, but in real world, it really does not matter.   {#2901}
[02:47:48] TEACHER: You think from user experiences perspective, what's the worst that would happen?   {#2902}
[02:47:52] TEACHER: Would it be an end of the world for them?   {#2903}
[02:47:54] TEACHER: Right.   {#2904}
[02:47:55] TEACHER: Not that.   {#2905}
[02:47:58] STUDENT_2: Yeah, but I'm just weighing with why you like, instead of building   {#2906}
[02:48:06] STUDENT_2: auxiliary radius why don't we do a read before write in the right path here read before right   {#2907}
[02:48:13] STUDENT_2: over here no in the right uh even even read is okay you're saying we don't even want to want to   {#2908}
[02:48:21] STUDENT_2: read on the database on this database right no no no i what i'm saying is i don't even want to read   {#2909}
[02:48:29] TEACHER: here okay you don't even want to get because see every instruction you fire on this db   {#2910}
[02:48:36] TEACHER: CPU consumes maybe even a slight bit of it, it consumes that.   {#2911}
[02:48:39] TEACHER: I'm just protecting this.   {#2912}
[02:48:41] TEACHER: This is like that, that, uh, beauty in the beast car rose that you are placed in this   {#2913}
[02:48:46] TEACHER: glass jar, no matter what you don't want it to crumble.   {#2914}
[02:48:50] STUDENT_2: Got it.   {#2915}
[02:48:51] STUDENT_2: Got it.   {#2916}
[02:48:51] STUDENT_2: Yeah.   {#2917}
[02:48:51] STUDENT_2: Makes sense.   {#2918}
[02:48:52] STUDENT_2: And, uh, one detail I might have missed in the Gravatar thing, uh, was there like, why   {#2919}
[02:48:59] STUDENT_2: did not we provide a user ID in the graph?   {#2920}
[02:49:02] STUDENT_2: Like that is privacy or that's by design.   {#2921}
[02:49:04] STUDENT_2: How grow that is like, I.   {#2922}
[02:49:06] TEACHER: Okay.   {#2923}
[02:49:07] TEACHER: You are saying over here why we don't have user ID.   {#2924}
[02:49:12] STUDENT_2: Yeah.   {#2925}
[02:49:13] STUDENT_2: Like, or whenever you generate something, generate even in the hash or like just scramble it with user ID, right?   {#2926}
[02:49:19] STUDENT_2: That will save a lot.   {#2927}
[02:49:20] TEACHER: No.   {#2928}
[02:49:21] TEACHER: Oh.   {#2929}
[02:49:23] TEACHER: Okay.   {#2930}
[02:49:24] TEACHER: So you are saying that, okay, somehow I inject user ID over here.   {#2931}
[02:49:27] TEACHER: But then the problem is that this hash is universal function.   {#2932}
[02:49:31] TEACHER: MD5 hash.   {#2933}
[02:49:33] TEACHER: Right?   {#2934}
[02:49:33] TEACHER: Now Facebook, let's say Facebook wants to integrate your Gravatar.   {#2935}
[02:49:36] TEACHER: It does not need to know your Gravatar visitor ID.   {#2936}
[02:49:39] STUDENT_2: Got it.   {#2937}
[02:49:40] STUDENT_2: Yeah.   {#2938}
[02:49:40] STUDENT_2: That's what I was trying to do.   {#2939}
[02:49:42] TEACHER: All it just has.   {#2940}
[02:49:42] TEACHER: If it has your email ID, it can just try to see if you have Gravatar or not, it can start   {#2941}
[02:49:46] TEACHER: directly rendering it.   {#2942}
[02:49:48] STUDENT_2: Yeah.   {#2943}
[02:49:49] STUDENT_2: Yeah.   {#2944}
[02:49:49] STUDENT_2: That's okay.   {#2945}
[02:49:50] STUDENT_2: Yeah.   {#2946}
[02:49:50] STUDENT_2: That's a simple requirement that people will feel easy.   {#2947}
[02:49:54] STUDENT_9: Yeah.   {#2948}
[02:49:55] STUDENT_9: Yeah.   {#2949}
[02:49:57] STUDENT_5: I had a question about on message and sent.   {#2950}
[02:50:01] STUDENT_5: I think I did not.   {#2951}
[02:50:04] STUDENT_5: If a user is active and then they receive messages from any of the charts, we don't want to trigger that event.   {#2952}
[02:50:13] STUDENT_5: Only if the user is inactive, whether we have an active web socket connection or online offline service, only then we want to trigger that on the unsent event.   {#2953}
[02:50:25] STUDENT_5: I want to understand what unsent means.   {#2954}
[02:50:27] STUDENT_5: I'm not able to.   {#2955}
[02:50:28] TEACHER: It's an umbrella that I created when I was not able to send a message to this user in real time.   {#2956}
[02:50:35] STUDENT_9: That's it.   {#2957}
[02:50:38] TEACHER: Now, implementation of it depends on if user is on other tab, then also it is considered to be unsent.   {#2958}
[02:50:44] TEACHER: Or if user is completely offline, then only it is considered to be unsent.   {#2959}
[02:50:48] TEACHER: That is your product call.   {#2960}
[02:50:50] TEACHER: But the idea is whatever flows into this on message unsent, it's like on message unsent in real time,   {#2961}
[02:50:58] TEACHER: You have to update the account.   {#2962}
[02:51:01] STUDENT_5: Right?   {#2963}
[02:51:02] STUDENT_5: Yep.   {#2964}
[02:51:03] STUDENT_5: Yep.   {#2965}
[02:51:04] STUDENT_5: Thank you.   {#2966}
[02:51:05] TEACHER: Any other question?   {#2967}
[02:51:06] TEACHER: Anyone?   {#2968}
[02:51:10] TEACHER: No.   {#2969}
[02:51:14] TEACHER: Tick, tick.   {#2970}
[02:51:15] TEACHER: One, two, three, four.   {#2971}
[02:51:19] TEACHER: Fine.   {#2972}
[02:51:20] TEACHER: Done.   {#2973}
[02:51:21] TEACHER: Okay.   {#2974}
[02:51:21] TEACHER: Thanks, folks.   {#2975}
[02:51:22] TEACHER: For tuning in.   {#2976}
[02:51:23] TEACHER: I'll update.   {#2977}
[02:51:25] TEACHER: I'll upload a recording in sometime by three.   {#2978}
[02:51:28] TEACHER: as well. See you folks next week. It's all about storage   {#2979}
[02:51:30] TEACHER: engines. Quite fun. We'll dive into database   {#2980}
[02:51:32] TEACHER: details and implement a couple of   {#2981}
[02:51:34] TEACHER: other systems.   {#2982}
[02:51:36] TEACHER: Thanks folks for tuning in. It was a great session. Great questions.   {#2983}
[02:51:39] STUDENT_2: I have a small query here.   {#2984}
[02:51:41] STUDENT_2: Sorry.   {#2985}
[02:51:45] TEACHER: So   {#2986}
[02:51:47] STUDENT_2: see, initially   {#2987}
[02:51:48] STUDENT_2: we talked about the query   {#2988}
[02:51:50] STUDENT_2: optimizations and database optimizations   {#2989}
[02:51:52] STUDENT_2: for mySQL or let's say any   {#2990}
[02:51:55] STUDENT_2: relational database.   {#2991}
[02:51:58] STUDENT_2: to improvise on this because I personally feel that, you know, I'm really not good at this.   {#2992}
[02:52:03] STUDENT_2: So what are the resources I can follow?   {#2993}
[02:52:05] TEACHER: So what I would do, what I would recommend is I actually, to be honest, how I became   {#2994}
[02:52:13] TEACHER: good at it is I focused very well during my college days on that subject very deeply.   {#2995}
[02:52:18] TEACHER: Right.   {#2996}
[02:52:19] TEACHER: So that is one that is my solid condition, but I cannot obviously recommend you to read   {#2997}
[02:52:23] TEACHER: that entire textbook.   {#2998}
[02:52:23] TEACHER: So what you should do is understand how database works,   {#2999}
[02:52:27] TEACHER: how relational database works, how data is structured, right?   {#3000}
[02:52:31] TEACHER: Those things you need to go really deep into it, right?   {#3001}
[02:52:34] TEACHER: And how you do that?   {#3002}
[02:52:36] TEACHER: I am right now running a series on my YouTube members only thing   {#3003}
[02:52:40] TEACHER: around database internals.   {#3004}
[02:52:41] TEACHER: In case you are interested, go through those videos   {#3005}
[02:52:43] TEACHER: and see if you are interested into that, right?   {#3006}
[02:52:46] TEACHER: I cannot claim that I will cover all of that,   {#3007}
[02:52:48] TEACHER: but it is definitely going to be a big value add, right?   {#3008}
[02:52:50] TEACHER: because I'm distilling the information from the textbooks,   {#3009}
[02:52:54] TEACHER: from the courses that I did,   {#3010}
[02:52:55] TEACHER: going into those nitty gritties of databases,   {#3011}
[02:52:57] TEACHER: not really internals into it, into the page structures and all,   {#3012}
[02:53:00] TEACHER: but more importantly, what you use in your day-to-day life,   {#3013}
[02:53:03] TEACHER: what you should definitely know in your day-to-day life about it.   {#3014}
[02:53:06] TEACHER: That is what I'm covering.   {#3015}
[02:53:07] TEACHER: I'm literally going through my college textbook.   {#3016}
[02:53:09] TEACHER: I'm not even exaggerating.   {#3017}
[02:53:11] TEACHER: I'm literally going through my college textbooks,   {#3018}
[02:53:13] TEACHER: three of them to just ensure that I've covered all the key details.   {#3019}
[02:53:17] TEACHER: Very soon, I'll be putting out videos on phantom reads   {#3020}
[02:53:20] TEACHER: is obviously coming next week.   {#3021}
[02:53:23] TEACHER: After that, it will be SQL query optimization.   {#3022}
[02:53:25] TEACHER: After that, indexing evaluation and whatnot.   {#3023}
[02:53:28] TEACHER: It's all going to be around databases in general, right?   {#3024}
[02:53:31] TEACHER: Because that's my strong quota.   {#3025}
[02:53:32] TEACHER: That's what I realized.   {#3026}
[02:53:33] TEACHER: So that's one.   {#3027}
[02:53:34] TEACHER: But in case you still want to explore,   {#3028}
[02:53:37] TEACHER: log into your production console,   {#3029}
[02:53:39] TEACHER: whatever your production console is,   {#3030}
[02:53:41] TEACHER: log into your production console,   {#3031}
[02:53:43] TEACHER: your MySQL thing,   {#3032}
[02:53:46] TEACHER: and start firing explain statements.   {#3033}
[02:53:49] TEACHER: E-X-P-L-A-I-N.   {#3034}
[02:53:51] TEACHER: In case you are unaware,   {#3035}
[02:53:52] TEACHER: Google explain statements, MySQL.   {#3036}
[02:53:54] TEACHER: It gives you the query plan of it, right?   {#3037}
[02:53:56] TEACHER: Every single word of it,   {#3038}
[02:53:58] TEACHER: Google that word of it, right?   {#3039}
[02:54:00] TEACHER: What it does,   {#3040}
[02:54:01] TEACHER: how the query plan is created, right?   {#3041}
[02:54:04] TEACHER: And refer to actual MySQL document.   {#3042}
[02:54:06] TEACHER: And I'm just using MySQL as an example.   {#3043}
[02:54:08] TEACHER: Pick your favorite database.   {#3044}
[02:54:09] TEACHER: Go through the official documentation of it   {#3045}
[02:54:11] TEACHER: and not some blogs or videos about it.   {#3046}
[02:54:13] TEACHER: Go through the official documentation.   {#3047}
[02:54:14] TEACHER: You would see how dense those documentations are   {#3048}
[02:54:17] TEACHER: because that would give you those nitty gritties   {#3049}
[02:54:20] TEACHER: that typically videos overlook,   {#3050}
[02:54:22] TEACHER: that typically blocks overlook.   {#3051}
[02:54:24] TEACHER: Do that right.   {#3052}
[02:54:26] TEACHER: But pick one query at a time,   {#3053}
[02:54:28] TEACHER: run the explain statement,   {#3054}
[02:54:30] TEACHER: get those terms,   {#3055}
[02:54:32] TEACHER: look out in the official documentation   {#3056}
[02:54:33] TEACHER: and re-iterate.   {#3057}
[02:54:36] TEACHER: And over time,   {#3058}
[02:54:38] TEACHER: three or four months will be well-versed in that.   {#3059}
[02:54:40] TEACHER: Now, when you are doing this,   {#3060}
[02:54:42] TEACHER: if you spot any optimization   {#3061}
[02:54:44] TEACHER: company's workflow suggest, right?   {#3062}
[02:54:47] TEACHER: On your staging environment, run those, make those changes   {#3063}
[02:54:50] TEACHER: and see how it behaves.   {#3064}
[02:54:52] TEACHER: See if it improves something or not.   {#3065}
[02:54:53] TEACHER: Or in any case, you don't have to change in production   {#3066}
[02:54:56] TEACHER: or change in staging.   {#3067}
[02:54:57] TEACHER: You can just dump that database into other table,   {#3068}
[02:55:00] TEACHER: fire that exact same query with your changes   {#3069}
[02:55:02] TEACHER: and see what kind of improvement you've got.   {#3070}
[02:55:05] TEACHER: Companies is a very good, is a very good playground for us.   {#3071}
[02:55:09] TEACHER: In any case, if we improve, it's better for organization   {#3072}
[02:55:11] TEACHER: and you learn stuff as well, right?   {#3073}
[02:55:15] TEACHER: more than I would want to add.   {#3074}
[02:55:17] TEACHER: So that's how I became good at it.   {#3075}
[02:55:21] TEACHER: I should create a video on this.   {#3076}
[02:55:23] TEACHER: It's a good topic.   {#3077}
[02:55:25] TEACHER: Yeah.   {#3078}
[02:55:26] TEACHER: Thanks, J.K.   {#3079}
[02:55:27] TEACHER: Yeah, Chandan, go on.   {#3080}
[02:55:29] STUDENT_2: Arpit, like a radius cluster is there.   {#3081}
[02:55:32] STUDENT_2: Do we need auxiliary radius cluster also?   {#3082}
[02:55:35] TEACHER: It will be cluster.   {#3083}
[02:55:37] TEACHER: It will be cluster.   {#3084}
[02:55:37] TEACHER: One single node will not be able to handle.   {#3085}
[02:55:40] TEACHER: You need a cluster for that.   {#3086}
[02:55:41] TEACHER: It just became too dense over here.   {#3087}
[02:55:45] TEACHER: Yeah.   {#3088}
[02:55:46] TEACHER: So thanks.   {#3089}
[02:55:48] TEACHER: Great.   {#3090}
[02:55:49] TEACHER: Thanks folks for doing and see you folks next week.   {#3091}
[02:55:51] TEACHER: Bye-bye.   {#3092}
