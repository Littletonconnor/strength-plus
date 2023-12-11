import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/card/card";
import { Link } from "~/components/link/link";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  const globalTemplates = await prisma.template.findMany({
    where: { userId: null },
  });

  // Query for all templates that do have a userId
  const userTemplates = await prisma.template.findMany({
    where: { userId: user.id },
  });

  return json({ templates: [...globalTemplates, ...userTemplates] });
};

export default function Component() {
  const templates = useLoaderData<typeof loader>();

  return (
    <>
      <section className="w-full py-12 md:py-24 max-w-6xl px-4 mx-auto">
        <div className="grid items-center justify-center gap-4 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Workout Routines
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Choose from a variety of routines to suit your fitness goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 border-y py-4">
                  <p className="text-sm/relaxed">{template.description}</p>
                  <Link variant="default" to={`/workout/${template.id}`}>
                    View Workout
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
