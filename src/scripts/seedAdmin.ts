import { prisma } from "../lib/prisma";
import { UserRoles } from "../modules/post/post.router";

async function seedAdmin() {
  try {
    //admin data

    const adminData = {
      name: "admin shaheb 11111111",
      email: "admin1@admin.com",
      role: UserRoles.ADMIN,
      password: "admin1234",
      emailVerified: true,
    };

    // check user on db or not
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exist");
    }

    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:8080",
        },
        body: JSON.stringify(adminData),
      },
    );
    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
    console.log(signUpAdmin);
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();
