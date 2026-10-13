# chunk_11  OWNS 01:56:01 -> 02:07:07  (segments #2015-#2143, 1148 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:55:01] TEACHER: when if it tries to connect and it's not able to connect it would immediately make and resolve   {#1995}
CTX| [01:55:06] TEACHER: another IP address okay I was not aware of this it pulls back and sees another that's a that's a   {#1996}
CTX| [01:55:12] TEACHER: reactive thing if you know you are hurt somewhere would you not immediately go and take an aid there   {#1997}
CTX| [01:55:17] TEACHER: why would you wait for something to happen let's say you have a periodic visit for your tooth aches   {#1998}
CTX| [01:55:22] TEACHER: right you'd say no I'll only visit a dentist only when the time comes but if it's hurting   {#1999}
CTX| [01:55:29] TEACHER: will you not go there? You will.   {#2000}
CTX| [01:55:32] TEACHER: Right. So that's the   {#2001}
CTX| [01:55:34] TEACHER: thing. So if you see that   {#2002}
CTX| [01:55:36] TEACHER: the IP address that I'm trying to   {#2003}
CTX| [01:55:37] TEACHER: resolve, like the IP address that I'm trying to connect is   {#2004}
CTX| [01:55:39] TEACHER: not there, I would explicitly invalidate   {#2005}
CTX| [01:55:42] TEACHER: my cache and make a call to code DNS   {#2006}
CTX| [01:55:44] TEACHER: which fits me another IP address.   {#2007}
CTX| [01:55:46] STUDENT_2: And what if code DNS   {#2008}
CTX| [01:55:47] STUDENT_2: you said code DNS is a private   {#2009}
CTX| [01:55:50] STUDENT_2: infrared, if it   {#2010}
CTX| [01:55:51] STUDENT_2: goes down then how do we resolve?   {#2011}
CTX| [01:55:53] TEACHER: You have multiple code DNS servers running.   {#2012}
CTX| [01:55:55] STUDENT_2: And how do we know that, okay, which code   {#2013}
CTX| [01:55:57] STUDENT_2: DNS to reach out?   {#2014}

---- OWNED SEGMENTS START ----
[01:56:01] TEACHER: That's more interesting.   {#2015}
[01:56:02] TEACHER: So you have a DNS for core DNS.   {#2016}
[01:56:04] TEACHER: So at one step that latency becomes so small that that one server is able to handle that.   {#2017}
[01:56:11] TEACHER: So there is one single point of failure still in a system, which has a standby node.   {#2018}
[01:56:15] TEACHER: That's the base condition of the recursive.   {#2019}
[01:56:18] STUDENT_2: I mean, we do trace route to a domain, right.   {#2020}
[01:56:20] STUDENT_2: And it shows up so many levels of, I mean, 21 levels I've seen to reach Google.com.   {#2021}
[01:56:26] STUDENT_2: So that's common.   {#2022}
[01:56:27] STUDENT_2: There's so many levels in between, right?   {#2023}
[01:56:30] TEACHER: Yeah.   {#2024}
[01:56:31] TEACHER: And every single one of them is horizontally scalable,   {#2025}
[01:56:33] TEACHER: except one,   {#2026}
[01:56:34] TEACHER: which is single point of failure with a standby node.   {#2027}
[01:56:36] TEACHER: And that is so tiny that it can,   {#2028}
[01:56:38] TEACHER: it's very hard for it to go.   {#2029}
[01:56:40] TEACHER: And even if it goes on,   {#2030}
[01:56:41] TEACHER: there is already a standby server running.   {#2031}
[01:56:43] TEACHER: So if it goes on in milliseconds,   {#2032}
[01:56:44] TEACHER: otherwise would basically,   {#2033}
[01:56:46] TEACHER: but in second it would take its place.   {#2034}
[01:56:49] TEACHER: Okay.   {#2035}
[01:56:50] TEACHER: Thank you.   {#2036}
[01:56:52] STUDENT_5: Yeah, Shreeram.   {#2037}
[01:56:55] STUDENT_10: Yeah, let's assume these end users are external users and not internal Microsoft.   {#2038}
[01:57:00] STUDENT_10: So when resolving the name to an IP, why would they use our core DNS?   {#2039}
[01:57:06] STUDENT_10: Isn't the DNS configured in their OS?   {#2040}
[01:57:10] TEACHER: DNS IP address is configured in their OS.   {#2041}
[01:57:13] TEACHER: So they would go to let's say Route 53 or the, I don't know the GCPs one, but it goes   {#2042}
[01:57:20] TEACHER: to public DNS server.   {#2043}
[01:57:23] TEACHER: it goes to public DNS server and not a private DNS server.   {#2044}
[01:57:27] STUDENT_10: Yeah. In that case, how would our core DNS be useful for them?   {#2045}
[01:57:31] TEACHER: No, then you are making your LB server public, right?   {#2046}
[01:57:35] TEACHER: Then you're making LB server, then this does not come into the picture.   {#2047}
[01:57:39] TEACHER: If you're making it public, then this does not come into picture.   {#2048}
[01:57:43] TEACHER: Okay.   {#2049}
[01:57:44] TEACHER: Then this instead of this becoming private, it becomes public.   {#2050}
[01:57:48] TEACHER: Anyone can talk to it. It's like how you configure your Microsoft is,   {#2051}
[01:57:54] TEACHER: That's a public DNS resolution, not a primary DNS resolution.   {#2052}
[01:57:58] STUDENT_10: So in that case, if we are adding new LB servers, then the public DNS will have to be updated.   {#2053}
[01:58:05] TEACHER: Kind of yes.   {#2054}
[01:58:06] TEACHER: I cannot reveal those part because it's very proprietary.   {#2055}
[01:58:09] TEACHER: I know some parts of it, but think of it like kind of that there is one intermediate proxy   {#2056}
[01:58:15] TEACHER: layer that sits in between that takes care of that.   {#2057}
[01:58:17] TEACHER: I still have not covered seven different layers that cover it would make this highly complex   {#2058}
[01:58:23] TEACHER: but there are different layers in which resolution happens.   {#2059}
[01:58:26] TEACHER: There is still a domain name assigned to every LB server.   {#2060}
[01:58:29] TEACHER: It may just not be in the public space.   {#2061}
[01:58:32] TEACHER: It is an intermediate phase in between.   {#2062}
[01:58:34] TEACHER: You read that paper, Maglev, you will understand what I'm talking about.   {#2063}
[01:58:37] TEACHER: Read that paper.   {#2064}
[01:58:38] TEACHER: In case there's a question, more than happy to answer it in basically coming weeks.   {#2065}
[01:58:42] TEACHER: But I just don't want to make overly complex design discussion.   {#2066}
[01:58:46] TEACHER: People would kill me for that.   {#2067}
[01:58:49] TEACHER: But more than happy to discuss it in coming.   {#2068}
[01:58:51] TEACHER: So first read that paper.   {#2069}
[01:58:53] TEACHER: In case you still don't get an answer, I'll give you that.   {#2070}
[01:58:57] STUDENT_1: Okay.   {#2071}
[01:58:59] STUDENT_1: Heyman.   {#2072}
[01:59:01] STUDENT_5: Yeah.   {#2073}
[01:59:02] STUDENT_5: So here you gave one domain name for one service as an example, it'll be dot payments dot.   {#2074}
[01:59:08] STUDENT_5: Let's say there are multiple services each with a different name and will every LB server   {#2075}
[01:59:13] STUDENT_5: be load balancing for all the services that.   {#2076}
[01:59:16] TEACHER: No, that's a different, right?   {#2077}
[01:59:18] TEACHER: Load.   {#2078}
[01:59:18] TEACHER: What is load balancer?   {#2079}
[01:59:19] TEACHER: It's balancing across homogeneous set of servers.   {#2080}
[01:59:22] TEACHER: Right.   {#2081}
[01:59:23] TEACHER: This is not an API gateway.   {#2082}
[01:59:25] TEACHER: This is a load balancer.   {#2083}
[01:59:26] TEACHER: It is balancing across homogenous.   {#2084}
[01:59:27] TEACHER: So other service would have other load balancer, other LB servers.   {#2085}
[01:59:31] TEACHER: Okay.   {#2086}
[01:59:32] TEACHER: Right.   {#2087}
[01:59:33] TEACHER: And all of those would have its own entries in code DNS.   {#2088}
[01:59:36] TEACHER: Got it.   {#2089}
[01:59:37] TEACHER: Sure.   {#2090}
[01:59:38] TEACHER: Thanks.   {#2091}
[01:59:39] TEACHER: Okay.   {#2092}
[01:59:39] TEACHER: Folks, we'll take a break.   {#2093}
[01:59:40] TEACHER: It's 11 already.   {#2094}
[01:59:41] TEACHER: We'll take five minutes break.   {#2095}
[01:59:42] TEACHER: I'll take questions at the end.   {#2096}
[01:59:44] TEACHER: Uh, no, no problem there.   {#2097}
[01:59:46] TEACHER: Uh, when we come back from the break, we'll take five minutes.   {#2098}
[01:59:48] TEACHER: We'll sing back at 11 of five.   {#2099}
[01:59:50] TEACHER: And then we talk about remote locks, right?   {#2100}
[01:59:51] TEACHER: Remote locks and distributed locks.   {#2101}
[01:59:53] TEACHER: big discussion anyway but i do and obviously even if it's stretched it's okay uh i would   {#2102}
[01:59:58] TEACHER: not compromise on quality at all i want all of you to understand the intuition rather than just   {#2103}
[02:00:03] TEACHER: mugging things up uh so we'll go in depth of remote locks as well distributed locks as well   {#2104}
[02:00:08] TEACHER: exactly how i covered in other cohorts more than that actually this was the best discussion of load   {#2105}
[02:00:13] TEACHER: balancer i had really in depth didn't skip a thing there but uh we'll take a break for five minutes   {#2106}
[02:00:19] TEACHER: we'll see back at 11 of 5 and talk about remote locks and distributed locks and where to be in   {#2107}
[02:00:23] TEACHER: time okay see you folks in five minutes   {#2108}
[02:04:27] TEACHER: Thank you.   {#2109}
[02:04:59] TEACHER: Okay, let's start with the second half for today, half in second, fifth of today.   {#2110}
[02:05:06] TEACHER: So it's not done, fifth, fifth of today.   {#2111}
[02:05:09] TEACHER: Okay, remote locks, distribute locks.   {#2112}
[02:05:12] TEACHER: This is one of the most important things in distributed systems   {#2113}
[02:05:16] TEACHER: because it's the one that ensures, as I said,   {#2114}
[02:05:20] TEACHER: ensures the correctness and consistency of data.   {#2115}
[02:05:23] TEACHER: So remote locks, you typically would have heard of something called as a lock manager.   {#2116}
[02:05:28] TEACHER: Now, lock manager is a remote machine that acts as a lock manager   {#2117}
[02:05:32] TEACHER: which keeps track, hey, which item is locked by which machine   {#2118}
[02:05:35] TEACHER: so that it can do the coordination that, hey, because this item is locked,   {#2119}
[02:05:40] TEACHER: you cannot do this part.   {#2120}
[02:05:42] TEACHER: airline jengen system we logged some rows for others to not even that others cannot even read   {#2121}
[02:05:50] TEACHER: them we took exclusive law somewhere in the memory of the database it was stored that this lock this   {#2122}
[02:05:59] TEACHER: row is locked by this transaction now there everything was in one machine one process so it   {#2123}
[02:06:06] TEACHER: It was just memory, memory, updations, right?   {#2124}
[02:06:10] TEACHER: But now with this distributed things in place, instead of having one process, you have multiple   {#2125}
[02:06:16] TEACHER: machines within which they need to coordinate.   {#2126}
[02:06:19] TEACHER: So that is why you need to have a remote lock manager that does that.   {#2127}
[02:06:23] TEACHER: Now, let me take you through a journey over here, not a story story, but simple things   {#2128}
[02:06:30] TEACHER: to think about in our database or in airline checking system, there were multiple transactions.   {#2129}
[02:06:36] TEACHER: Think about it.   {#2130}
[02:06:37] TEACHER: Each transaction is a thread.   {#2131}
[02:06:39] TEACHER: Right.   {#2132}
[02:06:39] TEACHER: So what we saw there.   {#2133}
[02:06:41] TEACHER: When there were multiple threads.   {#2134}
[02:06:43] TEACHER: And we wanted to synchronize between them.   {#2135}
[02:06:45] TEACHER: Where one takes lock on something.   {#2136}
[02:06:47] TEACHER: Other cannot do that.   {#2137}
[02:06:49] TEACHER: But that part was basically stored in memory.   {#2138}
[02:06:53] TEACHER: Because multiple threads synchronizes through an in-memory thing.   {#2139}
[02:06:58] TEACHER: Mutex, SimaPur, explicit locking, atomic instructions, whatnot.   {#2140}
[02:07:02] TEACHER: Right.   {#2141}
[02:07:03] TEACHER: Because what is common between multiple threads?   {#2142}
[02:07:05] TEACHER: RAM.   {#2143}
---- OWNED SEGMENTS END ----

CTX| [02:07:07] TEACHER: Now, what if I want to synchronize two processes?   {#2144}
CTX| [02:07:10] TEACHER: For example, when a process is running and doing processing of one thing, other process   {#2145}
CTX| [02:07:17] TEACHER: cannot do that.   {#2146}
CTX| [02:07:18] TEACHER: I'll give an example.   {#2147}
CTX| [02:07:19] TEACHER: apt-get upgrade.   {#2148}
CTX| [02:07:20] TEACHER: If you have ever used Ubuntu, most of you would have.   {#2149}
CTX| [02:07:24] TEACHER: In order to install packages on Ubuntu or upgrade packages on Ubuntu, you fire sudo apt-get   {#2150}
CTX| [02:07:29] TEACHER: update or apt-get upgrade.   {#2151}
CTX| [02:07:31] TEACHER: When you open this in two different terminal and you run apt-get update.   {#2152}
CTX| [02:07:36] TEACHER: I used to always wonder why that's not working.   {#2153}
CTX| [02:07:38] TEACHER: Right.   {#2154}
CTX| [02:07:39] TEACHER: So I thought running on two terminals would make it faster.   {#2155}
CTX| [02:07:42] TEACHER: So I used to do that, but what did you used to give me error?   {#2156}
CTX| [02:07:45] TEACHER: I'm talking way back in 2008 and 2009.   {#2157}
CTX| [02:07:48] TEACHER: So I got first year college.   {#2158}
CTX| [02:07:50] TEACHER: We just got introduced to Ubuntu and we learned how to install packages.   {#2159}
CTX| [02:07:55] TEACHER: So BIM and water cover and the package used to install,   {#2160}
CTX| [02:07:58] TEACHER: Moo and cat and something, something is probably used to do that.   {#2161}
CTX| [02:08:01] TEACHER: So when I used to do APT, get updated, upgrade stuff.   {#2162}
CTX| [02:08:06] TEACHER: I thought that if I open multiple terminals and run apt-get upgrade on both sides, it   {#2163}
