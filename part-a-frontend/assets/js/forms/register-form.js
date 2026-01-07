// Χρήση IIFE για απομόνωση του κώδικα και αποφυγή συγκρούσεων στο global scope
(function () {
  console.log("register-form.js loaded");

  // Επιλογή της φόρμας εγγραφής
  const form = document.getElementById("registerForm");
  console.log("form element:", form);

  // Αν δεν υπάρχει φόρμα, τερματίζουμε
  if (!form) return;

  // Element για μηνύματα (success / error)
  const statusEl = form.querySelector(".form-status");

  // Helpers

  //Εμφανίζει μήνυμα σφάλματος για συγκεκριμένο πεδίο φόρμας
  function setFieldError(name, message) {
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    if (errorEl) {
      errorEl.textContent = message || "";
    }
  }

  //Καθαρίζει όλα τα error μηνύματα
  function clearAllErrors() {
    form.querySelectorAll(".field-error").forEach((el) => {
      el.textContent = "";
    });

    if (statusEl) {
      statusEl.textContent = "";
      statusEl.style.color = ""; // reset χρώματος
    }
  }

  // Έλεγχος ισχυρού κωδικού (ελάχιστο 8 χαρακτήρες, λατινικά ή ελληνικά γράμματα και αριθμοί)  
  function isStrongPassword(value) {
    if (!value || value.length < 8) return false;

    // Λατινικά ΚΑΙ ελληνικά γράμματα
    const hasLetter = /[A-Za-zΑ-Ωα-ω]/.test(value);

    // Τουλάχιστον ένα ψηφίο
    const hasDigit = /\d/.test(value);

    return hasLetter && hasDigit;
  }

  // Aποφυγή XSS όταν εμφανίζουμε δεδομένα χρήστη στο DOM
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Υπολογισμός ηλικίας από ημερομηνία γέννησης
    function calculateAge(birthDateStr) {
    if (!birthDateStr) return null;

    // Τρέχουσα ημερομηνία
    const today = new Date();

    // Μετατροπή της ημερομηνίας γέννησης σε αντικείμενο Date
    const birthDate = new Date(birthDateStr);

    // Έλεγχος εγκυρότητας ημερομηνίας
    if (isNaN(birthDate.getTime())) return null;

    // Αρχικός υπολογισμός ηλικίας βάσει έτους
    let age = today.getFullYear() - birthDate.getFullYear();

    // Έλεγχος αν έχουν περάσει τα γενέθλια για το τρέχον έτος
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Αν δεν έχουν περάσει ακόμα, αφαιρείται ένα έτος
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }


  // Validation

  //Κάνει client-side validation της φόρμας. Επιστρέφει αντικείμενο με τo flag της εγκυρότητας και τα δεδομένα της φόρμας.
  function validateForm() {
    // Καθαρισμός προηγούμενων μηνυμάτων σφάλματος
    clearAllErrors();
    let valid = true;

    // Συλλογή τιμών από τη φόρμα μέσω FormData
    const formData = new FormData(form);

    // Ανάκτηση και καθαρισμός τιμών πεδίων
    const firstName = formData.get("firstName")?.trim();
    const lastName = formData.get("lastName")?.trim();
    const email = formData.get("email")?.trim();
    const birthDateStr = formData.get("birthDate");
    const age = calculateAge(birthDateStr);
    const password = formData.get("password") || "";
    const confirmPassword = formData.get("confirmPassword") || "";
    const role = formData.get("role");
    const terms = formData.get("termsAccepted");

    // Έλεγχος First Name
    if (!firstName) {
      setFieldError("firstName", "First Name is required");
      valid = false;
    }

   // Έλεγχος Last Name
    if (!lastName) {
      setFieldError("lastName", "Last Name is required.");
      valid = false;
    }

    // Έλεγχος Emaill
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setFieldError("email", "Please provide a valid email.");
      valid = false;
    }

   // Έλεγχος ηλικίας
    if (!birthDateStr) {
      setFieldError("birthDate", "Birthdate is required.");
      valid = false;
    } else if (age === null || age < 15) {
      setFieldError("birthDate", "You must be at least 15 years old.");
      valid = false;
    }

     // Έλεγχος κωδικού
    if (!isStrongPassword(password)) {
      setFieldError(
        "password",
        "The password must be at least 8 characters long, with Greek or Latin letters and numbers.."
      );
      valid = false;
    }

    // Επιβεβαίωση κωδικού
    if (password !== confirmPassword) {
      setFieldError("confirmPassword", "Password mismatch");
      valid = false;
    }

    // Επιλογή ρόλου
    if (!role) {
      setFieldError("role", "Choose user background");
      valid = false;
    }

    // Αποδοχή όρων
    if (!terms) {
      setFieldError("terms", "This field is necessary");
      valid = false;
    }

    return { valid, formData };
  }


  // Modal summary

  // Εμφανίζει modal προεπισκόπησης δεδομένων πριν την τελική εγγραφή
  function showSummaryModal(formData) {
    if (typeof window.openModal !== "function") {
      console.warn("openModal δεν είναι διαθέσιμο.");

      // Εναλλακτική ενημέρωση χρήστη μέσω status μηνύματος
      if (statusEl) {
        statusEl.textContent =
          "The data is valid. ";
      }
      return;
    }

    // Ανάκτηση και καθαρισμός δεδομένων από το FormData
    const firstName = (formData.get("firstName") || "").trim();
    const lastName = (formData.get("lastName") || "").trim();
    const birthDateStr = (formData.get("birthDate") || "").trim();
    const age = calculateAge(birthDateStr);
    const email = (formData.get("email") || "").trim();
    const role = formData.get("role") || "";
    const interest = formData.get("interest") || "";

    // Δημιουργία πλήρους ονόματος χρήστη
    const fullName = (firstName + " " + lastName).trim();

    // HTML περιεχόμενο του modal με escaped δεδομένα για αποφυγή XSS
    const html = `
      <h2 class="modal-title">Data Confimation</h2>
      <div class="modal-body">
        <p>Check your details before registration.:</p>
        <dl class="summary-list">
          <div class="summary-row">
            <dt>First / Last Name:</dt>
            <dd>${escapeHtml(fullName)}</dd>
          </div>
          <div class="summary-row">
            <dt>Birthdate / Age:</dt>
            <dd>${escapeHtml(birthDateStr)}${age != null ? " (" + age + " years)" : ""}</dd>
          </div>
          <div class="summary-row">
            <dt>Email:</dt>
            <dd>${escapeHtml(email)}</dd>
          </div>
          <div class="summary-row">
            <dt>Experience:</dt>
            <dd>${escapeHtml(role)}</dd>
          </div>
          <div class="summary-row">
            <dt>Area of interest:</dt>
            <dd>${escapeHtml(interest)}</dd>
          </div>
        </dl>

        <div class="modal-actions" style="margin-top: 1.2rem; display: flex; gap: 0.6rem; justify-content: flex-end; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" id="modalConfirmRegister">
            Confirm registration
          </button>
          <button type="button" class="btn" id="modalEditRegister">
           Go Back
          </button>
        </div>
      </div>
    `;

    // Άνοιγμα modal με το δυναμικά παραγόμενο περιεχόμενο
    window.openModal(html);

    // Επιλογή κουμπιών ενεργειών του modal
    const confirmBtn = document.getElementById("modalConfirmRegister");
    const editBtn = document.getElementById("modalEditRegister");

     // Handler επιβεβαίωσης εγγραφής
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        // Τελική "υποβολή" στον client
        if (statusEl) {
          statusEl.textContent = "Registration completed successfully!";
          statusEl.style.color = "#4ade80"; // πράσινο
        }

        // Προαιρετικός καθαρισμός προσωρινών δεδομένων
        try {
          localStorage.removeItem("devAcademyRegisterDraft");
        } catch (err) {
          console.warn("localStorage remove error:", err);
        }

        // Reset της φόρμας και κλείσιμο modal
        form.reset();
        if (typeof window.closeModal === "function") {
          window.closeModal();
        }
      });
    }

     // Handler επιστροφής για διόρθωση στοιχείων
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        if (typeof window.closeModal === "function") {
          window.closeModal();
        }
        // Κλείσιμο modal χωρίς υποβολή
        if (statusEl) {
          statusEl.textContent =
            "You can correct your data and try again.";
          statusEl.style.color = "";
        }
      });
    }
  }

  // Submit Handler

// Διαχειρίζεται το event υποβολής της φόρμας εγγραφής// Διαχειρίζεται την υποβολή της φόρμας
  form.addEventListener("submit", (event) => {

    // Αποτρέπει την προεπιλεγμένη συμπεριφορά υποβολής (page reload)
    event.preventDefault();
    console.log("submit fired");

    // Εκτέλεση client-side επικύρωσης της φόρμας
    const { valid, formData } = validateForm();

    // Σε περίπτωση αποτυχίας επικύρωσης
    if (!valid) {
      if (statusEl) {
        // Ενημέρωση χρήστη για ύπαρξη σφαλμάτων
        statusEl.textContent =
          "Errors. Please correct them to continue.";
        statusEl.style.color = "#f97373"; // κόκκινο
      }
      return;
    }

    // Εφόσον η επικύρωση ολοκληρωθεί επιτυχώς, εμφανίζεται modal επιβεβαίωσης των στοιχείων
    if (statusEl) {
      statusEl.textContent =
        "Valid data. View the preview and confirm.";
      statusEl.style.color = "";
    }
    // Εμφάνιση modal προεπισκόπησης και επιβεβαίωσης στοιχείων
    showSummaryModal(formData);
  });
})();
