**[00:37:11] Teacher:** Anmol, any other approach?

**[00:37:15] Student 10 (Anmol):** So, I mean, we can pre-allocate the space for index because the words are, I mean, we know the size of the words and only few words will be added.

**[00:37:25] Teacher:** What do you mean by pre-allocate?

**[00:37:27] Student 10:** Pre-allocate in the sense like we can fix the size for the index.

**[00:37:31] Teacher:** Okay. You are giving it a fixed size. So for example, that I know that my dictionary, but what would be a fixed size? Right now it's 1.751 MB.

**[00:37:40] Student 10:** Yes. I would be giving more to the index, more than this. That is currently there, but because the new words will be added very less, right?

**[00:37:51] Teacher:** That, hey, instead of me worrying about to have a separate or a special line that denotes that my index ended and now my data begins. What you are doing is you are giving a fixed width to this index, that when my application starts, when it reads this gigantic file, it knows that the first two MB is going to be my index. Yes. Right. Okay. That's a good approach. That's a very nice hack, but it's not space. Although you're wasting very little space, but let's be a little more frugal about it.

**[00:38:22] Student 10:** Sure.

**[00:38:25] Teacher:** Gaurav, what else can you do?

**[00:38:27] Teacher?:** These are two good approaches. What else can you do?

**[00:38:30] Student 1 (Gaurav):** Building on top of it, we can have data is stored from top to bottom, bottom within the file and index is stored from bottom to top within the file.

**[00:38:39] Teacher:** How would you know where one ends and another begins? You still want to know, right? Up until where should I read to load the index? Store index like this, how would you know when to stop reading the index? Like when to stop so that you have built this in-memory hash table. Because imagine, I'll just, I'll just give a quick example. So let's say this is how you have concluded. So first index and then data, all in CSV format. Right, now when you start reading this line by line, you created hash table, hash table, hash table, hash table, hash table [check: possible ASR loop - teacher may be counting entries], you put it entry there, and then this first you had an hash table apple comma O1, and then when you start [unclear: "i did this"] you got apple, and then you replace it with a fruit or something, right? So you need to be a little more frugal about it, that you need to know when to stop.

**[~00:39:32] Student 1:** So what I meant was that index can grow like a stack, which means from the nth byte to n minus one and minus two so on, and data can start from zero zero, so. So then you are wasting this much of space. So this much of space might be unutilized. Today it might be unutilized, but someday. [check: "So then you are wasting this much of space ... but someday" may be the teacher]

**[00:39:55] Teacher:** But the day when these two are right next to each other, how would you know when one finished and other begins?

**[00:40:03] Student?:** Yeah, having a separator probably.

**[00:40:06] Teacher:** So you are also going with separator, right?

**[00:40:08] Student?:** Yes, yes, yes.

**[00:40:09] Teacher:** Okay. Yes, Amrita?

**[00:40:13] Student 3 (Amrita):** So basically I was thinking that since the data is always going to grow, but we can choose a specific index to store that information. So maybe at the zero thing, [unclear: "they saw the first set"] we can choose to store that separate information and then update it as the add on data.

**[00:40:32] Teacher:** Okay. That's interesting. So what you're saying is that add something in the beginning of this and specify what is. Correct? Right. Okay. So now if you do this, your way to read this entire file would be: I first read the separator. Then I start reading the data until I find it separator, and that much becomes my index, beyond which becomes my data. Correct. Now I'm saying, can you change this to store something else? That would be much more beneficial for you. Instead of storing the separator, can you not directly store the byte offset?

**[00:41:21] Student 3:** Yes, we can.

<!-- topic-candidate [00:41:22]: File header with byte offset -->

**[00:41:22] Teacher:** It eradicates the need of a separator. And then the advantage of it is, let's say you store the byte offset of data. So place where the data begins. And if you store this information, you exactly know when your file loads or when you are trying to read this entire file. The first step is to read this first chunk. And this is a classic way of having a header in any file format of the world. PNG, JPG, MP3, AVI, everywhere the first few bytes, it depends on the protocol, it depends on the format that the creator of that image format or whatever format specifies what that should be, that first few bytes denotes or contains the meta information about everything else in the file.

[00:42:21] So what you just spoke about, Amrita, is to add this header, whose job would be to store this meta information about the file that you are creating, the singular file that you are creating. Because it contains multiple sections, you are storing the information about each of the sections in this header. I'll give a small example. So in this header, we might just store that this is our dictionary, with some version number. And now this has to be a fixed size header. It cannot go beyond that. And you have start offset of data. Or rather you may insert store index size. How big your index is.

[00:43:11] So let's say this requires you 1, 2, 3, 4, 5, 6, 7. 7 or rather 8 bytes to store this. [unclear: "Mixed 8th byte."] So first 8th byte would represent O-U-R-D-I-C-T. For example, it's a name. So in the PNG format, the first 3 bytes is P-N-N-G. So that tells the decoder that this is a PNG file. MP3 has some other bytes and then it is MP3 and so on and so forth. So the first 8 bytes will denote that this is our dictionary. Like whatever name you would want to give it, you can give it. Let's say I build my own database, to call it AODB, Arpit's outstanding database, for some reason. So this would be my four, first four bytes, and it's my decoder who would understand it's AODB file. So I know the format. I know what components would it hold.

[00:44:02] Then a version number, maybe you might have multiple variants of this file. You may want to specify if it's version one, you have index first and then data. Maybe in version two, you have data first and then index. So depending on that version, the decoder would understand what to do with it. Then third, you might want to store the index file. So depending on this, you are choosing that the next, let's say version number is four bytes as an integer. The next four bytes is index size. That how big is the index? When you do this, you store how big is the index? In this one, what you will store? You will store the value 1.7500. This is the integer that you will store in this space as the index size. So now your header is a fixed width header. Plus 4 plus 4 equal to 16 byte. So this becomes your header. So this is the header that you just added, which is 16 bytes.

[~00:44:54] So the flow of our application would be: when your application server boots up, assume it has this file. When it has this file, it first reads the first 16 bytes of this file. It sees the header. It sees that, hey, it is our dictionary, first 8 byte it read. It's our dictionary. Oh sorry, what first byte? We know that the header is fixed 16 bytes. So it would read the first 16 bytes, out of which it would find the first 8 bytes and understood it is our dictionary. The next 4 bytes is version and the next 4 bytes is the index size. Once it knows that this is the index size, it would read those many bytes starting from this location, these many bytes, and it would read it as index. Then it can and create a hash table out of it. And from there, everything is data. And which is what this offsets would be storing over here.

<!-- topic-candidate [00:45:58]: Custom file formats, encoder and decoder -->

[00:45:58] So this makes your entire dictionary shippable. And this is a classic way to build any custom file format, where you are storing a header and information about different sections that you have. Here the different sections are index and data. In case of PNG, it is something. In case of JPG, it's different frames that you have. In case of MP4, it would be where is the video part? Where is the audio part? Right. And in that video format, you would know that this is the first frame. This is the second frame. This is the third frame. In audio part, you would have the waveform information. Right. This is literally creating compartments in the file that you have, and having a header that tells you where which compartment lies.

[00:46:44] And this is the one file that you can very easily ship across systems, where you would want, or give it to your end user. Anyone having this decoder can read this file, and this is the point that I wanted to bring out. How this particular format becomes really important, and it's very general wherever you see anything. For example, tomorrow what Hemant bring out that word, if you are exploring something around data engineering and you come across Parquet format, right? Parquet format also has some headers and information, right? JSON does not have any, if you look carefully in the JSON file, JSON file that we all use. It's a simple text file, right? Because it does not have any headers. You have to read the entire file. It is in a specific format and then you have to decode. So the JSON decoder decodes curly braces, [?quotes | asr: "codes"], it's string, and then converts it into it. And then it creates a in-memory dictionary and gives it to you. Because it doesn't have header, you have to read the entire file to get the information out of it.

[00:47:51] CSV in general does not have a header, right? But [?PPT | asr: "TPT"] format, PDF format, everything else has an header. And it depends. You can define your own custom format. I tried to write my own image format. For some reason I did that, right? So that's how I got to know this. But this is again really important. When you know, when you see a file, whatever file, whichever file you are picking up, it has its own encoder and decoder. So encoder creates that file in that specific format and decoder decodes it. Image, video, audio, pick your favorite format. Holds true for everyone.

[00:48:33] So when we say, you might have seen this error, early days of internet to be honest, this web browser does not support TIF format. What does this mean when you say that this web browser does not support a format? It implies that it does not have an encoder or decoder for this file format. What does it mean? It does not have a decoder for this file format. And given this set of bytes, I don't know how to interpret it. But what we just wrote is for our format, the decoder that our decoder, what our decoder would do: it would know for 16 bytes is header, through which I would get the size of the index, and from which I'll get the data. And the offset in this will contain the offset in this data part. This is the decoder logic that we would write. This holds true for every file format in the world.

[00:49:22] But now because of that one constraint that I added, portability, you see that how we were able to create this as just one file instead of shipping multiple files. Okay. So that does this.

<!-- topic-candidate [00:49:38]: Serving the dictionary - infrastructure (load balancer, API servers) -->

[00:49:38] Now we'll touch upon infrastructure side of things. So now here what we build, we build an understanding of, we build an understanding of something really interesting. How a file format is, importance of portability, headers, where they come in handy, indexing to make reads faster. Now let's come to the next part. How do you push it? How do you serve the actual user request? Right. I'll lay the seed foundation and then we'll improve on the design. So what we may think, that our end user who will be querying on this, obviously we would have a load balancer or something, where after which you get a bunch of, I had to create a load balancer.
