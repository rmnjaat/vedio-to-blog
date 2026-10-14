# chunk_14  OWNS 02:39:26 -> 02:52:08  (segments #2651-#2881, 2135 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:38:29] TEACHER: Similarly, React is a wrapper over BitCask.   {#2634}
CTX| [02:38:33] TEACHER: So React's responsibility is to make BitCask distributed.   {#2635}
CTX| [02:38:38] TEACHER: You'd still have like this is mutually exclusive set of data.   {#2636}
CTX| [02:38:43] TEACHER: But React gives you this additional thing.   {#2637}
CTX| [02:38:46] TEACHER: Master, slave, architecture, distributedness, consensus, whatnot.   {#2638}
CTX| [02:38:52] TEACHER: It gives you all these features to connect.   {#2639}
CTX| [02:38:54] TEACHER: So it gives you proxy to seamlessly connect and route the request,   {#2640}
CTX| [02:38:57] TEACHER: hash paste, consistent hashing, data movement, whatnot.   {#2641}
CTX| [02:39:00] TEACHER: That is responsibility of React.   {#2642}
CTX| [02:39:02] TEACHER: But in the backend, what it uses, it uses BitCask   {#2643}
CTX| [02:39:05] TEACHER: to get the maximum out of when you are storing   {#2644}
CTX| [02:39:08] TEACHER: and retrieving the data from the disk.   {#2645}
CTX| [02:39:10] TEACHER: That's the best you can do over there.   {#2646}
CTX| [02:39:12] TEACHER: This is what Uber uses in production.   {#2647}
CTX| [02:39:14] TEACHER: If you look carefully, the BitCask, the way we design,   {#2648}
CTX| [02:39:18] TEACHER: the append-only file that we see is the magic   {#2649}
CTX| [02:39:22] TEACHER: behind getting the max out of cheap commodity hardware.   {#2650}

---- OWNED SEGMENTS START ----
[02:39:26] TEACHER: So whenever you see anything that says we are high throughput,   {#2651}
[02:39:31] TEACHER: it means they are using append only file.   {#2652}
[02:39:34] TEACHER: If they are not using append only file,   {#2653}
[02:39:36] TEACHER: they are append only file or something similar.   {#2654}
[02:39:38] TEACHER: They are not high throughput at all.   {#2655}
[02:39:40] TEACHER: Not at all.   {#2656}
[02:39:41] TEACHER: I devoid that claim.   {#2657}
[02:39:43] TEACHER: Because it's not high throughput.   {#2658}
[02:39:44] TEACHER: You can go beyond that as well.   {#2659}
[02:39:47] TEACHER: So that is not very performant.   {#2660}
[02:39:49] TEACHER: Whenever you are seeing very high throughput service,   {#2661}
[02:39:52] TEACHER: has to be high throughput and persistence.   {#2662}
[02:39:54] TEACHER: It has to be done in append only file.   {#2663}
[02:39:56] TEACHER: And this is where you see it in IT.   {#2664}
[02:39:58] TEACHER: And this is what this very fabulous database BitCask is all about.   {#2665}
[02:40:03] TEACHER: It's really simple for everyone, but it covers those very intricate details.   {#2666}
[02:40:10] TEACHER: Data integrity checks, record format, merge and compaction,   {#2667}
[02:40:14] TEACHER: getting the max out of cheap commodity hardware.   {#2668}
[02:40:17] TEACHER: And it's very heavily used in production by React.   {#2669}
[02:40:22] TEACHER: react most of them have bitcast as their backend so we design bitcast and react just makes it   {#2670}
[02:40:29] TEACHER: distributed nothing but just like what elastic search did to lucene react does it with bitcast   {#2671}
[02:40:36] TEACHER: right and this is what i wanted to cover as part of building the super fast key value store   {#2672}
[02:40:42] TEACHER: right there is a paper on bitcast which you can refer just a google search away but what i would   {#2673}
[02:40:48] TEACHER: personally recommend implement bitcask and you know how how much how big of a promoter i am of   {#2674}
[02:40:56] TEACHER: implementation i would highly recommend you to implement bitcask it's not really difficult but   {#2675}
[02:41:01] TEACHER: when you build it you have much deeper understanding of file ios how to get max out of performance and   {#2676}
[02:41:07] TEACHER: whatnot i did a personal benchmark bitcask versus key value store bitcask versus on desk key value   {#2677}
[02:41:13] TEACHER: store in memory key value store and try to get a performance on backlit disk ssds and whatnot   {#2678}
[02:41:18] TEACHER: That's why I'm so sure on how we could get the max performance of it,   {#2679}
[02:41:21] TEACHER: how IOS saturates and all of that.   {#2680}
[02:41:24] TEACHER: Set it up.   {#2681}
[02:41:25] TEACHER: It's not difficult.   {#2682}
[02:41:25] TEACHER: You just need the Prometheus on a machine continuously monitoring it,   {#2683}
[02:41:29] TEACHER: run your bitcars, key value, which is why I'll just focus on key values.   {#2684}
[02:41:33] TEACHER: There's nothing fancy on that, right?   {#2685}
[02:41:34] TEACHER: Just keep it in your case, but build it.   {#2686}
[02:41:36] TEACHER: Spend two weeks, two weeks period, one week of your time.   {#2687}
[02:41:40] TEACHER: Implement it.   {#2688}
[02:41:41] TEACHER: You'll have a time of your life.   {#2689}
[02:41:43] TEACHER: Trust me on that.   {#2690}
[02:41:43] TEACHER: When I first ran it, my God, my feeling was all over the room.   {#2691}
[02:41:49] TEACHER: Six years it has been.   {#2692}
[02:41:50] TEACHER: Six years.   {#2693}
[02:41:51] TEACHER: Just yeah.   {#2694}
[02:41:52] TEACHER: No.   {#2695}
[02:41:52] TEACHER: Five years it has been.   {#2696}
[02:41:53] TEACHER: And I implemented BitCast.   {#2697}
[02:41:55] TEACHER: Right.   {#2698}
[02:41:55] TEACHER: But do that.   {#2699}
[02:41:56] TEACHER: Do that.   {#2700}
[02:41:56] TEACHER: That's where the fun lies.   {#2701}
[02:41:58] TEACHER: Right.   {#2702}
[02:41:58] TEACHER: Okay.   {#2703}
[02:41:59] TEACHER: That's all what I wanted to cover.   {#2704}
[02:42:00] TEACHER: Folks who may want to drop off.   {#2705}
[02:42:01] TEACHER: Will be to drop off.   {#2706}
[02:42:02] TEACHER: I'll upload the recording by evening.   {#2707}
[02:42:05] TEACHER: And yeah.   {#2708}
[02:42:06] TEACHER: Next week is all about high throughput.   {#2709}
[02:42:10] TEACHER: Yeah.   {#2710}
[02:42:10] TEACHER: Next week is all about high throughput systems.   {#2711}
[02:42:12] TEACHER: We'll extend the storage week.   {#2712}
[02:42:14] TEACHER: We'll cover S3.   {#2713}
[02:42:15] TEACHER: Video encoding.   {#2714}
[02:42:17] TEACHER: YouTube views counting and whatnot.   {#2715}
[02:42:19] TEACHER: And one more database we'll cover.   {#2716}
[02:42:21] TEACHER: But those will form the core of   {#2717}
[02:42:24] TEACHER: how high throughput systems are built   {#2718}
[02:42:25] TEACHER: and why are we doing some things in a certain way.   {#2719}
[02:42:29] TEACHER: This is where we got high throughput on storage side.   {#2720}
[02:42:32] TEACHER: There we'll get high throughput on compute side.   {#2721}
[02:42:34] TEACHER: But before that,   {#2722}
[02:42:36] TEACHER: next week Saturday we'll first discuss   {#2723}
[02:42:37] TEACHER: huge discussion on S3.   {#2724}
[02:42:39] TEACHER: We'll go into those nitty gritties of S3   {#2725}
[02:42:41] TEACHER: and how to think about it.   {#2726}
[02:42:42] TEACHER: Everything that we studied   {#2727}
[02:42:43] TEACHER: will come in handy when we design S3.   {#2728}
[02:42:46] TEACHER: come in handy in the next one so it's all string together right okay so see you folks next week   {#2729}
[02:42:51] TEACHER: uh any questions on bitcast before i take other questions   {#2730}
[02:43:01] STUDENT_2: no no questions on bitcast   {#2731}
[02:43:05] STUDENT_2: right it was that simple super go on heaven   {#2732}
[02:43:12] STUDENT_1: just want to understand the in general what they say lsm trees and bitcast is like   {#2733}
[02:43:21] STUDENT_1: completely this process only or or something extra is there when people talk about saying   {#2734}
[02:43:30] STUDENT_1: sstable mem table it looks like whatever we have built on bitcast it's similar to that or is there   {#2735}
[02:43:37] TEACHER: In SS table in memory, we'll be touching about SS table next week.   {#2736}
[02:43:41] TEACHER: But in SS table, you also store values in memory.   {#2737}
[02:43:43] TEACHER: Here we are not storing values in memory.   {#2738}
[02:43:45] STUDENT_1: That's the one difference.   {#2739}
[02:43:46] TEACHER: That's the big difference.   {#2740}
[02:43:48] STUDENT_1: And the sorting of those values.   {#2741}
[02:43:51] TEACHER: In SS table, we sorted because we are leveraging something else.   {#2742}
[02:43:54] TEACHER: Right.   {#2743}
[02:43:54] TEACHER: We'll go in depth of SS table next week.   {#2744}
[02:43:56] TEACHER: And why are we doing something that we are doing?   {#2745}
[02:43:59] STUDENT_1: But beyond that, that's a big difference.   {#2746}
[02:44:01] STUDENT_1: Yes.   {#2747}
[02:44:02] STUDENT_1: Other than that, it looks same other beyond that, because we have that   {#2748}
[02:44:07] STUDENT_1: Flow wise, you have a file where we have the content and that is used by our merging and   {#2749}
[02:44:12] STUDENT_1: compacts and to create.   {#2750}
[02:44:14] STUDENT_1: And similarly for deletion, we go and do the same thing.   {#2751}
[02:44:20] STUDENT_1: So beyond that, whatever is there in the MAM table as a sorted key values, that's the only   {#2752}
[02:44:26] STUDENT_1: difference.   {#2753}
[02:44:27] TEACHER: Correct.   {#2754}
[02:44:27] TEACHER: That's the only difference.   {#2755}
[02:44:28] TEACHER: But with that, but here we get persistence.   {#2756}
[02:44:31] TEACHER: There, there is still loss of data.   {#2757}
[02:44:32] TEACHER: If our memory goes down, there is still loss of data.   {#2758}
[02:44:37] TEACHER: Seeing immediate persistence on the disk.   {#2759}
[02:44:40] STUDENT_1: That's a big difference.   {#2760}
[02:44:41] STUDENT_1: Memetable has to be saved,   {#2761}
[02:44:42] STUDENT_1: maybe a local on the system or something.   {#2762}
[02:44:44] TEACHER: Then every time on every right.   {#2763}
[02:44:46] STUDENT_1: Every day, every day.   {#2764}
[02:44:48] TEACHER: Here it's exactly here.   {#2765}
[02:44:50] TEACHER: You get it by default, right?   {#2766}
[02:44:51] TEACHER: Because you are prioritizing persistence.   {#2767}
[02:44:54] TEACHER: Right? So you're getting the max out of   {#2768}
[02:44:56] TEACHER: the underlying disk by prioritizing persistence.   {#2769}
[02:44:59] TEACHER: In Memetable, you buffer and then you write.   {#2770}
[02:45:03] STUDENT_1: I think then it makes sense.   {#2771}
[02:45:07] STUDENT_1: understand this and then go towards that.   {#2772}
[02:45:10] TEACHER: That becomes simpler to understand.   {#2773}
[02:45:11] TEACHER: So which is why this particular order I've taken.   {#2774}
[02:45:13] TEACHER: Next week we'll be touching upon SS table, mem table, that part, LSM trees,   {#2775}
[02:45:18] TEACHER: high throughput systems when you do counting and all.   {#2776}
[02:45:20] TEACHER: We'll touch upon that.   {#2777}
[02:45:23] TEACHER: But this becomes the foundation for that.   {#2778}
[02:45:25] STUDENT_1: I got about BitCask in the storage chapter from Martin Kleppman book.   {#2779}
[02:45:30] STUDENT_1: And I think today most of the things we covered were understood   {#2780}
[02:45:37] STUDENT_1: He tried to cover the bitcast and it was the first thing which I understood.   {#2781}
[02:45:42] STUDENT_1: If you go bitcast, then it is easy to understand other things.   {#2782}
[02:45:45] STUDENT_1: Yeah, it is easy to understand other things.   {#2783}
[02:45:48] STUDENT_1: And he covered that bitcast only in his book.   {#2784}
[02:45:54] TEACHER: I had this in my college paper reading.   {#2785}
[02:45:57] TEACHER: I took a course on storage readings and it was part of a paper reading thing.   {#2786}
[02:46:02] TEACHER: And that's what I stumbled over.   {#2787}
[02:46:03] TEACHER: Like, my God, this is such a simple thing.   {#2788}
[02:46:07] TEACHER: it's so beautiful okay then i understood that because maybe that's good but i do do read the   {#2789}
[02:46:15] STUDENT_1: paper in case you have it that's a fabulous paper i read it a little bit but not completed   {#2790}
[02:46:21] STUDENT_1: some part i but reading from what the martin book give me that summary so i skipped that   {#2791}
[02:46:31] STUDENT_1: that's what happens so yeah thanks mohit yeah a bit like my question may sound naive to you but   {#2792}
[02:46:41] STUDENT_1: like on the append only files like generally what's the way of creating those files like   {#2793}
[02:46:47] STUDENT_1: i've never done this so uh that's why uh my knowledge what do you mean when you say what   {#2794}
[02:46:52] STUDENT_1: like creating a file yes let's say you want to create a 1gb append only file so like uh would   {#2795}
[02:47:02] STUDENT_1: you kind of create a file and up front grab 1gb space in that and so that that file is maybe   {#2796}
[02:47:09] STUDENT_1: contiguous on the file system and later on like you keep on uh checking that how much data out of   {#2797}
[02:47:18] STUDENT_1: that one GB you have written and then you, once the one GB has completed,   {#2798}
[02:47:22] STUDENT_1: then you basically switched the new file or is it more incremental in nature that   {#2799}
[02:47:27] STUDENT_1: you would grab, uh, like you would, um, keep on doing just say simple file   {#2800}
[02:47:35] STUDENT_1: APIs, like write to a file, these many bytes.   {#2801}
[02:47:40] TEACHER: Okay.   {#2802}
[02:47:40] TEACHER: So this is what is abstracted by the, uh, file system.   {#2803}
[02:47:44] TEACHER: what you do when you open a file you can specify file options read like r w r plus w plus   {#2804}
[02:47:53] TEACHER: there is an option called a a is an append only option okay so when you do that the underlying   {#2805}
[02:48:02] TEACHER: file system so when you do file io what happens the file system system call gets involved right   {#2806}
[02:48:10] TEACHER: that takes care of structuring this file moving it here and there broking it into pieces in case   {#2807}
[02:48:15] TEACHER: that's how it is implemented you don't have to on upfront reserve one gb of file you just open a file   {#2808}
[02:48:21] TEACHER: and start writing to it without thinking without worrying about it that's what is abstracted by the   {#2809}
[02:48:26] TEACHER: file system right now it does not mean that they would have done it very poorly in most cases when   {#2810}
[02:48:32] TEACHER: a file is allocated, it's allocated like a huge chunk is marked as blocked and it's responsibility   {#2811}
[02:48:40] TEACHER: of the file system, BTRFS, NTFS, EXT234, whichever you are using, that when you are creating   {#2812}
[02:48:47] TEACHER: new files, it finds a decent enough free space for it to be there.   {#2813}
[02:48:53] TEACHER: So it's not a sequential allocation of multiple files, but it just spaced out a bit.   {#2814}
[02:49:00] TEACHER: This way, even if your file grows out slightly larger,   {#2815}
[02:49:03] TEACHER: there is no, there is no problem.   {#2816}
[02:49:06] TEACHER: Right.   {#2817}
[02:49:06] TEACHER: So when you are, when you'd want to create an append only file,   {#2818}
[02:49:10] TEACHER: when you write, when you open a file,   {#2819}
[02:49:11] TEACHER: just pass in an option A for append only mode.   {#2820}
[02:49:14] TEACHER: And you have now just created an append only file.   {#2821}
[02:49:17] STUDENT_13: Okay.   {#2822}
[02:49:18] STUDENT_13: Right.   {#2823}
[02:49:20] TEACHER: Thanks.   {#2824}
[02:49:21] TEACHER: Yeah.   {#2825}
[02:49:23] STUDENT_3: So my question is regarding the delete, deletion of the keys.   {#2826}
[02:49:29] STUDENT_3: putting some default value for deletion, but then how are we handling it in the merge?   {#2827}
[02:49:34] TEACHER: In merge and compact, when you're merging the two active, when you're merging the two   {#2828}
[02:49:37] TEACHER: immutable files, you skip the deleted entries.   {#2829}
[02:49:41] TEACHER: That is the file that you're writing.   {#2830}
[02:49:43] TEACHER: So let's say you are having three files, one active and two read only.   {#2831}
[02:49:47] TEACHER: Those two read only you will merge while you're merging and creating a third file.   {#2832}
[02:49:51] TEACHER: You skip the stale entries and the deleted entries.   {#2833}
[02:49:54] TEACHER: So that would never be copied on the disk.   {#2834}
[02:49:58] STUDENT_3: So basically for the entries which have for which we have that default value, we'll avoid   {#2835}
[02:50:03] TEACHER: the first entry and the, uh, because as soon as you detect it, you would not just store   {#2836}
[02:50:09] TEACHER: that anyway.   {#2837}
[02:50:11] STUDENT_3: Okay.   {#2838}
[02:50:13] TEACHER: Right.   {#2839}
[02:50:13] TEACHER: Because see, you are having three files in total.   {#2840}
[02:50:15] TEACHER: One is the active file and all the rights are happening and having two historical files,   {#2841}
[02:50:19] TEACHER: which were rotated.   {#2842}
[02:50:21] TEACHER: Right.   {#2843}
[02:50:21] TEACHER: Now you will be merging and compacting these two files.   {#2844}
[02:50:23] TEACHER: Right.   {#2845}
[02:50:26] TEACHER: you would skip the stale entries,   {#2846}
[02:50:29] TEACHER: which means let's say I've written key K1 twice.   {#2847}
[02:50:31] TEACHER: I'll skip the first entry.   {#2848}
[02:50:33] TEACHER: So I'll append when I'm writing to the new file,   {#2849}
[02:50:36] TEACHER: what I'm doing is I'm first buffering the key value pair in memory.   {#2850}
[02:50:42] TEACHER: And I'm just replacing whatever I find it there.   {#2851}
[02:50:45] TEACHER: If I get something new out of it,   {#2852}
[02:50:47] TEACHER: I'm sorry, if I get a key, which is deleted,   {#2853}
[02:50:49] TEACHER: I would just remove the entry from the in-memory hash table.   {#2854}
[02:50:52] TEACHER: And then I flush this entire hash table as this new file.   {#2855}
[02:50:56] TEACHER: This hash table is different from the index that we spoke about.   {#2856}
[02:50:59] TEACHER: Index is separate.   {#2857}
[02:51:00] TEACHER: This is a separate process that you are running, which is all about merging this.   {#2858}
[02:51:03] TEACHER: Right.   {#2859}
[02:51:05] STUDENT_3: Got it.   {#2860}
[02:51:06] TEACHER: Yeah.   {#2861}
[02:51:07] TEACHER: So, uh, that's what I'm, uh, highly recommending to write this very small bit   {#2862}
[02:51:13] TEACHER: custom repetition, very nice.   {#2863}
[02:51:15] TEACHER: Right.   {#2864}
[02:51:15] TEACHER: You'll get like how then, then you'll start summing up on this, like, hi, how would you   {#2865}
[02:51:19] TEACHER: merge?   {#2866}
[02:51:20] TEACHER: How do you merge this two file in the same process in different process?   {#2867}
[02:51:23] TEACHER: How will you update in memory index that you have, right?   {#2868}
[02:51:27] TEACHER: All those nitty gritties, those devils that lies in the details,   {#2869}
[02:51:32] TEACHER: you would explore that.   {#2870}
[02:51:35] TEACHER: And it's not, to be honest, it's not really difficult.   {#2871}
[02:51:38] TEACHER: Just start writing code one week of time, spare that one week of time,   {#2872}
[02:51:42] TEACHER: but build this stuff.   {#2873}
[02:51:44] TEACHER: Right.   {#2874}
[02:51:45] TEACHER: But in case any difficulty, drop me a note, I'm more than happy to help you.   {#2875}
[02:51:49] TEACHER: Sure.   {#2876}
[02:51:51] STUDENT_2: Sitesh.   {#2877}
[02:51:53] STUDENT_2: So I have an implementation specific question.   {#2878}
[02:51:56] STUDENT_2: Can you go back a slide?   {#2879}
[02:51:58] STUDENT_2: I am wondering on the checksum thing,   {#2880}
[02:52:02] STUDENT_2: the checksum that we added on the value.   {#2881}
---- OWNED SEGMENTS END ----

CTX| [02:52:08] STUDENT_2: So like what we are saying here is   {#2882}
CTX| [02:52:12] STUDENT_2: writing the whole value is not atomic,   {#2883}
CTX| [02:52:14] STUDENT_2: but writing the checksum and the header is.   {#2884}
CTX| [02:52:17] STUDENT_2: Yes.   {#2885}
CTX| [02:52:19] TEACHER: Writing this is atomic.   {#2886}
CTX| [02:52:23] STUDENT_2: Yeah, my question is coming from, so like one is what, so different file systems and kernels   {#2887}
CTX| [02:52:31] STUDENT_2: now will give you different guarantees, right?   {#2888}
CTX| [02:52:33] STUDENT_2: I just want to understand a pattern here.   {#2889}
CTX| [02:52:35] STUDENT_2: So is the pattern that like let us suppose we are assuming that this is under the block size.   {#2890}
CTX| [02:52:42] STUDENT_2: So it is guaranteed by the kernel to us.   {#2891}
CTX| [02:52:44] STUDENT_2: So we write that first and then write the rest of the things later.   {#2892}
CTX| [02:52:48] STUDENT_2: Because this value can be 1 mbp.   {#2893}
CTX| [02:52:50] TEACHER: Now, your kernel might not give that guarantee.   {#2894}
CTX| [02:52:54] TEACHER: Right.   {#2895}
CTX| [02:52:54] STUDENT_2: That's right.   {#2896}
CTX| [02:52:55] STUDENT_2: Yeah.   {#2897}
CTX| [02:52:55] STUDENT_2: That is what I was trying to understand because now when you try to install this software   {#2898}
CTX| [02:53:00] STUDENT_2: on different kernels, behaviors may be different, but we have to be, and that's how this whole   {#2899}
CTX| [02:53:05] STUDENT_2: wall thing goes.   {#2900}
CTX| [02:53:06] STUDENT_2: Right.   {#2901}
CTX| [02:53:06] TEACHER: So, but in any case, if you look carefully, this is eight bytes, four bytes, four bytes,   {#2902}
