# chunk_09  OWNS 01:31:54 -> 01:43:08  (segments #1641-#1776, 1116 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:30:56] STUDENT_5: Here.   {#1628}
CTX| [01:30:58] STUDENT_5: Can you please go back to the page where we had those three update statements in a transaction?   {#1629}
CTX| [01:31:04] STUDENT_5: And we did an optimization with active photo ID.   {#1630}
CTX| [01:31:08] STUDENT_5: So my verification is that the new query after this active photo ID optimization,   {#1631}
CTX| [01:31:14] STUDENT_5: we get the active photo.   {#1632}
CTX| [01:31:16] STUDENT_5: So it should be select start from users where hash is equal to hash of email, right?   {#1633}
CTX| [01:31:22] TEACHER: Yeah, so that's the exact.   {#1634}
CTX| [01:31:24] TEACHER: So let me do that.   {#1635}
CTX| [01:31:28] TEACHER: Update users set active photo ID equal to something where hash is equal to something.   {#1636}
CTX| [01:31:46] TEACHER: Yes.   {#1637}
CTX| [01:31:47] STUDENT_5: Yeah.   {#1638}
CTX| [01:31:48] STUDENT_5: What I wanted to clarify.   {#1639}
CTX| [01:31:50] STUDENT_5: Thank you.   {#1640}

---- OWNED SEGMENTS START ----
[01:31:54] STUDENT_4: Yeah, I just wanted to check like whenever we have like requirements like this, should   {#1641}
[01:32:00] STUDENT_4: we have like Boolean variables like is active or should we generally store them as a type   {#1642}
[01:32:04] STUDENT_4: and enum as active because that gives us like more flexibility in terms of, you know, changing   {#1643}
[01:32:11] STUDENT_4: if something comes up in the future, right?   {#1644}
[01:32:15] TEACHER: So long as you're doing it with tiny int it's fine.   {#1645}
[01:32:18] TEACHER: So 8 byte integer if you are taking because boolean anyway takes 8 bytes to store the data.   {#1646}
[01:32:23] TEACHER: And 8 bytes is 1 byte, 8 bits, 8 bits, I wanted to say 8 bits.   {#1647}
[01:32:28] TEACHER: So you can go for enum and integer based enum that does it for you.   {#1648}
[01:32:33] TEACHER: There's also fine.   {#1649}
[01:32:35] TEACHER: And that gives you, as you said, that gives you flexibility on the fact that you can then   {#1650}
[01:32:40] TEACHER: add one more state.   {#1651}
[01:32:41] TEACHER: So active and active, you can add a third state if you want to.   {#1652}
[01:32:44] TEACHER: So that gives you that flexibility.   {#1653}
[01:32:48] TEACHER: But just go with a tiny end rather than a big one.   {#1654}
[01:32:51] TEACHER: Don't store string as is in the database.   {#1655}
[01:32:54] STUDENT_11: Yeah.   {#1656}
[01:32:55] STUDENT_11: Thanks.   {#1657}
[01:32:56] TEACHER: Harsh.   {#1658}
[01:32:58] STUDENT_8: I was just thinking, should we improve this third update statements with some join on   {#1659}
[01:33:05] STUDENT_8: the other table that, that at least that ID is correct.   {#1660}
[01:33:09] TEACHER: Yeah.   {#1661}
[01:33:10] TEACHER: Those, those checks are there.   {#1662}
[01:33:11] TEACHER: Like I have to rewrite a lot of stuff there.   {#1663}
[01:33:13] TEACHER: Right.   {#1664}
[01:33:14] TEACHER: But you can check that if that photo is there or not and those parts.   {#1665}
[01:33:18] TEACHER: So you can do a get and then set.   {#1666}
[01:33:20] TEACHER: So get an update, you can check in that part.   {#1667}
[01:33:23] STUDENT_8: Yeah, I wanted to check that photo ID belong to this.   {#1668}
[01:33:27] TEACHER: Yeah, 100% you should do that.   {#1669}
[01:33:29] TEACHER: Like if we take care of security over here and we lapse over here,   {#1670}
[01:33:32] TEACHER: that would not work, right?   {#1671}
[01:33:34] TEACHER: But then it would have required me to write a lot of queries again and again.   {#1672}
[01:33:37] TEACHER: But you get the gist, right?   {#1673}
[01:33:39] TEACHER: I'm so happy that you folks are thinking on those lines.   {#1674}
[01:33:41] TEACHER: But think on those granular details, right?   {#1675}
[01:33:44] TEACHER: We first do get and check and then update in any case.   {#1676}
[01:33:48] STUDENT_8: Right.   {#1677}
[01:33:49] STUDENT_8: Okay.   {#1678}
[01:33:49] STUDENT_8: Yeah.   {#1679}
[01:33:50] TEACHER: Chalda.   {#1680}
[01:33:52] STUDENT_2: Hi, so it's like, uh, my question is, uh, related to this schema as well as, uh,   {#1681}
[01:33:59] STUDENT_2: real text messaging.   {#1682}
[01:34:01] STUDENT_2: We discussed in Slack, right?   {#1683}
[01:34:02] STUDENT_2: So we had the user table and we had a channel table, but there we didn't make   {#1684}
[01:34:08] STUDENT_2: any foreign key primary key.   {#1685}
[01:34:10] STUDENT_2: we created a relationship   {#1686}
[01:34:13] STUDENT_2: membership table.   {#1687}
[01:34:15] STUDENT_9: Membership table, yeah.   {#1688}
[01:34:16] STUDENT_2: Right.   {#1689}
[01:34:17] STUDENT_2: But here we didn't go with that concept.   {#1690}
[01:34:19] STUDENT_2: Is it because of one-to-one   {#1691}
[01:34:21] STUDENT_2: and one-to-many concept?   {#1692}
[01:34:23] TEACHER: Brilliant.   {#1693}
[01:34:24] TEACHER: You gave the answer.   {#1694}
[01:34:26] TEACHER: But here also it's one-to-many.   {#1695}
[01:34:28] TEACHER: But there we were storing   {#1696}
[01:34:30] TEACHER: other details as well on that.   {#1697}
[01:34:33] TEACHER: In case of membership,   {#1698}
[01:34:35] TEACHER: you could store last checkpoint   {#1699}
[01:34:37] TEACHER: up until this you write a message,   {#1700}
[01:34:41] TEACHER: This channel is marked as star for a particular user.   {#1701}
[01:34:44] TEACHER: Here you don't have that complex of a user.   {#1702}
[01:34:48] TEACHER: That's fine.   {#1703}
[01:34:50] STUDENT_9: Thank you.   {#1704}
[01:34:51] STUDENT_9: Yeah.   {#1705}
[01:34:52] TEACHER: Gaurav, I'll take a question at the end.   {#1706}
[01:34:54] TEACHER: It's 10.35.   {#1707}
[01:34:54] TEACHER: We'll take a quick break.   {#1708}
[01:34:55] TEACHER: We'll take a break for five minutes.   {#1709}
[01:34:58] TEACHER: We'll come back at 10.41 and then we'll have discussion around tagged people in photos.   {#1710}
[01:35:07] TEACHER: And we'll wear a different hat.   {#1711}
[01:35:10] TEACHER: install one requirements.   {#1712}
[01:35:11] TEACHER: We will not design system.   {#1713}
[01:35:12] TEACHER: Designing system is easy.   {#1714}
[01:35:13] TEACHER: This system is very easy.   {#1715}
[01:35:15] TEACHER: What I want to highlight through this system is how this simple system affects so many   {#1716}
[01:35:20] TEACHER: other systems, right?   {#1717}
[01:35:21] TEACHER: Because as senior engineers, we should be thrown into, we are thrown into situations   {#1718}
[01:35:27] TEACHER: where we are not just responsible for building this one system today, but rather seeing how   {#1719}
[01:35:33] TEACHER: it affects, how it interacts with other system, how it could affect other systems and all.   {#1720}
[01:35:37] TEACHER: so we'll be wearing that hat to understand how this simple thing and obviously we'll go to the   {#1721}
[01:35:42] TEACHER: implementation details of it a bit but more importantly understanding like thinking around   {#1722}
[01:35:46] TEACHER: the requirements itself will be the part of this right and then we cover newly unread message   {#1723}
[01:35:52] TEACHER: indicator post that right see you folks in five minutes at 10 41 we resume our discussion on   {#1724}
[01:35:57] TEACHER: tagging people thanks folks   {#1725}
[01:39:42] TEACHER: Thank you.   {#1726}
[01:40:40] TEACHER: Let's start with the second   {#1727}
[01:40:42] TEACHER: for today and we'll discuss tagging in photos right so let's say what typically happens in a   {#1728}
[01:40:51] TEACHER: startup one day someone from the senior environment sub typically a cxo comes to you and says hey   {#1729}
[01:40:57] TEACHER: let's build let's allow people to tag people in photos that's all that's your product briefing   {#1730}
[01:41:03] TEACHER: you have to go ahead and implement right so now a senior engineer you need to think of   {#1731}
[01:41:12] TEACHER: senior management has not thought of.   {#1732}
[01:41:16] TEACHER: Unfortunately, that's true.   {#1733}
[01:41:18] TEACHER: More common than you think.   {#1734}
[01:41:20] TEACHER: So now it's your responsibility because they trust your instinct.   {#1735}
[01:41:23] TEACHER: They just give you a problem statement.   {#1736}
[01:41:25] TEACHER: Now you have to figure out what all things to do.   {#1737}
[01:41:28] TEACHER: It's not just high level.   {#1738}
[01:41:30] TEACHER: High level is still easy.   {#1739}
[01:41:32] TEACHER: It's more about understanding how it fits into the scheme of things,   {#1740}
[01:41:36] TEACHER: how it fits into that entire puzzle of yours.   {#1741}
[01:41:39] TEACHER: So now what we do is we think around requirements.   {#1742}
[01:41:43] TEACHER: We will not talk about solution.   {#1743}
[01:41:44] TEACHER: Not talk about solution at all.   {#1744}
[01:41:46] TEACHER: We will talk about the requirements of them.   {#1745}
[01:41:49] TEACHER: Wear the hat of a product manager.   {#1746}
[01:41:51] TEACHER: As an engineer, you have to.   {#1747}
[01:41:52] TEACHER: As senior engineer, so I always say this.   {#1748}
[01:41:54] TEACHER: I will also repeat it next week.   {#1749}
[01:41:57] TEACHER: Next to next week.   {#1750}
[01:41:58] TEACHER: The senior engineer wears three hats.   {#1751}
[01:42:00] TEACHER: It does not really wear one hat of each.   {#1752}
[01:42:02] TEACHER: Senior engineer always wears three hats.   {#1753}
[01:42:05] TEACHER: First is a hat of a product manager.   {#1754}
[01:42:09] TEACHER: requirements, things that others have not thought about, bringing in that clarity.   {#1755}
[01:42:14] TEACHER: Second is a hat of an architect where you're supposed to architect a system considering   {#1756}
[01:42:19] TEACHER: extensibility of it in the future.   {#1757}
[01:42:21] TEACHER: And third, the hat of an engineer, which goes into those low level nitty gritty details   {#1758}
[01:42:26] TEACHER: of it and ensures that it is optimal across all the layers.   {#1759}
[01:42:31] TEACHER: And this is what makes a good synergy.   {#1760}
[01:42:34] TEACHER: You have to wear three hats.   {#1761}
[01:42:35] TEACHER: today will bear the first hand   {#1762}
[01:42:37] TEACHER: around thinking around requirements   {#1763}
[01:42:40] TEACHER: where we   {#1764}
[01:42:42] TEACHER: are just given a briefing,   {#1765}
[01:42:43] TEACHER: a one-line briefing of the statement.   {#1766}
[01:42:45] TEACHER: Hey, let's allow people to tag people in   {#1767}
[01:42:47] TEACHER: for this.   {#1768}
[01:42:49] TEACHER: Okay.   {#1769}
[01:42:51] TEACHER: What questions would you ask   {#1770}
[01:42:53] TEACHER: not to manager but to yourself, to your   {#1771}
[01:42:55] TEACHER: team or how would you brainstorm   {#1772}
[01:42:57] TEACHER: about it? Raise your hands.   {#1773}
[01:42:59] TEACHER: I'll pull you in. One question, one person   {#1774}
[01:43:01] TEACHER: and then we move to the next one.   {#1775}
[01:43:03] TEACHER: Okay.   {#1776}
---- OWNED SEGMENTS END ----

CTX| [01:43:08] STUDENT_1: Yeah, maybe the first question I will try to figure it out.   {#1777}
CTX| [01:43:16] STUDENT_1: What should be the schema of storing tags?   {#1778}
CTX| [01:43:19] TEACHER: Nothing around engineering.   {#1779}
CTX| [01:43:20] TEACHER: Nothing around engineering.   {#1780}
CTX| [01:43:22] TEACHER: Don't think on engineering at all.   {#1781}
CTX| [01:43:24] TEACHER: Because all you are given is this one line briefing.   {#1782}
CTX| [01:43:27] TEACHER: Just one line briefing.   {#1783}
CTX| [01:43:29] TEACHER: Allow people to tag other people in photos.   {#1784}
CTX| [01:43:31] TEACHER: That's it.   {#1785}
CTX| [01:43:32] TEACHER: Think on the product side here.   {#1786}
CTX| [01:43:37] STUDENT_1: Okay.   {#1787}
CTX| [01:43:38] STUDENT_1: Then maybe the most important thing will be around who can tag and is there a way that   {#1788}
CTX| [01:43:48] STUDENT_1: I can mark tagging to be correct?   {#1789}
CTX| [01:43:52] STUDENT_1: Who can tag is one thing.   {#1790}
CTX| [01:43:54] TEACHER: No, who can tag?   {#1791}
CTX| [01:43:56] TEACHER: So what is the significance of who can tag?   {#1792}
CTX| [01:43:59] TEACHER: What would it allow?   {#1793}
CTX| [01:44:02] TEACHER: What would it enable you to do?   {#1794}
CTX| [01:44:05] STUDENT_1: that I'm the owner of let's say a photo then only I can tag.   {#1795}
