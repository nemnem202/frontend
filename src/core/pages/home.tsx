import { Button } from "@/components/ui/button";

function Home() {
  return (
    <>
      <div>Home</div>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button variant="outline" size="sm">
          Click me
        </Button>
      </div>
    </>
  );
}

export default Home;
