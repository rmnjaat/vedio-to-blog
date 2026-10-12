**[01:36:20] Student 2:** Because we use stream, but we don't like write any code. Stream mein you commit.

**[01:36:25] Teacher:** Queue mein you delete. Okay. Stream mein, if you don't commit, you would again start from the last checkpoint.

**[01:36:32] Student 2:** It looks like the commit is also internal. We don't commit like part of the code.

**[01:36:35] Teacher:** You commit or you have set it to auto commit or a periodic commit.

**[01:36:39] Student 4:** Okay.

**[01:36:40] Teacher:** It's always there. It's always there. It's always there. [check: possible ASR duplicate] It's not magical, right? Either you have to have said commit on every message, as an auto commit or a periodic commit. 100%.

**[01:36:49] Student 14:** Yeah. Yeah.

**[01:36:52] Teacher:** I'll take one more. Yeah. I'll take one more and then we'll go on a break. I'll just pick someone at random who I've not interacted with. Yes, Aditi.

> **Student Question [01:37:01] - Student 8:** Yeah. So yesterday we looked into that connection pooling and there we were setting a maximum limit of connections and any further incoming connections would be, that would also be kind of a queue, right?

**[01:37:16] Teacher (answer):** Difference here in message. This is infrastructure queue. This is a separate process that is an in-memory queue. Okay. In-memory queue, like queue data structure. This is your infrastructure queue component. Like where you spin up a process, right? Two very different things.

<!-- topic-candidate [01:37:34]: Break (admin) -->

[01:37:34] *(admin)* Okay. Yeah. Okay. Pariksit Sampad Ranjit. [check: name spelling] So I'll take your questions at the end. Now what we'll do is we'll take a break, it doesn't quite long, we'll take a break and once we come from the big break we'll talk about, we'll talk about concurrency and we'll talk about then communication. So concurrency is a small part, we'll spend more time on concurrency next week, but we'll talk about communication a little more in depth. And then again, more than happy to take any questions that you have throughout the session, whatever we covered, at the end. So session again, like always, would not end until all the questions are right. Okay? So it's 10:38, we'll take break till 10:45, and from 10:45 we'll resume our discussion on concurrency and communication, right? See you folks at 10:45. Thanks folks.

[break ~01:38:25-01:44:37]

**[01:44:37] Teacher:** Thank you. [check: possibly hallucinated in silence right after the 372 s break]

<!-- topic-candidate [01:44:56]: Concurrency -->

[01:44:56] Let's start with the second half for today and we discuss concurrency and communication. So concurrency is one of the most important things that helps you get the performance out of your system. Right. So now why concurrency is important? Because it helps you extract the most out of your single machine, be it your server, be it your database, be it your asynchronous worker, anything. Right. To get the most out of your machine you need to run either multiple processes on that or multiple threads on that to get it. So multi-processing, multi-threading falls under this concurrency.

[01:45:38] Comes up with a bunch of issues. The biggest of them is communication between threads, like how do you communicate between two threads or two process that hey, I'm done with this processing, please don't reprocess this again. Classic case, right? How do you prevent concurrent use of shared resources? Now let me talk about a bit. So with concurrency what happens is when you have two threads, a classic, classic example, you have a global variable count, you have two variables, two threads, both are doing count plus plus, right? You have a global variable count, int count equal to zero, both threads are [unclear: "excess sacred"], both are doing count plus plus. Count plus plus is not thread safe. Why? Because if, let's say, I do this 1000 times on each thread, my total count should be 2000, but it is 1997. Why? Because count plus plus is not atomic, because count plus plus is not a thread safe operation. Why? Just a Google search in case you are not from CS.

[~01:46:37] But concurrent systems are extremely difficult to build because when it comes to concurrency you need to guarantee two things. First is to ensure data correctness. Like I'll give you an example where I have two threads both doing count plus equal to, like count plus plus thousand times, the final value has to be 2000 and not 1997. But you will get 1997 because count plus plus is not thread safe, right? So correctness is one issue. Second is you need to have high throughput. So a way to ensure correctness is to use locks. Optimistic, optimistic locking, pessimistic locking, we'll talk about them detail in coming weeks, third, fourth, fifth, sixth, we'll talk in depth about it, but I'm just giving you a gist of it. So locks are ways to ensure, to like, locks are the way through which you can protect your critical section. For example, you wrap your count plus plus with semaphores and say that at any point in time, only one would move in to the count++ while every other thread would wait. That's a classic implementation.

[01:47:47] It's like roads that we drive our vehicles on. When we hit a square, there's a traffic signal. Each road that is coming onto the square has a traffic signal. The center part of the road is the critical section. At any point in time one traffic signal goes green, allowing it to consume that middle part, then it turns red, then other turns green in that access section, right? So this is the shared resource. We are allowing one side of the road to access the middle part to move on to go on the other side, right? This is a classic case. This are semaphores, this is a locking mechanism. You are locking other threads while one is accessing it. When one is done, you give chance to other thread to do it. That's literally what locking does for you. This is exactly what pessimistic locking is. That's a simplest analogy that I can give to explain this part. You can see the entire domain of computer science, entire, not even exactly, when I say entire, the entire domain of computer science is very well. You can see them in action in your real world. It's heavily inspired on how humans behave.
