# chunk_01  OWNS 00:00:02 -> 00:12:34  (segments #0-#205, 2206 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

[00:00:02] TEACHER: Great. Week number three, day first. It's all about distributed systems this time.   {#0}
[00:00:10] TEACHER: The agenda for today is around like, so, so basically tomorrow we'll be discussing distributed ID generators, but today our focus will be mostly on like distributed systems seems fancy.   {#1}
[00:00:23] TEACHER: And to be honest, it was one of the most neglected subjects in basically during my bachelor's as well as master's.   {#2}
[00:00:30] TEACHER: No one wanted to take that subject.   {#3}
[00:00:31] TEACHER: But as soon as they enter industry, oh my God, distribute systems are everywhere.   {#4}
[00:00:35] TEACHER: And that's the sad part.   {#5}
[00:00:38] TEACHER: Most of these things, most of the core algorithms that people talk about, literature or not, what we are taught is a theoretical foundation for it.   {#6}
[00:00:47] TEACHER: Now today, in most cases, like when we discuss the systems, you would see how beautifully those things fit into the right place.   {#7}
[00:00:55] TEACHER: So the agenda for today is where we would start with primarily understanding how to approach distributed systems.   {#8}
[00:01:04] TEACHER: I won't go into the theoretical part of it, but most importantly, when you are designing a system, how should you approach it?   {#9}
[00:01:11] TEACHER: And there is no secret sauce.   {#10}
[00:01:13] TEACHER: It's very easy.   {#11}
[00:01:14] TEACHER: one thing that like you just need to remember one thing and you can build good systems right   {#12}
[00:01:20] TEACHER: then in order to like the core part the core component that makes distribute systems possible   {#13}
[00:01:27] TEACHER: is typically a load balancer because it is what is abstracting the details of having multiple   {#14}
[00:01:34] TEACHER: servers in the back end so we would go through a design of load balancer a very extremely realistic   {#15}
[00:01:41] TEACHER: design of a load balancer. We would also take a very brief look into the source code of it to   {#16}
[00:01:47] TEACHER: understand the core implementation logic rather than just drawing boxes. As I always say, drawing   {#17}
[00:01:51] TEACHER: boxes is two-year-old kid can do that. Understanding this granular detail is the differentiating factor.   {#18}
[00:01:57] TEACHER: So we'll go through the source code of a very tiny load balancer that I created. In no way it is   {#19}
[00:02:02] TEACHER: productionizable, but you would understand how easy it is to write one. In most cases, we all get   {#20}
[00:02:11] TEACHER: Oh my God, writing a load balancer.   {#21}
[00:02:13] TEACHER: Most people don't even think of doing that.   {#22}
[00:02:16] TEACHER: But there is an engineer who has wrote that.   {#23}
[00:02:18] TEACHER: The one who built NGINX.   {#24}
[00:02:20] TEACHER: People use NGINX as a reverse proxy.   {#25}
[00:02:22] TEACHER: We'll build that.   {#26}
[00:02:23] TEACHER: We would see how simple it is to build a load balancer.   {#27}
[00:02:27] TEACHER: Hardly 10 lines of core code.   {#28}
[00:02:30] TEACHER: That's it.   {#29}
[00:02:30] TEACHER: That's it.   {#30}
[00:02:31] TEACHER: And I'm even exaggerating on that part.   {#31}
[00:02:33] TEACHER: We would see it.   {#32}
[00:02:34] TEACHER: Then we take a break and post that we would be having discussions around   {#33}
[00:02:39] TEACHER: remote and distributed locking. This is one of the most essential part of a distributed system.   {#34}
[00:02:46] TEACHER: Why? Because imagine you have multiple processors and they have to coordinate among themselves   {#35}
[00:02:53] TEACHER: so that the data consistency thing stays in check. For example, I have two transactions happening   {#36}
[00:03:02] TEACHER: in a distributed fashion, both of them trying to update the same row. One transaction needs to   {#37}
[00:03:08] TEACHER: so that other does not update.   {#38}
[00:03:10] TEACHER: Now this is a distributed setup, not a single database.   {#39}
[00:03:12] TEACHER: So a lot of challenges come in.   {#40}
[00:03:14] TEACHER: So remote logs and distributed logs, they form the heart and crux   {#41}
[00:03:17] TEACHER: of data correctness and consistency in distributed systems.   {#42}
[00:03:20] TEACHER: So which is how we would take a look at how you can implement,   {#43}
[00:03:25] TEACHER: like first of all, why you need it.   {#44}
[00:03:26] TEACHER: That's a more important question to answer.   {#45}
[00:03:28] TEACHER: And then how do you implement it using Redis?   {#46}
[00:03:30] TEACHER: And it's not just Redis.   {#47}
[00:03:32] TEACHER: What will, like always, what will answer is,   {#48}
[00:03:35] TEACHER: This will answer the fact that what's the core property that we see from a system that   {#49}
[00:03:40] TEACHER: could be a lock manager so that you don't want to use Redis, build your own.   {#50}
[00:03:45] TEACHER: So understanding the score access pattern, the core ways of building this is what matters   {#51}
[00:03:50] TEACHER: will take a very deep look into that.   {#52}
[00:03:53] TEACHER: And to understand like last week in order to understand database locking, we took an   {#53}
[00:03:58] TEACHER: example of online offline, we took an example of airline check-in system.   {#54}
[00:04:05] TEACHER: in distributed locking we take an example of synchronizing it's a very hypothetical example   {#55}
[00:04:08] TEACHER: but we would solidify or understand right okay so that's the theme for today a ton of detailed   {#56}
[00:04:15] TEACHER: discussion but before that just a couple of feedbacks that i received the last one said that   {#57}
[00:04:20] TEACHER: why not share periods on discord channel itself i did that but it was it made channel very inactive   {#58}
[00:04:29] TEACHER: because there is a lot of links links links links so you tend to miss out on interesting messages   {#59}
[00:04:35] TEACHER: you know, I send it every Sunday, just take a look at it.   {#60}
[00:04:38] TEACHER: Right.   {#61}
[00:04:39] TEACHER: So I've tried a lot.   {#62}
[00:04:40] TEACHER: This is my 16th course.   {#63}
[00:04:41] TEACHER: I've tried a lot of things in the past and I've picked and basically it's an evolution.   {#64}
[00:04:46] TEACHER: So basically the natural selection kicked in.   {#65}
[00:04:51] TEACHER: I did a lot of experiments on a lot of batches.   {#66}
[00:04:54] TEACHER: I'm doing one right now with this batch, which I would tell to batches, which are let's say   {#67}
[00:04:58] TEACHER: five or six cohorts later.   {#68}
[00:05:00] TEACHER: So I did some experiments to understand what works and what doesn't work.   {#69}
[00:05:04] TEACHER: This didn't work.   {#70}
[00:05:05] TEACHER: so that's why I stopped sharing things   {#71}
[00:05:07] TEACHER: on the discord channel   {#72}
[00:05:10] TEACHER: the pre-reads   {#73}
[00:05:11] TEACHER: so what I   {#74}
[00:05:13] TEACHER: am more, Rahul please go and view it   {#75}
[00:05:15] TEACHER: there is a lot of background noise coming   {#76}
[00:05:17] TEACHER: so   {#77}
[00:05:19] TEACHER: pre-reads that's why I don't share on   {#78}
[00:05:21] TEACHER: discord it's hardly just an email   {#79}
[00:05:23] TEACHER: keep an eye on it it's   {#80}
[00:05:24] TEACHER: always there on relog as well   {#81}
[00:05:26] TEACHER: beneath the video you will find it on pre-reads   {#82}
[00:05:29] TEACHER: so please refer to that   {#83}
[00:05:30] TEACHER: that didn't work out well   {#84}
[00:05:33] TEACHER: the last time that's why I stopped doing it   {#85}
[00:05:35] TEACHER: The second one was in the fourth session, I felt lost in the last section.   {#86}
[00:05:40] TEACHER: I've seen focus decrease in any session that goes beyond one hour continuously, one hour   {#87}
[00:05:45] TEACHER: plus continuously.   {#88}
[00:05:46] TEACHER: All of our sessions are more than two hours, FYI.   {#89}
[00:05:49] TEACHER: And try to keep your focus.   {#90}
[00:05:52] TEACHER: It's not that difficult.   {#91}
[00:05:53] TEACHER: Keep your phone in the different room.   {#92}
[00:05:55] TEACHER: Focus on things that matter.   {#93}
[00:05:57] TEACHER: Everything else is just mumbo jumbo that is ruining your life.   {#94}
[00:06:01] TEACHER: So keep your focus intact.   {#95}
[00:06:02] TEACHER: One thing that I always tell is have a pen paper handy.   {#96}
[00:06:07] TEACHER: If you just listen, it would be very hard for you to keep.   {#97}
[00:06:10] TEACHER: Most people, it is hard for them to keep concentration.   {#98}
[00:06:13] TEACHER: So when I see a three hour long or when I used to go on lectures and whatnot,   {#99}
[00:06:19] TEACHER: or I used to attend lectures and whatnot, I used to always have my notes handy.   {#100}
[00:06:23] TEACHER: I used to just scribble things that would just keep me in my focus.   {#101}
[00:06:27] TEACHER: I never lost focus while I was sitting in two hour long lecture also.   {#102}
[00:06:32] TEACHER: So I would recommend you to do that.   {#103}
[00:06:35] TEACHER: Why I don't want to break that.   {#104}
[00:06:37] TEACHER: For example, the Slack discussion went for an hour and a half.   {#105}
[00:06:40] TEACHER: If I would have broken it in, let's say, two parts.   {#106}
[00:06:43] TEACHER: First of all, where do I draw the line?   {#107}
[00:06:45] TEACHER: I did break it 7th, 8th and 9th cohort.   {#108}
[00:06:49] TEACHER: I tried that.   {#109}
[00:06:50] TEACHER: But what happened was it was a break in concentration for most.   {#110}
[00:06:55] TEACHER: So what happened was it would have been easier if we would have continued the conversation rather than breaking it.   {#111}
[00:07:02] TEACHER: Because then you have to set up the entire context again.   {#112}
[00:07:05] TEACHER: A lot of people would forget.   {#113}
[00:07:06] TEACHER: If you take a break, people would go and then they would never come back.   {#114}
[00:07:09] TEACHER: Right?   {#115}
[00:07:10] TEACHER: So, anyway, right now also people are free to leave.   {#116}
[00:07:12] TEACHER: That's fine.   {#117}
[00:07:13] TEACHER: But given that I tried that also, it did worse than what I thought.   {#118}
[00:07:20] TEACHER: So, try to keep your concentration in check.   {#119}
[00:07:22] TEACHER: Cup of coffee, whatever works for you.   {#120}
[00:07:24] TEACHER: For me, what worked for me was taking notes.   {#121}
[00:07:28] TEACHER: Taking notes, pen and paper, something like that.   {#122}
[00:07:32] TEACHER: physically doing it and not typing because as soon as you have access to browser link   {#123}
[00:07:36] TEACHER: in twitter facebook instagram whatsapp tiktok and whatnot would open right so if that is   {#124}
[00:07:41] TEACHER: a root cause put your like throw away your phone into a different room focus on things   {#125}
[00:07:47] TEACHER: that pattern trust me having those deep continuous detailed discussion what happens in real world   {#126}
[00:07:52] TEACHER: you would see design discussions going for three hours four hours straight and you cannot   {#127}
[00:07:56] TEACHER: just again I've lost focus. So try to improve it and I'm not saying I won't budge but it's   {#128}
[00:08:03] TEACHER: more importantly that when you're in a flow to cover a system needs to be in one shot.   {#129}
[00:08:07] TEACHER: Right? There would be time where we would be doing two and a half, almost two hour long   {#130}
[00:08:12] TEACHER: discussion on S3 without a break. You have to do it otherwise problem is that you know   {#131}
[00:08:19] TEACHER: it is much worse for people to build an understanding because I have to reset up the entire context   {#132}
[00:08:26] TEACHER: 20 minutes of extra time.   {#133}
[00:08:28] TEACHER: So I tried that, but I'll try a few more times.   {#134}
[00:08:32] TEACHER: Obviously point taken.   {#135}
[00:08:34] TEACHER: In two systems that I can think of, I would add that break.   {#136}
[00:08:38] TEACHER: But try to figure out things that works for you to improve your focus.   {#137}
[00:08:41] TEACHER: I do that.   {#138}
[00:08:44] STUDENT_5: But I have two systems in mind where I will be taking those breaks.   {#139}
[00:08:48] STUDENT_5: So I'll basically let you know when I'm doing that.   {#140}
[00:08:51] STUDENT_5: Okay.   {#141}
[00:08:52] STUDENT_5: Those were it.   {#142}
[00:08:53] STUDENT_5: I received two early notes.   {#143}
[00:08:55] STUDENT_5: Nothing else of now, nothing else of now.   {#144}
[00:09:00] STUDENT_5: Okay, done.   {#145}
[00:09:02] TEACHER: Fine.   {#146}
[00:09:03] TEACHER: Now let's go to distributed systems.   {#147}
[00:09:06] TEACHER: Most neglected subject, most important in real world.   {#148}
[00:09:10] TEACHER: Great.   {#149}
[00:09:10] TEACHER: Okay.   {#150}
[00:09:11] TEACHER: So distributed systems, this is one of the most misused term.   {#151}
[00:09:18] TEACHER: If I may put it, this is one of the most misused term in the age of social media.   {#152}
[00:09:21] TEACHER: People use distributed systems anywhere.   {#153}
[00:09:24] TEACHER: distributed system. Wait, it's not that simple. So the beauty of distributed system is that   {#154}
[00:09:32] TEACHER: what it gives you, it gives you an ability to abstract out the distributedness of the system.   {#155}
[00:09:41] TEACHER: So that's what a distributed system is. Where for you, it's a single coherent system. Behind the   {#156}
[00:09:47] TEACHER: is a gigantic set or not gigantic but huge set of machines they are doing their like each machine   {#157}
[00:09:54] TEACHER: is doing their job really well but for you for an outsider it's just one single coherent system now   {#158}
[00:10:00] TEACHER: outside is contextual it may be end user it may be some microservice it may be some internal portal   {#159}
[00:10:06] TEACHER: it may be something but for you the complexities of it running on different machine is abstracted   {#160}
[00:10:15] TEACHER: for it, just one single system.   {#161}
[00:10:16] TEACHER: I'll give you an example.   {#162}
[00:10:17] TEACHER: Facebook.com.   {#163}
[00:10:17] TEACHER: For us, it's just one website.   {#164}
[00:10:19] TEACHER: A college kid can think,   {#165}
[00:10:20] TEACHER: I can build Facebook.   {#166}
[00:10:21] TEACHER: But when it comes to scaling,   {#167}
[00:10:23] TEACHER: you realize how many different kinds of services   {#168}
[00:10:25] TEACHER: need to interact with each other   {#169}
[00:10:26] TEACHER: in order to just render a simple home feed.   {#170}
[00:10:30] TEACHER: That's what Distribute Systems is all about.   {#171}
[00:10:32] TEACHER: But much more than that,   {#172}
[00:10:34] TEACHER: the worst part and the best part.   {#173}
[00:10:37] TEACHER: So I'll give a justification to this statement.   {#174}
[00:10:40] TEACHER: So what I feel is   {#175}
[00:10:42] TEACHER: when I was doing this course in my master's   {#176}
[00:10:45] TEACHER: systems are a professor always used to say that you love distributed system for one thing   {#177}
[00:10:50] TEACHER: and you'll hate distributed system for one thing.   {#178}
[00:10:52] TEACHER: And that's exactly, I just, I just basically paraphrased it, but he used to always say   {#179}
[00:10:57] TEACHER: this, he had like published 50, 20 papers and you got in distributed systems.   {#180}
[00:11:03] TEACHER: We learned so much from him, but the, what, what happened here is what he always used   {#181}
[00:11:08] TEACHER: to tell us is that you'll fall in love with distributed systems.   {#182}
[00:11:12] TEACHER: if you understand it well and you will hate distribute systems when you understand it well.   {#183}
[00:11:16] TEACHER: So why so? Because with distribute systems what happens is anything that could go wrong would go   {#184}
[00:11:23] TEACHER: wrong. You can literally think hey this condition would never happen next day that happens next day   {#185}
[00:11:30] TEACHER: your system would go down because if you do not handle this particular scenario where anything   {#186}
[00:11:36] TEACHER: that could go wrong, would go wrong. Basically, basically Murphy's law. Then what happens is   {#187}
[00:11:43] TEACHER: that you are not guaranteeing the correctness of your system.   {#188}
[00:11:48] TEACHER: Imagine while doing a distributed transition things break and data go in an inconsistent   {#189}
[00:11:52] TEACHER: state and you didn't consider it while you're designing. Then you have data corruption,   {#190}
[00:11:58] TEACHER: right? And that's wrong. So this is the worst part of it. When you understand it really well,   {#191}
[00:12:04] TEACHER: you would hate distribute system.   {#192}
[00:12:07] TEACHER: But when you start building one,   {#193}
[00:12:09] TEACHER: you would find it very happy.   {#194}
[00:12:10] TEACHER: Oh, this is the best thing ever   {#195}
[00:12:11] TEACHER: because I can horizontally scale and whatnot.   {#196}
[00:12:13] TEACHER: So that's one thing that you would love also   {#197}
[00:12:15] TEACHER: and hate also for distribute system.   {#198}
[00:12:17] TEACHER: But this is indeed a key idea   {#199}
[00:12:20] TEACHER: through which you should approach   {#200}
[00:12:22] TEACHER: building distribute systems.   {#201}
[00:12:24] TEACHER: Right?   {#202}
[00:12:25] TEACHER: Assume anything and everything would go wrong.   {#203}
[00:12:29] TEACHER: Literally, literally.   {#204}
[00:12:31] TEACHER: And then you see if your code,   {#205}
---- OWNED SEGMENTS END ----

CTX| [00:12:34] TEACHER: system is handling that or not right okay so then enough of this how should we approach so there is   {#206}
CTX| [00:12:42] TEACHER: one thing that i've realized and this is my own so take it with a pinch of salt uh so one thing   {#207}
CTX| [00:12:50] TEACHER: that worked really well for me is whenever i design distribute systems quite a few now and   {#208}
CTX| [00:12:58] TEACHER: like they're truly distributed distributed not just cloud distributed distributed so what work   {#209}
CTX| [00:13:04] TEACHER: extremely well for us is always start with the day zero architecture.   {#210}
CTX| [00:13:09] TEACHER: Always don't over complicate on day zero.   {#211}
CTX| [00:13:12] TEACHER: One machine, one server, one database, one cache.   {#212}
CTX| [00:13:15] TEACHER: That's it.   {#213}
CTX| [00:13:16] TEACHER: Then scale each component independently.   {#214}
CTX| [00:13:18] TEACHER: See how it performs under load, rectify the system, re-architect and repeat.   {#215}
CTX| [00:13:24] TEACHER: This is exactly what you need to do.   {#216}
CTX| [00:13:26] TEACHER: But when you are doing this, when you see how it performs under load,   {#217}
CTX| [00:13:30] TEACHER: it's not just high level that you reflect.   {#218}
CTX| [00:13:32] TEACHER: Those low level details are the ones that are paid points.   {#219}
