# chunk_03  OWNS 00:26:38 -> 00:38:20  (segments #440-#644, 1921 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:25:39] TEACHER: Like highly, highly, highly, highly recommended to read this.   {#420}
CTX| [00:25:43] TEACHER: Right?   {#421}
CTX| [00:25:43] TEACHER: Okay.   {#422}
CTX| [00:25:44] TEACHER: Okay.   {#423}
CTX| [00:25:45] TEACHER: Up until now.   {#424}
CTX| [00:25:45] TEACHER: Any questions?   {#425}
CTX| [00:25:48] TEACHER: We just discussed computing, but just wanted to answer that.   {#426}
CTX| [00:25:50] TEACHER: I just don't blabber for a very long time.   {#427}
CTX| [00:25:53] TEACHER: Any questions up until stage?   {#428}
CTX| [00:25:56] TEACHER: Yeah, Ajay.   {#429}
CTX| [00:26:00] STUDENT_1: So when we do like select and we specify column, so does it, does it treat all the columns?   {#430}
CTX| [00:26:08] TEACHER: It reads all the columns from the desk.   {#431}
CTX| [00:26:11] TEACHER: Yeah.   {#432}
CTX| [00:26:11] TEACHER: From the disk, it reads all the columns, picks out the ones that you need.   {#433}
CTX| [00:26:14] TEACHER: I just sense it to you.   {#434}
CTX| [00:26:17] TEACHER: So the disk is still gone and reading all the columns in row oriented databases, but   {#435}
CTX| [00:26:22] TEACHER: in column oriented databases, it does not because think of it as separate files.   {#436}
CTX| [00:26:26] TEACHER: Like that's the easiest way to think about.   {#437}
CTX| [00:26:28] TEACHER: You don't even waste time reading the columns that you don't need.   {#438}
CTX| [00:26:34] STUDENT_3: Yeah.   {#439}

---- OWNED SEGMENTS START ----
[00:26:38] STUDENT_3: One minor drawback that I see for column oriented databases is that   {#440}
[00:26:42] STUDENT_3: insertion would be too heavy.   {#441}
[00:26:44] STUDENT_3: Yes.   {#442}
[00:26:45] TEACHER: You get some, you lose some.   {#443}
[00:26:47] TEACHER: Yeah.   {#444}
[00:26:48] TEACHER: Right.   {#445}
[00:26:48] TEACHER: But it's okay.   {#446}
[00:26:50] TEACHER: Given the benefits.   {#447}
[00:26:51] TEACHER: So which is why you never see these as a primary databases.   {#448}
[00:26:55] TEACHER: These are typically analytics workloads.   {#449}
[00:26:56] TEACHER: So that the additional databases is different.   {#450}
[00:26:58] TEACHER: synchronous job that ingest data into your data warehouse.   {#451}
[00:27:02] TEACHER: So data warehouse is never your primary copy of the data.   {#452}
[00:27:04] TEACHER: Correct.   {#453}
[00:27:05] TEACHER: The traditional databases are always different.   {#454}
[00:27:07] TEACHER: MySQL, PostgreSQL, MongoDB, DynamoDB and what more.   {#455}
[00:27:10] TEACHER: From there you move data into a column oriented database.   {#456}
[00:27:13] TEACHER: Right.   {#457}
[00:27:14] TEACHER: Just to power the raw analytics.   {#458}
[00:27:20] STUDENT_4: So what is the space comparison between row oriented databases versus   {#459}
[00:27:24] STUDENT_4: column oriented databases?   {#460}
[00:27:26] TEACHER: Great question.   {#461}
[00:27:28] TEACHER: you can so heavily compress this because it's a homogeneous data, right?   {#462}
[00:27:34] TEACHER: Because for example, if I'm talking about timestamp over here,   {#463}
[00:27:39] TEACHER: now timestamp would be, would not be continuous values,   {#464}
[00:27:42] TEACHER: would be almost discrete values.   {#465}
[00:27:44] TEACHER: You can very heavily compress them.   {#466}
[00:27:46] TEACHER: So you would require much lower space when you're storing data   {#467}
[00:27:50] TEACHER: in a collaborative database because of high compression ratios   {#468}
[00:27:53] TEACHER: that you would get.   {#469}
[00:27:54] TEACHER: But in raw oriented databases, because data is heterogeneous,   {#470}
[00:27:58] TEACHER: that much of a benefit.   {#471}
[00:27:59] TEACHER: You can still have compression, but not that.   {#472}
[00:28:02] TEACHER: But color-oriented databases can be very, very, very heavily   {#473}
[00:28:05] TEACHER: compressed, very heavily compressed.   {#474}
[00:28:06] TEACHER: And if I tell you a factor, 29x is a normal gain that I'm seeing.   {#475}
[00:28:12] STUDENT_4: Yeah.   {#476}
[00:28:13] STUDENT_4: Can you elaborate on compression?   {#477}
[00:28:14] STUDENT_4: How data can be compressed here?   {#478}
[00:28:16] TEACHER: Because this is homogeneous.   {#479}
[00:28:17] TEACHER: For example, imagine symbol, symbol, Apple, Google, APP, LG,   {#480}
[00:28:22] TEACHER: 00, right?   {#481}
[00:28:23] TEACHER: You see these symbols.   {#482}
[00:28:25] TEACHER: There are discrete values of it.   {#483}
[00:28:29] TEACHER: when it comes to compression,   {#484}
[00:28:31] TEACHER: you can just   {#485}
[00:28:33] TEACHER: store it in one byte   {#486}
[00:28:35] TEACHER: because you are heavily   {#487}
[00:28:37] TEACHER: not one byte, but we say four byte.   {#488}
[00:28:39] TEACHER: Just one value represent.   {#489}
[00:28:41] TEACHER: Although you are adding G, O, O, G,   {#490}
[00:28:43] TEACHER: you can just represent   {#491}
[00:28:44] TEACHER: rather Google, Apple and whatnot.   {#492}
[00:28:46] TEACHER: You can get very heavy compression because it is homogeneous data   {#493}
[00:28:49] TEACHER: because there is not much variation   {#494}
[00:28:51] TEACHER: in that.   {#495}
[00:28:52] TEACHER: So Huffman compression works well.   {#496}
[00:28:55] TEACHER: Snappy compression works really well.   {#497}
[00:28:56] TEACHER: LZ compression works really well.   {#498}
[00:28:58] TEACHER: Because data is very homogeneous because it's not that you have string   {#499}
[00:29:03] TEACHER: and then somewhere it's an integer and then there's a huge string and something.   {#500}
[00:29:06] TEACHER: It's all very similar data.   {#501}
[00:29:08] TEACHER: For example, if I was talking about Xgen, it would be like five or six different values.   {#502}
[00:29:14] TEACHER: Just represent it in one byte.   {#503}
[00:29:16] TEACHER: And your engine does that for you.   {#504}
[00:29:18] TEACHER: You can just pass in the normal string that you are passing, but internally,   {#505}
[00:29:22] TEACHER: it can very heavily compress the data.   {#506}
[00:29:24] TEACHER: So you get superb gains over it.   {#507}
[00:29:27] TEACHER: Read about run length encoding once.   {#508}
[00:29:30] STUDENT_4: Okay.   {#509}
[00:29:31] STUDENT_4: Another question is, I think cloud providers charge NoSQL databases, read write operations   {#510}
[00:29:38] STUDENT_4: based charge, right?   {#511}
[00:29:39] STUDENT_4: So these are many read operations, these many like write operations.   {#512}
[00:29:42] STUDENT_4: So color-oriented databases also same?   {#513}
[00:29:45] TEACHER: No, color-oriented databases continuously run.   {#514}
[00:29:48] TEACHER: So you have to pre-provision the capacity that you need.   {#515}
[00:29:52] TEACHER: It's not like obviously you're charged IOPS, but not for every operation.   {#516}
[00:29:56] TEACHER: It's not on demand pricing.   {#517}
[00:29:57] TEACHER: You pay for the servers that you are running.   {#518}
[00:30:01] STUDENT_4: It's a reserved capacity.   {#519}
[00:30:03] TEACHER: It's a reserved capacity.   {#520}
[00:30:04] TEACHER: Yeah, there you may put it better.   {#521}
[00:30:05] STUDENT_4: Correct.   {#522}
[00:30:06] STUDENT_4: Thank you.   {#523}
[00:30:07] TEACHER: Sure.   {#524}
[00:30:08] TEACHER: Okay.   {#525}
[00:30:09] TEACHER: Let's move to one of the most misunderstood database out there.   {#526}
[00:30:14] TEACHER: Graph databases.   {#527}
[00:30:15] TEACHER: Now, graph databases.   {#528}
[00:30:18] TEACHER: Now, this is where I want to talk about some really interesting things about.   {#529}
[00:30:21] TEACHER: Now, graph databases.   {#530}
[00:30:23] TEACHER: Like, if I ask you this.   {#531}
[00:30:26] TEACHER: let's model like let's build our twitter and follow following relationship you would always   {#532}
[00:30:32] TEACHER: think hey let me use graph databases to start follow following relationship i'll have user   {#533}
[00:30:37] TEACHER: node i'll have relations because you can visualize it as a graph which is where you think hey   {#534}
[00:30:45] TEACHER: graph databases but they might not be the best choice so graph databases are a literal graph   {#535}
[00:30:52] TEACHER: data structure that we did in college data structures and algorithms course just move   {#536}
[00:30:57] TEACHER: that exact same adjacency list representation in so and expose data apis out of it and that   {#537}
[00:31:04] TEACHER: became graph database the graph databases they literally store adjacency list representation   {#538}
[00:31:09] TEACHER: that we all started as is nothing special those like these databases they are specialized   {#539}
[00:31:17] TEACHER: in graph algorithms.   {#540}
[00:31:21] TEACHER: Now graph algorithms, sophisticated graph algorithms.   {#541}
[00:31:24] TEACHER: For example, I'll give you one example.   {#542}
[00:31:26] TEACHER: LinkedIn, when you open, you go to a person profile,   {#543}
[00:31:28] TEACHER: it shows you how far of a collision it is.   {#544}
[00:31:30] TEACHER: First, second, third, fourth.   {#545}
[00:31:32] TEACHER: That is a sophisticated graph algorithm.   {#546}
[00:31:34] TEACHER: Another example is modeling social behaviors and recommendations.   {#547}
[00:31:38] TEACHER: I'll talk about recommendations in a bit.   {#548}
[00:31:40] TEACHER: So a lot of folks think that whenever I can visualize a use case as a graph,   {#549}
[00:31:49] TEACHER: I should use graph database for that.   {#550}
[00:31:52] TEACHER: No, that's the worst way to think about it.   {#551}
[00:31:55] TEACHER: Why? I'll give you an example.   {#552}
[00:31:57] TEACHER: Modeling a follow following relationship on a graph database could be catastrophic.   {#553}
[00:32:03] TEACHER: Strong word, but really expensive to do, to be honest.   {#554}
[00:32:07] TEACHER: Scaling graph databases, very difficult.   {#555}
[00:32:10] TEACHER: difficult they are extremely memory intensive they are because most of them are built on legacy stack   {#556}
[00:32:15] TEACHER: right even if you pick a modern language graph databases still don't find like they are not very   {#557}
[00:32:20] TEACHER: optimal in any case so but what they do really well so it doesn't mean you should not use grab   {#558}
[00:32:25] TEACHER: database graph databases because what they offer you is core graph algorithms whenever you need   {#559}
[00:32:31] TEACHER: them whenever you need core graph algorithms go for graph databases but if you are using this to   {#560}
[00:32:36] TEACHER: just don't follow following data.   {#561}
[00:32:38] TEACHER: That's like using Hulk to open a glass or to open a jar, a glass jar, right?   {#562}
[00:32:43] TEACHER: Because it gives you so much more, but you are just using to store this   {#563}
[00:32:46] TEACHER: minuscule, teeny tiny, not so like not so humongous data there.   {#564}
[00:32:52] TEACHER: Like follow following is nothing.   {#565}
[00:32:53] TEACHER: That's a very trivial use case for a graph database.   {#566}
[00:32:56] TEACHER: But what they give you where you should be using graph database is use cases   {#567}
[00:33:02] TEACHER: like recommendations, like basic collaborative filtering is one of the   {#568}
[00:33:06] TEACHER: application where you see graph databases thrive like recommendations are the most common way and   {#569}
[00:33:12] TEACHER: by the way i have a video on it on my youtube but i still cover it i have a video on it a detailed   {#570}
[00:33:16] TEACHER: video on it you may find it on my youtube anyway but i'll give you much more than what i covered   {#571}
[00:33:20] TEACHER: there so i'll give an example of recommendation where this comes in very handy now for example   {#572}
[00:33:28] TEACHER: a very popular algorithm called collaborative field a very popular approach of suggesting   {#573}
[00:33:33] TEACHER: of or driving recommendation, this collaborative filtering.   {#574}
[00:33:37] TEACHER: Now, what it says is, let's say you purchased something on Amazon   {#575}
[00:33:43] TEACHER: and you and I are similar users.   {#576}
[00:33:47] TEACHER: Amazon should recommend what you purchased to me.   {#577}
[00:33:51] TEACHER: Modeling this becomes a piece of cake in craft   {#578}
[00:33:53] TEACHER: because when you purchase something,   {#579}
[00:33:55] TEACHER: so first of all, what Amazon or e-commerce would do   {#580}
[00:33:59] TEACHER: is it would first create cohorts of users.   {#581}
[00:34:03] TEACHER: buy similar stuff so they are similar people right now how do you find this out how do you   {#582}
[00:34:10] TEACHER: find this that these are similar people so simple you have a product node let's say iphone i don't   {#583}
[00:34:16] TEACHER: own iphone but let's say hypothetically iphone and everyone who bought iphone are similar set   {#584}
[00:34:21] TEACHER: of people right now if one of them purchases airpods amazon can recommend airpods to everyone   {#585}
[00:34:29] TEACHER: else in the cohort.   {#586}
[00:34:32] TEACHER: That's how companies build cohorts of users through this graph.   {#587}
[00:34:37] TEACHER: And this is a classic graph use case.   {#588}
[00:34:39] TEACHER: It becomes really difficult to model.   {#589}
[00:34:42] TEACHER: I'm just giving example of one level.   {#590}
[00:34:44] TEACHER: It happens at two or three level deep.   {#591}
[00:34:47] TEACHER: But I'm just giving you a simple example to imagine.   {#592}
[00:34:50] TEACHER: And that's exactly what collaborative filtering is.   {#593}
[00:34:52] TEACHER: Most machine learning teams and organizations do this exact same thing.   {#594}
[00:34:55] TEACHER: So now that you have cohorts of users.   {#595}
[00:34:59] TEACHER: And when someone purchased something outside,   {#596}
[00:35:01] TEACHER: like someone in the court purchased something,   {#597}
[00:35:04] TEACHER: it's easy for Amazon to recommend it to someone else.   {#598}
[00:35:06] TEACHER: And this is a classic case where recommendations are driven   {#599}
[00:35:10] TEACHER: through graph databases because you need these capabilities.   {#600}
[00:35:14] TEACHER: You need these capabilities to do it.   {#601}
[00:35:17] TEACHER: Another use case, which is far more important,   {#602}
[00:35:21] TEACHER: far more interesting fraud detection,   {#603}
[00:35:24] TEACHER: best use case for graph databases.   {#604}
[00:35:26] TEACHER: Now here you see the true power of it.   {#605}
[00:35:29] TEACHER: So one and a half year back, I was purchasing subscription of Grammarly.   {#606}
[00:35:34] TEACHER: I thought, hey, I'm bad at English.   {#607}
[00:35:36] TEACHER: I'm bad at writing stuff.   {#608}
[00:35:37] TEACHER: Let me purchase Grammarly.   {#609}
[00:35:39] TEACHER: So I made a purchase, put my credit card details and triggered to OTP.   {#610}
[00:35:46] TEACHER: I immediately got a call from HDFC Bank.   {#611}
[00:35:49] TEACHER: They said, hey, are you trying to make this transaction?   {#612}
[00:35:52] TEACHER: I said, yeah, I'm trying to make this transaction.   {#613}
[00:35:54] TEACHER: So then that person allowed that particular transaction and I was able to proceed with the payment.   {#614}
[00:35:59] TEACHER: Now what is taught?   {#615}
[00:36:01] TEACHER: And I'm not just making this up.   {#616}
[00:36:03] TEACHER: I'll give you the actual source where I got this.   {#617}
[00:36:04] TEACHER: But when that call ended, I was just thinking that how quickly did they retrieve this information and they help it.   {#618}
[00:36:12] TEACHER: Now how do they power this?   {#619}
[00:36:14] TEACHER: They power this through Grab databases.   {#620}
[00:36:16] TEACHER: How?   {#621}
[00:36:16] TEACHER: Simple example.   {#622}
[00:36:18] TEACHER: Arpit has been making all the transactions in domestic space.   {#623}
[00:36:24] TEACHER: is international. It's an odd one out. It's not in this closely knit circle. It's a sore thumb.   {#624}
[00:36:33] TEACHER: It strikes. So it is very evident that it's a new edge that is being created that is suspicious.   {#625}
[00:36:41] TEACHER: This is how they determine very quickly using graph database that is this a new edge that is   {#626}
[00:36:47] TEACHER: being formed outside the cluster that you have, outside the network that you have.   {#627}
[00:36:54] TEACHER: what financial companies do every single day whatever transactions you are making they are   {#628}
[00:37:01] TEACHER: being categorized by sellers there are like 50 or 60 parameters that I know of country region   {#629}
[00:37:08] TEACHER: type of products you purchase type of things you interact with and so much more they ingest it in   {#630}
[00:37:13] TEACHER: a graph every person almost has its own independent graph ready in that graph whenever a new age is   {#631}
[00:37:19] TEACHER: happening outside the graph there is a degree of suspicion that they compute and they predict   {#632}
[00:37:24] TEACHER: and they say okay this is a suspicious transaction and all of this is has to be done in 200 milliseconds   {#633}
[00:37:31] TEACHER: that's it they have 200 millisecond SLA now I tell you why how I'm so sure about this number   {#634}
[00:37:36] TEACHER: I had one person VP engineering uh an actual VP not not that software developer VP engineer   {#635}
[00:37:42] TEACHER: actual VP engineering of JP Morgan Chase took this cohort fifth cohort and he explained this use case   {#636}
[00:37:50] TEACHER: 200 milliseconds is what they have to do this graph detection and tell us.   {#637}
[00:37:56] TEACHER: Because in 200 milliseconds, they have to make this decision   {#638}
[00:37:58] TEACHER: and they have to redirect it to the customer executive.   {#639}
[00:38:01] TEACHER: That call goes to you and you and that customer executives are connected   {#640}
[00:38:04] TEACHER: because then they have to ask if you are the one who are making the transaction,   {#641}
[00:38:08] TEACHER: approve that and then you are allowed to basically do that transaction.   {#642}
[00:38:12] TEACHER: All of this entire system is just powered through graph analysis.   {#643}
[00:38:16] TEACHER: This is the actual real use case.   {#644}
---- OWNED SEGMENTS END ----

CTX| [00:38:20] TEACHER: interesting time talking about it.   {#645}
CTX| [00:38:22] TEACHER: And because it contains sensitive details, I cannot share that.   {#646}
CTX| [00:38:25] TEACHER: But this is where you see the power of graph databases.   {#647}
CTX| [00:38:28] TEACHER: You see where you need powerful graph algorithms.   {#648}
CTX| [00:38:32] TEACHER: You use graph databases.   {#649}
CTX| [00:38:34] TEACHER: You just don't use it for fall of all languages.   {#650}
CTX| [00:38:35] TEACHER: That's a very trivial use case.   {#651}
CTX| [00:38:38] TEACHER: Very trivial.   {#652}
CTX| [00:38:39] TEACHER: Right.   {#653}
CTX| [00:38:39] TEACHER: So in a gist, if you can visualize a graph that, Hey, this should be a graph use case.   {#654}
CTX| [00:38:47] TEACHER: most more often than not, that is not where you should be using graph databases.   {#655}
CTX| [00:38:51] TEACHER: So shelving, follow following, that's a very trivial discuss.   {#656}
CTX| [00:38:54] TEACHER: But where you need the actual raw crude graph algorithm,   {#657}
CTX| [00:38:59] TEACHER: you use graph databases.   {#658}
CTX| [00:39:01] TEACHER: Okay.   {#659}
CTX| [00:39:02] TEACHER: Few examples, Neo4j, one of the best,   {#660}
CTX| [00:39:06] TEACHER: like one of the first, not the best, one of the first that came out.   {#661}
CTX| [00:39:10] TEACHER: Like always, AWS copies everything.   {#662}
CTX| [00:39:12] TEACHER: AWS has their own managed offering from graph database called Neptune.   {#663}
CTX| [00:39:15] TEACHER: Then Dgraph.   {#664}
CTX| [00:39:17] TEACHER: Return in Go works very well at bit scale.   {#665}
