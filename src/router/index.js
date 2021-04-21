import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/Admin.vue")
  },
  {
    path: "/admin/quizzes/add",
    name: "addQuiz",
    component: () => import("@/views/quizzes/AddQuiz.vue")
  },
  {
    path: "/admin/quizzes/:quizId",
    name: "editQuiz",
    component: () => import("@/views/quizzes/EditQuiz.vue")
  },
  {
    path: "/admin/questions",
    name: "listQuestions",
    component: () => import("@/views/questions/ListQuestions.vue")
  },
  {
    path: "/admin/quizzes",
    name: "listQuizzes",
    component: () => import("@/views/quizzes/ListQuizzes.vue")
  },
  {
    path: "/admin/questions/add",
    name: "addQuestion",
    component: () => import("@/views/questions/AddQuestion.vue")
  },
  {
    path: "/admin/questions/:questionId",
    name: "editQuestion",
    component: () => import("@/views/questions/EditQuestion.vue")
  },
  {
    path: "/admin/users",
    name: "listUsers",
    component: () => import("@/views/users/ListUsers.vue")
  },
  {
    path: "/admin/users/add",
    name: "addUser",
    component: () => import("@/views/users/AddUser.vue")
  },
  {
    path: "/admin/users/:userId",
    name: "editUser",
    component: () => import("@/views/users/EditUser.vue")
  },
  {
    path: "/admin/animals",
    name: "listAnimals",
    component: () => import("@/views/animals/ListAnimals.vue")
  },
  {
    path: "/admin/animals/:animalId",
    name: "editAnimal",
    component: () => import("@/views/animals/EditAnimal.vue")
  },
  {
    path: "/admin/animals/add",
    name: "addAnimal",
    component: () => import("@/views/animals/AddAnimal.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/profile/edit",
    name: "editProfile",
    component: () => import("@/views/EditProfile.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/ranking",
    name: "ranking",
    component: () => import("@/views/Ranking.vue"),
    meta: {
      rule: "user"
    }
  },
  
  {
    path: "/quizzes",
    name: "quizzes",
    component: () => import("@/views/Quizzes.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/quizzes/:quizId",
    name: "quiz",
    component: () => import("@/views/Quiz.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/animals",
    name: "animals",
    component: () => import("@/views/Animals.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/animals/:animalId",
    name: "animal",
    component: () => import("@/views/Animal.vue"),
    meta: {
      rule: "user"
    }
  },
  // Redirect to 404 page, if no match found
  {
    path: "*",
    component: () => import("@/views/Error404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
