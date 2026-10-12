**[01:21:59] Teacher:** Sometime back, right, someone asked that, but I think Shriya was that, that asked that part, right? Why can't we just use my existing ID generation, I can't use my database as my ID generation service? That's exactly what they are doing. They are using database itself as ID. So it's a separate database. Photos are being stored in other sharded database, your ID generation itself is a separate database in which you are leveraging the auto-incrementedness of the database as your ID generation.

[01:22:26] So what happens if, let's say, you want to naively use a database as that, you know, database gives you auto increment. Whenever someone needs an ID, it talks to this database and you want ID from that. Basically, what would you do? You have this column, ID, auto increment ID. You would delete this and add a new row. When you add a new row, what would you get? It would be the next ID. Then when you need one, you delete one and you add one, it would get the next ID.

[01:22:53] Right, but for you to add one, you can just cannot insert a row with nothing, you need to pass some values to them. So you had another column called stub. It's a normal column, name seems fancy, just a normal dummy column, some dummy value, nothing special about it, right? But what we are effectively doing is we are just inserting this row, we are deleting and reinserting, deleting and reinserting, deleting and reinserting. This way, whenever you're inserting into this table without providing the ID, increment the ID and would use that as a default value while inserting, and then the next one, and then the next one, and then the next. Classic auto increment ID use case, right? So either we delete or increment, delete and insert in one transaction, or we can use upsert, because delete plus insert is equal to upsert, right?

<!-- topic-candidate [01:23:40]: Upsert in MySQL - insert on duplicate key update vs replace into -->

[01:23:40] So because they were using MySQL, I'm talking a bit about MySQL here, but MySQL, because they're using MySQL, MySQL provides two ways to do it, is insert on duplicate key update. So it's very simple. What it does is it tries to insert whatever you provided over here, insert into this, this, this values, this, this, this, it tries to insert that. But if it fails due to unique key constraint, then it triggers the update that you pass it. That is classic upsert. So you're trying to insert. So how, what is upsert? You're trying to insert something. If it exists, then update. If it does not exist, then insert. This is an upsert state for MySQL.

[01:24:28] So there are two ways to do upsert. First is this. The second one is replaceInto. Similar to how we have insertInto, there is replaceInto. We saw this in key-value store on relational database. This replaceInto. So replaceInto does upsert, but what replaceInto does internally, it actually deletes and inserts the new row. So you can very clearly see it is slower. It is basically 32 times slower than on duplicate key update. So you can use either replace into or insert, but replace into is 32 times slower than this. I personally benchmarked this. That's why I am quoting this number, 32x slower. I personally benchmarked it on a MySQL server to see the performance difference between the two. So it is 32 times slower over here. So pick one. Anyway, what matters is doing upsert.

[01:25:17] So what you are actually doing, like this, whenever, whenever a server, a server wants an ID so they can insert a photo in photos database, what it does is it fires a SQL query on the central ID service, the tickets, something like this: insert into tickets stub values a, because you have to pass some value, so you use stub a, a random value, nothing, no, no, nothing matters that you put any value there, but it is the constant. Well, insert into ticket stub a on duplicate key update ID equal to ID plus one. Simple. [?This way | asr: "this day"], what happens is it would try to insert this a, but it would see [unclear: "key array"] but this already exists, so on duplicate key update. So it would update 74 to 75 and would return that, right? Then next time the query fires 76, 77, 78 and so on and so forth. So you get IDs like this. You are leveraging MySQL transaction, MySQL atomicity in order to get the IDs that you want. So this is what Flickr does as part of like implementation logic.

<!-- topic-candidate [01:26:29]: Flickr - ID generation server, single point of failure, two servers (odd/even) -->

[01:26:29] But now what you see is like something like this. So these are your photo service servers. This would make it clear. This is your ID generation server, MySQL, that is different, and photos database is different, which is sharded. So what they're doing is whenever there is a request to post a photo, request comes to this API server, API server fires the request to this MySQL to get the ID. You get the ID, then you store it in photos. Right. This is what is happening. But if you look carefully, this is a single point of failure, because there is one server. If this server goes down, then gone. Right.

[01:27:02] Now to solve it, you put two servers. But this is very similar to that problem now. Gossip, monotonicity and whatnot. Here we don't care about monotonicity. So what we do, we put both databases behind a load balancer and make one, someone also recommended this approach. This is exactly what we are doing. So what we do is we have two databases. Now, even if one of the databases [?goes down | asr: "goes on"], other databases can handle the load. But how do you ensure uniqueness? [unclear: "tests."] How do you ensure that they don't conflict? What we do is, let's say I have two databases. I'll have, instead of doing increment plus plus, I do increment plus equal to two. Let's say one database generates odd IDs, other database generates even IDs.

[01:27:43] So how you can configure this is auto increment underscore increment. These are actual configuration that you can provide in your MySQL server. Auto increment increment is set to 2 and auto increment offset is set to 1. So increment increment, this means by how much you would want to increment every time. And increment offset is what's the starting point of it. So this is what you would configure. And now the load balancer that you put over here is configured in round robin port [check: "round robin port" - port/fashion?].

[01:28:17] So first request goes over here. It generates ID 1. Second request goes to other server. Third request comes to first server. Auto increment plus equal to 2, 1 plus 2 is 3, so you get ID 3. Next request goes over your 2, plus auto increment increment is 2, so 4, 5, 6, 7, 8. Because you are doing it in round, you will always see [unclear: "positive request 2 year, 2nd year, 3rd year 4th year, 5th year, 6th year, 7th year, 8th year"]. You almost get [?monotonicity | asr: "more authenticity"]. You have solved problem of single point of failure. Now you have 2 servers. If one of the server goes down, fine for you, because your ID generation is still continuing to work without any hiccups.

[01:29:01] But what happens when it goes down? What do you do? If one server goes down, let's say my odd server went down due to some reason. Now all of my requests will go to even server. So the IDs that would spit out would be 2, 4, 6, 8, 10, 12, etc. Now assume that after 202 ID was generated, my server, my odd server came back up. Now when my odd server came back up, either it can start from the point where it left up, because MySQL is a persistent source. It's not storing in memory. So let's say generated ID till five, it would generate seven, 204, nine, 206, 11, 208. Right? Here you see a huge discrepancy in IDs. It's not that it's a constraint that you are playing with. It just does not look aesthetically pleasing. Much more for aesthetics rather than correctness. You are still getting unique ID, but there seems to be very massive parity between.

[01:30:01] So it's optional to just reset the one that you just spun up to the ID. Let's say this generated ID to 202. You will add some buffer, let's say 240, and you set here 241 and 242. And then it resumes from that. 242, 243, 244, 245, 246 and so on and so forth. It's just for aesthetics, nothing about correctness, nothing about strict monotonicity. Because we're still not guarantee strict monotonicity. But you still have that as like nearly similar. So it's good. It's a good byproduct to have. So this is how Flickr does it. It's a really simple approach that we right now looked at. It's pretty simple, but it's pretty brilliant in its own sense.

[01:30:49] [unclear: "Ordin event and results back up."] That's one thing. You would say, who would do this? Who would do this configuring? Who would find this max buffer and then start page? So we are starting with the safest value, right? Who would do this? Obviously, when a server goes down, SRE engineer, DevOps engineer, you know, they would fix it. They can configure it. They can change it. You can write an automated script, but typically database going down is a big thing. There will be an engineer looking into it. He or she will do this. It's fine. Right. You can also, in case you want to automate, you can automate. You just need to find the active server, find the max IDs, add some buffer to that, and then set the values and then just do a quick process reboot on each server. You are done. Right? Okay. Any questions on this approach?

<!-- topic-candidate [01:31:39]: Q&A - Flickr stub column and resetting after a server comes back -->

**[01:31:39] Student?:** Yeah, man.

> **Student Question [01:31:41] - Student 3:** Yeah. Can you just go back to the previous page where you have created that query? I'm not able to understand how it's creating the unique value at this one. Can you just elaborate maybe one more time?

**[01:31:52] Teacher (answer):** This is 75, 76. Insert into ticket stub values A. So what we are trying to do, we are trying to insert a value. Something we have not provided ID.

[01:32:02] So we're trying to insert this value. Right? But stub is having what? Unique key. Correct? What would happen? This insert would fail. Have two same values over here in this column. Correct. So on duplicate key update, update to what ID equal to ID plus one.

**[~01:32:22] Student 3:** That I understood. [?Stub | asr: "Step"] part where it is coming, not able to make sense of that.

**[~01:32:28] Teacher:** It's just a common value. It's just a random value that you chose. It's a hard coded value in your query. Hard coded. Oh. Right. It's a hard code. It can be literally any string that you would want to keep. It's just that you want to trigger this. You want to break the unique constraint. Correct? You are just trying. You are making your database break the unique constraint so that you can trigger an update atomic.

**[01:32:58] Student 3:** Oh, so for that purpose only stub exists.

**[01:33:01] Teacher:** That's it. That's it. There is no other reason for stub.

**[01:33:04] Student 3:** Okay. Got it.

**[01:33:06] Teacher:** DK?

**[01:33:08] Student 3:** Yep.

> **Student Question [01:33:09] - Student 3:** If you can go to the last page, I am not able to understand how, when the server comes back, how you are resetting the values with the buffer value.

**[01:33:18] Teacher (answer):** This one, I said, no, one engineer will do that. This configuration, these configurations, it's MySQL specific. Check how you can change auto increment offset on the platform. But why do we need to do that? Because let's say one server comes back. I said aesthetics. I said it's for aesthetics. Nothing more. It, your system is still running correctly. It would just look a bit.

**[01:33:41] Student 3:** The last value only will keep on updating it. Right. Or it doesn't work.

**[01:33:45] Teacher:** But that's what I said. Let's say it died off at five. Okay. This value is 202 right now. If odd server comes back up, what would be the next ID that would be generated?
