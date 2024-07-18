import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'
import { signupSchema } from '@moeezasjad/medium-common'

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>();

userRoute.post("/signup", async (c) => {
  const body = await c.req.json()
  
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const { success } = signupSchema.safeParse(body);
    if (!success) {
      return c.json({
        message: "Invalid data (zod validation failed)"
      },400)
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })

    const jwt = await sign({ id: user.id }, "secret");

  return c.json({
    token: jwt,
    username: user.name
    })
  } catch (e) {
    return c.json({
      message: "User already exists"
    },400)
  }
});

userRoute.post("/signin", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
      const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    })

    if (user) {
      const jwt = await sign({ id: user.id }, "secret");
      return c.json({
        token: jwt,
        username: user.name
      })
    } else {
      return c.json({
        message: "User not found"
      },400)
    }
  }
  catch (e) {
    return c.json({
      message: "Error occured while fetching user data"
    },400)
  }
  
});
