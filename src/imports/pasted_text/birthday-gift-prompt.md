Create a **single-page interactive birthday website** as a personal digital birthday gift from a girlfriend to her boyfriend.

The website should feel **cute, playful, romantic, youthful, personal, and heartfelt**, while still looking clean and modern. Avoid making it overly pink, overly childish, or like a generic birthday template.

The primary visual identity should use a **soft baby blue / sky blue color palette**, combined with white, soft gray, and subtle deeper blue accents. Use elegant soft gradients such as baby blue fading into white, with very subtle lavender-blue tones if needed.

The website must be designed **mobile-first and highly responsive**, with the mobile experience as the main priority. It should look beautiful on smartphone screens and remain responsive on tablets and desktop.

Use a combination of:

* A playful, slightly handwritten/display-style font for important headings
* A clean modern sans-serif font for body text
* Rounded corners
* Soft shadows
* Glassy/soft cards where appropriate
* Small stars, hearts, sparkles, doodles, and decorative elements
* Generous whitespace
* Smooth scrolling
* Subtle entrance animations
* Gentle floating/motion effects

Keep the overall design cohesive and elegant rather than visually crowded.

---

# WEBSITE STRUCTURE

Build the entire experience as **one long scrolling webpage**, divided into 6 major sections.

The experience should feel like the user is gradually opening a digital birthday gift.

---

## PART 0 — GIFT GATE / ENTRY

This is the first screen before the actual birthday website.

Create a centered cute gift-opening experience.

Content:

“Open Your Gift 🎁”

Below it:

“Someone made something special for you...”

Two buttons:

[ OKAY 💙 ]

[ NGGA 😐 ]

The **OKAY** button should be the primary CTA.

The **NGGA** button should be playful and intentionally difficult to click:

* When the cursor/finger gets close to it, the button should move to another nearby position.
* It should feel like the button is “running away”.
* Do not make it impossible to eventually interact with the page; the purpose is simply a playful joke.
* On mobile, make the movement touch-friendly and prevent the button from leaving the visible screen.
* Optionally display a tiny playful message such as:
  “Hehe, no escape 😌”
  or
  “Nice try 😂”

When the user successfully clicks **OKAY**, transition smoothly into Part 1.

Use a soft blue gradient background with subtle floating sparkles/hearts.

---

# PART 1 — OPENING / BIRTHDAY INTRO

Create a beautiful hero section.

Include placeholders for:

[BIRTHDAY DATE]

[AGE]

[BIRTHDAY BOY NAME]

A large heading such as:

“Happy Birthday, [NAME] 💙”

Supporting text:

“Today is all about you.”

Add a short heartfelt birthday greeting below.

Include **one large featured photo placeholder** of the boyfriend.

The photo should have a cute scrapbook-inspired frame, but remain clean and modern.

Add a prominent CTA:

[ Start Our Story → ]

When clicked, smoothly scroll to Part 2.

Also include a small floating music control button somewhere unobtrusive, such as the bottom-right corner:

♫

The music button must support:

* Play
* Pause
* Visual indication of playing/paused state

Do NOT force autoplay. The user should intentionally start the music.

---

# PART 2 — WISHES + SCRAPBOOK PHOTO GALLERY

Create a section introducing birthday wishes for him.

Heading:

“A Few Wishes For You ✨”

Create several short birthday wishes that feel warm and personal.

Examples of tone:

“I hope this year brings you closer to everything you've been working for.”

“I hope you always have reasons to smile.”

“I hope you know how loved and appreciated you are.”

Do not make the text overly formal.

Below the wishes, create a **scrapbook-style gallery containing exactly 6 photo placeholders**.

The six photos should look like a personal scrapbook rather than a standard grid.

Design direction:

* Mix different photo sizes
* Slightly rotate some photos
* Use rounded/irregular scrapbook frames
* Add tiny tape, sticker, doodle, star, heart, or handwritten-note decorations
* Maintain good visual hierarchy
* Avoid making the layout messy
* Make sure all 6 photos remain clearly visible and usable on mobile

Each photo can optionally have a tiny caption underneath.

The gallery should feel like:

“Little moments that remind me of you.”

Use subtle scroll-reveal animations as the user reaches the gallery.

---

# PART 3 — HIS WISH

Create an interactive section where the boyfriend can write his own birthday wish.

Heading:

“Now It's Your Turn ✨”

Supporting text:

“You've received your wishes. Now, tell me one wish of your own for this year.”

Create a beautiful rounded form card.

Include:

Label:
“What do you wish for this year?”

Large textarea:
“Write your wish here...”

Primary button:

[ Save My Wish 💙 ]

After submission, show a warm confirmation state such as:

“Wish received. ✨”

“I'm keeping this one safe.”

The form should be designed as a **real functional input**, not merely decorative UI.

The submitted wish must be designed to be **persisted/stored**, so structure the UI and interaction flow in a way that can later be connected to a real backend/database.

Do not simply treat the submission as temporary visual state.

Add validation:

* Empty submission should not be accepted.
* Show a friendly validation message.
* Disable the submit button while saving.
* Show a success state after the wish is successfully saved.

For the prototype, use a clearly defined data structure/API-ready interaction for saving the wish.

---

# PART 4 — LOCKED BIRTHDAY GIFT / PERSONAL LETTER

This section must initially appear **locked**.

Before the wish is submitted, show:

🔒

“One last gift is waiting for you...”

“Complete the previous step to unlock it.”

The letter section should visually look like a special sealed birthday envelope/card.

The main button should initially be disabled or locked:

[ 🔒 Unlock My Gift ]

After the boyfriend successfully submits his wish in Part 3, animate the locked state into an unlocked state.

For example:

🔓

“Your gift is ready.”

[ Open Your Birthday Gift 💌 ]

When clicked, reveal the personal birthday letter.

The letter should be presented beautifully, like a digital handwritten letter:

* White/very light card
* Soft blue border
* Subtle paper texture
* Small decorative hearts/stars
* Handwritten-style heading
* Comfortable reading width
* Beautiful spacing

Use placeholder text for the actual letter:

“Dear [NAME],

[YOUR PERSONAL LETTER GOES HERE]

Happy Birthday, sayang. 💙”

The actual letter should be easy to replace later.

The emotional tone should be sincere, intimate, warm, and personal — not overly dramatic.

---

# PART 5 — ENDING

Create a calm, emotional ending section.

Heading:

“To Be Continued...”

Supporting text:

“This isn't the end of our story.”

Then:

“There are still so many memories to make,
places to go,
things to experience,
and birthdays to celebrate.”

End with:

“Happy Birthday, [NAME] 💙”

And a small:

“I love you. ♡”

Include one final photo placeholder or a subtle collage of memories.

The ending should feel peaceful and sentimental.

Use a soft blue-to-white gradient and subtle floating stars.

---

# INTERACTION & UX

The website should feel like a small interactive experience rather than a static landing page.

Include:

* Smooth scrolling
* Scroll-triggered fade/slide animations
* Gentle floating decorative elements
* Button hover/tap animations
* Gift opening transition
* Running-away “NGGA” button
* Music play/pause control
* Interactive wish submission
* Persistent wish storage architecture
* Locked/unlocked letter state
* Smooth transition between sections

Do not overuse animations.

The animations should feel:
**soft, cute, smooth, romantic, and polished.**

---

# RESPONSIVE DESIGN

Mobile is the primary target.

On mobile:

* Use a single-column layout
* Make buttons easy to tap
* Make text readable without zooming
* Keep decorative elements from covering content
* Ensure the running-away NGGA button stays inside the viewport
* Make the 6-photo scrapbook adapt beautifully to narrow screens
* Keep the letter comfortable to read
* Keep the music control accessible but unobtrusive

Desktop/tablet layouts should expand gracefully without changing the overall experience.

---

# COLOR DIRECTION

Primary:
Soft Baby Blue / Sky Blue

Secondary:
White
Soft Gray
Very Light Blue

Accent:
Deeper Blue for CTA buttons and important interactive elements

Optional:
Very subtle lavender-blue gradient accents

Avoid:

* Strong red
* Excessive pink
* Neon colors
* Dark heavy backgrounds
* Excessive gradients
* Overly childish cartoon styling

The overall feeling should be:

**“A cute digital birthday gift made with love.”**

---

# DESIGN PRINCIPLE

The final result should feel like a **personal digital scrapbook + interactive birthday card + tiny love letter experience**.

It should NOT look like:

* A corporate website
* A generic birthday template
* An e-commerce landing page
* A children's website
* An overly pink Valentine's Day website

Prioritize emotional storytelling, personal memories, playful interactions, clean typography, and beautiful mobile UX.

Use realistic placeholder content and image placeholders so the design looks complete even before the actual photos, name, birthday date, age, music, wishes, and letter are inserted.

Make the final website visually polished and production-oriented, while keeping the structure easy to edit later.
