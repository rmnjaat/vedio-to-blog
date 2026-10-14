# chunk_03  OWNS 00:23:53 -> 00:37:11  (segments #423-#670, 2072 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:22:58] TEACHER: very read heavy application.   {#412}
CTX| [00:23:00] TEACHER: So linear search is not a way to go because when you search linearly for every read   {#413}
CTX| [00:23:07] TEACHER: request that is coming in, you would be worst case, you would be effectively reading   {#414}
CTX| [00:23:11] TEACHER: one terabyte file every single time.   {#415}
CTX| [00:23:13] TEACHER: Right.   {#416}
CTX| [00:23:13] TEACHER: worst case right on an average would be reading half a terabyte for every read which will make   {#417}
CTX| [00:23:18] TEACHER: your things first of all very slow second it would degrade the performance of your disk third your   {#418}
CTX| [00:23:25] TEACHER: disk sectors will go bad because it is very heavily overutilized at the moment right so it has hardware   {#419}
CTX| [00:23:31] TEACHER: problems it has software problems it has time problems right so whenever you are in the situation   {#420}
CTX| [00:23:37] TEACHER: where your reads are slow, always, always in order to make things faster, in order to   {#421}
CTX| [00:23:44] TEACHER: make reads faster, the only thing that should come to your mind is indexing.   {#422}

---- OWNED SEGMENTS START ----
[00:23:53] TEACHER: So can we somehow index the data?   {#423}
[00:23:56] TEACHER: Can we somehow create a small index through which we would be able to not, through which   {#424}
[00:24:03] TEACHER: we should avoid doing a sequential scan of this entire file to hunt for the meaning that   {#425}
[00:24:10] TEACHER: we are doing or to hunt for the key that we are looking for.   {#426}
[00:24:13] TEACHER: So can we create an index on top of it?   {#427}
[00:24:17] TEACHER: So that's what would be the index that we'll create.   {#428}
[00:24:19] TEACHER: Just one level index, simple.   {#429}
[00:24:22] TEACHER: What would this index look like?   {#430}
[00:24:24] STUDENT_2: Yeah.   {#431}
[00:24:24] STUDENT_2: So basically offset and the name, like basically Apple or MSN.   {#432}
[00:24:30] TEACHER: And the key, right?   {#433}
[00:24:31] TEACHER: Key and the offset.   {#434}
[00:24:33] STUDENT_2: point to what? Offset is basically inside the file. So first line of this file is basically,   {#435}
[00:24:42] STUDENT_2: let us suppose we have organized it line by line is offset zero and so on. So offset is the   {#436}
[00:24:50] TEACHER: nth byte from the beginning of the file up until with that line starts. Right. So Apple is done.   {#437}
[00:24:59] TEACHER: Amazon is offset to which points over here.   {#438}
[00:25:02] TEACHER: Then maybe you might have a third word.   {#439}
[00:25:03] TEACHER: Let's say book with offset three with stores over here.   {#440}
[00:25:06] TEACHER: And offset is the byte position of that word in that file.   {#441}
[00:25:09] TEACHER: Okay.   {#442}
[00:25:10] TEACHER: Now let's estimate the size of this index.   {#443}
[00:25:14] TEACHER: So this is a classic index.   {#444}
[00:25:16] TEACHER: Now, how would the read happen?   {#445}
[00:25:19] TEACHER: Now, first of all, we would now what we'll do.   {#446}
[00:25:22] TEACHER: Now, if you were to, given that we have an index,   {#447}
[00:25:28] TEACHER: gigantic file and now if let's say I'm searching for a word if I'm let's say searching for apple   {#448}
[00:25:33] TEACHER: what I can do is I can read this file I can open this file index file that I have I'll iterate this   {#449}
[00:25:40] TEACHER: file line by line at the moment we have still not done what how should we read this file but assume   {#450}
[00:25:45] TEACHER: that we are reading this file line by line and we find the key that we're interested in let's say   {#451}
[00:25:50] TEACHER: we're interested in apple we got it we got the offset around it we went to the corresponding   {#452}
[00:25:58] TEACHER: file and then we read this entire line from it, get the meaning and send it to the user.   {#453}
[00:26:03] TEACHER: It's like, but you are doing linear scan over here.   {#454}
[00:26:06] TEACHER: You're still doing linear scan over here.   {#455}
[00:26:08] TEACHER: How is this better?   {#456}
[00:26:09] TEACHER: This is better because here, when you are doing the linear scan, you are also going   {#457}
[00:26:15] TEACHER: through the meanings of the word, which are going to be huge while you're doing   {#458}
[00:26:20] TEACHER: linear scan over here.   {#459}
[00:26:22] TEACHER: What's happening is you are just for each key that you have, you are just having a   {#460}
[00:26:28] TEACHER: right offset that you are storing against which right.   {#461}
[00:26:31] TEACHER: So you are not iterating around MVs of data, but rather this is just 4 byte offset.   {#462}
[00:26:35] TEACHER: So it's very fast to read this small file sequentially worst case sequentially as compared   {#463}
[00:26:42] TEACHER: to this gigantic file, because when you do file IO, you always go in a sequential way   {#464}
[00:26:48] TEACHER: over there.   {#465}
[00:26:49] TEACHER: Right.   {#466}
[00:26:50] TEACHER: Okay.   {#467}
[00:26:50] TEACHER: Now, can we like, should we do this sequentially?   {#468}
[00:26:54] TEACHER: Let's see.   {#469}
[00:26:55] TEACHER: Can we fit this index in memory?   {#470}
[00:26:58] TEACHER: some basic computation to see how big this index file would be.   {#471}
[00:27:03] TEACHER: Right.   {#472}
[00:27:03] TEACHER: Harsh, I'll pull you in.   {#473}
[00:27:05] TEACHER: How we need to estimate the size of this index.   {#474}
[00:27:08] TEACHER: The number of words that we have is 170,000 words.   {#475}
[00:27:16] TEACHER: And what next?   {#476}
[00:27:18] TEACHER: How will you compute the size of this index?   {#477}
[00:27:23] TEACHER: Harsh.   {#478}
[00:27:25] STUDENT_11: Yeah.   {#479}
[00:27:26] STUDENT_11: Hi, Arbit.   {#480}
[00:27:28] STUDENT_6: thinking one very small way to do it. Like in this index, can we have that 26 entries   {#481}
[00:27:34] STUDENT_6: like ABCD, E, F, G something and their indexes or location.   {#482}
[00:27:39] STUDENT_6: But then we only have 26.   {#483}
[00:27:42] TEACHER: But then still you would have to go to those, those all the words for Apple in order to   {#484}
[00:27:46] TEACHER: find that one word.   {#485}
[00:27:47] TEACHER: Right.   {#486}
[00:27:48] STUDENT_6: Yeah.   {#487}
[00:27:48] STUDENT_6: But we at least know about ABCD.   {#488}
[00:27:50] TEACHER: But then isn't this better given that you already know Apple, you know, the   {#489}
[00:27:54] TEACHER: opposite to directly go to that line and read it.   {#490}
[00:27:58] STUDENT_6: We have all the words, right?   {#491}
[00:28:00] STUDENT_6: That's your concern.   {#492}
[00:28:02] STUDENT_6: Right.   {#493}
[00:28:03] TEACHER: But let's assume, let's compute the size of the index.   {#494}
[00:28:05] TEACHER: How big that index is.   {#495}
[00:28:08] TEACHER: The size of each entry in the index is how big?   {#496}
[00:28:11] TEACHER: The length of the key and the length of the offset.   {#497}
[00:28:15] TEACHER: Correct?   {#498}
[00:28:16] TEACHER: Correct.   {#499}
[00:28:17] TEACHER: So what's the length of the key is the length of the word that you have.   {#500}
[00:28:20] TEACHER: The length of the word on an average in English dictionary is 4.3 something.   {#501}
[00:28:28] TEACHER: average length.   {#502}
[00:28:30] TEACHER: So average length is 4.3   {#503}
[00:28:32] TEACHER: plus what you are storing   {#504}
[00:28:33] TEACHER: and offset. Offset is   {#505}
[00:28:36] TEACHER: integer. Integer will take up 4 bytes.   {#506}
[00:28:39] TEACHER: Right?   {#507}
[00:28:40] TEACHER: So 4.3 plus   {#508}
[00:28:42] TEACHER: 4 is roughly   {#509}
[00:28:44] TEACHER: the size of one index record.   {#510}
[00:28:46] TEACHER: This much. Correct?   {#511}
[00:28:48] TEACHER: Correct.   {#512}
[00:28:49] TEACHER: And now let's say you store it in a new line.   {#513}
[00:28:51] TEACHER: So you add 2 more buffer characters.   {#514}
[00:28:54] TEACHER: One for comma   {#515}
[00:28:55] TEACHER: and one for new line that you have.   {#516}
[00:28:58] TEACHER: Right.   {#517}
[00:29:00] TEACHER: So these many characters or these many bytes per index, you are having one entry for each   {#518}
[00:29:08] TEACHER: word that you have.   {#519}
[00:29:09] TEACHER: You have total 170,000 words.   {#520}
[00:29:11] TEACHER: So this would be the size of your index.   {#521}
[00:29:13] TEACHER: Correct.   {#522}
[00:29:14] TEACHER: Correct.   {#523}
[00:29:15] TEACHER: Okay.   {#524}
[00:29:16] TEACHER: Do this multiplication and tell me what the size of the index is.   {#525}
[00:29:19] TEACHER: Open a calculator and do this multiplication for me.   {#526}
[00:29:25] TEACHER: Yeah.   {#527}
[00:29:26] TEACHER: Take your time.   {#528}
[00:29:53] STUDENT_6: 17,000,000.   {#529}
[00:29:55] TEACHER: 17,000,000.   {#530}
[00:29:57] TEACHER: Tell me the exact number.   {#531}
[00:30:00] STUDENT_6: 17,000,000.   {#532}
[00:30:02] STUDENT_6: 17,000,000.   {#533}
[00:30:05] TEACHER: 17,000,000.   {#534}
[00:30:06] TEACHER: These many bytes.   {#535}
[00:30:08] TEACHER: Right.   {#536}
[00:30:09] TEACHER: So if these many bytes is the size of the index file,   {#537}
[00:30:13] TEACHER: it seems too big.   {#538}
[00:30:15] TEACHER: Let's convert it into KB.   {#539}
[00:30:17] TEACHER: It will be?   {#540}
[00:30:21] TEACHER: 1751   {#541}
[00:30:22] TEACHER: KB   {#542}
[00:30:23] TEACHER: which is equal to 1.751   {#543}
[00:30:26] TEACHER: MB. That's it.   {#544}
[00:30:29] TEACHER: Okay.   {#545}
[00:30:30] TEACHER: Now, will you   {#546}
[00:30:32] TEACHER: worry about it? 1.751   {#547}
[00:30:34] TEACHER: you can fit it in RAM very easily.   {#548}
[00:30:37] TEACHER: Right.   {#549}
[00:30:38] TEACHER: Right? So this is what I wanted   {#550}
[00:30:39] TEACHER: to showcase that   {#551}
[00:30:41] TEACHER: this is why number crunching   {#552}
[00:30:44] TEACHER: is very important when you are   {#553}
[00:30:45] TEACHER: designing any system.   {#554}
[00:30:48] TEACHER: What seems to be very huge one terabyte big file or 170,000 words.   {#555}
[00:30:55] TEACHER: When you do this computation, you find out, Hey, this file is indeed one terabyte big,   {#556}
[00:31:00] TEACHER: but the index that we are creating is like can fit in just 1.751 MB, which is peanuts,   {#557}
[00:31:09] TEACHER: which is nothing.   {#558}
[00:31:10] TEACHER: You can literally load this index in memory stored in disk while processing load this   {#559}
[00:31:15] TEACHER: in memory.   {#560}
[00:31:15] TEACHER: So now, the things that you're trying to do, like A to Z, you don't really have to, because   {#561}
[00:31:21] TEACHER: you can fit this index right in your memory.   {#562}
[00:31:24] TEACHER: Given a word, just look it up.   {#563}
[00:31:27] TEACHER: It's like create a hash map out of this in memory, given a word, check the hash map,   {#564}
[00:31:33] TEACHER: get the offset, go to this file, read the corresponding line from that offset and return   {#565}
[00:31:37] TEACHER: the meaning to the user.   {#566}
[00:31:40] TEACHER: life becomes so simple and this is why I wanted to show like this one simple number crunch that   {#567}
[00:31:47] TEACHER: we did it helped us make our system very better because what has happened is instead of over   {#568}
[00:31:54] TEACHER: complicating things we just keep it very simple that one level of indexing so first of all just   {#569}
[00:32:01] TEACHER: to uh converge on this discussion and give you a quick summary of it we started with storing this   {#570}
[00:32:08] TEACHER: in a simple CSV format that we had.   {#571}
[00:32:11] TEACHER: Then because now storage part is done.   {#572}
[00:32:13] TEACHER: Now, when you are trying to query it,   {#573}
[00:32:15] TEACHER: when you're trying to query it, what we found out,   {#574}
[00:32:17] TEACHER: hey, we have to do linear scan every time.   {#575}
[00:32:19] TEACHER: For every query, for every read request,   {#576}
[00:32:22] TEACHER: if I'm doing this linear scan, sequential scan in this file,   {#577}
[00:32:25] TEACHER: on an average, I would be reading 0.5 terabytes,   {#578}
[00:32:28] TEACHER: like half of it, 0.5 terabytes on every request, rough estimate.   {#579}
[00:32:31] TEACHER: Then for every read request, reading 0.5 terabytes is very slow.   {#580}
[00:32:35] TEACHER: 0.5 terabyte is 500 GB.   {#581}
[00:32:38] TEACHER: request it's going to be very slow so whenever our reads are slow the only thing that we can think of   {#582}
[00:32:44] TEACHER: is indexing and that's the good way to approach it reads were slow to make it first we create an   {#583}
[00:32:49] TEACHER: index in index what we store we store the key and the offset at which it is present in the file   {#584}
[00:32:56] TEACHER: right now we think of doing let's say let's keep it simple let's start to do linear scan on this   {#585}
[00:33:01] TEACHER: thing every time we get a request on this file if we do that every time that we get request we do a   {#586}
[00:33:08] TEACHER: figure out a key and then get to offset and then query it.   {#587}
[00:33:11] TEACHER: What would happen?   {#588}
[00:33:12] TEACHER: We think, hey, isn't this slow?   {#589}
[00:33:14] TEACHER: But in order to see if this linear scan is going to be slow or not,   {#590}
[00:33:19] TEACHER: we find the size of this index.   {#591}
[00:33:21] TEACHER: The size of this index is the number of entries that we would have,   {#592}
[00:33:25] TEACHER: which is equal to the number of words that we have multiplied   {#593}
[00:33:28] TEACHER: by the average record size, right?   {#594}
[00:33:31] TEACHER: It's English dictionary that we are building.   {#595}
[00:33:33] TEACHER: In English dictionary, the average length of a word is 4.3   {#596}
[00:33:38] TEACHER: either one of this, but it's not more than five.   {#597}
[00:33:41] TEACHER: Definitely. That's the average one.   {#598}
[00:33:42] TEACHER: I actually downloaded an entire dictionary and then computed the average length.   {#599}
[00:33:46] TEACHER: That's how I got to know.   {#600}
[00:33:47] TEACHER: So it's 4.3 as it's R4.4.   {#601}
[00:33:50] TEACHER: Something like that, but 4.3 plus 4 by to store this integer.   {#602}
[00:33:55] TEACHER: So 4.3 plus 4 plus 1 for combine 1 for new line.   {#603}
[00:33:59] TEACHER: So it became 8.3 plus 2 is 10.3,   {#604}
[00:34:01] TEACHER: 10.3 into 17,   {#605}
[00:34:06] TEACHER: which gives you just 1.75 MB.   {#606}
[00:34:09] TEACHER: Given this, we can very easily see,   {#607}
[00:34:11] TEACHER: we can literally store this index in memory.   {#608}
[00:34:14] TEACHER: Like we can load this index in memory   {#609}
[00:34:16] TEACHER: when my API server starts,   {#610}
[00:34:17] TEACHER: request comes in,   {#611}
[00:34:18] TEACHER: I check this in memory hash table   {#612}
[00:34:20] TEACHER: where this index is,   {#613}
[00:34:22] TEACHER: I get the key,   {#614}
[00:34:23] TEACHER: check the offset,   {#615}
[00:34:25] TEACHER: go to this file,   {#616}
[00:34:26] TEACHER: read the meaning   {#617}
[00:34:27] TEACHER: and send it back to the user.   {#618}
[00:34:29] TEACHER: And this makes,   {#619}
[00:34:31] TEACHER: this now makes   {#620}
[00:34:34] TEACHER: much faster because we are not doing linear scan over here.   {#621}
[00:34:38] TEACHER: We are directly doing a pointed read on this file with the help of this index.   {#622}
[00:34:44] TEACHER: Right.   {#623}
[00:34:45] TEACHER: Okay.   {#624}
[00:34:46] TEACHER: Okay.   {#625}
[00:34:47] TEACHER: This is the first part where we sorted out our storage and our querying side of things.   {#626}
[00:34:54] TEACHER: Right.   {#627}
[00:34:54] TEACHER: Okay.   {#628}
[00:34:54] TEACHER: Now let's talk about portability.   {#629}
[00:34:57] TEACHER: Now here you see we have now two files.   {#630}
[00:35:02] TEACHER: Data.dictionary.   {#631}
[00:35:04] TEACHER: We have the two files.   {#632}
[00:35:06] TEACHER: We have index.index.of dictionary and data.dictionary.   {#633}
[00:35:10] TEACHER: In index file, we have the index.   {#634}
[00:35:12] TEACHER: In data file, we have the data.   {#635}
[00:35:14] TEACHER: Now for us to ship this quote unquote, ship this dictionary to someone, anyone, I am having   {#636}
[00:35:21] TEACHER: two files at the moment.   {#637}
[00:35:23] TEACHER: This breaks the portability thing.   {#638}
[00:35:25] TEACHER: We want this to be just one file.   {#639}
[00:35:28] TEACHER: How can we go about this?   {#640}
[00:35:31] TEACHER: Anyone except Rahul and because these folks are quite active.   {#641}
[00:35:34] TEACHER: I'm just probing someone else to participate.   {#642}
[00:35:38] TEACHER: Anyone else who wants to do it.   {#643}
[00:35:41] TEACHER: We have two files.   {#644}
[00:35:43] TEACHER: We don't want two files.   {#645}
[00:35:44] TEACHER: We want one file.   {#646}
[00:35:45] TEACHER: Alok.   {#647}
[00:35:47] STUDENT_7: Do we need to create a file for the index?   {#648}
[00:35:49] STUDENT_7: I mean, on the system startup, can we just build it up in memory?   {#649}
[00:35:56] TEACHER: So which means on every startup you have to iterate through this entire   {#650}
[00:36:02] TEACHER: We can avoid it, right?   {#651}
[00:36:03] TEACHER: Because why do we do that?   {#652}
[00:36:05] TEACHER: Because this is not changing anyway.   {#653}
[00:36:08] TEACHER: Right?   {#654}
[00:36:08] TEACHER: This will change once every week, right?   {#655}
[00:36:11] TEACHER: This, this file.   {#656}
[00:36:14] STUDENT_7: I mean, then basically it is about merging these two files and having it in one file.   {#657}
[00:36:21] STUDENT_7: So having some kind of partition between, some kind of partition between using which   {#658}
[00:36:28] STUDENT_7: we know that till this line, this is the index and after this is the dictionary.   {#659}
[00:36:32] TEACHER: Okay.   {#660}
[00:36:33] TEACHER: So now what we do, we have this, so we merge it.   {#661}
[00:36:36] TEACHER: Okay.   {#662}
[00:36:37] TEACHER: But now that's now a new challenge would come in.   {#663}
[00:36:39] TEACHER: So now you are merging this two file into one gigantic file in which you have index.   {#664}
[00:36:49] TEACHER: You literally concatenate this file and you have this gigantic data that you have.   {#665}
[00:36:54] TEACHER: Okay.   {#666}
[00:36:54] TEACHER: Okay. But how would you know when your index ends and when your data begins?   {#667}
[00:37:00] STUDENT_7: There has to be some line or some, uh, some special information.   {#668}
[00:37:05] STUDENT_7: Yeah.   {#669}
[00:37:07] STUDENT_7: Okay.   {#670}
---- OWNED SEGMENTS END ----

CTX| [00:37:11] TEACHER: Anmol, any other approach?   {#671}
CTX| [00:37:15] STUDENT_10: So, uh, I mean, we can pre allocate the space for index because the words are, uh, I mean,   {#672}
CTX| [00:37:21] STUDENT_10: We know the size of the words and only few words will be added.   {#673}
CTX| [00:37:25] STUDENT_11: What do you mean by pre-allocate?   {#674}
CTX| [00:37:27] STUDENT_10: Pre-allocate in the sense like we can fix the size for the index.   {#675}
CTX| [00:37:31] TEACHER: Okay. You are giving it a fixed size. So for example, that I know that my dictionary,   {#676}
CTX| [00:37:35] TEACHER: but what would be a fixed size? Right now it's 1.751 MD.   {#677}
CTX| [00:37:40] STUDENT_10: Yes. I would be giving more to the index more than this. That is currently there, but   {#678}
CTX| [00:37:47] STUDENT_10: because the new words will be added very less, right?   {#679}
CTX| [00:37:51] TEACHER: that, hey, instead of me worrying about to have a separate or a special line that denotes   {#680}
CTX| [00:37:57] TEACHER: that my index ended and now my data begins.   {#681}
CTX| [00:38:00] TEACHER: What you are doing is you are giving a fixed width to this index that when my application   {#682}
CTX| [00:38:05] TEACHER: starts, when it reads this gigantic file, it knows that the first two MB is going to   {#683}
CTX| [00:38:10] TEACHER: be my index.   {#684}
CTX| [00:38:11] TEACHER: Yes.   {#685}
