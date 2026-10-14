# chunk_04  OWNS 00:37:11 -> 00:50:26  (segments #671-#888, 2180 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:36:14] STUDENT_7: I mean, then basically it is about merging these two files and having it in one file.   {#657}
CTX| [00:36:21] STUDENT_7: So having some kind of partition between, some kind of partition between using which   {#658}
CTX| [00:36:28] STUDENT_7: we know that till this line, this is the index and after this is the dictionary.   {#659}
CTX| [00:36:32] TEACHER: Okay.   {#660}
CTX| [00:36:33] TEACHER: So now what we do, we have this, so we merge it.   {#661}
CTX| [00:36:36] TEACHER: Okay.   {#662}
CTX| [00:36:37] TEACHER: But now that's now a new challenge would come in.   {#663}
CTX| [00:36:39] TEACHER: So now you are merging this two file into one gigantic file in which you have index.   {#664}
CTX| [00:36:49] TEACHER: You literally concatenate this file and you have this gigantic data that you have.   {#665}
CTX| [00:36:54] TEACHER: Okay.   {#666}
CTX| [00:36:54] TEACHER: Okay. But how would you know when your index ends and when your data begins?   {#667}
CTX| [00:37:00] STUDENT_7: There has to be some line or some, uh, some special information.   {#668}
CTX| [00:37:05] STUDENT_7: Yeah.   {#669}
CTX| [00:37:07] STUDENT_7: Okay.   {#670}

---- OWNED SEGMENTS START ----
[00:37:11] TEACHER: Anmol, any other approach?   {#671}
[00:37:15] STUDENT_10: So, uh, I mean, we can pre allocate the space for index because the words are, uh, I mean,   {#672}
[00:37:21] STUDENT_10: We know the size of the words and only few words will be added.   {#673}
[00:37:25] STUDENT_11: What do you mean by pre-allocate?   {#674}
[00:37:27] STUDENT_10: Pre-allocate in the sense like we can fix the size for the index.   {#675}
[00:37:31] TEACHER: Okay. You are giving it a fixed size. So for example, that I know that my dictionary,   {#676}
[00:37:35] TEACHER: but what would be a fixed size? Right now it's 1.751 MD.   {#677}
[00:37:40] STUDENT_10: Yes. I would be giving more to the index more than this. That is currently there, but   {#678}
[00:37:47] STUDENT_10: because the new words will be added very less, right?   {#679}
[00:37:51] TEACHER: that, hey, instead of me worrying about to have a separate or a special line that denotes   {#680}
[00:37:57] TEACHER: that my index ended and now my data begins.   {#681}
[00:38:00] TEACHER: What you are doing is you are giving a fixed width to this index that when my application   {#682}
[00:38:05] TEACHER: starts, when it reads this gigantic file, it knows that the first two MB is going to   {#683}
[00:38:10] TEACHER: be my index.   {#684}
[00:38:11] TEACHER: Yes.   {#685}
[00:38:12] TEACHER: Right.   {#686}
[00:38:12] TEACHER: Okay.   {#687}
[00:38:12] TEACHER: That's a good approach.   {#688}
[00:38:13] TEACHER: That's a very nice hack, but it's not space.   {#689}
[00:38:15] TEACHER: Although you're wasting very little space, but let's be a little more frugal about it.   {#690}
[00:38:22] STUDENT_10: Sure.   {#691}
[00:38:25] TEACHER: Gaurav, what else can you do?   {#692}
[00:38:27] STUDENT_1: These are two good approaches.   {#693}
[00:38:29] STUDENT_1: What else can you do?   {#694}
[00:38:30] STUDENT_1: Building on top of it, we can have data is stored from top to bottom, bottom within the   {#695}
[00:38:35] STUDENT_1: file and index is stored from bottom to top within the file.   {#696}
[00:38:39] STUDENT_1: How would you know where one ends and another begins?   {#697}
[00:38:43] TEACHER: You still want to know, right?   {#698}
[00:38:48] TEACHER: Up until where should I read to load the index?   {#699}
[00:38:51] TEACHER: store index like this, how would you know when to stop reading the index?   {#700}
[00:38:56] TEACHER: Like when to stop so that you have built this in memory hash table.   {#701}
[00:39:03] TEACHER: Because imagine I'll just, I'll just give a quick example.   {#702}
[00:39:06] TEACHER: So let's say this is how you have concluded.   {#703}
[00:39:09] TEACHER: So first index and then data all in CSV format.   {#704}
[00:39:12] TEACHER: Right now, when you start reading this line by line, you created hash table,   {#705}
[00:39:16] TEACHER: hash table, hash table, hash table, hash table, you put it entry there and then   {#706}
[00:39:21] TEACHER: this first you had an hash table apple comma o1 and then when you start i did this you got apple   {#707}
[00:39:27] TEACHER: and then you replace it with a fruit or something right so you need to be a little more frugal about   {#708}
[00:39:32] STUDENT_1: it that you need to know when to stop so what i meant was that index can grow like a stack which   {#709}
[00:39:40] STUDENT_1: means from the nth byte to n minus one and minus two so on and data can start from zero zero so   {#710}
[00:39:47] STUDENT_1: So then you are wasting this much of space.   {#711}
[00:39:49] STUDENT_1: So this much of space might be unutilized.   {#712}
[00:39:52] STUDENT_1: Today it might be unutilized, but someday.   {#713}
[00:39:55] TEACHER: But the day when these two are right next to each other,   {#714}
[00:40:00] TEACHER: how would you know when one finished and other begins?   {#715}
[00:40:03] TEACHER: Yeah, having a separator probably.   {#716}
[00:40:06] TEACHER: So you are also going with separator, right?   {#717}
[00:40:08] TEACHER: Yes, yes, yes.   {#718}
[00:40:09] TEACHER: Okay.   {#719}
[00:40:10] TEACHER: Yes, Amrita?   {#720}
[00:40:13] STUDENT_3: So basically I was thinking that since the data is always going to grow, but we can choose   {#721}
[00:40:21] STUDENT_3: a specific index to store that information.   {#722}
[00:40:23] STUDENT_3: So maybe at the zero thing, they saw the first set we can choose to store that separate information   {#723}
[00:40:28] STUDENT_3: and then update it as the add on data.   {#724}
[00:40:32] TEACHER: Okay.   {#725}
[00:40:32] TEACHER: That's interesting.   {#726}
[00:40:33] TEACHER: So what you're saying is that add something in the beginning of this and specify what   {#727}
[00:40:41] TEACHER: is. Correct? Right. Okay. So now if you do this, your way to read this entire file would   {#728}
[00:40:53] TEACHER: be I first read the separator. Then I start reading the data until I find it separator   {#729}
[00:40:58] TEACHER: and that much becomes my index beyond which becomes my data. Correct. Now I'm saying,   {#730}
[00:41:04] TEACHER: can you change this to store something else?   {#731}
[00:41:09] TEACHER: That would be much more beneficial for you.   {#732}
[00:41:13] TEACHER: Instead of storing the separator,   {#733}
[00:41:16] TEACHER: can you not directly store the byte offset?   {#734}
[00:41:21] STUDENT_3: Yes, we can.   {#735}
[00:41:22] TEACHER: It eradicates the need of a separator.   {#736}
[00:41:24] TEACHER: And then the advantage of it is let's say you store   {#737}
[00:41:30] TEACHER: the byte offset   {#738}
[00:41:34] TEACHER: of data. So place where the data begins.   {#739}
[00:41:38] TEACHER: And if you store this information, you exactly know when your file loads or when you are trying to read this entire file.   {#740}
[00:41:46] TEACHER: The first step is to read this first chunk. And this is a classic way of having a header.   {#741}
[00:41:55] TEACHER: in any file format of the world png jpg mp3 avi everywhere the first few bytes it depends on the   {#742}
[00:42:06] TEACHER: protocol it depends on the format that the creator of that uh image format or whatever format   {#743}
[00:42:11] TEACHER: specifies what that should be that first few bytes denotes or contains the meta information   {#744}
[00:42:18] TEACHER: about everything else in the file.   {#745}
[00:42:21] TEACHER: So what you just spoke about Amrita   {#746}
[00:42:23] TEACHER: is to add this header   {#747}
[00:42:25] TEACHER: whose job would be   {#748}
[00:42:27] TEACHER: to store this meta information   {#749}
[00:42:28] TEACHER: about the file that you are creating,   {#750}
[00:42:31] TEACHER: the singular file that you are creating.   {#751}
[00:42:32] TEACHER: Because it contains multiple sections,   {#752}
[00:42:34] TEACHER: you are storing the information   {#753}
[00:42:36] TEACHER: about each of the sections in this header.   {#754}
[00:42:38] TEACHER: I'll give a small example.   {#755}
[00:42:39] TEACHER: So in this header,   {#756}
[00:42:41] TEACHER: we might just store   {#757}
[00:42:43] TEACHER: that this is our dictionary.   {#758}
[00:42:48] TEACHER: with some version number.   {#759}
[00:42:52] TEACHER: And now this has to be a fixed size header.   {#760}
[00:42:56] TEACHER: It cannot go beyond that.   {#761}
[00:42:57] TEACHER: And you have start offset of data.   {#762}
[00:43:03] TEACHER: Or rather you may insert store index size.   {#763}
[00:43:07] TEACHER: How big your index is.   {#764}
[00:43:11] TEACHER: So let's say this requires you   {#765}
[00:43:12] TEACHER: 1, 2, 3, 4, 5, 6, 7.   {#766}
[00:43:15] TEACHER: 7 or rather 8 bytes to store this.   {#767}
[00:43:18] TEACHER: Mixed 8th byte.   {#768}
[00:43:19] TEACHER: So first 8th byte would represent O-U-R-D-I-C-T.   {#769}
[00:43:23] TEACHER: For example, it's a name.   {#770}
[00:43:24] TEACHER: So in the PNG format, the first 3 bytes is P-N-N-G.   {#771}
[00:43:29] TEACHER: So that tells the decoder that this is a PNG file.   {#772}
[00:43:35] TEACHER: MP3 has some other bytes and then it is MP3 and so on and so forth.   {#773}
[00:43:39] TEACHER: So the first 8 bytes will denote that this is R dictionary.   {#774}
[00:43:44] TEACHER: Like whatever name you would want to give it, you can give it.   {#775}
[00:43:46] TEACHER: Let's say I build my own database.   {#776}
[00:43:48] TEACHER: to call it AODB, ARPIT's outstanding database for some reason.   {#777}
[00:43:53] TEACHER: So this would be my four first four bytes and it's my decoder who would understand it's   {#778}
[00:43:58] TEACHER: AODB file.   {#779}
[00:43:59] TEACHER: So I know the format.   {#780}
[00:44:00] TEACHER: I know what components would it hold.   {#781}
[00:44:02] TEACHER: Then a version number, maybe you might have multiple variants of this file.   {#782}
[00:44:07] TEACHER: You may want to specify if it's version one, you have index first and then data.   {#783}
[00:44:11] TEACHER: Maybe in version two, you have data first and then index.   {#784}
[00:44:14] TEACHER: So depending on that version, the decoder would understand what to do with it.   {#785}
[00:44:18] TEACHER: Then third, you might want to store the index file.   {#786}
[00:44:21] TEACHER: So depending on this, you are choosing that the next,   {#787}
[00:44:24] TEACHER: let's say version number is four bytes as an integer.   {#788}
[00:44:26] TEACHER: The next four bytes is index size.   {#789}
[00:44:28] TEACHER: That how big is the index?   {#790}
[00:44:32] TEACHER: When you do this, you store how big is the index?   {#791}
[00:44:34] TEACHER: In this one, what you will store?   {#792}
[00:44:36] TEACHER: You will store the value 1.7500.   {#793}
[00:44:40] TEACHER: This is the integer that you will store in this space as the index size.   {#794}
[00:44:45] TEACHER: So now your header is a fixed width header.   {#795}
[00:44:48] TEACHER: plus 4 plus 4 equal to 16 byte. So this becomes your header. So this is the header that you just   {#796}
[00:44:54] TEACHER: added which is 16 bytes. So the flow of our application would be when your application   {#797}
[00:45:01] TEACHER: server boots up assume it has this file. When it has this file it first reads the first 16 bytes   {#798}
[00:45:10] TEACHER: of this file. It sees the header. It sees that hey it is our dictionary first 8 byte it read.   {#799}
[00:45:18] TEACHER: it's our dictionary. Oh sorry, what first byte? We know that the header is fixed 16 bytes.   {#800}
[00:45:28] TEACHER: So it would read the first 16 bytes out of which it would find the first 8 bytes and   {#801}
[00:45:32] TEACHER: understood it is our dictionary. The next 4 bytes is version and the next 4 bytes is   {#802}
[00:45:36] TEACHER: the index size. Once it knows that this is the index size, it would read those many bytes   {#803}
[00:45:41] TEACHER: starting from this location, these many bytes and it would read it as index. Then it can   {#804}
[00:45:48] TEACHER: and create a hash table out of it.   {#805}
[00:45:51] TEACHER: And from there, everything is data.   {#806}
[00:45:53] TEACHER: And which is what this offsets would be storing over here.   {#807}
[00:45:58] TEACHER: So this makes your entire dictionary shippable.   {#808}
[00:46:03] TEACHER: And this is a classic way to build any custom file format   {#809}
[00:46:08] TEACHER: where you are storing a header   {#810}
[00:46:10] TEACHER: and information about different sections that you have.   {#811}
[00:46:13] TEACHER: Here the different sections are index and data.   {#812}
[00:46:17] TEACHER: In case of PNG, it is something.   {#813}
[00:46:18] TEACHER: In case of JPG, it's different frames that you have.   {#814}
[00:46:21] TEACHER: In case of MP4, it would be where is the video part?   {#815}
[00:46:23] TEACHER: Where is the audio part?   {#816}
[00:46:24] TEACHER: Right.   {#817}
[00:46:25] TEACHER: And in that video format, you would know that this is the first frame.   {#818}
[00:46:28] TEACHER: This is the second frame.   {#819}
[00:46:29] TEACHER: This is the third frame.   {#820}
[00:46:30] TEACHER: In audio part, you would have the waveform information.   {#821}
[00:46:32] TEACHER: Right.   {#822}
[00:46:33] TEACHER: This is literally creating compartments in the file that you have.   {#823}
[00:46:40] TEACHER: And having a header that tells you where which compartment lies.   {#824}
[00:46:44] TEACHER: and this is the one file that you can very easily ship across systems where you would want or give   {#825}
[00:46:51] TEACHER: it to your end user. Anyone having this decoder can read this file and this is the point that   {#826}
[00:46:58] TEACHER: I wanted to bring out. How this particular format becomes really important and it's very general   {#827}
[00:47:04] TEACHER: wherever you see anything. For example, tomorrow what Hemant bring out that word, if you are   {#828}
[00:47:11] TEACHER: exploring something around data engineering and you come across parquet format, right?   {#829}
[00:47:17] TEACHER: Parquet format also has some headers and information, right?   {#830}
[00:47:21] TEACHER: Jason does not have any, if you look carefully in the Jason file, Jason file that we all use.   {#831}
[00:47:26] TEACHER: It's a simple text file, right?   {#832}
[00:47:28] TEACHER: Because it does not have any headers.   {#833}
[00:47:30] TEACHER: You have to read the entire file.   {#834}
[00:47:32] TEACHER: It is in a specific format and then you have to decode.   {#835}
[00:47:35] TEACHER: So the Jason decoder decodes curly braces, codes, it's string.   {#836}
[00:47:41] TEACHER: and then converts it into it.   {#837}
[00:47:43] TEACHER: And then it creates a in-memory dictionary and gives it to you.   {#838}
[00:47:46] TEACHER: Because it doesn't have header, you have to read the entire file   {#839}
[00:47:48] TEACHER: to get the information out of it.   {#840}
[00:47:51] TEACHER: CSV in general does not have a header, right?   {#841}
[00:47:53] TEACHER: But TPT format, PDF format, everything else has an header.   {#842}
[00:47:58] TEACHER: And it depends.   {#843}
[00:47:59] TEACHER: You can define your own custom format.   {#844}
[00:48:01] TEACHER: I tried to write my own image format.   {#845}
[00:48:03] TEACHER: For some reason I did that, right?   {#846}
[00:48:05] TEACHER: So that's how I got to know this.   {#847}
[00:48:07] TEACHER: But this is again really important.   {#848}
[00:48:09] TEACHER: When you know, when you see a file,   {#849}
[00:48:11] TEACHER: whatever file, whichever file you are picking up,   {#850}
[00:48:14] TEACHER: it has its own encoder and decoder.   {#851}
[00:48:22] TEACHER: So encoder creates that file in that specific format   {#852}
[00:48:26] TEACHER: and decoder decodes it.   {#853}
[00:48:28] TEACHER: Image, video, audio, pick your favorite format.   {#854}
[00:48:31] TEACHER: Holds true for everyone.   {#855}
[00:48:33] TEACHER: So when we say, you might have seen this error   {#856}
[00:48:36] TEACHER: early days of internet to be honest,   {#857}
[00:48:39] TEACHER: this web browser does not support TIF format.   {#858}
[00:48:42] TEACHER: What does this mean when you say that this web browser does not support a   {#859}
[00:48:46] TEACHER: format, it implies that it does not have an encoder or decoder for this file format.   {#860}
[00:48:52] TEACHER: What does it mean?   {#861}
[00:48:52] TEACHER: It does not have a decoder for this file format.   {#862}
[00:48:54] TEACHER: And given this set of bytes, I don't know how to interpret it, but what we just wrote   {#863}
[00:49:00] TEACHER: is for our format, the decoder that our decoder, what our decoder would do.   {#864}
[00:49:05] TEACHER: it would know for 16 bytes is header   {#865}
[00:49:08] TEACHER: through which I would get the size of the index   {#866}
[00:49:10] TEACHER: and from which I'll get the data.   {#867}
[00:49:12] TEACHER: And the offset in this will contain the offset in this data part.   {#868}
[00:49:16] TEACHER: This is the decoder logic that we would write.   {#869}
[00:49:18] TEACHER: This holds true for every file format in the world.   {#870}
[00:49:22] TEACHER: But now because of that one constraint that I added,   {#871}
[00:49:25] TEACHER: quotability, you see that how we were able to create this   {#872}
[00:49:30] TEACHER: as just one file instead of shipping multiple files.   {#873}
[00:49:35] TEACHER: Okay.   {#874}
[00:49:36] TEACHER: So that does this.   {#875}
[00:49:38] TEACHER: Now we'll touch upon infrastructure side of things.   {#876}
[00:49:41] TEACHER: So now here what we build, we build an understanding of, we build an understanding of something   {#877}
[00:49:48] TEACHER: really interesting.   {#878}
[00:49:49] TEACHER: How a file format is importance of portability, headers, where they come in handy indexing   {#879}
[00:49:55] TEACHER: to make reads faster.   {#880}
[00:49:57] TEACHER: Now let's come to the next part.   {#881}
[00:49:59] TEACHER: How do you push it?   {#882}
[00:50:01] TEACHER: How do you serve the actual user request?   {#883}
[00:50:04] TEACHER: Right.   {#884}
[00:50:05] TEACHER: I'll lay the seed foundation and then we'll improve on the design.   {#885}
[00:50:09] TEACHER: So what we may think that our end user who will be querying on this, obviously we would   {#886}
[00:50:16] TEACHER: have a load balance or something where after which you get a bunch of, I had to create a   {#887}
[00:50:22] TEACHER: load balancer.   {#888}
---- OWNED SEGMENTS END ----

CTX| [00:50:26] TEACHER: So let's say we create a load balancer, request from an end user comes to load balancer.   {#889}
CTX| [00:50:32] TEACHER: Behind the load balancer, we have bunch of API servers whose job is to serve the incoming   {#890}
CTX| [00:50:39] TEACHER: requests that are there.   {#891}
CTX| [00:50:40] TEACHER: So now what would be the request flow look like?   {#892}
CTX| [00:50:43] TEACHER: So this is a load balancer on which you got the request.   {#893}
CTX| [00:50:48] TEACHER: These are the API servers.   {#894}
CTX| [00:50:51] STUDENT_2: API server one.   {#895}
CTX| [00:50:56] STUDENT_2: API not a good place to write.   {#896}
CTX| [00:51:04] TEACHER: Okay.   {#897}
CTX| [00:51:05] TEACHER: A classic case.   {#898}
CTX| [00:51:06] TEACHER: A user, a load balancer and an API server.   {#899}
CTX| [00:51:09] TEACHER: This is a file that we have.   {#900}
CTX| [00:51:11] TEACHER: Now where would we store this file?   {#901}
CTX| [00:51:14] TEACHER: For us to serve this request or handle this request, we are exposing a get endpoint.   {#902}
CTX| [00:51:21] TEACHER: So slash word is we are exposing and we are doing a get on it and we get the meaning around it.   {#903}
