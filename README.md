# MoveMF

## - one way to log your workouts without much clutter -

### The `live` environment is available over at [movemf.vercel.app](https://movemf.vercel.app 'MoveMF - Get a move on!').

### Why build it in the first place?

The requirements my manager gave me were the following: `Create an app what has a CRUD and uses MongoDB's views, query search, and auth.`

MongoDB was the focus in the statement because I had to learn it for a project I was being assigned to. I wanted to make it a little more challenging and I touched on other patterns and tools I have never user before as well (`TailwindCSS` and `REST APIs` are two examples as I only worked with `CSS modules` and `GraphQL APIs` at the time of getting the assignment above).

With only a sentence for requirements I pushed myself to create something that looks nice, feels nice to use and something that I will actually be using in my day to day workout endeavors. The Mongo lesson became a multi-part lecture about consistency, discipline and the road to better software development.

---

### What are you building?

I’m building a responsive minimalist workout tracker web app that makes data available through a user account.

---

### What problem are you solving?

Current workout apps are either too simple and lack a decent UX / basic features or they are highly convoluted with mountains of content that makes the app a burden to use. The minimalist workout tracker app strives to make tracking your workout easier and enjoyable without getting in the way.

---

### Tools used

- Hosting: Vercel
- Database: MongoDB
- API: Next.js
- Authentication: Next Auth + MongoDB
- UI: Next.js + Radix UI + TailwindCSS

---

### Functionality summary

- ✅ The user is able to login / logout from the app
- ✅ The user can log a new workout
- ✅ The user can view a history of his workouts
- ✅ The user can view a list of his exercises
- ✅ The user can duplicate a past completed workout

---

### Data schema

```javascript
USER: {
  _id: string;
  name: string;
  email: string;
},

WORKOUT: {
  _id: string;
  userId: string;
  completedAt: string;
  sets: {
    reps?: number;
    weight?: number;
    setNumber: number;
    exercise: EXERCISE._id;
  }[]
},

EXERCISE: {
  _id: string;
  name: string;
  link?: string;
  userId: string;
},
```

### TO DO LIST:

- [ ] Nicer UI using shad/cn to build it fast
- [ ] Test all use cases available in the system
- [ ] Demo account functionality for faster demo/playing around
- [ ] Refined auth login/logout/account creation functionalities
