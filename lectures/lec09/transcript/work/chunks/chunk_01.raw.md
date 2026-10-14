# chunk_01  OWNS 00:00:02 -> 00:11:10  (segments #0-#168, 1899 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

[00:00:02] TEACHER: Great week 4, day 1st, it's about social networks. The idea for today is we understand how real social networks are built. Dappe dappe, boxes, boxes, my toy or kit can draw. What happens when we go deeper into it? A lot of things will be busted when we discuss this hashtag survey. It's such a simple problem, state material, what's so complicated? We are not even going to talk about scale here, but it would   {#0}
[00:00:30] TEACHER: still blow your mind how just going a level deep into designing a system,   {#1}
[00:00:35] TEACHER: thinking about implementation just helps you uncover the hidden components of it.   {#2}
[00:00:43] TEACHER: We'll talk about that.   {#3}
[00:00:45] TEACHER: We'll spend time talking about how CDN works and not try random BGP protocol and all.   {#4}
[00:00:50] TEACHER: No, actual from an engineer's perspective, if you're using CDN as black box,   {#5}
[00:00:55] TEACHER: we'll not go into internals of CDN, but if you're using CDN as black box,   {#6}
[00:01:00] TEACHER: because we are not going to build Akamai or Cloudflare from scratch.   {#7}
[00:01:03] TEACHER: But what we would definitely would want to do is how to use it effectively.   {#8}
[00:01:08] TEACHER: We'll touch upon that.   {#9}
[00:01:09] TEACHER: And we'll start with Instagram's year one architecture.   {#10}
[00:01:12] TEACHER: So just want to tell some kind of story   {#11}
[00:01:14] TEACHER: that would help you keep an eye on next upcoming technology.   {#12}
[00:01:17] TEACHER: So what happens is every few years, there comes a revolutionary tech stack.   {#13}
[00:01:23] TEACHER: Everyone jumps onto that bandwagon.   {#14}
[00:01:25] TEACHER: And it's very easy to spot.   {#15}
[00:01:28] TEACHER: For example, in the year 2008, 2009, 2010, 2011,   {#16}
[00:01:34] TEACHER: these four years, you would see any company   {#17}
[00:01:37] TEACHER: that was built in this time, in this phase,   {#18}
[00:01:40] TEACHER: they all had PHP-based stacks.   {#19}
[00:01:43] TEACHER: Every single one, PHP, MySQL, PHP, MySQL, Memcache,   {#20}
[00:01:47] TEACHER: every single one of them.   {#21}
[00:01:49] TEACHER: Why? Because Facebook did it.   {#22}
[00:01:52] TEACHER: Because Facebook was the first company,   {#23}
[00:01:54] TEACHER: or rather, was company that saw massive growth.   {#24}
[00:01:58] TEACHER: said, Hey, this company is doing this massive growth.   {#25}
[00:02:01] TEACHER: What kind of architecture do they have?   {#26}
[00:02:02] TEACHER: What kind of tech stack are they following?   {#27}
[00:02:04] TEACHER: And every single one controls, we control with their tech stack and build companies   {#28}
[00:02:09] TEACHER: with PHP, MySQL and whatnot, right?   {#29}
[00:02:12] TEACHER: That exact same tech stack.   {#30}
[00:02:13] TEACHER: So pick any company from the year of 2008 to 2011, 2012, you'll always see PHP, MySQL.   {#31}
[00:02:19] TEACHER: People who were in college at the time, I was in college at that time.   {#32}
[00:02:22] TEACHER: We were all taught PHP, MySQL, LAP, STEC and whatnot.   {#33}
[00:02:25] TEACHER: It was all that.   {#34}
[00:02:28] TEACHER: company Instagram. Instagram they saw huge amount of users in the first year. In one year with three   {#35}
[00:02:34] TEACHER: engineers they had 14 million users on their platform. Insane, insane at that time. So given   {#36}
[00:02:42] TEACHER: that everyone asks hey what was the tech stack which is why you see every company starting after 2012   {#37}
[00:02:48] TEACHER: having tech stack like this. It's very evident pick any startup in India especially in India.   {#38}
[00:02:54] TEACHER: You would see this tech stack very prevalent.   {#39}
[00:02:57] TEACHER: And Django in backend, Celery as an asynchronous processor,   {#40}
[00:03:01] TEACHER: OneQ with a RabbitMQ or Redis to do this distributed processing,   {#41}
[00:03:04] TEACHER: like to do that message passing and asynchronous processing.   {#42}
[00:03:09] TEACHER: Redis has a cache, what transactional DB, what non-relational DB.   {#43}
[00:03:13] TEACHER: This is exactly what Instagram, this was their architecture at the end of year one.   {#44}
[00:03:18] TEACHER: This exactly was their architecture at the end of their year one.   {#45}
[00:03:21] TEACHER: All hosted on AWS because by that time, AWS had pretty decent offerings of AWS.   {#46}
[00:03:26] TEACHER: They leveraged it and this was their tech stack.   {#47}
[00:03:30] TEACHER: So always remember, always, always, always remember, there will always come one company   {#48}
[00:03:36] TEACHER: that would see a massive growth.   {#49}
[00:03:38] TEACHER: Everyone will keep on asking, Hey, what's their tech stack?   {#50}
[00:03:41] TEACHER: They reveal their tech stack and everyone, every single company starting after that will   {#51}
[00:03:45] TEACHER: jump on that or will jump on the bandwagon.   {#52}
[00:03:48] TEACHER: No one will think out of the box that, hey, do we really need this or not?   {#53}
[00:03:52] TEACHER: If they did it, we can also do the same thing.   {#54}
[00:03:55] TEACHER: And that exactly what happens.   {#55}
[00:03:58] TEACHER: So 2008 to 2012, Facebook made PHP MySQL famous.   {#56}
[00:04:01] TEACHER: Instagram made this above architecture famous.   {#57}
[00:04:04] TEACHER: You would always say this is where you see those six components   {#58}
[00:04:06] TEACHER: that we discussed in the first week.   {#59}
[00:04:09] TEACHER: Caching, database, communication, asynchronous processing,   {#60}
[00:04:13] TEACHER: scaling, every single thing.   {#61}
[00:04:15] TEACHER: And now we are due for a new tech stack, FYI, because it has been a very long time, 10, 11 years that we have revamped our tech stack.   {#62}
[00:04:24] TEACHER: It is a due time.   {#63}
[00:04:26] TEACHER: In one or two years or rather five years, like within the next five years, a new tech stack will come in, maybe based on Rust.   {#64}
[00:04:34] TEACHER: Then maybe everyone started building using Rust.   {#65}
[00:04:37] TEACHER: Golang was supposed to be that, but Golang failed to capture the market.   {#66}
[00:04:40] TEACHER: It's still going strong, but it's still not the default choice   {#67}
[00:04:44] TEACHER: when it comes to day zero architectures.   {#68}
[00:04:46] TEACHER: So there will come a language, there will come a tech stack,   {#69}
[00:04:49] TEACHER: there will come a set of libraries that are making those things simpler.   {#70}
[00:04:53] TEACHER: I am just keeping an eye on it.   {#71}
[00:04:54] TEACHER: So do that, keep an eye on whenever a company sees them.   {#72}
[00:04:59] TEACHER: Obviously, one of the recent companies that have done it is ChatGPT.   {#73}
[00:05:02] TEACHER: But ChatGPT is an AI-based company.   {#74}
[00:05:05] TEACHER: Back-end, it's all going to be Python and whatnot,   {#75}
[00:05:07] TEACHER: that same tech stack there.   {#76}
[00:05:10] TEACHER: come and obviously we might not foresee we might see what else do we need now same thing facebook   {#77}
[00:05:15] TEACHER: like the company started in 2008 to 2000 and they also thought of the same thing but instagram   {#78}
[00:05:20] TEACHER: made it differently same thing will happen so just keep an eye on that and this is how you   {#79}
[00:05:27] TEACHER: you basically you basically are in the hot seat you are ahead of the folks you are ahead in building   {#80}
[00:05:34] TEACHER: and it's and obviously if you are just working in a company and then doing it then whatever   {#81}
[00:05:37] TEACHER: text that you have, you have it. But keeping an eye on it makes you wonder that how startups have   {#82}
[00:05:44] TEACHER: this very invincible power. They have this very nice power of being vulnerable yet invincible   {#83}
[00:05:51] TEACHER: because they can move fast and break things. I'm not a big fan of it, but it works. It works.   {#84}
[00:05:57] TEACHER: Okay. So that's it. Now, before we jump into designing two systems, what I want to spend   {#85}
[00:06:02] TEACHER: time on is talking about how CDN works. A lot of people, a lot, a lot, unfortunately, a lot of   {#86}
[00:06:08] TEACHER: people don't know how CDN works. I'm not going to the BGP protocols and stuff. I can do a deep   {#87}
[00:06:12] TEACHER: dive on it later, but we cannot talk about that. But what we'll talk about is how, what exactly   {#88}
[00:06:19] TEACHER: CDN and how it works, how this one building block changes almost every single public facing system   {#89}
[00:06:27] TEACHER: out there and how it beautifully fits into the scheme of things.   {#90}
[00:06:31] TEACHER: How this simple idea is changing a lot of things for us.   {#91}
[00:06:35] TEACHER: Okay.   {#92}
[00:06:35] TEACHER: So the way CDN works is that it transparently sits between your user and your origin.   {#93}
[00:06:43] TEACHER: Origin is a generic term.   {#94}
[00:06:45] TEACHER: A lot of people only think, hey, CDN is there just to cache things.   {#95}
[00:06:49] TEACHER: But how?   {#96}
[00:06:50] TEACHER: No, I'll push things to CDN.   {#97}
[00:06:53] TEACHER: CDN is not something where you push things.   {#98}
[00:06:55] TEACHER: Although now they offer APIs, but that's not their main motive.   {#99}
[00:06:58] TEACHER: So what CDN does, it transparently sits between your user and your origin.   {#100}
[00:07:05] TEACHER: What do you mean when I say transparently?   {#101}
[00:07:07] TEACHER: Origin is where your origin is, which means where either your S3 bucket, either your backend   {#102}
[00:07:14] TEACHER: server, anything, literally anything that you want to be served via your CDN, it sits   {#103}
[00:07:21] TEACHER: in the origin.   {#104}
[00:07:22] TEACHER: Now, origin needs to be publicly accessible.   {#105}
[00:07:26] TEACHER: You can apply some security policies there.   {#106}
[00:07:29] TEACHER: And depending on the CDN that you are using, you can find those things.   {#107}
[00:07:32] TEACHER: But the idea is, imagine as a very simple example,   {#108}
[00:07:37] TEACHER: imagine origin to be anything that you want to be cached on CDN.   {#109}
[00:07:42] TEACHER: For example, let's say I configure my origin to be my own website, arpitpani.me.   {#110}
[00:07:49] TEACHER: If that is my origin and I want some parts of my website to be served via CDN, for example,   {#111}
[00:07:56] TEACHER: images.   {#112}
[00:07:57] TEACHER: So what I would do is I would configure my origin to be arpitbhani.me.   {#113}
[00:08:01] TEACHER: So that is my origin.   {#114}
[00:08:04] TEACHER: And there is some path that returns some path on arpitbhani.me that returns, let's say,   {#115}
[00:08:13] TEACHER: a JSON, some bytes, some image, some HTML, some video, anything.   {#116}
[00:08:16] TEACHER: But let's say for the simplicity, what everyone would resonate with, that's an image.   {#117}
[00:08:20] TEACHER: Let's say that image's path is arpidhani.me slash systemdesign slash logo.png.   {#118}
[00:08:27] TEACHER: So this is that image path.   {#119}
[00:08:29] TEACHER: Now what happens when someone hits this image path in the browser?   {#120}
[00:08:36] TEACHER: What would happen?   {#121}
[00:08:37] TEACHER: This URL, when someone hits this URL, arpidhani.me's domain name will be resolved to an IP address,   {#122}
[00:08:46] TEACHER: resolution would happen. Which IP address would it resolve to? It would resolve to origins IP   {#123}
[00:08:51] TEACHER: address like this IP address where my actual server is hosted. Right. So arvidbari.me resolves   {#124}
[00:08:58] TEACHER: to this load balancer. For example, request comes to the load balancer. It forwards it to one of the   {#125}
[00:09:03] TEACHER: backend servers. In one of the backend servers, it says, Hey, this is the path. The system design   {#126}
[00:09:07] TEACHER: service logo.pg. Hey, what I need to do? I need to serve this path to the user. It goes to the   {#127}
[00:09:11] TEACHER: reads the image and sends it back to the user.   {#128}
[00:09:13] TEACHER: Right?   {#129}
[00:09:14] TEACHER: So when I'm passing this thing, when I'm hitting this URL,   {#130}
[00:09:18] TEACHER: what is happening is the request is going here.   {#131}
[00:09:21] TEACHER: It is sending the response.   {#132}
[00:09:22] TEACHER: But now if we closely look, when the request,   {#133}
[00:09:26] TEACHER: I'm making Dorpidmany.me, it is going to my backend server.   {#134}
[00:09:30] TEACHER: So the bandwidth of my backend server is getting consumed   {#135}
[00:09:34] TEACHER: for something which is almost static images.   {#136}
[00:09:38] TEACHER: How frequently would they change?   {#137}
[00:09:40] TEACHER: Not really.   {#138}
[00:09:41] TEACHER: Once it's there, it's near static data.   {#139}
[00:09:44] TEACHER: Second, it's huge amount of data images,   {#140}
[00:09:46] TEACHER: 1MB, 2MB, 3MB, 5MB, 10MB images you are serving.   {#141}
[00:09:50] TEACHER: Now imagine transferring, consuming 10MB worth of bandwidth   {#142}
[00:09:54] TEACHER: of your API servers.   {#143}
[00:09:55] TEACHER: That's a crime.   {#144}
[00:09:56] TEACHER: You want your API servers to be lean and fast.   {#145}
[00:09:59] TEACHER: So what do you do?   {#146}
[00:10:01] TEACHER: You say that, hey, instead of my backend server   {#147}
[00:10:04] TEACHER: doing the transfer of data,   {#148}
[00:10:06] TEACHER: what if some other thing takes care of that?   {#149}
[00:10:10] TEACHER: What if that other thing distributes it geographically?   {#150}
[00:10:13] TEACHER: Now that is an advantage.   {#151}
[00:10:14] TEACHER: For example, if I have a server, this server is sitting in let's say Singapore and someone   {#152}
[00:10:20] TEACHER: from the US is trying to access it.   {#153}
[00:10:22] TEACHER: Transferring 10 MB of image to US will slow things down.   {#154}
[00:10:25] TEACHER: What if the 10 MB image is cached near to that user?   {#155}
[00:10:28] TEACHER: That is exactly what CDN is.   {#156}
[00:10:30] TEACHER: So what CDN is doing is it is sitting transparently between your user and origin.   {#157}
[00:10:34] TEACHER: But now how?   {#158}
[00:10:35] TEACHER: How is CDN actually configured?   {#159}
[00:10:39] TEACHER: CDN is configured.   {#160}
[00:10:40] TEACHER: So when you, and I would highly, highly, highly recommend   {#161}
[00:10:44] TEACHER: log into any of the CDN, sign up for a free trial   {#162}
[00:10:48] TEACHER: and configure it on your own.   {#163}
[00:10:50] TEACHER: Nothing beats practical experience.   {#164}
[00:10:53] TEACHER: Sign up for Akamai Cloudflare, pick your favorite CDN   {#165}
[00:10:56] TEACHER: and configure it.   {#166}
[00:10:58] TEACHER: It just, you'd say that, or even AWS Cloudflare,   {#167}
[00:11:02] TEACHER: whenever you go to a CDN, all it asks for this one origin URL,   {#168}
---- OWNED SEGMENTS END ----

CTX| [00:11:10] TEACHER: done and then it just seamlessly works.   {#169}
CTX| [00:11:14] TEACHER: So we'll talk about how that happens.   {#170}
CTX| [00:11:15] TEACHER: Right.   {#171}
CTX| [00:11:16] TEACHER: But what we want to do at the moment is this part, which is near static, huge in size.   {#172}
CTX| [00:11:23] TEACHER: I want to serve it via CDN.   {#173}
CTX| [00:11:24] TEACHER: So what do I do?   {#174}
CTX| [00:11:25] TEACHER: When I log into a CDN provider, let's say cloud player, pick your favorite.   {#175}
CTX| [00:11:31] TEACHER: You are asked to provide a mapping.   {#176}
CTX| [00:11:34] TEACHER: This mapping is your CDN URL.   {#177}
CTX| [00:11:39] TEACHER: for your website, not really just the website, but a CDN property, they call it.   {#178}
CTX| [00:11:44] TEACHER: So this is your subdomain on mycdn.net.   {#179}
CTX| [00:11:47] TEACHER: So let's say mycdn.net is the provider after my cloud or anything.   {#180}
CTX| [00:11:51] TEACHER: So a.mycdn.net is yours.   {#181}
CTX| [00:11:54] TEACHER: In this, you can provide a specific origin.   {#182}
CTX| [00:11:57] TEACHER: So what did you provide as an origin?   {#183}
CTX| [00:12:00] TEACHER: Artitani.me.   {#184}
CTX| [00:12:02] TEACHER: This is the mapping that you configure on CDN that, Hey, this is my CDN property.   {#185}
CTX| [00:12:06] TEACHER: a.mycedient.net mapped with arpitbany.me.   {#186}
