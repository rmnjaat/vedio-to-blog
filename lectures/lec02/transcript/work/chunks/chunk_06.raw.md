# chunk_06  OWNS 01:03:30 -> 01:14:09  (segments #986-#1142, 1680 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:02:31] TEACHER: What would be a schema?   {#966}
CTX| [01:02:32] TEACHER: And this does not mean we are using relational database, FYI.   {#967}
CTX| [01:02:35] TEACHER: It's just a schema.   {#968}
CTX| [01:02:37] TEACHER: It's just that these are the entities, these are the attributes of it.   {#969}
CTX| [01:02:40] TEACHER: This does not mean we are using relational database.   {#970}
CTX| [01:02:44] TEACHER: It depends on the kind of guarantees we want to put and then we pick the database.   {#971}
CTX| [01:02:49] TEACHER: Okay.   {#972}
CTX| [01:02:50] TEACHER: Let's start with this.   {#973}
CTX| [01:02:51] TEACHER: How would you store the data?   {#974}
CTX| [01:02:53] TEACHER: What would be the basic schema of this?   {#975}
CTX| [01:02:57] TEACHER: Raise your hands.   {#976}
CTX| [01:02:58] TEACHER: I'll pull you in.   {#977}
CTX| [01:03:01] TEACHER: Yeah, Pankaj.   {#978}
CTX| [01:03:04] STUDENT_1: Yeah.   {#979}
CTX| [01:03:05] STUDENT_1: So what I'm thinking right now is there would be one table for users.   {#980}
CTX| [01:03:10] STUDENT_1: So user with their ID name and if they have like some nickname, which they can have.   {#981}
CTX| [01:03:18] TEACHER: That's okay.   {#982}
CTX| [01:03:19] TEACHER: What else?   {#983}
CTX| [01:03:20] STUDENT_1: And then there would be a channel stable, uh, would have like a main   {#984}
CTX| [01:03:25] STUDENT_1: organization ID and the channel ID.   {#985}

---- OWNED SEGMENTS START ----
[01:03:30] STUDENT_1: Then there would be like a messages table, uh, which will have like, uh,   {#986}
[01:03:36] STUDENT_1: which like two user, like basically the channel ID in which the user   {#987}
[01:03:40] STUDENT_11: sent the message and.   {#988}
[01:03:43] STUDENT_11: Okay.   {#989}
[01:03:43] STUDENT_11: Okay.   {#990}
[01:03:44] TEACHER: Before that, before that, before that, how do you know which   {#991}
[01:03:46] TEACHER: user are part of which channel?   {#992}
[01:03:50] TEACHER: You need to store it somewhere, right?   {#993}
[01:03:52] STUDENT_1: Yeah.   {#994}
[01:03:52] STUDENT_1: So there would be like, what we can call it, membership table or something like that,   {#995}
[01:04:00] STUDENT_1: which will store which user is part of which channel.   {#996}
[01:04:03] TEACHER: How did you come up with this name?   {#997}
[01:04:05] TEACHER: Membership?   {#998}
[01:04:07] TEACHER: Looking over here?   {#999}
[01:04:10] STUDENT_11: No, I didn't see that.   {#1000}
[01:04:12] TEACHER: That's good.   {#1001}
[01:04:13] TEACHER: That's good.   {#1002}
[01:04:13] TEACHER: Right?   {#1003}
[01:04:14] TEACHER: If you did not, but you still came up with this word, that's brilliant.   {#1004}
[01:04:17] TEACHER: Why I say this?   {#1005}
[01:04:19] TEACHER: this, they say that, Hey, that table would be in a user's channel table.   {#1006}
[01:04:23] TEACHER: A lot of people would name it like this.   {#1007}
[01:04:26] TEACHER: And I'm a little against this.   {#1008}
[01:04:28] TEACHER: Why?   {#1009}
[01:04:29] TEACHER: Because this is the easy way to name stuff user channel.   {#1010}
[01:04:32] TEACHER: But what is user channel?   {#1011}
[01:04:33] TEACHER: If, if, if tomorrow you are storing mapping of three things, will you   {#1012}
[01:04:36] TEACHER: use our channel message table?   {#1013}
[01:04:38] TEACHER: No.   {#1014}
[01:04:39] TEACHER: Right.   {#1015}
[01:04:39] TEACHER: So which is where, what I believe a good schema, whenever you're   {#1016}
[01:04:44] TEACHER: designing a good schema, everything has to be an entity has to be a noun.   {#1017}
[01:04:49] TEACHER: So try to name wherever possible, try to name things as nouns because it would help you give   {#1018}
[01:04:56] TEACHER: them a different persona.   {#1019}
[01:04:58] TEACHER: So I'll give you an example.   {#1020}
[01:04:59] TEACHER: So that's where membership is a great name, which stores the membership information, which   {#1021}
[01:05:06] TEACHER: means that for example, this user is part of this channel.   {#1022}
[01:05:14] TEACHER: So this becomes a membership team.   {#1023}
[01:05:16] TEACHER: A lot of people would have named it user channel, but don't do it.   {#1024}
[01:05:19] TEACHER: as membership because now it gives you this natural way of looking at it where you can   {#1025}
[01:05:25] TEACHER: extend membership if you want to you can add more columns as soon as you name a table or   {#1026}
[01:05:30] TEACHER: name an entity as user channel you cannot think of adding another article but as soon   {#1027}
[01:05:36] TEACHER: as you give it a noun let's say membership it becomes very natural to add new columns   {#1028}
[01:05:41] TEACHER: to that right okay so you added that and in messages what would you store so the user   {#1029}
[01:05:49] STUDENT_1: sent the message and like the message text, which was it.   {#1030}
[01:05:58] STUDENT_1: And yeah.   {#1031}
[01:05:59] STUDENT_1: So what I'm thinking right now is like message can be direct to user also,   {#1032}
[01:06:04] STUDENT_1: and it could be in channel also.   {#1033}
[01:06:06] STUDENT_1: So channel ID will be there, but it might be present.   {#1034}
[01:06:12] STUDENT_1: It might not be present.   {#1035}
[01:06:13] TEACHER: So here you'll have channel ID also and the receiver ID also.   {#1036}
[01:06:17] STUDENT_1: Yeah.   {#1037}
[01:06:18] STUDENT_1: Receiving user ID also.   {#1038}
[01:06:19] STUDENT_1: Yes.   {#1039}
[01:06:23] TEACHER: Okay. So if you do this, what is the disadvantage of having this?   {#1040}
[01:06:28] TEACHER: Because either one can be null.   {#1041}
[01:06:30] STUDENT_1: Yeah.   {#1042}
[01:06:31] STUDENT_1: I mean, one of them would be null always.   {#1043}
[01:06:34] TEACHER: But then, so what is the disadvantage of doing this?   {#1044}
[01:06:42] TEACHER: Is this the best way to model things?   {#1045}
[01:06:45] TEACHER: Think on those lines.   {#1046}
[01:06:51] STUDENT_1: Maybe we can have like two separate tables for channel messages and one for direct messages.   {#1047}
[01:06:57] TEACHER: But then your migrations would be difficult.   {#1048}
[01:06:59] TEACHER: Let's say you want to add a new attribute to messages.   {#1049}
[01:07:01] TEACHER: You have to add it on this table also on this table also.   {#1050}
[01:07:04] TEACHER: That's a challenge.   {#1051}
[01:07:05] TEACHER: You should not do that.   {#1052}
[01:07:17] TEACHER: Because and also the problem with this is if you are allowing either one to be null,   {#1053}
[01:07:22] TEACHER: which means you are also allowing to enter your allowing to insert a row where both the   {#1054}
[01:07:26] TEACHER: columns can be null due to some glitch.   {#1055}
[01:07:29] TEACHER: So which means that would become an orphan row problem.   {#1056}
[01:07:35] STUDENT_1: yeah i also thought of you know having a receiver id as a array of all the receiver users but then   {#1057}
[01:07:43] STUDENT_1: if we like add users to the channel then it will become a problem again to add those users   {#1058}
[01:07:50] TEACHER: again to this id so there has to be a better way okay let me pull in round draw will go on   {#1059}
[01:08:10] STUDENT_1: So basically, uh, what we can do is we can have from, to, and message basically, uh,   {#1060}
[01:08:16] STUDENT_1: from, uh, from will be the, uh, like, uh, from will be the user ID.   {#1061}
[01:08:21] STUDENT_1: and two will be two can be anything channel id or user id books   {#1062}
[01:08:29] STUDENT_1: but then how would you know if it's a channel or a user so basically like for channel id we can have   {#1063}
[01:08:36] STUDENT_1: something like like ch and then uh ch and then id and for user we can have you uh usr dash but then   {#1064}
[01:08:46] TEACHER: Then how would you query because now for you to fire a query and get the detailed information   {#1065}
[01:08:51] TEACHER: about it, you need to do string processing and see if it is this or not.   {#1066}
[01:08:54] TEACHER: Then you join it with channel, otherwise you join it with user.   {#1067}
[01:08:58] TEACHER: That's a poor implementation.   {#1068}
[01:09:00] TEACHER: You cannot write efficient queries with us.   {#1069}
[01:09:05] TEACHER: DP, what would you do?   {#1070}
[01:09:09] TEACHER: Oh, you just.   {#1071}
[01:09:10] STUDENT_3: I was thinking that in addition to along the lines, what Rahul was saying, so we can have another column, which is more like type, right? Like the receiver type. Maybe I can have an enumerator there saying channel or user.   {#1072}
[01:09:30] TEACHER: um so these are all variation of that same thing either you apply channel id user id or that or   {#1073}
[01:09:37] STUDENT_3: in the sense that i was thinking that yeah i mean it's a variation but at least it can be a little   {#1074}
[01:09:43] STUDENT_3: more better filtering compared to like if i start processing but now what would happen is now you   {#1075}
[01:09:49] TEACHER: cannot have a foreign key check on two which says that it's a foreign relationship to channel   {#1076}
[01:09:53] TEACHER: right because now it can also point to user yeah that's another problem yeah so there has to be a   {#1077}
[01:09:59] TEACHER: better way and now what this would also lead to is in our business logic we have to have so many   {#1078}
[01:10:04] TEACHER: ifs and else's that if this then this is that and that so your business logic becomes complicated   {#1079}
[01:10:10] TEACHER: so there has to be a better i'll pull one more if this if alex doesn't if alexa doesn't answer   {#1080}
[01:10:15] STUDENT_2: then i'll say alexa go on no no so i don't have a complete answer but i'm thinking that this   {#1081}
[01:10:23] STUDENT_2: messages that from where it is coming to where it is going.   {#1082}
[01:10:27] STUDENT_2: So this looks like some kind of controlling information.   {#1083}
[01:10:32] STUDENT_2: And I'm not sure if it should be in DB or shouldn't be managing the code.   {#1084}
[01:10:38] STUDENT_2: So I am actually thinking on this, on these lines.   {#1085}
[01:10:42] TEACHER: No, but then what attribute would you have over here?   {#1086}
[01:10:46] TEACHER: Let's say call it two from this user to this.   {#1087}
[01:10:49] TEACHER: Now two can be channel or a user.   {#1088}
[01:10:54] STUDENT_2: I was thinking more that the message doesn't know anything about where it is going into   {#1089}
[01:10:58] STUDENT_2: it is going.   {#1090}
[01:11:00] TEACHER: How will you render all the channels or all the messages of a channel?   {#1091}
[01:11:04] TEACHER: If you don't store two information over here, right?   {#1092}
[01:11:08] TEACHER: Because you still want to render all the messages of a channel.   {#1093}
[01:11:13] STUDENT_2: Okay.   {#1094}
[01:11:14] STUDENT_2: So then that means that, yeah.   {#1095}
[01:11:15] STUDENT_2: Okay.   {#1096}
[01:11:15] STUDENT_2: I was, I'm not sure.   {#1097}
[01:11:18] TEACHER: Right.   {#1098}
[01:11:19] TEACHER: Let me pull it.   {#1099}
[01:11:20] TEACHER: Unmult.   {#1100}
[01:11:21] STUDENT_1: What would you do?   {#1101}
[01:11:23] STUDENT_2: I would just add a channel ID actually.   {#1102}
[01:11:27] STUDENT_2: I mean, suppose if two users are communicating, they can have a common   {#1103}
[01:11:31] STUDENT_2: channel, even though they just DM.   {#1104}
[01:11:35] STUDENT_2: Yeah, but we can keep that as a topic name.   {#1105}
[01:11:38] STUDENT_2: I mean, something like that of a publisher subscriber model where you just started   {#1106}
[01:11:43] TEACHER: so good and then you just added publisher subscriber unnecessary complication.   {#1107}
[01:11:48] TEACHER: Focus, focus on the first part, focus on the first part.   {#1108}
[01:11:50] TEACHER: Yeah.   {#1109}
[01:11:51] TEACHER: So you are suggesting two users, tarik messages also channel.   {#1110}
[01:11:55] TEACHER: Yeah.   {#1111}
[01:11:56] STUDENT_2: So the advantage that we'll be having is, um, uh, when we have messages, I mean, whichever   {#1112}
[01:12:05] STUDENT_2: user has sent it apart from that, the other, uh, users were present in the channel.   {#1113}
[01:12:10] STUDENT_2: We'll get those messages.   {#1114}
[01:12:12] TEACHER: I mean, Hmm.   {#1115}
[01:12:15] TEACHER: Something like this.   {#1116}
[01:12:20] TEACHER: right so this is a good way to design this database schema why because now what you are   {#1117}
[01:12:26] TEACHER: doing is you are just piggybacking on existing stuff so and by the way this is not made up   {#1118}
[01:12:32] TEACHER: this is there on slacks api if you ever use slack api and you want to dm a particular user   {#1119}
[01:12:40] TEACHER: you first have to create a channel with that user and then on that channel you write that so it is   {#1120}
[01:12:46] TEACHER: a direct message on the UI rendered as direct message,   {#1121}
[01:12:50] TEACHER: but behind the scene, it is a channel.   {#1122}
[01:12:54] TEACHER: So what you do as part of a step, what you first do,   {#1123}
[01:12:58] TEACHER: because at the end it's just a message.   {#1124}
[01:13:00] TEACHER: There is a sender and a receiver.   {#1125}
[01:13:01] TEACHER: Receiver, the rendering part is different on the UI side,   {#1126}
[01:13:05] TEACHER: but the way you are storing it, always see if you can have   {#1127}
[01:13:10] TEACHER: a generalized way of storing things, not specific cases.   {#1128}
[01:13:13] TEACHER: If this then go here, if that then go here.   {#1129}
[01:13:16] TEACHER: ifs and elses are the worst when it comes to databases.   {#1130}
[01:13:20] TEACHER: So the way we model this is your DMs are channeled with two people   {#1131}
[01:13:24] TEACHER: and you can add a type over here in channel,   {#1132}
[01:13:27] TEACHER: which says if it is a group or a user or a channel,   {#1133}
[01:13:35] TEACHER: something like this, right?   {#1134}
[01:13:36] TEACHER: You can have a regular channel, something like this, right?   {#1135}
[01:13:39] TEACHER: You may have type with this because now what you can have seamlessly   {#1136}
[01:13:43] TEACHER: is this channel ID pointing to here, right?   {#1137}
[01:13:46] TEACHER: So direct message still not a problem because now with this type you can render it on the top half or on the bottom half because direct messages are on the bottom half.   {#1138}
[01:13:55] TEACHER: Channels are on the top half.   {#1139}
[01:13:56] TEACHER: You can very easily render it.   {#1140}
[01:13:58] TEACHER: Using the channel you can iterate through historical messages because you have all of them.   {#1141}
[01:14:02] TEACHER: You would have a timestamp field on when it was created, message created at or something.   {#1142}
---- OWNED SEGMENTS END ----

CTX| [01:14:09] TEACHER: Created at and whatnot.   {#1143}
CTX| [01:14:11] TEACHER: You can iterate through this and go historical messages.   {#1144}
CTX| [01:14:14] TEACHER: Store membership information over here.   {#1145}
CTX| [01:14:16] TEACHER: Channel information over here is an information over there.   {#1146}
CTX| [01:14:19] TEACHER: And now the beauty of this design.   {#1147}
CTX| [01:14:22] TEACHER: Why I named it membership because it's a noun.   {#1148}
CTX| [01:14:26] TEACHER: It doesn't restrict us.   {#1149}
CTX| [01:14:27] TEACHER: Like if you hear the term user channel for this, I'm talking about this.   {#1150}
CTX| [01:14:33] TEACHER: If you think of user channel, you may think I would only just store   {#1151}
CTX| [01:14:37] TEACHER: a mapping of user and the channel.   {#1152}
CTX| [01:14:38] TEACHER: But now when you hear membership, now what you can do is you can actually store   {#1153}
CTX| [01:14:46] TEACHER: the checkpoint over here. What is this checkpoint? For example, a user is part of a channel. Now   {#1154}
CTX| [01:14:56] TEACHER: this checkpoint can store that I can, I have read messages till this point on the UI.   {#1155}
CTX| [01:15:02] TEACHER: You see the unread message count. You see you last read until here. And then like when you   {#1156}
CTX| [01:15:08] TEACHER: click on a channel, if there are a hundred messages, it takes you to that point. Right.   {#1157}
