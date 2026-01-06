
//This module exports an array of course objects.
 
module.exports = [
  {
    // Unique identifier (internal key)
    id: "py-foundations",

    // URL-friendly identifier 
    slug: "py-foundations",

    // Main course title shown in UI
    title: "Introduction to Programming with Python",

    // Short secondary title shown below the main title
    subtitle: "Start coding from scratch",

    // Category used for filtering 
    category: "programming",

    // Difficulty level used for filtering 
    level: "beginner",

    // Duration shown in UI 
    duration: "5 εβδομάδες",

    // Content language
    language: "GR",

    // Delivery mode 
    mode: "self-paced",

    // Short description used in cards 
    shortDescription:
      "Learn basic programming concepts with Python and build today your first project",

    // Full description shown on the details page
    longDescription:
      "The concept of the program. Variables, variable types, expressions and arithmetic calculations. Control structures and iteration structures of the Python language. Data input/output. Error detection and elimination. Functions and methods. The concept of the algorithm. Algorithm design and principles of structured programming. Structured types, alphanumerics, lists, arrays. Search algorithms, sorting algorithms, mathematical problems. Data files. The concept of recursion.",

    // Number of lessons included in the course
    lessonsCount: 32,

    // Number of projects included in the course
    projectsCount: 3,

    // Whether a certificate is offered after completion
    hasCertificate: true,

    // Featured course 
    isFeatured: true,

    // Marks newly added courses
    isNew: true,

    // Popular course 
    popular: true,

    // Average rating (0–5 scale)
    rating: 4.8,

    // Number of ratings
    ratingCount: 152,

    // Thumbnail image path 
    thumbnail: "assets/img/thumbnails/js-foundations.jpg",

    // Tags used for search and filtering
    tags: ["python", "programming", "Beginner"],

    // Availability flag (if false, UI can show "coming soon" or disable enroll button)
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "java-foundations",

    // URL-friendly identifier 
    slug: "java-foundations",

    // Main course title shown in UI
    title: "Programming with Java",

    // Short secondary title shown below the main title
    subtitle: "Expand your knowledge with Java and acquire new skills",

    // Category used for filtering
    category: "programming",

    // Difficulty level used for filtering
    level: "intermediate",

    // Duration shown in UI 
    duration: "5 εβδομάδες",

    // Content language
    language: "GR",

    // Delivery mode
    mode: "self-paced",

    // Short description used in cards
    shortDescription:
      "Learn basic programming concepts with Java and build today your first project",

    // Full description shown on the details page
    longDescription:
      "Structure of a Java program and control statements. Classes and objects: creation functions, instance variables, static variables, object references. Methods: method scope, code hiding, method overloading, static methods. Packages. Inheritance and polymorphism: class hierarchy optimization and code reuse, polymorphic processing and dynamic method binding, abstract and final classes and methods, creating and using interfaces. Designing with object-oriented programming",

    // Stats
    lessonsCount: 32,
    projectsCount: 3,

    // UI flags
    hasCertificate: true,
    isFeatured: true,
    isNew: true,
    popular: true,

    // Ratings
    rating: 4.8,
    ratingCount: 152,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/js-foundations.jpg",

    // Tags used for search/filtering
    tags: ["Java", "programming", "intermediate"],

    // Availability status
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "html-css-web",

    // URL-friendly identifier 
    slug: "html-css-web-design",

    // Titles shown in UI
    title: "Web Development with HTML, CSS & JS",
    subtitle: "Build responsive websites with modern layout techniques",

    // Filters
    category: "web",
    level: "beginner",
    duration: "4 εβδομάδες",
    language: "GR",
    mode: "self-paced",

    // Descriptions
    shortDescription:
      "Use HTML5, CSS3, Flexbox, Grid and responsive design to make modern websites that suitable for every kind of device.",
    longDescription:
      "Τhe role of HTML5, CSS. Semantic description of content using HTML5, XML markup languages. The CSS standard for formatting and layout of HTML content. CSS rule syntax and cascading mechanism. Content layout using CSS. Responsive Web Content Design Techniques. Introduction to the JavaScript programming language. Development of applications on the Web Browser(HTML forms, events, event handling).",

    // Stats
    lessonsCount: 24,
    projectsCount: 2,

    // UI flags
    hasCertificate: true,
    isFeatured: true,
    isNew: false,
    popular: true,

    // Ratings
    rating: 4.7,
    ratingCount: 198,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/html-css-web.jpg",

    // Tags
    tags: ["HTML5", "CSS3", "Responsive", "Front-end"],

    // Availability
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "comp-sci-intro",

    // URL-friendly identifier 
    slug: "comp-sci-intro",

    // Titles shown in UI
    title: "Introduction to Computer Science",
    subtitle: "The basics of network operation",

    // Filters
    category: "networks",
    level: "beginner",
    duration: "6 εβδομάδες",
    language: "GR",
    mode: "self-paced",

    // Descriptions
    shortDescription:
      "Algorithms, data structures, computational theory and computer architecture basics.",
    longDescription:
      "Algorithms and computer programming principles (basic logic, elementization, sequencing, iteration, recursion, efficiency of algorithms). Data structures (arrays, lists, stacks, trees). Theory of computation (computability and complexity, P and NP classes). Computer architecture (logic gates, instruction execution, memory, machine architecture, machine language, parameter passing, input/output units). Programming languages ​​(grammars, parsers, compilers). Operating systems (processes, scheduling). File and database systems. Computer networks and the Internet (basic Internet protocols, HTML, TCP, WiFi).",

    // Stats
    lessonsCount: 36,
    projectsCount: 3,

    // UI flags
    hasCertificate: true,
    isFeatured: false,
    isNew: true,
    popular: true,

    // Ratings
    rating: 4.6,
    ratingCount: 121,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/python-intro.jpg",

    // Tags
    tags: ["computer science", "networks", "Beginner"],

    // Availability
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "web-fullstack-path",

    // URL-friendly identifier 
    slug: "fullstack-web-path",

    // Titles shown in UI
    title: "Web Applications Technologies and Programming",
    subtitle: "HTML, CSS, JavaScript, REST APIs & Basic Backend",

    // Filters
    category: "web",
    level: "advanced",
    duration: "8 εβδομάδες",
    language: "GR",
    mode: "self-paced",

    // Descriptions
    shortDescription:
      "Web development path that combines front-end and back-end concepts with practical projects.",
    longDescription:
      "World Wide Web – Basic Concepts. World Wide Web Architecture and Standards. Web Servers, Proxies and Caches. Web Application Architecture: Three-Tier Architecture, Roles of Each Tier. Web Browser as an Application Development Platform – Role of HTML5, CSS, JavaScript (JS). Semantic Content Description Using HTML5, XML Markup Languages. CSS for Formatting and Layout of HTML Content. CSS Rules Syntax and Cascading Mechanism. Content Layout Using CSS. Responsive Web Content Design Techniques. Introduction to the JavaScript Programming Language. Object-Oriented Programming in JS. Developing Applications on the Web Browser Platform Using JS",

    // Stats
    lessonsCount: 40,
    projectsCount: 2,

    // UI flags
    hasCertificate: true,
    isFeatured: true,
    isNew: false,
    popular: true,

    // Ratings
    rating: 4.5,
    ratingCount: 89,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/fullstack-path.jpg",

    // Tags
    tags: ["advanced", "JavaScript", "REST", "web"],

    // Availability
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "wir-net",

    // URL-friendly identifier 
    slug: "wir-net",

    // Titles shown in UI
    title: "Wireless Networks and Mobile Communications",
    subtitle: "Introduction and general overview of wireless and mobile communications",

    // Filters
    category: "networks",
    level: "advanced",
    duration: "4 εβδομάδες",
    language: "GR",
    mode: "self-paced",

    // Descriptions
    shortDescription:
      "Wireless communications, signal propagation, local area networws of IEEE 802.11 family, and mobile networks basics.",
    longDescription:
      "Wireless channel and signal propagation. Wireless multiple access techniques. IEEE 802.11 wireless local area networks. 1-5G and 6G mobile telecommunications. TCP over wireless networks. Mobile IP protocol and micro-mobility. Ad hoc networks and mobile Internet of Things (IoT). Device-to-device communication. Reliable and trusted communication of wireless and mobile devices. Mobile computing.",

    // Stats
    lessonsCount: 20,
    projectsCount: 1,

    // UI flags
    hasCertificate: true,
    isFeatured: false,
    isNew: false,
    popular: false,

    // Ratings
    rating: 4.4,
    ratingCount: 64,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/networking-basics.jpg",

    // Tags
    tags: ["Networking", "wireless", "advanced"],

    // Availability
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "info_retrieval-systems",

    // URL-friendly identifier 
    slug: "info_retrieval-systems",

    // Titles shown in UI
    title: "Information Retrieval systems",
    subtitle: "Information collection, indexing and retrieval",

    // Filters
    category: "web",
    level: "intermediate",
    duration: "5 εβδομάδες",
    language: "GR",
    mode: "self-paced",

    // Descriptions
    shortDescription:
      "Basic retrieval techniques, reversed indexes, ranking algorithms and evaluation metrics.",
    longDescription:
      "Basic concepts of information retrieval. Introduction to inverted indexes. Boolean retrieval model. Indexing. Τrackers, text preprocessing (tokenization, linguistic analysis, suffix stripping, lemmatization). Search structures in inverted indexes, query processing methods, enrichment methods and variants of inverted indexes. Algorithms for constructing inverted indexes. Text statistics and compression of inverted indexes. Weighted retrieval. Vector space retrieval model. Evaluation of retrieval systems. Calculation of scores in a complete retrieval system",

    // Stats
    lessonsCount: 22,
    projectsCount: 2,

    // UI flags
    hasCertificate: true,
    isFeatured: true,
    isNew: true,
    popular: true,

    // Ratings
    rating: 4.7,
    ratingCount: 110,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/cyber-security-intro.jpg",

    // Tags
    tags: ["web", "sap", "intermediate"],

    // Availability
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "net",

    // URL-friendly identifier 
    slug: "net",

    // Titles shown in UI
    title: "Computer Networks",
    subtitle: "Internet Protocols, Sockets, Network Layers, etc",

    // Filters
    category: "networks",
    level: "intermediate",
    duration: "5 εβδομάδες",
    language: "GR",
    mode: "self-paced",

    // Descriptions
    shortDescription:
      "Deep analysis of fundamental networking concepts, protocols and architectures.",
    longDescription:
      "Data link layer: rolling window protocols, protocol validation. Network layer: design issues, routing algorithms, flow control, quality of service, internetworking, IP protocol extensions (multicast, mobility, IPv6). Transport layer: client-server model, network interfaces (sockets), transport layer protocol design, TCP protocol algorithms, performance issues. Application layer and services: email (SMTP, POP, IMAP protocols), World Wide Web (WWW), content delivery networks (CDN). Introduction to network security.",

    // Stats
    lessonsCount: 28,
    projectsCount: 2,

    // UI flags
    hasCertificate: true,
    isFeatured: false,
    isNew: false,
    popular: true,

    // Ratings
    rating: 4.6,
    ratingCount: 92,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/sql-databases.jpg",

    // Tags
    tags: ["computer networks", "networks", "intermediate"],

    // Availability
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "cybersecurity",

    // URL-friendly identifier 
    slug: "cybersecurity",

    // Titles shown in UI
    title: "Cybersecurity",
    subtitle: "C I A • Threats • Vulnerabilities",

    // Filters
    category: "security",
    level: "intermediate",
    duration: "2 εβδομάδες",
    language: "GR",
    mode: "self-paced",

    // Descriptions
    shortDescription:
      "Basic security concepts, threats, ethical hacking, security testing techniques.",
    longDescription:
      "Conceptual Foundation: Basic concepts and definitions. Relationships and differentiations. Analysis and visualization through E-R diagrams. Risk Assessment: Objectives, capabilities and limitations of risk analysis and management techniques. Examples of techniques (CRAMM, OCTAVE etc.). Access Control: Identification, authentication, authorization, agnostic and probabilistic protocols, biometric technologies. Public Key Infrastructure (PKI). Digital signatures/certificates. Cryptanalysis. Exploitation of Cryptology. Virus-like Software: Delimitation and classification. Trojan horses, worms, virus programs. Algorithmic approach. Foundations: Cohen (Turing Machines). Internet Security, Hackers and Hacking. Ethics of Security. Hacking and Hacktivism. WLAN Security. Security Assessment and Audit Software. Personal Data Protection: Privacy and Personal Data Protection.",

    // Stats
    lessonsCount: 12,
    projectsCount: 1,

    // UI flags
    hasCertificate: true,
    isFeatured: false,
    isNew: true,
    popular: false,

    // Ratings
    rating: 4.3,
    ratingCount: 47,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/git-essentials.jpg",

    // Tags
    tags: ["cyber", "intermediate", "security"],

    // Availability
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "net-sec",

    // URL-friendly identifier 
    slug: "net-sec",

    // Titles shown in UI
    title: "Network Security",
    subtitle:
      "Introduction to cryptographic techniques (symmetric, public key) and hashing techniques",

    // Filters
    category: "security",
    level: "advanced",
    duration: "4 εβδομάδες",
    language: "GR",
    mode: "self-paced",

    // Descriptions
    shortDescription:
      "Authentication on the Internet, vulnerabilities and threats in the local network, defense techniques.",
    longDescription:
      "Introduction to cryptographic techniques (symmetric, public key) and digest techniques, flaws in techniques. Authentication on the Internet (Needham-Schroeder models, Kerberos, Lamport S/Keys, OTPs, MAC/EAP), vulnerabilities and threats in the local network and on the Internet (eavesdropping, spoofing, replication, man-in-the-middle attack, hacking). Defense techniques, security countermeasures and availability (firewalls, intruder detection/prevention). Secure protocols and services in IP networks.",

    // Stats
    lessonsCount: 18,
    projectsCount: 1,

    // UI flags
    hasCertificate: true,
    isFeatured: false,
    isNew: false,
    popular: false,

    // Ratings
    rating: 4.2,
    ratingCount: 38,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/devops-basics.jpg",

    // Tags
    tags: ["security", "advanced", "net-sec"],

    // Availability
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "c++",

    // URL-friendly identifier
    slug: "c++",

    // Titles shown in UI
    title: "C++ : A high level programming language",
    subtitle: "Master your skills in programming",

    // Filters
    category: "programming",
    level: "advanced",
    duration: "3 εβδομάδες",
    language: "GR",
    mode: "self-paced",

    // Descriptions
    shortDescription:
      "Practise yourself the most popular programming language used in various domains.",
    longDescription:
      "Pointers and dynamic memory allocation. References. Passing parameters by value, by reference through pointers, and by reference through references. Functions that return pointers or references. Function overloading. Function templates.",

    // Stats
    lessonsCount: 16,
    projectsCount: 1,

    // UI flags
    hasCertificate: true,
    isFeatured: true,
    isNew: false,
    popular: true,

    // Ratings
    rating: 4.9,
    ratingCount: 73,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/frontend-lab.jpg",

    // Tags
    tags: ["c++", "advanced", "programming"],

    // Availability
    available: true,
  },

  {
    // Unique identifier (internal key)
    id: "law",

    // URL-friendly identifier 
    slug: "law",

    // Titles shown in UI
    title: "Ιnformation law elements",
    subtitle:
      "Introductory principles of the law governing information, in the field of information technology and communications",

    // Filters
    category: "security",
    level: "beginner",
    duration: "4 εβδομάδες",
    language: "GR",
    mode: "self-paced",

    // Descriptions
    shortDescription:
      "GDPR, Hacking, DDOS, Computer/Digital Forensics, ISPs, search engines.",
    longDescription:
      "Intellectual Property and Information Society, Electronic Commerce, Provider Liability, Privacy and Confidentiality Protection and the Relationship with Information Systems Security, Special Issues of Privacy and Personal Data Protection, Privacy Protection, Cybercrime and Information Systems Security",

    // Stats
    lessonsCount: 18,
    projectsCount: 1,

    // UI flags
    hasCertificate: true,
    isFeatured: false,
    isNew: false,
    popular: false,

    // Ratings
    rating: 4.2,
    ratingCount: 38,

    // Thumbnail image path
    thumbnail: "assets/img/thumbnails/devops-basics.jpg",

    // Tags
    tags: ["law", "beginner", "security"],

    // Availability
    available: true,
  },
];
