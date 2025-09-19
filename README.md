# Worker Profile – Mobile Screen Implementation

This project is a **Next.js (App Router)** implementation of the provided Figma mobile design.  
It showcases a **worker’s profile page** with sections such as personal info, caregiving experience, expectations, and work history.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/maidmatch-profile.git
cd maidmatch-profile
npm install

```

### 2. Environment Setup

Create a **.env.local** file in the root of your project and add the following variables:

- API_URL="https://adminapi.maidmatch.ai/api/worker-detail"

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Now Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design Improvements

While implementing the Figma design, I made the following adjustments to ensure consistency and proper functionality:

- **Work Experience Section**

  - Fixed text color mismatch in the second entry.
  - Corrected spacing between entries to match the Figma layout.

- **Accordion Component**

  - Added scroll-to-view behavior so expanded content is always visible.

- **Images**

  - Implemented fallback images for missing API data.
  - Set main skills images to a uniform width and height.
  - Removed background from button image for a clean Figma-style view.

- **Metadata & Open Graph**

  - Configured dynamic titles and image previews for user profiles.
  - Added domain configuration for proper Open Graph preview on Next.js.

- **Data Handling**

  - Used dummy data where API responses lacked enough content for display.

- **Responsiveness & Layout**
  - Enforced a fluid design with max 375px width, centered across all screen sizes.
