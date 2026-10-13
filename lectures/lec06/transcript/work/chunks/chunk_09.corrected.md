> **Student Question [01:31:54] - Student 4:** Yeah, I just wanted to check like whenever we have like requirements like this, should we have like Boolean variables like is active or should we generally store them as a type and enum as active because that gives us like more flexibility in terms of, you know, changing if something comes up in the future, right?

**[01:32:15] Teacher (answer):** So long as you're doing it with tiny int it's fine. So 8 byte integer if you are taking because Boolean anyway takes 8 bytes to store the data. And 8 bytes is 1 byte, 8 bits, 8 bits, I wanted to say 8 bits. So you can go for enum and integer based enum that does it for you. There's also fine. And that gives you, as you said, that gives you flexibility on the fact that you can then add one more state. So active and active, you can add a third state if you want to. So that gives you that flexibility. But just go with a tiny int rather than a big one. Don't store string as is in the database.

**[01:32:54] Student?:** Yeah. Thanks.

**[01:32:56] Teacher:** Harsh.

> **Student Question [01:32:58] - Student 8 (Harsh):** I was just thinking, should we improve this third update statements with some join on the other table that, that at least that ID is correct.

**[01:33:09] Teacher (answer):** Yeah. Those, those checks are there. Like I have to rewrite a lot of stuff there. Right. But you can check that if that photo is there or not and those parts. So you can do a get and then set. So get an update, you can check in that part.

**[01:33:23] Student 8:** Yeah, I wanted to check that photo ID belong to this.

**[01:33:27] Teacher:** Yeah, 100% you should do that. Like if we take care of security over here and we lapse over here, that would not work, right? But then it would have required me to write a lot of queries again and again. But you get the gist, right? I'm so happy that you folks are thinking on those lines. But think on those granular details, right? We first do get and check and then update in any case.

**[01:33:48] Student 8:** Right. Okay. Yeah.

**[01:33:50] Teacher:** [unclear: "Chalda."]

> **Student Question [01:33:52] - Student 2:** Hi, so it's like, my question is, related to this schema as well as, real text messaging. We discussed in Slack, right? So we had the user table and we had a channel table, but there we didn't make any foreign key primary key. We created a relationship membership table.

**[01:34:15] Student?:** Membership table, yeah.

**[01:34:16] Student 2:** Right. But here we didn't go with that concept. Is it because of one-to-one and one-to-many concept?

**[01:34:23] Teacher (answer):** Brilliant. You gave the answer. But here also it's one-to-many. But there we were storing other details as well on that. In case of membership, you could store last checkpoint up until this you write a message, this channel is marked as star for a particular user. Here you don't have that complex of a user. That's fine.

**[01:34:50] Student 9:** Thank you. Yeah.

<!-- topic-candidate [01:34:52]: Break *(admin)* -->

**[01:34:52] Teacher:** *(admin)* Gaurav, I'll take a question at the end. It's 10.35. We'll take a quick break. We'll take a break for five minutes. We'll come back at 10.41 and then we'll have discussion around tagged people in photos. And we'll wear a different hat. [unclear: "install one"] requirements. We will not design system. Designing system is easy. This system is very easy. What I want to highlight through this system is how this simple system affects so many other systems, right? Because as senior engineers, we should be thrown into, we are thrown into situations where we are not just responsible for building this one system today, but rather seeing how it affects, how it interacts with other system, how it could affect other systems and all. So we'll be wearing that hat to understand how this simple thing and obviously we'll go to the implementation details of it a bit but more importantly understanding like thinking around the requirements itself will be the part of this, right? And then we cover newly unread message indicator post that, right? See you folks in five minutes at 10 41, we resume our discussion on tagging people. Thanks folks.

[break ~01:35:57-01:40:40]

<!-- topic-candidate [01:40:40]: Tagging people in photos - requirements -->

**[01:40:40] Teacher:** Let's start with the second for today and we'll discuss tagging in photos, right? So let's say what typically happens in a startup. One day someone from the [unclear: "senior environment sub"] typically a CXO comes to you and says, hey, let's build, let's allow people to tag people in photos. That's all, that's your product briefing. You have to go ahead and implement, right? So now a senior engineer, you need to think of senior management has not thought of. Unfortunately, that's true. More common than you think. So now it's your responsibility because they trust your instinct. They just give you a problem statement. Now you have to figure out what all things to do. It's not just high level. High level is still easy. It's more about understanding how it fits into the scheme of things, how it fits into that entire puzzle of yours.

<!-- topic-candidate [01:41:39]: Senior engineer wears three hats -->

[01:41:39] So now what we do is we think around requirements. We will not talk about solution. Not talk about solution at all. We will talk about the requirements of them. Wear the hat of a product manager. As an engineer, you have to. As senior engineer, so I always say this. I will also repeat it next week. Next to next week. The senior engineer wears three hats. It does not really wear one hat of each. Senior engineer always wears three hats. First is a hat of a product manager. Requirements, things that others have not thought about, bringing in that clarity. Second is a hat of an architect where you're supposed to architect a system considering extensibility of it in the future. And third, the hat of an engineer, which goes into those low level nitty gritty details of it and ensures that it is optimal across all the layers. And this is what makes a good synergy.

[01:42:34] You have to wear three hats. Today will [?wear the first hat | asr: "bear the first hand"] around thinking around requirements where we are just given a briefing, a one-line briefing of the statement. Hey, let's allow people to tag people in for this. Okay. What questions would you ask not to manager but to yourself, to your team or how would you brainstorm about it? Raise your hands. I'll pull you in. One question, one person and then we move to the next one. Okay.
