# chunk_09  OWNS 01:36:20 -> 01:49:02  (segments #1609-#1693, 1059 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:35:22] STUDENT_2: happy party always like the process of successfully. Suppose if it's at consumer level   {#1592}
CTX| [01:35:28] STUDENT_2: in middle or somewhere, then how it intelligently can process the message again? So do we have to   {#1593}
CTX| [01:35:35] STUDENT_2: manually re-trigger or replay the message process? No, that's a guarantee of the underlying queue   {#1594}
CTX| [01:35:41] TEACHER: that you're using. SQS provides different guarantees, rapid time queue provides different   {#1595}
CTX| [01:35:46] TEACHER: called as a visibility timeout in SQS.   {#1596}
CTX| [01:35:48] TEACHER: So what happens is if this fails, then before deleting the message,   {#1597}
CTX| [01:35:53] TEACHER: obviously before deleting the message, the consumer failed, then after the   {#1598}
CTX| [01:35:56] TEACHER: visibility timeout, typically two minutes or 10 minutes, let's say 10 minutes.   {#1599}
CTX| [01:35:59] TEACHER: So after 10 minutes, the message would reappear at the front of the queue.   {#1600}
CTX| [01:36:03] STUDENT_2: So what is the indication of failure?   {#1601}
CTX| [01:36:04] STUDENT_2: Let's say like no consumer is doing like, you don't delete it.   {#1602}
CTX| [01:36:07] TEACHER: You don't delete it.   {#1603}
CTX| [01:36:08] TEACHER: That's the indication of failure.   {#1604}
CTX| [01:36:10] TEACHER: The consumer after processing the message has to delete the message.   {#1605}
CTX| [01:36:13] STUDENT_5: Oh, it's part of the code.   {#1606}
CTX| [01:36:16] TEACHER: You have to write it.   {#1607}
CTX| [01:36:17] TEACHER: You have to write it.   {#1608}

---- OWNED SEGMENTS START ----
[01:36:20] STUDENT_2: Because we use stream, but we don't like write any code.   {#1609}
[01:36:24] STUDENT_2: Stream may you commit.   {#1610}
[01:36:25] TEACHER: Q may you delete.   {#1611}
[01:36:27] TEACHER: Okay.   {#1612}
[01:36:28] TEACHER: Stream may, if you don't commit, you would again start from the last checkpoint.   {#1613}
[01:36:32] STUDENT_2: It looks like the commit is also internal.   {#1614}
[01:36:34] STUDENT_2: We don't commit like part of the code.   {#1615}
[01:36:35] TEACHER: You commit or you have sent it to auto commit or a periodic commit.   {#1616}
[01:36:39] STUDENT_4: Okay.   {#1617}
[01:36:40] TEACHER: It's always there.   {#1618}
[01:36:41] TEACHER: It's always there.   {#1619}
[01:36:42] TEACHER: It's always there.   {#1620}
[01:36:42] TEACHER: It's not magical, right?   {#1621}
[01:36:43] TEACHER: Either you have to have said commit on every message.   {#1622}
[01:36:46] TEACHER: as an auto commit or a periodic commit.   {#1623}
[01:36:49] TEACHER: 100%.   {#1624}
[01:36:49] STUDENT_14: Yeah.   {#1625}
[01:36:50] STUDENT_14: Yeah.   {#1626}
[01:36:52] TEACHER: I'll take one more.   {#1627}
[01:36:53] TEACHER: Yeah.   {#1628}
[01:36:53] TEACHER: I'll take one more and then we'll go on a break.   {#1629}
[01:36:56] TEACHER: I'll just pick someone at random who I've not interacted with.   {#1630}
[01:36:59] TEACHER: Yes, Aditi.   {#1631}
[01:37:01] STUDENT_8: Yeah.   {#1632}
[01:37:01] STUDENT_8: So yesterday we looked into that connection pooling and there we were setting a maximum   {#1633}
[01:37:07] STUDENT_8: limit of connections and any further incoming connections would be, that would also be kind   {#1634}
[01:37:13] STUDENT_8: of a queue, right?   {#1635}
[01:37:16] TEACHER: difference here in message. This is infrastructure queue. This is a separate process that is an   {#1636}
[01:37:22] TEACHER: in-memory queue. Okay. In-memory queue, like queue data structure. This is your infrastructure   {#1637}
[01:37:28] TEACHER: queue component. Like where you spin up a process, right? Two very different things.   {#1638}
[01:37:34] TEACHER: Okay. Yeah. Okay. Pariksit Sampad Ranjit. So I'll take your questions at the end. Now what we'll   {#1639}
[01:37:42] TEACHER: do is we'll take a break uh it doesn't quite long we'll take a break and once we come from the big   {#1640}
[01:37:47] TEACHER: break we'll talk about we'll talk about concurrency and we'll talk about then communication so   {#1641}
[01:37:56] TEACHER: concurrency is a small part we'll spend more time on concurrency next week uh but we'll talk about   {#1642}
[01:38:00] TEACHER: communication a little more in depth and then again more than happy to take any questions that   {#1643}
[01:38:05] TEACHER: you have throughout the session whatever we covered at the end so session again like always   {#1644}
[01:38:09] TEACHER: would not end until all the questions are right okay so it's 10 38 we'll take break till 10 45   {#1645}
[01:38:17] TEACHER: and from 10 45 we'll resume our discussion on concurrency and communication right   {#1646}
[01:38:21] TEACHER: see you folks at 10 45 thanks folks   {#1647}
[01:44:37] STUDENT_5: Thank you.   {#1648}
[01:44:56] STUDENT_5: Let's start with the second half for today and we discuss concurrency and communication.   {#1649}
[01:45:03] TEACHER: So concurrency is one of the most important things that helps you get the performance out of your system.   {#1650}
[01:45:12] TEACHER: Right.   {#1651}
[01:45:13] TEACHER: So now why concurrency is important because it helps you extract the most out of your single machine, be it your server, be it your database, be it your asynchronous worker, anything.   {#1652}
[01:45:25] TEACHER: Right.   {#1653}
[01:45:26] TEACHER: to get the most out of your machine you need to run either multiple processes on that or multiple   {#1654}
[01:45:33] TEACHER: threads on that to get it so multi-processing multi-threading falls under this concurrency   {#1655}
[01:45:38] TEACHER: comes up with a bunch of issues the biggest of them is communication between threads like how do   {#1656}
[01:45:45] TEACHER: you communicate between two threads or two process that hey i'm done with this processing please don't   {#1657}
[01:45:51] TEACHER: reprocess this again classic case right how do you prevent concurrent use of shared resources now   {#1658}
[01:45:57] TEACHER: let me talk about a bit so with concurrency what happens is when you have two threads a classic   {#1659}
[01:46:04] TEACHER: classic example you have a global variable count you have two variables uh two threads both are   {#1660}
[01:46:10] TEACHER: doing count plus plus right you have a global variable count int count equal to zero both   {#1661}
[01:46:16] TEACHER: threads are excess sacred both are doing count plus plus count plus plus is not thread safe   {#1662}
[01:46:21] TEACHER: why because if let's say i do this 1000 times on each thread my total count should be 2000   {#1663}
[01:46:29] TEACHER: but it is 1997 why because count plus plus is not atomic because count plus plus is not a thread   {#1664}
[01:46:37] TEACHER: safe operation why just a google such in case you are not from cs but concurrent systems are   {#1665}
[01:46:43] TEACHER: extremely difficult to build because when it comes to concurrency you need to guarantee two things   {#1666}
[01:46:50] TEACHER: first is to ensure data correctness like i'll give you an example where i have two threads   {#1667}
[01:46:56] TEACHER: both doing count plus equal to like count plus plus thousand times the final value has to be 2000   {#1668}
[01:47:02] TEACHER: and not 1997 but you will get 1997 because count plus plus is not thread set right so correctness   {#1669}
[01:47:11] TEACHER: is one issue second is you need to have high throughput so a way to ensure correctness   {#1670}
[01:47:18] TEACHER: is to use locks optimistic optimistic locking pacifist locking we'll talk about them detail   {#1671}
[01:47:24] TEACHER: in coming weeks third fourth fifth sixth we'll talk in depth about it but i'm just giving you a   {#1672}
[01:47:27] TEACHER: gist of it so locks are ways to ensure to like locks are the way through which you can protect   {#1673}
[01:47:34] TEACHER: your critical section for example you wrap your count plus plus with semaphors and say that at   {#1674}
[01:47:39] TEACHER: At any point in time, only one would move in to the count++ while every other thread   {#1675}
[01:47:44] TEACHER: would wait.   {#1676}
[01:47:45] TEACHER: That's a classic implementation.   {#1677}
[01:47:47] TEACHER: It's like roads that we drive our vehicles on.   {#1678}
[01:47:51] TEACHER: When we hit a square, there's a traffic signal.   {#1679}
[01:47:54] TEACHER: Each road that is coming onto the square has a traffic signal.   {#1680}
[01:47:59] TEACHER: The center part of the road is the critical section.   {#1681}
[01:48:03] TEACHER: at any point in time one traffic signal goes green allowing it to consume that middle part   {#1682}
[01:48:11] TEACHER: then it turns red then other turns green in that access section right so this is the shared resource   {#1683}
[01:48:17] TEACHER: we are allowing one side of the road to access the middle part to move on to go on the other side   {#1684}
[01:48:22] TEACHER: right this is a classic case this are semifers this is a locking mechanism you are locking   {#1685}
[01:48:28] TEACHER: other threads while one is accessing it when one is done you give chance to other thread to do it   {#1686}
[01:48:33] TEACHER: That's literally what locking does for you.   {#1687}
[01:48:36] TEACHER: This is exactly what pessimistic locking is.   {#1688}
[01:48:40] TEACHER: That's a simplest analogy that I can give to explain this part.   {#1689}
[01:48:45] TEACHER: You can see the entire domain of computer science, entire, not even exactly when I say   {#1690}
[01:48:51] TEACHER: entire, the entire domain of computer science is very well.   {#1691}
[01:48:55] TEACHER: You can see them in action in your real world.   {#1692}
[01:48:58] TEACHER: It's heavily inspired on how humans behave.   {#1693}
---- OWNED SEGMENTS END ----

CTX| [01:49:02] TEACHER: Locking are a way to do it.   {#1694}
CTX| [01:49:03] TEACHER: A way to implement pessimistic locking is with mutex and   {#1695}
CTX| [01:49:06] TEACHER: same upwards.   {#1696}
CTX| [01:49:07] TEACHER: So you will find those terms here and there.   {#1697}
CTX| [01:49:09] TEACHER: And there are lock-free data structures like CRDTs, the most brilliant data structures   {#1698}
CTX| [01:49:14] TEACHER: like I've read about CRDTs, lock-free implementations and not, and we'll not touch upon that as   {#1699}
CTX| [01:49:20] TEACHER: advanced data structure part, but know those talks like something like this even exists.   {#1700}
CTX| [01:49:24] TEACHER: Right.   {#1701}
CTX| [01:49:24] TEACHER: But we'll touch upon this concurrency in very high depth when it comes to database, how   {#1702}
CTX| [01:49:30] TEACHER: We'll see it in action.   {#1703}
CTX| [01:49:31] TEACHER: And that would solidify the entire understudy.   {#1704}
CTX| [01:49:34] TEACHER: But I'm just sprinkling it a bit so that we understand how that happens.   {#1705}
CTX| [01:49:38] TEACHER: Okay.   {#1706}
CTX| [01:49:39] TEACHER: So in our medium example, where does this concurrency fit in?   {#1707}
CTX| [01:49:42] TEACHER: For example, two people collabed on an article at the exact same time.   {#1708}
CTX| [01:49:49] TEACHER: Now what would happen?   {#1709}
CTX| [01:49:50] TEACHER: You have to enter that account.   {#1710}
CTX| [01:49:52] TEACHER: If it was 100, it becomes 102.   {#1711}
CTX| [01:49:54] TEACHER: It cannot be 101.   {#1712}
CTX| [01:49:56] TEACHER: Right?   {#1713}
CTX| [01:49:56] TEACHER: So how do you do that?   {#1714}
CTX| [01:49:57] TEACHER: You do it by using transactions or atomic instructions on your database.   {#1715}
