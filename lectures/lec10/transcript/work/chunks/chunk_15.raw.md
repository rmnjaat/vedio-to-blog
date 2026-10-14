# chunk_15  OWNS 02:52:08 -> 03:06:33  (segments #2882-#3206, 2538 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:51:13] TEACHER: custom repetition, very nice.   {#2863}
CTX| [02:51:15] TEACHER: Right.   {#2864}
CTX| [02:51:15] TEACHER: You'll get like how then, then you'll start summing up on this, like, hi, how would you   {#2865}
CTX| [02:51:19] TEACHER: merge?   {#2866}
CTX| [02:51:20] TEACHER: How do you merge this two file in the same process in different process?   {#2867}
CTX| [02:51:23] TEACHER: How will you update in memory index that you have, right?   {#2868}
CTX| [02:51:27] TEACHER: All those nitty gritties, those devils that lies in the details,   {#2869}
CTX| [02:51:32] TEACHER: you would explore that.   {#2870}
CTX| [02:51:35] TEACHER: And it's not, to be honest, it's not really difficult.   {#2871}
CTX| [02:51:38] TEACHER: Just start writing code one week of time, spare that one week of time,   {#2872}
CTX| [02:51:42] TEACHER: but build this stuff.   {#2873}
CTX| [02:51:44] TEACHER: Right.   {#2874}
CTX| [02:51:45] TEACHER: But in case any difficulty, drop me a note, I'm more than happy to help you.   {#2875}
CTX| [02:51:49] TEACHER: Sure.   {#2876}
CTX| [02:51:51] STUDENT_2: Sitesh.   {#2877}
CTX| [02:51:53] STUDENT_2: So I have an implementation specific question.   {#2878}
CTX| [02:51:56] STUDENT_2: Can you go back a slide?   {#2879}
CTX| [02:51:58] STUDENT_2: I am wondering on the checksum thing,   {#2880}
CTX| [02:52:02] STUDENT_2: the checksum that we added on the value.   {#2881}

---- OWNED SEGMENTS START ----
[02:52:08] STUDENT_2: So like what we are saying here is   {#2882}
[02:52:12] STUDENT_2: writing the whole value is not atomic,   {#2883}
[02:52:14] STUDENT_2: but writing the checksum and the header is.   {#2884}
[02:52:17] STUDENT_2: Yes.   {#2885}
[02:52:19] TEACHER: Writing this is atomic.   {#2886}
[02:52:23] STUDENT_2: Yeah, my question is coming from, so like one is what, so different file systems and kernels   {#2887}
[02:52:31] STUDENT_2: now will give you different guarantees, right?   {#2888}
[02:52:33] STUDENT_2: I just want to understand a pattern here.   {#2889}
[02:52:35] STUDENT_2: So is the pattern that like let us suppose we are assuming that this is under the block size.   {#2890}
[02:52:42] STUDENT_2: So it is guaranteed by the kernel to us.   {#2891}
[02:52:44] STUDENT_2: So we write that first and then write the rest of the things later.   {#2892}
[02:52:48] STUDENT_2: Because this value can be 1 mbp.   {#2893}
[02:52:50] TEACHER: Now, your kernel might not give that guarantee.   {#2894}
[02:52:54] TEACHER: Right.   {#2895}
[02:52:54] STUDENT_2: That's right.   {#2896}
[02:52:55] STUDENT_2: Yeah.   {#2897}
[02:52:55] STUDENT_2: That is what I was trying to understand because now when you try to install this software   {#2898}
[02:53:00] STUDENT_2: on different kernels, behaviors may be different, but we have to be, and that's how this whole   {#2899}
[02:53:05] STUDENT_2: wall thing goes.   {#2900}
[02:53:06] STUDENT_2: Right.   {#2901}
[02:53:06] TEACHER: So, but in any case, if you look carefully, this is eight bytes, four bytes, four bytes,   {#2902}
[02:53:12] TEACHER: four bytes, which means roughly four, four, five or 20, 20 bytes, 20 bytes, no matter.   {#2903}
[02:53:20] TEACHER: It will definitely be there.   {#2904}
[02:53:21] TEACHER: Got it.   {#2905}
[02:53:22] STUDENT_2: Because see, generally there are also more paranoid systems where kernels don't guarantee   {#2906}
[02:53:30] STUDENT_2: this.   {#2907}
[02:53:30] STUDENT_2: So you do have a separate wall system, but I get the design.   {#2908}
[02:53:34] STUDENT_2: That's why I was trying to understand the pattern here.   {#2909}
[02:53:36] STUDENT_2: This seems to be a very interesting pattern because this is more performant.   {#2910}
[02:53:43] TEACHER: But this is exactly where these interesting nitty gritty come in.   {#2911}
[02:53:48] TEACHER: Right?   {#2912}
[02:53:48] TEACHER: Like we just tend to say, I will write it in a wall file, but how exactly.   {#2913}
[02:53:52] TEACHER: Right.   {#2914}
[02:53:52] TEACHER: This is what makes us better every day because a lot of people just skip this.   {#2915}
[02:53:58] TEACHER: No one in almost any system design you pick up or any system, any overview   {#2916}
[02:54:02] TEACHER: will be covered.   {#2917}
[02:54:03] TEACHER: That's why they are called overview.   {#2918}
[02:54:04] TEACHER: No one talks about integrity at all.   {#2919}
[02:54:07] TEACHER: No one talks about security and integrity.   {#2920}
[02:54:08] TEACHER: These are like lone wolves out there.   {#2921}
[02:54:11] TEACHER: Just someone, one passionate engineer thinks about integrity, right?   {#2922}
[02:54:15] TEACHER: Otherwise it's all gone for a toss.   {#2923}
[02:54:18] TEACHER: work just fine.   {#2924}
[02:54:18] TEACHER: But in reality, it does not.   {#2925}
[02:54:20] TEACHER: But when you go into databases details, you would see all this.   {#2926}
[02:54:24] TEACHER: And by the way, folks, Hussain Nasir is on fire.   {#2927}
[02:54:27] TEACHER: He is posting Postgres internals like anything, like going into record level   {#2928}
[02:54:33] TEACHER: format and whatnot.   {#2929}
[02:54:34] TEACHER: My God, I don't know what happened to him.   {#2930}
[02:54:36] TEACHER: He is just going through the Postgres source code.   {#2931}
[02:54:39] TEACHER: So go through his Medium blogs.   {#2932}
[02:54:42] TEACHER: They are very fascinating.   {#2933}
[02:54:43] TEACHER: And you understand the things that we just discussed, integrity and all.   {#2934}
[02:54:48] TEACHER: that this is a Postgres record format.   {#2935}
[02:54:51] TEACHER: This is how page is there.   {#2936}
[02:54:53] TEACHER: He found that one very interesting comment   {#2937}
[02:54:55] TEACHER: and that blew my mind.   {#2938}
[02:54:57] TEACHER: The number of pages Postgres takes up   {#2939}
[02:55:01] TEACHER: to store meta information versus actual data.   {#2940}
[02:55:06] TEACHER: That just blew my mind.   {#2941}
[02:55:08] TEACHER: So read that.   {#2942}
[02:55:09] TEACHER: He's on fire for some reason.   {#2943}
[02:55:11] TEACHER: He's very obsessed with Postgres now.   {#2944}
[02:55:13] TEACHER: Diving really deep into it.   {#2945}
[02:55:14] TEACHER: Every day he's putting out videos   {#2946}
[02:55:18] TEACHER: not sure he gave up on job or what he is on fire.   {#2947}
[02:55:21] TEACHER: So once you have a bit of understanding,   {#2948}
[02:55:24] TEACHER: like implementing BitCast,   {#2949}
[02:55:26] TEACHER: once you have this bit of understanding of how file IO works,   {#2950}
[02:55:29] TEACHER: highly recommend you to check out Hussain Nasir.   {#2951}
[02:55:32] TEACHER: He's not created videos on it,   {#2952}
[02:55:33] TEACHER: but on medium blog post,   {#2953}
[02:55:35] TEACHER: he has posted a ton of amazing stuff on Postgres internals,   {#2954}
[02:55:40] TEACHER: right?   {#2955}
[02:55:41] TEACHER: But very into implementation detail,   {#2956}
[02:55:44] TEACHER: like actual source code snippet.   {#2957}
[02:55:46] TEACHER: This is where this is happening.   {#2958}
[02:55:48] TEACHER: page is getting created.   {#2959}
[02:55:49] TEACHER: The artist is getting flushed.   {#2960}
[02:55:50] TEACHER: This is what the format is.   {#2961}
[02:55:52] TEACHER: Those part, right.   {#2962}
[02:55:53] TEACHER: It's really deep into Postgres.   {#2963}
[02:55:55] TEACHER: So highly recommended to check that out.   {#2964}
[02:55:57] TEACHER: Once you have this understanding, if you have this understanding already, what's   {#2965}
[02:56:00] TEACHER: that, uh, read that fascinating stuff is doing then.   {#2966}
[02:56:05] STUDENT_2: Thanks for that.   {#2967}
[02:56:06] STUDENT_2: So one, one more question.   {#2968}
[02:56:08] STUDENT_2: Uh, can we go back to the initial design of the S3 thing?   {#2969}
[02:56:12] STUDENT_2: So there is one question that I have.   {#2970}
[02:56:14] STUDENT_2: Maybe I'm not, I'm not aware of that.   {#2971}
[02:56:17] STUDENT_2: Yeah.   {#2972}
[02:56:18] STUDENT_2: So this S3 thing, right?   {#2973}
[02:56:19] STUDENT_2: So, uh, well, one is the calculation part.   {#2974}
[02:56:24] STUDENT_2: I am still not able to get how come, even if you get 200 K words, right.   {#2975}
[02:56:28] STUDENT_2: Uh, this one terabyte to me, like sound.   {#2976}
[02:56:34] STUDENT_2: Yeah, because I was checking per entry.   {#2977}
[02:56:37] STUDENT_2: It is like an MBS of record.   {#2978}
[02:56:38] STUDENT_2: I, I was blown by that.   {#2979}
[02:56:40] STUDENT_2: So I don't know what's going on there, but.   {#2980}
[02:56:42] STUDENT_2: You know, great.   {#2981}
[02:56:43] STUDENT_2: Like you should ask this critical question.   {#2982}
[02:56:45] TEACHER: So I just added one terabyte,   {#2983}
[02:56:47] TEACHER: but now I'll just justify this size, right?   {#2984}
[02:56:51] STUDENT_10: Okay, yeah.   {#2985}
[02:56:52] TEACHER: So this one terabyte I added so that it becomes impossible,   {#2986}
[02:56:56] TEACHER: like so that I bring up this point of cost   {#2987}
[02:56:59] TEACHER: that you cannot just copy this dictionary on every API server, right?   {#2988}
[02:57:03] TEACHER: That's why I wanted to add it.   {#2989}
[02:57:04] TEACHER: Otherwise, like you'd say,   {#2990}
[02:57:05] TEACHER: it's so small, I can just copy it over all the things.   {#2991}
[02:57:08] STUDENT_2: That's what I was going to say.   {#2992}
[02:57:10] TEACHER: I wanted to do that so that I touch upon network attached storage,   {#2993}
[02:57:15] TEACHER: this, I touch upon portability, right.   {#2994}
[02:57:17] TEACHER: But now in order to justify it, now this meaning, assume it's multimedia baked in   {#2995}
[02:57:24] TEACHER: audio, video visualization of it.   {#2996}
[02:57:27] TEACHER: Right.   {#2997}
[02:57:28] TEACHER: That's why I just wanted to enforce that, but that you cannot possibly copy it on   {#2998}
[02:57:36] TEACHER: every API server.   {#2999}
[02:57:37] STUDENT_5: So that's why my team.   {#3000}
[02:57:38] STUDENT_2: Right.   {#3001}
[02:57:39] STUDENT_2: No, no.   {#3002}
[02:57:39] STUDENT_2: Yeah.   {#3003}
[02:57:39] STUDENT_2: Thanks.   {#3004}
[02:57:40] STUDENT_2: No, no, no.   {#3005}
[02:57:40] STUDENT_2: Just like wondering what happened there, because I was thinking I'll just   {#3006}
[02:57:45] STUDENT_2: And that's what I was thinking, oh man, like this per MB records, maybe I'm missing something.   {#3007}
[02:57:50] STUDENT_2: But the question that I had was, so the way what we have designed here, let us suppose I actually want to expose it.   {#3008}
[02:57:57] STUDENT_2: Okay.   {#3009}
[02:57:58] STUDENT_2: Now per API, I am doing one S3 call.   {#3010}
[02:58:01] STUDENT_2: So how costly is it?   {#3011}
[02:58:03] STUDENT_2: That is what I wanted to understand from you.   {#3012}
[02:58:05] STUDENT_2: Like a point call.   {#3013}
[02:58:07] STUDENT_2: And okay, I understand I can add caching and then my, all of those stuff will come down.   {#3014}
[02:58:12] STUDENT_2: but then when I was thinking alternatively,   {#3015}
[02:58:15] STUDENT_2: I was trying to think that,   {#3016}
[02:58:16] STUDENT_2: okay, I can have some kind of frequency   {#3017}
[02:58:18] STUDENT_2: and then eventually what will happen is   {#3018}
[02:58:20] STUDENT_2: I will store my frequency-based words and all of that.   {#3019}
[02:58:23] STUDENT_2: But I just wanted to understand   {#3020}
[02:58:24] STUDENT_2: is that over-optimization   {#3021}
[02:58:25] STUDENT_2: if I'm hosting a real service or is like how costly is S3?   {#3022}
[02:58:29] TEACHER: In real world, you have to do that.   {#3023}
[02:58:30] TEACHER: This is where I'm like directly querying the S3 to get it.   {#3024}
[02:58:34] TEACHER: So my intention for that was   {#3025}
[02:58:36] TEACHER: I wanted to point out that it is possible   {#3026}
[02:58:38] TEACHER: to make pointed reads on S3.   {#3027}
[02:58:40] TEACHER: Got it.   {#3028}
[02:58:41] TEACHER: This way you can build a lot of others   {#3029}
[02:58:42] TEACHER: AWS S3 Athena will build a multi-tiered storage,   {#3030}
[02:58:46] TEACHER: a cost efficient auto solution for Amazon next week.   {#3031}
[02:58:49] TEACHER: All of that would fall into place there because we are able to now literally   {#3032}
[02:58:54] TEACHER: do a pointed read on S3 of a particular order ID.   {#3033}
[02:58:57] TEACHER: You can now move your partial cold, like this is a classic cold storage mechanism.   {#3034}
[02:59:03] TEACHER: They're moving data from hot tier to cold tier to save cost.   {#3035}
[02:59:06] TEACHER: But when you move to cold tier, you're not just archiving, but still giving   {#3036}
[02:59:10] TEACHER: a seamless ability to query the data on S3.   {#3037}
[02:59:13] TEACHER: This enables us to do that.   {#3038}
[02:59:16] TEACHER: And given it is infrequent, it's okay to have higher latency.   {#3039}
[02:59:20] TEACHER: Cost would be there, right?   {#3040}
[02:59:21] TEACHER: S3 is not cheap.   {#3041}
[02:59:22] TEACHER: Network IO is not cheap.   {#3042}
[02:59:24] TEACHER: S3 will take its own sweet time.   {#3043}
[02:59:25] TEACHER: It's not very performant as well, but it is very cheap.   {#3044}
[02:59:28] TEACHER: So if you're having infrequent reads, you can make it on S3.   {#3045}
[02:59:32] TEACHER: I use word dictionary as an example because it's easy to understand.   {#3046}
[02:59:36] TEACHER: If I say key values will be filled with key values.   {#3047}
[02:59:38] TEACHER: I just use word dictionary so that I can pinpoint this.   {#3048}
[02:59:43] TEACHER: how small the indexes can be and not get overwhelmed by this number.   {#3049}
[02:59:47] TEACHER: So 170,000 seems a huge word, like a huge set of words, but in reality, when you   {#3050}
[02:59:53] TEACHER: multiply it by your index size, like the per index entry turns out to be MP.   {#3051}
[02:59:58] TEACHER: So we take MPs very lightly, but M stands for a million, a million bytes.   {#3052}
[03:00:02] TEACHER: Right.   {#3053}
[03:00:03] TEACHER: So we just take million and billion for like, we'll take it very lightly.   {#3054}
[03:00:07] TEACHER: They are not very lightweight.   {#3055}
[03:00:08] TEACHER: And it is still contain a huge amount of information.   {#3056}
[03:00:11] TEACHER: those were my motivations to do it   {#3057}
[03:00:13] TEACHER: so that I set it up   {#3058}
[03:00:15] TEACHER: for other parts   {#3059}
[03:00:16] TEACHER: which becomes very easy to understand   {#3060}
[03:00:19] STUDENT_2: and last question on the   {#3061}
[03:00:21] STUDENT_2: like the same   {#3062}
[03:00:23] STUDENT_2: part where we said that we will just   {#3063}
[03:00:26] STUDENT_2: trigger redeployment   {#3064}
[03:00:27] STUDENT_2: just want to understand one detail there   {#3065}
[03:00:29] STUDENT_2: so when you say redeployment   {#3066}
[03:00:32] STUDENT_2: basically you are spinning up new machines   {#3067}
[03:00:34] STUDENT_2: the load balancer will be intact   {#3068}
[03:00:35] STUDENT_2: you will just add API servers   {#3069}
[03:00:37] TEACHER: you remove one   {#3070}
[03:00:40] TEACHER: By default, Cloud Prodder gives you this out of the box.   {#3071}
[03:00:42] TEACHER: Rolling deployment is out of the box.   {#3072}
[03:00:44] STUDENT_2: Yeah, this is a super one.   {#3073}
[03:00:46] STUDENT_2: I think this is coming from more experience   {#3074}
[03:00:48] STUDENT_2: because as engineers, we would write some code,   {#3075}
[03:00:51] STUDENT_2: but there is already a way   {#3076}
[03:00:52] STUDENT_2: without even writing a single line of code.   {#3077}
[03:00:54] TEACHER: So this is what I actually did   {#3078}
[03:00:56] TEACHER: for a couple of my services.   {#3079}
[03:00:58] TEACHER: I thought of adding Radis PubSub and whatnot   {#3080}
[03:01:02] TEACHER: and have APIs Expos and whatnot.   {#3081}
[03:01:04] TEACHER: We are so accustomed to write code to solve a problem.   {#3082}
[03:01:10] TEACHER: the box. I wanted to just cover this part that infrastructure is ours. We can do whatever   {#3083}
[03:01:16] TEACHER: we want with it. So just make a call, trigger a deployment.   {#3084}
[03:01:19] STUDENT_2: This was a great idea. I mean, uh, like without writing a code and then you don't have all   {#3085}
[03:01:23] STUDENT_2: those have a call then maintaining and all that stuff. You just use what you have done.   {#3086}
[03:01:27] TEACHER: Thanks sir. Superb. Anyone else? Any other question? No, Dan, no pop-up allowed.   {#3087}
[03:01:39] STUDENT_1: So just a basic one. So we are storing the offsets. So offsets are the line numbers or   {#3088}
[03:01:46] STUDENT_1: the actual byte byte byte byte from where that, you know, record is starting that offset.   {#3089}
[03:01:53] STUDENT_1: Right. Okay. Sure. And what was the other question? I actually forgot. One was offset.   {#3090}
[03:02:04] STUDENT_1: Offset.   {#3091}
[03:02:05] STUDENT_1: Sorry, can you please go to that page?   {#3092}
[03:02:07] STUDENT_1: We were discussing about the offset and the, uh, the word dictionary.   {#3093}
[03:02:14] TEACHER: Sorry.   {#3094}
[03:02:15] TEACHER: Offset.   {#3095}
[03:02:15] TEACHER: We're discussing offsets over here.   {#3096}
[03:02:17] TEACHER: Yeah.   {#3097}
[03:02:20] STUDENT_1: Yeah.   {#3098}
[03:02:20] STUDENT_1: So here the, the, the index where you are mentioning the index.   {#3099}
[03:02:24] STUDENT_1: So initially you are storing the header where, you know, by, by offset of the data, basically   {#3100}
[03:02:30] STUDENT_1: the, uh, bytes or the versions or all that information.   {#3101}
[03:02:34] STUDENT_1: The size of the index is basically the complete index file,   {#3102}
[03:02:39] STUDENT_1: which we are storing in this file, right?   {#3103}
[03:02:41] STUDENT_1: Correct.   {#3104}
[03:02:41] STUDENT_2: This is the size of the index.   {#3105}
[03:02:43] STUDENT_2: Yes, the size of the index.   {#3106}
[03:02:44] STUDENT_1: Initially, my understanding was,   {#3107}
[03:02:46] STUDENT_1: it is just the location of that file stored   {#3108}
[03:02:49] STUDENT_1: and not the actual file stored.   {#3109}
[03:02:51] TEACHER: This is the actual size of the number of bytes   {#3110}
[03:02:54] TEACHER: that you are storing in the index that gets stored there.   {#3111}
[03:02:57] TEACHER: Right, right.   {#3112}
[03:02:58] TEACHER: So you first read the header, you get the index size.   {#3113}
[03:03:01] TEACHER: Then you read these many bytes here, you get the index.   {#3114}
[03:03:04] TEACHER: then you start serving this data.   {#3115}
[03:03:07] STUDENT_1: But Arpet now, whenever, whenever,   {#3116}
[03:03:11] STUDENT_1: so let's say whenever we are doing any updates,   {#3117}
[03:03:13] STUDENT_1: so this size might be, you know, changing every time.   {#3118}
[03:03:16] STUDENT_1: So every time we are updating this header, right?   {#3119}
[03:03:18] TEACHER: Yeah.   {#3120}
[03:03:18] TEACHER: We are recreating this header.   {#3121}
[03:03:20] TEACHER: So when you're doing this merge and compaction,   {#3122}
[03:03:22] TEACHER: where did it go?   {#3123}
[03:03:23] TEACHER: We're doing this merger,   {#3124}
[03:03:24] TEACHER: you're creating this dictionary,   {#3125}
[03:03:26] TEACHER: you're creating index also,   {#3126}
[03:03:27] TEACHER: you're creating header also.   {#3127}
[03:03:28] TEACHER: This new file, this entire new file that you are creating.   {#3128}
[03:03:31] STUDENT_1: Right.   {#3129}
[03:03:31] STUDENT_1: Right.   {#3130}
[03:03:32] STUDENT_1: Now the question is,   {#3131}
[03:03:34] STUDENT_1: Because initially we have never discussed this thing that you know, this file has to be sorted   {#3132}
[03:03:38] STUDENT_1: only when we started discussion discussion about the merger, then only we discussed that,   {#3133}
[03:03:43] STUDENT_1: you know, it has to be sorted.   {#3134}
[03:03:44] STUDENT_1: So what is the idea of sorting there?   {#3135}
[03:03:46] STUDENT_1: Because we never discussed that file.   {#3136}
[03:03:51] STUDENT_1: Yeah, we are not.   {#3137}
[03:03:55] TEACHER: We did not touch upon that because we did not have a need when we went into intricate   {#3138}
[03:04:00] TEACHER: details.   {#3139}
[03:04:00] TEACHER: We realized that keeping it sorted makes our merging very easy.   {#3140}
[03:04:04] TEACHER: Like merging change lock into actual dictionary, the original dictionary becomes very easy,   {#3141}
[03:04:09] STUDENT_1: very efficient.   {#3142}
[03:04:11] STUDENT_1: But, but, but the thing is that now keeping the file is sorted in, I mean, keeping this   {#3143}
[03:04:18] STUDENT_1: file sorted will, would create another level of complexity.   {#3144}
[03:04:22] STUDENT_1: So how would we approach that?   {#3145}
[03:04:24] STUDENT_1: Why is that complex?   {#3146}
[03:04:26] STUDENT_1: Because he's storing 170,000 records.   {#3147}
[03:04:29] STUDENT_1: And now you're trying to insert into every time you have to do what, what, what, what   {#3148}
[03:04:34] STUDENT_1: binary search or a linear search, but you don't have to search anything.   {#3149}
[03:04:37] STUDENT_1: Right.   {#3150}
[03:04:37] STUDENT_1: It's direct lookup.   {#3151}
[03:04:39] TEACHER: You have index index has offset to directly go to this offset reader.   {#3152}
[03:04:42] STUDENT_1: Like, right.   {#3153}
[03:04:44] STUDENT_1: But inserting a new entry, how would you decide that?   {#3154}
[03:04:47] STUDENT_1: Where do I need to insert?   {#3155}
[03:04:48] STUDENT_1: So let's say, right.   {#3156}
[03:04:52] STUDENT_1: Here it is.   {#3157}
[03:04:55] STUDENT_1: This is what, how you're creating this new dictionary, right?   {#3158}
[03:04:58] STUDENT_1: Change.   {#3159}
[03:04:59] STUDENT_1: Okay.   {#3160}
[03:04:59] STUDENT_1: Got it.   {#3161}
[03:05:00] STUDENT_1: Got it.   {#3162}
[03:05:00] STUDENT_1: Got it.   {#3163}
[03:05:00] STUDENT_1: Okay.   {#3164}
[03:05:00] STUDENT_1: So this idea only will keep on the keeper.   {#3165}
[03:05:02] STUDENT_1: Keep this thing sorted every time.   {#3166}
[03:05:04] TEACHER: Correct.   {#3167}
[03:05:05] TEACHER: This is sorted.   {#3168}
[03:05:05] TEACHER: This is sorted.   {#3169}
[03:05:06] TEACHER: This is sorted.   {#3170}
[03:05:07] TEACHER: This is sorted.   {#3171}
[03:05:07] STUDENT_1: Right, right.   {#3172}
[03:05:08] STUDENT_1: Got it, got it, got it.   {#3173}
[03:05:09] STUDENT_1: I thought that it should be sorted before.   {#3174}
[03:05:10] STUDENT_1: Now, change lock.   {#3175}
[03:05:12] TEACHER: So, we are just ensuring that original dictionary is sorted.   {#3176}
[03:05:15] TEACHER: Change lock is sorted.   {#3177}
[03:05:16] TEACHER: The new one would be sorted.   {#3178}
[03:05:18] TEACHER: Now, this would become the old for the next updates.   {#3179}
[03:05:21] TEACHER: Next week updates.   {#3180}
[03:05:22] TEACHER: Right, right.   {#3181}
[03:05:23] TEACHER: It will always be sorted.   {#3182}
[03:05:24] TEACHER: But because of the sortedness of the words that we have, merging of dictionary and change   {#3183}
[03:05:29] TEACHER: lock becomes order and operation.   {#3184}
[03:05:31] TEACHER: That's it.   {#3185}
[03:05:32] TEACHER: just one iteration over this file   {#3186}
[03:05:34] TEACHER: or both the files and you have this   {#3187}
[03:05:36] STUDENT_1: new file created. You don't have to do n square complexity.   {#3188}
[03:05:38] STUDENT_1: Actually, I started looking into this complete   {#3189}
[03:05:40] STUDENT_1: record but I forgot that from the very first record   {#3190}
[03:05:42] STUDENT_1: we are sorting this thing. So yeah.   {#3191}
[03:05:45] STUDENT_14: So yeah, that's good.   {#3192}
[03:05:47] STUDENT_8: These are the details   {#3193}
[03:05:48] TEACHER: I want. Thanks for asking this question. These are   {#3194}
[03:05:50] TEACHER: the things that, you know, brings that clarity   {#3195}
[03:05:52] TEACHER: like sparks that interest.   {#3196}
[03:05:54] TEACHER: This is the optimization that we were talking about.   {#3197}
[03:05:56] TEACHER: Like why things needs to be sorted and   {#3198}
[03:05:58] TEACHER: which is why the entire domain of   {#3199}
[03:06:00] TEACHER: computer science is obsessed with sorted   {#3200}
[03:06:02] TEACHER: data. This is why it just makes life so simple. It makes processes so simple. Right. Thanks.   {#3201}
[03:06:09] TEACHER: Thanks. Great. Any other question? Anyone? No? Done? That's it? No for what? Okay. That's   {#3202}
[03:06:19] TEACHER: it. Thanks folks for tuning in. I'll upload the recordings by end of the day. See you   {#3203}
[03:06:23] TEACHER: folks next week. We'll also share the pre-read. So do both. Thanks folks. See you next week.   {#3204}
[03:06:28] TEACHER: Bye-bye.   {#3205}
[03:06:32] TEACHER: Thank you.   {#3206}
