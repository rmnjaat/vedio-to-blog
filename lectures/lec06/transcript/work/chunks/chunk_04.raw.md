# chunk_04  OWNS 00:35:15 -> 00:45:56  (segments #616-#803, 1629 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:34:15] TEACHER: Any other thing that you would add to user, that's what users table is fine.   {#579}
CTX| [00:34:18] TEACHER: Uh, which other table?   {#580}
CTX| [00:34:24] STUDENT_2: I think that, uh, just one, I don't know whether it should be a different table or   {#581}
CTX| [00:34:30] STUDENT_2: within the same one to store the image paths, not the active one, but just the   {#582}
CTX| [00:34:36] TEACHER: image paths.   {#583}
CTX| [00:34:37] TEACHER: how would you   {#584}
CTX| [00:34:38] TEACHER: store multiple   {#585}
CTX| [00:34:39] TEACHER: paths in a   {#586}
CTX| [00:34:40] TEACHER: single column   {#587}
CTX| [00:34:41] TEACHER: of relational   {#588}
CTX| [00:34:41] TEACHER: DB?   {#589}
CTX| [00:34:42] TEACHER: Yeah, we   {#590}
CTX| [00:34:43] TEACHER: won't be able   {#591}
CTX| [00:34:43] TEACHER: to.   {#592}
CTX| [00:34:44] TEACHER: That is why   {#593}
CTX| [00:34:44] TEACHER: I said.   {#594}
CTX| [00:34:45] TEACHER: So let's say   {#595}
CTX| [00:34:46] TEACHER: you have a   {#596}
CTX| [00:34:46] TEACHER: photos table.   {#597}
CTX| [00:34:47] TEACHER: Yep.   {#598}
CTX| [00:34:48] STUDENT_2: In which   {#599}
CTX| [00:34:48] STUDENT_2: what do you   {#600}
CTX| [00:34:49] STUDENT_2: store?   {#601}
CTX| [00:34:52] STUDENT_2: The email   {#602}
CTX| [00:34:54] STUDENT_2: ID of the   {#603}
CTX| [00:34:55] STUDENT_2: user ID.   {#604}
CTX| [00:34:59] STUDENT_2: Obviously   {#605}
CTX| [00:34:59] STUDENT_2: the photos   {#606}
CTX| [00:35:01] STUDENT_2: ID.   {#607}
CTX| [00:35:04] TEACHER: What is   {#608}
CTX| [00:35:05] TEACHER: photos ID?   {#609}
CTX| [00:35:06] TEACHER: The, the   {#610}
CTX| [00:35:06] TEACHER: The primary key of the photo step.   {#611}
CTX| [00:35:08] TEACHER: The primary key.   {#612}
CTX| [00:35:09] TEACHER: Okay.   {#613}
CTX| [00:35:10] TEACHER: Okay.   {#614}
CTX| [00:35:10] TEACHER: And what else?   {#615}

---- OWNED SEGMENTS START ----
[00:35:15] STUDENT_2: The parts of the images, photos.   {#616}
[00:35:19] TEACHER: Do we really need to do that?   {#617}
[00:35:20] TEACHER: Recall yesterday's discussion.   {#618}
[00:35:22] TEACHER: Can you not derive it?   {#619}
[00:35:25] STUDENT_2: You can.   {#620}
[00:35:27] STUDENT_2: Right.   {#621}
[00:35:28] STUDENT_2: But there would be multiple.   {#622}
[00:35:29] STUDENT_2: I did think of the yesterday's discussion, but there would be multiple photos.   {#623}
[00:35:33] TEACHER: So there would be multiple rows over here.   {#624}
[00:35:35] TEACHER: What's the problem with it?   {#625}
[00:35:37] TEACHER: And obviously you need to start multiple photos, right?   {#626}
[00:35:40] TEACHER: Because user can upload multiple pictures on it and mark one of them as active.   {#627}
[00:35:45] TEACHER: So you need to render all of them.   {#628}
[00:35:47] TEACHER: Let's say you uploaded 10 photos.   {#629}
[00:35:48] TEACHER: You need to render 10 photos.   {#630}
[00:35:52] TEACHER: So all the photos uploaded by the user will go over here.   {#631}
[00:35:55] TEACHER: Right?   {#632}
[00:35:56] TEACHER: ID user ID.   {#633}
[00:35:56] TEACHER: And what else would you store?   {#634}
[00:36:01] TEACHER: The photo, which is active.   {#635}
[00:36:04] STUDENT_9: Okay.   {#636}
[00:36:04] TEACHER: So let's call it is active.   {#637}
[00:36:07] TEACHER: Anything else?   {#638}
[00:36:10] STUDENT_9: I think that's it.   {#639}
[00:36:12] TEACHER: Got it.   {#640}
[00:36:13] TEACHER: Heyman, let's write queries.   {#641}
[00:36:16] TEACHER: Let's write queries with which you would want to find all photos of a user.   {#642}
[00:36:21] TEACHER: What would that query look like?   {#643}
[00:36:24] TEACHER: Because on the UI, you would have to render all the photos of a user.   {#644}
[00:36:28] TEACHER: What would that query look like?   {#645}
[00:36:31] STUDENT_1: So maybe select star from photos table where user ID equal to given user.   {#646}
[00:36:41] STUDENT_1: We may need to filter it via adjective.   {#647}
[00:36:45] STUDENT_1: We want to sort the active one.   {#648}
[00:36:46] TEACHER: No, no, we'll show all of them because only one of them is active, right?   {#649}
[00:36:50] TEACHER: Yeah.   {#650}
[00:36:50] TEACHER: User ID is equal to something.   {#651}
[00:36:52] TEACHER: Okay.   {#652}
[00:36:53] STUDENT_1: Not sure.   {#653}
[00:36:53] STUDENT_1: Star is needed if we need only the ID because we are looking for.   {#654}
[00:36:59] TEACHER: fact right okay here do we have the user id of the user look at this no we we need to kind of   {#655}
[00:37:11] TEACHER: join it from the user table because we do not have so let's try so select star from photos where   {#656}
[00:37:18] TEACHER: Where select start from photos, you join it on users on photos.userid equal to user.id   {#657}
[00:37:31] TEACHER: something.   {#658}
[00:37:33] TEACHER: Users.id where userid equal to this.   {#659}
[00:37:38] TEACHER: Correct.   {#660}
[00:37:38] TEACHER: Okay.   {#661}
[00:37:40] TEACHER: But you still don't have userid.   {#662}
[00:37:43] TEACHER: Right.   {#663}
[00:37:44] TEACHER: Right? Because what you are getting over here is a hash of email ID.   {#664}
[00:37:48] STUDENT_1: Yeah. So that we need to kind of reverse hash and get the ID   {#665}
[00:37:55] STUDENT_1: because we are not storing the hashes which are derived.   {#666}
[00:37:57] STUDENT_1: So that derived part will come in computation.   {#667}
[00:37:59] TEACHER: So what will you do? So what's your query now?   {#668}
[00:38:02] TEACHER: You tell me the query, exact query.   {#669}
[00:38:04] STUDENT_1: Okay. Select your start from photos this.   {#670}
[00:38:07] STUDENT_1: where we can write a decrypt of input,   {#671}
[00:38:12] STUDENT_1: which is coming as has equal to.   {#672}
[00:38:15] TEACHER: You cannot get email from the hash.   {#673}
[00:38:17] TEACHER: It's not encryption. It's hashing.   {#674}
[00:38:18] TEACHER: So it's lossy.   {#675}
[00:38:19] TEACHER: You cannot get the actual email ID back.   {#676}
[00:38:22] STUDENT_1: Actually, in that case, I think, yes, got it.   {#677}
[00:38:24] STUDENT_1: Because there will be a collision.   {#678}
[00:38:26] STUDENT_1: Two different things can go.   {#679}
[00:38:27] STUDENT_1: So we have to have a has stored because in it,   {#680}
[00:38:32] STUDENT_1: we cannot go in a reverse way from email.   {#681}
[00:38:37] TEACHER: But can you not just do pass the hash function where hash of email is equal to the one that   {#682}
[00:38:44] TEACHER: you provided?   {#683}
[00:38:45] STUDENT_1: Yes, that we can do hash of email equal to user.   {#684}
[00:38:49] TEACHER: Whatever your input is.   {#685}
[00:38:51] TEACHER: Has ID.   {#686}
[00:38:52] TEACHER: That can work.   {#687}
[00:38:53] TEACHER: But what's anything wrong with this?   {#688}
[00:38:58] STUDENT_1: The wrong thing, it can be like two different email ID if they generate the same hash.   {#689}
[00:39:05] TEACHER: that we have accepted.   {#690}
[00:39:06] TEACHER: We have to accept that.   {#691}
[00:39:09] TEACHER: That two people having same hash   {#692}
[00:39:10] TEACHER: would not work because that's   {#693}
[00:39:12] TEACHER: what we are going with.   {#694}
[00:39:14] TEACHER: If two people are the same, how will you   {#695}
[00:39:16] TEACHER: disambiguate anyway?   {#696}
[00:39:18] TEACHER: Assume that hashes are unique.   {#697}
[00:39:21] STUDENT_1: Actually,   {#698}
[00:39:22] STUDENT_1: it's a bit of more computation   {#699}
[00:39:24] STUDENT_1: added in the query.   {#700}
[00:39:26] STUDENT_1: You are doing hash of email   {#701}
[00:39:28] STUDENT_1: every time. Each query   {#702}
[00:39:30] STUDENT_1: you are adding this computation.   {#703}
[00:39:32] STUDENT_1: We can try to avoid that.   {#704}
[00:39:34] STUDENT_1: Very lightweight.   {#705}
[00:39:36] STUDENT_1: Yeah.   {#706}
[00:39:36] STUDENT_1: I mean, it's lightweight, so we can say it or not, but at least I see this as a one problem   {#707}
[00:39:41] STUDENT_1: that it's not a simple query.   {#708}
[00:39:42] STUDENT_1: We are adding some computation on top of it.   {#709}
[00:39:45] TEACHER: Okay.   {#710}
[00:39:46] TEACHER: Let's say I have 10,000 rows.   {#711}
[00:39:50] TEACHER: How many rows would this scan?   {#712}
[00:39:54] TEACHER: This query scan?   {#713}
[00:39:55] STUDENT_1: Actually scanning is pretty bad because you have to do a cross join of both the tables   {#714}
[00:40:00] STUDENT_1: where the user IDs matches.   {#715}
[00:40:02] STUDENT_1: you will if you have index on user ids then you would have you have index on user id so you get   {#716}
[00:40:08] STUDENT_1: index of photos you get index of user and then you do a scan actually it is pretty bad in evaluation   {#717}
[00:40:15] STUDENT_1: because we do not know the user id so eval function first try to figure it out the user id   {#718}
[00:40:23] STUDENT_1: oh no no it will not it has to do the whole whole scan of looks like if we have the exact   {#719}
[00:40:32] STUDENT_1: user ID that would have reduced the scan part of table up to those user ID.   {#720}
[00:40:38] STUDENT_1: In this case, since we do not have that handy, we have to go and figure it out.   {#721}
[00:40:44] STUDENT_1: This value, do the whole scan and then do the join and then get those filter.   {#722}
[00:40:49] STUDENT_1: That's how you can think of.   {#723}
[00:40:51] TEACHER: But why does it have to do that entire scan?   {#724}
[00:40:55] STUDENT_1: Because of this hash.   {#725}
[00:40:56] STUDENT_1: Yeah, for each email ID, we have to create that hasing and evaluate that.   {#726}
[00:41:05] STUDENT_1: Now you got the email ID for that.   {#727}
[00:41:08] STUDENT_1: You have so once you do the whole scan, you read each and every row of the table for each   {#728}
[00:41:16] STUDENT_1: email, get that the has now out of those has you will do the search or like filter it,   {#729}
[00:41:23] STUDENT_1: which email ID we are talking.   {#730}
[00:41:24] STUDENT_1: Now, once we have that, then you can do the join only for those roads, which are in the   {#731}
[00:41:31] TEACHER: wear class.   {#732}
[00:41:32] TEACHER: Yeah.   {#733}
[00:41:32] TEACHER: Yeah.   {#734}
[00:41:34] TEACHER: Brilliant.   {#735}
[00:41:34] TEACHER: This is what the pain point is.   {#736}
[00:41:37] TEACHER: Okay.   {#737}
[00:41:38] TEACHER: Let me contradict.   {#738}
[00:41:39] TEACHER: Thanks so much for putting that in such a very, in, in, in a really nice way.   {#739}
[00:41:45] TEACHER: Yesterday we discussed now today I will contradict that yesterday.   {#740}
[00:41:49] TEACHER: We discussed that, Hey, whatever is derivable, we should not store that.   {#741}
[00:41:54] TEACHER: over here this query is very very very inefficient because the where clause itself contains a   {#742}
[00:42:05] TEACHER: computation which means that it cannot leverage indexes over here because unless it goes through   {#743}
[00:42:13] TEACHER: every single email it cannot say that it would have to compute the hash of it and then find which   {#744}
[00:42:20] TEACHER: matches with your given value.   {#745}
[00:42:24] TEACHER: So it would have to literally,   {#746}
[00:42:26] TEACHER: because there is no way for your relational database   {#747}
[00:42:28] TEACHER: to know, okay, this is the email ID that is pointing to,   {#748}
[00:42:30] TEACHER: that would evaluate to this hash.   {#749}
[00:42:32] TEACHER: You cannot leverage indexes over here.   {#750}
[00:42:34] TEACHER: This will result in a full table scan every single time.   {#751}
[00:42:39] TEACHER: This is why you need hash column over here,   {#752}
[00:42:44] TEACHER: because then you can index it and say,   {#753}
[00:42:47] TEACHER: where users.hash is equal to the one that is passed.   {#754}
[00:42:53] TEACHER: This makes a query order one, almost order.   {#755}
[00:42:57] TEACHER: Because now it's very pointy.   {#756}
[00:42:59] TEACHER: It's very pointy, very, because now what it can do is   {#757}
[00:43:02] TEACHER: it can literally just do the user that has equal to something.   {#758}
[00:43:05] TEACHER: It would filter out that one row from it and then join,   {#759}
[00:43:09] TEACHER: get the user ID, join it over here.   {#760}
[00:43:11] TEACHER: It's very quick, very, very, very, very quick.   {#761}
[00:43:15] TEACHER: So it's not always true that what is derivable, you should not store it depends because if   {#762}
[00:43:20] TEACHER: it is slowing things down for you, you have to store that redundant part.   {#763}
[00:43:25] TEACHER: This is where we are adding this one redundant column.   {#764}
[00:43:28] TEACHER: We are actually, whenever a user is getting created, we are not only storing the email   {#765}
[00:43:33] TEACHER: ID of the user, but we are also computing the hash of the email ID and storing it and   {#766}
[00:43:37] TEACHER: creating an index on literally every single column.   {#767}
[00:43:44] TEACHER: Email is a unique key, hash is a unique key.   {#768}
[00:43:47] TEACHER: But we have to do it.   {#769}
[00:43:49] TEACHER: We have to do it.   {#770}
[00:43:50] TEACHER: Otherwise this query, which is more, which is very common of a query.   {#771}
[00:43:55] TEACHER: That would be very expensive because there is no one efficient way for your database   {#772}
[00:44:01] TEACHER: to figure out which all rows it would need to converge on because there was an evaluation   {#773}
[00:44:06] TEACHER: in the where clause itself hash of email.   {#774}
[00:44:11] TEACHER: This implementation detail, I want all of you to focus on.   {#775}
[00:44:15] TEACHER: Again, as I say, drawing boxes is easy.   {#776}
[00:44:18] TEACHER: This is where the magic happens.   {#777}
[00:44:20] TEACHER: This is what makes you like when you scratch the surface, you see the   {#778}
[00:44:26] TEACHER: ugliness of the system.   {#779}
[00:44:28] TEACHER: Right?   {#780}
[00:44:28] TEACHER: So devil, sorry, the devil lies in the details that we all have heard it.   {#781}
[00:44:33] TEACHER: This is a classic example of that.   {#782}
[00:44:34] TEACHER: Unless you write that query, unless you figure out how that would execute,   {#783}
[00:44:39] TEACHER: you would see, we don't need this, but then you realize that your query   {#784}
[00:44:42] TEACHER: is not really performant enough.   {#785}
[00:44:44] TEACHER: Then you add, right?   {#786}
[00:44:46] TEACHER: Okay.   {#787}
[00:44:47] TEACHER: So this is what I wanted to very key point.   {#788}
[00:44:50] TEACHER: I wanted to highlight that, right?   {#789}
[00:44:52] TEACHER: This is why that column hash column is really important.   {#790}
[00:44:55] TEACHER: Okay.   {#791}
[00:44:56] TEACHER: So we talked about rendering all the photos of a person.   {#792}
[00:44:59] TEACHER: Now let's talk about marking someone or marking a photo as active.   {#793}
[00:45:02] TEACHER: Sunil, what would be the query to mark a particular photo as active?   {#794}
[00:45:09] STUDENT_1: So in photos table, we can keep like no, is that two column is already there, right?   {#795}
[00:45:16] TEACHER: So we can keep like no flag true or false. Okay. So that's okay. That's a boolean. So what would   {#796}
[00:45:23] STUDENT_1: your query look like? Oh, okay. So this is just to pull only active photo, right? That's your   {#797}
[00:45:29] TEACHER: It's marking a photo as active marking.   {#798}
[00:45:33] STUDENT_1: Yeah.   {#799}
[00:45:34] STUDENT_1: Okay.   {#800}
[00:45:35] STUDENT_1: Then it's an update query.   {#801}
[00:45:37] STUDENT_1: Update photos.   {#802}
[00:45:41] STUDENT_1: Set is active equal to true where user ID equal to.   {#803}
---- OWNED SEGMENTS END ----

CTX| [00:45:56] STUDENT_1: and photo ID also we have to pass where on which photo like no user click to make it active   {#804}
CTX| [00:46:01] TEACHER: that is also do you really need because if ID is the primary do you need to pass user ID over here   {#805}
CTX| [00:46:06] TEACHER: no not required okay not so you're passing this okay yes what's the disadvantage of this query   {#806}
CTX| [00:46:16] TEACHER: what could go wrong   {#807}
CTX| [00:46:21] TEACHER: You were asking me, you gave this query.   {#808}
CTX| [00:46:25] TEACHER: What could go wrong over here?   {#809}
CTX| [00:46:32] TEACHER: See, this is what I love.   {#810}
CTX| [00:46:34] TEACHER: This is such a simple query.   {#811}
CTX| [00:46:36] TEACHER: You could see what's wrong in this query.   {#812}
CTX| [00:46:38] TEACHER: There is a big problem in this way, a big problem.   {#813}
CTX| [00:46:43] TEACHER: So they'll try to spot that.   {#814}
CTX| [00:46:51] STUDENT_1: Okay.   {#815}
CTX| [00:46:52] STUDENT_1: So if you give user ID also, then the scan will be like no less on the table.   {#816}
