
# SETUP

## install node js lts version

<https://nodejs.org/en/download/>

to check if node is installed

```bash
node -v
```

![alt text](image-3.png)

## install serverless framework

```bash
npm install -g serverless
```

## let's create a serverless project

```bash
serverless
```

![alt text](image.png)

since our application is serverless,node-postgres is not sutable for our application, so we will use our serverless database provider for this.

```bash
npm install @neondatabase/serverless
```

and we will also use neonctl to manage our database

```bash
npm install -g neonctl
```

let's authenticate our neon account

```bash
neonctl auth
```

![alt text](image-1.png)

![alt text](image-2.png)

as our ORM we will use drizzle, so let's install it

```bash
npm i drizzle-orm
```

we will also use drizzle-kit

<https://orm.drizzle.team/kit-docs/overview>

```bash
npm i -D drizzle-kit
```

let's add typescript to our project

```bash
npm i -D @types/aws-lambda typescript serverless-plugin-typescript @types/node
```
