# Lecture 01 - Diagrams (final drawn form)

For the illustrator. Each entry gives the final state of the diagram, the clearest frame (in `frames_kept/`), and the time it's first drawn or shown. Colour notes: white = default ink; yellow = headings / key labels; pink = boxes or labels the teacher uses for emphasis; light blue = Kafka partition lines. Temporary strokes are left out: red highlighter scribbles and blue dashed laser-pointer marks. Shapes: rectangle = server/service, cylinder = database/datastore, horizontal pipe = queue/stream/broker, stick figure = user/client.

## D-01 - In-memory cache on API servers (00:06:45-00:21:00)
Frame: b_003030.jpg (also b_001615.jpg)
- Left: stick-figure user (a pink dot on the user, added 00:21, = browser-side cache).
- Two rectangles stacked vertically (API servers). A line runs from the user to each one.
- Each API server has a small pink filled dot in its top-right corner (local in-memory cache).
- Right: a cylinder labelled `DB`. A line runs from each API server to it.
- Above the top API server, a line rises to a small cube/bucket shape labelled `Redis Rem c…` (text cut off at the page edge; meaning "Redis remote cache"). A stray partial `Red` sits above the label.
- Emphasis (00:32:45): red circles on both cache dots and a red line from the user to the top server. This shows a request hitting one server's local cache.

## D-02 - CDN caching API responses (00:25:00-00:28:30)
Frame: b_002945.jpg
- Stick-figure user (left), rectangle = API server (right), cylinder = DB (far right). A short arc joins the server and the DB.
- A cloud labelled `CDN` sits above. Arcs run from the user up to the cloud and from the cloud down to the API server, so the request path goes through the CDN.
- Under the user: URL `https// s~ . — /popular` (the host is a squiggle; per audio it's search.abc.com/popular).

## D-03 - Good scaling plan curve (00:40:45-00:44:30)
Frame: b_004430.jpg
- Hand-drawn axes, unlabelled.
- A yellow curve rises steeply from the origin, then flattens into a long horizontal plateau.
- A purple arrow points to the rising part, labelled `Scale Vertically`. A purple arrow points to the end of the plateau, labelled `Then horizontally`.
- To the right: a pink-outlined box `No pre-mature optimizations`.

## D-04 - medium.com behind a load balancer (00:44:45)
Frame: b_004600.jpg
- Stick-figure user, then a line to a rectangle `LB`.
- Three lines fan out from the LB to three rectangles, each labelled `API`.
- Text beside it: `For our medium.com, we scale - vertically first - then horizontally`.

## D-05 - Scale bottom up (00:44:45)
Frame: b_004600.jpg
- In a row: stick-figure user, a long line, rectangle `API`, a long line, cylinder `DB`.
- A blue arrow points down from API to `Then API servers`. A blue arrow points down from DB to `Scale DB first`.
- Above: `Hence whenever you scale , always do it bottom up !` ("bottom up" highlighted), plus the pink box `Your stateful components like DB and cache can handle those many concurrent requests`.

## D-06 - Scaling a database: three options (00:46:15)
Frame: b_010530.jpg
Heading `Scaling DB` (yellow), three sub-diagrams side by side:
- (a) `vertical scaling`: a small cylinder, an arrow, then a larger cylinder.
- (b) `Read Replicas`: a pink rectangle (API server) on top. Pink lines branch down with arrowheads to two cylinders. A white arrow goes from the left cylinder to the right one (master → replica).
- (c) `Sharding`: a pink rectangle on top. A pink line goes down the left side to the left cylinder, a pink arrow goes down to the top-right cylinder, and a pink line runs down the right side to the bottom-right cylinder. Short white strokes separate the three cylinders (data split across shards).

## D-07 - Medium profile card mock (01:05:45)
Frame: b_010630.jpg
- A white rectangle (card). Stick-figure avatar on the left.
- Text: `Arpit Bhayani` / `CS Engineer, Educator, and a Polymath` / `74 essays` (yellow).
- A pink arrow points up at "74 essays" from the pink label `#blogs of a user`.

## D-08 - Delegate & respond (01:07:15-01:09:00)
Frame: b_010900.jpg
- Stick figure labelled `Client`. A rectangle `API`.
- Arrow ① goes Client → API (top). Arrow ③ goes API → Client (below it).
- Arrow ② goes API → a horizontal pipe labelled `Broker`, with `Task` written under the arrow.
- Three lines fan out from the Broker to three rectangles labelled `worker`.
- From the bottom worker, a line goes down and then left with an arrowhead into a cylinder `Database`. That line is labelled `update DB`.
- A vertical line joins API and Database.

## D-09 - Blog count via SQS (Medium analytics) (01:09:15-01:16:15)
Frame: b_011130.jpg (ES variant: b_011615.jpg)
- Stick figure → arrow → rectangle `API`.
- From the API, a line labelled `ON_PUBLISH` (yellow) goes right, down, then right with an arrowhead into a horizontal pipe labelled `SQS`.
- Three arrows fan out from the SQS to three rectangles `worker`. The label `total_blogs ++` (yellow) sits above the workers.
- Lines from each worker run right to a vertical bus. The bus goes down and back left with an arrowhead into the cylinder `Database`. A vertical line joins API and Database.
- Above the diagram: the `users` table block (`id , name , bio , total_blogs` → `Storing it pre-computed to avoid joins & runtime computation`, `* a crude example`).
- Below: `Similarly, we publish and consume ON-DELETE event ↓ total_blogs --`.
- Variant (01:15-01:16 only): a cylinder labelled `ES` on the far right, with lines from all three workers to it, plus red emphasis around the workers. This variant is the "bad design": one worker doing both jobs.

## D-10 - Broker as buffer (shown 01:11:45)
Frame: b_011741.jpg / b_011400.jpg
- An incoming L-shaped arrow (↳) into a horizontal pink pipe. An outgoing arrow leaves the right end and turns down (┐↓).
- Caption: `Buffer to keep the tasks & messages`. Heading `Brokers` (yellow).

## D-11 - Message queue vs message stream (01:11:45; final form 01:20:30)
Frame: b_012030.jpg (earlier form b_011400.jpg)
- Top row, labelled `Message Queues` / `SQS, RabbitMQ`: incoming arrow into a pink pipe. Three arrows fan out to three rectangles `Consumer`, each with one small yellow square (a message) beside it, so each message goes to one consumer.
- Bottom row, labelled `Message Streams` / `Kafka, Kinesis`: incoming arrow into a pink pipe that holds five small yellow squares (messages) in a row. Vertical lines drop from two of the squares down to a rectangle `Search` (drawn with two offset yellow outlines behind it = several instances) and a rectangle `Analytics` beneath it. Every consumer type reads the same stream at its own position.
- Earlier form: the five squares float above the pipe and Search/Analytics hang separately from the pipe.

## D-12 - Kafka: same event, two consumer types (01:17:30)
Frame: b_011730.jpg / b_012115.jpg / b_025845.jpg
- Stick figure → rectangle `API`.
- A line labelled `ON_PUBLISH` (yellow) runs from API into a horizontal pipe labelled `Kafka` (label in a green highlight pill).
- One arrow goes up-right from Kafka → rectangle `Search Service workers`. A vertical line joins that box up to a cylinder `ElasticSearch`.
- One arrow goes down-right from Kafka → rectangle `Counter Service workers`. From that box, an arrow goes left into the cylinder `Database`.
- A vertical line joins API and Database.
- Text above: `Hence, we use Kafka`, `Same event consumed by two types of consumers`. Higher up: `This is not a good design, because - worker doing total_blogs++ & index on ES`, then a pink brace pointing to `No separation of concern`, then `Seems something two separate teams should be working on !`.

## D-13 - Kafka topic and partitions (01:21:30-01:24:00)
Frame: b_013100.jpg (labels), b_012400.jpg (messages in partitions)
- Top: an incoming L-arrow into a white tube with three light-blue horizontal lines inside (partitions). The topic label `ON-PUBLISH` sits above the tube. One yellow square sits at the right end of the top partition. An outgoing arrow leaves the right end and turns down.
- Second tube (right of the text, three light-blue partition lines): at first four yellow squares wait above it. After 01:24 the squares are placed at the right ends of different partitions (two on top, two near the bottom), showing hash-key placement into partitions.
- Accompanying text: `Kafka is a message stream that holds the messages` / `Internally kafka has topic` / `Every topic has 'n' partitions` / `Message is sent to a topic and depending on the configured hash key it is put into a partition` / `Within partition, messages are ordered ↳ no ordering guarantee across partitions`.

## D-14 - Limitation: #consumers = #partitions (01:24:15)
Frame: b_013430.jpg
- An incoming L-arrow with one yellow square (message) into a tube with three light-blue partition lines. An up-arrow under the tube points to the label `#partitions = 3`.
- From the tube's right end, a bracket of three arrows goes to three pink rectangles labelled `search consumer 1`, `search consumer 2`, `search consumer 3`.
- Below them: two more pink rectangles, each struck through by a red horizontal line, with a pink brace and `No messages would be sent to them`.
- From the bottom of the tube, a vertical line goes down to a second unlabelled group of three pink rectangles: two side by side joined by a dashed line, one centred below.
- Heading: `limitation of kafka` / `# consumers = # partitions`.

## D-15 - The usual communication (01:50:45)
Frame: b_015245.jpg
- Rectangle `client`, rectangle `server`.
- Arrow client → server labelled `REQ` (pink). Arrow server → client labelled `RES` (pink).
- A pink down-arrow from the RES arrow points to `Kept open with Timeout`. A pink up-arrow into the server comes from `Heavy lifting`.

## D-16 - Short polling (01:53:00)
Frame: b_015500.jpg
- Rectangle `client`, a double-headed arrow, rectangle `server`. A small circular arrow above the middle is labelled `every few seconds`.
- Below: `eg: continuously` → `refreshing cricket score` / `checking if server is ready`. Then `Disadvantages:` → `HTTP overhead` / `requests and responses` (both highlighted).

## D-17 - Long polling (01:56:30)
Frame: b_015845.jpg
- Rectangle `client`, rectangle `server`. Arrow client → server `REQ`, arrow server → client `RES` (pink labels).
- Under it, in a highlight pill: `only when data is available`.
- Text: `eg: response only when the ball is bowled`, `Connection re-established after timeout & retried`. Comparison block and the `eg: EC2 provisioning` tree are in b_015915.jpg.

## D-18 - WebSockets (01:59:30)
Frame: b_020500.jpg
- Rectangle `client`, a double-headed arrow, rectangle `server`. Pink `Bidirectional Channel` above the arrow, pink `Kept open` below it.
- Top right: `Socket.IO`. Heading `WebSockets` (yellow).
- Pink line: `* Server can proactively send data to the client *`. Advantages and Applications lists sit below.

## D-19 - Server-sent events (02:02:45)
Frame: b_020645.jpg
- Rectangle `client`, rectangle `server`, two parallel arrows between them. The top arrow is yellow and points right (client → server). The bottom arrow is white and points left (server → client).
- Pink caption above: `proactively sends data to client`. Highlighted label below the arrows: `Unidirectional`.
- `Applications: - stock market ticker - deployment logs streaming`.

## D-20 - Communication in our blog (Medium) (02:08:45)
Frame: b_021345.jpg
- Stick-figure user. A double-headed arrow labelled `HTTP` (pink) to a rectangle `API Server`.
- A double-headed arrow labelled `persistent TCP` (pink) from the API Server to an unlabelled cylinder (database).
- A diagonal double-headed arrow labelled `WS` (pink) from the user to a rectangle `Realtime likes`.
- Below: `Realtime interactions:` with the Twitter / Medium clap / Instagram live examples.
