# chunk_09  OWNS 01:32:59 -> 01:43:45  (segments #1606-#1801, 1679 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:31:59] TEACHER: Right?   {#1585}
CTX| [01:31:59] TEACHER: So orchestrator needs those vitals information.   {#1586}
CTX| [01:32:02] TEACHER: How would it get it?   {#1587}
CTX| [01:32:03] STUDENT_1: Gaurav?   {#1588}
CTX| [01:32:07] STUDENT_1: Before that, can I try to answer the communication between DB and LP that we were just discussing?   {#1589}
CTX| [01:32:13] STUDENT_1: First, let's do that.   {#1590}
CTX| [01:32:15] STUDENT_1: I've set the content.   {#1591}
CTX| [01:32:17] STUDENT_1: About this, I think normal status and help checks that we discussed about between orchestrator   {#1592}
CTX| [01:32:23] STUDENT_1: and...   {#1593}
CTX| [01:32:24] TEACHER: So, another...   {#1594}
CTX| [01:32:25] TEACHER: But see, is this realistic implementation?   {#1595}
CTX| [01:32:27] TEACHER: Think about it.   {#1596}
CTX| [01:32:30] TEACHER: Like this, whenever, so you are saying orchestrator would make API call to HLB   {#1597}
CTX| [01:32:34] TEACHER: server and periodically check what's the current CPU memory and disk   {#1598}
CTX| [01:32:38] TEACHER: utilization of it.   {#1599}
CTX| [01:32:39] TEACHER: What if it needs historical data?   {#1600}
CTX| [01:32:41] TEACHER: Because it sees that rise that the CPU utilization is rising.   {#1601}
CTX| [01:32:44] TEACHER: It can take some action, right?   {#1602}
CTX| [01:32:46] TEACHER: You just don't need at that moment.   {#1603}
CTX| [01:32:49] TEACHER: What it is, you need historical also.   {#1604}
CTX| [01:32:50] TEACHER: You need a generic way to do it.   {#1605}

---- OWNED SEGMENTS START ----
[01:32:59] STUDENT_1: So there has to be a better way.   {#1606}
[01:33:03] STUDENT_1: Rather than orchestrator asking from load balance and load   {#1607}
[01:33:06] STUDENT_1: register telling orchestrator, but why are you just limiting   {#1608}
[01:33:10] STUDENT_1: between these two, right?   {#1609}
[01:33:12] TEACHER: Imagine, won't you want to see oral infrastructure utilization,   {#1610}
[01:33:16] TEACHER: historical trends and whatnot, where would you store the historical   {#1611}
[01:33:20] TEACHER: data of all the CPU, like how CPU was consumed on each LB server?   {#1612}
[01:33:25] TEACHER: you store this data in a database.   {#1613}
[01:33:28] TEACHER: So now where is that data?   {#1614}
[01:33:31] TEACHER: What kind of database?   {#1615}
[01:33:32] TEACHER: Where are you storing it?   {#1616}
[01:33:34] STUDENT_3: We could use probably the same database that was previously being used.   {#1617}
[01:33:37] TEACHER: This is the key value.   {#1618}
[01:33:38] TEACHER: So we're storing this configuration.   {#1619}
[01:33:40] TEACHER: What you're storing is time series data, CPU utilization, memory,   {#1620}
[01:33:43] TEACHER: disk network.   {#1621}
[01:33:50] TEACHER: Right.   {#1622}
[01:33:50] TEACHER: So that that's right.   {#1623}
[01:33:51] TEACHER: So when we think realistically that that's where things start to   {#1624}
[01:33:55] TEACHER: Like you, you start to discover these things.   {#1625}
[01:33:58] TEACHER: Think on those lines, where are you storing this information?   {#1626}
[01:34:01] TEACHER: What kind of information would you need to store?   {#1627}
[01:34:02] TEACHER: You would just not need that at this instant, what does CPU utilization?   {#1628}
[01:34:08] TEACHER: Because let's say you made a call.   {#1629}
[01:34:10] TEACHER: Someone is not responding because it's a hundred percent utilization.   {#1630}
[01:34:12] TEACHER: You don't even know it's a hundred percent.   {#1631}
[01:34:13] TEACHER: You, you don't get time enough time to react.   {#1632}
[01:34:17] TEACHER: You'd want to react when it is like 60, 70, 80%.   {#1633}
[01:34:19] TEACHER: You need to know historical trends of it.   {#1634}
[01:34:22] TEACHER: What's the average utilization and what not?   {#1635}
[01:34:25] STUDENT_1: Orchestrator can have a database with load balancer telling   {#1636}
[01:34:30] STUDENT_1: why a heartbeat messages, what CPU utilization was at that point of view.   {#1637}
[01:34:34] TEACHER: Why are you re-implementing things that are already implemented by other systems?   {#1638}
[01:34:38] TEACHER: Just reuse the stuff.   {#1639}
[01:34:41] TEACHER: Always.   {#1640}
[01:34:42] TEACHER: What tool would you use to do this?   {#1641}
[01:34:48] STUDENT_9: Connection pooling.   {#1642}
[01:34:49] TEACHER: Nah, let me pull in somewhere else.   {#1643}
[01:34:52] TEACHER: Wait, I'm Alok.   {#1644}
[01:34:55] STUDENT_4: So the things you're talking about, they seem like metrics that there should be some kind   {#1645}
[01:35:01] STUDENT_4: of metrics logged and then we should react on the basis of metrics scaling up and scaling   {#1646}
[01:35:06] STUDENT_4: down.   {#1647}
[01:35:07] STUDENT_4: Correct.   {#1648}
[01:35:09] TEACHER: So what tool, what thing would you use to do that?   {#1649}
[01:35:14] TEACHER: I don't know much.   {#1650}
[01:35:15] STUDENT_4: So we use CloudWatch based, but we are doing it manually.   {#1651}
[01:35:18] STUDENT_4: That's a good one.   {#1652}
[01:35:20] STUDENT_4: CloudWatch is that.   {#1653}
[01:35:23] STUDENT_4: You do it manually.   {#1654}
[01:35:25] STUDENT_4: I don't know about automatic monitoring much.   {#1655}
[01:35:28] TEACHER: Okay.   {#1656}
[01:35:28] TEACHER: Okay.   {#1657}
[01:35:29] TEACHER: Let me pull in Akshay.   {#1658}
[01:35:31] TEACHER: What would you do?   {#1659}
[01:35:34] STUDENT_12: Yeah.   {#1660}
[01:35:35] STUDENT_3: I had the same answer.   {#1661}
[01:35:38] STUDENT_3: Mostly CloudWatch or have a telemetry agent that is monitoring.   {#1662}
[01:35:44] STUDENT_9: What is this telemetry agent?   {#1663}
[01:35:45] STUDENT_9: Where it is installed?   {#1664}
[01:35:46] STUDENT_9: What it does?   {#1665}
[01:35:49] STUDENT_3: Basically it, I think it will mostly like emit metrics from the host.   {#1666}
[01:35:59] STUDENT_3: Yes.   {#1667}
[01:36:00] TEACHER: Let's say this is the telemetry agent that is running on the host, which is emitting   {#1668}
[01:36:04] TEACHER: metrics, emitting metrics to where?   {#1669}
[01:36:08] STUDENT_3: Probably some log storage.   {#1670}
[01:36:12] STUDENT_3: and then from there like uh we can have alarms or something um   {#1671}
[01:36:19] TEACHER: no don't go into alarm don't go into alarm don't go into alarm okay okay but the thing is you need   {#1672}
[01:36:26] TEACHER: a way a generic way where you would anyway have it as an organization who is building load by   {#1673}
[01:36:32] TEACHER: so you would anyway have a place where all these key vitals and metrics are getting ingested you'll   {#1674}
[01:36:38] TEACHER: anyway have that. For example, you may use something called as Prometheus.   {#1675}
[01:36:45] TEACHER: It's a brilliant tool FII, brilliant. So what you are doing effectively is instead. So what the,   {#1676}
[01:36:54] TEACHER: how this discussion transpired is very interesting. A lot of folks were just limiting to this system,   {#1677}
[01:37:01] TEACHER: just limiting to this. What did we just emit metric to this orchestra, orchestra would store   {#1678}
[01:37:06] TEACHER: it in this database don't limit it think if you think realistically you will automatically start to   {#1679}
[01:37:13] TEACHER: make sense into a very cost efficient solution right so just few things over there first we need   {#1680}
[01:37:21] TEACHER: to monitor cpu memory disk and whatnot about a particular machine we just don't want data of that   {#1681}
[01:37:27] TEACHER: particular instance because we need to know historically how it was what's the average   {#1682}
[01:37:30] TEACHER: so that you can scale up and scale down according so which means there is anyway a need for you to   {#1683}
[01:37:36] TEACHER: all the vitals of a particular machine somewhere in a system.   {#1684}
[01:37:40] TEACHER: Now for all the system not just LB servers even CPU memory utilization of your back-end   {#1685}
[01:37:51] TEACHER: servers are also equally important.   {#1686}
[01:37:53] TEACHER: All of that is equally important.   {#1687}
[01:37:55] TEACHER: So you have to send all of the vitals of every single VM of your machine in a central location   {#1688}
[01:38:01] TEACHER: so that orchestrator can take a look at that   {#1689}
[01:38:04] TEACHER: and make calls if you want to scale up backend servers,   {#1690}
[01:38:08] TEACHER: if you want to add more LB servers or whatnot.   {#1691}
[01:38:11] TEACHER: So having that one place of ingestion and query   {#1692}
[01:38:14] TEACHER: would solve the problem.   {#1693}
[01:38:15] TEACHER: So that's why use something like Prometheus Overkill   {#1694}
[01:38:18] TEACHER: in which the telemetry agents running on each of the VM,   {#1695}
[01:38:23] TEACHER: not just LB, even backend server VMs,   {#1696}
[01:38:27] TEACHER: take those telemetry agents,   {#1697}
[01:38:28] TEACHER: let them push the data to Prometheus.   {#1698}
[01:38:33] TEACHER: Orchestrator periodically checks the status of the overall average utilization of this,   {#1699}
[01:38:40] TEACHER: average utilization of this and then takes a call.   {#1700}
[01:38:42] TEACHER: If we need to scale up LB server or scale down LB server,   {#1701}
[01:38:45] TEACHER: add more backend servers to that or what.   {#1702}
[01:38:47] TEACHER: Typically what autoscaling group does.   {#1703}
[01:38:49] TEACHER: So autoscaling group in AWS world or the autoscaling policies is just you configure.   {#1704}
[01:38:55] TEACHER: If the average CPU utilization is this, do this.   {#1705}
[01:38:58] TEACHER: this, what it does internally, just queries Prometheus, Prometheus   {#1706}
[01:39:02] TEACHER: as in their proprietary stuff.   {#1707}
[01:39:04] TEACHER: And it gets that when it needs that condition, it takes us necessary actions.   {#1708}
[01:39:09] TEACHER: In case of orchestrator, because this is trans, this is opaque to your users.   {#1709}
[01:39:14] TEACHER: You just don't know about multiple LB servers there.   {#1710}
[01:39:16] TEACHER: Orchristrator would have to do that same thing and scale up and   {#1711}
[01:39:19] TEACHER: down your LB servers over here.   {#1712}
[01:39:21] TEACHER: Right.   {#1713}
[01:39:22] TEACHER: This way, instead of doing something specific, just for this load balance,   {#1714}
[01:39:26] TEACHER: Try to build a generic, try to add it to this generic system.   {#1715}
[01:39:30] TEACHER: So use Prometheus or something like that over here to store this.   {#1716}
[01:39:34] TEACHER: In case you are unaware of Prometheus, go to Prometheus.io.   {#1717}
[01:39:37] TEACHER: See how beautiful that tool is.   {#1718}
[01:39:39] TEACHER: It's a brilliant, brilliant, brilliant, brilliant tool that scales amazingly.   {#1719}
[01:39:44] TEACHER: So now if you see, if you look carefully, we are now very well converging into actual   {#1720}
[01:39:50] TEACHER: things that we require as well.   {#1721}
[01:39:52] TEACHER: First, we discussed the low level details.   {#1722}
[01:39:53] TEACHER: We still talked about the place to store the configuration.   {#1723}
[01:39:59] TEACHER: Then we wanted to make it reactive.   {#1724}
[01:40:01] TEACHER: We wanted to find health checks.   {#1725}
[01:40:03] TEACHER: We added the orchestrator to scale up backend servers and LB servers and whatnot.   {#1726}
[01:40:07] TEACHER: Then we extended this part where I would want to scale out LB servers.   {#1727}
[01:40:12] TEACHER: I need a way to see the historical things.   {#1728}
[01:40:14] TEACHER: So everyone needs to send telemetry to someplace.   {#1729}
[01:40:16] TEACHER: So that's what Prometheus comes in.   {#1730}
[01:40:18] TEACHER: Orchestrator periodically checks the Prometheus to get this thing done.   {#1731}
[01:40:21] TEACHER: and things scale up.   {#1732}
[01:40:24] TEACHER: Right?   {#1733}
[01:40:25] TEACHER: So, our load pass is very nice analogy.   {#1734}
[01:40:27] TEACHER: The only thing that is remaining   {#1735}
[01:40:29] TEACHER: to discuss is   {#1736}
[01:40:31] TEACHER: now you have   {#1737}
[01:40:33] TEACHER: two LV servers.   {#1738}
[01:40:36] TEACHER: Client   {#1739}
[01:40:37] TEACHER: has IP address of one of them.   {#1740}
[01:40:40] TEACHER: How will client   {#1741}
[01:40:41] TEACHER: make request to other LV servers?   {#1742}
[01:40:44] TEACHER: Because at the end, the connection   {#1743}
[01:40:45] TEACHER: is created, the TCP   {#1744}
[01:40:47] TEACHER: connection is created on   {#1745}
[01:40:49] TEACHER: the LV server.   {#1746}
[01:40:52] TEACHER: Because it is created on the LV server, how would your client connect to this LV server?   {#1747}
[01:40:57] TEACHER: Because now you have two.   {#1748}
[01:40:59] TEACHER: Your client has IP, like client, you would just give one IP address to that.   {#1749}
[01:41:04] TEACHER: Shreya, what would you do?   {#1750}
[01:41:07] STUDENT_8: I think it is configured in DNS servers.   {#1751}
[01:41:11] STUDENT_8: So we have a mapping of load balancers in DNS servers and while client is routing request   {#1752}
[01:41:18] STUDENT_8: via DNS, it picks up a load balancer.   {#1753}
[01:41:21] TEACHER: Okay. So you are saying add a DNS server to this.   {#1754}
[01:41:24] TEACHER: Now what is DNS server will hold?   {#1755}
[01:41:27] STUDENT_8: Uh, this will hold what are the multiple ports of these load balancers and it   {#1756}
[01:41:33] STUDENT_5: will be multiple machine IP addresses, not just ports.   {#1757}
[01:41:37] TEACHER: So let's say this 10.0.0.1 10.0.0.2.   {#1758}
[01:41:41] TEACHER: Okay. So what would you say?   {#1759}
[01:41:43] TEACHER: You would show 10.0.0.1 against what?   {#1760}
[01:41:47] STUDENT_8: against the, um, URL of like, let's say, google.com. Uh, and then these, these IP address, why   {#1761}
[01:41:55] TEACHER: google.com is not public load balancers are private, right? Uh, load balancers are private.   {#1762}
[01:42:03] STUDENT_8: I think load balancers should be public and internal server should be private, right?   {#1763}
[01:42:07] STUDENT_8: Okay. Are all load balancers public? Uh, the ones which are handling, which are active   {#1764}
[01:42:15] STUDENT_8: should be a public.   {#1765}
[01:42:17] TEACHER: Okay.   {#1766}
[01:42:17] TEACHER: What if there is a microservice that I'm talking about, I'm building.   {#1767}
[01:42:20] TEACHER: Should I keep that load balance?   {#1768}
[01:42:21] TEACHER: Like imagine there is a very critical service that load balancer you credit.   {#1769}
[01:42:24] TEACHER: That should not be public, but you are putting this, you are added DNS.   {#1770}
[01:42:30] TEACHER: Now what?   {#1771}
[01:42:32] TEACHER: Because of the DNS you're enforcing it to be public.   {#1772}
[01:42:34] TEACHER: That's what it seems like.   {#1773}
[01:42:38] STUDENT_8: So the DNS will hold only IP addresses of, sorry, um, uh, IP addresses   {#1774}
[01:42:45] STUDENT_8: which are public.   {#1775}
[01:42:47] TEACHER: What about private node   {#1776}
[01:42:48] TEACHER: will they only have   {#1777}
[01:42:49] TEACHER: just one LP server?   {#1778}
[01:42:51] TEACHER: What if that goes down?   {#1779}
[01:42:54] TEACHER: Right?   {#1780}
[01:42:55] TEACHER: Yeah.   {#1781}
[01:42:56] TEACHER: Right.   {#1782}
[01:42:56] TEACHER: Okay.   {#1783}
[01:42:57] TEACHER: DNS is the correct answer,   {#1784}
[01:42:58] TEACHER: but let's go detail into it.   {#1785}
[01:43:01] TEACHER: So first of all,   {#1786}
[01:43:03] TEACHER: and I know   {#1787}
[01:43:04] TEACHER: we are having   {#1788}
[01:43:05] TEACHER: detailed discussion,   {#1789}
[01:43:06] TEACHER: but I would want to   {#1790}
[01:43:07] TEACHER: like time is okay.   {#1791}
[01:43:10] TEACHER: 15, 20 minutes   {#1792}
[01:43:11] TEACHER: today's session will stretch,   {#1793}
[01:43:12] TEACHER: but it's fine.   {#1794}
[01:43:13] TEACHER: We want to,   {#1795}
[01:43:13] TEACHER: I want to touch upon this,   {#1796}
[01:43:14] TEACHER: these details.   {#1797}
[01:43:15] TEACHER: that matters right so a lot of misconceptions let me sort one like them one by one so dns is the   {#1798}
[01:43:23] TEACHER: correct answer now here think when you spin up a load balancer you can only give one thing to your   {#1799}
[01:43:30] TEACHER: client behind the scenes you may have so you the first thing that you may think of hey i'm spinning   {#1800}
[01:43:36] TEACHER: up a virtual machine let me give out the ip address of this so that's a natural thing but now ip   {#1801}
---- OWNED SEGMENTS END ----

CTX| [01:43:45] TEACHER: Because IP address is fixed to a machine, you cannot have two machines handling the same thing.   {#1802}
CTX| [01:43:50] TEACHER: So then our LB servers are not scalable, which is very big of a limiting factor.   {#1803}
CTX| [01:43:54] TEACHER: Now, which means that you need a way to, you cannot share IP address.   {#1804}
CTX| [01:43:58] TEACHER: There has to be something else.   {#1805}
CTX| [01:43:59] TEACHER: So what is something that abstracts multiple IP addresses?   {#1806}
CTX| [01:44:03] TEACHER: Domain name.   {#1807}
CTX| [01:44:04] TEACHER: So what do you do?   {#1808}
CTX| [01:44:05] TEACHER: So who manages domain name?   {#1809}
CTX| [01:44:06] TEACHER: So you had a domain name server.   {#1810}
CTX| [01:44:07] TEACHER: So what happens is when you spin up a load balancer, you spin up a domain name for load balancer.   {#1811}
CTX| [01:44:12] TEACHER: So let's say payments.lb.google.com.   {#1812}
CTX| [01:44:17] TEACHER: I should not use this name in my employer now, but still check.   {#1813}
CTX| [01:44:20] TEACHER: Google.com.   {#1814}
CTX| [01:44:21] TEACHER: I am always using this example.   {#1815}
CTX| [01:44:23] TEACHER: I never thought I would work at Google, but that's fine.   {#1816}
CTX| [01:44:26] TEACHER: Okay.   {#1817}
CTX| [01:44:26] TEACHER: Payments.lb.google.com.   {#1818}
CTX| [01:44:28] TEACHER: So every load balancer that you create has a domain name now, because of which   {#1819}
CTX| [01:44:34] TEACHER: what happens is that it abstracts out multiple IP addresses behind it.   {#1820}
CTX| [01:44:41] TEACHER: and this is a private domain now this is where a lot of people don't know dns when someone talks   {#1821}
