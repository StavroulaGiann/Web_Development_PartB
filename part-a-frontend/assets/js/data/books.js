

window.BOOKS = [
  {
    /* Unique id */
    id: "py-book",

    /* Titles */
    title: "Εισαγωγή στον Υπολογισμό και τον Προγραμματισμό με την Python, 3η έκδοση",
    subtitle: "Βασισμένο σε ένα massive open online course (MOOC) του MIT.",

    /* Filters */
    category: "programming",   // e.g. programming, web, networks, security
    level: "beginner",         // beginner | intermediate | advanced
    language: "GR",            // GR | EN

    /* Metadata */
    pages: 616,
    year: 2022,
    author: "Guttag John V.",

    /* Descriptions */
    shortDescription:
      "Το παρόν βιβλίο εισάγει τον αναγνώστη με μικρή ή καθόλου εμπειρία στον προγραμματισμό, χρησιμοποιώντας τη γλώσσα Python.",
    longDescription:
      "Στην παρούσα τρίτη έκδοση η βασική επεξηγηματική ύλη επεκτείνεται με επιπλέον προγραμματιστικά παραδείγματα και πολύ περισσότερες «ασκήσεις εμπέδωσης», γεγονός που την καθιστά μια σχετικά ομαλή εισαγωγή στον προγραμματισμό για τους αρχάριους. Σε ένα νέο κεφάλαιο επιδεικνύεται η χρήση του πακέτου pandas για την ανάλυση δεδομένων χρονοσειρών. Όλος ο κώδικας έχει γραφτεί εκ νέου ώστε να συμμορφώνεται με τα πρότυπα του PEP 8. Πέρα από τα παραδοσιακά θέματα, το βιβλίο πραγματεύεται επίσης ένα ευρύ φάσμα θεμάτων που δεν περιλαμβάνονται συνήθως στα εισαγωγικά βιβλία, όπως οπτική αναπαράσταση πληροφορίας, προσομοιώσεις για τη μοντελοποίηση της τυχαιότητας, υπολογιστικές τεχνικές για την κατανόηση δεδομένων, στατιστικές τεχνικές που πληροφορούν (και παραπληροφορούν) και προβλήματα βελτιστοποίησης και δυναμικός προγραμματισμός. Το βιβλίο περιλαμβάνει επίσης έναν συνοπτικό οδηγό αναφοράς της Python 3.",

    /* UI flags */
    isFeatured: true,          // εμφανίζεται σε featured section
    isNew: true,               // badge “New”
    popular: true,             // badge/boost σε sorting

    /* Rating */
    rating: 4.7,
    ratingCount: 87,

    /* Availability */
    available: true,

    /* Tags  */
    tags: ["python", "Beginner"],

    /* Image */
    image: "assets/img/thumbnails/py.jpg",

    /* Responsive images (srcset) */
    imageSrcSet: `
    assets/img/thumbnails/py.jpg 320w,
    assets/img/thumbnails/py.jpg 640w,
    a ssets/img/thumbnails/py.jpg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "html-css-handbook",

    /* Titles */
    title: "HTML and CSS",
    subtitle: "Design and Build Websites",

    /* Filters */
    category: "web",
    level: "beginner",
    language: "EN",

    /* Metadata */
    pages: 512,
    year: 2011,
    author: "Duckett Jon",

    /* Descriptions */
    shortDescription:
      "A full-color introduction to the basics of HTML and CSS from the publishers of Wrox",
    longDescription:
      " Introduces HTML and CSS in a way that makes them accessible to everyone hobbyists, students, and professionals and it s full-color throughout * Utilizes information graphics and lifestyle photography to explain the topics in a simple way that is engaging * Boasts a unique structure that allows you to progress through the chapters from beginning to end or just dip into topics of particular interest at your leisure This educational book is one that you will enjoy picking up, reading, then referring back to. It will make you wish other technical topics were presented in such a simple, attractive and engaging way!",

    /* UI flags */
    isFeatured: true,
    isNew: false,
    popular: true,

    /* Ratings */
    rating: 4.6,
    ratingCount: 65,

    /* Availability */
    available: true,

    /* Tags */
    tags: ["HTML5", "CSS3", "Responsive"],

    /* Cover image */
    image: "assets/img/thumbnails/html-css.png",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/html-css.png 320w,
    assets/img/thumbnails/html-css.png 640w,
    a ssets/img/thumbnails/html-css.png 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "java-starter-book",

    /* Titles */
    title: "Java Προγραμματιμός, 10η Εκδ.",
    subtitle: "Βήμα-βήμα εισαγωγή στην Java για αρχάριους",

    /* Filters */
    category: "programming",
    level: "intermediate",
    language: "GR",

    /* Metadata */
    pages: 1664,
    year: 2020,
    author: "Harvey M. ,Paul J. Deitel",

    /* Descriptions */
    shortDescription:
      "Χιλιάδες σπουδαστές και επαγγελματίες έχουν μάθει προγραμματισμό και ανάπτυξη λογισμικού από τα βιβλία, βίντεο, ηλεκτρονικά βιβλία και online κέντρα της Deitel®.",
    longDescription:
      "Το βιβλίο αυτό παρέχει μια σαφή, απλή, ενδιαφέρουσα και διασκεδαστική εισαγωγή στον προγραμματισμό με την Java, χρησιμοποιώντας την προσέγγιση της πρότερης σύνδεσης των αντικειμένων. Το υλικό που περιλαμβάνεται είναι: Πλούσια κάλυψη των βασικών λειτουργιών με πραγματικά παραδείγματα. Φιλική παρουσίαση των κλάσεων και αντικειμένων με   πρότερη σύνδεση. Χρήση με την Java™ SE 7 ή την Java™ SE 8 ή και τις δύο. Γραφικά περιβάλλοντα χρήστη Swing και JavaFX, γραφικά και πολυμέσα. Δύσκολες Ασκήσεις και βίντεο-σημειώσεις. Ολοκληρωμένος χειρισμός εξαιρέσεων. Αρχεία, ροές δεδομένων και σειριοποίηση αντικειμένων.",

    /* UI flags */
    isFeatured: false,
    isNew: false,
    popular: true,

    /* Ratings */
    rating: 4.5,
    ratingCount: 54,

    /* Availability */
    available: true,

    /* Tags */
    tags: ["Java", "Programming"],

    /* Cover image */
    image: "assets/img/thumbnails/java.jpeg",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/java.jpeg 320w,
    assets/img/thumbnails/java.jpeg 640w,
    a ssets/img/thumbnails/java.jpeg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "networking-fundamentals-book",

    /* Titles */
    title: "Η ΕΠΙΣΤΗΜΗ ΤΩΝ ΥΠΟΛΟΓΙΣΤΩΝ",
    subtitle: "Μια ολοκληρωμένη παρουσίαση",

    /* Filters */
    category: "networks",
    level: "beginner",
    language: "GR",

    /* Metadata */
    pages: 840,
    year: 2019,
    author: "J. GLENN BROOKSHEAR",

    /* Descriptions */
    shortDescription:
      "Μια ολοκληρωμένη παρουσίαση των βασικών έννοιών δικτύων υπολογιστών.",
    longDescription:
      "Το βιβλίο αυτό αποτελεί μια θεμελιωμένη και περιεκτική εισαγωγή στην Επιστήμη των Υπολογιστών, που θα αποδειχθεί πολύτιμη για τους σπουδαστές του κλάδου! Καλύπτει μεγάλο εύρος θεμάτων, που εκτείνονται από τις γλώσσες προγραμματισμού μέχρι και την τεχνητή νοημοσύνη. Μάλιστα, στη συγκεκριμένη –10η αμερικανική– έκδοση του βιβλίου περιλαμβάνεται και ένα νέο κεφάλαιο για τα γραφικά υπολογιστή, όπου περιγράφεται η τεχνολογία που χρησιμοποιείται στα βιντεοπαιχνίδια και τη σύγχρονη κινηματογραφική βιομηχανία, και παρέχονται οι βασικές έννοιες για την κατανόηση του αναπτυσσόμενου πεδίου της εικονικής πραγματικότητας. ",

    /* UI flags */
    isFeatured: false,
    isNew: false,
    popular: false,

    /* Ratings */
    rating: 4.2,
    ratingCount: 31,

    /* Availability */
    available: true,

    /* Tags */
    tags: ["Networks", "TCP/IP"],

    /* Cover image */
    image: "assets/img/thumbnails/comp-sci.jpg",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/comp-sci.jpg 320w,
    assets/img/thumbnails/comp-sci.jpg 640w,
    a ssets/img/thumbnails/comp-sci.jpg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "sap-book",

    /* Titles */
    title: "ΕΙΣΑΓΩΓΗ ΣΤΗΝ ΑΝΑΚΤΗΣΗ ΠΛΗΡΟΦΟΡΙΩΝ",
    subtitle: "Για φοιτητές μεταπτυχιακού ή προχωρημένου προπτυχιακού επιπέδου,",

    /* Filters */
    category: "web",
    level: "intermediate",
    language: "GR",

    /* Metadata */
    pages: 576,
    year: 2021,
    author: "DB Experts",

    /* Descriptions */
    shortDescription:
      "Το πρώτο διδακτικό σύγγραμμα που παρουσιάζει με συνοχή και συνέπεια τόσο την κλασική ανάκτηση πληροφοριών όσο και την ανάκτηση πληροφοριών σε διαδικτυακό περιβάλλον",
    longDescription:
      "Το πρώτο διδακτικό σύγγραμμα που παρουσιάζει με συνοχή και συνέπεια τόσο την κλασική ανάκτηση πληροφοριών όσο και την ανάκτηση πληροφοριών σε διαδικτυακό περιβάλλον, συμπεριλαμβανομένης της αναζήτησης στον Ιστό και των συγγενών τομέων της ταξινόμησης και της συσταδοποίησης κειμένων.",

    /* UI flags */
    isFeatured: true,
    isNew: false,
    popular: true,

    /* Ratings */
    rating: 4.8,
    ratingCount: 102,

    /* Availability */
    available: true,

    /* Tags */
    tags: ["sap", "web", "Intermediate"],

    /* Cover image */
    image: "assets/img/thumbnails/sap.jpg",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/sap.jpg 320w,
    assets/img/thumbnails/sap.jpg 640w,
    a ssets/img/thumbnails/sap.jpg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "cyber-book",

    /* Titles */
    title: "Αυτονομία και Πολιτική Ανυπακοή στον Κυβερνοχώρο",
    subtitle: "Μια πρακτική εισαγωγή για developers",

    /* Filters */
    category: "security",
    level: "intermediate",
    language: "GR",

    /* Metadata */
    pages: 442,
    year: 2022,
    author: "Δημήτρης Γκρίτζαλης",

    /* Descriptions */
    shortDescription:
      "H κοινωνία της πληροφορίας στην εποχή της αβεβαιότητας",
    longDescription:
      "Ο βασικός στόχος του βιβλίoυ αυτού είναι να αποτελέσει κριτική συνεισφορά στην καλύτερη κατανόηση του κoινωνικoπoλιτικoύ πλαισίoυ της Κοιvωνίας της πληροφορίας (ΚτΠ) στην Εποχή της Αβεβαιότητας. Ο δεύτερος στόχος του είναι να υπoστηρίξει την ανάγκη ανάδυσης και ενδυνάμωσης ενός αυτόνομου και πoλιτικά ακηδεμόνευτου κoινωνικoύ κινήματoς, το οποίο θα διαθέτει καλά επεξεργασμένες απόψεις για την ΚτΠ, και ειδικά για τις Τεχνολογίες Πληρoφoρικής και Eπικoινωνιών.",

    /* UI flags */
    isFeatured: false,
    isNew: true,
    popular: false,

    /* Ratings */
    rating: 4.3,
    ratingCount: 28,

    /* Availability */
    available: true,

    /* Tags */
    tags: ["security", "intermediate"],

    /* Cover image */
    image: "assets/img/thumbnails/cyber.jpg",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/cyber.jpg 320w,
    assets/img/thumbnails/cyber.jpg 640w,
    a ssets/img/thumbnails/cyber.jpg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "com-net-book",

    /* Titles */
    title: "ΔΙΚΤΥΑ ΥΠΟΛΟΓΙΣΤΩΝ",
    subtitle: "6η Αμερικάνικη Έκδοση",

    /* Filters */
    category: "networks",
    level: "intermediate",
    language: "GR",

    /* Metadata */
    pages: 960,
    year: 2018,
    author: "ANDREW S. TANENBAUM, NICK FEAMSTER, DAVID WETHERALL",

    /* Descriptions */
    shortDescription:
      "Το κορυφαίο εισαγωγικό βιβλίο για τα δίκτυα στον κόσμο - πλήρως ενημερωμένο με τις σημαντικότερες τεχνολογίες του αύριο.",
    longDescription:
      "Το βιβλίο <Δίκτυα υπολογιστών>, στην τέταρτη αμερικανική του έκδοση, είναι η ιδανική εισαγωγική παρουσίαση για τα σημερινά δίκτυα - αλλά και για τα αυριανά. Αυτό το κλασικό best-seller έχει ενημερωθεί πλήρως ώστε να αντανακλά τις νεότερες και σημαντικότερες δικτυακές τεχνολογίες, δίνοντας ιδιαίτερη έμφαση στα ασύρματα δίκτυα.",

    /* UI flags */
    isFeatured: false,
    isNew: false,
    popular: true,

    /* Ratings */
    rating: 4.6,
    ratingCount: 46,

    /* Availability */
    available: false,

    /* Tags */
    tags: ["networks", "intermediate"],

    /* Cover image */
    image: "assets/img/thumbnails/diktya-ypol.jpg",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/diktya-ypol.jpg 320w,
    assets/img/thumbnails/diktya-ypol.jpg 640w,
    a ssets/img/thumbnails/diktya-ypol.jpg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "c++-book",

    /* Titles */
    title: "Η ΓΛΩΣΣΑ ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΥ C++",
    subtitle: "Τέταρτη Αμερικάνικη Έκδοση",

    /* Filters */
    category: "programming",
    level: "advanced",
    language: "GR",

    /* Metadata */
    pages: 1224,
    year: 2023,
    author: "BJARNE STROUSTRUP",

    /* Descriptions */
    shortDescription:
      "Το πλέον καθιερωμένο παγκοσμίως εκπαιδευτικό βιβλίο αναφοράς για προγραμματιστές που θέλουν να χρησιμοποιούν τη C++ ",
    longDescription:
      "Γραμμένο από τον Bjarne Stroustrup, σχεδιαστή της C++ και δημιουργό της πρώτης υλοποίησής της, το βιβλίο καλύπτει με διεξοδικό, αναλυτικό, και ενοποιημένο τρόπο ολόκληρη τη γλώσσα: τις υπηρεσίες, τους μηχανισμούς αφαίρεσης, τις καθιερωμένες βιβλιοθήκες και τις βασικές τεχνικές σχεδιασμού. Μάλιστα, αυτή η τέταρτη αμερικανική έκδοση κάνει τη C++ ιδιαίτερα προσιτή στους προγραμματιστές που έρχονται από τη C++98 ή άλλες..",

    /* UI flags */
    isFeatured: true,
    isNew: true,
    popular: true,

    /* Ratings */
    rating: 4.9,
    ratingCount: 39,

    /* Availability */
    available: true,

    /* Tags */
    tags: ["c++", "Programming"],

    /* Cover image */
    image: "assets/img/thumbnails/c++.jpg",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/c++.jpg 320w,
    assets/img/thumbnails/c++.jpg 640w,
    a ssets/img/thumbnails/c++.jpg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "istos-book",

    /* Titles */
    title: "Προγραμματισμός για το Web, 3η Έκδοση",
    subtitle: "Τρίτη Έκδοση",

    /* Filters */
    category: "web",
    level: "advanced",
    language: "GR",

    /* Metadata */
    pages: 1088,
    year: 2020,
    author: "Randy Connolly, Ricardo Hoar",

    /* Descriptions */
    shortDescription:
      "Αυτό το βιβλίο στοχεύει να καλύψει το μεγάλο φάσμα θεμάτων που απαιτούνται στη σύγχρονη ανάπτυξη ιστού και απευθύνεται σε φοιτητές πληροφορικής μεσαίου και ανώτερου επιπέδου ",
    longDescription:
      "Μία από τις δυσκολίες που συναντήσαμε κατά τον σχεδιασμό αυτού του βιβλίου είναι ότι η κατασκευή ιστοσελίδων διδάσκεται με πολλούς διαφορετικούς τρόπους και σε ποικίλα φοιτητικά ακροατήρια. Τι νέο υπάρχει στην τρίτη έκδοση; Η τρίτη έκδοση αντικατοπτρίζει τόσο αυτές τις πρόσφατες αλλαγές, όσο και τις ανθεκτικές θεμελιώδεις πτυχές της ανάπτυξης ιστού. Την τελευταία δεκαετία, η βασική τεχνολογική στοίβα ανάπτυξης ιστού στον πραγματικό κόσμο έχει απομακρυνθεί από τεχνολογίες back-end (νωτιαίου άκρου ή διαχείρισης) όπως οι PHP, JSP και ASP.NET.",

    /* UI flags */
    isFeatured: true,
    isNew: true,
    popular: true,

    /* Ratings */
    rating: 4.9,
    ratingCount: 39,

    /* Availability */
    available: true,

    /* Tags */
    tags: ["html", "css", "js", "web"],

    /* Cover image */
    image: "assets/img/thumbnails/istos.jpg",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/istos.jpg 320w,
    assets/img/thumbnails/istos.jpg 640w,
    a ssets/img/thumbnails/istos.jpg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "wir-book",

    /* Titles */
    title: "ΑΣΥΡΜΑΤΕΣ ΕΠΙΚΟΙΝΩΝΙΕΣ ΚΑΙ ΔΙΚΤΥΑ",
    subtitle: "1η Έκδοση",

    /* Filters */
    category: "networks",
    level: "advanced",
    language: "GR",

    /* Metadata */
    pages: 728,
    year: 2016,
    author: " William Stallings ",

    /* Descriptions */
    shortDescription:
      "Ο William Stallings έχει συγγράψει 18 τίτλους με πολλές επανεκδόσεις, συνολικά πάνω από 70 βιβλία πάνω σε θέματα όπως ασφάλεια υπολογιστών, δικτύωση υπολογιστών και αρχιτεκτονική υπολογιστών.",
    longDescription:
      "Εισαγωγή, ΜΕΡΟΣ ΠΡΩΤΟ: ΤΕΧΝΙΚΟ ΥΠΟΒΑΘΡΟ, Βασικές αρχές μετάδοσης, Δίκτυα επικοινωνιών, Πρωτόκολλα και η σουίτα TCP/IP, ΜΕΡΟΣ ΔΕΥΤΕΡΟ: ΕΠΙΣΚΟΠΗΣΗ ΤΗΣ ΑΣΥΡΜΑΤΗΣ ΕΠΙΚΟΙΝΩΝΙΑΣ, Τεχνολογία ασύρματης επικοινωνίας, Το ασύρματο κανάλι, Τεχνικές κωδικοποίησης σήματος, Ορθογωνική πολυπλεξία διαίρεσης συχνότητας, Διασπορά φάσματος, Κωδικοποίηση και έλεγχος σφαλμάτων, ΜΕΡΟΣ ΤΡΙΤΟ: ΑΣΥΡΜΑΤΑ ΤΟΠΙΚΑ ΚΑΙ ΠΡΟΣΩΠΙΚΑ ΔΙΚΤΥΑ, Τεχνολογίες ασύρματων τοπικών δικτύων, Bluetooth και IEEE 802.5, ΜΕΡΟΣ ΤΕΤΑΡΤΟ: ΑΣΥΡΜΑΤΑ ΚΙΝΗΤΑ ΔΙΚΤΥΑ ΚΑΙ ΕΦΑΡΜΟΓΕΣ, κυψελοειδή ασύρματα δίκτυα, Συστήματα τέταρτης γενιάς και LTE-Advanced, Κινητές εφαρμογές και κινητό IP,  Επικοινωνίες μεγάλης εμβέλειας, Αναφορές, Ευρετήριο",

    /* UI flags */
    isFeatured: true,
    isNew: true,
    popular: true,

    /* Ratings */
    rating: 4.9,
    ratingCount: 39,

    /* Availability */
    available: true,

    /* Tags (χρησιμοποιούνται για filters/badges) */
    tags: ["html", "css", "js", "web"],

    /* Cover image */
    image: "assets/img/thumbnails/asyrmata.jpg",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/asyrmata.jpg 320w,
    assets/img/thumbnails/asyrmata.jpg 640w,
    a ssets/img/thumbnails/asyrmata.jpg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "cyberlaw-book",

    /* Titles */
    title: "ΣΤΟΙΧΕΙΑ ΔΙΚΑΙΟΥ, ΤΕΧΝΙΚΗΣ ΝΟΜΟΘΕΣΙΑΣ & ΔΗΜΟΣΙΩΝ ΣΥΜΒΑΣΕΩΝ",
    subtitle: "2η Έκδοση",

    /* Filters */
    category: "security",
    level: "beginner",
    language: "GR",

    /* Metadata */
    pages: 454,
    year: 2018,
    author: "Μαρχαβίλας Π., Μπουρδάρας Σπ.",

    /* Descriptions */
    shortDescription:
      "Εισαγωγή στην Επιστήμη του Δικαίου",
    longDescription:
      "Από τη Κοινωνία στο Κράτος, Το Δίκαιο και οι Κανόνες του, Θεμελιώδεις Κανόνες που Διέπουν την Οργάνωση των Βιοτικών Σχέσεων, Συνταγματικό Δίκαιο, Παρουσίαση των Διατάξεων του Συντάγματος, Αστικό Δίκαιο, Στοιχεία Ενοχικού Δικαίου, Στοιχεία Εμπράγματου Δικαίου, Κατανομή Κοινόχρηστων Δαπανών σε Οριζόντιες Ιδιοκτησίες, Εργατικό Δίκαιο, Υγιεινή και Ασφάλεια της Εργασίας, Διενέργεια Διαγωνισμών στο Δημόσιο, Κατάρτιση Προσφοράς, Δημόσια Έργα, Διαδικασίες Σύναψης Συμβάσεων Μελετών και Παροχής Υπηρεσιών, Υπόδειγμα Σύμβασης Έργου, Υπόδειγμα Εγγυητικής Επιστολής κ.α.",

    /* UI flags */
    isNew: true,
    popular: false,

    /* Ratings */
    rating: 4.3,
    ratingCount: 28,

    /* Availability */
    available: true,

    /* Tags */
    tags: ["security", "beginner", "cyberlaw"],

    /* Cover image */
    image: "assets/img/thumbnails/cyber-law.jpg",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/cyber-law.jpg 320w,
    assets/img/thumbnails/cyber-law.jpg 640w,
    a ssets/img/thumbnails/cyber-law.jpg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  },

  {
    /* Unique id */
    id: "cybers-book",

    /* Titles */
    title: "ΑΣΦΑΛΕΙΑ ΔΙΚΤΥΩΝ ΥΠΟΛΟΓΙΣΤΩΝ",
    subtitle: "2η Έκδοση",

    /* Filters */
    category: "security",
    level: "advanced",
    language: "GR",

    /* Metadata */
    pages: 280,
    year: 2004,
    author: "Πομπόρτσης Aν.” “Παπαδημητρίου Γ.",

    /* Descriptions */
    shortDescription:
      "Μια ολοκληρωμένη εισαγωγή στην κρυπτογραφία, στις εφαρμογές ασφαλείας δικτύων και στην ασφάλεια συστημάτων.",
    longDescription:
      "Εισαγωγή στην Κρυπτογραφία, Συμμετρικοί Αλγόριθμοι Κρυπτογράφησης, Ασύμμετροι Αλγόριθμοι Κρυπτογράφησης, Πιστοποίηση Αυθεντικότητας, Ψηφιακές Υπογραφές, Το Σύστημα Πιστοποίησης Αυθεντικότητας <Κέρβερος>, Ασφάλεια του Εξυπηρέτη Web, Ασφάλεια του Χρήστη, Ασφάλεια Ηλεκτρονικού Ταχυδρομείου, Ασφαλείς Ηλεκτρονικές Συναλλαγές, Φράγματα Ασφάλειας (Firewalls)",

    /* UI flags */
    isNew: true,
    popular: false,

    /* Ratings */
    rating: 4.3,
    ratingCount: 28,

    /* Availability */
    available: true,

    /* Tags */
    tags: ["security", "advanced",],

    /* Cover image */
    image: "assets/img/thumbnails/net-sec.jpg",

    /* Responsive image hints */
    imageSrcSet: `
    assets/img/thumbnails/net-sec.jpg 320w,
    assets/img/thumbnails/net-sec.jpg 640w,
    a ssets/img/thumbnails/net-sec.jpg 1024w
    `.trim(),
    imageSizes: "(max-width: 768px) 100vw, 300px"
  }
];
