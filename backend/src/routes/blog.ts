import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
    },
    Variables: {
        userId: string
    }
}>();

blogRoute.use("/*", async (c, next) => {
    try {
        const token = c.req.header("authorization") || "";
        const user = await verify(token, "secret");
        if (user) {
            c.set("userId", String(user.id));
            await next();
        }
        else {
            return c.json({
                message: "Unauthorized"
            })
        }
    } catch (e) {
        return c.json({
            message: "Unauthorized"
        })
    }
    
})

blogRoute.post("/", async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        if (blog) {
            return c.json({
                message: blog.id
            })
        } else {
            return c.json({
                message: "Error while creating blog"
            })
        }
    } catch (e) {
        return c.json({
            message: "Error while creating blog (in catch)"
        })
    }
})

blogRoute.put("/", async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        if (blog) {
            return c.json({
                message: "Blog updated successfully"
            })
        } else {
            return c.json({
                message: "Error while updating blog"
            })
        }
    } catch (e) {
        return c.json({
            message: "Error while updating blog"
        })
    }
})

blogRoute.get("/bulk", async (c) => {
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        if (blogs) {
            return c.json({
                blogs
            })
        } else {
            return c.json({
                message: "Error while displayig blogs"
            },400)
        }
    } catch (e) {
        return c.json({
            message: "Error while displaying blogs"
        },400)
    }
})

blogRoute.get("/:id", async (c) => {
    const blogId = await c.req.param("id");
    console.log(blogId);
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: String(blogId)
            },
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (blog) {
            return c.json({
                blog
            })
        } else {
            return c.json({
                message: "Error while displayig blog"
            },400)
        }
    } catch (e) {
        return c.json({
            message: "Error while displaying blog"
        },404)
    }
})



