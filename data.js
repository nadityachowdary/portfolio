window.PROJECTS = [
  {
    id: "caption",
    title: "Image Caption Generation",
    category: "AI & Computer Vision",
    tagline: "Teaching a model to describe what it sees.",
    summary: "A deep-learning image captioning system that pairs a convolutional encoder with an LSTM decoder to turn raw pixels into natural-language descriptions.",
    demo: "caption",
    demoTitle: "Try the caption engine",
    demoDescription: "Pick a sample image or upload your own. The demo runs a simulated two-stage inference pipeline and streams the generated caption word by word.",
    metrics: [
      { label: "Encoder", value: "CNN" },
      { label: "Decoder", value: "LSTM" },
      { label: "Decoding", value: "Beam search" }
    ],
    tech: ["Python", "TensorFlow / Keras", "CNN", "LSTM", "NLP"],
    overview: [
      "Image captioning sits at the boundary between computer vision and natural language processing. The model must first understand what is in an image, then express that understanding as a fluent sentence.",
      "This project implements the classic encoder-decoder recipe: a convolutional neural network reads the image and compresses it into a feature vector, while a recurrent network generates the caption one token at a time, conditioned on the image and the words produced so far."
    ],
    challenge: [
      "Bridging two very different data types — spatial pixel features and sequential language.",
      "Handling variable-length captions with start/end tokens, padding, and a fixed vocabulary.",
      "Avoiding generic output by encouraging the decoder to attend to specific objects and scenes."
    ],
    steps: [
      { title: "Preprocess the image", text: "Resize and normalize the input, then pass it through a CNN backbone to extract high-level feature maps." },
      { title: "Encode the visual context", text: "Global pooling compresses the feature maps into a fixed-length image embedding that represents the scene." },
      { title: "Decode word by word", text: "An LSTM consumes the image embedding plus the previously generated words and predicts the next token in the vocabulary." },
      { title: "Search for the best sentence", text: "Beam search keeps the top candidate sequences at every step, returning the highest-scoring caption instead of greedy word choices." }
    ],
    highlights: [
      { title: "Two-stage architecture", text: "A clear separation between visual feature extraction and language generation makes the pipeline easy to inspect and extend." },
      { title: "Beam-search decoding", text: "Multiple candidate captions are explored at once, producing more natural sentences than greedy decoding." },
      { title: "Reusable feature extractor", text: "The CNN encoder can be frozen or fine-tuned, so the same pipeline adapts to new image domains." }
    ]
  },
  {
    id: "drowsiness",
    title: "Driver Drowsiness Detection",
    category: "AI & Computer Vision",
    tagline: "Real-time fatigue monitoring from a single webcam.",
    summary: "A real-time computer-vision system that tracks facial landmarks to detect eye closure and yawning, alerting the driver before a microsleep becomes dangerous.",
    demo: "drowsiness",
    demoTitle: "Run the fatigue simulator",
    demoDescription: "A synthetic driver feed shows Eye and Mouth Aspect Ratios in real time. Watch the counters react, and hear the alarm when a microsleep is detected.",
    metrics: [
      { label: "Landmarks", value: "468" },
      { label: "Alert trigger", value: "~1.6 s" },
      { label: "Target rate", value: "30 FPS" }
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "NumPy", "Pygame"],
    overview: [
      "Drowsy driving is one of the leading causes of road accidents, and the warning signs appear before a driver falls asleep: eyelids close for longer than a normal blink, and yawning becomes frequent.",
      "This system watches those signals in real time. It reads frames from a webcam, locates facial landmarks with MediaPipe, and computes two simple but effective measurements — the Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR). Sustained low EAR or high MAR triggers an audible alarm."
    ],
    challenge: [
      "Detecting fatigue reliably under different lighting, head poses, and camera angles.",
      "Telling a normal blink apart from a dangerous microsleep using time, not a single frame.",
      "Keeping the loop fast enough for live video while avoiding false alarms."
    ],
    steps: [
      { title: "Capture frames", text: "OpenCV grabs frames from the webcam at 30 FPS and mirrors them for a natural preview." },
      { title: "Find facial landmarks", text: "MediaPipe Face Landmarker returns 468 3D landmarks for the face in every frame." },
      { title: "Measure EAR and MAR", text: "Six points around each eye produce the Eye Aspect Ratio; twelve mouth points produce the Mouth Aspect Ratio." },
      { title: "Track and alert", text: "Consecutive frames below the EAR threshold, or above the MAR threshold, count toward a drowsiness or yawn event and fire the alarm." }
    ],
    highlights: [
      { title: "Landmark-based, lightweight", text: "No custom training data required — the geometry of the face does the work, so the system runs comfortably on a laptop CPU." },
      { title: "Temporal filtering", text: "Frame counters and cooldowns suppress one-frame noise, distinguishing blinking from actual eye closure." },
      { title: "Audible alarm", text: "A threaded audio alarm keeps the warning immediate without stalling the video loop." }
    ]
  },
  {
    id: "sales",
    title: "E-Commerce Sales & Customer Analytics",
    category: "Data Analytics",
    tagline: "Turning orders into decisions.",
    summary: "An end-to-end analytics project that answers real business questions with SQL and Pandas — from regional revenue and RFM segmentation to discount elasticity and customer lifetime value.",
    demo: "sales",
    demoTitle: "Explore the analytics dashboard",
    demoDescription: "Filter by region and metric to recompute KPIs, the monthly trend, and the category mix. Every number updates instantly from an embedded sample of the analysis.",
    metrics: [
      { label: "Result sets", value: "7" },
      { label: "Segmentation", value: "RFM" },
      { label: "Engine", value: "SQLite + Pandas" }
    ],
    tech: ["Python", "Pandas", "SQL", "SQLite", "Matplotlib"],
    overview: [
      "A sales dataset is only useful when it changes a decision. This project starts from raw order records and works through the questions a commercial team actually asks: where is revenue coming from, which customers matter most, and what is quietly losing money?",
      "The analysis loads orders into SQLite so the SQL layer is genuinely executed, then produces seven result sets and a chart pack. It covers revenue by region and category, monthly trends, RFM customer segmentation, payment method performance, discount elasticity, loss-making products, and lifetime value by region."
    ],
    challenge: [
      "Joining revenue and profitability views so growth is never mistaken for health.",
      "Segmenting customers by recency, frequency, and monetary value without a pre-built CRM.",
      "Quantifying discount behaviour and flagging products that sell well but lose money."
    ],
    steps: [
      { title: "Load the raw orders", text: "Flat CSV extracts are cleaned and loaded into SQLite so analysis queries run against a real database engine." },
      { title: "Query the business questions", text: "SQL handles aggregation, window-style ranking, margins, and monthly trends across region and category." },
      { title: "Segment customers", text: "Pandas computes RFM scores, then groups customers into actionable segments such as champions, at-risk, and loyal." },
      { title: "Package the insight", text: "Result sets are exported to CSV and a combined chart pack visualizes the story for stakeholders." }
    ],
    highlights: [
      { title: "Seven decision-ready outputs", text: "Each query maps to a concrete question, from regional margins to which SKUs destroy value." },
      { title: "RFM segmentation", text: "Customers are ranked and grouped so marketing can target retention instead of guessing." },
      { title: "Profit, not just revenue", text: "Margin and loss-making product views keep the analysis honest about business performance." }
    ]
  },
  {
    id: "etl",
    title: "Automated ETL Pipeline",
    category: "Data Engineering",
    tagline: "A warehouse you can trust to run again.",
    summary: "An idempotent, incremental ETL pipeline that loads raw sales extracts into a SQLite star schema with referential-integrity checks, audit logging, and a run report.",
    demo: "etl",
    demoTitle: "Run the pipeline",
    demoDescription: "Trigger a pipeline run and watch extract, validate, transform, and load move through each stage. Run it a second time to see idempotency in action.",
    metrics: [
      { label: "Schema", value: "Star" },
      { label: "Dimensions", value: "5" },
      { label: "Reruns", value: "Idempotent" }
    ],
    tech: ["Python", "Pandas", "SQLite", "Star Schema", "Logging"],
    overview: [
      "Analysts lose hours to data they cannot trust. This project treats the warehouse as software: every run is logged, every load is repeatable, and the schema is designed for querying rather than for storage convenience.",
      "Raw sales extracts are validated, cleaned, deduplicated, and loaded into a star schema with one fact table and five conformed dimensions. A state file tracks the highest processed order, so only new rows are ingested. Referential integrity is verified before commit, and a row-level audit trail records what happened."
    ],
    challenge: [
      "Making reruns safe — a second run must never duplicate or corrupt existing rows.",
      "Only ingesting new records without reprocessing the full history each time.",
      "Enforcing relationships across fact and dimension tables before data is committed."
    ],
    steps: [
      { title: "Extract and validate", text: "The pipeline reads the raw CSV, checks schema and data types, and rejects malformed rows with an audit reason." },
      { title: "Transform", text: "Duplicates are removed, missing values are handled, and dimension keys plus business measures are derived." },
      { title: "Load the star schema", text: "Fact and dimension tables are upserted in dependency order, so reruns produce identical warehouse contents." },
      { title: "Audit and report", text: "Row-level logs, table counts, integrity checks, and a markdown summary are written for every run." }
    ],
    highlights: [
      { title: "Idempotent by design", text: "Upserts and a processed-ID state file mean a rerun is a no-op instead of a duplicate-load incident." },
      { title: "Incremental ingestion", text: "Only rows newer than the last processed order enter the warehouse, keeping runtime predictable." },
      { title: "Auditable output", text: "Every run leaves a trace: log file, row-level CSV, table counts, and a human-readable report." }
    ]
  },
  {
    id: "heart",
    title: "Heart Disease Risk Prediction",
    category: "Data Science",
    tagline: "From clinical data to explainable risk.",
    summary: "An end-to-end data science study on clinical records — cleaning, correlation analysis, feature transformation, and classification models for heart-disease risk.",
    demo: "heart",
    demoTitle: "Try the risk calculator",
    demoDescription: "Adjust the clinical inputs and watch a logistic-style risk estimate update live. The factors panel shows which inputs are pushing the score up or down.",
    metrics: [
      { label: "Workflow", value: "EDA → Model" },
      { label: "Target", value: "Binary" },
      { label: "Output", value: "Risk score" }
    ],
    tech: ["Python", "Pandas", "Scikit-learn", "Seaborn", "Jupyter"],
    overview: [
      "Clinical datasets are messy, sensitive, and full of correlated features. This project works through the full analytical path: understanding the data, cleaning it, exploring relationships, and training classification models that estimate heart-disease risk.",
      "The notebook covers missing-value checks, duplicate removal, column renaming, categorical transformation, correlation analysis, and model evaluation. The goal is not just a score, but an understanding of which measurements move that score."
    ],
    challenge: [
      "Cleaning a real clinical dataset without silently changing its meaning.",
      "Choosing features that are informative without leaking the target.",
      "Reporting model quality in a way a non-technical stakeholder can interpret."
    ],
    steps: [
      { title: "Understand and clean", text: "Inspect shape, dtypes, missing values, and duplicates; rename columns into readable labels and transform coded categories." },
      { title: "Explore relationships", text: "Correlation analysis and visual distributions highlight which features track the target and which are redundant." },
      { title: "Train classifiers", text: "Multiple classification models are trained and compared under a consistent train/test split." },
      { title: "Evaluate and explain", text: "Accuracy, recall, and ROC-AUC describe performance, while feature influence explains the drivers behind a prediction." }
    ],
    highlights: [
      { title: "Reproducible notebook", text: "Every cleaning and modeling decision is documented step by step, from raw data to evaluation." },
      { title: "Model comparison", text: "A shared evaluation setup makes it clear which classifier earns its place." },
      { title: "Explainable factors", text: "Risk is presented alongside the inputs that influence it, not as a black-box number." }
    ]
  },
  {
    id: "jobs",
    title: "JobScout Agent",
    category: "Automation",
    tagline: "A job hunt that runs while you sleep.",
    summary: "A remote-job aggregator that pulls listings from multiple boards, scores matches by skills and recency, deduplicates in SQLite, and pushes alerts to Telegram and email.",
    demo: "jobs",
    demoTitle: "Run a job scan",
    demoDescription: "Type a keyword, trigger a scan, and watch the agent score and rank opportunities by match strength while removing duplicates.",
    metrics: [
      { label: "Sources", value: "14" },
      { label: "Dedup store", value: "SQLite" },
      { label: "Alerts", value: "Telegram + Email" }
    ],
    tech: ["Python", "SQLite", "JobSpy", "Telegram API", "SMTP"],
    overview: [
      "Job hunting is a daily search problem: dozens of boards, overlapping listings, and roles that disappear before you see them. JobScout automates the repetitive part and leaves the decision to the human.",
      "The agent pulls from remote job boards and AI-training marketplaces, filters for remote roles and recency, scores each listing against configured skill keywords, removes anything already seen using SQLite, then sends a digest through Telegram and email."
    ],
    challenge: [
      "Normalizing very different job-board feeds into one consistent listing shape.",
      "Removing cross-posted duplicates without dropping genuinely new roles.",
      "Keeping alerts timely while respecting rate limits and avoiding noise."
    ],
    steps: [
      { title: "Fetch listings", text: "Source adapters pull roles from each board and normalize title, company, tags, location, and posting time." },
      { title: "Filter and score", text: "Remote and recency filters run first; keyword weights then produce a transparent match score per listing." },
      { title: "Deduplicate", text: "A SQLite store remembers previously seen roles, so only genuinely new matches survive." },
      { title: "Notify", text: "The best matches are formatted into a digest and delivered to Telegram and email on a schedule." }
    ],
    highlights: [
      { title: "Transparent matching", text: "Keyword scoring is visible and tunable in config — no opaque ranking layer." },
      { title: "Stateful deduplication", text: "A local database keeps repeat alerts out of your inbox." },
      { title: "Scheduled end to end", text: "One command runs the full fetch-filter-score-notify loop on a cron or Task Scheduler trigger." }
    ]
  },
  {
    id: "lead",
    title: "Lead Capture Bot",
    category: "AI Automation",
    tagline: "Reply in seconds, not days.",
    summary: "An AI-powered lead-response bot that drafts personalized replies with Google Gemini, sends them through Gmail, and logs every lead to CSV.",
    demo: "lead",
    demoTitle: "Generate a lead reply",
    demoDescription: "Enter a lead, choose a service and tone, then generate and 'send' an AI-style response. The activity log fills as each step completes.",
    metrics: [
      { label: "Model", value: "Gemini" },
      { label: "Delivery", value: "Gmail" },
      { label: "Audit log", value: "CSV" }
    ],
    tech: ["Python", "Gemini API", "Gmail SMTP", "CSV"],
    overview: [
      "Small businesses lose leads in the gap between an inquiry arriving and someone replying. A fast, personal first response often matters more than a perfect one.",
      "This bot reads incoming leads, asks Google Gemini to write a warm reply using the lead's name, company, and requested service, sends the message through Gmail, and appends the lead and send status to a CSV log."
    ],
    challenge: [
      "Writing replies that feel personal rather than obviously templated.",
      "Sending email reliably without exposing credentials in source code.",
      "Keeping a durable record of every lead and every response."
    ],
    steps: [
      { title: "Read the lead", text: "Lead details are loaded from a JSON feed that a website form or CRM can write to." },
      { title: "Draft with AI", text: "Gemini receives the business context, service, and tone, then generates a short, personalized reply." },
      { title: "Send via Gmail", text: "The message is delivered through an app-password-authenticated Gmail account." },
      { title: "Log the outcome", text: "Name, contact, company, service, and send status are appended to a CSV for follow-up." }
    ],
    highlights: [
      { title: "Genuinely personalized", text: "Each reply uses the lead's own context instead of a fixed template." },
      { title: "Zero-cost stack", text: "Gemini's free API tier and Gmail keep the running cost of the automation near zero." },
      { title: "Auditable follow-up", text: "The CSV log doubles as a lightweight CRM export." }
    ]
  },
  {
    id: "crypto",
    title: "Crypto Scanner API",
    category: "Backend & APIs",
    tagline: "A clean API in front of live market data.",
    summary: "A FastAPI service that exposes live cryptocurrency prices from Binance with a simple, documented REST interface built for extension into a market scanner.",
    demo: "crypto",
    demoTitle: "Call the live price endpoint",
    demoDescription: "Send a request for a trading pair. The demo queries Binance directly when the network allows it, and shows latency, status, and raw JSON.",
    metrics: [
      { label: "Framework", value: "FastAPI" },
      { label: "Data source", value: "Binance" },
      { label: "Format", value: "JSON" }
    ],
    tech: ["FastAPI", "Python", "REST", "Binance API", "Requests"],
    overview: [
      "Market data is only useful when it is easy to reach. This service wraps the Binance public API in a small FastAPI application with clear routes, automatic documentation, and a structure that can grow into a scanner.",
      "The first endpoint returns the latest price for a requested symbol. The design deliberately keeps the upstream call isolated, so caching, multi-symbol scans, alerts, or a database layer can be added without touching the route contract."
    ],
    challenge: [
      "Handling upstream errors and invalid symbols without leaking raw failures to clients.",
      "Keeping the route contract stable while the upstream API evolves.",
      "Designing for extension beyond a single-symbol price lookup."
    ],
    steps: [
      { title: "Receive the request", text: "FastAPI validates the query parameters and exposes interactive OpenAPI docs automatically." },
      { title: "Call Binance", text: "The route builds the upstream ticker request and applies a timeout so a slow provider cannot hang the service." },
      { title: "Normalize the response", text: "Upstream fields are mapped into a predictable response shape with clear error cases." },
      { title: "Return JSON", text: "The client receives a compact JSON payload, ready for a dashboard, bot, or scanner to consume." }
    ],
    highlights: [
      { title: "Self-documenting", text: "FastAPI generates OpenAPI docs from the route definitions — no separate schema to maintain." },
      { title: "Provider isolation", text: "The Binance integration is a single seam, making caching or provider swaps straightforward." },
      { title: "Scanner-ready", text: "The price endpoint is the first building block for multi-symbol scans and alerting." }
    ]
  },
  {
    id: "telegram",
    title: "Telegram Automation Toolkit",
    category: "Automation",
    tagline: "Reusable building blocks for chat workflows.",
    summary: "A modular toolkit for automating Telegram workflows, with configurable API credentials, session handling, and reusable task modules.",
    demo: "telegram",
    demoTitle: "Simulate a workflow",
    demoDescription: "Choose a workflow, edit the message, and run it. The phone preview and activity log show how a task module executes step by step.",
    metrics: [
      { label: "Client", value: "Telethon" },
      { label: "Config", value: "Env-based" },
      { label: "Design", value: "Modular" }
    ],
    tech: ["Python", "Telethon", "APIs", "Sessions", "Automation"],
    overview: [
      "Telegram automation becomes difficult when every script re-implements login, session handling, rate limits, and error recovery. This toolkit factors those concerns out into shared infrastructure.",
      "Workflows are expressed as small task modules that run on top of a common client layer. Credentials stay in environment variables, sessions are persisted, and each task logs what it did so runs are repeatable and debuggable."
    ],
    challenge: [
      "Sharing one authenticated session safely across multiple task modules.",
      "Handling rate limits and transient failures without losing work.",
      "Keeping credentials out of source and logs."
    ],
    steps: [
      { title: "Load configuration", text: "API credentials and session paths are read from the environment, never hard-coded." },
      { title: "Open a session", text: "The shared client layer restores an authenticated session and exposes a single connection to task modules." },
      { title: "Execute the task", text: "A workflow module performs its actions with pacing and error handling around each request." },
      { title: "Log the result", text: "Outcomes are recorded per step, making silent failures visible and reruns safe." }
    ],
    highlights: [
      { title: "Shared client layer", text: "Login, sessions, and retries live in one place instead of being duplicated by every script." },
      { title: "Composable modules", text: "New workflows plug into the same execution and logging contract." },
      { title: "Safe configuration", text: "Secrets stay in environment variables, with example config committed instead of real keys." }
    ]
  }
];
