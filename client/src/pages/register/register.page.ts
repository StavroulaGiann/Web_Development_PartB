import { escapeHtml, } from "../../app/app.component";

// Αν έχεις endpoint έτοιμο, βάλε το εδώ.
// Αν όχι, άστο null και θα κάνει μόνο "confirmation UI" χωρίς POST.
const REGISTER_URL: string | null = "/api/auth/register";


type Background = "student" | "graduate" | "professional";
type Interest = "programming_languages" | "web_development" | "networks" | "security";
type Experience = "beginner" | "intermediate" | "advanced";
type Goal = "find_job" | "learn_basics" | "university_support" | "career_change";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 8+ chars, contains at least one letter (Greek or Latin) and one number
function isValidPassword(pw: string) {
  const hasLetter = /[A-Za-zΑ-Ωα-ωΆΈΉΊΌΎΏάέήίόύώ]/.test(pw);
  const hasNumber = /\d/.test(pw);
  return pw.length >= 8 && hasLetter && hasNumber;
}

function labelForBackground(v: Background) {
  return v === "student" ? "Student" : v === "graduate" ? "Graduate" : "Professional";
}
function labelForInterest(v: Interest) {
  switch (v) {
    case "programming_languages":
      return "Programming Languages";
    case "web_development":
      return "Web Development";
    case "networks":
      return "Networks";
    case "security":
      return "Security";
  }
}
function labelForExperience(v: Experience) {
  return v === "beginner" ? "None / Beginner" : v === "intermediate" ? "Intermediate" : "Advanced";
}
function labelForGoal(v: Goal) {
  switch (v) {
    case "find_job":
      return "Find job";
    case "learn_basics":
      return "Learn basic concepts";
    case "university_support":
      return "Extra support for university courses";
    case "career_change":
      return "Career Change";
  }
}

export function renderRegister(view: HTMLElement) {
  view.innerHTML = `
    <section class="hero">
      <h1>Create Account</h1>
      <p>Please fill in the information below. Fields marked with <strong>*</strong> are required.</p>
    </section>

    <section class="panel" style="max-width:520px; margin: 0 auto;">
      <style>
        /* μικρά local styles για errors/spacing */
        .reg__sectionTitle { margin: 18px 0 10px; font-size: 18px; }
        .reg__field { display:flex; flex-direction:column; gap:6px; }
        .reg__label { font-size: 12px; color: rgba(255,255,255,.78); }
        .reg__hint { font-size: 11px; color: rgba(255,255,255,.55); margin-top: -2px; }
        .reg__error { font-size: 11px; color: #ff6b6b; margin-top: -2px; }
        .reg__radioRow { display:flex; gap:12px; flex-wrap:wrap; align-items:center; }
        .reg__radioRow label { font-size: 12px; color: rgba(255,255,255,.78); display:flex; gap:6px; align-items:center; }
        .reg__actions { margin-top: 12px; display:flex; gap:12px; flex-wrap:wrap; }
        .reg__summary { margin-top: 10px; }
        .reg__summary .pill { margin-right: 6px; }
        .reg__terms { display:flex; gap:10px; align-items:flex-start; margin-top: 6px; }
        .reg__terms input { margin-top: 3px; }
      </style>

      <form id="regForm" class="grid" style="grid-template-columns: 1fr;">
        <div class="reg__sectionTitle">Personal Data</div>

        <div class="reg__field">
          <div class="reg__label">First Name*</div>
          <input class="textInput" name="firstName" type="text" autocomplete="given-name" />
          <div class="reg__error" data-err="firstName"></div>
        </div>

        <div class="reg__field">
          <div class="reg__label">Last Name*</div>
          <input class="textInput" name="lastName" type="text" autocomplete="family-name" />
          <div class="reg__error" data-err="lastName"></div>
        </div>

        <div class="reg__field">
          <div class="reg__label">Email*</div>
          <input class="textInput" name="email" type="email" autocomplete="email" />
          <div class="reg__error" data-err="email"></div>
        </div>

        <div class="reg__field">
          <div class="reg__label">Birthdate*</div>
          <input class="textInput" name="birthdate" type="date" />
          <div class="reg__error" data-err="birthdate"></div>
        </div>

        <div class="reg__sectionTitle">Account Details</div>

        <div class="reg__field">
          <div class="reg__label">Password*</div>
          <input class="textInput" name="password" type="password" autocomplete="new-password" />
          <div class="reg__hint">At least 8 characters, with letters (Greek or Latin) and numbers.</div>
          <div class="reg__error" data-err="password"></div>
        </div>

        <div class="reg__field">
          <div class="reg__label">Password Confirmation*</div>
          <input class="textInput" name="confirm" type="password" autocomplete="new-password" />
          <div class="reg__error" data-err="confirm"></div>
        </div>

        <div class="reg__sectionTitle">User Profile</div>

        <div class="reg__field">
          <div class="reg__label">User Background*</div>
          <div class="reg__radioRow">
            <label><input type="radio" name="background" value="student" /> Student</label>
            <label><input type="radio" name="background" value="graduate" /> Graduate</label>
            <label><input type="radio" name="background" value="professional" /> Professional</label>
          </div>
          <div class="reg__error" data-err="background"></div>
        </div>

        <div class="reg__field">
          <div class="reg__label">Area of interest*</div>
          <select class="textInput" name="interest">
            <option value="">Choose...</option>
            <option value="programming_languages">Programming Languages</option>
            <option value="web_development">Web Development</option>
            <option value="networks">Networks</option>
            <option value="security">Security</option>
          </select>
          <div class="reg__error" data-err="interest"></div>
        </div>

        <div class="reg__sectionTitle">Suggested courses</div>

        <div class="reg__field">
          <div class="reg__label">Programming experience*</div>
          <select class="textInput" name="experience">
            <option value="">Choose...</option>
            <option value="beginner">None / Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <div class="reg__error" data-err="experience"></div>
        </div>

        <div class="reg__field">
          <div class="reg__label">Your main goal*</div>
          <select class="textInput" name="goal">
            <option value="">Choose...</option>
            <option value="find_job">Find job</option>
            <option value="learn_basics">Learn basic concepts</option>
            <option value="university_support">Extra support for university courses</option>
            <option value="career_change">Career Change</option>
          </select>
          <div class="reg__error" data-err="goal"></div>
        </div>

        <div class="reg__field">
          <div class="reg__terms">
            <input type="checkbox" name="terms" />
            <label class="reg__label">I accept the terms of use.*</label>
          </div>
          <div class="reg__error" data-err="terms"></div>
        </div>

        <div class="reg__error" data-err="form"></div>

        <button class="btn" type="submit" id="regBtn">Continue with confirmation</button>

        <div id="confirmBox"></div>
      </form>
    </section>
  `;

  const form = view.querySelector("#regForm") as HTMLFormElement;
  const btn = view.querySelector("#regBtn") as HTMLButtonElement;
  const confirmBox = view.querySelector("#confirmBox") as HTMLElement;

  const setErr = (key: string, text: string) => {
    const el = form.querySelector(`[data-err="${key}"]`) as HTMLElement | null;
    if (el) el.textContent = text;
  };
  const clearErrs = () => {
    ["firstName","lastName","email","birthdate","password","confirm","background","interest","experience","goal","terms","form"].forEach(k => setErr(k, ""));
  };

  const readForm = () => {
    const fd = new FormData(form);
    const firstName = String(fd.get("firstName") ?? "").trim();
    const lastName = String(fd.get("lastName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const birthdate = String(fd.get("birthdate") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm") ?? "");
    const background = String(fd.get("background") ?? "") as Background | "";
    const interest = String(fd.get("interest") ?? "") as Interest | "";
    const experience = String(fd.get("experience") ?? "") as Experience | "";
    const goal = String(fd.get("goal") ?? "") as Goal | "";
    const terms = Boolean(fd.get("terms"));
    return { firstName, lastName, email, birthdate, password, confirm, background, interest, experience, goal, terms };
  };

  const validate = (v: ReturnType<typeof readForm>) => {
    clearErrs();
    let ok = true;

    if (!v.firstName) { setErr("firstName", "First Name is required"); ok = false; }
    if (!v.lastName) { setErr("lastName", "Last Name is required."); ok = false; }

    if (!v.email) { setErr("email", "Email is required."); ok = false; }
    else if (!isValidEmail(v.email)) { setErr("email", "Please provide a valid email."); ok = false; }

    if (!v.birthdate) { setErr("birthdate", "Birthdate is required."); ok = false; }

    // -------- Age check (16+) --------
if (v.birthdate) {
  const birth = new Date(v.birthdate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age < 16) {
    setErr("birthdate", "You must be at least 16 years old to register.");
    ok = false;
  }
}


    if (!v.password) { setErr("password", "Password is required."); ok = false; }
    else if (!isValidPassword(v.password)) {
      setErr("password", "The password must be at least 8 characters long, with Greek or Latin letters and numbers.");
      ok = false;
    }

    if (!v.confirm) { setErr("confirm", "Password Confirmation is required."); ok = false; }
    else if (v.password !== v.confirm) { setErr("confirm", "Passwords do not match."); ok = false; }

    if (!v.background) { setErr("background", "Choose user background."); ok = false; }
    if (!v.interest) { setErr("interest", "Area of interest is required."); ok = false; }
    if (!v.experience) { setErr("experience", "Programming experience is required."); ok = false; }
    if (!v.goal) { setErr("goal", "Your main goal is required."); ok = false; }

    if (!v.terms) { setErr("terms", "This field is necessary"); ok = false; }

    if (!ok) setErr("form", "Errors. Please correct them to continue.");
    return ok;
  };

  const showConfirmation = (v: ReturnType<typeof readForm>) => {
    confirmBox.innerHTML = `
      <div class="panel reg__summary">
        <h3>Confirm your details</h3>
        <p class="subtitle" style="margin-top:6px;">Check everything before creating your account.</p>

        <div class="meta" style="margin-top:10px;">
          <span class="pill">👤 ${escapeHtml(v.firstName)} ${escapeHtml(v.lastName)}</span>
          <span class="pill">📧 ${escapeHtml(v.email)}</span>
          <span class="pill">🎂 ${escapeHtml(v.birthdate)}</span>
          <span class="pill">🎓 ${escapeHtml(labelForBackground(v.background as Background))}</span>
          <span class="pill">⭐ ${escapeHtml(labelForInterest(v.interest as Interest))}</span>
          <span class="pill">💻 ${escapeHtml(labelForExperience(v.experience as Experience))}</span>
          <span class="pill">🎯 ${escapeHtml(labelForGoal(v.goal as Goal))}</span>
        </div>

        <div class="reg__actions">
          <button class="btn" type="button" id="confirmSubmit">Create account</button>
          <button class="btn ghost" type="button" id="confirmBack">Back to edit</button>
        </div>

        <div id="confirmMsg" class="footerNote"></div>
      </div>
    `;

    const backBtn = confirmBox.querySelector("#confirmBack") as HTMLButtonElement;
    const submitBtn = confirmBox.querySelector("#confirmSubmit") as HTMLButtonElement;
    const msg = confirmBox.querySelector("#confirmMsg") as HTMLElement;

    backBtn.addEventListener("click", () => {
      confirmBox.innerHTML = "";
      btn.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    submitBtn.addEventListener("click", async () => {
      msg.textContent = "";

      // Αν δεν έχεις backend endpoint ακόμα, απλά δείχνουμε success.
      if (!REGISTER_URL) {
        msg.textContent = "✅ Account created (demo). Connect REGISTER_URL when backend is ready.";
        submitBtn.disabled = true;
        return;
      }

      submitBtn.disabled = true;
      msg.textContent = "Creating account…";

      try {
const payload = {
  firstName: v.firstName,
  lastName: v.lastName,
  email: v.email,
  birthdate: v.birthdate,

  password: v.password,
  passwordConfirmation: v.confirm,        // ✅

  background: v.background,              // ✅

  areaOfInterest: v.interest,            // ✅
  programmingExperience: v.experience,   // ✅
  mainGoal: v.goal,                      // ✅

  acceptedTerms: v.terms,                // ✅
};



        const res = await fetch(REGISTER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const ct = res.headers.get("content-type") || "";
        const data = ct.includes("application/json") ? await res.json() : { message: await res.text() };

        if (!res.ok) {
          msg.textContent = String(data?.message || data?.error || `Register failed (${res.status})`);
          submitBtn.disabled = false;
          return;
        }

        msg.textContent = "✅ Account created successfully!";
      } catch (e: any) {
        msg.textContent = String(e?.message ?? e);
        submitBtn.disabled = false;
      }
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    confirmBox.innerHTML = "";

    const v = readForm();
    const ok = validate(v);
    if (!ok) return;

    // Πήγαινε στο confirmation step
    showConfirmation(v);
    confirmBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
