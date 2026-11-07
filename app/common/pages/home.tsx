import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | wemake" },
    { name: "description", content: "Welcome to wemake" },
  ];
};

export default function Home() {
  return (
    <div className="px-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl leading-tight font-bold tracking-tight">
            Today's Products
          </h2>
          <p className="text-lg font-light text-foreground">
            The best products made by our community today.
          </p>
        </div>
      </div>
    </div>
  );
}
