(function () {

  //Επιλογή βασικών στοιχείων του modal από το DOM
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");

  if (!modal) return;

  // Ανοίγει το modal και εισάγει δυναμικά HTML περιεχόμενο
  window.openModal = function (html) {
    // Εισαγωγή περιεχομένου
    modalContent.innerHTML = html;
    // Ενεργοποίηση modal
    modal.classList.add("open");
    // Απενεργοποίηση scroll background
    document.body.style.overflow = "hidden"; 
  };

  // Κλείνει το modal και καθαρίζει το περιεχόμενό του
  window.closeModal = function () {
    modal.classList.remove("open");
    modalContent.innerHTML = "";
    document.body.style.overflow = "";
  };

  // Κλείσιμο modal με click στο κουμπί (X)
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  //  Κλείσιμο modal όταν ο χρήστης κάνει click εκτός του περιεχομένου
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

})();
