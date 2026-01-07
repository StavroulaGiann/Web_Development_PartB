// Διαχείριση hamburger menu για κινητά
(function () {

  // Αρχικοποιεί το mobile menu και τα σχετικά event handlers
  function initMobileMenu() {

    // Επιλογή κουμπιού hamburger και mobile menu
    const toggle = document.getElementById("mobileToggle");
    const menu = document.getElementById("mobileMenu");

    // Αν δεν υπάρχουν τα στοιχεία στο DOM, τερματίζει
    if (!toggle || !menu) return;

    //Ανοίγει το mobile menu, ενημερώνει ARIA attributes για accessibility, απενεργοποιεί το scroll του body
    function openMenu() {
      menu.classList.add("is-open");
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    }

    // Κλείνει το mobile menu, επαναφέρει ARIA attributes για accessibility, ενεργοποιεί το scroll του body
    function closeMenu() {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
    }

    // Εναλλάσσει την κατάσταση του menu (άνοιγμα / κλείσιμο)
    function toggleMenu() {
      if (menu.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Click στο hamburger button
    toggle.addEventListener("click", (e) => {
      e.preventDefault(); // αποτρέπει default συμπεριφορά link/button
      toggleMenu();
    });

    // Κλείσιμο menu όταν ο χρήστης επιλέξει κάποιο link
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // ESC για κλείσιμο
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });
  }

  // Εκθέτει τη συνάρτηση στο global scope για χρήση σε όλο το site
  window.initMobileMenu = initMobileMenu;
})();
