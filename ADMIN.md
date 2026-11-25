# ByDee admin area

The admin area lets the clinic owner change the website without touching code: photos, offers, gift cards, prices, reviews, before/after cases, FAQ, journal articles and contact settings, in English and Arabic.

Address: **https://bydee961.vercel.app/admin/** (it is not linked from the site and search engines are told to ignore it).

## How it works

- Only people with write access to the GitHub repository can sign in and save. Anyone else who opens the page cannot change anything.
- Every save is recorded as a change in GitHub, so nothing is ever lost and any change can be undone.
- After a save, Vercel rebuilds the site. Changes appear on the live site after about one to two minutes.

## One-time setup for the clinic owner

1. Create a free GitHub account at https://github.com/signup.
2. The developer adds that account to the repository: on GitHub, open the repository, then **Settings, Collaborators, Add people**, and choose **Write** access. The owner accepts the invitation from the email GitHub sends.
3. The owner creates a sign-in token:
   - Open https://github.com/settings/tokens/new (a "classic" token. GitHub's newer fine-grained tokens do not work for collaborators on someone else's personal repository).
   - Note: `ByDee admin`. Expiration: up to one year.
   - Tick the **repo** scope only.
   - Click **Generate token** and copy it. Keep it private, like a password.
   - This token can change any repository the owner's account has access to. For a new account used only for the clinic, that is just this one.
4. Open the admin page, click **Sign In Using Access Token** and paste the token. The browser remembers it.

When the token expires, create a new one the same way.

Optional: a **Sign In with GitHub** button (no token) needs a small free sign-in service. See https://github.com/sveltia/sveltia-cms-auth for the setup. Then, in `public/admin/config.yml` under `backend`, add its address as `base_url` and change `auth_methods` to `[oauth, token]`. Without that service the button does not work, which is why it is switched off.

## Inside the admin

The **Help** button (question mark) in the top toolbar opens a short guide in English and Arabic. The admin itself can also be switched to Arabic from the account menu, then Settings.

| Section | What it changes |
| --- | --- |
| Offers | Offers on the home page (each one hides itself after its last day), and the "Get offers on WhatsApp" link |
| Gift cards | Gift card amounts. Clients order on WhatsApp |
| Refer a friend | The refer-a-friend message in the booking section |
| Prices | "From $X" on treatment cards and pages, and packages on treatment pages |
| Website photos | Any photo on the site. Leave a slot empty to keep the current one |
| Before & after | Cases in the Results section. Only with the client's written consent |
| Reviews | The reviews carousel. Only reviews the client agreed to share, word for word |
| FAQ | Questions and answers on the home page |
| Contact details | WhatsApp, phone, email, Instagram, online booking link, Google review link |
| Advanced settings | Website address, clinic name, Google Business link, map location, visitor statistics IDs, legal pages date |
| Journal | Articles in English and Arabic. Switch "Hide this article" on to keep one off the site |

Sections with nothing in them stay hidden on the site, so it is safe to leave anything empty.

## Tips

- Photos: use JPG or PNG under about 5 MB. The site resizes and compresses them automatically.
- Fill in the Arabic fields too. If an Arabic field is empty, some places fall back to the English text.
- Treatment descriptions, page headings and button texts are still in the code. Ask the developer to change those.

## For the developer

- Configuration: `public/admin/config.yml`. Page: `src/pages/admin/index.astro` (Sveltia CMS from npm). Help page: `src/pages/admin/help.astro`.
- Editable data: `src/cms/*.json` and `src/content/journal/<en|ar>/*.md`. Uploaded photos: `src/assets/uploads/`.
- The admin saves straight to the `main` branch, so this setup only works once it is merged into `main`.
- To test locally without GitHub, run `npm run dev`, open http://localhost:4321/admin/ in Chrome or Edge and choose **Work with Local Repository**, then select this project folder.
