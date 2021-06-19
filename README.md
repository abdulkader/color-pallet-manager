## Color Pallet Manager Project Built with NextJS, React, Tailwind CSS and Supabase.io

### What is included

1. Login with Magic Link provided by Supabase.io
2. Create and Manage multiple projects, pallets and colors
3. Export Each pallet to Tailwind Color config, Sass variables or CSS Variables (Naming convention is inspired by Tailwind Color Names)

## Get Started

1. You can either browse the app deployed on Vercel [here](https://color-pallet-manager.vercel.app)

or
1. Create an account at [supabase.io](https://supabase.io) and create a project for this repository
2. You can create the table using the SQL included in the repo. `supabase.sql`
3. For more detailed instruction on creating table and getting started on Supabase, you can follow [here](https://supabase.io/docs/guides/with-nextjs)
4. Clone the repository to your projects folder
5. Install dependencies by running `yarn` with in the repository root folder
6. Add a `.env.local` file with below contents

```
NEXT_PUBLIC_SUPABASE_URL=Your supabase account url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your supabase account anonymous key
```
7. Run `yarn dev` and visit `http://localhost:3000/` to view your project running locally

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Learn Supabase.io](https://supabase.io/docs/guides/platform) - official documentation for supabase.
- [Learn Tailwind CSS](https://tailwindcss.com/docs) - official documentation for Tailwind CSS.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
